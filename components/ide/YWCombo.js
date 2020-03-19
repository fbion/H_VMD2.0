xds["vmd.ux.YWCombo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.YWCombo",
    category: "vmd复合组件",
    text: "YWCombo",//中文
    naming: "hwYWCombo",
    //dtype 设计时组件
    dtype: "vmd.ux.YWCombo",
    //xtype 运行时组件
    xtype: "vmd.ux.YWCombo",
    xcls: "vmd.ux.YWCombo",
    //为了拖拽能自动生成递增id
    defaultName: "hwYWCombo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
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
     ,{"name":"store","group":"油井","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"valueField","group":"油井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"displayField","group":"油井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"store2","group":"水井","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"sotre2_valueField","group":"水井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store2"}},{"name":"store2_displayField","group":"水井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store2"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.YWCombo"]);
    xds.Registry.addUserType(xds["vmd.ux.YWCombo"]);

    var Data_vmd_ux_YWCombo={"BaseType":"Control","Type":"vmd_ux_YWCombo","Property":{"store":{"Description":"油井store","Prototype":"","Args":{"_Return_":""},"Example":"数据集","Name":"油井store"},"valueField":{"Description":"值字段","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"值字段"},"displayField":{"Description":"显示字段","Prototype":"","Args":{"_Return_":""},"Example":"显示字段","Name":"显示字段"},"store2":{"Description":"水井store","Prototype":"","Args":{"_Return_":""},"Example":"水井store","Name":"水井store"},"sotre2_valueField":{"Description":"sotre2_valueField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"store2_displayField":{"Description":"store2_displayField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_YWCombo)