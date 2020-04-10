xds["vmd.ux.ButtonGroup"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ButtonGroup",
    category: "vmd复合组件",
    text: "ButtonGroup",//中文
    naming: "hwButtonGroup",
    //dtype 设计时组件
    dtype: "vmd.ux.ButtonGroup",
    //xtype 运行时组件
    xtype: "vmd.ux.ButtonGroup",
    xcls: "vmd.ux.ButtonGroup",
    //为了拖拽能自动生成递增id
    defaultName: "hwButtonGroup",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"anchor"},
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
     ,{"name":"count","group":"设计","ctype":"string"},{"name":"text","group":"设计","ctype":"string"},{"name":"selectIndex","group":"设计","ctype":"string"},{"name":"click","group":"事件","ctype":"string","editor":"ace","params":"selectedIndex"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ButtonGroup"]);
    xds.Registry.addUserType(xds["vmd.ux.ButtonGroup"]);

    var Data_vmd_ux_ButtonGroup={"BaseType":"Control","Type":"vmd_ux_ButtonGroup","Property":{"count":{"Description":"count","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"text":{"Description":"text","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"selectIndex":{"Description":"selectIndex","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"getSelectIndex":{"Description":"getSelectIndex","Prototype":"getSelectIndex()","Args":{"_Return_":"数字","Args":""},"Example":""},"setSelectIndex":{"Description":"setSelectIndex","Prototype":"setSelectIndex(index)","Args":{"_Return_":"void","Args":"index"},"Example":""}},"Event":{"click":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ButtonGroup)