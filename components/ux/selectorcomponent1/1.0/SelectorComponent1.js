Ext.define("vmd.ux.SelectorComponent1" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.SelectorComponent1",
	layoutConfig:{
		align:"center",
		pack:"start"
	},
	title:"Panel",
	header:false,
	border:false,
	width:750,
	height:456,
	layout:"vbox",
	afterrender:"SelectorComponent1_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.SelectorComponent1_afterrender(this)
}
	},
	wxText:"xccxcx",
	yxText:"Panel",
	HideRoot:false,
	uxCss:"/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {    /*padding-left: 5px;    padding-right: 5px;*/}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
var wxDataList = [];
var wxDataList1 = [];
var choosList = [];
var noticeid = vmd.getUrlParam('noticeid');
var ip = vmd.workspace.dataServiceIp;
var hwDao = new HwDao(ip, 'webxpt');
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "dwmc"]
});
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "dwmc"]
});

function hwImg_click(sender) {
    page.fireEvent('LeftClick');
    var er = MyGrid.getSelectionModel().getSelections();
    MyGrid.store.remove(er); //移除数据
    MyGrid1.store.insert(0, er);
}

function hwImg1_click(sender) {
    page.fireEvent('LeftAllClick');
    var records = MyGrid.store.data.items;
    for(var i = 0, len = records.length; i < len; i++) {
        MyGrid1.store.insert(0, records[i]);
    }
    MyGrid.store.removeAll(); //移除全部数据
}

function hwImg4_click(sender) {
    page.fireEvent('RightClick');
    var er = MyGrid1.getSelectionModel().getSelections();
    MyGrid1.store.remove(er); //移除数据
    MyGrid.store.insert(0, er);
}

function hwImg3_click(sender) {
    page.fireEvent('RightAllClick');
    var records = MyGrid1.store.data.items;
    for(var i = 0, len = records.length; i < len; i++) {
        MyGrid.store.insert(0, records[i]);
    }
    MyGrid1.store.removeAll();
}

function tree_nodeclick(sender, node, e) {
    page.fireEvent('nodeClick');
    loginInfo(node.id);
    /* store1.toRefresh();*/
}

function MyGrid_beforerender(sender) {
    this.store = store1;
}

function MyGrid1_beforerender(sender) {
    this.store = store2;
}

function SelectorComponent1_afterrender(sender) {
    choosList = [];
    choosList = parent.ObjectSelection.getchooseOptions();
    loginInfo1();
}

//获取用户信息
function loginInfo(id) {
    wxDataList = [];
    var url = '/platform/v1/position';
    hwDao.get(url, {}, {
        dwdm: id
    }, function(res) {
        if(res.data && res.data[0].datas.length > 0) {
            var data = res.data[0].datas;
            for(var i = 0; i < data.length; i++) {
                var itemObj = {
                    id: data[i].positionid,
                    name: data[i].positionname,
                    dwmc: data[i].dwmc,
                    type: 'option'
                }
                wxDataList.push(itemObj);
            }
            let arr1Ids = choosList.map(item => item.id);
            // 过滤arr2中不包含arr1相同的id数组。
            const result = wxDataList.filter(item => !arr1Ids.includes(item.id));
            store1.loadData(result);
        }
    }, function(res) {});
}


//获取已选岗位信息
function loginInfo1() {
    wxDataList1 = [];
    if(noticeid != '' && choosList.length == 0) {
        var urlorg = '/platform/v1/recieve';
        hwDao.get(urlorg, {}, {
            'noticeid': noticeid,
            'recievetype': 'position'
        }, function(res) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i < data.length; i++) {
                    var itemObj = {
                        id: data[i].recieveid,
                        name: data[i].ba_long_name,
                        dwmc: data[i].dm,
                        type: 'option'
                    }
                    wxDataList1.push(itemObj);
                }
                choosList=wxDataList1;
                store2.loadData(wxDataList1);
            } else {
                store2.loadData(choosList);
            }
        }, function(res) {});
    } else {
        store2.loadData(choosList);
    }
}
var datas = [];
window.getMyDatas = function() {
    data = [];
    if(MyGrid1.el) {
        datas = MyGrid1.store.data.items;
        if(datas.length > 0) {
            for(var i = 0, len = datas.length; i < len; i++) {
                var item = {
                    id: datas[i].data.id,
                    name: datas[i].data.name,
                    type: 'org'
                }
                data.push(item);
            }

        }
        return data;
    } else {
        data.push(0);
        return data;
    }

}
			this.SelectorComponent1_afterrender=SelectorComponent1_afterrender;
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
				height:460,
				width:740,
				layout:"hbox",
				items:[
					{
						xtype:"panel",
						id:"panel1",
						title:"Panel",
						header:false,
						border:true,
						height:450,
						width:200,
						layout:"fit",
						padding:"3",
						style:"border: 1px solid #e4e4e4;",
						items:[
							{
								xtype:"vmd.treeex",
								id:"tree",
								width:350,
								height:270,
								hideRoot:this.HideRoot,
								nodeclick:"tree_nodeclick",
								listeners:{
									nodeclick:tree_nodeclick
								},
								store:this.BindingStore,
								parentField:this.ParentNode,
								valueField:this.Value,
								textField:this.TextField,
								loadType:this.LoadType,
								rootValue:this.RootValue,
								rootText:this.RootText
							}
						]
					},
					{
						xtype:"panel",
						id:"panel2",
						title:this.wxText,
						header:true,
						border:true,
						height:450,
						width:213,
						margins:"0 0 0 10px",
						layout:"fit",
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								hideHeaders:false,
								header:false,
								cls:"vmd-grid",
								beforerender:"MyGrid_beforerender",
								style:"overflow-x: hidden;",
								listeners:{
									beforerender:MyGrid_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"姓名",
										sortable:true,
										resizable:true,
										dataIndex:"id",
										width:105,
										menuDisabled:true,
										align:"center",
										hidden:true
									},
									{
										xtype:"gridcolumn",
										header:"名称",
										sortable:true,
										resizable:true,
										dataIndex:"name",
										width:105,
										menuDisabled:true,
										align:"center",
										css:"text-align: left !important;    margin-left: 4px !important;"
									},
									{
										xtype:"gridcolumn",
										header:"单位名称",
										sortable:true,
										resizable:true,
										dataIndex:"dwmc",
										width:100,
										menuDisabled:true,
										align:"center",
										css:"text-align: left !important;    margin-left: 4px !important;"
									}
								]
							}
						]
					},
					{
						xtype:"panel",
						id:"panel3",
						layoutConfig:{
							align:"center",
							pack:"center"
						},
						title:"Panel",
						header:false,
						border:true,
						height:458,
						width:53,
						layout:"vbox",
						items:[
							{
								xtype:"vmd.img",
								id:"hwImg",
								width:32,
								height:29,
								src:"/img/public/jiantou  you (1).png",
								click:"hwImg_click",
								style:"cursor: pointer;",
								listeners:{
									click:hwImg_click
								}
							},
							{
								xtype:"vmd.img",
								id:"hwImg1",
								width:36,
								height:38,
								margins:"20px 0 20px 0",
								src:"/img/public/双箭头 (1).png",
								click:"hwImg1_click",
								style:"cursor: pointer;",
								listeners:{
									click:hwImg1_click
								}
							},
							{
								xtype:"vmd.img",
								id:"hwImg4",
								width:32,
								height:29,
								src:"/img/public/jiantou  you.png",
								margins:"0 0 20px 0",
								click:"hwImg4_click",
								style:"cursor: pointer;",
								listeners:{
									click:hwImg4_click
								}
							},
							{
								xtype:"vmd.img",
								id:"hwImg3",
								width:36,
								height:38,
								src:"/img/public/双箭头.png",
								click:"hwImg3_click",
								style:"cursor: pointer;",
								listeners:{
									click:hwImg3_click
								}
							}
						]
					},
					{
						xtype:"panel",
						id:"panel4",
						title:this.yxText,
						header:true,
						border:true,
						height:450,
						width:262,
						layout:"fit",
						padding:"0 1 0 1",
						items:[
							{
								xtype:"grid",
								id:"MyGrid1",
								title:"Grid Panel",
								loadMask:true,
								header:false,
								cls:"vmd-grid",
								beforerender:"MyGrid1_beforerender",
								listeners:{
									beforerender:MyGrid1_beforerender
								},
								columns:[
									{
										xtype:"gridcolumn",
										header:"id",
										sortable:true,
										resizable:true,
										dataIndex:"id",
										width:127,
										align:"center",
										hidden:true,
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"名称",
										sortable:true,
										resizable:true,
										dataIndex:"name",
										width:127,
										align:"center",
										css:"text-align: left !important;    margin-left: 4px !important;",
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"单位名称",
										sortable:true,
										resizable:true,
										dataIndex:"dwmc",
										width:127,
										align:"center",
										css:"text-align: left !important;    margin-left: 4px !important;",
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
			this.getMyData= function(){
//直接填写方法内容
getMyDatas();
return data;
	}
		this.initFun= function(){
//直接填写方法内容
initFund();
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.SelectorComponent1");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.SelectorComponent1");
	}
})