Ext.define("vmd.ux.ZyglServerList" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ZyglServerList",
	title:"Panel",
	header:false,
	border:false,
	width:254,
	height:459,
	layout:"border",
	bodyStyle:"background-color: white;",
	serverListTpl:"<ul>    <tpl for=\".\">        <li class='info serverlist-info'>{name}</li>    </tpl></ul>",
	serverListData:"var data = [{    \"server_id\": \"0000000001\",    \"name\": \"服务器1\",    \"ip\": \"192.168.1.188\",    \"port\": \"8000\",    \"remark\": \"test\"}, {    \"server_id\": \"0000000002\",    \"name\": \"服务器2\",    \"ip\": \"192.168.1.188\",    \"port\": \"8030\",    \"remark\": \"test\"}];return data;",
	uxCss:".serverlist-info {    padding: 8px 17px;    margin: 2px;    line-height: 0.25em;    height: 5px;    width: 170px;    border-top: 5px solid transparent;    cursor: pointer;}.icon-minus{    color:#20a0ff;}.icon-plus{    color:#20a0ff;}",
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

function hwDataView_dblclick(sender,index,node,e){
page.fireEvent("serverDbClick", sender, index, node, e);
}

function hwDataView_afterrender(sender){
this.store=hwDataView.store;
}

function hwDataView_click(sender,index,node,e){
    page.fireEvent("serverClick", sender, index, node, e);

}

function button_click(sender,e){
 page.fireEvent("addServerConfig", sender, e);
}

function button1_click(sender,e){
 page.fireEvent("delServerConfig", sender,e);
}
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
						multiSelect:true,
						autoScroll:true,
						tpl:this.serverListTpl,
						data:this.serverListData,
						dblclick:"hwDataView_dblclick",
						autoHeight:false,
						afterrender:"hwDataView_afterrender",
						click:"hwDataView_click",
						listeners:{
							dblclick:hwDataView_dblclick,
							vmdafterrender:hwDataView_afterrender,
							click:hwDataView_click
						},
						store:this.store
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getSelServerData= function(){
//直接填写方法内容

var selrec = hwDataView.getSelectedRecords();
if(selrec.length > 0) {
    return selrec[0].data;
} else
    return null;
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ZyglServerList");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ZyglServerList");
	}
})