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
            <img src="../../../src/assets/userimg.jpg">
            <p>admin</p>                
        </div>
    </div>

    <!-- 导航栏 -->
    <div>
      <van-tabs :active="active">
        <van-tab title="环境数据">
        
        </van-tab>
        <van-tab title="实时定位">
          
        </van-tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      active: 0,
    }
  },

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

</style>
