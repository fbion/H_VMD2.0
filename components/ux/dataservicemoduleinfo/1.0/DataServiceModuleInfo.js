Ext.define("vmd.ux.DataServiceModuleInfo" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DataServiceModuleInfo",
	title:"Panel",
	header:false,
	border:false,
	width:605,
	height:590,
	layout:"absolute",
	afterrender:"DataServiceModuleInfo_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.DataServiceModuleInfo_afterrender(this)
}
	},
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
			var hwTree;

function DataServiceModuleInfo_afterrender(sender) {

}

var Selprojectid;
var selWorkspaceid;

function refresh(tree, projectid, workspaceid, changeId) {
    Selprojectid = projectid;
    selWorkspaceid = workspaceid;
    if(!tree) return;
    hwTree = tree;
    var tree = hwTree;
    var newnode = tree.newnode;
    if(newnode) {
        hwText.setValue(newGuid(32));
        hwText1.setValue("");
        hwText2.setValue(Ext.util.Cookies.get('userName'));
        hwText3.setValue(Ext.Date.dateFormat(new Date(), 'Y-m-d H:i:s'));
        hwText4.setValue("");
        hwText5.setValue("");
        hwText6.setValue("");
        hwText7.setValue("");
    } else {
        var selId = "hw" + tree.getSelectedItemId();
        var selnode = tree.itemObj[selId];
        hwText.setValue(selnode.code);
        hwText1.setValue(selnode.text);
        hwText2.setValue(selnode.createuser);
        hwText3.setValue(selnode.createtime);
        hwText4.setValue(selnode.changeuser);
        hwText5.setValue(selnode.changetime);
        hwText6.setValue("");
        hwText7.setValue(selnode.remark);
    }

}

function button_click(sender, e) {
    saveModelInfo(function() {
        Ext.Msg.alert("提示", "保存成功！")
    });
}
/*保存前校验
return:boolean  
*/
function saveCheck() {
    if(hwText1.getValue() == "") {
        Ext.Msg.alert("提示", "模块名称不能为空！")
        return false;
    }
    return true;
}

//模块保存按钮操作
function saveModelInfo(callback) {
    var mytree = parent.hwTreeDataService;
    var selId = mytree.getSelectedItemId();
    var objKey = "hw" + selId;
    var selnode = mytree.itemObj[objKey];

    var serviceCode = selnode.code; // 模块编码
    var serviceName = hwText1.getValue(); // 模块名称
    var serviceRemark = hwText7.getValue(); // 说明

    var urlparam = {
        host: (vmd.workspace.dataServiceIp || vmdSettings.dataServiceIp),
        url: "DataService/Service/Project"
    }

    // 更改活动工区状态
    hwDas.edit(
        urlparam, {}, {}, [{ // body传参
            'code': serviceCode,
            'id': selId,
            'name': serviceName,
            'remark': serviceRemark
        }],
        function(result) {
            // 获取数据后解析形成树形节点；
            if(result == "") {
                return;
            }
            if(!result.data) {
                return;
            }

            if(result.data.length > 0) {
                if(result.data[0].datas) {
                    var serviceName = result.data[0].datas.name;
                    var serviceId = result.data[0].datas.id;

                    mytree.setItemText(serviceId, serviceName, serviceName);
                    var treenode = mytree.item(serviceId);
                    if(treenode) {
                        treenode.code = result.data[0].datas.code;
                        treenode.remark = result.data[0].datas.remark;
                        treenode.builtin = result.data[0].datas.builtin;
                    }
                    var objKey = "hw" + serviceId;
                    mytree.itemObj[objKey] = treenode;
                }
            }
        },
        function(msg) {
            Ext.Msg.alert(msg);
            // Ext.Msg.alert("提示", "保存失败！");
        }
    );
    
    // // 模板节点
    // hwDas.ajax({
    //     das: {
    //         idedas: true
    //     },
    //     url: "DataService/Service/Project",
    //     // url: "http://192.168.1.188:8050/DasService/DataService/DataService/Service/Project",
    //     type: 'put',
    //     timeout: 5000,
    //     data: [{ // body传参
    //         'code': serviceCode,
    //         'id': selId,
    //         'name': serviceName,
    //         'remark': serviceRemark
    //     }],
    //     success: function(result) {

    //         if(result == "") {
    //             return;
    //         }
    //         if(!result.data) {
    //             return;
    //         }

    //         if(result.data.length > 0) {
    //             if(result.data[0].datas) {
    //                 var serviceName = result.data[0].datas.name;
    //                 var serviceId = result.data[0].datas.id;

    //                 mytree.setItemText(serviceId, serviceName, serviceName);
    //                 var treenode = mytree.item(serviceId);
    //                 if(treenode) {
    //                     treenode.code = result.data[0].datas.code;
    //                     treenode.remark = result.data[0].datas.remark;
    //                     treenode.builtin = result.data[0].datas.builtin;
    //                 }
    //                 var objKey = "hw" + serviceId;
    //                 mytree.itemObj[objKey] = treenode;
    //             }
    //         }
    //     },
    //     error: function(msg) {
    //         Ext.Msg.alert("提示", "编辑节点失败！")
    //     }
    // })
}

//自定义自定义方法

function newGuid(len) {
    var length = 32;
    if(len)
        length = len - 2
    var guid = "";
    for(var i = 1; i <= length; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
    }
    return "hw" + guid;
}

function button3_click(sender, e) {
    viewDataService();
}
			this.DataServiceModuleInfo_afterrender=DataServiceModuleInfo_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:"模块基础信息",
				x:60,
				y:30,
				style:"color: blue;    font-size: 20px;"
			},
			{
				xtype:"label",
				id:"label1",
				text:"模块编码：",
				x:60,
				y:90
			},
			{
				xtype:"label",
				id:"label2",
				text:"模块名称：",
				x:60,
				y:130
			},
			{
				xtype:"label",
				id:"label3",
				text:"创建人：",
				x:60,
				y:170
			},
			{
				xtype:"label",
				id:"label4",
				text:"创建时间：",
				x:60,
				y:210
			},
			{
				xtype:"label",
				id:"label5",
				text:"修改人：",
				x:60,
				y:250
			},
			{
				xtype:"label",
				id:"label6",
				text:"修改时间：",
				x:60,
				y:290
			},
			{
				xtype:"label",
				id:"label7",
				text:"路径：",
				x:60,
				y:330
			},
			{
				xtype:"label",
				id:"label8",
				text:"说明：",
				x:60,
				y:370
			},
			{
				xtype:"textfield",
				id:"hwText",
				allowBlank:true,
				x:120,
				y:90,
				width:450,
				disabled:true
			},
			{
				xtype:"textfield",
				id:"hwText1",
				allowBlank:true,
				x:120,
				y:130,
				width:450
			},
			{
				xtype:"textfield",
				id:"hwText2",
				allowBlank:true,
				x:120,
				y:170,
				width:450,
				disabled:true
			},
			{
				xtype:"textfield",
				id:"hwText3",
				allowBlank:true,
				x:120,
				y:210,
				width:450,
				readOnly:false,
				disabled:true
			},
			{
				xtype:"textfield",
				id:"hwText4",
				allowBlank:true,
				x:120,
				y:250,
				width:450,
				disabled:true
			},
			{
				xtype:"textfield",
				id:"hwText5",
				allowBlank:true,
				x:120,
				y:290,
				width:450,
				disabled:true
			},
			{
				xtype:"textfield",
				id:"hwText6",
				allowBlank:true,
				x:120,
				y:330,
				width:450,
				disabled:true
			},
			{
				xtype:"textarea",
				id:"hwText7",
				allowBlank:true,
				x:120,
				y:370,
				width:450,
				height:80
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"保存",
				type:"info",
				size:"large",
				x:410,
				y:470,
				click:"button_click",
				listeners:{
					click:button_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button3",
				text:"查看",
				type:"info",
				size:"large",
				x:500,
				y:470,
				click:"button3_click",
				listeners:{
					click:button3_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button4",
				text:"测试注册",
				type:"(none)",
				size:"small",
				x:480,
				y:530,
				width:80,
				hidden:true
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.refresh= function(tree,projectid,workspaceid){
//直接填写方法内容

refresh(tree,projectid,workspaceid)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.DataServiceModuleInfo");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.DataServiceModuleInfo");
	}
})