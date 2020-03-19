xds["vmd.ux.DataCs1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DataCs1",
    category: "vmd复合组件",
    text: "DataCs1",//中文
    naming: "hwDataCs1",
    //dtype 设计时组件
    dtype: "vmd.ux.DataCs1",
    //xtype 运行时组件
    xtype: "vmd.ux.DataCs1",
    xcls: "vmd.ux.DataCs1",
    //为了拖拽能自动生成递增id
    defaultName: "hwDataCs1",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'chart',
    //默认属性设置
    defaultConfig: {"jdhk":true,"Z1":true,"layout":"border"},
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
     ,{"name":"jdhk","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"Z1","group":"设计","ctype":"boolean","editor":"boolean"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DataCs1"]);
    xds.Registry.addUserType(xds["vmd.ux.DataCs1"]);

    var Data_vmd_ux_DataCs1={"BaseType":"Control","Type":"vmd_ux_DataCs1","Property":{"jdhk":{"Description":"456","Prototype":"","Args":{"_Return_":""},"Example":"456"},"Z1":{"Description":"1","Prototype":"","Args":{"_Return_":""},"Example":"2"}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DataCs1)