xds["vmd.ux.Borderline"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Borderline",
    category: "vmd复合组件",
    text: "Borderline",//中文
    naming: "Borderline",
    //dtype 设计时组件
    dtype: "vmd.ux.Borderline",
    //xtype 运行时组件
    xtype: "vmd.ux.Borderline",
    xcls: "vmd.ux.Borderline",
    //为了拖拽能自动生成递增id
    defaultName: "Borderline",
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
     ,{"name":"colorChanged","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"borderStyleChanged","group":"事件","ctype":"string","editor":"ace","params":"lineStyle"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Borderline"]);
    xds.Registry.addUserType(xds["vmd.ux.Borderline"]);

    var Data_vmd_ux_Borderline={"BaseType":"Control","Type":"vmd_ux_Borderline","Property":{},"Method":{"getBorderLineInfo":{"Description":"getBorderLineInfo","Prototype":"getBorderLineInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setBorderLineInfo":{"Description":"setBorderLineInfo","Prototype":"setBorderLineInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"colorChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""},"borderStyleChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Borderline)