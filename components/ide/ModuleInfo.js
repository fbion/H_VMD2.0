xds["vmd.ux.ModuleInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ModuleInfo",
    category: "vmd复合组件",
    text: "ModuleInfo",//中文
    naming: "hwModuleInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.ModuleInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.ModuleInfo",
    xcls: "vmd.ux.ModuleInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwModuleInfo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
    xds.Registry.register(xds["vmd.ux.ModuleInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.ModuleInfo"]);

    var Data_vmd_ux_ModuleInfo={"BaseType":"Control","Type":"vmd_ux_ModuleInfo","Property":{},"Method":{"refresh":{"Description":"refresh","Prototype":"refresh(tree,projectid,workspaceid)","Args":{"_Return_":"void","Args":"tree,projectid,workspaceid"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ModuleInfo)