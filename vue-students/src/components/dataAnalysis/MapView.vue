<template>
    <div class="map-view">
        <div id="main"></div>
    </div>
</template>
<script>
import geoJson from '@/assets/data.json'
import map from '@/utils/map.js'
export default {
    mounted() {
        let myChart = this.$echarts.init(document.getElementById("main"))

        // console.log(geoJson)
        this.$echarts.registerMap('china', geoJson) // 注册可用的地图,必须要包括geo组件或者map图表类型是时候才能使用
        // console.log(map)
        let option = map

        myChart.setOption(option)
    }
}
</script>
<style lang="scss">
.map-view {
    width: 100%;
    #main {
        width: 100%;
        height: 600px;
    }
} 
</style>