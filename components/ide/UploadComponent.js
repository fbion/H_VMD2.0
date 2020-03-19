xds["vmd.ux.UploadComponent"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.UploadComponent",
    category: "vmd复合组件",
    text: "UploadComponent",//中文
    naming: "UploadComponent",
    //dtype 设计时组件
    dtype: "vmd.ux.UploadComponent",
    //xtype 运行时组件
    xtype: "vmd.ux.UploadComponent",
    xcls: "vmd.ux.UploadComponent",
    //为了拖拽能自动生成递增id
    defaultName: "UploadComponent",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"UpText":"附件：","layout":"hbox"},
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
     ,{"name":"UpText","group":"设计","ctype":"string","editor":"string"},{"name":"Upsize","group":"设计","ctype":"string"},{"name":"uploadFinish","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        this.layoutConfig={"align":"top","pack":"start"}

    }
    
});
    xds.Registry.register(xds["vmd.ux.UploadComponent"]);
    xds.Registry.addUserType(xds["vmd.ux.UploadComponent"]);

    var Data_vmd_ux_UploadComponent={"BaseType":"Control","Type":"vmd_ux_UploadComponent","Property":{"UpText":{"Description":"附件上传文本","Prototype":"","Args":{"_Return_":""},"Example":"附件上传文本"},"Upsize":{"Description":"文本字号","Prototype":"","Args":{"_Return_":""},"Example":"上传文本字号"}},"Method":{"getDocIds":{"Description":"getDocIds","Prototype":"getDocIds()","Args":{"_Return_":"对象","Args":""},"Example":""},"SetUpData":{"Description":"SetUpData","Prototype":"SetUpData(param)","Args":{"_Return_":"void","Args":"param"},"Example":""}},"Event":{"uploadFinish":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_UploadComponent)