Ext.define("vmd.ux.SideBar" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.SideBar",
	title:"Panel",
	header:false,
	border:false,
	width:428,
	height:39,
	layout:"fit",
	afterrender:"SideBar_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.SideBar_afterrender(this)
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
			var page = this;

function SideBar_afterrender(sender) {

    LazyLoad.css(vmd.virtualPath + '/js/plugins/sidebar/sidebar.css');
    LazyLoad.js(vmd.virtualPath + '/js/plugins/sidebar/sidebar.js', function() {
       // 
        //div.bindCmp
        // vmd(page.el.dom).sidebar('setting', {
        //     dimPage: true,
        //     transition: 'overlay',
        //     closable: true
        // }).sidebar('toggle');
    })
}
//私有渲染方法
function init(cmp,mode) {
    //dom = dom || page.el.dom
    var dom;
    if(!cmp) return
    if(cmp.el) dom = cmp.el.dom
    else dom = cmp;
    
    mode=mode||page.mode||'right';
    vmd(dom).removeClass('right left top bottom');
    vmd(dom).addClass(mode);
    vmd(dom).sidebar('setting', {
        mode:mode,
        dimPage: true,
        transition: 'overlay',
        closable: true
    }).sidebar('toggle');
    //自动适应
    cmp.doLayout()

}
var _setDisplayMode=init;

			this.SideBar_afterrender=SideBar_afterrender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:50,
				hidden:true
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.init= function(dom,mode){
//直接填写方法内容
init(dom,mode)
	}
		this.setDisplayMode= function(mode){
//直接填写方法内容
_setDisplayMode(dom,mode)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.SideBar");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.SideBar");
	}
})