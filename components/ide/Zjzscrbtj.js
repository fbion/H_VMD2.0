xds["vmd.ux.Zjzscrbtj"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Zjzscrbtj",
    category: "vmd复合组件",
    text: "Zjzscrbtj",//中文
    naming: "Zjzscrbtj",
    //dtype 设计时组件
    dtype: "vmd.ux.Zjzscrbtj",
    //xtype 运行时组件
    xtype: "vmd.ux.Zjzscrbtj",
    xcls: "vmd.ux.Zjzscrbtj",
    //为了拖拽能自动生成递增id
    defaultName: "Zjzscrbtj",
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
    xds.Registry.register(xds["vmd.ux.Zjzscrbtj"]);
    xds.Registry.addUserType(xds["vmd.ux.Zjzscrbtj"]);

    var Data_vmd_ux_Zjzscrbtj={"BaseType":"Control","Type":"vmd_ux_Zjzscrbtj","Property":{},"Method":{"getzjz":{"Description":"getzjz","Prototype":"getzjz()","Args":{"_Return_":"字符串","Args":""},"Example":""},"setDefaultValue":{"Description":"setDefaultValue","Prototype":"setDefaultValue(dwxz,xmxz,zxz)","Args":{"_Return_":"void","Args":"dwxz,xmxz,zxz"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Zjzscrbtj)