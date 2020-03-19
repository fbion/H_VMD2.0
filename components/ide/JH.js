xds["vmd.ux.JH"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.JH",
    category: "vmd复合组件",
    text: "JH",//中文
    naming: "hwJH",
    //dtype 设计时组件
    dtype: "vmd.ux.JH",
    //xtype 运行时组件
    xtype: "vmd.ux.JH",
    xcls: "vmd.ux.JH",
    //为了拖拽能自动生成递增id
    defaultName: "hwJH",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datepicker/1.0/css/datepicker.css"],
    requireJs: ["components/ux/datepicker/1.0/js/moment.min.js","components/ux/datepicker/1.0/js/datepicker.js"],
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.JH"]);
    xds.Registry.addUserType(xds["vmd.ux.JH"]);

    var Data_vmd_ux_JH={"BaseType":"Control","Type":"vmd_ux_JH","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_JH)