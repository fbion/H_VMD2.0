xds["vmd.ux.NodeBntGroup"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NodeBntGroup",
    category: "vmd复合组件",
    text: "NodeBntGroup",//中文
    naming: "NodeBntGroup",
    //dtype 设计时组件
    dtype: "vmd.ux.NodeBntGroup",
    //xtype 运行时组件
    xtype: "vmd.ux.NodeBntGroup",
    xcls: "vmd.ux.NodeBntGroup",
    //为了拖拽能自动生成递增id
    defaultName: "NodeBntGroup",
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
     ,{"name":"deleteClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"addClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"editClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"moveUpClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"moveDownClick","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.NodeBntGroup"]);
    xds.Registry.addUserType(xds["vmd.ux.NodeBntGroup"]);

    var Data_vmd_ux_NodeBntGroup={"BaseType":"Control","Type":"vmd_ux_NodeBntGroup","Property":{},"Method":{},"Event":{"deleteClick":{"Prototype":"","Args":{"_Return_":""},"Example":""},"addClick":{"Prototype":"","Args":{"_Return_":""},"Example":""},"editClick":{"Prototype":"","Args":{"_Return_":""},"Example":""},"moveUpClick":{"Prototype":"","Args":{"_Return_":""},"Example":""},"moveDownClick":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_NodeBntGroup)