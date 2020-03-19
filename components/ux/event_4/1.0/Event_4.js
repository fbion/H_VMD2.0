Ext.define("vmd.ux.Event_4" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Event_4",
	title:"Panel",
	header:false,
	border:false,
	width:320,
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
			function eve_click_afterrender(sender) {
    eve_click.el.on('dblclick', function() {
        // alert('oneclick')
    })
}


			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"Approvl:",
				x:10,
				y:15
			},
			{
				xtype:"textfield",
				id:"eve_click",
				allowBlank:true,
				x:70,
				y:10,
				width:230,
				afterrender:"eve_click_afterrender",
				listeners:{
					vmdafterrender:eve_click_afterrender
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Event_4");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Event_4");
	}
})