xds["vmd.ux.LayoutPanel"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LayoutPanel",
    category: "vmd复合组件",
    text: "LayoutPanel",//中文
    naming: "hwLayoutPanel",
    //dtype 设计时组件
    dtype: "vmd.ux.LayoutPanel",
    //xtype 运行时组件
    xtype: "vmd.ux.LayoutPanel",
    xcls: "vmd.ux.LayoutPanel",
    //为了拖拽能自动生成递增id
    defaultName: "hwLayoutPanel",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"settingChangedEvent","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"layoutItemVisibleChanged","group":"事件","ctype":"string","editor":"ace","params":"configs"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.LayoutPanel"]);
    xds.Registry.addUserType(xds["vmd.ux.LayoutPanel"]);

    var Data_vmd_ux_LayoutPanel={"BaseType":"Control","Type":"vmd_ux_LayoutPanel","Property":{},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(configs)","Args":{"_Return_":"void","Args":"configs"},"Example":""},"serialize":{"Description":"serialize","Prototype":"serialize()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"settingChangedEvent":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"配置参数改变事件"},"layoutItemVisibleChanged":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"布局子项改变可视状态事件"}}}
	ControlsDataManage._add(Data_vmd_ux_LayoutPanel)