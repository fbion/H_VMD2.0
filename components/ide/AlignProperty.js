xds["vmd.ux.AlignProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AlignProperty",
    category: "vmd复合组件",
    text: "AlignProperty",//中文
    naming: "AlignProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.AlignProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.AlignProperty",
    xcls: "vmd.ux.AlignProperty",
    //为了拖拽能自动生成递增id
    defaultName: "AlignProperty",
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
    xds.Registry.register(xds["vmd.ux.AlignProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.AlignProperty"]);

    var Data_vmd_ux_AlignProperty={"BaseType":"Control","Type":"vmd_ux_AlignProperty","Property":{},"Method":{"setAlignInfo":{"Description":"设置对齐信息","Prototype":"setAlignInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":"设置对齐信息"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_AlignProperty)