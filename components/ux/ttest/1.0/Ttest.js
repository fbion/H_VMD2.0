Ext.define("vmd.ux.Ttest" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Ttest",
	title:"Panel",
	header:false,
	border:false,
	width:600,
	height:350,
	layout:"absolute",
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
			//--------------------------------------下拉树有关------------------------------
function combo_afterrender(sender) {
     //hwjVcIXpPa
    //组合下拉树

    combo.setValue = function(val) {

        this._value = val;
        tree._setValue();

    }
    combo.getValue = function() {

        return this._value || ""
    }



    var imgel = combo.el.query(".dhxdwmc_select_img");
    vmd(imgel).unbind('click')
    combo.addClass('dwmctree')
    vmd(sender.DOMelem_input).on('focus', function(e) {

        e.stopPropagation();
        var pos = combo.el.getRegion();
        var top = pos.top + 30;
        var left = pos.left
        tree.show();
        tree.el.setLeft(left);
        tree.el.setTop(top);


    }).on('blur', function() {



    }).on('keyup', function() {
        tree.filterBy(combo.getText())
    })

    Ext.getDoc().on('click', function(e) {


        if(vmd(e.target).parents('.dwmctree').length == 0 && vmd(e.target).parents('.vmd-tree').length == 0) tree.hide()

    })

}


function tree_nodeclick(sender, node, e) {
     e.stopPropagation();

    if(!node.hasChildNodes()) {
        combo.setText(node.text)
        combo._value = node.id;
        tree.hide();
    }




}

function tree_beforeNodeExpand(sender, node, deep, anim) {
   //  window.event.stopPropagation();
}

function combo_beforerender(sender) {
    this._setValue = function() {

        var id = combo._value;
        //if(!id) return
        var node = tree.getNodeById(id);
        var text = "";
        if(node) {
            text = node.text;

            //节点展开
            tree.expandPath(node.getPath());
            node.select()
        }

        combo.setText(text)
    }
    this.store.on('load', function() {

        tree._setValue();

    })
}

function tree_afterrender(sender) {
     tree.hide();
}
//------------------------------------------------------------------------------



			this.items=[
			{
				xtype:"vmd.combo",
				id:"combo",
				width:350,
				x:50,
				y:0,
				afterrender:"combo_afterrender",
				listeners:{
					vmdafterrender:combo_afterrender
				},
				valueField:this.a
			},
			{
				xtype:"vmd.treeex",
				id:"tree",
				width:350,
				height:270,
				hideRoot:false,
				x:50,
				y:30,
				nodeclick:"tree_nodeclick",
				afterrender:"tree_afterrender",
				beforeNodeExpand:"tree_beforeNodeExpand",
				listeners:{
					nodeclick:tree_nodeclick,
					vmdafterrender:tree_afterrender,
					beforeNodeExpand:tree_beforeNodeExpand
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Ttest");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Ttest");
	}
})