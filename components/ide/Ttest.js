xds["vmd.ux.Ttest"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Ttest",
    category: "vmd复合组件",
    text: "Ttest",//中文
    naming: "Ttest",
    //dtype 设计时组件
    dtype: "vmd.ux.Ttest",
    //xtype 运行时组件
    xtype: "vmd.ux.Ttest",
    xcls: "vmd.ux.Ttest",
    //为了拖拽能自动生成递增id
    defaultName: "Ttest",
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
     ,{"name":"a","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Ttest"]);
    xds.Registry.addUserType(xds["vmd.ux.Ttest"]);

    var Data_vmd_ux_Ttest={"BaseType":"Control","Type":"vmd_ux_Ttest","Property":{"a":{"Description":"A","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Ttest)