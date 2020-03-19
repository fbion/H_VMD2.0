xds["vmd.ux.Evars"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Evars",
    category: "vmd复合组件",
    text: "Evars",//中文
    naming: "Evars",
    //dtype 设计时组件
    dtype: "vmd.ux.Evars",
    //xtype 运行时组件
    xtype: "vmd.ux.Evars",
    xcls: "vmd.ux.Evars",
    //为了拖拽能自动生成递增id
    defaultName: "Evars",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Evars"]);
    xds.Registry.addUserType(xds["vmd.ux.Evars"]);

    var Data_vmd_ux_Evars={"BaseType":"Control","Type":"vmd_ux_Evars","Property":{},"Method":{"getSysVarDefStore":{"Description":"获取系统变量默认数据集","Prototype":"getSysVarDefStore()","Args":{"_Return_":"对象","Args":""},"Example":"获取系统变量默认数据集"},"getEVarsInfo":{"Description":"getEVarsInfo","Prototype":"getEVarsInfo()","Args":{"_Return_":"void","Args":""},"Example":""},"saveEVarsInfo":{"Description":"saveEVarsInfo","Prototype":"saveEVarsInfo()","Args":{"_Return_":"void","Args":""},"Example":""},"setParamvarStore":{"Description":"setParamvarStore","Prototype":"setParamvarStore(store)","Args":{"_Return_":"void","Args":"store"},"Example":""},"setSysVarStore":{"Description":"setSysVarStore","Prototype":"setSysVarStore(store)","Args":{"_Return_":"void","Args":"store"},"Example":""},"setProject_id":{"Description":"setProject_id","Prototype":"setProject_id(project_id)","Args":{"_Return_":"void","Args":"project_id"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Evars)