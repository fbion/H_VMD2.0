Ext.define("vmd.ux.MobileTelephone" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.MobileTelephone",
	title:"Panel",
	header:false,
	border:false,
	width:300,
	height:40,
	layout:"fit",
	countryReadOnly:false,
	uxCss:".fontitalic {    font-style: italic;    color: #c0c0c0;}.mobileTel {    font-size: 14px}.mobileTel .tel-text {    border: 0;}.mobileTel .x-item-disabled {    color:black;    opacity: 1;}",
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
			var mtreadonly = false
var mtcountry = "86"
var mtarea = ""
var mttel = ""
var mtext = ""

function hwText_afterrender(sender) {
    if(!sender.getValue())
        sender.setValue("86")
}

function hwText3_focus(sender, e) {
    sender.removeClass("tel-text")
}

function hwText3_blur(sender, e) {
    sender.addClass("tel-text")
}

function div_click(sender, e) {

}

function hwText2_blur(sender, e) {

    sender.addClass("tel-text")
}

function hwText2_focus(sender, e) {

    sender.removeClass("tel-text")
}

function hwText1_blur(sender, e) {
    sender.addClass("tel-text")
}

function hwText1_focus(sender, e) {

    sender.removeClass("tel-text")
}

function hwText_country_beforerender(sender) {
    sender.regex = /^\d+$/;
    sender.regexText = "国际区号只能为数字";
}

function hwText_area_beforerender(sender) {
    sender.regex = /^\d+$/;
    sender.regexText = "区号只能为数字";
}

function hwText_tel_beforerender(sender) {
    sender.regex = /^\d+$/;
    sender.regexText = "电话只能为数字";
}

function hwText_ext_beforerender(sender) {
    sender.regex = /^\d+$/;
    sender.regexText = "分机号只能为数字";
}

function _setReadOnly(readOnly) {
    mtreadonly = readOnly
    if(readOnly) {
        label.hide()
        label1.hide()
        label2.hide()
        label3.hide()
        hwText_country.hide()
        hwText_tel.hide()
        hwText_area.hide()
        hwText_ext.hide()
        hwText.show()
        _setmtvalue();
        div.doLayout()
    } else {
        label.show()
        label1.show()
        label2.show()
        label3.show()
        hwText_country.show()
        hwText_tel.show()
        hwText_area.show()
        hwText_ext.show()
        hwText.hide()
        div.doLayout()
    }
}

function _setmtvalue() {
    var mtstel = ""
    var extnum = ""
    if(hwText_ext.getValue())
        extnum = extnum = "-" + hwText_ext.getValue()
    if(!hwText_area.getValue())
        mtstel = ""
    else if(!hwText_tel.getValue())
        mtstel = ""
    else
        mtstel = "+" + (hwText_country.getValue() || "86") + " " + hwText_area.getValue() + "-" + hwText_tel.getValue() + extnum
    hwText.setValue(mtstel)
}
			this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				layoutConfig:{
					pack:"start",
					align:"middle"
				},
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:35,
				x:30,
				y:30,
				layout:"hbox",
				cls:"mobileTel",
				click:"div_click",
				listeners:{
					click:div_click
				},
				items:[
					{
						xtype:"label",
						id:"label3",
						text:"+",
						margins:"0 0 0 30"
					},
					{
						xtype:"textfield",
						id:"hwText_country",
						allowBlank:true,
						enableKeyEvents:true,
						width:30,
						afterrender:"hwText_afterrender",
						margins:"",
						cls:"tel-text ",
						readOnly:this.countryReadOnly,
						style:"font-size: 14px",
						disabled:false,
						beforerender:"hwText_country_beforerender",
						listeners:{
							vmdafterrender:hwText_afterrender,
							beforerender:hwText_country_beforerender
						}
					},
					{
						xtype:"label",
						id:"label",
						text:"-",
						style:"color: #c0c0c0;"
					},
					{
						xtype:"textfield",
						id:"hwText_area",
						allowBlank:true,
						enableKeyEvents:true,
						blankText:"请输入区号",
						emptyText:"区号",
						width:40,
						emptyClass:"fontitalic",
						cls:"tel-text ",
						blur:"hwText1_blur",
						focus:"hwText1_focus",
						style:"font-size: 14px",
						beforerender:"hwText_area_beforerender",
						listeners:{
							blur:hwText1_blur,
							focus:hwText1_focus,
							beforerender:hwText_area_beforerender
						},
						readOnly:this.areaReadOnly
					},
					{
						xtype:"label",
						id:"label1",
						text:"-",
						style:"color: #c0c0c0;"
					},
					{
						xtype:"textfield",
						id:"hwText_tel",
						allowBlank:true,
						enableKeyEvents:true,
						width:90,
						emptyText:"电话号码",
						emptyClass:"fontitalic",
						cls:"tel-text ",
						blur:"hwText2_blur",
						focus:"hwText2_focus",
						style:"font-size: 14px",
						beforerender:"hwText_tel_beforerender",
						grow:false,
						listeners:{
							blur:hwText2_blur,
							focus:hwText2_focus,
							beforerender:hwText_tel_beforerender
						},
						readOnly:this.telReadOnly
					},
					{
						xtype:"label",
						id:"label2",
						text:"-",
						style:"color: #c0c0c0;",
						width:6
					},
					{
						xtype:"textfield",
						id:"hwText_ext",
						allowBlank:true,
						enableKeyEvents:true,
						width:50,
						emptyText:"分机号",
						emptyClass:"fontitalic",
						focus:"hwText3_focus",
						blur:"hwText3_blur",
						cls:"tel-text",
						style:"font-size: 14px",
						beforerender:"hwText_ext_beforerender",
						listeners:{
							focus:hwText3_focus,
							blur:hwText3_blur,
							beforerender:hwText_ext_beforerender
						},
						readOnly:this.extReadOnly
					},
					{
						xtype:"textfield",
						id:"hwText",
						allowBlank:true,
						enableKeyEvents:true,
						margins:"0 0 0 30",
						cls:"tel-text",
						style:"font-size: 14px",
						hidden:true,
						readOnly:true
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setCountry= function(country){
//直接填写方法内容
hwText_country.setValue(country);
var mtcountry = country||"86"

_setmtvalue()
	}
		this.setTel= function(country,areaCode,tel,ExtensionNumber){
//直接填写方法内容
hwText_country.setValue(country);
hwText_area.setValue(areaCode);
hwText_tel.setValue(tel);
hwText_ext.setValue(ExtensionNumber);

var mtcountry = country||"86"
var mtarea = areaCode
var mttel = tel
var mtext = ExtensionNumber

_setmtvalue()
	}
		this.setArea= function(areaCode){
//直接填写方法内容
hwText_area.setValue(areaCode);
var mtarea = areaCode

_setmtvalue()
	}
		this.setTelNum= function(tel){
//直接填写方法内容;
hwText_tel.setValue(tel);
var mttel = tel

_setmtvalue()
	}
		this.setExtNum= function(ExtensionNumber){
//直接填写方法内容
hwText_ext.setValue(ExtensionNumber);
var mtext = ExtensionNumber

_setmtvalue()
	}
		this.getTel= function(){
//直接填写方法内容
var extnum = ""
if(hwText_ext.getValue())
    extnum = extnum = "-" + hwText_ext.getValue()

if(!hwText_area.getValue())
    return ""
else if(!hwText_tel.getValue())
    return ""
else
    return "+" + (hwText_country.getValue() || "86") + " " + hwText_area.getValue() + "-" + hwText_tel.getValue() + extnum
	}
		this.getCountry= function(){
//直接填写方法内容//直接填写方法内容
return hwText_country.getValue() 
	}
		this.getArea= function(){
//直接填写方法内容
//直接填写方法内容
return  hwText_area.getValue() 
	}
		this.getTelNum= function(){
//直接填写方法内容
return  hwText_tel.getValue() 
	}
		this.getExt= function(){
//直接填写方法内容
return hwText_ext.getValue()
	}
		this.setReadOnly= function(readOnly){
//直接填写方法内容
_setReadOnly(readOnly)
	}
		this.setTel2= function(strTel){
//直接填写方法内容


if(!strTel || strTel == "" || strTel.length ==0)
   return;
   
var items1 = strTel.split(" ");
if(items1 == null || items1.length ==0 || items1.length <2)
   return;

var country = items1[0].replace("+","");

var items =  items1[1].split("-");
if(items == null || items.length ==0 || items.length <2)
   return;

var areaCode = items[0];
var tel = items[1];
var ExtensionNumber="";
if(items.length >2){
  ExtensionNumber =items[2];
}

hwText_country.setValue(country);
hwText_area.setValue(areaCode);
hwText_tel.setValue(tel);
hwText_ext.setValue(ExtensionNumber);

var mtcountry = country||"86"
var mtarea = areaCode
var mttel = tel
var mtext = ExtensionNumber

_setmtvalue()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.MobileTelephone");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.MobileTelephone");
	}
})