xds["vmd.ux.TabProjectInfo"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TabProjectInfo",
    category: "vmd复合组件",
    text: "TabProjectInfo",//中文
    naming: "hwTabProjectInfo",
    //dtype 设计时组件
    dtype: "vmd.ux.TabProjectInfo",
    //xtype 运行时组件
    xtype: "vmd.ux.TabProjectInfo",
    xcls: "vmd.ux.TabProjectInfo",
    //为了拖拽能自动生成递增id
    defaultName: "hwTabProjectInfo",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
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
    xds.Registry.register(xds["vmd.ux.TabProjectInfo"]);
    xds.Registry.addUserType(xds["vmd.ux.TabProjectInfo"]);

    var Data_vmd_ux_TabProjectInfo={"BaseType":"Control","Type":"vmd_ux_TabProjectInfo","Property":{},"Method":{"iSaveData":{"Description":"保存数据接口，保存基本信息、工作流、数据服务的Tab页的信息。","Prototype":"iSaveData(callback)","Args":{"_Return_":"无","Args":"callback"},"Example":"保存数据接口，保存基本信息、工作流、数据服务的Tab页的信息。"},"iSetId":{"Description":"设置工区、项目的ID","Prototype":"iSetId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区、项目的ID"},"iGetName":{"Description":"获取名称","Prototype":"iGetName()","Args":{"_Return_":"字符串","Args":""},"Example":"获取名称"},"iSetIfDataLoaded":{"Description":"设置是否已加载","Prototype":"iSetIfDataLoaded(bVar)","Args":{"_Return_":"无","Args":"bVar"},"Example":"设置是否已加载"},"iSetWorkSpaceId":{"Description":"设置工区id","Prototype":"iSetWorkSpaceId(id)","Args":{"_Return_":"无","Args":"id"},"Example":"设置工区id"},"getRegInfo_PtType":{"Description":"getRegInfo_PtType","Prototype":"getRegInfo_PtType()","Args":{"_Return_":"字符串","Args":""},"Example":""},"hideTab":{"Description":"hideTab","Prototype":"hideTab(index)","Args":{"_Return_":"void","Args":"index"},"Example":""},"getRegInfo_ptdb":{"Description":"getRegInfo_ptdb","Prototype":"getRegInfo_ptdb(ptdb)","Args":{"_Return_":"void","Args":"ptdb"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_TabProjectInfo)