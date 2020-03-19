xds["vmd.ux.ProjectModule"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ProjectModule",
    category: "vmd复合组件",
    text: "ProjectModule",//中文
    naming: "ProjectModule",
    //dtype 设计时组件
    dtype: "vmd.ux.ProjectModule",
    //xtype 运行时组件
    xtype: "vmd.ux.ProjectModule",
    xcls: "vmd.ux.ProjectModule",
    //为了拖拽能自动生成递增id
    defaultName: "ProjectModule",
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
    xds.Registry.register(xds["vmd.ux.ProjectModule"]);
    xds.Registry.addUserType(xds["vmd.ux.ProjectModule"]);

    var Data_vmd_ux_ProjectModule={"BaseType":"Control","Type":"vmd_ux_ProjectModule","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ProjectModule)