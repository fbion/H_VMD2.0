Ext.define("vmd.ux.LunBo_Time" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.LunBo_Time",
	title:"Panel",
	header:false,
	border:false,
	width:58,
	height:26,
	layout:"absolute",
	uxCss:" .x-form-text.x-form-focus{height:21px;border-bottom:0px !important;} ",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			var me = this;
var i = 1;

//轮播加
function btn_lb_up_click(sender) {
    i=hwNumber_lb.getValue();
    if(i >= 30) {
        return;
    } else {
        i++;
        hwNumber_lb.setValue(i);
    }
}

//轮播减
function btn_lb_down_click(sender) {
    i=hwNumber_lb.getValue();
 
    if(i <= 1) {
        return;
    } else {
       // i=lb_val;
        i--;
        hwNumber_lb.setValue(i);
    }
}
//设置 控件的初始值
function hwNumber_lb_afterrender(sender){
//hwNumber_lb.setValue("1");
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:58,
				height:26,
				x:0,
				y:0,
				layout:"absolute",
				items:[
					{
						xtype:"numberfield",
						id:"hwNumber_lb",
						allowDecimals:true,
						allowNegative:true,
						decimalPrecision:2,
						allowBlank:true,
						x:0,
						y:0,
						width:40,
						minValue:1,
						minText:"1",
						maxText:"10",
						maxValue:30,
						maxLength:2,
						maxLengthText:"2",
						afterrender:"hwNumber_lb_afterrender",
						readOnly:true,
						listeners:{
							vmdafterrender:hwNumber_lb_afterrender
						}
					},
					{
						xtype:"vmd.img",
						id:"btn_lb_up",
						width:13,
						height:13,
						x:40,
						y:0,
						src:"/img/public/轮播-up.png",
						click:"btn_lb_up_click",
						listeners:{
							click:btn_lb_up_click
						}
					},
					{
						xtype:"vmd.img",
						id:"btn_lb_down",
						width:13,
						height:13,
						x:40,
						y:10,
						src:"/img/public/轮播-down.png",
						click:"btn_lb_down_click",
						listeners:{
							click:btn_lb_down_click
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.get_val= function(){
//直接填写方法内容
return hwNumber_lb.getValue();
	}
		this.set_val= function(val){
//直接填写方法内容
hwNumber_lb.setValue(val)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.LunBo_Time");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.LunBo_Time");
	}
})