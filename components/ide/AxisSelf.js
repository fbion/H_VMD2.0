xds["vmd.ux.AxisSelf"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AxisSelf",
    category: "vmd复合组件",
    text: "AxisSelf",//中文
    naming: "hwAxisSelf",
    //dtype 设计时组件
    dtype: "vmd.ux.AxisSelf",
    //xtype 运行时组件
    xtype: "vmd.ux.AxisSelf",
    xcls: "vmd.ux.AxisSelf",
    //为了拖拽能自动生成递增id
    defaultName: "hwAxisSelf",
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
     ,{"name":"axisLineWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisHeightChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisLineColorsChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"axisTopChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisFloorChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisCeilingChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisOffsetChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"minPaddingChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"crosshairColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"crosshairWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"crosshairLineChange","group":"事件","ctype":"string","editor":"ace","params":"line"},{"name":"axisMinChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisMaxChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"axisDirectionChange","group":"事件","ctype":"string","editor":"ace","params":"direction"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.AxisSelf"]);
    xds.Registry.addUserType(xds["vmd.ux.AxisSelf"]);

    var Data_vmd_ux_AxisSelf={"BaseType":"Control","Type":"vmd_ux_AxisSelf","Property":{},"Method":{},"Event":{"axisLineWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisHeightChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisLineColorsChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisTopChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisFloorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisCeilingChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisOffsetChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minPaddingChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"crosshairColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"crosshairWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"crosshairLineChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisMinChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisMaxChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"axisDirectionChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_AxisSelf)