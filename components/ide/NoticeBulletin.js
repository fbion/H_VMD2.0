xds["vmd.ux.NoticeBulletin"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NoticeBulletin",
    category: "vmd复合组件",
    text: "NoticeBulletin",//中文
    naming: "NoticeBulletin",
    //dtype 设计时组件
    dtype: "vmd.ux.NoticeBulletin",
    //xtype 运行时组件
    xtype: "vmd.ux.NoticeBulletin",
    xcls: "vmd.ux.NoticeBulletin",
    //为了拖拽能自动生成递增id
    defaultName: "NoticeBulletin",
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
    xds.Registry.register(xds["vmd.ux.NoticeBulletin"]);
    xds.Registry.addUserType(xds["vmd.ux.NoticeBulletin"]);

    var Data_vmd_ux_NoticeBulletin={"BaseType":"Control","Type":"vmd_ux_NoticeBulletin","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_NoticeBulletin)