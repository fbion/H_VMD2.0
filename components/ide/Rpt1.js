xds["vmd.ux.Rpt1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Rpt1",
    category: "vmd复合组件",
    text: "Rpt1",//中文
    naming: "hwRpt1",
    //dtype 设计时组件
    dtype: "vmd.ux.Rpt1",
    //xtype 运行时组件
    xtype: "vmd.ux.Rpt1",
    xcls: "vmd.ux.Rpt1",
    //为了拖拽能自动生成递增id
    defaultName: "hwRpt1",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'report',
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Rpt1"]);
    xds.Registry.addUserType(xds["vmd.ux.Rpt1"]);

    var Data_vmd_ux_Rpt1={"BaseType":"Control","Type":"vmd_ux_Rpt1","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Rpt1)