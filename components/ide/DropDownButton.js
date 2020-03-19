xds["vmd.ux.DropDownButton"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DropDownButton",
    category: "vmd复合组件",
    text: "DropDownButton",//中文
    naming: "hwDropDownButton",
    //dtype 设计时组件
    dtype: "vmd.ux.DropDownButton",
    //xtype 运行时组件
    xtype: "vmd.ux.DropDownButton",
    xcls: "vmd.ux.DropDownButton",
    //为了拖拽能自动生成递增id
    defaultName: "hwDropDownButton",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"buttonText":"lable:","layout":"fit"},
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
     ,{"name":"buttonText","group":"设计","ctype":"string","editor":"string"},{"name":"clickLeft","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"clickRight","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DropDownButton"]);
    xds.Registry.addUserType(xds["vmd.ux.DropDownButton"]);

    var Data_vmd_ux_DropDownButton={"BaseType":"Control","Type":"vmd_ux_DropDownButton","Property":{"buttonText":{"Description":"按钮名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"按钮名称"}},"Method":{},"Event":{"clickLeft":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"clickRight":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DropDownButton)