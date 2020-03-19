xds["vmd.ux.NumberProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NumberProperty",
    category: "vmd复合组件",
    text: "NumberProperty",//中文
    naming: "hwNumberProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.NumberProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.NumberProperty",
    xcls: "vmd.ux.NumberProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwNumberProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["lib/ace/ace.js?ver=vmd2.0.5.191031","lib/ace/mode-base.js?ver=vmd2.0.5.191031","lib/ace/theme-xcode.js?ver=vmd2.0.5.191031","lib/ace/ext-language_tools.js?ver=vmd2.0.5.191031"],
	requireCmpType:'',
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
     ,{"name":"thePageChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.NumberProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.NumberProperty"]);

    var Data_vmd_ux_NumberProperty={"BaseType":"Control","Type":"vmd_ux_NumberProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"thePageChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_NumberProperty)