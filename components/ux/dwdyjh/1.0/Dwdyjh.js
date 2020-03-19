Ext.define("vmd.ux.Dwdyjh" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Dwdyjh",
	layoutConfig:{
		align:"middle",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:559,
	height:45,
	layout:"hbox",
	afterrender:"Dwdyjh_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Dwdyjh_afterrender(this)
}
	},
	dyname:"单元:",
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
			function Dwdyjh_afterrender(sender) {
    //控制隐藏显示
    if(!combo.isdyshow) {
        combo1.hide();
        label1.hide()
    }
    if(!combo.isjhshow) {
        combo2.hide();
        label2.hide()
    }




}

function combo_change(sender) {

    var value = combo.getValue();
    //刷新单元
    if(combo.isdyshow) {
        
        combo1.setValue('');
        var store1 = combo1.store;
        //alert(combo1.queryfiled)

        var queryfiled = combo1.queryfiled
        if(!store1 && !queryfiled) return;
        store1.filter(queryfiled, value)


    }

}

function combo1_change(sender) {

    var value = combo1.getValue();
    if(combo.isjhshow) {
        
        combo2.setValue('');
        var store1 = combo2.store;
        //alert(combo1.queryfiled)

        var queryfiled = combo2.queryfiled
        if(!store1 && !queryfiled) return;
        store1.filter(queryfiled, value)


    }
}
			this.Dwdyjh_afterrender=Dwdyjh_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:"单位："
			},
			{
				xtype:"vmd.combo",
				id:"combo",
				width:150,
				change:"combo_change",
				listeners:{
					change:combo_change
				},
				store:this.dwstore,
				valueField:this.dwvaluefield,
				displayField:this.dwdisplayfield,
				isdyshow:this.isdyshow,
				isjhshow:this.isjhshow
			},
			{
				xtype:"label",
				id:"label1",
				text:this.dyname
			},
			{
				xtype:"vmd.combo",
				id:"combo1",
				width:150,
				change:"combo1_change",
				listeners:{
					change:combo1_change
				},
				store:this.dystore,
				valueField:this.dyvaluefield,
				displayField:this.dydisplayfield,
				queryfiled:this.dywhere
			},
			{
				xtype:"label",
				id:"label2",
				text:"井号:"
			},
			{
				xtype:"vmd.combo",
				id:"combo2",
				width:150,
				store:this.jhstore,
				displayField:this.jhdisplayfield,
				valueField:this.jhvaluefield,
				queryfiled:this.jhwhere
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getdwvalue= function(){
//直接填写方法内容
return combo.getValue();
	}
		this.getdyvalue= function(){
//直接填写方法内容
return combo1.getValue();
	}
		this.getjhvalue= function(){
//直接填写方法内容
return combo2.getValue();
	}
		this.getdwtext= function(){
//直接填写方法内容

return combo.getText()
	}
		this.getdytext= function(){
//直接填写方法内容

return combo1.getText()
	}
		this.getjhtext= function(){
//直接填写方法内容

return combo2.getText()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Dwdyjh");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Dwdyjh");
	}
})