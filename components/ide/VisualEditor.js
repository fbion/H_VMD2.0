xds["vmd.ux.VisualEditor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.VisualEditor",
    category: "vmd复合组件",
    text: "VisualEditor",//中文
    naming: "hwVisualEditor",
    //dtype 设计时组件
    dtype: "vmd.ux.VisualEditor",
    //xtype 运行时组件
    xtype: "vmd.ux.VisualEditor",
    xcls: "vmd.ux.VisualEditor",
    //为了拖拽能自动生成递增id
    defaultName: "hwVisualEditor",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["lib/ace/ace.js","lib/ace/mode-base.js","lib/ace/theme-xcode.js","lib/ace/ext-language_tools.js"],
	requireCmpType:'',
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
     ,{"name":"getColor","group":"事件","ctype":"string","editor":"ace","params":"info,value"},{"name":"setColor","group":"事件","ctype":"string","editor":"ace","params":"info,value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.VisualEditor"]);
    xds.Registry.addUserType(xds["vmd.ux.VisualEditor"]);

    var Data_vmd_ux_VisualEditor={"BaseType":"Control","Type":"vmd_ux_VisualEditor","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"getColor":{"Prototype":"","Args":{"_Return_":""},"Example":""},"setColor":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_VisualEditor)