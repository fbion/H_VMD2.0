xds["vmd.ux.CombinationQuery"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CombinationQuery",
    category: "vmd复合组件",
    text: "CombinationQuery",//中文
    naming: "CombinationQuery",
    //dtype 设计时组件
    dtype: "vmd.ux.CombinationQuery",
    //xtype 运行时组件
    xtype: "vmd.ux.CombinationQuery",
    xcls: "vmd.ux.CombinationQuery",
    //为了拖拽能自动生成递增id
    defaultName: "CombinationQuery",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"label_text1":"combo_text1","label_text2":"combo_text2","label_text3":"combo_text3","rq_label_text2":"——","rq_label_text":"rq","rq_hwDate_format1":"Y-m-d","rq_hwDate_format2":"Y-m-d","button_text3":"button","button_text2":"button","button_text1":"button","layout":"hbox"},
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
     ,{"name":"label_text1","group":"第一组下拉框","ctype":"string","editor":"string"},{"name":"label_margin1","group":"第一组下拉框","ctype":"string"},{"name":"label_hidden","group":"第一组下拉框","ctype":"boolean","editor":"boolean"},{"name":"combo_margin1","group":"第一组下拉框","ctype":"string"},{"name":"combo_hidden1","group":"第一组下拉框","ctype":"boolean","editor":"boolean"},{"name":"combo_valueField1","group":"第一组下拉框","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combo_displayField1","group":"第一组下拉框","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combo_store1","group":"第一组下拉框","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"combo_margin2","group":"第二组下拉框","ctype":"string"},{"name":"combo_hidden2","group":"第二组下拉框","ctype":"boolean","editor":"boolean"},{"name":"combo_valueField2","group":"第二组下拉框","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combo_displayField2","group":"第二组下拉框","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combo_store2","group":"第二组下拉框","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"label_margin2","group":"第二组下拉框","ctype":"string"},{"name":"label_hidden2","group":"第二组下拉框","ctype":"boolean","editor":"boolean"},{"name":"label_text2","group":"第二组下拉框","ctype":"string","editor":"string"},{"name":"combo_displayField3","group":"第三组下拉框","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combo_valueField3","group":"第三组下拉框","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combo_store3","group":"第三组下拉框","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"combo_hidden3","group":"第三组下拉框","ctype":"boolean","editor":"boolean"},{"name":"combo_margin3","group":"第三组下拉框","ctype":"string"},{"name":"label_margin3","group":"第三组下拉框","ctype":"string"},{"name":"label_hidden3","group":"第三组下拉框","ctype":"boolean","editor":"boolean"},{"name":"label_text3","group":"第三组下拉框","ctype":"string","editor":"string"},{"name":"rq_hwDate_hidden2","group":"时间","ctype":"boolean","editor":"boolean"},{"name":"rq_hwDate_hidden1","group":"时间","ctype":"boolean","editor":"boolean"},{"name":"rq_label_hidden2","group":"时间","ctype":"boolean","editor":"boolean"},{"name":"rq_label_hidden1","group":"时间","ctype":"boolean","editor":"boolean"},{"name":"rq_label_text2","group":"时间","ctype":"string","editor":"string"},{"name":"rq_label_text","group":"时间","ctype":"string","editor":"string"},{"name":"rq_hwDate_margin2","group":"时间","ctype":"string"},{"name":"rq_hwDate_margin1","group":"时间","ctype":"string"},{"name":"rq_label_margin2","group":"时间","ctype":"string"},{"name":"rq_label_margin1","group":"时间","ctype":"string"},{"name":"rq_hwDate_format1","group":"时间","ctype":"string","editor":"string"},{"name":"rq_hwDate_hideTrigger1","group":"时间","ctype":"boolean","editor":"boolean"},{"name":"rq_hwDate_hideTrigger2","group":"时间","ctype":"boolean","editor":"boolean"},{"name":"rq_hwDate_format2","group":"时间","ctype":"string","editor":"string"},{"name":"button_text3","group":"按钮","ctype":"string","editor":"string"},{"name":"button_text2","group":"按钮","ctype":"string","editor":"string"},{"name":"button_text1","group":"按钮","ctype":"string","editor":"string"},{"name":"button_margin1","group":"按钮","ctype":"string"},{"name":"button_margin2","group":"按钮","ctype":"string"},{"name":"button_margin3","group":"按钮","ctype":"string"},{"name":"button_hidden3","group":"按钮","ctype":"boolean","editor":"boolean"},{"name":"button_hidden2","group":"按钮","ctype":"boolean","editor":"boolean"},{"name":"button_hidden1","group":"按钮","ctype":"boolean","editor":"boolean"},{"name":"combo1_onchange","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"combo2_onchange","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"combo3_onchange","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"button1_click","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"button2_click","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"button3_click","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"pack":"center","align":"middle"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.CombinationQuery"]);
    xds.Registry.addUserType(xds["vmd.ux.CombinationQuery"]);

    var Data_vmd_ux_CombinationQuery={"BaseType":"Control","Type":"vmd_ux_CombinationQuery","Property":{"label_text1":{"Description":"标签文本","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框label标签文本"},"label_margin1":{"Description":"label边距","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框label边框"},"label_hidden":{"Description":"label隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框label隐藏"},"combo_margin1":{"Description":"combo边距","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框combo边距"},"combo_hidden1":{"Description":"combo隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框combo隐藏"},"combo_valueField1":{"Description":"显示字段","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框combo显示字段"},"combo_displayField1":{"Description":"值字段","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框combo值字段"},"combo_store1":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"第一组下拉框combo数据集"},"combo_margin2":{"Description":"combo边距","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框combo边距"},"combo_hidden2":{"Description":"combo隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框combo隐藏"},"combo_valueField2":{"Description":"显示字段","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框combo显示字段"},"combo_displayField2":{"Description":"值字段","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框combo值字段"},"combo_store2":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框combo数据集"},"label_margin2":{"Description":"label边距","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框label边距"},"label_hidden2":{"Description":"label隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框label隐藏"},"label_text2":{"Description":"标签文本","Prototype":"","Args":{"_Return_":""},"Example":"第二组下拉框label标签文本"},"combo_displayField3":{"Description":"值字段","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框combo值字段"},"combo_valueField3":{"Description":"显示字段","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框combo显示字段"},"combo_store3":{"Description":"combo数据集","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框combo数据集"},"combo_hidden3":{"Description":"combo隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框combo隐藏"},"combo_margin3":{"Description":"combo边距","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框combo边距"},"label_margin3":{"Description":"label边距","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框label边距"},"label_hidden3":{"Description":"label隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框label隐藏"},"label_text3":{"Description":"标签文本","Prototype":"","Args":{"_Return_":""},"Example":"第三组下拉框label标签文本"},"rq_hwDate_hidden2":{"Description":"第二个hwDate隐藏","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个hwDate隐藏"},"rq_hwDate_hidden1":{"Description":"第一个hwDate隐藏","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个hwDate隐藏"},"rq_label_hidden2":{"Description":"第二个label隐藏","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个label隐藏"},"rq_label_hidden1":{"Description":"第一个label隐藏","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个label隐藏"},"rq_label_text2":{"Description":"第二个label文本","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个label文本"},"rq_label_text":{"Description":"第一个label文本","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个label文本"},"rq_hwDate_margin2":{"Description":"第二个hwDate边距","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个hwDate边距"},"rq_hwDate_margin1":{"Description":"第一个hwDate边距","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个hwDate边距"},"rq_label_margin2":{"Description":"第二个label边距","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个label边距"},"rq_label_margin1":{"Description":"第一个label边距","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个label边距"},"rq_hwDate_format1":{"Description":"第一个hwDate日期格式","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个hwDate日期格式"},"rq_hwDate_hideTrigger1":{"Description":"第一个hwDate隐藏日期标志","Prototype":"","Args":{"_Return_":""},"Example":"日期第一个hwDate隐藏日期标志"},"rq_hwDate_hideTrigger2":{"Description":"第二个hwDate隐藏日期标志","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个hwDate隐藏日期标志"},"rq_hwDate_format2":{"Description":"第二个hwDate日期格式","Prototype":"","Args":{"_Return_":""},"Example":"日期第二个hwDate日期格式"},"button_text3":{"Description":"按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"第三个按钮文本"},"button_text2":{"Description":"按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"第二个按钮文本"},"button_text1":{"Description":"按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"第一个按钮文本"},"button_margin1":{"Description":"按钮边距","Prototype":"","Args":{"_Return_":""},"Example":"第一个按钮边距"},"button_margin2":{"Description":"按钮边距","Prototype":"","Args":{"_Return_":""},"Example":"第二个按钮边距"},"button_margin3":{"Description":"按钮边距","Prototype":"","Args":{"_Return_":""},"Example":"第三个按钮边距"},"button_hidden3":{"Description":"按钮隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第三个按钮隐藏"},"button_hidden2":{"Description":"按钮隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第二个按钮隐藏"},"button_hidden1":{"Description":"按钮隐藏","Prototype":"","Args":{"_Return_":""},"Example":"第一个按钮隐藏"}},"Method":{"combo1text":{"Description":"combo1text","Prototype":"combo1text()","Args":{"_Return_":"void","Args":""},"Example":""},"combo1value":{"Description":"combo1value","Prototype":"combo1value()","Args":{"_Return_":"void","Args":""},"Example":""},"combo2value":{"Description":"combo2value","Prototype":"combo2value()","Args":{"_Return_":"void","Args":""},"Example":""},"combo2text":{"Description":"combo2text","Prototype":"combo2text()","Args":{"_Return_":"void","Args":""},"Example":""},"combo3text":{"Description":"combo3text","Prototype":"combo3text()","Args":{"_Return_":"void","Args":""},"Example":""},"combo3value":{"Description":"combo3value","Prototype":"combo3value()","Args":{"_Return_":"void","Args":""},"Example":""},"rqvalue":{"Description":"rqvalue","Prototype":"rqvalue()","Args":{"_Return_":"void","Args":""},"Example":""},"rq1value":{"Description":"rq1value","Prototype":"rq1value()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"combo1_onchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"下拉框值改变"},"combo2_onchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"combo3_onchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"button1_click":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"button2_click":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"button3_click":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_CombinationQuery)