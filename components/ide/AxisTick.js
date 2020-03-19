xds["vmd.ux.AxisTick"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AxisTick",
    category: "vmd复合组件",
    text: "AxisTick",//中文
    naming: "hwAxisTick",
    //dtype 设计时组件
    dtype: "vmd.ux.AxisTick",
    //xtype 运行时组件
    xtype: "vmd.ux.AxisTick",
    xcls: "vmd.ux.AxisTick",
    //为了拖拽能自动生成递增id
    defaultName: "hwAxisTick",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"tickLenghtChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"tickColorsChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"gridLineWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"gridLineDashStyleChange","group":"事件","ctype":"string","editor":"ace","params":"line"},{"name":"gridLineColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"minorTickWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"minorTickLenghtChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"minorTickColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"minorGridLineWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"minorGridLineDashStyleChange","group":"事件","ctype":"string","editor":"ace","params":"line"},{"name":"minorGridLineColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"tickWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"tickIntervalChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"tickAmountChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"tickPixelIntervalChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.AxisTick"]);
    xds.Registry.addUserType(xds["vmd.ux.AxisTick"]);

    var Data_vmd_ux_AxisTick={"BaseType":"Control","Type":"vmd_ux_AxisTick","Property":{},"Method":{},"Event":{"tickLenghtChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"tickColorsChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"gridLineWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"gridLineDashStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"gridLineColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minorTickWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minorTickLenghtChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minorTickColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minorGridLineWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minorGridLineDashStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minorGridLineColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"tickWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"tickIntervalChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"tickAmountChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"tickPixelIntervalChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_AxisTick)