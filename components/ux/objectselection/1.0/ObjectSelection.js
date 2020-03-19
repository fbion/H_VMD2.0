Ext.define("vmd.ux.ObjectSelection" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ObjectSelection",
	title:"Panel",
	header:false,
	border:false,
	width:840,
	height:100,
	layout:"hbox",
	autoHeight:true,
	afterrender:"ObjectSelection_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.ObjectSelection_afterrender(this)
}
	},
	uxCss:".spsty {    color: #1d90e6;    margin-right: 15px;    font-size: 14px;    cursor: pointer;} .mark {     position: relative;     float: left;     margin-right: 10px;     margin-bottom: 5px;     cursor: pointer; } .content {     position: absolute;     left: 0;     top: 0;     opacity: .5;     /*background: #000;*/     height: 35px;     display: none;     cursor: pointer;     text-align: right;     border: 1px solid #99bbe8; } .imgcl{     width: 19px;     height: 19px; }",
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
var win;
var userOrorgList = [];
var bs = false;
var ip = vmd.workspace.dataServiceIp;
var noticeid = 'sUw0OAs0xS9KLNuEQhH3GZZjqvTkBDjj'//vmd.getUrlParam('noticeid');
var chooseUser = [];
var chooseoption = [];
window.choose = function(sender) {
    page.fireEvent('chooseClick');
    win = new vmd.window({
        url: './hwd9fc3457.html?noticeid=' + noticeid,
        auto: false,
        title: "对象选择",
        width: '800px',
        style: 'border:0px !important',
        align: 'center',
    });
    win.show();
    bs = true;
}


window.closeWinD = function() {
    win.hide();
}

window.addNodes = function(obj) {
    userOrorgList=[];
    chooseoption = [];
    chooseUser = [];
    var panel4id = panel4.el.dom.childNodes[0].childNodes[0].id;
    var panel5id = panel5.el.dom.childNodes[0].childNodes[0].id;
    $('#' + panel4id + '').empty();
    $('#' + panel5id + '').empty();
    if(obj.length > 0) {
        for(var i = 0; i < obj.length; i++) {
            //var item = "<div id='div'" + obj[i].id + "' style='float: left;margin-right: 10px;margin-bottom: 5px;'><span  class='spsty' id='span'" + obj[i].id + "'   onclick=del('" + obj[i].id + "');>" + obj[i].name + "</span><div>";
            var item = '<div id="div' + obj[i].id + '"  class="mark" onmouseover=show("' + obj[i].id + '") onmouseout=hide("' + obj[i].id + '")><span class="spsty"  id="span' + obj[i].id + '">' + obj[i].name + '</span><a href="#" onclick=del("' + obj[i].id + '","' + obj[i].type + '");><div  id="div1' + obj[i].id + '" class="content"><img id="img+' + obj[i].id + '" class="imgcl" src="{资源中心&&资源中心服务器}/图片/松南/删除.png"/></div></a>';
            userOrorgList.push(obj[i].id);
            if(obj[i].type == 'org') {
                $('#' + panel5id + '').append(item);
                chooseoption.push(obj[i]);
            } else {
                $('#' + panel4id + '').append(item);
                chooseUser.push(obj[i]);
            }
        }

    }
    page.fireEvent('loadPanal');

}

window.del = function(id,type) {
    $('#div' + id).remove();
    userOrorgList.remove(id);
}

window.getOrgOusers = function() {
    return userOrorgList;
}

window.getchooseUser = function() {
    return chooseUser;
}
window.getchooseOption = function() {
    return chooseoption;
}
window.getBsf = function() {
    return bs;
}

window.show = function(id) {
    var ob = $('#div1' + id);
    var obwit = $('#div' + id)[0].clientWidth + 5;
    var obhei = $('#div' + id)[0].clientHeight;
    ob[0].style.width = obwit + 'px';
    ob[0].style.height = obhei + 'px';
    ob[0].style.display = "block";
}

window.hide = function(id) {
    var ob = $('#div1' + id);
    ob[0].style.display = "none";
}



function ObjectSelection_afterrender(sender){

}
			this.ObjectSelection_afterrender=ObjectSelection_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				layoutConfig:{
					align:"middle",
					pack:"start"
				},
				title:"Panel",
				header:false,
				border:true,
				height:35,
				width:78,
				layout:"hbox",
				style:"overflow: hidden;",
				items:[
					{
						xtype:"label",
						id:"label",
						text:"接收对象：",
						style:"font-size: 14px;    overflow: hidden;",
						width:71,
						html:"<span onclick=\"choose();\" style=\"cursor:pointer;\">接收对象：</span>"
					}
				]
			},
			{
				xtype:"panel",
				id:"panel1",
				title:"Panel",
				header:false,
				border:true,
				width:763,
				layout:"auto",
				style:"overflow: hidden !important;",
				autoWidth:false,
				autoHeight:true,
				items:[
					{
						xtype:"panel",
						id:"panel2",
						title:"Panel",
						header:false,
						border:true,
						width:760,
						padding:"4",
						layout:"auto",
						autoHeight:true,
						autoScroll:false,
						margins:"0 0 3px 0",
						items:[
							{
								xtype:"vmd.img",
								id:"hwImg",
								width:22,
								height:25,
								src:"/img/public/用户组.png"
							},
							{
								xtype:"panel",
								id:"panel4",
								title:"Panel",
								header:false,
								border:true,
								height:35,
								width:727,
								margins:"0 0 0 5px",
								padding:"3",
								autoHeight:true,
								layout:"fit",
								autoScroll:false,
								style:"float: right;"
							}
						]
					},
					{
						xtype:"panel",
						id:"panel3",
						title:"Panel",
						header:false,
						border:true,
						width:759,
						padding:"4",
						layout:"auto",
						autoHeight:true,
						autoScroll:false,
						autoWidth:false,
						items:[
							{
								xtype:"vmd.img",
								id:"hwImg1",
								width:24,
								height:25,
								src:"/img/public/岗位.png"
							},
							{
								xtype:"panel",
								id:"panel5",
								title:"Panel",
								header:false,
								border:true,
								height:33,
								width:727,
								margins:"0 0 0 2px ",
								padding:"3",
								autoWidth:false,
								autoHeight:true,
								layout:"fit",
								autoScroll:false,
								style:"float: right;"
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
			this.closeWin= function(){
//直接填写方法内容
closeWinD();
	}
		this.addNode= function(obj){
//直接填写方法内容
addNodes(obj);
	}
		this.getOrgOuser= function(){
//直接填写方法内容
getOrgOusers();
return userOrorgList;
	}
		this.getBs= function(){
//直接填写方法内容
getBsf();
return bs;
	}
		this.getchooseUse= function(){
//直接填写方法内容
getchooseUser();
return chooseUser;
	}
		this.getchooseOptions= function(){
//直接填写方法内容
getchooseOption();
return chooseoption;
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ObjectSelection");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ObjectSelection");
	}
})