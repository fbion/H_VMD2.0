Ext.define("vmd.ux.NoticeAnMore" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.NoticeAnMore",
	layoutConfig:{
		align:"center",
		pack:"start"
	},
	title:"Panel",
	header:false,
	border:false,
	width:700,
	height:560,
	layout:"vbox",
	afterrender:"NoticeAnMore_afterrender",
	beforerender:"NoticeAnMore_beforerender",
	listeners:{
		vmdafterrender:function(){
	this.NoticeAnMore_afterrender(this)
},
		beforerender:function(){
	this.NoticeAnMore_beforerender(this)
}
	},
	uxCss:".hand a{   text-decoration:none; }.hand a:link {    color: blue; text-decoration:none;    }.hand a:active:{    color: red;    } /*a:visited {    color:purple;text-decoration:none;    } */.hand a:hover {    color: red; text-decoration:underline;    } .x-grid3-hd-row td {    line-height: 15px;    vertical-align: middle;    border-left: 0px solid;     border-right: 0px solid;     border: 1px solid #e4e4e4;}.x-grid3-scroller {    overflow-x: hidden;}/* =========================================== Grid Panel =========================================== *//* 表格左右间距 */.vmd-grid {   /* padding-left: 5px;    padding-right: 5px;*/}/* 表格线样式兼容 */.vmd-grid table {    border-collapse: collapse;}/* 表头背景色 */.vmd-grid .x-grid3-header {    background-color: #f7f7f7;}/* 表头鼠标悬停背景色 */.vmd-grid .x-grid3-hd-over .x-grid3-hd-inner {    background-color: #f7f7f7;}/* 表头错位兼容 */.vmd-grid .x-grid3-header-offset {    padding: 0;}/* 表头单元格 */.vmd-grid .x-grid3-header td {    border: 1px solid #e3e2e8;    font-size: 14px;}/* 表体单元格 */.vmd-grid .x-grid3-body td {    border: 1px solid #e3e2e8;    border-top-width: 0;    padding: 0;    font-size: 14px;}/* 表体行 */.vmd-grid .x-grid3-row {    border: none;}/* 表体行鼠标悬停背景色 */.vmd-grid .x-grid3-row-over {    background-color: white;}/* 表体行选中背景色 */.vmd-grid .x-grid3-row-selected {    background-color: #F5F7FC !important;}/* =========================================== Grid Panel =========================================== */",
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
var ryRwDataList = [];
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "name", "date", "url"]
});
var ip = vmd.workspace.dataServiceIp;
var hwDao = new HwDao(ip, 'webxpt'); //地址:端口和授权码(服务管理员分配)
function loadStoreData() {
    ryRwDataList = [];
    var url = '/platform/v1/noticebylogin';
    hwDao.get(url, {}, {}, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i < data.length; i++) {
                    var itemObj = {
                        xh: i + 1,
                        id: data[i].noticeid,
                        name: "<a href='#' onclick='tzggLink(this);'>" + data[i].title + "</a>",
                        date: data[i].release_date,
                        url: '',
                    }
                    ryRwDataList.push(itemObj);
                }
            }
            store1.loadData(ryRwDataList);
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}

function MyGrid_beforerender(sender) {
    this.store = store1;
}
window.tzggLink = function(id) {
    var tr = $(id).closest('tr'),
        id = tr.find('td')[0].innerText;
    
    $LAB.script(vmd.virtualPath + '/lib/messenger.js')
        .wait(function() {
            var messenger;
            messenger = new Messenger(vmd.getUrlParam("g_tabId"), 'webptframe');
            messenger.addTarget(window.parent, 'platformMsger');
            var url = encodeURI('http://10.207.60.82:8000/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwntwXFxUy/hw4b8a55fb.html?noticeid=' + id + "&r=" + Math.random());
            if(vmd.getUrlParam("g_tabId")) {
                messenger.execAction('open', 'seeNotice', '查看公告', url);
            } else {
                //业务操作
                window.open(url);
            }
        });

}

function NoticeAnMore_afterrender(sender) {
    loadStoreData();
}

function NoticeAnMore_beforerender(sender){

}
			this.NoticeAnMore_afterrender=NoticeAnMore_afterrender;
		this.NoticeAnMore_beforerender=NoticeAnMore_beforerender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				height:560,
				layout:"fit",
				width:700,
				items:[
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						hideHeaders:false,
						header:false,
						beforerender:"MyGrid_beforerender",
						cls:"hand vmd-grid",
						listeners:{
							beforerender:MyGrid_beforerender
						},
						columns:[
							{
								xtype:"gridcolumn",
								header:"id",
								sortable:true,
								resizable:true,
								dataIndex:"id",
								width:100,
								hidden:true
							},
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:true,
								dataIndex:"xh",
								width:100,
								hidden:false,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"名称",
								sortable:true,
								resizable:true,
								dataIndex:"name",
								width:320,
								align:"center",
								css:"text-align: left !important;",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"时间",
								sortable:true,
								resizable:true,
								dataIndex:"date",
								width:270,
								align:"center",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"url",
								sortable:true,
								resizable:true,
								dataIndex:"url",
								width:192,
								align:"center",
								hidden:true
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.NoticeAnMore");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NoticeAnMore");
	}
})