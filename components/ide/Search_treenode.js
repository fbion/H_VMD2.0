xds["vmd.ux.Search_treenode"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Search_treenode",
    category: "vmd复合组件",
    text: "Search_treenode",//中文
    naming: "Search_treenode",
    //dtype 设计时组件
    dtype: "vmd.ux.Search_treenode",
    //xtype 运行时组件
    xtype: "vmd.ux.Search_treenode",
    xcls: "vmd.ux.Search_treenode",
    //为了拖拽能自动生成递增id
    defaultName: "Search_treenode",
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
     ,{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"parentField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"valueField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"textField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"loadType","group":"设计","ctype":"string","editor":"options","options":["分级加载","全部加载"],"edConfig":{}},{"name":"rootText","group":"设计","ctype":"string","editor":"string"},{"name":"hideRoot","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"checkBox","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"rootValue","group":"设计","ctype":"string","editor":"string"},{"name":"cascading","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"queryVar","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"var"}},{"name":"treeNode_checkChanged","group":"事件","ctype":"string","editor":"ace","params":"node,checked,checkedNodes,checked_jd"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Search_treenode"]);
    xds.Registry.addUserType(xds["vmd.ux.Search_treenode"]);

    var Data_vmd_ux_Search_treenode={"BaseType":"Control","Type":"vmd_ux_Search_treenode","Property":{"store":{"Description":"数据源","Prototype":"","Args":{"_Return_":""},"Example":"数据源"},"parentField":{"Description":"父级","Prototype":"","Args":{"_Return_":""},"Example":"父级"},"valueField":{"Description":"编码值","Prototype":"","Args":{"_Return_":""},"Example":"编码值"},"textField":{"Description":"文本值","Prototype":"","Args":{"_Return_":""},"Example":"文本值"},"loadType":{"Description":"加载类型","Prototype":"","Args":{"_Return_":""},"Example":"加载类型"},"rootText":{"Description":"根节点显示文字","Prototype":"","Args":{"_Return_":""},"Example":"根节点显示文字"},"hideRoot":{"Description":"隐藏根节点","Prototype":"","Args":{"_Return_":""},"Example":"隐藏根节点"},"checkBox":{"Description":"是否起用复选框","Prototype":"","Args":{"_Return_":""},"Example":"是否起用复选框"},"rootValue":{"Description":"根节点值","Prototype":"","Args":{"_Return_":""},"Example":"根节点值"},"cascading":{"Description":"级联","Prototype":"","Args":{"_Return_":""},"Example":"级联"},"queryVar":{"Description":"分级时的变量","Prototype":"","Args":{"_Return_":""},"Example":"分级时的变量"}},"Method":{},"Event":{"treeNode_checkChanged":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"树形节点改变"}}}
	ControlsDataManage._add(Data_vmd_ux_Search_treenode)