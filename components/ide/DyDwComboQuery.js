xds["vmd.ux.DyDwComboQuery"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DyDwComboQuery",
    category: "vmd复合组件",
    text: "DyDwComboQuery",//中文
    naming: "DyDwComboQuery",
    //dtype 设计时组件
    dtype: "vmd.ux.DyDwComboQuery",
    //xtype 运行时组件
    xtype: "vmd.ux.DyDwComboQuery",
    xcls: "vmd.ux.DyDwComboQuery",
    //为了拖拽能自动生成递增id
    defaultName: "DyDwComboQuery",
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
     ,{"name":"dyTreeStore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"dyTreeParentField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"dyTreeValueField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"dyTreeTextField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"dyTreeLoadType","group":"设计","ctype":"string","editor":"options","options":["分级加载","全部加载"]},{"name":"dwTreeStore","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"dwTreeParentField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"dwTreeValueField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"dwTreeTextField","group":"设计","ctype":"string","editor":"options","edConfig":{"editable":true,"forceSelection":false,"type":"storeField","cname":"store"}},{"name":"dwTreeLoadType","group":"设计","ctype":"string","editor":"options","options":["分级加载","全部加载"]}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"pack":"center","align":"middle"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DyDwComboQuery"]);
    xds.Registry.addUserType(xds["vmd.ux.DyDwComboQuery"]);

    var Data_vmd_ux_DyDwComboQuery={"BaseType":"Control","Type":"vmd_ux_DyDwComboQuery","Property":{"dyTreeStore":{"Description":"绑定单元树数据集","Prototype":"","Args":{"_Return_":""},"Example":"绑定单元树数据集"},"dyTreeParentField":{"Description":"dyTreeParentField","Prototype":"","Args":{"_Return_":""},"Example":""},"dyTreeValueField":{"Description":"dyTreeValueField","Prototype":"","Args":{"_Return_":""},"Example":""},"dyTreeTextField":{"Description":"dyTreeTextField","Prototype":"","Args":{"_Return_":""},"Example":""},"dyTreeLoadType":{"Description":"dyTreeLoadType","Prototype":"","Args":{"_Return_":""},"Example":""},"dwTreeStore":{"Description":"绑定单位树数据集","Prototype":"","Args":{"_Return_":""},"Example":"绑定单位树数据集"},"dwTreeParentField":{"Description":"dwTreeParentField","Prototype":"","Args":{"_Return_":""},"Example":""},"dwTreeValueField":{"Description":"dwTreeValueField","Prototype":"","Args":{"_Return_":""},"Example":""},"dwTreeTextField":{"Description":"dwTreeTextField","Prototype":"","Args":{"_Return_":""},"Example":""},"dwTreeLoadType":{"Description":"dwTreeLoadType","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DyDwComboQuery)