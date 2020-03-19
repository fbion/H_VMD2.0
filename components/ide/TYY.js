xds["vmd.ux.TYY"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TYY",
    category: "vmd复合组件",
    text: "TYY",//中文
    naming: "hwTYY",
    //dtype 设计时组件
    dtype: "vmd.ux.TYY",
    //xtype 运行时组件
    xtype: "vmd.ux.TYY",
    xcls: "vmd.ux.TYY",
    //为了拖拽能自动生成递增id
    defaultName: "hwTYY",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'chart',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"store","group":"设计","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TYY"]);
    xds.Registry.addUserType(xds["vmd.ux.TYY"]);

    var Data_vmd_ux_TYY={"BaseType":"Control","Type":"vmd_ux_TYY","Property":{"store":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TYY)