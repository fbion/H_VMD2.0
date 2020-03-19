xds["vmd.ux.TabProjectInfoNew"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TabProjectInfoNew",
    category: "vmd复合组件",
    text: "TabProjectInfoNew",//中文
    naming: "TabProjectInfoNew",
    //dtype 设计时组件
    dtype: "vmd.ux.TabProjectInfoNew",
    //xtype 运行时组件
    xtype: "vmd.ux.TabProjectInfoNew",
    xcls: "vmd.ux.TabProjectInfoNew",
    //为了拖拽能自动生成递增id
    defaultName: "TabProjectInfoNew",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
    xds.Registry.register(xds["vmd.ux.TabProjectInfoNew"]);
    xds.Registry.addUserType(xds["vmd.ux.TabProjectInfoNew"]);

    var Data_vmd_ux_TabProjectInfoNew={"BaseType":"Control","Type":"vmd_ux_TabProjectInfoNew","Property":{},"Method":{"iSaveData":{"Description":"保存数据接口，保存基本信息、工作流、数据服务的Tab页的信息。","Prototype":"iSaveData(callback)","Args":{"_Return_":"无","Args":"callback"},"Example":"保存数据接口，保存基本信息、工作流、数据服务的Tab页的信息。"},"iSetId":{"Description":"设置工区、项目的ID","Prototype":"iSetId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区、项目的ID"},"iGetName":{"Description":"获取名称","Prototype":"iGetName()","Args":{"_Return_":"字符串","Args":""},"Example":"获取名称"},"iSetIfDataLoaded":{"Description":"设置是否已加载","Prototype":"iSetIfDataLoaded(bVar)","Args":{"_Return_":"无","Args":"bVar"},"Example":"设置是否已加载"},"iSetWorkSpaceId":{"Description":"设置工区id","Prototype":"iSetWorkSpaceId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区id"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TabProjectInfoNew)