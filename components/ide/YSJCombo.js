xds["vmd.ux.YSJCombo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.YSJCombo",
    category: "vmd复合组件",
    text: "YSJCombo",//中文
    naming: "hwYSJCombo",
    //dtype 设计时组件
    dtype: "vmd.ux.YSJCombo",
    //xtype 运行时组件
    xtype: "vmd.ux.YSJCombo",
    xcls: "vmd.ux.YSJCombo",
    //为了拖拽能自动生成递增id
    defaultName: "hwYSJCombo",
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
     ,{"name":"store1","group":"油井","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"store1_displayField","group":"油井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store1"}},{"name":"store1_valueFiled","group":"油井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store1"}},{"name":"store2","group":"水井","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"store2_valueField","group":"水井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store2"}},{"name":"store2_displayField","group":"水井","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store2"}},{"name":"flselect","group":"设计","ctype":"string","editor":"combo","options":[{"text":"上海","value":"shanghai"},{"text":"北京","value":"beijing"}]},{"name":"yjonchange","group":"事件","ctype":"string","editor":"ace","params":"name1,name2"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.YSJCombo"]);
    xds.Registry.addUserType(xds["vmd.ux.YSJCombo"]);

    var Data_vmd_ux_YSJCombo={"BaseType":"Control","Type":"vmd_ux_YSJCombo","Property":{"store1":{"Description":"油井数据集","Prototype":"","Args":{"_Return_":""},"Example":"油井数据集","Name":"油井数据集"},"store1_displayField":{"Description":"油井显示字段","Prototype":"","Args":{"_Return_":""},"Example":"油井显示字段","Name":"油井显示字段"},"store1_valueFiled":{"Description":"油井值字段","Prototype":"","Args":{"_Return_":""},"Example":"油井值字段","Name":"油井值字段"},"store2":{"Description":"水井数据集","Prototype":"","Args":{"_Return_":""},"Example":"水井数据集","Name":"水井数据集"},"store2_valueField":{"Description":"store2_valueField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"store2_displayField":{"Description":"store2_displayField","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"flselect":{"Description":"附录选择","Prototype":"","Args":{"_Return_":""},"Example":"附录选择","Name":"附录选择"}},"Method":{"setName":{"Description":"setName","Prototype":"setName(name1,name2)","Args":{"_Return_":"void","Args":"name1,name2"},"Example":""},"getName":{"Description":"getName","Prototype":"getName()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"yjonchange":{"Prototype":"","Args":{"_Return_":""},"Example":"油水井值改变事件"}}}
	ControlsDataManage._add(Data_vmd_ux_YSJCombo)