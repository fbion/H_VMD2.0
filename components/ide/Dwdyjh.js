xds["vmd.ux.Dwdyjh"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Dwdyjh",
    category: "vmd复合组件",
    text: "Dwdyjh",//中文
    naming: "Dwdyjh",
    //dtype 设计时组件
    dtype: "vmd.ux.Dwdyjh",
    //xtype 运行时组件
    xtype: "vmd.ux.Dwdyjh",
    xcls: "vmd.ux.Dwdyjh",
    //为了拖拽能自动生成递增id
    defaultName: "Dwdyjh",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"dyname":"单元:","layout":"hbox"},
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
     ,{"name":"dwstore","group":"单位","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"dwvaluefield","group":"单位","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"dwstore"}},{"name":"dwdisplayfield","group":"单位","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"dwstore"}},{"name":"jhstore","group":"井号","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"jhdisplayfield","group":"井号","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"jhstore"}},{"name":"jhvaluefield","group":"井号","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"jhstore"}},{"name":"jhwhere","group":"井号","ctype":"string"},{"name":"isdyshow","group":"下拉显示","ctype":"boolean"},{"name":"isjhshow","group":"下拉显示","ctype":"boolean"},{"name":"dystore","group":"单元或油田","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"dyvaluefield","group":"单元或油田","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"dystore"}},{"name":"dydisplayfield","group":"单元或油田","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"dystore"}},{"name":"dywhere","group":"单元或油田","ctype":"string"},{"name":"dyname","group":"单元或油田","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Dwdyjh"]);
    xds.Registry.addUserType(xds["vmd.ux.Dwdyjh"]);

    var Data_vmd_ux_Dwdyjh={"BaseType":"Control","Type":"vmd_ux_Dwdyjh","Property":{"dwstore":{"Description":"dwstore","Prototype":"","Args":{"_Return_":""},"Example":""},"dwvaluefield":{"Description":"dwvaluefield","Prototype":"","Args":{"_Return_":""},"Example":""},"dwdisplayfield":{"Description":"dwdisplayfield","Prototype":"","Args":{"_Return_":""},"Example":""},"jhstore":{"Description":"jhstore","Prototype":"","Args":{"_Return_":""},"Example":""},"jhdisplayfield":{"Description":"jhdisplayfield","Prototype":"","Args":{"_Return_":""},"Example":""},"jhvaluefield":{"Description":"jhvaluefield","Prototype":"","Args":{"_Return_":""},"Example":""},"jhwhere":{"Description":"jhwhere","Prototype":"","Args":{"_Return_":""},"Example":""},"isdyshow":{"Description":"isdyshow","Prototype":"","Args":{"_Return_":""},"Example":""},"isjhshow":{"Description":"isjhshow","Prototype":"","Args":{"_Return_":""},"Example":""},"dystore":{"Description":"dystore","Prototype":"","Args":{"_Return_":""},"Example":""},"dyvaluefield":{"Description":"dyvaluefield","Prototype":"","Args":{"_Return_":""},"Example":""},"dydisplayfield":{"Description":"dydisplayfield","Prototype":"","Args":{"_Return_":""},"Example":""},"dywhere":{"Description":"dywhere","Prototype":"","Args":{"_Return_":""},"Example":""},"dyname":{"Description":"dyname","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"getdwvalue":{"Description":"getdwvalue","Prototype":"getdwvalue()","Args":{"_Return_":"void","Args":""},"Example":""},"getdyvalue":{"Description":"getdyvalue","Prototype":"getdyvalue()","Args":{"_Return_":"void","Args":""},"Example":""},"getjhvalue":{"Description":"getjhvalue","Prototype":"getjhvalue()","Args":{"_Return_":"void","Args":""},"Example":""},"getdwtext":{"Description":"getdwtext","Prototype":"getdwtext()","Args":{"_Return_":"void","Args":""},"Example":""},"getdytext":{"Description":"getdytext","Prototype":"getdytext()","Args":{"_Return_":"void","Args":""},"Example":""},"getjhtext":{"Description":"getjhtext","Prototype":"getjhtext()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Dwdyjh)