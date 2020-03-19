Ext.define("vmd.ux.TabComponents" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.TabComponents",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:350,
	layout:"absolute",
	tabText:"Tab1",
	tab2Text:"Tab2",
	overflow:true,
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

function MyTabs_afterrender(sender) {
    var el = MyTabs.el.dom.id;
    vmd("#"+el+"").after("<li class='x-tab-edge' style='width:80px;' id='eweu'><a class='x-tab-right' href='#' onclick='more();'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;'>+更多</span></span></a></li>");
}

window.more = function() {
    alert(1212);
}
			this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:1,
				height:350,
				width:600,
				x:-2,
				y:0,
				afterrender:"MyTabs_afterrender",
				listeners:{
					vmdafterrender:MyTabs_afterrender
				},
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:this.tabText,
						header:true,
						border:true,
						height:100,
						autoScroll:this.overflow
					},
					{
						xtype:"panel",
						id:"panel1",
						title:this.tab2Text,
						header:true,
						border:true,
						height:100,
						autoScroll:true
					}
				],
				btn:this.credBtn
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.TabComponents");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.TabComponents");
	}
})