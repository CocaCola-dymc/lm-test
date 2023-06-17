<template>
    <div class="alarmbox"> 
        
        <van-search v-if="search_flag"
                    :value="value" 
                    placeholder="输入设备名进行搜索"
                    show-action
                    focus
                    shape="round"
                    @search="onSearch"
                    @cancel="onCancel" 
        />

        <div class="countbox">
            <span>总记录数：</span>
            <span class="text">{{ data.length }}</span>
            <span class="count">报警次数：</span>
            <span class="text">{{ alarm }}</span>
            <van-button round class="search" icon="search" @click="onShowSearch"></van-button>
        </div>

        <div class="tabledata" v-if="data_flag">
            <van-row class="title">
                <van-col offset="0" span="4">日期</van-col>
                <van-col offset="6" span="4">设备号</van-col>
                <van-col offset="3" span="5">报警状态</van-col>
            </van-row>
            <van-row class="border">—————————————————————————————————————</van-row>
            <van-row class="table" v-for="(item,index) in dataList" :key="index" @click="onShow(index)">
                <van-col offset="0" span="8">{{ item.time }}</van-col>
                <van-col offset="2" span="6">{{ item.devicename }}</van-col>
                <van-col offset="3" span="1" :class="item.warning == 0 ? 'text_success':'text_danger'">
                    {{ item.warning }}
                </van-col>
                <van-col offset="1" span="3" v-if="index == chooseIndex && show_flag">
                    <van-button type="danger" size="mini" @click="onDelete(item,index)">删除</van-button>
                </van-col>
                <van-row class="border">—————————————————————————————————————</van-row>
          </van-row>
        </div>

        <div class="data_null" v-else>
            ————该设备暂无搜索结果————
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
            value: '',
            search_flag: false,
            data_flag: true,
            alarm: 0,
            data_search: [],
            dataList: [],           //页面渲染时存放的数据
			_dataList: null,        //接口传来的数据存放数组
	     	currentPageNum: 1,      //当前页
            chooseIndex: -1,
            show_flag: false,
            id: null,
        }
    },
    methods:{
        onShowSearch(){
            this.search_flag = !this.search_flag
        },

        onSearch(e){
            //每次搜索之前先把上一次的搜索数组的结果清空，避免重复添加
            this.data_search = []
            this.currentPageNum = 1
            this.data_flag = true
            wx.showToast({
                title: '查询中',
                icon: 'loading',
                duration: 500
            })

            wx.request({
                url: baseUrl + `/LMsy.php?action=read`,
                methods: 'GET',
                // header: { 'content-type': 'application/x-www-form-urlencoded'},
                success:(res)=>{
                    let data = res.data.users;

                    //先对time进行循环切割(把年份舍去)      xxxx-xx-xx xx:xx:xx -> xx-xx xx:xx:xx
                    for(let i=0;i<data.length;i++){
                        data[i].time = data[i].time.slice(5,19)
                    }
                    this.data = data;

                    for(let i=0;i<this.data.length;i++){
                        //如果数据库中的设备名与搜索的设备名相同
                        if(this.data[i].devicename == e.mp.detail){
                            //将符合的数据添加到搜索数组(data_search)中
                            this.data_search.push(this.data[i])
                        }
                    }
                    this.data = this.data_search;
                    //统计报警状态为1的记录数目
                    let alarm = 0
                    for(let i=0; i<this.data.length; i++){
                        if(this.data[i].warning == 1){
                            alarm++;
                        }
                    }
                    this.alarm = alarm;

                    //将记录分页处理，防止记录过多时渲染页面的加载缓慢
                    this.dataList = []
                    this._dataList = null

                    //当存在数据且数据大于等于20条时
                    if(this.data && this.data.length >= 20){
                        let arr = []
                        let len = Math.ceil(this.data.length / 20)
                        for(let i=0; i<len; i++){
                            arr[i] = this.data.slice(i*20,(i+1)*20)
                        }
                        this._dataList = arr
                        this.dataList = this._dataList[0]
                    }else if(this.data.length == 0){    //当数据不存在时
                        this.data_flag = false
                    }else if(this.data){                //当数据存在且少于20条时
                        this.dataList = this.data       
                    }
                }
            })
            
        },  

        // onChange(e){
        //     console.log('改变')
        //     this.value = e.mp.detail
        //     console.log(this.value)
        // },

        onCancel(){ 
            //隐藏搜索框
            this.search_flag = false
            //将当前页重置
            this.currentPageNum = 1
            //显示数据的标志
            this.data_flag = true

            wx.showToast({
                title: '加载中',
                icon: 'loading',
                duration: 500
            })
            wx.request({
            url: baseUrl + `/LMsy.php?action=read`,
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
        //获取点击的记录的index，存入chooseIndex中
        onShow(index){
            //设置一个标志位，实现点击一次显示删除按钮，再点击一次隐藏按钮
            this.show_flag = !this.show_flag
            this.chooseIndex = index
        },
        onDelete(item,index){
            // item.id = Number(item.id)
            wx.showModal({
                title: '删除',
                content: '确定删除该信息吗？',
                success(res){
                    if(res.confirm){
                        wx.request({
                            url: baseUrl + `/LMsy.php`,
                            method: 'POST',
                            header: { 'content-type': 'application/x-www-form-urlencoded'},
                            data:{
                                action: 'delete',
                                id: item.id,        //根据设备id删除
                            },
                            success:(res)=>{
                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 500
                                })
                                setTimeout(() => {
                                    wx.reLaunch({url:'/pages/alarminfo/main'})
                                }, 500);
                            }
                        })
                    }
                }
            })
        }
    },
    onLoad(){
        wx.request({
            url: baseUrl + `/LMsy.php?action=read`,
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
                    let len = Math.ceil(this.data.length / 20)
                    for(let i=0; i<len; i++){
                        arr[i] = this.data.slice(i*20,(i+1)*20)
                    }
                    this._dataList = arr
                    this.dataList = this._dataList[0]
                }else if(this.data){
                    this.dataList = this.data
                }
            }
        })
    },

    onShow(){
        this.currentPageNum = 1
    },

    //卸载页面时将当前页面恢复成第一页，防止重新加载页面时不会往下刷新
    // onUnload(){
    //     this.currentPageNum = 1
    // },

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
    position: relative;
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

.data_null{
    display: flex;
    justify-content: center;
    align-items: center;
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

.search .van-button{
    position: absolute;
    right: 30px;
    top: 5px;
    width: 40px;
    height: 40px;
    opacity: 0.7;
}

</style>
  