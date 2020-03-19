xds["vmd.ux.VisualEditor100000000"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.VisualEditor100000000",
    category: "vmd复合组件",
    text: "VisualEditor100000000",//中文
    naming:"visualeditor100000000",
    //dtype 设计时组件
    dtype: "vmd.ux.VisualEditor100000000",
    //xtype 运行时组件
    xtype: "vmd.ux.VisualEditor100000000",
    xcls: "vmd.ux.VisualEditor100000000",
    //为了拖拽能自动生成递增id
    defaultName:"visualeditor100000000",
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
     ,{"name":"getColor","group":"事件","ctype":"string","editor":"ace","params":"info,value"},{"name":"setColor","group":"事件","ctype":"string","editor":"ace","params":"info,value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.VisualEditor100000000"]);
    xds.Registry.addUserType(xds["vmd.ux.VisualEditor100000000"]);

    var Data_vmd_ux_VisualEditor100000000={"BaseType":"Control","Type":"vmd_ux_VisualEditor100000000","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,cell)","Args":{"_Return_":"void","Args":"info,cell"},"Example":""}},"Event":{"getColor":{"Prototype":"","Args":{"_Return_":""},"Example":""},"setColor":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_VisualEditor100000000)