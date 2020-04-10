xds["vmd.ux.BaseProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.BaseProperty",
    category: "vmd复合组件",
    text: "BaseProperty",//中文
    naming: "hwBaseProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.BaseProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.BaseProperty",
    xcls: "vmd.ux.BaseProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwBaseProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/toptitle/1.0/css/iconfont.css?ver=vmd2.0.7.200328"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
    xds.Registry.register(xds["vmd.ux.BaseProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.BaseProperty"]);

    var Data_vmd_ux_BaseProperty={"BaseType":"Control","Type":"vmd_ux_BaseProperty","Property":{},"Method":{"iSetGraphNameInfo":{"Description":"设置图名属性","Prototype":"iSetGraphNameInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":"设置图名属性"},"iGetGraphNameInfo":{"Description":"获取图名信息","Prototype":"iGetGraphNameInfo()","Args":{"_Return_":"void","Args":""},"Example":"获取图名信息"},"iGetLegendInfo":{"Description":"获取图例信息","Prototype":"iGetLegendInfo()","Args":{"_Return_":"void","Args":""},"Example":"获取图例信息"},"iGetMapInfoShow":{"Description":"获取编图信息是否显示","Prototype":"iGetMapInfoShow()","Args":{"_Return_":"void","Args":""},"Example":"获取编图信息是否显示"},"iGetFrameInfo":{"Description":"获取图框信息","Prototype":"iGetFrameInfo()","Args":{"_Return_":"void","Args":""},"Example":"获取图框信息"},"iGetScaleInfo":{"Description":"获取比例尺信息","Prototype":"iGetScaleInfo()","Args":{"_Return_":"void","Args":""},"Example":"获取比例尺信息"},"iGetCompassInfo":{"Description":"获取指北针信息","Prototype":"iGetCompassInfo()","Args":{"_Return_":"void","Args":""},"Example":"获取指北针信息"},"iSetLegendInfo":{"Description":"设置图例信息","Prototype":"iSetLegendInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":"设置图例信息"},"iSetMapInfo":{"Description":"设置编图信息","Prototype":"iSetMapInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":"设置编图信息"},"iSetFrameInfo":{"Description":"设置图例信息","Prototype":"iSetFrameInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":"设置图例信息"},"iSetScaleInfo":{"Description":"设置比例尺信息","Prototype":"iSetScaleInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":"设置比例尺信息"},"iSetCompassInfo":{"Description":"设置指北针信息","Prototype":"iSetCompassInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":"设置指北针信息"},"iSetBaseProperty":{"Description":"设置基本属性信息","Prototype":"iSetBaseProperty(paraProp)","Args":{"_Return_":"void","Args":"paraProp"},"Example":"设置基本属性信息"},"iGetBaseProperty":{"Description":"返回基本属性信息","Prototype":"iGetBaseProperty()","Args":{"_Return_":"void","Args":""},"Example":"返回基本属性信息"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_BaseProperty)