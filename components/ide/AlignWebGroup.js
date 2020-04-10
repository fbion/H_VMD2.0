xds["vmd.ux.AlignWebGroup"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AlignWebGroup",
    category: "vmd复合组件",
    text: "AlignWebGroup",//中文
    naming: "hwAlignWebGroup",
    //dtype 设计时组件
    dtype: "vmd.ux.AlignWebGroup",
    //xtype 运行时组件
    xtype: "vmd.ux.AlignWebGroup",
    xcls: "vmd.ux.AlignWebGroup",
    //为了拖拽能自动生成递增id
    defaultName: "hwAlignWebGroup",
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
     ,{"name":"hidenCenter","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"selectIndex"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.AlignWebGroup"]);
    xds.Registry.addUserType(xds["vmd.ux.AlignWebGroup"]);

    var Data_vmd_ux_AlignWebGroup={"BaseType":"Control","Type":"vmd_ux_AlignWebGroup","Property":{"hidenCenter":{"Description":"隐藏水平居中","Prototype":"","Args":{"_Return_":""},"Example":"隐藏水平居中","Name":"隐藏水平居中"}},"Method":{"getValue":{"Description":"获取对齐方式","Prototype":"getValue()","Args":{"_Return_":"对象","Args":""},"Example":"获取对齐方式"},"setValue":{"Description":"设置对齐方式","Prototype":"setValue(align)","Args":{"_Return_":"void","Args":"align"},"Example":"设置对齐方式"}},"Event":{"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"水平居中点击事件"}}}
	ControlsDataManage._add(Data_vmd_ux_AlignWebGroup)