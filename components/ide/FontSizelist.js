xds["vmd.ux.FontSizelist"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontSizelist",
    category: "vmd复合组件",
    text: "FontSizelist",//中文
    naming: "hwFontSizelist",
    //dtype 设计时组件
    dtype: "vmd.ux.FontSizelist",
    //xtype 运行时组件
    xtype: "vmd.ux.FontSizelist",
    xcls: "vmd.ux.FontSizelist",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontSizelist",
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
     ,{"name":"border","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"fontChagen","group":"事件","ctype":"string","editor":"ace","params":"font"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontSizelist"]);
    xds.Registry.addUserType(xds["vmd.ux.FontSizelist"]);

    var Data_vmd_ux_FontSizelist={"BaseType":"Control","Type":"vmd_ux_FontSizelist","Property":{"border":{"Description":"border","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"setOriFont":{"Description":"setOriFont","Prototype":"setOriFont(font)","Args":{"_Return_":"void","Args":"font"},"Example":""},"getFont":{"Description":"getFont","Prototype":"getFont()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"fontChagen":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontSizelist)