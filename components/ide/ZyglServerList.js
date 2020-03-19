xds["vmd.ux.ZyglServerList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZyglServerList",
    category: "vmd复合组件",
    text: "ZyglServerList",//中文
    naming: "hwZyglServerList",
    //dtype 设计时组件
    dtype: "vmd.ux.ZyglServerList",
    //xtype 运行时组件
    xtype: "vmd.ux.ZyglServerList",
    xcls: "vmd.ux.ZyglServerList",
    //为了拖拽能自动生成递增id
    defaultName: "hwZyglServerList",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"serverListTpl":"<ul>\n    <tpl for=\".\">\n        <li class='info serverlist-info'>{name}</li>\n    </tpl>\n</ul>","serverListData":"var data = [{\n    \"server_id\": \"0000000001\",\n    \"name\": \"服务器1\",\n    \"ip\": \"192.168.1.188\",\n    \"port\": \"8000\",\n    \"remark\": \"test\"\n}, {\n    \"server_id\": \"0000000002\",\n    \"name\": \"服务器2\",\n    \"ip\": \"192.168.1.188\",\n    \"port\": \"8030\",\n    \"remark\": \"test\"\n}];\nreturn data;","layout":"border"},
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
     ,{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"serverListTpl","group":"设计","ctype":"string","editor":"html"},{"name":"serverListData","group":"设计","ctype":"string","editor":"js"},{"name":"serverClick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"serverDbClick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"addServerConfig","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"delServerConfig","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ZyglServerList"]);
    xds.Registry.addUserType(xds["vmd.ux.ZyglServerList"]);

    var Data_vmd_ux_ZyglServerList={"BaseType":"Control","Type":"vmd_ux_ZyglServerList","Property":{"store":{"Description":"服务器信息","Prototype":"","Args":{"_Return_":""},"Example":"服务器信息"},"serverListTpl":{"Description":"tpl","Prototype":"","Args":{"_Return_":""},"Example":"tpl"},"serverListData":{"Description":"serverListData","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"getSelServerData":{"Description":"getSelServerData","Prototype":"getSelServerData()","Args":{"_Return_":"对象","Args":""},"Example":""}},"Event":{"serverClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"serverDbClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"addServerConfig":{"Prototype":"","Args":{"_Return_":""},"Example":""},"delServerConfig":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ZyglServerList)