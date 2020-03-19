xds["vmd.ux.Data_dxan"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Data_dxan",
    category: "vmd复合组件",
    text: "Data_dxan",//中文
    naming: "Data_dxan",
    //dtype 设计时组件
    dtype: "vmd.ux.Data_dxan",
    //xtype 运行时组件
    xtype: "vmd.ux.Data_dxan",
    xcls: "vmd.ux.Data_dxan",
    //为了拖拽能自动生成递增id
    defaultName: "Data_dxan",
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
    xds.Registry.register(xds["vmd.ux.Data_dxan"]);
    xds.Registry.addUserType(xds["vmd.ux.Data_dxan"]);

    var Data_vmd_ux_Data_dxan={"BaseType":"Control","Type":"vmd_ux_Data_dxan","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Data_dxan)