let option = {
    geo: {
        map: 'china',
        aspectScale: 0.75,
        zoom: 1.1,
        itemStyle: {
            normal: {
                areaColor: {
                    type: 'radial', // 径向渐变
                    x: 0.5,
                    y: 0.5,
                    r: 0.8,
                    colorStops: [{
                        offset: 0,
                        color: '#09132c' // 0%处的颜色
                    }, {
                        offset: 1,
                        color: '#274d68' // 100%处的颜色
                    }],
                    globalCoord: true
                },
                shadowColor: 'rgb(58, 115, 192)',
                shadowOffsetX: 10,
                shadowOffsetY: 11
            }
        },
        regions: [{
            name: '南海诸岛',
            itemStyle: {
                opacity: 0
            }
        }]
    },
    series: [
        {
            type: 'map',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#1DE9B6'
                    }
                },
                emphasis: {
                    textStyle: {
                        color: 'rgb(183, 185, 14)'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgb(147, 235, 248)',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial', // 径向渐变
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [{
                            offset: 0,
                            color: 'rgb(31, 54, 150)' // 0%处的颜色
                        }, {
                            offset: 1,
                            color: 'rgb(89, 128, 142)' // 100%处的颜色
                        }],
                        globalCoord: true
                    }
                },
                emphasis: {
                    areaColor: 'rgb(46, 229, 206)',
                    borderWidth: 0.1
                }
            },
            zoom: 1.1,
            map: 'china'
        }
    ]
}

export default option