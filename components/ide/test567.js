xds["vmd.ux.test567"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.test567",
    category: "vmd复合组件",
    text: "test567",//中文
    naming: "test567",
    //dtype 设计时组件
    dtype: "vmd.ux.test567",
    //xtype 运行时组件
    xtype: "vmd.ux.test567",
    xcls: "vmd.ux.test567",
    //为了拖拽能自动生成递增id
    defaultName: "test567",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"btntext":"button"},
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
      ,{"name":"btntext","group":"设计","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
xds.Registry.register(xds["vmd.ux.test567"]);
xds.Registry.addUserType(xds["vmd.ux.test567"]);

var Data_vmd_ux_test567={"BaseType":"Control","Type":"vmd_ux_test567","Property":{"btntext":{"Description":"按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"按钮文本"}},"Method":{"setText":{"Description":"a:string","Prototype":"setText(a)","Args":{"_Return_":"无","Args":"a"},"Example":"a:string"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_test567)