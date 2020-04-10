Ext.define("vmd.ux.Editor" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Editor",
	layoutConfig:{
		align:"center",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:855,
	height:522,
	layout:"vbox",
	afterrender:"Editor_afterrender",
	autoScroll:false,
	style:"overflow: hidden;",
	listeners:{
		vmdafterrender:function(){
	this.Editor_afterrender(this)
}
	},
	uxCss:".x-html-editor-wrap {    border-color: #ddd;    background-color: #fff;    border: 1px solid  #ddd;}",
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

function Editor_afterrender(sender) {
    hwEditor.getToolbar().hide();
    hwText.el.setStyle('font-size', hwText.fonSize + "px");
    hwText.el.setStyle('color', hwText.fontColor);
    hwText.el.setStyle('font-family', hwText.fontFamily + "px");
    hwText.el.setStyle('font-weight', hwText.fontWeight);
}


//获取编辑器数据
function getEditor() {
    
    var title = hwText.getValue();
    var content = hwEditor.getValue();
    param = {
        title: title,
        content: content
    }
    return param;
}


function hwEditor_afterrender(sender) {
    var et = panel1.el.dom.childNodes[0].childNodes[0].childNodes[0].id;
    $('#' + et + '').css('height', '460px');
    var el = panel1.el.dom.childNodes[0].childNodes[0].id;
    $('#' + el + '').mouseenter(function() {
        hwEditor.getToolbar().show();
    });
    //鼠标移出
    $('#' + el + '').mouseleave(function() {
        hwEditor.getToolbar().hide();
        hwEditor.el.dom
    });
     page.fireEvent('loadText', hwEditor, 'test');
}

window.setEditors = function(title, text) {
    hwText.setValue(title);
    //hwEditor.el.dom.innerHTML = text;
    hwEditor.setValue(text);
    
}
			this.Editor_afterrender=Editor_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				layoutConfig:{
					align:"middle",
					pack:"center"
				},
				title:"Panel",
				header:false,
				border:true,
				height:50,
				x:0,
				y:0,
				layout:"hbox",
				width:840,
				items:[
					{
						xtype:"label",
						id:"label",
						text:"*",
						style:"font-size:16px;color: red;"
					},
					{
						xtype:"textfield",
						id:"hwText",
						allowBlank:false,
						enableKeyEvents:true,
						width:718,
						msgTarget:"qtip",
						margins:"0 0 0 6",
						style:"border: 0px solid;    text-align: center;",
						emptyText:"请输入标题！",
						fonSize:this.fonSize,
						fontFamily:this.TitleFontFamily,
						fontColor:this.TitleFontColor,
						fontWeight:this.TitleFontWeight
					}
				]
			},
			{
				xtype:"panel",
				id:"panel1",
				title:"Panel",
				header:false,
				border:true,
				height:470,
				width:840,
				layout:"fit",
				padding:"5",
				items:[
					{
						xtype:"htmleditor",
						id:"hwEditor",
						fieldLabel:"Html Editor",
						height:460,
						width:300,
						enableAlignments:true,
						enableColors:true,
						enableFont:true,
						enableFontSize:true,
						enableFormat:true,
						enableLinks:true,
						enableLists:true,
						enableSourceEdit:true,
						afterrender:"hwEditor_afterrender",
						listeners:{
							vmdafterrender:hwEditor_afterrender
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getEditorData= function(){
//直接填写方法内容
getEditor();
return param;
	}
		this.setEditor= function(param,param1){
//直接填写方法内容
setEditors(param,param1);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Editor");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Editor");
	}
})