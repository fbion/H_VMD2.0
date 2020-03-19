xds["vmd.ux.DropDownButton1"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DropDownButton1",
    category: "vmd复合组件",
    text: "DropDownButton1",//中文
    naming: "hwDropDownButton1",
    //dtype 设计时组件
    dtype: "vmd.ux.DropDownButton1",
    //xtype 运行时组件
    xtype: "vmd.ux.DropDownButton1",
    xcls: "vmd.ux.DropDownButton1",
    //为了拖拽能自动生成递增id
    defaultName: "hwDropDownButton1",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"buttonText":"button","lll":"/design/images/pic200.png","layout":"fit"},
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
     ,{"name":"buttonText","group":"设计","ctype":"string","editor":"string"},{"name":"lll","group":"设计","ctype":"string","editor":"defineWindow","edConfig":{"url":"http://192.168.1.181:9000//js/plugins/image/index.html","height":500,"width":690,"title":"图片上传"}},{"name":"clickLeft","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"clickRight","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DropDownButton1"]);
    xds.Registry.addUserType(xds["vmd.ux.DropDownButton1"]);

    var Data_vmd_ux_DropDownButton1={"BaseType":"Control","Type":"vmd_ux_DropDownButton1","Property":{"buttonText":{"Description":"按钮名称","Prototype":"","Args":{"_Return_":""},"Example":"","Name":"按钮名称"},"lll":{"Description":"lll","Prototype":"","Args":{"_Return_":""},"Example":"","Name":""}},"Method":{},"Event":{"clickLeft":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"clickRight":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DropDownButton1)