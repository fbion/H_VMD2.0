xds["vmd.ux.ZuJian"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZuJian",
    category: "vmd复合组件",
    text: "ZuJian",//中文
    naming: "ZuJian",
    //dtype 设计时组件
    dtype: "vmd.ux.ZuJian",
    //xtype 运行时组件
    xtype: "vmd.ux.ZuJian",
    xcls: "vmd.ux.ZuJian",
    //为了拖拽能自动生成递增id
    defaultName: "ZuJian",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"btntext":"button","btnsize":"small"},
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
     ,{"name":"btntext","group":"设计","ctype":"string","editor":"string"},{"name":"btnsize","group":"设计","ctype":"string","editor":"options","options":["(none)","mini","small","large"],"edConfig":{}},{"name":"btnclick","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
    xds.Registry.register(xds["vmd.ux.ZuJian"]);
    xds.Registry.addUserType(xds["vmd.ux.ZuJian"]);

    var Data_vmd_ux_ZuJian={"BaseType":"Control","Type":"vmd_ux_ZuJian","Property":{"btntext":{"Description":"btntext","Prototype":"","Args":{"_Return_":""},"Example":""},"btnsize":{"Description":"btnsize","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"setbtntext":{"Description":"setbtntext","Prototype":"setbtntext(text)","Args":{"_Return_":"void","Args":"text"},"Example":""}},"Event":{"btnclick":{"Prototype":"","Args":{"_Return_":""},"Example":"按钮1的点击事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ZuJian)