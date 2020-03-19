xds["vmd.ux.SelectorComponent1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.SelectorComponent1",
    category: "vmd复合组件",
    text: "SelectorComponent1",//中文
    naming: "SelectorComponent1",
    //dtype 设计时组件
    dtype: "vmd.ux.SelectorComponent1",
    //xtype 运行时组件
    xtype: "vmd.ux.SelectorComponent1",
    xcls: "vmd.ux.SelectorComponent1",
    //为了拖拽能自动生成递增id
    defaultName: "SelectorComponent1",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"wxText":"xccxcx","yxText":"Panel","layout":"vbox"},
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
     ,{"name":"wxText","group":"设计","ctype":"string","editor":"string"},{"name":"yxText","group":"设计","ctype":"string","editor":"string"},{"name":"BindingStore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"ParentNode","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"BindingStore"}},{"name":"Value","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"BindingStore"}},{"name":"TextField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"BindingStore"}},{"name":"LoadType","group":"设计","ctype":"string","editor":"options","options":["分级加载","全部加载"]},{"name":"RootValue","group":"设计","ctype":"string","editor":"string"},{"name":"RootText","group":"设计","ctype":"string","editor":"string"},{"name":"HideRoot","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"LeftClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"LeftAllClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"RightClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"RightAllClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"nodeClick","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"center","pack":"start"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.SelectorComponent1"]);
    xds.Registry.addUserType(xds["vmd.ux.SelectorComponent1"]);

    var Data_vmd_ux_SelectorComponent1={"BaseType":"Control","Type":"vmd_ux_SelectorComponent1","Property":{"wxText":{"Description":"未选框文本","Prototype":"","Args":{"_Return_":""},"Example":"未选框文本"},"yxText":{"Description":"已选文本","Prototype":"","Args":{"_Return_":""},"Example":"已选文本"},"BindingStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"绑定数据集"},"ParentNode":{"Description":"父节点","Prototype":"","Args":{"_Return_":""},"Example":"父节点"},"Value":{"Description":"值","Prototype":"","Args":{"_Return_":""},"Example":"值"},"TextField":{"Description":"显示文本","Prototype":"","Args":{"_Return_":""},"Example":"显示文本"},"LoadType":{"Description":"加载方式","Prototype":"","Args":{"_Return_":""},"Example":"加载方式"},"RootValue":{"Description":"根节点值","Prototype":"","Args":{"_Return_":""},"Example":"根节点值"},"RootText":{"Description":"根节点文本","Prototype":"","Args":{"_Return_":""},"Example":"根节点文本"},"HideRoot":{"Description":"隐藏根节点","Prototype":"","Args":{"_Return_":""},"Example":"隐藏根节点"}},"Method":{"getMyData":{"Description":"getMyData","Prototype":"getMyData()","Args":{"_Return_":"字符串,对象","Args":""},"Example":""},"initFun":{"Description":"页面初始化","Prototype":"initFun()","Args":{"_Return_":"无","Args":""},"Example":"页面初始化"}},"Event":{"LeftClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"LeftAllClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"RightClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"RightAllClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"nodeClick":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_SelectorComponent1)