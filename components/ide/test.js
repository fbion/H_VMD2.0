xds["vmd.ux.test"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.test",
    category: "vmd复合组件",
    text: "test",//中文
    naming: "hwtest",
    //dtype 设计时组件
    dtype: "vmd.ux.test",
    //xtype 运行时组件
    xtype: "vmd.ux.test",
    xcls: "vmd.ux.test",
    //为了拖拽能自动生成递增id
    defaultName: "hwtest",
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
    xds.Registry.register(xds["vmd.ux.test"]);
    xds.Registry.addUserType(xds["vmd.ux.test"]);

    var Data_vmd_ux_test={"BaseType":"Control","Type":"vmd_ux_test","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_test)