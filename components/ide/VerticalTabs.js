xds["vmd.ux.VerticalTabs"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.VerticalTabs",
    category: "vmd复合组件",
    text: "VerticalTabs",//中文
    naming: "hwVerticalTabs",
    //dtype 设计时组件
    dtype: "vmd.ux.VerticalTabs",
    //xtype 运行时组件
    xtype: "vmd.ux.VerticalTabs",
    xcls: "vmd.ux.VerticalTabs",
    //为了拖拽能自动生成递增id
    defaultName: "hwVerticalTabs",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
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
     ,{"name":"isadd","group":"设计","ctype":"boolean"},{"name":"addClick","group":"事件","ctype":"string","editor":"ace","params":"panel,e"},{"name":"delSeries","group":"事件","ctype":"string","editor":"ace","params":"seriesId"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.VerticalTabs"]);
    xds.Registry.addUserType(xds["vmd.ux.VerticalTabs"]);

    var Data_vmd_ux_VerticalTabs={"BaseType":"Control","Type":"vmd_ux_VerticalTabs","Property":{"isadd":{"Description":"是否新按钮","Prototype":"","Args":{"_Return_":""},"Example":"是否新增","Name":"是否新按钮"}},"Method":{"initTabs":{"Description":"初始化tab页","Prototype":"initTabs(data,isActive)","Args":{"_Return_":"void","Args":"data,isActive"},"Example":"初始化tab页"},"getActive":{"Description":"getActive","Prototype":"getActive()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"addClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"delSeries":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_VerticalTabs)