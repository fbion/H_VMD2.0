xds["vmd.ux.DateTestCheck"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DateTestCheck",
    category: "vmd复合组件",
    text: "DateTestCheck",//中文
    naming: "hwDateTestCheck",
    //dtype 设计时组件
    dtype: "vmd.ux.DateTestCheck",
    //xtype 运行时组件
    xtype: "vmd.ux.DateTestCheck",
    xcls: "vmd.ux.DateTestCheck",
    //为了拖拽能自动生成递增id
    defaultName: "hwDateTestCheck",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datetestcheck/1.0/css/button.css"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"text":"button","layout":"hbox"},
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
     ,{"name":"text","group":"设计","ctype":"string","editor":"string"},{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"displayfield","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"valuefiled","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"select","group":"设计","ctype":"string","editor":"combo","options":[{"text":"aa","value":"aa"},{"text":"bb","value":"bb"}]},{"name":"queryclick","group":"事件","ctype":"string","editor":"ace","params":"ksrq,jsrq"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DateTestCheck"]);
    xds.Registry.addUserType(xds["vmd.ux.DateTestCheck"]);

    var Data_vmd_ux_DateTestCheck={"BaseType":"Control","Type":"vmd_ux_DateTestCheck","Property":{"text":{"Description":"text","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"store":{"Description":"store","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"displayfield":{"Description":"displayfield","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"valuefiled":{"Description":"valuefiled","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"select":{"Description":"select","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{},"Event":{"queryclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DateTestCheck)