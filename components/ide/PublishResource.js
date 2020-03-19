xds["vmd.ux.PublishResource"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.PublishResource",
    category: "vmd复合组件",
    text: "PublishResource",//中文
    naming: "hwPublishResource",
    //dtype 设计时组件
    dtype: "vmd.ux.PublishResource",
    //xtype 运行时组件
    xtype: "vmd.ux.PublishResource",
    xcls: "vmd.ux.PublishResource",
    //为了拖拽能自动生成递增id
    defaultName: "hwPublishResource",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"column"},
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.PublishResource"]);
    xds.Registry.addUserType(xds["vmd.ux.PublishResource"]);

    var Data_vmd_ux_PublishResource={"BaseType":"Control","Type":"vmd_ux_PublishResource","Property":{},"Method":{"setText":{"Description":"setText","Prototype":"setText(oldIP,newIP,servername)","Args":{"_Return_":"void","Args":"oldIP,newIP,servername"},"Example":""},"getText":{"Description":"getText","Prototype":"getText()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_PublishResource)