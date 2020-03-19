xds["vmd.ux.AddressPicker_Test"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AddressPicker_Test",
    category: "vmd复合组件",
    text: "AddressPicker_Test",//中文
    naming: "hwAddressPicker_Test",
    //dtype 设计时组件
    dtype: "vmd.ux.AddressPicker_Test",
    //xtype 运行时组件
    xtype: "vmd.ux.AddressPicker_Test",
    xcls: "vmd.ux.AddressPicker_Test",
    //为了拖拽能自动生成递增id
    defaultName: "hwAddressPicker_Test",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/addresspicker_test/1.0/css/datainput.css"],
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
     ,{"name":"detailWidth","group":"设计","ctype":"number","editor":"number"},{"name":"comboWidth","group":"设计","ctype":"number","editor":"number"},{"name":"pickerWidth","group":"设计","ctype":"number","editor":"number"},{"name":"detailX","group":"设计","ctype":"number","editor":"number"},{"name":"detailEmptyText","group":"设计","ctype":"string","editor":"string"},{"name":"proWidth","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.AddressPicker_Test"]);
    xds.Registry.addUserType(xds["vmd.ux.AddressPicker_Test"]);

    var Data_vmd_ux_AddressPicker_Test={"BaseType":"Control","Type":"vmd_ux_AddressPicker_Test","Property":{"detailWidth":{"Description":"详细地址文本框宽度","Prototype":"","Args":{"_Return_":""},"Example":"详细地址文本框宽度","Name":"详细地址文本框宽度"},"comboWidth":{"Description":"下拉框宽度","Prototype":"","Args":{"_Return_":""},"Example":"下拉框宽度","Name":"下拉框宽度"},"pickerWidth":{"Description":"地址选择器宽度","Prototype":"","Args":{"_Return_":""},"Example":"地址选择器宽度","Name":"地址选择器宽度"},"detailX":{"Description":"详细地址文本框X坐标","Prototype":"","Args":{"_Return_":""},"Example":"详细地址文本框X坐标","Name":"详细地址文本框X坐标"},"detailEmptyText":{"Description":"详细地址文本框占位符","Prototype":"","Args":{"_Return_":""},"Example":"详细地址文本框占位符","Name":"详细地址文本框占位符"},"proWidth":{"Description":"省宽度","Prototype":"","Args":{"_Return_":""},"Example":"省宽度","Name":""}},"Method":{"getValue":{"Description":"getValue","Prototype":"getValue(attr)","Args":{"_Return_":"void","Args":"attr"},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(province_id,city_id,county_id,detail_info)","Args":{"_Return_":"void","Args":"province_id,city_id,county_id,detail_info"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_AddressPicker_Test)