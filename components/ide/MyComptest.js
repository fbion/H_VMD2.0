xds["vmd.ux.MyComptest"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.MyComptest",
    category: "vmd复合组件",
    text: "MyComptest",//中文
    naming: "MyComptest",
    //dtype 设计时组件
    dtype: "vmd.ux.MyComptest",
    //xtype 运行时组件
    xtype: "vmd.ux.MyComptest",
    xcls: "vmd.ux.MyComptest",
    //为了拖拽能自动生成递增id
    defaultName: "MyComptest",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {},
    isResizable: function (a, b) {

        return true;
    },
    //标准属性设置
    configs: [

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
xds.Registry.register(xds["vmd.ux.MyComptest"]);
xds.Registry.addUserType(xds["vmd.ux.MyComptest"]);

var Data_vmd_ux_MyComptest={"BaseType":"Control","Type":"vmd_ux_MyComptest","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_MyComptest)