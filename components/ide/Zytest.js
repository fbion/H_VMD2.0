xds["vmd.ux.Zytest"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Zytest",
    category: "vmd复合组件",
    text: "Zytest",//中文
    naming:"zytest",
    //dtype 设计时组件
    dtype: "vmd.ux.Zytest",
    //xtype 运行时组件
    xtype: "vmd.ux.Zytest",
    xcls: "vmd.ux.Zytest",
    //为了拖拽能自动生成递增id
    defaultName:"zytest",
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
     ,{"name":"homeClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"pathClick","group":"事件","ctype":"string","editor":"ace","params":"textpath,idpath"},{"name":"patnIcoClick","group":"事件","ctype":"string","editor":"ace","params":"e,id"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Zytest"]);
    xds.Registry.addUserType(xds["vmd.ux.Zytest"]);

    var Data_vmd_ux_Zytest={"BaseType":"Control","Type":"vmd_ux_Zytest","Property":{},"Method":{"setPath":{"Description":"setPath","Prototype":"setPath(address, path)","Args":{"_Return_":"无","Args":"address, path"},"Example":""},"previousChange":{"Description":"回退操作，回调函数返回会退后当前节点id","Prototype":"previousChange(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":"回退操作，回调函数返回会退后当前节点id"},"nextChange":{"Description":"前进操作，回调函数返回前进后当前节点id","Prototype":"nextChange(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":"前进操作，回调函数返回前进后当前节点id"},"preIsEnabled":{"Description":"preIsEnabled","Prototype":"preIsEnabled()","Args":{"_Return_":"void","Args":""},"Example":""},"nexIsEnabled":{"Description":"nexIsEnabled","Prototype":"nexIsEnabled()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"homeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"返回主页面"},"pathClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"patnIcoClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Zytest)