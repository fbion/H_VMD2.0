Ext.define("vmd.ux.Evars" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Evars",
	title:"Panel",
	header:false,
	border:false,
	width:408,
	height:600,
	layout:"fit",
	afterrender:"Evars_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Evars_afterrender(this)
}
	},
	uxCss:".x-grid3-header {    background: #f5f9fc;    border-top: 1px solid;    border-bottom: 1px solid;    border-top-color: #ededed;    border-bottom-color: #ededed;}.x-grid3-row td {    font-size: 14px;    color:#5f5f5f;    border-right: 1px solid;    border-right-color: #ededed;    padding-left: 0;}.x-grid3-hd-row td {    font-size: 14px;    border-right: 0;    border-left:1px solid;    border-left-color:#ededed;}.x-grid3-row {    border-right: 0 solid;}   /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/::-webkit-scrollbar{    width: 5px;    height: 16px;    background-color: white;} /*定义滚动条轨道 内阴影+圆角*/::-webkit-scrollbar-track{    -webkit-box-shadow: inset 0 0 6px white;    border-radius: 5px;    background-color: white;} /*定义滑块 内阴影+圆角*/::-webkit-scrollbar-thumb{    border-radius: 3px;    -webkit-box-shadow: inset 0 0 4px #9b9b9b;    background-color: #9b9b9b;}",
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
			 var selProject_id = "";
 // 创建数据集。   系统变量的默认数据
 //  var gridData = [{
 //      id: vmd.getGuid(),
 //      projectid: "",
 //      login: vmd.getUserId(),
 //      varname: "login",
 //      varvalue: "",
 //      remark: "用户名信息",
 //      type: "0"
 //  }, {
 //      id: vmd.getGuid(),
 //      projectid: "",
 //      login: vmd.getUserId(),
 //      varname: "userid",
 //      varvalue: "",
 //      remark: "用户id信息",
 //      type: "0"
 //  }, {
 //      id: vmd.getGuid(),
 //      projectid: "",
 //      login: vmd.getUserId(),
 //      varname: "ip",
 //      varvalue: "",
 //      remark: "ip地址信息",
 //      type: "0"
 //  }];

 //  var gridstore = new vmd.data.Store({
 //      data: gridData,
 //      fields: ['id', 'projectid', 'login', 'varname', 'varvalue', 'remark', 'type']
 //  });


 function editEVar(record, nameonlyread, callback) {
     var varname = record.get("varname")
     var varvalue = record.get("varvalue")
     var remark = record.get("remark")
     //创建一个form，填写name，备注
     var form = new Ext.form.FormPanel({
         labelWidth: 40,
         labelAlign: "left",
         bodyStyle: "padding: 10px",
         border: false,
         items: [{
             id: 'varname',
             name: 'varname',
             xtype: "textfield",
             fieldLabel: "变量名",
             allowBlank: false,
             anchor: "100%",
             value: this.valueName,
             readOnly: nameonlyread,
             emptyText: "请输入变量名称"
         }, {
             id: 'varvalue',
             name: 'varvalue',
             xtype: "textfield",
             fieldLabel: "变量值",
             anchor: "100%",
             value: this.valueName
         }, {
             id: 'remark',
             xtype: "textarea",
             allowBlank: true,
             name: 'remark',
             anchor: "100%",
             fieldLabel: "备注"
         }]
     })
     var win = new Ext.Window({
         width: 350,
         height: 250,
         title: '变量定义',
         hidden: false,
         layout: "fit",
         border: false,
         modal: true,
         items: form,
         fbar: [{
             text: '确定',
             handler: function() {
                 if(form.getForm().isValid()) {

                     var values = form.form.getValues()
                     record.set("varname", values.varname)
                     record.set("varvalue", values.varvalue)
                     record.set("remark", values.remark)
                     if(callback)
                         callback(record)
                     // changeEVar(values.varname, values.varvalue, values.remark, function() {
                     win.close()
                     //})
                 }
             }
         }, {
             text: '取消',
             handler: function() {
                 win.close()
             }
         }]
     });
     win.show()
     form.form.setValues({
         varname: varname,
         varvalue: varvalue,
         remark: remark
     })
 }

 function changeEVar(varname, varvalue, remark, callback) {
     //MyGrid1.store.
 }






 function MyGrid1_beforerender(sender) {
     // 设置ID为3的列宽度填满容器剩余宽度
     MyGrid1.autoExpandColumn = 2;
 }

 function MyGrid_beforerender(sender) {
     //
     // 设置ID为3的列宽度填满容器剩余宽度
     MyGrid.autoExpandColumn = 2;
     //MyGrid.store = gridstore;
     //
 }

 function MyGrid_afterrender(sender) {}



 function MyGrid_celldblclick(sender, rowIndex, columnIndex, e) {
     var rowrecord = MyGrid.store.getAt(rowIndex);
     if(rowrecord.data.type == "2")//类型为2时 说明时添加的系统参数，只用来展示不能修改
         return;
     // editEVar(MyGrid.store.getAt(rowIndex).get("varname"), MyGrid.store.getAt(rowIndex).get("varvalue"), MyGrid.store.getAt(rowIndex).get("remark"))
     editEVar(rowrecord, true, function(record) {
         
         hwDas.save("CDEServcie/var/hjbl", {}, {}, {
             type: "0",
             project_id: selProject_id,
             varname: record.data.varname,
             varvalue: record.data.varvalue,
             remark: record.data.remark
         }, function() {
             //MyGrid1.store.add(record)
         }, function() {})
     })
 }

 function MyGrid1_celldblclick(sender, rowIndex, columnIndex, e) {

     var rowrecord = MyGrid1.store.getAt(rowIndex);
     editEVar(rowrecord, false, function(record) {
         hwDas.save("CDEServcie/var/hjbl", {}, {}, {
             type: "1",
             project_id: selProject_id,
             varname: record.data.varname,
             varvalue: record.data.varvalue,
             remark: record.data.remark
         }, function() {
             //MyGrid1.store.add(record)
         }, function() {})
     })
 }

 function Evars_afterrender(sender) {

 }

 function button_click(sender, e) {
     // 创建record行记录。 
     var record = vmd.data.Record.create({
         id: vmd.getGuid(),
         projectid: selProject_id||"",
         login: vmd.getUserId(),
         varname: "",
         varvalue: "",
         remark: "",
         type: "1"
     })
     editEVar(record, false, function(record) {

         hwDas.save("CDEServcie/var/hjbl", {}, {}, {
             type: "1",
             project_id: selProject_id,
             varname: record.data.varname,
             varvalue: record.data.varvalue,
             remark: record.data.remark
         }, function() {
             MyGrid1.store.add(record)
         }, function() {})
     })
 }

 function button2_click(sender, e) {
     var selmod = MyGrid1.getSelectionModel();
     if(selmod && selmod.selections && selmod.selections.items.length > 0) {
         editEVar(selmod.selections.items[0], false, function(record) {
             hwDas.save("CDEServcie/var/hjbl", {}, {}, {
                 type: "1",
                 project_id: selProject_id,
                 varname: record.data.varname,
                 varvalue: record.data.varvalue,
                 remark: record.data.remark
             }, function() {
                 //MyGrid1.store.add(record)
             }, function() {})
         })
     }
 }

 function button1_click(sender, e) {
     var selmod = MyGrid1.getSelectionModel();
     if(selmod && selmod.selections && selmod.selections.items.length > 0) {
         hwDas.del("CDEServcie/var/hjbl", {}, {
             type: "1",
             project_id: selProject_id,
             varname: selmod.selections.items[0].data.varname
         }, function() {
             MyGrid1.store.remove(selmod.selections.items[0]); // editEVar(selmod.selections.items[0], false)
         }, function() {})
     }

 }
			this.Evars_afterrender=Evars_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:false,
				height:600,
				x:-5,
				y:0,
				layout:"border",
				items:[
					{
						xtype:"panel",
						id:"panel1",
						title:"系统变量",
						header:false,
						border:false,
						height:232,
						x:40,
						y:20,
						anchor:"100% 40%",
						layout:"anchor",
						region:"north",
						items:[
							{
								xtype:"panel",
								id:"panel4",
								title:"Panel",
								header:false,
								border:false,
								height:30,
								anchor:"100% ",
								layout:"absolute",
								bodyStyle:"font-size: 14px;    border-bottom: 1px solid;    border-bottom-color: rgb(223, 223, 223)",
								items:[
									{
										xtype:"label",
										id:"label",
										text:"系统变量",
										x:10,
										y:5,
										style:"font-weight: bold"
									}
								]
							},
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								height:171,
								header:false,
								enableHdMenu:true,
								disableHeaderClick:true,
								anchor:"100% -30",
								beforerender:"MyGrid_beforerender",
								afterrender:"MyGrid_afterrender",
								celldblclick:"MyGrid_celldblclick",
								style:"margin: 10px;    border: 1px solid;    border-color: rgb(223, 223, 223)",
								border:false,
								listeners:{
									beforerender:MyGrid_beforerender,
									vmdafterrender:MyGrid_afterrender,
									celldblclick:MyGrid_celldblclick
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"变量名",
										sortable:true,
										resizable:true,
										dataIndex:"varname",
										width:120,
										align:"center",
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"变量值",
										sortable:true,
										resizable:true,
										dataIndex:"varvalue",
										width:120,
										align:"center",
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"变量说明",
										sortable:true,
										resizable:true,
										dataIndex:"remark",
										width:100,
										align:"center",
										menuDisabled:true
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel2",
						title:"参数变量",
						header:false,
						border:false,
						height:100,
						x:20,
						y:120,
						anchor:"100% 60%",
						layout:"anchor",
						region:"center",
						items:[
							{
								xtype:"panel",
								id:"panel3",
								title:"Panel",
								header:false,
								border:false,
								height:30,
								bodyStyle:"font-size: 14px;    border-bottom: 1px solid;    border-bottom-color: rgb(223, 223, 223)",
								layout:"absolute",
								items:[
									{
										xtype:"label",
										id:"label1",
										text:"参数变量",
										x:10,
										y:5,
										style:"font-weight: bold"
									}
								]
							},
							{
								xtype:"panel",
								id:"panel5",
								title:"Panel",
								header:false,
								border:false,
								height:30,
								layout:"absolute",
								items:[
									{
										xtype:"vmd.button",
										id:"button",
										text:"添加",
										type:"text",
										size:"small",
										icon:"plus",
										width:50,
										click:"button_click",
										style:"color: #5f5f5f;    font-size: 14px;    margin-left: 10px",
										listeners:{
											click:button_click
										}
									},
									{
										xtype:"vmd.button",
										id:"button1",
										text:"删除",
										type:"text",
										size:"small",
										x:50,
										y:0,
										icon:"minus",
										width:50,
										click:"button1_click",
										style:"color: #5f5f5f;    font-size: 14px;    margin-left: 15px",
										listeners:{
											click:button1_click
										}
									},
									{
										xtype:"vmd.button",
										id:"button2",
										text:"编辑",
										type:"text",
										size:"small",
										icon:"edit",
										width:50,
										x:100,
										y:0,
										click:"button2_click",
										style:"color: #5f5f5f;    font-size: 14px;    margin-left: 20px",
										listeners:{
											click:button2_click
										}
									}
								]
							},
							{
								xtype:"grid",
								id:"MyGrid1",
								title:"Grid Panel",
								loadMask:true,
								height:142,
								header:false,
								hideHeaders:false,
								disableHeaderClick:true,
								enableHdMenu:true,
								anchor:"100% -60",
								beforerender:"MyGrid1_beforerender",
								celldblclick:"MyGrid1_celldblclick",
								style:"margin: 0 10px 10px 10px;    border: 1px solid;    border-color: rgb(223, 223, 223)",
								listeners:{
									beforerender:MyGrid1_beforerender,
									celldblclick:MyGrid1_celldblclick
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"变量名",
										sortable:true,
										resizable:true,
										dataIndex:"varname",
										width:120,
										align:"center",
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"变量值",
										sortable:true,
										resizable:true,
										dataIndex:"varvalue",
										width:120,
										align:"center",
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"变量说明",
										sortable:true,
										resizable:true,
										dataIndex:"remark",
										width:100,
										align:"center",
										menuDisabled:true
									}
								]
							}
						]
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getSysVarDefStore= function(){
//直接填写方法内容
return gridStore;
	}
		this.getEVarsInfo= function(){
//直接填写方法内容
	}
		this.saveEVarsInfo= function(){
//直接填写方法内容
	}
		this.setParamvarStore= function(store){
//直接填写方法内容

MyGrid1.store=store;

MyGrid1.store.load();
	}
		this.setSysVarStore= function(store){
//直接填写方法内容

MyGrid.store=store;
MyGrid.store.load();
	}
		this.setProject_id= function(project_id){
//直接填写方法内容
selProject_id=project_id
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Evars");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Evars");
	}
})