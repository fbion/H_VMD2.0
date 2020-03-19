xds["vmd.ux.SideBar"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.SideBar",
    category: "vmd复合组件",
    text: "SideBar",//中文
    naming: "hwSideBar",
    //dtype 设计时组件
    dtype: "vmd.ux.SideBar",
    //xtype 运行时组件
    xtype: "vmd.ux.SideBar",
    xcls: "vmd.ux.SideBar",
    //为了拖拽能自动生成递增id
    defaultName: "hwSideBar",
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
    xds.Registry.register(xds["vmd.ux.SideBar"]);
    xds.Registry.addUserType(xds["vmd.ux.SideBar"]);

    var Data_vmd_ux_SideBar={"BaseType":"Control","Type":"vmd_ux_SideBar","Property":{},"Method":{"init":{"Description":"init","Prototype":"init(dom,mode)","Args":{"_Return_":"void","Args":"dom,mode"},"Example":""},"setDisplayMode":{"Description":"setDisplayMode","Prototype":"setDisplayMode(mode)","Args":{"_Return_":"void","Args":"mode"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_SideBar)