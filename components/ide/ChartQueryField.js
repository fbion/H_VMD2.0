xds["vmd.ux.ChartQueryField"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ChartQueryField",
    category: "vmd复合组件",
    text: "ChartQueryField",//中文
    naming: "hwChartQueryField",
    //dtype 设计时组件
    dtype: "vmd.ux.ChartQueryField",
    //xtype 运行时组件
    xtype: "vmd.ux.ChartQueryField",
    xcls: "vmd.ux.ChartQueryField",
    //为了拖拽能自动生成递增id
    defaultName: "hwChartQueryField",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["lib/laydate/theme/default/laydate.css"],
    requireJs: ["lib/laydate/laydate.src.js"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"monthHidden":true,"layout":"hbox"},
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
     ,{"name":"radioHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"dateHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"monthHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"queryHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"queryClick","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"start"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.ChartQueryField"]);
    xds.Registry.addUserType(xds["vmd.ux.ChartQueryField"]);

    var Data_vmd_ux_ChartQueryField={"BaseType":"Control","Type":"vmd_ux_ChartQueryField","Property":{"radioHidden":{"Description":"隐藏日度月度","Prototype":"","Args":{"_Return_":""},"Example":"隐藏单选按钮","Name":"隐藏日度月度"},"dateHidden":{"Description":"隐藏起止日期","Prototype":"","Args":{"_Return_":""},"Example":"隐藏日期阶段选择框","Name":"隐藏起止日期"},"monthHidden":{"Description":"隐藏起止年月","Prototype":"","Args":{"_Return_":""},"Example":"隐藏年月阶段选择框","Name":"隐藏起止年月"},"queryHidden":{"Description":"隐藏查询","Prototype":"","Args":{"_Return_":""},"Example":"隐藏查询按钮","Name":"隐藏查询"}},"Method":{"getStartDate":{"Description":"获取开始日期","Prototype":"getStartDate()","Args":{"_Return_":"void","Args":""},"Example":"获取开始日期"},"getEndDate":{"Description":"获取结束日期","Prototype":"getEndDate()","Args":{"_Return_":"void","Args":""},"Example":"获取结束日期"},"getStartMonth":{"Description":"获取开始年月","Prototype":"getStartMonth()","Args":{"_Return_":"void","Args":""},"Example":"获取开始年月"},"getEndMonth":{"Description":"获取结束年月","Prototype":"getEndMonth()","Args":{"_Return_":"void","Args":""},"Example":"获取结束年月"},"getRadioValue":{"Description":"获取单选按钮选中值","Prototype":"getRadioValue()","Args":{"_Return_":"void","Args":""},"Example":"获取单选按钮选中值"}},"Event":{"queryClick":{"Prototype":"","Args":{"_Return_":""},"Example":"点击查询按钮事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ChartQueryField)