xds["vmd.ux.DateTest1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateTest1",
    category: "vmd复合组件",
    text: "DateTest1",//中文
    naming: "hwDateTest1",
    //dtype 设计时组件
    dtype: "vmd.ux.DateTest1",
    //xtype 运行时组件
    xtype: "vmd.ux.DateTest1",
    xcls: "vmd.ux.DateTest1",
    //为了拖拽能自动生成递增id
    defaultName: "hwDateTest1",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"ksrqlabel":"起始日期:","jsrqlabel":"结束日期:","layout":"hbox"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    
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
     ,{"name":"ksrqlabel","group":"设计","ctype":"string","editor":"string"},{"name":"jsrqlabel","group":"设计","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DateTest1"]);
    xds.Registry.addUserType(xds["vmd.ux.DateTest1"]);

    var Data_vmd_ux_DateTest1={"BaseType":"Control","Type":"vmd_ux_DateTest1","Property":{"ksrqlabel":{"Description":"开始日期文本","Prototype":"","Args":{"_Return_":""},"Example":"开始日期文本","Name":"开始日期文本"},"jsrqlabel":{"Description":"结束日期文本","Prototype":"","Args":{"_Return_":""},"Example":"结束日期文本","Name":"结束日期文本"}},"Method":{"getKsrqValue":{"Description":"getKsrqValue","Prototype":"getKsrqValue()","Args":{"_Return_":"void","Args":""},"Example":""},"getJsrqValue":{"Description":"获取结束日期值","Prototype":"getJsrqValue()","Args":{"_Return_":"void","Args":""},"Example":"获取结束日期值"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DateTest1)