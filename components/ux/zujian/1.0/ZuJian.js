Ext.define("vmd.ux.ZuJian" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ZuJian",
	title:"Panel",
	header:false,
	border:false,
	width:602,
	height:356,
	layout:"absolute",
	btntext:"button",
	btnsize:"small",
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

function button_click(sender, e) {
    button1.setText('按钮2');
    page.fireEvent('btnclick', button);
    label.setText("55556666")
}

function button1_click(sender, e) {
    button.setText('按钮1');
    page.fireEvent('btn2click', button);
    label.setText("77778888")
}
			this.items=[
			{
				xtype:"vmd.button",
				id:"button",
				text:this.btntext,
				type:"(none)",
				size:this.btnsize,
				x:70,
				y:230,
				click:"button_click",
				listeners:{
					click:button_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:"button",
				type:"(none)",
				size:"small",
				x:340,
				y:230,
				click:"button1_click",
				listeners:{
					click:button1_click
				}
			},
			{
				xtype:"label",
				id:"label",
				text:"lable:",
				x:70,
				y:40,
				width:340,
				height:150
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setbtntext= function(text){
//直接填写方法内容
button.setText(text)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ZuJian");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ZuJian");
	}
})