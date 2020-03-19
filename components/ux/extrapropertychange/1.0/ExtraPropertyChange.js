Ext.define('vmd.ux.extraPropertyChange.Controller', {
    xtype: 'vmd.ux.extraPropertyChange.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ExtraPropertyChange", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup"]),
    version: "1.0",
    xtype: "vmd.ux.ExtraPropertyChange",
    title: "Panel",
    header: false,
    border: false,
    width: 277,
    height: 123,
    layout: "absolute",
    beforerender: "ExtraPropertyChange_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.ExtraPropertyChange_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.ExtraPropertyChange'
                }, ex, 50);
            }
        }
    },
    direction: "1",
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
            //2019.8.28 已解决上父左父能设置自身为父和可以相互设置父格的问题
            var page = this;

            function extraDirection_click(sender, selectedIndex) {
                page.fireEvent("directionClick", extraDirection, selectedIndex);
            }

            function setInfo(info, sheet) {
                if (info) {
                    leftParent.setValue(info.leftParent.value)
                    rightParent.setValue(info.rightParent.value)
                    extraDirection.setSelectIndex(parseInt(info.direction.value));
                }
                if (sheet) {
                    page.o = sheet;
                }
            }

            function cell() {
                var temp = page.o.getSelected()[0];
                var sr = temp[0];
                var er = temp[2];
                var sc = temp[1];
                var ec = temp[3];
                var arr = [];
                var obj = [];
                if (sr > er && sc > ec) {
                    var tr = er;
                    er = sr;
                    sr = tr;
                    var tc = ec;
                    ec = sc;
                    sc = tc;
                } else if (sr > er) {
                    var tr = er;
                    er = sr;
                    sr = tr;
                } else if (sc > ec) {
                    var tc = ec;
                    ec = sc;
                    sc = tc;
                }
                for (var i = sr; i < er + 1; i++) {
                    for (var n = sc; n < ec + 1; n++) {
                        arr.push({
                            row: i,
                            col: n
                        });
                    }
                }
                for (var k = 0; k < arr.length; k++) {
                    var sr = arr[k].row;
                    var sc = arr[k].col;
                    var rc = {
                        r: sr,
                        c: sc
                    }
                    obj.push(rc);
                }
                page.sc = obj;
            }

            function goCheckL(pool, r, c) {
                var pp = page.o.getCellMeta(r, c).cellAttributeInfo.extraInfo.leftParent.value;
                if (pp != '') {
                    var p1 = pp.match(/^[a-z|A-Z]+/gi);
                    var p2 = pp.match(/\d+$/gi);
                    var fc = page.o.engToNum(p1[0]) - 1
                    var fr = p2[0] - 1
                    if (r == fr && c == fc) return false;
                    pool.push(page.o.numToEng(c) + (r + 1));
                    for (var i = 0; i < pool.length; i++) {
                        if (pool[i] == pp) {
                            return false;
                        }
                    }
                    return goCheckL(pool, fr, fc)
                } else {
                    var a = page.o.numToEng(c)
                    var b = r + 1
                    for (var i = 0; i < pool.length; i++) {
                        if (pool[i] == (a + b)) {
                            return false;
                        }
                    }
                    return true;
                }
            }

            function goCheckR(pool, r, c) {
                var pp = page.o.getCellMeta(r, c).cellAttributeInfo.extraInfo.rightParent.value;
                if (pp != '') {
                    var p1 = pp.match(/^[a-z|A-Z]+/gi);
                    var p2 = pp.match(/\d+$/gi);
                    var fc = page.o.engToNum(p1[0]) - 1
                    var fr = p2[0] - 1
                    pool.push(page.o.numToEng(c) + (r + 1));
                    for (var i = 0; i < pool.length; i++) {
                        if (pool[i] == pp) {
                            return false;
                        }
                    }
                    return goCheckR(pool, fr, fc)
                } else {
                    var a = page.o.numToEng(c)
                    var b = r + 1
                    for (var i = 0; i < pool.length; i++) {
                        if (pool[i] == (a + b)) {
                            return false;
                        }
                    }
                    return true;
                }
            }

            function btnLeft_click(sender, e) {
                if (page.o) {
                    cell()
                    var cells = page.o.dealInvert()[0];
                    page.o.addHookOnce('beforeOnCellMouseDown', function(event, croods, td, controller) {
                        var sr = croods.row;
                        var sc = croods.col;
                        var er = croods.row;
                        var ec = croods.col;
                        for (var i = cells.sr; i < cells.er + 1; i++) {
                            for (var n = cells.sc; n < cells.ec + 1; n++) {
                                if (i == sr && n == sc) {
                                    vmd.tip('不允许设置自身为父', 'error')
                                    return;
                                }
                            }
                        }
                        var pool = [];
                        for (var i = cells.sr; i < cells.er + 1; i++) {
                            for (var n = cells.sc; n < cells.ec + 1; n++) {
                                if (page.o.getCellMeta(i, n).mergeId != 2) {
                                    pool.push(page.o.numToEng(n) + (i + 1));
                                }
                            }
                        }
                        var pp = page.o.getCellMeta(sr, sc).cellAttributeInfo.extraInfo.leftParent.value;
                        if (pp != '') {
                            for (var i = 0; i < pool.length; i++) {
                                if (pool[i] == pp) {
                                    vmd.tip('父格设置中出现循环，请检查并重新设置', 'error')
                                    event.stopImmediatePropagation()
                                    return;
                                }
                            }
                            pool.push(page.o.numToEng(sc) + (sr + 1));
                            var p1 = pp.match(/^[a-z|A-Z]+/gi);
                            var p2 = pp.match(/\d+$/gi);
                            var fc = page.o.engToNum(p1[0]) - 1
                            var fr = p2[0] - 1
                            if (goCheckL(pool, fr, fc)) {} else {
                                vmd.tip('父格设置中出现循环，请检查并重新设置', 'error')
                                event.stopImmediatePropagation()
                                return;
                            }
                        }
                        event.stopImmediatePropagation()
                        var num = sc + 1;
                        var stringName = "";
                        if (num > 0) {
                            if (num >= 1 && num <= 26) {
                                stringName = String.fromCharCode(64 + parseInt(num));
                            } else {
                                while (num > 26) {
                                    var count = parseInt(num / 26);
                                    var remainder = num % 26;
                                    if (remainder == 0) {
                                        remainder = 26;
                                        count--;
                                        stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
                                    } else {
                                        stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
                                    }
                                    num = count;
                                }
                                stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
                            }
                            for (var n = 0; n < page.sc.length; n++) {
                                var r = page.sc[n].r;
                                var c = page.sc[n].c;
                                if (page.o.fathers && page.o.fathers.length > 0) {
                                    for (var i = 0; i < page.o.fathers.length; i++) {
                                        var arr = page.o.fathers[i];
                                        if (arr.cc == c && arr.cr == r && arr.type == 'leftParent') {
                                            arr.fr = sr;
                                            arr.fc = sc;
                                        } else {
                                            var flag = false;
                                            var father = stringName + (sr + 1)
                                            for (var i = 0; i < page.sc.length; i++) {
                                                var r = page.sc[i].r;
                                                var c = page.sc[i].c;
                                                var obj = {
                                                    fr: sr,
                                                    fc: sc,
                                                    type: 'leftParent',
                                                    cr: r,
                                                    cc: c
                                                }
                                                if (!this.fathers) this.fathers = [];
                                                for (var s = 0; s < this.fathers.length; s++) {
                                                    var arr = this.fathers[s];
                                                    if (arr.fr == obj.fr && arr.fc == obj.fc && arr.cr == obj.cr && arr.cc == obj.cc && arr.type == obj.type) {
                                                        flag = true;
                                                    }
                                                }
                                                if (!flag) {
                                                    this.fathers.push(obj)
                                                }
                                                var temp = page.o.getCellMeta(r, c, 'cellAttributeInfo');
                                                temp.cellAttributeInfo.setCellInfos('leftParent', father)
                                                if (xds.eastlayout && xds.eastlayout.reportInst) {
                                                    xds.eastlayout.reportInst.ExtraPropertyChange.leftParent.setValue(father)
                                                } else {
                                                    xds.eastlayout.ContentProperty.ExtraPropertyChange.leftParent.setValue(father)
                                                }
                                                // xds.eastlayout.ContentProperty.ExtraPropertyChange.leftParent.setValue(father)
                                                page.o.setCellMeta(r, c, 'cellAttributeInfo', temp.cellAttributeInfo)
                                            }
                                            break;
                                        }
                                    }
                                } else {
                                    var flag = false;
                                    var father = stringName + (sr + 1)
                                    for (var i = 0; i < page.sc.length; i++) {
                                        var r = page.sc[i].r;
                                        var c = page.sc[i].c;
                                        var obj = {
                                            fr: sr,
                                            fc: sc,
                                            type: 'leftParent',
                                            cr: r,
                                            cc: c
                                        }
                                        if (!this.fathers) this.fathers = [];
                                        for (var s = 0; s < this.fathers.length; s++) {
                                            var arr = this.fathers[s];
                                            if (arr.fr == obj.fr && arr.fc == obj.fc && arr.cr == obj.cr && arr.cc == obj.cc && arr.type == obj.type) {
                                                flag = true;
                                            }
                                        }
                                        if (!flag) {
                                            this.fathers.push(obj)
                                        }
                                        var temp = page.o.getCellMeta(r, c, 'cellAttributeInfo');
                                        temp.cellAttributeInfo.setCellInfos('leftParent', father)
                                        if (xds.eastlayout && xds.eastlayout.reportInst) {
                                            xds.eastlayout.reportInst.ExtraPropertyChange.leftParent.setValue(father)
                                        } else {
                                            xds.eastlayout.ContentProperty.ExtraPropertyChange.leftParent.setValue(father)
                                        }
                                        // xds.eastlayout.ContentProperty.ExtraPropertyChange.leftParent.setValue(father)
                                        page.o.setCellMeta(r, c, 'cellAttributeInfo', temp.cellAttributeInfo)
                                    }
                                    break;
                                }
                            }
                        }
                    })
                }
            }

            function btnTop_click(sender, e) {
                if (page.o) {
                    cell()
                    var cells = page.o.dealInvert()[0];
                    page.o.addHookOnce('beforeOnCellMouseDown', function(event, croods, td, controller) {
                        var sr = croods.row;
                        var sc = croods.col;
                        var er = croods.row;
                        var ec = croods.col;
                        for (var i = cells.sr; i < cells.er + 1; i++) {
                            for (var n = cells.sc; n < cells.ec + 1; n++) {
                                if (i == sr && n == sc) {
                                    vmd.tip('不允许设置自身为父', 'error')
                                    return;
                                }
                            }
                        }
                        var pool = [];
                        for (var i = cells.sr; i < cells.er + 1; i++) {
                            for (var n = cells.sc; n < cells.ec + 1; n++) {
                                if (page.o.getCellMeta(i, n).mergeId != 2) {
                                    pool.push(page.o.numToEng(n) + (i + 1));
                                }
                            }
                        }
                        var pp = page.o.getCellMeta(sr, sc).cellAttributeInfo.extraInfo.rightParent.value;
                        if (pp != '') {
                            for (var i = 0; i < pool.length; i++) {
                                if (pool[i] == pp) {
                                    vmd.tip('父格设置中出现循环，请检查并重新设置', 'error')
                                    event.stopImmediatePropagation()
                                    return;
                                }
                            }
                            pool.push(page.o.numToEng(sc) + (sr + 1));
                            var p1 = pp.match(/^[a-z|A-Z]+/gi);
                            var p2 = pp.match(/\d+$/gi);
                            var fc = page.o.engToNum(p1[0]) - 1
                            var fr = p2[0] - 1
                            if (goCheckR(pool, fr, fc)) {} else {
                                vmd.tip('父格设置中出现循环，请检查并重新设置', 'error')
                                event.stopImmediatePropagation()
                                return;
                            }
                        }
                        event.stopImmediatePropagation()
                        var num = sc + 1;
                        var stringName = "";
                        if (num > 0) {
                            if (num >= 1 && num <= 26) {
                                stringName = String.fromCharCode(64 + parseInt(num));
                            } else {
                                while (num > 26) {
                                    var count = parseInt(num / 26);
                                    var remainder = num % 26;
                                    if (remainder == 0) {
                                        remainder = 26;
                                        count--;
                                        stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
                                    } else {
                                        stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
                                    }
                                    num = count;
                                }
                                stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
                            }
                            for (var n = 0; n < page.sc.length; n++) {
                                var r = page.sc[n].r;
                                var c = page.sc[n].c;
                                if (page.o.fathers && page.o.fathers.length > 0) {
                                    for (var i = 0; i < page.o.fathers.length; i++) {
                                        var arr = page.o.fathers[i];
                                        if (arr.cc == c && arr.cr == r && arr.type == 'rightParent') {
                                            arr.fr = sr;
                                            arr.fc = sc;
                                        } else {
                                            var flag = false;
                                            var father = stringName + (sr + 1)
                                            for (var i = 0; i < page.sc.length; i++) {
                                                var r = page.sc[i].r;
                                                var c = page.sc[i].c;
                                                var obj = {
                                                    fr: sr,
                                                    fc: sc,
                                                    type: 'rightParent',
                                                    cr: r,
                                                    cc: c
                                                }
                                                if (!this.fathers) this.fathers = [];
                                                for (var s = 0; s < this.fathers.length; s++) {
                                                    var arr = this.fathers[s];
                                                    if (arr.fr == obj.fr && arr.fc == obj.fc && arr.cr == obj.cr && arr.cc == obj.cc && arr.type == obj.type) {
                                                        flag = true;
                                                    }
                                                }
                                                if (!flag) {
                                                    this.fathers.push(obj)
                                                }
                                                var temp = page.o.getCellMeta(r, c, 'cellAttributeInfo');
                                                temp.cellAttributeInfo.setCellInfos('rightParent', father)
                                                if (xds.eastlayout && xds.eastlayout.reportInst) {
                                                    xds.eastlayout.reportInst.ExtraPropertyChange.rightParent.setValue(father)
                                                } else {
                                                    xds.eastlayout.ContentProperty.ExtraPropertyChange.rightParent.setValue(father)
                                                }
                                                // xds.eastlayout.ContentProperty.ExtraPropertyChange.rightParent.setValue(father)
                                                page.o.setCellMeta(r, c, 'cellAttributeInfo', temp.cellAttributeInfo)
                                            }
                                            break;
                                        }
                                    }
                                } else {
                                    var flag = false;
                                    var father = stringName + (sr + 1)
                                    for (var i = 0; i < page.sc.length; i++) {
                                        var r = page.sc[i].r;
                                        var c = page.sc[i].c;
                                        var obj = {
                                            fr: sr,
                                            fc: sc,
                                            type: 'rightParent',
                                            cr: r,
                                            cc: c
                                        }
                                        if (!this.fathers) this.fathers = [];
                                        for (var s = 0; s < this.fathers.length; s++) {
                                            var arr = this.fathers[s];
                                            if (arr.fr == obj.fr && arr.fc == obj.fc && arr.cr == obj.cr && arr.cc == obj.cc && arr.type == obj.type) {
                                                flag = true;
                                            }
                                        }
                                        if (!flag) {
                                            this.fathers.push(obj)
                                        }
                                        var temp = page.o.getCellMeta(r, c, 'cellAttributeInfo');
                                        temp.cellAttributeInfo.setCellInfos('rightParent', father)
                                        if (xds.eastlayout && xds.eastlayout.reportInst) {
                                            xds.eastlayout.reportInst.ExtraPropertyChange.rightParent.setValue(father)
                                        } else {
                                            xds.eastlayout.ContentProperty.ExtraPropertyChange.rightParent.setValue(father)
                                        }
                                        page.o.setCellMeta(r, c, 'cellAttributeInfo', temp.cellAttributeInfo)
                                    }
                                    break;
                                }
                            }
                        }
                    })
                }
            }

            function clearLeft_click(sender, e) {
                if (page.o) {
                    cell()
                    for (var i = 0; i < page.sc.length; i++) {
                        var r = page.sc[i].r;
                        var c = page.sc[i].c;
                        var temp = page.o.getCellMeta(r, c, 'cellAttributeInfo');
                        temp.cellAttributeInfo.setCellInfos('leftParent', '')
                        page.o.setCellMeta(r, c, 'cellAttributeInfo', temp.cellAttributeInfo)
                        for (var g = page.o.fathers.length - 1; g >= 0; g--) {
                            if (page.o.fathers[g].cr == r && page.o.fathers[g].cc == c && page.o.fathers[g].type == 'leftParent') {
                                page.o.fathers.splice(g, 1)
                            }
                        }
                    }
                }
                leftParent.setValue("");
            }

            function clearTop_click(sender, e) {
                if (page.o) {
                    cell()
                    for (var i = 0; i < page.sc.length; i++) {
                        var r = page.sc[i].r;
                        var c = page.sc[i].c;
                        var temp = page.o.getCellMeta(r, c, 'cellAttributeInfo');
                        temp.cellAttributeInfo.setCellInfos('rightParent', '')
                        page.o.setCellMeta(r, c, 'cellAttributeInfo', temp.cellAttributeInfo)
                        for (var g = page.o.fathers.length - 1; g >= 0; g--) {
                            if (page.o.fathers[g].cr == r && page.o.fathers[g].cc == c && page.o.fathers[g].type == 'rightParent') {
                                page.o.fathers.splice(g, 1)
                            }
                        }
                    }
                }
                rightParent.setValue("");
            }

            function ExtraPropertyChange_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.ExtraPropertyChange',
                p2: ex.message
            }, ex, 100);
        }
        this.ExtraPropertyChange_beforerender = ExtraPropertyChange_beforerender;
        this.items = [{
                xtype: "label",
                id: "label",
                text: "左父格：",
                x: 20,
                y: 10
            },
            {
                xtype: "textfield",
                id: "leftParent",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 8,
                width: 150,
                readOnly: true,
                emptyText: this.leftParent
            },
            {
                xtype: "label",
                id: "label1",
                text: "上父格：",
                x: 20,
                y: 50
            },
            {
                xtype: "textfield",
                id: "rightParent",
                allowBlank: true,
                enableKeyEvents: true,
                x: 70,
                y: 45,
                readOnly: true,
                emptyText: this.rightParent
            },
            {
                xtype: "label",
                id: "label2",
                text: "扩展方向：",
                x: 10,
                y: 85
            },
            {
                xtype: "vmd.ux.ButtonGroup",
                id: "extraDirection",
                layout: "anchor",
                x: 70,
                y: 80,
                height: 30,
                count: "3",
                text: "不扩展,纵向,横向",
                width: 170,
                selectIndex: this.direction,
                click: "extraDirection_click",
                listeners: {
                    click: extraDirection_click
                }
            },
            {
                xtype: "vmd.button",
                id: "btnLeft",
                type: "(none)",
                size: "small",
                x: 225,
                y: 10,
                width: 20,
                style: "background: url('/system/img/report/SelectCell.png') no-repeat center center",
                height: 20,
                click: "btnLeft_click",
                listeners: {
                    click: btnLeft_click
                }
            },
            {
                xtype: "vmd.button",
                id: "btnTop",
                type: "(none)",
                size: "small",
                x: 225,
                y: 50,
                width: 20,
                style: "background: url('/system/img/report/SelectCell.png') no-repeat center center",
                height: 20,
                click: "btnTop_click",
                listeners: {
                    click: btnTop_click
                }
            },
            {
                xtype: "vmd.button",
                id: "clearLeft",
                type: "(none)",
                size: "small",
                x: 250,
                y: 10,
                width: 20,
                height: 20,
                style: "background: url('/system/img/report/NotSelectCell.png') no-repeat center center",
                click: "clearLeft_click",
                listeners: {
                    click: clearLeft_click
                }
            },
            {
                xtype: "vmd.button",
                id: "clearTop",
                type: "(none)",
                size: "small",
                x: 250,
                y: 50,
                width: 20,
                height: 20,
                style: "background: url('/system/img/report/NotSelectCell.png') no-repeat center center",
                click: "clearTop_click",
                listeners: {
                    click: clearTop_click
                }
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setSelectIndex = function(index) {
            //直接填写方法内容
            extraDirection.setSelectIndex(parseInt(index));
        }
        this.setInfo = function(info, sheet) {
            setInfo(info, sheet)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ExtraPropertyChange");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ExtraPropertyChange");
    }
})