xds["vmd.ux.DropDownGridProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DropDownGridProperty",
    category: "vmd复合组件",
    text: "DropDownGridProperty",//中文
    naming: "hwDropDownGridProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.DropDownGridProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.DropDownGridProperty",
    xcls: "vmd.ux.DropDownGridProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwDropDownGridProperty",
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
     ,{"name":"putData","group":"事件","ctype":"string","editor":"ace","params":"id,value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DropDownGridProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.DropDownGridProperty"]);

    var Data_vmd_ux_DropDownGridProperty={"BaseType":"Control","Type":"vmd_ux_DropDownGridProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"putData":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DropDownGridProperty)