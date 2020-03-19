Vmd.define('hwchart.util.monitor', {
    requires:[]
   
}, function () {
    var monitorUtil = {
        monitorParams: {
            // screenDiagonalInches: 21.5
        },
        getMonitorParams: function(){
            getDiagonal();
            return this.monitorParams;
        },
        setMonitorParams: function(params){
            this.monitorParams = params;
        }
    };

    function getDiagonal() {
        if(monitorUtil.monitorParams.screenDiagonalInches){
            if(monitorUtil.monitorParams.pixelWidth && monitorUtil.monitorParams.pixelHeight){
                return;
            }

            var diagonalScreen2 = Math.sqrt(screen.width * screen.width + screen.height * screen.height);
            monitorUtil.monitorParams.pixelWidth = monitorUtil.monitorParams.pixelHeight= diagonalScreen2 / monitorUtil.monitorParams.screenDiagonalInches;
            return;
        }

        var element = document.createElement('div');
        element.style.width = element.style.height = '1in';
        document.body.appendChild(element);

        var pixelWidth = element.clientWidth;
        var pixelHeight = element.clientHeight;
        var screenInchWidth = screen.width / pixelWidth;
        var screenInchHeight = screen.height / pixelHeight;
        var screenDiagonalInches = Math.round(Math.sqrt(screenInchWidth * screenInchWidth + screenInchHeight * screenInchHeight)*10)/10;

        monitorUtil.monitorParams.screenDiagonalInches = screenDiagonalInches;
        monitorUtil.monitorParams.pixelWidth = pixelWidth;
        monitorUtil.monitorParams.pixelHeight = pixelHeight;
        monitorUtil.monitorParams.screenInchWidth = screenInchWidth;
        monitorUtil.monitorParams.screenInchHeight = screenInchHeight;
        document.body.removeChild(element);
    }

    //米转换成像素
    monitorUtil.convertToPixelFromMetersH = function(value){
        var monitorParams = monitorUtil.getMonitorParams();
        var pixelWidth = monitorParams.pixelWidth; //1英寸的像素值
        var pixelPerMeter = pixelWidth / 0.0254;
        return value * pixelPerMeter;
    }

    //米转换成像素
    monitorUtil.convertToPixelFromMetersV = function(value){
        var monitorParams = monitorUtil.getMonitorParams();
        var pixelHeight = monitorParams.pixelHeight; //1英寸的像素值
        var pixelPerMeter = pixelHeight / 0.0254;
        return value * pixelPerMeter;
    }

    hwchart.util.monitor = monitorUtil;
   
})