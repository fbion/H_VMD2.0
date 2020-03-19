xds["vmd.ux.DateGroup"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateGroup",
    category: "vmd复合组件",
    text: "DateGroup",//中文
    naming: "hwDateGroup",
    //dtype 设计时组件
    dtype: "vmd.ux.DateGroup",
    //xtype 运行时组件
    xtype: "vmd.ux.DateGroup",
    xcls: "vmd.ux.DateGroup",
    //为了拖拽能自动生成递增id
    defaultName: "hwDateGroup",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"title":"时间：","symbol":"至","layout":"hbox"},
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
     ,{"name":"title","group":"设计","ctype":"string","editor":"string"},{"name":"symbol","group":"设计","ctype":"string","editor":"string"},{"name":"kssj","group":"设计","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}],"edConfig":{}},{"name":"jssj","group":"设计","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}],"edConfig":{}},{"name":"query","group":"事件","ctype":"string","editor":"ace","params":"ksrq,jsrq"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DateGroup"]);
    xds.Registry.addUserType(xds["vmd.ux.DateGroup"]);

    var Data_vmd_ux_DateGroup={"BaseType":"Control","Type":"vmd_ux_DateGroup","Property":{"title":{"Description":"title","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"symbol":{"Description":"symbol","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"kssj":{"Description":"开始日期","Prototype":"","Args":{"_Return_":""},"Example":"开始日期","Name":""},"jssj":{"Description":"结束日期","Prototype":"","Args":{"_Return_":""},"Example":"结束日期","Name":""}},"Method":{"kssj_setValue":{"Description":"kssj_setValue","Prototype":"kssj_setValue(value)","Args":{"_Return_":"无","Args":"value"},"Example":""},"jssj_setValue":{"Description":"jssj_setValue","Prototype":"jssj_setValue(value)","Args":{"_Return_":"无","Args":"value"},"Example":""},"kssj_getValue":{"Description":"kssj_getValue","Prototype":"kssj_getValue()","Args":{"_Return_":"字符串","Args":""},"Example":""},"jssj_getValue":{"Description":"jssj_getValue","Prototype":"jssj_getValue()","Args":{"_Return_":"字符串","Args":""},"Example":""}},"Event":{"query":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DateGroup)