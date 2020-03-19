xds["vmd.ux.Testdemo2"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Testdemo2",
    category: "vmd复合组件",
    text: "Testdemo2",//中文
    naming: "hwTestdemo2",
    //dtype 设计时组件
    dtype: "vmd.ux.Testdemo2",
    //xtype 运行时组件
    xtype: "vmd.ux.Testdemo2",
    xcls: "vmd.ux.Testdemo2",
    //为了拖拽能自动生成递增id
    defaultName: "hwTestdemo2",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/vmd_publicresource/datepicker/css/datepicker.css"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    isPropPanel:true,
	bindCmp:'TestProMode',
	nodeclick:function () {
		 this.activeSettings('TestProMode', 'aaa', '240', '1.0');
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
     ,{"name":"store1","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"displayvalue","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store1"}},{"name":"displaytext","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store1"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Testdemo2"]);
    xds.Registry.addUserType(xds["vmd.ux.Testdemo2"]);

    var Data_vmd_ux_Testdemo2={"BaseType":"Control","Type":"vmd_ux_Testdemo2","Property":{"store1":{"Description":"store1","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"displayvalue":{"Description":"displayvalue","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"displaytext":{"Description":"displaytext","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Testdemo2)