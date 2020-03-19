xds["vmd.ux.Segmentation"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Segmentation",
    category: "vmd复合组件",
    text: "Segmentation",//中文
    naming: "hwSegmentation",
    //dtype 设计时组件
    dtype: "vmd.ux.Segmentation",
    //xtype 运行时组件
    xtype: "vmd.ux.Segmentation",
    xcls: "vmd.ux.Segmentation",
    //为了拖拽能自动生成递增id
    defaultName: "hwSegmentation",
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
    xds.Registry.register(xds["vmd.ux.Segmentation"]);
    xds.Registry.addUserType(xds["vmd.ux.Segmentation"]);

    var Data_vmd_ux_Segmentation={"BaseType":"Control","Type":"vmd_ux_Segmentation","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(sheet)","Args":{"_Return_":"void","Args":"sheet"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Segmentation)