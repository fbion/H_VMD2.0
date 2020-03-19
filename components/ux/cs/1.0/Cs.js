Ext.define("vmd.ux.CS" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.CS",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:600,
	layout:"fit",
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
				title:"Grid Panel",
				loadMask:true,
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.CS");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CS");
	}
})