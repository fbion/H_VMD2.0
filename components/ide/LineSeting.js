xds["vmd.ux.LineSeting"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LineSeting",
    category: "vmd复合组件",
    text: "LineSeting",//中文
    naming: "hwLineSeting",
    //dtype 设计时组件
    dtype: "vmd.ux.LineSeting",
    //xtype 运行时组件
    xtype: "vmd.ux.LineSeting",
    xcls: "vmd.ux.LineSeting",
    //为了拖拽能自动生成递增id
    defaultName: "hwLineSeting",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/linecolor/1.0/css/iconfont.css","components/ux/toptitle/1.0/css/iconfont.css"],
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
     ,{"name":"lineWidthChange","group":"事件","ctype":"string","editor":"ace","params":"sender,value"},{"name":"lineColorChange","group":"事件","ctype":"string","editor":"ace","params":"sender,color"},{"name":"lineStyleChange","group":"事件","ctype":"string","editor":"ace","params":"sender,line"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"sender,style"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.LineSeting"]);
    xds.Registry.addUserType(xds["vmd.ux.LineSeting"]);

    var Data_vmd_ux_LineSeting={"BaseType":"Control","Type":"vmd_ux_LineSeting","Property":{},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(obj)","Args":{"_Return_":"void","Args":"obj"},"Example":""},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"lineWidthChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lineColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"lineStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"change":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_LineSeting)