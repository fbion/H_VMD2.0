xds["vmd.ux.LeftTreeTypePXNR"] = Ext.extend(xds.Component, {
    cid: "vmd.ux.LeftTreeTypePXNR",
    category: "vmd复合组件",
    text: "LeftTreeTypePXNR",//中文
    naming: "hwLeftTreeTypePXNR",
    //dtype 设计时组件
    dtype: "vmd.ux.LeftTreeTypePXNR",
    //xtype 运行时组件
    xtype: "vmd.ux.LeftTreeTypePXNR",
    xcls: "vmd.ux.LeftTreeTypePXNR",
    //为了拖拽能自动生成递增id
    defaultName: "hwLeftTreeTypePXNR",
    iconCls: "icon-cmp",
    isContainer: false,
     //扩展组件依赖资源加载
    requireCss: [],
    requireJs: [],
	requireCmpType:'',
    //默认属性设置
    defaultConfig: {"layout":"border"},
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
     ,{"name":"IsMulSelect","group":"设计","ctype":"string"},{"name":"nodeClick","group":"事件","ctype":"string","editor":"ace","params":"id,text"}
      
    ],
    initConfig: function (b, a) {
        //初始化默认属性设置
        
    }
    
});
    xds.Registry.register(xds["vmd.ux.LeftTreeTypePXNR"]);
    xds.Registry.addUserType(xds["vmd.ux.LeftTreeTypePXNR"]);

    var Data_vmd_ux_LeftTreeTypePXNR={"BaseType":"Control","Type":"vmd_ux_LeftTreeTypePXNR","Property":{"IsMulSelect":{"Description":"是否多选","Prototype":"","Args":{"_Return_":""},"Example":"是否多选","Name":"是否多选"}},"Method":{"createTree":{"Description":"创建分类树,divid:创建树div的id;type:树分类，按实际来","Prototype":"createTree(divid,type,func)","Args":{"_Return_":"void","Args":"divid,type,func"},"Example":"创建分类树,divid:创建树div的id;type:树分类，按实际来"},"GetTreeAllChecked":{"Description":"GetTreeAllChecked","Prototype":"GetTreeAllChecked()","Args":{"_Return_":"对象","Args":""},"Example":""},"getItemTextById":{"Description":"根据节点ID获取文本","Prototype":"getItemTextById(id)","Args":{"_Return_":"字符串","Args":"id"},"Example":"根据节点ID获取文本"},"getSelectedItemId":{"Description":"获取选中的ID","Prototype":"getSelectedItemId()","Args":{"_Return_":"字符串","Args":""},"Example":"获取选中的ID"},"getSelectedItemText":{"Description":"获取选中的文本","Prototype":"getSelectedItemText()","Args":{"_Return_":"字符串","Args":""},"Example":"获取选中的文本"},"CreateTreeEX":{"Description":"绑定单位时使用,divid:创建树div的id;type:树分类，按实际来","Prototype":"CreateTreeEX(divid,type,fun)","Args":{"_Return_":"无","Args":"divid,type,fun"},"Example":"绑定单位时使用,divid:创建树div的id;type:树分类，按实际来"},"GetTreeAllCheckedEX":{"Description":"扩展返回id,baid,text等；flag标识 GW代表岗位","Prototype":"GetTreeAllCheckedEX(flag)","Args":{"_Return_":"对象","Args":"flag"},"Example":"扩展返回id,baid,text等；flag标识 GW代表岗位"},"ClearAllChecked":{"Description":"移除所有选中","Prototype":"ClearAllChecked()","Args":{"_Return_":"void","Args":""},"Example":"移除所有选中"},"SetChecked":{"Description":"以逗号隔开id,例子：id1,id2","Prototype":"SetChecked(id)","Args":{"_Return_":"void","Args":"id"},"Example":"以逗号隔开id,例子：id1,id2"},"getSelectedItemIdOrFirstId":{"Description":"获取当前选中，或者默认第一个ID","Prototype":"getSelectedItemIdOrFirstId()","Args":{"_Return_":"void","Args":""},"Example":"获取当前选中，或者默认第一个ID"},"selectItem":{"Description":"选中指定节点","Prototype":"selectItem(id)","Args":{"_Return_":"void","Args":"id"},"Example":"选中指定节点"}},"Event":{"nodeClick":{"Description":"","Prototype":"","Args":{"_Return_":""},"Example":"节点点击事件，返回节点id,节点文本"}}}
	ControlsDataManage._add(Data_vmd_ux_LeftTreeTypePXNR)