xds["vmd.ux.ExtraProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ExtraProperty",
    category: "vmd复合组件",
    text: "ExtraProperty",//中文
    naming: "ExtraProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.ExtraProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.ExtraProperty",
    xcls: "vmd.ux.ExtraProperty",
    //为了拖拽能自动生成递增id
    defaultName: "ExtraProperty",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"direction":"1","layout":"absolute"},
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
     ,{"name":"leftParent","group":"设计","ctype":"string","editor":"string"},{"name":"rightParent","group":"设计","ctype":"string","editor":"string"},{"name":"direction","group":"设计","ctype":"string","editor":"string"},{"name":"directionClick","group":"事件","ctype":"string","editor":"ace","params":"selectedIndex"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ExtraProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.ExtraProperty"]);

    var Data_vmd_ux_ExtraProperty={"BaseType":"Control","Type":"vmd_ux_ExtraProperty","Property":{"leftParent":{"Description":"左父格属性","Prototype":"","Args":{"_Return_":""},"Example":"左父格属性"},"rightParent":{"Description":"上父格属性","Prototype":"","Args":{"_Return_":""},"Example":"上父格属性"},"direction":{"Description":"扩展方向","Prototype":"","Args":{"_Return_":""},"Example":"扩展方向"}},"Method":{"setSelectIndex":{"Description":"setSelectIndex","Prototype":"setSelectIndex(index)","Args":{"_Return_":"无","Args":"index"},"Example":""}},"Event":{"directionClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ExtraProperty)