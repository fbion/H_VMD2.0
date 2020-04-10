xds["vmd.ux.TEST_Text"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TEST_Text",
    category: "vmd复合组件",
    text: "TEST_Text",//中文
    naming: "hwTEST_Text",
    //dtype 设计时组件
    dtype: "vmd.ux.TEST_Text",
    //xtype 运行时组件
    xtype: "vmd.ux.TEST_Text",
    xcls: "vmd.ux.TEST_Text",
    //为了拖拽能自动生成递增id
    defaultName: "hwTEST_Text",
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
    isPropPanel:true,
	bindCmp:'TestCom',
	nodeclick:function () {
		 this.activeSettings('TestCom', '属性设置', '240', '1.0');
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
    xds.Registry.register(xds["vmd.ux.TEST_Text"]);
    xds.Registry.addUserType(xds["vmd.ux.TEST_Text"]);

    var Data_vmd_ux_TEST_Text={"BaseType":"Control","Type":"vmd_ux_TEST_Text","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TEST_Text)