xds["vmd.ux.NoticeEditor"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NoticeEditor",
    category: "vmd复合组件",
    text: "NoticeEditor",//中文
    naming: "NoticeEditor",
    //dtype 设计时组件
    dtype: "vmd.ux.NoticeEditor",
    //xtype 运行时组件
    xtype: "vmd.ux.NoticeEditor",
    xcls: "vmd.ux.NoticeEditor",
    //为了拖拽能自动生成递增id
    defaultName: "NoticeEditor",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"anchor"},
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
    xds.Registry.register(xds["vmd.ux.NoticeEditor"]);
    xds.Registry.addUserType(xds["vmd.ux.NoticeEditor"]);

    var Data_vmd_ux_NoticeEditor={"BaseType":"Control","Type":"vmd_ux_NoticeEditor","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_NoticeEditor)