Vmd.define('hwchart.Dialog', {
    requires: [
        'hwchart.dialog.MiningIndexDialog',
    ]
}, function () {
    var MiningIndexDialog = hwchart.dialog.MiningIndexDialog;
     /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function ChartDialog(chart,params) {
        this.chart = chart;
        this._miningIndexDialog  = MiningIndexDialog;
        //this.initWindow();
        this.updta(params);
    }

    var ChartDialogPro = ChartDialog.prototype;

    ChartDialogPro.initWindow = function(){
        var me = this;
        if(me.defineWins){
            me.defineWins.window("define").show();
        }else{
            me.defineWins = new dhtmlXWindows();
            me.defineWins.setSkin('dhx_terrace');
            var w1 = me.defineWins.createWindow({
                id:"define",
                text:"",
                width:600,
                height:500,
                center:true,
            });
            win.button('park').hide();
            win.button('minmax').hide();
            me.defineWins.attachEvent("onClose", function(win) {
                me.defineWins.window("define").hide();
            });
            var myTabbar = w1.attachTabbar({
                tabs: [
                    {id: "miningIndex", text: "指标现状图配置",active: true},
                    {id: "isoArea", text: "等值区域配置"},
                    {id: "a4", text: "测井指标配置"}
                ]
            })
            
           // myTabbar.tabs("miningIndex").attachURL("../dialogHtml/miningIndex.html");
             // myTabbar.tabs("isoArea").attachURL("../dialogHtml/miningIndex.html");
            // myTabbar.tabs("a4").attachURL("../dialogHtml/miningIndex.html");
        }
        
       
    }

    ChartDialogPro.updta = function(params){
        if(params.seriesType ==='miningIndex'){
            this.miningIndexDialog = new this._miningIndexDialog(r=this.chart,params)
        }else if(params.seriesType ==='wellSymbol'){
            //console.log(params)
        }
    }
    
    hwchart.Dialog = ChartDialog
})