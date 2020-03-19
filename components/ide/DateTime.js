xds["vmd.ux.DateTime"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateTime",
    category: "vmd复合组件",
    text: "DateTime",//中文
    naming: "DateTime",
    //dtype 设计时组件
    dtype: "vmd.ux.DateTime",
    //xtype 运行时组件
    xtype: "vmd.ux.DateTime",
    xcls: "vmd.ux.DateTime",
    //为了拖拽能自动生成递增id
    defaultName: "DateTime",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"date1":"Y-m-d","date2":"Y-m-d","rq1label":"时间","rq1label2":"至","layout":"fit"},
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
     ,{"name":"date1","group":"设计","ctype":"string","editor":"string"},{"name":"date2","group":"设计","ctype":"string","editor":"string"},{"name":"btnhide","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"rq1label","group":"设计","ctype":"string","editor":"string"},{"name":"rq1label2","group":"设计","ctype":"string","editor":"string"},{"name":"btclick","group":"事件","ctype":"string","editor":"ace","params":"rq1,rq2"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DateTime"]);
    xds.Registry.addUserType(xds["vmd.ux.DateTime"]);

    var Data_vmd_ux_DateTime={"BaseType":"Control","Type":"vmd_ux_DateTime","Property":{"date1":{"Description":"开始时间","Prototype":"","Args":{"_Return_":""},"Example":"开始时间"},"date2":{"Description":"结束时间","Prototype":"","Args":{"_Return_":""},"Example":"结束时间"},"btnhide":{"Description":"btnhide","Prototype":"","Args":{"_Return_":""},"Example":""},"rq1label":{"Description":"rq1label","Prototype":"","Args":{"_Return_":""},"Example":""},"rq1label2":{"Description":"rq1label2","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"getksrq":{"Description":"getksrq","Prototype":"getksrq()","Args":{"_Return_":"void","Args":""},"Example":""},"getjsrq":{"Description":"getjsrq","Prototype":"getjsrq()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"btclick":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DateTime)