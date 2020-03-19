xds["vmd.ux.VisualEditorEx"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.VisualEditorEx",
    category: "vmd复合组件",
    text: "VisualEditorEx",//中文
    naming: "hwVisualEditorEx",
    //dtype 设计时组件
    dtype: "vmd.ux.VisualEditorEx",
    //xtype 运行时组件
    xtype: "vmd.ux.VisualEditorEx",
    xcls: "vmd.ux.VisualEditorEx",
    //为了拖拽能自动生成递增id
    defaultName: "hwVisualEditorEx",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["lib/ace/ace.js?ver=vmd2.0.4.190810","lib/ace/mode-base.js?ver=vmd2.0.4.190810","lib/ace/theme-xcode.js?ver=vmd2.0.4.190810","lib/ace/ext-language_tools.js?ver=vmd2.0.4.190810"],
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
    xds.Registry.register(xds["vmd.ux.VisualEditorEx"]);
    xds.Registry.addUserType(xds["vmd.ux.VisualEditorEx"]);

    var Data_vmd_ux_VisualEditorEx={"BaseType":"Control","Type":"vmd_ux_VisualEditorEx","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":""}},"Event":{"getColor":{"Prototype":"","Args":{"_Return_":""},"Example":""},"setColor":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_VisualEditorEx)