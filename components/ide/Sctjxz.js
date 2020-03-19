xds["vmd.ux.Sctjxz"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Sctjxz",
    category: "vmd复合组件",
    text: "Sctjxz",//中文
    naming: "Sctjxz",
    //dtype 设计时组件
    dtype: "vmd.ux.Sctjxz",
    //xtype 运行时组件
    xtype: "vmd.ux.Sctjxz",
    xcls: "vmd.ux.Sctjxz",
    //为了拖拽能自动生成递增id
    defaultName: "Sctjxz",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"hbox"},
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
     ,{"name":"jhvalue","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"jhstore"}},{"name":"jhdis","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"jhstore"}},{"name":"jhstore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Sctjxz"]);
    xds.Registry.addUserType(xds["vmd.ux.Sctjxz"]);

    var Data_vmd_ux_Sctjxz={"BaseType":"Control","Type":"vmd_ux_Sctjxz","Property":{"jhvalue":{"Description":"jhvalue","Prototype":"","Args":{"_Return_":""},"Example":""},"jhdis":{"Description":"jhdis","Prototype":"","Args":{"_Return_":""},"Example":""},"jhstore":{"Description":"jhstore","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"getJh":{"Description":"getJh","Prototype":"getJh()","Args":{"_Return_":"字符串","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Sctjxz)