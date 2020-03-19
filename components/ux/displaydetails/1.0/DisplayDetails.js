Ext.define("vmd.ux.DisplayDetails" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DisplayDetails",
	title:"Panel",
	header:false,
	border:false,
	width:900,
	layout:"auto",
	autoHeight:true,
	afterrender:"DisplayDetails_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.DisplayDetails_afterrender(this)
}
	},
	uxCss:".x-html-editor-wrap {    border-color:#fff;    background-color: #fff;    }.backg{     background-color: #c2eff9;}",
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
window.DataBinding = function(title, content, fbr, fbsj) {
    /*panel1.html=content;*/
    $('#coner').append(content);
    hwText.setValue(title);
    hwText1.setValue(fbr);
    hwText2.setValue(fbsj);
    page.fireEvent('loadText', DisplayDetails, 'test');
}


function DisplayDetails_afterrender(sender) {
   var id=panel2.el.dom.childNodes[0].childNodes[0].childNodes[0].id;
   var ids=panel3.el.dom.childNodes[0].childNodes[0].childNodes[0].id;
   var idd=panel4.el.dom.childNodes[0].childNodes[0].childNodes[0].id;
   $('#'+id)[0].style.backgroundColor= 'rgba(218, 236, 243, 0.48)';
   $('#'+ids)[0].style.backgroundColor= 'rgba(218, 236, 243, 0.48)';
   $('#'+idd)[0].style.backgroundColor= 'rgba(218, 236, 243, 0.48)';
}
			this.DisplayDetails_afterrender=DisplayDetails_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				layoutConfig:{
					align:"center",
					pack:"center"
				},
				title:"Panel",
				header:false,
				border:true,
				height:59,
				width:813,
				layout:"vbox",
				style:"margin: 0 auto;",
				items:[
					{
						xtype:"textfield",
						id:"hwText",
						allowBlank:true,
						enableKeyEvents:true,
						width:649,
						style:"text-align: center;    border: 0px solid;    font-size: 20px;",
						readOnly:true
					}
				]
			},
			{
				xtype:"panel",
				id:"panel2",
				layoutConfig:{
					align:"middle",
					pack:"center"
				},
				title:"Panel",
				header:false,
				border:true,
				height:35,
				width:880,
				margins:"0 0 10 0",
				style:"margin: 0 auto;",
				layout:"hbox",
				cls:"backg",
				items:[
					{
						xtype:"panel",
						id:"panel3",
						layoutConfig:{
							align:"middle",
							pack:"end"
						},
						title:"Panel",
						header:false,
						border:false,
						height:36,
						width:260,
						layout:"hbox",
						style:"background-color: #c2eff9;",
						items:[
							{
								xtype:"label",
								id:"label",
								text:"发布人:",
								style:"font-size:14px;"
							},
							{
								xtype:"textfield",
								id:"hwText1",
								allowBlank:true,
								enableKeyEvents:true,
								margins:"0 0 0 6",
								readOnly:true,
								style:"border: 0px solid;    background-color: rgba(218, 236, 243, 0.12);    font-size: 14px;",
								width:172
							}
						]
					},
					{
						xtype:"panel",
						id:"panel4",
						layoutConfig:{
							align:"middle",
							pack:"start"
						},
						title:"Panel",
						header:false,
						border:false,
						height:36,
						width:260,
						layout:"hbox",
						style:"background-color: #c2eff9;",
						items:[
							{
								xtype:"label",
								id:"label1",
								text:"发布时间:",
								style:"font-size:14px;"
							},
							{
								xtype:"textfield",
								id:"hwText2",
								allowBlank:true,
								enableKeyEvents:true,
								margins:"0 0 0 6",
								style:"border: 0px solid;    background-color: rgba(218, 236, 243, 0.12);    font-size: 14px;",
								readOnly:true,
								width:149
							}
						]
					}
				]
			},
			{
				xtype:"panel",
				id:"panel1",
				title:"Panel",
				header:false,
				border:true,
				width:840,
				style:"margin-top: 20px;    margin: 0 auto;",
				layout:"fit",
				autoHeight:false,
				html:"<div id='coner' style=\"margin-top:20px;border: 0px solid #efefef;padding:4px\"></div>"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.DataBindingFun= function(title,content,fbr,fbsj){
//直接填写方法内容
DataBinding(title,content,fbr,fbsj);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.DisplayDetails");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DisplayDetails");
	}
})