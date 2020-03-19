xds["vmd.ux.DetailsofUnits"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DetailsofUnits",
    category: "vmd复合组件",
    text: "DetailsofUnits",//中文
    naming: "DetailsofUnits",
    //dtype 设计时组件
    dtype: "vmd.ux.DetailsofUnits",
    //xtype 运行时组件
    xtype: "vmd.ux.DetailsofUnits",
    xcls: "vmd.ux.DetailsofUnits",
    //为了拖拽能自动生成递增id
    defaultName: "DetailsofUnits",
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
     ,{"name":"config","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DetailsofUnits"]);
    xds.Registry.addUserType(xds["vmd.ux.DetailsofUnits"]);

    var Data_vmd_ux_DetailsofUnits={"BaseType":"Control","Type":"vmd_ux_DetailsofUnits","Property":{"config":{"Description":"配置","Prototype":"","Args":{"_Return_":""},"Example":"配置"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DetailsofUnits)