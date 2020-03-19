Ext.define("vmd.ux.DropDownTree_Data" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DropDownTree_Data",
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
			
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"数据集：",
				x:30,
				y:15
			},
			{
				xtype:"vmd.comlist",
				id:"dataSet",
				width:200,
				height:270,
				x:80,
				y:10,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"myDisplayFiled",
				width:200,
				height:270,
				x:80,
				y:45,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"myFatherFiled",
				width:200,
				height:270,
				x:80,
				y:220,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"myNodeFiled",
				width:200,
				height:270,
				x:80,
				y:115,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"rootValue",
				width:200,
				height:270,
				x:80,
				y:150,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"rootNodeText",
				width:200,
				height:270,
				x:80,
				y:185,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"myValueFiled",
				width:200,
				height:270,
				x:80,
				y:80,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"label",
				id:"label1",
				text:"显示字段：",
				x:20,
				y:50
			},
			{
				xtype:"label",
				id:"label2",
				text:"父列字段：",
				x:20,
				y:225
			},
			{
				xtype:"label",
				id:"label3",
				text:"节点字段：",
				x:20,
				y:120
			},
			{
				xtype:"label",
				id:"label4",
				text:"根值：",
				x:40,
				y:155
			},
			{
				xtype:"label",
				id:"label5",
				text:"根节点文本：",
				x:10,
				y:190
			},
			{
				xtype:"label",
				id:"label6",
				text:"值字段：",
				x:30,
				y:85,
				height:20
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
var temp;
if(att=="dataSet"){
    temp = dataSet.getValue()
}else if(att=="myDisplayFiled"){
    temp = myDisplayFiled.getValue()
}else if (att=="myFatherFiled"){
    temp = myFatherFiled.getValue()
}else if(att=="myNodeFiled"){
    temp =myNodeFiled.getValue()
}else if(att=="rootNodeText"){
    temp = rootNodeText.getValue()
}else if(att=="rootValue"){
    temp = rootValue.getValue()
}else if(att=="myValueFiled"){
    temp = myValueFiled.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
if(info){
    dataSet.setValue(info.dataSet.value);
    myDisplayFiled.setValue(info.myDisplayFiled.value);
    myValueFiled.setValue(info.myValueFiled.value);
    myFatherFiled.setValue(info.myFatherFiled.value);
    myNodeFiled.setValue(info.myNodeFiled.value);
    rootValue.setValue(info.rootValue.value);
    rootNodeText.setValue(info.rootNodeText.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.DropDownTree_Data");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.DropDownTree_Data");
	}
})