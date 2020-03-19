Ext.define("vmd.ux.ContactAddress" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.Telephone$1.0$Telephone","vmd.ux.MobileTelephone$1.0$MobileTelephone","vmd.ux.DatePicker$1.0$DatePicker","vmd.ux.AddressPicker$1.0$AddressPicker"]),
	version:"1.0",
	xtype:"vmd.ux.ContactAddress",
	title:"Panel",
	header:false,
	border:false,
	width:902,
	height:448,
	layout:"border",
	beforerender:"ContactAddress_beforerender",
	bodyStyle:"background-color: #f2f2f2;",
	unstyled:false,
	listeners:{
		beforerender:function(){
	this.ContactAddress_beforerender(this)
}
	},
	uxCss:".yy{    color:#333333;}.wbk{    border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color:#333333;}.bq{    text-align: right;    width: 100px;    }.zwf{    color:#808080 !important;}",
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
var data = [];
/*----------------------------------------------事件定义----------------------------------------------------*/

function ContactAddress_beforerender(sender) {
    //  
    // //构造对象
    // page.address = div.address;
    // page.address_Lx = address_type.address_Lx;
}

function tree_beforerender(sender) {
    //  
    // page.fireEvent('tree_beforerender', tree);
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
        location_id: 'location_id',
        address_type: 'address_type',
        provinceId:'provinceId',
        cityId:'cityId',
        districtId:'districtId'
    };
    data = data || testData;
    var rq1 = data.rq1;
    var rq2 = data.rq2;
  
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
    combo.setValue(data.address_type);
    hwAddressPicker.setValue(data.provinceId,data.cityId,data.districtId,data.xxdz)
    
}

function _getValue() { /*保存方法*/
    var data = {};
    var a = address_obs_no.getValue();
    if(a == '') {
        data.address_obs_no = '';
        data.location_id = newGuid(36);
        data.rowState = 'insert';
        data.address_type = combo.getValue();
    } else {
        data.address_obs_no = address_obs_no.getValue();
        data.location_id = location_id.getValue();
        data.rowState = 'update';
        data.address_type = combo.getValue();
    }
    var address=hwAddressPicker.getValue();
    data.country_area_id='';
    data.province_id = address.provinceId;
    data.city_area_id = address.cityId;
    data.district_area_id = address.countyId;
    data.addressee_text=address.detail;
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
    return data;
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
    return data;
}

function hwImg_click(sender) {
     
    page.fireEvent('delete_fhzj', page, page.id)
}


/*----------------------------------------------下拉框配置----------------------------------------------------*/

function combo_beforerender(sender) {
    page.fireEvent('combo_beforerender', combo);
}
var store = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
});

function treeSetValue(liss) {
    for(var i = 0, length = liss.length; i < length; i++) {
        var treedata = {
            id: liss[i].id,
            name: liss[i].name
        };
        data.push(treedata);
    }
}

function combo_change(sender) {
//
if (combo.getValue != '请选择地址类型' && combo.getValue != '') {
    void_addressType.hide();
    
}
}



/*----------------------------------------------树配置----------------------------------------------------*/


// function address_type_click(sender, e) { //点击地址类型按钮


// }

// function tree_nodeclick(sender, node, e) {
//     /*树节点操作*/
//     address_type.setText(node.text);
//     address_id.setText(node.id);
//     addresstree_div.hide();
// }


/*----------------------------------------------正则表达式校验----------------------------------------------------*/
var check_result={};//定义数组用于记录检验结果

function yx_blur(sender, e) {
     
    yx.regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(!yx.isValid()) {
        voidyx.show();
        check_result.yx='false';
    } else {
        voidyx.hide();
        check_result.yx='true';
    }
}

function wxh_blur(sender, e) {
    wxh.regex = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    if(!wxh.isValid()) {
        voidwxh.show();
        check_result.wxh='false';
    } else {
        voidwxh.hide();
        check_result.wxh='true';
    }
}

function cz_blur(sender, e) {
    cz.regex = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if(!cz.isValid()) {
        voidcz.show();
        check_result.cz='false';
    } else {
        voidcz.hide();
        check_result.cz='true';
    }
}

function wz_blur(sender, e) {
    wz.regex = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/;
    if(!wz.isValid()) {
        voidwz.show();
        check_result.wz='false';
    } else {
        voidwz.hide();
        check_result.wz='true';
    }
}

function yb_blur(sender, e) {
    yb.regex = /\d{6}/;
    if(!yb.isValid()) {
        voidyb.show();
        check_result.yb='false';
    } else {
        voidyb.hide();
        check_result.yb='true';
    }
}



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



function qq_blur(sender, e) {
    qq.regex = /[1-9]([0-9]{5,11})/;
    if(!qq.isValid()) {
        voidQQ.show()
        check_result.qq='false';
    } else {
        voidQQ.hide();
        check_result.qq='true';
    }
}

function combo_afterrender(sender) {
    combo.setText('请选择地址类型');
}

function zk_click(sender) {
    zk.hide();
    shousuo.show();
    div5.show();
    div6.doLayout();
    page.doLayout();
    page.fireEvent('stretch', page, page.id)
}

function shousuo_click(sender) {
     
    shousuo.hide();
    zk.show();
    div5.hide();
    div6.doLayout();
    page.doLayout();
    page.fireEvent('pack_up', page, page.id)
   
}


function yx_keyup(sender,e){
voidyx.hide();

}

function cz_keyup(sender,e){
voidcz.hide();
}

function wxh_keyup(sender,e){
voidwxh.hide();
}

function qq_keyup(sender,e){
voidQQ.hide();
}

function yb_keyup(sender,e){
voidyb.hide();
}

function wz_keyup(sender,e){
voidwz.hide();
}

function checkResult(){
 
var data=check_result;
return data;
    
}

			this.ContactAddress_beforerender=ContactAddress_beforerender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div6",
				layoutConfig:{
					align:"center",
					pack:"start"
				},
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:900,
				height:455,
				layout:"vbox",
				region:"center",
				hidden:false,
				autoScroll:false,
				items:[
					{
						xtype:"vmd.div",
						id:"div1",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:902,
						height:40,
						region:"north",
						layout:"absolute",
						style:"background-color: #fff;",
						hidden:false,
						y:5,
						items:[
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
								width:16,
								height:16,
								x:820,
								y:15,
								click:"hwImg_click",
								src:"/img/public/删除 (1).png",
								listeners:{
									click:hwImg_click
								}
							},
							{
								xtype:"vmd.combo",
								id:"combo",
								width:130,
								x:20,
								y:5,
								style:"border: 1px solid #fff;    border-radius: 3px;    font-size: 17px;    font-family: 'Microsoft YaHei';    color: #0099FE;",
								firstSelected:false,
								hidden:false,
								beforerender:"combo_beforerender",
								readOnly:true,
								afterrender:"combo_afterrender",
								cls:"combo",
								change:"combo_change",
								listeners:{
									beforerender:combo_beforerender,
									vmdafterrender:combo_afterrender,
									change:combo_change
								}
							},
							{
								xtype:"label",
								id:"void_addressType",
								text:"*请选择地址类型",
								x:150,
								y:13,
								style:"color: red;    font-size: 14px;",
								hidden:true
							},
							{
								xtype:"vmd.img",
								id:"zk",
								width:16,
								height:16,
								x:860,
								y:14,
								src:"/img/public/界面展开1.png",
								click:"zk_click",
								hidden:true,
								listeners:{
									click:zk_click
								}
							},
							{
								xtype:"vmd.img",
								id:"shousuo",
								width:15,
								height:15,
								x:860,
								y:14,
								src:"/img/public/收起上.png",
								click:"shousuo_click",
								listeners:{
									click:shousuo_click
								}
							},
							{
								xtype:"textfield",
								id:"focus_text",
								allowBlank:true,
								enableKeyEvents:true,
								x:160,
								y:10,
								width:1,
								style:"border-color: #fff;",
								readOnly:false,
								hidden:false,
								height:1
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div5",
						autoEl:"div",
						border:true,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						width:902,
						height:395,
						region:"center",
						layout:"absolute",
						style:"font-family: \"weiruanyahei\";    font-size: 14px;    text-align: right;    background-color: #fff;    border-top-color: #fff;    /*border-left-color: #fff;*/    /*border-right-color: #fff;*/",
						items:[
							{
								xtype:"label",
								id:"label3",
								text:"网址：",
								cls:"bq",
								x:20,
								y:90,
								width:100
							},
							{
								xtype:"label",
								id:"label4",
								text:"移动电话：",
								cls:"bq",
								x:20,
								y:150,
								width:100
							},
							{
								xtype:"label",
								id:"label5",
								text:"座机电话：",
								cls:"bq",
								x:430,
								y:150
							},
							{
								xtype:"label",
								id:"label6",
								text:"邮箱：",
								cls:"bq",
								x:20,
								y:210,
								width:100
							},
							{
								xtype:"label",
								id:"label7",
								text:"传真：",
								cls:"bq",
								x:430,
								y:215,
								width:100
							},
							{
								xtype:"label",
								id:"label8",
								text:"微信号：",
								cls:"bq",
								x:20,
								y:270,
								width:100
							},
							{
								xtype:"label",
								id:"label9",
								text:"QQ：",
								cls:"bq",
								x:430,
								y:270,
								height:20
							},
							{
								xtype:"textfield",
								id:"wz",
								allowBlank:true,
								enableKeyEvents:true,
								x:130,
								y:85,
								height:32,
								width:710,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color:#333333;",
								emptyText:"请输入网址",
								emptyClass:"zwf",
								blur:"wz_blur",
								keyup:"wz_keyup",
								listeners:{
									blur:wz_blur,
									keyup:wz_keyup
								}
							},
							{
								xtype:"vmd.ux.Telephone",
								id:"Telephone",
								layout:"fit",
								x:130,
								y:145,
								width:300,
								countryReadOnly:false,
								hidden:false,
								telReadOnly:false,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: \"微软雅黑\";",
								height:32
							},
							{
								xtype:"vmd.ux.MobileTelephone",
								id:"MobileTelephone",
								layout:"fit",
								x:540,
								y:145,
								telReadOnly:false,
								extReadOnly:false,
								countryReadOnly:false,
								width:300,
								areaReadOnly:false,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: \"微软雅黑\";",
								height:32
							},
							{
								xtype:"textfield",
								id:"yx",
								allowBlank:true,
								enableKeyEvents:true,
								x:130,
								y:205,
								height:32,
								width:300,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color: #333333;",
								emptyText:"请输入邮箱账号",
								emptyClass:"zwf",
								blur:"yx_blur",
								keyup:"yx_keyup",
								listeners:{
									blur:yx_blur,
									keyup:yx_keyup
								}
							},
							{
								xtype:"textfield",
								id:"cz",
								allowBlank:true,
								enableKeyEvents:true,
								x:540,
								y:205,
								height:32,
								width:300,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color: #333333;",
								emptyText:"请输入传真账号",
								emptyClass:"zwf",
								blur:"cz_blur",
								keyup:"cz_keyup",
								listeners:{
									blur:cz_blur,
									keyup:cz_keyup
								}
							},
							{
								xtype:"textfield",
								id:"wxh",
								allowBlank:true,
								enableKeyEvents:true,
								x:130,
								y:265,
								height:32,
								width:300,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color:#333333;",
								emptyText:"请输入微信",
								emptyClass:"zwf",
								blur:"wxh_blur",
								keyup:"wxh_keyup",
								listeners:{
									blur:wxh_blur,
									keyup:wxh_keyup
								}
							},
							{
								xtype:"label",
								id:"label2",
								text:"有效期：",
								cls:"bq",
								x:20,
								y:330,
								width:100
							},
							{
								xtype:"vmd.ux.DatePicker",
								id:"hwDatePicker",
								layout:"auto",
								x:130,
								y:325,
								isRange:true,
								hasShortcut:true,
								format:"YYYY-MM-DD",
								shortCutType:"future",
								width:300,
								style:"border-radius: 3px;    font-size: 14px;    font-family: 'Microsoft YaHei';    color: #333333;"
							},
							{
								xtype:"label",
								id:"voidwz",
								text:"*请输入正确的网址信息",
								x:135,
								y:120,
								style:"color:red;",
								hidden:true
							},
							{
								xtype:"label",
								id:"voidyx",
								text:"*请输入正确的邮箱账号",
								x:135,
								y:240,
								style:"color:red;",
								hidden:true
							},
							{
								xtype:"label",
								id:"voidcz",
								text:"*请输入正确的传真号",
								x:545,
								y:240,
								style:"color:red;",
								hidden:true
							},
							{
								xtype:"label",
								id:"voidwxh",
								text:"*请输入正确的微信号",
								x:135,
								y:300,
								style:"color:red;",
								hidden:true,
								height:20
							},
							{
								xtype:"label",
								id:"voidQQ",
								text:"*请输入正确的QQ号",
								x:545,
								y:300,
								style:"color:red;",
								hidden:true
							},
							{
								xtype:"textfield",
								id:"qq",
								allowBlank:true,
								enableKeyEvents:true,
								x:540,
								y:265,
								height:32,
								width:300,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color:#333333;",
								emptyText:"请输入QQ号",
								emptyClass:"zwf",
								blur:"qq_blur",
								keyup:"qq_keyup",
								listeners:{
									blur:qq_blur,
									keyup:qq_keyup
								}
							},
							{
								xtype:"label",
								id:"label",
								text:"详细地址：",
								cls:"bq",
								x:20,
								y:30,
								width:100
							},
							{
								xtype:"label",
								id:"label1",
								text:"邮编：",
								cls:"bq",
								x:430,
								y:335,
								width:100
							},
							{
								xtype:"textfield",
								id:"xxdz",
								allowBlank:true,
								enableKeyEvents:true,
								x:130,
								y:20,
								cls:"wbk",
								height:32,
								width:710,
								emptyText:"请输入详细地址信息",
								emptyClass:"zwf",
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color: #333333;",
								hidden:true
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
							},
							{
								xtype:"textfield",
								id:"yb",
								allowBlank:true,
								enableKeyEvents:true,
								x:540,
								y:330,
								height:32,
								width:300,
								style:"border: 1px solid #D7D7D7;    border-radius: 3px;    font-size: 14px;    font-family: '微软雅黑';    color:#333333;",
								emptyText:"请输入邮政编码",
								emptyClass:"zwf",
								blur:"yb_blur",
								keyup:"yb_keyup",
								listeners:{
									blur:yb_blur,
									keyup:yb_keyup
								}
							},
							{
								xtype:"label",
								id:"voidyb",
								text:"*请输入正确的邮编",
								x:545,
								y:365,
								style:"color:red;",
								hidden:true
							},
							{
								xtype:"vmd.ux.AddressPicker",
								id:"hwAddressPicker",
								detailWidth:400,
								comboWidth:300,
								pickerWidth:510,
								detailX:310,
								detailEmptyText:"请输入详细地址信息：如道路、小区、单元室等",
								layout:"absolute",
								x:130,
								y:25,
								width:720,
								style:"text-align: left;    width: 100px;"
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
		this.checkResult= function(){
//直接填写方法内容
 return checkResult();
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ContactAddress");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ContactAddress");
	}
})