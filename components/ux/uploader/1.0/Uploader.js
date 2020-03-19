undefined
Ext.define("vmd.ux.Uploader", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.Uploader",
    title: "Panel",
    header: false,
    border: false,
    width: 718,
    height: 550,
    layout: "fit",
    afterrender: "Uploader_afterrender",
    listeners: {
        vmdafterrender: function() {
            this.Uploader_afterrender(this)
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
        var page = this;

        function Uploader_afterrender(sender) {
            //加载样式及脚本
            vmd.loadCss(vmd.virtualPath + '/lib/webuploader/webuploader.css');
            vmd.loadCss(vmd.virtualPath + '/js/plugins/file/file.css');
            $LAB.script(vmd.virtualPath + '/lib/webuploader/webuploader.min.js')
                .script(vmd.virtualPath + '/js/plugins/file/file.js')
                .wait(function() {
                    window.uploaderInit(function(uploader) {
                        page.fireEvent('loaded', page, uploader)
                        page.uploader = uploader;
                    }, {
                        fileNumLimit: page.fileNumLimit,
                        mimeTypes: page.mineTypes
                    })
                })
        }

        function setDirUpload(isEnableDirUpload) {
            if (isEnableDirUpload) {
                //能够上传文件夹
                page.uploader.isEnableDirUpload = true;
                vmd('.webuploader-element-invisible').attr('webkitdirectory', '').attr('directory', '');
            } else {
                //只能上传文件
                page.uploader.isEnableDirUpload = false;
                vmd('.webuploader-element-invisible').removeAttr('webkitdirectory').removeAttr('directory');
            }
        }
        this.Uploader_afterrender = Uploader_afterrender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: true,
            height: 100,
            x: 170,
            y: 110,
            html: "<div id=\"editor\" style=\"display:none\"></div>    <div class=\"wrapper\">        <div id=\"tabhead\" class=\"tabhead\">            <span class=\"tab focus\" data-content-id=\"upload\">本地上传</span>            <span class=\"tab\" data-content-id=\"online\">文件列表</span>        </div>               <div id=\"tabbody\" class=\"tabbody\">            <!-- 上传文件 -->            <div id=\"upload\" class=\"panel focus\">                <div id=\"queueList\" class=\"queueList\">                    <div class=\"statusBar element-invisible\">                        <div class=\"progress\">                            <span class=\"text\">0%</span>                            <span class=\"percentage\"></span>                        </div><div class=\"info\"></div>                        <div class=\"btns\">                            <div id=\"filePickerBtn\"></div>                            <div class=\"uploadBtn\"><var id=\"lang_start_upload\"></var></div>                        </div>                    </div>                    <div id=\"dndArea\" class=\"placeholder\">                        <div class=\"filePickerContainer\">                            <div id=\"filePickerReady\"></div>                        </div>                    </div>                    <ul class=\"filelist element-invisible\">                        <li id=\"filePickerBlock\" class=\"filePickerBlock\"></li>                    </ul>                </div>            </div>            <!-- 文件列表 -->            <div id=\"online\" class=\"panel\">                <div id=\"fileList\"><var id=\"lang_imgLoading\"></var></div>            </div>        </div>    </div>",
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
        Ext.util.CSS.removeStyleSheet("vmd.ux.Uploader");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Uploader");
    }
})