xds["vmd.ux.MicroservicesList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.MicroservicesList",
    category: "vmd复合组件",
    text: "MicroservicesList",//中文
    naming: "hwMicroservicesList",
    //dtype 设计时组件
    dtype: "vmd.ux.MicroservicesList",
    //xtype 运行时组件
    xtype: "vmd.ux.MicroservicesList",
    xcls: "vmd.ux.MicroservicesList",
    //为了拖拽能自动生成递增id
    defaultName: "hwMicroservicesList",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     ,{"name":"removeRelation","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.MicroservicesList"]);
    xds.Registry.addUserType(xds["vmd.ux.MicroservicesList"]);

    var Data_vmd_ux_MicroservicesList={"BaseType":"Control","Type":"vmd_ux_MicroservicesList","Property":{},"Method":{"setAttr":{"Description":"设置提示文字、控制组件删除按钮是否展示","Prototype":"setAttr(value,display,select,title)","Args":{"_Return_":"void","Args":"value,display,select,title"},"Example":"设置提示文字、控制组件删除按钮是否展示"},"getComlistValue":{"Description":"获取下拉框的取值","Prototype":"getComlistValue()","Args":{"_Return_":"void","Args":""},"Example":"获取下拉框的取值"}},"Event":{"removeRelation":{"Prototype":"","Args":{"_Return_":""},"Example":"移除组件触发事件"}}}
	ControlsDataManage._add(Data_vmd_ux_MicroservicesList)