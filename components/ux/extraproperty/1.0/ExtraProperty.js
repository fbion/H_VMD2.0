Ext.define("vmd.ux.ExtraProperty" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup"]),
	version:"1.0",
	xtype:"vmd.ux.ExtraProperty",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:134,
	layout:"absolute",
	direction:"1",
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

function extraDirection_click(sender, selectedIndex) {
    //alert(selectedIndex)
    page.fireEvent("directionClick", extraDirection, selectedIndex);

}

function btnLeft_click(sender, e) {
    // vmd('.vmd-report td').css('cursor', 'pointer')
    // 
    //  page
    if(parent && parent.etraLeft) {

        var grid = page.rootScope.selectCell.grid;
        if(!grid && page.rootScope.selectCell.cells) {
            if(page.rootScope.selectCell.cells.grid) grid = page.rootScope.selectCell.cells.grid;
        }
        parent.etraLeft(grid);
    }
}

function btnTop_click(sender, e) {
    // vmd('.vmd-report td').css('cursor', 'pointer')
    if(parent && parent.etraTop) {

        var grid = page.rootScope.selectCell.grid;
        if(!grid && page.rootScope.selectCell.cells) {
            if(page.rootScope.selectCell.cells.grid) grid = page.rootScope.selectCell.cells.grid;
        }
        parent.etraTop(grid);
    }
}

function chkExtraLeft_check(sender, checked) {
    if(checked) {
        leftParent.setValue("");
        leftParent.fireEvent("change",leftParent,"");
    }
}

function chkExtraTop_check(sender,checked){
if(checked) {
        rightParent.setValue("");
        rightParent.fireEvent("change",rightParent,"");
    }
}
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"左父格：",
				x:15,
				y:20
			},
			{
				xtype:"textfield",
				id:"leftParent",
				allowBlank:true,
				x:70,
				y:15,
				width:70,
				emptyText:this.leftParent
			},
			{
				xtype:"label",
				id:"label1",
				text:"上父格：",
				x:15,
				y:60
			},
			{
				xtype:"textfield",
				id:"rightParent",
				allowBlank:true,
				x:70,
				y:55,
				width:70,
				emptyText:this.rightParent
			},
			{
				xtype:"label",
				id:"label2",
				text:"扩展方向：",
				x:5,
				y:100
			},
			{
				xtype:"vmd.ux.ButtonGroup",
				id:"extraDirection",
				layout:"anchor",
				x:70,
				y:95,
				height:30,
				count:"3",
				text:"不扩展,纵向,横向",
				width:170,
				selectIndex:this.direction,
				click:"extraDirection_click",
				listeners:{
					click:extraDirection_click
				}
			},
			{
				xtype:"vmd.button",
				id:"btnLeft",
				type:"(none)",
				size:"small",
				x:150,
				y:15,
				width:20,
				style:"background: url('/system/img/report/SelectCell.png') no-repeat center center",
				height:20,
				click:"btnLeft_click",
				listeners:{
					click:btnLeft_click
				}
			},
			{
				xtype:"vmd.button",
				id:"btnTop",
				type:"(none)",
				size:"small",
				x:150,
				y:55,
				width:20,
				style:"background: url('/system/img/report/SelectCell.png') no-repeat center center",
				height:20,
				click:"btnTop_click",
				listeners:{
					click:btnTop_click
				}
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"清除左父",
				type:"(none)",
				size:"small",
				x:185,
				y:10,
				width:70,
				height:30
			},
			{
				xtype:"vmd.button",
				id:"button1",
				text:"清除上父",
				type:"(none)",
				size:"small",
				x:185,
				y:50,
				width:70,
				height:30
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setSelectIndex= function(index){
//直接填写方法内容
extraDirection.setSelectIndex(parseInt(index));
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ExtraProperty");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ExtraProperty");
	}
})