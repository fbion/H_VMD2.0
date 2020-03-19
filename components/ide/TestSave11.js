xds["vmd.ux.TestSave11"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestSave11",
    category: "vmd复合组件",
    text: "TestSave11",//中文
    naming: "hwTestSave11",
    //dtype 设计时组件
    dtype: "vmd.ux.TestSave11",
    //xtype 运行时组件
    xtype: "vmd.ux.TestSave11",
    xcls: "vmd.ux.TestSave11",
    //为了拖拽能自动生成递增id
    defaultName: "hwTestSave11",
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
    xds.Registry.register(xds["vmd.ux.TestSave11"]);
    xds.Registry.addUserType(xds["vmd.ux.TestSave11"]);

    var Data_vmd_ux_TestSave11={"BaseType":"Control","Type":"vmd_ux_TestSave11","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TestSave11)