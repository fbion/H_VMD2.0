xds["vmd.ux.StyleProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.StyleProperty",
    category: "vmd复合组件",
    text: "StyleProperty",//中文
    naming: "StyleProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.StyleProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.StyleProperty",
    xcls: "vmd.ux.StyleProperty",
    //为了拖拽能自动生成递增id
    defaultName: "StyleProperty",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.StyleProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.StyleProperty"]);

    var Data_vmd_ux_StyleProperty={"BaseType":"Control","Type":"vmd_ux_StyleProperty","Property":{},"Method":{"setStyleInfo":{"Description":"设置对齐信息","Prototype":"setStyleInfo(info,sheet,cell)","Args":{"_Return_":"无","Args":"info,sheet,cell"},"Example":"设置对齐信息"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_StyleProperty)