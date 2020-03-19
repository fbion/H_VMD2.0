Ext.define("vmd.ux.AlignGroup" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.AlignGroup",
	title:"Panel",
	header:false,
	border:false,
	width:210,
	height:75,
	layout:"fit",
	afterrender:"AlignGroup_afterrender",
	beforerender:"AlignGroup_beforerender",
	listeners:{
		vmdafterrender:function(){
	this.AlignGroup_afterrender(this)
},
		beforerender:function(){
	this.AlignGroup_beforerender(this)
}
	},
	uxCss:".btnStyle {      border-radius: 0;      background-color: #ffffff;       }      .btn-selected{    border-radius: 0;    background-color: #99b4c1;}",
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
var obj = {
    HAlign: {
        value: "left",
    },
    VAlign: {
        value: "middle",
    }
};

function setValue(align) {
    //
    if(align.VAlign.value == "top") {
        btnTop.removeClass("btn-selected");
        btnMiddle.removeClass("btn-selected");
        btnBottom.removeClass("btn-selected");
        btnTop.addClass("btn-selected");
        setNoVChecked();
        btnTop.checked = true;
    } else if(align.VAlign.value == "middle") {
        btnTop.removeClass("btn-selected");
        btnMiddle.removeClass("btn-selected");
        btnBottom.removeClass("btn-selected");
        btnMiddle.addClass("btn-selected");
        setNoVChecked();
        btnMiddle.checked = true;
    } else if(align.VAlign.value == "bottom") {
        btnTop.removeClass("btn-selected");
        btnMiddle.removeClass("btn-selected");
        btnBottom.removeClass("btn-selected");
        btnBottom.addClass("btn-selected");
        setNoVChecked();
        btnBottom.checked = true;
    }
    if(align.HAlign.value == "left") {
        btnLeft.removeClass("btn-selected");
        btnCenter.removeClass("btn-selected");
        btnRight.removeClass("btn-selected");
        btnLeft.addClass("btn-selected");
        setNoHChecked();
        btnLeft.checked = true;
    } else if(align.HAlign.value == "center" ||align.HAlign.value == "centter") {
        btnLeft.removeClass("btn-selected");
        btnCenter.removeClass("btn-selected");
        btnRight.removeClass("btn-selected");
        btnCenter.addClass("btn-selected");
        setNoHChecked();
        btnCenter.checked = true;
    } else if(align.HAlign.value = "right") {
        btnLeft.removeClass("btn-selected");
        btnCenter.removeClass("btn-selected");
        btnRight.removeClass("btn-selected");
        btnRight.addClass("btn-selected");
        setNoHChecked();
        btnRight.checked = true;
    }
}

function AlignGroup_afterrender(sender) {
    
   // panel
   setSeletedCheck();
}

function setSeletedCheck() {
   // 
    var buttongroups = vmd(panel.el.dom).find(".btnStyle");
    // 鼠标点击事件
    buttongroups.on('click', function(e) {
        // buttongroups.removeClass("btn-selected")
       // 
        var curEl = e.currentTarget;
        // 
        var btnName = Ext.getCmp(e.currentTarget.id).initialConfig.id;
        if(btnName == "btnTop") {
            btnTop.removeClass("btn-selected");
            btnMiddle.removeClass("btn-selected");
            btnBottom.removeClass("btn-selected");
            setNoVChecked();
            obj.VAlign.value = "top";
            btnTop.checked = true;
        } else if(btnName == "btnMiddle") {
            obj.VAlign.value = "middle";
            btnTop.removeClass("btn-selected");
            btnMiddle.removeClass("btn-selected");
            btnBottom.removeClass("btn-selected");
            setNoVChecked();
            btnMiddle.checked = true;

        } else if(btnName == "btnBottom") {
            obj.VAlign.value = "bottom";
            btnTop.removeClass("btn-selected");
            btnMiddle.removeClass("btn-selected");
            btnBottom.removeClass("btn-selected");
            setNoVChecked();
            btnBottom.checked = true;
        } else if(btnName == "btnLeft") {
            btnLeft.removeClass("btn-selected");
            btnCenter.removeClass("btn-selected");
            btnRight.removeClass("btn-selected");
            obj.HAlign.value = "left";
            setNoHChecked();
            btnLeft.checked = true;
        } else if(btnName == "btnCenter") {
            btnLeft.removeClass("btn-selected");
            btnCenter.removeClass("btn-selected");
            btnRight.removeClass("btn-selected");
            obj.HAlign.value = "center";
            setNoHChecked();
            btnCenter.checked = true;
        } else if(btnName = "btnRight") {
            btnLeft.removeClass("btn-selected");
            btnCenter.removeClass("btn-selected");
            btnRight.removeClass("btn-selected");
            obj.HAlign.value = "right";
            setNoHChecked();
            btnRight.checked = true;
        }
        vmd(curEl).addClass('btn-selected');
        page.fireEvent('click', panel, obj)
    })
}

function setNoVChecked() {
    btnTop.checked = false;
    btnMiddle.checked = false;
    btnBottom.checked = false;
}

function setNoHChecked() {
    btnLeft.checked = false;
    btnCenter.checked = false;
    btnRight.checked = false;
}

function AlignGroup_beforerender(sender) {
    setNoHChecked();
    setNoVChecked();

    btnMiddle.addClass("btn-selected");
    btnLeft.addClass("btn-selected");
    btnMiddle.checked = true;
    btnLeft.checked = true;
}

function panel_afterrender(sender){
//setSeletedCheck();
}
			this.AlignGroup_afterrender=AlignGroup_afterrender;
		this.AlignGroup_beforerender=AlignGroup_beforerender;
		this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:false,
				height:100,
				layout:"absolute",
				afterrender:"panel_afterrender",
				listeners:{
					vmdafterrender:panel_afterrender
				},
				items:[
					{
						xtype:"label",
						id:"label",
						text:"垂直对齐：",
						x:20,
						y:14
					},
					{
						xtype:"label",
						id:"label1",
						text:"水平对齐：",
						x:20,
						y:50
					},
					{
						xtype:"vmd.button",
						id:"btnTop",
						type:"(none)",
						size:"small",
						x:80,
						y:10,
						width:30,
						cls:"btnStyle",
						style:"background-image: url('/system/img/report/AlignTop.png');    background-repeat: no-repeat;    background-position: center;"
					},
					{
						xtype:"vmd.button",
						id:"btnMiddle",
						type:"(none)",
						size:"small",
						x:110,
						y:10,
						width:30,
						cls:"btnStyle",
						style:"background-image: url('/system/img/report/AlignMiddle.png');    background-repeat: no-repeat;    background-position: center;"
					},
					{
						xtype:"vmd.button",
						id:"btnBottom",
						type:"(none)",
						size:"small",
						x:140,
						y:10,
						width:30,
						cls:"btnStyle",
						style:"background-image: url('/system/img/report/AlignBottom.png');    background-repeat: no-repeat;    background-position: center;"
					},
					{
						xtype:"vmd.button",
						id:"btnLeft",
						type:"(none)",
						size:"small",
						x:80,
						y:46,
						width:30,
						style:"background-image: url('/system/img/report/AlignLeft.png');    background-position: center;  background-repeat: no-repeat;",
						cls:"btnStyle"
					},
					{
						xtype:"vmd.button",
						id:"btnCenter",
						type:"(none)",
						size:"small",
						x:109,
						y:46,
						width:30,
						style:"background-image:  url('/system/img/report/AlignCenter.png');    background-position: center;    background-repeat: no-repeat;",
						cls:"btnStyle"
					},
					{
						xtype:"vmd.button",
						id:"btnRight",
						type:"(none)",
						size:"small",
						x:138,
						y:46,
						width:30,
						style:"background-image:  url('/system/img/report/AlignRight.png');    background-position: center;    background-repeat: no-repeat;",
						cls:"btnStyle"
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getValue= function(){
//直接填写方法内容
var obj = {
    HAlign: {
        value: "left",
    },
    VAlign: {
        value: "middle",
    }
};

if(btnTop.checked){
    obj.VAlign.value="top";
}
else if(btnMiddle.checked){
     obj.VAlign.value="middle";
}
else if(btnBottom.checked){
     obj.VAlign.value="bottom";
}
if(btnLeft.checked){
     obj.HAlign.value="left";
}
else if(btnCenter.checked){
     obj.HAlign.value="center";
}
else if(btnRight.checked){
     obj.HAlign.value="right";
}

return obj;
	}
		this.setValue= function(align){
//直接填写方法内容

setValue(align);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.AlignGroup");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AlignGroup");
	}
})