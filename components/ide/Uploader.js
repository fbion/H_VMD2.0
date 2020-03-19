xds["vmd.ux.Uploader"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Uploader",
    category: "vmd复合组件",
    text: "Uploader",//中文
    naming: "hwUploader",
    //dtype 设计时组件
    dtype: "vmd.ux.Uploader",
    //xtype 运行时组件
    xtype: "vmd.ux.Uploader",
    xcls: "vmd.ux.Uploader",
    //为了拖拽能自动生成递增id
    defaultName: "hwUploader",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
    isResizable: function (a, b) {

        return true;
    },
    //标准属性设置
    configs: [
         {
             name: "hidden",
             group: "外观",
             ctype: "boolean"
         },

      {
          name: "cls",
          group: "外观",
          ctype: "string"
      }, {
          name: "disabled",
          group: "外观",
          ctype: "boolean"
      }, {
          name: "id",
          group: "设计",
          ctype: "string"
      }, {
          name: "style",
          group: "外观",
          ctype: "string"
      }, {
          name: "width",
          group: "外观",
          ctype: "number"
      }
     , {
         name: "height",
         group: "外观",
         ctype: "number"
     }
     ,{"name":"mineTypes","group":"设计","ctype":"string","editor":"multiCombo","options":[{"text":".xls","value":".xls"},{"text":".xlsx","value":".xlsx"},{"text":".doc","value":".doc"},{"text":".docx","value":".docx"},{"text":".exe","value":".exe"},{"text":".jpeg","value":".jpeg"},{"text":".jpg","value":".jpg"},{"text":".png","value":".png"},{"text":".txt","value":".txt"},{"text":".ppt","value":".ppt"},{"text":".pptx","value":".pptx"},{"text":".pdf","value":".pdf"},{"text":".xml","value":".xml"},{"text":".zip","value":".zip"},{"text":".rar","value":".rar"},{"text":".js","value":".js"},{"text":".json","value":".json"},{"text":".html","value":".html"},{"text":".htm","value":".htm"},{"text":".css","value":".css"}]},{"name":"fileNumLimit","group":"设计","ctype":"number"},{"name":"loaded","group":"事件","ctype":"string","editor":"ace","params":"uploader"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Uploader"]);
    xds.Registry.addUserType(xds["vmd.ux.Uploader"]);

    var Data_vmd_ux_Uploader={"BaseType":"Control","Type":"vmd_ux_Uploader","Property":{"mineTypes":{"Description":"上传类型","Prototype":"","Args":{"_Return_":""},"Example":"上传类型"},"fileNumLimit":{"Description":"上传文件的个数","Prototype":"","Args":{"_Return_":""},"Example":"上传文件的个数"}},"Method":{"getUploader":{"Description":"getUploader","Prototype":"getUploader()","Args":{"_Return_":"对象","Args":""},"Example":""},"enableDirUpload":{"Description":"enableDirUpload","Prototype":"enableDirUpload()","Args":{"_Return_":"void","Args":""},"Example":""},"disableDirUpload":{"Description":"disableDirUpload","Prototype":"disableDirUpload()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"loaded":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"组件初始化完成"}}}
	ControlsDataManage._add(Data_vmd_ux_Uploader)