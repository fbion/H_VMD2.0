xds["vmd.ux.TestDemo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestDemo",
    category: "vmd复合组件",
    text: "TestDemo",//中文
    naming: "hwTestDemo",
    //dtype 设计时组件
    dtype: "vmd.ux.TestDemo",
    //xtype 运行时组件
    xtype: "vmd.ux.TestDemo",
    xcls: "vmd.ux.TestDemo",
    //为了拖拽能自动生成递增id
    defaultName: "hwTestDemo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/testdemo/1.0/file/datainput.css"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"hbox"},
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.TestDemo"]);
    xds.Registry.addUserType(xds["vmd.ux.TestDemo"]);

    var Data_vmd_ux_TestDemo={"BaseType":"Control","Type":"vmd_ux_TestDemo","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TestDemo)