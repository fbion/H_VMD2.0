Ext.define("vmd.ux.NoticeBulletin" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.NoticeBulletin",
	title:"Panel",
	header:false,
	border:false,
	width:555,
	height:332,
	layout:"fit",
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
    fields: ["id", "xh", "tzgg"]
});
var ptServer = {
    ip:'192.168.1.180:6602',
    callcode:'snqtscdd',
    orgschecount: 'XXHTS/schedule/taskmanager/workbench/orgschecount'
};
function MyTabs_afterrender(sender) {
    var pren = MyTabs2.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[0].id;
    vmd("#" + pren + "").after("<li class='x-tab-edge' style='width:470px;'  id='eweu'><a class='x-tab-right' href='#'><span class='x-tab-strip-inner' style='margin:7px 0 0 0;'><span class='x-tab-strip-text' style='color:blue;float: right;' onclick='moreTzgg();'>+更多</span></span></a></li>");
}
window.moreTzgg = function() {
    var win = new vmd.window({
        url: 'http://192.168.1.180:6601/sngzt/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwDoGEhIQq/hw532cedc7.html',
        auto: false,
        title: "通知公告",
        width:'730px',
         align: 'center',
        /*headerButtons: {
            align: 'left',
            style: 'left:100px',
            items: [{
                text: '打印',
                icon: 'printer',
                click: function() {
                    win.iframe.print();
                }
            }]
        }*/
    });  
    win.show();
}

function panel_beforerender(sender){
  tzggDataList = [];
  var hwDao = new HwDao(ptServer.ip, ptServer.callcode);//地址:端口和授权码(服务管理员分配)
  var url = ptServer.orgschecount;
  hwDao.get(url, {}, {}, function (res) {
      if (res.isSucceed) {
           if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                for(var i = 0; i <= 8; i++) {
                    var itemObj = {
                        xh: i + 1,
                        id: data[i].applicationid,
                        tzgg: "<a href='#' onclick='tzggLink(this);'>采油厂生活管理区断电通知18-05-29</a>",
                    }
                    tzggDataList.push(itemObj);
                }
                store1.loadData(tzggDataList);
            }
      } else {
          alert(res.errMsg);
      }
  }, function (res) { alert(res); });
}

function MyGrid_beforerender(sender){
this.store=store1;
}

window.tzggLink=function(id){
    var tr = $(id).closest('tr'), id = tr.find('td')[1].innerText;
}
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
						height:330,
						width:555,
						beforerender:"panel_beforerender",
						autoScroll:false,
						cls:"overflow",
						layout:"fit",
						listeners:{
							beforerender:panel_beforerender
						},
						items:[
							{
								xtype:"grid",
								id:"MyGrid2",
								title:"Grid Panel",
								loadMask:true,
								height:310,
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
										header:"通知公告",
										sortable:true,
										resizable:true,
										dataIndex:"tzgg",
										width:618,
										align:"left",
										css:"padding-left: 10px;"
									},
									{
										xtype:"gridcolumn",
										header:"id",
										sortable:true,
										resizable:true,
										dataIndex:"id",
										width:100,
										hidden:true,
										align:"center"
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
		Ext.util.CSS.removeStyleSheet("vmd.ux.NoticeBulletin");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NoticeBulletin");
	}
})