xds["vmd.ux.ClickText"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ClickText",
    category: "vmd复合组件",
    text: "ClickText",//中文
    naming: "hwClickText",
    //dtype 设计时组件
    dtype: "vmd.ux.ClickText",
    //xtype 运行时组件
    xtype: "vmd.ux.ClickText",
    xcls: "vmd.ux.ClickText",
    //为了拖拽能自动生成递增id
    defaultName: "hwClickText",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"readOnly","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"plus","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"minus","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ClickText"]);
    xds.Registry.addUserType(xds["vmd.ux.ClickText"]);

    var Data_vmd_ux_ClickText={"BaseType":"Control","Type":"vmd_ux_ClickText","Property":{"readOnly":{"Description":"只读","Prototype":"","Args":{"_Return_":""},"Example":"只读","Name":"只读"}},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":""},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"plus":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"minus":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ClickText)