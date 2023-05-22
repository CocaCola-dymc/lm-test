<template>
  <div>
    <van-button>个人信息</van-button>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'

export default {
  data () {
    return {
      username: '',
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

    chargeRecord(){
      wx.navigateTo({
        url: '/pages/charge/main?active=1',   // active=1,切换到内容2
      })
    },

    onLogout(){           //点击用户栏弹出退出提示
      this.show = true;
    },

    onClose(){
      this.show = false   //点击屏幕关闭退出提示
    },

    onSelect(){
      wx.showToast({
        title: '已退出登录',
        icon: 'success',
        duration: 1000
      })
      setTimeout(() => {
        wx.navigateTo({
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

</style>
