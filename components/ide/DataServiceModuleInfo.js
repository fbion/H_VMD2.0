xds["vmd.ux.DataServiceModuleInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DataServiceModuleInfo",
    category: "vmd复合组件",
    text: "DataServiceModuleInfo",//中文
    naming: "DataServiceModuleInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.DataServiceModuleInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.DataServiceModuleInfo",
    xcls: "vmd.ux.DataServiceModuleInfo",
    //为了拖拽能自动生成递增id
    defaultName: "DataServiceModuleInfo",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {},
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
    xds.Registry.register(xds["vmd.ux.DataServiceModuleInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.DataServiceModuleInfo"]);

    var Data_vmd_ux_DataServiceModuleInfo={"BaseType":"Control","Type":"vmd_ux_DataServiceModuleInfo","Property":{},"Method":{"refresh":{"Description":"refresh","Prototype":"refresh(tree,projectid,workspaceid)","Args":{"_Return_":"void","Args":"tree,projectid,workspaceid"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DataServiceModuleInfo)