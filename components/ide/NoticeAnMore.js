xds["vmd.ux.NoticeAnMore"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NoticeAnMore",
    category: "vmd复合组件",
    text: "NoticeAnMore",//中文
    naming: "NoticeAnMore",
    //dtype 设计时组件
    dtype: "vmd.ux.NoticeAnMore",
    //xtype 运行时组件
    xtype: "vmd.ux.NoticeAnMore",
    xcls: "vmd.ux.NoticeAnMore",
    //为了拖拽能自动生成递增id
    defaultName: "NoticeAnMore",
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
    xds.Registry.register(xds["vmd.ux.NoticeAnMore"]);
    xds.Registry.addUserType(xds["vmd.ux.NoticeAnMore"]);

    var Data_vmd_ux_NoticeAnMore={"BaseType":"Control","Type":"vmd_ux_NoticeAnMore","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_NoticeAnMore)