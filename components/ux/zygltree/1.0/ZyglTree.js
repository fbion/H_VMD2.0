Ext.define("vmd.ux.ZyglTree" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ZyglTree",
	title:"Panel",
	header:false,
	border:false,
	width:244,
	height:543,
	layout:"border",
	bodyStyle:"background-color: #fff;",
	store:"store",
	treeRootValue:"0000000001",
	treeRootText:"资源中心服务器",
	uxCss:".img-border:hover{   background-color: #D0D0D0;}",
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
var me=this;
//主页按钮点击事件
function hwImg_click(sender){
    if(tree.getRootNode())
    {
        tree.getRootNode().select();
    }
    me.fireEvent("homeClick",sender);
}

//主页按钮点击事件
function hwImg1_click(sender){
me.fireEvent("creatCategory",sender);
}

//主页按钮点击事件
function hwImg2_click(sender){
me.fireEvent("creatFile",sender);
}

//主页按钮点击事件
function hwImg3_click(sender){
me.fireEvent("refreshTree",sender);
}

//主页按钮点击事件
function tree_nodeclick(sender,node,e){
me.fireEvent("resourceNodeClick",sender,node,e);
}

function tree_afterShowMenu(sender,node, e){
me.fireEvent("onAfterShowMenu",sender,node,e);
}

function tree_beforeShowMenu(sender,node, e){
me.fireEvent("onBeforeShowMenu",sender,node,e);
}

function tree_afterBindData(sender){
me.fireEvent("afterCategoryBind",sender);
}



function store_load(sender,records,options){
me.fireEvent("afterCategoryBind",sender);
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				layoutConfig:{
					align:"middle",
					pack:"center"
				},
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:35,
				region:"north",
				style:"border-left: 0;border-right:  0;border-top:  0;",
				layout:"hbox",
				items:[
					{
						xtype:"vmd.img",
						id:"hwImg",
						width:22,
						height:22,
						margins:"0 10 0 10",
						src:"/img/public/首页.png",
						click:"hwImg_click",
						cls:"img-border",
						listeners:{
							click:hwImg_click
						}
					},
					{
						xtype:"vmd.img",
						id:"hwImg1",
						width:22,
						height:22,
						margins:"0 10 0 10",
						src:"/img/public/网盘-新建文件夹.png",
						click:"hwImg1_click",
						cls:"img-border",
						listeners:{
							click:hwImg1_click
						}
					},
					{
						xtype:"vmd.img",
						id:"hwImg2",
						width:22,
						height:22,
						margins:"0 10 0 10",
						src:"/img/public/新建文件.png",
						click:"hwImg2_click",
						cls:"img-border",
						listeners:{
							click:hwImg2_click
						}
					},
					{
						xtype:"vmd.img",
						id:"hwImg3",
						width:22,
						height:22,
						margins:"0 10 0 10",
						src:"/img/public/刷新.png",
						click:"hwImg3_click",
						cls:"img-border",
						listeners:{
							click:hwImg3_click
						}
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				region:"center",
				layout:"fit",
				items:[
					{
						xtype:"vmd.treeex",
						id:"tree",
						width:251,
						height:270,
						hideRoot:false,
						nodeclick:"tree_nodeclick",
						store:this.store,
						parentField:"parent_id",
						valueField:"category_id",
						textField:"name",
						loadType:"全部加载",
						rootValue:this.treeRootValue,
						rootText:this.treeRootText,
						afterShowMenu:"tree_afterShowMenu",
						beforeShowMenu:"tree_beforeShowMenu",
						leafImg:"/img/public/folderClosed.gif",
						afterBindData:"tree_afterBindData",
						rootImg:"/img/public/server2.png",
						listeners:{
							nodeclick:tree_nodeclick,
							afterShowMenu:tree_afterShowMenu,
							beforeShowMenu:tree_beforeShowMenu,
							afterBindData:tree_afterBindData
						},
						contentMenu:this.treemenu
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.addCartery= function(parId,nodeId,nodeText,path,serverid,info,success,error){
//直接填写方法内容
//直接填写方法内容
tree.addNode({
    pid: parId,
    cid: nodeId,
    cname: nodeText,
    isleaf: true,
    changeStore: true,
    upDateDB: true,
    dataRecord: {
        category_id: nodeId,
        parent_id: parId,
        name: nodeText,
        path: path,
        info: info,
        server_id:serverid
    },
    success:success,
    error:error
})
	}
		this.getSelNodeId= function(){
//直接填写方法内容
return tree.getSelNodeId();
	}
		this.setNodeSel= function(nodeID){
//直接填写方法内容
var tselNode=tree.getNodeById(nodeID);
if(tselNode)
    tselNode.select();
	}
		this.getSelNodepath= function(){
//直接填写方法内容

var getPName = function(pnode) {
    if(pnode.id == tree.root.id) {
        return ""
    }
    if(pnode.parentNode && pnode.parentNode.parentNode) {
        return getPName(pnode.parentNode) + "/" + pnode.text;
    } else {
        return pnode.text;
    }
}

var selnode = tree.getSelNode();

var nodepath = getPName(selnode);
return nodepath;
//if(selnode.isRoot || !selnode.nodeDataJson) {
//    return "";
//} else {
//    return selnode.nodeDataJson.path;
//}
	}
		this.removeCaretory= function(nodeId,success,error){
//直接填写方法内容
tree.removeNodeById(nodeId,true,false,false,true,success,error)
	}
		this.getSelCartery= function(){
//直接填写方法内容
return tree.getSelNode();
	}
		this.setCarteryName= function(nodeId,name){
//直接填写方法内容
var treenode = tree.getNodeById(nodeId);
if(treenode)
    treenode.setText(name);
	}
		this.getCategoryById= function(nodeId){
//直接填写方法内容
return tree.getNodeById(nodeId)
	}
		this.getSelNodeparentId= function(){
//直接填写方法内容
var selNodepar = tree.getSelNode();
if(selNodepar && selNodepar.parentNode)
    return selNodepar.parentNode.id
else return ""
	}
		this.setRootValue= function(value){
//直接填写方法内容
tree.rootValue=value;
	}
		this.setRootText= function(text){
//直接填写方法内容
tree.rootText=text;
	}
		this.setEditVisible= function(visible){
//直接填写方法内容
div.setVisible(visible);
this.onBodyResize()

	}
		this.getIdByPath= function(path){
//直接填写方法内容

 var id="";
		var findCNode = function(iNode) {
			if(iNode.childNodes.length > 0) {
				for(var j = 0; j < iNode.childNodes.length; j++) {
					if(iNode.childNodes[j].getPath("text").replace(/(^\/)|(\/$)/g, "") == path.replace(/(^\/)|(\/$)/g, "")) {
						id=iNode.childNodes[j].id;
						break;
					} else findCNode(iNode.childNodes[j])
				}
			}
		}
	
			if(this.tree.getRootNode().getPath("text").replace(/(^\/)|(\/$)/g, "") == path.replace(/(^\/)|(\/$)/g, "")) {
				id = this.tree.getRootNode().id;
			} else findCNode(this.tree.getRootNode());
			
			return id;
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ZyglTree");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.ZyglTree");
	}
})