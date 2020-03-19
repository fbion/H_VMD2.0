xds["vmd.ux.TestDXX"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestDXX",
    category: "vmd复合组件",
    text: "TestDXX",//中文
    naming: "TestDXX",
    //dtype 设计时组件
    dtype: "vmd.ux.TestDXX",
    //xtype 运行时组件
    xtype: "vmd.ux.TestDXX",
    xcls: "vmd.ux.TestDXX",
    //为了拖拽能自动生成递增id
    defaultName: "TestDXX",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TestDXX"]);
    xds.Registry.addUserType(xds["vmd.ux.TestDXX"]);

    var Data_vmd_ux_TestDXX={"BaseType":"Control","Type":"vmd_ux_TestDXX","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TestDXX)