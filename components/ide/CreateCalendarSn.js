xds["vmd.ux.CreateCalendarSn"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CreateCalendarSn",
    category: "vmd复合组件",
    text: "CreateCalendarSn",//中文
    naming:"createcalendarsn",
    //dtype 设计时组件
    dtype: "vmd.ux.CreateCalendarSn",
    //xtype 运行时组件
    xtype: "vmd.ux.CreateCalendarSn",
    xcls: "vmd.ux.CreateCalendarSn",
    //为了拖拽能自动生成递增id
    defaultName:"createcalendarsn",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"startDateNameTxt":"开始时间：","startDateCls":"dateYmd","endDateNameTxt":"结束时间：","endDateCls":"dateYmd","btnTxt":"查询","btnType":"(none)","btnImg":"(none)","layout":"hbox"},
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
     ,{"name":"dateFormat","group":"格式属性","ctype":"string","editor":"combo","options":[{"text":"年-月-日","value":"Y-m-d"},{"text":"年-月","value":"Y-m"},{"text":"年","value":"Y"}]},{"name":"dateImghid","group":"格式属性","ctype":"boolean"},{"name":"startDateNameTxt","group":"开始时间属性","ctype":"string","editor":"string"},{"name":"startDateDeftSel","group":"开始时间属性","ctype":"string","editor":"combo","options":[{"text":"none","value":"0"},{"text":"当天","value":"today"},{"text":"前推一天","value":"prevDay"},{"text":"前推一周","value":"prevWeek"},{"text":"前推一月","value":"prevMonth"},{"text":"前推一年","value":"prevYear"},{"text":"指定前推","value":"zdqt"},{"text":"指定日期","value":"zdrq"}]},{"name":"startSpecifiedSel","group":"开始时间属性","ctype":"string","editor":"combo","options":[{"text":"none","value":"0"},{"text":"日","value":"day"},{"text":"月","value":"mon"},{"text":"年","value":"year"}]},{"name":"startSpecifiedForPush","group":"开始时间属性","ctype":"string"},{"name":"startSpecifiedTimeIn","group":"开始时间属性","ctype":"string"},{"name":"startDateNameCls","group":"开始时间属性","ctype":"string","editor":"string"},{"name":"startDateCls","group":"开始时间属性","ctype":"string","editor":"string"},{"name":"endDateNameTxt","group":"结束时间属性","ctype":"string","editor":"string"},{"name":"endDateDeftSel","group":"结束时间属性","ctype":"string","editor":"combo","options":[{"text":"none","value":"0"},{"text":"当天","value":"today"},{"text":"前推一天","value":"prevDay"},{"text":"前推一周","value":"prevWeek"},{"text":"前推一月","value":"prevMonth"},{"text":"前推一年","value":"prevYear"},{"text":"指定前推","value":"zdqt"},{"text":"指定日期","value":"zdrq"}]},{"name":"endSpecifiedSel","group":"结束时间属性","ctype":"string","editor":"combo","options":[{"text":"none","value":"0"},{"text":"日","value":"day"},{"text":"月","value":"mon"},{"text":"年","value":"year"}]},{"name":"endSpecifiedForPush","group":"结束时间属性","ctype":"string"},{"name":"endSpecifiedTimeIn","group":"结束时间属性","ctype":"string"},{"name":"endDateNameCls","group":"结束时间属性","ctype":"string","editor":"string"},{"name":"endDateCls","group":"结束时间属性","ctype":"string","editor":"string"},{"name":"btnTxt","group":"按钮属性","ctype":"string","editor":"string"},{"name":"btnHid","group":"按钮属性","ctype":"boolean","editor":"boolean"},{"name":"btnBgColor","group":"按钮属性","ctype":"string"},{"name":"btnFontColor","group":"按钮属性","ctype":"string"},{"name":"btnType","group":"按钮属性","ctype":"string","editor":"options","options":["(none)","primary","success","warning","danger","info","text"]},{"name":"btnImg","group":"按钮属性","ctype":"string","editor":"options","options":["(none)","search","success","plus","picture","star-off","close","loading","setting","delete","edit","edit-outline"],"edConfig":{"editable":true,"forceSelection":false}},{"name":"btnImgPath","group":"按钮属性","ctype":"string"},{"name":"btnCls","group":"按钮属性","ctype":"string","editor":"string"},{"name":"fonSize","group":"字体属性","ctype":"string"},{"name":"fontColor","group":"字体属性","ctype":"string"},{"name":"fontFamily","group":"字体属性","ctype":"string"},{"name":"fontWeight","group":"字体属性","ctype":"string"},{"name":"contrastSze","group":"校验规则(比较)","ctype":"string","editor":"combo","options":[{"text":"大于","value":"gt"},{"text":"小于","value":"lt"}]},{"name":"queryBtnClick","group":"事件","ctype":"string","editor":"ace","params":"kssj,jssj"},{"name":"startDateOnchange","group":"事件","ctype":"string","editor":"ace","params":"ksrq,jsrq,bz"},{"name":"endDateOnchange","group":"事件","ctype":"string","editor":"ace","params":"ksrq,jsrq,bz"},{"name":"beforerender","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"afterrender","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.CreateCalendarSn"]);
    xds.Registry.addUserType(xds["vmd.ux.CreateCalendarSn"]);

    var Data_vmd_ux_CreateCalendarSn={"BaseType":"Control","Type":"vmd_ux_CreateCalendarSn","Property":{"dateFormat":{"Description":"时间格式","Prototype":"","Args":{"_Return_":""},"Example":"时间格式"},"dateImghid":{"Description":"隐藏时间框图标","Prototype":"","Args":{"_Return_":""},"Example":"隐藏时间框图标"},"startDateNameTxt":{"Description":"开始日期名称","Prototype":"","Args":{"_Return_":""},"Example":"开始日期名称"},"startDateDeftSel":{"Description":"默认开始时间选择","Prototype":"","Args":{"_Return_":""},"Example":"默认开始时间选择"},"startSpecifiedSel":{"Description":"指定前推单位","Prototype":"","Args":{"_Return_":""},"Example":"指定前推单位"},"startSpecifiedForPush":{"Description":"开始时间指定前推","Prototype":"","Args":{"_Return_":""},"Example":"默认开始时间选择指定前推"},"startSpecifiedTimeIn":{"Description":"指定开始日期","Prototype":"","Args":{"_Return_":""},"Example":"默认开始时间选择指定日期"},"startDateNameCls":{"Description":"开始时间样式","Prototype":"","Args":{"_Return_":""},"Example":"开始时间样式"},"startDateCls":{"Description":"开始时间框样式","Prototype":"","Args":{"_Return_":""},"Example":"开始时间框样式"},"endDateNameTxt":{"Description":"结束日期名称","Prototype":"","Args":{"_Return_":""},"Example":"结束日期名称"},"endDateDeftSel":{"Description":"默认开始时间选择","Prototype":"","Args":{"_Return_":""},"Example":"默认开始时间选择"},"endSpecifiedSel":{"Description":"指定前推单位","Prototype":"","Args":{"_Return_":""},"Example":"指定前推单位"},"endSpecifiedForPush":{"Description":"结束时间指定前推","Prototype":"","Args":{"_Return_":""},"Example":"默认结束时间选择指定前推"},"endSpecifiedTimeIn":{"Description":"指定结束日期","Prototype":"","Args":{"_Return_":""},"Example":"默认开始时间选择指定日期"},"endDateNameCls":{"Description":"结束时间样式","Prototype":"","Args":{"_Return_":""},"Example":"结束时间样式"},"endDateCls":{"Description":"结束时间框样式","Prototype":"","Args":{"_Return_":""},"Example":"结束时间框样式"},"btnTxt":{"Description":"按钮自定义名称","Prototype":"","Args":{"_Return_":""},"Example":"按钮自定义名称"},"btnHid":{"Description":"隐藏查询按钮","Prototype":"","Args":{"_Return_":""},"Example":"隐藏查询按钮"},"btnBgColor":{"Description":"按钮背景颜色","Prototype":"","Args":{"_Return_":""},"Example":"按钮背景颜色"},"btnFontColor":{"Description":"按钮字体颜色","Prototype":"","Args":{"_Return_":""},"Example":"按钮字体颜色"},"btnType":{"Description":"按钮类型","Prototype":"","Args":{"_Return_":""},"Example":"按钮类型"},"btnImg":{"Description":"按钮图标","Prototype":"","Args":{"_Return_":""},"Example":"按钮图标"},"btnImgPath":{"Description":"按钮图标路径","Prototype":"","Args":{"_Return_":""},"Example":"按钮图标路径"},"btnCls":{"Description":"按钮样式","Prototype":"","Args":{"_Return_":""},"Example":"按钮样式"},"fonSize":{"Description":"开始时间字体大小","Prototype":"","Args":{"_Return_":""},"Example":"字体大小"},"fontColor":{"Description":"字体颜色","Prototype":"","Args":{"_Return_":""},"Example":"字体颜色"},"fontFamily":{"Description":"字体","Prototype":"","Args":{"_Return_":""},"Example":"字体"},"fontWeight":{"Description":"字体加粗","Prototype":"","Args":{"_Return_":""},"Example":"字体加粗"},"contrastSze":{"Description":"设置大小","Prototype":"","Args":{"_Return_":""},"Example":"设置大小"}},"Method":{"getStartDateVal":{"Description":"获取开始日期","Prototype":"getStartDateVal()","Args":{"_Return_":"字符串","Args":""},"Example":"获取开始日期"},"getEndDateVal":{"Description":"获取结束日期","Prototype":"getEndDateVal()","Args":{"_Return_":"void","Args":""},"Example":"获取结束日期"},"setStartDateVal":{"Description":"开始日期赋值","Prototype":"setStartDateVal(ksrq)","Args":{"_Return_":"void","Args":"ksrq"},"Example":"开始日期赋值"},"setEndDateVal":{"Description":"结束日期赋值","Prototype":"setEndDateVal(jsrq)","Args":{"_Return_":"void","Args":"jsrq"},"Example":"结束日期赋值"}},"Event":{"queryBtnClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"查询按钮点击事件"},"startDateOnchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"开始时间onchange事件"},"endDateOnchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"结束时间onchange事件"},"beforerender":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"组件渲染前事件"},"afterrender":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"组件渲染后事件"}}}
	ControlsDataManage._add(Data_vmd_ux_CreateCalendarSn)