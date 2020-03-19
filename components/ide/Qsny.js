xds["vmd.ux.Qsny"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Qsny",
    category: "vmd复合组件",
    text: "Qsny",//中文
    naming: "Qsny",
    //dtype 设计时组件
    dtype: "vmd.ux.Qsny",
    //xtype 运行时组件
    xtype: "vmd.ux.Qsny",
    xcls: "vmd.ux.Qsny",
    //为了拖拽能自动生成递增id
    defaultName: "Qsny",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
    xds.Registry.register(xds["vmd.ux.Qsny"]);
    xds.Registry.addUserType(xds["vmd.ux.Qsny"]);

    var Data_vmd_ux_Qsny={"BaseType":"Control","Type":"vmd_ux_Qsny","Property":{},"Method":{"getKsny":{"Description":"getKsny","Prototype":"getKsny()","Args":{"_Return_":"void","Args":""},"Example":""},"getJsny":{"Description":"getJsny","Prototype":"getJsny()","Args":{"_Return_":"void","Args":""},"Example":""},"setTime":{"Description":"setTime","Prototype":"setTime(kssj,jssj)","Args":{"_Return_":"void","Args":"kssj,jssj"},"Example":""},"changeFormat":{"Description":"changeFormat","Prototype":"changeFormat(style)","Args":{"_Return_":"void","Args":"style"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Qsny)