xds["vmd.ux.AuditList"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AuditList",
    category: "vmd复合组件",
    text: "AuditList",//中文
    naming: "AuditList",
    //dtype 设计时组件
    dtype: "vmd.ux.AuditList",
    //xtype 运行时组件
    xtype: "vmd.ux.AuditList",
    xcls: "vmd.ux.AuditList",
    //为了拖拽能自动生成递增id
    defaultName: "AuditList",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"vbox"},
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
        this.layoutConfig={"align":"center","pack":"start"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.AuditList"]);
    xds.Registry.addUserType(xds["vmd.ux.AuditList"]);

    var Data_vmd_ux_AuditList={"BaseType":"Control","Type":"vmd_ux_AuditList","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_AuditList)