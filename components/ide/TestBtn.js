xds["vmd.ux.TestBtn"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.TestBtn",
    category: "vmd复合组件",
    text: "TestBtn",//中文
    naming: "TestBtn",
    //dtype 设计时组件
    dtype: "vmd.ux.TestBtn",
    //xtype 运行时组件
    xtype: "vmd.ux.TestBtn",
    xcls: "vmd.ux.TestBtn",
    //为了拖拽能自动生成递增id
    defaultName: "TestBtn",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"text":"button","img":"/design/images/pic200.png"},
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
     ,{"name":"text","group":"样式","ctype":"string","editor":"string"},{"name":"cls","group":"样式","ctype":"string","editor":"string"},{"name":"style","group":"样式","ctype":"string","editor":"style"},{"name":"img","group":"样式","ctype":"string","editor":"defineWindow","edConfig":{"url":"http://www.hanweikeji.com:8000//js/plugins/image/index.html","height":500,"width":690,"title":"图片上传"}},{"name":"btnclick","group":"事件","ctype":"string","editor":"ace","params":"e"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置

    }
    
});
    xds.Registry.register(xds["vmd.ux.TestBtn"]);
    xds.Registry.addUserType(xds["vmd.ux.TestBtn"]);

    var Data_vmd_ux_TestBtn={"BaseType":"Control","Type":"vmd_ux_TestBtn","Property":{"text":{"Description":"text","Prototype":"","Args":{"_Return_":""},"Example":""},"cls":{"Description":"cls","Prototype":"","Args":{"_Return_":""},"Example":""},"style":{"Description":"style","Prototype":"","Args":{"_Return_":""},"Example":""},"img":{"Description":"img","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{"setText":{"Description":"setText","Prototype":"setText(a)","Args":{"_Return_":"void","Args":"a"},"Example":""}},"Event":{"btnclick":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_TestBtn)