<template>
    <div>
        <map 
            id="map" 
            class="map" 
            :longitude="longitude" 
            :latitude="latitude" 
            :scale="scale"
            :markers="markers"
            :polygons="polygons"
            :circles="circles"
            :polyline="polyline"
            :enable-satellite="satellite_flag">

            <div class="buttons">
                <van-button size="mini" @click="normal">2d</van-button>
                <van-button size="mini" @click="satellite">卫星</van-button>
                <div class="rangebox">
                    <van-button class="left" @click="choose">选择范围</van-button>
                    <van-button class="right" @click="add">
                    {{ add_flag ? '隐藏':'显示' }}范围
                    </van-button>
                </div>
            </div>

            <div class="history">
                <van-button type="primary" round @click="show">
                    {{ show_flag ? '隐藏':'显示' }}历史轨迹
                </van-button>
            </div>
            
        </map>
        <!-- 范围距离选择器 -->
        <van-popup :show="choose_flag" round position="bottom">
            <van-picker 
                show-toolbar
                title="请选择范围距离" 
                :show="choose_flag" 
                :columns="columns" 
                :default-index="5"
                @cancel="onCancel" 
                @confirm="onConfirm"
                @change="onChange" >
            </van-picker>
        </van-popup>

    </div>
</template>
  
<script>
const baseUrl = "http://112.124.28.149";
import '@vant/touch-emulator'

export default {
    data () {
        return {
            latitude: '',
            longitude: '',
            scale: 16,
            satellite_flag: false,
            add_flag: false,
            show_flag: false,
            choose_flag: false,
            range: 500,     //范围距离默认500米
            columns: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            markers:[],
            polygons:[],
            circles:[],
            polyline:[],
            callout: "",

            data: '',
            GPS: '',
            longitudes: '',
            latitudes: '',
        }
    },
    methods:{
        normal(){
            this.satellite_flag = false
        },
        satellite(){
            this.satellite_flag = true
        },
        add(){
            //给显示范围按钮一个取反标志，每点击一次就取反(显示或者隐藏)
            this.add_flag = !this.add_flag
            if(this.add_flag){
                const polygon = {
                    //中心点附近500米，经纬度中，1米=0.0000045
                    points:
                    [
                        {latitude:this.latitude+this.range*0.0000045,
                        longitude:this.longitude-this.range*0.0000045},  //左上角

                        {latitude:this.latitude-this.range*0.0000045,
                        longitude:this.longitude-this.range*0.0000045},  //左下角

                        {latitude:this.latitude-this.range*0.0000045,
                        longitude:this.longitude+this.range*0.0000045},  //右下角
                        
                        {latitude:this.latitude+this.range*0.0000045,
                        longitude:this.longitude+this.range*0.0000045},  //右上角
                    ],
                    strokeColor: '#00a8f3',
                    strokeWidth:2
                }
            this.polygons.push(polygon)
            }else{
                this.polygons = []
            }
        },

        choose(){
            this.choose_flag = !this.choose_flag
        },

        onCancel(){
            this.choose_flag = false
            
        },

        onConfirm(event){
            this.choose_flag = false
            this.range = event.mp.detail.value
            //如果页面上正在显示范围
            if(this.add_flag){
                //调用一次this.add()函数后会隐藏范围，所以要再调用一次(一共调用了两次)
                this.add()
                this.add()
            }else{      
                //如果页面上隐藏了范围，则调用一次this.add()就可以了,这样选择完范围后就会立刻显示
                this.add()
            }
        },

        onChange(event){
            this.range = event.mp.detail.value
        },
        
        show(){
            //给显示历史轨迹按钮一个取反标志，每点击一次就取反(显示或者隐藏)
            this.show_flag = !this.show_flag
            //如果点击了显示历史轨迹
            if(this.show_flag){
                //显示历史轨迹
                let polyline = {
                    points: this.points,
                    color: '#000',
                    width:2
                }
                this.polyline.push(polyline)
                
            
                //循环显示历史轨迹的点上做标记点
                for(var i=0;i<polyline.points.length;i++){
                    const marker = {
                        id: i+1,
                        longitude: polyline.points[i].longitude,
                        latitude:  polyline.points[i].latitude,
                        width:20,
                        height:32,
                    }
                    this.markers.push(marker)
                }
            //否则就是点击了隐藏历史轨迹，则清空轨迹点和标志点(保留中心标志点)
            }else{
                this.polyline = []
                this.markers = [{
                    id: 0,
                    longitude:this.longitude,
                    latitude:this.latitude,
                    width:20,
                    height:32,
                    title: '当前位置'
                }]
            }
        }
    },
    onLoad(){
        //精确值
        // latitude:  23.102934
        // longitude: 113.535982

        //地图第一次加载需要时间，使用Toast提示
        wx.showToast({
            title: '加载地图中',
            icon: 'loading',
            duartion: 1000,
            mask: true
        })
        wx.getLocation({
            type:'gcj02',
            altitude: true,
            isHighAccuracy: true,
            success:(res)=>{
                this.longitude = res.longitude
                this.latitude = res.latitude
                //给定一个精确位置
                // this.longitude = 113.535982
                // this.latitude = 23.102934

                //中心点放置marker
                const marker = {
                            id: 0,
                            longitude:this.longitude,
                            latitude:this.latitude,
                            width:20,
                            height:32,
                            title: '当前位置',
                        }
                this.markers.push(marker)
            }
            
        }),


        // this.longitude = 113.535982
        // this.latitude = 23.102934
        // //中心点放置marker
        // const marker = {
        //     id: 0,
        //     longitude:this.longitude,
        //     latitude:this.latitude,
        //     width:20,
        //     height:32,
        // }
        // this.markers.push(marker)



        wx.request({
            url: baseUrl + `/LMsy.php?action=read`,
            // url: baseUrl + `/lm/doFindLms`,
            methods: 'GET',
            // header: { 'content-type': 'application/x-www-form-urlencoded'},
            success:(res)=>{
                let data = res.data.users;
                //先将data中的GPS成员分割成经纬度，在放入data中变成data的成员
                for(let i=0;i<data.length;i++){
                    let str = data[i].GPS
                    data[i].longitude = str.split(' ')[1]   //经度
                    data[i].latitude  = str.split(' ')[0]   //纬度
                }
                this.data = data;

                //历史轨迹所经过的点
                let points = [];
                let point;
                //取最后的10个点作为历史点位
                for(let i=data.length-10;i<data.length;i++){
                    point = {};     //每一次循环都将point清空一下
                    point.longitude = this.data[i].longitude;
                    point.latitude = this.data[i].latitude;
                    points.push(point)
                }
                this.points = points;
                console.log(this.points)
                
            }
        })

    },

    onShow(){
        //初始化为2d地图，并且每次加载默认值为2d地图
        this.satellite_flag = false
    }

}
</script>
  
<style scoped>
.map{
    width: 100%;
    height: 100vh;
}
.buttons{
    display: flex;
}
.rangebox{
    /* 让范围盒子靠右 */
    margin-left: auto;
}
.history{
    display: flex;
    flex-direction: row-reverse;
}
</style>

<style>

.left .van-button{
    /* 左上角 */
    border-top-left-radius: 20px; 
    /* 左下角 */
    border-bottom-left-radius: 20px;
}
.right .van-button{
    /* 右上角 */
    border-top-right-radius: 20px; 
    /* 右下角 */
    border-bottom-right-radius: 20px;
}
.history .van-button{
    margin-left: auto;
}
</style>
  