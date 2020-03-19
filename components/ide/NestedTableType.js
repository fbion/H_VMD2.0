xds["vmd.ux.NestedTableType"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NestedTableType",
    category: "vmd复合组件",
    text: "NestedTableType",//中文
    naming: "hwNestedTableType",
    //dtype 设计时组件
    dtype: "vmd.ux.NestedTableType",
    //xtype 运行时组件
    xtype: "vmd.ux.NestedTableType",
    xcls: "vmd.ux.NestedTableType",
    //为了拖拽能自动生成递增id
    defaultName: "hwNestedTableType",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.NestedTableType"]);
    xds.Registry.addUserType(xds["vmd.ux.NestedTableType"]);

    var Data_vmd_ux_NestedTableType={"BaseType":"Control","Type":"vmd_ux_NestedTableType","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,sheet)","Args":{"_Return_":"void","Args":"info,sheet"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_NestedTableType)