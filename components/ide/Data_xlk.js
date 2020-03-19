xds["vmd.ux.Data_xlk"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Data_xlk",
    category: "vmd复合组件",
    text: "Data_xlk",//中文
    naming: "hwData_xlk",
    //dtype 设计时组件
    dtype: "vmd.ux.Data_xlk",
    //xtype 运行时组件
    xtype: "vmd.ux.Data_xlk",
    xcls: "vmd.ux.Data_xlk",
    //为了拖拽能自动生成递增id
    defaultName: "hwData_xlk",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"data_typeSetting_changed","group":"事件","ctype":"string","editor":"ace","params":"type,value"},{"name":"data_dataSet_changed","group":"事件","ctype":"string","editor":"ace","params":"type,value"},{"name":"data_saveFiled_changed","group":"事件","ctype":"string","editor":"ace","params":"type,value"},{"name":"data_myDisplayFiled_changed","group":"事件","ctype":"string","editor":"ace","params":"type,value"},{"name":"data_filterCondition_changed","group":"事件","ctype":"string","editor":"ace","params":"type,value"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Data_xlk"]);
    xds.Registry.addUserType(xds["vmd.ux.Data_xlk"]);

    var Data_vmd_ux_Data_xlk={"BaseType":"Control","Type":"vmd_ux_Data_xlk","Property":{},"Method":{"setInfo":{"Description":"setInfo","Prototype":"setInfo(info,type)","Args":{"_Return_":"void","Args":"info,type"},"Example":""}},"Event":{"data_typeSetting_changed":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"data_dataSet_changed":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"data_saveFiled_changed":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"data_myDisplayFiled_changed":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"data_filterCondition_changed":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Data_xlk)