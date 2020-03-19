xds["vmd.ux.LeftTree"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LeftTree",
    category: "vmd复合组件",
    text: "LeftTree",//中文
    naming: "LeftTree",
    //dtype 设计时组件
    dtype: "vmd.ux.LeftTree",
    //xtype 运行时组件
    xtype: "vmd.ux.LeftTree",
    xcls: "vmd.ux.LeftTree",
    //为了拖拽能自动生成递增id
    defaultName: "LeftTree",
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
    xds.Registry.register(xds["vmd.ux.LeftTree"]);
    xds.Registry.addUserType(xds["vmd.ux.LeftTree"]);

    var Data_vmd_ux_LeftTree={"BaseType":"Control","Type":"vmd_ux_LeftTree","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_LeftTree)