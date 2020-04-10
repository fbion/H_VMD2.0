xds["vmd.ux.CheckCombo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.CheckCombo",
    category: "vmd复合组件",
    text: "CheckCombo",//中文
    naming: "hwCheckCombo",
    //dtype 设计时组件
    dtype: "vmd.ux.CheckCombo",
    //xtype 运行时组件
    xtype: "vmd.ux.CheckCombo",
    xcls: "vmd.ux.CheckCombo",
    //为了拖拽能自动生成递增id
    defaultName: "hwCheckCombo",
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
     ,{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"value,text"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.CheckCombo"]);
    xds.Registry.addUserType(xds["vmd.ux.CheckCombo"]);

    var Data_vmd_ux_CheckCombo={"BaseType":"Control","Type":"vmd_ux_CheckCombo","Property":{},"Method":{"loadData":{"Description":"加载数据","Prototype":"loadData(data)","Args":{"_Return_":"void","Args":"data"},"Example":"加载数据"},"getValue":{"Description":"getValue","Prototype":"getValue()","Args":{"_Return_":"void","Args":""},"Example":""},"setValue":{"Description":"字符串格式，多个用逗号隔开","Prototype":"setValue(idStr)","Args":{"_Return_":"void","Args":"idStr"},"Example":"字符串格式，多个用逗号隔开"}},"Event":{"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_CheckCombo)