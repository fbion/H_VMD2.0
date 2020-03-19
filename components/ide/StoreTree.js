xds["vmd.ux.StoreTree"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.StoreTree",
    category: "vmd复合组件",
    text: "StoreTree",//中文
    naming: "hwStoreTree",
    //dtype 设计时组件
    dtype: "vmd.ux.StoreTree",
    //xtype 运行时组件
    xtype: "vmd.ux.StoreTree",
    xcls: "vmd.ux.StoreTree",
    //为了拖拽能自动生成递增id
    defaultName: "hwStoreTree",
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
    xds.Registry.register(xds["vmd.ux.StoreTree"]);
    xds.Registry.addUserType(xds["vmd.ux.StoreTree"]);

    var Data_vmd_ux_StoreTree={"BaseType":"Control","Type":"vmd_ux_StoreTree","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(dataStore)","Args":{"_Return_":"void","Args":"dataStore"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_StoreTree)