xds["vmd.ux.ISIP5Navigation02"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ISIP5Navigation02",
    category: "vmd复合组件",
    text: "ISIP5Navigation02",//中文
    naming: "hwISIP5Navigation02",
    //dtype 设计时组件
    dtype: "vmd.ux.ISIP5Navigation02",
    //xtype 运行时组件
    xtype: "vmd.ux.ISIP5Navigation02",
    xcls: "vmd.ux.ISIP5Navigation02",
    //为了拖拽能自动生成递增id
    defaultName: "hwISIP5Navigation02",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"absolute"},
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
     ,{"name":"homeClick","group":"事件","ctype":"string","editor":"ace","params":"e"},{"name":"pathClick","group":"事件","ctype":"string","editor":"ace","params":"index,textpath,idpath,id"},{"name":"patnIcoClick","group":"事件","ctype":"string","editor":"ace","params":"e,index,id"},{"name":"menuClick","group":"事件","ctype":"string","editor":"ace","params":"textPath,idPath,id,index"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ISIP5Navigation02"]);
    xds.Registry.addUserType(xds["vmd.ux.ISIP5Navigation02"]);

    var Data_vmd_ux_ISIP5Navigation02={"BaseType":"Control","Type":"vmd_ux_ISIP5Navigation02","Property":{},"Method":{"setFirstPath":{"Description":"设置导航栏的显示路径\n需要参数为点击文件的路径（文本路径和id路径）","Prototype":"setFirstPath(address,path,isHasChild)","Args":{"_Return_":"无","Args":"address,path,isHasChild"},"Example":"设置导航栏的显示路径\n需要参数为点击文件的路径（文本路径和id路径）"},"previousChange":{"Description":"回退操作，回调函数返回会退后当前节点id","Prototype":"previousChange(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":"回退操作，回调函数返回会退后当前节点id"},"nextChange":{"Description":"前进操作，回调函数返回前进后当前节点id","Prototype":"nextChange(callback)","Args":{"_Return_":"void","Args":"callback"},"Example":"前进操作，回调函数返回前进后当前节点id"},"preIsEnabled":{"Description":"preIsEnabled","Prototype":"preIsEnabled()","Args":{"_Return_":"void","Args":""},"Example":""},"nexIsEnabled":{"Description":"前进按钮是否可用","Prototype":"nexIsEnabled()","Args":{"_Return_":"void","Args":""},"Example":"前进按钮是否可用"},"setChildMeun":{"Description":"设置子文件菜单内容，参数为数组对象，对象中需包含\"id\",\"name\",\"idPath\",\"textPath\"键名","Prototype":"setChildMeun(childDta)","Args":{"_Return_":"void","Args":"childDta"},"Example":"设置子文件菜单内容，参数为数组对象，对象中需包含\"id\",\"name\",\"idPath\",\"textPath\"键名"},"setSecondPath":{"Description":"setSecondPath","Prototype":"setSecondPath(address,path,isHasChild)","Args":{"_Return_":"void","Args":"address,path,isHasChild"},"Example":""}},"Event":{"homeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"返回主页面"},"pathClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"点击导航栏的文件名触发事件，返回的参数index为文件的路径的所属结构部分，1为一部分是banner区里边的数据，2为自功能树的层级路径；textpath为文本路径，idpath为id路径，id为当前点击文件的id\n\n"},"patnIcoClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"点击文件夹后面对应图标触发，返回参数为index该文件所属部分（1为一部分是banner区里边的数据，2为自功能树的层级路径）和该文件的id"},"menuClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ISIP5Navigation02)