xds["vmd.ux.FontInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontInfo",
    category: "vmd复合组件",
    text: "FontInfo",//中文
    naming: "FontInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.FontInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.FontInfo",
    xcls: "vmd.ux.FontInfo",
    //为了拖拽能自动生成递增id
    defaultName: "FontInfo",
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
     ,{"name":"colorChanged","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"underlineChecked","group":"事件","ctype":"string","editor":"ace","params":"check"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.FontInfo"]);

    var Data_vmd_ux_FontInfo={"BaseType":"Control","Type":"vmd_ux_FontInfo","Property":{},"Method":{"fontSetInfo":{"Description":"fontSetInfo","Prototype":"fontSetInfo(info,cell)","Args":{"_Return_":"对象","Args":"info,cell"},"Example":""}},"Event":{"colorChanged":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"underlineChecked":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontInfo)