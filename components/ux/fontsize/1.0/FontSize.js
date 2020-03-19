Ext.define('vmd.ux.fontSize.Controller', {
    xtype: 'vmd.ux.fontSize.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.FontSize", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.FontSize",
    title: "Panel",
    header: false,
    border: false,
    width: 144,
    height: 30,
    layout: "border",
    uxCss: ".comlist-b{    border:1px solid #ddd;}.comlist-b input{    border:0;}",
    initComponent: function() {
        function resetCmpScope() {
            var cmpList = me._reloadCmpList;
            Ext.each(cmpList, function(name) {
                var cmpObj = eval(name);
                cmpObj && (cmpObj._beforeRender = function(_cmp) {
                    var id = vmd.core.getCmpId(_cmp);
                    id && eval(id + "= _cmp")
                })
            })
        }
        var seleSzie;
        var page = this;

        function comlist_afterrender(sender) {
            var sizeData = [{
                    size: '12',
                    px: '12px'
                }, {
                    size: '14',
                    px: '14px'
                },
                {
                    size: '16',
                    px: '16px'
                }, {
                    size: '18',
                    px: '18px'
                }, {
                    size: '20',
                    px: '20px'
                }, {
                    size: '24',
                    px: '24px'
                },
                {
                    size: '28',
                    px: '28px'
                }, {
                    size: '32',
                    px: '32px'
                }, {
                    size: '36',
                    px: '36px'
                }, {
                    size: '40',
                    px: '40px'
                },
                {
                    size: '44',
                    px: '44px'
                }, {
                    size: '48',
                    px: '48px'
                }
            ];
            var store = new vmd.data.Store({
                data: sizeData,
                fields: ['size', 'px']
            })
            comlist.store = store;
            comlist.valueField = 'px';
            //  this.cls='comlist-b';
            comlist.displayField = 'size';
            comlist.dropDownFields = 'px';
            comlist.queryField = 'px';
        }
        // 设置初始字号
        function setOriValue(fontSize) {
            comlist.setValue(fontSize);
        }

        function comlist_selectChanged(sender, combo, record, index) {
            seleSzie = record.data;
            page.fireEvent('sizeChange', comlist, record);
        }
        this.items = [{
            xtype: "vmd.comlist",
            id: "comlist",
            width: 140,
            height: 270,
            x: 0,
            y: 0,
            afterrender: "comlist_afterrender",
            selectChanged: "comlist_selectChanged",
            editable: false,
            region: "center",
            cls: "comlist-b",
            listeners: {
                vmdafterrender: comlist_afterrender,
                selectChanged: comlist_selectChanged
            }
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getFontSize = function() {
            //直接填写方法内容
            return seleSzie
        }
        this.setFontSize = function(fontSize) {
            //直接填写方法内容
            setOriValue(fontSize)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.FontSize");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontSize");
    }
})