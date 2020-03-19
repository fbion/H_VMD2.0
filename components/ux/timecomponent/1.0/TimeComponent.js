Ext.define("vmd.ux.TimeComponent" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.TimeComponent",
	title:"Panel",
	header:false,
	border:false,
	width:1210,
	height:350,
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
				xtype:"grid",
				id:"MyGrid",
				title:"任务运行监控",
				loadMask:true,
				x:0,
				y:10,
				height:325,
				width:1210,
				columns:[
					{
						xtype:"gridcolumn",
						header:"Column 1",
						sortable:true,
						resizable:true,
						dataIndex:"data1",
						width:100
					},
					{
						xtype:"gridcolumn",
						header:"Column 2",
						sortable:true,
						resizable:true,
						dataIndex:"data2",
						width:100
					},
					{
						xtype:"gridcolumn",
						header:"Column 3",
						sortable:true,
						resizable:true,
						dataIndex:"data3",
						width:100
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.TimeComponent");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TimeComponent");
	}
})