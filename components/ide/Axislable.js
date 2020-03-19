xds["vmd.ux.Axislable"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Axislable",
    category: "vmd复合组件",
    text: "Axislable",//中文
    naming: "hwAxislable",
    //dtype 设计时组件
    dtype: "vmd.ux.Axislable",
    //xtype 运行时组件
    xtype: "vmd.ux.Axislable",
    xcls: "vmd.ux.Axislable",
    //为了拖拽能自动生成递增id
    defaultName: "hwAxislable",
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
     ,{"name":"lableXChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"labelStaggerLinesChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"lableAlignChange","group":"事件","ctype":"string","editor":"ace","params":"align"},{"name":"lableYChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"fontFamityChange","group":"事件","ctype":"string","editor":"ace","params":"famity"},{"name":"fontSizeChange","group":"事件","ctype":"string","editor":"ace","params":"size"},{"name":"fontStyleChange","group":"事件","ctype":"string","editor":"ace","params":"style"},{"name":"fontColorChange","group":"事件","ctype":"string","editor":"ace","params":"color"},{"name":"labelRotationChange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"lableStepChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Axislable"]);
    xds.Registry.addUserType(xds["vmd.ux.Axislable"]);

    var Data_vmd_ux_Axislable={"BaseType":"Control","Type":"vmd_ux_Axislable","Property":{},"Method":{},"Event":{"lableXChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"labelStaggerLinesChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lableAlignChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lableYChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontFamityChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontSizeChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"labelRotationChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lableStepChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Axislable)