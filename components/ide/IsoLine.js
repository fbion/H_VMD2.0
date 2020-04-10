xds["vmd.ux.IsoLine"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.IsoLine",
    category: "vmd复合组件",
    text: "IsoLine",//中文
    naming: "hwIsoLine",
    //dtype 设计时组件
    dtype: "vmd.ux.IsoLine",
    //xtype 运行时组件
    xtype: "vmd.ux.IsoLine",
    xcls: "vmd.ux.IsoLine",
    //为了拖拽能自动生成递增id
    defaultName: "hwIsoLine",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/linecolor/1.0/css/iconfont.css?ver=vmd2.0.5.200306","components/ux/toptitle/1.0/css/iconfont.css?ver=vmd2.0.5.200306"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.IsoLine"]);
    xds.Registry.addUserType(xds["vmd.ux.IsoLine"]);

    var Data_vmd_ux_IsoLine={"BaseType":"Control","Type":"vmd_ux_IsoLine","Property":{},"Method":{"init":{"Description":"init","Prototype":"init(data)","Args":{"_Return_":"void","Args":"data"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_IsoLine)