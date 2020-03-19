Ext.define("vmd.ux.Navigation" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Navigation",
	title:"Panel",
	header:false,
	border:false,
	width:618,
	height:31,
	layout:"absolute",
	beforerender:"Navigation_beforerender",
	listeners:{
		beforerender:function(){
	this.Navigation_beforerender(this)
}
	},
	uxCss:".header-middle #yarnball {    width: 100%;    cursor: text;    height: 26px;    overflow: hidden;    float: left;    border: 1px solid #ddd;    margin-left: -1px;    box-shadow: #e6e6e6 0px 0px 20px inset;    background: #f8f8f8;    background: #f8f8f8 url(\"/img/common/bg.gif\") 0px -2px repeat-x;}.header-middle #yarnball .yarnball {    list-style: none;    margin: 0;    margin-top: -1px;    padding: 0;    position: relative;}.header-middle #yarnball .yarnball .yarnlet {    display: inline-block;    float: left;}.header-middle #yarnball .yarnball .yarnlet a,.header-middle #yarnball .yarnball .yarnlet a:link,.header-middle #yarnball .yarnball .yarnlet a:visited {    color: #666;    display: inline-block;    font-size: 1em;    padding: 0px 15px 0px 20px;    margin-left: -15px;    position: relative;    text-decoration: none;    vertical-align: top;    line-height: 27px;}.header-middle #yarnball .yarnball .yarnlet.first a {    margin-left: 0px;    padding-left: 15px;}.header-middle #yarnball .yarnball .yarnlet a {    background-image: url(\"/img/common/ybutton.png\");    background-repeat: no-repeat;    background-position: 100% 0;    cursor: pointer;    height: 27px;}.header-middle #yarnball .yarnball .yarnlet a:hover {    background-position: 100% -48px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a:active,.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    background-position: 100% -96px;    color: #333;}.header-middle #yarnball .yarnball .yarnlet a.curDropToPath {    color: #fff;    background-position: 100% -144px;}.header-middle #yarnball .yarnball .yarnlet .left-yarn {    background: url(\"/img/common/ybutton.png\") no-repeat 0 -2px;    margin-left: -17px;    padding: 5px 6px 11px 4px;    z-index: 11;    padding-top: 5px \9;}.header-middle #yarnball .yarnball .yarnlet a:hover .left-yarn {    background-position: 0 -50px;}.header-middle #yarnball .yarnball .yarnlet a:active .left-yarn {    background-position: 0 -98px;}.header-middle #yarnball-input {    height: 26px;    width: 100%;    cursor: text;    float: left;    border: 1px solid #ddd;    display: none;    margin-left: -1px;    background: #f8f8f8;    background: #f8f8f8 url(\"/img/common/bg.gif\") 0px -2px repeat-x;    box-shadow: #e6e6e6 0px 0px 20px inset;}.header-middle #yarnball-input input.path {    border: none;    height: 25px;    display: block;    width: 100%;    padding: 0;    padding-left: 10px;    padding-right: 10px;    background: #f8f8f8;    background: #f8f8f8 url(\"/img/common/bg.gif\") 0px -2px repeat-x;    background: none;    width: 94%;    font-size: 1em;    line-height: 25px;    color: #444;}.header-middle #yarnball-input input:focus {    outline: none;}",
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
// 返回主页按键点击事件
function homeButton_click(sender, e) {
    that.fireEvent("homeClick", sender, e)
}
// 返回键点击事件
function previousButton_click(sender, node, e) {
    that.fireEvent("previousClick", sender, node, e)
}
// 下一级按键点击事件
function nextButton_click(sender, node, e) {
    that.fireEvent("nextClick", sender, node, e)
}

function yarnball_ct_afterrender(sender) {
    
    sender.setPath=function(path,runEvent){
        addressSet(path,runEvent);
    }
    var hiddenSetVal = function(e,runEvent) {
        var t = $("#yarnball-input .path");
        if(void 0 == e) {
            var a = t.val();
            return a = rtrim(core.pathClear(a)) + "/"
        }
        t.val(e)
        if(runEvent)
            that.fireEvent('pathClick',sender,e);
    }
    var addressSet = function(address,runEvent) {
        
        hiddenSetVal(address,runEvent);
        $("#yarnball-input").css("display", "none");
        $("#yarnball").css("display", "block");
        var _addressSet = function(address) {
            var e = address;
            var t = '<li class="yarnlet first"><a title="@1@" data-path="@1@" style="z-index:{$2};"><span class="left-yarn"></span>{$3}</a></li>',
                a = '<li class="yarnlet "><a title="@1@" data-path="@1@" style="z-index:{$2};">{$3}</a></li>';
            e = e.replace(/\/+/g, "/");
            var i = e.split("/");
            "" == i[i.length - 1] && i.pop();
            var n = i[0] + "/",
                o = t.replace(/@1@/g, n),
                s = i[0],
                r = "";

            o = o.replace("{$2}", i.length);

            o = o.replace("{$3}", r + '<span class="title-name">' + htmlEncode(s) + "</span>");
            for(var c = o,
                    d = 1,
                    p = i.length - 1; i.length > d; d++, p--) {
                n += htmlEncode(i[d]) + "/";
                var o = a.replace(/@1@/g, n);
                o = o.replace("{$2}", p),
                    o = o.replace("{$3}", '<span class="title-name">' + htmlEncode(i[d]) + "</span>"),
                    c += o
            }
            return '<ul class="yarnball">' + c + "</ul>"
        };
        $("#yarnball").html(_addressSet(address,true));
        $(".yarnball").stop(!0, !0);
        var e = $("#yarnball").innerWidth(),
            t = 0;
        $("#yarnball li a").each(function() {
            t += $(this).outerWidth() + parseInt($(this).css("margin-left")) + 5
        });
        var a = e - t;
        0 >= a ? $(".yarnball").css("width", t + "px").css("left", a + "px") : $(".yarnball").css({
            left: "0px",
            width: e + "px"
        })
    }
    var t = "WWW/资源管理/data/User/admin/home/";
    addressSet(t,true)
    //初始化
    $("#yarnball li a").die("click").live("click",
        function(e) {
            
            var t = $(this).attr("data-path");
            addressSet(t,true);
            //that.fireEvent('pathClick',sender,t);
            stopPP(e)
        });

    $("#yarnball").die("click").live("click",
        function() {
            return $("#yarnball").css("display", "none"),
                $("#yarnball-input").css("display", "block"),
                $("#yarnball-input input").focus(), !0
        });
    var e = $("#yarnball-input input");
    e.die("blur").live("blur",
        function() {
            addressSet(e.val(),true)
        }).keyEnter(function() {
        addressSet(e.val(),true)
    })
}

function Navigation_beforerender(sender){

}
			this.Navigation_beforerender=Navigation_beforerender;
		this.items=[
			{
				xtype:"vmd.button",
				id:"homeButton",
				type:"(none)",
				size:"small",
				x:0,
				y:0,
				style:"background-image: url(\"/img/public/home.png\");    background-repeat: no-repeat;    background-position: center center;    border-radius: 0px;",
				width:40,
				click:"homeButton_click",
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
				height:30,
				x:40,
				y:0,
				afterrender:"yarnball_ct_afterrender",
				html:"<div id=\"yarnball\" title=\"点击进入编辑状态\" style=\"display: block\">资源服务器 / 公共资源/ data.js</div><div id=\"yarnball-input\" style=\"display: none;\"><input type=\"text\" name=\"path\" value=\"\" class=\"path\" id=\"path\"></div>",
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
			this.setPath= function(path,runEvent){
//直接填写方法内容
yarnball_ct.setPath(path,runEvent)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Navigation");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Navigation");
	}
})