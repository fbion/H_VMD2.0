xds["vmd.ux.StartEndDate"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.StartEndDate",
    category: "vmd复合组件",
    text: "StartEndDate",//中文
    naming: "hwStartEndDate",
    //dtype 设计时组件
    dtype: "vmd.ux.StartEndDate",
    //xtype 运行时组件
    xtype: "vmd.ux.StartEndDate",
    xcls: "vmd.ux.StartEndDate",
    //为了拖拽能自动生成递增id
    defaultName: "hwStartEndDate",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"startText":"开始日期：","endText":"结束日期：","layout":"hbox"},
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
     ,{"name":"startText","group":"设计","ctype":"string","editor":"string"},{"name":"endText","group":"设计","ctype":"string","editor":"string"},{"name":"startChange","group":"事件","ctype":"string","editor":"ace","params":"newValue,oldValue"},{"name":"endChanged","group":"事件","ctype":"string","editor":"ace","params":"newValue,endValue"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.StartEndDate"]);
    xds.Registry.addUserType(xds["vmd.ux.StartEndDate"]);

    var Data_vmd_ux_StartEndDate={"BaseType":"Control","Type":"vmd_ux_StartEndDate","Property":{"startText":{"Description":"开始日期标签","Prototype":"","Args":{"_Return_":""},"Example":"开始日期标签"},"endText":{"Description":"结束日期标签","Prototype":"","Args":{"_Return_":""},"Example":"结束日期标签"}},"Method":{"getStartValue":{"Description":"获取开始日期的值","Prototype":"getStartValue()","Args":{"_Return_":"void","Args":""},"Example":"获取开始日期的值"},"getEndValue":{"Description":"获取结束日期值","Prototype":"getEndValue()","Args":{"_Return_":"void","Args":""},"Example":"获取结束日期值"},"setStartValue":{"Description":"设置开始日期值","Prototype":"setStartValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":"设置开始日期值"},"setEndValue":{"Description":"设置结束日期值","Prototype":"setEndValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":"设置结束日期值"}},"Event":{"startChange":{"Prototype":"","Args":{"_Return_":""},"Example":"开始日期的值改变事件"},"endChanged":{"Prototype":"","Args":{"_Return_":""},"Example":"结束日期的值改变事件"}}}
	ControlsDataManage._add(Data_vmd_ux_StartEndDate)