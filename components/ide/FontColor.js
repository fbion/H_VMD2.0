xds["vmd.ux.FontColor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontColor",
    category: "vmd复合组件",
    text: "FontColor",//中文
    naming: "hwFontColor",
    //dtype 设计时组件
    dtype: "vmd.ux.FontColor",
    //xtype 运行时组件
    xtype: "vmd.ux.FontColor",
    xcls: "vmd.ux.FontColor",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontColor",
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
     ,{"name":"fontColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontColor"]);
    xds.Registry.addUserType(xds["vmd.ux.FontColor"]);

    var Data_vmd_ux_FontColor={"BaseType":"Control","Type":"vmd_ux_FontColor","Property":{},"Method":{"setOriColor":{"Description":"setOriColor","Prototype":"setOriColor(selColor)","Args":{"_Return_":"void","Args":"selColor"},"Example":""}},"Event":{"fontColorChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontColor)