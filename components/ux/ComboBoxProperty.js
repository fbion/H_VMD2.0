Ext.define("vmd.ux.ComboBoxProperty" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:'1.0',
	xtype:"vmd.ux.ComboBoxProperty",
	title:"Panel",
	header:false,
	border:false,
	width:452,
	height:661,
	layout:"fit",
	autoScroll:false,
	initComponent: function(){
		var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var data = [{
    id: 'dot',
    name: '逗号'
}, {
    id: 'semicolon',
    name: '分号'
}, {
    id: 'comma',
    name: '顿号'
}]
store.loadData(data);

function panel_afterrender(sender) {
    cmbComma.store = store;
    cmbComma.displayField = 'name';
    cmbComma.valueField = 'id'
}

function panel_beforerender(sender) {
    lblfgf.hide();
    cmbComma.hide();
}

function hwCheckbox3_check(sender, checked) {
    
    if(hwCheckbox3.checked) {
        lblfgf.show();
        cmbComma.show();
    } else {
        lblfgf.hide();
        cmbComma.hide();
    }
}

var storeType = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});
var dataType = [{
    id: 'select',
    name: '数据查询'
}, {
    id: 'userdefined',
    name: '自定义'
}]
storeType.loadData(dataType);

function panel1_afterrender(sender) {
    cmbDataType.store = storeType;
    cmbDataType.displayField = 'name';
    cmbDataType.valueField = 'id'
        //cmbDataType.setValue("select");
    panel4.hide();
}

function combo_afterrender(sender) {
    this.hide();
}

function button_click(sender) {
    combo.show();
}

function cmbDataType_change(sender) {
    if(cmbDataType.getValue() == "select") {
        panel3.show();
        panel4.hide();
    } else {
        panel3.hide();
        panel4.show();
    }
}

function hwTree_afterrender(sender) {
    var mytree = hwTree;
    mytree.tree.deleteChildItems(0);
    var treeJson = {
        id: 0,
        text: "我的模块",
        item: [{
            id: 1,
            text: "功能选择",
            item: [{
                id: 2,
                text: "报表操作",
                item: [{
                    id: "21",
                    text: "CellEditRefresh(刷新控制单元格是否可编辑)"
                }, {
                    id: "22",
                    text: "CellsValueRefresh(刷新单元格值)"
                }, {
                    id: "23",
                    text: "DataSetRefresh(刷新数据集)"
                }, {
                    id: "24",
                    text: "CellVisibleRefresh(刷新控制单元格是否可见)"
                }, {
                    id: "25",
                    text: "WindowClose(关闭窗体)"
                }]
            }, {
                id: 3,
                text: "脚本",
                item: [{
                    id: "31",
                    text: "JavaScript(JavaScript)"
                }]
            }]
        }]
    };
    mytree.tree.loadJSONObject(treeJson);
    mytree.tree.openAllItems(1);
}

function hwTree_doubleClick(sender, id) {
    var t = hwTree._idpull[id].label;
    
}
			this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs",
				activeTab:0,
				height:150,
				x:0,
				y:20,
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"属性",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panel_afterrender",
						beforerender:"panel_beforerender",
						listeners:{
							afterrender:panel_afterrender,
							beforerender:panel_beforerender
						},
						items:[
							{
								xtype:"checkbox",
								id:"hwCheckbox",
								fieldLabel:"Checkbox",
								boxLabel:"允许编辑",
								x:20,
								y:20,
								checked:true
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox1",
								fieldLabel:"Checkbox",
								boxLabel:"允许打印",
								x:20,
								y:50,
								checked:true
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox2",
								fieldLabel:"Checkbox",
								boxLabel:"单击触发",
								x:20,
								y:80
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox3",
								fieldLabel:"Checkbox",
								boxLabel:"多选",
								x:20,
								y:110,
								check:"hwCheckbox3_check",
								listeners:{
									check:hwCheckbox3_check
								}
							},
							{
								xtype:"label",
								id:"lblfgf",
								text:"分隔符：",
								x:90,
								y:114
							},
							{
								xtype:"vmd.combo",
								id:"cmbComma",
								width:150,
								x:140,
								y:110,
								hidden:false
							},
							{
								xtype:"label",
								id:"label1",
								text:"宽度：",
								x:20,
								y:150
							},
							{
								xtype:"numberfield",
								id:"hwNumber",
								fieldLabel:"Form Fields",
								x:70,
								y:150
							},
							{
								xtype:"label",
								id:"label2",
								text:"%",
								x:220,
								y:155
							},
							{
								xtype:"label",
								id:"label3",
								text:"校验",
								x:20,
								y:190
							},
							{
								xtype:"checkbox",
								id:"hwCheckbox4",
								fieldLabel:"Checkbox",
								boxLabel:"允许为空",
								x:40,
								y:220,
								checked:true
							},
							{
								xtype:"label",
								id:"label4",
								text:"提示信息：",
								x:122,
								y:224,
								height:20
							},
							{
								xtype:"textfield",
								id:"hwText",
								allowBlank:true,
								x:190,
								y:220
							}
						]
					},
					{
						xtype:"panel",
						id:"panel1",
						title:"数据",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						afterrender:"panel1_afterrender",
						listeners:{
							afterrender:panel1_afterrender
						},
						items:[
							{
								xtype:"label",
								id:"label5",
								text:"类型设置：",
								x:30,
								y:20
							},
							{
								xtype:"vmd.combo",
								id:"cmbDataType",
								width:178,
								x:100,
								y:14,
								change:"cmbDataType_change",
								firstSelected:true,
								listeners:{
									change:cmbDataType_change
								}
							},
							{
								xtype:"panel",
								id:"panel3",
								title:"Panel",
								header:false,
								border:false,
								height:580,
								x:0,
								y:50,
								layout:"absolute",
								items:[
									{
										xtype:"label",
										id:"label",
										text:"数据集：",
										height:20,
										x:40,
										y:20
									},
									{
										xtype:"vmd.combo",
										id:"cmbDs",
										width:178,
										x:100,
										y:10
									},
									{
										xtype:"label",
										id:"label6",
										text:"保存字段：",
										x:30,
										y:60
									},
									{
										xtype:"vmd.combo",
										id:"cmbSaveField",
										width:178,
										x:100,
										y:20
									},
									{
										xtype:"label",
										id:"label7",
										text:"显示字段：",
										x:30,
										y:100
									},
									{
										xtype:"vmd.combo",
										id:"cmbShowField",
										width:178,
										x:100,
										y:30
									},
									{
										xtype:"label",
										id:"label8",
										text:"下拉显示列：",
										x:20,
										y:140
									},
									{
										xtype:"textfield",
										id:"txtShowField",
										allowBlank:true,
										x:100,
										y:140
									},
									{
										xtype:"label",
										id:"label9",
										text:"过滤条件：",
										x:30,
										y:180
									},
									{
										xtype:"textfield",
										id:"hwText1",
										allowBlank:true,
										x:100,
										y:176,
										width:150
									},
									{
										xtype:"vmd.button",
										id:"button1",
										text:"...",
										type:"(none)",
										size:"mini",
										x:250,
										y:142,
										width:30
									},
									{
										xtype:"vmd.button",
										id:"button2",
										text:"...",
										type:"(none)",
										size:"mini",
										x:250,
										y:180,
										width:30
									}
								]
							},
							{
								xtype:"panel",
								id:"panel4",
								title:"Panel",
								header:false,
								border:false,
								height:570,
								x:0,
								y:50,
								layout:"absolute"
							}
						]
					},
					{
						xtype:"panel",
						id:"panel2",
						title:"事件",
						header:true,
						border:true,
						height:100,
						layout:"absolute",
						autoScroll:true,
						items:[
							{
								xtype:"vmd.tree",
								id:"hwTree",
								skin:"material",
								width:450,
								height:200,
								isdesign:false,
								x:0,
								y:0,
								afterrender:"hwTree_afterrender",
								doubleClick:"hwTree_doubleClick",
								listeners:{
									afterrender:hwTree_afterrender,
									doubleClick:hwTree_doubleClick
								}
							},
							{
								xtype:"panel",
								id:"panel5",
								title:"事件定义",
								header:true,
								border:true,
								height:210,
								x:0,
								y:200,
								layout:"absolute",
								collapsible:false,
								width:450,
								items:[
									{
										xtype:"vmd.dataview",
										id:"hwDataView",
										width:448,
										height:168,
										itemSelector:"li.info",
										overClass:"info-hover",
										selectedClass:"x-view-selected",
										singleSelect:true,
										multiSelect:false,
										autoScroll:true,
										tpl:"<ul>    <tpl for=\".\">        <li class=\"info\" >            <h4>{desc}</h4></li>    </tpl></ul>",
										data:"var data = [{    \"id\": 1,    \"picname\": \"\",    \"name\": \"\",    \"desc\": \"dddd \"}, {    \"id\": 2,    \"picname\": \"\",    \"name\": \"\",    \"desc\": \"\"}, {    \"id\": 3,    \"picname\": \"\",    \"name\": \"\",    \"desc\": \"\"}, {    \"id\": 4,    \"picname\": \"\",    \"name\": \"\",    \"desc\": \"\"}, {    \"id\": 5,    \"picname\": \"\",    \"name\": \"\",    \"desc\": \"\"}, {    \"id\": 6,    \"picname\": \"\",    \"name\": \"\",    \"desc\": \"\"}];return data;",
										x:0,
										y:20,
										style:"border: 1px;    border-color: #f03;"
									},
									{
										xtype:"vmd.button",
										id:"button",
										text:"删除",
										type:"(none)",
										size:"mini",
										x:390,
										y:0,
										height:20,
										width:40
									}
								]
							},
							{
								xtype:"panel",
								id:"panel6",
								title:"功能属性",
								header:true,
								border:true,
								height:210,
								x:0,
								y:410,
								width:450
							}
						]
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
	}
})