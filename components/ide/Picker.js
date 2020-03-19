xds["vmd.ux.Picker"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Picker",
    category: "vmd复合组件",
    text: "Picker",//中文
    naming: "hwPicker",
    //dtype 设计时组件
    dtype: "vmd.ux.Picker",
    //xtype 运行时组件
    xtype: "vmd.ux.Picker",
    xcls: "vmd.ux.Picker",
    //为了拖拽能自动生成递增id
    defaultName: "hwPicker",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"detailWidth":200,"comboWidth":300,"pickerWidth":510,"detailX":310,"detailEmptyText":"请输入详细地址信息","layout":"absolute"},
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
     ,{"name":"detailWidth","group":"设计","ctype":"number","editor":"number"},{"name":"comboWidth","group":"设计","ctype":"number","editor":"number"},{"name":"pickerWidth","group":"设计","ctype":"number","editor":"number"},{"name":"detailX","group":"设计","ctype":"number","editor":"number"},{"name":"detailEmptyText","group":"设计","ctype":"string","editor":"string"},{"name":"proWidth","group":"设计","ctype":"string"},{"name":"detailkeyup","group":"事件","ctype":"string","editor":"ace","params":"sender,e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Picker"]);
    xds.Registry.addUserType(xds["vmd.ux.Picker"]);

    var Data_vmd_ux_Picker={"BaseType":"Control","Type":"vmd_ux_Picker","Property":{"detailWidth":{"Description":"详细地址文本框宽度","Prototype":"","Args":{"_Return_":""},"Example":"详细地址文本框宽度"},"comboWidth":{"Description":"下拉框宽度","Prototype":"","Args":{"_Return_":""},"Example":"下拉框宽度"},"pickerWidth":{"Description":"地址选择器宽度","Prototype":"","Args":{"_Return_":""},"Example":"地址选择器宽度"},"detailX":{"Description":"详细地址文本框X坐标","Prototype":"","Args":{"_Return_":""},"Example":"详细地址文本框X坐标"},"detailEmptyText":{"Description":"详细地址文本框占位符","Prototype":"","Args":{"_Return_":""},"Example":"详细地址文本框占位符"},"proWidth":{"Description":"省宽度","Prototype":"","Args":{"_Return_":""},"Example":"省宽度"}},"Method":{"getValue":{"Description":"getValue","Prototype":"getValue(attr)","Args":{"_Return_":"对象","Args":"attr"},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(province_id,city_id,county_id,detail_info)","Args":{"_Return_":"void","Args":"province_id,city_id,county_id,detail_info"},"Example":""},"ff":{"Description":"ff","Prototype":"ff()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"detailkeyup":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Picker)