xds["vmd.ux.ZJ"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZJ",
    category: "vmd复合组件",
    text: "ZJ",//中文
    naming: "ZJ",
    //dtype 设计时组件
    dtype: "vmd.ux.ZJ",
    //xtype 运行时组件
    xtype: "vmd.ux.ZJ",
    xcls: "vmd.ux.ZJ",
    //为了拖拽能自动生成递增id
    defaultName: "ZJ",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"btntext":"测试1","btnsize":"small","btn1text":"测试2","btn1size":"small","labeltext":"测试3","layout":"absolute"},
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
     ,{"name":"btntext","group":"设计","ctype":"string","editor":"string"},{"name":"btnsize","group":"设计","ctype":"string","editor":"options","options":["(none)","mini","small","large"],"edConfig":{}},{"name":"btn1text","group":"设计","ctype":"string","editor":"string"},{"name":"btn1size","group":"设计","ctype":"string","editor":"options","options":["(none)","mini","small","large"],"edConfig":{}},{"name":"labeltext","group":"设计","ctype":"string","editor":"string"},{"name":"btnclick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"btn1click","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ZJ"]);
    xds.Registry.addUserType(xds["vmd.ux.ZJ"]);

    var Data_vmd_ux_ZJ={"BaseType":"Control","Type":"vmd_ux_ZJ","Property":{"btntext":{"Description":"按钮1的文本","Prototype":"","Args":{"_Return_":""},"Example":"按钮1的文本"},"btnsize":{"Description":"按钮1的大小","Prototype":"","Args":{"_Return_":""},"Example":"按钮1的大小"},"btn1text":{"Description":"按钮2的文本","Prototype":"","Args":{"_Return_":""},"Example":"按钮2的文本"},"btn1size":{"Description":"按钮2的大小","Prototype":"","Args":{"_Return_":""},"Example":"按钮2的大小"},"labeltext":{"Description":"标签的文本","Prototype":"","Args":{"_Return_":""},"Example":"标签的文本"}},"Method":{"setbtntext":{"Description":"按钮1的文本赋值","Prototype":"setbtntext(text)","Args":{"_Return_":"void","Args":"text"},"Example":"按钮1的文本赋值"},"setbtn1text":{"Description":"按钮2的文本赋值","Prototype":"setbtn1text(text)","Args":{"_Return_":"void","Args":"text"},"Example":"按钮2的文本赋值"}},"Event":{"btnclick":{"Prototype":"","Args":{"_Return_":""},"Example":"按钮1的点击事件"},"btn1click":{"Prototype":"","Args":{"_Return_":""},"Example":"按钮2的点击事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ZJ)