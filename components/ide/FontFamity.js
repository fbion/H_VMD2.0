xds["vmd.ux.FontFamity"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontFamity",
    category: "vmd复合组件",
    text: "FontFamity",//中文
    naming: "hwFontFamity",
    //dtype 设计时组件
    dtype: "vmd.ux.FontFamity",
    //xtype 运行时组件
    xtype: "vmd.ux.FontFamity",
    xcls: "vmd.ux.FontFamity",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontFamity",
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
     ,{"name":"fontChange","group":"事件","ctype":"string","editor":"ace","params":"record"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontFamity"]);
    xds.Registry.addUserType(xds["vmd.ux.FontFamity"]);

    var Data_vmd_ux_FontFamity={"BaseType":"Control","Type":"vmd_ux_FontFamity","Property":{},"Method":{"setFontFamity":{"Description":"setFontFamity","Prototype":"setFontFamity(font)","Args":{"_Return_":"void","Args":"font"},"Example":""},"getSelFont":{"Description":"getSelFont","Prototype":"getSelFont()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"fontChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontFamity)