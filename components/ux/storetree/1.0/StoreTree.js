Ext.define("vmd.ux.StoreTree" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.StoreTree",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"fit",
	afterrender:"StoreTree_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.StoreTree_afterrender(this)
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
			function StoreTree_afterrender(sender) {

}

function setInfo(dataStore) {
    // if(dataStore) {
    //     var store = new Ext.data.JsonStore({
    //         proxy: new Ext.data.MemoryProxy(),
    //         fields: ['name', 'id', 'pID']
    //     });
    //     var data = [{
    //         name: '内核功能',
    //         id: '0',
    //         pID: ''
    //     }];
    //     store.loadData(data);
    //     ////////////////////////////////////////////////////////////////////////////////

    //     function tree_beforerender(sender) {
    //         // 
    //         tree.store = store;
    //         tree.valueField = "id"
    //         tree.textField = "name"
    //         tree.parentField = "pID"
    //         tree.rootValue = "0"
    //     }
    // }
}
			this.StoreTree_afterrender=StoreTree_afterrender;
		this.items=[
			{
				xtype:"vmd.treeex",
				id:"tree",
				width:350,
				height:270,
				hideRoot:false,
				x:10,
				y:110
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setInfo= function(dataStore){
setInfo(dataStore);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.StoreTree");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.StoreTree");
	}
})