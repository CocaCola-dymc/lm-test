<template>
  <div class="container">
    <div class="topContainer">
      <div v-if="!hasUserInfo">
        <van-image width="100" height="100" round :src="userInfo.avatarUrl"/>
        <div class="userInfo-nickname">{{ userInfo.nickName }}</div>
        <div class="loginbox">
          <!-- <van-button class="userLogin" type="primary" v-if="canIUseGetUserProfile" @click="getUserProfile">
            授权登录
          </van-button>
          <van-button class="userLogin" type="primary" v-else open-type="getUserInfo" @click="getUserInfo">
            授权登录
          </van-button> -->
          <van-button class="visitorLogin" @click="visitorLogin">
            游客登录
          </van-button>
        </div>
      </div>
      <div v-else>
        <div>
          <van-image width="100" height="100" round :src="userInfo.avatarUrl"/>
          <div class="userInfo-nickname">{{ userInfo.nickName }}</div>
          <div class="choosebox">
            <van-button class="back" type="danger" @click="back">返回</van-button>
            <van-button class="start" type="info" @click="start">进入首页</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo:{
        avatarUrl: require('../../../src/assets/visitor.png'),
        nickName: '未选择登录方式'
      },
      hasUserInfo: false,
      canIUseGetUserProfile: false,
    }
  },

  methods:{
    getUserProfile(){
      // setTimeout(() => {
      //   wx.showToast({
      //     title: '获取信息中',
      //     icon: 'loading',
      //     duration: 500,
      //     mask: true
      //   })
      // }, 500);
      wx.getUserProfile({
        desc: '获取您的微信个人信息',
        success:(res)=>{
          this.userInfo =  res.userInfo,
          this.hasUserInfo = true

          wx.setStorageSync('userInfo', this.userInfo)
        }
      })
    },
    getUserInfo(e){
      this.userInfo = e.detail.userInfo,
      this.hasUserInfo = true
    },
    visitorLogin(){
        wx.showToast({
          title: '创建中',
          icon: 'loading',
          duration: 500,
          mask: true
        })
      //设置一个定时器，延迟显示界面
      setTimeout(() => {
        // 随机生成一个四位数
        let number = "0123456789";
        let value = '',i;
        for(let j=0; j<4; j++){
          i = parseInt(10*Math.random());
          value = value + number.charAt(i);
        }
        this.userInfo.avatarUrl = require('../../../src/assets/userimg.png')
        this.userInfo.nickName =  `微信用户${value}`

        this.hasUserInfo = true
      }, 500);
    },

    back(){
      this.hasUserInfo = false
      //重置用户头像和名称
      this.userInfo.avatarUrl = require('../../../src/assets/visitor.png')
      this.userInfo.nickName = '未选择登录方式'
    },

    start(){
      wx.showToast({
        title: '正在跳转',
        icon: 'loading',
        duration: 500
      })
      //往全局变量当中存入登录的用户头像和昵称信息
      this.globalData.avatarUrl = this.userInfo.avatarUrl
      this.globalData.nickName = this.userInfo.nickName

      //设置一个定时器，延迟显示界面
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/index/main'
        })
      }, 1000);
    }
  },

  onLoad(){
    if(wx.getUserProfile){
      this.canIUseGetUserProfile = true
    }
  },

}

</script>

<style scoped>
.container {
    border-radius: 20rpx;
    box-sizing: content-box;
    padding: 20rpx 0;
    width: 90%;
    height: 950rpx;
    margin: 200rpx auto;
    background:linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%);
    /* background-image:image("../../images/cloudbg.jpg"); */
    text-align: center;
}
 
.topContainer {
    width: 100%;
    height: 350rpx;
    margin-top: 175rpx;
}
.userInfo-nickname {
  margin-top: 20rpx;
  color:black;
}
.loginbox{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300rpx;
  justify-content: space-around;
}
.userLogin{
  width: 50%;
}
.visitorLogin{
  width: 50%;
}
.choosebox{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100rpx;
  margin-top: 100rpx;
}
</style>

<style>
.userLogin .van-button{
  margin-top: 20px;
}
.loginbox .van-button{
  width: 320rpx;
}
.start .van-button{
  width: 320rpx;
}
.choosebox .van-button{
  margin: 0 20rpx;
}
</style>