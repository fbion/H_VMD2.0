xds["vmd.ux.Tiaijian1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Tiaijian1",
    category: "vmd复合组件",
    text: "Tiaijian1",//中文
    naming: "Tiaijian1",
    //dtype 设计时组件
    dtype: "vmd.ux.Tiaijian1",
    //xtype 运行时组件
    xtype: "vmd.ux.Tiaijian1",
    xcls: "vmd.ux.Tiaijian1",
    //为了拖拽能自动生成递增id
    defaultName: "Tiaijian1",
    iconCls: "icon-cmp",
    isContainer: false,
   
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
     ,{"name":"chaxun","group":"事件","ctype":"string","editor":"ace","params":"rq"},{"name":"daochu","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Tiaijian1"]);
    xds.Registry.addUserType(xds["vmd.ux.Tiaijian1"]);

    var Data_vmd_ux_Tiaijian1={"BaseType":"Control","Type":"vmd_ux_Tiaijian1","Property":{},"Method":{"getrq":{"Description":"getrq","Prototype":"getrq()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"chaxun":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"查询事件"},"daochu":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Tiaijian1)