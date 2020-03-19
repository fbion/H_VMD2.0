xds["vmd.ux.DataCs"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.DataCs",
    category: "vmd复合组件",
    text: "DataCs",//中文
    naming: "hwDataCs",
    //dtype 设计时组件
    dtype: "vmd.ux.DataCs",
    //xtype 运行时组件
    xtype: "vmd.ux.DataCs",
    xcls: "vmd.ux.DataCs",
    //为了拖拽能自动生成递增id
    defaultName: "hwDataCs",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: ["components/ux/datacs/1.0/css/iconfont.css"],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"combwidth":200,"layout":"absolute"},
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
     ,{"name":"store","group":"数据","ctype":"string","editor":"options","edConfig":{"type":"store"}},{"name":"valueFiled","group":"数据","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"textFiled","group":"数据","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"combwidth","group":"设计","ctype":"number","editor":"number"},{"name":"sds","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"iuh","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"qqq","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"aa","group":"设计","ctype":"string","editor":"multiCombo","options":[{"text":"dispalytext","value":"dispalyvalue"}]},{"name":"yuy","group":"设计","ctype":"string","editor":"options","edConfig":{"type":"storeField","cname":"store"}},{"name":"bt1click","group":"事件","ctype":"string","editor":"ace","params":"sender,e"},{"name":"btclick","group":"事件","ctype":"string","editor":"ace","params":"sender,e"},{"name":"detailkeyup","group":"事件","ctype":"string","editor":"ace","params":""}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.DataCs"]);
    xds.Registry.addUserType(xds["vmd.ux.DataCs"]);

    var Data_vmd_ux_DataCs={"BaseType":"Control","Type":"vmd_ux_DataCs","Property":{"store":{"Description":"数据集","Prototype":"","Args":{"_Return_":""},"Example":"选择数据集"},"valueFiled":{"Description":"valueFiled","Prototype":"","Args":{"_Return_":""},"Example":""},"textFiled":{"Description":"显示值字段","Prototype":"","Args":{"_Return_":""},"Example":"显示值字段"},"combwidth":{"Description":"combwidth","Prototype":"","Args":{"_Return_":""},"Example":"combwidth"},"sds":{"Description":"sds","Prototype":"","Args":{"_Return_":""},"Example":""},"iuh":{"Description":"iuh","Prototype":"","Args":{"_Return_":""},"Example":""},"qqq":{"Description":"456","Prototype":"","Args":{"_Return_":""},"Example":"456"},"aa":{"Description":"aa","Prototype":"","Args":{"_Return_":""},"Example":""},"yuy":{"Description":"qw","Prototype":"","Args":{"_Return_":""},"Example":"qw"}},"Method":{"getValue":{"Description":"getValue","Prototype":"getValue(attr)","Args":{"_Return_":"void","Args":"attr"},"Example":""},"setValue":{"Description":"setValue","Prototype":"setValue(province_id,city_id,county_id,detail_info)","Args":{"_Return_":"void","Args":"province_id,city_id,county_id,detail_info"},"Example":""},"wewew":{"Description":"wewew","Prototype":"wewew()","Args":{"_Return_":"void","Args":""},"Example":""}},"Event":{"bt1click":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"button1点击触发"},"btclick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"btclick"},"detailkeyup":{"Prototype":"","Args":{"_Return_":""},"Example":""}}}
	ControlsDataManage._add(Data_vmd_ux_DataCs)