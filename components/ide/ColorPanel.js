xds["vmd.ux.ColorPanel"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ColorPanel",
    category: "vmd复合组件",
    text: "ColorPanel",//中文
    naming:"colorpanel",
    //dtype 设计时组件
    dtype: "vmd.ux.ColorPanel",
    //xtype 运行时组件
    xtype: "vmd.ux.ColorPanel",
    xcls: "vmd.ux.ColorPanel",
    //为了拖拽能自动生成递增id
    defaultName:"colorpanel",
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
     ,{"name":"bgColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ColorPanel"]);
    xds.Registry.addUserType(xds["vmd.ux.ColorPanel"]);

    var Data_vmd_ux_ColorPanel={"BaseType":"Control","Type":"vmd_ux_ColorPanel","Property":{},"Method":{"setOriColor":{"Description":"setOriColor","Prototype":"setOriColor(color)","Args":{"_Return_":"void","Args":"color"},"Example":""},"setColorDiv":{"Description":"setColorDiv","Prototype":"setColorDiv(selColor)","Args":{"_Return_":"void","Args":"selColor"},"Example":""},"getSelColor":{"Description":"getSelColor","Prototype":"getSelColor()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"bgColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ColorPanel)