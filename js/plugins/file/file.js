/**
 * User: mafei
 * Date: 14-04-2018
 * Time: 下午16:34
 * 上传图片对话框逻辑代码,包括tab: 上传文件
 */

(function () {

    var $ = (typeof (jQuery) !== "undefined") ? jQuery : Zepto;

    if (typeof ($) === "undefined") {
        return;
    }
    var editor,
        dialog = {};
  
  
    utils = {
        serverUrl: '',
        serializeParam: function (json) {
            var strArr = [];
            for (var i in json) {
                //忽略默认的几个参数
                if (i == "method" || i == "timeout" || i == "async") continue;
                //传递过来的对象和函数不在提交之列
                if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object")) {
                    strArr.push(encodeURIComponent(i) + "=" + encodeURIComponent(json[i]));
                } else if (utils.isArray(json[i])) {
                    //支持传数组内容
                    for (var j = 0; j < json[i].length; j++) {
                        strArr.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(json[i][j]));
                    }
                }
            }
            return strArr.join("&");
        },
        unhtml: function (str, reg) {
            return str ? str.replace(reg || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (a, b) {
                if (b) {
                    return a;
                } else {
                    return {
                        '<': '&lt;',
                        '&': '&amp;',
                        '"': '&quot;',
                        '>': '&gt;',
                        "'": '&#39;'
                    }[a]
                }

            }) : '';
        },
        /**
         * 将url中的html字符转义， 仅转义  ', ", <, > 四个字符
         * @param  { String } str 需要转义的字符串
         * @param  { RegExp } reg 自定义的正则
         * @return { String }     转义后的字符串
         */
        unhtmlForUrl: function (str, reg) {
            return str ? str.replace(reg || /[<">']/g, function (a) {
                return {
                    '<': '&lt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    '>': '&gt;',
                    "'": '&#39;'
                }[a]

            }) : '';
        },
        formatUrl: function (url) {
            var u = url.replace(/&&/g, '&');
            u = u.replace(/\?&/g, '?');
            u = u.replace(/&$/g, '');
            u = u.replace(/&#/g, '#');
            u = u.replace(/&+/g, '&');
            return u;
        },
        isCrossDomainUrl: function (url) {
            var a = document.createElement('a');
            a.href = url;
            if (browser.ie) {
                a.href = a.href;
            }
            return !(a.protocol == location.protocol && a.hostname == location.hostname &&
            (a.port == location.port || (a.port == '80' && location.port == '') || (a.port == '' && location.port == '80')));
        },
        str2json: function (s) {

            if (!utils.isString(s)) return null;
            if (window.JSON) {
                return JSON.parse(s);
            } else {
                return (new Function("return " + $.trim(s || '')))();
            }

        },
        getActionUrl: function(action){
            var actionName = this.getOpt(action) || action,
                imageUrl = this.getOpt('imageUrl'),
                serverUrl = this.getOpt('serverUrl');

            if(!serverUrl && imageUrl) {
                serverUrl = imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2');
            }

            if(serverUrl) {
                serverUrl = serverUrl + (serverUrl.indexOf('?') == -1 ? '?':'&') + 'action=' + (actionName || '');
                return utils.formatUrl(serverUrl);
            } else {
                return '';
            }
        },
        getOpt: function (key) {
            return this.options[key]
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数  
            if (r != null) return unescape(r[2]); return null; //返回参数值 
        },
        getSaveDirPath: function () {
            return utils.getUrlParam('savedir');
        },
        isHideUploader: function () {
            if (utils.getUrlParam('hide')) {
                return true;
            }
            return false;
        }
    };
    $.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function (index,v) {
        
        utils['is' + v] = function (obj) {
            return Object.prototype.toString.apply(obj) == '[object ' + v + ']';
        }
    });
    browser = $.browser,

    ajax = $.ajax,

    $G = function (id) {
        return document.getElementById(id)
    };
   
    var uploadFile,
        onlineFile,
        lang = {

        'uploadSelectFile': '点击选择文件',
        'uploadAddFile': '继续添加',
        'uploadStart': '开始上传',
        'uploadPause': '暂停上传',
        'uploadContinue': '继续上传',
        'uploadRetry': '重试上传',
        'uploadDelete': '删除',
        'uploadTurnLeft': '向左旋转',
        'uploadTurnRight': '向右旋转',
        'uploadPreview': '预览中',
        'uploadNoPreview': '不能预览',
        'updateStatusReady': '选中_个文件，共_KB。',
        'updateStatusConfirm': '已成功上传_个文件，_个文件上传失败',
        'updateStatusFinish': '共_个（_KB），_个上传成功',
        'updateStatusError': '，_个上传失败。',
        'errorNotSupport': 'WebUploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器。',
        'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！',
        'errorExceedSize': '文件大小超出',
        'errorFileType': '文件格式不允许',
        'errorInterrupt': '文件传输中断',
        'errorUploadRetry': '上传失败，请重试',
        'errorHttp': 'http请求错误',
        'errorServerUpload': '服务器返回出错'

    };

    window.uploaderInit = function (callback,options) {
        if(typeof vmd =='undefined'){
		   return
		   console.log('上传组件须在vmd中使用');
	    } 
	    if(vmd.virtualPath==undefined) vmd.virtualPath='';
		
        $.get(vmd.virtualPath + '/js/plugins/file/upload.json', function (data) {
            if (!data) {
               return
            }
            data=JSON.parse(data.replace(/(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, ''))
            utils.options = data;

			//自定义属性赋值
			for(var key in options){
				
				if(options[key]) 	utils.options[key]=	options[key];
			}
			if(options&&options["mineTypes"])
            utils.options['fileAllowFiles']=options["mineTypes"].split(',')||utils.getOpt('fileAllowFiles')
			
            //utils.options.serverUrl = utils.serverUrl;
            //(需要修改的)配置获取数据访问服务的路径
            var _vmdpath = function () {
                var path;
                try{
                    path = parent.xds && parent.xds.vmd.params.path()
                }catch(e){}
                
                if (path) {
                    path = path.replace('modules/', '');
                    path = path.substr(0, path.indexOf('/'))||'';
					if(!path) return '';
                    path ='modules/'+ path+ '/file'
                    return path
                }
                return null;
            }
            //兼容1、独立调用2、可视化调用3、默认配置
            utils.dirPath = utils.getUrlParam('savedir') || _vmdpath() || 'file/public';
            utils.hwcode = utils.getOpt('hwcode') || 'vmd';
            utils.hwDataServHost = typeof vmdSettings != 'undefined' ?(vmdSettings.vmdFileServiceIp||vmdSettings.dataServiceIp ) : '192.168.1.188:8050'
            var _testUrl = '';
            utils.virtualPath = typeof vmd.virtualPath != 'undefined' ? (vmd.virtualPath.indexOf('http://localhost') != -1 ? _testUrl : vmd.virtualPath) : _testUrl;
            if (typeof hwDas != 'undefined') {
                utils.options.serverUrl = hwDas.getuploadurl({host:utils.hwDataServHost,mark:utils.hwcode}, utils.dirPath)
            } else {
                $('#filePickerReady').after($('<div>').html(lang.errorLoadConfig)).hide();
                return;
            }
            if (!$G('tabhead')) return;
            initTabs();
            initButtons();
            callback&&callback(uploadFile);
        }, 'text')        
    };

    /* 初始化tab标签 */
    function initTabs() {
       
        var tabs = $G('tabhead').children;
        for (var i = 0; i < tabs.length; i++) {
            $(tabs[i]).on("click", function (e) {
                var target = e.target || e.srcElement;
                setTabFocus(target.getAttribute('data-content-id'));
            });
        }

         setTabFocus('upload');
        
    }

    /* 初始化tabbody */
    function setTabFocus(id) {
        if(!id) return;
        var i, bodyId, tabs = $G('tabhead').children;
        for (i = 0; i < tabs.length; i++) {
            bodyId = tabs[i].getAttribute('data-content-id');
            if (bodyId == id) {
                $(tabs[i]).addClass('focus');
                $($G(bodyId)).addClass('focus');
            } else {
                $(tabs[i]).removeClass('focus');
                $($G(bodyId)).removeClass('focus');
            }
        }
        switch (id) {
          
            case 'upload':
                uploadFile = uploadFile || new UploadFile('queueList');
                break;
            case 'online':
                onlineFile = onlineFile || new OnlineFile('fileList');
                onlineFile.reset()
                break;
            
        }
    }

    /* 初始化onok事件 */
    function initButtons() {
        
        _dialog = {};
        _dialog.onok = function () {
            
            var remote = false, list = [], id,isfonticon, tabs = $G('tabhead').children;
            for (var i = 0; i < tabs.length; i++) {
                if ($(tabs[i]).hasClass('focus')) {
                    id = tabs[i].getAttribute('data-content-id');
                    break;
                }
            }

            switch (id) {
                
                case 'upload':
                    list = uploadFile.getInsertList();
                    var count = uploadFile.getQueueCount();
                    if (count) {
                        $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>');
                        return false;
                    }
                    break;
                case 'online':
                    list = onlineFile.getInsertList();
                    break;
               
            }
             
            if (list && list.length>0) {

                var _srcPerf = utils.dirPath;
                var _fisrtList = list[0];
                var _filename = _fisrtList.title ? _srcPerf + '/' + _fisrtList.title : _fisrtList.url;
				if(!isfonticon) _filename='/'+_filename;
                var _path = _fisrtList ? (window.location.href.indexOf('localhost') != -1 ? _fisrtList.url : _filename) : '';
                //需要兼容处理（_path为object对象）
                parent.edclose && parent.edclose(_path);
            } else {
                parent.edclose && parent.edclose();

            }
        };
        _dialog.oncancel = function () {

            uploadFile.upload();
            parent.edclose && parent.edclose();
        }
        if (!utils.getSaveDirPath()) {
            $($G('tabbody')).after('<div class="btns selectbtn"><button class="btn ok" onclick="_dialog.onok()">确定</button><button class="btn cancel" onclick="_dialog.oncancel()">取消</button></div>');
        } else {
            $("#tabhead >span").remove();
        }
        
        window.uploadFile = uploadFile;
        //mafei 对外上传接口处理
        !uploadFile.upload & (uploadFile.upload = function (host,savedir,win, callback,hwcode) {
            if (typeof vmdSettings != 'undefined') {
                utils.hwcode = hwcode||vmdSettings.resourceCode || utils.hwcode;
                /*if (host) {
                    utils.hwcode = {
                        host: host,
                        mark: utils.hwcode || vmdSettings.resourceCode 
                    }
                }*/
				if(host.indexOf('http')!=-1){
					utils.url=host;//isDefine
				}  
            }
          
            //去掉tab及最下方功能按钮
            $("#tabbody .selectbtn").remove();
            $("#tabhead >span").remove();

            this.fileList = [];
			
			if(hwcode){
				utils.dirPath = savedir
				
			}else
            utils.dirPath = savedir || utils.dirPath;
            this.callback = callback;
            this.win = win;

            //清空队列
            var uploader = uploadFile.uploader;
            for (var i = 0; i < uploader.getFiles().length; i++) {
                     uploader.removeFile(uploader.getFiles()[i]);
            }
            $('.state-cancelled').remove()
             uploader.reset();

            $("#filePickerReady .webuploader-element-invisible").click();
            //uploadFile.uploader.on('fileQueued', function (file) {
            //   win&&win.show()
            //})
            
        })
		//20180912 普通上传模式
		!uploadFile.upload2&&(uploadFile.upload2=function(title,savedir,callback,hwcode){
			  var me=this;
			  var Uploader=this._scope;
			
			  var filetype;
			  if(!Uploader) return;
			  if(Ext.isObject(title)){
				  var _upload=Ext.clone(title);
				  title=_upload.title;
				  savedir=_upload.savedir;
				  callback=_upload.callback;
				  hwcode=_upload.hwcode;
				  
			  }
			  
			  utils.options['fileAllowFiles']=filetype||utils.getOpt('fileAllowFiles')
              var win = new vmd.window({
					items: Uploader,
					auto: false,
					height: 500,
					width: 655,
					maximizable: false,
					resizable: false,
					closeAction: 'hide',
					title: title||"文件上传"
				})
				Uploader.show()
				win.show();
				win.hide();
				
				//上传接口
				hwcode=hwcode||utils.hwcode;
				me.upload(null, savedir, win,callback,hwcode);
				
				me.uploader.on('fileQueued', function (file) {
                    
				  
                 })

		})
		
		
  

    }


    /* 上传文件 */
    function UploadFile(target) {
        this.$wrap = target.constructor == String ? $('#' + target) : $(target);
        this.init();
    }
    UploadFile.prototype = {
        init: function () {
            this.fileList = [];
            this.initContainer();
            this.initUploader();
        },
        initContainer: function () {
            this.$queue = this.$wrap.find('.filelist');
        },
        
        /* 初始化容器 */
        initUploader: function () {
            var _this = this,
                //$ = jQuery,    // just in case. Make sure it's not an other libaray.
                $wrap = _this.$wrap,
            // 图片容器
                $queue = $wrap.find('.filelist'),
            // 状态栏，包括进度和控制按钮
                $statusBar = $wrap.find('.statusBar'),
            // 文件总体选择信息。
                $info = $statusBar.find('.info'),
            // 上传按钮
                $upload = $wrap.find('.uploadBtn'),
            // 上传按钮
                $filePickerBtn = $wrap.find('.filePickerBtn'),
            // 上传按钮
                $filePickerBlock = $wrap.find('.filePickerBlock'),
            // 没选择文件之前的内容。
                $placeHolder = $wrap.find('.placeholder'),
            // 总体进度条
                $progress = $statusBar.find('.progress').hide(),
            // 添加的文件数量
                fileCount = 0,
            // 添加的文件总大小
                fileSize = 0,
            // 优化retina, 在retina下这个值是2
                ratio = window.devicePixelRatio || 1,
            // 缩略图大小
                thumbnailWidth = 113 * ratio,
                thumbnailHeight = 113 * ratio,
            // 可能有pedding, ready, uploading, confirm, done.
                state = '',
            // 所有文件的进度信息，key为file id
                percentages = {},
                supportTransition = (function () {
                    var s = document.createElement('p').style,
                        r = 'transition' in s ||
                            'WebkitTransition' in s ||
                            'MozTransition' in s ||
                            'msTransition' in s ||
                            'OTransition' in s;
                    s = null;
                    return r;
                })(),
            // WebUploader实例
                uploader;
                var actionUrl = utils.getActionUrl(utils.getOpt('fileActionName')),
                acceptExtensions = (utils.getOpt('fileAllowFiles') || []).join('').replace(/\./g, ',').replace(/^[,]/, ''),
                fileMaxSize = utils.getOpt('fileMaxSize'),
                imageCompressBorder = utils.getOpt('imageCompressBorder');

            if (!WebUploader.Uploader.support()) {
                $('#filePickerReady').after($('<div>').html(lang.errorNotSupport)).hide();
                return;
            } else if (!utils.getOpt('fileActionName')) {
                $('#filePickerReady').after($('<div>').html(lang.errorLoadConfig)).hide();
                return;
            }
            
			var opts={
                pick: {
                    id: '#filePickerReady',
                    label: lang.uploadSelectFile
                },
                swf: '../../third-party/webuploader/Uploader.swf',
                server: actionUrl,
				fileNumLimit:utils.getOpt('fileNumLimit') ||9999,
                fileVal: utils.getOpt('fileFieldName'),
                duplicate: true,
                fileSingleSizeLimit: fileMaxSize,    
                compress: false
				
            }
			if(utils.getOpt('mimeTypes'))
			  opts.accept={
				       
				       extensions: utils.getOpt('mimeTypes').replace(/\./g,''),
				        mimeTypes: utils.getOpt('mimeTypes')
                    }
            uploader = _this.uploader = WebUploader.create(opts);
            uploader.addButton({
                id: '#filePickerBlock'
            });
            uploader.addButton({
                id: '#filePickerBtn',
                label: lang.uploadAddFile
            });

            setState('pedding');

            // 当有文件添加进来时执行，负责view的创建
            function addFile(file) {
                var $li = $('<li id="' + file.id + '">' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>' +
                        '<p class="progress"><span></span></p>' +
                        '</li>'),

                    $btns = $('<div class="file-panel">' +
                        '<span class="cancel">' + lang.uploadDelete + '</span>' +
                        '<span class="rotateRight">' + lang.uploadTurnRight + '</span>' +
                        '<span class="rotateLeft">' + lang.uploadTurnLeft + '</span></div>').appendTo($li),
                    $prgress = $li.find('p.progress span'),
                    $wrap = $li.find('p.imgWrap'),
                    $info = $('<p class="error"></p>').hide().appendTo($li),

                    showError = function (code) {
                        switch (code) {
                            case 'exceed_size':
                                text = lang.errorExceedSize;
                                break;
                            case 'interrupt':
                                text = lang.errorInterrupt;
                                break;
                            case 'http':
                                text = lang.errorHttp;
                                break;
                            case 'not_allow_type':
                                text = lang.errorFileType;
                                break;
                            default:
                                text = lang.errorUploadRetry;
                                break;
                        }
                        $info.text(text).show();
                    };

                if (file.getStatus() === 'invalid') {
                    showError(file.statusText);
                } else {
                    $wrap.text(lang.uploadPreview);
                    if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|' + file.ext.toLowerCase() + '|') == -1) {
                        $wrap.empty().addClass('notimage').append('<i class="file-preview file-type-' + file.ext.toLowerCase() + '"></i>' +
                        '<span class="file-title" title="' + file.name + '">' + file.name + '</span>');
                    } else {
                        if (browser.ie && browser.version <= 7) {
                            $wrap.text(lang.uploadNoPreview);
                        } else {

                            //mafei
                            uploader.makeThumb(file, function (error, src) {
                                if (error || !src) {
                                    $wrap.text(lang.uploadNoPreview);
                                } else {
                                    var $img = $('<img src="' + src + '">');
                                    $wrap.empty().append($img);
                                    $img.on('error', function () {
                                        $wrap.text(lang.uploadNoPreview);
                                    });
                                }
                            }, thumbnailWidth, thumbnailHeight);
                        }
                    }

                    
                    percentages[ file.id ] = [ file.size, 0 ];
                    file.rotation = 0;

					
					acceptExtensions = (utils.getOpt('fileAllowFiles') || []).join('').replace(/\./g, ',').replace(/^[,]/, '');
					//mafei 20190926
					var isAllFiles=false;
					if(utils.options&&utils.options.minetypes==undefined&&utils.options.hwcode) isAllFiles=true;
					
                    /* 检查文件格式 */
                    if ((!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1)&&!isAllFiles) {
                        showError('not_allow_type');
                        uploader.removeFile(file);
                    }
                }

                file.on('statuschange', function (cur, prev) {
                    if (prev === 'progress') {
                        $prgress.hide().width(0);
                    } else if (prev === 'queued') {
                        $li.off('mouseenter mouseleave');
                        $btns.remove();
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid') {
                        showError(file.statusText);
                        percentages[ file.id ][ 1 ] = 1;
                    } else if (cur === 'interrupt') {
                        showError('interrupt');
                    } else if (cur === 'queued') {
                        percentages[ file.id ][ 1 ] = 0;
                    } else if (cur === 'progress') {
                        $info.hide();
                        $prgress.css('display', 'block');
                    } else if (cur === 'complete') {
                    }

                    $li.removeClass('state-' + prev).addClass('state-' + cur);
                });

                $li.on('mouseenter', function () {
                    $btns.animate({height: 30});
                });
                $li.on('mouseleave', function () {
                    $btns.animate({height: 0});
                });

                $btns.on('click', 'span', function () {
                    var index = $(this).index(),
                        deg;

                    switch (index) {
                        case 0:
                            uploader.removeFile(file);
                            return;
                        case 1:
                            file.rotation += 90;
                            break;
                        case 2:
                            file.rotation -= 90;
                            break;
                    }

                    if (supportTransition) {
                        deg = 'rotate(' + file.rotation + 'deg)';
                        $wrap.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        });
                    } else {
                        $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                    }

                });

                $li.insertBefore($filePickerBlock);
            }

            // 负责view的销毁
            function removeFile(file) {
                var $li = $('#' + file.id);
                delete percentages[ file.id ];
                updateTotalProgress();
                $li.off().find('.file-panel').off().parent().remove();
            }

            function updateTotalProgress() {
                var loaded = 0,
                    total = 0,
                    spans = $progress.children(),
                    percent;

                $.each(percentages, function (k, v) {
                    total += v[ 0 ];
                    loaded += v[ 0 ] * v[ 1 ];
                });

                percent = total ? loaded / total : 0;

                spans.eq(0).text(Math.round(percent * 100) + '%');
                spans.eq(1).css('width', Math.round(percent * 100) + '%');
                updateStatus();
            }

            function setState(val, files) {

                if (val != state) {

                    var stats = uploader.getStats();

                    $upload.removeClass('state-' + state);
                    $upload.addClass('state-' + val);

                    switch (val) {

                        /* 未选择文件 */
                        case 'pedding':
                            $queue.addClass('element-invisible');
                            $statusBar.addClass('element-invisible');
                            $placeHolder.removeClass('element-invisible');
                            $progress.hide(); $info.hide();
                            uploader.refresh();
                            break;

                        /* 可以开始上传 */
                        case 'ready':
                            
                            $placeHolder.addClass('element-invisible');
                            $queue.removeClass('element-invisible');
                            $statusBar.removeClass('element-invisible');
                            $progress.hide(); $info.show();
                            $upload.text(lang.uploadStart);
                            uploader.refresh();
                            break;

                        /* 上传中 */
                        case 'uploading':
                            $progress.show(); $info.hide();
                            $upload.text(lang.uploadPause);
                            break;

                        /* 暂停上传 */
                        case 'paused':
                            $progress.show(); $info.hide();
                            $upload.text(lang.uploadContinue);
                            break;

                        case 'confirm':
                            $progress.show(); $info.hide();
                            $upload.text(lang.uploadStart);

                            stats = uploader.getStats();
                            if (stats.successNum && !stats.uploadFailNum) {
                                setState('finish');
                                return;
                            }
                            break;

                        case 'finish':
                            $progress.hide(); $info.show();
                            if (stats.uploadFailNum) {
                                $upload.text(lang.uploadRetry);
                            } else {
                                $upload.text(lang.uploadStart);
                            }
                            //上传完成后的回调
                            uploadFile.callback && uploadFile.callback(uploadFile.fileList,uploadFile.win);
                            break;
                    }

                    state = val;
                    updateStatus();

                }

                if (!_this.getQueueCount()) {
                    $upload.addClass('disabled')
                } else {
                    $upload.removeClass('disabled')
                }

            }

            function updateStatus() {
                var text = '', stats;

                if (state === 'ready') {
                    text = lang.updateStatusReady.replace('_', fileCount).replace('_KB', WebUploader.formatSize(fileSize));
                } else if (state === 'confirm') {
                    stats = uploader.getStats();
                    if (stats.uploadFailNum) {
                        text = lang.updateStatusConfirm.replace('_', stats.successNum).replace('_', stats.successNum);
                    }
                } else {
                    stats = uploader.getStats();
                    text = lang.updateStatusFinish.replace('_', fileCount).
                        replace('_KB', WebUploader.formatSize(fileSize)).
                        replace('_', stats.successNum);

                    if (stats.uploadFailNum) {
                        text += lang.updateStatusError.replace('_', stats.uploadFailNum);
                    }
                }

                $info.html(text);
            }
            // 当有文件添加进来的时候
            uploader.on('beforeFileQueued', function (file) {
                if (uploadFile.win) {
						//构造支持文件夹上传
					if(uploadFile.isEnableDirUpload){
						var _path=utils.dirPath;
						if(file.source.source.webkitRelativePath){
							_path=utils.dirPath+'/'+file.source.source.webkitRelativePath;
							_path=_path.substring(0,_path.lastIndexOf('/'));
						} 
						
						file.source.relativePath=hwDas.getuploadurl({host:utils.hwDataServHost,mark:utils.hwcode},_path);
					}else{
						file.source.relativePath='';
					}
					
					var serviceAddress=hwDas.getuploadurl(utils.hwcode, utils.dirPath);;
					if(utils.url){
					  
						serviceAddress=utils.url;
					}
					
                    uploader.options.hwdasserver = uploader.options.server22=serviceAddress;
                }
               
            });
            uploader.on('fileQueued', function (file) {
               
                fileCount++;
                fileSize += file.size;

                if (fileCount === 1) {
                    $placeHolder.addClass('element-invisible');
                    $statusBar.show();
                }

                addFile(file);
                uploadFile.win && uploadFile.win.show();
            });

            uploader.on('fileDequeued', function (file) {
                fileCount--;
                fileSize -= file.size;
                if (fileCount < 0) fileCount = 0;
                if (fileSize < 0)  fileSize = 0;
                removeFile(file);
                updateTotalProgress();
            });

            uploader.on('filesQueued', function (file) {
                if (!uploader.isInProgress() && (state == 'pedding' || state == 'finish' || state == 'confirm' || state == 'ready')) {
                    setState('ready');
                }
                updateTotalProgress();
            });

            uploader.on('all', function (type, files) {
                switch (type) {
                    case 'uploadFinished':
                        setState('confirm', files);
                        break;
                    case 'startUpload':
                        /* 添加额外的GET参数 */
                        var params = '',
                            url = utils.formatUrl(actionUrl + (actionUrl.indexOf('?') == -1 ? '?':'&') + 'encode=utf-8&' + params);
                        uploader.option('server', url);
                        setState('uploading', files);
                        break;
                    case 'stopUpload':
                        setState('paused', files);
                        break;
                }
            });

            uploader.on('uploadBeforeSend', function (file, data, header) {
                //这里可以通过data对象添加POST参数
                header['X_Requested_With'] = 'XMLHttpRequest';
            });

            uploader.on('uploadProgress', function (file, percentage) {
                var $li = $('#' + file.id),
                    $percent = $li.find('.progress span');

                $percent.css('width', percentage * 100 + '%');
                percentages[ file.id ][ 1 ] = percentage;
                updateTotalProgress();
            });

            uploader.on('uploadSuccess', function (file, ret) {
                var $file = $('#' + file.id);
                try {
                    var responseText = (ret._raw || ret),
                        json = utils.str2json(responseText),
                        _data=json.data[0],
                        _json={
                            state:json.isSucceed?'SUCCESS':'',
                            url:_data&&_data.path.replace('\\','/'),
                            title: _data && _data.name,
                            size: _data.size,
                            error: json.errMsg,
                            ext:file.ext,
							data:_data
                        } ;
                           
                    if (_json.state=='SUCCESS') {
                        _this.fileList.push(_json);
                        $file.append('<span class="success"></span>');
                    } else {
                        $file.find('.error').text(json.errMsg).show();
                    }
                } catch (e) {
                    $file.find('.error').text(lang.errorServerUpload).show();
                }
            });

            uploader.on('uploadError', function (file, code) {
            });
            uploader.on('error', function (code, file) {
                if (code == 'Q_TYPE_DENIED' || code == 'F_EXCEED_SIZE') {
                    if (typeof file == "number") {
                       // alert("超过上传最大限制" + WebUploader.formatSize(file) + ",请关闭重新上传！");
                        console.log("超过上传最大限制" + WebUploader.formatSize(file) + ",请关闭重新上传！")
                        uploader.stop();
                        return
                    }else
                    addFile(file);
                }
            });
            uploader.on('uploadComplete', function (file, ret) {
                
            });

            $upload.on('click', function () {
                
                if ($(this).hasClass('disabled')) {
                    return false;
                }

                if (state === 'ready') {
                    uploader.upload();
                } else if (state === 'paused') {
                    uploader.upload();
                } else if (state === 'uploading') {
                    uploader.stop();
                }
            });

            $upload.addClass('state-' + state);
            updateTotalProgress();
        },
        getQueueCount: function () {
            var file, i, status, readyFile = 0, files = this.uploader.getFiles();
            for (i = 0; file = files[i++]; ) {
                status = file.getStatus();
                if (status =="inited"||status == 'queued' || status == 'uploading' || status == 'progress') readyFile++;
            }
            return readyFile;
        },
        destroy: function () {
            this.$wrap.remove();
        },
        getInsertList: function () {
            
            var i, data, list = [],
                prefix = utils.getOpt('fileUrlPrefix');
            prefix = window.location.href.indexOf('localhost') != -1 ? utils.virtualPath + '/' : '';
            for (i = 0; i < this.fileList.length; i++) {
                data = this.fileList[i];
                list.push({
                    url: prefix + data.url,
                    title: data.original || data.url.substr(data.url.lastIndexOf('/') + 1)
                });
            }
            return list;
        }
    };


    /* 文件列表 */
    function OnlineFile(target) {
        this.container = utils.isString(target) ? document.getElementById(target) : target;
        this.init();
    }
    OnlineFile.prototype = {
        init: function () {
            this.reset();
            this.initEvents();
        },
        /* 初始化容器 */
        initContainer: function () {
            this.container.innerHTML = '';
            this.list = document.createElement('ul');
            this.clearFloat = document.createElement('li');

            $(this.list).addClass('list');
            $(this.clearFloat).addClass('clearFloat');

            this.list.appendChild(this.clearFloat);
            this.container.appendChild(this.list);
        },
        /* 初始化滚动事件,滚动到地步自动拉取数据 */
        initEvents: function () {
            var _this = this;

            /* 滚动拉取文件 */
            $($G('fileList')).on('scroll', function (e) {
                var panel = this;
                if (panel.scrollHeight - (panel.offsetHeight + panel.scrollTop) < 10) {
                    _this.getImageData();
                }
            });
            /* 选中图片 */
            
            $(this.container).on('click', function (e) {
                var target = e.target || e.srcElement,
                    li = target.parentNode;

                if (li.tagName.toLowerCase() == 'li') {
                    if ($(li).hasClass('selected')) {
                        $(li).removeClass('selected');
                    } else {
                        //先支持单选
                        $(_this.container).find('li').removeClass('selected')
                        $(li).addClass('selected');
                    }
                }
            });
        },
        /* 初始化第一次的数据 */
        initData: function () {

            /* 拉取数据需要使用的值 */
            this.state = 0;
            this.listSize = utils.getOpt('fileManagerListSize');
            this.listIndex = 0;
            this.listEnd = false;

            /* 第一次拉取数据 */
            this.getFileData();
        },
        /* 重置界面 */
        reset: function() {
            this.initContainer();
            this.initData();
        },
        /* 向后台拉取文件列表数据 */
        getFileData: function () {
            var _this = this;

            if(!_this.listEnd && !this.isLoadingData) {
                this.isLoadingData = true;
                var url = utils.getActionUrl(utils.getOpt('fileManagerActionName')),
                    isJsonp = utils.isCrossDomainUrl(url);
                //数据服务改造版   
                hwDas.getdirs({host:utils.hwDataServHost,mark:utils.hwcode}, utils.dirPath, utils.getOpt('fileAllowFiles'), function (r) {
                    try {

                        var list = [];
                        $.each(r.data, function (i, item) {
								if(/\.\w+/.test(item.name)){
									
									list.push({
									url:utils.virtualPath+ utils.dirPath+'/'+item.name,
									name:item.name,
									type:item.type,
								})
						  }
                        })
                        var json = {
                            state: r.isSucceed ? 'SUCCESS' : '',
                            total: list.length,
                            list:list
                        };
                        if (json.state == 'SUCCESS') {
                            
                            if (json.list && json.list.length == 0) {
                                $(_this.clearFloat).html('无可用的文件!').css({
                                    fontSize: 16, width: 120, overflow: 'visible',
                                    fontWeight: 700, top: -50, left: 10

                                })
                            } else {
                                _this.pushData(json.list);

                            }
                            //_this.listIndex = parseInt(json.start) + parseInt(json.list.length);
                            //if (_this.listIndex >= json.total) {
                            //    _this.listEnd = true;
                            //}
                             _this.listEnd = true;
                            _this.isLoadingData = false;
                        } else {
                            //mafei
                            _this.isLoadingData = false;
                            $(_this.clearFloat).html('无可用的文件!').css({
                                fontSize: 16, width: 120, overflow: 'visible',
                                fontWeight: 700, top: -50, left: 10

                            })
                        }
                    } catch (e) {
                        
                        _this.listEnd = true;
                        _this.isLoadingData = false;
                    }
                }, function () {
                    _this.isLoadingData = false;
                })
            }
        },
        /* 添加文件到列表界面上 */
        pushData: function (list) {
            var i, item, img, filetype, preview, icon, _this = this,
                urlPrefix = utils.getOpt('fileManagerUrlPrefix');
            
            for (i = 0; i < list.length; i++) {
                if(list[i] && list[i].url) {
                    item = document.createElement('li');
                    icon = document.createElement('span');
                    filetype = list[i].url.substr(list[i].url.lastIndexOf('.') + 1);
                    var title = document.createElement('span');

                    if ("png|jpg|jpeg|gif|bmp".indexOf(filetype) != -1) {
                        preview = document.createElement('img');
                        $(preview).on('load', (function (image) {
                            return function () {
                                _this.scale(image, image.parentNode.offsetWidth, image.parentNode.offsetHeight);
                            }
                        })(preview));
                        preview.width = 113;
                        preview.setAttribute('src', urlPrefix + list[i].url + (list[i].url.indexOf('?') == -1 ? '?noCache=' : '&noCache=') + (+new Date()).toString(36));
                    } else {
                        var ic = document.createElement('i'),
                            textSpan = document.createElement('span');
                        textSpan.innerHTML = list[i].url.substr(list[i].url.lastIndexOf('/') + 1);
                        preview = document.createElement('div');
                        preview.appendChild(ic);
                        preview.appendChild(textSpan);
                        $(preview).addClass('file-wrapper');
                        $(textSpan).addClass(textSpan, 'file-title');
                        $(ic).addClass('file-type-' + filetype);
                        $(ic).addClass('file-preview');
                    }


                    $(icon).addClass('icon');
                    item.setAttribute('data-url', urlPrefix + list[i].url);
                    if (list[i].original) {
                        item.setAttribute('data-title', list[i].original);
                    }
                    //mafei
                    
                    var url = list[i].url;
                    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
                    var filter_name = fileName.split('_');
                    filter_name.shift();
                    var _title = filter_name.join('') || url.replace(utils.getOpt('fileManagerListPath') + '/', '')
                    title.innerHTML = list[i].name||_title;
                    $(title).addClass('title').attr('title', url);
                    $(icon).attr('title', url);
                    item.appendChild(preview);
                    item.appendChild(icon);
                    item.appendChild(title);
                    this.list.insertBefore(item, this.clearFloat);
                }
            }
        },
        /* 改变图片大小 */
        scale: function (img, w, h, type) {
            var ow = img.width,
                oh = img.height;
            if (type == 'justify') {
                if (ow >= oh) {
                    img.width = w;
                    img.height = h * oh / ow;
                    img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px';
                } else {
                    img.width = w * ow / oh;
                    img.height = h;
                    img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px';
                }
            } else {
                //mafei

                //if (ow >= oh) {
                //    img.width = w * ow / oh;
                //    img.height = h;
                //    img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px';
                //} else {
                //    img.width = w;
                //    img.height = h * oh / ow;
                //    img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px';
                //}
            }
        },
        getInsertList: function () {
            var i, lis = this.list.children, list = [];
            for (i = 0; i < lis.length; i++) {
                if ($(lis[i]).hasClass('selected')) {
                    var url = lis[i].getAttribute('data-url');
                    var title = lis[i].getAttribute('data-title') || url.substr(url.lastIndexOf('/') + 1);
                    list.push({
                        title: title,
                        url: url
                    });
                }
            }
            return list;
        }
    };

})();
