xds["vmd.ux.TaskOperMonSn"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TaskOperMonSn",
    category: "vmd复合组件",
    text: "TaskOperMonSn",//中文
    naming: "hwTaskOperMonSn",
    //dtype 设计时组件
    dtype: "vmd.ux.TaskOperMonSn",
    //xtype 运行时组件
    xtype: "vmd.ux.TaskOperMonSn",
    xcls: "vmd.ux.TaskOperMonSn",
    //为了拖拽能自动生成递增id
    defaultName: "hwTaskOperMonSn",
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
     ,{"name":"callcode","group":"设计","ctype":"string"},{"name":"userInfo","group":"设计","ctype":"string"},{"name":"orgschecount","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TaskOperMonSn"]);
    xds.Registry.addUserType(xds["vmd.ux.TaskOperMonSn"]);

    var Data_vmd_ux_TaskOperMonSn={"BaseType":"Control","Type":"vmd_ux_TaskOperMonSn","Property":{"callcode":{"Description":"授权码","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"授权码"},"userInfo":{"Description":"用户信息服务 ","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"用户信息服务 "},"orgschecount":{"Description":"数据服务地址","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"数据服务地址"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TaskOperMonSn)