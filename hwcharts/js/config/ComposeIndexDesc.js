//开采指标
Vmd.define('hwchart.config.ComposeIndexDesc', {
    requires: []
}, function () {
    hwchart.config.ComposeIndexDesc = [{
        id: 'oilWellIndex',  // 油井伞形开采指标
        x: 0,
        y: 0,
        width: 150,
        height: 150,
        layers: {
            lcy:{  // 累产油
                type: 'sector',
                style: {
                    fill: 'RGB(255, 0, 0)'
                },
                shape: {
                    cx: 100,
                    cy: 100,
                    r: 50,
                    startAngle:3.14,
                    endAngle:2.15
                }
            },
            lcq:{   // 累产气
                type: 'sector',
                style: {
                    fill: 'RGB(255, 255, 0)'
                },
                shape: {
                    cx: 100,
                    cy: 100,
                    r: 50,
                    startAngle:2.15,
                    endAngle:1
                }
            },
            lcs:{  // 累产水
                type: 'sector',
                style: {
                    fill: 'RGB(0, 0, 255)'
                },
                shape: {
                    cx: 100,
                    cy: 100,
                    r: 50,
                    startAngle:1,
                    endAngle:0
                }
            },
            rcy:{  // 日产油
                type: 'rect',
                style: {
                    fill: 'RGB(255, 0, 0)'
                },
                shape: {
                    x: 0,
                    y: 0,
                    width: 6,
                    height: 50,
                }
            },
            rcq:{ // 日产气
                type: 'rect',
                style: {
                    fill: 'RGB(255, 255, 0)'
                },
                shape: {
                    x: 20,
                    y: 10,
                    width: 6,
                    height: 40,
                }
            },
            rcs:{ // 日产水
                type: 'rect',
                style: {
                    fill: 'RGB(0, 0, 255)'
                },
                shape: {
                    x: 40,
                    y: 10,
                    width: 6,
                    height: 40,
                }
            },
            hs:{
                type: 'rect',
                style: {
                    fill: 'RGB(0,0,0,0)'
                },
                shape: {
                    x: 40,
                    y: 10,
                    width: 6,
                    height: 40,
                }
            }
        }
    },
    {
        id: 'waterWellIndex',  // 水井伞形开采指标
        x: 0,
        y: 0,
        width: 150,
        height: 150,
        layers: {
            lzs:{  // 累注水
                type: 'sector',
                style: {
                    fill: 'RGB(0,255,0)'
                },
                shape: {
                    cx: 100,
                    cy: 100,
                    r: 50,
                    startAngle:3.14,
                    endAngle:0
                }
            },
            rzs:{  // 日注水
                type: 'rect',
                style: {
                    fill: 'RGB(0,255,0)'
                },
                shape: {
                    x: 22,
                    y: 0,
                    width: 10,
                    height: 50,
                }
            }
        }
    },
    {
        id: 'columnIndex',  // 柱形开采指标
        x: 0,
        y: 0,
        width: 150,
        height: 150,
        layers: [{  
            type: 'rect',
            style: {
                fill: 'RGB(0,255,0)'
            },
            shape: {
                x: 0,
                y: 0,
                width: 10,
                height: 50,
            }
        },
        {  
            type: 'rect',
            style: {
                fill: 'RGB(0,255,255)'
            },
            shape: {
                x: 15,
                y: 0,
                width: 10,
                height: 50,
            }
        }]
    }
];
})


