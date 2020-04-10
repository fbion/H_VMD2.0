xds["vmd.ux.TestCom"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestCom",
    category: "vmd复合组件",
    text: "TestCom",//中文
    naming: "hwTestCom",
    //dtype 设计时组件
    dtype: "vmd.ux.TestCom",
    //xtype 运行时组件
    xtype: "vmd.ux.TestCom",
    xcls: "vmd.ux.TestCom",
    //为了拖拽能自动生成递增id
    defaultName: "hwTestCom",
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
    xds.Registry.register(xds["vmd.ux.TestCom"]);
    xds.Registry.addUserType(xds["vmd.ux.TestCom"]);

    var Data_vmd_ux_TestCom={"BaseType":"Control","Type":"vmd_ux_TestCom","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TestCom)