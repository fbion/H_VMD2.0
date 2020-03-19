xds["vmd.ux.DataBase_Information"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DataBase_Information",
    category: "vmd复合组件",
    text: "DataBase_Information",//中文
    naming: "hwDataBase_Information",
    //dtype 设计时组件
    dtype: "vmd.ux.DataBase_Information",
    //xtype 运行时组件
    xtype: "vmd.ux.DataBase_Information",
    xcls: "vmd.ux.DataBase_Information",
    //为了拖拽能自动生成递增id
    defaultName: "hwDataBase_Information",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["lib/laydate/theme/default/laydate.css"],
    requireJs: ["lib/laydate/laydate.src.js"],
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
     ,{"name":"lxValueField","group":"DataStore","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"lxDisplayField","group":"DataStore","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"store","group":"DataStore","ctype":"string","editor":"options","edConfig":{"type":"store"}}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DataBase_Information"]);
    xds.Registry.addUserType(xds["vmd.ux.DataBase_Information"]);

    var Data_vmd_ux_DataBase_Information={"BaseType":"Control","Type":"vmd_ux_DataBase_Information","Property":{"lxValueField":{"Description":"lxValueField","Prototype":"","Args":{"_Return_":""},"Example":"lxValueField","Name":""},"lxDisplayField":{"Description":"lxDisplayField","Prototype":"","Args":{"_Return_":""},"Example":"lxDisplayField","Name":""},"store":{"Description":"lxstore","Prototype":"","Args":{"_Return_":""},"Example":"lxstore","Name":""}},"Method":{"refreshData":{"Description":"refreshData","Prototype":"refreshData(data)","Args":{"_Return_":"void","Args":"data"},"Example":""},"refreshSJK":{"Description":"refreshSJK","Prototype":"refreshSJK(data,version_num)","Args":{"_Return_":"void","Args":"data,version_num"},"Example":""},"editable":{"Description":"控制组件是否可编辑","Prototype":"editable(mold)","Args":{"_Return_":"void","Args":"mold"},"Example":"控制组件是否可编辑"}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_DataBase_Information)