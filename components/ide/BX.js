xds["vmd.ux.BX"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.BX",
    category: "vmd复合组件",
    text: "BX",//中文
    naming: "hwBX",
    //dtype 设计时组件
    dtype: "vmd.ux.BX",
    //xtype 运行时组件
    xtype: "vmd.ux.BX",
    xcls: "vmd.ux.BX",
    //为了拖拽能自动生成递增id
    defaultName: "hwBX",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datepicker/1.0/css/datepicker.css?ver=vmd2.0.5.200306"],
    requireJs: ["components/ux/datepicker/1.0/js/moment.min.js?ver=vmd2.0.5.200306","components/ux/datepicker/1.0/js/datepicker.js?ver=vmd2.0.5.200306"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"hbox"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    isPropPanel:true,
	bindCmp:'TestProMode',
	nodeclick:function () {
		 this.activeSettings('TestProMode', '33', '240', '1.0');
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
     ,{"name":"testcls","group":"设计","ctype":"string","editor":"combo","options":[{"text":"左","value":"left"},{"text":"右","value":"right"},{"text":"上","value":"top"},{"text":"下","value":"bottom"}]},{"name":"aa","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.BX"]);
    xds.Registry.addUserType(xds["vmd.ux.BX"]);

    var Data_vmd_ux_BX={"BaseType":"Control","Type":"vmd_ux_BX","Property":{"testcls":{"Description":"测试","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"测试"},"aa":{"Description":"aa","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_BX)