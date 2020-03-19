xds["vmd.ux.ReportQueryField"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ReportQueryField",
    category: "vmd复合组件",
    text: "ReportQueryField",//中文
    naming: "hwReportQueryField",
    //dtype 设计时组件
    dtype: "vmd.ux.ReportQueryField",
    //xtype 运行时组件
    xtype: "vmd.ux.ReportQueryField",
    xcls: "vmd.ux.ReportQueryField",
    //为了拖拽能自动生成递增id
    defaultName: "hwReportQueryField",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["lib/laydate/theme/default/laydate.css"],
    requireJs: ["lib/laydate/laydate.src.js"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"radioHidden":true,"dyRadioHidden":true,"dateHidden":true,"importHidden":true,"addHidden":true,"layout":"column"},
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
     ,{"name":"radioHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"dwHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"dyRadioHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"dyHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"jhHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"yearHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"dateHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"periodDateHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"queryHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"printHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"importHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"exportHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"addHidden","group":"组件显示/隐藏","ctype":"boolean","editor":"boolean"},{"name":"wellType","group":"设计","ctype":"string","editor":"combo","options":[{"text":"油井","value":"11"},{"text":"水井","value":"31"}]},{"name":"dyAll","group":"设计","ctype":"boolean"},{"name":"queryClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"printClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"importClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"exportClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"addClick","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ReportQueryField"]);
    xds.Registry.addUserType(xds["vmd.ux.ReportQueryField"]);

    var Data_vmd_ux_ReportQueryField={"BaseType":"Control","Type":"vmd_ux_ReportQueryField","Property":{"radioHidden":{"Description":"隐藏日度月度","Prototype":"","Args":{"_Return_":""},"Example":"隐藏单选按钮组","Name":"隐藏日度月度"},"dwHidden":{"Description":"隐藏单位","Prototype":"","Args":{"_Return_":""},"Example":"隐藏单位下拉框","Name":"隐藏单位"},"dyRadioHidden":{"Description":"隐藏单元类型","Prototype":"","Args":{"_Return_":""},"Example":"隐藏单元类型","Name":"隐藏单元类型"},"dyHidden":{"Description":"隐藏单元","Prototype":"","Args":{"_Return_":""},"Example":"隐藏单元下拉框","Name":"隐藏单元"},"jhHidden":{"Description":"隐藏井号","Prototype":"","Args":{"_Return_":""},"Example":"隐藏井号下拉框","Name":"隐藏井号"},"yearHidden":{"Description":"隐藏年度","Prototype":"","Args":{"_Return_":""},"Example":"隐藏年度选择框","Name":"隐藏年度"},"dateHidden":{"Description":"隐藏日期","Prototype":"","Args":{"_Return_":""},"Example":"隐藏日期选择框","Name":"隐藏日期"},"periodDateHidden":{"Description":"隐藏阶段日期","Prototype":"","Args":{"_Return_":""},"Example":"隐藏阶段日期选择框","Name":"隐藏阶段日期"},"queryHidden":{"Description":"隐藏查询","Prototype":"","Args":{"_Return_":""},"Example":"隐藏查询按钮","Name":"隐藏查询"},"printHidden":{"Description":"隐藏打印","Prototype":"","Args":{"_Return_":""},"Example":"隐藏打印按钮","Name":"隐藏打印"},"importHidden":{"Description":"隐藏导入","Prototype":"","Args":{"_Return_":""},"Example":"隐藏导入按钮","Name":"隐藏导入"},"exportHidden":{"Description":"隐藏导出","Prototype":"","Args":{"_Return_":""},"Example":"隐藏导出按钮","Name":"隐藏导出"},"addHidden":{"Description":"隐藏添加","Prototype":"","Args":{"_Return_":""},"Example":"隐藏添加按钮","Name":"隐藏添加"},"wellType":{"Description":"井别","Prototype":"","Args":{"_Return_":""},"Example":"选择井别","Name":"井别"},"dyAll":{"Description":"单元下拉框包含全部","Prototype":"","Args":{"_Return_":""},"Example":"单元下拉框是否包含全部","Name":"单元下拉框包含全部"}},"Method":{"getDwdm":{"Description":"获取单位代码","Prototype":"getDwdm()","Args":{"_Return_":"void","Args":""},"Example":"获取单位代码"},"getDwmc":{"Description":"获取单位名称","Prototype":"getDwmc()","Args":{"_Return_":"void","Args":""},"Example":"获取单位名称"},"getDymc":{"Description":"获取单元名称","Prototype":"getDymc()","Args":{"_Return_":"void","Args":""},"Example":"获取单元名称"},"getJh":{"Description":"获取井号","Prototype":"getJh()","Args":{"_Return_":"void","Args":""},"Example":"获取井号"},"getHzjh":{"Description":"获取汉字井号","Prototype":"getHzjh()","Args":{"_Return_":"void","Args":""},"Example":"获取汉字井号"},"getYear":{"Description":"获取年度","Prototype":"getYear()","Args":{"_Return_":"void","Args":""},"Example":"获取年度"},"getDate":{"Description":"获取日期","Prototype":"getDate()","Args":{"_Return_":"void","Args":""},"Example":"获取日期"},"getStartDate":{"Description":"获取阶段开始日期","Prototype":"getStartDate()","Args":{"_Return_":"void","Args":""},"Example":"获取阶段开始日期"},"getEndDate":{"Description":"获取阶段结束日期","Prototype":"getEndDate()","Args":{"_Return_":"void","Args":""},"Example":"获取阶段结束日期"},"getStartMonth":{"Description":"获取开始年月","Prototype":"getStartMonth()","Args":{"_Return_":"void","Args":""},"Example":"获取开始年月"},"getEndMonth":{"Description":"获取结束年月","Prototype":"getEndMonth()","Args":{"_Return_":"void","Args":""},"Example":"获取结束年月"},"getRadioValue":{"Description":"获取单选按钮选中值","Prototype":"getRadioValue()","Args":{"_Return_":"void","Args":""},"Example":"获取单选按钮选中值"},"getDylxRadioValue":{"Description":"获取单元类型","Prototype":"getDylxRadioValue()","Args":{"_Return_":"void","Args":""},"Example":"获取单元类型"}},"Event":{"queryClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"查询点击事件"},"printClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"打印点击事件"},"importClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"导入点击事件"},"exportClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"导出点击事件"},"addClick":{"Prototype":"","Args":{"_Return_":""},"Example":"添加点击事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ReportQueryField)