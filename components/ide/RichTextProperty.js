xds["vmd.ux.RichTextProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.RichTextProperty",
    category: "vmd复合组件",
    text: "RichTextProperty",//中文
    naming: "hwRichTextProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.RichTextProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.RichTextProperty",
    xcls: "vmd.ux.RichTextProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwRichTextProperty",
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
     ,{"name":"RTPChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.RichTextProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.RichTextProperty"]);

    var Data_vmd_ux_RichTextProperty={"BaseType":"Control","Type":"vmd_ux_RichTextProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"RTPChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_RichTextProperty)