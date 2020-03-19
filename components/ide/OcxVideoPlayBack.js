xds["vmd.ux.OcxVideoPlayBack"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.OcxVideoPlayBack",
    category: "vmd复合组件",
    text: "OcxVideoPlayBack",//中文
    naming: "OcxVideoPlayBack",
    //dtype 设计时组件
    dtype: "vmd.ux.OcxVideoPlayBack",
    //xtype 运行时组件
    xtype: "vmd.ux.OcxVideoPlayBack",
    xcls: "vmd.ux.OcxVideoPlayBack",
    //为了拖拽能自动生成递增id
    defaultName: "OcxVideoPlayBack",
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
    xds.Registry.register(xds["vmd.ux.OcxVideoPlayBack"]);
    xds.Registry.addUserType(xds["vmd.ux.OcxVideoPlayBack"]);

    var Data_vmd_ux_OcxVideoPlayBack={"BaseType":"Control","Type":"vmd_ux_OcxVideoPlayBack","Property":{},"Method":{"get_val":{"Description":"sign:标识是从主页面进入的就为空，如果从轮播进入的就是lb","Prototype":"get_val(tree_nodes,buju,suoding,iszd,type,sign)","Args":{"_Return_":"void","Args":"tree_nodes,buju,suoding,iszd,type,sign"},"Example":"sign:标识是从主页面进入的就为空，如果从轮播进入的就是lb"},"get_lunbo_val":{"Description":"树节点、布局、锁定、是否是重点：1重点  0导航、重点下边的类别、标识：主页面进入还是轮播页面进入、轮播时间","Prototype":"get_lunbo_val(tree_nodes,buju,suoding,iszd,type,sign,lunbotime)","Args":{"_Return_":"void","Args":"tree_nodes,buju,suoding,iszd,type,sign,lunbotime"},"Example":"树节点、布局、锁定、是否是重点：1重点  0导航、重点下边的类别、标识：主页面进入还是轮播页面进入、轮播时间"},"get_shipinhuifang_val":{"Description":"树节点、布局、标识：主页面进入、轮播页面进入、回放页面进入","Prototype":"get_shipinhuifang_val(tree_nodes,buju,iszd,type)","Args":{"_Return_":"void","Args":"tree_nodes,buju,iszd,type"},"Example":"树节点、布局、标识：主页面进入、轮播页面进入、回放页面进入"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_OcxVideoPlayBack)