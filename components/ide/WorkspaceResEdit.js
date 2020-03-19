xds["vmd.ux.WorkspaceResEdit"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.WorkspaceResEdit",
    category: "vmd复合组件",
    text: "WorkspaceResEdit",//中文
    naming: "hwWorkspaceResEdit",
    //dtype 设计时组件
    dtype: "vmd.ux.WorkspaceResEdit",
    //xtype 运行时组件
    xtype: "vmd.ux.WorkspaceResEdit",
    xcls: "vmd.ux.WorkspaceResEdit",
    //为了拖拽能自动生成递增id
    defaultName: "hwWorkspaceResEdit",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     ,{"name":"onClickBtnAddServer","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"onClickBtnAddCategory","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"onClickBtnEdit","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"onClickBtnDelete","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.WorkspaceResEdit"]);
    xds.Registry.addUserType(xds["vmd.ux.WorkspaceResEdit"]);

    var Data_vmd_ux_WorkspaceResEdit={"BaseType":"Control","Type":"vmd_ux_WorkspaceResEdit","Property":{},"Method":{"iSetAddCategoryBtnVisiable":{"Description":"设置添加目录按钮是否可见。","Prototype":"iSetAddCategoryBtnVisiable(paraVisiable)","Args":{"_Return_":"无","Args":"paraVisiable"},"Example":"设置添加目录按钮是否可见。"},"iSetResourceType":{"Description":"设置资源类型：\n0：主题，1：图片，2：JS文件","Prototype":"iSetResourceType(type)","Args":{"_Return_":"无","Args":"type"},"Example":"设置资源类型：\n0：主题，1：图片，2：JS文件"},"iSetWorkSpaceId":{"Description":"设置工区ID","Prototype":"iSetWorkSpaceId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区ID"},"iSetDataStore":{"Description":"iSetDataStore","Prototype":"iSetDataStore(store)","Args":{"_Return_":"无","Args":"store"},"Example":""},"iLoadResource":{"Description":"载入主题、图片、JS文件","Prototype":"iLoadResource(type, resouType)","Args":{"_Return_":"无","Args":"type, resouType"},"Example":"载入主题、图片、JS文件"},"iShowAddCategoryBtn":{"Description":"是否显示添加分类按钮。","Prototype":"iShowAddCategoryBtn(bShow)","Args":{"_Return_":"无","Args":"bShow"},"Example":"是否显示添加分类按钮。"},"iSetId":{"Description":"设置ID","Prototype":"iSetId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置ID"},"iSetApplyType":{"Description":"iSetApplyType","Prototype":"iSetApplyType(type)","Args":{"_Return_":"无","Args":"type"},"Example":""},"iClearAll":{"Description":"清空所有资源信息","Prototype":"iClearAll()","Args":{"_Return_":"void","Args":""},"Example":"清空所有资源信息"},"iSetIfDataLoaded":{"Description":"设置资源是否已经查询加载","Prototype":"iSetIfDataLoaded(bVar)","Args":{"_Return_":"无","Args":"bVar"},"Example":"设置资源是否已经查询加载"},"iGetIfDataLoaded":{"Description":"iGetIfDataLoaded","Prototype":"iGetIfDataLoaded()","Args":{"_Return_":"对象","Args":""},"Example":""},"iAddServer":{"Description":"添加服务地址","Prototype":"iAddServer(id, name, addr, remark, resType)","Args":{"_Return_":"无","Args":"id, name, addr, remark, resType"},"Example":"添加服务地址"},"isAddServeData":{"Description":"isAddServeData","Prototype":"isAddServeData(id, name, addr, remark, resType)","Args":{"_Return_":"void","Args":"id, name, addr, remark, resType"},"Example":""}},"Event":{"onClickBtnAddServer":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"点击添加服务器按钮事件。"},"onClickBtnAddCategory":{"Prototype":"","Args":{"_Return_":""},"Example":"点击添加目录按钮的事件"},"onClickBtnEdit":{"Prototype":"","Args":{"_Return_":""},"Example":"点击编辑按钮事件"},"onClickBtnDelete":{"Prototype":"","Args":{"_Return_":""},"Example":"点击删除按钮事件"}}}
	ControlsDataManage._add(Data_vmd_ux_WorkspaceResEdit)