<template>
  <div class="home_container">
    <!-- 头部区域 -->
    <div class="header">
        <!-- logo -->
        <div class="logo">
            <h2>项目名称</h2>
        </div>
        <!-- 用户界面 -->
        <div class="user">
            <img :src="avatarUrl">
            <p>{{ nickName }}</p>                
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

    <div class="buttons">
      <van-button icon="bars" type="info" @click="data">环境数据</van-button>
      <van-button icon="location" type="primary" @click="location">实时定位</van-button>
      <van-button icon="bell" type="danger" @click="alarm">报警信息</van-button>
    </div>

  </div>
</template>

<script>


export default {
  data () {
    return {
      columns: [50, 100, 200, 500, 1000],
      choose_flag: false,
      avatarUrl: '',
      nickName: ''
    }
  },

  methods:{
    data(){
      wx.navigateTo({
        url: '/pages/showmsg/main'
      })
    },
    location(){
      wx.navigateTo({
        url: '/pages/gpsshow/main'
      })
    },
    alarm(){
      wx.navigateTo({
        url: '/pages/alarminfo/main'
      })
    },
  },

  onLoad(){
    //使用全局变量
    this.avatarUrl = this.globalData.avatarUrl
    this.nickName = this.globalData.nickName
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
  height:60px;
  display:flex;
  justify-content: space-between;
  background-color: #30373b;
  align-items: center;
}
.logo{
  margin-left: 40rpx;
  color: white;
}
.user{
  margin-right: 40rpx;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.user p{
  color:white;
}
.user img{
width: 50px;
height: 50px;
border-radius: 50%;
overflow: hidden;
margin-right: 10px;  
}

.buttons{
  width: 100%;
  height: 300px;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>

<style>
.buttons .van-button{
  width: 160px;
}
</style>