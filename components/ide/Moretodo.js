xds["vmd.ux.Moretodo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Moretodo",
    category: "vmd复合组件",
    text: "Moretodo",//中文
    naming: "hwMoretodo",
    //dtype 设计时组件
    dtype: "vmd.ux.Moretodo",
    //xtype 运行时组件
    xtype: "vmd.ux.Moretodo",
    xcls: "vmd.ux.Moretodo",
    //为了拖拽能自动生成递增id
    defaultName: "hwMoretodo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"vbox"},
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
        this.layoutConfig={"align":"center","pack":"start"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Moretodo"]);
    xds.Registry.addUserType(xds["vmd.ux.Moretodo"]);

    var Data_vmd_ux_Moretodo={"BaseType":"Control","Type":"vmd_ux_Moretodo","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Moretodo)