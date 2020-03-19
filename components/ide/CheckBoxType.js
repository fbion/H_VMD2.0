xds["vmd.ux.CheckBoxType"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CheckBoxType",
    category: "vmd复合组件",
    text: "CheckBoxType",//中文
    naming: "hwCheckBoxType",
    //dtype 设计时组件
    dtype: "vmd.ux.CheckBoxType",
    //xtype 运行时组件
    xtype: "vmd.ux.CheckBoxType",
    xcls: "vmd.ux.CheckBoxType",
    //为了拖拽能自动生成递增id
    defaultName: "hwCheckBoxType",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"vbox"},
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
     ,{"name":"checkboxDecimalChanged","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.CheckBoxType"]);
    xds.Registry.addUserType(xds["vmd.ux.CheckBoxType"]);

    var Data_vmd_ux_CheckBoxType={"BaseType":"Control","Type":"vmd_ux_CheckBoxType","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"checkboxDecimalChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_CheckBoxType)