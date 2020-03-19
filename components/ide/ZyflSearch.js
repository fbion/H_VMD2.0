xds["vmd.ux.ZyflSearch"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZyflSearch",
    category: "vmd复合组件",
    text: "ZyflSearch",//中文
    naming: "hwZyflSearch",
    //dtype 设计时组件
    dtype: "vmd.ux.ZyflSearch",
    //xtype 运行时组件
    xtype: "vmd.ux.ZyflSearch",
    xcls: "vmd.ux.ZyflSearch",
    //为了拖拽能自动生成递增id
    defaultName: "hwZyflSearch",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"searchTextChange","group":"事件","ctype":"string","editor":"ace","params":"oldValue,newValue"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ZyflSearch"]);
    xds.Registry.addUserType(xds["vmd.ux.ZyflSearch"]);

    var Data_vmd_ux_ZyflSearch={"BaseType":"Control","Type":"vmd_ux_ZyflSearch","Property":{},"Method":{},"Event":{"searchTextChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"输入检索内容 回车后触发"}}}
	ControlsDataManage._add(Data_vmd_ux_ZyflSearch)