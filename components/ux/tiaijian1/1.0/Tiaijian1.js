Ext.define("vmd.ux.Tiaijian1" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Tiaijian1",
	layoutConfig:{
		align:"middle",
		pack:"center"
	},
	title:"Panel",
	header:false,
	border:false,
	width:373,
	height:40,
	layout:"hbox",
	cls:"tiaojian",
	uxCss:".tiaojian .btn {    background-color: #4a69d1 ;    font-size: 14px;    color: white;    height: 12px !important;    top: 4px !important;}.tiaojian .btn span{    /*color: white；*/      }/*日期样式调整*/.tiaojian .date {    color: #2e2e2e;    height: 26px !important;  }/*通过ctcls（容器的样式）在当前组件的外层容器上加个cls用于限制过多的重复*/.tiaojian .x-form-field-wrap {    border:1px solid #b4bfc7 ;}.tiaojian .com {    color: #2e2e2e;    border:1px solid #b4bfc7;    height: 28px !important;}.tiaojian .lable{         color: #2e2e2e;}  ",
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

function button_click(sender, e) {

    // var rq1 = rq1.getValue(true);
    // var rq2 = rq2.getValue(true)
    // // if(rq1 > rq2) {
    // //     vmd.alert('提示', '开始日期不能大于结束日期')
    // //     return
    // // }
    //  //写个回调，格式为事件名，作用域，参数1，参数2
     page.fireEvent('chaxun', button)
    
}

function button1_click(sender,e){
   //写个回调，格式为事件名，作用域，参数1，参数2
    page.fireEvent('daochu',button1)
}
			this.items=[
			{
				xtype:"label",
				id:"label",
				text:"日期：",
				margins:"0 8 0 10",
				cls:"lable"
			},
			{
				xtype:"datefield",
				id:"rq",
				format:"Y-m-d",
				showToday:true,
				allowBlank:true,
				defaultValue:"today",
				margins:"0 10 0 0",
				cls:"date",
				height:30
			},
			{
				xtype:"vmd.button",
				id:"button",
				text:"查询",
				type:"(none)",
				size:"(none)",
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
				size:"(none)",
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
			this.getrq= function(){
//直接填写方法内容
return  rq.getValue(true);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.Tiaijian1");
		this.uxCss&&Ext.util.CSS.createStyleSheet(this.uxCss, "vmd.ux.Tiaijian1");
	}
})