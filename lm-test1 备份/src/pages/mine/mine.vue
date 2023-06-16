<template>
  <div>
    <div class="box_user" @click="onLogout">
      <van-image class="img" round width="80px" height="80px" :src="avatarUrl"></van-image>
      <div class="text">{{ nickName }}</div>
    </div>
    <div class="box" @click="information">
      <van-icon class="icon" name="notes-o" size="30px"></van-icon>
      <div class="text">个人信息</div>
      <div class="arrow">>&nbsp;&nbsp;&nbsp;</div>
    </div>
    <div class="box" @click="settings">
      <van-icon class="icon" name="setting-o" size="30px"></van-icon>
      <div class="text">设置</div>
      <div class="arrow">>&nbsp;&nbsp;&nbsp;</div>
    </div>

    <van-action-sheet
      :show="show"
      :actions="actions"
      cancel-text="取消"
      description="要退出登陆吗?"
      @close="onClose"
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'

export default {
  data () {
    return {
      show: false,
      actions:[{name:'退出登录',color:'#ee0a24'}],
      avatarUrl: '',
      nickName: ''
    }
  },

  methods:{
    settings(){
      wx.navigateTo({
        url: '/pages/settings/main',
      }); 
    },

    information(){
      wx.navigateTo({
        url: '/pages/information/main',
      })
    },

    onLogout(){           //点击用户栏弹出退出提示
      this.show = true;
    },

    onClose(){
      this.show = false   //点击屏幕关闭退出提示
    },

    onCancel(){
      this.show = false   //点击取消时关闭面板
    },

    onSelect(){
      wx.showToast({
        title: '已退出登录',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/welcome/main'
        })
      }, 1000);
      
    }

  },
  
  onLoad(){
    //使用全局变量
    this.avatarUrl = this.globalData.avatarUrl
    this.nickName = this.globalData.nickName
  }
}
</script>

<style scoped>
.box_user{
  border-bottom: 1px solid #ccc;
  height: 240rpx;
  display: flex;
  align-items: center;
}
.box_user .img{
  margin-left: 20rpx;
}
.box_user .text{
  margin-left: 20rpx;
  font-size: 24px;
  font-weight: bold;
}
.box{
  height: 120rpx;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc
}
.box .icon{
  margin-left: 20rpx;
}
.box .text{
  margin-left: 20rpx;
  font-size: 16px;
}
.box .arrow{
  margin-left: auto;
}
</style>
