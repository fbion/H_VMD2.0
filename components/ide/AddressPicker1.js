xds["vmd.ux.AddressPicker1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.AddressPicker1",
    category: "vmd复合组件",
    text: "AddressPicker1",//中文
    naming:"addresspicker1",
    //dtype 设计时组件
    dtype: "vmd.ux.AddressPicker1",
    //xtype 运行时组件
    xtype: "vmd.ux.AddressPicker1",
    xcls: "vmd.ux.AddressPicker1",
    //为了拖拽能自动生成递增id
    defaultName:"addresspicker1",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
    xds.Registry.register(xds["vmd.ux.AddressPicker1"]);
    xds.Registry.addUserType(xds["vmd.ux.AddressPicker1"]);

    var Data_vmd_ux_AddressPicker1={"BaseType":"Control","Type":"vmd_ux_AddressPicker1","Property":{},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_AddressPicker1)