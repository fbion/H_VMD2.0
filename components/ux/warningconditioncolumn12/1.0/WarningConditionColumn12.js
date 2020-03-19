Ext.define("vmd.ux.WarningConditionColumn12" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.WarningConditionColumn12",
	title:"Panel",
	header:false,
	border:false,
	width:1500,
	height:50,
	layout:"fit",
	autoScroll:false,
	beforerender:"WarningConditionColumn12_beforerender",
	listeners:{
		beforerender:function(){
	this.WarningConditionColumn12_beforerender(this)
}
	},
	dw_lable_text:"单位:",
	ksDate_defaultValue:"prevDay",
	jsDate_defaultValue:"today",
	ygj_Text_xtype:"textfield",
	cx_button_xtype:"vmd.button",
	dc_button_xtype:"vmd.button",
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

function cx_button_click(sender, e) {
    page.fireEvent('chaxun', cx_button)


    // report.query();
}

function dc_button_click(sender, e) {
    page.fireEvent('daochu', sender)
    //report.exportExcel();
}

var jbStore = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ['id', 'name']
})
var jbData = [{
    id: '1',
    name: '一级'
}, {
    id: '2',
    name: '二级'
}, {
    id: '3',
    name: '三级'
}, {
    id: '4',
    name: '四级'
}, {
    id: '5',
    name: '五级'
}]

jbStore.loadData(jbData);

function jb_combo_beforerender(sender) {
    jb_combo.store = jbStore;
    jb_combo.displayField = 'name';
    jb_combo.valueField = 'id'
}






function WarningConditionColumn12_beforerender(sender) {

    if(panel.isdwshow == undefined) panel.isdwshow = true;
    var isdwshow = panel.isdwshow;
    if(!isdwshow) {
        dw_combo.hidden = true;
        dw_label.hide()
    }

}
			this.WarningConditionColumn12_beforerender=WarningConditionColumn12_beforerender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				layoutConfig:{
					align:"middle",
					pack:"center"
				},
				title:"Panel",
				header:false,
				border:true,
				height:100,
				layout:"hbox",
				items:[
					{
						xtype:"label",
						id:"dw_label",
						text:this.dw_lable_text,
						autoHeight:false,
						style:"font-size: 14px;    font-family: 微软雅黑;    color: #000000;",
						width:32,
						margins:"",
						hidden:false
					},
					{
						xtype:"vmd.combo",
						id:"dw_combo",
						width:130,
						style:"height: 30px;    width: 130px;    font-size: 14px;",
						margins:"10 20 10 0",
						hidden:false,
						cls:"bk"
					},
					{
						xtype:"datefield",
						id:"ksDate",
						format:"Y-m-d",
						showToday:false,
						allowBlank:true,
						defaultValue:this.ksDate_defaultValue,
						style:"height: 30px;    font-size: 14px;",
						margins:"",
						cls:"bk"
					},
					{
						xtype:"label",
						id:"g_label",
						text:"—",
						margins:""
					},
					{
						xtype:"datefield",
						id:"jsDate",
						format:"Y-m-d",
						showToday:true,
						allowBlank:false,
						defaultValue:this.jsDate_defaultValue,
						style:"height: 30px;    font-size: 14px;",
						margins:"",
						cls:"bk"
					},
					{
						xtype:"label",
						id:"jb_label",
						text:"级别:",
						x:160,
						y:10,
						width:32,
						margins:"",
						style:"font-family: 微软雅黑;font-size: 14px;"
					},
					{
						xtype:"vmd.combo",
						id:"jb_combo",
						width:130,
						x:300,
						y:10,
						hidden:false,
						margins:"",
						cls:"bk",
						style:"height: 30px;    width: 130px;    font-size: 14px;",
						beforerender:"jb_combo_beforerender",
						listeners:{
							beforerender:jb_combo_beforerender
						},
						store:this.jb_combo_store,
						displayField:this.jb_combo_displayField,
						valueField:this.jb_combo_valueField
					},
					{
						xtype:"label",
						id:"lx_label",
						text:"类型:",
						x:470,
						y:20,
						margins:"",
						style:"font-family: 微软雅黑;    font-size: 14px;"
					},
					{
						xtype:"vmd.combo",
						id:"lx_combo",
						width:130,
						x:500,
						y:10,
						style:"height: 30px;    width: 130px;    font-size: 14px;",
						hidden:false,
						margins:"",
						cls:"bk",
						store:this.lx_combo_store,
						displayField:this.lx_combo_displayField,
						valueField:this.lx_combo_valueField
					},
					{
						xtype:"label",
						id:"zt_label",
						text:"状态:",
						x:670,
						y:20,
						margins:"",
						style:"font-family: 微软雅黑;    font-size: 14px;"
					},
					{
						xtype:"vmd.combo",
						id:"zt_combo",
						width:130,
						x:700,
						y:10,
						style:"height: 30px;    width: 130px;      font-size: 14px;",
						margins:"",
						cls:"bk",
						store:this.zt_combo_store,
						displayField:this.zt_combo_displayField,
						valueField:this.zt_combo_valueField
					},
					{
						xtype:"label",
						id:"dqzt_label",
						text:"当前状态:",
						margins:"20 8 0 0",
						style:"font-size: 14px;",
						autoHeight:false,
						autoWidth:false,
						hidden:true
					},
					{
						xtype:"vmd.combo",
						id:"dqzt_combo",
						width:130,
						margins:"10 20 0 0",
						style:"height: 30px;    font-size: 14px;",
						cls:"bk",
						hidden:true
					},
					{
						xtype:"label",
						id:"ygj_label",
						text:"预告警对象:",
						x:890,
						y:20,
						margins:"",
						style:"font-family: 微软雅黑;    font-size: 14px;"
					},
					{
						xtype:this.ygj_Text_xtype,
						id:"ygj_Text",
						allowBlank:true,
						x:960,
						y:15,
						width:130,
						margins:"0 20",
						height:30,
						style:"height: 30px;    width: 130px;      font-size: 14px;",
						grow:false
					},
					{
						xtype:this.cx_button_xtype,
						id:"cx_button",
						text:"查询",
						type:"(none)",
						size:"small",
						x:1140,
						y:10,
						width:80,
						margins:"0 10",
						style:"background-color: #1E90FF;    font-size: 14px;    color: white;",
						height:30,
						icon:"search",
						click:"cx_button_click",
						cls:"ssss",
						listeners:{
							click:cx_button_click
						}
					},
					{
						xtype:this.dc_button_xtype,
						id:"dc_button",
						text:"导出",
						type:"(none)",
						size:"small",
						x:1240,
						y:10,
						width:80,
						margins:"",
						height:30,
						style:"background-color: #1E90FF;    font-size: 14px;    color: white;",
						icon:"edit-outline",
						click:"dc_button_click",
						listeners:{
							click:dc_button_click
						}
					}
				],
				isdwshow:this.isdwshow
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.Show= function(num){
//直接填写方法内容
if(num==="1"){
    dw_label.hide()
    dw_combo.hide()

}else if(num==="2"){
    
    
}else if(num ==="3"){
    
}else{
    
}
this.doLayout()

	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.WarningConditionColumn12");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.WarningConditionColumn12");
	}
})