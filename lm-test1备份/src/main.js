import Vue from 'vue'
import App from './App'
// import './style.css'


Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App)
app.$mount()

//定义全局变量
Vue.prototype.globalData = getApp().globalData

//初始默认值，调试应用时没有从welcome页面进入就使用初始默认值
getApp().globalData.avatarUrl = require('../src/assets/visitor.png')
getApp().globalData.nickName = '未授权'