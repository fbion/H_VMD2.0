Ext.define("vmd.ux.ApprovalProcess" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.ApprovalProcess",
	title:"Panel",
	header:false,
	border:false,
	layout:"fit",
	autoHeight:true,
	containerWidth:1020,
	containerHeight:400,
	uxCss:".vmd-grid .x-grid3-header {    padding: 0;}.vmd-grid .x-grid3-header td {    text-align: center !important;}.vmd-grid .x-grid3-header td div {    padding-left: 0 !important;    padding-right: 0 !important;}",
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
			var myData = [];
var myFields = ["xh", "arrive_time", "process_person", "process_time", "process_opinion"];

var myStore = new vmd.data.Store({
    data: myData,
    fields: myFields
});

window.setContent = function(businesskey, flowinstid) {
    hwMSC.taskHistoryGet(flowinstid, businesskey, function(result) {
        var jsonData = JSON.parse(result.msg);
        createStore(jsonData);
    }, function(result) {
        console.log(result);
    });
};

function createStore(data) {
    var tempData = [];
    for(var i = 0; i < data.length; i++) {
        if(data[i].task_audit_sug !== "") {
            tempData.unshift({
                arrive_time: data[i].row_create_date,
                process_person: data[i].form_user_name,
                process_time: data[i].row_changed_date,
                process_opinion: data[i].task_audit_sug
            });
        }
    }

    for(var j = 0; j < tempData.length; j++) {
        myData.push({
            xh: j + 1,
            arrive_time: tempData[j].arrive_time,
            process_person: tempData[j].process_person,
            process_time: tempData[j].process_time,
            process_opinion: tempData[j].process_opinion
        });
    }

    myStore.loadData(myData);

    if(myData.length === 0) {
        container.hide();
    }
}

function MyGrid_beforerender(sender) {
    MyGrid.autoExpandColumn = 4;
    MyGrid.store = myStore;
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
				autoHeight:false,
				autoWidth:false,
				layout:"border",
				items:[
					{
						xtype:"vmd.div",
						id:"div",
						layoutConfig:{
							align:"middle",
							pack:"center"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:50,
						layout:"hbox",
						autoWidth:false,
						autoHeight:false,
						cls:"title",
						region:"north",
						items:[
							{
								xtype:"label",
								id:"label",
								text:"审批历程"
							}
						]
					},
					{
						xtype:"vmd.div",
						id:"div1",
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						region:"center",
						layout:"fit",
						autoHeight:false,
						items:[
							{
								xtype:"grid",
								id:"MyGrid",
								title:"Grid Panel",
								loadMask:true,
								header:false,
								cls:"vmd-grid",
								enableHdMenu:false,
								disableHeaderClick:true,
								beforerender:"MyGrid_beforerender",
								listeners:{
									beforerender:MyGrid_beforerender
								},
								columns:[
									{
										xtype:"numbercolumn",
										header:"序号",
										sortable:true,
										resizable:false,
										dataIndex:"xh",
										width:50,
										format:"0",
										align:"center",
										fixed:true
									},
									{
										xtype:"gridcolumn",
										header:"到达时间",
										sortable:true,
										resizable:false,
										dataIndex:"arrive_time",
										width:150,
										align:"center",
										fixed:true
									},
									{
										xtype:"gridcolumn",
										header:"处理人",
										sortable:true,
										resizable:false,
										dataIndex:"process_person",
										width:100,
										align:"left",
										fixed:true
									},
									{
										xtype:"gridcolumn",
										header:"处理时间",
										sortable:true,
										resizable:false,
										dataIndex:"process_time",
										width:150,
										align:"center",
										fixed:true
									},
									{
										xtype:"gridcolumn",
										header:"处理意见",
										sortable:true,
										resizable:false,
										dataIndex:"process_opinion",
										width:410,
										align:"left",
										fixed:true
									}
								]
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
			this.sendParams= function(businesskey,flowinstid){
setContent(businesskey, flowinstid);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.ApprovalProcess");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ApprovalProcess");
	}
})