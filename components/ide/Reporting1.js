xds["vmd.ux.Reporting1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Reporting1",
    category: "vmd复合组件",
    text: "Reporting1",//中文
    naming:"reporting1",
    //dtype 设计时组件
    dtype: "vmd.ux.Reporting1",
    //xtype 运行时组件
    xtype: "vmd.ux.Reporting1",
    xcls: "vmd.ux.Reporting1",
    //为了拖拽能自动生成递增id
    defaultName:"reporting1",
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
    xds.Registry.register(xds["vmd.ux.Reporting1"]);
    xds.Registry.addUserType(xds["vmd.ux.Reporting1"]);

    var Data_vmd_ux_Reporting1={"BaseType":"Control","Type":"vmd_ux_Reporting1","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(sheet)","Args":{"_Return_":"void","Args":"sheet"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Reporting1)