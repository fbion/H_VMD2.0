xds["vmd.ux.GridvirtualCol"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.GridvirtualCol",
    category: "vmd复合组件",
    text: "GridvirtualCol",//中文
    naming: "hwGridvirtualCol",
    //dtype 设计时组件
    dtype: "vmd.ux.GridvirtualCol",
    //xtype 运行时组件
    xtype: "vmd.ux.GridvirtualCol",
    xcls: "vmd.ux.GridvirtualCol",
    //为了拖拽能自动生成递增id
    defaultName: "hwGridvirtualCol",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
    xds.Registry.register(xds["vmd.ux.GridvirtualCol"]);
    xds.Registry.addUserType(xds["vmd.ux.GridvirtualCol"]);

    var Data_vmd_ux_GridvirtualCol={"BaseType":"Control","Type":"vmd_ux_GridvirtualCol","Property":{},"Method":{"setFileInfo":{"Description":"setFileInfo","Prototype":"setFileInfo(fileInfo)","Args":{"_Return_":"void","Args":"fileInfo"},"Example":""},"getFiledInfo":{"Description":"getFiledInfo","Prototype":"getFiledInfo()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_GridvirtualCol)