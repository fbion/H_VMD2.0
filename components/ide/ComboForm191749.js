xds["vmd.ux.ComboForm191749"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ComboForm191749",
    category: "vmd复合组件",
    text: "ComboForm191749",//中文
    naming: "hwComboForm191749",
    //dtype 设计时组件
    dtype: "vmd.ux.ComboForm191749",
    //xtype 运行时组件
    xtype: "vmd.ux.ComboForm191749",
    xcls: "vmd.ux.ComboForm191749",
    //为了拖拽能自动生成递增id
    defaultName: "hwComboForm191749",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/comboform191749/1.0/css/ComboForm.css"],
    requireJs: ["components/ux/comboform191749/1.0/js/Template-web.js"],
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
     ,{"name":"GridStore","group":"下拉窗","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"DisplayField","group":"下拉窗","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"GridStore"}},{"name":"ValueField","group":"下拉窗","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"GridStore"}},{"name":"GridWidth","group":"网格属性","ctype":"number"},{"name":"GridHeight","group":"网格属性","ctype":"number"},{"name":"MultiSelect","group":"网格属性","ctype":"boolean"},{"name":"ColumnId","group":"网格属性","ctype":"string","editor":"multiOptions","edConfig":{"type":"storeField","cname":"GridStore"}},{"name":"HeaderText","group":"网格属性","ctype":"string"},{"name":"ColumnWidth","group":"网格属性","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"GridStore"}},{"name":"SearchField","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"GridStore"}},{"name":"color","group":"设计","ctype":"string","editor":"multiCombo","options":[{"text":"红色","value":"red"},{"text":"黄色","value":"yellow"}]},{"name":"onChange","group":"事件","ctype":"string","editor":"ace","params":"value,text"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ComboForm191749"]);
    xds.Registry.addUserType(xds["vmd.ux.ComboForm191749"]);

    var Data_vmd_ux_ComboForm191749={"BaseType":"Control","Type":"vmd_ux_ComboForm191749","Property":{"GridStore":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"下拉窗数据集","Name":"数据集"},"DisplayField":{"Description":"显示字段","Prototype":"","Args":{"_Return_":""},"Example":"下拉窗显示字段","Name":"显示字段"},"ValueField":{"Description":"值字段","Prototype":"","Args":{"_Return_":""},"Example":"下拉窗值字段","Name":"值字段"},"GridWidth":{"Description":"下拉窗体宽度","Prototype":"","Args":{"_Return_":""},"Example":"下拉窗体宽度","Name":""},"GridHeight":{"Description":"下拉窗体高度","Prototype":"","Args":{"_Return_":""},"Example":"下拉窗体高度","Name":""},"MultiSelect":{"Description":"多选","Prototype":"","Args":{"_Return_":""},"Example":"是否支持多选，支持的话 第一列将添加一列下拉框","Name":"多选"},"ColumnId":{"Description":"列ID","Prototype":"","Args":{"_Return_":""},"Example":"列ID 必须设置 不然无法解析数据集 \",\" 分隔","Name":"列ID"},"HeaderText":{"Description":"表头","Prototype":"","Args":{"_Return_":""},"Example":"表头文本 用 \",\" 分隔","Name":"表头"},"ColumnWidth":{"Description":"列宽","Prototype":"","Args":{"_Return_":""},"Example":"默认列宽 用 \",\"分隔","Name":"列宽"},"SearchField":{"Description":"检索字段","Prototype":"","Args":{"_Return_":""},"Example":"检索字段","Name":"检索字段"},"color":{"Description":"color","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"getComboValue":{"Description":"获取下拉窗选中的值","Prototype":"getComboValue()","Args":{"_Return_":"void","Args":""},"Example":"获取下拉窗选中的值"},"getComboText":{"Description":"获取下拉窗文本","Prototype":"getComboText()","Args":{"_Return_":"void","Args":""},"Example":"获取下拉窗文本"}},"Event":{"onChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ComboForm191749)