xds["vmd.ux.Dd2"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Dd2",
    category: "vmd复合组件",
    text: "Dd2",//中文
    naming: "hwDd2",
    //dtype 设计时组件
    dtype: "vmd.ux.Dd2",
    //xtype 运行时组件
    xtype: "vmd.ux.Dd2",
    xcls: "vmd.ux.Dd2",
    //为了拖拽能自动生成递增id
    defaultName: "hwDd2",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datacs/1.0/css/iconfont.css"],
    requireJs: [],
	requireCmpType:'report',
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"qwe","group":"设计","ctype":"number"},{"name":"ert","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Dd2"]);
    xds.Registry.addUserType(xds["vmd.ux.Dd2"]);

    var Data_vmd_ux_Dd2={"BaseType":"Control","Type":"vmd_ux_Dd2","Property":{"qwe":{"Description":"qwe","Prototype":"","Args":{"_Return_":""},"Example":""},"ert":{"Description":"ert","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Dd2)