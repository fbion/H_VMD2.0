Ext.define("vmd.ux.LBSZ" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.LBSZ",
	title:"Panel",
	header:false,
	border:false,
	width:340,
	height:135,
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
				text:"轮播频率设置：",
				x:30,
				y:30,
				style:"font-size: 15px;"
			},
			{
				xtype:"vmd.combo",
				id:"combo",
				width:150,
				x:140,
				y:20,
				readOnly:true
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"确定",
				type:"(none)",
				size:"small",
				x:80,
				y:90
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:"取消",
				type:"(none)",
				size:"small",
				x:190,
				y:90
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.LBSZ");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.LBSZ");
	}
})