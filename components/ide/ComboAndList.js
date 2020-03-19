xds["vmd.ux.ComboAndList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ComboAndList",
    category: "vmd复合组件",
    text: "ComboAndList",//中文
    naming: "ComboAndList",
    //dtype 设计时组件
    dtype: "vmd.ux.ComboAndList",
    //xtype 运行时组件
    xtype: "vmd.ux.ComboAndList",
    xcls: "vmd.ux.ComboAndList",
    //为了拖拽能自动生成递增id
    defaultName: "ComboAndList",
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
    xds.Registry.register(xds["vmd.ux.ComboAndList"]);
    xds.Registry.addUserType(xds["vmd.ux.ComboAndList"]);

    var Data_vmd_ux_ComboAndList={"BaseType":"Control","Type":"vmd_ux_ComboAndList","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ComboAndList)