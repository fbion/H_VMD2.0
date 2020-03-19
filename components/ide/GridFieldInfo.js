xds["vmd.ux.GridFieldInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.GridFieldInfo",
    category: "vmd复合组件",
    text: "GridFieldInfo",//中文
    naming: "hwGridFieldInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.GridFieldInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.GridFieldInfo",
    xcls: "vmd.ux.GridFieldInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwGridFieldInfo",
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
    xds.Registry.register(xds["vmd.ux.GridFieldInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.GridFieldInfo"]);

    var Data_vmd_ux_GridFieldInfo={"BaseType":"Control","Type":"vmd_ux_GridFieldInfo","Property":{},"Method":{"setFileInfo":{"Description":"setFileInfo","Prototype":"setFileInfo(fileInfo)","Args":{"_Return_":"void","Args":"fileInfo"},"Example":""},"setFieldsInfo":{"Description":"setFieldsInfo","Prototype":"setFieldsInfo(fieldsInfo,selNum)","Args":{"_Return_":"void","Args":"fieldsInfo,selNum"},"Example":""},"getFiledInfo":{"Description":"getFiledInfo","Prototype":"getFiledInfo()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_GridFieldInfo)