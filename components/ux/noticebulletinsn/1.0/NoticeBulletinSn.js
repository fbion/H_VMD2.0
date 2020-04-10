Ext.define("vmd.ux.NoticeBulletinSn" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.NoticeBulletinSn",
	title:"Panel",
	header:false,
	border:false,
	width:555,
	height:333,
	layout:"auto",
	afterrender:"NoticeBulletinSn_afterrender",
	autoHeight:false,
	listeners:{
		vmdafterrender:function(){
	this.NoticeBulletinSn_afterrender(this)
}
	},
	uxCss:"a{   text-decoration:none; }a:link {    color: blue; text-decoration:none;    }a:active:{    color: red;    } a:visited {    color:purple;text-decoration:none;    } a:hover {    color: red; text-decoration:underline;    } .x-grid3-scroller {overflow: hidden}.x-window-mc {    border-width: 0px !important;}.x-viewport body {    overflow: hidden;    margin-top: 10px;}",
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
var tzggDataList = [];
var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["id", "xh", "tzgg", "date", "url"]
});
var ip = vmd.workspace.dataServiceIp;
var hwDao = new HwDao(ip, 'webxpt'); //地址:端口和授权码(服务管理员分配)
function MyTabs_afterrender(sender) {
    var pren = MyTabs2.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[0].id;
    vmd("#" + pren + "").after("<li class='x-tab-edge' style='width:470px;'  id='eweu'><a class='x-tab-right' href='#'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;float: right;' onclick='moreTzgg();'>+更多</span></span></a></li>");
}
window.moreTzgg = function() {
    var win = new vmd.window({
        url: './hw532cedc7.html',
        auto: false,
        title: "通知公告",
        width: '730px',
        align: 'center',
    });
    win.show();
}

function loadData() {
    tzggDataList = [];
    var url = '/platform/v1/noticebylogin';
    hwDao.get(url, {}, {}, function(res) {
        
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                if(data.length <= 8) {
                    for(var i = 0; i < data.length; i++) {
                        var itemObj = {
                            xh: i + 1,
                            id: data[i].noticeid,
                            tzgg: "<a href='#' onclick='tzggLink(this);'>" + data[i].title + "</a>",
                            date: data[i].release_date,
                            url: ''
                        }
                        tzggDataList.push(itemObj);
                    }
                    store1.loadData(tzggDataList);
                } else {
                    for(var i = 0; i <= 8; i++) {
                        var itemObj = {
                            xh: i + 1,
                            id: data[i].noticeid,
                            tzgg: "<a href='#' onclick='tzggLink(this);'>" + data[i].title + "</a>",
                            date: data[i].release_date,
                            url: ''
                        }
                        tzggDataList.push(itemObj);
                    }
                    store1.loadData(tzggDataList);
                }

            }
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

function NoticeBulletinSn_afterrender(sender) {
    loadData();
}

function MyTabs2_beforerender(sender) {

}
			this.NoticeBulletinSn_afterrender=NoticeBulletinSn_afterrender;
		this.items=[
			{
				xtype:"tabpanel",
				id:"MyTabs2",
				activeTab:0,
				height:333,
				width:555,
				afterrender:"MyTabs_afterrender",
				listeners:{
					vmdafterrender:MyTabs_afterrender
				},
				items:[
					{
						xtype:"panel",
						id:"panel",
						title:"通知公告",
						header:true,
						border:true,
						autoScroll:false,
						cls:"overflow",
						layout:"fit",
						autoHeight:false,
						autoWidth:false,
						items:[
							{
								xtype:"grid",
								id:"MyGrid2",
								title:"Grid Panel",
								loadMask:true,
								height:330,
								hideHeaders:true,
								header:false,
								border:false,
								beforerender:"MyGrid_beforerender",
								width:555,
								ctCls:"overflow",
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
										hidden:true,
										align:"center"
									},
									{
										xtype:"gridcolumn",
										header:"通知公告",
										sortable:true,
										resizable:true,
										dataIndex:"tzgg",
										width:400,
										align:"left",
										css:"padding-left: 10px;"
									},
									{
										xtype:"gridcolumn",
										header:"时间",
										sortable:true,
										resizable:true,
										dataIndex:"date",
										width:218,
										hidden:false,
										align:"left",
										menuDisabled:true
									},
									{
										xtype:"gridcolumn",
										header:"url",
										sortable:true,
										resizable:true,
										dataIndex:"url",
										width:100,
										hidden:true,
										align:"left",
										menuDisabled:true
									}
								]
							}
						]
					}
				],
				callcode:this.callcode,
				orgschecount:this.orgschecount
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.NoticeBulletinSn");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NoticeBulletinSn");
	}
})