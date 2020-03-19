xds["vmd.ux.DataInputOperateBar"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DataInputOperateBar",
    category: "vmd复合组件",
    text: "DataInputOperateBar",//中文
    naming: "hwDataInputOperateBar",
    //dtype 设计时组件
    dtype: "vmd.ux.DataInputOperateBar",
    //xtype 运行时组件
    xtype: "vmd.ux.DataInputOperateBar",
    xcls: "vmd.ux.DataInputOperateBar",
    //为了拖拽能自动生成递增id
    defaultName: "hwDataInputOperateBar",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"addButtonName":"追加","deleteButtonName":"删除","saveButtonName":"保存","imButtonName":"导数据","layout":"fit"},
    isResizable: function (a, b) {

        return true;
    },
	//属性面板
    
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
     ,{"name":"addDisplay","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"deleteDisplay","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"saveDisplay","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"printDisplay","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"importDisplay","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"addButtonName","group":"设计","ctype":"string","editor":"string"},{"name":"deleteButtonName","group":"设计","ctype":"string","editor":"string"},{"name":"saveButtonName","group":"设计","ctype":"string","editor":"string"},{"name":"imButtonName","group":"设计","ctype":"string","editor":"string"},{"name":"addclick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"deleteclick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"saveclick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"printclick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"importclick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"addmenuclick","group":"事件","ctype":"string","editor":"ace","params":"e,type"},{"name":"deletemenuclick","group":"事件","ctype":"string","editor":"ace","params":"e,type"},{"name":"importmenuclick","group":"事件","ctype":"string","editor":"ace","params":"e,type"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DataInputOperateBar"]);
    xds.Registry.addUserType(xds["vmd.ux.DataInputOperateBar"]);

    var Data_vmd_ux_DataInputOperateBar={"BaseType":"Control","Type":"vmd_ux_DataInputOperateBar","Property":{"addDisplay":{"Description":"addDisplay","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"deleteDisplay":{"Description":"deleteDisplay","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"saveDisplay":{"Description":"saveDisplay","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"printDisplay":{"Description":"printDisplay","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"importDisplay":{"Description":"importDisplay","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""},"addButtonName":{"Description":"追加按钮名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"追加按钮名称"},"deleteButtonName":{"Description":"删除按钮名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"删除按钮名称"},"saveButtonName":{"Description":"保存按钮名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"保存按钮名称"},"imButtonName":{"Description":"导数据按钮名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"导数据按钮名称"}},"Method":{"disableMenu":{"Description":"disableMenu","Prototype":"disableMenu(type)","Args":{"_Return_":"void","Args":"type"},"Example":""},"changeName":{"Description":"changeName","Prototype":"changeName(type,value)","Args":{"_Return_":"void","Args":"type,value"},"Example":""},"showOperateBar":{"Description":"展示指定的操作栏的按钮，默认显示全部","Prototype":"showOperateBar(btnNames)","Args":{"_Return_":"void","Args":"btnNames"},"Example":"展示指定的操作栏的按钮，默认显示全部"}},"Event":{"addclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"deleteclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"saveclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"printclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"importclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"addmenuclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"deletemenuclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"importmenuclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DataInputOperateBar)