xds["vmd.ux.FontStyle"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontStyle",
    category: "vmd复合组件",
    text: "FontStyle",//中文
    naming: "hwFontStyle",
    //dtype 设计时组件
    dtype: "vmd.ux.FontStyle",
    //xtype 运行时组件
    xtype: "vmd.ux.FontStyle",
    xcls: "vmd.ux.FontStyle",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontStyle",
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
     ,{"name":"styleChange","group":"事件","ctype":"string","editor":"ace","params":"record"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontStyle"]);
    xds.Registry.addUserType(xds["vmd.ux.FontStyle"]);

    var Data_vmd_ux_FontStyle={"BaseType":"Control","Type":"vmd_ux_FontStyle","Property":{},"Method":{"getFontStyle":{"Description":"getFontStyle","Prototype":"getFontStyle()","Args":{"_Return_":"void","Args":""},"Example":""},"setFontStyle":{"Description":"setFontStyle","Prototype":"setFontStyle(style)","Args":{"_Return_":"void","Args":"style"},"Example":""}},"Event":{"styleChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontStyle)