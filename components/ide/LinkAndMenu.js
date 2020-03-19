xds["vmd.ux.LinkAndMenu"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LinkAndMenu",
    category: "vmd复合组件",
    text: "LinkAndMenu",//中文
    naming: "hwLinkAndMenu",
    //dtype 设计时组件
    dtype: "vmd.ux.LinkAndMenu",
    //xtype 运行时组件
    xtype: "vmd.ux.LinkAndMenu",
    xcls: "vmd.ux.LinkAndMenu",
    //为了拖拽能自动生成递增id
    defaultName: "hwLinkAndMenu",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
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
    xds.Registry.register(xds["vmd.ux.LinkAndMenu"]);
    xds.Registry.addUserType(xds["vmd.ux.LinkAndMenu"]);

    var Data_vmd_ux_LinkAndMenu={"BaseType":"Control","Type":"vmd_ux_LinkAndMenu","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_LinkAndMenu)