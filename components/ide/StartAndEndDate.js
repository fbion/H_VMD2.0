xds["vmd.ux.StartAndEndDate"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.StartAndEndDate",
    category: "vmd复合组件",
    text: "StartAndEndDate",//中文
    naming: "hwStartAndEndDate",
    //dtype 设计时组件
    dtype: "vmd.ux.StartAndEndDate",
    //xtype 运行时组件
    xtype: "vmd.ux.StartAndEndDate",
    xcls: "vmd.ux.StartAndEndDate",
    //为了拖拽能自动生成递增id
    defaultName: "hwStartAndEndDate",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"StartLabelText":"开始日期：","StartDateFormat":"Y-m-d","EndDateFormat":"Y-m-d","EndLabelText":"结束日期：","layout":"hbox"},
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
     ,{"name":"StartLabelText","group":"设计","ctype":"string","editor":"string"},{"name":"StartDateFormat","group":"设计","ctype":"string","editor":"string"},{"name":"EndDateFormat","group":"设计","ctype":"string","editor":"string"},{"name":"EndLabelText","group":"设计","ctype":"string","editor":"string"},{"name":"startDateChanged","group":"事件","ctype":"string","editor":"ace","params":"newValue,oldValue"},{"name":"endDateChanged","group":"事件","ctype":"string","editor":"ace","params":"newValue,oldValue"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.StartAndEndDate"]);
    xds.Registry.addUserType(xds["vmd.ux.StartAndEndDate"]);

    var Data_vmd_ux_StartAndEndDate={"BaseType":"Control","Type":"vmd_ux_StartAndEndDate","Property":{"StartLabelText":{"Description":"开始标签名称","Prototype":"","Args":{"_Return_":""},"Example":"开始标签名称"},"StartDateFormat":{"Description":"开始日期格式","Prototype":"","Args":{"_Return_":""},"Example":"开始日期格式"},"EndDateFormat":{"Description":"结束日期格式","Prototype":"","Args":{"_Return_":""},"Example":"结束日期格式"},"EndLabelText":{"Description":"结束标签名称","Prototype":"","Args":{"_Return_":""},"Example":"结束标签名称"}},"Method":{"getStartDateValue":{"Description":"获取开始日期的值","Prototype":"getStartDateValue()","Args":{"_Return_":"void","Args":""},"Example":"获取开始日期的值"},"getEndDateValue":{"Description":"获取结束日期值","Prototype":"getEndDateValue()","Args":{"_Return_":"void","Args":""},"Example":"获取结束日期值"}},"Event":{"startDateChanged":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"endDateChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_StartAndEndDate)