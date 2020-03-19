xds["vmd.ux.RadioButtonType"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.RadioButtonType",
    category: "vmd复合组件",
    text: "RadioButtonType",//中文
    naming: "hwRadioButtonType",
    //dtype 设计时组件
    dtype: "vmd.ux.RadioButtonType",
    //xtype 运行时组件
    xtype: "vmd.ux.RadioButtonType",
    xcls: "vmd.ux.RadioButtonType",
    //为了拖拽能自动生成递增id
    defaultName: "hwRadioButtonType",
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
     ,{"name":"rbDecimalChanged","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.RadioButtonType"]);
    xds.Registry.addUserType(xds["vmd.ux.RadioButtonType"]);

    var Data_vmd_ux_RadioButtonType={"BaseType":"Control","Type":"vmd_ux_RadioButtonType","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"rbDecimalChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_RadioButtonType)