xds["vmd.ux.Number1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Number1",
    category: "vmd复合组件",
    text: "Number1",//中文
    naming:"number1",
    //dtype 设计时组件
    dtype: "vmd.ux.Number1",
    //xtype 运行时组件
    xtype: "vmd.ux.Number1",
    xcls: "vmd.ux.Number1",
    //为了拖拽能自动生成递增id
    defaultName:"number1",
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
    xds.Registry.register(xds["vmd.ux.Number1"]);
    xds.Registry.addUserType(xds["vmd.ux.Number1"]);

    var Data_vmd_ux_Number1={"BaseType":"Control","Type":"vmd_ux_Number1","Property":{},"Method":{"getInfo":{"Description":"getInfo","Prototype":"getInfo(att)","Args":{"_Return_":"void","Args":"att"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Number1)