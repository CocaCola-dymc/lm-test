<template>
  <div>
    <div class="setting">暂无设置</div>
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
.setting{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
