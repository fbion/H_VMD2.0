Ext.define('vmd.ux.addressPicker_Test.Controller', {
    xtype: 'vmd.ux.addressPicker_Test.Controller',
    constructor: function(options) {
        alert("123");
    }
})
Ext.define("vmd.ux.AddressPicker_Test", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.AddressPicker_Test",
    title: "Panel",
    header: false,
    border: false,
    width: 510,
    height: 34,
    layout: "absolute",
    baseCls: "",
    cls: "ys",
    detailWidth: 200,
    comboWidth: 300,
    pickerWidth: 510,
    detailX: 310,
    detailEmptyText: "请输入详细地址信息",
    uxCss: ".x-column {    float: none;    display: inline-block;    vertical-align: middle;    margin: 2px}.x-column .x-form-checkbox {    vertical-align: middle}.x-column label {    top: 0}.option,.option_long,.option_toolong {    left: 10px !important;    top: 2px !important;    color: #666;    font-size: 14px;    font-family: 'Microsoft YaHei';    width: 90px;    overflow: hidden;    text-overflow: ellipsis;    white-space: nowrap;}.option_long {    width: 180px;}.option_toolong {    width: 270px;}.option:hover,option_long:hover,option_toolong:hover {    color: #e4393c !important;    cursor: pointer;}.option_long:hover {    color: #e4393c !important;    cursor: pointer;}.option_toolong:hover {    color: #e4393c !important;    cursor: pointer;}.option:active,option_long:active,option_toolong:active {    color: #e4393c !important;}.selected {    color: #e4393c !important;}.div_option {    top: 10px !important;}.addr1 {    border-bottom: none !important;    height: 34px !important;    z-index: 1;}::-webkit-scrollbar-track {    background-color: #F5F5F5;}::-webkit-scrollbar {    width: 6px;    height: 7px;    background-color: #F5F5F5;}::-webkit-scrollbar-thumb {    background-color: #999;    border-radius: 10px;}.zwf {    font-size: 14px;    color: #666;}.ys .x-tab-strip-top .x-tab-strip-active .x-tab-right,.ys .x-tab-strip-top .x-tab-right,.ys ul.x-tab-strip-top {    background-color: #fff !important;}.ys input[type='text'] {    font-family: Microsoft YaHei !important;}/*改变tab页选中样式*//*.ys ul.x-tab-strip-top {*//*    border: 0;*//*    background-image: none;*//*    border-color: #dfdfdf;*//*    border-bottom: 2px solid #39c;*//*}*//*.ys .x-tab-strip-active,*//*.ys .x-tab-strip-active a.x-tab-right {*//*    border: 1px solid #39c;*//*    border-radius: 3px;*//*    border-bottom: none;*//*    z-index: 1;*//*    height: 35px !important;*//*}*//*.ys .x-tab-strip-active{*//*    background-color: #fff !important;*//*}*/",
    uxrequirecss: "[\"components/ux/addresspicker_test/1.0/css/datainput.css\"]",
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
        //var host = vmd.workspace.dataServiceIp;
        var host = 'www.hanweikeji.com:8050';
        var provinceId = '',
            cityId = '',
            countyId = '';
        var provinceName = '',
            cityName = '',
            countyName = '';
        var provinceOld, cityOld, countyOld;
        var provinceData;
        var g = 0;
        //var showflag = '';
        // 获取数据
        hwDas.get({
                host: host,
                url: 'isipmanage/area/province'
            }, {}, {},
            function(result) {
                provinceData = result;
                //getProvince();
            },
            function(msg) {}
        );

        function combo_afterrender(sender) {
            combo.editable = false;
            combo.setText('--请选择--')
            panel.title = '请选择';
            combo.setValue = function(val) {
                this._value = val;
            }
            combo.getValue = function() {
                return this._value || ""
            }
            var imgel = combo.el.query(".dhxcombo_select_img");
            vmd(imgel).unbind('mouseover')
            //vmd(sender.DOMelem_input).hover(function(e) {
            sender.el.hover(function(e) {
                this.blur();
                //combo.addClass('addr1')
                //picker_show();
                isshowlisthide = true;
                //e.stopPropagation();
            }, function(e) {
                //  picker_hidden()
                if (isshowlisthide) {
                    picker_hidden()
                    isshowlisthide = false
                }
            })
            sender.el.on('click', function(e) {
                this.blur();
                picker_show();
                isshowlisthide = true;
                e.stopPropagation();
            })
            vmd(sender.DOMelem_input).on('mousedown', function(e) {
                this.blur();
                combo.addClass('addr1')
            }).on('mouseup', function(e) {
                this.blur();
                combo.addClass('addr1')
            }).on('focus', function(e) {
                this.blur();
                combo.addClass('addr1')
            }).on('blur', function() {}).on('keyup', function() {
                div.filterBy(combo.getText())
            })
            // Ext.getDoc().on('click', function(e) {
            //     if(vmd(e.target).parents('.combotree').length == 0 && vmd(e.target).parents('.vmd-tree').length == 0 && vmd(e.target).parents('.x-tree-node').length == 0) div.hide()
            // })
        }

        function combo_change(sender, value, text) {
            if (combo.getValue == '') {
                combo.setText('--请选择--')
            }
        }

        function getProvince() {
            // 获取省数据
            if (MyTabs.getActiveTab() == panel) {
                panel.removeAll();
            }
            if (!provinceData) {
                return;
            }
            var datas = provinceData.data[0].datas;
            for (var i = 0, len = datas.length; i < len; i++) {
                var item_width, label_cls;
                if (datas[i].name.length <= 5) {
                    item_width = 90;
                    label_cls = 'option';
                } else if (datas[i].name.length > 5 && datas[i].name.length <= 12) {
                    item_width = 184;
                    label_cls = 'option_long';
                } else {
                    item_width = 276;
                    label_cls = 'option_toolong';
                }
                var item = new Ext.Container({
                    layout: 'hbox',
                    layoutConfig: {
                        align: 'left',
                        pack: 'center'
                    },
                    width: item_width,
                    height: 25,
                    cls: 'div_option'
                });
                var label = new Ext.form.Label({
                    id: datas[i].id,
                    text: datas[i].name,
                    cls: label_cls
                });
                label.on('afterrender', function() {
                    var option = this;
                    if (this.id == provinceId) {
                        this.addClass('selected');
                        provinceOld = this;
                    }
                    this.el.on("click", function(e) {
                        province_click(this.id);
                        e.stopEvent();
                    })
                    vmd(this.el.dom).attr('title', datas[i].name);
                })
                item.add(label);
                panel.add(item);
                panel.doLayout();
            }
            // if (showflag) {
            //     picker_hidden()
            // }
        }

        function getCity() {
            // 获取市数据
            hwDas.get({
                    host: host,
                    url: 'isipmanage/area/city'
                }, {}, {
                    p_id: provinceId
                },
                function(result) {
                    // MyTabs.setActiveTab(panel1);
                    panel1.removeAll();
                    var datas = result.data[0].datas;
                    for (var i = 0, len = datas.length; i < len; i++) {
                        var item_width, label_cls;
                        if (datas[i].name.length <= 5) {
                            item_width = 90;
                            label_cls = 'option';
                        } else if (datas[i].name.length > 5 && datas[i].name.length <= 12) {
                            item_width = 184;
                            label_cls = 'option_long';
                        } else {
                            item_width = 245;
                            label_cls = 'option_toolong';
                        }
                        var item = new Ext.Container({
                            layout: 'hbox',
                            layoutConfig: {
                                align: 'left',
                                pack: 'center'
                            },
                            width: item_width,
                            height: 25,
                            title: datas[i].name,
                            cls: 'div_option'
                        });
                        var label = new Ext.form.Label({
                            id: datas[i].id,
                            text: datas[i].name,
                            cls: label_cls,
                        });
                        label.on('afterrender', function() {
                            var option = this;
                            if (this.id == cityId) {
                                this.addClass('selected');
                                cityOld = this;
                            }
                            vmd(this.el.dom).attr('title', datas[i].name);
                            this.el.on("click", function(e) {
                                //MyTabs.removeListener('mouseleave')
                                option.addClass('selected');
                                if (cityOld && cityOld.removeClass()) {
                                    cityOld.removeClass('selected');
                                }
                                cityOld = option;
                                cityId = this.id;
                                cityName = option.text;
                                combo.setText(provinceName + '/' + option.text);
                                panel1.setTitle(option.text);
                                panel2.setTitle('请选择');
                                panel2.enable()
                                MyTabs.setActiveTab(panel2);
                                getCounty()
                                isshowlisthide = false
                                e.stopEvent();
                            })
                        })
                        item.add(label);
                        panel1.add(item);
                        panel1.doLayout();
                        //isshowlisthide = true
                    }
                    // if (showflag) {
                    //     picker_hidden()
                    // }
                },
                function(msg) {}
            );
        }

        function getCounty() {
            // 获取县数据
            hwDas.get({
                    host: host,
                    url: 'isipmanage/area/district'
                }, {}, {
                    c_id: cityId
                },
                function(result) {
                    panel2.removeAll();
                    var datas = result.data[0].datas;
                    for (var i = 0, len = datas.length; i < len; i++) {
                        var item_width, label_cls;
                        if (datas[i].name.length <= 5) {
                            item_width = 90;
                            label_cls = 'option';
                        } else if (datas[i].name.length > 5 && datas[i].name.length <= 12) {
                            item_width = 184;
                            label_cls = 'option_long';
                        } else {
                            item_width = 245;
                            label_cls = 'option_toolong';
                        }
                        var item = new Ext.Container({
                            //layout: 'column',
                            layout: 'hbox',
                            layoutConfig: {
                                align: 'left',
                                pack: 'center'
                            },
                            height: 25,
                            title: datas[i].name,
                            // autoScroll:true,
                            // autoWidth:true,
                            //minWidth: 160,
                            width: item_width,
                            cls: 'div_option'
                        });
                        var label = new Ext.form.Label({
                            id: datas[i].id,
                            text: datas[i].name,
                            cls: label_cls,
                        });
                        label.on('afterrender', function() {
                            var option = this;
                            if (this.id == countyId) {
                                this.addClass('selected');
                                countyOld = this;
                            }
                            vmd(this.el.dom).attr('title', datas[i].name);
                            this.el.on("click", function(e) {
                                option.addClass('selected');
                                if (countyOld && countyOld.removeClass()) {
                                    countyOld.removeClass('selected');
                                }
                                countyOld = option;
                                this.dom.style.color = '#e4393c !important';
                                countyId = this.id;
                                countyName = option.text;
                                combo.setText(provinceName + '/' + cityName + '/' + option.text);
                                panel2.setTitle(option.text)
                                picker_hidden();
                                //e.stopEvent();
                            })
                        })
                        item.add(label);
                        panel2.add(item);
                        panel2.doLayout();
                    }
                    // if (showflag) {
                    //     picker_hidden()
                    // }
                },
                function(msg) {}
            );
        }

        function province_click(selectCmpId) {
            var option = Ext.getCmp(selectCmpId);
            var prevProvince = Ext.fly(provinceId);
            if (prevProvince && prevProvince.removeClass) {
                prevProvince.removeClass('selected');
            }
            if (!option) return;
            option.addClass('selected');
            provinceOld = option;
            provinceId = option.id;
            provinceName = option.text;
            combo.setText(option.text);
            panel.setTitle(option.text);
            panel1.setTitle('请选择');
            panel2.setTitle('');
            panel1.enable()
            panel2.disable();
            MyTabs.setActiveTab(panel1);
            getCity()
            isshowlisthide = false
        }

        function picker_hidden() {
            combo.removeClass('addr1')
            div.hide();
        }

        function picker_show(flag) {
            //showflag = flag;
            combo.addClass('addr1')
            div.show();
            if (g == 1 && !flag) {
                return;
            }
            if (!flag) {
                g = 1;
            }
            if (countyId != '') {
                panel.setTitle(provinceName);
                panel1.setTitle(cityName);
                panel2.setTitle(countyName);
                panel1.enable();
                panel2.enable();
                MyTabs.setActiveTab(panel2);
                //getCity();
                //getCounty();
                return;
            }
            if (countyId == '' && cityId != '') {
                panel.setTitle(provinceName);
                panel1.setTitle(cityName);
                panel2.setTitle('请选择');
                panel1.enable();
                panel2.enable();
                MyTabs.setActiveTab(panel2);
                //getCity(flag);
                //getCounty(flag);
                return;
            }
            if (cityId == '' && provinceId != '') {
                MyTabs.setActiveTab(panel1);
                panel.setTitle(provinceName);
                panel1.setTitle('请选择');
                panel1.enable();
                panel2.setTitle('');
                panel2.disable();
                //getCity(flag)
                return;
            }
            if (provinceId == '') {
                MyTabs.setActiveTab(panel);
                getProvince();
                panel.setTitle('请选择');
                panel1.setTitle('');
                panel2.setTitle('');
                panel1.disable();
                panel2.disable();
                return;
            }
        }
        //获取组建值，根据传参不同分别获取省、市、县的id值
        function _getValue(attr) {
            switch (attr) {
                case 'province':
                    return provinceId;
                case 'city':
                    return cityId;
                case 'county':
                    return countyId;
                default:
                    info = {
                        provinceId: provinceId,
                        cityId: cityId,
                        countyId: countyId,
                        detail: detail.getValue()
                    }
                    return info;
            }
        }
        //设置组建值，设置下拉框的显示文本并控制选择器选中相应选项
        function _setValue(province_id, city_id, county_id, detail_info) {
            //详细地址赋值：detail
            detail.setValue(detail_info);
            //省市县数据赋值
            provinceId = province_id;
            cityId = city_id;
            countyId = county_id;
            //下拉框数据赋值
            hwDas.get({
                    host: host,
                    url: 'isipmanage/area/getAddrNmeById'
                }, {}, {
                    province_id: province_id,
                    city_id: city_id,
                    county_id: county_id
                },
                function(result) {
                    var datas = result.data[0].datas;
                    if (datas[0].provincename != '') {
                        combo.setText(datas[0].addrname)
                        provinceName = datas[0].provincename;
                        cityName = datas[0].cityname;
                        countyName = datas[0].countyname;
                        // picker_show(true);
                        g = 0;
                    }
                },
                function(msg) {}
            );
            //选择器选中相应选项--县
        }
        var isshowlisthide = false;

        function div_afterrender(sender) {
            vmd(div.el.dom).hover(function() {
                //combo.addClass('addr1')
                picker_show();
                isshowlisthide = true;
            }, function() {
                if (isshowlisthide) {
                    picker_hidden()
                    isshowlisthide = false
                }
            })
        }

        function MyTabs_tabchange(sender, tab) {
            switch (tab) {
                case panel:
                    getProvince();
                    break;
                case panel1:
                    getCity();
                    break;
                case panel2:
                    getCounty();
                    break;
                default:
            }
        }
        this.items = [{
                xtype: "vmd.combo",
                id: "combo",
                width: this.comboWidth,
                afterrender: "combo_afterrender",
                change: "combo_change",
                hidden: false,
                style: "margin: 0 -50px 0 0;    border: 1px solid #d7d7d7;    border-radius: 3px;    height: 31px;    font-size: 14px;",
                margins: "0 0 0 50",
                x: "",
                listeners: {
                    vmdafterrender: combo_afterrender,
                    change: combo_change
                }
            },
            {
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: this.pickerWidth,
                y: 23,
                layout: "fit",
                hidden: true,
                style: "margin-top: 11px;    border-radius: 3px;",
                autoHeight: true,
                afterrender: "div_afterrender",
                listeners: {
                    vmdafterrender: div_afterrender
                },
                items: [{
                    xtype: "tabpanel",
                    id: "MyTabs",
                    activeTab: 0,
                    height: 231,
                    width: 510,
                    x: 10,
                    y: 41,
                    hidden: false,
                    autoHeight: true,
                    style: "border-radius: 3px;",
                    tabchange: "MyTabs_tabchange",
                    listeners: {
                        tabchange: MyTabs_tabchange
                    },
                    items: [{
                            xtype: "panel",
                            id: "panel",
                            title: "省",
                            header: true,
                            border: true,
                            height: 100,
                            layout: "column",
                            autoScroll: true,
                            autoHeight: true,
                            style: "border-radius: 3px;"
                        },
                        {
                            xtype: "panel",
                            id: "panel1",
                            header: true,
                            border: true,
                            height: 100,
                            hidden: true,
                            layout: "column",
                            autoScroll: true,
                            autoHeight: true
                        },
                        {
                            xtype: "panel",
                            id: "panel2",
                            header: true,
                            border: true,
                            height: 100,
                            hidden: true,
                            layout: "column",
                            autoScroll: true,
                            autoHeight: true
                        }
                    ]
                }]
            },
            {
                xtype: "textfield",
                id: "detail",
                allowBlank: true,
                enableKeyEvents: true,
                x: this.detailX,
                y: 0,
                width: this.detailWidth,
                height: 33,
                emptyText: this.detailEmptyText,
                emptyClass: "zwf",
                style: "border: 1px solid #d7d7d7;    border-radius: 3px;    font-size:14px;    font-family: Microsoft YaHei;",
                hidden: false
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getValue = function(attr) {
            //直接填写方法内容
            return _getValue(attr);
        }
        this.setValue = function(province_id, city_id, county_id, detail_info) {
            //直接填写方法内容
            return _setValue(province_id, city_id, county_id, detail_info);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.AddressPicker_Test");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AddressPicker_Test");
    }
})