Ext.define("vmd.ux.UploadComponent" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.UploadComponent",
	layoutConfig:{
		align:"top",
		pack:"start"
	},
	title:"Panel",
	header:false,
	border:false,
	width:840,
	layout:"hbox",
	afterrender:"UploadComponent_afterrender",
	autoHeight:true,
	listeners:{
		vmdafterrender:function(){
	this.UploadComponent_afterrender(this)
}
	},
	UpText:"附件：",
	uxCss:".file-sty{    margin: 13px 0 0 0;}.webuploader-pick {    position: relative;    display: inline-block;    cursor: pointer;    background: #00b7ee;    padding: 5px 10px !important;    color: #fff;    text-align: center;    border-radius: 3px;    overflow: hidden;}.item {    font-weight: 700;    text-align: left;    margin-left: 20px;    margin-top: 5px;    margin-bottom: 5px;    background:url() no-repeat 4px 5px;}",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			var docids = [];
var page = this;
var ip = vmd.workspace.dataServiceIp;

function UploadComponent_afterrender(sender) {
    label.el.setStyle('font-size', label.fonSize + "px");

    var serverurl = hwDas.getuploadurl("wdk", "");

    vmd.loadCss(vmd.virtualPath + '/lib/webuploader/webuploader.css');
    $LAB.script(vmd.virtualPath + '/lib/webuploader/webuploader.js')
        .wait(function() {
            var iconUploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                // swf文件路径
                swf: vmd.virtualPath + '/lib/webuploader/Uploader.swf',
                // 文件接收服务端url
                // server: "http://www.hanweikeji.com:6602/DasService/FileService/wdk/Down?FilePath=wdk&destName=''",
                server: serverurl,
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: {
                    id: '#filePicker',
                    multiple: true
                },

                fileSingleSizeLimit: 1 * 1024 * 1024, //限制大小1M，单文件
                // 只允许选择图片文件。
                accept: {
                    title: 'text',
                    extensions: 'pdf,doc,ppt,pptx,docx,xlsx,xls',
                    //mimeTypes: 'application/pdf,application/msword,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    mimeTypes: '.pdf,.doc,.ppt,.pptx,.docx,.xlsx,.xls'
                }
            });
            // 当有文件添加进来的时候
            iconUploader.on('fileQueued', function(file) {
                $('.uploader-list').css("display", "block"); //修改display属性为block
                var $list = $("#iconList");
                /*$list.html('');*/
                var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail" style="float:left;margin-right:10px;">' +
                    '<div class="info" style="font-weight: 700;text-align: left;margin-top: 0x;margin-bottom: 5px;margin-left: 5px;line-height: 30px;">' + file.name +
                    '&nbsp;<img id="img' + file.id + '" src="{资源中心&&资源中心服务器}/images/downLoad.gif"  style="float:right;"/>' +
                    '</div>' +
                    '<div class="progress"><div></div></div>' +
                    '</div>'
                );
                // $list为容器jQuery实例
                $list.append($li);
                page.fireEvent('uploadFinish', UploadComponent, 'test');

            });
            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            iconUploader.on('uploadSuccess', function(file, response) {
                var url = "platform/v1/doc";
                var hwDao = new HwDao(ip, 'webxpt'); //地址:端口和授权码(服务管理员分配)
                if(response.data.length > 0) {
                    //保存文件信息到文档库中
                    var fileInfo = response.data[0];
                    file.doctype = "TZGG"; //标识文档类型
                    file.docfilenamewithpath = fileInfo.path;
                    file.name = fileInfo.name;
                    file.size = fileInfo.size;
                    file.ext = fileInfo.extend;

                    var $li = $('#' + file.id),
                        $error = $li.find('div.success');
                    // 避免重复创建
                    if(!$error.length) {
                        $error = $('<div class="success" style="margin-left: 5px;"></div>').appendTo($li);
                    }
                    var doc = {
                        appid: file.appid,
                        docname: file.name,
                        docfilenamewithpath: file.docfilenamewithpath,
                        docfilesize: file.size,
                        doctype: file.doctype,
                        docext: file.ext //扩展名
                    };
                    hwDao.add(url, {}, {}, doc, function(docd) {
                        var docObj = {
                            path: docd.data[0].datas.docfilenamewithpath,
                            docid: docd.data[0].datas.docid,
                            docname: docd.data[0].datas.docname
                        }
                        //添加删除按钮
                        $("#img" + file.id).after("<a herf='#' style='text-decoration:none;color:red;cursor: pointer;' class='btnspan' onclick=delFile('" + file.id + "','" + docd.data[0].datas.docid + "')>删除</a>");
                        $("#img" + file.id).hide();

                        docids.push(docObj);


                    }, function(ert) {
                        $error.text('上传失败');
                    });
                }

            });

            // 文件上传失败，显示上传出错。
            iconUploader.on('uploadError', function(file) {
                var $li = $('#' + file.id),
                    $error = $li.find('div.error');

                // 避免重复创建
                if(!$error.length) {
                    $error = $('<div class="error" style="margin-left: 5px;"></div>').appendTo($li);
                }
                $error.text('上传失败');
            });
        })

}

window.delFile = function(id, docid) {
    $('#' + id).remove();
    for(var i = 0; i < docids.length; i++) {
        if(docids[i].docid == docid) {
            docids.splice(i, 1);
        }
    }
}


window.getDocId = function() {
    return docids;
}

window.SetUpDatas = function(param) {
    var $list = $("#iconList");
    $list.append(param);
    page.fireEvent('uploadFinish', UploadComponent, 'test');
}
			this.UploadComponent_afterrender=UploadComponent_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				layoutConfig:{
					align:"middle",
					pack:"start"
				},
				title:"Panel",
				header:false,
				border:true,
				height:29,
				width:58,
				layout:"hbox",
				autoHeight:true,
				items:[
					{
						xtype:"label",
						id:"label",
						text:this.UpText,
						width:56,
						height:23,
						style:"font-size:14px;",
						margins:"",
						fonSize:this.Upsize
					}
				]
			},
			{
				xtype:"panel",
				id:"panel1",
				title:"Panel",
				header:false,
				border:true,
				height:28,
				width:87,
				html:"<!--<input type=\"file\" name=\"fileField\" id='inputBox' multiple=\"multiple\" class=\"file-sty\" />--><div id=\"filePicker\" class=\"webuploader-container\" style=\"float: left;height:30px;padding-right: 8px;text-aligin:center;\">上传文件</div>",
				layout:"fit",
				autoScroll:false,
				autoHeight:false,
				margins:"0 0 0 0"
			},
			{
				xtype:"panel",
				id:"panel2",
				title:"Panel",
				header:false,
				border:true,
				width:694,
				autoScroll:false,
				html:"<div id=\"iconList\" class=\"uploader-list\"></div>",
				autoHeight:true
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getDocIds= function(){
//直接填写方法内容
getDocId();
return docids;
	}
		this.SetUpData= function(param){
//直接填写方法内容
SetUpDatas(param);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.UploadComponent");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.UploadComponent");
	}
})