undefined
Ext.define("vmd.ux.UploaderEx", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.UploaderEx",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 718,
    height: 550,
    layout: "fit",
    afterrender: "UploaderEx_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.UploaderEx_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.UploaderEx'
                }, ex, 50);
            }
        }
    },
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
            var page = this;

            function intuploader() {
                var iframe = Ext.getDom(page.el.child('iframe'));
                if (!iframe) return
                iframe.src = vmd.virtualPath + '/js/plugins/file/index.html';
                iframe.onload = function() {
                    page.uploadframe = iframe;
                    iframe.contentWindow.uploaderInit(function(uploader) {
                        page.fireEvent('loaded', page, uploader)
                        page.uploader = uploader;
                        //兼容upload2
                        page.uploader.upload2 = upload;
                        //第一次加载
                        if (page._doUploader) {
                            page._doUploader();
                        }
                    }, {
                        fileNumLimit: page.fileNumLimit,
                        mimeTypes: page.mineTypes,
                        host: vmdSettings.dataServiceIp,
                        virtualPath: vmd.virtualPath
                    })
                }
            }

            function UploaderEx_afterrender(sender) {
                //加载样式及脚本
                // vmd.loadCss(vmd.virtualPath+'/lib/webuploader/webuploader.css');
                // vmd.loadCss(vmd.virtualPath+'/js/plugins/file/file.css');
                // $LAB.script(vmd.virtualPath+'/lib/webuploader/webuploader.min.js')
                // .script(vmd.virtualPath+'/js/plugins/file/file.js')
                // .wait(function(){
                //     window.uploaderInit(function(uploader){
                //         page.fireEvent('loaded',page,uploader)
                //         page.uploader=uploader;
                //     },{
                //         fileNumLimit:page.fileNumLimit,
                //         mimeTypes:page.mineTypes
                //     })
                // })
                //intuploader()
            }

            function setDirUpload(isEnableDirUpload) {
                if (isEnableDirUpload) {
                    //能够上传文件夹
                    page.uploader.isEnableDirUpload = true;
                    //vmd('.webuploader-element-invisible').attr('webkitdirectory', '').attr('directory', '');
                    vmd(iframeScope.document).find('.webuploader-element-invisible').attr('webkitdirectory', '').attr('directory', '');
                } else {
                    //只能上传文件
                    page.uploader.isEnableDirUpload = false;
                    //vmd('.webuploader-element-invisible').removeAttr('webkitdirectory').removeAttr('directory');
                    vmd(iframeScope.document).find('.webuploader-element-invisible').removeAttr('webkitdirectory').removeAttr('directory');
                }
            }

            function upload(title, savedir, callback, hwcode, host) {
                var me = this;
                //  var Uploader=this._scope;
                var filetype;
                // if (!Uploader) return;
                if (Ext.isObject(title)) {
                    var _upload = Ext.clone(title);
                    title = _upload.title;
                    savedir = _upload.savedir;
                    callback = _upload.callback;
                    hwcode = _upload.hwcode;
                    host = _upload.host;
                    if (_upload.url) host = _upload.url;
                }
                if (page.uploadframe) {
                    var iframeScope = page.uploadframe.contentWindow;
                    //  iframeScope.utils.options['fileAllowFiles'] = filetype || iframeScope.utils.getOpt('fileAllowFiles')
                }
                if (!page.win) {
                    page.win = new vmd.window({
                        items: page,
                        auto: false,
                        height: 500,
                        width: 655,
                        maximizable: false,
                        resizable: false,
                        closeAction: 'hide',
                        title: title || "文件上传"
                    })
                    intuploader()
                }
                page.show()
                page.win.show();
                page.win.hide();
                page._doUploader = function() {
                    var iframeScope = page.uploadframe.contentWindow;
                    //上传接口
                    hwcode = hwcode || iframeScope.utils.hwcode;
                    page.uploader.uploader.on('ready', function(file) {
                        vmd(iframeScope.document).find('#filePickerReady .webuploader-element-invisible').click()
                    })
                    page.uploader.upload(host, savedir, page.win, callback, hwcode);
                    //page.uploader.upload(null, savedir, page.win, callback, hwcode);
                    //注册事件
                    page.uploader.uploader.on('fileQueued', function(file) {})
                }
                //自动触发
                page.uploadframe && page._doUploader()
            }

            function panel_afterrender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.UploaderEx',
                p2: ex.message
            }, ex, 100);
        }
        this.UploaderEx_afterrender = UploaderEx_afterrender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: true,
            height: 100,
            x: 170,
            y: 110,
            html: "<iframe width=\"100%\" height=\"100%\" scrolling=\"no\" frameborder=0></iframe>",
            afterrender: "panel_afterrender",
            listeners: {
                vmdafterrender: panel_afterrender
            },
            mineTypes: this.mineTypes,
            fileNumLimit: this.fileNumLimit
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getUploader = function() {
            //直接填写方法内容
            this.uploader._scope = this;
            return this.uploader
        }
        this.enableDirUpload = function() {
            //直接填写方法内容
            setDirUpload(true)
        }
        this.disableDirUpload = function() {
            //直接填写方法内容
            setDirUpload(false)
        }
        this.upload = function(title, savedir, callback, hwcode, host) {
            //直接填写方法内容
            upload(title, savedir, callback, hwcode, host)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.UploaderEx");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.UploaderEx");
    }
})