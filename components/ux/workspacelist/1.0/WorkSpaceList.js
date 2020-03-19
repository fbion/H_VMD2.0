Ext.define("vmd.ux.WorkSpaceList" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.WorkSpaceList",
	title:"Panel",
	header:false,
	border:false,
	width:254,
	height:459,
	layout:"border",
	bodyStyle:"background-color: white;",
	beforerender:"WorkSpaceList_beforerender",
	listeners:{
		beforerender:function(){
	this.WorkSpaceList_beforerender(this)
}
	},
	listTpl:"<ul>    <tpl for=\".\">        <li class='info serverlist-info'> {name} </li>    </tpl></ul>",
	listData:"var data = [{    \"workspace_id\": \"0000000001\",    \"name\": \"我的工区\",    \"remark\": \"test\"}, {    \"workspace_id\": \"0000000002\",    \"name\": \"我的工区1\",    \"remark\": \"test\"}];return data;",
	uxCss:".serverlist-info {    padding: 8px 17px;    margin: 2px;    line-height: 0.25em;    height: 5px;    width:180px;    border-top: 5px solid transparent;    cursor: pointer;}.icon-minus {    color: #409eff;}.icon-plus {    color: #409eff;}",
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
			/////////////////////
//注册的资源树的对外事件
/////////////////////
var page = this;

function hwDataView_dblclick(sender, index, node, e) {
    page.fireEvent("onItemDbClick", sender, index, node, e);
}

function hwDataView_afterrender(sender) {
    this.store = hwDataView.store;
}

function hwDataView_click(sender, index, node, e) {
    page.fireEvent("onItemClick", sender, index, node, e);

}

function button_click(sender, e) {
    page.fireEvent("onAddItem", sender, e);
}

function button1_click(sender, e) {
    page.fireEvent("onDelItem", sender, e);
}

function refreshStore() {

    hwDataView.store.toRefresh();
    hwDataView.refresh();
}

function selectItemById(id) {
    for(var i = 0; i < hwDataView.store.data.items.length; i++) {
        if(hwDataView.store.data.items[i].data.workspace_id == id) {
            hwDataView.select(i);
            // hwDataView.selectRange(i, i);
            break;
        }
    }
}

function getSelIdAfterDel() {
    // 
    var arrSel = hwDataView.getSelectedIndexes();
    if(arrSel.length <= 0)
    {
        return "";
    }
    var indexSel = arrSel[0];
    var indexSelNext = -1;
    if(indexSel > 0)
    {
        indexSelNext = indexSel -1;
    }
    else
    {
        indexSelNext = 0;
    }
    if(indexSelNext > -1 && indexSelNext < hwDataView.store.data.items.length)
    {
        return hwDataView.store.data.items[indexSelNext].data.workspace_id;
    }
    
    return "";
}

function selectItemByIndex(index) {
    // if()
    {
            hwDataView.select(index);
    }
}

function WorkSpaceList_beforerender(sender){

}
			this.WorkSpaceList_beforerender=WorkSpaceList_beforerender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:31,
				x:170,
				y:40,
				region:"north",
				items:[
					{
						xtype:"vmd.button",
						id:"button",
						text:"  添加",
						type:"(none)",
						size:"small",
						icon:"icon-plus",
						style:"border: 0px;",
						iconcls:"icon-minus1",
						height:30,
						click:"button_click",
						listeners:{
							click:button_click
						}
					},
					{
						xtype:"vmd.button",
						id:"button1",
						text:"  删除",
						type:"(none)",
						size:"small",
						icon:"icon-minus",
						style:"border: 0px;",
						height:30,
						click:"button1_click",
						listeners:{
							click:button1_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				x:120,
				y:130,
				region:"center",
				layout:"fit",
				items:[
					{
						xtype:"vmd.dataview",
						id:"hwDataView",
						width:253,
						height:428,
						itemSelector:"li.info",
						overClass:"info-hover",
						selectedClass:"x-view-selected",
						singleSelect:true,
						multiSelect:false,
						autoScroll:true,
						tpl:this.listTpl,
						data:this.listData,
						dblclick:"hwDataView_dblclick",
						autoHeight:false,
						afterrender:"hwDataView_afterrender",
						click:"hwDataView_click",
						style:"font-size: 14px;",
						listeners:{
							dblclick:hwDataView_dblclick,
							vmdafterrender:hwDataView_afterrender,
							click:hwDataView_click
						},
						items:[
							{
								xtype:"vmd.img",
								id:"hwImg",
								width:200,
								height:200
							}
						],
						store:this.store
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getSelData= function(){
//直接填写方法内容
var selrec = hwDataView.getSelectedRecords();
if(selrec.length > 0) {
    return selrec[0].data;
} else
    return null;
	}
		this.iRefreshStore= function(){
//直接填写方法内容
refreshStore();
	}
		this.iSelectItemById= function(id){
//直接填写方法内容
selectItemById(id);
	}
		this.iGetSelIdAfterDel= function(){
//直接填写方法内容
return getSelIdAfterDel();
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.WorkSpaceList");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.WorkSpaceList");
	}
})