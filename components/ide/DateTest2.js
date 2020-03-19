xds["vmd.ux.DateTest2"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateTest2",
    category: "vmd复合组件",
    text: "DateTest2",//中文
    naming: "hwDateTest2",
    //dtype 设计时组件
    dtype: "vmd.ux.DateTest2",
    //xtype 运行时组件
    xtype: "vmd.ux.DateTest2",
    xcls: "vmd.ux.DateTest2",
    //为了拖拽能自动生成递增id
    defaultName: "hwDateTest2",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datetest2/1.0/css/button.css"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"text":"button","layout":"hbox"},
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
     ,{"name":"text","group":"设计","ctype":"string","editor":"string"},{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"displayfield","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"valuefiled","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"select","group":"设计","ctype":"string","editor":"combo","options":[{"text":"aa","value":"aa"},{"text":"bb","value":"bb"}]},{"name":"queryclick","group":"事件","ctype":"string","editor":"ace","params":"ksrq,jsrq"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DateTest2"]);
    xds.Registry.addUserType(xds["vmd.ux.DateTest2"]);

    var Data_vmd_ux_DateTest2={"BaseType":"Control","Type":"vmd_ux_DateTest2","Property":{"text":{"Description":"text","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"store":{"Description":"store","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"displayfield":{"Description":"displayfield","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"valuefiled":{"Description":"valuefiled","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"select":{"Description":"select","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{},"Event":{"queryclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DateTest2)