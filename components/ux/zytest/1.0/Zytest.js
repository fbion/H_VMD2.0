Ext.define("vmd.ux.Zytest" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Zytest",
	title:"Panel",
	header:false,
	border:false,
	width:618,
	height:36,
	layout:"absolute",
	uxCss:".header-middle #yarnball {    width: 100%;    height: 32px;    overflow: hidden;    float: left;    border: 1px solid #ddd;    margin-left: -1px;    padding-left: 5px;}.header-middle #yarnball .yarnball {    list-style: none;    margin: 0;    margin-top: -1px;    padding: 0;    position: relative;}.header-middle #yarnball .yarnball .yarnlet {    display: inline-block;    float: left;}.header-middle #yarnball .yarnball .yarnlet a,.header-middle #yarnball .yarnball .yarnlet a:link,.header-middle #yarnball .yarnball .yarnlet a:visited {    color: #666;    display: inline-block;    font-size: 1em;    padding: 0px 15px 0px 20px;    margin-left: -15px;    position: relative;    text-decoration: none;    vertical-align: top;    line-height: 27px;}.header-middle #yarnball .yarnball .yarnlet.first a {    margin-left: 0px;    padding-left: 15px;}.header-middle #yarnball .yarnball .yarnlet a:hover {    background-position: 100% -48px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a:active,.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    background-position: 100% -96px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    color: #fff;    background-position: 100% -144px;}.header-middle #yarnball .yarnball .yarnlet .left-yarn {    background: url(\"/img/common/ybutton.png\") no-repeat 0 -2px;    margin-left: -17px;    padding: 5px 6px 11px 4px;    z-index: 11;    padding-top: 5px \9;}.header-middle #yarnball .yarnball .yarnlet a:hover .left-yarn {    background-position: 0 -50px;}.header-middle #yarnball .yarnball .yarnlet a:active .left-yarn {    background-position: 0 -98px;}.header-middle #yarnball-input input.path {    border: none;    height: 25px;    display: block;    width: 100%;    padding: 0;    padding-left: 10px;    padding-right: 10px;    background: #f8f8f8;    background: #f8f8f8 url(\"/img/common/bg.gif\") 0px -2px repeat-x;    background: none;    width: 94%;    font-size: 1em;    line-height: 25px;    color: #444;}.header-middle #yarnball-input input:focus {    outline: none;}#yarnball p{    display: inline-block;}.Ntext{    display: inline-block;    line-height: 32px;    cursor: default;}.icon-caret-right,.icon-caret-down{    padding: 0 5px;}",
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
// 返回主页按键点击事件
function homeButton_click(sender, e) {
    that.fireEvent("homeClick", sender, e)
}

function yarnball_ct_afterrender(sender) {
    sender.setPath = function(address, path, isStorage) {
        addressSet(address, path, isStorage);
    }
    var addressSet = function(address, path, isStorage) {
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
            var str = '<div> ';
            for(var i = 0; i < addressObj.length; i++) {
                if(i == addressObj.length - 1) {
                    str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span><p>'
                } else {
                    str += '<p data-id="' + addressObj[i].id + '" ><span class = "Ntext" data-textPath="' + addressObj[i].textPath + '"  data-idPath="' + addressObj[i].idPath + '">' + addressObj[i].text + '</span>' +
                        '<i class = "icon-caret-right"  data-id="' + addressObj[i].id + '"  ></i></p>'
                }
            }
            str += '<div> ';
            // 记录节点操作痕迹
            if(isStorage == false||isStorage=='undefined') {
                
            } else {  // 新操作的节点才记录，回退或前进操作不进行记录
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
            return str
        };
        $("#yarnball").html(_addressSet(address, path));
    }
    //初始化
    $("#yarnball span").die("click").live("click",
        function(e) {
            var t = $(this).attr("data-textPath");
            var d = $(this).attr("data-idPath");
            addressSet(t, d);
            that.fireEvent('pathClick', sender, t, d);
            stopPP(e)
        });
    $("#yarnball i").die("click").live("click",
        function(e) {
            if($(this).hasClass('icon-caret-right')) {
                $(this).removeClass('icon-caret-right');
                $(this).addClass('icon-caret-down');
            } else if($(this).hasClass('icon-caret-down')) {
                $(this).removeClass('icon-caret-down');
                $(this).addClass('icon-caret-right');
            }
            var id = $(this).attr("data-id");
            that.fireEvent('patnIcoClick', sender, $(this), id);
            stopPP(e);
        });
}

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
    if(NodeData[0].id == nowNode.id) {
        preIsShow = false;
    } else {
        preIsShow = true;
    }
    callback(nowNode.nodeId)
}

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
    if(NodeData[NodeData.length - 1].id == nowNode.id) {
        nextIsShow = false;
    } else {
        nextIsShow = true;
    }
    callback(nowNode.nodeId)
}
			this.items=[
			{
				xtype:"vmd.button",
				id:"homeButton",
				type:"(none)",
				size:"small",
				x:0,
				y:0,
				style:"background-image: url(\"/img/public/u165.png\");    background-repeat: no-repeat;    background-position: center center;    border-radius: 0px;    background-size: 22px 20px;    border-top: 0;    border-left: 0;",
				width:42,
				click:"homeButton_click",
				height:34,
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
				x:42,
				y:0,
				afterrender:"yarnball_ct_afterrender",
				html:"<div id=\"yarnball\" style=\"display: block\">    <div>        <span class=\"Ntext\">组织机构</span>        <i class=\"icon-caret-right\">        </i>        <span class=\"Ntext\">单位管理</span>    </div></div><div id=\"yarnball-input\" style=\"display: none;\">    <input type=\"text\" name=\"path\" value=\"\" class=\"path\" id=\"path\"></div>",
				cls:"header-middle",
				listeners:{
					vmdafterrender:yarnball_ct_afterrender
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
	Ext.util.CSS.removeStyleSheet("vmd.ux.Zytest");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Zytest");
	}
})