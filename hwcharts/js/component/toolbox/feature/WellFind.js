Vmd.define('hwchart.component.toolbox.feature.WellFind', {
    requires: [
        'hwchart.component.toolbox.featureManager'
    ]
}, function () {
    var env = zrender.env;
    var allwellName = [];
    function WellFind(model) {
        this.model = model;
    }

    WellFind.defaultOption = {
        show: true,
        icon: 'M896 64H128c-35.328 0-64 28.672-64 64v768c0 35.328 28.672 64 64 64h592a32 32 0 1 0 0-64H128V128h768v592a32 32 0 1 0 64 0V128c0-35.328-28.672-64-64-64zM791.744 746.496A206.72 206.72 0 0 0 832 624 208.256 208.256 0 0 0 624 416 208.256 208.256 0 0 0 416 624 208.256 208.256 0 0 0 624 832c44.096 0 87.04-14.08 122.496-40.256l110.848 110.848a31.936 31.936 0 0 0 54.656-22.592 32 32 0 0 0-9.344-22.656l-110.912-110.848zM480 624c0-79.36 64.64-144 144-144S768 544.64 768 624 703.36 768 624 768 480 703.36 480 624z m320-360a32 32 0 0 0-32-32H256a32 32 0 0 0 0 64h512a32 32 0 0 0 32-32zM256 422.656a32 32 0 0 0 0 64h96a32 32 0 0 0 0-64H256z',

        title: '井号查找'

    };


    var proto = WellFind.prototype;

    proto.onclick = function (ecModel, api) {
        var me = this;
        me.geoModel = ecModel.getComponent('geo');
        //console.log(geoModel)
        var serise = ecModel.getSeriesByType('wellSymbol');
        me.chart = api.getChart();
        console.log(serise)
        serise.forEach(function(item){
            var data = item.getData()._rawData._data;
            data.forEach(function(value,i){
                var obj = {
                    text:value.name,
                    value:value.value,
                    seriesId:item.id,
                    seriesIndex: item.seriesIndex,
                    seriesName: item.name,
                    dataIndex:[i]
                }
                allwellName.push(obj)
            })
        });
        if(me.myFindWins){
            me.myFindWins.window("wellFind").show();
        }else{
            me.myFindWins = new dhtmlXWindows();
            //me.myFindWins.setSkin('dhx_terrace');
            var win = me.myFindWins.createWindow({
                id: "wellFind",
                text: '井号定位',
                width: 320,
                height: 110,
            });
            win.setPosition( (document.body.clientWidth-340), 20);
            win.button('park').hide();
            win.button('minmax').hide();
            me.myFindWins.attachEvent("onClose", function(win) {
                me.myFindWins.window("wellFind").hide();
            });
            me.dhxLableForm = win.attachForm([
                {type: "block", width: 300,offsetTop:10, list:[
                    {
                        type: "input",
                        position: "label-top",
                        name: "well",
                        inputWidth: 120,
                        offsetTop:10,
                    },
                    {type:"newcolumn"},
                    {type:"button", name:"search", width:45,offsetTop:4,value:"搜索",className:'sec-bnt',offsetLeft:3}, 
                    {type:"newcolumn"},
                    {type:"button", name:"next", width:45,offsetTop:4,offsetLeft:10,value:"下一个",className:'sec-bnt',offsetLeft:3,disabled:true}, 
                    {type:"newcolumn"},
                    {type:"button", name:"prv", width:45,offsetTop:4,offsetLeft:50,value:"上一个",className:'sec-bnt',offsetLeft:3,disabled:true}, 
                ]},
                // {type: "block", width: 240, list:[
                //     {type: "checkbox", name:'alltext', label: "全文匹配",position: "label-right"},
                //     {type:"newcolumn"},
                //     {type: "checkbox", name:'caseWord',label: "区分大小写",position: "label-right",offsetLeft:10},
                // ]}
                
            ])
            me.dhxLableForm.attachEvent("onkeydown", function(inp, ev, name, value){
                if(name==='well'){
                    if(ev.key=== "Enter"){
                        me.searchWell();
                    }
                }
            });
            me.dhxLableForm.attachEvent("onButtonClick", function(name) {
				if (name === "search") {
                    me.searchWell();
                }
                if (name === "next") {
                    me.selecIndex = me.selecIndex+1;
                    if(me.selecIndex === me.centers.length-1){
                        me.selecIndex = 0;
                    }
                    me.selectWell();
                }
                if (name === "prv") {
                    me.selecIndex = me.selecIndex-1;
                    if(me.selecIndex === -1){
                        me.selecIndex = me.centers.length-1;
                    }
                    me.selectWell();
                }
            })
        }
        
        return;
        var model = this.model;
        var title = model.get('name') || ecModel.get('title.0.text') || 'hwcharts';

    };
    proto.searchWell = function (){
        var me = this;
        me.centers = [];
        me.selecIndex = 0;
        var selectWell = me.dhxLableForm.getInput("well").value;
        var isAllText = me.dhxLableForm.isItemChecked('alltext');
        var isCaseWord = me.dhxLableForm.isItemChecked('caseWord');
        allwellName.forEach(function(item){
            var text ,seleName = '';
            if(isCaseWord){
                text = item.text;
                seleName = selectWell;
            }else{
                text = item.text.toLocaleLowerCase();
                seleName = selectWell.toLocaleLowerCase();
            }
            if(isAllText){
                if(text == seleName){
                    me.centers.push(item)
                }
            }else{
                if(text.indexOf(seleName)!=-1){
                    me.centers.push(item)
                }
            }
            
        })
       
        if(me.centers.length>0){
            me.selectWell()
            if(me.centers.length>1){
                me.dhxLableForm.enableItem('next');
                me.dhxLableForm.enableItem('prv');
            }
            //me.myFindWins.window("wellFind").hide();
        }else{
            alert('未查询到该井，请重新输入')
        }
        //me.dhxLableForm.setItemValue("well",'')
    }
    proto.selectWell = function(){
        var me  = this;
        var zoom = me.geoModel.coordinateSystem._zoom;
        if(zoom<50){
            zoom = 50
        }
        var center = me.centers[me.selecIndex];
            me.chart.setOption({
                geo:{
                    center:center.value,
                    zoom:zoom
                }
            })
            me.chart.dispatchAction({
                type: 'brushSelect',
                batch: [{
                    selected:[center]
                }]
            })
    }

    hwchart.component.toolbox.featureManager.register(
        'wellFind', WellFind
    );

    hwchart.component.toolbox.feature.WellFind = WellFind;
})