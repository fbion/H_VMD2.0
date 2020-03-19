Ext.define('vmd.ux.visualEditor.Controller', {
    xtype: 'vmd.ux.visualEditor.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.VisualEditor", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ColorSelect$1.0$ColorSelect"]),
    version: "1.0",
    xtype: "vmd.ux.VisualEditor",
    title: "Panel",
    header: false,
    border: false,
    width: 845,
    height: 482,
    layout: "absolute",
    afterrender: "VisualEditor_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.VisualEditor_afterrender(this)
        }
    },
    uxCss: "/*字体*/@font-face {    font-family: \"iconfont\";    src: url('/modules/hw70e7c3c8/img/font/iconfont.eot?t=1512609895467');    /* IE9*/    src: url('/modules/hw70e7c3c8/img/font/iconfont.eot?t=1512609895467#iefix') format('embedded-opentype'),        /* IE6-IE8 */        url('/modules/hw70e7c3c8/img/font/iconfont.ttf?t=1512609895467') format('truetype'),        /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/        url('/modules/hw70e7c3c8/img/font/iconfont.svg?t=1512609895467#iconfont') format('svg');    /* iOS 4.1- */}.iconfont {    font-family: \"iconfont\" !important;    font-size: 18px;    font-style: normal;    -webkit-font-smoothing: antialiased;    -moz-osx-font-smoothing: grayscale;    color: #1868b8;    padding-right: 15px;}.icon-bangzhu:before {    content: \"\e616\";}.icon-tongzhi:before {    content: \"\e60e\";}.icon-yiban:before {    content: \"\e678\";}.icon-daiban:before {    content: \"\e67a\";}.ct {    border: 0px solid #e4e4e4;}.viewct {    border: 1px solid #e4e4e4;}.header {    background: #fff;}.header label {    font-weight: bold;}.header .title {    color: #1868b8;}.header .more {    color: #9e9e9e;    font-family: 'Microsoft YaHei', sans-serif}.daibanct {    /*border:1px solid blue;*/}.info {    display: -webkit-box;    /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */    display: -moz-box;    /* 老版本语法: Firefox (buggy) */    display: -ms-flexbox;    /* 混合版本语法: IE 10 */    display: -webkit-flex;    /* 新版本语法: Chrome 21+ */    display: flex;    /* 新版本语法: Opera 12.1, Firefox 22+ */    line-height: 31px;    margin: 0 10px;    position: relative;    border-bottom: 2px solid #eee;    padding-left: 10px;    /* background: url('/modules/hw70e7c3c8/img/dot.png') center left no-repeat;*/}.info .title {    /*min-width: 120px;*/    /*width: 360px;*/    text-overflow: ellipsis;    white-space: nowrap;    overflow: hidden;    padding-right: 5px;    -webkit-flex: 1;    /* Chrome */    -ms-flex: 1;    /* IE 10 */    flex: 1;}.info a {    text-decoration: none;    color: #333;}.info .rq {    /*position: absolute;*/    right: 0px;    top: 0;    color: #333;    font-size: 13px;    width: 140px}li.info-hover {    cursor: pointer}li.info-hover a {    color: #1868b8}.d-info {    padding: 8px 0;}.btbutton {    position: absolute;    right: 110px;    top: 2.5px}.btbutton1 {    position: absolute;    right: 20px;    top: 2.5px}.btbutton2 {    position: absolute;    right: 200px;    top: 2.5px}.button {    background-color: #1E90FF;    color: white}.header .more:hover {    color: #1868b8;}.ace_gutter-cell.ace_error {    background-image: none}",
    uxrequirejs: "[\"lib/ace/ace.js\",\"lib/ace/mode-base.js\",\"lib/ace/theme-xcode.js\",\"lib/ace/ext-language_tools.js\"]",
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
        // 
        //     if(expressionDisplay.getValue() != "") {
        //         for(i = 0; i < expressionDisplay.length; i++) {
        //             if(expressionDisplay[i] == "值") {
        //                 expressionDisplay[i].select;
        //             }
        //         }
        //     }
        var p = parent;
        needInfo = vmd.getUrlParam("color");
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['EnName', 'name']
        });
        var data = [{
            EnName: 'SimSun',
            name: '宋体'
        }, {
            EnName: 'SimHei',
            name: '黑体'
        }, {
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
        }, {
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
        }];
        store.loadData(data);
        ///////////////////////////////////////
        //font size 字号
        var store1 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['size', 'px']
        });
        var data1 = [{
                size: '6',
                px: '6'
            }, {
                size: '8',
                px: '8'
            }, {
                size: '9',
                px: '9'
            },
            {
                size: '10',
                px: '10'
            }, {
                size: '10.5',
                px: '10.5'
            }, {
                size: '11',
                px: '11'
            }, {
                size: '12',
                px: '12'
            },
            {
                size: '14',
                px: '14'
            }, {
                size: '15',
                px: '15'
            }, {
                size: '16',
                px: '16'
            }, {
                size: '18',
                px: '18'
            },
            {
                size: '20',
                px: '20'
            }, {
                size: '22',
                px: '22'
            }, {
                size: '24',
                px: '24'
            }, {
                size: '26',
                px: '26'
            }, {
                size: '28',
                px: '28'
            }, {
                size: '36',
                px: '36'
            }, {
                size: '48',
                px: '48'
            }, {
                size: '54',
                px: '54'
            }, {
                size: '72',
                px: '72'
            }
        ];
        store1.loadData(data1);
        ///////////////////////////////////////////////////////////////////
        var store2 = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['name', 'id', 'title']
        });
        var data2 = [{
            name: "求和",
            id: "cg1",
            title: "常规函数"
        }, {
            name: "条件求和",
            id: "cg2",
            title: "常规函数"
        }, {
            name: "统计",
            id: "cg3",
            title: "常规函数"
        }, {
            name: "条件统计",
            id: "cg4",
            title: "常规函数"
        }, {
            name: "不重复统计",
            id: "cg5",
            title: "常规函数"
        }, {
            name: "平均",
            id: "cg6",
            title: "常规函数"
        }, {
            name: "条件平均",
            id: "cg7",
            title: "常规函数"
        }, {
            name: "对比",
            id: "cg8",
            title: "常规函数"
        }, {
            name: "最大值",
            id: "cg9",
            title: "常规函数"
        }, {
            name: "最小值",
            id: "cg10",
            title: "常规函数"
        }, {
            name: "查找",
            id: "cg11",
            title: "常规函数"
        }, {
            name: "集合查询",
            id: "sjj0",
            title: "数据集函数"
        }, {
            name: "单值查询",
            id: "sjj1",
            title: "数据集函数"
        }, {
            name: "条件查询",
            id: "sjj2",
            title: "数据集函数"
        }, {
            name: "分组",
            id: "sjj3",
            title: "数据集函数"
        }, {
            name: "求和",
            id: "sjj4",
            title: "数据集函数"
        }, {
            name: "if",
            id: "tjbds0",
            title: "条件表达式"
        }, {
            name: "elseif",
            id: "tjbds1",
            title: "条件表达式"
        }, {
            name: "else",
            id: "tjbds2",
            title: "条件表达式"
        }, {
            name: "序号",
            id: "xh",
            title: "序号表达式"
        }];
        store2.loadData(data2);
        ///////////////////////////////////////////////////////////////////
        var page = this;

        function FunctionType_click(sender, index, node, e) {
            switch (index) {
                case 0:
                    closeFunction()
                    GeneralFunction.show();
                    page.activeFunction = GeneralFunction;
                    break;
                case 1:
                    closeFunction()
                    DataSetFunction.show();
                    page.activeFunction = DataSetFunction;
                    break;
                case 2:
                    closeFunction()
                    ConditionalExpression.show()
                    page.activeFunction = ConditionalExpression;
                    break;
                case 3:
                    closeFunction()
                    SerialNumberExpression.show()
                    page.activeFunction = SerialNumberExpression;
                    break;
            }
        }

        function closeFunction() {
            GeneralFunction.hide();
            DataSetFunction.hide();
            ConditionalExpression.hide();
            SerialNumberExpression.hide();
        }

        function GeneralFunction_click(sender, index, node, e) {
            switch (index) {
                case 0:
                    FunctionDescribe.setValue("Sum(A3{}):\n对单元格A3扩展出来的单元格进行求和,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 1:
                    FunctionDescribe.setValue("Sum(A3{@value>0}):\n对单元格A3扩展出来的单元格进行条件求和,条件可以是当前单元格值@value或者其他单元格值A3(单元格ID)或者数据集字段(ds1.字段名称),左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 2:
                    FunctionDescribe.setValue("Count(A3{}):\n对单元格A3扩展出来的单元格进行统计,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 3:
                    FunctionDescribe.setValue("Count(A3{@value>0}):\n对单元格A3扩展出来的单元格进行条件统计,条件可以是当前单元格值@value或者其他单元格值A3(单元格ID)或者数据集字段(ds1.字段名称),左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 4:
                    FunctionDescribe.setValue("DCount(A3{}):\n对单元格A3扩展出来的单元格进行统计不重复的个数,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 5:
                    FunctionDescribe.setValue("Avg(A3{}):\n对单元格A3扩展出来的单元格进行平均运算,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 6:
                    FunctionDescribe.setValue("Avg(A3{@value>0}):\n对单元格A3扩展出来的单元格进行条件平均值运算,条件可以是当前单元格值@value或者其他单元格值A3(单元格ID)或者数据集字段(ds1.字段名称),左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 7:
                    FunctionDescribe.setValue("compare(A2{},flag) \nflag   0:下面的值减上面的值，默认  1：上面的值减下面的值 2：上面的值除以下面的值 3：下面的值除以上面的值,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 8:
                    FunctionDescribe.setValue("Max(A3{}):\n对单元格A3扩展出来的单元格进行最大值运算,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 9:
                    FunctionDescribe.setValue("Min(A3{}):\n对单元格A3扩展出来的单元格进行最小值运算,左父上父的设置本着统计谁设置谁的原则，统计整体的可以不进行左父上父设置")
                    break;
                case 10:
                    FunctionDescribe.setValue("Find(A3{},\'管理区\'):\n在单元格A3扩展出来的单元格中进行查找运算，查找单元格中的值带有\'管理区\'的")
                    break;
            }
        }

        function closeFontAndColor() {
            FontDiv.hide();
            ColorDiv.hide();
            label_font.hide();
        }

        function VariableName_click(sender, index, node, e) {
            // 
            closeFontAndColor();
            switch (index) {
                case 8:
                    ColorDiv.show();
                    break;
                case 9:
                    ColorDiv.show();
                    break;
                case 10:
                    ColorDiv.show();
                    break;
                case 11:
                    ColorDiv.show();
                    break;
                case 12:
                    label_font.show();
                    FontDiv.show();
                    break;
                case 13:
                    label_font.show();
                    FontDiv.show();
                    break;
                case 14:
                    label_font.show();
                    FontDiv.show();
                    break;
                case 15:
                    label_font.show();
                    FontDiv.show();
                    break;
                case 16:
                    label_font.show();
                    FontDiv.show();
                    break;
            }
        }
        //输入：rgb(13,0,255)
        //输出：#0d00ff
        function colorRGB2Hex(color) {
            var rgb = color.split(',');
            var r = parseInt(rgb[0].split('(')[1]);
            var g = parseInt(rgb[1]);
            var b = parseInt(rgb[2].split(')')[0]);
            var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            return hex;
        }
        String.prototype.colorRgb = function() {
            var sColor = this.toLowerCase();
            //十六进制颜色值的正则表达式
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 如果是16进制颜色
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sColorNew = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for (var i = 1; i < 7; i += 2) {
                    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "[" + sColorChange.join(",") + ",0.6]";
            }
            return sColor;
        };

        function FontDiv_afterrender(sender) {
            VEfontSize.store = store1;
            VEfontSize.displayField = "size"
            VEfontSize.valueField = "px"
        }

        function fontFamily_afterrender(sender) {
            sender.store = store;
            sender.displayField = "name"
            sender.valueField = "EnName"
        }

        function fontSize_afterrender(sender) {}

        function DataSetFunction_click(sender, index, node, e) {
            switch (index) {
                case 0:
                    FunctionDescribe.setValue("ds1.Select(DYMC):\n对数据集ds1的字段DYMC进行集合查询操作,左父设置本着前一分组所在的单元格，没有分组的可以不设")
                    break;
                case 1:
                    FunctionDescribe.setValue("ds1.DYMC:\n取数据集ds1的字段DYMC的值，如果设置了左父，则返回当前左父条件下的值，没设置左父则返回首行对应字段的值")
                    break;
                case 2:
                    FunctionDescribe.setValue("ds1.select(cy,,dymc=A2):\n返回数据集ds1的字段dymc等于单元格A2值的字段cy的值")
                    break;
                case 3:
                    FunctionDescribe.setValue("ds1.Group(DYMC):\n对数据集ds1的字段DYMC进行分组查询操作,左父设置本着前一分组所在的单元格，没有分组的可以不设")
                    break;
                case 4:
                    FunctionDescribe.setValue("ds1.Sum(cy):")
                    break;
            }
        }

        function ConditionalExpression_click(sender, index, node, e) {
            FunctionDescribe.setValue("隔行变色：\n=if(@rowno%2==0){ RowBgClr=RGB(0,0,255)}else{RowBgClr=RGB(0,255,255)}")
        }

        function SerialNumberExpression_click(sender, index, node, e) {
            FunctionDescribe.setValue("&D2,flag\nD2对那一个单元格进行操作就写成那一个单元格，同时左父也要设置成该单元格\nflag:\n0: 序号位于第一列，报表中有小计或者合计项，不统计小计或者合计项（该示例属于这一种）；\n1：序号位于第一列，报表中有小计或者合计项，统计小计或者合计项；\n2：序号位于第一列，报表中没有小计或者合计项；\n3：或者不写，分组中的序号，统计该组；\n4：分组中的序号，统计整体（序号连续）；\n5：分片表中的序号，序号位于第一列，报表中有小计或者合计项，不统计小计或者合计项；\n6：分片表中的序号，序号位于第一列，报表中有小计或者合计项，统计小计或者合计项；\n7：分片表中的序号，序号位于第一列，报表中没有小计或者合计项；\n8：分片表中的序号，分组中的序号，统计整体（序号连续）")
        }

        function b0_click(sender, e) {
            expressionDisplay.insert("0")
        }

        function b7_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "7")
            expressionDisplay.insert("7")
        }

        function b1_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "1")
            expressionDisplay.insert("1")
        }

        function b4_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "4")
            expressionDisplay.insert("4")
        }

        function bDot_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + ".")
            expressionDisplay.insert(".")
        }

        function b2_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "2")
            expressionDisplay.insert("2")
        }

        function b5_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "5")
            expressionDisplay.insert("5")
        }

        function b8_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "8")
            expressionDisplay.insert("8")
        }

        function bSingleEqual_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "=值")
            expressionDisplay.insert("=值")
            expressionDisplay.find('值');
        }

        function b3_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "3")
            expressionDisplay.insert("3")
        }

        function b6_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "6")
            expressionDisplay.insert("6")
        }

        function b9_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "9")
            expressionDisplay.insert("9")
        }

        function bPlus_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "+")
            expressionDisplay.insert("+值")
            expressionDisplay.find('值');
        }

        function bMinus_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "-")
            expressionDisplay.insert("-值")
            expressionDisplay.find('值');
        }

        function bAsterisk_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "*")
            expressionDisplay.insert("*值")
            expressionDisplay.find('值');
        }

        function bSeparator_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "/")
            expressionDisplay.insert("/值")
            expressionDisplay.find('值');
        }

        function bLessThanOrEqual_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "<=")
            expressionDisplay.insert("<=值")
            expressionDisplay.find('值');
        }

        function bLessThan_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "<")
            expressionDisplay.insert("<值")
            expressionDisplay.find('值');
        }

        function bGreaterThanOrEqualTo_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + ">=")
            expressionDisplay.insert(">=值")
            expressionDisplay.find('值');
        }

        function bGreaterThan_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + ">")
            expressionDisplay.insert(">值")
            expressionDisplay.find('值');
        }

        function bOr_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "||")
            expressionDisplay.insert("||值")
            expressionDisplay.find('值');
        }

        function bDoubleAnd_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "&&")
            expressionDisplay.insert("&&值")
            expressionDisplay.find('值');
        }

        function bNotEqual_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "!=")
            expressionDisplay.insert("!=值")
            expressionDisplay.find('值');
        }

        function bDoubleEqual_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "==")
            expressionDisplay.insert("==值")
            expressionDisplay.find('值');
        }

        function bDoubleQuotes_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "\"\"")
            var string = "\"" + "值" + "\""
            expressionDisplay.insert(string)
            expressionDisplay.find('值');
        }

        function bLeftMidParentheses_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "[]")
            expressionDisplay.insert("[值]")
            expressionDisplay.find('值');
        }

        function bLeftBigParentheses_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "{}")
            expressionDisplay.insert("{值}")
            expressionDisplay.find('值');
        }

        function bLeftParentheses_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "()")
            expressionDisplay.insert("(值)")
            expressionDisplay.find('值');
        }

        function bQuotes_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "\'\'")
            expressionDisplay.insert("\'值\'")
            expressionDisplay.find('值');
        }

        function bRightMidParentheses_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "]")
            expressionDisplay.insert("]")
            // expressionDisplay.find('值');
        }

        function bRightBigParentheses_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "}")
            expressionDisplay.insert("}")
            // expressionDisplay.find('值');
        }

        function bRightParentheses_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + ")")
            expressionDisplay.insert(")")
            // expressionDisplay.find('值');
        }

        function bAt_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "@")
            expressionDisplay.insert("@值")
            expressionDisplay.find('值');
        }

        function bHashtag_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "#")
            expressionDisplay.insert("#值")
            expressionDisplay.find('值');
        }

        function bCaret_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "^")
            expressionDisplay.insert("^值")
            expressionDisplay.find('值');
        }

        function bComma_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + ",")
            expressionDisplay.insert(",")
            expressionDisplay.find('值');
        }

        function bQuestionMark_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "?")
            expressionDisplay.insert("?值")
            expressionDisplay.find('值');
        }

        function bAnd_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "&")
            expressionDisplay.insert("&值")
            expressionDisplay.find('值');
        }

        function bUnderLine_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "_")
            expressionDisplay.insert("_值")
            expressionDisplay.find('值');
        }

        function bColon_click(sender, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + ":")
            expressionDisplay.insert(":值")
            expressionDisplay.find('值');
        }

        function FunctionSearch_afterrender(sender) {}

        function FunctionSearch_beforerender(sender) {
            FunctionSearch.store = store2;
            FunctionSearch.displayField = "name";
            FunctionSearch.valueField = "id";
            FunctionSearch.dropDownFields = "title,name"
        }

        function GeneralFunction_dblclick(sender, index, node, e) {
            switch (index) {
                case 0:
                    expressionDisplay.insert("=Sum(单元格{})")
                    expressionDisplay.find("单元格")
                    break;
                case 1:
                    expressionDisplay.insert("=Sum(单元格{@value>0})")
                    expressionDisplay.find("单元格")
                    Ext.defer(function() {
                        // expressionDisplay.replace('单元格');
                        expressionDisplay.find('value');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
                case 2:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Count(单元格{})")
                    expressionDisplay.find("单元格")
                    break;
                case 3:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Count(单元格{@value>0})")
                    expressionDisplay.find("单元格")
                    Ext.defer(function() {
                        // expressionDisplay.replace('单元格');
                        expressionDisplay.find('value');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
                case 4:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=DCount(单元格{})")
                    expressionDisplay.find("单元格")
                    break;
                case 5:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Avg(单元格{})")
                    expressionDisplay.find("单元格")
                    break;
                case 6:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Avg(单元格{@value>0})")
                    expressionDisplay.find("单元格")
                    Ext.defer(function() {
                        // expressionDisplay.replace('单元格');
                        expressionDisplay.find('value');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
                case 7:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Compare(单元格{},0)")
                    expressionDisplay.find("单元格")
                    break;
                case 8:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Max(单元格{})")
                    expressionDisplay.find("单元格")
                    break;
                case 9:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Min(单元格{})")
                    expressionDisplay.find("单元格")
                    break;
                case 10:
                    expressionDisplay.setValue(expressionDisplay.getValue() + "=Find(单元格{},值)")
                    expressionDisplay.find("单元格")
                    Ext.defer(function() {
                        expressionDisplay.find('值');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
            }
        }

        function FunctionSearch_selectChanged(sender, combo, record, index) {
            // 
            //mafei 20181011
            var type_index = FunctionType.store.find('expression', record.get('title'));
            FunctionType.select(type_index);
            var node = FunctionType.getNode(type_index);
            node && node.click();
            if (page.activeFunction) {
                var fuc_index = page.activeFunction.store.find('expression', record.get('name'));
                page.activeFunction.select(fuc_index);
                node = page.activeFunction.getNode(fuc_index);
                node && node.click();
            }
            // closeFunction()
            // switch (index) {
            //     case 0:
            //         //  GeneralFunction.show()
            //         // alert(GeneralFunction)
            //         break;
            // }
        }

        function DataSetFunction_dblclick(sender, index, node, e) {
            switch (index) {
                case 0:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "=数据集名称.select(字段名称)")
                    expressionDisplay.insert("=数据集名称.select(字段名称)")
                    expressionDisplay.find('数据集名称')
                    Ext.defer(function() {
                        expressionDisplay.find('字段名称');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
                case 1:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "=数据集名称.字段名称")
                    expressionDisplay.insert("=数据集名称.字段名称")
                    expressionDisplay.find('数据集名称')
                    Ext.defer(function() {
                        expressionDisplay.find('字段名称');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
                case 2:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "=数据集名称.select(字段名称,,字段名称==单元格)")
                    expressionDisplay.insert("=数据集名称.select(字段名称,,字段名称==单元格)")
                    expressionDisplay.find('数据集名称')
                    Ext.defer(function() {
                        expressionDisplay.find('字段名称');
                        expressionDisplay.focus()
                        Ext.defer(function() {
                            expressionDisplay.find('字段名称');
                            expressionDisplay.focus()
                            Ext.defer(function() {
                                expressionDisplay.find('单元格');
                                expressionDisplay.focus()
                            }, 1000)
                        }, 1000)
                    }, 1000)
                    break;
                case 3:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "=数据集名称.group(字段名称)")
                    expressionDisplay.insert("=数据集名称.group(字段名称)")
                    expressionDisplay.find('数据集名称')
                    Ext.defer(function() {
                        expressionDisplay.find('字段名称');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
                case 4:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "=数据集名称.Sum(字段名称)")
                    expressionDisplay.insert("=数据集名称.Sum(字段名称)")
                    expressionDisplay.find('数据集名称')
                    Ext.defer(function() {
                        expressionDisplay.find('字段名称');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
            }
        }

        function ConditionalExpression_dblclick(sender, index, node, e) {
            switch (index) {
                case 0:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "==if(@value>0){变量=值}")
                    expressionDisplay.insert("==if(@value>0){变量=值}")
                    expressionDisplay.find('value')
                    Ext.defer(function() {
                        expressionDisplay.find('变量');
                        expressionDisplay.focus()
                        Ext.defer(function() {
                            expressionDisplay.find('值');
                            expressionDisplay.focus()
                        }, 1000)
                    }, 1000)
                    break;
                case 1:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "elseif(@value<0){变量=值}")
                    expressionDisplay.insert("elseif(@value<0){变量=值}")
                    expressionDisplay.find('value')
                    Ext.defer(function() {
                        expressionDisplay.find('变量');
                        expressionDisplay.focus()
                        Ext.defer(function() {
                            expressionDisplay.find('值');
                            expressionDisplay.focus()
                        }, 1000)
                    }, 1000)
                    break;
                case 2:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "else{变量=值}")
                    expressionDisplay.insert("==if(@value>0){变量=值}")
                    expressionDisplay.find('变量')
                    Ext.defer(function() {
                        expressionDisplay.find('值');
                        expressionDisplay.focus()
                    }, 1000)
                    break;
            }
        }

        function SerialNumberExpression_dblclick(sender, index, node, e) {
            // expressionDisplay.setValue(expressionDisplay.getValue() + "&D2,3")
            expressionDisplay.insert("&D2,3")
            expressionDisplay.find("D2")
        }

        function VariableName_dblclick(sender, index, node, e) {
            switch (index) {
                case 0:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "单元格")
                    expressionDisplay.insert("单元格")
                    expressionDisplay.find("单元格")
                    break;
                case 1:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "@value")
                    expressionDisplay.insert("@value")
                    expressionDisplay.find("value")
                    break;
                case 2:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "数据集名称")
                    expressionDisplay.insert("数据集名称")
                    expressionDisplay.find("数据集名称")
                    break;
                case 3:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "字段名称")
                    expressionDisplay.insert("字段名称")
                    expressionDisplay.find("字段名称")
                    break;
                case 4:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "字段名称1")
                    expressionDisplay.insert("字段名称1")
                    expressionDisplay.find("字段名称1")
                    break;
                case 5:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "变量")
                    expressionDisplay.insert("变量")
                    expressionDisplay.find("变量")
                    break;
                case 6:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "值")
                    expressionDisplay.insert("值")
                    expressionDisplay.find("值")
                    break;
                case 7:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "@rowno")
                    expressionDisplay.insert("@rowno")
                    expressionDisplay.find("rowno")
                    break;
                case 8:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "CellBgClr=颜色")
                    expressionDisplay.insert("CellBgClr=颜色")
                    expressionDisplay.find("颜色")
                    break;
                case 9:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "FontClr=颜色")
                    expressionDisplay.insert("FontClr=颜色")
                    expressionDisplay.find("颜色")
                    break;
                case 10:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "RowBgClr=颜色")
                    expressionDisplay.insert("RowBgClr=颜色")
                    expressionDisplay.find("颜色")
                    break;
                case 11:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "ColBgClr=颜色")
                    expressionDisplay.insert("ColBgClr=颜色")
                    expressionDisplay.find("颜色")
                    break;
                case 12:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "FontSize=(大小)")
                    expressionDisplay.insert("FontSize=(大小)")
                    expressionDisplay.find("大小")
                    break;
                case 13:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "FontBold=(是否加粗)")
                    expressionDisplay.insert("FontBold=(是否加粗)")
                    expressionDisplay.find("是否加粗")
                    break;
                case 14:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "RowFontBold=(是否加粗)")
                    expressionDisplay.insert("RowFontBold=(是否加粗)")
                    expressionDisplay.find("是否加粗")
                    break;
                case 15:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "FontItalic=(是否斜体)")
                    expressionDisplay.insert("FontItalic=(是否斜体)")
                    expressionDisplay.find("是否斜体")
                    break;
                case 16:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "FontUnderLine=(是否下划线)")
                    expressionDisplay.insert("FontUnderLine=(是否下划线)")
                    expressionDisplay.find("是否下划线")
                    break;
                case 17:
                    // expressionDisplay.setValue(expressionDisplay.getValue() + "LeftMargin=值")
                    expressionDisplay.insert("LeftMargin=值")
                    expressionDisplay.find("值")
                    break;
            }
        }

        function setInfo(info, cell) {
            pinfo = info;
            pcell = cell;
            if (info) {
                VEBold.checked = info.VEBold.checked;
                VETilt.checked = info.VETilt.checked;
                VEUnderline.checked = info.VEUnderline.checked
                KeepFormula.checked = info.KeepFormula.checked
                FunctionSearch.value.setValue(info.FunctionSearch.value)
                VEColorSelect.value.setValue(info.VEColorSelect.value)
                RGBr.value.setValue(info.RGBr.value)
                RGBg.value.setValue(info.RGBg.value)
                RGBb.value.setValue(info.RGBb.value)
                FunctionDescribe.setValue(info.FunctionDescribe.value)
                VEfontFamily.setValue(info.VEfontFamily.value)
                VEfontSize.setValue(info.VEfontSize.value)
                // expressionDisplay.setValue(info.expressionDisplay.value)
                // 
                var a = info.expressionDisplay.value;
                if (a != undefined) {
                    a.trim()
                }
                if (a == " " || a == '&nbsp' || a == " ") {
                    a = ''
                }
                expressionDisplay.setValue(a)
                // if(a == " " || a == " ") {
                //     expressionDisplay.setValue('')
                // }
                // a.trim();
                // expressionDisplay.insert(a)
            }
        }

        function MyAce_afterrender(sender) {
            sender.toolbar.hide() //隐藏工具栏
            sender.setOption("wrap", "free") //自动换行
        }

        function VisualEditor_afterrender(sender) {
            // 
            if (needInfo == "true") {
                ColorDiv.show()
            } else {
                ColorDiv.hide()
            }
            // alert(parent.params)
            var a = (parent && parent.expWin && parent.expWin.params && parent.expWin.params.expression) || '';
            if (a != undefined) {
                a.trim()
            }
            if (a == " " || a == '&nbsp' || a == " ") {
                a = ''
            }
            if (expressionDisplay.getValue() == " " || expressionDisplay.getValue() == " ") {
                expressionDisplay.setValue('')
            }
            // a.trim();
            expressionDisplay.insert(a)
        }

        function VEColorSelect_colorchange(sender, selColor) {
            // 
            // alert(selColor.colorRgb());
            // var R_G_B = selColor.colorRgb.split(",");
            // alert(R_G_B)
            var R_G_B = selColor.colorRgb();
            var rgb = R_G_B.split(',');
            var r = rgb[0].substring(1);
            var g = rgb[1];
            var b = rgb[2];
            RGBr.setValue(r);
            RGBb.setValue(b);
            RGBg.setValue(g);
            var exRGB = "RGB(" + r + "," + g + "," + b + ")";
            expressionDisplay.insert(exRGB)
        }

        function determine_click(sender, e) {
            // 
            var exp = expressionDisplay.getValue().trim();
            parent.BtnOk(exp);
            parent.expWin.hide()
        }

        function cancel_click(sender, e) {
            //直接关闭窗口
            parent.expWin.hide()
        }
        this.VisualEditor_afterrender = VisualEditor_afterrender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "表达式：",
                x: 10,
                y: 10
            },
            {
                xtype: "vmd.button",
                id: "bSeparator",
                text: "/",
                type: "(none)",
                size: "small",
                x: 435,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bSeparator_click",
                listeners: {
                    click: bSeparator_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bGreaterThan",
                text: ">",
                type: "(none)",
                size: "small",
                x: 470,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bGreaterThan_click",
                listeners: {
                    click: bGreaterThan_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bDoubleEqual",
                text: "==",
                type: "(none)",
                size: "small",
                x: 505,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bDoubleEqual_click",
                listeners: {
                    click: bDoubleEqual_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bLeftParentheses",
                text: "(",
                type: "(none)",
                size: "small",
                x: 540,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bLeftParentheses_click",
                listeners: {
                    click: bLeftParentheses_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bRightParentheses",
                text: ")",
                type: "(none)",
                size: "small",
                x: 575,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bRightParentheses_click",
                listeners: {
                    click: bRightParentheses_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bComma",
                text: ",",
                type: "(none)",
                size: "small",
                x: 610,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bComma_click",
                listeners: {
                    click: bComma_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bColon",
                text: ":",
                type: "(none)",
                size: "small",
                x: 645,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bColon_click",
                listeners: {
                    click: bColon_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b1",
                text: "1",
                type: "(none)",
                size: "small",
                x: 330,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b1_click",
                listeners: {
                    click: b1_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b2",
                text: "2",
                type: "(none)",
                size: "small",
                x: 365,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b2_click",
                listeners: {
                    click: b2_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b3",
                text: "3",
                type: "(none)",
                size: "small",
                x: 400,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b3_click",
                listeners: {
                    click: b3_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b4",
                text: "4",
                type: "(none)",
                size: "small",
                x: 330,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b4_click",
                listeners: {
                    click: b4_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b5",
                text: "5",
                type: "(none)",
                size: "small",
                x: 365,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b5_click",
                listeners: {
                    click: b5_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b6",
                text: "6",
                type: "(none)",
                size: "small",
                x: 400,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b6_click",
                listeners: {
                    click: b6_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b7",
                text: "7",
                type: "(none)",
                size: "small",
                x: 330,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b7_click",
                listeners: {
                    click: b7_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b8",
                text: "8",
                type: "(none)",
                size: "small",
                x: 365,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b8_click",
                listeners: {
                    click: b8_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b9",
                text: "9",
                type: "(none)",
                size: "small",
                x: 400,
                y: 30,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b9_click",
                listeners: {
                    click: b9_click
                }
            },
            {
                xtype: "vmd.button",
                id: "b0",
                text: "0",
                type: "(none)",
                size: "small",
                x: 330,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "b0_click",
                listeners: {
                    click: b0_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bDot",
                text: ".",
                type: "(none)",
                size: "small",
                x: 365,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bDot_click",
                listeners: {
                    click: bDot_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bSingleEqual",
                text: "=",
                type: "(none)",
                size: "small",
                x: 400,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bSingleEqual_click",
                listeners: {
                    click: bSingleEqual_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bGreaterThanOrEqualTo",
                text: ">=",
                type: "(none)",
                size: "small",
                x: 470,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bGreaterThanOrEqualTo_click",
                listeners: {
                    click: bGreaterThanOrEqualTo_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bMinus",
                text: "-",
                type: "(none)",
                size: "small",
                x: 435,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bMinus_click",
                listeners: {
                    click: bMinus_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bPlus",
                text: "+",
                type: "(none)",
                size: "small",
                x: 435,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bPlus_click",
                listeners: {
                    click: bPlus_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bAsterisk",
                text: "*",
                type: "(none)",
                size: "small",
                x: 435,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bAsterisk_click",
                listeners: {
                    click: bAsterisk_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bNotEqual",
                text: "!=",
                type: "(none)",
                size: "small",
                x: 505,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bNotEqual_click",
                listeners: {
                    click: bNotEqual_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bLeftBigParentheses",
                text: "{",
                type: "(none)",
                size: "small",
                x: 540,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bLeftBigParentheses_click",
                listeners: {
                    click: bLeftBigParentheses_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bRightBigParentheses",
                text: "}",
                type: "(none)",
                size: "small",
                x: 575,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bRightBigParentheses_click",
                listeners: {
                    click: bRightBigParentheses_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bCaret",
                text: "^",
                type: "(none)",
                size: "small",
                x: 610,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bCaret_click",
                listeners: {
                    click: bCaret_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bUnderLine",
                text: "_",
                type: "(none)",
                size: "small",
                x: 645,
                y: 55,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bUnderLine_click",
                listeners: {
                    click: bUnderLine_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bLessThan",
                text: "<",
                type: "(none)",
                size: "small",
                x: 470,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bLessThan_click",
                listeners: {
                    click: bLessThan_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bDoubleAnd",
                text: "&&",
                type: "(none)",
                size: "small",
                x: 505,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bDoubleAnd_click",
                listeners: {
                    click: bDoubleAnd_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bLeftMidParentheses",
                text: "[",
                type: "(none)",
                size: "small",
                x: 540,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bLeftMidParentheses_click",
                listeners: {
                    click: bLeftMidParentheses_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bRightMidParentheses",
                text: "]",
                type: "(none)",
                size: "small",
                x: 575,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bRightMidParentheses_click",
                listeners: {
                    click: bRightMidParentheses_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bHashtag",
                text: "#",
                type: "(none)",
                size: "small",
                x: 610,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bHashtag_click",
                listeners: {
                    click: bHashtag_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bAnd",
                text: "&",
                type: "(none)",
                size: "small",
                x: 645,
                y: 80,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bAnd_click",
                listeners: {
                    click: bAnd_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bLessThanOrEqual",
                text: "<=",
                type: "(none)",
                size: "small",
                x: 470,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bLessThanOrEqual_click",
                listeners: {
                    click: bLessThanOrEqual_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bOr",
                text: "||",
                type: "(none)",
                size: "small",
                x: 505,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0",
                click: "bOr_click",
                listeners: {
                    click: bOr_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bDoubleQuotes",
                text: "\"",
                type: "(none)",
                size: "small",
                x: 540,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bDoubleQuotes_click",
                listeners: {
                    click: bDoubleQuotes_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bQuotes",
                text: "'",
                type: "(none)",
                size: "small",
                x: 575,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bQuotes_click",
                listeners: {
                    click: bQuotes_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bAt",
                text: "@",
                type: "(none)",
                size: "small",
                x: 610,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bAt_click",
                listeners: {
                    click: bAt_click
                }
            },
            {
                xtype: "vmd.button",
                id: "bQuestionMark",
                text: "?",
                type: "(none)",
                size: "small",
                x: 645,
                y: 105,
                width: 30,
                height: 20,
                style: "padding: 0 0 0.5px 0;    color:red;",
                click: "bQuestionMark_click",
                listeners: {
                    click: bQuestionMark_click
                }
            },
            {
                xtype: "label",
                id: "label1",
                text: "函数查询：",
                x: 10,
                y: 165
            },
            {
                xtype: "vmd.comlist",
                id: "FunctionSearch",
                width: 250,
                height: 270,
                x: 70,
                y: 160,
                query: true,
                afterrender: "FunctionSearch_afterrender",
                beforerender: "FunctionSearch_beforerender",
                selectChanged: "FunctionSearch_selectChanged",
                listeners: {
                    vmdafterrender: FunctionSearch_afterrender,
                    beforerender: FunctionSearch_beforerender,
                    selectChanged: FunctionSearch_selectChanged
                }
            },
            {
                xtype: "label",
                id: "label2",
                text: "表达式类型：",
                x: 10,
                y: 190
            },
            {
                xtype: "vmd.dataview",
                id: "FunctionType",
                width: 100,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [{    id: \"1\",    expression: \"常规函数\"}, {    id: \"2\",    expression: \"数据集函数\"}, {    id: \"3\",    expression: \"条件表达式\"}, {    id: \"4\",    expression: \"序号表达式\"}];return data;",
                x: 10,
                y: 210,
                style: "border: 1px solid #dddddd",
                click: "FunctionType_click",
                listeners: {
                    click: FunctionType_click
                }
            },
            {
                xtype: "label",
                id: "label3",
                text: "函数名：",
                x: 115,
                y: 190
            },
            {
                xtype: "vmd.dataview",
                id: "VariableName",
                width: 130,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [{    id: \"1\",    expression: \"单元格\"}, {    id: \"2\",    expression: \"当前单元格值\"}, {    id: \"3\",    expression: \"数据集名称\"}, {    id: \"4\",    expression: \"字段名称\"}, {    id: \"5\",    expression: \"字段名称1\"}, {    id: \"6\",    expression: \"变量\"}, {    id: \"7\",    expression: \"值\"}, {    id: \"8\",    expression: \"行号\"}, {    id: \"9\",    expression: \"背景色\"}, {    id: \"10\",    expression: \"前景色\"}, {    id: \"11\",    expression: \"行背景色\"}, {    id: \"12\",    expression: \"列背景色\"}, {    id: \"13\",    expression: \"字体大小\"}, {    id: \"14\",    expression: \"字体加粗\"}, {    id: \"15\",    expression: \"行字体加粗\"}, {    id: \"16\",    expression: \"字体斜体\"}, {    id: \"17\",    expression: \"字体下划线\"}, {    id: \"18\",    expression: \"左缩进\"}];return data;",
                x: 240,
                y: 210,
                style: "border: 1px solid #dddddd",
                click: "VariableName_click",
                dblclick: "VariableName_dblclick",
                listeners: {
                    click: VariableName_click,
                    dblclick: VariableName_dblclick
                }
            },
            {
                xtype: "label",
                id: "label4",
                text: "变量名：",
                x: 240,
                y: 190
            },
            {
                xtype: "label",
                id: "label5",
                text: "数据集字段：",
                x: 375,
                y: 190
            },
            {
                xtype: "vmd.dataview",
                id: "DataSetField",
                width: 140,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [];return data;",
                x: 375,
                y: 210,
                style: "border: 1px solid #dddddd"
            },
            {
                xtype: "vmd.div",
                id: "ColorDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 170,
                height: 170,
                x: 520,
                y: 190,
                layout: "absolute",
                hidden: false,
                items: [{
                        xtype: "label",
                        id: "label6",
                        text: "颜色：",
                        x: 0,
                        y: 0
                    },
                    {
                        xtype: "label",
                        id: "label7",
                        text: "R：",
                        x: 0,
                        y: 63
                    },
                    {
                        xtype: "label",
                        id: "label8",
                        text: "G：",
                        x: 0,
                        y: 103
                    },
                    {
                        xtype: "label",
                        id: "label9",
                        text: "B：",
                        x: 0,
                        y: 143
                    },
                    {
                        xtype: "numberfield",
                        id: "RGBr",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 20,
                        y: 60,
                        width: 130,
                        style: "border: 1px solid #dddddd",
                        readOnly: true
                    },
                    {
                        xtype: "numberfield",
                        id: "RGBg",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 20,
                        y: 100,
                        width: 130,
                        style: "border: 1px solid #dddddd",
                        readOnly: true
                    },
                    {
                        xtype: "numberfield",
                        id: "RGBb",
                        allowDecimals: true,
                        allowNegative: true,
                        decimalPrecision: 2,
                        allowBlank: true,
                        x: 20,
                        y: 140,
                        width: 130,
                        style: "border: 1px solid #dddddd",
                        readOnly: true
                    },
                    {
                        xtype: "vmd.ux.ColorSelect",
                        id: "VEColorSelect",
                        layout: "fit",
                        x: 0,
                        y: 20,
                        colorchange: "VEColorSelect_colorchange",
                        listeners: {
                            colorchange: VEColorSelect_colorchange
                        }
                    }
                ]
            },
            {
                xtype: "label",
                id: "label_font",
                text: "字体：",
                x: 525,
                y: 190,
                hidden: true
            },
            {
                xtype: "vmd.div",
                id: "FontDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 145,
                height: 155,
                x: 520,
                y: 205,
                layout: "absolute",
                hidden: true,
                afterrender: "FontDiv_afterrender",
                listeners: {
                    vmdafterrender: FontDiv_afterrender
                },
                items: [{
                        xtype: "checkbox",
                        id: "VEBold",
                        fieldLabel: "Checkbox",
                        boxLabel: "粗体",
                        x: 5,
                        y: 75
                    },
                    {
                        xtype: "checkbox",
                        id: "VETilt",
                        fieldLabel: "Checkbox",
                        boxLabel: "斜体",
                        x: 5,
                        y: 102.5
                    },
                    {
                        xtype: "checkbox",
                        id: "VEUnderline",
                        fieldLabel: "Checkbox",
                        boxLabel: "下划线",
                        x: 5,
                        y: 130
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "VEfontFamily",
                        width: 130,
                        height: 270,
                        x: 5,
                        y: 10,
                        afterrender: "fontFamily_afterrender",
                        style: "border: 1px solid #dddddd",
                        listeners: {
                            vmdafterrender: fontFamily_afterrender
                        }
                    },
                    {
                        xtype: "vmd.comlist",
                        id: "VEfontSize",
                        width: 130,
                        height: 270,
                        x: 5,
                        y: 45,
                        afterrender: "fontSize_afterrender",
                        style: "border: 1px solid #dddddd",
                        listeners: {
                            vmdafterrender: fontSize_afterrender
                        }
                    }
                ]
            },
            {
                xtype: "checkbox",
                id: "KeepFormula",
                fieldLabel: "Checkbox",
                boxLabel: "填报/分析时，保留公式用于计算",
                x: 330,
                y: 160
            },
            {
                xtype: "textarea",
                id: "FunctionDescribe",
                allowBlank: true,
                x: 10,
                y: 390,
                width: 550,
                height: 80,
                readOnly: true
            },
            {
                xtype: "label",
                id: "label11",
                text: "公式说明：",
                x: 10,
                y: 370
            },
            {
                xtype: "vmd.button",
                id: "determine",
                text: "确定",
                type: "(none)",
                size: "small",
                x: 600,
                y: 390,
                width: 80,
                click: "determine_click",
                listeners: {
                    click: determine_click
                }
            },
            {
                xtype: "vmd.button",
                id: "cancel",
                text: "取消",
                type: "(none)",
                size: "small",
                x: 600,
                y: 430,
                width: 80,
                click: "cancel_click",
                listeners: {
                    click: cancel_click
                }
            },
            {
                xtype: "vmd.dataview",
                id: "GeneralFunction",
                width: 120,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [{    id: \"1\",    expression: \"求和\"}, {    id: \"2\",    expression: \"条件求和\"}, {    id: \"3\",    expression: \"统计\"}, {    id: \"4\",    expression: \"条件统计\"}, {    id: \"5\",    expression: \"不重复统计\"}, {    id: \"6\",    expression: \"平均\"}, {    id: \"7\",    expression: \"条件平均\"}, {    id: \"8\",    expression: \"对比\"}, {    id: \"9\",    expression: \"最大值\"}, {    id: \"10\",    expression: \"最小值\"}, {    id: \"11\",    expression: \"查找\"}];return data;",
                x: 115,
                y: 210,
                style: "border: 1px solid #dddddd",
                hidden: false,
                click: "GeneralFunction_click",
                dblclick: "GeneralFunction_dblclick",
                listeners: {
                    click: GeneralFunction_click,
                    dblclick: GeneralFunction_dblclick
                }
            },
            {
                xtype: "vmd.dataview",
                id: "DataSetFunction",
                width: 120,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [{    id: \"1\",    expression: \"集合查询\"}, {    id: \"2\",    expression: \"单值查询\"}, {    id: \"3\",    expression: \"条件查询\"}, {    id: \"4\",    expression: \"分组\"}, {    id: \"5\",    expression: \"求和\"}];return data;",
                x: 115,
                y: 210,
                style: "border: 1px solid #dddddd",
                hidden: true,
                click: "DataSetFunction_click",
                dblclick: "DataSetFunction_dblclick",
                listeners: {
                    click: DataSetFunction_click,
                    dblclick: DataSetFunction_dblclick
                }
            },
            {
                xtype: "vmd.dataview",
                id: "ConditionalExpression",
                width: 120,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [{    id: \"1\",    expression: \"if\"}, {    id: \"2\",    expression: \"elseif\"}, {    id: \"3\",    expression: \"else\"}];return data;",
                x: 115,
                y: 210,
                style: "border: 1px solid #dddddd",
                hidden: true,
                click: "ConditionalExpression_click",
                dblclick: "ConditionalExpression_dblclick",
                listeners: {
                    click: ConditionalExpression_click,
                    dblclick: ConditionalExpression_dblclick
                }
            },
            {
                xtype: "vmd.dataview",
                id: "SerialNumberExpression",
                width: 120,
                height: 150,
                itemSelector: "li.info",
                overClass: "info-hover",
                selectedClass: "x-view-selected",
                singleSelect: true,
                multiSelect: false,
                autoScroll: true,
                tpl: "<ul class=\"d-info\">    <tpl for=\".\">        <li class=\"info\">            <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>        </li>    </tpl></ul><!--<ul class=\"d-info\"><tpl for=\".\">--><!--<li class=\"info\" title='{expression}'>--><!--    <div class=\"title\"> <a href=\"\" target=\"_blank\">{expression}</a></div>--><!--</li>--><!--</tpl></ul>-->",
                data: "var data = [{    id: \"1\",    expression: \"序号\"}, {    id: \"2\",    expression: \"\"}];return data;",
                x: 115,
                y: 210,
                style: "border: 1px solid #dddddd",
                hidden: true,
                click: "SerialNumberExpression_click",
                dblclick: "SerialNumberExpression_dblclick",
                listeners: {
                    click: SerialNumberExpression_click,
                    dblclick: SerialNumberExpression_dblclick
                }
            },
            {
                xtype: "vmd.ace",
                id: "expressionDisplay",
                height: 130,
                width: 310,
                language: "html",
                x: 10,
                y: 30,
                afterrender: "MyAce_afterrender",
                listeners: {
                    vmdafterrender: MyAce_afterrender
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            setInfo(info, cell);
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.VisualEditor");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.VisualEditor");
    }
})