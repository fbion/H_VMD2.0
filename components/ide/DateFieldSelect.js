xds["vmd.ux.DateFieldSelect"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateFieldSelect",
    category: "vmd复合组件",
    text: "DateFieldSelect",//中文
    naming: "DateFieldSelect",
    //dtype 设计时组件
    dtype: "vmd.ux.DateFieldSelect",
    //xtype 运行时组件
    xtype: "vmd.ux.DateFieldSelect",
    xcls: "vmd.ux.DateFieldSelect",
    //为了拖拽能自动生成递增id
    defaultName: "DateFieldSelect",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"hbox"},
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
     ,{"name":"queryData","group":"事件","ctype":"string","editor":"ace","params":"rq1,rq2"},{"name":"exportData","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DateFieldSelect"]);
    xds.Registry.addUserType(xds["vmd.ux.DateFieldSelect"]);

    var Data_vmd_ux_DateFieldSelect={"BaseType":"Control","Type":"vmd_ux_DateFieldSelect","Property":{},"Method":{"getDate1":{"Description":"getDate1","Prototype":"getDate1()","Args":{"_Return_":"void","Args":""},"Example":""},"getDate2":{"Description":"getDate2","Prototype":"getDate2()","Args":{"_Return_":"void","Args":""},"Example":""},"setDate1":{"Description":"setDate1","Prototype":"setDate1(p_Date1)","Args":{"_Return_":"无","Args":"p_Date1"},"Example":""},"setDate2":{"Description":"setDate2","Prototype":"setDate2(p_Date2)","Args":{"_Return_":"无","Args":"p_Date2"},"Example":""}},"Event":{"queryData":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"查询事件"},"exportData":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DateFieldSelect)