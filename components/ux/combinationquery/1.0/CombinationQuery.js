Ext.define("vmd.ux.CombinationQuery" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.CombinationQuery",
	layoutConfig:{
		pack:"center",
		align:"middle"
	},
	title:"Panel",
	header:false,
	border:false,
	width:1185,
	height:77,
	layout:"hbox",
	autoScroll:false,
	label_text1:"combo_text1",
	label_hidden2:false,
	label_text2:"combo_text2",
	label_hidden3:false,
	label_text3:"combo_text3",
	rq_label_hidden2:false,
	rq_label_text2:"——",
	rq_label_text:"rq",
	rq_hwDate_format1:"Y-m-d",
	rq_hwDate_format2:"Y-m-d",
	button_text3:"button",
	button_text2:"button",
	button_text1:"button",
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
    page.fireEvent('button1_click', button)
}

function button1_click(sender, e) {
    page.fireEvent('button2_click', button1)
}

function button2_click(sender, e) {
    page.fireEvent('button3_click', button2)
}

function combo_change(sender) {
    page.fireEvent('combo_change', combo);
}

function combo1_change(sender) {
    page.fireEvent('combo1_change', combo1);
}

function combo2_change(sender) {
    page.fireEvent('combo2_change', combo2);
}
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:this.label_text1,
				x:120,
				y:100,
				margins:this.label_margin1,
				hidden:this.label_hidden
			},
			{
				xtype:"vmd.combo",
				id:"combo",
				width:150,
				x:150,
				y:90,
				change:"combo_change",
				listeners:{
					change:combo_change
				},
				margins:this.combo_margin1,
				hidden:this.combo_hidden1,
				valueField:this.combo_valueField1,
				displayField:this.combo_displayField1,
				store:this.combo_store1
			},
			{
				xtype:"label",
				id:"label1",
				text:this.label_text2,
				x:120,
				y:100,
				hidden:this.label_hidden2,
				disabled:false,
				margins:this.label_margin2
			},
			{
				xtype:"vmd.combo",
				id:"combo1",
				width:150,
				x:150,
				y:90,
				change:"combo1_change",
				listeners:{
					change:combo1_change
				},
				margins:this.combo_margin2,
				hidden:this.combo_hidden2,
				valueField:this.combo_valueField2,
				displayField:this.combo_displayField2,
				store:this.combo_store2
			},
			{
				xtype:"label",
				id:"label2",
				text:this.label_text3,
				x:120,
				y:100,
				hidden:this.label_hidden3,
				disabled:false,
				margins:this.label_margin3
			},
			{
				xtype:"vmd.combo",
				id:"combo2",
				width:150,
				x:150,
				y:90,
				change:"combo2_change",
				listeners:{
					change:combo2_change
				},
				displayField:this.combo_displayField3,
				valueField:this.combo_valueField3,
				store:this.combo_store3,
				hidden:this.combo_hidden3,
				margins:this.combo_margin3
			},
			{
				xtype:"label",
				id:"label3",
				text:this.rq_label_text,
				hidden:this.rq_label_hidden1,
				margins:this.rq_label_margin1
			},
			{
				xtype:"datefield",
				id:"hwDate",
				format:this.rq_hwDate_format1,
				showToday:true,
				allowBlank:true,
				defaultValue:"",
				hidden:this.rq_hwDate_hidden1,
				margins:this.rq_hwDate_margin1,
				hideTrigger:this.rq_hwDate_hideTrigger1
			},
			{
				xtype:"label",
				id:"label4",
				text:this.rq_label_text2,
				hidden:this.rq_label_hidden2,
				margins:this.rq_label_margin2
			},
			{
				xtype:"datefield",
				id:"hwDate1",
				format:this.rq_hwDate_format2,
				showToday:true,
				allowBlank:true,
				defaultValue:"",
				hidden:this.rq_hwDate_hidden2,
				margins:this.rq_hwDate_margin2,
				hideTrigger:this.rq_hwDate_hideTrigger2
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:this.button_text1,
				type:"(none)",
				size:"small",
				click:"button_click",
				listeners:{
					click:button_click
				},
				margins:this.button_margin1,
				hidden:this.button_hidden1
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:this.button_text2,
				type:"(none)",
				size:"small",
				click:"button1_click",
				listeners:{
					click:button1_click
				},
				margins:this.button_margin2,
				hidden:this.button_hidden2
			},
			{
				xtype:"vmd.button",
				id:"button2",
				text:this.button_text3,
				type:"(none)",
				size:"small",
				click:"button2_click",
				listeners:{
					click:button2_click
				},
				margins:this.button_margin3,
				hidden:this.button_hidden3
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.combo1text= function(){
//直接填写方法内容
return combo.getText();
	}
		this.combo1value= function(){
//直接填写方法内容
return combo.getValue();
	}
		this.combo2value= function(){
//直接填写方法内容
return combo1.getValue();
	}
		this.combo2text= function(){
//直接填写方法内容
return combo1.getText();
	}
		this.combo3text= function(){
//直接填写方法内容
return combo2.getText();
	}
		this.combo3value= function(){
//直接填写方法内容
return combo2.getValue();
	}
		this.rqvalue= function(){
//直接填写方法内容
return hwDate.getValue(true);
	}
		this.rq1value= function(){
//直接填写方法内容
return hwDate1.getValue(true);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.CombinationQuery");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CombinationQuery");
	}
})