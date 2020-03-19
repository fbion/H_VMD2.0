xds["vmd.ux.ObjectSelection"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.ObjectSelection",
    category: "vmd复合组件",
    text: "ObjectSelection",//中文
    naming: "ObjectSelection",
    //dtype 设计时组件
    dtype: "vmd.ux.ObjectSelection",
    //xtype 运行时组件
    xtype: "vmd.ux.ObjectSelection",
    xcls: "vmd.ux.ObjectSelection",
    //为了拖拽能自动生成递增id
    defaultName: "ObjectSelection",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"hbox"},
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
     ,{"name":"chooseClick","group":"事件","ctype":"string","editor":"ace","params":""},{"name":"loadPanal","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.ObjectSelection"]);
    xds.Registry.addUserType(xds["vmd.ux.ObjectSelection"]);

    var Data_vmd_ux_ObjectSelection={"BaseType":"Control","Type":"vmd_ux_ObjectSelection","Property":{},"Method":{"closeWin":{"Description":"closeWin","Prototype":"closeWin()","Args":{"_Return_":"无","Args":""},"Example":""},"addNode":{"Description":"addNode","Prototype":"addNode(obj)","Args":{"_Return_":"void","Args":"obj"},"Example":""},"getOrgOuser":{"Description":"getOrgOuser","Prototype":"getOrgOuser()","Args":{"_Return_":"对象","Args":""},"Example":""},"getBs":{"Description":"getBs","Prototype":"getBs()","Args":{"_Return_":"void","Args":""},"Example":""},"getchooseUse":{"Description":"getchooseUse","Prototype":"getchooseUse()","Args":{"_Return_":"void","Args":""},"Example":""},"getchooseOptions":{"Description":"getchooseOptions","Prototype":"getchooseOptions()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"chooseClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":""},"loadPanal":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_ObjectSelection)