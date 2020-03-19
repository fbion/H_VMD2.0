xds["vmd.ux.ContentFrame"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ContentFrame",
    category: "vmd复合组件",
    text: "ContentFrame",//中文
    naming: "hwContentFrame",
    //dtype 设计时组件
    dtype: "vmd.ux.ContentFrame",
    //xtype 运行时组件
    xtype: "vmd.ux.ContentFrame",
    xcls: "vmd.ux.ContentFrame",
    //为了拖拽能自动生成递增id
    defaultName: "hwContentFrame",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/gridtype/1.0/css/icons.css?ver=vmd2.0.5.200306"],
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ContentFrame"]);
    xds.Registry.addUserType(xds["vmd.ux.ContentFrame"]);

    var Data_vmd_ux_ContentFrame={"BaseType":"Control","Type":"vmd_ux_ContentFrame","Property":{},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue()","Args":{"_Return_":"void","Args":""},"Example":""},"serialize":{"Description":"serialize","Prototype":"serialize()","Args":{"_Return_":"void","Args":""},"Example":""},"save":{"Description":"save","Prototype":"save(activeCmp)","Args":{"_Return_":"void","Args":"activeCmp"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ContentFrame)