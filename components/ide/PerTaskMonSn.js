xds["vmd.ux.PerTaskMonSn"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.PerTaskMonSn",
    category: "vmd复合组件",
    text: "PerTaskMonSn",//中文
    naming: "hwPerTaskMonSn",
    //dtype 设计时组件
    dtype: "vmd.ux.PerTaskMonSn",
    //xtype 运行时组件
    xtype: "vmd.ux.PerTaskMonSn",
    xcls: "vmd.ux.PerTaskMonSn",
    //为了拖拽能自动生成递增id
    defaultName: "hwPerTaskMonSn",
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
     ,{"name":"callcode     ","group":"设计","ctype":"string"},{"name":"userInfo","group":"设计","ctype":"string"},{"name":"userschedrun","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.PerTaskMonSn"]);
    xds.Registry.addUserType(xds["vmd.ux.PerTaskMonSn"]);

    var Data_vmd_ux_PerTaskMonSn={"BaseType":"Control","Type":"vmd_ux_PerTaskMonSn","Property":{"callcode     ":{"Description":"授权码","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"授权码"},"userInfo":{"Description":"userInfo","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"userschedrun":{"Description":"数据服务地址","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"数据服务地址"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_PerTaskMonSn)