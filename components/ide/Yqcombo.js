xds["vmd.ux.Yqcombo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Yqcombo",
    category: "vmd复合组件",
    text: "Yqcombo",//中文
    naming: "Yqcombo",
    //dtype 设计时组件
    dtype: "vmd.ux.Yqcombo",
    //xtype 运行时组件
    xtype: "vmd.ux.Yqcombo",
    xcls: "vmd.ux.Yqcombo",
    //为了拖拽能自动生成递增id
    defaultName: "Yqcombo",
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
     ,{"name":"change","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Yqcombo"]);
    xds.Registry.addUserType(xds["vmd.ux.Yqcombo"]);

    var Data_vmd_ux_Yqcombo={"BaseType":"Control","Type":"vmd_ux_Yqcombo","Property":{},"Method":{"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(val)","Args":{"_Return_":"void","Args":"val"},"Example":""}},"Event":{"change":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Yqcombo)