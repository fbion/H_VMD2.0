xds["vmd.ux.DutyTaskCompletionSn"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DutyTaskCompletionSn",
    category: "vmd复合组件",
    text: "DutyTaskCompletionSn",//中文
    naming: "DutyTaskCompletionSn",
    //dtype 设计时组件
    dtype: "vmd.ux.DutyTaskCompletionSn",
    //xtype 运行时组件
    xtype: "vmd.ux.DutyTaskCompletionSn",
    xcls: "vmd.ux.DutyTaskCompletionSn",
    //为了拖拽能自动生成递增id
    defaultName: "DutyTaskCompletionSn",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
     ,{"name":"userInfo","group":"设计","ctype":"string"},{"name":"callcode","group":"设计","ctype":"string"},{"name":"schedule","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DutyTaskCompletionSn"]);
    xds.Registry.addUserType(xds["vmd.ux.DutyTaskCompletionSn"]);

    var Data_vmd_ux_DutyTaskCompletionSn={"BaseType":"Control","Type":"vmd_ux_DutyTaskCompletionSn","Property":{"userInfo":{"Description":"用户信息服务 ","Prototype":"","Args":{"_Return_":""},"Example":""},"callcode":{"Description":"授权码","Prototype":"","Args":{"_Return_":""},"Example":""},"schedule":{"Description":"数据服务地址","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DutyTaskCompletionSn)