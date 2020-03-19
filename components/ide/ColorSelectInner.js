xds["vmd.ux.ColorSelectInner"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ColorSelectInner",
    category: "vmd复合组件",
    text: "ColorSelectInner",//中文
    naming: "ColorSelectInner",
    //dtype 设计时组件
    dtype: "vmd.ux.ColorSelectInner",
    //xtype 运行时组件
    xtype: "vmd.ux.ColorSelectInner",
    xcls: "vmd.ux.ColorSelectInner",
    //为了拖拽能自动生成递增id
    defaultName: "ColorSelectInner",
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
    xds.Registry.register(xds["vmd.ux.ColorSelectInner"]);
    xds.Registry.addUserType(xds["vmd.ux.ColorSelectInner"]);

    var Data_vmd_ux_ColorSelectInner={"BaseType":"Control","Type":"vmd_ux_ColorSelectInner","Property":{},"Method":{"setOriColor":{"Description":"setOriColor","Prototype":"setOriColor(color)","Args":{"_Return_":"void","Args":"color"},"Example":""},"setColorDiv":{"Description":"setColorDiv","Prototype":"setColorDiv(selColor)","Args":{"_Return_":"void","Args":"selColor"},"Example":""},"getSelColor":{"Description":"getSelColor","Prototype":"getSelColor()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"bgColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ColorSelectInner)