/*
filename：dhtmlxgrid_excell_hwupload.js
creater：刘志伟
date created：2016.11.19
description：上传组件
date modified：2018.07.09
modifier：刘志伟
version：2.3.12.0711
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/
function eXcell_vmdupload(cell) {
    var that = this;
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
        this.hwReport = this.grid.hwReport;

        var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
        var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
        this.cell.style.padding = "0px";

        this.hwReport.uploadCells = this.hwReport.uploadCells || {};
        this.hwReport.uploadCells[cell.parentNode.idd + "_" + cell._cellIndex] = cell;

        if (!this.hwReport.upload_onReportRendered_id) {
            this.hwReport.upload_onReportRendered_id = this.hwReport.attachEvent("onRendered", function () {
                for (var item in that.hwReport.uploadCells) {
                    var td = that.hwReport.uploadCells[item];
                    if(!td._uploader){
						td._uploader = that.grid._uploader_render(td);
                        td._uploader.doLayout();
					}
                }
            });
        }
    }

    window.dhx4._eventable(this);
    this.isDisabled = function () {
        return true;
    }

    //设置值
    this.setValue = function (val) {
        this.cell._val = val;
        if (this.cell._uploader) {
            this.cell._uploader.setValue(val);
        }else{
            this.cell._uploader = that.grid._uploader_render( this.cell);
           this.cell._uploader.doLayout();
        }
        //this.cell.uploader = this.initUpload(this.cell.parentNode.idd, this.cell._cellIndex, this._dataIndex, this.cell.offsetWidth);
        //this.cell.uploader.setValue(val);
    }

    this.getValue = function (key) {
        var cell = this.cell;
        var uploader = cell._uploader;
        var uploadValue="";
        if (key) {
            if (uploader) {
                if (uploader._files) {
                    uploadValue= this.getUploadValue(uploader._files,key);
                }
            }
        }
        else{
            uploadValue="";
        }
        return uploadValue;
    }

    this.getUploadValue=function(files,key){
        var upPath="";
        var upName="";
        var upId="";
        var upSize="";
        var upExt="";
        if(files){
            for(fileKey in files){
                var upFile=files[fileKey];
                upPath+=(upFile.path+",");
                upName+=(upFile.name+",");
                upId+=(upFile.id+",");
                upSize+=(upFile.size+",");
                if(upFile.name){
                    var extStr=upFile.name.substring(upFile.name.indexOf("."));
                    upExt+=(extStr+",");
                }
            }
        }
        switch (key) {
            case "path":
            if(upPath&&upPath.length>0){
               return upPath.substring(0,upPath.length-1);
            }
                break;
            case "name":
                if(upName&&upName.length>0){
                    return upName.substring(0,upName.length-1);
                }
                break;
            case "id":
                if(upId&&upId.length>0){
                    return upId.substring(0,upId.length-1);
                }
                break;
            case "size":
                if(upSize&&upSize.length>0){
                    return upSize.substring(0,upSize.length-1);
                }
                break;
            case "ext":
                if(upExt&&upExt.length>0){
                    return upExt.substring(0,upExt.length-1);
                }
                break;
        }
    }

    this.showProgress = function () {
        var uploadContainer = document.createElement("DIV");
        //对象id
        uploadContainer.id = "dhxgrid_upload_container";
        uploadContainer.className = "dhxgrid_file_uploader";
        uploadContainer.style.width = this.cell.offsetWidth + "px";
        uploadContainer.style.height = this.cell.offsetHeight + "px";

        this.cell.appendChild(uploadContainer);
    }

    this.hideController = function () {
            if (this.cell.controller) {
                this.cell.uploadContainer.removeChild(this.cell.controller);
                this.cell.controller = null;
            }
    },

    //删除文件
    this.hwuploadDel = function (docid) {
        document.getElementById(this.hwupload_rendStr(docid, "bm") + "_a").style.display = "none";
        document.getElementById(this.hwupload_rendStr(docid, "bm") + "_del").style.display = "none";
        var brrTmp = this.cell.val.split(',');
        this.lastVal = "";
        for (var i = 0; i < brrTmp.length; i++) {
            if (brrTmp[i].indexOf(docid) < 0) {
                this.lastVal += brrTmp[i] + ","
            }
        }
        this.lastVal = this.lastVal.substr(0, this.lastVal.length - 1);
        cellUpdate(this.cell, this.lastVal);
        this.cell.val = this.lastVal;
    }

    /*flag:flag=bm表示要求返回编码；flag==mc表示要求返回名称*/
    this.hwupload_rendStr = function (str, flag) {
        if (flag == "bm") {
            if (str)
                return str.substr(0, str.indexOf(':'))
            else
                return null;
        }

        if (flag == "mc") {
            if (str)
                return str.substr(str.indexOf(':') + 1, str.length)
            else
                return null;
        }
    }
}
eXcell_vmdupload.prototype = new eXcell;

eXcell_vmdupload.prototype.getCellUploader = function () {
    return this.cell._uploader;
};

/*初始化上传控件 */
dhtmlXGridObject.prototype._uploader_render = function (cell) {

    var that = this;
    cell._attrs['title'] = " ";

    var oCell = this.hwReport.getOriginCellById(cell._attrs.sid);
    var cellType = this.hwReport.cellTypes.get(oCell.fillcelltype);
    var isWdk = cellType.wordMode;
    var isShowAll = !oCell.data && !oCell.datavalue; //如果单元格中不绑定字段，则显示所有查询出来的文件

    //上传控件对象
    var uploadContainer = document.createElement("DIV");
    uploadContainer.id = "dhxgrid_upload_container";
    uploadContainer.className = "dhxgrid_file_uploader";
    cell.appendChild(uploadContainer);

    var dataHost = vmd.MicService.getDasIp();
    var hwFao = new HwFao(dataHost, "wdk");//地址:端口和存储标识(服务管理员分配)
    var wdkHost = (vmd.projectInfo && vmd.projectInfo.docIp) || "";
    var callCode = "vmdcode";
    var uploadUrl = isWdk ? hwFao.getWdkUploadUrl(wdkHost, callCode, "") : hwFao.getUploadUrl("");

    if (isWdk && !wdkHost) {
        Ext.Msg.show({
            title: "提示",
            msg: "配置文档库上传后需配置文档中心！",
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    }

    var uploader = new dhtmlXFileUpload(uploadContainer, {
        swfPath: this.hwReport.dhtmxlUrl + "/lib/dhtmlx/sources/dhtmlxFileUpload/codebase/uploader.swf",
        flashPath: this.hwReport.dhtmxlUrl + "/lib/dhtmlx/sources/dhtmlxFileUpload/codebase/flashplayerpp_install_cn.zip",
        swfUrl: uploadUrl,
        swfLogs: "enabled",
        fileType: cellType.filetype,
        numPerPage: parseInt(cellType.pageexp),
        cols: parseInt(cellType.colexp),
        showmode: cellType.showmode,
        isShowAll: isShowAll,
        dataHost: dataHost, //查询上传服务时用到的地址
        wdkHost: wdkHost
    });
    uploader.val = cell._val;
    uploader.cellObj = this;
    uploader.grid = this.grid;
    uploader.enableTitleScreen(false);
    uploader.setURL(uploadUrl);
    uploader.setIsWdk(isWdk);
    uploader.setAutoStart(true);
    uploader.setDeletable(cellType.delete == "0" ? false : true);
    uploader.setAddable(cellType.add == "0" ? false : true);
    uploader.setInfoable(false);
    uploader.setUploadable(false);
    uploader.setCancelable(false);

    var rptStore = cellType.bindsource && cellType.bindsource.tablename && this.hwReport.getQueryStoreByName(cellType.bindsource.tablename);
    if (rptStore && rptStore.dhtmlxDatastore) {
        uploader.sync(rptStore.dhtmlxDatastore, {
            name: cellType.bindsource.filename && cellType.bindsource.filename.toLowerCase(),
            path: cellType.bindsource.filepath && cellType.bindsource.filepath.toLowerCase(),
            docid: cellType.bindsource.docid && cellType.bindsource.docid.toLowerCase(),
            size: cellType.bindsource.filesize && cellType.bindsource.filesize.toLowerCase(),
            ext: cellType.bindsource.fileext && cellType.bindsource.fileext.toLowerCase(),
            mode: cellType.wordMode
        }, this);
    }

    //if (cellType.upmaxnum == 1) {
    //    uploader.buttons["browse"].style.right = "20px";
    //    uploader.p_controls.style.width = "60px";
    //    uploader.p_controls.style.right = "60px";
    //    uploader.buttons["clear"].style.display = "none";
    //}

    //uploader.callEvent = function (evName, evData) {
    //    return that.callEvent(evName, evData);
    //}

    uploader.attachEvent("onBeforeFileAdd", function (name, size) {
        var fileID;
        var maxAccessUploadFile = parseInt(cellType.upmaxnum);
        var serverFileCount = 0;
        for (fileID in uploader._files) {
            if (uploader._files[fileID].server && uploader._files[fileID].storageState != "delete") {
                serverFileCount++;
            }
        }
        if (serverFileCount >= maxAccessUploadFile) {
            Ext.Msg.show({
                title: "提示",
                msg: "文件最多允许上传" + maxAccessUploadFile + "个，已存在文件数量为" + serverFileCount + "个，无法继续添加！",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            return false;
        }

        uploader.showProgress();
        return true;
    });

    uploader.attachEvent("onBeforeFileRemove", function (name, size) {
        if (confirm("是否删除文件\"" + name + "\"？")) {
            return true;
        }
        return false;
    });

    uploader.attachEvent("onImgClick", function (file) {
        var picviewPath = vmd.virtualPath + "/report/picview/index.html";
        var path = file.path.indexOf("http://") == -1 ? ("http://" + dataHost.replace("http://", "") + "/wdk/" + file.path) : file.path;
        var path = path.replace("/thumbnail/", "/");
        window.open(path, "_blank");
    });

    //this.attachEvent("onFileAdd", function (id, name, fileID) {
    //    cell.parentNode.style.height = (uploader.p_files.offsetHeight) + "px";
    //    var grid = uploader.grid;
    //    grid.setSizes();
    //});

    uploader.attachEvent("onFileRemove", function (name, serverName, id, dataID, timeStamp) {
        uploader.doLayout();

        var oldFiles = [];
        for (fileID in uploader._oldFiles) {
            var file = uploader._oldFiles[fileID];
            oldFiles.push({
                path: file.path,
                name: file.name,
                id: file.id,
                size: file.size,
                ext: file.ext||(file.name&&file.name.substring(file.name.indexOf("."))),
                state: file.storageState
            });
        }

        // 添加或者删除上传文件，获取文件信息
        var newFiles = [];
        uploader._oldFiles = {};
        for (fileID in uploader._files) {
            var file = uploader._files[fileID];
            uploader._oldFiles[fileID] = dhx4._copyObj(file);
            newFiles.push( {
                path: file.path,
                name: file.name,
                id: file.id,
                size: file.size,
                ext: file.ext||(file.name&&file.name.substring(file.name.indexOf("."))),
                state: file.storageState
            });
        }
        if (uploader._delFiles) {
            for (fileID in uploader._delFiles) {
                var file = uploader._delFiles[fileID];
                newFiles.push({
                    path: file.path,
                    name: file.name,
                    id: file.id,
                    size: file.size,
                    ext: file.ext||(file.name&&file.name.substring(file.name.indexOf("."))),
                    state: file.storageState
                });
            }
        }

        that.grid.callEvent("onCellChanged", [
                cell.parentNode.idd,
                cell._cellIndex,
                newFiles
        ]);

        that.grid.callEvent("onEditCell", [
            2,
            cell.parentNode.idd,
            cell._cellIndex,
            newFiles,
            oldFiles
        ]);
    });

    //上传成功的回调函数
    uploader.attachEvent("onUploadFile", function (name, serverName, extra, t, response, id, fileID) {
        //解析返回的文本
        var fileID;

        uploader.hideProgress();
        var response = eval('(' + response + ')');
        var result = response.data[0];
        var file = uploader._files[fileID];
        file.absPath = result.absolutePath;
        file.relativePath = result.relativePath;
        file.path = result.path;
        file.id = result.docid;

        var maxAccessUploadFile = parseInt(cellType.upmaxnum);
        var fileCount = uploader._getAddFileCount();

        //如果上传文件超过最大允许上传数，则将最早上传的文件删除
        if (fileCount > maxAccessUploadFile) {
            var firstFileID = null;
            for (fileID in uploader._files) {
                if (!uploader._files[fileID].server) {
                    if (firstFileID) {
                        var firstFile = uploader._files[firstFileID];
                        if (firstFile.timestamp > uploader._files[fileID].timestamp) {
                            firstFileID = fileID;
                        }
                    }
                    else {
                        firstFileID = fileID;
                    }
                }
            }
            if (firstFileID) {
                uploader._items[firstFileID].parentNode.removeChild(uploader._items[firstFileID]);
                delete uploader._files[firstFileID];
                delete uploader._items[firstFileID];
                fileCount = maxAccessUploadFile;
            }
        }

        if (uploader.checkAllUpload()) {

            uploader.doLayout();

            var oldFiles = [];
            for (fileID in uploader._oldFiles) {
                var file = uploader._oldFiles[fileID];
                oldFiles.push({
                    path: file.path,
                    name: file.name,
                    id: file.id,
                    size: file.size,
                    ext: file.name.substring(file.name.indexOf(".")),
                    state: file.storageState
                });
            }

            // 添加或者删除上传文件，获取文件信息
            var newFiles = [];
            uploader._oldFiles = {};
            for (fileID in uploader._files) {
                var file = uploader._files[fileID];
                uploader._oldFiles[fileID] = dhx4._copyObj(file);
                newFiles.push({
                    path: file.path,
                    name: file.name,
                    id: file.id,
                    size: file.size,
                    ext: file.name.substring(file.name.indexOf(".")),
                    state: file.storageState
                });
            }

            if (uploader._delFiles) {
                for (fileID in uploader._delFiles) {
                    var file = uploader._delFiles[fileID];
                    newFiles.push({
                        path: file.path,
                        name: file.name,
                        id: file.id,
                        size: file.size,
                        ext: file.name.substring(file.name.indexOf(".")),
                        state: file.storageState
                    });
                }
            }

            that.grid.callEvent("onCellChanged", [
                      cell.parentNode.idd,
                      cell._cellIndex,
                      newFiles
            ]);

            that.grid.callEvent("onEditCell", [
                2,
                cell.parentNode.idd,
                cell._cellIndex,
                newFiles,
                oldFiles
            ]);

            that.grid.callEvent("uploadComplete", [that, response]);
        }

    });

    //文件上传失败时返回错误信息
    uploader.attachEvent("onUploadFail", function (a, b) {
        if (window.Ext) {
            Ext.Msg.show({
                title: "警告",
                msg: "上传" + a + "失败!",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        else {
            dhtmlx.alert({ title: "警告信息", ok: "确定", type: "alert-error", text: "上传" + a + "失败!" });
        }
    });

    //鼠标执行上传组件单元格时控制添加删除的显示与隐藏
    cell.onmouseover = function (e) {
        (e || event).cancelBubble = true;
        if (cell._disabled) {
            return;
        }
        if (uploader._deletable || uploader._addable) {
            uploader.p_controls.style.visibility = "visible";
        }
    }

    cell.onmouseout = function (e) {
        (e || event).cancelBubble = true;
        var toElement = (e || event).toElement;
        uploader.p_controls.style.visibility = "hidden";
    }
    return uploader;
}
