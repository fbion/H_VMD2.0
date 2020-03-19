Ext.define("vmd.ux.FP" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.FP",
	title:"Panel",
	header:false,
	border:false,
	width:296,
	height:488,
	layout:"absolute",
	afterrender:"FP_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.FP_afterrender(this)
}
	},
	uxCss:".b{    border: 1px solid #dddddd}",
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
			var page = this;
var hot = parent.sheetHot;

function selfSet(sheet) {
    var hot = sheet;
    var cell = hot.dealInvert()[0];
    if(hot.fpArray && hot.fpArray.length > 0) {
        var arr = hot.fpArray;
        for(var i = 0; i < arr.length; i++) {
            if(cell.sr == arr[i].sr && cell.sc == arr[i].sc && cell.er == arr[i].er && cell.ec == arr[i].ec) {
                seg_sliceName.setValue(arr[i].sliceName);
                seg_emptyCol.setValue(arr[i].emptyCol) ;
                seg_emptyRow.setValue(arr[i].emptyRow);
            }
        }
    }
}
//置空面板
function clearPanel() {
    // seg_fp.setValue(false)
    seg_sliceName.setValue('')
    seg_emptyCol.setValue(false)
    seg_emptyRow.setValue(false)
}
//启用
function allEnable() {
    seg_sliceName.enable()
    seg_emptyCol.enable()
    seg_emptyRow.enable()
}
//禁用
function allDisable() {
    seg_sliceName.disable()
    seg_emptyCol.disable()
    seg_emptyRow.disable()
}

function FP_afterrender(sender) {

}

function seg_emptyRow_check(sender,checked){
//111
}

function seg_emptyCol_check(sender,checked){
//222
}
			this.FP_afterrender=FP_afterrender;
		this.items=[
			{
				xtype:"checkbox",
				id:"seg_fp",
				fieldLabel:"Checkbox",
				boxLabel:"设置为分片",
				x:10,
				y:20,
				disabled:true,
				hidden:true
			},
			{
				xtype:"label",
				id:"label2",
				text:"分片名称：",
				x:10,
				y:15,
				height:20
			},
			{
				xtype:"textfield",
				id:"seg_sliceName",
				allowBlank:true,
				enableKeyEvents:true,
				x:70,
				y:10,
				style:"border: 1px solid #dddddd",
				width:200,
				disabled:true
			},
			{
				xtype:"checkbox",
				id:"seg_emptyRow",
				fieldLabel:"Checkbox",
				boxLabel:"空白行补全",
				x:10,
				y:45,
				disabled:true,
				check:"seg_emptyRow_check",
				listeners:{
					check:seg_emptyRow_check
				}
			},
			{
				xtype:"checkbox",
				id:"seg_emptyCol",
				fieldLabel:"Checkbox",
				boxLabel:"空白列补全",
				x:10,
				y:75,
				disabled:true,
				check:"seg_emptyCol_check",
				listeners:{
					check:seg_emptyCol_check
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setInfo= function(sheet){
selfSet(sheet)
	}
		this.allDisable= function(){
//直接填写方法内容
allDisable()
	}
		this.allEnable= function(){
allEnable()
	}
		this.clearPanel= function(){
clearPanel()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.FP");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FP");
	}
})