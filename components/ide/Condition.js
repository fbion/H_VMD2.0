xds["vmd.ux.Condition"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Condition",
    category: "vmd复合组件",
    text: "Condition",//中文
    naming: "Condition",
    //dtype 设计时组件
    dtype: "vmd.ux.Condition",
    //xtype 运行时组件
    xtype: "vmd.ux.Condition",
    xcls: "vmd.ux.Condition",
    //为了拖拽能自动生成递增id
    defaultName: "Condition",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"dw_lable_text":"单位：","jsrqCalendar":"today","ksText":"开始时间：","jsText":" 结束时间：","jb_lable_text":"级别：","lx_combo_text":"类型：","zt_combo_text":"状态：","ygjobjtext":"预告警对象：","layout":"hbox"},
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
     ,{"name":"dw_lable_text","group":"单位","ctype":"string","editor":"string"},{"name":"dw_combo_store","group":"单位","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"ksrqCalendar","group":"时间","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}]},{"name":"jsrqCalendar","group":"时间","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}]},{"name":"ksText","group":"时间","ctype":"string","editor":"string"},{"name":"jsText","group":"时间","ctype":"string","editor":"string"},{"name":"jb_lable_text","group":"级别","ctype":"string","editor":"string"},{"name":"jb_combo_store","group":"级别","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"lx_combo_text","group":"类型","ctype":"string","editor":"string"},{"name":"lx_combo_store","group":"类型","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"zt_combo_text","group":"状态","ctype":"string","editor":"string"},{"name":"zt_combo_store","group":"状态","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"ztShow","group":"显示隐藏","ctype":"boolean"},{"name":"dwShow","group":"显示隐藏","ctype":"boolean"},{"name":"lxShow","group":"显示隐藏","ctype":"boolean"},{"name":"jbShow","group":"显示隐藏","ctype":"boolean"},{"name":"jsTshow","group":"显示隐藏","ctype":"boolean"},{"name":"ygjdx_show","group":"显示隐藏","ctype":"boolean"},{"name":"ksTshow","group":"显示隐藏","ctype":"boolean"},{"name":"ygjobjtext","group":"预告警对象","ctype":"string","editor":"string"},{"name":"query","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"export","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Condition"]);
    xds.Registry.addUserType(xds["vmd.ux.Condition"]);

    var Data_vmd_ux_Condition={"BaseType":"Control","Type":"vmd_ux_Condition","Property":{"dw_lable_text":{"Description":"单位文本","Prototype":"","Args":{"_Return_":""},"Example":"单位文本"},"dw_combo_store":{"Description":"单位 Store","Prototype":"","Args":{"_Return_":""},"Example":"单位 Store"},"ksrqCalendar":{"Description":"时间","Prototype":"","Args":{"_Return_":""},"Example":"时间"},"jsrqCalendar":{"Description":"时间","Prototype":"","Args":{"_Return_":""},"Example":"时间"},"ksText":{"Description":"ksText","Prototype":"","Args":{"_Return_":""},"Example":""},"jsText":{"Description":"jsText","Prototype":"","Args":{"_Return_":""},"Example":""},"jb_lable_text":{"Description":"级别文本","Prototype":"","Args":{"_Return_":""},"Example":"级别文本"},"jb_combo_store":{"Description":"级别","Prototype":"","Args":{"_Return_":""},"Example":"级别"},"lx_combo_text":{"Description":"类型文本","Prototype":"","Args":{"_Return_":""},"Example":"类型文本"},"lx_combo_store":{"Description":"类型","Prototype":"","Args":{"_Return_":""},"Example":"类型"},"zt_combo_text":{"Description":"zt_combo_text","Prototype":"","Args":{"_Return_":""},"Example":""},"zt_combo_store":{"Description":"状态","Prototype":"","Args":{"_Return_":""},"Example":"状态"},"ztShow":{"Description":"ztShow","Prototype":"","Args":{"_Return_":""},"Example":""},"dwShow":{"Description":"单位显示隐藏","Prototype":"","Args":{"_Return_":""},"Example":"单位显示隐藏"},"lxShow":{"Description":"lxShow","Prototype":"","Args":{"_Return_":""},"Example":""},"jbShow":{"Description":"jbShow","Prototype":"","Args":{"_Return_":""},"Example":""},"jsTshow":{"Description":"jsTshow","Prototype":"","Args":{"_Return_":""},"Example":""},"ygjdx_show":{"Description":"ygjdx_show","Prototype":"","Args":{"_Return_":""},"Example":""},"ksTshow":{"Description":"ksTshow","Prototype":"","Args":{"_Return_":""},"Example":""},"ygjobjtext":{"Description":"ygjobjtext","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"GetParams":{"Description":"获取条件参数，例'dwdm=xx&ksrq=2018-01-01&lx=xx'","Prototype":"GetParams()","Args":{"_Return_":"字符串","Args":""},"Example":"获取条件参数，例'dwdm=xx&ksrq=2018-01-01&lx=xx'"}},"Event":{"query":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"export":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Condition)