xds["vmd.ux.DisplayDetails"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DisplayDetails",
    category: "vmd复合组件",
    text: "DisplayDetails",//中文
    naming: "DisplayDetails",
    //dtype 设计时组件
    dtype: "vmd.ux.DisplayDetails",
    //xtype 运行时组件
    xtype: "vmd.ux.DisplayDetails",
    xcls: "vmd.ux.DisplayDetails",
    //为了拖拽能自动生成递增id
    defaultName: "DisplayDetails",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     ,{"name":"loadText","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DisplayDetails"]);
    xds.Registry.addUserType(xds["vmd.ux.DisplayDetails"]);

    var Data_vmd_ux_DisplayDetails={"BaseType":"Control","Type":"vmd_ux_DisplayDetails","Property":{},"Method":{"DataBindingFun":{"Description":"DataBindingFun","Prototype":"DataBindingFun(title,content,fbr,fbsj)","Args":{"_Return_":"无","Args":"title,content,fbr,fbsj"},"Example":""}},"Event":{"loadText":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DisplayDetails)