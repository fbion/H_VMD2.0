//工业油流井
Vmd.define('hwchart.config.AreaSymbolDesc', {
    requires: []
}, function () {
    hwchart.config.AreaSymbolDesc = [{
        id: 'WCJW-CCB0022H', //中砂
        color: "blue",  //前景色
        backgroundColor: "transparent", //背景色
        symbol: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            layers: [{
                type: 'rect',
                shape: {
                    x: 5,
                    y: 15,
                    width: 20,
                    height: 20
                }
            },{
                type: 'rect',
                shape: {
                    x: 55,
                    y: 15,
                    width: 20,
                    height: 20
                }
            },{
                type: 'rect',
                shape: {
                    x: 30,
                    y: 65,
                    width: 20,
                    height: 20
                }
            },{
                type: 'rect',
                style: {
                    fill: 'RGB(0, 0, 255)'
                },
                shape: {
                    x: 80,
                    y: 65,
                    width: 20,
                    height: 20
                }
            }]
        }, //定义的点符号id
        symbolSize: 10, //填充的符号大小
        repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
    },{
        id: 'WCJW-CCB0022M', //中砂
        color: "black",  //前景色
        backgroundColor: "transparent", //背景色
        symbol: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            layers: [{
                type: 'rect',
                shape: {
                    x: 0,
                    y: 20,
                    width: 75,
                    height: 10
                }
            },{
                type: 'rect',
                shape: {
                    x: 25,
                    y: 70,
                    width: 75,
                    height: 10
                }
            }]
        }, //定义的点符号id
        symbolSize: 10, //填充的符号大小
        repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
    },{
        id: 'NY', //泥岩
        color: "rgb(140,140,0)",  //前景色
        backgroundColor: "transparent", //背景色
        symbol: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            layers: [{
                type: 'rect',
                shape: {
                    x: 0,
                    y: 20,
                    width: 75,
                    height: 15
                }
            },{
                type: 'rect',
                shape: {
                    x: 25,
                    y: 70,
                    width: 75,
                    height: 15
                }
            }]
        }, //定义的点符号id
        symbolSize: 10, //填充的符号大小
        repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
    },{
        id: 'SY', //中砂
        color: "rgb(140,0,0)",  //前景色
        backgroundColor: "transparent", //背景色
        symbol: {
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            layers: [{
                type: 'rect',
                shape: {
                    x: 5,
                    y: 15,
                    width: 20,
                    height: 20
                }
            },{
                type: 'rect',
                shape: {
                    x: 55,
                    y: 15,
                    width: 20,
                    height: 20
                }
            },{
                type: 'rect',
                shape: {
                    x: 30,
                    y: 65,
                    width: 20,
                    height: 20
                }
            },{
                type: 'rect',
                shape: {
                    x: 80,
                    y: 65,
                    width: 20,
                    height: 20
                }
            }]
        }, //定义的点符号id
        symbolSize: 10, //填充的符号大小
        repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
    }];
})