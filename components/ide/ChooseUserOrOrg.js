xds["vmd.ux.ChooseUserOrOrg"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ChooseUserOrOrg",
    category: "vmd复合组件",
    text: "ChooseUserOrOrg",//中文
    naming: "ChooseUserOrOrg",
    //dtype 设计时组件
    dtype: "vmd.ux.ChooseUserOrOrg",
    //xtype 运行时组件
    xtype: "vmd.ux.ChooseUserOrOrg",
    xcls: "vmd.ux.ChooseUserOrOrg",
    //为了拖拽能自动生成递增id
    defaultName: "ChooseUserOrOrg",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"tab1Text":"Tab1","tab2Text":"Tab2","tab3Text":"Tab3","tab1Hide":true,"tab2Hide":true,"layout":"fit"},
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
     ,{"name":"tab1Text","group":"Tab属性","ctype":"string","editor":"string"},{"name":"tab2Text","group":"Tab属性","ctype":"string","editor":"string"},{"name":"tab3Text","group":"Tab属性","ctype":"string","editor":"string"},{"name":"tab1Hide","group":"Tab属性","ctype":"boolean","editor":"boolean"},{"name":"tab2Hide","group":"Tab属性","ctype":"boolean","editor":"boolean"},{"name":"tab3Hide","group":"Tab属性","ctype":"boolean","editor":"boolean"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ChooseUserOrOrg"]);
    xds.Registry.addUserType(xds["vmd.ux.ChooseUserOrOrg"]);

    var Data_vmd_ux_ChooseUserOrOrg={"BaseType":"Control","Type":"vmd_ux_ChooseUserOrOrg","Property":{"tab1Text":{"Description":"tab1文本属性","Prototype":"","Args":{"_Return_":""},"Example":"tab1文本属性"},"tab2Text":{"Description":"tab2文本属性","Prototype":"","Args":{"_Return_":""},"Example":"tab2文本属性"},"tab3Text":{"Description":"tab3文本属性","Prototype":"","Args":{"_Return_":""},"Example":"tab3文本属性"},"tab1Hide":{"Description":"tab1隐藏","Prototype":"","Args":{"_Return_":""},"Example":"tab1隐藏"},"tab2Hide":{"Description":"tab2隐藏","Prototype":"","Args":{"_Return_":""},"Example":"tab2隐藏"},"tab3Hide":{"Description":"tab3隐藏","Prototype":"","Args":{"_Return_":""},"Example":"tab3隐藏"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ChooseUserOrOrg)