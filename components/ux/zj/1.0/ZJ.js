Ext.define("vmd.ux.ZJ" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ZJ",
	title:"Panel",
	header:false,
	border:false,
	width:317,
	height:172,
	layout:"absolute",
	btntext:"测试1",
	btnsize:"small",
	btn1text:"测试2",
	btn1size:"small",
	labeltext:"测试3",
	uxCss:".ad{    color:red}",
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
			var page=this;

function button_click(sender, e) {
    button1.setText('按钮2');
  label.setText("55556666");
  //设置按钮1的事件回调

page.fireEvent('btnclick',button);

}

function button1_click(sender, e) {
    button.setText('按钮1');
  label.setText("77778888");
  //设置按钮2的事件回调

page.fireEvent('btn1click',button1);
}
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:this.labeltext,
				x:90,
				y:30,
				style:"font-size: 30PX;    color: RED",
				width:120,
				height:40
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:this.btntext,
				type:"(none)",
				size:this.btnsize,
				x:40,
				y:90,
				click:"button_click",
				style:"font-size: 30PX;    color: RED",
				listeners:{
					click:button_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:this.btn1text,
				type:"(none)",
				size:this.btn1size,
				x:180,
				y:90,
				click:"button1_click",
				style:"font-size: 30PX;    color: GREEN",
				cls:"ad",
				listeners:{
					click:button1_click
				}
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
		this.setbtn1text= function(text){
//直接填写方法内容
button1.setText(text)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ZJ");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ZJ");
	}
})