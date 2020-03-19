Ext.define("vmd.ux.UploadComponentData" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.UploadComponentData",
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
				x:10,
				y:15
			},
			{
				xtype:"label",
				id:"label1",
				text:"路径：",
				x:20,
				y:50
			},
			{
				xtype:"label",
				id:"label2",
				text:"名称：",
				x:20,
				y:85
			},
			{
				xtype:"label",
				id:"label3",
				text:"大小：",
				x:20,
				y:120
			},
			{
				xtype:"label",
				id:"label4",
				text:"类型：",
				x:20,
				y:155
			},
			{
				xtype:"label",
				id:"label5",
				text:"文档ID：",
				x:6,
				y:190
			},
			{
				xtype:"vmd.comlist",
				id:"dataSet",
				width:220,
				height:270,
				x:60,
				y:10,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"dataPath",
				width:220,
				height:270,
				x:60,
				y:45,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"dataName",
				width:220,
				height:270,
				x:60,
				y:80,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"dataSize",
				width:220,
				height:270,
				x:60,
				y:115,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"dataType",
				width:220,
				height:270,
				x:60,
				y:150,
				style:"border: 1px solid #dddddd"
			},
			{
				xtype:"vmd.comlist",
				id:"dataId",
				width:220,
				height:270,
				x:60,
				y:185,
				style:"border: 1px solid #dddddd"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getInfo= function(att){
var temp;
if(att == "dataId") {
    temp = dataId.getValue()
} else if(att == "dataName") {
    temp = dataName.getValue()
} else if(att == "dataPath") {
    temp = dataPath.getValue()
} else if(att == "dataSet") {
    temp = dataSet.getValue()
} else if(att == "dataSize") {
    temp = dataSize.getValue()
} else if(att == "dataType") {
    temp = dataType.getValue()
}
return temp;
	}
		this.setInfo= function(info,cell){
if(info){
    dataId.setValue(info.dataId.value);
    dataName.setValue(info.dataName.value);
    dataPath.setValue(info.dataPath.value);
    dataSet.setValue(info.dataSet.value);
    dataSize.setValue(info.dataSize.value);
    dataType.setValue(info.dataType.value)
}
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.UploadComponentData");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.UploadComponentData");
	}
})