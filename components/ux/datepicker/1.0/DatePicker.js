Ext.define('vmd.ux.datePicker.Controller', {
    xtype: 'vmd.ux.datePicker.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DatePicker", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.DatePicker",
    title: "Panel",
    header: false,
    border: false,
    width: 135,
    height: 34,
    layout: "auto",
    autoHeight: true,
    html: "<div class=\"c-datepicker-date-editor  J-datepicker-range-day\" >    <i class=\"c-datepicker-range__icon kxiconfont icon-clock\">    </i>    <input placeholder=\"开始日期\" name=\"\" autocomplete=\"off\" class=\"c-datepicker-data-input only-date ksrq\" value=\"\">    <span class=\"c-datepicker-range-separator\">-</span>    <input placeholder=\"结束日期\" name=\"\" autocomplete=\"off\" class=\"c-datepicker-data-input only-date jsrq\" value=\"\"></div>",
    autoWidth: false,
    cls: "vmd-datepicker",
    beforerender: "DatePicker_beforerender",
    afterrender: "DatePicker_afterrender",
    listeners: {
        beforerender: function() {
            this.DatePicker_beforerender(this)
        },
        vmdafterrender: function() {
            this.DatePicker_afterrender(this)
        }
    },
    uxCss: ".c-datepicker-picker-isinvalid{    color: #409eff;    position: absolute;    bottom: 50px}.c-datepicker-picker-isvalid{    color: #409eff;    position: absolute;    bottom: 80px}",
    uxrequirecss: "[\"components/ux/datepicker/1.0/css/datepicker.css\"]",
    uxrequirejs: "[\"components/ux/datepicker/1.0/js/moment.min.js\",\"components/ux/datepicker/1.0/js/datepicker.js\"]",
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
        var settings = {
            format: 'YYYY-MM-DD',
            range: false,
            hasShortcut: false,
            shortCutType: 'recently',
            minWidth: 135,
            rangeMinWidth: 240,
            defaultValue: ''
        }

        function DatePicker_beforerender(sender) {
            //动态加载样式
            //this.autoWidth = true;
            //防止样式重复加载
            if (!vmd.fn.datePicker) {
                LazyLoad.css(vmd.virtualPath + '/js/plugins/datepicker/css/datepicker.css');
                var jsfiles = [vmd.virtualPath + '/js/plugins/datepicker/js/moment.min.js', vmd.virtualPath + '/js/plugins/datepicker/js/datepicker.js'];
                LazyLoad.js(jsfiles, function() {
                    page.loadcomplete = true;
                })
            } else page.loadcomplete = true;
            //page.loadcomplete = true;
        }
        var DATAPICKERAPI = {
            // 默认input显示当前月,自己获取后填充
            activeMonthRange: function() {
                return {
                    begin: moment().set({
                        'date': 1,
                        'hour': 0,
                        'minute': 0,
                        'second': 0
                    }).format('YYYY-MM-DD HH:mm:ss'),
                    end: moment().set({
                        'hour': 23,
                        'minute': 59,
                        'second': 59
                    }).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            shortcutMonth: function() {
                // 当月
                var nowDay = moment().get('date');
                var prevMonthFirstDay = moment().subtract(1, 'months').set({
                    'date': 1
                });
                var prevMonthDay = moment().diff(prevMonthFirstDay, 'days');
                return {
                    now: '-' + nowDay + ',0',
                    prev: '-' + prevMonthDay + ',-' + nowDay
                }
            },
            // 注意为函数：快捷选项option:只能同一个月份内的
            rangeMonthShortcutOption1: function() {
                var result = DATAPICKERAPI.shortcutMonth();
                return [{
                    name: '昨天',
                    day: '-1,-1',
                    time: '00:00:00,23:59:59'
                }, {
                    name: '这一月',
                    day: result.now,
                    time: '00:00:00,'
                }, {
                    name: '上一月',
                    day: result.prev,
                    time: '00:00:00,23:59:59'
                }];
            },
            // 快捷选项option
            rangeShortcutOption1: [{
                name: '最近一周',
                day: '-7,0'
            }, {
                name: '最近一个月',
                day: '-30,0'
            }, {
                name: '最近三个月',
                day: '-90, 0'
            }, {
                name: '最近一年',
                day: '-365, 0'
            }],
            rangeShortcutOption2: [{
                name: '一周',
                day: '0,7'
            }, {
                name: '一个月',
                day: '0,30'
            }, {
                name: '三个月',
                day: '0, 90'
            }, {
                name: '一年',
                day: '0, 365'
            }, {
                name: '长期有效',
                day: '0, 36500'
            }, {
                name: '无效',
                day: '-2, -1'
            }],
            singleShortcutOptions1: [{
                name: '今天',
                day: '0'
            }, {
                name: '昨天',
                day: '-1',
                time: '00:00:00'
            }, {
                name: '一周前',
                day: '-7'
            }]
        };
        this.getDefaultValue = function() {
            var diff = settings.defaultValue;
            var now = new Date();
            var val = '';
            switch (diff) {
                case '':
                    break;
                case 'today':
                    val = now;
                    break;
                case 'prevDay':
                    val = Ext.Date.add(now, Ext.Date.DAY, -1);
                    break;
                case 'nextDay':
                    val = Ext.Date.add(now, Ext.Date.DAY, 1);
                    break;
                case 'prevWeek':
                    val = Ext.Date.add(now, Ext.Date.DAY, -7);
                    break;
                case 'nextWeek':
                    val = Ext.Date.add(now, Ext.Date.DAY, 7);
                    break;
                case 'prev3Month':
                    val = Ext.Date.add(now, Ext.Date.MONTH, -3);
                    break;
                case 'next3Month':
                    val = Ext.Date.add(now, Ext.Date.MONTH, 3);
                    break;
                case 'prevMonth':
                    val = Ext.Date.add(now, Ext.Date.MONTH, -1);
                    break;
                case 'nextMonth':
                    val = Ext.Date.add(now, Ext.Date.MONTH, 1);
                    break;
                case 'prevYear':
                    val = Ext.Date.add(now, Ext.Date.YEAR, -1);
                    break;
                case 'nextYear':
                    val = Ext.Date.add(now, Ext.Date.YEAR, 1);
                    break;
            }
            return val;
            // vmd.taskRunner(function() {
            //     return page.loadcomplete
            // }, function() {
            //     if(val) {
            //         if(settings.range) {
            //             var rq = moment(val).format(settings.format);
            //             var rq2 = moment(now).format(settings.format);
            //             _setValue(rq, rq2);
            //         } else {
            //             var rq = moment(val).format(settings.format);
            //             _setValue(rq);
            //         }
            //     }
            // })
        }
        var dateInst;

        function DatePicker_afterrender(sender, rq1, rq2) {
            //构造内部对象
            //var me=this;
            //是否range连续选择
            if (Ext.isDefined(hiddenInfo.isRange)) settings.range = hiddenInfo.isRange;
            //是否左侧shortcut快捷方式
            this.picker = this.el.child('.c-datepicker-date-editor');
            this.ksrqEl = this.picker.child('.ksrq');
            this.jsrqEl = this.picker.child('.jsrq');
            this.separatorEl = this.picker.child('.c-datepicker-range-separator');
            this.ksrqLabel = hiddenInfo.ksrqLabel || '开始日期';
            this.jsrqLabel = hiddenInfo.jsrqLabel || '结束日期';
            //标签赋值
            vmd(this.ksrqEl.dom).attr('placeholder', this.ksrqLabel);
            if (this.jsrqEl) vmd(this.jsrqEl.dom).attr('placeholder', this.jsrqLabel);
            settings.format = hiddenInfo.format || settings.format;
            settings.hasShortcut = hiddenInfo.hasShortcut || settings.hasShortcut;
            settings.shortCutType = hiddenInfo.shortCutType || settings.shortCutType;
            settings.defaultValue = hiddenInfo.defaultValue || settings.defaultValue;
            var rangeShortcutOption = DATAPICKERAPI.rangeShortcutOption1;
            if (settings.shortCutType == 'future') rangeShortcutOption = DATAPICKERAPI.rangeShortcutOption2;
            if (!settings.range) {
                if (this.separatorEl) {
                    vmd(this.separatorEl.dom).remove();
                    vmd(this.jsrqEl.dom).remove();
                }
                if (settings.format.indexOf('DD') != -1) {
                    rangeShortcutOption = DATAPICKERAPI.singleShortcutOptions1;
                } else settings.hasShortcut = false
            }
            var callback = function() {
                //宽度处理
                var width, defaultValue;
                //设置默认值
                defaultValue = page.getDefaultValue();
                if (settings.range) {
                    width = page.width || settings.rangeMinWidth;
                    if (width < 70) return;
                    var _width = ((width - 68) / 2);
                    vmd(page.ksrqEl.dom).width(_width);
                    vmd(page.jsrqEl.dom).width(_width);
                    //默认值处理
                    if (settings.defaultValue) {
                        var _rq1 = moment(defaultValue).format(settings.format);
                        var _rq2 = moment(new Date()).format(settings.format);
                        vmd(page.ksrqEl.dom).val(_rq1);
                        vmd(page.jsrqEl.dom).val(_rq2)
                    }
                    //赋值
                    if (Ext.isDefined(rq1)) {
                        vmd(page.ksrqEl.dom).val(rq1);
                        vmd(page.jsrqEl.dom).val(rq2)
                    }
                } else {
                    width = page.width || settings.minWidth;
                    if (width < 50) return;
                    var _width = width - 52;
                    vmd(page.ksrqEl.dom).width(_width);
                    //默认值处理
                    if (settings.defaultValue) {
                        var _rq1 = moment(defaultValue).format(settings.format);
                        vmd(page.ksrqEl.dom).val(_rq1);
                    }
                    //赋值
                    if (Ext.isDefined(rq1)) {
                        vmd(page.ksrqEl.dom).val(rq1);
                    }
                }
                vmd(page.picker.dom).datePicker({
                    hasShortcut: settings.hasShortcut,
                    format: settings.format,
                    isRange: settings.range,
                    shortcutOptions: rangeShortcutOption,
                    select: function(val) {
                        page.fireEvent('select', page, val);
                    },
                    change: function(newval, oldval) {
                        page.fireEvent('change', page, newval, oldval);
                    }
                });
                //处理无效和长期有效的位置
                if (settings.shortCutType == 'future') {
                    vmd('.c-datepicker-picker__sidebar').find('.c-datepicker-picker__shortcut:eq(4)').addClass('c-datepicker-picker-isvalid');
                    vmd('.c-datepicker-picker__sidebar').find('.c-datepicker-picker__shortcut:last').addClass('c-datepicker-picker-isinvalid');
                }
                if (!page.isLoaded) {
                    page.isLoaded = true
                    page.fireEvent('loaded', page, _getKsrq(), _getJsrq());
                }
            }
            //callback()
            if (page.loadcomplete) {
                callback(true)
            } else {
                vmd.taskRunner(function() {
                    return page.loadcomplete
                }, function() {
                    callback()
                })
            }
        }

        function _getKsrq() {
            var rq1 = page.ksrqEl.getValue();
            return rq1;
        }

        function _getJsrq() {
            var rq1 = page.ksrqEl.getValue();
            if (page.jsrqEl) {
                rq1 = page.jsrqEl.getValue();
            }
            return rq1;
        }

        function _getValue() {
            var rq1 = page.ksrqEl.getValue();
            var rq2 = page.jsrqEl && page.jsrqEl.getValue();
            var val = rq2 ? (rq1 + ',' + rq2) : rq1
            return val;
        }

        function _setValue(rq1, rq2) {
            // vmd.taskRunner(function() {
            //     return page.loadcomplete
            // }, function() {
            //     if(settings.range) {
            //         vmd(page.ksrqEl.dom).val(rq1);
            //         vmd(page.jsrqEl.dom).val(rq2)
            //     } else {
            //         vmd(page.ksrqEl.dom).val(rq1);
            //     }
            //     dateInst
            //     $.pub('datapickerRenderPicker')
            //     // DATEPICKERAPI.renderPicker(this);
            // })
            DatePicker_afterrender.call(page, page, rq1, rq2);
        }
        this.DatePicker_afterrender = DatePicker_afterrender;
        this.DatePicker_beforerender = DatePicker_beforerender;
        this.items = [{
            xtype: "vmd.div",
            id: "hiddenInfo",
            autoEl: "div",
            border: true,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 400,
            height: 50,
            hidden: true,
            ksrqLabel: this.ksrqLabel,
            jsrqLabel: this.jsrqLabel,
            isRange: this.isRange,
            hasShortcut: this.hasShortcut,
            format: this.format,
            shortCutType: this.shortCutType,
            defaultValue: this.defaultValue
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getValue = function() {
            //直接填写方法内容
            return _getValue()
        }
        this.setValue = function(rq1, rq2) {
            //直接填写方法内容
            _setValue(rq1, rq2)
        }
        this.getKsrq = function() {
            //直接填写方法内容
            return _getKsrq();
        }
        this.getJsrq = function() {
            //直接填写方法内容
            return _getJsrq();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DatePicker");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DatePicker");
    }
})