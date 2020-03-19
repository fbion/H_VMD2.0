xds["vmd.ux.ZyglTree"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZyglTree",
    category: "vmd复合组件",
    text: "ZyglTree",//中文
    naming: "ZyglTree",
    //dtype 设计时组件
    dtype: "vmd.ux.ZyglTree",
    //xtype 运行时组件
    xtype: "vmd.ux.ZyglTree",
    xcls: "vmd.ux.ZyglTree",
    //为了拖拽能自动生成递增id
    defaultName: "ZyglTree",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"store":"store","treeRootValue":"0000000001","treeRootText":"资源中心服务器","layout":"border"},
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
     ,{"name":"treemenu","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"menu"}},{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"treeRootValue","group":"设计","ctype":"string","editor":"string"},{"name":"treeRootText","group":"设计","ctype":"string","editor":"string"},{"name":"homeClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"creatCategory","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"creatFile","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"refreshTree","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"resourceNodeClick","group":"事件","ctype":"string","editor":"ace","params":"node,e"},{"name":"onAfterShowMenu","group":"事件","ctype":"string","editor":"ace","params":"node,e"},{"name":"onBeforeShowMenu","group":"事件","ctype":"string","editor":"ace","params":"node,e"},{"name":"afterCategoryBind","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ZyglTree"]);
    xds.Registry.addUserType(xds["vmd.ux.ZyglTree"]);

    var Data_vmd_ux_ZyglTree={"BaseType":"Control","Type":"vmd_ux_ZyglTree","Property":{"treemenu":{"Description":"treemenu","Prototype":"","Args":{"_Return_":""},"Example":""},"store":{"Description":"store","Prototype":"","Args":{"_Return_":""},"Example":""},"treeRootValue":{"Description":"treeRootValue","Prototype":"","Args":{"_Return_":""},"Example":""},"treeRootText":{"Description":"treeRootText","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"addCartery":{"Description":"addCartery","Prototype":"addCartery(parId,nodeId,nodeText,path,serverid,info,success,error)","Args":{"_Return_":"无","Args":"parId,nodeId,nodeText,path,serverid,info,success,error"},"Example":""},"getSelNodeId":{"Description":"getSelNodeId","Prototype":"getSelNodeId()","Args":{"_Return_":"字符串","Args":""},"Example":""},"setNodeSel":{"Description":"setNodeSel","Prototype":"setNodeSel(nodeID)","Args":{"_Return_":"void","Args":"nodeID"},"Example":""},"getSelNodepath":{"Description":"getSelNodepath","Prototype":"getSelNodepath()","Args":{"_Return_":"字符串","Args":""},"Example":""},"removeCaretory":{"Description":"removeCaretory","Prototype":"removeCaretory(nodeId,success,error)","Args":{"_Return_":"无","Args":"nodeId,success,error"},"Example":""},"getSelCartery":{"Description":"获取选中的分类节点","Prototype":"getSelCartery()","Args":{"_Return_":"对象","Args":""},"Example":"获取选中的分类节点"},"setCarteryName":{"Description":"通过节点id，设置节点的名称","Prototype":"setCarteryName(nodeId,name)","Args":{"_Return_":"无","Args":"nodeId,name"},"Example":"通过节点id，设置节点的名称"},"getCategoryById":{"Description":"获取分类节点对象","Prototype":"getCategoryById(nodeId)","Args":{"_Return_":"对象","Args":"nodeId"},"Example":"获取分类节点对象"},"getSelNodeparentId":{"Description":"getSelNodeparentId","Prototype":"getSelNodeparentId()","Args":{"_Return_":"字符串","Args":""},"Example":""},"setRootValue":{"Description":"setRootValue","Prototype":"setRootValue(value)","Args":{"_Return_":"无","Args":"value"},"Example":""},"setRootText":{"Description":"setRootText","Prototype":"setRootText(text)","Args":{"_Return_":"无","Args":"text"},"Example":""},"setEditVisible":{"Description":"setEditVisible","Prototype":"setEditVisible(visible)","Args":{"_Return_":"void","Args":"visible"},"Example":""},"getIdByPath":{"Description":"getIdByPath","Prototype":"getIdByPath(path)","Args":{"_Return_":"void","Args":"path"},"Example":""}},"Event":{"homeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"creatCategory":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"creatFile":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"refreshTree":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"resourceNodeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"onAfterShowMenu":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"右键菜单打开后"},"onBeforeShowMenu":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"afterCategoryBind":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ZyglTree)