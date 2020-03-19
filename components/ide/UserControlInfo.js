xds["vmd.ux.UserControlInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.UserControlInfo",
    category: "vmd复合组件",
    text: "UserControlInfo",//中文
    naming: "hwUserControlInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.UserControlInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.UserControlInfo",
    xcls: "vmd.ux.UserControlInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwUserControlInfo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
    xds.Registry.register(xds["vmd.ux.UserControlInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.UserControlInfo"]);

    var Data_vmd_ux_UserControlInfo={"BaseType":"Control","Type":"vmd_ux_UserControlInfo","Property":{},"Method":{"refresh":{"Description":"refresh","Prototype":"refresh(tree)","Args":{"_Return_":"void","Args":"tree"},"Example":""},"setReadOnly":{"Description":"setReadOnly","Prototype":"setReadOnly()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_UserControlInfo)