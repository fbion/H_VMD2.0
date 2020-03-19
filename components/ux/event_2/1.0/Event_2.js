Ext.define("vmd.ux.Event_2" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Event_2",
	title:"Panel",
	header:false,
	border:false,
	width:320,
	height:621,
	layout:"absolute",
	afterrender:"Event_2_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Event_2_afterrender(this)
}
	},
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
			function eve_click_afterrender(sender) {
    eve_click.el.on('dblclick', function() {
        // alert('oneclick')
        var message = hub.getValue() + 'function eve_click(sender){\n\n}'
        // 创建一个新窗口（有url指向） 
        var win = new vmd.window({
            url: '/modules/eQ9ULgcVb1/hwYa3IA0Y1/hw808a70ca.html?message=' + message,
            title: '事件编辑',
            enableLoading: true, //启用进度加载
            width: 1400,
            height: 700,
            auto: true, //auto为true 自动适应窗口，配合offset使用
            offset: [50, 50],
            params: {} //url中追加的编码的参数，json格式 
        })
        win.show(); //窗口显示

        win.on('hide', function() {
            
            var temp = win.iframe.getSonInfo()
            hub.setValue(hub.getValue() + temp)
        })


    })
}

function eve_dbClick_afterrender(sender) {
    eve_dbClick.el.on('dblclick', function() {
        // alert("hhh")
        var message = hub.getValue() + 'function eve_dbClick(sender){\n\n}'
        // 创建一个新窗口（有url指向） 
        var win = new vmd.window({
            url: '/modules/eQ9ULgcVb1/hwYa3IA0Y1/hw808a70ca.html?message=' + message,
            title: '事件编辑',
            enableLoading: true, //启用进度加载
            width: 1400,
            height: 700,
            auto: true, //auto为true 自动适应窗口，配合offset使用
            offset: [50, 50],
            params: {} //url中追加的编码的参数，json格式 
        })
        win.show(); //窗口显示

        win.on('hide', function() {
            
            var temp = win.iframe.getSonInfo()
            hub.setValue(hub.getValue() + temp)
        })
    })
}


function Event_2_afterrender(sender) {


}
			this.Event_2_afterrender=Event_2_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label",
				text:"click:",
				x:40,
				y:15
			},
			{
				xtype:"label",
				id:"label1",
				text:"dobleClick:",
				x:5,
				y:45
			},
			{
				xtype:"textfield",
				id:"eve_dbClick",
				allowBlank:true,
				x:80,
				y:40,
				width:220,
				afterrender:"eve_dbClick_afterrender",
				listeners:{
					vmdafterrender:eve_dbClick_afterrender
				}
			},
			{
				xtype:"textfield",
				id:"eve_click",
				allowBlank:true,
				x:80,
				y:10,
				width:220,
				afterrender:"eve_click_afterrender",
				listeners:{
					vmdafterrender:eve_click_afterrender
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Event_2");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Event_2");
	}
})