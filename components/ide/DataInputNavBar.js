xds["vmd.ux.DataInputNavBar"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DataInputNavBar",
    category: "vmd复合组件",
    text: "DataInputNavBar",//中文
    naming: "hwDataInputNavBar",
    //dtype 设计时组件
    dtype: "vmd.ux.DataInputNavBar",
    //xtype 运行时组件
    xtype: "vmd.ux.DataInputNavBar",
    xcls: "vmd.ux.DataInputNavBar",
    //为了拖拽能自动生成递增id
    defaultName: "hwDataInputNavBar",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datainputnavbar/1.0/css/icons.css"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"startText":"首行","forwardText":"上一条","nextText":"下一条","endText":"尾行","layout":"hbox"},
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
     ,{"name":"startText","group":"按钮文本","ctype":"string","editor":"string"},{"name":"forwardText","group":"按钮文本","ctype":"string","editor":"string"},{"name":"nextText","group":"按钮文本","ctype":"string","editor":"string"},{"name":"endText","group":"按钮文本","ctype":"string","editor":"string"},{"name":"startIcons","group":"按钮图标类","ctype":"string","editor":"string"},{"name":"forwardIcons","group":"按钮图标类","ctype":"string","editor":"string"},{"name":"nextIcons","group":"按钮图标类","ctype":"string","editor":"string"},{"name":"endIcons","group":"按钮图标类","ctype":"string","editor":"string"},{"name":"startCls","group":"按钮类名","ctype":"string","editor":"string"},{"name":"forwardCls","group":"按钮类名","ctype":"string","editor":"string"},{"name":"nextCls","group":"按钮类名","ctype":"string","editor":"string"},{"name":"endCls","group":"按钮类名","ctype":"string","editor":"string"},{"name":"startDisplay","group":"按钮隐藏","ctype":"boolean","editor":"boolean"},{"name":"forwardDisplay","group":"按钮隐藏","ctype":"boolean","editor":"boolean"},{"name":"nextDisplay","group":"按钮隐藏","ctype":"boolean","editor":"boolean"},{"name":"endDisplay","group":"按钮隐藏","ctype":"boolean","editor":"boolean"},{"name":"countDisplay","group":"按钮隐藏","ctype":"boolean","editor":"boolean"},{"name":"nav_click","group":"事件","ctype":"string","editor":"ace","params":"e,flag"},{"name":"pageJump","group":"事件","ctype":"string","editor":"ace","params":"pageNumber"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"middle","pack":"start"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.DataInputNavBar"]);
    xds.Registry.addUserType(xds["vmd.ux.DataInputNavBar"]);

    var Data_vmd_ux_DataInputNavBar={"BaseType":"Control","Type":"vmd_ux_DataInputNavBar","Property":{"startText":{"Description":"首行按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"首行按钮文本"},"forwardText":{"Description":"上一条按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"上一条按钮文本"},"nextText":{"Description":"下一条按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"下一条按钮文本"},"endText":{"Description":"尾行按钮文本","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"尾行按钮文本"},"startIcons":{"Description":"首行按钮图标类","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"首行按钮图标类"},"forwardIcons":{"Description":"上一条按钮图标类","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"上一条按钮图标类"},"nextIcons":{"Description":"下一条按钮图标类","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"下一条按钮图标类"},"endIcons":{"Description":"尾行按钮图标类","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"尾行按钮图标类"},"startCls":{"Description":"首行按钮类名","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"首行按钮类名"},"forwardCls":{"Description":"上一条按钮类名","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"上一条按钮类名"},"nextCls":{"Description":"下一条按钮类名","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"下一条按钮类名"},"endCls":{"Description":"尾行按钮类名","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"尾行按钮类名"},"startDisplay":{"Description":"首行按钮隐藏","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"首行按钮隐藏"},"forwardDisplay":{"Description":"上一条隐藏","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"上一条隐藏"},"nextDisplay":{"Description":"下一条隐藏","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"下一条隐藏"},"endDisplay":{"Description":"尾行按钮隐藏","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"尾行按钮隐藏"},"countDisplay":{"Description":"页码隐藏","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"页码隐藏"}},"Method":{"setPageCount":{"Description":"传递数据集设置页数计数","Prototype":"setPageCount(all,now)","Args":{"_Return_":"void","Args":"all,now"},"Example":"传递数据集设置页数计数"},"changeName":{"Description":"changeName","Prototype":"changeName(type,value)","Args":{"_Return_":"void","Args":"type,value"},"Example":""}},"Event":{"nav_click":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"pageJump":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DataInputNavBar)