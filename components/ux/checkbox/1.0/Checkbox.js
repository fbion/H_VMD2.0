Ext.define("vmd.ux.Checkbox" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Checkbox",
	title:"Panel",
	header:false,
	border:false,
	width:60,
	height:24,
	layout:"fit",
	beforerender:"Checkbox_beforerender",
	autoHeight:false,
	afterrender:"Checkbox_afterrender",
	listeners:{
		beforerender:function(){
	this.Checkbox_beforerender(this)
},
		vmdafterrender:function(){
	this.Checkbox_afterrender(this)
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
			function Checkbox_beforerender(sender) {
    this.autoWidth = true
    //动态加载样式
    if(!vmd.fn.checkbox) {
        LazyLoad.css(vmd.virtualPath + '/js/plugins/checkbox/checkbox.css')
        LazyLoad.js(vmd.virtualPath + '/js/plugins/checkbox/checkbox.js', function() {
            page.loadcomplete = true;
        })
    }else  page.loadcomplete = true;

}
var page = this;

function chckdiv_afterrender(sender) {

    page.checkbox = chckdiv.el.child('.checkbox');
    page.chklabel = page.checkbox.child('label');
    page.chkinput = page.checkbox.child('input');

    //settings
    page.label = chckdiv.label;
    page.type = chckdiv._type || 'toggle';
    page.ischecked = chckdiv.ischecked;

}

function setType(type) {

    vmd(page.checkbox.dom).removeClass('radio').removeClass('slider').removeClass('toggle').addClass(type);
}

function Checkbox_afterrender(sender) {
    //属性初始化
    //label显示
    vmd(page.chklabel.dom).text(page.label || '');
    //按钮的切换类型
    page.checkbox.addClass(page.type);
    //是否选中
    if(page.ischecked) vmd(page.chkinput.dom).attr("checked", "checked");

    vmd.taskRunner(function() {

        return page.loadcomplete;
    }, function() {

        vmd(page.checkbox.dom).checkbox({
            onChecked: function() {
                page.fireEvent('onChecked', page)
            },
            onUnchecked: function() {
                page.fireEvent('onUnchecked', page)
            },
            onEnable: function() {

            },
            onDisable: function() {

            }
        })
    })

}
			this.Checkbox_afterrender=Checkbox_afterrender;
		this.Checkbox_beforerender=Checkbox_beforerender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"chckdiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				html:"<div class=\"ui  checkbox\">    <input type=\"checkbox\">    <label>    </label></div>",
				autoWidth:true,
				autoHeight:false,
				afterrender:"chckdiv_afterrender",
				listeners:{
					vmdafterrender:chckdiv_afterrender
				},
				label:this.label,
				_type:this.type,
				ischecked:this.ischecked
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setType= function(type){
//直接填写方法内容
setType(type)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Checkbox");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Checkbox");
	}
})