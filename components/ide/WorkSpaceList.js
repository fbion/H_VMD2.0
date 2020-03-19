xds["vmd.ux.WorkSpaceList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.WorkSpaceList",
    category: "vmd复合组件",
    text: "WorkSpaceList",//中文
    naming: "WorkSpaceList",
    //dtype 设计时组件
    dtype: "vmd.ux.WorkSpaceList",
    //xtype 运行时组件
    xtype: "vmd.ux.WorkSpaceList",
    xcls: "vmd.ux.WorkSpaceList",
    //为了拖拽能自动生成递增id
    defaultName: "WorkSpaceList",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"listTpl":"<ul>\n    <tpl for=\".\">\n        <li class='info serverlist-info'> {name} </li>\n    </tpl>\n</ul>","listData":"var data = [{\n    \"workspace_id\": \"0000000001\",\n    \"name\": \"我的工区\",\n    \"remark\": \"test\"\n}, {\n    \"workspace_id\": \"0000000002\",\n    \"name\": \"我的工区1\",\n    \"remark\": \"test\"\n}];\nreturn data;"},
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
     ,{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"listTpl","group":"设计","ctype":"string","editor":"html"},{"name":"listData","group":"设计","ctype":"string","editor":"js"},{"name":"onItemClick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"onItemDbClick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"onAddItem","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"onDelItem","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
    xds.Registry.register(xds["vmd.ux.WorkSpaceList"]);
    xds.Registry.addUserType(xds["vmd.ux.WorkSpaceList"]);

    var Data_vmd_ux_WorkSpaceList={"BaseType":"Control","Type":"vmd_ux_WorkSpaceList","Property":{"store":{"Description":"数据服务","Prototype":"","Args":{"_Return_":""},"Example":"数据服务"},"listTpl":{"Description":"tpl","Prototype":"","Args":{"_Return_":""},"Example":"tpl"},"listData":{"Description":"listData","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"getSelData":{"Description":"getSelData","Prototype":"getSelData()","Args":{"_Return_":"对象","Args":""},"Example":""},"iRefreshStore":{"Description":"刷新数据集","Prototype":"iRefreshStore()","Args":{"_Return_":"无","Args":""},"Example":"刷新数据集"},"iSelectItemById":{"Description":"根据ID选中某一项","Prototype":"iSelectItemById(id)","Args":{"_Return_":"无","Args":"id"},"Example":"根据ID选中某一项"},"iGetSelIdAfterDel":{"Description":"获取删除后应该选中项的id","Prototype":"iGetSelIdAfterDel()","Args":{"_Return_":"无","Args":""},"Example":"获取删除后应该选中项的id"}},"Event":{"onItemClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"onItemDbClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"onAddItem":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"onDelItem":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_WorkSpaceList)