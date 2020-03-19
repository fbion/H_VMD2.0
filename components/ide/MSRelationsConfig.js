xds["vmd.ux.MSRelationsConfig"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.MSRelationsConfig",
    category: "vmd复合组件",
    text: "MSRelationsConfig",//中文
    naming: "hwMSRelationsConfig",
    //dtype 设计时组件
    dtype: "vmd.ux.MSRelationsConfig",
    //xtype 运行时组件
    xtype: "vmd.ux.MSRelationsConfig",
    xcls: "vmd.ux.MSRelationsConfig",
    //为了拖拽能自动生成递增id
    defaultName: "hwMSRelationsConfig",
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
     ,{"name":"removeRelation","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"sizechange","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.MSRelationsConfig"]);
    xds.Registry.addUserType(xds["vmd.ux.MSRelationsConfig"]);

    var Data_vmd_ux_MSRelationsConfig={"BaseType":"Control","Type":"vmd_ux_MSRelationsConfig","Property":{},"Method":{"initRelation":{"Description":"主表对象、从表对象","Prototype":"initRelation(mstore,sstore)","Args":{"_Return_":"void","Args":"mstore,sstore"},"Example":"主表对象、从表对象"},"getMSRelationInfo":{"Description":"getMSRelationInfo","Prototype":"getMSRelationInfo()","Args":{"_Return_":"void","Args":""},"Example":""},"getSstore":{"Description":"getSstore","Prototype":"getSstore()","Args":{"_Return_":"void","Args":""},"Example":""},"openstate":{"Description":"openstate","Prototype":"openstate()","Args":{"_Return_":"void","Args":""},"Example":""},"setTitle":{"Description":"setTitle","Prototype":"setTitle(title)","Args":{"_Return_":"void","Args":"title"},"Example":""}},"Event":{"removeRelation":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"sizechange":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_MSRelationsConfig)