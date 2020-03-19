xds["vmd.ux.OcxVideoContent"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.OcxVideoContent",
    category: "vmd复合组件",
    text: "OcxVideoContent",//中文
    naming: "OcxVideoContent",
    //dtype 设计时组件
    dtype: "vmd.ux.OcxVideoContent",
    //xtype 运行时组件
    xtype: "vmd.ux.OcxVideoContent",
    xcls: "vmd.ux.OcxVideoContent",
    //为了拖拽能自动生成递增id
    defaultName: "OcxVideoContent",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
    xds.Registry.register(xds["vmd.ux.OcxVideoContent"]);
    xds.Registry.addUserType(xds["vmd.ux.OcxVideoContent"]);

    var Data_vmd_ux_OcxVideoContent={"BaseType":"Control","Type":"vmd_ux_OcxVideoContent","Property":{},"Method":{"get_val":{"Description":"sign:标识是从主页面进入的就为空，如果从轮播进入的就是lb","Prototype":"get_val(tree_nodes,buju,suoding,iszd,type,sign,loginName)","Args":{"_Return_":"void","Args":"tree_nodes,buju,suoding,iszd,type,sign,loginName"},"Example":"sign:标识是从主页面进入的就为空，如果从轮播进入的就是lb"},"get_lunbo_val":{"Description":"树节点、布局、锁定、是否是重点：1重点  0导航、重点下边的类别、标识：主页面进入还是轮播页面进入、轮播时间","Prototype":"get_lunbo_val(tree_nodes,buju,suoding,iszd,type,sign,lunbotime,loginName)","Args":{"_Return_":"void","Args":"tree_nodes,buju,suoding,iszd,type,sign,lunbotime,loginName"},"Example":"树节点、布局、锁定、是否是重点：1重点  0导航、重点下边的类别、标识：主页面进入还是轮播页面进入、轮播时间"},"initVideo":{"Description":"initVideo","Prototype":"initVideo()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_OcxVideoContent)