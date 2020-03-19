xds["vmd.ux.ContactAddress"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ContactAddress",
    category: "vmd复合组件",
    text: "ContactAddress",//中文
    naming: "hwContactAddress",
    //dtype 设计时组件
    dtype: "vmd.ux.ContactAddress",
    //xtype 运行时组件
    xtype: "vmd.ux.ContactAddress",
    xcls: "vmd.ux.ContactAddress",
    //为了拖拽能自动生成递增id
    defaultName: "hwContactAddress",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"address","group":"数据集","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"tree_beforerender","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"delete_fhzj","group":"事件","ctype":"string","editor":"ace","params":"cmpId"},{"name":"combo_beforerender","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"pack_up","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"stretch","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ContactAddress"]);
    xds.Registry.addUserType(xds["vmd.ux.ContactAddress"]);

    var Data_vmd_ux_ContactAddress={"BaseType":"Control","Type":"vmd_ux_ContactAddress","Property":{"address":{"Description":"address","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(data)","Args":{"_Return_":"void","Args":"data"},"Example":""},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"字符串","Args":""},"Example":""},"deleteValue":{"Description":"deleteValue","Prototype":"deleteValue()","Args":{"_Return_":"字符串","Args":""},"Example":""},"treeSetValue":{"Description":"treeSetValue","Prototype":"treeSetValue(liss)","Args":{"_Return_":"void","Args":"liss"},"Example":""},"checkResult":{"Description":"checkResult","Prototype":"checkResult()","Args":{"_Return_":"字符串","Args":""},"Example":""}},"Event":{"tree_beforerender":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"delete_fhzj":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"combo_beforerender":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"pack_up":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"stretch":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ContactAddress)