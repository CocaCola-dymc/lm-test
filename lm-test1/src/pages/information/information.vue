<template>
  <div class="info">
    <span>————————暂无个人信息————————</span>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/index'

export default {
  data () {
    return {

    }
  },

  methods:{

  },
  
  onLoad(){
    //使用全局变量
    this.avatarUrl = this.globalData.avatarUrl
    this.nickName = this.globalData.nickName
  }
}
</script>

<style scoped>
.info{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
