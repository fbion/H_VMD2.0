xds["vmd.ux.DutyScheduleRule"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DutyScheduleRule",
    category: "vmd复合组件",
    text: "DutyScheduleRule",//中文
    naming: "DutyScheduleRule",
    //dtype 设计时组件
    dtype: "vmd.ux.DutyScheduleRule",
    //xtype 运行时组件
    xtype: "vmd.ux.DutyScheduleRule",
    xcls: "vmd.ux.DutyScheduleRule",
    //为了拖拽能自动生成递增id
    defaultName: "DutyScheduleRule",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DutyScheduleRule"]);
    xds.Registry.addUserType(xds["vmd.ux.DutyScheduleRule"]);

    var Data_vmd_ux_DutyScheduleRule={"BaseType":"Control","Type":"vmd_ux_DutyScheduleRule","Property":{},"Method":{"getData":{"Description":"获取数据","Prototype":"getData()","Args":{"_Return_":"对象","Args":""},"Example":"获取数据"},"generateClass":{"Description":"生成默认班次","Prototype":"generateClass(num)","Args":{"_Return_":"无","Args":"num"},"Example":"生成默认班次"},"generateCrew":{"Description":"生成默认班组","Prototype":"generateCrew(num)","Args":{"_Return_":"无","Args":"num"},"Example":"生成默认班组"},"loadData":{"Description":"加载数据","Prototype":"loadData(data)","Args":{"_Return_":"无","Args":"data"},"Example":"加载数据"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DutyScheduleRule)