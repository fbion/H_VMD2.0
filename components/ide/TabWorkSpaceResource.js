xds["vmd.ux.TabWorkSpaceResource"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TabWorkSpaceResource",
    category: "vmd复合组件",
    text: "TabWorkSpaceResource",//中文
    naming: "TabWorkSpaceResource",
    //dtype 设计时组件
    dtype: "vmd.ux.TabWorkSpaceResource",
    //xtype 运行时组件
    xtype: "vmd.ux.TabWorkSpaceResource",
    xcls: "vmd.ux.TabWorkSpaceResource",
    //为了拖拽能自动生成递增id
    defaultName: "TabWorkSpaceResource",
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
    xds.Registry.register(xds["vmd.ux.TabWorkSpaceResource"]);
    xds.Registry.addUserType(xds["vmd.ux.TabWorkSpaceResource"]);

    var Data_vmd_ux_TabWorkSpaceResource={"BaseType":"Control","Type":"vmd_ux_TabWorkSpaceResource","Property":{},"Method":{"iSetWorkSpaceId":{"Description":"设置工区ID","Prototype":"iSetWorkSpaceId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区ID"},"iSetDataStore":{"Description":"iSetDataStore","Prototype":"iSetDataStore(store)","Args":{"_Return_":"void","Args":"store"},"Example":""},"iSetId":{"Description":"设置ID","Prototype":"iSetId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置ID"},"iSetApplyType":{"Description":"iSetApplyType","Prototype":"iSetApplyType(type)","Args":{"_Return_":"无","Args":"type"},"Example":""},"iClearAll":{"Description":"清空所有资源信息","Prototype":"iClearAll()","Args":{"_Return_":"无","Args":""},"Example":"清空所有资源信息"},"iQueryResource":{"Description":"根据ID获取资源","Prototype":"iQueryResource(id)","Args":{"_Return_":"无","Args":"id"},"Example":"根据ID获取资源"},"iSetIfDataLoaded":{"Description":"设置数据是否已经查询了","Prototype":"iSetIfDataLoaded(bVar)","Args":{"_Return_":"无","Args":"bVar"},"Example":"设置数据是否已经查询了"},"iTabChangeResource":{"Description":"TabChange显示资源Tab页","Prototype":"iTabChangeResource()","Args":{"_Return_":"无","Args":""},"Example":"TabChange显示资源Tab页"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TabWorkSpaceResource)