<template>
    <div>
        <!-- 内容区域 -->
        <van-tabs :active="active">

            <!-- 内容1 -->
            <van-tab title="风速风向">
                <!-- 风速风向盒子 -->
                <div class="windybox">
                    <!-- 风速 -->
                    <div class="windyspeedbox">
                        <div class="windyspeed-name">
                            <p>当前风速(m/s):</p>
                        </div>
                        <div class="windyspeed-content">
                            <div class="windyspeed-img">
                                <img src="../../assets/windspeed.png" alt="">
                            </div>
                            <div class="windyspeed-data">
                                <p>5</p>
                            </div>
                        </div>
                    </div>
                    <!-- 风向 -->
                    <div class="winddirectionbox">
                        <div class="winddirection-name">
                            <p>当前风向(°):</p>
                        </div>
                        <div class="winddirection-content">
                            <div class="winddirection-img">
                                <img src="../../assets/windydirection.png" alt="">
                            </div>
                            <div class="windirection-data">
                                <p>25</p>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>

            <!-- 内容2 -->
            <van-tab title="温度湿度">
                <!-- 温湿度盒子 -->
                <div class="humietcbox">
                    <!-- 温度盒子 -->
                    <div class="tempbox">
                        <div class="temp-name">
                            <p>当前温度(℃):</p>
                        </div>
                        <div class="temp-content">
                            <div class="temp-img">
                                <img src="../../assets/temp.png" alt="">
                            </div>
                            <div class="temp-data">
                                <p>20</p>
                            </div>
                        </div>
                    </div>
                    <!-- 湿度盒子 -->
                    <div class="humibox">
                        <div class="humi-name">
                            <p>当前湿度(%rh):</p>
                        </div>
                        <div class="humi-content">
                            <div class="humi-img">
                                <img src="../../assets/humi.png" alt="">
                            </div>
                            <div class="humi-data">
                                <p>20</p>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>

            <!-- 内容3 -->
            <van-tab title="PM指数">
                <!-- PM盒子 -->
                <div class="PM-vnhbox">
                    <div class="pm1box">
                        <div class="pm1-name">
                            <p>PM2.5(μg/m³):</p>
                        </div>
                        <div class="pm1-content">
                            <div class="pm1-img">
                                <img src="../../assets/PM2.5.png" alt="">
                            </div>
                            <div class="pm1-data">
                                <p>150.8</p>
                            </div>
                        </div>
                    </div>
                    <div class="pm10box">
                        <div class="pm10-name">
                            <p>PM10(μg/m³):</p>
                        </div>
                        <div class="pm10-content">
                            <div class="pm10-img">
                                <img src="../../assets/PM10.png" alt="">
                            </div>
                            <div class="pm10-data">
                                <p>150.8</p>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>

            <!-- 内容4 -->
            <van-tab title="大气压强">
                <!-- 气压噪声盒子 hPa:百帕 -->
                <div class="atmo-nhvbox">
                    <div class="atmopressbox">
                        <div class="atmopress-name">
                            <p>大气压(hPa):</p>
                        </div>
                        <div class="atmopress-content">
                            <div class="atmopress-img">
                                <img src="../../assets/atmopress.png" alt="">
                            </div>
                            <div class="atmopress-data">
                                <p>1015.8</p>
                            </div>
                        </div>
                    </div>
                    <!-- 噪声盒子 -->
                    <div class="nvhbox">
                        <div class="nvh-name">
                            <p>噪声(dB):</p>
                        </div>
                        <div class="nvh-content">
                            <div class="nvh-img">
                                <img src="../../assets/nvh.png" alt="">
                            </div>
                            <div class="nvh-data">
                                <p>100</p>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>

            <!-- 内容5 -->
            <van-tab title="气体数据">
                <!-- <div class="wrap">
                    <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="gas-canvas"></mpvue-echarts>
                </div> -->
                <!-- 气体数据 -->
                <div class="gasbox">
                    <!-- 标题 -->
                    <div class="gas-title">
                        <p>气体数据</p>
                    </div>
                    <div class="gasdatabox">
  
                        <div class="o2box">
                            <div class="o2colorbox"></div>
                            <h3>氧气(O₂)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>
                        <div class="co2box">
                            <div class="co2colorbox"></div>
                            <h3>二氧化碳(CO₂)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>

                        <div class="ch4box">
                            <div class="ch4colorbox"></div>
                            <h3>甲烷(CH4)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>
                        <div class="nh3box">
                            <div class="nh3colorbox"></div>
                            <h3>氨气(NH3)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>

                        <div class="so2box">
                            <div class="so2colorbox"></div>
                            <h3>二氧化硫(SO₂)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>
                        <div class="cobox">
                            <div class="cocolorbox"></div>
                            <h3>一氧化碳(CO)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>

                        <div class="h2obox">
                            <div class="h2ocolorbox"></div>
                            <h3>水(H₂O)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>
                        <div class="h2sbox">
                            <div class="h2scolorbox"></div>
                            <h3>硫化氢Y(H₂S)浓度(%)：</h3>
                            <p>12.5</p>
                        </div>
                    </div>

                    </div>
            </van-tab>
        </van-tabs>
    </div>

</template>
  
<script>
// import * as echarts from '../../../static/js/echarts.min.js'
// import * as  echarts from "echarts"
// import mpvueEcharts from 'mpvue-echarts'
// let chart = null;

// function initChart(canvas,width,height){
//     chart = echarts.init(canvas,null,{
//         width: width,
//         height: height
//     });
//     canvas.setChart(chart);
//     var option = {
//             title:{
//                 title: '各气体占比',
//                 left: 'center', 
//             },
//             tooltip:{
//                 trigger: 'item'
//             },
//             legend:{
//                 orient: 'vertical',
//                 left: 'left',
//             },
//             series: [
//                 {
//                     itemStyle:{
//                         normal:{
//                             color: function(colors){
//                                 var colorList = [
//                                     '#f65454',
//                                     '#fca212',
//                                     '#54f6e3',
//                                     '#facb59',
//                                     '#5495f6',
//                                     '#41dc49',
//                                     '#7ed3f4',
//                                     '#a969c6'
//                                 ];
//                                 return colorList[colors.dataIndex];
//                             }
//                         }
//                     },
//                     label:{
//                         normal:{

//                         }
//                     },
//                     name: 'Access From',
//                     type: 'pie',
//                     radius: '50%',
//                     data:[
//                         { value: 13, name: '二氧化碳(CO₂)' },
//                         { value: 13, name: '氧气(O₂)'},
//                         { value: 13, name: '甲烷(CH4)' },
//                         { value: 13, name: '氨气(NH3)' },
//                         { value: 13, name: '二氧化硫(SO₂)'},
//                         { value: 13, name: '一氧化碳(CO)' },
//                         { value: 13, name: '水(H₂O)' },
//                         { value: 13, name: '硫化氢Y(H₂S)' }
//                     ],
//                     emphasis: {
//                         itemStyle: {
//                             shadowBlur: 10,
//                             shadowOffsetX: 0,
//                             shadowColor: 'rgba(0, 0, 0, 0.5)'
//                         }
//                     }
//                 }
//             ]
//         };
//     chart.setOption(option);
//     return chart;
// }

export default {
    data () {
        return {
            active:0,
            // echarts,
            // onInit: initChart   
        }
    },

    // components:{
    //     mpvueEcharts
    // },


    methods:{
        
    },



}
</script>
  
<style scoped>
*{
    margin: 0;
    padding: 0;   
}
.windybox{
    display: flex;
    width: 300px;
    height: 105px;
    /* margin的顺序：上右下左 */
    margin: 20px 0 10px 37.5px;     
    /* background-color: #000; */
    background: linear-gradient(145deg,rgb(22, 177, 249),rgb(137, 210, 244));
    border-radius: 20px;
    box-shadow: 0 7px 5px 0 rgb(122, 175, 191);
    /* margin-top: 10px; */
}
.windyspeedbox{
    width: 50%;
    height: 100%;
    /* background: #000; */
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.windyspeed-name{
    width: 90%;
    height: 35px;
    /* background-color: #fff; */
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-weight: 600; */
    font-size: 18px;
}
.windyspeed-content{
    width: 100%;
    height: 70px;
    /* background-color: #fff; */
    display: flex;
}
.windyspeed-img{
    width: 50px;
    height: 100%;
    /* background-color: #f4cfcb; */
}
.windyspeed-img img{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
.windyspeed-data{
    width: 90px;
    height: 100%;
    /* background-color: #fac3bd; */
    display: flex;    
}
.windyspeed-data p{
    word-break: break-all;
    margin-left: 3px;
    font-size: 32px;
    margin-top: 10px;
}
/* 风向 */
.winddirectionbox{
    width: 50%;
    height: 100%;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    /* background: #000; */
}
.winddirection-name{
    width: 90%;
    height: 35px;
    /* background-color: #fff; */
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-weight: 600; */
    font-size: 18px;
}
.winddirection-content{
    width: 100%;
    height: 70px;
    /* background-color: #fff; */
    display: flex;
}
.winddirection-img{
    width: 40px;
    height: 100%;
}
.winddirection-img img{
    width: 45px;
    height: 45px;
    margin-top: 10px;
}
.windirection-data{
    width: 90px;
    height: 100%;
    /* background-color: #fac3bd; */
    display: flex;
}
.windirection-data p{
    word-break: break-all;
    margin-left: 3px;
    font-size: 32px;
    margin-top: 10px;
}
.humietcbox{
    width: 300px;
    height: 105px;
    margin: 20px 0 10px 37.5px;
    /* background-color: #000; */
    background: linear-gradient(145deg,#fac3bd,#f4cfcb);
    border-radius: 20px;
    display: flex;
    box-shadow: 0 7px 5px 0 rgb(209, 157, 153);
    /* margin-top: 10px; */
}
.tempbox{
    width: 150px;
    height: 100%;
    /* background-color: #000; */
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.temp-name{
    width: 90%;
    height: 35px;
    /* background-color: #fff; */
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-weight: 600; */
    font-size: 18px;
}
.temp-content{
    width: 100%;
    height: 70px;
    /* background-color: #fff; */
    display: flex;
}
.temp-img{
    width: 50px;
    height: 100%;
}
.temp-img img{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
.temp-data{
    width: 90px;
    height: 100%;
    /* background-color: #fac3bd; */
    display: flex;
}
.temp-data p{
    margin-top: 10px;
    word-break: break-all;
    margin-left: 4px;
    font-size: 32px;
}
.humibox{
    width: 150px;
    height: 100%;
    /* background-color: #000; */
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.humi-name{
    width: 90%;
    height: 35px;
    /* background-color: #fff; */
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-weight: 600; */
    font-size: 18px;
}
.humi-content{
    width: 100%;
    height: 70px;
    display: flex;
}
.humi-img{
    width: 50px;
    height: 100%;
    margin-left: 5px;
}
.humi-img img{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
.humi-data{
    width: 90px;
    height: 100%;
    display: flex;
}
.humi-data p{
    margin-top: 10px;
    word-break: break-all;
    margin-left: 4px;
    font-size: 32px;
}
.PM-vnhbox{
    width: 360px;
    height: 105px;
    margin: 20px 0 10px 7.5px;
    background: linear-gradient(145deg,rgb(252, 193, 83),rgb(249, 212, 143));
    border-radius: 20px;
    display: flex;
    box-shadow: 0 7px 5px 0 rgb(199, 179, 143);
    /* margin-top: 10px; */
}
.pm1box{
    width: 180px;
    height: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.pm1-name{
    width: 90%;
    height: 35px;
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.pm1-content{
    width: 100%;
    height: 70px;
    display: flex;
}
.pm1-img{
    width: 50px;
    height: 100%;
    margin-left: 5px;
}
.pm1-img img{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
.pm1-data{
    width: 120px;
    height: 100%;
    display: flex;
}
.pm1-data p{
    margin-top: 10px;
    word-break: break-all;
    font-size: 32px;
}
.pm10box{
    width: 180px;
    height: 100%;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.pm10-name{
    width: 90%;
    height: 35px;
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.pm10-content{
    width: 100%;
    height: 70px;
    display: flex;
}
.pm10-img{
    width: 50px;
    height: 100%;
    margin-left: 5px;
}
.pm10-img img{
    width: 40px;
    height: 40px;
    margin-top: 10px;
}
.pm10-data{
    width: 120px;
    height: 100%;
    display: flex;
}
.pm10-data p{
    margin-top: 10px;
    word-break: break-all;
    font-size: 32px;
}
.atmo-nhvbox{
    display: flex;
    width: 340px;
    height: 105px;
    margin: 20px 0 10px 17.5px; 
    background: linear-gradient(145deg,#c275fe,#ddb5fc);
    border-radius: 20px;
    box-shadow: 0 7px 5px 0 rgb(196, 151, 211);
    /* margin-top: 10px; */
}
.atmopressbox{
    width: 50%;
    height: 100%;
    /* background-color: #000; */
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.atmopress-name{
    width: 90%;
    height: 35px;
    /* background-color: #fff; */
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-weight: 600; */
    font-size: 18px;
}
.atmopress-content{
    width: 100%;
    height: 70px;
    /* background-color: #fff; */
    display: flex;
}
.atmopress-img{
    width: 50px;
    height: 100%;
}
.atmopress-img img{
    width: 50px;
    height: 50px;
    margin-top: 5px;
}
.atmopress-data{
    height: 100%;
}
.atmopress-data p{
    word-break: break-all;
    font-size: 32px;
    margin-top: 8px;
}
.nvhbox{
    width: 50%;
    height: 100%;
    /* background-color: #000; */
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
.nvh-name{
    width: 90%;
    height: 35px;
    /* background-color: #fff; */
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* font-weight: 600; */
    font-size: 18px;
}
.nvh-content{
    width: 100%;
    height: 70px;
    display: flex;
}
.nvh-img{
    width: 50px;
    height: 100%;
    margin-left: 5px;
}
.nvh-img img{
    width: 50px;
    height: 50px;
    margin-top: 5px;
}
.nvh-data{
    width: 90px;
    height: 100%;
    display: flex;
}
.nvh-data p{
    margin-top: 10px;
    word-break: break-all;
    font-size: 32px;
}
.gasbox{
    display: flex;
    flex-direction: column;
    width: 95%;
    margin-left: 5px;
    margin-top: 20px;
    /* color: #fff; */
    /* border-radius: 30px; */
    /* background-color: #fff; */
}

.gas-title{
    width: 95%;
    height: 50px;
    /* display: flex;
    align-items: center; */
    line-height: 50px;
    font-size: 20px;
    font-weight: 600;
    /* color: #fff; */
}
.gas-title p{
    float: left;
    margin-left: 10px;
}
h3{
    margin-left: 5px;
}
.gasdatabox{
    /* display: flex; */
    height: 600px;
}
.o2box{
    display: flex;
    width: 80%;
    height: 50px;
    align-items: center;
    margin-left: 30px;
}
.o2colorbox{
    width: 20px;
    height: 20px;
    background-color: #f65454;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.o2box p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}
.co2box{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.co2colorbox{
    width: 20px;
    height: 20px;
    background-color: #fca212;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}

.co2box p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}

.ch4box{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.ch4colorbox{
    width: 20px;
    height: 20px;
    background-color: #54f6e3;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.ch4box p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}
.nh3box{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.nh3colorbox{
    width: 20px;
    height: 20px;
    /* rgb(237, 237, 58) */
    background-color: #facb59;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.nh3box p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto; 
}
.so2box{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.so2colorbox{
    width: 20px;
    height: 20px;
    background-color: #5495f6;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.so2box p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}
.cobox{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.cocolorbox{
    width: 20px;
    height: 20px;
    background-color: #41dc49;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.cobox p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}
.h2obox{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.h2ocolorbox{
    width: 20px;
    height: 20px;
    background-color: #7ed3f4;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.h2obox p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}
.h2sbox{
    width: 80%;
    height: 50px;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    margin-left: 30px;
}
.h2scolorbox{
    width: 20px;
    height: 20px;
    background-color: #a969c6;
    border: 2px solid white;
    border-radius: 50%;
    overflow: hidden;
}
.h2sbox p{
    font-size: 24px;
    font-weight: 600;
    margin-left: auto;
}

</style>
  