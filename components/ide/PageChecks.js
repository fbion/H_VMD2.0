xds["vmd.ux.PageChecks"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.PageChecks",
    category: "vmd复合组件",
    text: "PageChecks",//中文
    naming: "hwPageChecks",
    //dtype 设计时组件
    dtype: "vmd.ux.PageChecks",
    //xtype 运行时组件
    xtype: "vmd.ux.PageChecks",
    xcls: "vmd.ux.PageChecks",
    //为了拖拽能自动生成递增id
    defaultName: "hwPageChecks",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.PageChecks"]);
    xds.Registry.addUserType(xds["vmd.ux.PageChecks"]);

    var Data_vmd_ux_PageChecks={"BaseType":"Control","Type":"vmd_ux_PageChecks","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_PageChecks)