xds["vmd.ux.LunBo_Time"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LunBo_Time",
    category: "vmd复合组件",
    text: "LunBo_Time",//中文
    naming: "LunBo_Time",
    //dtype 设计时组件
    dtype: "vmd.ux.LunBo_Time",
    //xtype 运行时组件
    xtype: "vmd.ux.LunBo_Time",
    xcls: "vmd.ux.LunBo_Time",
    //为了拖拽能自动生成递增id
    defaultName: "LunBo_Time",
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
    xds.Registry.register(xds["vmd.ux.LunBo_Time"]);
    xds.Registry.addUserType(xds["vmd.ux.LunBo_Time"]);

    var Data_vmd_ux_LunBo_Time={"BaseType":"Control","Type":"vmd_ux_LunBo_Time","Property":{},"Method":{"get_val":{"Description":"获取轮播文本框的值","Prototype":"get_val()","Args":{"_Return_":"void","Args":""},"Example":"获取轮播文本框的值"},"set_val":{"Description":"设置控件值","Prototype":"set_val(val)","Args":{"_Return_":"void","Args":"val"},"Example":"设置控件值"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_LunBo_Time)