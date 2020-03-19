xds["vmd.ux.InputRadioButtonProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.InputRadioButtonProperty",
    category: "vmd复合组件",
    text: "InputRadioButtonProperty",//中文
    naming: "hwInputRadioButtonProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.InputRadioButtonProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.InputRadioButtonProperty",
    xcls: "vmd.ux.InputRadioButtonProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwInputRadioButtonProperty",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
    xds.Registry.register(xds["vmd.ux.InputRadioButtonProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.InputRadioButtonProperty"]);

    var Data_vmd_ux_InputRadioButtonProperty={"BaseType":"Control","Type":"vmd_ux_InputRadioButtonProperty","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_InputRadioButtonProperty)