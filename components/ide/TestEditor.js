xds["vmd.ux.TestEditor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestEditor",
    category: "vmd复合组件",
    text: "TestEditor",//中文
    naming: "TestEditor",
    //dtype 设计时组件
    dtype: "vmd.ux.TestEditor",
    //xtype 运行时组件
    xtype: "vmd.ux.TestEditor",
    xcls: "vmd.ux.TestEditor",
    //为了拖拽能自动生成递增id
    defaultName: "TestEditor",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"anchor"},
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
    xds.Registry.register(xds["vmd.ux.TestEditor"]);
    xds.Registry.addUserType(xds["vmd.ux.TestEditor"]);

    var Data_vmd_ux_TestEditor={"BaseType":"Control","Type":"vmd_ux_TestEditor","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TestEditor)