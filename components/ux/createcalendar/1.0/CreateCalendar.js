Ext.define("vmd.ux.CreateCalendar" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.CreateCalendar",
	layoutConfig:{
		align:"middle",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:493,
	height:55,
	layout:"hbox",
	autoHeight:false,
	region:"10",
	afterrender:"CreateCalendar_afterrender",
	unstyled:false,
	autoScroll:false,
	listeners:{
		vmdafterrender:function(){
	this.CreateCalendar_afterrender(this)
}
	},
	startDateNameTxt:"开始时间：",
	startDateCls:"dateYmd",
	endDateNameTxt:"结束时间：",
	endDateCls:"dateYmd",
	btnTxt:"查询",
	btnType:"(none)",
	btnImg:"(none)",
	uxCss:".dateYmd {    width: 95px;    background-image: url('{资源中心&&资源中心服务器}/图片/calendar.png');    background-position: right;    background-repeat: no-repeat;    background-position: 111px;    border: 1px solid #e4e4e4;    background-position: 90%;    font-size: 14px;}",
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
var now = new Date;
var bz='';
function button_click(sender, e) {
    page.fireEvent('queryBtnClick',button,hwDate.getValue(true),hwDate1.getValue(true));
}

function CreateCalendar_afterrender(sender) {
    label.el.setStyle('font-size', label.fontSize + "px");
    label1.el.setStyle('font-size', label.fontSize + "px");
    hwDate.el.setStyle('font-size', label.fontSize + "px");
    hwDate1.el.setStyle('font-size', label.fontSize + "px");
    button.el.setStyle('font-size', label.fontSize + "px");
    label.el.setStyle('font-family', label.family);
    label1.el.setStyle('font-family', label.family);
    hwDate.el.setStyle('font-family', label.family);
    hwDate1.el.setStyle('font-family', label.family);
    button.el.setStyle('font-family', label.family);
    label.el.setStyle('color', label.fonColor);
    label1.el.setStyle('color', label1.fonColor1);
    label.el.setStyle('font-weight', label.fonWeight);
    label1.el.setStyle('font-weight', label.fonWeight);
    hwDate.el.setStyle('font-weight', label.fonWeight);
    hwDate1.el.setStyle('font-weight', label.fonWeight);
    button.el.setStyle('font-weight', label.fonWeight);
    button.el.setStyle('color', button.btnColor);
    button.el.setStyle('background-color', button.btnBgColor);
    if(button.IconPath != undefined && button.IconPath != '') {
       button.el.dom.childNodes[0].className= button.IconPath;
    }
    bz = hwDate.contrastSze||'lt';
}

function hwDate_beforerender(sender) {
    hwDate.format = hwDate.format1 || hwDate.format;
    var val = now;
    var defaulVal = hwDate.defaultValueSel || 'today';
    //指定前推
    if(defaulVal == 'zdqt') {
        if(hwDate.specifiedSel == 'day') {
            val = Ext.Date.add(now, Ext.Date.DAY, -hwDate.specifiedForPush);
        } else if(hwDate.specifiedSel == 'mon') {
            val = Ext.Date.add(now, Ext.Date.MONTH, -hwDate.specifiedForPush);
        } else if(hwDate.specifiedSel == 'year') {
            val = Ext.Date.add(now, Ext.Date.YEAR, -hwDate.specifiedForPush);
        }
        hwDate.setValue(val);

    } else if(defaulVal == 'zdrq') { //指定日期
        var seperator = "-";
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var strDate = hwDate.specified;
        if(month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if(strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        val = year + seperator + month + seperator + strDate;
        hwDate.setValue(val);
    } else {
        hwDate.initDefaultValue(defaulVal);
    }
}

function hwDate1_beforerender(sender) {
    hwDate1.format = hwDate.format1 || hwDate.format;
    var val = now;
    var defaulVal = hwDate1.defaultValueSel || 'today';
    //指定前推
    if(defaulVal == 'zdqt') {
        if(hwDate1.specifiedSel == 'day') {
            val = Ext.Date.add(now, Ext.Date.DAY, -hwDate1.specifiedForPush);
        } else if(hwDate.specifiedSel == 'mon') {
            val = Ext.Date.add(now, Ext.Date.MONTH, -hwDate1.specifiedForPush);
        } else if(hwDate.specifiedSel == 'year') {
            val = Ext.Date.add(now, Ext.Date.YEAR, -hwDate1.specifiedForPush);
        }
        hwDate1.setValue(val);

    } else if(defaulVal == 'zdrq') { //指定日期
        var seperator = "-";
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var strDate = hwDate1.specified;
        if(month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if(strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        val = year + seperator + month + seperator + strDate;
        hwDate1.setValue(val);
    } else {
        hwDate1.initDefaultValue(defaulVal);
    }
}


window.contrastSze = function(val) {
    var kssj = hwDate.getValue(true).replace(/-/g, "/");
    var jssj = hwDate1.getValue(true).replace(/-/g, "/");
    //把字符串格式转换为日期类
    var startTime = new Date(kssj).getTime();
    var endTime = new Date(jssj).getTime();
    if(val == 'gt') {
        if(startTime > endTime) {
            return true;
        } else {
            alert('开始时间不能小于结束时间');
            return;
        }
    } else if(val == 'lt') {
        if(startTime < endTime) {
            return true;
        } else {
            alert('开始时间不能大于结束时间');
            return;
        }
    } else {
        alert('请选择校验标准');
        return;
    }
}

function hwDate_select(sender, date) {
    //调用比较大小
    page.fireEvent('startDateOnchange',hwDate,hwDate.getValue(true),hwDate1.getValue(true),bz);
    //contrastSze(bz);
}

function hwDate1_select(sender, date) {
    page.fireEvent('endDateOnchange',hwDate1,hwDate.getValue(true),hwDate1.getValue(true),bz);
    //调用比较大小
    //contrastSze(bz);
}
			this.CreateCalendar_afterrender=CreateCalendar_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:this.startDateNameTxt,
				x:30,
				y:40,
				columnWidth:"",
				margins:"0 4 0 10",
				cls:this.startDateNameCls,
				fontSize:this.fonSize,
				fonColor:this.fontColor,
				family:this.fontFamily,
				fonWeight:this.fontWeight
			},
			{
				xtype:"datefield",
				id:"hwDate",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				defaultValue:"today",
				hideTrigger:true,
				cls:this.startDateCls,
				beforerender:"hwDate_beforerender",
				select:"hwDate_select",
				listeners:{
					beforerender:hwDate_beforerender,
					select:hwDate_select
				},
				format1:this.dateFormat,
				hideTrigger1:this.dateImghid,
				defaultValueSel:this.startDateDeftSel,
				specifiedSel:this.startSpecifiedSel,
				specifiedForPush:this.startSpecifiedForPush,
				specified:this.startSpecifiedTimeIn,
				contrastSze:this.contrastSze
			},
			{
				xtype:"label",
				id:"label1",
				text:this.endDateNameTxt,
				margins:"0 4 0 10",
				cls:this.endDateNameCls
			},
			{
				xtype:"datefield",
				id:"hwDate1",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				defaultValue:"today",
				hideTrigger:true,
				cls:this.endDateCls,
				beforerender:"hwDate1_beforerender",
				select:"hwDate1_select",
				listeners:{
					beforerender:hwDate1_beforerender,
					select:hwDate1_select
				},
				defaultValueSel:this.endDateDeftSel,
				specifiedSel:this.endSpecifiedSel,
				specifiedForPush:this.endSpecifiedForPush,
				specified:this.endSpecifiedTimeIn
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:this.btnTxt,
				type:this.btnType,
				size:"small",
				click:"button_click",
				margins:"0 10 0 10 ",
				width:55,
				icon:this.btnImg,
				listeners:{
					click:button_click
				},
				hidden:this.btnHid,
				btnBgColor:this.btnBgColor,
				btnColor:this.btnFontColor,
				IconPath:this.btnImgPath,
				cls:this.btnCls
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getStartDateVal= function(){
//直接填写方法内容
return hwDate.getValue(true);
	}
		this.getEndDateVal= function(){
//直接填写方法内容
return hwDate1.getValue(true);
	}
		this.setStartDateVal= function(ksrq){
//直接填写方法内容
hwDate.setValue(ksrq);
	}
		this.setEndDateVal= function(jsrq){
//直接填写方法内容
hwDate1.setValue(jsrq);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.CreateCalendar");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.CreateCalendar");
	}
})