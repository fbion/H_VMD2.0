xds["vmd.ux.ContentProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ContentProperty",
    category: "vmd复合组件",
    text: "ContentProperty",//中文
    naming: "hwContentProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.ContentProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.ContentProperty",
    xcls: "vmd.ux.ContentProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwContentProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["lib/ace/ace.js?ver=vmd2.0.7.200328","lib/ace/mode-base.js?ver=vmd2.0.7.200328","lib/ace/theme-xcode.js?ver=vmd2.0.7.200328","lib/ace/ext-language_tools.js?ver=vmd2.0.7.200328"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
     ,{"name":"text","group":"设计","ctype":"string","editor":"string"},{"name":"showValue","group":"设计","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ContentProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.ContentProperty"]);

    var Data_vmd_ux_ContentProperty={"BaseType":"Control","Type":"vmd_ux_ContentProperty","Property":{"text":{"Description":"实际值","Prototype":"","Args":{"_Return_":""},"Example":"实际值","Name":""},"showValue":{"Description":"显示值","Prototype":"","Args":{"_Return_":""},"Example":"显示值","Name":""}},"Method":{"setPropertyInfo":{"Description":"setPropertyInfo","Prototype":"setPropertyInfo(paramJson,selectCell,obj)","Args":{"_Return_":"无","Args":"paramJson,selectCell,obj"},"Example":""},"setReport":{"Description":"setReport","Prototype":"setReport(type)","Args":{"_Return_":"void","Args":"type"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ContentProperty)