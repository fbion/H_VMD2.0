undefined
Ext.define("vmd.ux.YearSelect", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.YearSelect",
    title: "Panel",
    header: false,
    border: false,
    width: 80,
    height: 30,
    layout: "absolute",
    autoHeight: false,
    style: "/*   min-width: 130PX;*/",
    beforerender: "YearSelect_beforerender",
    afterrender: "YearSelect_afterrender",
    listeners: {
        beforerender: function() {
            this.YearSelect_beforerender(this)
        },
        vmdafterrender: function() {
            this.YearSelect_afterrender(this)
        }
    },
    uxCss: ".x-color-palette em span{    width: 13px;    height: 13px;}.x-color-palette{    width:150px;    height: 160px;}/* 获得焦点 */.vmd-text1:focus {    border: 1px solid #3c8fff;    padding-left: 8px;    height: 26px !important;    width:80px;}.vmd-text2 {    height: 26px !important;    line-height: 26px;    padding-left: 8px;    border: 1px solid #e4e4e4;    border-radius: 4px;    font-size: 14px;    }/* 鼠标悬停 */.vmd-text1:hover {    color: #353535;    cursor: pointer;    border: 1px solid #3c8fff;/*border: 1px solid #e3e2e8;*/}/* 带底部边框的输入框 *//*.vmd-text-border-bottom1 {*//*    height: 25px;*//*    line-height: 30px;*//*    padding-left: 8px;*//*    border-width: 0;*//*    border: 1px solid #e4e4e4;*//*    font-size: 14px;*//*}*//*.vmd-text1:focus {*//*    border: 1px solid #3c8fff;*//*   padding-left: 8px;*//*}*/",
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
        var myCalendar

        function hwText_afterrender(sender) {
            if (hwText.getValue() === "") {
                var myDate = new Date();
                hwText.setValue(myDate.getFullYear());
            }
            
            myCalendar = new dhtmlXCalendarObject(hwText.id)
            myCalendar.setDateFormat('%Y')
        }

        function button_click(sender, e) {
            hwText.focus() //
            window.setTimeout(function() {
                hwText.el.dom.click()
            }, 50)
        }

        function setValue(value) {
            hwText.setValue(value)
        }

        function getValue() {
            return hwText.getValue()
        }

        function YearSelect_afterrender(sender) {
            
        }

        function YearSelect_beforerender(sender) {}
        this.YearSelect_afterrender = YearSelect_afterrender;
        this.YearSelect_beforerender = YearSelect_beforerender;
        this.items = [{
                xtype: "textfield",
                id: "hwText",
                allowBlank: true,
                enableKeyEvents: true,
                region: "center",
                width: 81,
                afterrender: "hwText_afterrender",
                height: 28,
                cls: "vmd-text-border-bottom vmd-text1 vmd-text2",
                focusClass: "vmd-text1",
                listeners: {
                    vmdafterrender: hwText_afterrender
                }
            },
            {
                xtype: "vmd.img",
                id: "button",
                width: 23,
                height: 20,
                x: 55,
                y: 4,
                src: "/img/public/calendar.png",
                click: "button_click",
                listeners: {
                    click: button_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setYearValue = function(value) {
            //直接填写方法内容
            setValue(value)
        }
        this.getYearValue = function() {
            //直接填写方法内容
            return getValue();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.YearSelect");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.YearSelect");
    }
})