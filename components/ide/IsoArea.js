xds["vmd.ux.IsoArea"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.IsoArea",
    category: "vmd复合组件",
    text: "IsoArea",//中文
    naming: "hwIsoArea",
    //dtype 设计时组件
    dtype: "vmd.ux.IsoArea",
    //xtype 运行时组件
    xtype: "vmd.ux.IsoArea",
    xcls: "vmd.ux.IsoArea",
    //为了拖拽能自动生成递增id
    defaultName: "hwIsoArea",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/selectcolor/1.0/css/hwcharts.css?ver=vmd2.0.5.200306"],
    requireJs: ["components/ux/selectcolor/1.0/js/chroma.js?ver=vmd2.0.5.200306"],
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
    xds.Registry.register(xds["vmd.ux.IsoArea"]);
    xds.Registry.addUserType(xds["vmd.ux.IsoArea"]);

    var Data_vmd_ux_IsoArea={"BaseType":"Control","Type":"vmd_ux_IsoArea","Property":{},"Method":{"init":{"Description":"init","Prototype":"init(data,allLayers)","Args":{"_Return_":"void","Args":"data,allLayers"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_IsoArea)