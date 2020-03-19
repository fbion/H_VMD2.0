xds["vmd.ux.Csection"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Csection",
    category: "vmd复合组件",
    text: "Csection",//中文
    naming: "hwCsection",
    //dtype 设计时组件
    dtype: "vmd.ux.Csection",
    //xtype 运行时组件
    xtype: "vmd.ux.Csection",
    xcls: "vmd.ux.Csection",
    //为了拖拽能自动生成递增id
    defaultName: "hwCsection",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"label":"单位名称：","layout":"hbox"},
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
     ,{"name":"data","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"xsz","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"data"}},{"name":"sjz","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"data"}},{"name":"mrdyx","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"dx","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"label","group":"显示设置","ctype":"string","editor":"string"},{"name":"data2","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"click","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Csection"]);
    xds.Registry.addUserType(xds["vmd.ux.Csection"]);

    var Data_vmd_ux_Csection={"BaseType":"Control","Type":"vmd_ux_Csection","Property":{"data":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"数据集","Name":"数据集"},"xsz":{"Description":"显示值","Prototype":"","Args":{"_Return_":""},"Example":"显示值","Name":"显示值"},"sjz":{"Description":"实际值","Prototype":"","Args":{"_Return_":""},"Example":"实际值","Name":"实际值"},"mrdyx":{"Description":"默认第一项","Prototype":"","Args":{"_Return_":""},"Example":"默认第一项","Name":"默认第一项"},"dx":{"Description":"多选","Prototype":"","Args":{"_Return_":""},"Example":"多选","Name":"多选"},"label":{"Description":"显示名称","Prototype":"","Args":{"_Return_":""},"Example":"名称显示","Name":"显示名称"},"data2":{"Description":"data2","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"setvalue":{"Description":"赋值","Prototype":"setvalue()","Args":{"_Return_":"void","Args":""},"Example":"赋值"},"getvalue":{"Description":"获取值","Prototype":"getvalue()","Args":{"_Return_":"void","Args":""},"Example":"获取值"}},"Event":{"click":{"Prototype":"","Args":{"_Return_":""},"Example":"单击事件"}}}
	ControlsDataManage._add(Data_vmd_ux_Csection)