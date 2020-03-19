xds["vmd.ux.DHJZDJK"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DHJZDJK",
    category: "vmd复合组件",
    text: "DHJZDJK",//中文
    naming: "DHJZDJK",
    //dtype 设计时组件
    dtype: "vmd.ux.DHJZDJK",
    //xtype 运行时组件
    xtype: "vmd.ux.DHJZDJK",
    xcls: "vmd.ux.DHJZDJK",
    //为了拖拽能自动生成递增id
    defaultName: "DHJZDJK",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DHJZDJK"]);
    xds.Registry.addUserType(xds["vmd.ux.DHJZDJK"]);

    var Data_vmd_ux_DHJZDJK={"BaseType":"Control","Type":"vmd_ux_DHJZDJK","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DHJZDJK)