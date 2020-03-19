xds["vmd.ux.WorkSpaceProject"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.WorkSpaceProject",
    category: "vmd复合组件",
    text: "WorkSpaceProject",//中文
    naming: "WorkSpaceProject",
    //dtype 设计时组件
    dtype: "vmd.ux.WorkSpaceProject",
    //xtype 运行时组件
    xtype: "vmd.ux.WorkSpaceProject",
    xcls: "vmd.ux.WorkSpaceProject",
    //为了拖拽能自动生成递增id
    defaultName: "WorkSpaceProject",
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
     ,{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
    xds.Registry.register(xds["vmd.ux.WorkSpaceProject"]);
    xds.Registry.addUserType(xds["vmd.ux.WorkSpaceProject"]);

    var Data_vmd_ux_WorkSpaceProject={"BaseType":"Control","Type":"vmd_ux_WorkSpaceProject","Property":{"store":{"Description":"工区项目关系数据集","Prototype":"","Args":{"_Return_":""},"Example":"工区项目关系数据集"}},"Method":{"iSetWorkSpaceInfo":{"Description":"设置当前工区的id和name","Prototype":"iSetWorkSpaceInfo(id, name)","Args":{"_Return_":"无","Args":"id, name"},"Example":"设置当前工区的id和name"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_WorkSpaceProject)