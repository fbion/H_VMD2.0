xds["vmd.ux.TopTitle"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TopTitle",
    category: "vmd复合组件",
    text: "TopTitle",//中文
    naming: "hwTopTitle",
    //dtype 设计时组件
    dtype: "vmd.ux.TopTitle",
    //xtype 运行时组件
    xtype: "vmd.ux.TopTitle",
    xcls: "vmd.ux.TopTitle",
    //为了拖拽能自动生成递增id
    defaultName: "hwTopTitle",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/toptitle/1.0/css/iconfont.css"],
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
     ,{"name":"vmdChar","group":"设计","ctype":"string"},{"name":"fontFamityChange","group":"事件","ctype":"string","editor":"ace","params":"sender,font"},{"name":"fontSizeChange","group":"事件","ctype":"string","editor":"ace","params":"sender,font"},{"name":"fontColorChange","group":"事件","ctype":"string","editor":"ace","params":"sender,color"},{"name":"fontStyleChange","group":"事件","ctype":"string","editor":"ace","params":"sender,style"},{"name":"chartTypeChange","group":"事件","ctype":"string","editor":"ace","params":"sender,type"},{"name":"isShowChange","group":"事件","ctype":"string","editor":"ace","params":"sender,showObje"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TopTitle"]);
    xds.Registry.addUserType(xds["vmd.ux.TopTitle"]);

    var Data_vmd_ux_TopTitle={"BaseType":"Control","Type":"vmd_ux_TopTitle","Property":{"vmdChar":{"Description":"曲线对象","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"曲线对象"}},"Method":{"setObject":{"Description":"setObject","Prototype":"setObject(name,obj,item)","Args":{"_Return_":"void","Args":"name,obj,item"},"Example":""},"setOriPropetry":{"Description":"setOriPropetry","Prototype":"setOriPropetry(name,obj,item)","Args":{"_Return_":"void","Args":"name,obj,item"},"Example":""}},"Event":{"fontFamityChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontSizeChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontColorChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"fontStyleChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"chartTypeChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"isShowChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_TopTitle)