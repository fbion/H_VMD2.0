Ext.define("vmd.ux.Uploader" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Uploader",
	title:"Panel",
	header:false,
	border:false,
	width:718,
	height:550,
	layout:"fit",
	afterrender:"Uploader_afterrender",
	listeners:{
		afterrender:function(){
	this.Uploader_afterrender(this)
}
	},
	initComponent: function(){
		var page=this;
function Uploader_afterrender(sender){
//加载样式及脚本

vmd.loadCss(bootPATH+'lib/webuploader/webuploader.css');
vmd.loadCss(bootPATH+'js/plugins/file/file.css');
$LAB.script(bootPATH+'lib/webuploader/webuploader.min.js')
.script(bootPATH+'js/plugins/file/file.js')
.wait(function(){
    
    window.uploaderInit(function(uploader){
        page.fireEvent('loaded',page,uploader)
        page.uploader=uploader;
    })

})
}


			this.Uploader_afterrender=Uploader_afterrender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				height:100,
				x:170,
				y:110,
				html:"<div id=\"editor\" style=\"display:none\"></div>    <div class=\"wrapper\">        <div id=\"tabhead\" class=\"tabhead\">            <span class=\"tab focus\" data-content-id=\"upload\">本地上传</span>            <span class=\"tab\" data-content-id=\"online\">文件列表</span>        </div>               <div id=\"tabbody\" class=\"tabbody\">            <!-- 上传文件 -->            <div id=\"upload\" class=\"panel focus\">                <div id=\"queueList\" class=\"queueList\">                    <div class=\"statusBar element-invisible\">                        <div class=\"progress\">                            <span class=\"text\">0%</span>                            <span class=\"percentage\"></span>                        </div><div class=\"info\"></div>                        <div class=\"btns\">                            <div id=\"filePickerBtn\"></div>                            <div class=\"uploadBtn\"><var id=\"lang_start_upload\"></var></div>                        </div>                    </div>                    <div id=\"dndArea\" class=\"placeholder\">                        <div class=\"filePickerContainer\">                            <div id=\"filePickerReady\"></div>                        </div>                    </div>                    <ul class=\"filelist element-invisible\">                        <li id=\"filePickerBlock\" class=\"filePickerBlock\"></li>                    </ul>                </div>            </div>            <!-- 文件列表 -->            <div id=\"online\" class=\"panel\">                <div id=\"fileList\"><var id=\"lang_imgLoading\"></var></div>            </div>        </div>    </div>"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
			this.getUploader= function(){
//直接填写方法内容

return this.uploader
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Uploader");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Uploader");
	}
})