xds["vmd.ux.GridType1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.GridType1",
    category: "vmd复合组件",
    text: "GridType1",//中文
    naming:"gridtype1",
    //dtype 设计时组件
    dtype: "vmd.ux.GridType1",
    //xtype 运行时组件
    xtype: "vmd.ux.GridType1",
    xcls: "vmd.ux.GridType1",
    //为了拖拽能自动生成递增id
    defaultName:"gridtype1",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/gridtype/1.0/css/icons.css"],
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
     ,{"name":"copyGridToForm","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"compareDataSet","group":"事件","ctype":"string","editor":"ace","params":"sender,value"},{"name":"settingChangeEvents","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.GridType1"]);
    xds.Registry.addUserType(xds["vmd.ux.GridType1"]);

    var Data_vmd_ux_GridType1={"BaseType":"Control","Type":"vmd_ux_GridType1","Property":{},"Method":{"serialize":{"Description":"serialize","Prototype":"serialize(info)","Args":{"_Return_":"void","Args":"info"},"Example":""},"setInfo":{"Description":"setInfo","Prototype":"setInfo(info)","Args":{"_Return_":"void","Args":"info"},"Example":""},"initDefault":{"Description":"initDefault","Prototype":"initDefault()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"copyGridToForm":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"compareDataSet":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"settingChangeEvents":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_GridType1)