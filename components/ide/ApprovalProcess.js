xds["vmd.ux.ApprovalProcess"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ApprovalProcess",
    category: "vmd复合组件",
    text: "ApprovalProcess",//中文
    naming: "ApprovalProcess",
    //dtype 设计时组件
    dtype: "vmd.ux.ApprovalProcess",
    //xtype 运行时组件
    xtype: "vmd.ux.ApprovalProcess",
    xcls: "vmd.ux.ApprovalProcess",
    //为了拖拽能自动生成递增id
    defaultName: "ApprovalProcess",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"containerWidth":1020,"containerHeight":400,"layout":"fit"},
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
     ,{"name":"containerWidth","group":"设计","ctype":"number","editor":"number"},{"name":"containerHeight","group":"设计","ctype":"number","editor":"number"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ApprovalProcess"]);
    xds.Registry.addUserType(xds["vmd.ux.ApprovalProcess"]);

    var Data_vmd_ux_ApprovalProcess={"BaseType":"Control","Type":"vmd_ux_ApprovalProcess","Property":{"containerWidth":{"Description":"容器宽度","Prototype":"","Args":{"_Return_":""},"Example":""},"containerHeight":{"Description":"容器高度","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"sendParams":{"Description":"sendParams","Prototype":"sendParams(businesskey,flowinstid)","Args":{"_Return_":"无","Args":"businesskey,flowinstid"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_ApprovalProcess)