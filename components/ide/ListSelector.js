xds["vmd.ux.ListSelector"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ListSelector",
    category: "vmd复合组件",
    text: "ListSelector",//中文
    naming: "hwListSelector",
    //dtype 设计时组件
    dtype: "vmd.ux.ListSelector",
    //xtype 运行时组件
    xtype: "vmd.ux.ListSelector",
    xcls: "vmd.ux.ListSelector",
    //为了拖拽能自动生成递增id
    defaultName: "hwListSelector",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["components/ux/listselector/1.0/js/template-web.js"],
	requireCmpType:'',
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
     ,{"name":"skin","group":"设计","ctype":"string","editor":"combo","options":[{"text":"默认","value":"listselector-default"},{"text":"测试","value":"listselector-test"}]},{"name":"showTree","group":"树","ctype":"boolean"},{"name":"treeStore","group":"树","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"displayField","group":"树","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"valueField","group":"树","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"parentField","group":"树","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"folderIcon","group":"树","ctype":"string"},{"name":"leafIcon","group":"树","ctype":"string"},{"name":"allowCheckbox","group":"树","ctype":"boolean"},{"name":"showRoot","group":"树","ctype":"boolean"},{"name":"rootText","group":"树","ctype":"string"},{"name":"rootValue","group":"树","ctype":"string"},{"name":"unSelectedTitle","group":"待选列表","ctype":"string"},{"name":"allowSearchbar","group":"待选列表","ctype":"boolean"},{"name":"unSelectedStore","group":"待选列表","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"searchbarPlaceholder","group":"待选列表","ctype":"string"},{"name":"searchField","group":"待选列表","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"unSelectedStore"}},{"name":"headers","group":"待选列表","ctype":"string"},{"name":"columnIds","group":"待选列表","ctype":"string"},{"name":"associateId","group":"待选列表","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"unSelectedStore"}},{"name":"colWidth","group":"待选列表","ctype":"string"},{"name":"colAlign","group":"待选列表","ctype":"string"},{"name":"selectedTitle","group":"已选列表","ctype":"string"},{"name":"selectedStore","group":"已选列表","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"onSelect","group":"事件","ctype":"string","editor":"ace","params":"param1"},{"name":"onTreeSelect","group":"事件","ctype":"string","editor":"ace","params":"param1"},{"name":"onUnselect","group":"事件","ctype":"string","editor":"ace","params":"param1"},{"name":"onTreeChecked","group":"事件","ctype":"string","editor":"ace","params":"param1"},{"name":"onRightClick","group":"事件","ctype":"string","editor":"ace","params":"rowId,colIndex"},{"name":"onTreeDbClick","group":"事件","ctype":"string","editor":"ace","params":"param1"},{"name":"onTreeRightClick","group":"事件","ctype":"string","editor":"ace","params":"param1"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ListSelector"]);
    xds.Registry.addUserType(xds["vmd.ux.ListSelector"]);

    var Data_vmd_ux_ListSelector={"BaseType":"Control","Type":"vmd_ux_ListSelector","Property":{"skin":{"Description":"皮肤","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"皮肤"},"showTree":{"Description":"展示树形条件区","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示树形条件区"},"treeStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"数据集"},"displayField":{"Description":"展示值","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示值"},"valueField":{"Description":"实际值","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"实际值"},"parentField":{"Description":"父节点字段","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"父节点字段"},"folderIcon":{"Description":"文件夹图标","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"文件夹图标"},"leafIcon":{"Description":"叶子节点图标","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"叶子节点图标"},"allowCheckbox":{"Description":"展示复选框","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示复选框"},"showRoot":{"Description":"隐藏根节点","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"隐藏根节点"},"rootText":{"Description":"根节点名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"根节点名称"},"rootValue":{"Description":"根节点值","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"根节点值"},"unSelectedTitle":{"Description":"标题(不配置不展示)","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"标题(不配置不展示)"},"allowSearchbar":{"Description":"展示搜索栏","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示搜索栏"},"unSelectedStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"数据集"},"searchbarPlaceholder":{"Description":"搜索栏提示","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"搜索栏提示"},"searchField":{"Description":"搜索字段","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"搜索字段"},"headers":{"Description":"表头","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"表头"},"columnIds":{"Description":"表列ID(逗号分隔)","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"表列ID(逗号分隔)"},"associateId":{"Description":"关联ID","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"关联ID"},"colWidth":{"Description":"列宽","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"列宽"},"colAlign":{"Description":"colAlign","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"selectedTitle":{"Description":"标题标题(不配置不展示)","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"标题标题(不配置不展示)"},"selectedStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"数据集"}},"Method":{"getList":{"Description":"获取待选列表数据，返回数组","Prototype":"getList()","Args":{"_Return_":"void","Args":""},"Example":"获取待选列表数据，返回数组"},"getSelectedList":{"Description":"获取已选列表","Prototype":"getSelectedList()","Args":{"_Return_":"void","Args":""},"Example":"获取已选列表"},"setTreeData":{"Description":"设置树组件数据集","Prototype":"setTreeData(store)","Args":{"_Return_":"void","Args":"store"},"Example":"设置树组件数据集"},"setListData":{"Description":"设置待选列表数据集","Prototype":"setListData(store)","Args":{"_Return_":"void","Args":"store"},"Example":"设置待选列表数据集"},"setSelectedListData":{"Description":"设置已选列表数据集","Prototype":"setSelectedListData(store)","Args":{"_Return_":"void","Args":"store"},"Example":"设置已选列表数据集"},"clearSelectedList":{"Description":"清空所有已选项","Prototype":"clearSelectedList()","Args":{"_Return_":"void","Args":""},"Example":"清空所有已选项"},"setSkin":{"Description":"设置皮肤","Prototype":"setSkin(skinName)","Args":{"_Return_":"void","Args":"skinName"},"Example":"设置皮肤"},"getSelectedGrid":{"Description":"获取已选列表表格","Prototype":"getSelectedGrid()","Args":{"_Return_":"void","Args":""},"Example":"获取已选列表表格"},"getUnselectedGrid":{"Description":"获取待选列表表格","Prototype":"getUnselectedGrid()","Args":{"_Return_":"void","Args":""},"Example":"获取待选列表表格"}},"Event":{"onSelect":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"用于单选时，选项从左侧到右侧时触发 "},"onTreeSelect":{"Prototype":"","Args":{"_Return_":""},"Example":"树节点单击时触发"},"onUnselect":{"Prototype":"","Args":{"_Return_":""},"Example":"用于反选时，选项从右侧到左侧时触发 "},"onTreeChecked":{"Prototype":"","Args":{"_Return_":""},"Example":"用于树组件节点选中时触发"},"onRightClick":{"Prototype":"","Args":{"_Return_":""},"Example":"已选列表右击时触发,返回点击的行ID，列索引"},"onTreeDbClick":{"Prototype":"","Args":{"_Return_":""},"Example":"树节点双击时触发"},"onTreeRightClick":{"Prototype":"","Args":{"_Return_":""},"Example":"树组件右击时触发"}}}
	ControlsDataManage._add(Data_vmd_ux_ListSelector)