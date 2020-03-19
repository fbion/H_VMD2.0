xds["vmd.ux.RadioButtonProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.RadioButtonProperty",
    category: "vmd复合组件",
    text: "RadioButtonProperty",//中文
    naming: "hwRadioButtonProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.RadioButtonProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.RadioButtonProperty",
    xcls: "vmd.ux.RadioButtonProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwRadioButtonProperty",
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
     ,{"name":"RBPchange","group":"事件","ctype":"string","editor":"ace","params":"value"},{"name":"putData","group":"事件","ctype":"string","editor":"ace","params":"id,value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.RadioButtonProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.RadioButtonProperty"]);

    var Data_vmd_ux_RadioButtonProperty={"BaseType":"Control","Type":"vmd_ux_RadioButtonProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"RBPchange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"putData":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_RadioButtonProperty)