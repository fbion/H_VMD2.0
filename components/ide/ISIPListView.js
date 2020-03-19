xds["vmd.ux.ISIPListView"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ISIPListView",
    category: "vmd复合组件",
    text: "ISIPListView",//中文
    naming: "hwISIPListView",
    //dtype 设计时组件
    dtype: "vmd.ux.ISIPListView",
    //xtype 运行时组件
    xtype: "vmd.ux.ISIPListView",
    xcls: "vmd.ux.ISIPListView",
    //为了拖拽能自动生成递增id
    defaultName: "hwISIPListView",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: {vmdrequirecss},
    requireJs: {vmdrequirejs},
    //默认属性设置
    defaultConfig: {"tpl":"<tpl for=\".\">\n    <div class=\"file undefined file-box menu-file is{type}\" original-name=\"{name}\" title=\"名称:{name} 修改时间 : {modifyTime}\">\n        <div class=\"item-select\">\n            <div class=\"item-check\">\n            </div>\n        </div>\n        <div class=\"item-menu\">\n            <div class=\"cert\">\n            </div>\n        </div>\n        <div class=\"ico\" filetype=\"{type}\">\n            <i class=\"x-item-file x-{type}\">\n            </i>\n        </div>\n        <div class=\"filename\">\n            <span class=\"title db-click-rename\" title=\"双击名称重命名\">{name}</span>\n        </div>\n    </div>\n</tpl>\n<div class=\"file undefined file-box menu-file\" title=\"添加模块\" ptype=\"add\">\n    <div class=\"ico\" filetype=\"add\">\n        <i class=\"x-item-file x-add\">\n        </i>\n    </div>\n    <div class=\"filename\">\n        <span class=\"title db-click-rename\" title=\"点击添加模块\">添加</span>\n    </div>\n</div>","data":"var data = [{\n    \"id\": 0,\n    \"name\": \"单井框架页\",\n    \"type\": \"folder\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 1\n}, {\n    \"id\": 11,\n    \"name\": \"单井曲线\",\n    \"type\": \"folder\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 2\n}, {\n    \"id\": 1,\n    \"name\": \"地质分层\",\n    \"type\": \"folder\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 3\n}, {\n    \"id\": 2,\n    \"name\": \"单井连通\",\n    \"type\": \"module\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 4\n}, {\n    \"id\": 3,\n    \"name\": \"单井小层\",\n    \"type\": \"module\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 5\n}, {\n    \"id\": 4,\n    \"name\": \"大事记要\",\n    \"type\": \"module\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 6\n}, {\n    \"id\": 5,\n    \"name\": \"地层压力\",\n    \"type\": \"module\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"xh\": 7\n}];\nreturn data;","viewHidden":true,"layout":"border"},
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
     ,{"name":"tpl","group":"设计","ctype":"string","editor":"html"},{"name":"data","group":"设计","ctype":"string","editor":"js"},{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"viewHidden","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"listHidden","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"autoheight","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"listDbClick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"contextmenu","group":"事件","ctype":"string","editor":"ace","params":"index,e"},{"name":"rename","group":"事件","ctype":"string","editor":"ace","params":"name,oldname,curIndex"},{"name":"listclick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"addFolder","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"addModule","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"moduleDelete","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"moduleEdit","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ISIPListView"]);
    xds.Registry.addUserType(xds["vmd.ux.ISIPListView"]);

    var Data_vmd_ux_ISIPListView={"BaseType":"Control","Type":"vmd_ux_ISIPListView","Property":{"tpl":{"Description":"tpl","Prototype":"","Args":{"_Return_":""},"Example":""},"data":{"Description":"data","Prototype":"","Args":{"_Return_":""},"Example":""},"store":{"Description":"store","Prototype":"","Args":{"_Return_":""},"Example":""},"viewHidden":{"Description":"viewHidden","Prototype":"","Args":{"_Return_":""},"Example":""},"listHidden":{"Description":"listHidden","Prototype":"","Args":{"_Return_":""},"Example":""},"autoheight":{"Description":"autoheight","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"enableView":{"Description":"启用视图模式","Prototype":"enableView(state)","Args":{"_Return_":"void","Args":"state"},"Example":"启用视图模式"},"enableList":{"Description":"enableList","Prototype":"enableList()","Args":{"_Return_":"void","Args":""},"Example":""},"getSelItemData":{"Description":"getSelItemData","Prototype":"getSelItemData()","Args":{"_Return_":"void","Args":""},"Example":""},"removeSelItem":{"Description":"移除选中的项，仅操作dom和store，不保存数据库","Prototype":"removeSelItem()","Args":{"_Return_":"无","Args":""},"Example":"移除选中的项，仅操作dom和store，不保存数据库"},"setItemsSel":{"Description":"setItemsSel","Prototype":"setItemsSel(selIds)","Args":{"_Return_":"void","Args":"selIds"},"Example":""},"getSelItemsData":{"Description":"获取所有选中的项的数据信息","Prototype":"getSelItemsData()","Args":{"_Return_":"void","Args":""},"Example":"获取所有选中的项的数据信息"},"hideStatusBar":{"Description":"隐藏状态栏","Prototype":"hideStatusBar(hidden)","Args":{"_Return_":"void","Args":"hidden"},"Example":"隐藏状态栏"}},"Event":{"listDbClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"列表项的双击事件 "},"contextmenu":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"右键菜单"},"rename":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"文件重命名"},"listclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"列表项的点击事件"},"addFolder":{"Prototype":"","Args":{"_Return_":""},"Example":"添加分类"},"addModule":{"Prototype":"","Args":{"_Return_":""},"Example":"添加模块"},"moduleDelete":{"Prototype":"","Args":{"_Return_":""},"Example":"删除模块"},"moduleEdit":{"Prototype":"","Args":{"_Return_":""},"Example":"编辑模块"}}}
	ControlsDataManage._add(Data_vmd_ux_ISIPListView)