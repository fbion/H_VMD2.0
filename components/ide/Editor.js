xds["vmd.ux.Editor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Editor",
    category: "vmd复合组件",
    text: "Editor",//中文
    naming: "Editor",
    //dtype 设计时组件
    dtype: "vmd.ux.Editor",
    //xtype 运行时组件
    xtype: "vmd.ux.Editor",
    xcls: "vmd.ux.Editor",
    //为了拖拽能自动生成递增id
    defaultName: "Editor",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"vbox"},
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
     ,{"name":"fonSize","group":"设计","ctype":"string"},{"name":"TitleFontFamily","group":"设计","ctype":"string"},{"name":"TitleFontColor","group":"设计","ctype":"string"},{"name":"TitleFontWeight","group":"设计","ctype":"string"},{"name":"loadText","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"center","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Editor"]);
    xds.Registry.addUserType(xds["vmd.ux.Editor"]);

    var Data_vmd_ux_Editor={"BaseType":"Control","Type":"vmd_ux_Editor","Property":{"fonSize":{"Description":"标题字号","Prototype":"","Args":{"_Return_":""},"Example":"标题字号"},"TitleFontFamily":{"Description":"标题字体","Prototype":"","Args":{"_Return_":""},"Example":"标题字体"},"TitleFontColor":{"Description":"标题颜色","Prototype":"","Args":{"_Return_":""},"Example":"标题颜色"},"TitleFontWeight":{"Description":"标题加粗","Prototype":"","Args":{"_Return_":""},"Example":"标题加粗"}},"Method":{"getEditorData":{"Description":"获取编辑器数据","Prototype":"getEditorData()","Args":{"_Return_":"字符串","Args":""},"Example":"获取编辑器数据"},"setEditor":{"Description":"setEditor","Prototype":"setEditor(param,param1)","Args":{"_Return_":"void","Args":"param,param1"},"Example":""}},"Event":{"loadText":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Editor)