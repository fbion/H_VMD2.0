xds["vmd.ux.Department_personnel"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Department_personnel",
    category: "vmd复合组件",
    text: "Department_personnel",//中文
    naming: "hwDepartment_personnel",
    //dtype 设计时组件
    dtype: "vmd.ux.Department_personnel",
    //xtype 运行时组件
    xtype: "vmd.ux.Department_personnel",
    xcls: "vmd.ux.Department_personnel",
    //为了拖拽能自动生成递增id
    defaultName: "hwDepartment_personnel",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"label1Text":"单位:","label2Text":"人员:","layout":"hbox"},
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
     ,{"name":"label1Text","group":"设计","ctype":"string","editor":"string"},{"name":"label2Text","group":"设计","ctype":"string","editor":"string"},{"name":"combo2store","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"combo2DisplayField","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"combo2store"}},{"name":"combo2ValueField","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"combo2store"}},{"name":"readOnly","group":"设计","ctype":"boolean"},{"name":"combo1store","group":"下拉1","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"combo1DisplayField","group":"下拉1","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"combo1store"}},{"name":"combo1ValueField","group":"下拉1","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"combo1store"}},{"name":"comList1SelChange","group":"事件","ctype":"string","editor":"ace","params":"value,text"},{"name":"comList2SelChange","group":"事件","ctype":"string","editor":"ace","params":"value,text"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Department_personnel"]);
    xds.Registry.addUserType(xds["vmd.ux.Department_personnel"]);

    var Data_vmd_ux_Department_personnel={"BaseType":"Control","Type":"vmd_ux_Department_personnel","Property":{"label1Text":{"Description":"label1文本","Prototype":"","Args":{"_Return_":""},"Example":""},"label2Text":{"Description":"label2文本","Prototype":"","Args":{"_Return_":""},"Example":""},"combo2store":{"Description":"人员store","Prototype":"","Args":{"_Return_":""},"Example":""},"combo2DisplayField":{"Description":"combo2DisplayField","Prototype":"","Args":{"_Return_":""},"Example":""},"combo2ValueField":{"Description":"combo2ValueField","Prototype":"","Args":{"_Return_":""},"Example":""},"readOnly":{"Description":"只读","Prototype":"","Args":{"_Return_":""},"Example":""},"combo1store":{"Description":"单位store","Prototype":"","Args":{"_Return_":""},"Example":""},"combo1DisplayField":{"Description":"combo1DisplayField","Prototype":"","Args":{"_Return_":""},"Example":""},"combo1ValueField":{"Description":"combo1ValueField","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"setLabel1text":{"Description":"setLabel1text","Prototype":"setLabel1text(value)","Args":{"_Return_":"void","Args":"value"},"Example":""},"setLabel2Text":{"Description":"setLabel2Text","Prototype":"setLabel2Text(value)","Args":{"_Return_":"void","Args":"value"},"Example":""},"getComList1SelValue":{"Description":"getComList1SelValue","Prototype":"getComList1SelValue()","Args":{"_Return_":"void","Args":""},"Example":""},"getComList2SelValue":{"Description":"getComList2SelValue","Prototype":"getComList2SelValue()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"comList1SelChange":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"comList2SelChange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Department_personnel)