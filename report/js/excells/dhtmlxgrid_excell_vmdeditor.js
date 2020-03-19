dhx4.attachEvent("onGridCreated", function (grid) {
    if (!window.dhx_globalImgPath) window.dhx_globalImgPath = grid.imgURL;

    var hwReport = grid.hwReport;
    if (!hwReport) {
        return;
    }

    var hasThisType = false;
    hwReport.cellTypes.each(function (name, _cellType, index) {
        if (_cellType.getType() == "vmdeditor") {
            hasThisType = true;
        }
    });
    if (!hasThisType) {
        return;
    }
    var dataHost = vmd.MicService.getDasIp();
    var wdkHost = (vmd.projectInfo && vmd.projectInfo.docIp) || "";
    var isWdk = !!wdkHost;
    var hwFao = !isWdk?(new HwFao(dataHost, "vmd")):(new HwFao(wdkHost, "wdk"));//地址:端口和存储标识(服务管理员分配)
	
	//mafei
    var filepath = (vmd.previewMode ? "modules/" : "release/") + vmd.projectInfo.projectId + "/editorfile"
    var uploadUrl = hwFao.getUploadUrl(filepath);
	//如果是文档库？不需要传递项目路径
    //if(isWdk) uploadUrl= hwFao.getWdkUploadUrl(wdkHost, 'wdk', "file")
    if (!hwReport._ueditor) {
        var d = document.createElement("DIV");
        d.id = hwReport.reportId + "_ueditor";
        d.style.cssText = "position:absolute; top: -9999px;";
        d.className = "dhx_editor ";
        grid.objBox.appendChild(d);
        var URL = hwReport.dhtmxlUrl + "/lib/ueditor/"
        var ue = UE.getEditor(d.id, {
            isShow: false
            , UEDITOR_HOME_URL: URL
            , serverUrl: uploadUrl
            , theme: 'default'
            , themePath: URL + "themes/"
            , dialogPath: hwReport.dhtmxlUrl + "/lib/ueditor/themes/"
            , listiconpath : URL+'themes/ueditor-list/'
        });
        ue.addListener('afterexeccommand', function (type, cmd) {
            var cmds = ["paragraph", "fontfamily", "fontsize", "customstyle", "forecolor", "backcolor","imagefloat",
                "lineheight", "lineheight", "insertunorderedlist", "insertorderedlist", "inserttable","rowspacing", "anchor", "link"];
            if (cmds.indexOf(cmd) != -1) {
                var a = grid.editStop;
                grid.editStop = function () {
                    grid.editStop = a;
                };
            }
        });
        ue.on("dialogdragstop", function () {
            var a = grid.editStop;
            grid.editStop = function () {
                grid.editStop = a;
            };
        })
		
		//项目路径
		ue.filepath=filepath;
		ue.getBasePath=function(){
			if(isWdk){
				return 'http://'+wdkHost+'/wdk/'
			}else{
				return vmd.virtualPath+'/'
			}
		}
		
		ue.getDirs=function(allowfiles,succcallback,erorcallback){
			hwFao.getDirs(filepath,allowfiles,succcallback,erorcallback);
		}
        hwReport._ueditor = ue;
    }
});

function eXcell_vmdeditor(cell) {

    if (!cell) return;

    this.cell = cell;
    this.grid = cell.parentNode.grid;
    this.hwReport = this.grid.hwReport;
    this._combo_pre = "";

    this.isDisabled = function () {
        if (this.grid._disabled) {
            return true;
        }
        return this.cell._disabled;
    }

    this.edit = function () {
        var val = this.val = this.getValue();
        this.cell.innerHTML = "";
        this.cell.className = this.cell.className.replace(/editable/g, " ");
        this.cell.className += " " + this.hwReport.reportId + "-p-0";
        if (!/ueditor/g.test(this.cell.className)) {
            this.cell.className += " ueditor";
        }

        var ue = this.hwReport._ueditor;
        ue.setContent(val);
        ue.setPosition(this.cell.offsetLeft, this.cell.offsetTop);
        ue.setShow();
        ue.setWidth(this.cell.clientWidth - 2);
        ue.setHeight(this.cell.clientHeight - 2, false, true);
    }

    this.getValue = function () {
        return this.cell.innerHTML || "";
    }

    this.detach = function () {
        var ue = this.hwReport._ueditor;
        var content = ue.getContent();
        //this.cell.innerHTML = content;
        this.setCValue(content);
        this.cell.className = this.cell.className.replace(new RegExp(this.hwReport.reportId + "-p-0", "gi"), " ");
        ue.setHide();
    }
}

eXcell_vmdeditor.prototype = new eXcell;