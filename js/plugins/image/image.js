/**
 * User: mafei
 * Date: 14-04-2018
 * Time: 下午16:34
 * 上传图片对话框逻辑代码,包括tab: 远程图片/上传图片/在线图片
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
   
    var remoteImage,
        uploadImage,
        onlineImage,
        searchImage;

    window.onload = function () {
        
     
        lang = {
           
            'uploadSelectFile': '点击选择图片',
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
            'updateStatusReady': '选中_张图片，共_KB。',
            'updateStatusConfirm': '已成功上传_张照片，_张照片上传失败',
            'updateStatusFinish': '共_张（_KB），_张上传成功',
            'updateStatusError': '，_张上传失败。',
            'errorNotSupport': 'WebUploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器。',
            'errorLoadConfig': '后端配置项没有正常加载，上传插件不能正常使用！',
            'errorExceedSize': '文件大小超出',
            'errorFileType': '文件格式不允许',
            'errorInterrupt': '文件传输中断',
            'errorUploadRetry': '上传失败，请重试',
            'errorHttp': 'http请求错误',
            'errorServerUpload': '服务器返回出错',
            'remoteLockError': "宽高不正确,不能所定比例",
            'numError': "请输入正确的长度或者宽度值！例如：123，400",
            'imageUrlError': "不允许的图片格式或者图片域！",
            'imageLoadError': "图片加载失败！请检查链接地址或网络状态！",
            'searchRemind': "请输入搜索关键词",
            'searchLoading': "图片加载中，请稍后……",
            'searchRetry': " :( ，抱歉，没有找到图片！请重试一次！"
        };
        
        $.get('../file/upload.json', function (data) {
            
            if (!data) {
               return
            }
            data=JSON.parse(data.replace(/(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, ''))
            utils.options = data;

            //utils.options.serverUrl = utils.serverUrl;
            //(需要修改的)配置获取数据访问服务的路径
            var _vmdpath = function () {
                var path = parent.xds&&parent.xds.vmd.params.path()
                if (path) {
                  	var start_=path.substr(0,path.indexOf("modules/"));
					path=path.substr(path.indexOf("modules/"))
                    path = path.replace('modules/', '');
                    path = path.substr(0, path.indexOf('/'))||'';
					if(!path) return '';
                    path =start_+'modules/'+ path+ '/img'
                    return path
                }
                return null;
            }
            utils.dirPath = utils.getUrlParam('savedir')|| _vmdpath()|| 'img/public';
            utils.hwcode = utils.getOpt('hwcode') || 'vmd';
            utils.hwDataServHost = typeof vmdSettings != 'undefined' ?(vmdSettings.vmdFileServiceIp||vmdSettings.dataServiceIp ) : '192.168.1.188:8050';
            var _testUrl = 'http://192.168.1.188:8000/';
            utils.virtualPath = typeof bootPATH != 'undefined' ? (bootPATH.indexOf('http://localhost') != -1 ? _testUrl : bootPATH) : _testUrl;
            if (typeof hwDas != 'undefined') {
                utils.options.serverUrl = hwDas.getuploadurl({host:utils.hwDataServHost,mark:utils.hwcode}, utils.dirPath)
            } else {
                $('#filePickerReady').after($('<div>').html(lang.errorLoadConfig)).hide();
                return;
            }
            
            initTabs();
            initButtons();
        }, 'text')
        //window.setTimeout(function () {
        //    initTabs();
        //    initButtons();
        //},100)
        
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

        var img = parent.edValue;
        //将图片类型兼容处理为src
        if (img&&img.backgroundImage && !img.src) img.src = img.backgroundImage;
        if (img && img.src&&img.src.indexOf('icon-')!=0) {
            setTabFocus('remote');
        } else {
            setTabFocus('upload');
        }
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
            case 'remote':
                remoteImage = remoteImage || new RemoteImage();
                break;
            case 'upload':
                //setAlign(utils.getOpt('imageInsertAlign'));
                uploadImage = uploadImage || new UploadImage('queueList');
                break;
            case 'online':
               // setAlign(utils.getOpt('imageManagerInsertAlign'));
                onlineImage = onlineImage || new OnlineImage('imageList');
                onlineImage.reset();
                break;
            case 'search':
              //  setAlign(utils.getOpt('imageManagerInsertAlign'));
                searchImage = searchImage || new SearchImage();
                break;
            case 'fonticon':
                $($G(bodyId)).find('iframe').attr('src','../../../css/font-awesome/index.html')
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
                case 'remote':
                    //list = remoteImage.getInsertList();
                    list =null;
                    break;
                case 'upload':
                    list = uploadImage.getInsertList();
                    var count = uploadImage.getQueueCount();
                    if (count) {
                        $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>');
                        return false;
                    }
                    break;
                case 'online':
                    list = onlineImage.getInsertList();
                    break;
                case 'search':
                    list = searchImage.getInsertList();
                    remote = true;
                    break;
                case 'fonticon':
                    
                    var select_list = $(icon_iframe).find('.the-icons a.iconfocus i');
                    list=[];
                    $.each(select_list, function (index,item) {
                        var icon = item.className;
                        list.push({src:icon,icon:icon})
                    })
					isfonticon=true;
                    break;
            }
             
            if (list && list.length>0) {

                var _srcPerf = utils.dirPath;
                var _fisrtList = list[0];
				var _filename=_fisrtList.alt?_srcPerf + '/' + _fisrtList.alt:_fisrtList.src;
				if(!isfonticon) _filename='/'+_filename;
                var _src = _fisrtList ? (window.location.href.indexOf('localhost') != -1 ? _fisrtList.src : _filename) : '';
                //构造vmd的返回格式（可选）
                var vmdReturnValue = {
                    props: {
                        src: _src
                    }
                }
				
                //parent.edclose && parent.edclose(vmdReturnValue);
				parent.edclose && parent.edclose(_src);
            } else {
                parent.edclose && parent.edclose();

            }
        };
        _dialog.oncancel = function () {
            parent.edclose && parent.edclose();
        }
        $($G('tabbody')).after('<div class="btns"><button class="btn ok" onclick="_dialog.onok()">确定</button><button class="btn cancel" onclick="_dialog.oncancel()">取消</button></div>')

        //初始化矢量图标事件
        window.fonticonfn = function () {
            
            icon_iframe = $($G('fonticon')).find('iframe')[0].contentDocument;
            var iframe_a = $(icon_iframe).find('.the-icons a');
            iframe_a.removeAttr('href').css('cursor', 'pointer').unbind('click').on('click', function (e) {
                iframe_a.removeClass('iconfocus');
                var t = $(e.srcElement || e.target).children('i');
                t.parent('a').addClass('iconfocus');
                var cls = t.attr('class');
               // alert(cls)
            })
        }

    }



    /* 在线图片 */
    function RemoteImage(target) {
        this.container = utils.isString(target) ? document.getElementById(target) : target;
        this.init();
    }
    RemoteImage.prototype = {
        init: function () {
            this.initContainer();
            this.initEvents();
        },
        initContainer: function () {
            this.dom = {
                'url': $G('url'),
                'width': $G('width'),
                'height': $G('height'),
                'border': $G('border'),
                'vhSpace': $G('vhSpace'),
                'title': $G('title'),
                'align': $G('align')
            };
            var img = parent.edValue;
            if (img) {
                this.setImage(img);
            }
        },
        initEvents: function () {
            var _this = this,
                locker = $G('lock');

            /* 改变url */
            $($G("url")).on('keyup', updatePreview);
            $($G("border")).on('keyup', updatePreview);
            $($G("title")).on('keyup', updatePreview);

            $($G("width")).on('keyup', function(){
                updatePreview();
                if(locker.checked) {
                    var proportion =locker.getAttribute('data-proportion');
                    $G('height').value = Math.round(this.value / proportion);
                } else {
                    _this.updateLocker();
                }
            });
            $($G("height")).on('keyup', function(){
                updatePreview();
                if(locker.checked) {
                    var proportion =locker.getAttribute('data-proportion');
                    $G('width').value = Math.round(this.value * proportion);
                } else {
                    _this.updateLocker();
                }
            });
            $($G("lock")).on('change', function(){
                var proportion = parseInt($G("width").value) /parseInt($G("height").value);
                locker.setAttribute('data-proportion', proportion);
            });

            function updatePreview(){
                _this.setPreview();
            }
        },
        updateLocker: function(){
            var width = $G('width').value,
                height = $G('height').value,
                locker = $G('lock');
            //if(width && height && width == parseInt(width) && height == parseInt(height)) {
            //    locker.disabled = false;
            //    locker.title = '';
            //} else {
            //    locker.checked = false;
            //    locker.disabled = 'disabled';
            //    locker.title = lang.remoteLockError;
            //}
        },
        setImage: function(img){
            /* 不是正常的图片 */
           // if (!img.tagName || img.tagName.toLowerCase() != 'img' && !img.getAttribute("src") || !img.src) return;

            /*var wordImgFlag = img.getAttribute("word_img"),
                src = wordImgFlag ? wordImgFlag.replace("&amp;", "&") : (img.getAttribute('_src') || img.getAttribute("src", 2).replace("&amp;", "&"));
              //  align = utils.queryCommandValue("imageFloat");
              */
            if (!img.src) return;
            var src = img.src;
            /* 防止onchange事件循环调用 */
            if (src !== $G("url").value) $G("url").value = src;
            if(src) {
                /* 设置表单内容 */
                $G("width").value = img.width || '';
                $G("height").value = img.height || '';
                $G("border").value = img.border || '0';
                $G("vhSpace").value = img.vspace || '0';
                $G("title").value = img.title || img.alt || '';
               // setAlign(align);
                this.setPreview();
                this.updateLocker();
            }
        },
        getData: function(){
            var data = {};
            for(var k in this.dom){
                data[k] = this.dom[k].value;
            }
            return data;
        },
        setPreview: function(){
            var url = $G('url').value,
                ow = parseInt($G('width').value, 10) || 0,
                oh = parseInt($G('height').value, 10) || 0,
                border = parseInt($G('border').value, 10) || 0,
                title = $G('title').value,
                preview = $G('preview'),
                width,
                height;

            url = utils.unhtmlForUrl(url);
            title = utils.unhtml(title);

            width = ((!ow || !oh) ? preview.offsetWidth:Math.min(ow, preview.offsetWidth));
            width = width+(border*2) > preview.offsetWidth ? width:(preview.offsetWidth - (border*2));
            height = (!ow || !oh) ? '':width*oh/ow;

            if(url) {
                preview.innerHTML = '<img src="' + url + '" width="' + width + '" height="' + height + '" border="' + border + 'px solid #000" title="' + title + '" />';
            }
        },
        getInsertList: function () {
            var data = this.getData();
            if(data['url']) {
                return [{
                    src: data['url'],
                    _src: data['url'],
                    width: data['width'] || '',
                    height: data['height'] || '',
                    border: data['border'] || '',
                    floatStyle: data['align'] || '',
                    vspace: data['vhSpace'] || '',
                    title: data['title'] || '',
                    alt: data['title'] || '',
                    style: "width:" + data['width'] + "px;height:" + data['height'] + "px;"
                }];
            } else {
                return [];
            }
        }
    };



    /* 上传图片 */
    function UploadImage(target) {
        this.$wrap = target.constructor == String ? $('#' + target) : $(target);
        this.init();
    }
    UploadImage.prototype = {
        init: function () {
            this.imageList = [];
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
                uploader,
                actionUrl = utils.getActionUrl(utils.getOpt('imageActionName')),
                acceptExtensions = (utils.getOpt('imageAllowFiles') || []).join('').replace(/\./g, ',').replace(/^[,]/, ''),
                imageMaxSize = utils.getOpt('imageMaxSize'),
                imageCompressBorder = utils.getOpt('imageCompressBorder');

            if (!WebUploader.Uploader.support()) {
                $('#filePickerReady').after($('<div>').html(lang.errorNotSupport)).hide();
                return;
            } else if (!utils.getOpt('imageActionName')) {
                $('#filePickerReady').after($('<div>').html(lang.errorLoadConfig)).hide();
                return;
            }

            uploader = _this.uploader = WebUploader.create({
                pick: {
                    id: '#filePickerReady',
                    label: lang.uploadSelectFile
                },
                accept: {
                    title: 'Images',
                    extensions: acceptExtensions,
                    mimeTypes: 'image/*'
                },
                swf: '../../third-party/webuploader/Uploader.swf',
                server: actionUrl,
                fileVal: utils.getOpt('imageFieldName'),
                duplicate: true,
                fileSingleSizeLimit: imageMaxSize,    // 默认 2 M
                compress: utils.getOpt('imageCompressEnable') ? {
                    width: imageCompressBorder,
                    height: imageCompressBorder,
                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 90,
                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: false,
                    // 是否允许裁剪。
                    crop: false,
                    // 是否保留头部meta信息。
                    preserveHeaders: true
                }:false
            });
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
                    percentages[ file.id ] = [ file.size, 0 ];
                    file.rotation = 0;

                    /* 检查文件格式 */
                    if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1) {
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

            uploader.on('fileQueued', function (file) {
                fileCount++;
                fileSize += file.size;

                if (fileCount === 1) {
                    $placeHolder.addClass('element-invisible');
                    $statusBar.show();
                }

                addFile(file);
            });

            uploader.on('fileDequeued', function (file) {
                fileCount--;
                fileSize -= file.size;

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
                            title:_data&&_data.name,
                            error:json.errMsg
                        } ;
                           
                    if (_json.state=='SUCCESS') {
                        _this.imageList.push(_json);
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
                prefix = utils.getOpt('imageUrlPrefix');
            prefix = window.location.href.indexOf('localhost') != -1 ? utils.virtualPath + '/' : '';
            for (i = 0; i < this.imageList.length; i++) {
                data = this.imageList[i];
                list.push({
                    src: prefix + data.url,
                    _src: prefix + data.url,
                    title: data.title,
                    alt: data.original
                });
            }
            return list;
        }
    };


    /* 在线图片 */
    function OnlineImage(target) {
        this.container = utils.isString(target) ? document.getElementById(target) : target;
        this.init();
    }
    OnlineImage.prototype = {
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

            /* 滚动拉取图片 */
            $($G('imageList')).on('scroll', function (e) {
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
            this.listSize = utils.getOpt('imageManagerListSize');
            this.listIndex = 0;
            this.listEnd = false;

            /* 第一次拉取数据 */
            this.getImageData();
        },
        /* 重置界面 */
        reset: function() {
            this.initContainer();
            this.initData();
        },
        /* 向后台拉取图片列表数据 */
        getImageData: function () {
            var _this = this;
            if(!_this.listEnd && !this.isLoadingData) {
                this.isLoadingData = true;
                var url = utils.getActionUrl(utils.getOpt('imageManagerActionName')),
                    isJsonp = utils.isCrossDomainUrl(url);
                //数据服务改造版
                hwDas.getdirs({host:utils.hwDataServHost,mark:utils.hwcode}, utils.dirPath, utils.getOpt('imageManagerAllowFiles'), function (r) {
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
                                $(_this.clearFloat).html('无可用的图片!').css({
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
                            $(_this.clearFloat).html('无可用的图片!').css({
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
        /* 添加图片到列表界面上 */
        pushData: function (list) {
            var i, item, img, icon, _this = this,
                urlPrefix = utils.getOpt('imageManagerUrlPrefix');
            
            for (i = 0; i < list.length; i++) {
                if(list[i] && list[i].url) {
                    item = document.createElement('li');
                    img = document.createElement('img');
                    icon = document.createElement('span');
                    var title = document.createElement('span');
                    $(img).on('load', (function (image) {
                        return function(){
                            _this.scale(image, image.parentNode.offsetWidth, image.parentNode.offsetHeight);
                        }
                    })(img));
                    img.width = 113;
                    img.setAttribute('src', urlPrefix + list[i].url + (list[i].url.indexOf('?') == -1 ? '?noCache=':'&noCache=') + (+new Date()).toString(36) );
                    img.setAttribute('_src', urlPrefix + list[i].url);
                    $(icon).addClass('icon');

                    //mafei
                    
                    var url = list[i].url;
                    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
                    var filter_name = fileName.split('_');
                    filter_name.shift();
                    var _title = filter_name.join('') || url.replace(utils.getOpt('imageManagerListPath')+'/','')
                    title.innerHTML = list[i].name||_title;
                    $(title).addClass('title').attr('title', url);
                    $(icon).attr('title', url);
                    item.appendChild(img);
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
                    var img = lis[i].firstChild,
                        src = img.getAttribute('_src');
                    list.push({
                        src: src,
                        _src: src,
                        alt: src.substr(src.lastIndexOf('/') + 1)
                    });
                }

            }
            return list;
        }
    };

})();
