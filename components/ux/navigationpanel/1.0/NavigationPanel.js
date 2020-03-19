Ext.define('vmd.ux.navigationPanel.Controller', {
    xtype: 'vmd.ux.navigationPanel.Controller',
    constructor: function(scope) {
        this.scope = scope;
        this.first = true;
        this.firstCls = ''
        this.firstName = '首行'
        this.firstEvent = ''
        this.prev = true;
        this.prevCls = ''
        this.prevName = '上一行'
        this.prevEvent = ''
        this.next = true;
        this.nextCls = ''
        this.nextName = '下一行'
        this.nextEvent = ''
        this.last = true;
        this.lastCls = ''
        this.lastName = '尾行'
        this.lastEvent = ''
        this.pageNum = true
        // this.click = ''
    },
    setValue: function(info) {
        this.first = info.first
        this.firstCls = info.firstCls
        this.firstName = info.firstName
        this.prev = info.prev
        this.prevCls = info.prevCls
        this.prevName = info.prevName
        this.next = info.next
        this.nextCls = info.nextCls
        this.nextName = info.nextName
        this.last = info.last
        this.lastCls = info.lastCls
        this.lastName = info.lastName
        this.pageNum = info.pageNum
        // this.click = info.click
        this.firstEvent = info.firstEvent
        this.prevEvent = info.prevEvent
        this.nextEvent = info.nextEvent
        this.lastEvent = info.lastEvent
        this.scope.firstEvent.setValue(this.firstEvent)
        this.scope.prevEvent.setValue(this.prevEvent)
        this.scope.nextEvent.setValue(this.nextEvent)
        this.scope.lastEvent.setValue(this.lastEvent)
        this.scope.first.setValue(this.first)
        this.scope.firstCls.setValue(this.firstCls)
        this.scope.firstName.setValue(this.firstName)
        this.scope.prev.setValue(this.prev)
        this.scope.prevCls.setValue(this.prevCls)
        this.scope.prevName.setValue(this.prevName)
        this.scope.next.setValue(this.next)
        this.scope.nextCls.setValue(this.nextCls)
        this.scope.nextName.setValue(this.nextName)
        this.scope.last.setValue(this.last)
        this.scope.lastCls.setValue(this.lastCls)
        this.scope.lastName.setValue(this.lastName)
        this.scope.pageNum.setValue(this.pageNum)
        // this.scope.click.setValue(this.click)
    },
    serialize: function() {
        var json = {
            first: this.first,
            firstCls: this.firstCls,
            firstName: this.firstName,
            prev: this.prev,
            prevCls: this.prevCls,
            prevName: this.prevName,
            next: this.next,
            nextCls: this.nextCls,
            nextName: this.nextName,
            last: this.last,
            lastCls: this.lastCls,
            lastName: this.lastName,
            pageNum: this.pageNum,
            click: this.click,
            firstEvent: this.firstEvent,
            prevEvent: this.prevEvent,
            nextEvent: this.nextEvent,
            lastEvent: this.lastEvent
        }
        return json;
    }
})
// Ext.define('vmd.ux.navigationPanel.Controller', {
//     xtype: 'vmd.ux.navigationPanel.Controller',
//     constructor: function(scope) {
//         this.Scope = scope;
//     },
//     initializeParams_Get: function() {
//         var json = {
//             settings: {
//                 first: {
//                     isShow: true,
//                     cls: '',
//                     title: '首行'
//                 },
//                 prev: {
//                     isShow: true,
//                     cls: '',
//                     title: '上一行'
//                 },
//                 next: {
//                     isShow: true,
//                     cls: '',
//                     title: '下一行'
//                 },
//                 end: {
//                     isShow: true,
//                     cls: '',
//                     title: '尾行'
//                 },
//                 position: {
//                     isShow: true,
//                 }
//             },
//             events: {
//                 id: 'hwText',
//                 value: '',
//                 type: 'text'
//             }
//         }
//         return json;
//     },
//     setValue: function(configs) {
//         try {
//             if (configs !== null && configs !== undefined) {
//                 this.setValue_Settings(configs.settings);
//                 this.setValue_Events(configs.events);
//             }
//         } catch (ex2) {}
//     },
//     setValue_Settings: function(configs) {
//         try {
//             if (configs !== null && configs !== undefined) {
//                 if (configs.first !== null && configs.first !== undefined) {
//                     //首行, 包括3部分，是否显示首行按钮、cls样式名称和按钮名称
//                     this.Scope.hwCheckbox.setValue(configs.first.isShow);
//                     this.Scope.hwText1.setValue(configs.first.title);
//                     this.Scope.hwText5.setValue(configs.first.cls);
//                 }
//                 if (configs.prev !== null && configs.prev !== undefined) {
//                     //上一行
//                     this.Scope.hwCheckbox1.setValue(configs.prev.isShow);
//                     this.Scope.hwText2.setValue(configs.prev.title);
//                     this.Scope.hwText6.setValue(configs.prev.cls);
//                 }
//                 if (configs.next !== null && configs.next !== undefined) {
//                     //下一行
//                     this.Scope.hwCheckbox2.setValue(configs.next.isShow);
//                     this.Scope.hwText3.setValue(configs.next.title);
//                     this.Scope.hwText7.setValue(configs.next.cls);
//                 }
//                 if (configs.end !== null && configs.end !== undefined) {
//                     //尾行
//                     this.Scope.hwCheckbox3.setValue(configs.end.isShow);
//                     this.Scope.hwText4.setValue(configs.end.title);
//                     this.Scope.hwText8.setValue(configs.end.cls);
//                 }
//                 if (configs.position !== null && configs.position !== undefined) {
//                     //位置/总数
//                     this.Scope.hwCheckbox4.setValue(configs.position.isShow);
//                 }
//             }
//         } catch (ex2) {}
//     },
//     setValue_Events: function(configs) {
//         try {
//             this.Scope.hwText.setValue(configs.value);
//         } catch (ex2) {}
//     },
//     serialize: function() {
//         return {
//             //返回对象
//             settings: this._get_settings(),
//             events: this._get_events()
//         }
//     },
//     _get_events: function() {
//         return {
//             click: this._get_events_click()
//         }
//     },
//     _get_events_click: function() {
//         return {
//             id: 'hwText',
//             value: this.Scope.hwText.getValue(),
//             type: 'text'
//         }
//     },
//     _get_settings: function() {
//         return {
//             first: this._get_first(),
//             prev: this._get_prev(),
//             next: this._get_next(),
//             end: this._get_end(),
//             position: this._get_position()
//         }
//     },
//     _get_first: function() {
//         return {
//             //包括3部分，是否显示首行按钮、cls样式名称和按钮名称
//             isShow: this.Scope.hwCheckbox.getValue(),
//             cls: this.Scope.hwText5.getValue(),
//             title: this.Scope.hwText1.getValue()
//         }
//     },
//     _get_prev: function() {
//         return {
//             isShow: this.Scope.hwCheckbox1.getValue(),
//             cls: this.Scope.hwText6.getValue(),
//             title: this.Scope.hwText2.getValue()
//         }
//     },
//     _get_next: function() {
//         return {
//             isShow: this.Scope.hwCheckbox2.getValue(),
//             cls: this.Scope.hwText7.getValue(),
//             title: this.Scope.hwText3.getValue()
//         }
//     },
//     _get_end: function() {
//         return {
//             isShow: this.Scope.hwCheckbox3.getValue(),
//             cls: this.Scope.hwText8.getValue(),
//             title: this.Scope.hwText4.getValue()
//         }
//     },
//     _get_position: function() {
//         return {
//             isShow: this.Scope.hwCheckbox4.getValue()
//         }
//     },
//     Initilize_Click: function(sender) {
//         sender.el.on('dblclick', function() {
//             var editor = new vmd.comp.Ace({
//                 id: "ace_code"
//             });
//             // init_def_platformControlData();
//             var aceWin = new vmd.window({
//                 title: "事件编辑",
//                 id: "aceWin",
//                 url: vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()),
//                 offset: [100, 100],
//                 modal: true,
//                 maximizable: true,
//                 maskStyle: 'opacity:0.7',
//                 layout: 'border',
//                 draggable: false,
//                 listeners: {
//                     move: function(me, x, y) {
//                         this.moveZone(me, x, y);
//                     }
//                 }
//             });
//             aceWin.closeFn = function() {
//                 //修复ace tooltip还存在的问题
//                 Ext.select('.Ace-Tern-tooltip').remove();
//                 var val = aceWin.val;
//                 if (aceWin.script == val) {
//                     return;
//                 }
//                 Ext.Msg.confirm("提示", "脚本已改变是否保存?", function(btn) {
//                     if (btn == 'no') return;
//                     var click_label = sender;
//                     if (val.trim()) {
//                         xds.vmd.events = val;
//                         var name = 'navigation_click';
//                         sender.setValue(name)
//                         // 返回给对象
//                     } else {
//                         click_label = undefined;
//                         delete xds.vmd.events
//                     }
//                 })
//             }
//             //mafei 在ide-automachjs中
//             // init_def_platformControlData();
//             aceWin.on('close', aceWin.closeFn, this)
//             //当前拖拽组件
//             window.setTimeout(function() {
//                 window.setTimeout(function() {
//                     //代码编辑器初始化
//                     if (typeof rowIndex == "number") {
//                         aceWin.aceline = rowIndex;
//                     }
//                 }, 150)
//                 var code = xds.vmd.events;
//                 var eventName = 'navigation_click'
//                 // var me = 
//                 var getdefaulteventname = function() {
//                     return "function(sender" + "){\n" + "\n} \n";
//                 }
//                 var m = getdefaulteventname(),
//                     code = code ? code : "",
//                     replaceStr = "function {0}{1}",
//                     regex = new RegExp("function\\s+" + eventName + "\\s*?\\(");
//                 if (eventName && code.search(regex) == -1) {
//                     var e = m.trim().replace("function", ""),
//                         i = String.format(replaceStr, eventName, e);
//                     code += (code ? "\n\n" : "") + i
//                 }
//                 aceWin.script = code;
//                 aceWin.val = code;
//                 aceWin.show();
//                 //进度提示
//                 var myMask = new Ext.LoadMask(aceWin.el, {
//                     msg: "数据加载中,请稍后...",
//                     msgCls: 'z-index:10000;'
//                 });
//                 myMask.show();
//                 aceWin.loading = myMask;
//                 //  aceWin.update("<iframe  id='iframe_page' src='" + vmd.virtualPath + vmd.vmdCodePath + "?" + Date.parse(new Date()) + "' width=600 height=900 frameborder=0  ></iframe>")
//                 var scriptArr = code.split("\n"),
//                     rowIndex = null;
//                 Ext.each(scriptArr,
//                     function(o, p) {
//                         if (o.search(regex) != -1) {
//                             rowIndex = p + 2;
//                             return false
//                         }
//                     });
//             }, 50)
//         })
//     },
//     Delete_Click_button1: function(sender, e) {
//         try {
//             sender.setValue('');
//         } catch (ex2) {}
//     }
// })
Ext.define("vmd.ux.NavigationPanel", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.NavigationPanel",
    title: "Panel",
    header: false,
    border: false,
    width: 300,
    height: 603,
    layout: "fit",
    uxCss: ".flex{    display: flex}.m-r5{    margin-right: 5px}.line35{    line-height: 35px}",
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
        this.controller = new vmd.ux.navigationPanel.Controller(this);
        var page = this;
        this.on('afterrender', function() {
            this.cascade(function(item) {
                item.on('change', function(a, b, c) {
                    changeAttribute(a, b)
                })
                item.on("check", function(a, b, c) {
                    changeAttribute(a, b)
                })
                item.on("select", function(a, b, c) {
                    changeAttribute(a, b)
                })
            })
        })

        function changeAttribute(a, b) {
            var inst = page.controller;
            var id = a.initialConfig.id;
            inst[id] = b;
            page.fireEvent('settingChangedEvent')
        }

        function click_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'click', sender.getValue(), 'operateType');
            })
        }

        function first_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var _name = sender.getValue();
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'firstEvent', _name);
                page.controller.firstEvent = _name;
                // debugger
                // xds.vmd.addEventForDesignerCmp(xds.active.component.propPanel, _name, _name)
            })
        }

        function prev_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'prevEvent', sender.getValue());
                page.controller.prevEvent = sender.getValue()
            })
        }

        function next_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'nextEvent', sender.getValue());
                page.controller.nextEvent = sender.getValue()
            })
        }

        function last_event_afterrender(sender) {
            sender.el.on('dblclick', function() {
                var publicmethod = xds.active.component.propPanel.controller;
                publicmethod.openCodeEditor(sender, 'lastEvent', sender.getValue());
                page.controller.lastEvent = sender.getValue()
            })
        }

        function button_click(sender, e) {
            xds.active.component.propPanel.controller.comp.navigation.firstEvent = ''
            firstEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }

        function button1_click(sender, e) {
            page.controller.prevEvent = ''
            prevEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }

        function button2_click(sender, e) {
            page.controller.nextEvent = ''
            nextEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }

        function button3_click(sender, e) {
            page.controller.lastEvent = ''
            lastEvent.setValue('')
            page.fireEvent('settingChangedEvent')
        }
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "配置",
            header: false,
            border: false,
            height: 130,
            region: "north",
            layout: "vbox",
            items: [{
                    xtype: "panel",
                    id: "panel19",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 10,
                    width: 297
                },
                {
                    xtype: "panel",
                    id: "panel2",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 126,
                    width: 297,
                    items: [{
                            xtype: "panel",
                            id: "panel3",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            width: 297,
                            items: [{
                                xtype: "checkbox",
                                id: "first",
                                fieldLabel: "Checkbox",
                                boxLabel: "首条",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel4",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div1",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label1",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "firstCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel5",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div2",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label2",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "firstName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div",
                            layoutConfig: {
                                align: "middle"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 31,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "firstEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "first_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: first_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button_click",
                                    listeners: {
                                        click: button_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel6",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 127,
                    width: 297,
                    items: [{
                            xtype: "panel",
                            id: "panel7",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "prev",
                                fieldLabel: "Checkbox",
                                boxLabel: "上一条",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel8",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div3",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label3",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "prevCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel9",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div4",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label4",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "prevName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div10",
                            layoutConfig: {
                                align: "middle"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 31,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label10",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "prevEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "prev_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: prev_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button1",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button1_click",
                                    listeners: {
                                        click: button1_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel10",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 125,
                    width: 297,
                    items: [{
                            xtype: "panel",
                            id: "panel11",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "next",
                                fieldLabel: "Checkbox",
                                boxLabel: "下一条",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel12",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div5",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label5",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "nextCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel13",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div6",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label6",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "nextName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div11",
                            layoutConfig: {
                                align: "middle"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 31,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label11",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "nextEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "next_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: next_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button2",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button2_click",
                                    listeners: {
                                        click: button2_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel14",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 125,
                    width: 297,
                    items: [{
                            xtype: "panel",
                            id: "panel15",
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                xtype: "checkbox",
                                id: "last",
                                fieldLabel: "Checkbox",
                                boxLabel: "尾条",
                                x: 10,
                                margins: "0 0 0 20",
                                checked: true
                            }]
                        },
                        {
                            xtype: "panel",
                            id: "panel16",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div7",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 40,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label7",
                                    text: "样式类名:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "lastCls",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    readOnly: false
                                }
                            ]
                        },
                        {
                            xtype: "panel",
                            id: "panel17",
                            layoutConfig: {
                                align: "middle"
                            },
                            title: "Panel",
                            header: false,
                            border: false,
                            height: 30,
                            layout: "hbox",
                            items: [{
                                    xtype: "vmd.div",
                                    id: "div8",
                                    autoEl: "div",
                                    border: false,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "top left",
                                    width: 65,
                                    height: 28
                                },
                                {
                                    xtype: "label",
                                    id: "label8",
                                    text: "名称:"
                                },
                                {
                                    xtype: "textfield",
                                    id: "lastName",
                                    allowBlank: true,
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: "vmd.div",
                            id: "div9",
                            layoutConfig: {
                                align: "middle"
                            },
                            autoEl: "div",
                            border: false,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                            width: 400,
                            height: 31,
                            layout: "hbox",
                            items: [{
                                    xtype: "label",
                                    id: "label9",
                                    text: "事件：",
                                    margins: "0 0 0 65"
                                },
                                {
                                    xtype: "textfield",
                                    id: "lastEvent",
                                    allowBlank: true,
                                    enableKeyEvents: true,
                                    afterrender: "last_event_afterrender",
                                    width: 160,
                                    listeners: {
                                        vmdafterrender: last_event_afterrender
                                    }
                                },
                                {
                                    xtype: "vmd.button",
                                    id: "button3",
                                    type: "text",
                                    size: "small",
                                    icon: "delete",
                                    margins: "0 0 0 5",
                                    style: "color: red",
                                    click: "button3_click",
                                    listeners: {
                                        click: button3_click
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: "panel",
                    id: "panel18",
                    title: "Panel",
                    header: false,
                    border: false,
                    height: 30,
                    layout: "hbox",
                    width: 297,
                    items: [{
                        xtype: "checkbox",
                        id: "pageNum",
                        fieldLabel: "Checkbox",
                        boxLabel: "位置/总数",
                        x: 10,
                        margins: "0 0 0 20",
                        checked: true
                    }]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setValue = function(configs) {
            page.controller.setValue(configs)
        }
        this.serialize = function() {
            return page.controller.serialize()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.NavigationPanel");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NavigationPanel");
    }
})