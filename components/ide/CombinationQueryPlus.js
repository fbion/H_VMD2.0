xds["vmd.ux.CombinationQueryPlus"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CombinationQueryPlus",
    category: "vmd复合组件",
    text: "CombinationQueryPlus",//中文
    naming: "CombinationQueryPlus",
    //dtype 设计时组件
    dtype: "vmd.ux.CombinationQueryPlus",
    //xtype 运行时组件
    xtype: "vmd.ux.CombinationQueryPlus",
    xcls: "vmd.ux.CombinationQueryPlus",
    //为了拖拽能自动生成递增id
    defaultName: "CombinationQueryPlus",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"text":"lable:","layout":"hbox"},
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
     ,{"name":"text","group":"设计","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.CombinationQueryPlus"]);
    xds.Registry.addUserType(xds["vmd.ux.CombinationQueryPlus"]);

    var Data_vmd_ux_CombinationQueryPlus={"BaseType":"Control","Type":"vmd_ux_CombinationQueryPlus","Property":{"text":{"Description":"标签文本","Prototype":"","Args":{"_Return_":""},"Example":"标签文本"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_CombinationQueryPlus)