xds["vmd.ux.LineStyle"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LineStyle",
    category: "vmd复合组件",
    text: "LineStyle",//中文
    naming: "hwLineStyle",
    //dtype 设计时组件
    dtype: "vmd.ux.LineStyle",
    //xtype 运行时组件
    xtype: "vmd.ux.LineStyle",
    xcls: "vmd.ux.LineStyle",
    //为了拖拽能自动生成递增id
    defaultName: "hwLineStyle",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
     ,{"name":"lineChagen","group":"事件","ctype":"string","editor":"ace","params":"line"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.LineStyle"]);
    xds.Registry.addUserType(xds["vmd.ux.LineStyle"]);

    var Data_vmd_ux_LineStyle={"BaseType":"Control","Type":"vmd_ux_LineStyle","Property":{},"Method":{"setOriLine":{"Description":"setOriLine","Prototype":"setOriLine(line)","Args":{"_Return_":"void","Args":"line"},"Example":""},"getLine":{"Description":"getLine","Prototype":"getLine()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"lineChagen":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_LineStyle)