xds["vmd.ux.Checkbox"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Checkbox",
    category: "vmd复合组件",
    text: "Checkbox",//中文
    naming: "Checkbox",
    //dtype 设计时组件
    dtype: "vmd.ux.Checkbox",
    //xtype 运行时组件
    xtype: "vmd.ux.Checkbox",
    xcls: "vmd.ux.Checkbox",
    //为了拖拽能自动生成递增id
    defaultName: "Checkbox",
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
     ,{"name":"label","group":"设计","ctype":"string"},{"name":"type","group":"设计","ctype":"string","editor":"combo","options":[{"text":"默认","value":"toggle"},{"text":"checkbox","value":" "},{"text":"radio","value":"radio"},{"text":"slider","value":"slider"}]},{"name":"ischecked","group":"设计","ctype":"boolean"},{"name":"onChecked","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"onUnchecked","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Checkbox"]);
    xds.Registry.addUserType(xds["vmd.ux.Checkbox"]);

    var Data_vmd_ux_Checkbox={"BaseType":"Control","Type":"vmd_ux_Checkbox","Property":{"label":{"Description":"label","Prototype":"","Args":{"_Return_":""},"Example":""},"type":{"Description":"复选框类型","Prototype":"","Args":{"_Return_":""},"Example":""},"ischecked":{"Description":"ischecked","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"setType":{"Description":"setType","Prototype":"setType(type)","Args":{"_Return_":"void","Args":"type"},"Example":""}},"Event":{"onChecked":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"onUnchecked":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Checkbox)