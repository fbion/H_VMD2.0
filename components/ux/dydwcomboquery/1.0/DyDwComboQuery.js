Ext.define("vmd.ux.DyDwComboQuery" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DyDwComboQuery",
	layoutConfig:{
		pack:"center",
		align:"middle"
	},
	title:"Panel",
	header:false,
	border:false,
	width:637,
	height:54,
	layout:"hbox",
	afterrender:"DyDwComboQuery_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.DyDwComboQuery_afterrender(this)
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
			function DyDwComboQuery_afterrender(sender) {
    dyTree.hide();
    dwTree.hide();
}

function dyCombo_afterrender(sender) {
    dyCombo.addClass("combotree");
    vmd(sender.DOMelem_input).on("focus", function(e) {
        e.stopPropagation();
        dyTree.show();
    }).on("blur", function() {}).on("keyup", function() {
        dyTree.filterBy(dyCombo.getText());
    });
    Ext.getDoc().on("click", function(e) {
        if(vmd(e.target).parents(".combotree").length === 0 && vmd(e.target).parents(".vmd-tree").length === 0) {
            dyTree.hide();
        }
    });
}

function dyTree_nodeclick(sender, node, e) {
    e.stopPropagation();
    if(!node.hasChildNodes()) {
        dyCombo.setText(node.text);
        dyCombo.setValue(node.id);
        dyTree.hide();
    }
}

function dwCombo_afterrender(sender) {
    dwCombo.addClass("combotree");
    vmd(sender.DOMelem_input).on("focus", function(e) {
        e.stopPropagation();
        dwTree.show();
    }).on("blur", function() {}).on("keyup", function() {
        dwTree.filterBy(dwCombo.getText());
    });
    Ext.getDoc().on("click", function(e) {
        if(vmd(e.target).parents(".combotree").length === 0 && vmd(e.target).parents(".vmd-tree").length === 0) {
            dwTree.hide();
        }
    });
}

function dwTree_nodeclick(sender, node, e) {
    e.stopPropagation();
    dwCombo.setText(node.text);
    dwCombo.setValue(node.id);
    dwTree.hide();
}
			this.DyDwComboQuery_afterrender=DyDwComboQuery_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:"单元："
			},
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:200,
				height:267,
				layout:"vbox",
				items:[
					{
						xtype:"vmd.combo",
						id:"dyCombo",
						width:200,
						afterrender:"dyCombo_afterrender",
						listeners:{
							vmdafterrender:dyCombo_afterrender
						}
					},
					{
						xtype:"vmd.treeex",
						id:"dyTree",
						width:200,
						height:200,
						hideRoot:true,
						cascading:false,
						disabled:false,
						rootValue:"0",
						nodeclick:"dyTree_nodeclick",
						listeners:{
							nodeclick:dyTree_nodeclick
						},
						store:this.dyTreeStore,
						parentField:this.dyTreeParentField,
						valueField:this.dyTreeValueField,
						textField:this.dyTreeTextField,
						loadType:this.dyTreeLoadType
					}
				]
			},
			{
				xtype:"label",
				id:"label1",
				text:"单位：",
				margins:"0 0 0 10"
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:200,
				height:271,
				layout:"vbox",
				items:[
					{
						xtype:"vmd.combo",
						id:"dwCombo",
						width:200,
						afterrender:"dwCombo_afterrender",
						listeners:{
							vmdafterrender:dwCombo_afterrender
						}
					},
					{
						xtype:"vmd.treeex",
						id:"dwTree",
						width:200,
						height:200,
						hideRoot:true,
						cascading:false,
						disabled:false,
						rootValue:"0",
						nodeclick:"dwTree_nodeclick",
						listeners:{
							nodeclick:dwTree_nodeclick
						},
						store:this.dwTreeStore,
						parentField:this.dwTreeParentField,
						valueField:this.dwTreeValueField,
						textField:this.dwTreeTextField,
						loadType:this.dwTreeLoadType
					}
				]
			},
			{
				xtype:"vmd.button",
				id:"queryButton",
				text:"查询",
				type:"(none)",
				size:"small",
				icon:"search",
				margins:"0 0 0 10"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.DyDwComboQuery");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.DyDwComboQuery");
	}
})