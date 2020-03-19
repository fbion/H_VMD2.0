Ext.define("vmd.ux.ISIP5Navigation" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ISIP5Navigation",
	title:"Panel",
	header:false,
	border:false,
	width:618,
	height:36,
	layout:"absolute",
	afterrender:"ISIP5Navigation_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.ISIP5Navigation_afterrender(this)
}
	},
	uxCss:".header-middle #yarnball {    width: 100%;    height: 32px;    overflow: hidden;    float: left;    border: 0;    /*border-left: 0;*/    /*border-top:0;*/    margin-left: -1px;    padding-left: 5px;}.header-middle #yarnball .yarnball {    list-style: none;    margin: 0;    margin-top: -1px;    padding: 0;    position: relative;}.header-middle #yarnball .yarnball .yarnlet {    display: inline-block;    float: left;}.header-middle #yarnball .yarnball .yarnlet a,.header-middle #yarnball .yarnball .yarnlet a:link,.header-middle #yarnball .yarnball .yarnlet a:visited {    color: #666;    display: inline-block;    font-size: 1em;    padding: 0px 15px 0px 20px;    margin-left: -15px;    position: relative;    text-decoration: none;    vertical-align: top;    line-height: 27px;}.header-middle #yarnball .yarnball .yarnlet.first a {    margin-left: 0px;    padding-left: 15px;}.header-middle #yarnball .yarnball .yarnlet a:hover {    background-position: 100% -48px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a:active,.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    background-position: 100% -96px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    color: #fff;    background-position: 100% -144px;}.header-middle #yarnball .yarnball .yarnlet .left-yarn {    background: url(\"/img/common/ybutton.png\") no-repeat 0 -2px;    margin-left: -17px;    padding: 5px 6px 11px 4px;    z-index: 11;    padding-top: 5px \9;}.header-middle #yarnball .yarnball .yarnlet a:hover .left-yarn {    background-position: 0 -50px;}.header-middle #yarnball .yarnball .yarnlet a:active .left-yarn {    background-position: 0 -98px;}.header-middle #yarnball-input input.path {    border: none;    height: 32px;    display: block;    width: 100%;    padding: 0;    padding-left: 10px;    padding-right: 10px;    background: #f8f8f8;    background: #f8f8f8 url(\"/img/common/bg.gif\") 0px -2px repeat-x;    background: none;    width: 94%;    font-size: 1em;    line-height: 25px;    color: #444;}.header-middle #yarnball-input input:focus {    outline: none;}.header-middle #yarnball-input input{    line-height: 32px;}#yarnball p{    display: inline-block;}.Ntext{    display: inline-block;    line-height: 32px;    cursor: default;}.icon-caret-right,.icon-caret-down{    padding: 0 5px;}",
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
			var that = this;
var NodeData = [],
    nowNode;
var preIsShow = false,
    nextIsShow = false;
var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name', 'idPath', 'textPath']
});
// 返回主页按键点击事件
function homeButton_click(sender, e) {
    that.fireEvent("homeClick", sender, e)
}

function yarnball_ct_afterrender(sender) {
    sender.setPath = function(address, path, isStorage) {
        addressSet(address, path, isStorage);
    }


    var addressSet = function(address, path, isStorage) {
        $("#yarnball-input input").val(address);
        var _addressSet = function(address, path, sStorage) {
            // 处理传递过来的路径
            var e = address;
            e = e.replace(/\/+/g, "/");
            var textData = e.split("/");
            "" == textData[textData.length - 1] && textData.pop();
            var i = path;
            i = i.replace(/\/+/g, "/");
            var idData = i.split("/");
            "" == idData[idData.length - 1] && idData.pop();
            "" == idData[0] && idData.shift();
            var addressObj = [];
            for(var i = 0; i < textData.length; i++) {
                addressObj.push({
                    id: idData[i],
                    text: textData[i],
                })
                if(addressObj[i - 1] && addressObj[i - 1].textPath) {
                    addressObj[i].textPath = addressObj[i - 1].textPath + textData[i] + '/';
                    addressObj[i].idPath = addressObj[i - 1].idPath + idData[i] + '/'
                } else {
                    addressObj[i].textPath = textData[i] + '/';
                    addressObj[i].idPath = idData[i] + '/';
                }
            }
            // 生成导航DOM结构
            var str = '';
            for(var i = 0; i < addressObj.length; i++) {
                // if(i == addressObj.length - 1) {
                //     str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span><p>'
                // } else {
                str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span>' +
                    '<i class = "icon-caret-right"  data-id="' + addressObj[i].id + '" ></i></p>'
                // }
            }

            // 记录节点操作痕迹
            if(isStorage == false) {

            } else { // 新操作的节点才记录，回退或前进操作不进行记录
                var id = vmd.getGuid();
                nowNode = {
                    id: id,
                    nodeId: addressObj[addressObj.length - 1].id,
                    t: address,
                    p: path
                }
                NodeData.push({
                    id: id,
                    nodeId: addressObj[addressObj.length - 1].id,
                    t: address,
                    p: path
                })
            }
            isEabled();
            return str
        };
        $("#yarnball").html(_addressSet(address, path));
    }
    //初始化

    // $("#yarnball span").unbind("click");
    $("#yarnball").on("click", 'span',
        function(e) {
            var t = $(this).attr("data-textPath");
            var d = $(this).attr("data-idPath");
            var id = $(this).parent('p').attr('data-id');
            addressSet(t, d);
            that.fireEvent('pathClick', sender, t, d, id);
            stopPP(e)
        });
    // $("#yarnball i").unbind("click");
    $("#yarnball").on("click", 'i',
        function(e) {
            if($(this).hasClass('icon-caret-right')) {
                $(this).removeClass('icon-caret-right');
                $(this).addClass('icon-caret-down');
            } else if($(this).hasClass('icon-caret-down')) {
                $(this).removeClass('icon-caret-down');
                $(this).addClass('icon-caret-right');
            }

            var id = $(this).attr("data-id");
            that.fireEvent('patnIcoClick', sender, e, id);

            if(hwDataView.hidden) {
                var x = e.clientX - 30,
                    y = e.clientY + 10;
                hwDataView.setPosition(x, y)
                hwDataView.show();
            } else {
                hwDataView.hide()
            }
            stopPP(e);
        });

    $("#yarnball").on("click", function(e) {
        $("#yarnball").css("display", "none");
        $("#yarnball-input").css("display", "block");
         $("#yarnball-input input").focus();
    });
    $("#yarnball-input input").on('blur',function(e) {
        $("#yarnball").css("display", "block");
        $("#yarnball-input").css("display", "none");
    });
}
// 后退
function previous(callback) {
    if(!nowNode) {
        return
    }
    for(var i = 0; i < NodeData.length; i++) {
        if(NodeData[i].id == nowNode.id && NodeData[i - 1]) {
            yarnball_ct.setPath(NodeData[i - 1].t, NodeData[i - 1].p, false);
            nowNode = NodeData[i - 1];
            nextIsShow = true;
            break
        }
    }
    callback(nowNode.nodeId)
}
// 前进
function next(callback) {
    if(!nowNode) {
        return
    }
    for(var i = 0; i < NodeData.length; i++) {
        if(NodeData[i].id == nowNode.id && NodeData[i + 1]) {
            yarnball_ct.setPath(NodeData[i + 1].t, NodeData[i + 1].p, false);
            nowNode = NodeData[i + 1];
            preIsShow = true;
            break
        }
    }
    callback(nowNode.nodeId)
}
// 后退前进按钮是否可用
function isEabled() {
    if(NodeData.length < 2) {
        preIsShow = false;
        nextIsShow = false;
    } else {
        preIsShow = true;
        nextIsShow = true;
        if(NodeData[0].id == nowNode.id) {
            preIsShow = false;
        } else {
            preIsShow = true;
        }
        if(NodeData[NodeData.length - 1].id == nowNode.id) {
            nextIsShow = false;
        } else {
            nextIsShow = true;
        }
    }

}
// 子菜单赋值
function setMenuValue(childDta) {
    if(vmd.isArray(childDta)) {
        store.loadData(childDta);
        hwDataView.bindStore(store);
    }
}

function ISIP5Navigation_afterrender(sender) {
    Ext.getBody().appendChild(hwDataView.el);
    Ext.getBody().on('click', function() {
        if(!hwDataView.hidden) {
            hwDataView.hide();
            $("#yarnball i").removeClass('icon-caret-down');
            $("#yarnball i").addClass('icon-caret-right');
        }
    })
}
// 子文件菜单点击事件
function hwDataView_click(sender, index, node, e) {
    hwDataView.hide();
    var t = node.getAttribute("data-text");
    var d = node.getAttribute("data-path");
    var id = node.getAttribute("data-id");
    yarnball_ct.setPath(t, d);
    that.fireEvent('menuClick', sender, t, d, id);
}

function yarnball_ct_click(sender, e) {
    console.log(sender)
    console.log(e)
}
			this.ISIP5Navigation_afterrender=ISIP5Navigation_afterrender;
		this.items=[
			{
				xtype:"vmd.button",
				id:"homeButton",
				type:"(none)",
				size:"small",
				x:0,
				y:0,
				style:"background-image: url(\"/img/public/isip5_home.png\");    background-repeat: no-repeat;    background-size: 20px 20px;    background-position: center center;    border-radius: 0px;    border: 0;",
				width:36,
				click:"homeButton_click",
				height:30,
				listeners:{
					click:homeButton_click
				}
			},
			{
				xtype:"vmd.div",
				id:"yarnball_ct",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				height:32,
				x:30,
				y:0,
				afterrender:"yarnball_ct_afterrender",
				html:"<div id=\"yarnball\" style=\"display: block\">    <div>        <span class=\"Ntext\">组织机构</span>        <i class=\"icon-caret-right\">        </i>        <span class=\"Ntext\">单位管理</span>    </div></div><div id=\"yarnball-input\" style=\"display: none;\">    <input type=\"text\" name=\"path\" value=\"\" class=\"path\" id=\"path\"></div>",
				cls:"header-middle",
				click:"yarnball_ct_click",
				style:"border-left: 0;",
				listeners:{
					vmdafterrender:yarnball_ct_afterrender,
					click:yarnball_ct_click
				}
			},
			{
				xtype:"vmd.dataview",
				id:"hwDataView",
				itemSelector:"li.info",
				overClass:"info-hover",
				selectedClass:"x-view-selected",
				singleSelect:true,
				multiSelect:true,
				autoScroll:false,
				tpl:"<ul>    <tpl for=\".\">        <li class=\"info\" data-id=\"{id}\" data-text=\"{textPath}\" data-path=\"{idPath}\" style=\" padding:7px; padding-left:24px; background: url('/modules/hw3ce0447e/img/folderClosed.gif') 4px 4px  no-repeat; cursor: default;\">{name}</li>    </tpl></ul>",
				x:200,
				y:34,
				hidden:true,
				style:"/*border: 2px solid #ddd;*/    background-color: rgb(241,247,253);",
				click:"hwDataView_click",
				listeners:{
					click:hwDataView_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setPath= function(address, path){
//直接填写方法内容
yarnball_ct.setPath(address, path)
	}
		this.previousChange= function(callback){
//直接填写方法内容
previous(callback)
	}
		this.nextChange= function(callback){
//直接填写方法内容
 next(callback)
	}
		this.preIsEnabled= function(){
//直接填写方法内容
return preIsShow
	}
		this.nexIsEnabled= function(){
//直接填写方法内容
return nextIsShow
	}
		this.setChildMeun= function(childDta){
//直接填写方法内容
setMenuValue(childDta)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ISIP5Navigation");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ISIP5Navigation");
	}
})