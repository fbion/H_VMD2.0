xds["vmd.ux.Rpt"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Rpt",
    category: "vmd复合组件",
    text: "Rpt",//中文
    naming: "hwRpt",
    //dtype 设计时组件
    dtype: "vmd.ux.Rpt",
    //xtype 运行时组件
    xtype: "vmd.ux.Rpt",
    xcls: "vmd.ux.Rpt",
    //为了拖拽能自动生成递增id
    defaultName: "hwRpt",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'report',
    //默认属性设置
    defaultConfig: {"path":"Rpt_report.json","align":"center","layout":"border"},
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
     ,{"name":"fillReport","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"path","group":"设计","ctype":"string","editor":"file","edConfig":{"fileid":"file"}},{"name":"dsnames","group":"设计","ctype":"string","editor":"string"},{"name":"align","group":"设计","ctype":"string","editor":"options","options":["left","center","right"],"edConfig":{}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Rpt"]);
    xds.Registry.addUserType(xds["vmd.ux.Rpt"]);

    var Data_vmd_ux_Rpt={"BaseType":"Control","Type":"vmd_ux_Rpt","Property":{"fillReport":{"Description":"测试","Prototype":"","Args":{"_Return_":""},"Example":"是否填报"},"path":{"Description":"模板路径","Prototype":"","Args":{"_Return_":""},"Example":"模板路径"},"dsnames":{"Description":"数据集名称","Prototype":"","Args":{"_Return_":""},"Example":"数据集名称"},"align":{"Description":"对齐方式","Prototype":"","Args":{"_Return_":""},"Example":"对齐方式"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Rpt)