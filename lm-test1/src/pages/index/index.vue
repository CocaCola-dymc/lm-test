<template>
  <div class="home_container">
    <!-- 头部区域 -->
    <div class="header">
        <!-- logo -->
        <div class="title">
            <h2>LmTest</h2>
        </div>
        <!-- 用户界面 -->
        <div v-if="!add_flag" class="add" @click="add">
            添加设备            
        </div>
    </div>

    <!-- 导航栏 -->
    <!-- <div>
      <van-tabs :active="active">
        <van-tab title="环境数据">
        
        </van-tab>
        <van-tab title="实时定位">
          
        </van-tab>
      </van-tabs>

    </div> -->

    <div class="functions" v-if="!add_flag">
      <van-button icon="bars" type="info" @click="data">环境数据</van-button>
      <van-button icon="location" type="primary" @click="location">实时定位</van-button>
      <van-button icon="bell" type="danger" @click="alarm">报警信息</van-button>
    </div>
    <div class="device" v-else>
      <van-field
        type="text"
        label="设备序列号"
        placeholder="请输入设备序列号"
        :value="devicename"
        @input="devicename = $event.mp.detail"
        focus
        @blur="checkDeviceName"
      />
      <div class="buttons">
        <van-button type="danger" @click="onCancel">取消</van-button>
        <van-button type="primary" @click="onConfirm">确定</van-button>
      </div>
    </div>

  </div>
</template>

<script>
//数据库地址
const baseUrl = "http://112.124.28.149";

export default {
  data () {
    return {
      columns: [50, 100, 200, 500, 1000],
      choose_flag: false,
      add_flag: false,
      devicename: '',
      avatarUrl: '',
      nickName: '',
      longitude: '',
      latitude: ''
    }
  },

  methods:{
    //跳转到环境数据页面
    data(){
      wx.navigateTo({
        url: '/pages/showmsg/main'
      })
    },
    //跳转到实时定位页面
    location(){
      wx.navigateTo({
        url: '/pages/gpsshow/main'
      })
    },
    //跳转到报警信息页面
    alarm(){
      wx.navigateTo({
        url: '/pages/alarminfo/main'
      })
    },

    //添加设备
    add(){
      this.add_flag = true
    },

    checkDeviceName(){
      //使用正则表达式验证设备序列名是否合法
      let devicenameRegExp = /^[a-zA-Z0-9]*$/
      //如果没有输入字符，则默认序列名为undefined
      if(this.devicename == ''){
        this.devicename = 'undefined'
      }
      //开始匹配正则表达式
      if(devicenameRegExp.test(this.devicename)){
        return true;
      }else{
        wx.showToast({
          title: '序列名不合法',
          icon: 'error',
          duration: 1000
        })
        return false;
      }
    },

    onCancel(){
      this.add_flag = false
      //将文本框的数据清空
      this.devicename = ''
    },

    //添加设备的函数，将数据插入到数据库
    onConfirm(){
      //如果通过了验证，则开始操作数据库
      if(this.checkDeviceName()){
        wx.request({
          url: baseUrl + `/LMsy.php`,
          methods: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded'},
          data:{
            devicename: this.devicename,
            GPS: `${this.longitude} ${this.latitude}`,
            warning: 0
          },
          success:(res)=>{
            wx.showToast({
              title: '成功添加设备',
              icon: 'success',
              duration: 500
            })
            console.log(res)
            setTimeout(() => {
              this.add_flag = false
              this.devicename = ''
            }, 500);
            
          }
        })
      }
    }

  },

  onLoad(){
    //使用全局变量
    this.avatarUrl = this.globalData.avatarUrl
    this.nickName = this.globalData.nickName

    wx.getLocation({
      type:'gcj02',
      altitude: true,
      isHighAccuracy: true,
      success:(res)=>{
        this.longitude = res.longitude
        this.latitude = res.latitude
      }
    })
  }

}
</script>

<style scoped>
*{
  padding: 0;
  margin:auto;
}
html,body,.home_container{
  height: 100%;
}
body{
  width: 400rpx;
  height: 300rpx;
}
/* 头部区域 */
.header{
  width:100%;
  height:120rpx;
  display:flex;
  justify-content: space-between;
  background-color: #30373b;
  align-items: center;
}
.title{
  margin-left: 40rpx;
  color: white;
  font-weight: bold;
}
.add{
  margin-right: 40rpx;
  display:flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.functions{
  width: 100%;
  height: 600rpx;
  margin-top: 100rpx;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.device{
  margin-top: 200rpx;
}
.buttons{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100rpx;
}
</style>

<style>
.functions .van-button{
  width: 320rpx;
}
.buttons .van-button{
  width: 160rpx;
}
</style>