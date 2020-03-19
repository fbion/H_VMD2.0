Ext.define("vmd.ux.NodeBntGroup" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.NodeBntGroup",
	title:"Panel",
	header:false,
	border:false,
	width:185,
	height:32,
	layout:"absolute",
	uxCss:".imgBnt{    margin: 0 5px;}",
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

function hwImg_click(sender, e) {
    page.fireEvent('addClick', sender, e);
}

function hwImg1_click(sender, e) {
    page.fireEvent('editClick', sender, e);
}

function hwImg2_click(sender, e) {
    page.fireEvent('deleteClick', sender, e);
}

function hwImg3_click(sender, e) {
    page.fireEvent('moveUpClick', sender, e);
}

function hwImg4_click(sender, e) {
    page.fireEvent('moveDownClick', sender, e);
}
			this.items=[
			{
				xtype:"vmd.img",
				id:"hwImg",
				width:18,
				height:18,
				cls:"imgBnt",
				margins:"0 10 0 10",
				y:8,
				x:5,
				src:"/img/public/u144.png",
				click:"hwImg_click",
				listeners:{
					click:hwImg_click
				}
			},
			{
				xtype:"vmd.img",
				id:"hwImg1",
				width:18,
				height:18,
				cls:"imgBnt",
				margins:"0 5 0 5 ",
				y:8,
				x:40,
				src:"/img/public/u146.png",
				click:"hwImg1_click",
				listeners:{
					click:hwImg1_click
				}
			},
			{
				xtype:"vmd.img",
				id:"hwImg2",
				width:18,
				height:18,
				cls:"imgBnt",
				margins:"0 5  0 5",
				y:8,
				x:75,
				src:"/img/public/u148.png",
				click:"hwImg2_click",
				listeners:{
					click:hwImg2_click
				}
			},
			{
				xtype:"vmd.img",
				id:"hwImg3",
				width:18,
				height:18,
				cls:"imgBnt",
				margins:"0 5 0 0",
				y:8,
				x:110,
				src:"/img/public/u150.png",
				click:"hwImg3_click",
				listeners:{
					click:hwImg3_click
				}
			},
			{
				xtype:"vmd.img",
				id:"hwImg4",
				width:18,
				height:18,
				cls:"imgBnt",
				margins:"0 5 0 5",
				y:8,
				x:145,
				src:"/img/public/u152.png",
				click:"hwImg4_click",
				listeners:{
					click:hwImg4_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.NodeBntGroup");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NodeBntGroup");
	}
})