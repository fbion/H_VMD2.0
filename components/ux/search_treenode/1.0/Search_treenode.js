Ext.define("vmd.ux.Search_treenode" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Search_treenode",
	title:"Panel",
	header:false,
	border:false,
	width:220,
	height:400,
	layout:"border",
	hideRoot:false,
	uxCss:".vmd-tree .x-panel-bwrap .x-panel-body {    background-color: #fff66;    /*树形的背景色*/}",
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
			 var me = this;
 //放大镜
 function hwImg_click(sender) {
     var txt_val = hwText.getValue();
     tree_daohang.filterBy(txt_val);
 }
 //导航树形绑定完数据后，展开全部
 function tree_daohang_afterBindData(sender, node) {
     tree_daohang.expandAll();
 }
 //导航树形 得到所有被 勾选的节点 的id 
 var checked_jd = "";

 function tree_daohang_checkChanged(sender, node, checked) {
      checked_jd = "";
     var roonodes = tree_daohang.getRootNode().childNodes;
     for(var i = 0; i < roonodes.length; i++) {
         if(roonodes[i].childNodes.length > 0) {
             findchildnode(roonodes[i]);
         } else {
             if(roonodes[i].attributes.checked) {
                 checked_jd = checked_jd +""+ roonodes[i].id + ",";
             }
         }
     }
 
     var checkedNodes = [];
     if(checked) checkedNodes = tree_daohang.getChecked();
     me.fireEvent("treeNode_checkChanged", sender, node, checked, checkedNodes,checked_jd);
 }

 function findchildnode(roonodes) { 
     var childnodes = roonodes.childNodes;
     for(var i = 0; i < childnodes.length; i++) { // 从节点中取出子节点依次遍历
         var rootnode = childnodes[i];
         if(rootnode.childNodes.length == 0) {
             if(rootnode.attributes.checked) {
                 checked_jd = checked_jd+"" + rootnode.id + ",";
             }
         }
         findchildnode(rootnode); // 如果存在子节点 递归
     }
 }

 
function hwText_beforerender(sender){
 hwText.enableKeyEvents =true;
}
function hwText_keyup(sender,e){
      if(sender.startValue!=""&& sender.getValue()=="")
    { 
        tree_daohang.filterBy("");
         tree_daohang.expandAll();
        //树过滤
    } 
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:214,
				height:57,
				x:0,
				y:0,
				region:"north",
				items:[
					{
						xtype:"vmd.div",
						id:"div",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:183,
						height:28,
						x:15,
						y:15,
						layout:"absolute",
						items:[
							{
								xtype:"textfield",
								id:"hwText",
								allowBlank:true,
								height:26,
								width:150,
								style:"border-top: 0px solid #dbdbdb;    border-right: 0px solid #ffffff;    border-left: 0px solid #dbdbdb;    border-bottom: 0px solid #dbdbdb;",
								x:0,
								y:0,
								beforerender:"hwText_beforerender",
								keyup:"hwText_keyup",
								listeners:{
									beforerender:hwText_beforerender,
									keyup:hwText_keyup
								}
							},
							{
								xtype:"vmd.div",
								id:"div3",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:20,
								height:20,
								style:"cursor: pointer",
								x:155,
								y:3,
								items:[
									{
										xtype:"vmd.img",
										id:"hwImg_cx",
										width:20,
										height:20,
										src:"/img/public/松南调度中心-搜索.png",
										x:191,
										y:3,
										region:"center",
										click:"hwImg_click",
										cls:"yy",
										listeners:{
											click:hwImg_click
										}
									}
								]
							}
						]
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div2",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:177,
				height:291,
				region:"center",
				layout:"fit",
				items:[
					{
						xtype:"vmd.treeex",
						id:"tree_daohang",
						width:169,
						height:270,
						hideRoot:this.hideRoot,
						style:"margin-top: -5px;",
						checkChanged:"tree_daohang_checkChanged",
						afterBindData:"tree_daohang_afterBindData",
						x:10,
						y:0,
						leafImg:"/img/public/treesxt.png",
						listeners:{
							checkChanged:tree_daohang_checkChanged,
							afterBindData:tree_daohang_afterBindData
						},
						store:this.store,
						parentField:this.parentField,
						valueField:this.valueField,
						textField:this.textField,
						loadType:this.loadType,
						rootText:this.rootText,
						checkBox:this.checkBox,
						rootValue:this.rootValue,
						cascading:this.cascading,
						queryVar:this.queryVar
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Search_treenode");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Search_treenode");
	}
})