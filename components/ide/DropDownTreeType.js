xds["vmd.ux.DropDownTreeType"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DropDownTreeType",
    category: "vmd复合组件",
    text: "DropDownTreeType",//中文
    naming: "hwDropDownTreeType",
    //dtype 设计时组件
    dtype: "vmd.ux.DropDownTreeType",
    //xtype 运行时组件
    xtype: "vmd.ux.DropDownTreeType",
    xcls: "vmd.ux.DropDownTreeType",
    //为了拖拽能自动生成递增id
    defaultName: "hwDropDownTreeType",
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
     ,{"name":"decimalChanged","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DropDownTreeType"]);
    xds.Registry.addUserType(xds["vmd.ux.DropDownTreeType"]);

    var Data_vmd_ux_DropDownTreeType={"BaseType":"Control","Type":"vmd_ux_DropDownTreeType","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"decimalChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DropDownTreeType)