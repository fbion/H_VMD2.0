xds["vmd.ux.ISIP5Navigation"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ISIP5Navigation",
    category: "vmd复合组件",
    text: "ISIP5Navigation",//中文
    naming: "ISIP5Navigation",
    //dtype 设计时组件
    dtype: "vmd.ux.ISIP5Navigation",
    //xtype 运行时组件
    xtype: "vmd.ux.ISIP5Navigation",
    xcls: "vmd.ux.ISIP5Navigation",
    //为了拖拽能自动生成递增id
    defaultName: "ISIP5Navigation",
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
     ,{"name":"homeClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"pathClick","group":"事件","ctype":"string","editor":"ace","params":"textpath,idpath,id"},{"name":"patnIcoClick","group":"事件","ctype":"string","editor":"ace","params":"e,id"},{"name":"menuClick","group":"事件","ctype":"string","editor":"ace","params":"textPath,idPath,id"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ISIP5Navigation"]);
    xds.Registry.addUserType(xds["vmd.ux.ISIP5Navigation"]);

    var Data_vmd_ux_ISIP5Navigation={"BaseType":"Control","Type":"vmd_ux_ISIP5Navigation","Property":{},"Method":{"setPath":{"Description":"设置导航栏的显示路径\n需要参数为点击文件的路径（文本路径和id路径）","Prototype":"setPath(address, path)","Args":{"_Return_":"无","Args":"address, path"},"Example":"设置导航栏的显示路径\n需要参数为点击文件的路径（文本路径和id路径）"},"previousChange":{"Description":"回退操作，回调函数返回会退后当前节点id","Prototype":"previousChange(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":"回退操作，回调函数返回会退后当前节点id"},"nextChange":{"Description":"前进操作，回调函数返回前进后当前节点id","Prototype":"nextChange(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":"前进操作，回调函数返回前进后当前节点id"},"preIsEnabled":{"Description":"preIsEnabled","Prototype":"preIsEnabled()","Args":{"_Return_":"void","Args":""},"Example":""},"nexIsEnabled":{"Description":"前进按钮是否可用","Prototype":"nexIsEnabled()","Args":{"_Return_":"void","Args":""},"Example":"前进按钮是否可用"},"setChildMeun":{"Description":"设置子文件菜单内容，参数为数组对象，对象中需包含\"id\",\"name\",\"idPath\",\"textPath\"键名","Prototype":"setChildMeun(childDta)","Args":{"_Return_":"void","Args":"childDta"},"Example":"设置子文件菜单内容，参数为数组对象，对象中需包含\"id\",\"name\",\"idPath\",\"textPath\"键名"}},"Event":{"homeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"返回主页面"},"pathClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"点击导航栏的文件名触发事件，返回的参数为文件的路径"},"patnIcoClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"点击文件夹对应图标触发，返回参数为该文件的id"},"menuClick":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ISIP5Navigation)