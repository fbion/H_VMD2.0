Ext.define("vmd.ux.ISIP5butGroup" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ISIP5butGroup",
	title:"Panel",
	header:false,
	border:false,
	height:36,
	layout:"fit",
	bodyStyle:"background-color: #fff;",
	afterrender:"ISIP5butGroup_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.ISIP5butGroup_afterrender(this)
}
	},
	uxCss:".bntIco{    background: url('/img/public/u585.png')    }",
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

LazyLoad.css(vmd.virtualPath + "/img/isip5/iconfont.css");


var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'title']
});
var store2 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'title']
});

var seleData1 = [],
    seleData2 = [],
    titleData = [];

var bntData = [{
    id: "icon-fenlei1",
    title: "分类"
}, {
    id: "icon-gongdan",
    title: "分类"
}, {
    id: "icon-xinjianmoxing",
    title: "新建模型"
}, {
    id: "icon-liebiao",
    title: "列表"
}, {
    id: "icon-fenlei",
    title: "分类"
}, {
    id: "icon-sousuo",
    title: "搜索"
}, {
    id: "icon-shanchu1",
    title: "删除"
}, {
    id: "icon-shangyi",
    title: "上移"
}, {
    id: "icon-xiayi",
    title: "下移"
}, {
    id: "icon-danwei",
    title: "单位"
}, {
    id: "icon-zengjia",
    title: "增加"
}, {
    id: "icon-bianji",
    title: "编辑"
}, {
    id: "icon-zuzhiqunzu",
    title: "组织群组"
}, {
    id: "icon-gangwei",
    title: "岗位"
}, {
    id: "icon-quanxianshenpi",
    title: "权限审批"
}, {
    id: "icon-tianjiabumen",
    title: "添加分类"
}, {
    id: "icon-winfo-icon-xinzengbumen",
    title: "添加单位"
}, {
    id: "icon-tianjiadanwei1",
    title: "添加部门"
}, {
    id: "icon-xinjian",
    title: "新建"
}, {
    id: "icon-lishibanben1",
    title: "历史版本"
}, {
    id: "icon-tianjiayingyong",
    title: "添加模块"
}, {
    id: "icon-mokuai",
    title: "添加应用"
}, {
    id: "icon-yunshujuzhongxin1",
    title: "添加数据服务"
}, {
    id: "icon-shujuku",
    title: "数据库"
}, {
    id: "icon-tianjiashujuyuan",
    title: "添加数据库"
}, {
    id: "icon-yunshujuzhongxin",
    title: "数据服务"
},{
    id:"icon-icon-test1",
    title:"添加业务域"
}, {
    id: "icon-icon-test",
    title: "业务域"
}, {
    id: "icon-jiaose",
    title: "角色"
},{
    id:"icon-shujuquanxian1",
    title:"数据权限"
},{
    id:"icon-quanxianmokuai",
    title:"权限模块"
},{
    id:"icon-shanchu2",
    title:"取消"
}
,{
    id:"icon-tianjiahaoyou",
    title:"岗位"
}];

function hwDataView_click(sender, index, node, e) {
    var id = node.getAttribute('data-id');
    var title = node.getAttribute('data-tooltip');
    page.fireEvent("bntGroupClick", hwDataView, id, title)
}


function setBnt(obj) {
    seleData1 = [];
    seleData2 = [];
    var arr;
    if(vmd.isArray(obj)) {
        arr = obj;

    } else if(vmd.isString(obj)) {
        arr = obj.split(",")
    }
    for(var j = 0; j < arr.length; j++) {
        for(var i = 0; i < bntData.length; i++) {
            if(bntData[i].id == arr[j]) {
                if(j < 8) {
                    seleData1.push(bntData[i])
                } else {
                    seleData2.push(bntData[i])
                }

            }
        }
        if(arr[j].id && arr[j].title) {
            if(j < 8) {
                seleData1.push(arr[j])
            } else {
                seleData2.push(arr[j])
            }

        }
    }
    store1.loadData(seleData1);
    hwDataView.bindStore(store1);
    store2.loadData(seleData2);
    hwDataView1.bindStore(store2);
    if(seleData2.length > 0) {
        moreButton.show()
    } else {
        moreButton.hide()
    }
}

function ISIP5butGroup_afterrender(sender) {
    Ext.getBody().appendChild(hwDataView1.el);
    if(seleData1.length == 0 && seleData2.length == 0) {
        setBnt(bntData)
    }
    vmd.utils.tooltip("[data-tooltip]");
}

function moreButton_click(sender, e) {
    if(hwDataView1.hidden) {
        var x = e.clientX - 30,
            y = e.clientY + 10;
        hwDataView1.setPosition(x, y)
        hwDataView1.show()

    } else {
        hwDataView1.hide()
    }
}

function hwDataView1_click(sender, index, node, e) {
    var id = node.getAttribute('data-id');
    var title = node.getAttribute('data-tooltip');
    page.fireEvent("bntGroupClick", hwDataView, id, title);
    hwDataView1.hide();
}

function hwDataView_afterrender(sender) {

    vmd.utils.tooltip("[data-tooltip]");

    // hwDataView.addListener("mouseenter", function(sender, index, node, e) {
    //     var id = node.getAttribute('data-id');
    //     if(titleData.length > 0) {
    //         for(var i = 0; i < titleData.length; i++) {
    //             if(titleData[i].id == id) {
    //                 hwText.setPosition(e.xy[0], e.xy[1])
    //                 hwText.show();
    //                 hwText.setValue(titleData[i].title);
    //                 break;
    //             }
    //         }
    //     }
    // })
    // hwDataView.addListener("mouseleave", function(sender, index, node, e) {
    //     hwText.hide();
    //     hwText.setValue('');
    // })
}

function hwText_afterrender(sender) {
    Ext.getBody().appendChild(hwText.el);
}

function hwDataView1_afterrender(sender) {
    vmd.utils.tooltip("[data-tooltip]");

    // hwDataView1.addListener("mouseenter", function(sender, index, node, e) {
    //     var id = node.getAttribute('data-id');
    //     if(titleData.length > 0) {
    //         for(var i = 0; i < titleData.length; i++) {
    //             if(titleData[i].id == id) {
    //                 hwText.setPosition(e.xy[0], e.xy[1])
    //                 hwText.show();
    //                 hwText.setValue(titleData[i].title);
    //                 break;
    //             }
    //         }
    //     }
    // })
    // hwDataView1.addListener("mouseleave", function(sender, index, node, e) {
    //     hwText.hide();
    //     hwText.setValue('');
    // })
}
			this.ISIP5butGroup_afterrender=ISIP5butGroup_afterrender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				height:318,
				region:"center",
				style:"display: inline-block;    border-left: 0;    border-right: 0;    border-top: 0;",
				layout:"absolute",
				items:[
					{
						xtype:"vmd.dataview",
						id:"hwDataView",
						height:40,
						itemSelector:"li.info",
						overClass:"info-hover",
						singleSelect:false,
						multiSelect:false,
						autoScroll:false,
						tpl:"<ul class=\"d-info\" style=\"display: inline-block;height: 36px;\">    <tpl for=\".\">        <li class=\"info\" data-id=\"{id}\" data-tooltip=\"{title}\" style=\"display: inline-block;width: 18px;height: 18px;  padding: 11px 4px 10px 4px;margin: 0;cursor: default\">            <i class=\"iconfont {id}\" style=\" display:inline-block;width: 100%;height: 100%;\">            </i>        </li>    </tpl></ul>",
						data:"var data = [{    \"id\": 1,    \"picname\": \"border-layout.gif\",    \"name\": \"Border Layout\",    \"desc\": \"方位布局\"}, {    \"id\": 2,    \"picname\": \"layout-accordion.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"手风琴布局\"}, {    \"id\": 3,    \"picname\": \"layout-anchor.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"百分比布局\"}, {    \"id\": 4,    \"picname\": \"layout-form.gif\",    \"name\": \"Absolute Layout\",    \"desc\": \"绝对定位布局\"}, {    \"id\": 5,    \"picname\": \"layout-column.gif\",    \"name\": \"Column Layout\",    \"desc\": \"列布局\"}, {    \"id\": 6,    \"picname\": \"layout-table.gif\",    \"name\": \"Table Layout\",    \"desc\": \"表格布局\"}];return data;",
						click:"hwDataView_click",
						afterrender:"hwDataView_afterrender",
						listeners:{
							click:hwDataView_click,
							vmdafterrender:hwDataView_afterrender
						}
					},
					{
						xtype:"vmd.img",
						id:"moreButton",
						width:20,
						height:18,
						x:230,
						y:12,
						click:"moreButton_click",
						src:"/img/public/u585.png",
						hidden:false,
						disabled:false,
						listeners:{
							click:moreButton_click
						}
					},
					{
						xtype:"vmd.dataview",
						id:"hwDataView1",
						width:20,
						height:80,
						itemSelector:"li.info",
						overClass:"info-hover",
						singleSelect:false,
						multiSelect:false,
						autoScroll:false,
						tpl:"<ul class=\"d-info\">    <tpl for=\".\">        <li class=\" info shu-info\" data-id=\"{id}\" data-tooltip=\"{title}\" style=\" width: 18px;        height: 18px;        padding: 4px; cursor: default\">            <i class=\"iconfont {id}\" style=\" display:inline-block;width: 100%;height: 100%;\">            </i>        </li>    </tpl></ul>",
						data:"var data = [{    \"id\": 1,    \"picname\": \"border-layout.gif\",    \"name\": \"Border Layout\",    \"desc\": \"方位布局\"}, {    \"id\": 2,    \"picname\": \"layout-accordion.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"手风琴布局\"}, {    \"id\": 3,    \"picname\": \"layout-anchor.gif\",    \"name\": \"Accordion Layout\",    \"desc\": \"百分比布局\"}, {    \"id\": 4,    \"picname\": \"layout-form.gif\",    \"name\": \"Absolute Layout\",    \"desc\": \"绝对定位布局\"}, {    \"id\": 5,    \"picname\": \"layout-column.gif\",    \"name\": \"Column Layout\",    \"desc\": \"列布局\"}, {    \"id\": 6,    \"picname\": \"layout-table.gif\",    \"name\": \"Table Layout\",    \"desc\": \"表格布局\"}];return data;",
						hidden:true,
						x:200,
						y:40,
						click:"hwDataView1_click",
						afterrender:"hwDataView1_afterrender",
						listeners:{
							click:hwDataView1_click,
							vmdafterrender:hwDataView1_afterrender
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setBntGroup= function(bntGroup){
//直接填写方法内容
setBnt(bntGroup)

/*
已定义的所有按钮id
如需自定义title的内容，可传入一下格式数组对象，
title字段自定义内容即可
var bntData = [{
    id: "icon-fenlei1",
    title:"分类"
}, {
    id: "icon-gongdan",
    title:"分类"
},{
    id: "icon-xinjianmoxing",
    title:"新建模型"
}, {
    id: "icon-liebiao",
    title:"分类"
},{
    id: "icon-fenlei",
    title:"分类"
},{
    id: "icon-sousuo",
    title:"搜索"
}, {
    id: "icon-shanchu1",
    title:"删除"
},{
    id: "icon-shangyi",
    title:"上移"
}, {
    id: "icon-xiayi",
    title:"下移"
},{
    id: "icon-danwei",
    title:"单位"
}, {
    id: "icon-zengjia",
    title:"增加"
},{
    id: "icon-bianji",
    title:"编辑"
}, {
    id: "icon-zuzhiqunzu",
    title:"组织群组"
}];
也可以自定义按钮id及图表,
传入以上格式的数组对象即可，
注：图标必须为/img/isip5/iconfont.css文件定义过的字体图标

*/ 

	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ISIP5butGroup");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ISIP5butGroup");
	}
})