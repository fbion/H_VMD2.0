xds["vmd.ux.ZYLB"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ZYLB",
    category: "vmd复合组件",
    text: "ZYLB",//中文
    naming: "ZYLB",
    //dtype 设计时组件
    dtype: "vmd.ux.ZYLB",
    //xtype 运行时组件
    xtype: "vmd.ux.ZYLB",
    xcls: "vmd.ux.ZYLB",
    //为了拖拽能自动生成递增id
    defaultName: "ZYLB",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"hbox"},
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
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.ZYLB"]);
    xds.Registry.addUserType(xds["vmd.ux.ZYLB"]);

    var Data_vmd_ux_ZYLB={"BaseType":"Control","Type":"vmd_ux_ZYLB","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ZYLB)