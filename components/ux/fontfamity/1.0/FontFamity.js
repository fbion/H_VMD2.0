Ext.define("vmd.ux.FontFamity" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.FontFamity",
	title:"Panel",
	header:false,
	border:false,
	width:120,
	height:28,
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
var selFont;
function comlist_afterrender(sender) {
    var familyData = [{
            EnName: 'SimSun',
            name: '宋体'
        }, {
            EnName: 'SimHei',
            name: '黑体'
        },
        {
            EnName: 'Microsoft YaHei',
            name: '微软雅黑'
        }, {
            EnName: 'Microsoft JhengHei',
            name: '微软正黑体'
        }, {
            EnName: 'NSimSun',
            name: '新宋体'
        }, {
            EnName: 'PMingLiU',
            name: '新细明体'
        }, {
            EnName: 'FangSong',
            name: '仿宋'
        },
        {
            EnName: 'KaiTi',
            name: '楷体'
        }, {
            EnName: 'FangSong_GB2312',
            name: '仿宋_GB2312'
        }, {
            EnName: 'KaiTi_GB2312',
            name: '楷体_GB2312'
        }, {
            EnName: 'STHeiti Light',
            name: '华文细黑'
        }
    ];
    var store = new vmd.data.Store({
        data: familyData,
        fields: ['EnName', 'name']
    })
    comlist.store = store;
    comlist.valueField = 'EnName';
    comlist.displayField = 'name';
    comlist.dropDownFields = 'EnName';
    comlist.queryField = 'EnName';
}
// 设置初始字体
function setOriValue(font){
    comlist.setValue(font);
}

function comlist_selectChanged(sender, combo, record, index) {
    selFont = record.data;
    page.fireEvent('fontChange', comlist, record);
}
			this.items=[
			{
				xtype:"vmd.comlist",
				id:"comlist",
				width:120,
				height:270,
				x:0,
				y:0,
				editable:false,
				afterrender:"comlist_afterrender",
				selectChanged:"comlist_selectChanged",
				region:"center",
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
			this.setFontFamity= function(font){
//直接填写方法内容
setOriValue(font)
	}
		this.getSelFont= function(){
//直接填写方法内容
return selFont
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.FontFamity");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontFamity");
	}
})