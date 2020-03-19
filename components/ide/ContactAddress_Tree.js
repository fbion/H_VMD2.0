xds["{vmduxcls}"] = Ext.extend(xds.Component, {
    cid: "{vmduxcls}",
    category: "vmd复合组件",
    text: "{vmdzhname}",//中文
    naming: "{vmdname}",
    //dtype 设计时组件
    dtype: "{vmduxcls}",
    //xtype 运行时组件
    xtype: "{vmduxcls}",
    xcls: "{vmduxcls}",
    //为了拖拽能自动生成递增id
    defaultName: "{vmdname}",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {vmddefalutConfigs},
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
     {vmddefineProps}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        {vmdlayoutConfig}
    }
    
});
    xds.Registry.register(xds["{vmduxcls}"]);
    xds.Registry.addUserType(xds["{vmduxcls}"]);

    {vmduxAceAutoMatchStr}