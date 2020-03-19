xds["vmd.ux.TabComponents"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TabComponents",
    category: "vmd复合组件",
    text: "TabComponents",//中文
    naming: "TabComponents",
    //dtype 设计时组件
    dtype: "vmd.ux.TabComponents",
    //xtype 运行时组件
    xtype: "vmd.ux.TabComponents",
    xcls: "vmd.ux.TabComponents",
    //为了拖拽能自动生成递增id
    defaultName: "TabComponents",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"tabText":"Tab1","tab2Text":"Tab2","overflow":true,"layout":"absolute"},
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
     ,{"name":"tabText","group":"设计","ctype":"string","editor":"string"},{"name":"tab2Text","group":"设计","ctype":"string","editor":"string"},{"name":"overflow","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"credBtn","group":"设计","ctype":"boolean"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.TabComponents"]);
    xds.Registry.addUserType(xds["vmd.ux.TabComponents"]);

    var Data_vmd_ux_TabComponents={"BaseType":"Control","Type":"vmd_ux_TabComponents","Property":{"tabText":{"Description":"页签名称文本","Prototype":"","Args":{"_Return_":""},"Example":"页签名称文本\n"},"tab2Text":{"Description":"页签2文本","Prototype":"","Args":{"_Return_":""},"Example":"页签2文本"},"overflow":{"Description":"是否有滚动条","Prototype":"","Args":{"_Return_":""},"Example":"是否有滚动条"},"credBtn":{"Description":"自定义按钮","Prototype":"","Args":{"_Return_":""},"Example":"自定义按钮"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TabComponents)