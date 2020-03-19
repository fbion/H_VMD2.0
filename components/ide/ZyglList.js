xds["vmd.ux.ZyglList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZyglList",
    category: "vmd复合组件",
    text: "ZyglList",//中文
    naming: "hwZyglList",
    //dtype 设计时组件
    dtype: "vmd.ux.ZyglList",
    //xtype 运行时组件
    xtype: "vmd.ux.ZyglList",
    xcls: "vmd.ux.ZyglList",
    //为了拖拽能自动生成递增id
    defaultName: "hwZyglList",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"tpl":"<tpl for=\".\">\n    <div class=\"file undefined file-box menu-file is{type}\" original-name=\"{name}\" title=\"名称:{name} 修改时间 : {modifyTime}\" >\n        <div class=\"item-select\">\n            <div class=\"item-check\">\n            </div>\n        </div>\n        <div class=\"item-menu\">\n            <div class=\"cert\">\n            </div>\n        </div>\n        <div class=\"ico\" filetype=\"{type}\">\n            <i class=\"x-item-file x-{ext}\">\n            </i>\n        </div>\n        <div class=\"filename\">\n            <span class=\"title db-click-rename\" title=\"双击名称重命名\">{name}</span>\n        </div>\n    </div>\n</tpl>","data":"var data = [{\n    \"id\": 0,\n    \"path\": \"test\",\n    \"name\": \"desktop\",\n    \"type\": \"folder\",\n    \"ext\": \"folder\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": true,\n    \"size\": ''\n}, {\n    \"id\": 11,\n    \"path\": \"test\",\n    \"name\": \"Document\",\n    \"type\": \"folder\",\n    \"ext\": \"folder\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": true\n}, {\n    \"id\": 1,\n    \"path\": \"test\",\n    \"name\": \"a.css\",\n    \"type\": \"file\",\n    \"ext\": \"css\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": true,\n    \"size\": 4000\n}, {\n    \"id\": 2,\n    \"path\": \"test\",\n    \"name\": \"ext-all-debug.js\",\n    \"type\": \"file\",\n    \"ext\": \"js\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": false,\n    \"size\": 52010\n}, {\n    \"id\": 3,\n    \"path\": \"test\",\n    \"name\": \"test.html\",\n    \"type\": \"file\",\n    \"ext\": \"html\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": false,\n    \"size\": 100\n}, {\n    \"id\": 4,\n    \"path\": \"test\",\n    \"name\": \"newfile.jpg\",\n    \"type\": \"file\",\n    \"ext\": \"jpg\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": false,\n    \"size\": 25410\n}, {\n    \"id\": 5,\n    \"path\": \"test\",\n    \"name\": \"汉威科技技术成果产品化构想 -可视化.pptx\",\n    \"type\": \"file\",\n    \"ext\": \"pptx\",\n    \"modifyTime\": \"2018/03/19 18:21:20\",\n    \"isParent\": false,\n    \"size\": 2024\n}];\nreturn data;","listHidden":true,"layout":"anchor"},
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
     ,{"name":"tpl","group":"设计","ctype":"string","editor":"html"},{"name":"data","group":"设计","ctype":"string","editor":"js"},{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"viewHidden","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"listHidden","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"autoheight","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"listDbClick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"},{"name":"contextmenu","group":"事件","ctype":"string","editor":"ace","params":"index,e"},{"name":"rename","group":"事件","ctype":"string","editor":"ace","params":"name,oldname,curIndex"},{"name":"listclick","group":"事件","ctype":"string","editor":"ace","params":"index,node,e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ZyglList"]);
    xds.Registry.addUserType(xds["vmd.ux.ZyglList"]);

    var Data_vmd_ux_ZyglList={"BaseType":"Control","Type":"vmd_ux_ZyglList","Property":{"tpl":{"Description":"tpl","Prototype":"","Args":{"_Return_":""},"Example":""},"data":{"Description":"data","Prototype":"","Args":{"_Return_":""},"Example":""},"store":{"Description":"store","Prototype":"","Args":{"_Return_":""},"Example":""},"viewHidden":{"Description":"viewHidden","Prototype":"","Args":{"_Return_":""},"Example":""},"listHidden":{"Description":"listHidden","Prototype":"","Args":{"_Return_":""},"Example":""},"autoheight":{"Description":"autoheight","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"enableView":{"Description":"启用视图模式","Prototype":"enableView(state)","Args":{"_Return_":"void","Args":"state"},"Example":"启用视图模式"},"enableList":{"Description":"enableList","Prototype":"enableList()","Args":{"_Return_":"void","Args":""},"Example":""},"getSelItemData":{"Description":"getSelItemData","Prototype":"getSelItemData()","Args":{"_Return_":"void","Args":""},"Example":""},"removeSelItem":{"Description":"移除选中的项，仅操作dom和store，不保存数据库","Prototype":"removeSelItem()","Args":{"_Return_":"无","Args":""},"Example":"移除选中的项，仅操作dom和store，不保存数据库"},"setItemsSel":{"Description":"setItemsSel","Prototype":"setItemsSel(selIds)","Args":{"_Return_":"void","Args":"selIds"},"Example":""},"getSelItemsData":{"Description":"获取所有选中的项的数据信息","Prototype":"getSelItemsData()","Args":{"_Return_":"void","Args":""},"Example":"获取所有选中的项的数据信息"}},"Event":{"listDbClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"列表项的双击事件 "},"contextmenu":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"右键菜单"},"rename":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"文件重命名"},"listclick":{"Prototype":"","Args":{"_Return_":""},"Example":"列表项的点击事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ZyglList)