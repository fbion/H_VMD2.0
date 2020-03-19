Vmd.define('hwchart.config.LineSymbolDesc', {
    requires: []
}, function () {
    hwchart.config.LineSymbolDesc = [{
        id: 'DCX-0020C', //
        lineStyle: {
            lineWidth: 5
        },
        symbolStyle: {
            type: ['rect'],
            size: [6],
            fill: [],
            position: ['out'],
            interval: [150]
        }
    },{
        id: 'JMX-001H', //
        lineStyle: {
            stroke: 'black',
            lineWidth: 5
        },
        symbolStyle: {
            type: ['emptyTriangle'],
            size: [8],
            fill: [],
            position: ['out'],
            interval: [150]
        }
    },{
        id: 'JMX-001C', //
        lineStyle: {
            stroke: 'rgb(200, 120, 0)',
            lineWidth: 5
        },
        symbolStyle: {
            type: ['triangle'],
            size: [12],
            fill: [],
            position: ['out'],
            interval: [150]
        }
    }];
});


