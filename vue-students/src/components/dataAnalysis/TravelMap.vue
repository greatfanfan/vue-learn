<template>
    <div class="travel-map">
        <div id="main"></div>
    </div>
</template>
<script>
import geoJson from '@/assets/data.json'
import { travel } from '@/api/api'
import map from '@/utils/map.js'
export default {
    created() {
        travel().then(res => {
            if (res.data.status === 200) {
                let { points, linesData } = res.data.data
                console.log(points,linesData)
                this.drawMap(points, linesData)
            }
        })
    },
    methods: {
        drawMap(points, linesData) {
            let myChart = this.$echarts.init(document.getElementById("main"))

            console.log(geoJson);
            this.$echarts.registerMap('china', geoJson) // 注册可用的地图,必须要包括geo组件或者map图表类型是时候才能使用
            
            // 关于地图中散点图的配置
            let pointsObj = {
                type: 'effectScatter', // 散点图
                coordinateSystem: 'geo',
                showEffectOn: 'render',
                zlevel: 1,
                symbolSize: 10,
                data: points,
                rippleEffect: {
                    period: 15, //动画周期,秒数
                    scale: 4,
                    brushType: 'fill'
                }
            }
            // 关于地图中线路图及动画效果设置
            let linesObj = {
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4,
                    symbol: 'arrow',
                    symbolSize: 7
                },
                lineStyle: {
                    normal: {
                        color: '#1DE9B6',
                        width: 1,
                        opacity: 0.1,
                        curveness: 0.3
                    }
                },
                data: linesData
            }

            map.series[1] = pointsObj
            map.series[2] = linesObj
            
            let option = map

            myChart.setOption(option)
        }
    }
}
</script>
<style lang="scss">
.travel-map {
    width: 100%;
    #main {
        width: 100%;
        height: 600px;
    }
} 
</style>