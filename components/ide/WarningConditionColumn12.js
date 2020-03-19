xds["vmd.ux.WarningConditionColumn12"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.WarningConditionColumn12",
    category: "vmd复合组件",
    text: "WarningConditionColumn12",//中文
    naming:"warningconditioncolumn12",
    //dtype 设计时组件
    dtype: "vmd.ux.WarningConditionColumn12",
    //xtype 运行时组件
    xtype: "vmd.ux.WarningConditionColumn12",
    xcls: "vmd.ux.WarningConditionColumn12",
    //为了拖拽能自动生成递增id
    defaultName:"warningconditioncolumn12",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"dw_lable_text":"单位:","ksDate_defaultValue":"prevDay","jsDate_defaultValue":"today","ygj_Text_xtype":"xdtextfield","cx_button_xtype":"vmd.button","dc_button_xtype":"vmd.button","layout":"fit"},
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
     ,{"name":"dw_lable_text","group":"单位","ctype":"string","editor":"string"},{"name":"ksDate_defaultValue","group":"时间","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}],"edConfig":{}},{"name":"jsDate_defaultValue","group":"时间","ctype":"string","editor":"combo","options":[{"text":"(none)","value":""},{"text":"今天","value":"today"},{"text":"上一天","value":"prevDay"},{"text":"下一天","value":"nextDay"},{"text":"上一周","value":"prevWeek"},{"text":"下一周","value":"nextWeek"},{"text":"上一月","value":"prevMonth"},{"text":"下一月","value":"nextMonth"},{"text":"上一季度","value":"prev3Month"},{"text":"下一季度","value":"next3Month"},{"text":"上一年","value":"prevYear"},{"text":"下一年","value":"nextYear"}],"edConfig":{}},{"name":"jb_combo_store","group":"级别","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"jb_combo_displayField","group":"级别","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"jb_combo_valueField","group":"级别","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"lx_combo_store","group":"类型","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"lx_combo_displayField","group":"类型","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"lx_combo_valueField","group":"类型","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"zt_combo_store","group":"状态","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"zt_combo_displayField","group":"状态","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"zt_combo_valueField","group":"状态","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"ygj_Text_xtype","group":"预警对象","ctype":"string","editor":"string"},{"name":"cx_button_xtype","group":"查询","ctype":"string","editor":"string"},{"name":"dc_button_xtype","group":"查询","ctype":"string","editor":"string"},{"name":"isdwshow","group":"显示隐藏","ctype":"boolean"},{"name":"daochu","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"chaxun","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.WarningConditionColumn12"]);
    xds.Registry.addUserType(xds["vmd.ux.WarningConditionColumn12"]);

    var Data_vmd_ux_WarningConditionColumn12={"BaseType":"Control","Type":"vmd_ux_WarningConditionColumn12","Property":{"dw_lable_text":{"Description":"dw_lable_text","Prototype":"","Args":{"_Return_":""},"Example":""},"ksDate_defaultValue":{"Description":"ksDate_defaultValue","Prototype":"","Args":{"_Return_":""},"Example":""},"jsDate_defaultValue":{"Description":"jsDate_defaultValue","Prototype":"","Args":{"_Return_":""},"Example":""},"jb_combo_store":{"Description":"jb_combo_store","Prototype":"","Args":{"_Return_":""},"Example":""},"jb_combo_displayField":{"Description":"jb_combo_displayField","Prototype":"","Args":{"_Return_":""},"Example":""},"jb_combo_valueField":{"Description":"jb_combo_valueField","Prototype":"","Args":{"_Return_":""},"Example":""},"lx_combo_store":{"Description":"lx_combo_store","Prototype":"","Args":{"_Return_":""},"Example":""},"lx_combo_displayField":{"Description":"lx_combo_displayField","Prototype":"","Args":{"_Return_":""},"Example":""},"lx_combo_valueField":{"Description":"lx_combo_valueField","Prototype":"","Args":{"_Return_":""},"Example":""},"zt_combo_store":{"Description":"zt_combo_store","Prototype":"","Args":{"_Return_":""},"Example":""},"zt_combo_displayField":{"Description":"zt_combo_displayField","Prototype":"","Args":{"_Return_":""},"Example":""},"zt_combo_valueField":{"Description":"zt_combo_valueField","Prototype":"","Args":{"_Return_":""},"Example":""},"ygj_Text_xtype":{"Description":"ygj_Text_xtype","Prototype":"","Args":{"_Return_":""},"Example":""},"cx_button_xtype":{"Description":"cx_button_xtype","Prototype":"","Args":{"_Return_":""},"Example":""},"dc_button_xtype":{"Description":"dc_button_xtype","Prototype":"","Args":{"_Return_":""},"Example":""},"isdwshow":{"Description":"isdwshow","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"Show":{"Description":"num 1 未接警 2处置中 3已完成 4处置查询  控制条件显示隐藏","Prototype":"Show(num)","Args":{"_Return_":"void","Args":"num"},"Example":"num 1 未接警 2处置中 3已完成 4处置查询  控制条件显示隐藏"}},"Event":{"daochu":{"Prototype":"","Args":{"_Return_":""},"Example":""},"chaxun":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_WarningConditionColumn12)