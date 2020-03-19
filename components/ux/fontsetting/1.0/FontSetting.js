Ext.define('vmd.ux.fontSetting.Controller', {
    xtype: 'vmd.ux.fontSetting.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.FontSetting", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ColorSelect$1.0$ColorSelect"]),
    version: "1.0",
    xtype: "vmd.ux.FontSetting",
    title: "Panel",
    header: false,
    border: false,
    width: 765,
    height: 500,
    layout: "absolute",
    afterrender: "FontSetting_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.FontSetting_afterrender(this)
        }
    },
    uxCss: ".aaa{    border: 1px solid #ccc}",
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
        var page = this;
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'value']
        });
        var data = [{
            value: '0',
            name: '无'
        }, {
            value: '1',
            name: '单下划线'
        }]
        store.loadData(data);
        this.ff = ''
        this.fs = ''
        this.fsz = ''
        this.color = ''
        this.underLineStyle = ''
        this.mark = ''

        function fontFamilyList_click(sender, index, node, e) {
            fontFamily.setValue(sender.getSelectedRecords()[0].json.name)
            page.ff = sender.getSelectedRecords()[0].json.value;
            display.el.dom.childNodes[0].childNodes[0].style.fontFamily = page.ff
            display.doLayout();
        }

        function fontShapeList_click(sender, index, node, e) {
            fontShape.setValue(sender.getSelectedRecords()[0].json.name)
            page.fs = sender.getSelectedRecords()[0].json.value;
            // display.el.dom.childNodes[0].childNodes[0].style.fontShape = page.fs
            var text = display.el.dom.childNodes[0].childNodes[0];
            switch (page.fs) {
                case 'n':
                    text.style.fontStyle = 'normal';
                    text.style.fontWeight = 'normal';
                    break;
                case 'b':
                    text.style.fontStyle = 'normal';
                    text.style.fontWeight = 'bold';
                    break;
                case 't':
                    text.style.fontStyle = 'italic';
                    text.style.fontWeight = 'normal';
                    break;
                case 'bt':
                    text.style.fontStyle = 'italic';
                    text.style.fontWeight = 'bold';
                    break;
            }
            display.doLayout();
        }

        function fontSizeList_click(sender, index, node, e) {
            fontSize.setValue(sender.getSelectedRecords()[0].json.value)
            page.fsz = sender.getSelectedRecords()[0].json.value
            display.el.dom.childNodes[0].childNodes[0].style.fontSize = page.fsz
            display.doLayout();
        }

        function setInfo(info) {
            if (info) {}
        }

        function underLine_beforerender(sender) {
            sender.store = store;
            sender.displayField = 'name';
            sender.valueField = 'value'
        }

        function fontColor_colorchange(sender, selColor) {
            page.color = selColor;
            display.el.dom.childNodes[0].childNodes[0].style.color = page.color
        }

        function underLine_change(sender) {
            page.underLineStyle = sender.getValue();
            switch (page.underLineStyle) {
                case "normal":
                    // display.el.dom.childNodes[0].childNodes[0].style.textDecoration = "0"
                    break;
                case "underLine":
                    // display.el.dom.childNodes[0].childNodes[0].style.textDecoration = "1"
                    break;
            }
        }

        function mark_change(sender, checked) {
            page.mark = checked.inputValue;
        }

        function button_click(sender, e) {
            var obj = [{
                ff: hwFontSetting.ff
            }, {
                fs: hwFontSetting.fs
            }, {
                fsz: hwFontSetting.fsz
            }, {
                color: hwFontSetting.color
            }, {
                underLine: hwFontSetting.underLineStyle
            }, {
                mark: hwFontSetting.mark
            }]
            // return obj;
            parent.fontSettingWin.close(obj);
        }

        function FontSetting_afterrender(sender) {}

        function button1_click(sender, e) {
            parent.fontSettingWin.close();
        }
        this.FontSetting_afterrender = FontSetting_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "字体：",
                x: 10,
                y: 10
            },
            {
                xtype: "textfield",
                id: "fontFamily",
                allowBlank: true,
                enableKeyEvents: true,
                x: 10,
                y: 30,
                width: 300,
                cls: "aaa"
            },
            {
                xtype: "vmd.dataview",
                id: "fontFamilyList",
                width: 300,
                height: 145,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul>    <tpl for=\".\">        <li class=\"info\" style=\"padding:5px;margin:5px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\">            <h4>{name}</h4>        </li>    </tpl></ul>",
                data: "var data = [{    value: \"SimSun\",    name: \"宋体\"}, {    value: \"Microsoft YaHei\",    name: \"微软雅黑\"}, {    value: \"STFangsong\",    name: \"华文仿宋\"}, {    value: \"STKaiti\",    name: \"华文楷体\"}, {    value: \"STSong\",    name: \"华文宋体\"}, {    value: \"Arial\",    name: \"Arial\"}, {    value: \"Comic Sans MS\",    name: \"Comic Sans MS\"}, {    value: \"Courier New\",    name: \"Courier New\"}, {    value: \"Georgia\",    name: \"Georgia\"}, {    value: \"Impact\",    name: \"Impact\"}, {    value: \"Times New Roman\",    name: \"Times New Roman\"}, {    value: \"Trebuchet MS\",    name: \"Trebuchet MS\"}, {    value: \"Verdana\",    name: \"Verdana\"}]return data",
                x: 10,
                y: 60,
                cls: "aaa",
                click: "fontFamilyList_click",
                listeners: {
                    click: fontFamilyList_click
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: "下划线：",
                x: 10,
                y: 210
            },
            {
                xtype: "vmd.combo",
                id: "underLine",
                width: 180,
                x: 10,
                y: 230,
                cls: "aaa",
                beforerender: "underLine_beforerender",
                change: "underLine_change",
                listeners: {
                    beforerender: underLine_beforerender,
                    change: underLine_change
                }
            },
            {
                xtype: "label",
                id: "label2",
                text: "特殊效果：",
                x: 10,
                y: 270
            },
            {
                xtype: "checkbox",
                id: "deleteLine",
                fieldLabel: "Checkbox",
                boxLabel: "删除线",
                x: 10,
                y: 302,
                disabled: true
            },
            {
                xtype: "radiostoregroup",
                id: "mark",
                width: 160,
                height: 30,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 75,
                y: 300,
                change: "mark_change",
                disabled: true,
                listeners: {
                    change: mark_change
                },
                items: [{
                        xtype: "radio",
                        id: "hwRadio",
                        boxLabel: "上标",
                        width: 57,
                        inputValue: "up"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "下标",
                        inputValue: "down"
                    }
                ]
            },
            {
                xtype: "label",
                id: "label3",
                text: "字形：",
                x: 320,
                y: 10
            },
            {
                xtype: "textfield",
                id: "fontShape",
                allowBlank: true,
                enableKeyEvents: true,
                x: 320,
                y: 30,
                cls: "aaa",
                width: 210
            },
            {
                xtype: "textfield",
                id: "fontSize",
                allowBlank: true,
                enableKeyEvents: true,
                x: 540,
                y: 30,
                cls: "aaa",
                width: 210
            },
            {
                xtype: "label",
                id: "label4",
                text: "字号：",
                x: 540,
                y: 10
            },
            {
                xtype: "vmd.dataview",
                id: "fontShapeList",
                width: 210,
                height: 145,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul>    <tpl for=\".\">        <li class=\"info\" style=\"padding:5px;margin:5px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\">            <h4>{name}</h4>        </li>    </tpl></ul>",
                data: "var data = [{    name: '常规',    value: 'n'}, {    name: '加粗',    value: 'b'}, {    name: '倾斜',    value: 't'}, {    name: '加粗倾斜',    value: 'bt'}]return data",
                x: 320,
                y: 60,
                cls: "aaa",
                click: "fontShapeList_click",
                listeners: {
                    click: fontShapeList_click
                }
            },
            {
                xtype: "vmd.dataview",
                id: "fontSizeList",
                width: 210,
                height: 145,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul>    <tpl for=\".\">        <li class=\"info\" style=\"padding:5px;margin:5px; overflow: hidden;border-top: 1px solid transparent;cursor: pointer;\">            <h4>{value}</h4>        </li>    </tpl></ul>",
                data: "var data = [{    value: \"5\"}, {    value: \"6\"}, {    value: \"8\"}, {    value: \"9\"}, {    value: \"10\"}, {    value: \"11\"}, {    value: \"12\"}, {    value: \"14\"}, {    value: \"16\"}, {    value: \"18\"}, {    value: \"20\"}, {    value: \"22\"}, {    value: \"24\"}, {    value: \"26\"}, {    value: \"28\"}, {    value: \"36\"}, {    value: \"48\"}, {    value: \"54\"}, {    value: \"72\"}]return data",
                x: 540,
                y: 60,
                cls: "aaa",
                click: "fontSizeList_click",
                listeners: {
                    click: fontSizeList_click
                }
            },
            {
                xtype: "label",
                id: "label5",
                text: "颜色：",
                x: 320,
                y: 210
            },
            {
                xtype: "vmd.button",
                id: "button",
                text: "确定",
                type: "(none)",
                size: "small",
                x: 640,
                y: 460,
                click: "button_click",
                listeners: {
                    click: button_click
                }
            },
            {
                xtype: "vmd.button",
                id: "button1",
                text: "取消",
                type: "(none)",
                size: "small",
                x: 700,
                y: 460,
                click: "button1_click",
                listeners: {
                    click: button1_click
                }
            },
            {
                xtype: "label",
                id: "label6",
                text: "预览：",
                x: 270,
                y: 270
            },
            {
                xtype: "vmd.ux.ColorSelect",
                id: "fontColor",
                layout: "fit",
                x: 320,
                y: 230,
                width: 210,
                height: 28,
                colorchange: "fontColor_colorchange",
                listeners: {
                    colorchange: fontColor_colorchange
                }
            },
            {
                xtype: "vmd.div",
                id: "display",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 430,
                height: 180,
                x: 320,
                y: 270,
                layout: "hbox",
                anchor: "",
                items: [{
                    xtype: "label",
                    id: "label7",
                    text: "汉威科技 AaBbCc"
                }]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info) {
            setInfo(info)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.FontSetting");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FontSetting");
    }
})