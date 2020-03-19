xds["vmd.ux.DateTest"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateTest",
    category: "vmd复合组件",
    text: "DateTest",//中文
    naming: "hwDateTest",
    //dtype 设计时组件
    dtype: "vmd.ux.DateTest",
    //xtype 运行时组件
    xtype: "vmd.ux.DateTest",
    xcls: "vmd.ux.DateTest",
    //为了拖拽能自动生成递增id
    defaultName: "hwDateTest",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"jsrqlabel":"终止日期:","ksrqlabel":"起始日期:","layout":"hbox"},
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
     ,{"name":"jsrqlabel","group":"日期1设置","ctype":"string","editor":"string"},{"name":"ksrqlabel","group":"日期1设置","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DateTest"]);
    xds.Registry.addUserType(xds["vmd.ux.DateTest"]);

    var Data_vmd_ux_DateTest={"BaseType":"Control","Type":"vmd_ux_DateTest","Property":{"jsrqlabel":{"Description":"结束日期文本","Prototype":"","Args":{"_Return_":""},"Example":"结束日期文本","Name":"结束日期文本"},"ksrqlabel":{"Description":"开始日期文本","Prototype":"","Args":{"_Return_":""},"Example":"开始日期文本","Name":"开始日期文本"}},"Method":{"getKsrqValue":{"Description":"getKsrqValue","Prototype":"getKsrqValue()","Args":{"_Return_":"void","Args":""},"Example":""},"getJsrqValue":{"Description":"getJsrqValue","Prototype":"getJsrqValue()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DateTest)