xds["vmd.ux.Number"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Number",
    category: "vmd复合组件",
    text: "Number",//中文
    naming: "hwNumber",
    //dtype 设计时组件
    dtype: "vmd.ux.Number",
    //xtype 运行时组件
    xtype: "vmd.ux.Number",
    xcls: "vmd.ux.Number",
    //为了拖拽能自动生成递增id
    defaultName: "hwNumber",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"szDecimalChanged","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Number"]);
    xds.Registry.addUserType(xds["vmd.ux.Number"]);

    var Data_vmd_ux_Number={"BaseType":"Control","Type":"vmd_ux_Number","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setOriValue":{"Description":"setOriValue","Prototype":"setOriValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":""}},"Event":{"szDecimalChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Number)