xds["vmd.ux.Tiaijian"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Tiaijian",
    category: "vmd复合组件",
    text: "Tiaijian",//中文
    naming: "Tiaijian",
    //dtype 设计时组件
    dtype: "vmd.ux.Tiaijian",
    //xtype 运行时组件
    xtype: "vmd.ux.Tiaijian",
    xcls: "vmd.ux.Tiaijian",
    //为了拖拽能自动生成递增id
    defaultName: "Tiaijian",
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
     ,{"name":"chaxun","group":"事件","ctype":"string","editor":"ace","params":"rq1,rq2"},{"name":"daochu","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"center"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.Tiaijian"]);
    xds.Registry.addUserType(xds["vmd.ux.Tiaijian"]);

    var Data_vmd_ux_Tiaijian={"BaseType":"Control","Type":"vmd_ux_Tiaijian","Property":{},"Method":{"getrq1":{"Description":"getrq1","Prototype":"getrq1()","Args":{"_Return_":"void","Args":""},"Example":""},"getrq2":{"Description":"getrq2","Prototype":"getrq2()","Args":{"_Return_":"void","Args":""},"Example":""},"setrq1":{"Description":"setrq1","Prototype":"setrq1(p_Rq1)","Args":{"_Return_":"无","Args":"p_Rq1"},"Example":""},"setrq2":{"Description":"setrq2","Prototype":"setrq2(p_Rq2)","Args":{"_Return_":"无","Args":"p_Rq2"},"Example":""}},"Event":{"chaxun":{"Prototype":"","Args":{"_Return_":""},"Example":"查询事件"},"daochu":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_Tiaijian)