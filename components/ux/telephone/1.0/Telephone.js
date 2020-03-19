Ext.define("vmd.ux.Telephone" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Telephone",
	title:"Panel",
	header:false,
	border:false,
	width:220,
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
			var telreadonly = false
var scountry="86"
var stel=""


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

function div_click(sender, e) {}

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

function hwText_tel_beforerender(sender) {
    sender.regex = /^\d+$/;
    sender.regexText = "电话号码只能为数字";
}

function _setReadOnly(readOnly) {
    telreadonly = readOnly
    if(readOnly) {
        label.hide()
        label1.hide()
        hwText_country.hide()
        hwText_tel.hide()
        hwText.show()
        hwText.setValue("+"+(hwText_country.getValue()||scountry)+" "+(hwText_tel.getValue()||stel))
        //label.hide();
        //hwText_tel.disable();
        _setmtvalue();
        div.doLayout()
    } else {
         label.show()
        label1.show()
        hwText_country.show()
        hwText_tel.show()
        hwText.hide()
        //label.show();
        //hwText_tel.enable();
        div.doLayout()
    }
}

function _setmtvalue() {
    var tel = ""
    if(!hwText_tel.getValue())
        mtstel = ""
    else
        mtstel = "+" + (hwText_country.getValue() || "86") + " "  + hwText_tel.getValue() 
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
						id:"label1",
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
						id:"hwText_tel",
						allowBlank:true,
						enableKeyEvents:true,
						width:142,
						emptyText:"移动电话号码",
						emptyClass:"fontitalic",
						cls:"tel-text ",
						blur:"hwText2_blur",
						focus:"hwText2_focus",
						style:"font-size: 14px",
						beforerender:"hwText_tel_beforerender",
						grow:false,
						hidden:false,
						listeners:{
							blur:hwText2_blur,
							focus:hwText2_focus,
							beforerender:hwText_tel_beforerender
						},
						readOnly:this.telReadOnly
					},
					{
						xtype:"textfield",
						id:"hwText",
						allowBlank:true,
						enableKeyEvents:true,
						readOnly:true,
						grow:true,
						cls:"tel-text",
						style:"font-size: 14px",
						disabled:false,
						hidden:true,
						margins:"0 0 0 30"
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
scountry = country || "86";
hwText_country.setValue(country);
hwText.setValue("+" + scountry + " " + stel);
	}
		this.setTel= function(country,tel){
//直接填写方法内容
hwText_country.setValue(country);
hwText_tel.setValue(tel);

scountry = country || "86";
stel = tel;
hwText.setValue("+" + scountry + " " + stel);
	}
		this.setTelNum= function(tel){
//直接填写方法内容;
hwText_tel.setValue(tel);

stel = tel;
hwText.setValue("+" + scountry + " " + stel);
	}
		this.getTel= function(){
//直接填写方法内容
if(!hwText_tel.getValue())
    return ""
else
    return "+" + (hwText_country.getValue() || "86") + " " + hwText_tel.getValue()
	}
		this.getCountry= function(){
//直接填写方法内容//直接填写方法内容
return hwText_country.getValue() 
	}
		this.getTelNum= function(){
//直接填写方法内容
return  hwText_tel.getValue() 
	}
		this.setReadOnly= function(readOnly){
//直接填写方法内容
_setReadOnly(readOnly)
	}
		this.setTel2= function(strTel ){
//直接填写方法内容
if(!strTel || strTel == "" || strTel.length ==0)
   return;

var items1 = strTel.split(" ");
if(items1 == null || items1.length ==0 || items1.length <2)
   return;

var country = items1[0].replace("+","");
var tel = items1[1];

hwText_country.setValue(country);
hwText_tel.setValue(tel);

var country = country||"86"
var tel = tel

_setmtvalue()
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Telephone");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Telephone");
	}
})