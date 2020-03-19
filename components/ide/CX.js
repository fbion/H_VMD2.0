xds["vmd.ux.CX"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CX",
    category: "vmd复合组件",
    text: "CX",//中文
    naming: "hwCX",
    //dtype 设计时组件
    dtype: "vmd.ux.CX",
    //xtype 运行时组件
    xtype: "vmd.ux.CX",
    xcls: "vmd.ux.CX",
    //为了拖拽能自动生成递增id
    defaultName: "hwCX",
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
     ,{"name":"store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"field","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.CX"]);
    xds.Registry.addUserType(xds["vmd.ux.CX"]);

    var Data_vmd_ux_CX={"BaseType":"Control","Type":"vmd_ux_CX","Property":{"store":{"Description":"store","Prototype":"","Args":{"_Return_":""},"Example":""},"field":{"Description":"field","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_CX)