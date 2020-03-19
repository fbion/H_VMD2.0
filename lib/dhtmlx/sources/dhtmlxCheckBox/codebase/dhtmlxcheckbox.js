/*
filename：dhtmlxcheckbox.js
creater：温龙香
date created：2016-01-12
description：单选、复选按钮组
date modified：2017.12.26
modifier：刘志伟
version：2.2.15.1129
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/

function dhtmlXCheckBox(parentId, options) {
    var skin = null;
    this.cont = (typeof (parentId) == "string" ? document.getElementById(parentId) : parentId);

    this.options = {
        skin: (options.skin || window.dhx4.skin || (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhtmlxcheckbox") || "material"),
        enabled: true,
        enableAll:false,
        text: "text",
        value:"value",
        checked:"checked",
        data: [],
        mode:"checkbox"
    };
    this.t = {};
    this.lastValue = "";
    window.dhx4._eventable(this);
    dhtmlXCheckBox.extend(this.options, options);
    var that = this;
    this.checked = [];
    this.base = document.createElement("DIV");
    this.base.className = "dhtmlxcheckbox_" + this.options.skin;

    this.base.innerHTML = "";

    // data loading
    this._init = function (data) {
        that.addOption(data);
        that.cont.appendChild(this.base);
    }
    /* add / remove options */
    this.addOption = function (value, options) {
        
        //继承属性
        if (options) {
            dhtmlXCheckBox.extend(that.options, options,true);
        }
        that.clearAll();
        if (value && value.length > 0 && that.isChkAngEnbleAll()) {
            var isAllChecked = 1;
            for (var i = 0; i < value.length; i++) {
                if (!value[i].checked) {
                    isAllChecked = 0;
                    break;
                }
            }
            that._renderOption({ id: "_dhtmlx_all", value: "allall", text: unescape("%u5168%u9009"), checked: isAllChecked }, true);
        }
        //如果不是数组
        if (!(value instanceof Array)) {
            var id = that._renderOption({ value: value, text: text });
        } else {
            for (var q = 0; q < value.length; q++) {
                var data = {
                    text: value[q]['text'],
                    value: value[q]['value'],
                    checked: window.dhx4.s2b(value[q]['checked']) ? 1 : 0,
                    id: value[q]["id"]
                };
                that._renderOption(data);
            }
        }
        //有其他项时
        if (that.options.qita == "1") {
            that._renderOther({ id: "_dhtmlx_qita", value: "qita", text: unescape("%u5176%u4ED6"), inputText: "" }, true);
        }       
        
        //单选如果没有选中项选中第一项如果选中多项，排除其他项
        if (that.options.mode == "radio" && value && value.length > 0) {
            var checkNum = 0;
            var firstValue = "";

            var firstCheckedValue = undefined;
            that._forEachOption2(function (item, index) {
                if (index == 0) firstValue = item._value;
                if (item._checked) {
                    checkNum++;
                    if (firstCheckedValue == undefined) firstCheckedValue = item._value;

                    that.datastore._cursor = item._optId;
                }

            });
            if (checkNum == 0) {
                that.setValue(firstValue);
                that.datastore._cursor = value[0].id;
            } else if (checkNum > 1) {
                that.setValue(firstCheckedValue);
            }
        }
        that.lastValue = that.getValue();
        window.setTimeout(function(){
        	 that.callEvent("onLoaded", [that.getValue()]);
        },20)       
    }
    this._renderOption = function (data, mode) {
        /*
            <div class="dhtmlxcheckbox_dhx_skyblue_opt" onclick="changeState(that)" state="false">
                <div class="dhtmlxcheckbox_dhx_skyblue_chk0"></div>
                <span >选项一</span>
            </div>
        */
        var item = document.createElement("DIV");
        item._checked = data["checked"];
        item._optId = data.id;
        item._value = data.value;
        item._text = data.text;


        item.className = "dhtmlxcheckbox_" + that.options.skin + "_opt";
        var itemChk = document.createElement("DIV");
        if (that.options.mode == "radio") {
            itemChk.className = "dhtmlxcheckbox_" + that.options.skin + "_" + (that.options.style == undefined ? "rad" : that.options.style) + item._checked;
        } else {
            itemChk.className = "dhtmlxcheckbox_" + that.options.skin + "_" + (that.options.style == undefined ? "chk" : that.options.style) + item._checked;
        }
        if (!that.options.enabled) {
            itemChk.className = itemChk.className + "_dis";
        }
        var itemTxt = document.createElement("span");
        itemTxt.className = "dhtmlxcheckbox_" + that.options.skin + "_txt";
        itemTxt.innerHTML = item._text;
        item.appendChild(itemChk);
        item.appendChild(itemTxt);
        that.base.appendChild(item);
        item.onclick=function (e) {
            
            if (!that.options.enabled) return;
            var item = e.target || window.event.srcElement;
            if (!item._optId) {
                item = item.parentNode;
            }
            //如果开启全选按钮且全选选中
            if (mode && item._value == "allall" && item._checked) {
                that._forEachOption2(function (item) {
                    item.children[0].className = item.children[0].className.replace(/1/, "0");
                    item._checked = 0;
                });
            } else if (mode && item._value == "allall" && !item._checked) {
                that._forEachOption2(function (item) {
                    item.children[0].className = item.children[0].className.replace(/0/, "1");
                    item._checked = 1;
                });
            }
            else {
                if (that.options.mode == "checkbox") {
                    if (item._checked) {
                        item.children[0].className = item.children[0].className.replace(/1/, "0");
                        item._checked = 0;
                    } else {
                        item.children[0].className = item.children[0].className.replace(/0/, "1");
                        item._checked = 1;
                    }
                    if (that.options.enableAll) {
                        if (!that.isCheckedAll()) {
                            that.t['_dhtmlx_all'].children[0].className = item.children[0].className.replace(/1/, "0");
                            that.t['_dhtmlx_all']._checked = 0;
                        }
                        else {
                            that.t['_dhtmlx_all'].children[0].className = item.children[0].className.replace(/0/, "1");
                            that.t['_dhtmlx_all']._checked = 1;
                        }
                    }
                } else if (that.options.mode == "radio") {
                    if (!item._checked) {
                        that._forEachOption2(function (item) {
                            item.children[0].className = item.children[0].className.replace(/1/, "0");
                            item._checked = 0;
                        });
                        item.children[0].className = item.children[0].className.replace(/0/, "1");
                        item._checked = 1;
                    }
                }
            }
            
            //event:value changed
            if (that.lastValue != that.getValue()) {
                that.callEvent("onCheckChanged", [that.getValue(), that.lastValue]);
                that.lastValue = that.getValue();
            }
            that.callEvent("onClick", [that.getValue()]);
        }
        
        that.t[item._optId] = item;
        
        return item._optId;
    };

    this._renderOther = function (data) {

        var item = document.createElement("DIV");
        item._checked = 0;
        item._optId = data.id;
        item._value = data.value;
        item._text = data.text;

        item.className = "dhtmlxcheckbox_" + that.options.skin + "_opt_qita";

        var itemTxt = document.createElement("span");
        itemTxt.className = "dhtmlxcheckbox_" + that.options.skin + "_txt";
        itemTxt.innerHTML = item._text;
        item.appendChild(itemTxt);

        var itemInput = document.createElement("input");
        itemInput.className = "dhtmlxcheckbox_" + that.options.skin + "_input";
        item.appendChild(itemInput);

        that.base.appendChild(item);

        that.t[item._optId] = item;
        return item._optId;
    }

    that._init(that.options.data);
    return this;

};
/* visibility */
dhtmlXCheckBox.prototype.show = function (mode) {
    if (typeof (mode) == "undefined") mode = true; else mode = window.dhx4.s2b(mode);
    this.base.style.display = (mode == true ? "" : "none");
};
dhtmlXCheckBox.prototype.hide = function (mode) {
    if (typeof (mode) == "undefined") mode = true;
    this.show(!mode);
};

dhtmlXCheckBox.prototype.isVisible = function () {
    return (this.base.style.display == "");
};
/* enable checkbox */
dhtmlXCheckBox.prototype.enable = function (mode) {
    if (mode == undefined) mode = true;
    this.options.enabled = mode;
    var that = this;
    this._forEachOption2(function (item) {
        that._enableOption(item._optId, mode);
    });
};
/* enable checkbox */
dhtmlXCheckBox.prototype.disable = function () {
    this.enable(false);

};
/* enable option */
dhtmlXCheckBox.prototype._enableOption = function (id, state) {
    if (state) {
        this.t[id].children[0].className = this.t[id].children[0].className.replace(/_dis/, "");
    } else {
        if (!/_dis/.test(this.t[id].children[0].className)) {
            //disabled其他项
            if (id == "_dhtmlx_qita") {
                this.t[id].children[1].disabled = "disabled";
            }
            else {
                this.t[id].children[0].className = this.t[id].children[0].className + "_dis";
            }
        }
    }
};

//20170111 刘志伟 添加复选框组排列方式
dhtmlXCheckBox.prototype.setAlign = function (arrange, align) {
    var that = this;
    
    if (arrange == "0") { //纵向排列
        if (align == 'center') {
            this._forEachOption2(function (item) {
                that.t[item._optId].style.marginLeft = (that.base.clientWidth - that.t[item._optId].clientWidth) / 2 + 'px';
            });
        }
        else {
            this._forEachOption2(function (item) {
                that.t[item._optId].style.float = "none";
            });
        }

    } else {
        if (align == 'center') {
            var rows = [];
            var rowIndex = 0;
            var tmpRowWidth = [];
            this._forEachOption2(function (item) {
                if (((tmpRowWidth[rowIndex] || 0) + that.t[item._optId].clientWidth) < that.base.clientWidth) {
                    rows[rowIndex] = rows[rowIndex] || [];
                    rows[rowIndex].push(that.t[item._optId]);
                    tmpRowWidth[rowIndex] = (tmpRowWidth[rowIndex] || 0) + that.t[item._optId].clientWidth;
                }
                else if (!rows[rowIndex] || rows[rowIndex].length == 0) {
                    rows[rowIndex] = rows[rowIndex] || [];
                    rows[rowIndex].push(that.t[item._optId]);
                    tmpRowWidth[rowIndex] = (tmpRowWidth[rowIndex] || 0) + that.t[item._optId].clientWidth;
                    rowIndex++;
                }
                else {
                    rowIndex++;
                    rows[rowIndex] = rows[rowIndex] || [];
                    rows[rowIndex].push(that.t[item._optId]);
                    tmpRowWidth[rowIndex] = (tmpRowWidth[rowIndex] || 0) + that.t[item._optId].clientWidth;
                }
            });
            for (var i = 0; i < rows.length; i++){
                for (var j = 0; j < rows[i].length; j++){
                    rows[i][j].style.float = "left";
                }
                rows[i][0].style.marginLeft = (that.base.clientWidth - tmpRowWidth[i]) / 2 + 'px';
            }
        }
        else if (align == 'right') {
            this._forEachOption2(function (item) {
                that.t[item._optId].style.float = "right";
            });
        }
        else {
            this._forEachOption2(function (item) {
                that.t[item._optId].style.float = "left";
            });
        }
    }
};

//20171125 刘志伟 设置显示列数
dhtmlXCheckBox.prototype.setColAlign = function (cols) {
    var that = this;
    cols = parseInt(cols);
    var maxColWidth = [];
    var itemIndex = 0;
    this._forEachOption2(function (item) {
        var colw = maxColWidth[itemIndex % cols];
        maxColWidth[itemIndex % cols] = colw ? Math.max(colw, that.t[item._optId].clientWidth) : that.t[item._optId].clientWidth;
        itemIndex++;
    });
    //调整最大列宽
    var totalW = eval(maxColWidth.join("+")) || 0;
    if (that.base.clientWidth < totalW) {
        var itemWidth = Math.floor(that.base.clientWidth / cols);
        for (var i = 0; i < maxColWidth.length; i++) {
            maxColWidth[i] = itemWidth;
        }
    }
    else {
        var remainWidth = that.base.clientWidth - totalW - cols;
        if (remainWidth > 0) {
            for (var i = 0; i < maxColWidth.length; i++) {
                maxColWidth[i] += remainWidth / cols;
            }
        }
    }

    itemIndex = 0;
    this._forEachOption2(function (item) {
        that.t[item._optId].style.width = maxColWidth[itemIndex % cols] + "px";
        that.t[item._optId].style.float = "left";
        itemIndex++;
    });
};

/* enable option */
dhtmlXCheckBox.prototype.setRowMargin = function (margin) {
    var that = this;
    this._forEachOption2(function (item) {
        var marginTop = Math.round(item.clientHeight * (parseInt(margin) / 100)) / 2;
        that.t[item._optId].style.marginTop = marginTop + "px";
        that.t[item._optId].style.marginBottom = marginTop + "px";
    });
};

//清除单选按钮选中状态
dhtmlXCheckBox.prototype.clearSelectStatus = function () {
    var that = this;
    for (var id in that.t) {
        that.t[id].childNodes[0].style.border = "0px solid #FFFFFF";
    }
}

/* enable option */
dhtmlXCheckBox.prototype.moveToNext = function () {
    var that = this;
    that.clearSelectStatus();
    var currentSelectId = that.currentSelectId;
    if (!currentSelectId) {
        for (var id in that.t) {
            currentSelectId = that.currentSelectId = id;
            break;
        }
    }
    else {
        var isJumpOut = false;
        for (var id in that.t) {
            if (isJumpOut) {
                currentSelectId = that.currentSelectId = id;
                break;
            }
            if (currentSelectId == id) {
                currentSelectId = that.currentSelectId = null;
                isJumpOut = true;
            }
        }
    }
    if (that.t[currentSelectId]) {
        that.t[currentSelectId].childNodes[0].style.border = "0px dotted #A0A0A0";
    }
    return currentSelectId;
};

/* enable option */
dhtmlXCheckBox.prototype.moveToPre = function () {
    var that = this;
    that.clearSelectStatus();
    var currentSelectId = that.currentSelectId;
    if (!currentSelectId) {
        for (var id in that.t) {
            currentSelectId = that.currentSelectId = id;
        }
    }
    else {
        var index = 0;
        var preSelectId;
        for (var id in that.t) {
            if (currentSelectId == id && index == 0) { //第一个
                currentSelectId = that.currentSelectId = null;
                break;
            }
            if (currentSelectId == id) {
                currentSelectId = that.currentSelectId = preSelectId;
                break;
            }
            preSelectId = id;
            index++;
        }
    }
    if (that.t[currentSelectId]) {
        that.t[currentSelectId].childNodes[0].style.border = "0px dotted #A0A0A0";
    }
    return currentSelectId;
};

/* setValue */
dhtmlXCheckBox.prototype.setValue = function (value) {
    if (value) {
        value += "";
        var that = this;
        var values = value.split(",").map(function (v) { return dhx4.trim(v) });
        this.checkAll(false);
        
        if (this.options.mode == "radio") {
            this._forEachOption2(function (item, index) {
                if (item._value == values[0]) {
                    that._check(item._optId, true);
                }
            });
        } else if (this.options.mode == "checkbox") {
            this._forEachOption2(function (item, index) {
                if (values.indexOf(item._value) != -1) {
                    that._check(item._optId, true);
                    //value = value.replace(values[i], "");
                }
            });
        }

        //如果存在其他项，则给其他项赋值
        if (that.t["_dhtmlx_qita"]) {
            function getWidth(str) {
                var span = document.getElementById("__getwidth");
                if (span == null) {
                    span = document.createElement("span");
                    span.id = "__getwidth";
                    document.body.appendChild(span);
                    span.style.visibility = "hidden";
                    span.style.whiteSpace = "nowrap";
                }
                span.innerText = str;
                span.style.fontSize = 13.5 + "px";

                return span.offsetWidth;
            }

            var qitaInputElement = that.t["_dhtmlx_qita"].children[1];

            if (qitaInputElement) {
                //替换掉复选框的值后会留下多余的逗号，先将逗号清除然后在把其他项的值中的逗号替换回来
                value = value.replace(/,/g, "").replace(/\*=\*/g, ",");
                qitaInputElement.value = value;

                qitaInputElement.style.width = (getWidth(value) > 100 ? getWidth(value) : 100) + "px";
            }
        }

        //if (this.lastValue != this.getValue()) {
        //    this.lastValue = this.getValue();
        //    this.callEvent("onCheckChanged", [this.getValue()]);
        //}
    }
	//刘志伟 20170812 修复填报列表中如果第一条记录的复选框选中时，后面的记录即使查询值为空默认选中的问题
    else if (this.options.mode != "radio") {
        this.checkAll(false);
    }
};
/* check option */
dhtmlXCheckBox.prototype._check = function (id, value) {
    if (!value) return;
    this.t[id].children[0].className = this.t[id].children[0].className.replace(/0/, "1");
    this.t[id]._checked = 1;
};
/* check all */
dhtmlXCheckBox.prototype.checkAll = function (bool) {
    if (this.options.mode == "radio") return;
    var that = this;
    if (bool) {
        this._forEachOption(function (item) {
            item.children[0].className = item.children[0].className.replace(/0/, "1");
            item._checked = 1;
        });
    }
    else {
        this._forEachOption(function (item) {
            item.children[0].className = item.children[0].className.replace(/1/, "0");
            item._checked = 0;
        });
    }
};

/* remove all options */
dhtmlXCheckBox.prototype.clearAll = function () {
    var that = this;
    this._forEachOption2(function (item) {
        that._removeOption(item._optId);
    });
};
/* remove all options */
dhtmlXCheckBox.prototype._removeOption = function (id) {
    this.base.removeChild(this.t[id]);
    delete this.t[id];
};
/* get option id */
dhtmlXCheckBox.prototype._getIndexById = function (_id) {
    this._forEachOption(function (id, index) {
        if (id == _id) return index;
    });
};
/* get checked value */
dhtmlXCheckBox.prototype.getValue = function () {
    var values = [];
    var hasItems = false;
    var qitaText = "";
    this._forEachOption2(function (item) {
        hasItems = true;
        if (item._optId == "_dhtmlx_all") {
            return;
        }
        else if (item._optId == "_dhtmlx_qita") {
            qitaText = item.childNodes[1].value;
            //qitaText = qitaText.replace(",", "*=*");
        }
        else if (item._checked) {
            values.push(item._value);
        }
    });
    if (qitaText) {
        values.push(qitaText);
    }
    return hasItems ? values.join(this.options.seperator) : null;
}
/* get checked text */
dhtmlXCheckBox.prototype.getText = function () {
    var texts = [];
    this._forEachOption2(function (item) {
        if (item._optId == "_dhtmlx_all") {
            return;
        }
        else if (item._optId == "_dhtmlx_qita") {
            qitaText = item.childNodes[1].value;
            //qitaText = qitaText.replace(",", "*=*");
        }
        else if (item._checked) {
            texts.push(item._text);
        }
    });
    if (qitaText) {
        texts.push(qitaText);
    }

    return texts.join(this.options.seperator);
}
/* iterator option */
dhtmlXCheckBox.prototype._forEachOption = function (handler) {
    var i = 0;
    for (id in this.t) {
        if (this.options.mode == "checkbox" && this.options.enableAll ) {
			if(id!='_dhtmlx_all')
				handler.apply(window, [this.t[id], i - 1]);
        }
        i++;
    }
};
dhtmlXCheckBox.prototype._forEachOption2 = function (handler) {
    var i = 0;
    for (id in this.t) {
        handler.apply(window, [this.t[id], i]);
        i++;
    }
};

/* whether checkbox & enableAll  */
dhtmlXCheckBox.prototype.isChkAngEnbleAll = function () {
    return this.options.enableAll && this.options.mode == "checkbox";
};

/* whether all option is checked */
dhtmlXCheckBox.prototype.isCheckedAll = function () {
    if (this.options.mode == "radio") return false;

    for (id in this.t) {
        if (id == '_dhtmlx_all') {
            continue;
        }
        if (!this.t[id]._checked) {
            return false;
        }
    }
    return true;
};

/* extend */
dhtmlXCheckBox.extend = function (destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
