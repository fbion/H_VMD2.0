Ext.define("vmd.ux.Absenteeism" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.Absenteeism",
	title:"Panel",
	header:false,
	border:false,
	width:491,
	height:52,
	layout:"column",
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
/*var store1 = new Ext.data.JsonStore({
    proxy: new Ext.data.MemoryProxy(),
    fields: ["type"]
});*/
var ptServer = {
    ip: '192.168.1.180:6602',
    callcode: 'snqtscdd',
    absencetype: 'XXHTS/schedule/prodduty/common/absencetype'
};

function loddradio() {
    var radioList = [];
    var hwDao = new HwDao(ptServer.ip, ptServer.callcode); //地址:端口和授权码(服务管理员分配)
    var url = ptServer.absencetype;
    hwDao.get(url, {}, {}, function(res) {
        if(res.isSucceed) {
            if(res.data && res.data[0].datas.length > 0) {
                var data = res.data[0].datas;
                debugger
                for(var i = 0; i < data.length; i++) {
                    var type = "<input type='radio' onclick='radioLink(this);' name='typeCode' id='" + data[i].code + "'><label   id='" + data[i].code + "code'   style='margin:0 20px 0 0;cursor:pointer;' for='" + data[i].code + "'>" + data[i].name + "</label>";
                    radioList.push(type);
                }
            }
            var dd=panel.el.dom.childNodes[0].id;
            $("#"+dd+"").append(radioList);
        } else {
            alert(res.errMsg);
        }
    }, function(res) {
        alert(res);
    });
}

function panel_beforerender(sender) {
    loddradio();
}

window.radioLink=function (obj){
    var type=obj.id;
    if(type=="KG"){
        vmd("#KGcode").after();
    }else if(type=="CD"){
        vmd("#CDcode").after();
    }else if(type=="ZT"){
        vmd("#ZTcode").after();
    }else if(type=="CZ"){
        vmd("#KGcode").after();
    }
    
}
			this.items=[
			{
				xtype:"panel",
				id:"panel",
				title:"Panel",
				header:false,
				border:true,
				layout:"column",
				beforerender:"panel_beforerender",
				autoWidth:true,
				listeners:{
					beforerender:panel_beforerender
				}
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
		Ext.util.CSS.removeStyleSheet("vmd.ux.Absenteeism");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.Absenteeism");
	}
})