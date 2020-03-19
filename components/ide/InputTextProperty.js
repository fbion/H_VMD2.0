xds["vmd.ux.InputTextProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.InputTextProperty",
    category: "vmd复合组件",
    text: "InputTextProperty",//中文
    naming: "hwInputTextProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.InputTextProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.InputTextProperty",
    xcls: "vmd.ux.InputTextProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwInputTextProperty",
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.InputTextProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.InputTextProperty"]);

    var Data_vmd_ux_InputTextProperty={"BaseType":"Control","Type":"vmd_ux_InputTextProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":""},"getInfo":{"Description":"getInfo","Prototype":"getInfo()","Args":{"_Return_":"void","Args":""},"Example":""},"changeState":{"Description":"changeState","Prototype":"changeState(state)","Args":{"_Return_":"void","Args":"state"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_InputTextProperty)