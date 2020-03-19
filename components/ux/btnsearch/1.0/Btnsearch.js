Ext.define("vmd.ux.Btnsearch" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Btnsearch",
	title:"Panel",
	header:false,
	border:false,
	width:80,
	height:32,
	layout:"absolute",
	uxCss:".btn{    color: white;    border-radius: 2px;    width: 80px;    height: 30px;    background-color: #4b89fc;    margin-left: 10px;}",
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
				xtype:"vmd.button",
				id:"button",
				text:"查询",
				type:"(none)",
				size:"small",
				x:-9,
				y:0,
				cls:"btn",
				width:80,
				height:30
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Btnsearch");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Btnsearch");
	}
})