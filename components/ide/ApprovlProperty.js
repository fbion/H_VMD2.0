xds["vmd.ux.ApprovlProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ApprovlProperty",
    category: "vmd复合组件",
    text: "ApprovlProperty",//中文
    naming: "hwApprovlProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.ApprovlProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.ApprovlProperty",
    xcls: "vmd.ux.ApprovlProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwApprovlProperty",
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
     ,{"name":"APchange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ApprovlProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.ApprovlProperty"]);

    var Data_vmd_ux_ApprovlProperty={"BaseType":"Control","Type":"vmd_ux_ApprovlProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"APchange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ApprovlProperty)