xds["vmd.ux.AccordionTabs"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AccordionTabs",
    category: "vmd复合组件",
    text: "AccordionTabs",//中文
    naming: "hwAccordionTabs",
    //dtype 设计时组件
    dtype: "vmd.ux.AccordionTabs",
    //xtype 运行时组件
    xtype: "vmd.ux.AccordionTabs",
    xcls: "vmd.ux.AccordionTabs",
    //为了拖拽能自动生成递增id
    defaultName: "hwAccordionTabs",
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
     ,{"name":"delIndex","group":"事件","ctype":"string","editor":"ace","params":"indexId"},{"name":"nameChang","group":"事件","ctype":"string","editor":"ace","params":"index,value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.AccordionTabs"]);
    xds.Registry.addUserType(xds["vmd.ux.AccordionTabs"]);

    var Data_vmd_ux_AccordionTabs={"BaseType":"Control","Type":"vmd_ux_AccordionTabs","Property":{},"Method":{"initTabs":{"Description":"初始化tab页","Prototype":"initTabs(source,data)","Args":{"_Return_":"void","Args":"source,data"},"Example":"初始化tab页"}},"Event":{"delIndex":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"nameChang":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_AccordionTabs)