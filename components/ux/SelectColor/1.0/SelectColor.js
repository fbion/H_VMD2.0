Ext.define('vmd.ux.selectColor.Controller', {
    xtype: 'vmd.ux.selectColor.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.SelectColor", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.NumberInput$1.0$NumberInput", "vmd.ux.ColorInput$1.0$ColorInput"]),
    version: "1.0",
    xtype: "vmd.ux.SelectColor",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 280,
    width: 283,
    height: 187,
    layout: "border",
    afterrender: "SelectColor_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.SelectColor_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.SelectColor'
                }, ex, 50);
            }
        }
    },
    ColorColumnWidth: 200,
    ColorCodeWidth: 58,
    ColorColumnLeft: 20,
    uxCss: ".colpick_hue_arrs {    position: absolute;}.colpick_hue_larr {    position: absolute;    border-left: 6px solid transparent;    border-right: 6px solid transparent;    border-top: 7px solid #858585;}.colpick_hue_rarr {    position: absolute;    border-left: 6px solid transparent;    border-right: 6px solid transparent;    border-bottom: 7px solid #858585;}.slider .thumb {    position: absolute;    left: 0;    top: 0;    width: 13px;    height: 15px;    margin-left: -7px;    cursor: default;    background-position: -13px -150px;}.thumb-top {    position: absolute;    width: 8px;    height: 9px;    background-color: #D9D9D9;    -moz-transform: rotate(45deg);    -ms-transform: rotate(45deg);    -webkit-transform: rotate(45deg);    -o-transform: rotate(45deg);    transform: rotate(45deg);    border-top: solid 1px #848484;    border-left: solid 1px #848484;    border-radius: 0 3px;    box-sizing: content-box;}.thumb-bottom {    position: absolute;    width: 10px;    height: 8px;    background-color: #D9D9D9;    border: solid 1px #848484;    border-top: none;    border-radius: 2px;    box-sizing: content-box;}.gradientys {    width: 100%;    white-space: nowrap;    position: relative;    display: inline-block;    top: 0px ;    padding-bottom: 15px;}.add_btn {    /*margin-left: 10px;*/}.del_btn {    /*margin-left: 10px;*/}.positiontext {    border: solid 1px #848484;}",
    uxrequirecss: "[\"components/ux/selectcolor/1.0/css/hwcharts.css\"]",
    uxrequirejs: "[\"components/ux/selectcolor/1.0/js/chroma.js\"]",
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
        try {
            var clickNum = 2; //用于记录拾色器数量
            var SelectColorDiv = ""; //用于记录当前选择的拾色器div信息
            var Percentage = ""; //计算当前所占百分比
            var ColorList = [];
            var divInfo = []; //游标信息数组
            var page = this;
            //$LAB.script(vmd.virtualPath + '/components/ux/selectcolor/1.0/js/chroma.js')
            //添加均分拾色器
            function add_btn_click(sender) {
                //移除游标
                for (var i = 0; i < divInfo.length; i++) {
                    if (divInfo[i].id != resDisplayDom.id + '_First' && divInfo[i].id != resDisplayDom.id + '_Last') {
                        var p_div = document.getElementById(parentdivid);
                        var div = document.getElementById(divInfo[i].id);
                        p_div.removeChild(div);
                        divInfo.remove(divInfo[i]);
                        i--;
                    }
                }
                clickNum++;
                hwvar = 10;
                for (var j = 2; j < clickNum; j++) {
                    var p = Math.round((j - 1) / (clickNum - 1) * 100);
                    hwvar = (resDisplayDom.clientWidth) * p / 100;
                    id = resDisplayDom.id + "SelectColorDiv_" + j;
                    Left = hwvar + "px";
                    CreatDiv(id, Left);
                    Percentage = p;
                    var backgroundcolor = $("#" + resDisplay.id + " .grad-step").eq(Percentage).css("background-color");
                }
            }
            //创建最外层div
            function CreatDiv(id, Left, backgroundcolor) {
                var nextcolor = '';
                var panelbody = document.getElementById(parentdivid);
                var style = {
                    width: "10px",
                    height: "10px",
                    className: "thumb img-commonctrl active",
                    Left: Left,
                    position: 'absolute',
                    float: 'left'
                }
                CreatNewDiv(id, style, panelbody);
                var ParentDiv = document.getElementById(id);
                var topdivstyle = {
                    className: 'thumb-top',
                    position: 'absolute',
                    backgroundcolor: backgroundcolor
                }
                var bottomdivstyle = {
                    className: 'thumb-bottom',
                    position: 'absolute',
                    mTop: "4px",
                    mLeft: "-1px",
                    backgroundcolor: backgroundcolor
                }
                CreatNewDiv(ParentDiv.id + 'thumb-top', topdivstyle, ParentDiv);
                CreatNewDiv(ParentDiv.id + 'thumb-bottom', bottomdivstyle, ParentDiv);
                panelbody.appendChild(ParentDiv);
                percentage = Math.round(ParentDiv.offsetLeft * 100 / resDisplayDom.clientWidth);
                //divInfo中新增数据
                var div_data = {
                    id: id,
                    percentage: percentage,
                    color: $("#" + resDisplay.id + " .grad-step").eq(percentage).css("background-color")
                }
                divInfo.push(div_data);
                //mousemove事件
                function mouseMoveEvent(ev) {
                    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                    clickflag = 'move';
                    var left = parseInt(vmd(resDisplayDom).css('left'));
                    if (ev.clientX - hwDiv.el.getRegion().left <= left) {
                        ev.clientX = left + hwDiv.el.getRegion().left;
                    } else if (ev.clientX >= resDisplayDom.clientWidth + left + hwDiv.el.getRegion().left) {
                        ev.clientX = resDisplayDom.clientWidth + left + hwDiv.el.getRegion().left;
                    }
                    Percentage = Math.round(SelectColorDiv.offsetLeft * 100 / resDisplayDom.clientWidth);
                    position.setValue(Percentage);
                    oldpositon = Percentage;
                    var backgroundcolor = $("#" + resDisplay.id + " .grad-step").eq(Percentage).css("background-color");
                    var flag = 0;
                    var PValue = [];
                    var CValue = [];
                    for (var i = 0; i < divInfo.length; i++) {
                        CValue.push(divInfo[i].color);
                        PValue.push(divInfo[i].percentage);
                    }
                    //对数组进行排序
                    for (var i = 0; i <= PValue.length; i++) {
                        if (Percentage > PValue[i] && Percentage < PValue[i + 1]) {
                            //数组插入元素
                            PValue.splice(i + 1, 0, Percentage);
                            CValue.splice(i + 1, 0, nextcolor);
                        }
                    }
                    var s = chroma.scale(CValue).domain(PValue);
                    showColors(s);
                    vmd(ParentDiv).css('left', ev.clientX - left - hwDiv.el.getRegion().left);
                }
                var targetid;
                //mouseup事件
                function mouseUpEvent(ev) {
                    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                    if (clickflag == 'move') {
                        slidecilck('mouseUpEvent');
                        clickflag = '';
                    }
                    vmd(document).off('mousedown').off('mousemove');
                }
                // var startX = '';
                function downevent(ev) {
                    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                    // console.log(divInfo)
                    targetid = ev.currentTarget.id;
                    slidecilck('downevent');
                    vmd(document).on('mousemove', mouseMoveEvent);
                    vmd(document).on('mouseup', mouseUpEvent);
                }
                if (id != resDisplayDom.id + '_First' && id != resDisplayDom.id + '_Last') {
                    vmd(ParentDiv).on('mousedown', downevent);
                }

                function click(ev) {
                    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
                    clickflag = 'FL';
                    slidecilck('onclick');
                }
                vmd(ParentDiv).on('click', click);
                var sliderdiv;

                function slidecilck(flag) {
                    if (NextColorDiv) {
                        SelectColorDiv = NextColorDiv;
                    } else {}
                    if (SelectColorDiv) {
                        SelectColorDiv.childNodes[1].style.boxShadow = "0px 0px 0px #a6a6a6";
                    }
                    switch (flag) {
                        case 'downevent':
                            SelectColorDiv = document.getElementById(targetid);
                            SelectColorDiv.childNodes[1].style.boxShadow = "2px 2px 6px #a6a6a6";
                            Percentage = Math.round(SelectColorDiv.offsetLeft * 100 / resDisplayDom.clientWidth);
                            var backgroundcolor = $("#" + resDisplay.id + " .grad-step").eq(Percentage).css("background-color");
                            nextcolor = backgroundcolor;
                            hwColorSelect.setValue(backgroundcolor);
                            for (var i = 0; i < divInfo.length; i++) {
                                if (divInfo[i].id == targetid) {
                                    divInfo.remove(divInfo[i]);
                                }
                            }
                            break;
                        case 'onclick':
                            if (clickflag == 'move') {
                                return;
                            }
                            SelectColorDiv = document.getElementById(id);
                            percentage = Math.round(SelectColorDiv.offsetLeft * 100 / resDisplayDom.clientWidth);
                            var backgroundcolor = $("#" + resDisplay.id + " .grad-step").eq(percentage).css("background-color");
                            SelectColorDiv.childNodes[1].style.boxShadow = "2px 2px 6px #a6a6a6";
                            for (var i = 0; i < divInfo.length; i++) {
                                if (divInfo[i].id == id) {
                                    divInfo.remove(divInfo[i]);
                                }
                            }
                            var data = {
                                id: id,
                                percentage: percentage,
                                color: backgroundcolor,
                            }
                            divseldata = data;
                            divInfo.push(data)
                            hwColorSelect.setValue(backgroundcolor);
                            nextcolor = '';
                            clickflag = '';
                            position.setValue(percentage);
                            oldpositon = percentage;
                            break;
                        case 'mouseUpEvent':
                            percentage = Math.round(SelectColorDiv.offsetLeft * 100 / resDisplayDom.clientWidth);
                            var backgroundcolor = hwColorSelect.getValue();
                            // var backgroundcolor = $("#" + resDisplay.id + " .grad-step").eq(Percentage).css("background-color");
                            if (nextcolor != '') {
                                backgroundcolor = nextcolor;
                            }
                            var sliderflag = 0;
                            //拖动至其他游标上时做处理
                            for (var i = 0; i < divInfo.length; i++) {
                                if (divInfo[i].percentage == percentage) {
                                    //直接给原有游标信息赋值
                                    var data = {
                                        id: divInfo[i].id,
                                        percentage: percentage,
                                        color: backgroundcolor
                                    }
                                    divInfo.splice(i, 1, data);
                                    clickNum = clickNum - 1;
                                    var p_div = document.getElementById(parentdivid);
                                    p_div.removeChild(SelectColorDiv);
                                    SelectColorDiv = document.getElementById(divInfo[i].id);
                                    sliderflag = 1;
                                }
                            }
                            if (sliderflag != 1) {
                                var divdata = {
                                    id: SelectColorDiv.id,
                                    percentage: percentage,
                                    color: backgroundcolor
                                }
                                divseldata = divdata;
                                divInfo.push(divdata);
                            }
                            SelectColorDiv.childNodes[1].style.boxShadow = "2px 2px 6px #a6a6a6";
                            showColors();
                            hwColorSelect.setValue(backgroundcolor);
                            nextcolor = '';
                            position.setValue(Percentage);
                            oldpositon = Percentage;
                            //change事件所需数据组织
                            var temp;
                            for (var i = 0; i < divInfo.length - 1; i++) {
                                for (var j = 0; j < divInfo.length - 1 - i; j++) {
                                    if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                                        temp = divInfo[j];
                                        divInfo[j] = divInfo[j + 1];
                                        divInfo[j + 1] = temp;
                                    }
                                }
                            }
                            var chromaColor = [];
                            var chromaValue = [];
                            for (var i = 0; i < divInfo.length; i++) {
                                chromaColor.push(divInfo[i].color);
                                chromaValue.push(divInfo[i].percentage);
                            }
                            var data = {
                                chromaColor: chromaColor,
                                chromaValue: chromaValue,
                                allColors: ColorList
                            }
                            page.fireEvent('change', page, data);
                            break;
                    }
                }
                slidecilck('onclick');
            }
            var NextColorDiv;
            var clickflag;
            var resDisplayDom;
            //删除选中拾色器
            function del_btn_click(sender) {
                if (SelectColorDiv != document.getElementById(resDisplayDom.id + '_First') && SelectColorDiv != document.getElementById(resDisplayDom.id + '_Last')) {
                    var temp;
                    for (var i = 0; i < divInfo.length - 1; i++) {
                        for (var j = 0; j < divInfo.length - 1 - i; j++) {
                            if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                                temp = divInfo[j];
                                divInfo[j] = divInfo[j + 1];
                                divInfo[j + 1] = temp;
                            }
                        }
                    }
                    var panelbody = document.getElementById(parentdivid);
                    panelbody.removeChild(SelectColorDiv);
                    for (var i = 0; i < divInfo.length; i++) {
                        if (divInfo[i].id == SelectColorDiv.id) {
                            //删除后默认选中下一个游标
                            if (i == divInfo.length - 2) {
                                var NextColorDiv = document.getElementById(divInfo[i - 1].id);
                            } else {
                                var NextColorDiv = document.getElementById(divInfo[i + 1].id);
                            }
                            divInfo.remove(divInfo[i]);
                            NextColorDiv.childNodes[1].style.boxShadow = "2px 2px 6px #a6a6a6";
                        }
                    }
                    if (NextColorDiv) {
                        SelectColorDiv = NextColorDiv;
                        percentage = Math.round(SelectColorDiv.offsetLeft * 100 / resDisplayDom.clientWidth);
                        var backgroundcolor = $("#" + resDisplay.id + " .grad-step").eq(percentage).css("background-color");
                        hwColorSelect.setValue(backgroundcolor);
                        position.setValue(percentage);
                        oldpositon = percentage;
                    }
                    showColors();
                    clickNum--;
                    //change事件所需数据组织
                    var temp;
                    for (var i = 0; i < divInfo.length - 1; i++) {
                        for (var j = 0; j < divInfo.length - 1 - i; j++) {
                            if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                                temp = divInfo[j];
                                divInfo[j] = divInfo[j + 1];
                                divInfo[j + 1] = temp;
                            }
                        }
                    }
                    var chromaColor = [];
                    var chromaValue = [];
                    for (var i = 0; i < divInfo.length; i++) {
                        chromaColor.push(divInfo[i].color);
                        chromaValue.push(divInfo[i].percentage);
                    }
                    var data = {
                        chromaColor: chromaColor,
                        chromaValue: chromaValue,
                        allColors: ColorList
                    }
                    page.fireEvent('change', page, data);
                }
            }

            function hwColorSelect_colorchange(sender, selColor) {}

            function showColors(s, fun) {
                //divInfo进行冒泡排序
                var temp;
                for (var i = 0; i < divInfo.length - 1; i++) {
                    for (var j = 0; j < divInfo.length - 1 - i; j++) {
                        if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                            temp = divInfo[j];
                            divInfo[j] = divInfo[j + 1];
                            divInfo[j + 1] = temp;
                        }
                    }
                }
                var colorvalue = [];
                var percentagevalue = [];
                for (var i = 0; i < divInfo.length; i++) {
                    colorvalue.push(divInfo[i].color);
                    percentagevalue.push(divInfo[i].percentage);
                }
                if (!s) {
                    var s = chroma.scale(colorvalue).domain(percentagevalue);
                }
                ColorList = [];
                try {
                    resDisplay.update('<ol><li>' + resRec(s) + '</li>' + '</ol>');
                } catch (e) {
                    console.warn(e);
                }

                function resRec(d) {
                    if ($.isArray(d)) {
                        return '[' + d.map(d.length > 2 ? resShort : resLong).join(',') + ']';
                    }
                    return resLong(d);

                    function resLong(d) {
                        if ($.isFunction(d)) {
                            var s = '';
                            var dom = d.domain ? d.domain() : [0, 1],
                                dmin = Math.min(dom[0], dom[dom.length - 1]),
                                dmax = Math.max(dom[dom.length - 1], dom[0]);
                            for (var i = 0; i <= 100; i++) {
                                ColorList.push('' + d(dmin + i / 100 * (dmax - dmin)) + '')
                                s += '<span class="grad-step" data-value = ' + (i / 100 * (dmax - dmin)).toFixed(1) + ' style="background-color:' + d(dmin + i / 100 * (dmax - dmin)) + '"></span>';
                            }
                            return '<div id ="gradient" class="gradientys">' + s + '</div>';
                        }
                    }

                    function resShort(d) {
                        if (typeof d == 'string') {
                            return '<span class="cm-string cm-color cm-small" data-color="' + d + '"><span class="cm-hidden-text">\'' + chroma(d).hex() + '\'</span></span>';
                        } else if (typeof d == 'object' && d._rgb) {
                            return '<span class="cm-string cm-color cm-small" data-color="' + d.css() + '"><span class="cm-hidden-text">\'' + d.hex() + '\'</span></span>';
                        } else if ($.isNumeric(d)) {
                            return '<span class="cm-number">' + round(d, 2) + '</span>';
                        } else if (isNaN(d)) {
                            return '<span class="cm-number cm-nan">NaN</span>';
                        }
                    }

                    function round(d, p) {
                        var n = Math.pow(10, p);
                        return Math.round(d * n) / n;
                    }
                }
            }

            function hwColorInput_change(sender, selColor) {}

            function CreatNewDiv(div_id, style, parent_div, backgroundcolor) {
                var div = document.createElement('div');
                div.id = div_id;
                div.style.width = style.width;
                div.style.height = style.height;
                div.style.marginTop = style.mTop;
                div.style.marginLeft = style.mLeft;
                div.style.left = style.Left;
                div.style.position = style.position;
                div.style.float = style.float;
                div.clear = "both";
                div.className = style.className;
                if (style.backgroundcolor) {
                    div.style.backgroundColor = style.backgroundcolor
                }
                parent_div.appendChild(div);
            }
            var parentdivid;

            function SelectColor_afterrender(sender) {
                resDisplayDom = resDisplay.el.dom;
                var parentdom = hwDiv.el.dom;
                var style = {
                    className: "P_SelcetColor",
                    width: resDisplayDom.clientWidth + 10 + 'px',
                    height: '20px',
                    mTop: '45px',
                    mLeft: resDisplayDom.offsetLeft - 5 + 'px',
                    position: 'relative',
                }
                parentdivid = resDisplayDom.id + "P_SelcetColor";
                CreatNewDiv(parentdivid, style, parentdom);
                if (!callsetValue) {
                    // _setColorPercentageValue(["red", "green", "blue"], [0, 50, 100]);
                }
                // _setValue();
                // CreatDiv("First", '0px');
                // CreatDiv("Last", resDisplayDom.clientWidth + 'px');
                // _setColorPercentageValue(["#FFFF00", "rgb(255, 153, 204)", "rgb(204, 255, 204)", "008ae5"], [0, 28, 64, 100])
                //按钮位置调整
                // var addbtn = document.getElementsByClassName('add_btn')[0];
                // addbtn.style.left = resDisplayDom.clientWidth + resDisplayDom.offsetLeft + 5 + 'px';
                // var delbtn = document.getElementsByClassName('del_btn')[0];
                // delbtn.style.left = resDisplayDom.clientWidth + resDisplayDom.offsetLeft + 30 + 'px';
            }

            function hwDiv_afterrender(sender) {}

            function _setColorValue(Color) {
                ColorValue = Color;
            }

            function _setPercentageValue(Percentage) {
                ColorPercentageValue = Percentage;
            }

            function _setColorPercentageValue(Color, Percentage) {
                // vmd.taskRunner(function() {
                //     if (resDisplay.el && chroma) return true;
                // }, function() {
                //     ColorValue = Color;
                //     ColorPercentageValue = Percentage;
                //     var s = chroma.scale(ColorValue).domain(ColorPercentageValue);
                //     showColors(s);
                //     CreatCursor(Percentage);
                // })
                vmd.taskRunner(function() {
                    if (resDisplay.el) return true;
                }, function() {
                    var s = chroma.scale(Color).domain(Percentage);
                    showColors(s);
                    //如果界面上已有游标，则移除当前游标
                    // if (clickNum != 2) {
                    for (var i = 0; i < divInfo.length; i++) {
                        var p_div = document.getElementById(parentdivid);
                        var div = document.getElementById(divInfo[i].id);
                        p_div.removeChild(div);
                        divInfo.remove(divInfo[i]);
                        i--;
                    }
                    // }
                    CreatDiv(resDisplayDom.id + "_First", '0px');
                    CreatDiv(resDisplayDom.id + "_Last", resDisplayDom.clientWidth + 'px');
                    CreatCursor(Percentage);
                })
            }
            //初始化创建光标信息
            function CreatCursor(percentage) {
                clickNum = 2;
                for (var j = 0; j < percentage.length; j++) {
                    var p = percentage[j] / 100;
                    if (p != 0 && p != 1) {
                        hwvar = parseInt(resDisplayDom.clientWidth * p);
                        id = resDisplayDom.id + "SelectColorDiv_" + j;
                        Left = hwvar + "px";
                        CreatDiv(id, Left);
                        clickNum++;
                    }
                }
                var temp;
                for (var i = 0; i < divInfo.length - 1; i++) {
                    for (var j = 0; j < divInfo.length - 1 - i; j++) {
                        if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                            temp = divInfo[j];
                            divInfo[j] = divInfo[j + 1];
                            divInfo[j + 1] = temp;
                        }
                    }
                }
            }

            function hwDiv_click(sender, e) {}
            var nextcolor;
            var oldpositon = '';
            var oldcolor = '';

            function position_change(sender, value, describe) {
                if (!SelectColorDiv) {
                    return;
                }
                if (SelectColorDiv.id == resDisplayDom.id + '_First') {
                    position.setValue(0);
                    return;
                }
                if (SelectColorDiv.id == resDisplayDom.id + '_Last') {
                    position.setValue(100);
                    return;
                }
                var sliderflag = 0;
                if (oldpositon == 100 && parseInt(value) > 100) {
                    position.setValue(100);
                    value = 100;
                    return;
                }
                if (parseInt(value) > 100) {
                    position.setValue(100);
                    value = 100;
                }
                //拖动至其他游标上时做处理
                for (var i = 0; i < divInfo.length; i++) {
                    if (divInfo[i].percentage == value) {
                        //数组中当前信息
                        for (var j = 0; j < divInfo.length; j++) {
                            if (divInfo[j].id == SelectColorDiv.id) {
                                divInfo.remove(divInfo[j]);
                            }
                        }
                        //直接给原有游标信息赋值
                        var data = {
                            id: divInfo[i - 1].id,
                            percentage: value,
                            color: hwColorSelect.getValue()
                        }
                        divInfo.splice(i - 1, 1, data);
                        clickNum = clickNum - 1;
                        var p_div = document.getElementById(parentdivid);
                        p_div.removeChild(SelectColorDiv);
                        SelectColorDiv = document.getElementById(divInfo[i - 1].id);
                        SelectColorDiv.childNodes[1].style.boxShadow = "2px 2px 6px #a6a6a6";
                        sliderflag = 1;
                    }
                }
                if (oldpositon && sliderflag != 1) {
                    for (var i = 0; i < divInfo.length; i++) {
                        if (divInfo[i].percentage == oldpositon) {
                            divInfo[i].percentage = value;
                            var newcolor = divInfo[i].color;
                            var newid = divInfo[i].color;
                            SelectColorDiv.style.left = (parseInt(value) * resDisplayDom.clientWidth) / 100 + 'px';
                        }
                    }
                }
                showColors();
                oldpositon = value;
                //change事件所需数据组织
                var temp;
                for (var i = 0; i < divInfo.length - 1; i++) {
                    for (var j = 0; j < divInfo.length - 1 - i; j++) {
                        if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                            temp = divInfo[j];
                            divInfo[j] = divInfo[j + 1];
                            divInfo[j + 1] = temp;
                        }
                    }
                }
                var chromaColor = [];
                var chromaValue = [];
                for (var i = 0; i < divInfo.length; i++) {
                    chromaColor.push(divInfo[i].color);
                    chromaValue.push(divInfo[i].percentage);
                }
                var data = {
                    chromaColor: chromaColor,
                    chromaValue: chromaValue,
                    allColors: ColorList
                }
                page.fireEvent('change', page, data);
            }

            function hwColorSelect_change(sender, selColor) {
                var color = hwColorSelect.getValue();
                for (var i = 0; i < divInfo.length; i++) {
                    if (divInfo[i].id == SelectColorDiv.id) {
                        divInfo[i].color = color;
                    }
                }
                showColors();
                //change事件所需数据组织
                var temp;
                for (var i = 0; i < divInfo.length - 1; i++) {
                    for (var j = 0; j < divInfo.length - 1 - i; j++) {
                        if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                            temp = divInfo[j];
                            divInfo[j] = divInfo[j + 1];
                            divInfo[j + 1] = temp;
                        }
                    }
                }
                var chromaColor = [];
                var chromaValue = [];
                for (var i = 0; i < divInfo.length; i++) {
                    chromaColor.push(divInfo[i].color);
                    chromaValue.push(divInfo[i].percentage);
                }
                var data = {
                    chromaColor: chromaColor,
                    chromaValue: chromaValue,
                    allColors: ColorList
                }
                page.fireEvent('change', page, data);
            }
            var callsetValue = false;

            function _setValue(data) {
                if (!data || data.chromaValue.length < 2) {
                    _setColorPercentageValue(["red", "green", "blue"], [0, 50, 100]);
                } else {
                    _setColorPercentageValue(data.chromaColor, data.chromaValue);
                }
                callsetValue = true;
            }

            function getValue() {
                //change事件所需数据组织
                var temp;
                for (var i = 0; i < divInfo.length - 1; i++) {
                    for (var j = 0; j < divInfo.length - 1 - i; j++) {
                        if (divInfo[j].percentage > divInfo[j + 1].percentage) {
                            temp = divInfo[j];
                            divInfo[j] = divInfo[j + 1];
                            divInfo[j + 1] = temp;
                        }
                    }
                }
                var chromaColor = [];
                var chromaValue = [];
                for (var i = 0; i < divInfo.length; i++) {
                    chromaColor.push(divInfo[i].color);
                    chromaValue.push(divInfo[i].percentage);
                }
                var data = {
                    chromaColor: chromaColor,
                    chromaValue: chromaValue,
                    allColors: ColorList
                }
                return data;
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.SelectColor',
                p2: ex.message
            }, ex, 100);
        }
        this.SelectColor_afterrender = SelectColor_afterrender;
        this.items = [{
            xtype: "vmd.div",
            id: "hwDiv",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 285,
            height: 198,
            region: "center",
            layout: "absolute",
            click: "hwDiv_click",
            hidden: false,
            listeners: {
                click: hwDiv_click
            },
            items: [{
                    xtype: "vmd.img",
                    id: "add_btn",
                    width: 22,
                    height: 22,
                    x: 224,
                    y: 20,
                    src: "/img/public/添加.png",
                    click: "add_btn_click",
                    style: "cursor: pointer;",
                    cls: "add_btn",
                    listeners: {
                        click: add_btn_click
                    }
                },
                {
                    xtype: "vmd.div",
                    id: "resDisplay",
                    layoutConfig: {
                        align: "middle",
                        pack: "center"
                    },
                    autoEl: "div",
                    border: true,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: this.ColorColumnWidth,
                    height: 30,
                    hidden: false,
                    x: this.ColorColumnLeft,
                    y: 15,
                    layout: "hbox"
                },
                {
                    xtype: "vmd.img",
                    id: "del_btn",
                    width: 17,
                    height: 17,
                    x: 246,
                    y: 23,
                    src: "/img/public/减.png",
                    click: "del_btn_click",
                    style: "cursor: pointer;",
                    cls: "del_btn",
                    listeners: {
                        click: del_btn_click
                    }
                },
                {
                    xtype: "label",
                    id: "hwLabel",
                    text: "色标颜色",
                    x: 20,
                    y: 75
                },
                {
                    xtype: "textfield",
                    id: "position1",
                    allowBlank: true,
                    enableKeyEvents: true,
                    x: 90,
                    y: 115,
                    width: 40,
                    cls: "positiontext",
                    hidden: true
                },
                {
                    xtype: "label",
                    id: "hwLabel1",
                    text: "位置",
                    x: 160,
                    y: 75
                },
                {
                    xtype: "label",
                    id: "hwLabel2",
                    text: "%",
                    x: 150,
                    y: 125,
                    hidden: true
                },
                {
                    xtype: "vmd.ux.NumberInput",
                    id: "position",
                    layout: "auto",
                    x: 205,
                    y: 70,
                    change: "position_change",
                    width: 52,
                    listeners: {
                        change: position_change
                    }
                },
                {
                    xtype: "vmd.ux.ColorInput",
                    id: "hwColorSelect",
                    layout: "fit",
                    x: 82,
                    y: 70,
                    width: this.ColorCodeWidth,
                    change: "hwColorSelect_change",
                    hidden: false,
                    listeners: {
                        change: hwColorSelect_change
                    }
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getColorValue = function() {
            //直接填写方法内容
            return ColorValue;
        }
        this.getPercentageValue = function() {
            //直接填写方法内容
            return ColorPercentageValue;
        }
        this.getColorList = function() {
            return ColorList;
        }
        this.setColorValue = function(colorlist) {
            debugger
            _setColorValue(colorlist)
        }
        this.setPercentageValue = function(percentagelist) {
            _setPercentageValue(percentagelist)
        }
        this.setColorPercentageValue = function(colorlist, percentagelist) {
            //直接填写方法内容
            _setColorPercentageValue(colorlist, percentagelist)
        }
        this.setValue = function(data) {
            return _setValue(data)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.SelectColor");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.SelectColor");
    }
})