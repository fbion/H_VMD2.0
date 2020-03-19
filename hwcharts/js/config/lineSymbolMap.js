//工业油流井
Vmd.define('hwchart.config.lineSymbolMap', {
    requires: []
}, function () {
    hwchart.config.lineSymbolMap = {
        'faultLine': {
            upLineStyle: { //上升盘
                type: 'solid',
                lineWidth: 1
            },
            downLineStyle: { //下降盘
                opacity: 1,
                type: 'DCX-0020C'
            },
            antiLineStyle:{ //逆断层
                lineWidth: 3
            }
        },
        'pinchLine': {
            type: 'JMX-001C'
        }
    };
});