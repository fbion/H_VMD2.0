xds["vmd.ux.FontSize"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontSize",
    category: "vmd复合组件",
    text: "FontSize",//中文
    naming: "hwFontSize",
    //dtype 设计时组件
    dtype: "vmd.ux.FontSize",
    //xtype 运行时组件
    xtype: "vmd.ux.FontSize",
    xcls: "vmd.ux.FontSize",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontSize",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
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
     ,{"name":"sizeChange","group":"事件","ctype":"string","editor":"ace","params":"record"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontSize"]);
    xds.Registry.addUserType(xds["vmd.ux.FontSize"]);

    var Data_vmd_ux_FontSize={"BaseType":"Control","Type":"vmd_ux_FontSize","Property":{},"Method":{"getFontSize":{"Description":"getFontSize","Prototype":"getFontSize()","Args":{"_Return_":"void","Args":""},"Example":""},"setFontSize":{"Description":"setFontSize","Prototype":"setFontSize(fontSize)","Args":{"_Return_":"void","Args":"fontSize"},"Example":""}},"Event":{"sizeChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontSize)