Ext.define("vmd.ux.Pagination" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Pagination",
	title:"Panel",
	header:false,
	border:false,
	width:807,
	height:179,
	layout:"absolute",
	beforerender:"Pagination_beforerender",
	listeners:{
		beforerender:function(){
	this.Pagination_beforerender(this)
}
	},
	uxCss:".btn-num{    height: 20px;    font-size: 12px;    padding-top: 3px;    text-align: center;}.lab-css{    font-size: 16px;    text-align: center;    }.comboSkin{    border: 1px solid #dddddd;}",
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
			var a=888;
var c=10;
var b=parseInt(a/c);
if(a-(b*c)===0){
    b=b;
}else{
    b=b+1;
}


var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
})
var showData = [{
    id: '10',
    name: '10'
}, {
    id: '5',
    name: '5'
}, {
    id: '15',
    name: '15'
}]
 
 store.loadData(showData);
  

function showNum_beforerender(sender){
    showNum.store =store;
    showNum.displayField = 'name';
    showNum.valueField = 'id'
}

function Pagination_beforerender(sender){

}

function showNum_change(sender){
c=showNum.getValue();
b=parseInt(a/c);
if(a-(b*c)===0){
    b=b;
}else{
    b=b+1;
}
labCount.setText(b);


    
}

var skipStore =new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
})
var skipData=[];

 for(var i=1;i<b+1;i++){
     var data ={ 
    id:i.toString(),
    name:i.toString()
    }
     skipData.push(data)
     }
skipStore.loadData(skipData)


function skip_beforerender(sender){
    skip.store =skipStore;
    skip.displayField = 'name';
    skip.valueField = 'id'
}

function labCount_beforerender(sender){
labCount.setText(b)
}
			this.Pagination_beforerender=Pagination_beforerender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:"每页展示",
				x:40,
				y:20,
				width:70,
				height:20,
				style:"font-size: 16px;    text-align: center;    /* padding-top: 5px;*/",
				cls:"lab-css"
			},
			{
				xtype:"vmd.combo",
				id:"showNum",
				width:50,
				x:110,
				y:20,
				style:"height: 20px;",
				firstSelected:true,
				readOnly:false,
				cls:"comboSkin",
				beforerender:"showNum_beforerender",
				change:"showNum_change",
				listeners:{
					beforerender:showNum_beforerender,
					change:showNum_change
				}
			},
			{
				xtype:"label",
				id:"label1",
				text:"条",
				x:170,
				y:20,
				width:20,
				height:20,
				style:"font-size: 16px;    text-align: center;",
				cls:"lab-css"
			},
			{
				xtype:"vmd.button",
				id:"last",
				text:"<上一页",
				type:"(none)",
				size:"small",
				x:210,
				y:20,
				height:20,
				width:60,
				cls:"btn-num"
			},
			{
				xtype:"vmd.button",
				id:"first",
				text:"1",
				type:"(none)",
				size:"small",
				x:280,
				y:20,
				height:20,
				width:20,
				cls:"btn-num"
			},
			{
				xtype:"vmd.button",
				id:"next",
				text:"下一页>",
				type:"(none)",
				size:"small",
				x:310,
				y:20,
				height:20,
				width:60,
				cls:"btn-num"
			},
			{
				xtype:"label",
				id:"label2",
				text:"共",
				x:380,
				y:20,
				cls:"lab-css"
			},
			{
				xtype:"label",
				id:"label3",
				text:"页",
				x:430,
				y:20,
				cls:"lab-css"
			},
			{
				xtype:"label",
				id:"labCount",
				x:400,
				y:20,
				cls:"lab-css",
				beforerender:"labCount_beforerender",
				height:20,
				width:30,
				listeners:{
					beforerender:labCount_beforerender
				}
			},
			{
				xtype:"label",
				id:"label4",
				text:"跳转至",
				x:460,
				y:20,
				width:60,
				height:20,
				style:"font-size: 16px;    text-align: center;    /* padding-top: 5px;*/",
				cls:"lab-css"
			},
			{
				xtype:"vmd.combo",
				id:"skip",
				width:60,
				x:520,
				y:20,
				cls:"comboSkin",
				style:"height: 20px;",
				beforerender:"skip_beforerender",
				firstSelected:true,
				listeners:{
					beforerender:skip_beforerender
				}
			},
			{
				xtype:"label",
				id:"label5",
				text:"页",
				x:580,
				y:20,
				cls:"lab-css",
				height:20,
				width:10
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Pagination");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Pagination");
	}
})