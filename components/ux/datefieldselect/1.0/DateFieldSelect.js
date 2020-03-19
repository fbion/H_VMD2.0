Ext.define("vmd.ux.DateFieldSelect" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DateFieldSelect",
	layoutConfig:{
		align:"middle",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:550,
	height:40,
	layout:"hbox",
	cls:"tiaojian",
	autoScroll:false,
	uxCss:".tiaojian .btn {    background-color: #4a69d1 ;    font-size: 14px;    color: white;    /*height: 25px !important;    text-align: center;     top: 4px !important;*/}.tiaojian .btn span{    /*color: white；*/      }/*日期样式调整*/.tiaojian .date {    color: #2e2e2e;    height: 26px !important;    border-bottom: 0px solid  #FFFFFF ;  }/*通过ctcls（容器的样式）在当前组件的外层容器上加个cls用于限制过多的重复*/.tiaojian .x-form-field-wrap {    border:1px solid #b4bfc7 ;}.tiaojian .com {    color: #2e2e2e;    border:1px solid #b4bfc7;    height: 28px !important;}.tiaojian .lable{     font-size: 14px;     color: #2e2e2e;}  ",
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
			//复合组件公共作用域
var page = this;

function checkData() {
    var flag = true;
    if(date1.getValue() > date2.getValue()) {
        vmd.alert("提示", "结束日期不可小于起始日期！");
        flag = false;
        return flag;
    }
    return flag;
}

function button_click(sender, e) {
    page.fireEvent('queryData', button)

}

function button1_click(sender, e) {
    //写个回调，格式为事件名，作用域，参数1，参数2
    page.fireEvent('exportData', button1)
}

function date1_select(sender, date) {
    if(!checkData()) {
        return date1.setValue(date2.getValue());
    }
    
}

function date2_select(sender, date) {
    if(!checkData()) {
        return date2.setValue(date1.getValue());
    }
    
}
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"取样时间：",
				margins:"0 8 0 10",
				cls:"lable",
				ctCls:"tiaojian"
			},
			{
				xtype:"datefield",
				id:"date1",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				defaultValue:"prevMonth",
				margins:"0 0 0 10",
				cls:"date",
				height:30,
				ctCls:"tiaojian",
				select:"date1_select",
				listeners:{
					select:date1_select
				}
			},
			{
				xtype:"label",
				id:"label1",
				text:"—",
				margins:"0 8 0 10"
			},
			{
				xtype:"datefield",
				id:"date2",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				defaultValue:"today",
				margins:"0 10 0 0",
				cls:"date",
				height:30,
				ctCls:"tiaojian",
				select:"date2_select",
				listeners:{
					select:date2_select
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"查询",
				type:"(none)",
				size:"small",
				x:280,
				y:60,
				margins:"0 10",
				width:80,
				click:"button_click",
				cls:"btn",
				listeners:{
					click:button_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:"导出",
				type:"(none)",
				size:"small",
				margins:"0 10",
				width:80,
				click:"button1_click",
				cls:"btn",
				listeners:{
					click:button1_click
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getDate1= function(){
//直接填写方法内容
return  date1.getValue(true);
	}
		this.getDate2= function(){
//直接填写方法内容
//直接填写方法内容
return  date2.getValue(true);
	}
		this.setDate1= function(p_Date1){
//直接填写方法内容
return date1.setValue(p_Date1);
	}
		this.setDate2= function(p_Date2){
//直接填写方法内容
return date2.setValue(p_Date2);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.DateFieldSelect");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DateFieldSelect");
	}
})