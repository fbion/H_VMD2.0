xds["vmd.ux.CodeEdit"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CodeEdit",
    category: "vmd复合组件",
    text: "CodeEdit",//中文
    naming: "hwCodeEdit",
    //dtype 设计时组件
    dtype: "vmd.ux.CodeEdit",
    //xtype 运行时组件
    xtype: "vmd.ux.CodeEdit",
    xcls: "vmd.ux.CodeEdit",
    //为了拖拽能自动生成递增id
    defaultName: "hwCodeEdit",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: ["lib/ace/ace.js?ver=vmd2.0.4.190810","lib/ace/mode-base.js?ver=vmd2.0.4.190810","lib/ace/theme-xcode.js?ver=vmd2.0.4.190810","lib/ace/ext-language_tools.js?ver=vmd2.0.4.190810"],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"anchor"},
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
    xds.Registry.register(xds["vmd.ux.CodeEdit"]);
    xds.Registry.addUserType(xds["vmd.ux.CodeEdit"]);

    var Data_vmd_ux_CodeEdit={"BaseType":"Control","Type":"vmd_ux_CodeEdit","Property":{},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue(value,remark,type)","Args":{"_Return_":"void","Args":"value,remark,type"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_CodeEdit)