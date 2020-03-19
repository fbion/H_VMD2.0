Vmd.define('hwchart.dialog.MiningIndexDialogAll',{
    requires:[],
},function () { 
    var zUtil = zrender.util;
    var seleNumber = 0;
    var indexNames = []; // 新增指标列表
        /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function MiningIndexDialog(chart) {
        var me = this;
        me.chart = chart;
        console.log(me.chart)
        var miningIndexCofig = chart.miningIndexCofig;
        var allConfigs  = chart.miningIndexAllCofig;
        // 处理开采指标显示配置文件
        var configsData = {
            id:'',
            fontSize:[],
            fontFamily:[],
            fontStyle:[],
            name:[],
            color:[],
            company:[],
            shortName:[],
            fields:[]
        };
        
        zUtil.each(miningIndexCofig,function(v,k){
            if(v!= 'id'&&k!='symbol'){
                configsData.name.push(v.name);
                configsData.color.push(v.color);
                configsData.company.push(v.company)
                configsData.shortName.push(v.shortName)
                configsData.fontSize.push(v.fontSize ||'')
                configsData.fontFamily.push(v.fontFamily ||'')
                configsData.fontStyle.push(v.fontStyle ||'')
                configsData.fields.push(k)
            }
        })
        var obj = me.configsData = zUtil.clone(configsData)
        me.names = obj.name || [];
        me.colors = obj.color || [];
        me.companys = obj.company || [];
        me.shortName = obj.shortName || [];
        me.fields = obj.fields || [];
        me.fontSiz = obj.fontSiz || [];
        me.fontFamily = obj.fontFamily || [];
        me.fontStyle = obj.fontStyle || [];
        me.symbol = miningIndexCofig.symbol;
        // 处理开采指标所有指标配置文件
        var allConfigData = {
            id:'',
            name:[],
            color:[],
            company:[],
            shortName:[],
            fields:[]
        };
        
        zUtil.each(allConfigs,function(v,k){
            if(v!= 'id'&&k!='symbol'){
                allConfigData.name.push(v.name);
                allConfigData.color.push(v.color);
                allConfigData.company.push(v.company)
                allConfigData.shortName.push(v.shortName)
                allConfigData.fields.push(k)
            }
        })

        for(var i = 0;i<allConfigData.name.length;i++){
            for(var j =0;j<me.names.length;j++){
                if(allConfigData.name[i]==me.names[j]){
                    allConfigData.name.splice(i,1);
                    allConfigData.color.splice(i,1);
                    allConfigData.company.splice(i,1);
                    allConfigData.fields.splice(i,1);
                    allConfigData.shortName.splice(i,1);
                    i--
                }
            }
        }

        allConfigData.name.forEach(function(item,i){
            indexNames.push({
                text:item,
                id:allConfigData.fields[i],
                index:i
            })
        })
    }

    var MiningIndexDialogPro= MiningIndexDialog.prototype;

    // 根据数据生成form数据
    MiningIndexDialogPro.createForm = function(){
        var me = this;
        var formData = [
            {type: "block", blockOffset:0,list:[
                {type: "block", blockOffset:0,list:[
                    {type: "fieldset",label:'图形样式',width:200,offsetLeft:12, list:[
                        {
                            type:"container", 
                            className:'index-combo-box',
                            name:"myCombo", 
                            inputWidth:100, 
                        },
                    ]},
                    {type: "fieldset", label:"指标",name:'index_groud', labelWidth: 90,width: 200,offsetLeft:12,className:'zb-box1', list:[
                        
                    ]},
                ]},
                {type:"newcolumn"},
                {type: "fieldset",name:'index_name', label:"属性", labelWidth: 90,width: 280,offsetLeft:12,className:'zb-box', list:[
                    {type: "fieldset",label:"区间概率分布",className:'zb-box2',width: 395,blockOffset:0,list:[
                        {type: "block", blockOffset:0,list:[
                            {type: "block", blockOffset:0,offsetTop:4,list:[
                                {type: "input", name: '', width:50, labelWidth: 60,label: "最小值", value: '1'},
                                {type:"newcolumn"},
                                {type: "label", label: '万吨',labelWidth:30},
                            ]},
                            {type: "block", blockOffset:0,offsetTop:6,list:[
                                {type: "input", name: '', width:50, labelWidth: 60,label: "最大值", value: '15',},
                                {type:"newcolumn"},
                                {type: "label", label: '万吨',labelWidth:30},
                            ]}, 
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset:0,list:[
                            {type: "container", name: "index_1", className:'img-box', note:{
                                text:'<img style="width:100px" src="../images/indexs/22.png"/>',
                            },offsetLeft:20,style:''},
                        ]},
                    ]},
                    {type: "fieldset",label:"柱高",className:'zb-box2',width: 395,blockOffset:0,list:[
                        {type: "block", blockOffset:0,list:[
                            {type: "block", blockOffset:0,offsetTop:4,list:[
                                {type: "input", name: '', width:50, labelWidth: 60,label: "最小值",value: '1'},
                                {type:"newcolumn"},
                                {type: "label", label: 'px',labelWidth:30},
                            ]},
                            {type: "block", blockOffset:0,offsetTop:6,list:[
                                {type: "input", name: '', width:50, labelWidth: 60,label: "最大值", value: '100',},
                                {type:"newcolumn"},
                                {type: "label", label: 'px',labelWidth:30},
                            ]}, 
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset:0,list:[
                            {type: "container", name: "index_1", className:'img-box', note:{
                                text:'<img style="width:70px" src="../images/indexs/11.png"/>',
                            },offsetLeft:20,style:''},
                        ]},
                    ]},
                    {type: "fieldset",label:"属性",className:'zb-box3', width: 400,blockOffset:0,list:[
                        {type: "block", blockOffset:0,list:[
                            {type: "checkbox", name: 'label_show', value: "r1", label: "显示",position:'label-right'},
                            {type:"newcolumn"},
                            {type: "input", name: '', width:60, labelWidth:30,label: "柱宽", offsetTop:6, value: '10',offsetLeft:15},
                            {type:"newcolumn"},
                            {type: "label", label: 'px',labelWidth:30,offsetTop:6, },
                            {type:"newcolumn"},
                            {type: "input", name: 'index_color', width:80, labelWidth: 40,offsetTop:6, label: "颜色", value: '',offsetLeft:10},
                        ]},
                        {type: "block", blockOffset:0,offsetTop:6,list:[
                            {type: "checkbox", name: 'name_show', value: "r1", label: "显示",position:'label-right',offsetTop:6,},
                            {type:"newcolumn"},
                            {type: "input", name: 'short_name', width:80, labelWidth: 30,label: "简称", offsetTop:6, value: '',offsetLeft:15,},
                            {type:"newcolumn"},
                            {type:"button", name:"font_set", width:40,value:"字体",offsetLeft:15},
                        ]},
                        {type: "block", blockOffset:0,offsetTop:6,list:[
                            {type: "checkbox", name: 'label_show', value: "r1", label: "显示",position:'label-right',offsetTop:6,},
                            {type:"newcolumn"},
                            {type: "input", name: 'label', width:80, labelWidth: 30,label: "单位", offsetTop:6, value: '',offsetLeft:15,},
                            {type:"newcolumn"},
                            {type:"button", name:"font_set", width:40,value:"字体",offsetLeft:15},
                        ]},
                    ]}
                ]}
            ]}
        ];
        var n = 0;
        me.names.forEach(function(item,i){
            if(item!=''){
                if(n ===0){
                    var obj = {type: "block", blockOffset:0,list:[
                        {type: "radio", name:'indexName', value: i, labelWidth: 60,checked:true, label: me.names[i],position: "label-right"},
                        {type:"newcolumn"},
                        {type: "button", className:'label_bnt', value: '+',width:20,name:n+"_add"},
                        {type:"newcolumn"},
                        {type: "button", className:'label_bnt', value: '-',width:20,name:n+"_del"},
                    ]}
                }else{
                    var obj = {type: "block", blockOffset:0,list:[
                        {type: "radio", name:'indexName', value: i, labelWidth: 60, label: me.names[i],position: "label-right"},
                        {type:"newcolumn"},
                        {type: "button", className:'label_bnt', value: '+',width:20,name:n+"_add"},
                        {type:"newcolumn"},
                        {type: "button", className:'label_bnt', value: '-',width:20,name:n+"_del"}
                    ]}
                }
                n++;
                formData[0].list[0].list[1].list.push(obj)
            }
        })
        return formData;
    };

    MiningIndexDialogPro.initFormWin = function(){
        var me  = this;
        var myCon = me.indexForm.getContainer("myCombo");
        myCombo = new dhtmlXCombo(myCon, "img_combo", null, "image");
        if(me.symbol ==='21'){
            myCombo.setImagePath("../images/indexs/");
            myCombo.load("../configs/data_countrie1.json");
            myCombo.enableFilteringMode(true);
            myCombo.disable();
        }else{
            myCombo.setImagePath("../images/indexs/");
            myCombo.load("../configs/data_countries.json");
            myCombo.enableFilteringMode(true);
        }
        
        //myCombo.setSize(100);
        me.colorPicker = new dhtmlXColorPicker(me.indexForm.getInput("index_color"));
        me.colorPicker.loadUserLanguage("ch");
        me.setFormValue(seleNumber); // 给属性框赋值
        // 属性框操作
        me.indexForm.attachEvent("onButtonClick", function (name) {
            if (name.indexOf("_add")!=-1){ // 新增指标
                
                // var n = parseFloat(name.split('_')[0])+1;
                // var ele = me.indexForm.get
                // me.indexForm.addItem('index_groud', {type: "combo", name: 'newIndex', width:100, options:indexNames},n);
                if(!me.addMen){
                    me.addMen = new dhtmlXMenuObject();
                    me.addMen.renderAsContextMenu();
                     // 添加菜单项
                    indexNames.forEach(function(item,i){
                        me.addMen.addNewChild(me.addMen.topId, i, item.id, item.text);
                    })
                    
                    // 菜单项添加点击事件
                    me.addMen.attachEvent("onClick", function(id,) {
                        
                    })
                }
                // 显示菜单
                me.addMen.showContextMenu(100,100);
                // var item = indexForm.getCombo("add-new").getSelectedValue();
                // var name = indexForm.getCombo("add-new").getSelectedText();
                // var obj = {type: "radio", name:'indexName', value: item, labelWidth: 80, label: name,position: "label-right"};
                // indexForm.addItem('index_groud',obj)
            }
            if (name == "confirm"){
                me.win.close();
            }
            if(name == "cancel"){
                me.win.close();
            }
        })
        
        me.indexForm.attachEvent("onChange", function (name,value,isCheck) {
            if(name === 'indexName'){
                // 根据选择的指标名称切换属性框内容
                seleNumber = value;
                me.setFormValue(value);
            }
            if(name === ''){

            }
           
        })
    }

    MiningIndexDialogPro.setFormValue =function(indexNumber){
        var me  = this;
        indexNumber = indexNumber ||0;
        me.indexForm.setItemLabel('index_name',me.names[indexNumber]+' 属性'); 
        setColorPickerColor(me.colorPicker,me.colors[indexNumber]);
        me.indexForm.setItemValue("index_color", me.colors[indexNumber] || "#C0D0E0");
        me.indexForm.setItemValue('short_name',me.shortName[indexNumber])
        me.indexForm.setItemValue('label',me.companys[indexNumber]);
    }

    //拾色器赋值
    function setColorPickerColor(colorPicker, color){
        colorPicker.setColor(color);
        for(var i=0;i<colorPicker._nodes.length;i++){
            var node=colorPicker._nodes[i].node;
            node.style.backgroundColor=color;
            node.style.color = color;
        }
    };
    hwchart.dialog.MiningIndexDialogAll = MiningIndexDialog
})