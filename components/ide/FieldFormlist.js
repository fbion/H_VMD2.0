xds["vmd.ux.FieldFormlist"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FieldFormlist",
    category: "vmd复合组件",
    text: "FieldFormlist",//中文
    naming: "hwFieldFormlist",
    //dtype 设计时组件
    dtype: "vmd.ux.FieldFormlist",
    //xtype 运行时组件
    xtype: "vmd.ux.FieldFormlist",
    xcls: "vmd.ux.FieldFormlist",
    //为了拖拽能自动生成递增id
    defaultName: "hwFieldFormlist",
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
     ,{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"feilds"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FieldFormlist"]);
    xds.Registry.addUserType(xds["vmd.ux.FieldFormlist"]);

    var Data_vmd_ux_FieldFormlist={"BaseType":"Control","Type":"vmd_ux_FieldFormlist","Property":{},"Method":{"bindData":{"Description":"bindData","Prototype":"bindData(data)","Args":{"_Return_":"void","Args":"data"},"Example":""},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(data)","Args":{"_Return_":"void","Args":"data"},"Example":""}},"Event":{"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FieldFormlist)