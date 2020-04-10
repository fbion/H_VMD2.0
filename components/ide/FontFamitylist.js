xds["vmd.ux.FontFamitylist"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontFamitylist",
    category: "vmd复合组件",
    text: "FontFamitylist",//中文
    naming: "hwFontFamitylist",
    //dtype 设计时组件
    dtype: "vmd.ux.FontFamitylist",
    //xtype 运行时组件
    xtype: "vmd.ux.FontFamitylist",
    xcls: "vmd.ux.FontFamitylist",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontFamitylist",
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
     ,{"name":"border","group":"设计","ctype":"string"},{"name":"fontChagen","group":"事件","ctype":"string","editor":"ace","params":"font"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontFamitylist"]);
    xds.Registry.addUserType(xds["vmd.ux.FontFamitylist"]);

    var Data_vmd_ux_FontFamitylist={"BaseType":"Control","Type":"vmd_ux_FontFamitylist","Property":{"border":{"Description":"border","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"setOriFont":{"Description":"setOriFont","Prototype":"setOriFont(font)","Args":{"_Return_":"void","Args":"font"},"Example":""},"getFont":{"Description":"getFont","Prototype":"getFont()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"fontChagen":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontFamitylist)