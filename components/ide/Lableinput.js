xds["vmd.ux.Lableinput"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Lableinput",
    category: "vmd复合组件",
    text: "Lableinput",//中文
    naming: "hwLableinput",
    //dtype 设计时组件
    dtype: "vmd.ux.Lableinput",
    //xtype 运行时组件
    xtype: "vmd.ux.Lableinput",
    xcls: "vmd.ux.Lableinput",
    //为了拖拽能自动生成递增id
    defaultName: "hwLableinput",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"enddate":"Y-m-d","readyonly":"住址不能为空","layout":"absolute"},
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
     ,{"name":"startdate","group":"设计","ctype":"string","editor":"string"},{"name":"enddate","group":"设计","ctype":"string","editor":"string"},{"name":"readyonly","group":"设计","ctype":"string","editor":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Lableinput"]);
    xds.Registry.addUserType(xds["vmd.ux.Lableinput"]);

    var Data_vmd_ux_Lableinput={"BaseType":"Control","Type":"vmd_ux_Lableinput","Property":{"startdate":{"Description":"开始日期","Prototype":"","Args":{"_Return_":""},"Example":"开始日期","Name":""},"enddate":{"Description":"结束日期","Prototype":"","Args":{"_Return_":""},"Example":"结束日期","Name":""},"readyonly":{"Description":"只读","Prototype":"","Args":{"_Return_":""},"Example":"只读","Name":"只读"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Lableinput)