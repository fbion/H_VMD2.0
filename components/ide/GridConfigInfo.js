xds["vmd.ux.GridConfigInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.GridConfigInfo",
    category: "vmd复合组件",
    text: "GridConfigInfo",//中文
    naming: "hwGridConfigInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.GridConfigInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.GridConfigInfo",
    xcls: "vmd.ux.GridConfigInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwGridConfigInfo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"anchor"},
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
    xds.Registry.register(xds["vmd.ux.GridConfigInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.GridConfigInfo"]);

    var Data_vmd_ux_GridConfigInfo={"BaseType":"Control","Type":"vmd_ux_GridConfigInfo","Property":{},"Method":{"setValue":{"Description":"setValue","Prototype":"setValue()","Args":{"_Return_":"void","Args":""},"Example":""},"serialize":{"Description":"serialize","Prototype":"serialize()","Args":{"_Return_":"void","Args":""},"Example":""},"save":{"Description":"save","Prototype":"save(activeCmp)","Args":{"_Return_":"void","Args":"activeCmp"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_GridConfigInfo)