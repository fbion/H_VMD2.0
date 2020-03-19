xds["vmd.ux.Uploader"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Uploader",
    category: "vmd复合组件",
    text: "Uploader",//中文
    naming: "Uploader",
    //dtype 设计时组件
    dtype: "vmd.ux.Uploader",
    //xtype 运行时组件
    xtype: "vmd.ux.Uploader",
    xcls: "vmd.ux.Uploader",
    //为了拖拽能自动生成递增id
    defaultName: "Uploader",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
     ,{"name":"loaded","group":"事件","ctype":"string","editor":"ace","params":"uploader"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Uploader"]);
    xds.Registry.addUserType(xds["vmd.ux.Uploader"]);

    var Data_vmd_ux_Uploader={"BaseType":"Control","Type":"vmd_ux_Uploader","Property":{},"Method":{"getUploader":{"Description":"getUploader","Prototype":"getUploader()","Args":{"_Return_":"对象","Args":""},"Example":""}},"Event":{"loaded":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"组件初始化完成"}}}
	ControlsDataManage._add(Data_vmd_ux_Uploader)