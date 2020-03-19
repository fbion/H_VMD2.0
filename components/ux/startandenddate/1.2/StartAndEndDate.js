Ext.define('vmd.ux.startAndEndDate.Controller', {
    xtype: 'vmd.ux.startAndEndDate.Controller',
    constructor: function(options) {},
    test: function() {
        //alert("测试控制层方法")
    },
    compare: function(data1, data2) {
        if (data1 && data2) {
            if (data1 > data2)
                return true;
            if (data1 <= data2)
                return false;
        } else
            return false;
    }
})
Ext.define("vmd.ux.StartAndEndDate", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.2",
    xtype: "vmd.ux.StartAndEndDate",
    layoutConfig: {
        align: "middle"
    },
    title: "Panel",
    header: false,
    border: false,
    width: 710,
    height: 61,
    layout: "hbox",
    afterrender: "StartAndEndDate_afterrender",
    bodyStyle: "color:red;",
    listeners: {
        vmdafterrender: function() {
            this.StartAndEndDate_afterrender(this)
        }
    },
    StartLabelText: "开始日期：",
    StartDateFormat: "Y-m-d",
    EndDateFormat: "Y-m-d",
    EndLabelText: "结束日期：",
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
        var DateController = new vmd.ux.startAndEndDate.Controller();

        function startDate_change(sender, newValue, oldValue) {
            if (DateController.compare(newValue, endDate.getValue())) {
                alert("开始日期不能大于结束日期！")
            } else {
                page.fireEvent('startDateChanged', sender, newValue, oldValue);
            }
        }

        function endDate_change(sender, newValue, oldValue) {
            if (DateController.compare(startDate.getValue(), newValue)) {
                alert("开始日期不能大于结束日期！")
            } else {
                page.fireEvent('endDateChanged', sender, newValue, oldValue);
            }
        }
        page._getStartDateValue = _getStartDateValue;

        function _getStartDateValue() {
            return startDate.getValue(true)
        }

        function _getEndDateValue() {
            return endDate.getValue(true)
        }

        function StartAndEndDate_afterrender(sender) {
            DateController.test()
        }
        this.StartAndEndDate_afterrender = StartAndEndDate_afterrender;
        this.items = [{
                xtype: "label",
                id: "startDateLabel",
                text: this.StartLabelText,
                x: 10,
                y: 10
            },
            {
                xtype: "datefield",
                id: "startDate",
                format: this.StartDateFormat,
                showToday: true,
                allowBlank: true,
                x: 50,
                y: 0,
                anchor: "1",
                flex: 1,
                change: "startDate_change",
                listeners: {
                    change: startDate_change
                }
            },
            {
                xtype: "label",
                id: "endDateLabel",
                text: this.EndLabelText,
                x: -3,
                y: 10
            },
            {
                xtype: "datefield",
                id: "endDate",
                format: this.EndDateFormat,
                showToday: true,
                allowBlank: true,
                anchor: "1",
                x: 50,
                flex: 1,
                change: "endDate_change",
                listeners: {
                    change: endDate_change
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getStartDateValue = function() {
            //直接填写方法内容
            return this._getStartDateValue()
        }
        this.getEndDateValue = function() {
            //直接填写方法内容
            return _getEndDateValue()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.StartAndEndDate");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.StartAndEndDate");
    }
})