xds["vmd.ux.GraphProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.GraphProperty",
    category: "vmd复合组件",
    text: "GraphProperty",//中文
    naming: "hwGraphProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.GraphProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.GraphProperty",
    xcls: "vmd.ux.GraphProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwGraphProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/toptitle/1.0/css/iconfont.css?ver=vmd2.0.5.200306&ver=vmd2.0.7.200328"],
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
    xds.Registry.register(xds["vmd.ux.GraphProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.GraphProperty"]);

    var Data_vmd_ux_GraphProperty={"BaseType":"Control","Type":"vmd_ux_GraphProperty","Property":{},"Method":{"init":{"Description":"属性面板的初始化方法","Prototype":"init(chart)","Args":{"_Return_":"void","Args":"chart"},"Example":"属性面板的初始化方法"},"setMyCharts":{"Description":"setMyCharts","Prototype":"setMyCharts(chart)","Args":{"_Return_":"void","Args":"chart"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_GraphProperty)