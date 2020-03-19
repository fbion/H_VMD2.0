xds["vmd.ux.HwComboTree"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.HwComboTree",
    category: "vmd复合组件",
    text: "HwComboTree",//中文
    naming: "hwHwComboTree",
    //dtype 设计时组件
    dtype: "vmd.ux.HwComboTree",
    //xtype 运行时组件
    xtype: "vmd.ux.HwComboTree",
    xcls: "vmd.ux.HwComboTree",
    //为了拖拽能自动生成递增id
    defaultName: "hwHwComboTree",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"comboWidth":150,"treeWidth":350,"treeHeight":270,"comboDivWidth":200,"layout":"auto"},
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
     ,{"name":"treeStore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"parentId","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"value","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"text","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"treeStore"}},{"name":"comboWidth","group":"设计","ctype":"number","editor":"number"},{"name":"treeWidth","group":"设计","ctype":"number","editor":"number"},{"name":"treeHeight","group":"设计","ctype":"number","editor":"number"},{"name":"comboDivWidth","group":"设计","ctype":"number","editor":"number"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"value,text"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.HwComboTree"]);
    xds.Registry.addUserType(xds["vmd.ux.HwComboTree"]);

    var Data_vmd_ux_HwComboTree={"BaseType":"Control","Type":"vmd_ux_HwComboTree","Property":{"treeStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"数据集","Name":"数据集"},"parentId":{"Description":"父节点","Prototype":"","Args":{"_Return_":""},"Example":"父节点ID","Name":"父节点"},"value":{"Description":"值","Prototype":"","Args":{"_Return_":""},"Example":"节点值","Name":"值"},"text":{"Description":"显示文本","Prototype":"","Args":{"_Return_":""},"Example":"显示文本","Name":"显示文本"},"comboWidth":{"Description":"comboWidth","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"treeWidth":{"Description":"treeWidth","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"treeHeight":{"Description":"treeHeight","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"comboDivWidth":{"Description":"comboDivWidth","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"getValue":{"Description":"获取下拉树选择框的值","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":"获取下拉树选择框的值"}},"Event":{"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"值改变事件"}}}
	ControlsDataManage._add(Data_vmd_ux_HwComboTree)