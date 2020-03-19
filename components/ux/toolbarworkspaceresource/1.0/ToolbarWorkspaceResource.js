Ext.define("vmd.ux.ToolbarWorkspaceResource" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ToolbarWorkspaceResource",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:29,
	layout:"absolute",
	initComponent: function(){
		var pointerCtrlOwner = this;

function btnAddServer_click(sender, e) {
    pointerCtrlOwner.fireEvent('onClickBtnAddServer', sender, e);
}

function btnAddCategory_click(sender, e) {
    pointerCtrlOwner.fireEvent('onClickBtnAddCategory', sender, e);
}

function btnEdit_click(sender, e) {
    pointerCtrlOwner.fireEvent('onClickBtnEdit', sender, e);
}

function btnDelete_click(sender, e) {
    pointerCtrlOwner.fireEvent('onClickBtnDelete', sender, e);
}
			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				height:30,
				x:0,
				y:0,
				layout:"absolute",
				tbar:[
					{
						xtype:"vmd.button",
						id:"btnAddServer",
						type:"(none)",
						size:"small",
						icon:"icon-tasks",
						width:22,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnAddServer_click",
						listeners:{
							click:btnAddServer_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btnAddCategory",
						type:"(none)",
						size:"small",
						icon:"icon-file-text-alt",
						width:22,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnAddCategory_click",
						listeners:{
							click:btnAddCategory_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btnEdit",
						type:"(none)",
						size:"small",
						icon:"icon-pencil",
						width:22,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnEdit_click",
						listeners:{
							click:btnEdit_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btnDelete",
						type:"(none)",
						size:"small",
						icon:"icon-trash",
						width:22,
						height:22,
						style:"padding: 5px 5px 5px 5px;    border: none;    background: none;",
						click:"btnDelete_click",
						listeners:{
							click:btnDelete_click
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
			this.setAddCategoryBtnVisiable= function(paraVisiable){
//直接填写方法内容
btnAddCategory.isVisible = paraVisiable;
	}
}
})