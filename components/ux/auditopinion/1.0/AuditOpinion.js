Ext.define("vmd.ux.AuditOpinion" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.AuditOpinion",
	title:"Panel",
	header:false,
	border:false,
	layout:"fit",
	autoHeight:true,
	containerWidth:600,
	containerHeight:100,
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
			
			this.items=[
			{
				xtype:"vmd.div",
				id:"container",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:this.containerWidth,
				height:this.containerHeight,
				layout:"border",
				items:[
					{
						xtype:"vmd.div",
						id:"div",
						layoutConfig:{
							align:"top",
							pack:"start"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						region:"center",
						layout:"hbox",
						items:[
							{
								xtype:"label",
								id:"auditResult",
								text:"同意",
								margins:"5 0 0 5"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div1",
						layoutConfig:{
							align:"middle",
							pack:"end"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:30,
						region:"south",
						layout:"hbox",
						items:[
							{
								xtype:"label",
								id:"label1",
								text:"审核人：",
								margins:""
							},
							{
								xtype:"label",
								id:"auditPerson",
								text:"张三",
								margins:"0 20 0 0"
							},
							{
								xtype:"label",
								id:"label3",
								text:"审核时间：",
								margins:""
							},
							{
								xtype:"label",
								id:"auditTime",
								text:"2019-03-11 14:36:30",
								margins:"0 30 0 0"
							}
						]
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setContent= function(result,person,time){
auditResult.setText(result);
auditPerson.setText(person);
auditTime.setText(time);
container.doLayout();
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.AuditOpinion");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AuditOpinion");
	}
})