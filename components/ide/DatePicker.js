xds["vmd.ux.DatePicker"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DatePicker",
    category: "vmd复合组件",
    text: "DatePicker",//中文
    naming: "hwDatePicker",
    //dtype 设计时组件
    dtype: "vmd.ux.DatePicker",
    //xtype 运行时组件
    xtype: "vmd.ux.DatePicker",
    xcls: "vmd.ux.DatePicker",
    //为了拖拽能自动生成递增id
    defaultName: "hwDatePicker",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datepicker/1.0/css/datepicker.css"],
    requireJs: ["components/ux/datepicker/1.0/js/moment.min.js","components/ux/datepicker/1.0/js/datepicker.js"],
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
     ,{"name":"ksrqLabel","group":"设计","ctype":"string"},{"name":"jsrqLabel","group":"设计","ctype":"string"},{"name":"isRange","group":"设计","ctype":"boolean"},{"name":"hasShortcut","group":"设计","ctype":"boolean"},{"name":"format","group":"设计","ctype":"string","editor":"combo","options":[{"text":"年月日 时分秒","value":"YYYY-MM-DD HH:mm:ss"},{"text":"年月日 时分","value":"YYYY-MM-DD HH:mm"},{"text":"年月日","value":"YYYY-MM-DD"},{"text":"年月","value":"YYYY-MM"},{"text":"年","value":"YYYY"}]},{"name":"shortCutType","group":"设计","ctype":"string","editor":"combo","options":[{"text":"最近使用","value":"recently"},{"text":"有效期","value":"future"}]},{"name":"defaultValue","group":"设计","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}]},{"name":"select","group":"事件","ctype":"string","editor":"ace","params":"val"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"newval,oldval"},{"name":"loaded","group":"事件","ctype":"string","editor":"ace","params":"ksrq,jsrq"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DatePicker"]);
    xds.Registry.addUserType(xds["vmd.ux.DatePicker"]);

    var Data_vmd_ux_DatePicker={"BaseType":"Control","Type":"vmd_ux_DatePicker","Property":{"ksrqLabel":{"Description":"ksrqLabel","Prototype":"","Args":{"_Return_":""},"Example":""},"jsrqLabel":{"Description":"jsrqLabel","Prototype":"","Args":{"_Return_":""},"Example":""},"isRange":{"Description":"isRange","Prototype":"","Args":{"_Return_":""},"Example":""},"hasShortcut":{"Description":"hasShortcut","Prototype":"","Args":{"_Return_":""},"Example":""},"format":{"Description":"format","Prototype":"","Args":{"_Return_":""},"Example":""},"shortCutType":{"Description":"shortCutType","Prototype":"","Args":{"_Return_":""},"Example":""},"defaultValue":{"Description":"defaultValue","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(rq1,rq2)","Args":{"_Return_":"void","Args":"rq1,rq2"},"Example":""},"getKsrq":{"Description":"getKsrq","Prototype":"getKsrq()","Args":{"_Return_":"void","Args":""},"Example":""},"getJsrq":{"Description":"getJsrq","Prototype":"getJsrq()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"select":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"loaded":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DatePicker)