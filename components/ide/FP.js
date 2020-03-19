xds["vmd.ux.FP"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.FP",
    category: "vmd复合组件",
    text: "FP",//中文
    naming: "hwFP",
    //dtype 设计时组件
    dtype: "vmd.ux.FP",
    //xtype 运行时组件
    xtype: "vmd.ux.FP",
    xcls: "vmd.ux.FP",
    //为了拖拽能自动生成递增id
    defaultName: "hwFP",
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
    xds.Registry.register(xds["vmd.ux.FP"]);
    xds.Registry.addUserType(xds["vmd.ux.FP"]);

    var Data_vmd_ux_FP={"BaseType":"Control","Type":"vmd_ux_FP","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(sheet)","Args":{"_Return_":"void","Args":"sheet"},"Example":""},"allDisable":{"Description":"allDisable","Prototype":"allDisable()","Args":{"_Return_":"void","Args":""},"Example":""},"allEnable":{"Description":"allEnable","Prototype":"allEnable()","Args":{"_Return_":"void","Args":""},"Example":""},"clearPanel":{"Description":"clearPanel","Prototype":"clearPanel()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_FP)