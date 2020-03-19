xds["vmd.ux.ProgressBarType"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ProgressBarType",
    category: "vmd复合组件",
    text: "ProgressBarType",//中文
    naming: "hwProgressBarType",
    //dtype 设计时组件
    dtype: "vmd.ux.ProgressBarType",
    //xtype 运行时组件
    xtype: "vmd.ux.ProgressBarType",
    xcls: "vmd.ux.ProgressBarType",
    //为了拖拽能自动生成递增id
    defaultName: "hwProgressBarType",
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
     ,{"name":"pbtDecimalChanged","group":"事件","ctype":"string","editor":"ace","params":"value,describe"},{"name":"pbtColorChanged","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ProgressBarType"]);
    xds.Registry.addUserType(xds["vmd.ux.ProgressBarType"]);

    var Data_vmd_ux_ProgressBarType={"BaseType":"Control","Type":"vmd_ux_ProgressBarType","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"pbtDecimalChanged":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"pbtColorChanged":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ProgressBarType)