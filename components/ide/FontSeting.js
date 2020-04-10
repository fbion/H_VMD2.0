xds["vmd.ux.FontSeting"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FontSeting",
    category: "vmd复合组件",
    text: "FontSeting",//中文
    naming: "hwFontSeting",
    //dtype 设计时组件
    dtype: "vmd.ux.FontSeting",
    //xtype 运行时组件
    xtype: "vmd.ux.FontSeting",
    xcls: "vmd.ux.FontSeting",
    //为了拖拽能自动生成递增id
    defaultName: "hwFontSeting",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/toptitle/1.0/css/iconfont.css"],
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
     ,{"name":"fontStyleIsShow","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"fontColorIsShow","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"fontFamityChange","group":"事件","ctype":"string","editor":"ace","params":"sender,font"},{"name":"fontSizeChange","group":"事件","ctype":"string","editor":"ace","params":"sender,font"},{"name":"fontColorChange","group":"事件","ctype":"string","editor":"ace","params":"sender,color"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"sender,style"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.FontSeting"]);
    xds.Registry.addUserType(xds["vmd.ux.FontSeting"]);

    var Data_vmd_ux_FontSeting={"BaseType":"Control","Type":"vmd_ux_FontSeting","Property":{"fontStyleIsShow":{"Description":"隐藏加粗倾斜","Prototype":"","Args":{"_Return_":""},"Example":"字体样式是否显示","Name":"隐藏加粗倾斜"},"fontColorIsShow":{"Description":"隐藏颜色","Prototype":"","Args":{"_Return_":""},"Example":"颜色是否隐藏","Name":"隐藏颜色"}},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(obj)","Args":{"_Return_":"void","Args":"obj"},"Example":""},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"fontFamityChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontSizeChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_FontSeting)