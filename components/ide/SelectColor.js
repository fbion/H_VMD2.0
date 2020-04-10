xds["vmd.ux.SelectColor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.SelectColor",
    category: "vmd复合组件",
    text: "SelectColor",//中文
    naming: "hwSelectColor",
    //dtype 设计时组件
    dtype: "vmd.ux.SelectColor",
    //xtype 运行时组件
    xtype: "vmd.ux.SelectColor",
    xcls: "vmd.ux.SelectColor",
    //为了拖拽能自动生成递增id
    defaultName: "hwSelectColor",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/selectcolor/1.0/css/hwcharts.css"],
    requireJs: ["components/ux/selectcolor/1.0/js/chroma.js"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"ColorColumnWidth":200,"ColorCodeWidth":58,"ColorColumnLeft":20,"layout":"border"},
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
     ,{"name":"ColorColumnWidth","group":"设计","ctype":"number","editor":"number"},{"name":"ColorCodeWidth","group":"设计","ctype":"number","editor":"number"},{"name":"ColorColumnLeft","group":"设计","ctype":"number","editor":"number"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"data"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.SelectColor"]);
    xds.Registry.addUserType(xds["vmd.ux.SelectColor"]);

    var Data_vmd_ux_SelectColor={"BaseType":"Control","Type":"vmd_ux_SelectColor","Property":{"ColorColumnWidth":{"Description":"色柱宽度","Prototype":"","Args":{"_Return_":""},"Example":"色柱宽度","Name":"色柱宽度"},"ColorCodeWidth":{"Description":"色标颜色宽度","Prototype":"","Args":{"_Return_":""},"Example":"色标颜色宽度","Name":"色标颜色宽度"},"ColorColumnLeft":{"Description":"色柱左间距","Prototype":"","Args":{"_Return_":""},"Example":"色柱左间距","Name":"色柱左间距"}},"Method":{"getColorValue":{"Description":"获取颜色列表数组","Prototype":"getColorValue()","Args":{"_Return_":"void","Args":""},"Example":"获取颜色列表数组"},"getPercentageValue":{"Description":"//获取颜色百分比数组信息","Prototype":"getPercentageValue()","Args":{"_Return_":"void","Args":""},"Example":"//获取颜色百分比数组信息"},"getColorList":{"Description":"getColorList","Prototype":"getColorList()","Args":{"_Return_":"void","Args":""},"Example":""},"setColorValue":{"Description":"setColorValue","Prototype":"setColorValue(colorlist)","Args":{"_Return_":"void","Args":"colorlist"},"Example":""},"setPercentageValue":{"Description":"setPercentageValue","Prototype":"setPercentageValue(percentagelist)","Args":{"_Return_":"void","Args":"percentagelist"},"Example":""},"setColorPercentageValue":{"Description":"setColorPercentageValue","Prototype":"setColorPercentageValue(colorlist,percentagelist)","Args":{"_Return_":"void","Args":"colorlist,percentagelist"},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(data)","Args":{"_Return_":"void","Args":"data"},"Example":""}},"Event":{"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_SelectColor)