Ext.define("vmd.ux.ContactAddress_Tree" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.Telephone$1.0$Telephone","vmd.ux.MobileTelephone$1.0$MobileTelephone","vmd.ux.DatePicker$1.0$DatePicker"]),
	version:"1.0",
	xtype:"vmd.ux.ContactAddress_Tree",
	layoutConfig:{
		align:"center",
		pack:"end"
	},
	title:"Panel",
	header:false,
	border:false,
	width:900,
	height:460,
	layout:"vbox",
	beforerender:"ContactAddress_Tree_beforerender",
	bodyStyle:"background-color: #f2f2f2;",
	unstyled:false,
	afterrender:"ContactAddress_Tree_afterrender",
	listeners:{
		beforerender:function(){
	this.ContactAddress_Tree_beforerender(this)
},
		vmdafterrender:function(){
	this.ContactAddress_Tree_afterrender(this)
}
	},
	parentField:"parientid",
	valueField:"id",
	textField:"name",
	uxCss:".yy{    color:#333333;}.wbk{    border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color:#333333;}.bq{    text-align: right;    width: 100px;    }",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			var page = this;

function address_type_click(sender, e) { //点击地址类型按钮
    e.stopPropagation()
    var btnTop = '39';
    var btnLeft = '20';
    addresstree_div.el.setTop(btnTop);
    addresstree_div.el.setLeft(btnLeft)
    addresstree_div.show();

}

function ContactAddress_Tree_beforerender(sender) {
    //构造对象
    page.address = div.address;
    page.address_Lx = address_type.address_Lx;
}

//给form赋值,查询方法
function _setValue(data) {
    
    var testData = {
        xxdz: 'xxdz',
        yb: 'yb',
        wz: 'wz',
        yx: 'yx',
        cz: 'cz',
        wxh: 'wxh',
        qq: 'qq',
        zjdh: 'zjdh',
        yddh: 'yddh',
        rq1: 'rq1',
        rq2: 'rq2',
        address_obs_no: 'address_obs_no',
        location_id: 'location_id'
    };
    data = data || testData;
    var rq1 = data.rq1;
    var rq2 = data.rq2;
    xxdz.setValue(data.xxdz);
    yb.setValue(data.yb);
    wz.setValue(data.wz);
    yx.setValue(data.yx);
    cz.setValue(data.cz);
    wxh.setValue(data.wxh);
    qq.setValue(data.qq);
    location_id.setValue(data.location_id);
    address_obs_no.setValue(data.address_obs_no);
    Telephone.setTel2(data.yddh);
    MobileTelephone.setTel2(data.zjdh);
    hwDatePicker.setValue(rq1, rq2);
}

function _getValue() { /*保存方法*/
    
    var data = {};
    var a = address_obs_no.getValue();
    if(a == '') {
        data.address_obs_no = '';
        data.location_id = newGuid(36);
        data.rowState = 'insert';
    } else {
        data.address_obs_no = address_obs_no.getValue();
        data.location_id = location_id.getValue();
        data.rowState = 'update';
    }
    data.country_area_id = '';
    data.province_id = '';
    data.city_area_id = '';
    data.addressee_text = xxdz.getValue();
    data.postal_zip_code = yb.getValue();
    data.organization_weburl = wz.getValue();
    data.organization_tel = MobileTelephone.getTel();
    data.mobile = Telephone.getTel();
    data.organization_email = yx.getValue();
    data.organization_fax = cz.getValue();
    data.wx = wxh.getValue();
    data.qq = qq.getValue();
    data.effective_date = hwDatePicker.getKsrq();
    data.expiry_date = hwDatePicker.getJsrq();
    data.address_type = '';
    // data.address_Typeid=address_id;
    return data;
}
//树的绑定功能
function _addressBindTree(parentField, valueField, valueText) {
    
    var testData = {
        parentField: 'parentField'
    };
    parentField = parentField || testData;
    var testData1 = {
        valueField: 'valueField'
    }
    valueField = valueField || testData1;
    var testData2 = {
        valueText: 'valueText'
    }
    tree.addNode(testData.parentField, testData1.valueField, testData2.valueText);

}



function tree_beforerender(sender) {
    
    page.fireEvent('tree_beforerender', tree);
    //this.store=page.address_store;
}

function _deleteValue() {
    
    var data = {};
    data.address_obs_no = address_obs_no.getValue();
    data.location_id = location_id.getValue();
    data.rowState = 'delete';
    data.country_area_id = '';
    data.province_id = '';
    data.city_area_id = '';
    data.addressee_text = '';
    data.postal_zip_code = yb.getValue();
    data.organization_weburl = wz.getValue();
    data.organization_tel = MobileTelephone.getTel();
    data.mobile = Telephone.getTel();
    data.organization_email = yx.getValue();
    data.organization_fax = cz.getValue();
    data.wx = wxh.getValue();
    data.qq = qq.getValue();
    data.effective_date = hwDatePicker.getKsrq();
    data.expiry_date = hwDatePicker.getJsrq();
    data.address_type = '';
    // data.address_Typeid=address_id;
    return data;
}

// function tree(dataTree){
//     var testData = {
//         parentField:'parentField',
//         valueField:'valueField',
//         textField:'textField',
//     };
//      dataTree = dataTree || testData;
// }


function hwImg_click(sender) {
    
    page.fireEvent('delete_fhzj', page, page.id)
}

function ContactAddress_Tree_afterrender(sender) {
    /*对下拉树进行操作*/
    address_type.addClass('combotree');
    Ext.getBody().on('click', function(e) {
        if(vmd(e.target).parents('.combotree').length == '0' && vmd(e.target).parents('.vmd-tree').length == '0') {
            addresstree_div.hide();
        }
    });
    vmd("#iframe_page").load(function() {
        vmd(document.getElementById('iframe_page').contentWindow.document.body).on('click', function() {
            addresstree_div.hide()

        })
    });

}

function tree_nodeclick(sender, node, e) {
    /*树节点操作*/
    address_type.setText(node.text);
    address_id.setText(node.id);
    addresstree_div.hide();
}
var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name', 'parentid']
});
var data=[];
function treeSetValue(liss) {
    
    for(var i = 0, length = liss.length; i < length; i++) {
        var treedata = {
            id: liss[i].id,
            name: liss[i].name,
            parentid: liss[i].parentid
        };
        data.push(treedata);
    }
}
store.loadData(data);

function newGuid(len) {
    var length = 32;
    if(len)
        length = len;
    var guid = "";
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for(var i = 0; i < length; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        guid += arr[pos];
    }
    return guid;
}
			this.ContactAddress_Tree_afterrender=ContactAddress_Tree_afterrender;
		this.ContactAddress_Tree_beforerender=ContactAddress_Tree_beforerender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div4",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:890,
				height:450,
				layout:"border",
				style:"border-bottom: 0px;",
				items:[
					{
						xtype:"vmd.div",
						id:"div1",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:880,
						height:40,
						region:"north",
						layout:"absolute",
						style:"border-left: #fff;    border-top: #fff;    background-color: #fff;    border-right: #fff;",
						hidden:false,
						items:[
							{
								xtype:"vmd.button",
								id:"address_type",
								text:"请选择地址类型",
								type:"(none)",
								size:"small",
								x:20,
								y:0,
								width:170,
								height:35,
								style:"background-color: #fff;    border-color: #fff;    font-size: 14px;    font-family: \"微软雅黑\";    text-align: left;",
								click:"address_type_click",
								listeners:{
									click:address_type_click
								}
							},
							{
								xtype:"vmd.button",
								id:"address_id",
								type:"(none)",
								size:"small",
								x:300,
								y:10,
								hidden:true
							},
							{
								xtype:"vmd.img",
								id:"hwImg",
								width:20,
								height:20,
								x:800,
								y:10,
								click:"hwImg_click",
								src:"/img/public/QQ图片20181222161546.png",
								listeners:{
									click:hwImg_click
								}
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:880,
						height:338,
						x:-16,
						y:0,
						region:"center",
						layout:"border",
						cls:"yy",
						hidden:false,
						items:[
							{
								xtype:"vmd.div",
								id:"div2",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:880,
								height:120,
								region:"north",
								layout:"absolute",
								style:"border-bottom: #fff;    border-color: #E4E4E4;    border-top: #fff;    font-family: \"weiruanyahei\";    font-size: 14px;    text-align: right;",
								items:[
									{
										xtype:"label",
										id:"label",
										text:"详细地址：",
										cls:"bq",
										x:20,
										y:25
									},
									{
										xtype:"label",
										id:"label1",
										text:"邮编：",
										cls:"bq",
										x:20,
										y:83
									},
									{
										xtype:"textfield",
										id:"xxdz",
										allowBlank:true,
										enableKeyEvents:true,
										x:130,
										y:20,
										height:32,
										width:700,
										style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
										emptyText:"请输入详细地址信息"
									},
									{
										xtype:"textfield",
										id:"yb",
										allowBlank:true,
										enableKeyEvents:true,
										x:130,
										y:76,
										height:32,
										width:310,
										style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
										emptyText:"请输入邮编"
									},
									{
										xtype:"numberfield",
										id:"address_obs_no",
										allowDecimals:true,
										allowNegative:true,
										decimalPrecision:0,
										allowBlank:true,
										x:640,
										y:80,
										hidden:true
									},
									{
										xtype:"textfield",
										id:"location_id",
										allowBlank:true,
										enableKeyEvents:true,
										x:460,
										y:80,
										hidden:true
									}
								]
							},
							{
								xtype:"vmd.div",
								id:"div3",
								autoEl:"div",
								border:false,
								backgroundRepeat:"no-repeat",
								backgroundPosition:"top left",
								width:400,
								height:50,
								region:"center",
								layout:"border",
								items:[
									{
										xtype:"vmd.div",
										id:"div5",
										autoEl:"div",
										border:false,
										backgroundRepeat:"no-repeat",
										backgroundPosition:"top left",
										width:880,
										height:150,
										region:"center",
										layout:"absolute",
										style:"border-top: #fff;    border-color: #E4E4E4;    font-family: \"weiruanyahei\";    font-size: 14px;    text-align: right;",
										items:[
											{
												xtype:"label",
												id:"label3",
												text:"网址：",
												cls:"bq",
												x:20,
												y:17
											},
											{
												xtype:"label",
												id:"label4",
												text:"移动电话：",
												cls:"bq",
												x:20,
												y:70
											},
											{
												xtype:"label",
												id:"label5",
												text:"座机电话：",
												cls:"bq",
												x:440,
												y:70
											},
											{
												xtype:"label",
												id:"label6",
												text:"邮箱：",
												cls:"bq",
												x:20,
												y:119
											},
											{
												xtype:"label",
												id:"label7",
												text:"传真：",
												cls:"bq",
												x:440,
												y:119
											},
											{
												xtype:"label",
												id:"label8",
												text:"微信号：",
												cls:"bq",
												x:20,
												y:178
											},
											{
												xtype:"label",
												id:"label9",
												text:"QQ：",
												cls:"bq",
												x:440,
												y:178,
												height:20
											},
											{
												xtype:"textfield",
												id:"wz",
												allowBlank:true,
												enableKeyEvents:true,
												x:130,
												y:12,
												height:32,
												width:700,
												style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
												emptyText:"请输入网址"
											},
											{
												xtype:"vmd.ux.Telephone",
												id:"Telephone",
												layout:"fit",
												x:130,
												y:58,
												width:170,
												countryReadOnly:false,
												hidden:false,
												telReadOnly:false
											},
											{
												xtype:"vmd.ux.MobileTelephone",
												id:"MobileTelephone",
												layout:"fit",
												x:540,
												y:58,
												telReadOnly:false,
												extReadOnly:false,
												countryReadOnly:false,
												width:270,
												areaReadOnly:false
											},
											{
												xtype:"textfield",
												id:"yx",
												allowBlank:true,
												enableKeyEvents:true,
												x:130,
												y:114,
												height:32,
												width:300,
												style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
												emptyText:"请输入邮箱账号"
											},
											{
												xtype:"textfield",
												id:"cz",
												allowBlank:true,
												enableKeyEvents:true,
												x:550,
												y:114,
												height:32,
												width:280,
												style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
												emptyText:"请输入传真账号"
											},
											{
												xtype:"textfield",
												id:"wxh",
												allowBlank:true,
												enableKeyEvents:true,
												x:130,
												y:173,
												height:32,
												width:300,
												style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
												emptyText:"请输入微信"
											},
											{
												xtype:"numberfield",
												id:"qq",
												allowDecimals:true,
												allowNegative:true,
												decimalPrecision:0,
												allowBlank:true,
												x:551,
												y:173,
												width:280,
												height:32,
												style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';",
												emptyText:"请输入QQ账号"
											},
											{
												xtype:"label",
												id:"label2",
												text:"有效期：",
												cls:"bq",
												x:20,
												y:237
											},
											{
												xtype:"vmd.ux.DatePicker",
												id:"hwDatePicker",
												layout:"auto",
												x:130,
												y:230,
												isRange:true,
												hasShortcut:true,
												format:"YYYY-MM-DD",
												shortCutType:"future",
												width:300,
												style:"/*border: 1px solid #D7D7D7;*/    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';"
											}
										]
									}
								]
							}
						],
						address:this.address
					},
					{
						xtype:"vmd.div",
						id:"addresstree_div",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:200,
						height:30,
						region:"west",
						hidden:true,
						items:[
							{
								xtype:"vmd.treeex",
								id:"tree",
								width:180,
								height:200,
								hideRoot:true,
								x:120,
								y:320,
								beforerender:"tree_beforerender",
								rootValue:"0",
								rootText:"0",
								nodeclick:"tree_nodeclick",
								parentField:this.parentField,
								valueField:this.valueField,
								textField:this.textField,
								loadType:"全部加载",
								listeners:{
									beforerender:tree_beforerender,
									nodeclick:tree_nodeclick
								},
								store:this.tree_store
							}
						]
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setValue= function(data){
//直接填写方法内容

_setValue(data);
	}
		this.getValue= function(){
//直接填写方法内容

return _getValue();

	}
		this.deleteValue= function(){
//直接填写方法内容
return _deleteValue();
	}
		this.treeSetValue= function(liss){
//直接填写方法内容
treeSetValue(liss)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ContactAddress_Tree");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ContactAddress_Tree");
	}
})