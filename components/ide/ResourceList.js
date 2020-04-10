xds["vmd.ux.ResourceList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ResourceList",
    category: "vmd复合组件",
    text: "ResourceList",//中文
    naming: "hwResourceList",
    //dtype 设计时组件
    dtype: "vmd.ux.ResourceList",
    //xtype 运行时组件
    xtype: "vmd.ux.ResourceList",
    xcls: "vmd.ux.ResourceList",
    //为了拖拽能自动生成递增id
    defaultName: "hwResourceList",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"edit","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"delete","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ResourceList"]);
    xds.Registry.addUserType(xds["vmd.ux.ResourceList"]);

    var Data_vmd_ux_ResourceList={"BaseType":"Control","Type":"vmd_ux_ResourceList","Property":{},"Method":{"setAtrr":{"Description":"设置复合组件属性data.label为标题名，data.value为输入框的值","Prototype":"setAtrr(data1,data2)","Args":{"_Return_":"void","Args":"data1,data2"},"Example":"设置复合组件属性data.label为标题名，data.value为输入框的值"}},"Event":{"edit":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"编辑按钮触发事件"},"delete":{"Prototype":"","Args":{"_Return_":""},"Example":"删除按钮触发事件"}}}
	ControlsDataManage._add(Data_vmd_ux_ResourceList)