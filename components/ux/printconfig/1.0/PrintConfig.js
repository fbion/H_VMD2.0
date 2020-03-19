Ext.define("vmd.ux.PrintConfig" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.PrintConfig",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:621,
	layout:"absolute",
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
			
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"打印预览：",
				x:10,
				y:10
			},
			{
				xtype:"checkbox",
				id:"print_printInner",
				fieldLabel:"Checkbox",
				boxLabel:"打印单元格内容",
				x:40,
				y:40
			},
			{
				xtype:"checkbox",
				id:"print_printBack",
				fieldLabel:"Checkbox",
				boxLabel:"打印单元格背景",
				x:40,
				y:70
			},
			{
				xtype:"checkbox",
				id:"print_exportBack",
				fieldLabel:"Checkbox",
				boxLabel:"导出单元格背景",
				x:40,
				y:100
			},
			{
				xtype:"label",
				id:"label1",
				text:"筛选：",
				x:10,
				y:140
			},
			{
				xtype:"checkbox",
				id:"print_sx",
				fieldLabel:"Checkbox",
				boxLabel:"筛选",
				x:40,
				y:170
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
//直接填写方法内容

var temp;
if(att == "print_printInner") {
    temp = print_printInner.checked;
} else if(att == "print_printBack") {
    temp = print_printBack.checked
} else if(att == "print_exportBack") {
    temp = print_exportBack.checked
} else if(att == "print_sx") {
    temp = print_sx.checked
}
return temp;
	}
		this.setInfo= function(info,cell){
//直接填写方法内容
if(info) {
    
    print_printInner.setValue(info.print_printInner.checked);
    print_printBack.setValue(info.print_printBack.checked);
    print_exportBack.setValue(info.print_exportBack.checked);
    print_sx.setValue(info.print_sx.checked)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.PrintConfig");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.PrintConfig");
	}
})