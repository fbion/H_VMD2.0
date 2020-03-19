Ext.define("vmd.ux.NoticeEditor" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.NoticeEditor",
	title:"Panel",
	header:false,
	border:false,
	width:910,
	layout:"anchor",
	autoHeight:true,
	html:"<div class=\"container\">    <div class=\"content\">        <div class=\"title\">            <input class=\"inputstyle\" id=\"title\" type=\"text\" placeholder=\"请输入标题\" />        </div>        <div id=\"myEditor\">        </div>        <div id=\"iconList\" class=\"uploader-list\">        </div>        <div id=\"filePicker\" class=\"webuploader-container\" style=\"margin:20px 0 20px 0;float: left;height:30px;padding-right: 8px;text-aligin:center;\">            <img id=\"imgbtn\" src=\"/img/public/附件.png\" />        </div>        <div id=\"chooseObj\">        </div>        <div id=\"btnList\">        </div>    </div></div>",
	style:"margin: 0 auto;",
	afterrender:"NoticeEditor_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.NoticeEditor_afterrender(this)
}
	},
	uxCss:"/*ie8及ie8以下版本placeholder的样式*/.placeholder {    color: #b7b7b7 !important;}/************文本框样式************/.inputstyle {    width: 90%;    height: 100%;    border: none !important;    padding: 0 8px;    text-align: center;    font-size: 20px;    height: 50px;}.content {    /*border: 1px solid #9bc5ea;*/    width: 900px;    /*height: 185px;*/    margin: 0 auto;    padding-top: 10px;}.title {    margin: 0 auto;    text-align: center;    margin-bottom: 10px;}.edui-default .edui-editor {    border: 0px solid #d4d4d4 !important;    background-color: white;    position: relative;    overflow: visible;    -webkit-border-radius: 4px;    -moz-border-radius: 4px;    border-radius: 4px;}.webuploader-pick {    background: #fafafa !important;}.webuploader-pick {    padding: 0 !important;}",
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
			var page = this;
var iconUploader, editor;

function NoticeEditor_afterrender(sender) {
    vmd.loadCss(vmd.virtualPath + '/lib/webuploader/webuploader.css');
    $LAB.script(vmd.virtualPath + '/lib/ueditor/ueditor/ueditor.config.js')
        .script(vmd.virtualPath + '/lib/webuploader/webuploader.js')
        .script(vmd.virtualPath + '/lib/ueditor/ueditor/ueditor.all.js')
        .script(vmd.virtualPath + '/lib/ueditor/ueditor/lang/zh-cn/zh-cn.js')
        .wait(function() {
            editor = UE.getEditor('myEditor', {
                toolbars: [
                    [
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', /*'underline',*/ 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                        //'simpleupload', 
                        'insertimage', '|', 'selectall', 'cleardoc', '|', 'fontfamily', //字体 
                        'fontsize', //字号 
                        'link', //超链接 
                        /* 'paragraph', //段落格式 */
                        'snapscreen', //截图 
                        'inserttable' //插入表格 
                    ]
                ],
                initialFrameHeight: 600,
                autoHeightEnabled: true,
                autoFloatEnabled: true
            });

            var serverurl = hwDas.getuploadurl("wdk", "");
            var iconUploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,
                // swf文件路径
                swf: vmd.virtualPath + '/lib/webuploader/Uploader.swf',
                // 文件接收服务端url
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
                    // hwDao.add(url, {}, {}, doc, function(docd) {
                    var docObj = {
                        path: docd.data[0].datas.docfilenamewithpath,
                        docid: docd.data[0].datas.docid,
                        docname: docd.data[0].datas.docname
                    }
                    //添加删除按钮
                    $("#img" + file.id).after("<a herf='#' style='text-decoration:none;color:red;cursor: pointer;' class='btnspan' onclick=delFile('" + file.id + "','" + docd.data[0].datas.docid + "')>删除</a>");
                    $("#img" + file.id).hide();

                    docids.push(docObj);


                    // }, function(ert) {
                    $error.text('上传失败');
                    // });
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
        });
}
			this.NoticeEditor_afterrender=NoticeEditor_afterrender;
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.NoticeEditor");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.NoticeEditor");
	}
})