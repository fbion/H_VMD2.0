xds["vmd.ux.ISIP5butGroup"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ISIP5butGroup",
    category: "vmd复合组件",
    text: "ISIP5butGroup",//中文
    naming: "hwISIP5butGroup",
    //dtype 设计时组件
    dtype: "vmd.ux.ISIP5butGroup",
    //xtype 运行时组件
    xtype: "vmd.ux.ISIP5butGroup",
    xcls: "vmd.ux.ISIP5butGroup",
    //为了拖拽能自动生成递增id
    defaultName: "hwISIP5butGroup",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
     ,{"name":"bntGroupClick","group":"事件","ctype":"string","editor":"ace","params":"bntId,bntTitle"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ISIP5butGroup"]);
    xds.Registry.addUserType(xds["vmd.ux.ISIP5butGroup"]);

    var Data_vmd_ux_ISIP5butGroup={"BaseType":"Control","Type":"vmd_ux_ISIP5butGroup","Property":{},"Method":{"setBntGroup":{"Description":"对按钮组进行自定义，可以根据默认按钮id，传递数组参数或者字符串参数;\n例如：['icon-fenlei1','icon-liebiao','icon-sousuo']或者\"icon-fenlei1,icon-liebiao,icon-sousuo\";\n\n","Prototype":"setBntGroup(bntGroup)","Args":{"_Return_":"void","Args":"bntGroup"},"Example":"对按钮组进行自定义，可以根据默认按钮id，传递数组参数或者字符串参数;\n例如：['icon-fenlei1','icon-liebiao','icon-sousuo']或者\"icon-fenlei1,icon-liebiao,icon-sousuo\";\n\n"}},"Event":{"bntGroupClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"按钮事件，根据抛出的bntId及bntTitle判断按钮类型，做相应的事件处理"}}}
	ControlsDataManage._add(Data_vmd_ux_ISIP5butGroup)