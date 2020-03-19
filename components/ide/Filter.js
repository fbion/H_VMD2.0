xds["vmd.ux.Filter"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Filter",
    category: "vmd复合组件",
    text: "Filter",//中文
    naming: "hwFilter",
    //dtype 设计时组件
    dtype: "vmd.ux.Filter",
    //xtype 运行时组件
    xtype: "vmd.ux.Filter",
    xcls: "vmd.ux.Filter",
    //为了拖拽能自动生成递增id
    defaultName: "hwFilter",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
    xds.Registry.register(xds["vmd.ux.Filter"]);
    xds.Registry.addUserType(xds["vmd.ux.Filter"]);

    var Data_vmd_ux_Filter={"BaseType":"Control","Type":"vmd_ux_Filter","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(data1,data2)","Args":{"_Return_":"void","Args":"data1,data2"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Filter)