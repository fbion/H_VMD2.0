//工业油流井
Vmd.define('hwchart.config.ComposeSymbolDesc', {
    requires: []
}, function () {
    hwchart.config.ComposeSymbolDesc = [{
        id: 'TJLB-30C', //工业油流井
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        layers: [{
            type: 'circle',
            style: {
                fill: 'RGB(255, 0, 0)'
            },
            shape: {
                cx: 50,
                cy: 50,
                r: 50
            }
        }]
    }, {
        id: 'TJLB-31C', //工业气流井
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        layers: [{
            type: 'circle',
            style: {
                fill: 'RGB(255, 153, 0)'
            },
            shape: {
                cx: 50,
                cy: 50,
                r: 50
            }
        }]
    }, {
        id: 'TJLB-40C', //产水
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        layers: [{
            type: 'circle',
            style: {
                fill: 'RGB(0, 0, 255)'
            },
            shape: {
                cx: 50,
                cy: 50,
                r: 50
            }
        }]
    }, {
        id: 'circle_black',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        layers: [{
            type: 'circle',
            style: {
                fill: 'RGB(0, 0, 0)'
            },
            shape: {
                cx: 50,
                cy: 50,
                r: 50
            }
        }]
    }, {
        id: 'well_bottom',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        layers: [{
            type: 'rect',
            style: {
                fill: 'RGB(0, 0, 0)'
            },
            shape: {
                x: 0,
                y: 0,
                width: 100,
                height: 100
            }
        }]
    }];
})


