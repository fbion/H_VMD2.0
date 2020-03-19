xds["vmd.ux.UserControlInfo1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.UserControlInfo1",
    category: "vmd复合组件",
    text: "UserControlInfo1",//中文
    naming: "hwUserControlInfo1",
    //dtype 设计时组件
    dtype: "vmd.ux.UserControlInfo1",
    //xtype 运行时组件
    xtype: "vmd.ux.UserControlInfo1",
    xcls: "vmd.ux.UserControlInfo1",
    //为了拖拽能自动生成递增id
    defaultName: "hwUserControlInfo1",
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
    xds.Registry.register(xds["vmd.ux.UserControlInfo1"]);
    xds.Registry.addUserType(xds["vmd.ux.UserControlInfo1"]);

    var Data_vmd_ux_UserControlInfo1={"BaseType":"Control","Type":"vmd_ux_UserControlInfo1","Property":{},"Method":{"refresh":{"Description":"refresh","Prototype":"refresh(tree)","Args":{"_Return_":"void","Args":"tree"},"Example":""},"setReadOnly":{"Description":"setReadOnly","Prototype":"setReadOnly()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_UserControlInfo1)