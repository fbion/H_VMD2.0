xds["vmd.ux.NewNumber"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NewNumber",
    category: "vmd复合组件",
    text: "NewNumber",//中文
    naming: "hwNewNumber",
    //dtype 设计时组件
    dtype: "vmd.ux.NewNumber",
    //xtype 运行时组件
    xtype: "vmd.ux.NewNumber",
    xcls: "vmd.ux.NewNumber",
    //为了拖拽能自动生成递增id
    defaultName: "hwNewNumber",
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
     ,{"name":"decimalChanged","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.NewNumber"]);
    xds.Registry.addUserType(xds["vmd.ux.NewNumber"]);

    var Data_vmd_ux_NewNumber={"BaseType":"Control","Type":"vmd_ux_NewNumber","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,sheet,cell)","Args":{"_Return_":"void","Args":"info,sheet,cell"},"Example":""}},"Event":{"decimalChanged":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_NewNumber)