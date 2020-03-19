xds["vmd.ux.TestProMode"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestProMode",
    category: "vmd复合组件",
    text: "TestProMode",//中文
    naming: "hwTestProMode",
    //dtype 设计时组件
    dtype: "vmd.ux.TestProMode",
    //xtype 运行时组件
    xtype: "vmd.ux.TestProMode",
    xcls: "vmd.ux.TestProMode",
    //为了拖拽能自动生成递增id
    defaultName: "hwTestProMode",
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
    xds.Registry.register(xds["vmd.ux.TestProMode"]);
    xds.Registry.addUserType(xds["vmd.ux.TestProMode"]);

    var Data_vmd_ux_TestProMode={"BaseType":"Control","Type":"vmd_ux_TestProMode","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TestProMode)