Ext.define("vmd.ux.Condition" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Condition",
	title:"Panel",
	header:false,
	border:false,
	width:1600,
	height:50,
	layout:"hbox",
	beforerender:"Condition_beforerender",
	listeners:{
		beforerender:function(){
	this.Condition_beforerender(this)
}
	},
	dw_lable_text:"单位：",
	jsrqCalendar:"today",
	ksText:"开始时间：",
	jsText:" 结束时间：",
	jb_lable_text:"级别：",
	lx_combo_text:"类型：",
	zt_combo_text:"状态：",
	ygjobjtext:"预告警对象：",
	uxCss:".bk{    border-style:solid; border-width:1px; border-color:#e3e2e8} .x-form-field-wrap{    border:1px solid #e3e2e8;    border-radius:4px;   }.x-form-field-wrap .x-form-date-trigger{    background-position: -2px 6px !important;}/* 一般按钮样式 */.vmd-btn {    padding: 0;    text-align: center;    height: 30px;    line-height: 27px;    color: #fff;    border: 1px solid #4a67d2;    background-color: #4a67d2;    border-radius: 4px;    width: 80px;}/* 鼠标悬停 */.vmd-btn:hover {    border: 1px solid #6e88e5;    font-size: 14px;    background-color: #6e88e5;    color: white;    cursor: pointer;}/* 鼠标点击 */.vmd-btn:active {    border: 1px solid #3652bb;    background-color: #3652bb;    color: white;    cursor: pointer;}.vmd-btn.vmd-button-selected {   border: 1px solid #4a67d2;    color: white !important;}",
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
			var page =this;

function Condition_beforerender(sender){
if(panel.dwShow===undefined) panel.dwShow=true;
if(!panel.dwShow){
    dwText.hide();
    dwCombo.hide();
}

if(panel.ztShow===undefined) panel.ztShow=true;
if(!panel.ztShow){
    ztText.hide();
    ztCombo.hide();
}
if(panel.lxShow===undefined) panel.lxShow=true;
if(!panel.lxShow){
    lxText.hide();
    lxCombo.hide();
}
if(panel.jbShow===undefined) panel.jbShow=true;
if(!panel.jbShow){
    jbText.hide();
    jbCombo.hide();
}

if(panel.ksTshow===undefined) panel.ksTshow=true;
if(!panel.ksTshow){
    ksT.hide();
    ksT.hide();
}
if(panel.jsTshow===undefined) panel.jsTshow=true;
if(!panel.jsTshow){
    jsT.hide();
    jsT.hide();
}
if(panel.ygjdx_show===undefined) panel.ygjdx_show=true;
if(!panel.ygjdx_show){
    ygj_text.hide();
    ygjText.hide();
}

}

function btn_query_click(sender,e){
var kssj=ksrqC.getValue();
var jssj=jsrqC.getValue();
if(kssj>jssj){
    alert("开始时间不能大于结束时间")
    return;
}

page.fireEvent('query', btn_query)
}

function btn_export_click(sender,e){
page.fireEvent('export', btn_export)
}


function dwCombo_beforerender(sender){
    //dwCombo.store = jbStore;
    dwCombo.displayField = 'dwmc';
    dwCombo.valueField = 'dwdm'
}

function jbCombo_beforerender(sender){
    // jbCombo.store = jbStore;
     jbCombo.displayField = 'name';
     jbCombo.valueField = 'code'
}

function lxCombo_beforerender(sender){
//lxCombo.store = jbStore;
    lxCombo.displayField = 'name';
    lxCombo.valueField = 'code'
}

function ztCombo_beforerender(sender){
//ztCombo.store = jbStore;
    ztCombo.displayField = 'name';
    ztCombo.valueField = 'code'
}

//2016-06-16
function getDate(sj) {
    
      if(sj !==""){
    var mydate = sj;
    var str = "" + mydate.getFullYear();
    str += "-" + (mydate.getMonth() + 1 < 10 ? '0' + (mydate.getMonth() + 1) : mydate.getMonth() + 1);
    str += "-" + (mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate());
    
      }else{
          str="";
      }
      
      return str;
}


function ksrqC_change(sender,newValue,oldValue){

}

function jsrqC_change(sender,newValue,oldValue){

}
			this.Condition_beforerender=Condition_beforerender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				layoutConfig:{
					align:"middle",
					pack:"start"
				},
				title:"Panel",
				header:false,
				border:false,
				height:50,
				layout:"hbox",
				width:1602,
				style:"font-family: 'microsoft yahei';    font-size: 12px;",
				items:[
					{
						xtype:"label",
						id:"dwText",
						text:this.dw_lable_text,
						margins:"0 0 0 10"
					},
					{
						xtype:"vmd.combo",
						id:"dwCombo",
						width:150,
						beforerender:"dwCombo_beforerender",
						firstSelected:false,
						margins:"0 10 0 0",
						cls:"bk",
						listeners:{
							beforerender:dwCombo_beforerender
						},
						store:this.dw_combo_store
					},
					{
						xtype:"label",
						id:"ksT",
						text:this.ksText,
						margins:""
					},
					{
						xtype:"datefield",
						id:"ksrqC",
						format:"Y-m-d",
						showToday:false,
						allowBlank:true,
						hideTrigger:false,
						margins:"",
						width:120,
						style:"height: 30px;    font-family: 'Microsoft YaHei';    font-size: 14px;    border: 0px;",
						cls:"x-form-field-wrap",
						defaultValue:this.ksrqCalendar
					},
					{
						xtype:"label",
						id:"Dash",
						text:"—"
					},
					{
						xtype:"label",
						id:"jsT",
						text:this.jsText,
						margins:"0 0 0 10",
						height:15
					},
					{
						xtype:"datefield",
						id:"jsrqC",
						format:"Y-m-d",
						showToday:false,
						allowBlank:false,
						defaultValue:this.jsrqCalendar,
						style:"height: 30px;    font-family: 'Microsoft YaHei';    font-size: 14px;    border: 0px;",
						width:120,
						cls:"x-form-field-wrap",
						change:"jsrqC_change",
						listeners:{
							change:jsrqC_change
						}
					},
					{
						xtype:"label",
						id:"jbText",
						text:this.jb_lable_text,
						margins:"0 0 0 10"
					},
					{
						xtype:"vmd.combo",
						id:"jbCombo",
						width:150,
						beforerender:"jbCombo_beforerender",
						firstSelected:true,
						cls:"bk",
						listeners:{
							beforerender:jbCombo_beforerender
						},
						store:this.jb_combo_store
					},
					{
						xtype:"label",
						id:"lxText",
						text:this.lx_combo_text,
						margins:"0 0 0 10"
					},
					{
						xtype:"vmd.combo",
						id:"lxCombo",
						width:150,
						beforerender:"lxCombo_beforerender",
						firstSelected:true,
						cls:"bk",
						listeners:{
							beforerender:lxCombo_beforerender
						},
						store:this.lx_combo_store
					},
					{
						xtype:"label",
						id:"ztText",
						text:this.zt_combo_text,
						margins:"0 0 0 10"
					},
					{
						xtype:"vmd.combo",
						id:"ztCombo",
						width:150,
						beforerender:"ztCombo_beforerender",
						firstSelected:true,
						cls:"bk",
						listeners:{
							beforerender:ztCombo_beforerender
						},
						store:this.zt_combo_store
					},
					{
						xtype:"label",
						id:"ygjText",
						text:this.ygjobjtext,
						margins:"0 0 0 10"
					},
					{
						xtype:"textfield",
						id:"ygj_text",
						allowBlank:true,
						enableKeyEvents:true,
						style:"height: 30px;",
						inputType:"text",
						cls:"bk"
					},
					{
						xtype:"vmd.button",
						id:"btn_query",
						text:"查询",
						type:"(none)",
						size:"small",
						icon:"search",
						width:80,
						height:30,
						cls:"vmd-btn vmd-button-selected",
						margins:"0 10",
						click:"btn_query_click",
						disabled:false,
						style:"font-size: 14px;",
						listeners:{
							click:btn_query_click
						}
					},
					{
						xtype:"vmd.button",
						id:"btn_export",
						text:"导出",
						type:"(none)",
						size:"small",
						cls:"vmd-btn vmd-button-selected",
						width:79,
						height:30,
						icon:"edit-outline",
						click:"btn_export_click",
						style:"font-size: 14px;",
						listeners:{
							click:btn_export_click
						}
					}
				],
				ztShow:this.ztShow,
				dwShow:this.dwShow,
				lxShow:this.lxShow,
				jbShow:this.jbShow,
				jsTshow:this.jsTshow,
				ygjdx_show:this.ygjdx_show,
				ksTshow:this.ksTshow
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.GetParams= function(){
//直接填写方法内容

 var dwdm = dwCombo.getValue();
 var dwmc = dwCombo.getText();
 var jbdm = jbCombo.getValue();
 var jbmc = lxCombo.getText();
 var lxdm = lxCombo.getValue();
 var lxmc = lxCombo.getText();
 var ztdm = ztCombo.getValue();
 var ztmc = ztCombo.getText();
 var kssj = getDate(ksrqC.getValue());
 var jssj = getDate(jsrqC.getValue());
 var yjobj =ygj_text.getValue();
 var params=[{
     'dwdm':dwdm,
     'dwmc':dwmc,
     'jbdm':jbdm,
     'jbmc':jbmc,
     'lxdm':lxdm,
     'lxmc':lxmc,
     'ztdm':ztdm,
     'ztmc':ztmc,
     'kssj':kssj,
     'jssj':jssj,
     'yjobj':yjobj
     
 }];
 return params[0];

	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Condition");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Condition");
	}
})