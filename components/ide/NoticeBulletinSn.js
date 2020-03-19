xds["vmd.ux.NoticeBulletinSn"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.NoticeBulletinSn",
    category: "vmd复合组件",
    text: "NoticeBulletinSn",//中文
    naming: "NoticeBulletinSn",
    //dtype 设计时组件
    dtype: "vmd.ux.NoticeBulletinSn",
    //xtype 运行时组件
    xtype: "vmd.ux.NoticeBulletinSn",
    xcls: "vmd.ux.NoticeBulletinSn",
    //为了拖拽能自动生成递增id
    defaultName: "NoticeBulletinSn",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"auto"},
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
     ,{"name":"callcode","group":"设计","ctype":"string"},{"name":"orgschecount","group":"设计","ctype":"string"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.NoticeBulletinSn"]);
    xds.Registry.addUserType(xds["vmd.ux.NoticeBulletinSn"]);

    var Data_vmd_ux_NoticeBulletinSn={"BaseType":"Control","Type":"vmd_ux_NoticeBulletinSn","Property":{"callcode":{"Description":"授权码","Prototype":"","Args":{"_Return_":""},"Example":""},"orgschecount":{"Description":"服务地址","Prototype":"","Args":{"_Return_":""},"Example":""}},"Method":{},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_NoticeBulletinSn)