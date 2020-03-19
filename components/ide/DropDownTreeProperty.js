xds["vmd.ux.DropDownTreeProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DropDownTreeProperty",
    category: "vmd复合组件",
    text: "DropDownTreeProperty",//中文
    naming: "hwDropDownTreeProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.DropDownTreeProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.DropDownTreeProperty",
    xcls: "vmd.ux.DropDownTreeProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwDropDownTreeProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["lib/ace/ace.js","lib/ace/mode-base.js","lib/ace/theme-xcode.js","lib/ace/ext-language_tools.js"],
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
     ,{"name":"DropDownTreeWidthChange","group":"事件","ctype":"string","editor":"ace","params":"value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DropDownTreeProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.DropDownTreeProperty"]);

    var Data_vmd_ux_DropDownTreeProperty={"BaseType":"Control","Type":"vmd_ux_DropDownTreeProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"DropDownTreeWidthChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DropDownTreeProperty)