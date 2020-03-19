xds["vmd.ux.InputExpProperty"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.InputExpProperty",
    category: "vmd复合组件",
    text: "InputExpProperty",//中文
    naming: "hwInputExpProperty",
    //dtype 设计时组件
    dtype: "vmd.ux.InputExpProperty",
    //xtype 运行时组件
    xtype: "vmd.ux.InputExpProperty",
    xcls: "vmd.ux.InputExpProperty",
    //为了拖拽能自动生成递增id
    defaultName: "hwInputExpProperty",
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
    xds.Registry.register(xds["vmd.ux.InputExpProperty"]);
    xds.Registry.addUserType(xds["vmd.ux.InputExpProperty"]);

    var Data_vmd_ux_InputExpProperty={"BaseType":"Control","Type":"vmd_ux_InputExpProperty","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,flag)","Args":{"_Return_":"void","Args":"info,flag"},"Example":""},"getInfo":{"Description":"getInfo","Prototype":"getInfo()","Args":{"_Return_":"void","Args":""},"Example":""},"hideEmpty":{"Description":"hideEmpty","Prototype":"hideEmpty()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_InputExpProperty)