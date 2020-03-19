xds["vmd.ux.Telephone"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.Telephone",
    category: "vmd复合组件",
    text: "Telephone",//中文
    naming: "hwTelephone",
    //dtype 设计时组件
    dtype: "vmd.ux.Telephone",
    //xtype 运行时组件
    xtype: "vmd.ux.Telephone",
    xcls: "vmd.ux.Telephone",
    //为了拖拽能自动生成递增id
    defaultName: "hwTelephone",
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
     ,{"name":"countryReadOnly","group":"设计","ctype":"boolean","editor":"boolean"},{"name":"telReadOnly","group":"设计","ctype":"boolean","editor":"boolean"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.Telephone"]);
    xds.Registry.addUserType(xds["vmd.ux.Telephone"]);

    var Data_vmd_ux_Telephone={"BaseType":"Control","Type":"vmd_ux_Telephone","Property":{"countryReadOnly":{"Description":"区号只读","Prototype":"","Args":{"_Return_":""},"Example":"国家只读"},"telReadOnly":{"Description":"电话只读","Prototype":"","Args":{"_Return_":""},"Example":"电话只读"}},"Method":{"setCountry":{"Description":"国家+86","Prototype":"setCountry(country)","Args":{"_Return_":"void","Args":"country"},"Example":"国家+86"},"setTel":{"Description":"国家/号码","Prototype":"setTel(country,tel)","Args":{"_Return_":"void","Args":"country,tel"},"Example":"国家/号码"},"setTelNum":{"Description":"电话","Prototype":"setTelNum(tel)","Args":{"_Return_":"void","Args":"tel"},"Example":"电话"},"getTel":{"Description":"获取电话全","Prototype":"getTel()","Args":{"_Return_":"字符串","Args":""},"Example":"获取电话全"},"getCountry":{"Description":"获取国家","Prototype":"getCountry()","Args":{"_Return_":"数字","Args":""},"Example":"获取国家"},"getTelNum":{"Description":"获取电话","Prototype":"getTelNum()","Args":{"_Return_":"数字","Args":""},"Example":"获取电话"},"setReadOnly":{"Description":"true/false","Prototype":"setReadOnly(readOnly)","Args":{"_Return_":"void","Args":"readOnly"},"Example":"true/false"},"setTel2":{"Description":"setTel2","Prototype":"setTel2(strTel )","Args":{"_Return_":"void","Args":"strTel "},"Example":""}},"Event":{}}
	ControlsDataManage._add(Data_vmd_ux_Telephone)