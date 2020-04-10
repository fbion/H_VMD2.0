xds["vmd.ux.LayoutComponent"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LayoutComponent",
    category: "vmd复合组件",
    text: "LayoutComponent",//中文
    naming: "hwLayoutComponent",
    //dtype 设计时组件
    dtype: "vmd.ux.LayoutComponent",
    //xtype 运行时组件
    xtype: "vmd.ux.LayoutComponent",
    xcls: "vmd.ux.LayoutComponent",
    //为了拖拽能自动生成递增id
    defaultName: "hwLayoutComponent",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/layoutcomponent/1.0/css/vmdBase.css"],
    requireJs: ["components/ux/layoutcomponent/1.0/js/url.js"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     ,{"name":"Loaded","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"czClick","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.LayoutComponent"]);
    xds.Registry.addUserType(xds["vmd.ux.LayoutComponent"]);

    var Data_vmd_ux_LayoutComponent={"BaseType":"Control","Type":"vmd_ux_LayoutComponent","Property":{},"Method":{},"Event":{"Loaded":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"数据加载完成后触发"},"czClick":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_LayoutComponent)