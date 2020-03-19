xds["vmd.ux.SbflTreeBComponent"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.SbflTreeBComponent",
    category: "vmd复合组件",
    text: "SbflTreeBComponent",//中文
    naming: "hwSbflTreeBComponent",
    //dtype 设计时组件
    dtype: "vmd.ux.SbflTreeBComponent",
    //xtype 运行时组件
    xtype: "vmd.ux.SbflTreeBComponent",
    xcls: "vmd.ux.SbflTreeBComponent",
    //为了拖拽能自动生成递增id
    defaultName: "hwSbflTreeBComponent",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["components/ux/maintainabletreebcomponent/1.0/js/template-web.js","components/ux/maintainabletreebcomponent/1.0/js/layer.js","components/ux/maintainabletreebcomponent/1.0/js/dhtmlxtree_xw.js"],
	requireCmpType:'',
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
     ,{"name":"skin","group":"设计","ctype":"string","editor":"combo","options":[{"text":"默认","value":"maintainableTree-default"}]},{"name":"showMenu","group":"设计","ctype":"boolean"},{"name":"treeStore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"displayField","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"valueField","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"parentField","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"folderIcon","group":"设计","ctype":"string"},{"name":"leafIcon","group":"设计","ctype":"string"},{"name":"allowCheckbox","group":"设计","ctype":"boolean"},{"name":"showRoot","group":"设计","ctype":"boolean"},{"name":"rootText","group":"设计","ctype":"string"},{"name":"rootValue","group":"设计","ctype":"string"},{"name":"classSystem","group":"设计","ctype":"string","editor":"combo","options":[{"text":"设备分类","value":"SBFL"}]},{"name":"servicePath","group":"设计","ctype":"string"},{"name":"openAllItems","group":"设计","ctype":"boolean"},{"name":"enableDragAndDrop","group":"设计","ctype":"boolean"},{"name":"onTreeSelect","group":"事件","ctype":"string","editor":"ace","params":"data"},{"name":"onTreeDbClick","group":"事件","ctype":"string","editor":"ace","params":"data"},{"name":"onTreeRightClick","group":"事件","ctype":"string","editor":"ace","params":"data"},{"name":"onTreeChecked","group":"事件","ctype":"string","editor":"ace","params":"data"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.SbflTreeBComponent"]);
    xds.Registry.addUserType(xds["vmd.ux.SbflTreeBComponent"]);

    var Data_vmd_ux_SbflTreeBComponent={"BaseType":"Control","Type":"vmd_ux_SbflTreeBComponent","Property":{"skin":{"Description":"皮肤","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"皮肤"},"showMenu":{"Description":"显示右键菜单","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"显示右键菜单"},"treeStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"数据集"},"displayField":{"Description":"展示值","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示值"},"valueField":{"Description":"实际值","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"实际值"},"parentField":{"Description":"父节点字段","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"父节点字段"},"folderIcon":{"Description":"文件夹图标","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"文件夹图标"},"leafIcon":{"Description":"叶子节点图标","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"叶子节点图标"},"allowCheckbox":{"Description":"展示复选框","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示复选框"},"showRoot":{"Description":"展示根节点","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展示根节点"},"rootText":{"Description":"根节点名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"根节点名称"},"rootValue":{"Description":"根节点值","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"根节点值"},"classSystem":{"Description":"分类系统","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"分类系统"},"servicePath":{"Description":"服务地址","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"服务地址"},"openAllItems":{"Description":"展开所有节点","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"展开所有节点"},"enableDragAndDrop":{"Description":"允许树节点拖动","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"允许树节点拖动"}},"Method":{"getSelectedItemId":{"Description":"获取树节点id","Prototype":"getSelectedItemId(param1)","Args":{"_Return_":"void","Args":"param1"},"Example":"获取树节点id"}},"Event":{"onTreeSelect":{"Prototype":"","Args":{"_Return_":""},"Example":"树节点选中事件"},"onTreeDbClick":{"Prototype":"","Args":{"_Return_":""},"Example":"树节点双击事件"},"onTreeRightClick":{"Prototype":"","Args":{"_Return_":""},"Example":"树节点右击事件"},"onTreeChecked":{"Prototype":"","Args":{"_Return_":""},"Example":"树节点复选事件"}}}
	ControlsDataManage._add(Data_vmd_ux_SbflTreeBComponent)