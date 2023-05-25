<template>
    <div class="alarmbox">
        <div class="countbox">
            <span>总记录数：</span>
            <span class="text">{{ data.length }}</span>
            <span class="count">报警次数：</span>
            <span class="text">{{ alarm }}</span>
        </div>
        <div class="tabledata">
            <van-row class="title">
                <van-col offset="0" span="4">日期</van-col>
                <van-col offset="6" span="4">设备号</van-col>
                <van-col offset="3" span="5">报警状态</van-col>
            </van-row>
            <van-row class="border">———————————————————————</van-row>
            <van-row class="table" v-for="(item,index) in dataList" :key="index" @click="onShow(index)">
                <van-col offset="0" span="8">{{ item.time }}</van-col>
                <van-col offset="2" span="6">{{ item.devicename }}</van-col>
                <van-col offset="3" span="1" :class="item.warning == 0 ? 'text_success':'text_danger'">
                    {{ item.warning }}
                </van-col>
                <van-col offset="1" span="3" v-if="index == chooseIndex && show_flag">
                    <van-button type="danger" size="mini" @click="onDelete">删除</van-button>
                </van-col>
                <van-row class="border">———————————————————————————</van-row>
          </van-row>
        </div>
        
    </div>
</template>
  
<script>

//数据库地址
const baseUrl = "http://112.124.28.149";

export default {
    data () {
        return {
            data: '',
            alarm: 0,
            dataList: [],           //页面渲染时存放的数据
			_dataList: null,        //接口传来的数据存放数组
	     	currentPageNum: 1,      //当前页
            chooseIndex: -1,
            show_flag: false
        }
    },
    methods:{
        //获取点击的记录的index，存入chooseIndex中
        onShow(index){
            //设置一个标志位，实现点击一次显示删除按钮，再点击一次隐藏按钮
            this.show_flag = !this.show_flag
            this.chooseIndex = index
        },
        onDelete(){
            console.log('delete ok')
        }
    },
    onLoad(){
        wx.request({
            url: baseUrl + `/LMsy.php`,
            methods: 'GET',
            // header: { 'content-type': 'application/x-www-form-urlencoded'},
            success:(res)=>{
                let data = res.data.users;

                //统计报警状态为1的记录数目
                let alarm = 0
                for(let i=0; i<data.length; i++){
                    if(data[i].warning == 1){
                        alarm++;
                    }
                }
                this.alarm = alarm;

                //先对time进行循环切割(把年份舍去)      xxxx-xx-xx xx:xx:xx -> xx-xx xx:xx:xx
                for(let i=0;i<data.length;i++){
                    data[i].time = data[i].time.slice(5,19)
                }
                this.data = data;

                //将记录分页处理，防止记录过多时渲染页面的加载缓慢
                this.dataList = []
                this._dataList = null
                //当存在数据且数据大于等于20条时
                if(this.data && this.data.length >= 20){
                    let arr = []
                    let len = Math.ceil(data.length / 20)
                    for(let i=0; i<len; i++){
                        arr[i] = data.slice(i*20,(i+1)*20)
                    }
                    this._dataList = arr
                    this.dataList = this._dataList[0]
                }else if(this.data){
                    this.dataList = this.data
                }
            }
        })
    },

    onReachBottom(){
        //如果还有数据需要加载
        if(this._dataList && (this.currentPageNum < this._dataList.length)){
                wx.showToast({
                title: '加载中',
                icon: 'loading',
                duration: 500
            })
            //设置一个与toast同步的定时器，防止加载过快导致不同步
            setTimeout(() => {
                let nextPageNum = this.currentPageNum++
                let arr = this._dataList[nextPageNum]
                for(let i=0; i<20; i++){
                    //后面的数据可能不够20条，就会出现显示空白的情况，所以先判断是否还有数据再进行输出
                    if(arr[i] != null){
                        this.dataList.push(arr[i])
                    }                
                }
            }, 500);
        
        //数据全部加载之后
        }else{
            wx.showToast({
                title: '已加载全部!',
                icon: 'success',
                duration: 1000
            })

        }
    }

}
</script>
  
<style scoped>
.alarmbox{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.countbox{
    width: 400px;
    height: 50px;
    margin-top: 5px;
    font-size: 20px;
    line-height: 50px;
}
.countbox .text{
    color: red;
    font-weight: bold;
    line-height: 40px;
}
.countbox .count{
    line-height: 40px;
    margin-left: 30px;
}
.tabledata{
    margin-bottom: 30px;
}
.tabledata .title{
    font-weight: bold;
}

.text_success{
    color:green;
}
.text_danger{
    color:red;
}

</style>

<!-- 覆盖ui组件的样式需要另外新建一个style -->
<style>
.van-row .border{
    color: #ccc;
    height: 20px;
}
.van-button{
    height: 5px;
}

</style>
  