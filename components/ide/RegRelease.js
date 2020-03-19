xds["vmd.ux.RegRelease"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.RegRelease",
    category: "vmd复合组件",
    text: "RegRelease",//中文
    naming: "hwRegRelease",
    //dtype 设计时组件
    dtype: "vmd.ux.RegRelease",
    //xtype 运行时组件
    xtype: "vmd.ux.RegRelease",
    xcls: "vmd.ux.RegRelease",
    //为了拖拽能自动生成递增id
    defaultName: "hwRegRelease",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"subSysTreeStore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"datasource","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.RegRelease"]);
    xds.Registry.addUserType(xds["vmd.ux.RegRelease"]);

    var Data_vmd_ux_RegRelease={"BaseType":"Control","Type":"vmd_ux_RegRelease","Property":{"subSysTreeStore":{"Description":"subSysTreeStore","Prototype":"","Args":{"_Return_":""},"Example":""},"datasource":{"Description":"datasource","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"saveRegInfo":{"Description":"saveRegInfo","Prototype":"saveRegInfo(projectId,callback)","Args":{"_Return_":"void","Args":"projectId,callback"},"Example":""},"getRegInfo":{"Description":"getRegInfo","Prototype":"getRegInfo(projectId,callback)","Args":{"_Return_":"void","Args":"projectId,callback"},"Example":""},"getPtType":{"Description":"getPtType","Prototype":"getPtType()","Args":{"_Return_":"void","Args":""},"Example":""},"getptdb":{"Description":"设置平台库的默认值","Prototype":"getptdb()","Args":{"_Return_":"void","Args":""},"Example":"设置平台库的默认值"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_RegRelease)