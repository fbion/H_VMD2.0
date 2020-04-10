Ext.define('vmd.ux.newNumber.Controller', {
    xtype: 'vmd.ux.newNumber.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.NewNumber", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.NewNumber",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    beforerender: "NewNumber_beforerender",
    autoScroll: true,
    listeners: {
        beforerender: function() {
            this.NewNumber_beforerender(this)
        }
    },
    uxCss: ".btn {    cursor: pointer;    /*border-radius: 4px;*/}",
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
        //font family 字体
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['sort', 'display']
        });
        var data = [{
                sort: 'myConventional',
                display: '常规'
            }, {
                sort: 'myNumber',
                display: '数字'
            }, {
                sort: 'myCurrency',
                display: '货币'
            }
            // , {
            //     sort: 'myAccounting',
            //     display: '会计专用'
            // }
            , {
                sort: 'myDate',
                display: '日期'
            }, {
                sort: 'myTime',
                display: '时间'
            }, {
                sort: 'myPercentage',
                display: '百分比'
            }, {
                sort: 'mySciCounting',
                display: '科学计数'
            }, {
                sort: 'myText',
                display: '文本'
            }, {
                sort: 'mySpecial',
                display: '特殊'
            }
            // , {
            //     sort: 'myCustomize',
            //     display: '自定义'
            // }
        ];
        store.loadData(data);
        /////////////////////////////////////
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'display']
        });
        var data1 = [{
            id: '1',
            display: '(1234)'
        }, {
            id: '2',
            display: '1234'
        }, {
            id: '3',
            display: '-1234'
        }];
        store1.loadData(data1);
        ///////////////////////////////////////
        var store2 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['country', 'display']
        });
        var data2 = [{
            country: 'none',
            display: '无'
        }, {
            country: 'us',
            display: '$'
        }, {
            country: 'uk',
            display: '￡'
        }, {
            country: 'cn',
            display: '￥'
        }, {
            country: 'eu',
            display: '€'
        }, {
            country: 'fran',
            display: '₣'
        }, ];
        store2.loadData(data2);
        //////////////////////////////////////////
        var store3 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'display']
        });
        var data3 = [{
            id: '0',
            display: '默认'
        }, {
            id: '1',
            display: '2014-8-19'
        }, {
            id: '2',
            display: '2014年8月19日'
        }, {
            id: '3',
            display: '201408'
        }, {
            id: '4',
            display: '2014-08'
        }, {
            id: '5',
            display: '8月'
        }];
        store3.loadData(data3);
        //////////////////////////////////////////
        var store4 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'display']
        });
        var data4 = [{
            id: '0',
            display: 'G/通用格式'
        }, {
            id: '1',
            display: '0'
        }, {
            id: '2',
            display: '0.00'
        }, {
            id: '3',
            display: '#,##0'
        }, {
            id: '4',
            display: '#,##0.00'
        }, {
            id: '5',
            display: '_ * #,##0_ ;_ * -#,##0_ ;_ * "-"_ ;_ @_ '
        }, {
            id: '6',
            display: '_ * #,##0.00_ ;_ * -#,##0.00_ ;_ * "-"??_ ;_ @_ '
        }, {
            id: '7',
            display: '_ ¥* #,##0_ ;_ ¥* -#,##0_ ;_ ¥* "-"_ ;_ @_ '
        }, {
            id: '8',
            display: '_ ¥* #,##0.00_ ;_ ¥* -#,##0.00_ ;_ ¥* "-"??_ ;_ @_ '
        }, {
            id: '9',
            display: '#,##0;-#,##0'
        }, {
            id: '10',
            display: '#,##0;[红色]-#,##0'
        }, {
            id: '11',
            display: '#,##0.00;-#,##0.00'
        }, {
            id: '12',
            display: '#,##0.00;[红色]-#,##0.00'
        }, {
            id: '13',
            display: '¥#,##0;¥-#,##0'
        }, {
            id: '14',
            display: '¥#,##0;[红色]¥-#,##0'
        }, {
            id: '15',
            display: '¥#,##0.00;¥-#,##0.00'
        }, {
            id: '16',
            display: '¥#,##0.00;[红色]¥-#,##0.00'
        }, {
            id: '17',
            display: '0%'
        }, {
            id: '18',
            display: '0.00%'
        }, {
            id: '19',
            display: '0.00E+00'
        }, {
            id: '20',
            display: '##0.0E+0'
        }, {
            id: '21',
            display: '# ?/?'
        }, {
            id: '22',
            display: '# ??/??'
        }, {
            id: '23',
            display: '$#,##0_);($#,##0)'
        }, {
            id: '24',
            display: '$#,##0_);[红色]($#,##0)'
        }, {
            id: '25',
            display: '$#,##0.00_);($#,##0.00)'
        }, {
            id: '26',
            display: '$#,##0.00_);[红色]($#,##0.00)'
        }, {
            id: '27',
            display: 'yyyy"年"m"月"'
        }, {
            id: '28',
            display: 'm"月"d"日"'
        }, {
            id: '29',
            display: 'yyyy-m-d'
        }, {
            id: '30',
            display: 'yyyy"年"m"月"d"日"'
        }, {
            id: '31',
            display: 'm-d-yy'
        }, {
            id: '32',
            display: 'd-mmm'
        }, {
            id: '33',
            display: 'mmm-yy'
        }, {
            id: '34',
            display: 'h:mm AM/PM'
        }, {
            id: '35',
            display: 'h:mm:ss AM/PM'
        }, {
            id: '36',
            display: 'h:mm'
        }, {
            id: '37',
            display: 'h:mm:ss'
        }, {
            id: '38',
            display: 'h"时"mm"分"'
        }, {
            id: '39',
            display: 'h"时"mm"分"ss"秒"'
        }, {
            id: '40',
            display: '上午/下午h"时"mm"分"'
        }, {
            id: '41',
            display: '上午/下午h"时"mm"分"ss"秒"'
        }, {
            id: '42',
            display: 'yyyy-m-d h:mm'
        }, {
            id: '43',
            display: 'mm:ss'
        }, {
            id: '44',
            display: 'mm:ss.0'
        }, {
            id: '45',
            display: '@'
        }, {
            id: '46',
            display: '[h]:mm:ss'
        }, {
            id: '47',
            display: '[$-804]yyyy"年"m"月"d"日"dddd'
        }];
        store4.loadData(data4);
        ///////////////////////////////////////////
        var store5 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'display']
        });
        var data5 = [{
            id: '0',
            display: '默认'
        }];
        store5.loadData(data5);
        /////////////////////////////////////////////
        function allSortCom_afterrender(sender) {
            allSortCom.store = store;
            allSortCom.displayField = 'display';
            allSortCom.valueField = 'sort';
            // allSortCom.firstSelected = true
            //
        }

        function negativeCom_afterrender(sender) {
            negativeCom.store = store1;
            negativeCom.displayField = 'display';
            negativeCom.valueField = 'id'
        }

        function symbolCom_afterrender(sender) {
            symbolCom.store = store2;
            symbolCom.displayField = 'display';
            symbolCom.valueField = 'country';
        }

        function symbolCom1_afterrender(sender) {
            //
            symbolCom1.store = store2;
            symbolCom1.displayField = 'display';
            symbolCom1.valueField = 'country';
        }

        function dateSortCom_afterrender(sender) {
            dateSortCom.store = store3;
            dateSortCom.displayField = 'display';
            dateSortCom.valueField = 'id';
            //
        }

        function customCom_afterrender(sender) {
            customCom.store = store4;
            customCom.displayField = 'display';
            customCom.valueField = 'id';
        }

        function setInfo(info, sheet, cell) {
            page.info = info;
            page.o = sheet;
            page.cell = cell;
            if (info) {
                if (typeof info.cellAttributeInfo == 'undefined') {
                    page.o.setCellMeta(info.row, info.col, 'cellAttributeInfo', new gridCellInfoObject());
                    d = page.o.getCellMeta(info.row, info.col).cellAttributeInfo.cellInfoToJson();
                } else {
                    d = info.cellAttributeInfo.cellInfoToJson();
                }
            }
            if (d) {
                var numInfo = d.numberInfo[0];
                var alignInfo = d.alignInfo[0];
                allSortCom.setValue(numInfo.allSortCom.value)
                changeDivs(numInfo.allSortCom.value);
                xs.setValue(numInfo.xs.value);
                xs1.setValue(numInfo.xs1.value);
                xs2.setValue(numInfo.xs2.value);
                xs3.setValue(numInfo.xs3.value);
                xs4.setValue(numInfo.xs4.value);
                noZeroCheckBox.setValue(numInfo.noZeroCheckBox.checked);
                noZeroCheckBox1.setValue(numInfo.noZeroCheckBox1.checked);
                noZeroCheckBox2.setValue(numInfo.noZeroCheckBox2.checked);
                noZeroCheckBox3.setValue(numInfo.noZeroCheckBox3.checked);
                noZeroCheckBox4.setValue(numInfo.noZeroCheckBox4.checked);
                areaCom.setValue(numInfo.areaCom.value);
                areaCom1.setValue(numInfo.areaCom1.value);
                areaCom2.setValue(numInfo.areaCom2.value);
                symbolCom.setValue(numInfo.symbolCom.value);
                symbolCom1.setValue(numInfo.symbolCom1.value);
                
                textControl.setValue(alignInfo.textControl.value)
                textDirection.setValue(alignInfo.textDirection.value)
                escapelabel.setValue(alignInfo.escapelabel.checked)
                useCommaCheckBox.setValue(numInfo.useCommaCheckBox.checked);
                negativeCom.setValue(numInfo.negativeCom.value);
                dateSortCom.setValue(numInfo.dateSortCom.value);
                customCom.setValue(numInfo.customCom.value)
                numShowType.setValue(numInfo.numShowType.value);
                verticalSpace.setValue(alignInfo.verticalSpace.value)
                rotation.setValue(alignInfo.rotation.value)
                singleRotation.setValue(alignInfo.singleRotation.value)
                topPadding.setValue(alignInfo.topPadding.value)
                bottomPadding.setValue(alignInfo.bottomPadding.value)
                leftPadding.setValue(alignInfo.leftPadding.value)
                rightPadding.setValue(alignInfo.rightPadding.value)
            }
        }

        function changeDivs(pageNo) {
            if (pageNo == "myConventional") {
                closeAll();
                conventionalDiv.show()
            } else if (pageNo == "myText") {
                closeAll();
                textDiv.show()
            } else if (pageNo == "myNumber") {
                closeAll();
                numberDiv.show()
            } else if (pageNo == "mySpecial") {
                closeAll();
                specialDiv.show()
            } else if (pageNo == "myCurrency") {
                closeAll();
                currencyDiv.show()
            } else if (pageNo == "myCustomize") {
                closeAll();
                customizeDiv.show()
            } else if (pageNo == "myAccounting") {
                closeAll();
                accountingDiv.show()
            } else if (pageNo == "myDate") {
                closeAll();
                dateDiv.show()
            } else if (pageNo == "myTime") {
                closeAll();
                timeDiv.show()
            } else if (pageNo == "myPercentage") {
                closeAll();
                percentageDiv.show()
            } else if (pageNo == "mySciCounting") {
                closeAll();
                Sci_countingDiv.show()
            }
        }

        function allSortCom_selectChanged(sender, combo, record, index) {
            changeDivs(record.data.sort);
            // alert(allSortCom.getValue())
        }

        function closeAll() {
            conventionalDiv.hide();
            numberDiv.hide();
            currencyDiv.hide();
            accountingDiv.hide();
            dateDiv.hide();
            timeDiv.hide();
            percentageDiv.hide();
            Sci_countingDiv.hide();
            textDiv.hide();
            specialDiv.hide();
            customizeDiv.hide()
        }

        function div_click(sender, e) {
            if (parseFloat(xs.getValue()) < 0) {
                xs.setValue("-1")
                page.fireEvent('decimalChanged', xs, xs.value, "myNumber")
            } else {
                xs.setValue(parseFloat(xs.value) - 1)
                page.fireEvent('decimalChanged', xs, xs.value, "myNumber")
            }
            // alert(parseFloat(hwText.value) - 1)
        }

        function xs_afterrender(sender) {
            xs.setValue("0")
            //
        }

        function div1_click(sender, e) {
            xs.setValue(parseFloat(xs.value) + 1);
            page.fireEvent('decimalChanged', xs, xs.value, "myNumber")
        }

        function div2_click(sender, e) {
            if (parseFloat(xs1.getValue()) < 0) {
                xs1.setValue("-1")
                page.fireEvent('decimalChanged', xs1, xs1.value, "myCurrency")
            } else {
                xs1.setValue(parseFloat(xs1.value) - 1)
                page.fireEvent('decimalChanged', xs1, xs1.value, "myCurrency")
            }
        }

        function div3_click(sender, e) {
            xs1.setValue(parseFloat(xs1.value) + 1)
            page.fireEvent('decimalChanged', xs1, xs1.value, "myCurrency")
            //alert(xs1.getValue());
        }

        function xs1_afterrender(sender) {
            xs1.setValue("0")
            //
        }

        function xs2_afterrender(sender) {
            xs2.setValue("0")
            //
        }

        function div5_click(sender, e) {
            if (parseFloat(xs2.getValue()) < 0) {
                xs2.setValue("-1")
                page.fireEvent('decimalChanged', xs2, xs2.value, "myAccounting")
            } else {
                xs2.setValue(parseFloat(xs2.value) - 1)
                page.fireEvent('decimalChanged', xs2, xs2.value, "myAccounting")
            }
        }

        function div4_click(sender, e) {
            xs2.setValue(parseFloat(xs2.value) + 1)
            page.fireEvent('decimalChanged', xs2, xs2.value, "myAccounting")
        }

        function xs3_afterrender(sender) {
            xs3.setValue("0")
            //
        }

        function div6_click(sender, e) {
            if (parseFloat(xs3.getValue()) < 0) {
                xs3.setValue("-1")
                page.fireEvent('decimalChanged', xs3, xs3.value, "myPercentage")
            } else {
                xs3.setValue(parseFloat(xs3.value) - 1)
                page.fireEvent('decimalChanged', xs3, xs3.value, "myPercentage")
            }
        }

        function div7_click(sender, e) {
            xs3.setValue(parseFloat(xs3.value) + 1)
            page.fireEvent('decimalChanged', xs3, xs3.value, "myPercentage")
        }

        function xs4_afterrender(sender) {
            xs4.setValue("0")
            //
        }

        function div8_click(sender, e) {
            if (parseFloat(xs4.getValue()) < 0) {
                xs4.setValue("-1")
                page.fireEvent('decimalChanged', xs4, xs4.value, "mySciCounting")
            } else {
                xs4.setValue(parseFloat(xs4.value) - 1)
                page.fireEvent('decimalChanged', xs4, xs4.value, "mySciCounting")
            }
        }

        function div9_click(sender, e) {
            xs4.setValue(parseFloat(xs4.value) + 1)
            page.fireEvent('decimalChanged', xs4, xs4.value, "mySciCounting")
        }

        function button1_click(sender, e) {
            noZeroCheckBox.setValue()
        }

        function button2_click(sender, e) {
            alert(noZeroCheckBox.getValue())
        }

        function areaCom1_afterrender(sender) {
            areaCom1.store = store5;
            areaCom1.displayField = 'display';
            areaCom1.valueField = 'id'
        }

        function areaCom_afterrender(sender) {
            areaCom.store = store5;
            areaCom.displayField = 'display';
            areaCom.valueField = 'id'
        }

        function areaCom2_afterrender(sender) {
            areaCom2.store = store5;
            areaCom2.displayField = 'display';
            areaCom2.valueField = 'id'
        }

        function NewNumber_beforerender(sender) {}
        var numStore = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'describe']
        });
        var numdata = [{
            id: '0',
            img_dis: "/system/img/report/0.png",
            describe: '1  2  3'
        }, {
            id: '1',
            img_dis: "/system/img/report/1.png",
            describe: '(一)  (二)  (三)'
        }, {
            id: '2',
            img_dis: "/system/img/report/2.png",
            describe: '1.1  1.2  1.3'
        }, {
            id: '3',
            img_dis: "/system/img/report/3.png",
            describe: '1)  2)  3)'
        }, {
            id: '4',
            img_dis: "/system/img/report/4.png",
            describe: '一、  二、  三、'
        }, {
            id: '5',
            img_dis: "/system/img/report/5.png",
            describe: 'A.  B.  C.'
        }, {
            id: '6',
            img_dis: "/system/img/report/6.png",
            describe: 'a)  b)  c)'
        }, {
            id: '7',
            img_dis: "/system/img/report/7.png",
            describe: 'i.  ii.  iii.'
        }, {
            id: '8',
            img_dis: "/system/img/report/8.png",
            describe: '1.1.1  1.1.2  1.1.3'
        }];
        numStore.loadData(numdata);

        function numShowType_beforerender(sender) {
            numShowType.store = numStore;
            numShowType.displayField = 'describe';
            numShowType.valueField = 'id'
        }

        function numShowType_afterrender(sender) {
            var list = numShowType.getList();
            Ext.each(list.children, function(item, index) {
                var imgPath = numdata[index] && numdata[index].img_dis;
                if (!imgPath) return;
                item.firstChild.style.backgroundImage = "url(" + imgPath + ")";
                item.firstChild.style.backgroundRepeat = "no-repeat";
                item.firstChild.style.backgroundPosition = "left center";
                item.firstChild.style.paddingLeft = "26px";
            })
        }

        function setCellInfo(sender, value) {
            if (page.cell) {
                for (var i = 0; i < page.cell.length; i++) {
                    // sender.initialConfig.id
                    var r = page.cell[i].r;
                    var c = page.cell[i].c;
                    var temp = page.o.getCellMeta(r, c).cellAttributeInfo
                    temp.setCellInfos(sender.initialConfig.id, value)
                    page.o.setCellMeta(r, c, 'cellAttributeInfo', temp)
                }
            }
        }

        function conventionalDiv_click(sender, e) {}

        function hwRadio2_beforerender(sender) {}
        this.NewNumber_beforerender = NewNumber_beforerender;
        this.items = [{
                xtype: "vmd.comlist",
                id: "allSortCom",
                width: 250,
                height: 270,
                x: 20,
                y: 335,
                afterrender: "allSortCom_afterrender",
                style: "border: 1px solid #dddddd",
                selectChanged: "allSortCom_selectChanged",
                listeners: {
                    vmdafterrender: allSortCom_afterrender,
                    selectChanged: allSortCom_selectChanged
                }
            },
            {
                xtype: "vmd.div",
                id: "conventionalDiv",
                layoutConfig: {
                    align: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 290,
                x: 0,
                y: 365,
                layout: "vbox",
                hidden: true,
                click: "conventionalDiv_click",
                listeners: {
                    click: conventionalDiv_click
                },
                items: [{
                    xtype: "label",
                    id: "label",
                    text: "常规单元格格式不包含任何特定的数字格式",
                    width: 228,
                    height: 16
                }]
            },
            {
                xtype: "vmd.div",
                id: "numberDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 260,
                x: -1,
                y: 360,
                layout: "absolute",
                hidden: false,
                items: [{
                        xtype: "label",
                        id: "label1",
                        text: "小数位数：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "textfield",
                        id: "xs",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 40,
                        y: 35,
                        width: 180,
                        readOnly: true,
                        afterrender: "xs_afterrender",
                        listeners: {
                            vmdafterrender: xs_afterrender
                        }
                    },
                    {
                        xtype: "checkbox",
                        id: "noZeroCheckBox",
                        fieldLabel: "Checkbox",
                        boxLabel: "不显示零值",
                        x: 50,
                        y: 70,
                        width: 170,
                        hidden: false
                    },
                    {
                        xtype: "checkbox",
                        id: "useCommaCheckBox",
                        fieldLabel: "Checkbox",
                        boxLabel: "使用千分位分隔符（，）",
                        x: 50,
                        y: 95
                    },
                    {
                        xtype: "label",
                        id: "label2",
                        text: "负数：",
                        x: 10,
                        y: 125
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "negativeCom",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 145,
                        afterrender: "negativeCom_afterrender",
                        style: "border: 1px solid #dddddd",
                        listeners: {
                            vmdafterrender: negativeCom_afterrender
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 45,
                        cls: "btn",
                        click: "div_click",
                        html: "<img src=\"/system/img/report/border/下.png\" /><!--<background-image src=\"/system/img/report/border/下.png\" style=\"background-size:contain\"></background-image>-->",
                        listeners: {
                            click: div_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div1",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 35,
                        cls: "btn",
                        click: "div1_click",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        listeners: {
                            click: div1_click
                        }
                    },
                    {
                        xtype: "label",
                        id: "label13",
                        text: "展示样式：",
                        x: 10,
                        y: 190
                    },
                    {
                        xtype: "vmd.combo",
                        id: "numShowType",
                        width: 248,
                        x: 20,
                        y: 220,
                        afterrender: "numShowType_afterrender",
                        beforerender: "numShowType_beforerender",
                        listeners: {
                            vmdafterrender: numShowType_afterrender,
                            beforerender: numShowType_beforerender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "currencyDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: -2,
                y: 360,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "checkbox",
                        id: "noZeroCheckBox1",
                        fieldLabel: "Checkbox",
                        boxLabel: "不显示零值",
                        x: 50,
                        y: 65,
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "xs1",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 40,
                        y: 35,
                        width: 180,
                        afterrender: "xs1_afterrender",
                        listeners: {
                            vmdafterrender: xs1_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "label3",
                        text: "小数位数：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "label",
                        id: "label4",
                        text: "货币符号（国家/地区）：",
                        x: 10,
                        y: 95
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "symbolCom",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 120,
                        afterrender: "symbolCom_afterrender",
                        style: "border: 1px solid #dddddd",
                        listeners: {
                            vmdafterrender: symbolCom_afterrender
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 45,
                        click: "div2_click",
                        cls: "btn",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        listeners: {
                            click: div2_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div3",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 35,
                        height: 15,
                        x: 220,
                        y: 35,
                        click: "div3_click",
                        cls: "btn",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        listeners: {
                            click: div3_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "accountingDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 365,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "checkbox",
                        id: "noZeroCheckBox2",
                        fieldLabel: "Checkbox",
                        boxLabel: "不显示零值",
                        x: 50,
                        y: 65,
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "xs2",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 40,
                        y: 35,
                        afterrender: "xs2_afterrender",
                        hidden: false,
                        width: 180,
                        listeners: {
                            vmdafterrender: xs2_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "label5",
                        text: "货币符号（国家/地区）：",
                        x: 10,
                        y: 95
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "symbolCom1",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 120,
                        afterrender: "symbolCom1_afterrender",
                        style: "border: 1px solid #dddddd",
                        listeners: {
                            vmdafterrender: symbolCom1_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "label16",
                        text: "小数：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "vmd.div",
                        id: "div4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 35,
                        click: "div4_click",
                        cls: "btn",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        listeners: {
                            click: div4_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div5",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 45,
                        click: "div5_click",
                        cls: "btn",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        listeners: {
                            click: div5_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "dateDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 360,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label6",
                        text: "类型：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "dateSortCom",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 35,
                        style: "border: 1px solid #dddddd",
                        afterrender: "dateSortCom_afterrender",
                        listeners: {
                            vmdafterrender: dateSortCom_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "label7",
                        text: "区域设置（国家和地区）：",
                        x: 10,
                        y: 70
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "areaCom",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 95,
                        style: "border: 1px solid #dddddd",
                        afterrender: "areaCom_afterrender",
                        listeners: {
                            vmdafterrender: areaCom_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "timeDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 360,
                hidden: true,
                layout: "absolute",
                items: [{
                        xtype: "label",
                        id: "label9",
                        text: "区域设置（国家和地区）：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "areaCom1",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 35,
                        style: "border:1px solid #dddddd;",
                        afterrender: "areaCom1_afterrender",
                        listeners: {
                            vmdafterrender: areaCom1_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "percentageDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 360,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label8",
                        text: "小数点位数：",
                        x: 10,
                        y: 10,
                        height: 20
                    },
                    {
                        xtype: "textfield",
                        id: "xs3",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 40,
                        y: 35,
                        afterrender: "xs3_afterrender",
                        width: 180,
                        listeners: {
                            vmdafterrender: xs3_afterrender
                        }
                    },
                    {
                        xtype: "checkbox",
                        id: "noZeroCheckBox3",
                        fieldLabel: "Checkbox",
                        boxLabel: "不显示零值",
                        x: 40,
                        y: 65,
                        width: 170
                    },
                    {
                        xtype: "vmd.div",
                        id: "div6",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 45,
                        click: "div6_click",
                        cls: "btn",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        listeners: {
                            click: div6_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div7",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 35,
                        click: "div7_click",
                        cls: "btn",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        listeners: {
                            click: div7_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "Sci_countingDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 360,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label10",
                        text: "小数位数：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "textfield",
                        id: "xs4",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 40,
                        y: 35,
                        afterrender: "xs4_afterrender",
                        width: 180,
                        listeners: {
                            vmdafterrender: xs4_afterrender
                        }
                    },
                    {
                        xtype: "checkbox",
                        id: "noZeroCheckBox4",
                        fieldLabel: "Checkbox",
                        boxLabel: "不显示零值",
                        x: 40,
                        y: 65,
                        width: 170
                    },
                    {
                        xtype: "vmd.div",
                        id: "div8",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 45,
                        click: "div8_click",
                        html: "<img src=\"/system/img/report/border/下.png\" alt=\"减少\" />",
                        cls: "btn",
                        listeners: {
                            click: div8_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div9",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 220,
                        y: 35,
                        click: "div9_click",
                        html: "<!--/system/img/report/border/--><img src=\"/system/img/report/border/上.png\" alt=\"增加\" />",
                        cls: "btn",
                        listeners: {
                            click: div9_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "textDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 320,
                x: 0,
                y: 365,
                layout: "absolute",
                hidden: true,
                items: [{
                    xtype: "label",
                    id: "label11",
                    text: "在文本单元格格式中，数字作为文本处理。单元格显示的内容与输入的内容完全一致。",
                    x: 20,
                    y: 10,
                    width: 230
                }]
            },
            {
                xtype: "vmd.div",
                id: "specialDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 355,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "vmd.comlist",
                        id: "areaCom2",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 35,
                        style: "border: 1px solid #dddddd",
                        afterrender: "areaCom2_afterrender",
                        listeners: {
                            vmdafterrender: areaCom2_afterrender
                        }
                    },
                    {
                        xtype: "label",
                        id: "label12",
                        text: "区域设置（国家和地区）：",
                        x: 10,
                        y: 10
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "customizeDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 320,
                x: 0,
                y: 360,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label14",
                        text: "类型：",
                        x: 10,
                        y: 10
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "customCom",
                        width: 250,
                        height: 270,
                        x: 20,
                        y: 35,
                        afterrender: "customCom_afterrender",
                        style: "border: 1px solid #dddddd",
                        listeners: {
                            vmdafterrender: customCom_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "label",
                id: "label15",
                text: "数字分类：",
                x: 10,
                y: 310
            },
            {
                xtype: "label",
                id: "label17",
                text: "文本控制",
                x: 10,
                y: 10
            },
            {
                xtype: "label",
                id: "label18",
                text: "文本方向",
                x: 10,
                y: 70
            },
            {
                xtype: "label",
                id: "label19",
                text: "方向：",
                x: 33,
                y: 95
            },
            {
                xtype: "label",
                id: "label20",
                text: "旋转（度）：",
                x: 10,
                y: 135
            },
            {
                xtype: "textfield",
                id: "rotation",
                allowBlank: true,
                enableKeyEvents: true,
                x: 85,
                y: 130,
                width: 115
            },
            {
                xtype: "checkbox",
                id: "singleRotation",
                fieldLabel: "Checkbox",
                boxLabel: "单字旋转",
                x: 210,
                y: 130
            },
            {
                xtype: "label",
                id: "label21",
                text: "内部边距",
                x: 10,
                y: 160
            },
            {
                xtype: "label",
                id: "label22",
                text: "上：",
                x: 40,
                y: 190
            },
            {
                xtype: "textfield",
                id: "topPadding",
                allowBlank: true,
                enableKeyEvents: true,
                x: 65,
                y: 185,
                width: 70
            },
            {
                xtype: "label",
                id: "label23",
                text: "下：",
                x: 150,
                y: 190
            },
            {
                xtype: "textfield",
                id: "bottomPadding",
                allowBlank: true,
                enableKeyEvents: true,
                x: 175,
                y: 185,
                width: 70
            },
            {
                xtype: "label",
                id: "label24",
                text: "左：",
                x: 40,
                y: 225
            },
            {
                xtype: "label",
                id: "label25",
                text: "右：",
                x: 150,
                y: 225
            },
            {
                xtype: "textfield",
                id: "leftPadding",
                allowBlank: true,
                enableKeyEvents: true,
                x: 65,
                y: 220,
                width: 70
            },
            {
                xtype: "textfield",
                id: "rightPadding",
                allowBlank: true,
                enableKeyEvents: true,
                x: 175,
                y: 220,
                width: 70
            },
            {
                xtype: "label",
                id: "label26",
                text: "行间距",
                x: 10,
                y: 255
            },
            {
                xtype: "label",
                id: "label27",
                text: "行间距：",
                x: 30,
                y: 280
            },
            {
                xtype: "textfield",
                id: "verticalSpace",
                allowBlank: true,
                enableKeyEvents: true,
                x: 80,
                y: 275,
                width: 125
            },
            {
                xtype: "radiostoregroup",
                id: "textControl",
                width: 180,
                height: 30,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 10,
                y: 40,
                items: [{
                        xtype: "radio",
                        id: "hwRadio",
                        boxLabel: "宽度自适应",
                        checked: true,
                        inputValue: "0"
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio1",
                        boxLabel: "缩小字体填充",
                        inputValue: "1"
                    }
                ]
            },
            {
                xtype: "checkbox",
                id: "escapelabel",
                fieldLabel: "Checkbox",
                boxLabel: "转义标签",
                x: 205,
                y: 43
            },
            {
                xtype: "radiostoregroup",
                id: "textDirection",
                width: 200,
                height: 30,
                labelField: "label",
                valueField: "value",
                checkedField: "checked",
                boxFieldName: "myRadio",
                x: 75,
                y: 90,
                items: [{
                        xtype: "radio",
                        id: "hwRadio2",
                        boxLabel: "水平",
                        width: 63,
                        checked: true,
                        inputValue: "0",
                        beforerender: "hwRadio2_beforerender",
                        listeners: {
                            beforerender: hwRadio2_beforerender
                        }
                    },
                    {
                        xtype: "radio",
                        id: "hwRadio3",
                        boxLabel: "垂直",
                        inputValue: "1"
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, sheet, cell) {
            setInfo(info, sheet, cell)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.NewNumber");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NewNumber");
    }
})