xds["vmd.ux.JSFS"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.JSFS",
    category: "vmd复合组件",
    text: "JSFS",//中文
    naming: "JSFS",
    //dtype 设计时组件
    dtype: "vmd.ux.JSFS",
    //xtype 运行时组件
    xtype: "vmd.ux.JSFS",
    xcls: "vmd.ux.JSFS",
    //为了拖拽能自动生成递增id
    defaultName: "JSFS",
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
    xds.Registry.register(xds["vmd.ux.JSFS"]);
    xds.Registry.addUserType(xds["vmd.ux.JSFS"]);

    var Data_vmd_ux_JSFS={"BaseType":"Control","Type":"vmd_ux_JSFS","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_JSFS)