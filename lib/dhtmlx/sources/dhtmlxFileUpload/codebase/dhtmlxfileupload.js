/*
filename：dhtmlXFileUpload.js
creater：刘志伟
date created：2017.6.20
description：上传组件
date modified：2018.08.03
modifier：刘志伟
version：2.3.12.0626
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/

/* uploader */
function dhtmlXFileUpload(p, options) {
    var that = this;
    window.dhx4._eventable(this);
    if (typeof (options.mode) == "string" && typeof (this[options.mode]) == "function") {
        this.engine = options.mode;
    } else {
        this.engine = "html4";

        var k = null;
        if (typeof (window.FormData) != "undefined" && typeof (window.XMLHttpRequest) != "undefined") {
            k = new XMLHttpRequest();
            if (typeof (k.upload) == "undefined") k = null;
        }

        if (k != null) {
            // IE10, IE11, FF, Chrome, Opera
            this.engine = "html5";
            this.engine = "html5";
        }
        else if (typeof (window.swfobject) != "undefined" || k === false) {
            var k = swfobject.getFlashPlayerVersion();
            if (k.major >= 32) this.engine = "flash";
            else {
                Ext.Msg.confirm("提示!", "当前flash版本低，是否立即下载修复?", function (btn) {
                    if (btn == "yes") {
                        window.open(options.flashPath);
                    }
                });
            }
            //mafei 20150901 
            //this.engine = "html4";
        } else {
            // check if silverlight installed
            this._sl_v = this.getSLVersion();
            if (this._sl_v) this.engine = "sl";
        }
        k = null;
    }

    if (typeof (p) == "string") p = document.getElementById(p);
    this.base = p;

    this._upload_mp = (typeof (options.multiple) != "undefined" ? options.multiple == true : true); // multiple file select
    this._upload_dnd = true;


    // swf-file path
    this._swf_file_url = options.swfPath || "";
    this._swf_upolad_url = options.swfUrl || "";
    this._swf_logs = options.swfLogs;

    // sl-data
    this._sl_xap = options.slXap || "";
    this._sl_upload_url = options.slUrl || "";
    this._sl_logs = options.slLogs || "";

    // main cont
    this.p = document.createElement("DIV");
    this.p.className += " dhx_file_uploader";
    //this.p.style.position = 'relative';
    p.appendChild(this.p);

    // files
    this.p_files = document.createElement("DIV");
    this.p_files.className = "dhx_upload_files";
    //this.p_files.style.position = 'absolute';
    this.p.appendChild(this.p_files);

    // buttons
    this.p_controls = document.createElement("DIV");
    this.p_controls.className = "dhx_upload_controls";
    this.p.appendChild(this.p_controls);

    // init engine

    /* upload */

    this._files = {};
    this._items = {};
    this._oldFiles={};

    this._data = {}; // uploaded files

    this._autoStart = false;
    this._autoRemove = false;
    this._titleScreen = true;

    this._enabled = true;

    this._uploaded_count = 0;
    this._fileType = options.fileType;
    this._showmode = options.showmode;

    this._numPerPage = options.numPerPage;
    this._cols = options.cols;

    this._isShowAll = options.isShowAll;
    this._dataHost = options.dataHost;
    this._wdkHost = options.wdkHost;

    this._initToolbar = function () {

        // add
        this.b_opts = {
            info: { onclick: null },
            browse: { onclick: null, tooltip: "Browse" },
            upload: {
                onclick: function () {
                    if (!that._enabled) return; if (!that._uploading) { that._uploadStart(); }
                }, tooltip: "Upload"
            },
            cancel: { onclick: function () { if (!that._enabled) return; that._uploadStop(); that._switchButton(false); }, tooltip: "Stop" },
            clear: { onclick: function () { if (!that._enabled) return; that.clear(); }, tooltip: "Clear list" }
        };

        this.buttons = {};

        for (var a in this.b_opts) {
            var k = document.createElement("DIV");
            k.innerHTML = "&nbsp;";
            k.className = "dhx_file_uploader_button button_" + a;
            k.onclick = this.b_opts[a].onclick;
            if (this.b_opts[a].tooltip) k.title = this.b_opts[a].tooltip;

            this.p_controls.appendChild(k);
            this.buttons[a] = k;

            k = null;
        }
    }

    this._readableSize = function (t) {
        var i = false;
        var b = ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb"];
        for (var q = 0; q < b.length; q++) if (t > 1024) t = t / 1024; else if (i === false) i = q;
        if (i === false) i = b.length - 1;
        return Math.round(t * 100) / 100 + " " + b[i];
    }

    this._beforeAddFileToList = function (name, size) {
        return (this.callEvent("onBeforeFileAdd", [name, size]) === true);
    }

    this.setDatas = function (datas) {
        this.datas = datas;
    }

    this.addItems = function () {
        if (!this.datas || this.datas.length == 0) {
            return;
        }
        var that = this;

        //清空数据
        this.p_files.innerHTML = "";
        this._files = {};
        this._items = {};
        this._oldFiles = {};

        // 文档库模式
        if (this.isWdk) {
            var hwFao = new HwFao(this._dataHost, "wdk");//地址:端口和存储标识(服务管理员分配)
            var docIds = this.datas.map(function (v) { return v.docid });
            hwFao.getWdkBrowseUrl(this._wdkHost, "vmdcode", docIds.join(","), function (res) {
                if (res.isSucceed && res.data) {
                    for (var i = 0; i < res.data.length; i++) {
                        that.addItem(res.data[i]);
                    }
                    that.doLayout();
                } else {
                    Ext.Msg.show({
                        title: "提示",
                        msg: "查询文件信息失败！文件id：" + docIds.join(","),
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            }, function (res) {
                Ext.Msg.alert("错误信息", res,
                    function () { })
            });
        }
        // 常规模式
        else {
            for (var i = 0; i < this.datas.length; i++){
                this.addItem(this.datas[i]);
            }
        }
        this.doLayout();
    }

    this.addItem = function (data) {
        if (!data) {
            return;
        }
        var filePath = data.url || data.path || "";
        var relativePath = data.url || "";
        var fileName = data.name || (filePath.substr(filePath.lastIndexOf('/') + 1));
        var fileType = (data.extend || (filePath.substr(filePath.lastIndexOf('.') + 1)) || "").replace(".", "");
        var fileSize = data.size || "";
        var fileDocId = data.docid || "";

        var vals = (this.val && this.val.split(",")) || [];
        var isShow = this._isShowAll ? true : (this.isWdk ? (fileDocId && vals.indexOf(fileDocId) != -1) : (filePath && vals.indexOf(filePath) != -1));
        if (isShow) {
            this._addServerFileToList(data.docid || data.id, fileName, filePath, relativePath, fileSize, fileType, fileDocId, "uploaded", "nochange");
        }
    }

    this._addServerFileToList = function (id, name, path,relativePath, size, ext, docId, state, storageState) {
        this._checkTitleScreen();

        var t = document.createElement("DIV");
        t._idd = id;
        t._server = true;
        t.className = "dhx_file dhx_file_" + state;
        //t.style.position = 'absolute';
        t.innerHTML = "<div class='dhx_file_param dhx_file_name'>" + name + "</div>" +
				"<div class='dhx_file_param dhx_file_progress'>" + "" + "%</div>" +
				"<div class='dhx_file_param dhx_file_delete' title='Remove from list'>&nbsp;</div>";

        this.p_files.appendChild(t);

        // filename area width
        //t.childNodes[0].style.width = t.offsetWidth - 127 + "px";

        this._items[id] = t;

        this.timestamp = this.timestamp || (new Date()).valueOf();
        this._files[id] = { server: true, file: null, name: name, size: size, state: state, path: path,relativePath:relativePath, ext: ext, id: docId,timestamp: this.timestamp++, storageState: storageState };
        this._oldFiles[id] =   this._files[id];
            t.childNodes[2].onclick = function () {
            if (!that._enabled) return;
            var id = this.parentNode._idd;
            that._removeFileFromQueue(id);
        }

        this.callEvent("onFileAdd", [this.id, name, id]);
    }

    this._addFileToList = function (id, name, size, state, progress) {

        this._checkTitleScreen();

        var t = document.createElement("DIV");
        t._idd = id;
        t.className = "dhx_file dhx_file_" + state;
        //t.style.position = 'absolute';
        t.innerHTML = "<div class='dhx_file_param dhx_file_name'>&nbsp;</div>" +
				"<div class='dhx_file_param dhx_file_progress'>" + progress + "%</div>" +
				"<div class='dhx_file_param dhx_file_delete' title='Remove from list'>&nbsp;</div>";
        
        this.p_files.appendChild(t);

        // filename area width
        //t.childNodes[0].style.width = t.offsetWidth - 127 + "px";

        this._items[id] = t;

        this._updateFileNameSize(id);
        //刘志伟20161008
        //添加鼠标指向时的提示功能
        this._items[id].childNodes[0].onmouseover = function (e) {
            e = e || window.event;
            e.cancelBubble = true;

            //var c = that.grid.getFirstParentOfType(e ? e.target : event.srcElement, 'TD');
            //c._attrs['title'] = " ";
            var pageX = e.pageX;
            var pageY = e.pageY;
            if (pageX == undefined) {
                pageX = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
            }
            if (pageY == undefined) {
                pageY = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
            }
            var divTip = document.createElement("div");
            divTip.id = "upload_tip_" + this.id; //根据元素id生成提示信息DIV的id
            divTip.style.position = "absolute"; //采取绝对定位方式
            divTip.style.top = pageY + 10 + "px";         //定位提示信息显示位置在当前元素附近
            divTip.style.left = pageX + "px";
            divTip.style.border = "1px solid #666";
            divTip.style.background = "#FFFFFF";
            divTip.style.textIndent = 0;
            divTip.style.display = "";  //允许显示，为none则为不显示，但仍然在内存中
            divTip.innerHTML = this.innerText;//添加提示信息内容
            document.getElementsByTagName("body")[0].appendChild(divTip);   //添加到body作为网页内容的一部分，不添加则不会显示
            return false;
        }

        this._items[id].childNodes[0].onmouseout = function () {
            var divTip = document.getElementById("upload_tip_" + this.id);
            if (divTip) {     // 判断id是否存在，防止出现出错信息
                divTip.parentNode.removeChild(divTip);  // 实质是关闭，Remove掉，以免造成内存泄露
                // this.style.display = 'none'; 或者 divTip.style.display = 'none' 只是隐藏提示信息，仍占用内存空间，
                // 反复多次使用则会因为内存空间未释放而造成内存泄露问题

            }
        }

        t.childNodes[2].onclick = function () {
            if (!that._enabled) return;
            var id = this.parentNode._idd;
            that._removeFileFromQueue(id);
        }

        this.callEvent("onFileAdd", [this.id, name, id]);
    }

    this._removeFileFromList = function (id) {

        if (!this._items[id]) return;

        this._items[id].childNodes[2].onclick = null;
        this._items[id].parentNode.removeChild(this._items[id]);
        this._items[id] = null;
        delete this._items[id];

        if (this._data[id]) {
            this._data[id] = null;
            delete this._data[id];
        }

        this._checkTitleScreen();
    }

    this._getAddFileCount = function () {
        var count = 0;
        for(var fileID in this._files){
            if (this._files.hasOwnProperty(fileID) && this._files[fileID].storageState != "delete") {
                count++;
            }
        }
        return count;
    },

    this._displayFileToArea = function (fileID, top, left, width, height) {
        var that = this;
        var item = this._items[fileID];
        var file = this._files[fileID];
        var nameNode = item.childNodes[0];
        var uploadPercentNode = item.childNodes[1];
        var delNode = item.childNodes[2];

        item.style.top = top + "px";
        item.style.left = left + "px";
        item.style.width = width + "px";
        item.style.height = height + "px";
        item.style.position = "absolute";

        nameNode.style.top = (height - nameNode.clientHeight) / 2 + "px";
        uploadPercentNode.style.top = (height - uploadPercentNode.clientHeight) / 2 + "px";
        delNode.style.top = (height - delNode.clientHeight) / 2 + "px";

        var path = file.path.indexOf("http://") == -1 ? ("http://" + this._dataHost.replace("http://", "") + "/wdk/" + file.path) : file.path;

        nameNode.innerHTML = "<a target='_blank' style='text-align:left' href='" + path + "'>" + nameNode.innerHTML + "</a>";
        uploadPercentNode.style.visibility = "hidden";
        if (!this._deletable) {
            delNode.style.visibility = "hidden";
        }
    },

    this._displayImageToArea = function (fileID, top, left, width, height, displayMode, callback) {
        var that = this;
        var item = this._items[fileID];
        var file = this._files[fileID];

        if (item.childNodes.length == 0) {
            item.innerHTML = "<div class='dhx_file_param dhx_file_name'>" + name + "</div>" +
				"<div class='dhx_file_param dhx_file_progress'>" + "" + "%</div>" +
				"<div class='dhx_file_param dhx_file_delete' title='Remove from list'>&nbsp;</div>";
        }
        var nameNode = item.childNodes[0];
        var uploadPercentNode = item.childNodes[1];
        var delNode = item.childNodes[2];

        delNode.onclick = function () {
            if (!that._enabled) return;
            var id = this.parentNode._idd;
            dhtmlXFileUpload.prototype.html5.prototype._removeFileFromQueue.call(that, [id]);
        }

        item.style.top = top + "px";
        item.style.left = left + "px";
        item.style.width = width + "px";
        item.style.height = height + "px";
        item.style.position = "absolute";

        var timer;
        var imgOnload = function (imgs, that) {
            var cRadio = width / height;
            var imgRadio = imgs.width / imgs.height;

            if (displayMode == "ActualSize") {// 图片实际大小
                if (imgs.height < height) {
                    imgs.style.top = (height - imgs.height) / 2 + "px";
                }
            }
            else if (displayMode == "Extend") {// 伸展，拉伸
                imgs.width = width;
                imgs.height = height;
            }
            else if (displayMode == "Hextend") {// 横向拉伸
                var h = imgs.height;
                imgs.width = width;
                if (h < height) {
                    imgs.height = h;
                }
                imgs.style.top = (height - imgs.height) / 2 + "px";
            }
            else if (displayMode == "Vextens") {//纵向拉伸
                var w = imgs.width;
                imgs.height = height;
                if (w < imgs.width) {
                    imgs.width = w;
                }
            }
            else if (displayMode == "Fill") {//填充

            }
            else if (displayMode == "EqualScaling") {//等比例缩放
                //如果显示区域的宽高比大于图片的宽高比，则图片的高度等于显示区域高度，宽度按比例缩放
                if (cRadio > imgRadio) {
                    imgs.height = height - 2;
                    imgs.width = height * imgRadio;
                    imgs.style.left = (width - imgs.width) / 2 + "px";
                    imgs.style.top = 1 + "px";
                }
                else {
                    imgs.width = width - 2;
                    imgs.height = width / imgRadio;
                    imgs.style.left = 1 + "px";
                    imgs.style.top = (height - imgs.height) / 2 + "px";
                }
            }
            else if (displayMode == "Adapt") {//适应

            }
            else if (displayMode == "Tile") {//平铺

            }
            else {
               
            }
            if (callback) {
                callback.apply(that, []);
            }
        }

        var imgs = new Image();
        //imgs._width = this._items[fileID].clientWidth;
        this._items[fileID].removeChild(nameNode);
        imgs.onload = function () {
            if (imgs.complete && imgs.height && imgs.width) {
                imgOnload(this, that);
            }
            else {
                timer = setInterval(function () {
                    if (imgs.complete && imgs.height && imgs.width) {
                        imgOnload(imgs, that);
                        if (timer) {
                            clearInterval(timer);
                        }
                    }
                    else {
                        imgs.src = file.path.indexOf("http://") == -1 ? ("http://" + this._dataHost.replace("http://", "") + "/wdk/" + file.path) : file.path;
                    }
                }, 40);
            }
        };
        imgs.src = file.path.indexOf("http://") == -1 ? ("http://" + this._dataHost.replace("http://", "") + "/wdk/" + file.path) : file.path;

        imgs.ondragstart = function () { return false };
        imgs.onclick = function () {
            that.callEvent("onImgClick", [file]);
        }
        imgs.style.cursor = "pointer";
        imgs.style.position = "relative";
        //that._items[fileID].style.height = "100%";
        item.insertBefore(imgs, uploadPercentNode);
        delNode.style.top = (height - 12) / 2 + "px";
        delNode.style.right = "5px";
        uploadPercentNode.style.visibility = "hidden";

        if (!this._deletable) {
            delNode.style.visibility = "hidden";
        }
    },

    this.doLayout = function () {
        var that = this;
        var fileCount = this._getAddFileCount();

        var numPerPage = this._numPerPage || fileCount || 1;
        var cols = Math.min(numPerPage, this._cols);
        var displayMode = this._showmode; //ActualSize Extend Hextend Vextens Fill EqualScaling

        var pageNums = Math.ceil(fileCount / numPerPage);
        var perPageHeight = this.base.parentNode.clientHeight;

        var rows = Math.ceil(fileCount / cols);
        var areaLeft = 0;
        var areaTop = 0;
        var areaWidth = this.base.parentNode.clientWidth;
        var areaHeight = this.base.parentNode.clientHeight / rows;

        if (fileCount >= cols) {
            areaWidth = this.base.parentNode.clientWidth / cols;
        }
        else {
            areaWidth = this.base.parentNode.clientWidth / fileCount;
        }

        //排序
        var orderFiles = [];
        for (fileID in this._files) {
            if (this._files[fileID].storageState != "delete") {
                this._files[fileID].fileID = fileID;
                orderFiles.push(this._files[fileID]);
                this._items[fileID].style.pageBreakAfter = '';
            }
        }
        for (var i = 0; i < orderFiles.length; i++) {
            for (var j = 0; j < orderFiles.length; j++) {
                if (orderFiles[i].timestamp < orderFiles[j].timestamp) {
                    var temp = orderFiles[j];
                    orderFiles[j] = orderFiles[i];
                    orderFiles[i] = temp;
                }
            }
        }

        if (this._fileType == "image") {
            //根据页数对图片进行分组
            var pageImages = [];
            for (var i = 0; i < pageNums; i++) {
                pageImages[i] = [];
            }
            var pageIndex = 0;
            for (var i = 0; i < orderFiles.length; i++) {
                if (pageImages[pageIndex].length == numPerPage) {
                    pageIndex++;
                }
                pageImages[pageIndex].push(orderFiles[i]);
            }

            this.p_files.innerHTML = "";
            var rowsInpage = Math.ceil(numPerPage / cols);
            if (rowsInpage > 0) {
                areaHeight = perPageHeight / rowsInpage;
            }
            for (var i = 0; i < pageNums; i++) {
                var files = pageImages[i];

                var table = document.createElement('table');
                table.style.borderSpacing = "0px";
                table.style.borderCollapse = "collapse";
                table.style.textAlign = "left";
                if (i != pageNums - 1) {
                    table.style.pageBreakAfter = 'always';
                }

                this.p_files.appendChild(table);
                var ajustCompleteNum = 0;
                for (var j = 0; j < rowsInpage; j++) {
                    var tr = document.createElement('tr');
                    tr.style.height = areaHeight + 'px';
                    table.appendChild(tr);
                    var tdNums = Math.min(cols, orderFiles.length);
                    for (var k = 0; k < tdNums; k++) {
                        var td = document.createElement('td');
                        td.style.borderWidth = '0px';
                        td.style.height = areaHeight + 'px';
                        td.style.width = areaWidth + 'px';
                        td.style.position = "relative";
                        td.style.padding = "0px";
                        tr.appendChild(td);
                        var file = files[j * cols + k];
                        if (file) {
                            var item = this._items[file.fileID];
                            if (item) {
                                td.appendChild(item);
                                this._displayImageToArea(file.fileID, 0, 0, areaWidth, areaHeight, displayMode, function () {
                                    //ajustCompleteNum++;
                                    //if (ajustCompleteNum == fileCount) {
                                    //    that.grid.callEvent("ajustImageSuccess", []);
                                    //}
                                });
                            }
                        }
                    }
                }
            }
        }
        else {
            for (var fileIndex = 0; fileIndex < orderFiles.length; fileIndex++) {
                areaLeft = areaWidth * (fileIndex % cols);
                areaTop = parseInt(fileIndex / cols) * areaHeight;
                this._displayFileToArea(orderFiles[fileIndex].fileID, areaTop, areaLeft, areaWidth, areaHeight);
            }
        }
    },

    this._updateFileNameSize = function (id) {
        this._items[id].childNodes[0].innerHTML = this._files[id].name + (!isNaN(this._files[id].size) ? " (" + this._readableSize(this._files[id].size) + ")" : "&nbsp;");
        this._items[id].childNodes[0].title = this._files[id].name + (!isNaN(this._files[id].size) ? " (" + this._readableSize(this._files[id].size) + ")" : "");
        this._items[id].childNodes[0].id = id;
    }

    this._updateFileInList = function (id, state, progress) {
        if (!this._items[id]) return;
        this._items[id].className = "dhx_file dhx_file_" + state;
        //this._items[id].style.position = 'absolute';
        // progress
        this._updateProgress(id, state, progress);
        this._updateFileNameSize(id);
    }

    this.showProgress = function () {
        if (!this.p_progress) {
            this.p_progress = document.createElement("DIV");
            this.p_progress.className = "dhx_upload_progress";
            this.p.appendChild(this.p_progress);
        }
    },

    this.hideProgress = function () {
        if (this.p_progress) {
            this.p_progress.parentNode.removeChild(this.p_progress);
            this.p_progress = null;
        }
    }

    this._updateProgress = function (id, state, progress) {
        if (state == "uploading" && progress < 100 && this._progress_type == "loader") {
            this._items[id].childNodes[1].className = "dhx_file_param dhx_file_uploading";
            this._items[id].childNodes[1].innerHTML = "&nbsp;";
        } else {
            this._items[id].childNodes[1].className = "dhx_file_param dhx_file_progress";
            this._items[id].childNodes[1].innerHTML = progress + "%";
        }
        this._updateFileNameSize(id);
    }

    this._removeFilesByState = function (state) {
        for (var a in this._files) {
            if (state === true || this._files[a].state == state) {
                //this._removeFileFromQueue(a);
                dhtmlXFileUpload.prototype.html5.prototype._removeFileFromQueue.call(this, [a]);
            }
        }
    }

    this._removeFilesDoms = function (state) {
        if (!state) {
            return;
        }
        for (var a in this._files) {
            this._files[a].server = false;
            this._removeFileFromQueue(a, false);
        }
    }

    this._switchButton = function (state) {
        if (state == true) {
            this.buttons["upload"].style.display = "none";
            this.buttons["cancel"].style.display = "";
        } else {
            var t = this._uploaded_count;
            this.buttons["upload"].style.display = "";
            this.buttons["cancel"].style.display = "none";
            this._uploaded_count = 0;
            if (t > 0) this.callEvent("onUploadComplete", [t]);
        }
    }
    
    this._uploadStart = function () {

        this._switchButton(true);

        // change status for prev fail auploads if any
        if (!this._uploading) {
            for (var a in this._files) {
                if (this._files[a].state == "fail") {
                    this._files[a].state = "added";
                    this._updateFileInList(a, "added", 0);
                }
            }
        }

        this._uploading = true;

        var t = false;

        for (var a in this._files) {
            if (!t && [this._files[a].state] == "added") {
                t = true;
                this._files[a].state = "uploading";
                this._updateFileInList(a, "uploading", 0);
                this._doUploadFile(a);
            }
        }
        if (!t) {
            this._uploading = false;
            this._switchButton(false);
        }
    }

    this._onUploadSuccess = function (id, serverName, r, extra) {

        var response = "";
        // flash mode
        if (typeof (r) != "undefined" && this.engine == "flash") {
            dhx4.temp = null;
            try { eval("dhx4.temp=" + r.data); } catch (e) { dhx4.temp = null; };
            var t = dhx4.temp;
            response = r.data;
            dhx4.temp = null;
            if (t == null || !t.isSucceed) {
                this._onUploadFail(id, (t != null && t.extra != null ? t.extra : null));
                return;
            }
        }
        else {
            response = this._loader && this._loader.responseText;
        }

        //
        this._uploaded_count++;
        this._data[id] = { realName: this._files[id].name, serverName: serverName };
        this._files[id].state = "uploaded";
        this.timestamp = this.timestamp || (new Date()).valueOf();
        this._files[id].timestamp = this.timestamp++;
        this._files[id].storageState = "save";
        this._updateFileInList(id, "uploaded", 100);
        //this.callEvent("onUploadFile", [this._files[id].name, serverName, extra]);
        //wenlongxiang 20141222 Add argument t  
        this.callEvent("onUploadFile", [this._files[id].name, serverName, extra, t, response, this.id, id]);
        if (this._autoRemove) this._removeFileFromQueue(id);
        if (this._uploading) this._uploadStart();

    }

    this._onUploadFail = function (id, extra) {
        this._files[id].state = "fail";
        this._updateFileInList(id, "fail", 0);
        this.callEvent("onUploadFail", [this._files[id].name, extra]);
        if (this._uploading) this._uploadStart();
    }

    this._onUploadAbort = function (id) {
        this._uploading = false;
        this._files[id].state = "added";
        this._updateFileInList(id, "added", 0);
        this.callEvent("onUploadCancel", [this._files[id].name]);
    }

    this._checkTitleScreen = function () {
        var k = 0;
        for (var a in this._files) k++;

        if (k == 0 && this.p.className.search("dhx_file_uploader_title") < 0 && this._titleScreen) {
            // show title screen
            this.p.className += " dhx_file_uploader_title";
            this.buttons["info"].innerHTML = this._titleText;
            this.buttons["info"].style.width = Math.max(this.p_controls.offsetWidth - 134, 0) + "px";
        }
        if ((k > 0 || !this._titleScreen) && this.p.className.search("dhx_file_uploader_title") >= 0) {
            // hide title screen
            this.p.className = this.p.className.replace(/dhx_file_uploader_title/g, "");
            this.buttons["info"].innerHTML = "";
        }
    }

    // events
    //this.callEvent = function () { }
    this.checkAllUpload = function () {
        for (var a in this._files) {
            if (this._files[a].state != "uploaded") {
                return false;
            }
        }
        return true;
    }

    // public
    this.upload = function () {
        if (!this._uploading) this._uploadStart();
    }

    this.setIsWdk = function (isWdk) {
        this.isWdk = isWdk;
    }

    this.setUploadPath = function (uploadPath) {
        this.uploadPath = uploadPath;
    }

    this.setDeletable = function (deletable) {
        this._deletable = deletable;
        if (!deletable) {
            this.buttons["browse"].style.right = "40px";
        }
        this.buttons["clear"].style.display = deletable ? "block" : "none";
    }

    this.setAddable = function (addable) {
        this._addable = addable;
        if (!addable) {
            this.buttons["clear"].style.right = "40px";
        }
        this.buttons["browse"].style.display = addable ? "block" : "none";
    }

    this.setUploadable = function (uploadable) {
        this._uploadable = uploadable;
        this.buttons["upload"].style.display = uploadable ? "block" : "none";
    }
    
    this.setCancelable = function (cancelable) {
        this._cancelable = cancelable;
        this.buttons["cancel"].style.display = cancelable ? "block" : "none";
    }

    this.setInfoable = function (infoable) {
        this._infoable = infoable;
        this.buttons["info"].style.display = infoable ? "block" : "none";
    }
    
    this.setAutoStart = function (state) {
        this._autoStart = (state == true);
    }

    this.setAutoRemove = function (state) {
        this._autoRemove = (state == true);
    }

    this.enableTitleScreen = function (state) {
        this._titleScreen = (state == true);
        this._checkTitleScreen();
    }

    this.setTitleText = function (text) {
        this._titleText = text;
        if (this.p.className.search("dhx_file_uploader_title") >= 0) this.buttons["info"].innerHTML = this._titleText;
    }

    this.setURL = function (url) {
        this._url = url;
    }

    this.setSWFURL = function (url) {
        this._swf_upolad_url = url;
    }

    this.enable = function () {
        this._enabled = true;
        this.p_files.className = "dhx_upload_files";
        this.p_controls.className = "dhx_upload_controls";
    }

    this.disable = function () {
        this._enabled = false;
        this.p_files.className = "dhx_upload_files dhx_uploader_dis";
        this.p_controls.className = "dhx_upload_controls dhx_uploader_dis";
    }

    this.getStatus = function () {
        // 0 - filelist is empty
        // 1 - all files in filelist uploaded
        //-1 - not all files uploaded
        var t = 0;
        for (var a in this._files) {
            if (this._files[a].state != "uploaded") return -1;
            t = 1;
        }
        return t;
    }

    this.getData = function () {
        // return struct of uploaded files
        return this._data;
    }

    this.clear = function () {
        if (this.callEvent("onBeforeClear", []) !== true) return;
        if (this._uploading) that._uploadStop();
        that._switchButton(false);
        that._removeFilesByState(true);
        this.callEvent("onClear", []);
    }

    this.unload = function () {

        // remove all files from queue/list
        this._removeFilesByState(true);
        this._data = null;
        this._files = null;
        this._items = null;

        // custom engine stuff
        this._unloadEngine();

        // buttons
        for (var a in this.buttons) {
            this.buttons[a].onclick = null;
            this.buttons[a].parentNode.removeChild(this.buttons[a]);
            this.buttons[a] = null;
            delete this.buttons[a];
        }
        this.buttons = null;

        // buttons settings
        for (var a in this.b_opts) {
            this.b_opts[a].onclick = null;
            this.b_opts[a] = null;
            delete this.b_opts[a];
        }
        this.b_opts = null;

        this.p_controls.parentNode.removeChild(this.p_controls);
        this.p_files.parentNode.removeChild(this.p_files);

        // main container
        this.p.className = this.p.className.replace(/dhx_file_uploader_title/gi, "").replace(/dhx_file_uploader/gi, "");

        for (var a in this) this[a] = null;

        that = a = null;

    }

    // init engine-relative funcs
    var e = new this[this.engine]();
    for (var a in e) { this[a] = e[a]; e[a] = null; }
    a = e = p = null;

    // init app
    this._initToolbar();
    this._initEngine();
    this._checkTitleScreen();

    return this;

}

// html5 engine

dhtmlXFileUpload.prototype.html5 = function () { };

dhtmlXFileUpload.prototype.html5.prototype = {

    _initEngine: function () {

        var that = this;
        this.buttons["browse"].onclick = function () {
            if (that._enabled) that.f.click();
        }

        this._progress_type = "percentage";

        // Safari on Windows sometimes have problem with multiple file selections
        // file length set to zero, do not allow multiple file selecting
        // d-n-d seems works fine

        var k = window.navigator.userAgent;
        if (k.match(/Windows/gi) != null && k.match(/AppleWebKit/gi) != null && k.match(/Safari/gi) != null) {
            if (k.match(/Version\/5\.1\.5/gi)) this._upload_mp = false;
            if (k.match(/Version\/5\.1[^\.\d{1,}]/gi)) this._upload_dnd = false;
            if (k.match(/Version\/5\.1\.1/gi)) {
                this._upload_mp = false;
                this._upload_dnd = false;
            }
            if (k.match(/Version\/5\.1\.2/gi)) this._upload_dnd = false;
            if (k.match(/Version\/5\.1\.7/gi)) this._upload_mp = false;
        }

        // "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8"	// ok, no dnd
        // "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5"	// ok, no dnd
        // "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4"	// ok, no dnd
        // "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27"	// ok, no dnd
        // "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-EN) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"	// ok, no dnd
        // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50"				// ok, dnd partialy fail, disabled
        // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22"			// multiple files add - fail, dnd partialy fail, disabled
        // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7"			// ok, dnd partialy fail, disabled
        // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.54.16 (KHTML, like Gecko) Version/5.1.4 Safari/534.54.16"			// ok
        // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3"			// multiple files add - fail
        // "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"			// dnd - ok, multiselect - fail (Windows 8)

        // input
        this._addFileInput();

        // dnd
        if (this._upload_dnd) {

            this.p.ondragenter = function (e) {
                if (!e.dataTransfer) return;
                e.stopPropagation();
                e.preventDefault();
            }
            this.p.ondragover = function (e) {
                if (!e.dataTransfer) return;
                e.stopPropagation();
                e.preventDefault();
            }
            this.p.ondrop = function (e) {
                if (!e.dataTransfer) return;
                e.stopPropagation();
                e.preventDefault();
                if (that._enabled) that._parseFilesInInput(e.dataTransfer.files);
            }

            this._titleText = "Drag-n-Drop files here or<br>click to select files for upload.";

        } else {
            this._titleText = "Click to select files for upload.";
        }
    },

    _addFileInput: function () {

        // complete input reload, opera needs
        if (this.f != null) {
            this.f.onchange = null;
            this.f.parentNode.removeChild(this.f);
            this.f = null;
        }

        var that = this;

        this.f = document.createElement("INPUT");
        this.f.type = "file";

        if (this._fileType == "image") {
            this.f.accept = "image/gif,image/jpeg,image/jpg,image/png";
        }

        if (this._upload_mp) this.f.multiple = "1";
        this.f.className = "dhx_uploader_input";
        this.p_controls.appendChild(this.f);

        this.f.onchange = function () {
            that._parseFilesInInput(this.files);
            //if (window.dhx4.isOpera) that._addFileInput(); else this.value = "";
            //mafei 20160115 修复同个文件上传一次后不能再次上传的问题
            that._addFileInput();
        }
    },

    _doUploadFile: function (id) {

        var that = this;

        if (!this._loader) {
            this._loader = new XMLHttpRequest();
            this._loader.upload.onprogress = function (e) {
                if (that._files[this._idd].state == "uploading") that._updateFileInList(this._idd, "uploading", Math.round(e.loaded * 100 / e.total));
            }
            this._loader.onload = function (e) {
                dhx4.temp = null;
                try { eval("dhx4.temp=" + this.responseText); } catch (e) { };
                var r = dhx4.temp;
                dhx4.temp = null;
                if (typeof (r) == "object" && r != null && typeof (r.isSucceed) != "undefined" && r.isSucceed == true) {
                    that._onUploadSuccess(this.upload._idd, r.data[0].name, null);
                    r = null;
                } else {
                    that._onUploadFail(this.upload._idd, (r != null && r.extra != null ? r.extra : null));
                }

            }
            this._loader.onerror = function (e) {
                that._onUploadFail(this.upload._idd);
            }
            this._loader.onabort = function (e) {
                that._onUploadAbort(this.upload._idd);
            }
        }

        this._loader.upload._idd = id;

        var form = new FormData();
        form.append("file", this._files[id].file);
        if (this.ruleJson && this.fldtJson) {
            form.append(this.ruleJson["key"], this.ruleJson["value"]);
            form.append(this.fldtJson["key"], this.fldtJson["value"]);
        }
        //this._loader.open("POST", this._url+(String(this._url).indexOf("?")<0?"?":"&")+"mode=html5&dhxr"+new Date().getTime(), true);
        this._loader.open("POST", this._url + (String(this._url).indexOf("?") < 0 ? "?" : "&") + "mode=html5&isWdk=" + this.isWdk + (this.uploadPath ? ("&uploadPath=" + escape(this.uploadPath)) : "") + "&dhxr" + new Date().getTime(), true);
        this._loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        //this._loader.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this._loader.send(form);
        //mafei 20160115为了修复上传一次后不能再次上传的问题暂时去掉
        // if (this.ruleJson) this.ruleJson = null;
    },

    _uploadStop: function () {
        if (!this._uploading || !this._loader) return;
        this._loader.abort();
    },

    _parseFilesInInput: function (f) {
        for (var q = 0; q < f.length; q++) this._addFileToQueue(f[q]);
    },

    _addFileToQueue: function (f) {
        if (!this._beforeAddFileToList(f.name, f.size)) return;
        var id = (f._idd || window.dhx4.newId());
        this._files[id] = { file: f, name: f.name, size: f.size, state: "added" };
        this._addFileToList(id, f.name, f.size, "added", 0);
        if (this._autoStart && !this._uploading) this._uploadStart(true);
    },

    _removeFileFromQueue: function (id, callBeforeFileRemove) {

        if (!this._files[id] || this._files[id].storageState=="delete") return;

        var name = this._files[id].name;
        var serverName = (this._data != null && this._data[id] != null ? this._data[id].serverName : null);

        if (callBeforeFileRemove !== false) {
            if (this.callEvent("onBeforeFileRemove", [name, serverName]) !== true) return;
        }
        
        var k = false;
        if (this._uploading && id == this._loader.upload._idd && this._files[id].state == "uploading") {
            this._uploadStop();
            k = true;
        }
        var timeStamp = this._files[id].timestamp;

        if (this._files[id].server) {
            this._files[id].storageState = "delete";
        }
        else {
            this._files[id].file = null;
            this._files[id].name = null;
            this._files[id].size = null;
            this._files[id].state = null;
            this._files[id] = null;
            delete this._files[id];
        }


        var dataID = this._items[id].dataID;
        this._removeFileFromList(id);

        this.callEvent("onFileRemove", [name, serverName, this.id, dataID, timeStamp]);

        if (k) this._uploadStart();

    },

    _unloadEngine: function () {

        this.buttons["browse"].onclick = null;

        this.f.onchange = null;
        this.f.parentNode.removeChild(this.f);
        this.f = null;

        this.p.ondragenter = null;
        this.p.ondragover = null;
        this.p.ondrop = null;

        if (this._loader) {
            this._loader.upload.onprogress = null;
            this._loader.onload = null;
            this._loader.onerror = null;
            this._loader.onabort = null;
            this._loader.upload._idd = null;
            this._loader = null;
        }

        this._initEngine = null;
        this._doUploadFile = null;
        this._uploadStop = null;
        this._parseFilesInInput = null;
        this._addFileToQueue = null;
        this._removeFileFromQueue = null;
        this._unloadEngine = null;

    }

};

// html4 engine

dhtmlXFileUpload.prototype.html4 = function () { };

dhtmlXFileUpload.prototype.html4.prototype = {

    _initEngine: function () {

        this._addForm();
        this._progress_type = "loader";

        this._titleText = "Click button<br>to select files for upload.";
    },

    _addForm: function () {

        var that = this;
        var id = window.dhx4.newId();

        if (!this.k) {

            this.k = document.createElement("DIV");
            this.k.className = "dhx_file_form_cont";
            this.buttons["browse"].appendChild(this.k);

            this.fr_name = "dhx_file_" + window.dhx4.newId();
            this.k.innerHTML = '<iframe name="' + this.fr_name + '" style="height:0px;width:0px;" frameBorder="0"></iframe>';

            this.fr = this.k.firstChild;

            if (window.navigator.userAgent.indexOf("MSIE") >= 0) {
                this.fr.onreadystatechange = function () {
                    if (this.readyState == "complete") that._onLoad();
                }
            } else {
                this.fr.onload = function () {
                    that._onLoad();
                }
            }

        }

        var f = document.createElement("DIV");
        /*f.innerHTML = "<form method='POST' enctype='multipart/form-data' target='"+this.fr_name+"' class='dhx_file_form' name='dhx_file_form_"+window.dhx4.newId()+"'>"+
				"<input type='hidden' name='mode' value='html4'>"+
				"<input type='hidden' name='uid' value='"+id+"'>"+
				"<input type='file' name='file' class='dhx_file_input'>"+
				"</form>";
                */
        //mafei 20150901 add rulejson and fldtjson field
        if (!this.ruleJson) {
            this.ruleJson = {};
            this.ruleJson["value"] = "{}";
        }
        if (!this.fldtJson) {
            this.fldtJson = {};
            this.fldtJson["value"] = "{}";
        }
        f.innerHTML = "<form method='POST' enctype='multipart/form-data' target='" + this.fr_name + "' class='dhx_file_form' name='dhx_file_form_" + window.dhx4.newId() + "'>" +
				"<input type='hidden' name='mode' value='html4'>" +
				"<input type='hidden' name='uid' value='" + id + "'>" +
                "<input type='hidden' name='rulejson' value='" + this.ruleJson["value"] + "'>" +
                "<input type='hidden' name='fldtjson' value='" + this.fldtJson["value"] + "'>" +
                "<input type='file' name='file' class='dhx_file_input'>" +
				"</form>";

        this.k.appendChild(f);

        f.firstChild.lastChild._idd = id;

        f.firstChild.lastChild.onchange = function () {
            if (!that._beforeAddFileToList(this.value, null)) return;
            that._addFileToQueue(this);
            this.onchange = null;
            this.parentNode.parentNode.style.display = "none";
            that._addForm();
        }

        f = null;
    },

    _onLoad: function () {
        if (this._uploading) {
            dhx4.temp = null;
            try { eval("dhx4.temp=" + this.fr.contentWindow.document.body.innerHTML); } catch (e) { };
            var r = dhx4.temp;
            dhx4.temp = null;
            //this.fr.contentWindow.document.body.innerHTML = "";
            if (typeof (r) == "object" && r != null) {
                if (typeof (r.state) != "undefined") {
                    if (r.state == "cancelled") {
                        this._onUploadAbort(this.fr._idd);
                        r = null;
                        return;
                    } else if (r.state == true) {
                        if (typeof (r.size) != "undefined" && !isNaN(r.size)) this._files[this.fr._idd].size = r.size;

                        //this._onUploadSuccess(this.fr._idd, r.name, null, r.extra);
                        //mafei 20150901
                        this._onUploadSuccess(this.fr._idd, r.name, null, r);
                        r = null;
                        return;
                    }
                }
            }
            this._onUploadFail(this.fr._idd, (r != null && r.extra != null ? r.extra : null));
        }

    },

    _addFileToQueue: function (t) {
        var v = t.value.match(/[^\\\/]*$/g);
        if (v[0] != null) v = v[0]; else v = t.value;
        //
        this._files[t._idd] = { name: v, form: t.parentNode, node: t.parentNode.parentNode, input: t, state: "added" };
        this._addFileToList(t._idd, t.value, false, "added", 0);
        if (this._autoStart && !this._uploading) this._uploadStart(true);
    },

    _removeFileFromQueue: function (id, callBeforeFileRemove) {

        var name = this._files[id].name;
        var serverName = (this._data != null && this._data[id] != null ? this._data[id].serverName : null);

        if (callBeforeFileRemove !== false) {
            if (this.callEvent("onBeforeFileRemove", [name, serverName]) !== true) return;
        }
        var timeStamp = this._files[id].timestamp;
        if (this._files[id].server) {
            this._files[id].storageState = "delete";
        }
        else {
            this._files[id].input.onchange = null;
            this._files[id].form.removeChild(this._files[id].input);
            this._files[id].node.removeChild(this._files[id].form);
            this._files[id].node.parentNode.removeChild(this._files[id].node);
            this._files[id].input = null;
            this._files[id].name = null;
            this._files[id].form = null;
            this._files[id].node = null;
            this._files[id].size = null;
            this._files[id].state = null;
            this._files[id] = null;
            delete this._files[id];
        }

        var dataID = this._items[id].dataID;
        this._removeFileFromList(id);

        this.callEvent("onFileRemove", [name, serverName, this.id, dataID, timeStamp]);
    },

    _doUploadFile: function (id) {

        this.fr._idd = id;
        this._files[id].form.action = this._url;
        //mafei 20150901 add rulejson and fldtjson field
        if (this.ruleJson) {
            if (this._files[id].form[2].name == "rulejson")
                this._files[id].form[2].value = this.ruleJson["value"];
        }
        if (this.fldtJson) {
            if (this._files[id].form[3].name == "fldtjson")
                this._files[id].form[3].value = this.fldtJson["value"];
        }
        this._files[id].form.submit();
    },

    _uploadStop: function () {
        if (!this._uploading) return;
        this.fr.contentWindow.location.href = (this._url) + (this._url.indexOf("?") < 0 ? "?" : "&") + "mode=html4&isWdk=" + this.isWdk + (this.uploadPath ? ("&uploadPath=" + escape(this.uploadPath)) : "") + "&action=cancel&dhxr" + new Date().getTime();
    },

    _unloadEngine: function () {

        if (this.k) {

            this.fr_name = null;
            this.fr.onreadystatechange = null;
            this.fr.onload = null;
            this.fr.parentNode.removeChild(this.fr);
            this.fr = null;

            // remove empty form
            this.k.firstChild.firstChild.lastChild.onchange = null;

            this.k.parentNode.removeChild(this.k);
            this.k = null;

        }

        this._initEngine = null;
        this._addForm = null;
        this._onLoad = null;
        this._addFileToQueue = null;
        this._removeFileFromQueue = null;
        this._doUploadFile = null;
        this._uploadStop = null;
        this._unloadEngine = null;

    }

};


dhtmlXFileUpload.prototype.flash = function () { };

dhtmlXFileUpload.prototype.flash.prototype = {

    _initEngine: function () {

        if (!window.dhtmlXFileUploaderSWFObjects) {
            window.dhtmlXFileUploaderSWFObjects = {
                items: {},
                callEvent: function (id, name, params) {
                    //console.log(arguments)

                    return window.dhtmlXFileUploaderSWFObjects.items[id].uploader[name].apply(window.dhtmlXFileUploaderSWFObjects.items[id].uploader, params);
                }
            };
        }

        var that = this;

        this._swf_obj_id = "dhtmlXFileUploaderSWFObject_" + window.dhx4.newId();
        this._swf_file_url = this._swf_file_url + (this._swf_file_url.indexOf("?") >= 0 ? "&" : "?") + "dhxr" + new Date().getTime();
        this.buttons["browse"].innerHTML = "<div id='" + this._swf_obj_id + "' style='width:100%;height:100%;'></div>";

        swfobject.embedSWF(this._swf_file_url, this._swf_obj_id, "100%", "100%", "9", null, { ID: this._swf_obj_id, enableLogs: this._swf_logs }, { wmode: "transparent" });

        var v = swfobject.getFlashPlayerVersion();
        this._titleText = "Engine successfuly inited<br>Flash Player: " + v.major + "." + v.minor + "." + v.release;

        this._progress_type = "percentage";

        window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id] = { id: this._swf_obj_id, uploader: this };
    },

    _beforeAddFileToQueue: function (name, size) {
        return (this.callEvent("onBeforeFileAdd", [name, size]) === true);
    },

    _addFileToQueue: function (id, name, size) {
        if (window.dhx4.isIE) {
            // focus+hide fix for IE
            var k = document.createElement("INPUT");
            k.type = "TEXT";
            k.style.position = "absolute";
            k.style.left = "0px";
            k.style.top = window.dhx4.absTop(this.buttons["browse"]) + "px";
            k.style.width = "10px";
            document.body.appendChild(k);
            k.focus();
            document.body.removeChild(k);
            k = null;
        }
        this._files[id] = { name: name, size: size, state: "added" };
        this._addFileToList(id, name, size, "added", 0);
        if (this._autoStart && !this._uploading) this._uploadStart(true);
    },

    _removeFileFromQueue: function (id, callBeforeFileRemove) {

        if (!this._files[id]) return;

        var name = this._files[id].name;
        var serverName = (this._data != null && this._data[id] != null ? this._data[id].serverName : null);

        if (callBeforeFileRemove !== false) {
            if (this.callEvent("onBeforeFileRemove", [name, serverName]) !== true) return;
        }

        var k = false;
        if (this._uploading && this._files[id].state == "uploading") {
            this._uploadStop();
            k = true;
        }

        swfobject.getObjectById(this._swf_obj_id).removeFileById(id);

        var timeStamp = this._files[id].timestamp;
        if (this._files[id].server) {
            this._files[id].storageState = "delete";
        }
        else {
            this._files[id].name = null;
            this._files[id].size = null;
            this._files[id].state = null;
            this._files[id] = null;
            delete this._files[id];
        }

        var dataID = this._items[id].dataID;
        this._removeFileFromList(id);

        this.callEvent("onFileRemove", [name, serverName, this.id, dataID, timeStamp]);

        if (k) this._uploadStart();

    },

    _doUploadFile: function (id) {

        swfobject.getObjectById(this._swf_obj_id).upload(id, this._swf_upolad_url);

    },

    _uploadStop: function (id) {
        for (var a in this._files) if (this._files[a].state == "uploading") swfobject.getObjectById(this._swf_obj_id).uploadStop(a);
    },

    _unloadEngine: function () {

        // remove instance from global storage

        if (window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id]) {
            window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id].id = null;
            window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id].uploader = null;
            window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id] = null
            delete window.dhtmlXFileUploaderSWFObjects.items[this._swf_obj_id];
        }

        this._swf_obj_id = null;

        this._initEngine = null;
        this._addFileToQueue = null;
        this._removeFileFromQueue = null;
        this._doUploadFile = null;
        this._uploadStop = null;
        this._unloadEngine = null;
    }

};

dhtmlXFileUpload.prototype.sl = function () { };

dhtmlXFileUpload.prototype.sl.prototype = {

    _initEngine: function () {

        if (typeof (this._sl_v) == "undefined") this._sl_v = this.getSLVersion();

        if (!window.dhtmlXFileUploaderSLObjects) {
            window.dhtmlXFileUploaderSLObjects = {
                items: {},
                callEvent: function (id, name, params) {
                    //console.log(arguments)
                    window.dhtmlXFileUploaderSLObjects.items[id].uploader[name].apply(window.dhtmlXFileUploaderSLObjects.items[id].uploader, params);
                }
            };
        }

        //var that = this;

        this._sl_obj_id = "dhtmlXFileUploaderSLObject_" + window.dhx4.newId();

        if (this._sl_v != false) {
            this._titleText = "Engine successfuly inited<br>Silverlight version: " + this._sl_v[0] + "." + this._sl_v[1];
            this.buttons["browse"].innerHTML = '<div style="width:100%;height:100%;">' +
									'<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" id="' + this._sl_obj_id + '">' +
										'<param name="source" value="' + this._sl_xap + '"/>' +
										'<param name="background" value="Transparent"/>' +
										'<param name="windowless" value="true"/>' +
										'<param name="initParams" value="SLID=' + this._sl_obj_id + ',LOGS=' + this._sl_logs + '"/>' +
										'<param name="minRuntimeVersion" value="5.0"/>' +
									'</object>' +
								'</div>';
        } else {
            this._titleText = "Silverlight plugin not found<br>or version less than 4.0";
            this.buttons["browse"].style.cursor = "wait";
            this.buttons["browse"].title = "";
        }

        this._progress_type = "percentage";

        window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id] = { id: this._sl_obj_id, uploader: this };
    },

    _addFileToQueue: function (id, name, size) {
        this._files[id] = { name: name, size: size, state: "added" };
        this._addFileToList(id, name, size, "added", 0);
        if (this._autoStart && !this._uploading) this._uploadStart(true);
    },

    _removeFileFromQueue: function (id) {
        if (!this._files[id]) return;

        var k = false;
        if (this._uploading && this._files[id].state == "uploading") {
            this._uploadStop();
            k = true;
        }

        document.getElementById([this._sl_obj_id]).Content.a.removeFileById(id);

        if (this._files[id].server) {
            this._files[id].storageState = "delete";
        }
        else {
            this._files[id].name = null;
            this._files[id].size = null;
            this._files[id].state = null;
            this._files[id] = null;
            delete this._files[id];
        }

        this._removeFileFromList(id);

        if (k) this._uploadStart();

    },

    _doUploadFile: function (id) {
        document.getElementById(this._sl_obj_id).Content.a.upload(id, this._sl_upload_url, "&mode=sl&isWdk=" + this.isWdk + (this.uploadPath ? ("&uploadPath=" + escape(this.uploadPath)) : "") + "&dhxr" + new Date().getTime()); // leading "&" required!
    },

    _uploadStop: function (id) {
        this._uploading = false;
        for (var a in this._files) if (this._files[a].state == "uploading") document.getElementById(this._sl_obj_id).Content.a.uploadStop(a);
    },

    _unloadEngine: function () {

        // remove instance from global storage

        if (window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id]) {
            window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id].id = null;
            window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id].uploader = null;
            window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id] = null
            delete window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id];
        }

        this._sl_obj_id = null;

        this._initEngine = null;
        this._addFileToQueue = null;
        this._removeFileFromQueue = null;
        this._doUploadFile = null;
        this._uploadStop = null;
        this._unloadEngine = null;
    }

};

dhtmlXFileUpload.prototype.setValue = function (val) {
    this.val = val;
    this.addItems();
};

dhtmlXFileUpload.prototype.setSLURL = function (url) {
    this._sl_upload_url = url;
};

dhtmlXFileUpload.prototype.getSLVersion = function () {
    var v = false;
    if (window.dhx4.isIE) {
        try {
            var t = new ActiveXObject('AgControl.AgControl');
            if (t != null) {
                // loop through [4-x, 0-9] until supported
                var k1 = 4, k2 = 0;
                while (t.isVersionSupported([k1, k2].join("."))) {
                    v = [k1, k2];
                    if (++k2 > 9) { k1++; k2 = 0; }
                }
            }
            t = null;
        } catch (e) { };
    } else {
        if (navigator.plugins["Silverlight Plug-In"] != null) {
            v = navigator.plugins["Silverlight Plug-In"].description.split(".");
        }
    }
    return v;
};