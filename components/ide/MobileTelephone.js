xds["vmd.ux.MobileTelephone"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.MobileTelephone",
    category: "vmd复合组件",
    text: "MobileTelephone",//中文
    naming: "hwMobileTelephone",
    //dtype 设计时组件
    dtype: "vmd.ux.MobileTelephone",
    //xtype 运行时组件
    xtype: "vmd.ux.MobileTelephone",
    xcls: "vmd.ux.MobileTelephone",
    //为了拖拽能自动生成递增id
    defaultName: "hwMobileTelephone",
    iconCls: "icon-cmp",
    isContainer: false,
   
    //默认属性设置
    defaultConfig: {"layout":"fit"},
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
     ,{"name":"areaReadOnly","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"telReadOnly","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"extReadOnly","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"countryReadOnly","group":"设计","ctype":"boolean","editor":"boolean"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.MobileTelephone"]);
    xds.Registry.addUserType(xds["vmd.ux.MobileTelephone"]);

    var Data_vmd_ux_MobileTelephone={"BaseType":"Control","Type":"vmd_ux_MobileTelephone","Property":{"areaReadOnly":{"Description":"区号只读","Prototype":"","Args":{"_Return_":""},"Example":"区号只读"},"telReadOnly":{"Description":"电话只读","Prototype":"","Args":{"_Return_":""},"Example":"电话只读"},"extReadOnly":{"Description":"分机号只读","Prototype":"","Args":{"_Return_":""},"Example":"分机号只读"},"countryReadOnly":{"Description":"国家只读","Prototype":"","Args":{"_Return_":""},"Example":"国家只读"}},"Method":{"setCountry":{"Description":"国家+86","Prototype":"setCountry(country)","Args":{"_Return_":"void","Args":"country"},"Example":"国家+86"},"setTel":{"Description":"国家/区号/号码/分机号","Prototype":"setTel(country,areaCode,tel,ExtensionNumber)","Args":{"_Return_":"void","Args":"country,areaCode,tel,ExtensionNumber"},"Example":"国家/区号/号码/分机号"},"setArea":{"Description":"区号","Prototype":"setArea(areaCode)","Args":{"_Return_":"void","Args":"areaCode"},"Example":"区号"},"setTelNum":{"Description":"电话","Prototype":"setTelNum(tel)","Args":{"_Return_":"void","Args":"tel"},"Example":"电话"},"setExtNum":{"Description":"分机号","Prototype":"setExtNum(ExtensionNumber)","Args":{"_Return_":"void","Args":"ExtensionNumber"},"Example":"分机号"},"getTel":{"Description":"获取电话全","Prototype":"getTel()","Args":{"_Return_":"字符串","Args":""},"Example":"获取电话全"},"getCountry":{"Description":"获取国家","Prototype":"getCountry()","Args":{"_Return_":"数字","Args":""},"Example":"获取国家"},"getArea":{"Description":"获取区号","Prototype":"getArea()","Args":{"_Return_":"数字","Args":""},"Example":"获取区号"},"getTelNum":{"Description":"获取电话","Prototype":"getTelNum()","Args":{"_Return_":"数字","Args":""},"Example":"获取电话"},"getExt":{"Description":"获取分机号","Prototype":"getExt()","Args":{"_Return_":"数字","Args":""},"Example":"获取分机号"},"setReadOnly":{"Description":"true/false","Prototype":"setReadOnly(readOnly)","Args":{"_Return_":"void","Args":"readOnly"},"Example":"true/false"},"setTel2":{"Description":"setTel2","Prototype":"setTel2(strTel)","Args":{"_Return_":"void","Args":"strTel"},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_MobileTelephone)