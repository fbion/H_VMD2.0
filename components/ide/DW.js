xds["vmd.ux.DW"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DW",
    category: "vmd复合组件",
    text: "DW",//中文
    naming: "hwDW",
    //dtype 设计时组件
    dtype: "vmd.ux.DW",
    //xtype 运行时组件
    xtype: "vmd.ux.DW",
    xcls: "vmd.ux.DW",
    //为了拖拽能自动生成递增id
    defaultName: "hwDW",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
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
     ,{"name":"ddss","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"ccd"}},{"name":"ddssd","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"ccd"}},{"name":"df","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"ccd"}},{"name":"aad3","group":"设计","ctype":"string"},{"name":"aa","group":"事件","ctype":"string","editor":"ace","params":"aa,bb,ccccc,ddddddddddddddddddddddds"},{"name":"aadd","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DW"]);
    xds.Registry.addUserType(xds["vmd.ux.DW"]);

    var Data_vmd_ux_DW={"BaseType":"Control","Type":"vmd_ux_DW","Property":{"ddss":{"Description":"ddss","Prototype":"","Args":{"_Return_":""},"Example":""},"ddssd":{"Description":"ddssd","Prototype":"","Args":{"_Return_":""},"Example":""},"df":{"Description":"df","Prototype":"","Args":{"_Return_":""},"Example":""},"aad3":{"Description":"aad3","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"aaaa":{"Description":"aaaa","Prototype":"aaaa(a,b,c,d,e,f,g,hhhhhhhhhhh,eesss)","Args":{"_Return_":"void","Args":"a,b,c,d,e,f,g,hhhhhhhhhhh,eesss"},"Example":""}},"Event":{"aa":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"aadd":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DW)