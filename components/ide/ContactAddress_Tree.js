xds["vmd.ux.ContactAddress_Tree"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ContactAddress_Tree",
    category: "vmd复合组件",
    text: "ContactAddress_Tree",//中文
    naming: "hwContactAddress_Tree",
    //dtype 设计时组件
    dtype: "vmd.ux.ContactAddress_Tree",
    //xtype 运行时组件
    xtype: "vmd.ux.ContactAddress_Tree",
    xcls: "vmd.ux.ContactAddress_Tree",
    //为了拖拽能自动生成递增id
    defaultName: "hwContactAddress_Tree",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datepicker/1.0/css/datepicker.css?ver=vmd2.0.5.200306"],
    requireJs: ["components/ux/datepicker/1.0/js/moment.min.js?ver=vmd2.0.5.200306","components/ux/datepicker/1.0/js/datepicker.js?ver=vmd2.0.5.200306"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"parentField":"parientid","valueField":"id","textField":"name","layout":"vbox"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    
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
     ,{"name":"address","group":"数据集","ctype":"string"},{"name":"tree_store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"parentField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"tree_store"}},{"name":"valueField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"tree_store"}},{"name":"textField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"tree_store"}},{"name":"tree_beforerender","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"delete_fhzj","group":"事件","ctype":"string","editor":"ace","params":"cmpId"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"center","pack":"end"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.ContactAddress_Tree"]);
    xds.Registry.addUserType(xds["vmd.ux.ContactAddress_Tree"]);

    var Data_vmd_ux_ContactAddress_Tree={"BaseType":"Control","Type":"vmd_ux_ContactAddress_Tree","Property":{"address":{"Description":"address","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"tree_store":{"Description":"tree_store","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"parentField":{"Description":"parentField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"valueField":{"Description":"valueField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"textField":{"Description":"textField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(data)","Args":{"_Return_":"void","Args":"data"},"Example":""},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"字符串","Args":""},"Example":""},"deleteValue":{"Description":"deleteValue","Prototype":"deleteValue()","Args":{"_Return_":"字符串","Args":""},"Example":""},"treeSetValue":{"Description":"treeSetValue","Prototype":"treeSetValue(liss)","Args":{"_Return_":"void","Args":"liss"},"Example":""}},"Event":{"tree_beforerender":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"delete_fhzj":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ContactAddress_Tree)