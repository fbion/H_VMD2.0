xds["vmd.ux.NumberInput"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NumberInput",
    category: "vmd复合组件",
    text: "NumberInput",//中文
    naming: "hwNumberInput",
    //dtype 设计时组件
    dtype: "vmd.ux.NumberInput",
    //xtype 运行时组件
    xtype: "vmd.ux.NumberInput",
    xcls: "vmd.ux.NumberInput",
    //为了拖拽能自动生成递增id
    defaultName: "hwNumberInput",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     ,{"name":"allowMinus","group":"设计","ctype":"boolean"},{"name":"change","group":"事件","ctype":"string","editor":"ace","params":"value,describe"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.NumberInput"]);
    xds.Registry.addUserType(xds["vmd.ux.NumberInput"]);

    var Data_vmd_ux_NumberInput={"BaseType":"Control","Type":"vmd_ux_NumberInput","Property":{"allowMinus":{"Description":"允许负数","Prototype":"","Args":{"_Return_":""},"Example":"是否允许负数","Name":"允许负数"}},"Method":{"getVlaue":{"Description":"getVlaue","Prototype":"getVlaue()","Args":{"_Return_":"void","Args":""},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(value)","Args":{"_Return_":"void","Args":"value"},"Example":""}},"Event":{"change":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_NumberInput)