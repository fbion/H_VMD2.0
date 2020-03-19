xds["vmd.ux.Testsx"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Testsx",
    category: "vmd复合组件",
    text: "Testsx",//中文
    naming: "hwTestsx",
    //dtype 设计时组件
    dtype: "vmd.ux.Testsx",
    //xtype 运行时组件
    xtype: "vmd.ux.Testsx",
    xcls: "vmd.ux.Testsx",
    //为了拖拽能自动生成递增id
    defaultName: "hwTestsx",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/testdemo/1.0/file/datainput.css?ver=vmd2.0.6.200119"],
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
    xds.Registry.register(xds["vmd.ux.Testsx"]);
    xds.Registry.addUserType(xds["vmd.ux.Testsx"]);

    var Data_vmd_ux_Testsx={"BaseType":"Control","Type":"vmd_ux_Testsx","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Testsx)