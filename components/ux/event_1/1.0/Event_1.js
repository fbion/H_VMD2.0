Ext.define("vmd.ux.Event_1" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Event_1",
	title:"Panel",
	header:false,
	border:false,
	width:641,
	height:621,
	layout:"absolute",
	afterrender:"Event_1_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.Event_1_afterrender(this)
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
        var win = new vmd.window({
            url: '/modules/eQ9ULgcVb1/hwYa3IA0Y1/hw808a70ca.html?message=' + message,
            title: '事件编辑',
            enableLoading: true, //启用进度加载
            width: 1400,
            height: 700,
            auto: false, //auto为true 自动适应窗口，配合offset使用
            params: {} //url中追加的编码的参数，json格式 
        })
        win.show(); //窗口显示
        win.on('hide', function() {
            
            var temp = win.iframe.getSonInfo()
            hub.setValue(hub.getValue() + temp)
        })
    })
}

function eve_change_afterrender(sender) {
    eve_change.el.on('dblclick', function() {
        // alert("changed")
        var message = hub.getValue() + 'function eve_change(sender){\n\n}'
        var win = new vmd.window({
            url: '/modules/eQ9ULgcVb1/hwYa3IA0Y1/hw808a70ca.html?message=' + message,
            title: '事件编辑',
            enableLoading: true, //启用进度加载
            width: 1400,
            height: 700,
            auto: false, //auto为true 自动适应窗口，配合offset使用
            params: {} //url中追加的编码的参数，json格式 
        })
        win.show(); //窗口显示
        win.on('hide', function() {
            
            var temp = win.iframe.getSonInfo()
            hub.setValue(hub.getValue() + temp)
        })
    })
}

function Event_1_afterrender(sender) {

}
			this.Event_1_afterrender=Event_1_afterrender;
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
				xtype:"label",
				id:"label2",
				text:"change:",
				x:23,
				y:75
			},
			{
				xtype:"textfield",
				id:"eve_change",
				allowBlank:true,
				x:80,
				y:70,
				width:220,
				afterrender:"eve_change_afterrender",
				listeners:{
					vmdafterrender:eve_change_afterrender
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
			},
			{
				xtype:"vmd.ace",
				id:"hub",
				height:260,
				width:320,
				language:"javascript",
				x:320,
				y:0
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getCode= function(){
var temp;
temp = hub.getValue()
return temp;
	}
		this.setCode= function(code){
//直接填写方法内容
hub.setValue(code)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Event_1");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Event_1");
	}
})