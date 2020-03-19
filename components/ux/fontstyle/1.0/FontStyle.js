Ext.define("vmd.ux.FontStyle" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.FontStyle",
	title:"Panel",
	header:false,
	border:false,
	width:120,
	height:34,
	layout:"border",
	uxCss:".comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}",
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
var selStyle;

function comlist_afterrender(sender) {
    var styleData = [{
            EnName: 'normal',
            name: '常规'
        }, {
            EnName: 'bold',
            name: '加粗'
        },
        {
            EnName: 'italic',
            name: '倾斜'
        }, {
            EnName: 'boldAnditalic',
            name: '加粗倾斜'
        }
    ];
    var store = new vmd.data.Store({
        data: styleData,
        fields: ['EnName', 'name']
    })
    comlist.store = store;
    comlist.valueField = 'EnName';
    comlist.displayField = 'name';
}

// 设置初始字体
function setOriValue(style) {
    comlist.setValue(style);
}

function comlist_selectChanged(sender, combo, record, index) {
    selStyle = record.data;
    page.fireEvent('styleChange', comlist, record);
}
			this.items=[
			{
				xtype:"vmd.comlist",
				id:"comlist",
				width:150,
				height:270,
				x:-2,
				y:0,
				region:"center",
				afterrender:"comlist_afterrender",
				editable:false,
				selectChanged:"comlist_selectChanged",
				cls:"comlist-b",
				listeners:{
					vmdafterrender:comlist_afterrender,
					selectChanged:comlist_selectChanged
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getFontStyle= function(){
//直接填写方法内容
return selStyle
	}
		this.setFontStyle= function(style){
//直接填写方法内容
setOriValue(style)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.FontStyle");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontStyle");
	}
})