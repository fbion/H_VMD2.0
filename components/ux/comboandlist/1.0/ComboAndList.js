Ext.define("vmd.ux.ComboAndList" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ComboAndList",
	title:"Panel",
	header:false,
	border:false,
	width:785,
	height:465,
	layout:"absolute",
	afterrender:"ComboAndList_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.ComboAndList_afterrender(this)
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
			


/*
    2018-11-9  
    1.准备comboo和tree  tree用div包裹，tree的大小自己设置
    2.调用addTreeView()传入combo的id和div的id
    3.配置tree的单击事件
*/
function ComboAndList_afterrender(sender){
    addTreeView(combo,div);//1.comb 2.tree的容器div
    
}

//节点单击事件
function tree_nodeclick(sender,node,e){
//   if(node.firstChild) {//判断选择的是不是父节点
//  
//         Ext.alert('提示：','请选择子节点！');
//         return;
//     }
 // var value = node.nodeDataJson.business_associate_id;//保存value 存值使用
//comboo.setValue('要保存到数据库的value');
   combo.setText('设置的文本')//置文本
    $(div.el.dom).hide();//隐藏树
}

//
(function(window) {
    function Intil(comDom, wrapDom) {
        var jqObj =$(comDom.el.dom);
        console.log(jqObj);
        this.ele = jqObj;
        this.vmd = comDom;
        this.offset = jqObj.offset();
        this.height = jqObj.innerHeight() + 1;
        this.width = jqObj.innerWidth();
        this.wrapper = $(wrapDom);
        this.timer = null;
        this.addCss();
        this.blindEvent();
    }
    Intil.prototype.addCss = function() {
        this.wrapper.css({
            position: 'absolute',
            display: 'none',
            top: this.offset.top + this.height,
            left: this.offset.left,
            height: 200,
            zIndex:9999,
            width: this.width,
        }).appendTo($('body'));
    }
    Intil.prototype.blindEvent = function() {
        var self = this;
        console.log(this.ele[0].nodeName.toLowerCase());
        this.ele = this.ele[0].nodeName.toLowerCase() == 'input'?
         this.ele:$("input[type='text']",this.ele);//兼容组件开发环境
        $( this.ele).focus(function(e) {
            self.wrapper.show();
        }).on('input', function() {
          self.timer&&clearTimeout(self.timer);
          self.timer = setTimeout(function(){
                 tree.filterBy(self.vmd.getText());
            },400)
           
        })
    }
      window.addTreeView = function(combo,treeWrapper) {
            new Intil(combo, treeWrapper.el.dom);
        }
}(window))


			this.ComboAndList_afterrender=ComboAndList_afterrender;
		this.items=[
			{
				xtype:"vmd.combo",
				id:"combo",
				width:288,
				x:170,
				y:30
			},
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:true,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:350,
				height:300,
				x:370,
				y:80,
				items:[
					{
						xtype:"vmd.treeex",
						id:"tree",
						width:244,
						height:270,
						hideRoot:false,
						x:330,
						y:150,
						nodeclick:"tree_nodeclick",
						listeners:{
							nodeclick:tree_nodeclick
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.ComboAndList");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ComboAndList");
	}
})