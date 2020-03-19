Ext.define('hwchart.dialog.MiningIndex',{
    requires:['hwchart.dialog.FontSeting'],
},function () { 
    var zUtil = zrender.util;
    var seleNumber = 0;
    var indexNames = []; // 新增指标列表
    var indexSeries = null;
    var configsData = null; // 处理解析后的用户配置文件
    var miningIndexCofig; // 原始配置文件
    var hanldeData= null;
    var fontSeting = hwchart.dialog.FontSeting;
        /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function MiningIndexDialog(chart) {
        var me = this;
        me.chart = chart;
        var series= chart._api.getModel().getSeries();
       
        series.forEach(function(item){
            if(item.subType === 'miningIndex'){
                indexSeries = item.option;
                hanldeData = zUtil.clone(indexSeries);
            }
        })
        miningIndexCofig = chart.miningIndexCofig; // 用户的配置文件
        // 处理开采指标显示配置文件
        var configsData = {
            id:'',
            labelFontSize:[],
            labelFontFamily:[],
            labelFontStyle:[],
            labelFontWeight:[],
            labelFontColor:[],
            nameFontSize:[],
            nameFontFamily:[],
            nameFontStyle:[],
            nameFontWeight:[],
            nameFontColor:[],
            name:[],
            color:[],
            company:[],
            shortName:[],
            fields:[],
            max:[],
            min:[],
            isShow:[],
            labelIsShow:[],
            nameIsShow:[],
            companyIsShow:[],
            minHr:[],
            maxHr:[]
        };
        
        zUtil.each(miningIndexCofig,function(v,k){
            if(v!= 'id'&&k!='symbol'){
                configsData.name.push(v.name);
                configsData.color.push(v.color);
                configsData.company.push(v.company)
                configsData.shortName.push(v.shortName)

                configsData.labelFontSize.push(v.labelFontSize);
                configsData.labelFontFamily.push(v.labelFontFamily);
                configsData.labelFontStyle.push(v.labelFontStyle);
                configsData.labelFontWeight.push(v.labelFontWeight);
                configsData.labelFontColor.push(v.labelFontColor);
                configsData.nameFontSize.push(v.nameFontSize) ;
                configsData.nameFontFamily.push(v.nameFontFamily);
                configsData.nameFontStyle.push(v.nameFontStyle);
                configsData.nameFontWeight.push(v.nameFontWeight);
                configsData.nameFontColor.push(v.nameFontColor);

                configsData.max.push(v.max ||'')
                configsData.min.push(v.min||'')
                configsData.maxHr.push(v.maxHr ||100)
                configsData.minHr.push(v.minHr||2)
                configsData.isShow.push(v.show||true)
                configsData.labelIsShow.push(v.labelIsShow ||undefined)
                configsData.nameIsShow.push(v.nameIsShow||undefined)
                configsData.companyIsShow.push(v.companyIsShow||undefined)
                configsData.fields.push(k)
            }
        })
        // 操作的数据
        //console.log(indexSeries.data[0]) // 数据中的配置 暨 对话框界面操作的数据及配置
        if(indexSeries.data.length==0){
            return
        }
        me.names = indexSeries.data[0].name || [];
        me.colors = indexSeries.data[0].color || [];
        me.companys = indexSeries.data[0].company || [];
        me.shortName = indexSeries.data[0].shortName || [];
        me.fields = indexSeries.data[0].fields || [];

        me.labelFontSize = indexSeries.data[0].labelFontSize || [];
        me.labelFontFamily = indexSeries.data[0].labelFontFamily||[];
        me.labelFontStyle = indexSeries.data[0].labelFontStyle||[];
        me.labelFontWeight = indexSeries.data[0].labelFontWeight||[];
        me.labelFontColor = indexSeries.data[0].labelFontColor||[];
        me.nameFontSize = indexSeries.data[0].nameFontSize || [];
        me.nameFontFamily = indexSeries.data[0].nameFontFamily||[];
        me.nameFontStyle = indexSeries.data[0].nameFontStyle||[];
        me. nameFontWeight = indexSeries.data[0].nameFontWeight||[];
        me. nameFontColor = indexSeries.data[0].nameFontColor||[];

        me.max = indexSeries.data[0].max || [];
        me.min = indexSeries.data[0].min || [];
        me.isShow = indexSeries.data[0].isShow || [];
        me.nameIsShow = indexSeries.data[0].nameIsShow || [];
        me.labelIsShow = indexSeries.data[0].labelIsShow || [];
        me.companyIsShow = indexSeries.data[0].companyIsShow || [];
        me.maxData = indexSeries.data[0].maxData || [];
        me.mminData = indexSeries.data[0].minData || [];
        me.maxHr = indexSeries.data[0].maxHr || [];
        me.minHr = indexSeries.data[0].minHr || [];
        me.symbol = miningIndexCofig.symbol;
        
        configsData.name.forEach(function(item,i){
            //if(configsData.isShow[i] === false){
                indexNames.push({
                    text:item,
                    id:configsData.fields[i],
                    index:i
                })
            //}
        })
    }

    var MiningIndexDialogPro= MiningIndexDialog.prototype;

    // 根据数据生成form数据
    MiningIndexDialogPro.getStettings = function(){
        var me = this;
        if(me.symbol === '21'){
            var isHide = false;
        }else{
            var isHide = true;
        }
        
        me.names = indexSeries.data[0].name || [];
        me.isShow = indexSeries.data[0].isShow || [];
        var formData = [
            {type: "block", blockOffset:0,list:[
                {type: "block", blockOffset:0,list:[
                    {type: "fieldset",label:'图形样式',width:180,offsetLeft:12, list:[
                        {
                            type:"container", 
                            className:'index-combo-box',
                            name:"myCombo", 
                            inputWidth:100, 
                        },
                    ]},
                    {type: "fieldset", label:"指标",name:'index_groud', labelWidth: 90,width: 180,offsetLeft:12,className:'zb-box1', list:[
                        
                    ]},
                ]},
                {type:"newcolumn"},
                {type: "block",offsetLeft:12,list:[
                    {type: "fieldset",label:"区间概率分布",className:'zb-box2',width: 410,blockOffset:0,list:[
                        {type: "block", blockOffset:0,offsetTop:15,list:[
                            {type: "block", blockOffset:0,offsetTop:4,list:[
                                {type: "input", name: 'min_value', width:50, labelWidth: 60,label: "最小值", value: '1'},
                                {type:"newcolumn"},
                                {type: "label",name:'label_cy_min', label: '万吨',labelWidth:30},
                            ]},
                            {type: "block", blockOffset:0,offsetTop:6,list:[
                                {type: "input", name: 'max_value', width:50, labelWidth: 60,label: "最大值", value: '15',},
                                {type:"newcolumn"},
                                {type: "label", name:'label_cy_max', label: '万吨',labelWidth:30},
                            ]}, 
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset:0,offsetLeft:15,list:[
                            {type: "container", name: "chart_value",inputHeight:100,inputWidth:180,className:'index_chart'},
                        ]},
                    ]},
                    {type: "fieldset",label:"柱高",className:'zb-box2',width: 410,blockOffset:0,list:[
                        {type: "block", blockOffset:0,list:[
                            {type: "block", blockOffset:0,offsetTop:4,list:[
                                {type: "input", name: 'min_h', width:50, labelWidth: 60,label: "最小值",value: '1'},
                                {type:"newcolumn"},
                                {type: "label", label: 'px',labelWidth:30},
                            ]},
                            {type: "block", blockOffset:0,offsetTop:6,list:[
                                {type: "input", name: 'max_h', width:50, labelWidth: 60,label: "最大值", value: '100',},
                                {type:"newcolumn"},
                                {type: "label", label: 'px',labelWidth:30},
                            ]},
                            {type: "block", blockOffset:0,offsetTop:6,list:[
                                {type: "input", name: 'column_width', width:50, hidden:isHide,labelWidth:60,label: "柱宽",  value: '10'}, 
                                {type:"newcolumn"},
                                {type: "label", label: 'px',labelWidth:30},
                            ]}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset:0,list:[
                            {type: "container", name: "chart_hr", inputHeight:100,inputWidth:160,className:'index_chart'},
                        ]},
                    ]},
                    {type: "fieldset",label:"属性",className:'zb-box3', width: 410,blockOffset:0,list:[
                        {type: "block", blockOffset:0,list:[
                            {type: "checkbox", name: 'index_show', value: "r1",position:'label-right'},
                            {type:"newcolumn"},
                            {type: "input", name: 'index_color', width:80, labelWidth: 40,offsetTop:10, label: "颜色", value: ''}
                        ]},
                        {type: "block", blockOffset:0,offsetTop:5,list:[
                            {type: "checkbox", name: 'name_show', value: "r1",position:'label-right',},
                            {type:"newcolumn"},
                            {type: "input", name: 'short_name', width:60, labelWidth: 30,label: "简称", offsetTop:10, value: '',},
                            {type:"newcolumn"},
                            {type: "container", name: "name_font_set",inputHeight:40,inputWidth:100,}
                        ]},
                        {type: "block", blockOffset:0,offsetTop:0,list:[
                            {type: "checkbox", name: 'label_show', value: "r1",position:'label-right',},
                            {type:"newcolumn"},
                            {type: "label", name: '', labelWidth: 30,label: "数值", offsetTop:10,},
                            {type:"newcolumn"},
                            {type: "checkbox", name: 'company_show', value: "r1",position:'label-right',},
                            {type:"newcolumn"},
                            {type: "input", name: 'label', width:80, labelWidth: 30,label: "单位", offsetTop:10, value: '',},
                            
                        ]},
                        {type: "block", blockOffset:0,offsetTop:8,list:[
                            {type: "container", name: "value_font_set",inputHeight:40,inputWidth:100,offsetLeft:0,}
                        ]},
                    ]}
                ]}
            ]}
        ];
        me.names.forEach(function(item,i){
            if(i ===0){
                var obj = {type: "block", blockOffset:0,list:[
                    {type: "radio", name:'indexName', value: i, labelWidth: 60,checked:true, label: me.names[i],position: "label-right"},
                    // {type:"newcolumn"},
                    // {type: "button", className:'label_bnt', value:me.isShow[i]?'-':'+',width:20,name:"add_dele"},
                    // {type:"newcolumn"},
                    // {type: "button", className:'label_bnt', value: '-',width:20,name:n+"_del"},
                ]}
            }else{
                var obj = {type: "block", blockOffset:0,list:[
                    {type: "radio", name:'indexName', value: i, labelWidth: 60, label: me.names[i],position: "label-right"},
                    // {type:"newcolumn"},
                    // {type: "button", className:'label_bnt', value:me.isShow[i]?'-':'+',width:20,name:"add_dele"},
                    // {type:"newcolumn"},
                    // {type: "button", className:'label_bnt', value: '-',width:20,name:n+"_del"}
                ]}
            }
            formData[0].list[0].list[1].list.push(obj)
          
        })
        return formData;
    };
    // 插入曲线
    MiningIndexDialogPro._initValueChart=function(){
        var me  = this;
        //初始化曲线
        var chartContainer = this.form.getContainer("chart_value");
        //动态加载bar
        Ext.require(['hwchart.chart.Bar','hwchart.component.MarkArea'], function () {
            me.valueChart = hwcharts.init(chartContainer);
            var chartData = me.getValueChartData();
            me.valueChart.setOption({
                backgroundColor: '#fff',
                grid:{
                    left:30,
                    top:20,
                    bottom:20,
                    right:30
                },
                xAxis: {
                    type: 'category',
                    data:chartData.xAxisData,
                    name: '指标',
                    nameLocation:'middle',
                    nameGap:6,
                    nameTextStyle: {
                        fontSize: 12
                    },
                    axisLabel: {
                        show: true,
                        interval:8
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel:true
                    },
                    axisLine: {
                        onZero: true,
                        symbol:['none', 'arrow']
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name: ["概", "率"].join('\n'),
                    nameLocation:'middle',
                    nameGap:6,
                    nameRotate: 0,
                    nameTextStyle: {
                        fontSize: 12
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        onZero: true,
                        symbol:['none', 'arrow']
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: 'value_bar',
                    type: 'bar',
                    color:[me.colors[seleNumber]],
                    barMaxWidth:5,
                    data: chartData.data,
                    markArea:{
                        itemStyle:{
                            normal:{
                                color:['#C6EFCF']
                            }
                        },
                        data: [[{
                            coord: [chartData.minIndex, 0],
                        }, {
                            coord: [chartData.maxIndex, chartData.maxNum],
                        }]]
                    }
                }]
            })
        });

    }

    MiningIndexDialogPro._initHeightChart=function(){
        var me = this;
        //初始化曲线
        var chartContainer = this.form.getContainer("chart_hr");
        //动态加载bar
        Ext.require(['hwchart.chart.Bar','hwchart.component.MarkArea'], function () {
            me.heightChart = hwcharts.init(chartContainer);
            var data1 = [me.minHr[seleNumber],me.maxHr[seleNumber]]
            var data0 = [0,0];
            var xAxisData = [1,2]
            me.heightChart.setOption({
                backgroundColor: '#fff',
                grid:{
                    left:80,
                    top:12,
                    bottom:20
                },
                xAxis: {
                    type: 'category',
                    data:xAxisData,
                    name: '3.50万吨/px',
                    nameLocation:'middle',
                    nameGap:6,
                    nameTextStyle: {
                        fontSize: 10
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel:true
                    },
                    axisLine: {
                        onZero: true,
                        symbol:['none', 'arrow']
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: [{
                    name:200,
                    nameGap:0,
                    nameTextStyle: {
                        fontSize: 10
                    },
                    offset:-28,
                    max:200,
                    inside:false,
                    splitNumber:10,
                    axisTick: {
                        show: true,
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        onZero: true,
                        symbol:['none', 'arrow']
                    },
                    splitLine: {
                        show: false
                    }
                },{
                    offset:-36,
                    max:200,
                    inside:true,
                    splitNumber:10,
                    axisTick: {
                        show: true,
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {
                        onZero: true,
                        symbol:['none', 'arrow']
                    },
                    splitLine: {
                        show: false
                    }
                },],
                series: [{
                    name: 'height_bar',
                    type: 'bar',
                    color:[me.colors[seleNumber]],
                    barMaxWidth:5,
                    data: data1
                },
                {
                    name: 'bar',
                    type: 'bar',
                    barMaxWidth:5,
                    data: data0,
                    yAxisIndex: 1,
                }]
            })
        });

    }

    // 初始化from表单内容
    MiningIndexDialogPro.initFormWin = function(){
        var me  = this;
        var myCon = me.form.getContainer("myCombo");
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
        me.colorPicker = new dhtmlXColorPicker(me.form.getInput("index_color"));
        me.colorPicker.loadUserLanguage("ch");
        //
        me._initValueChart();
        me._initHeightChart();

        me.nameFontSet = new fontSeting(me.chart,me.form.getContainer("name_font_set"));
        // 监听文字设置组件的变化
        me.nameFontSet.on('onFontStyleChange',function(font){
            indexSeries.data.forEach(function(item){
                item.nameFontFamily[seleNumber] = font.fontFamily;
                item.nameFontSize[seleNumber] = font.fontSize;
                item.nameFontStyle[seleNumber] = font.fontStyle;
                item.nameFontWeight[seleNumber] = font.fontWeight;
                item.nameFontColor[seleNumber] = font.color;
            })
            
            if(me.form.isItemChecked('name_show')){
                me.chart.setOption({series:[{
                    name:indexSeries.name,
                    data:zUtil.clone(indexSeries.data),
                    dataChanged:true
                }]})
            }
       })
       me.valueFontSet = new fontSeting(me.chart,me.form.getContainer("value_font_set"));
       // 监听文字设置组件的变化
       me.valueFontSet.on('onFontStyleChange',function(font){
            indexSeries.data.forEach(function(item){
               item.labelFontFamily[seleNumber] = font.fontFamily;
               item.labelFontSize[seleNumber] = font.fontSize;
               item.labelFontStyle[seleNumber] = font.fontStyle;
               item.labelFontWeight[seleNumber] = font.fontWeight;
               item.labelFontColor[seleNumber] = font.color;
            })
           if(me.form.isItemChecked('company_show') || me.form.isItemChecked('label_show')){
            me.chart.setOption({series:[{
                name:indexSeries.name,
                data:zUtil.clone(indexSeries.data),
                dataChanged:true
            }]})
           }
      })
        me.setFormValue(seleNumber); // 给属性框赋值
        // 属性框操作
        me.form.attachEvent("onButtonClick", function (name) {
            if (name == "confirm"){
                me.win.close();
            }
            if(name == "cancel"){
                me.win.close();
            }
        })
        
        me.form.attachEvent("onChange", function (name,value,isCheck) {
            if(name === 'indexName'){
                // 根据选择的指标名称切换属性框内容
                seleNumber = value;
                me.setFormValue(value);
            }else{
                if(name === 'min_value'){
                    if(isNaN(parseFloat(value))){
                        alert('请输入正确的数字')
                        return
                    }
                    if(parseFloat(value)>me.maxData[seleNumber]){
                        value = Math.floor(me.maxData[seleNumber]*0.9);
                        me.form.setItemValue('min_value',value)
                    }
                    if(parseFloat(value)<me.minData[seleNumber]){
                        value = Math.ceil(me.minData[seleNumber]*1.1);
                        me.form.setItemValue('min_value',value)
                    }
                    indexSeries.data.forEach(function(item){
                        item.min[seleNumber] = parseFloat(value)
                    })
                    me.setValueChartOption(seleNumber);
                    me.setHeightChartOption(seleNumber);
                }
                if(name === 'max_value'){
                    if(isNaN(parseFloat(value))){
                        alert('请输入正确的数字')
                        return
                    }
                    if(parseFloat(value)>me.maxData[seleNumber]){
                        value = Math.floor(me.maxData[seleNumber]*0.9);
                        me.form.setItemValue('max_value',value)
                    }
                    if(parseFloat(value)<me.minData[seleNumber]){
                        value = Math.ceil(me.minData[seleNumber]*1.1);
                        me.form.setItemValue('max_value',value)
                    }
                    indexSeries.data.forEach(function(item){
                        item.max[seleNumber] = parseFloat(value)
                    })
                    me.setValueChartOption(seleNumber);
                    me.setHeightChartOption(seleNumber);
                }
                if(name === 'min_h'){
                    if(isNaN(parseFloat(value))){
                        alert('请输入正确的数字')
                        return
                    }
                    if(parseFloat(value)>200){
                        value = 200;
                        me.form.setItemValue('min_h',value)
                    }
                    if(parseFloat(value)<1){
                        value = 1;
                        me.form.setItemValue('min_h',value)
                    }
                    indexSeries.data.forEach(function(item){
                        item.minHr[seleNumber] = parseFloat(value)
                    })
                    me.setValueChartOption(seleNumber);
                    me.setHeightChartOption(seleNumber);
                }
                if(name === 'max_h'){
                    if(isNaN(parseFloat(value))){
                        alert('请输入正确的数字')
                        return
                    }
                    if(parseFloat(value)>200){
                        value = 200;
                        me.form.setItemValue('max_h',value)
                    }
                    if(parseFloat(value)<20){
                        value = 20;
                        me.form.setItemValue('max_h',value)
                    }
                    indexSeries.data.forEach(function(item){
                        item.maxHr[seleNumber] = parseFloat(value)
                    })
                    me.setValueChartOption(seleNumber);
                    me.setHeightChartOption(seleNumber);
                }
                if(name === 'short_name'){
                    indexSeries.data.forEach(function(item){
                        item.shortName[seleNumber] = value
                    })
                }
                if(name === 'label'){
                    indexSeries.data.forEach(function(item){
                        item.company[seleNumber] = value
                    })
                }
                if(name === 'index_show'){
                    indexSeries.data.forEach(function(item){
                        item.isShow[seleNumber] = isCheck
                    })
                }
                if(name === 'label_show'){
                    indexSeries.data.forEach(function(item){
                        item.labelIsShow[seleNumber] = isCheck
                    })
                }
                if(name === 'name_show'){
                    indexSeries.data.forEach(function(item){
                        item.nameIsShow[seleNumber] = isCheck
                    })
                }
                if(name === 'company_show'){
                    indexSeries.data.forEach(function(item){
                        item.companyIsShow[seleNumber] = isCheck
                    })
                }
                if(name === 'column_width'){
                    if(isNaN(parseFloat(value))){
                        alert('请输入正确的数字')
                        return
                    }
                    if(parseFloat(value)>50){
                        value = 50;
                        me.form.setItemValue('column_width',value)
                    }
                    if(parseFloat(value)<3){
                        value = 3;
                        me.form.setItemValue('column_width',value)
                    }
                    indexSeries.data.forEach(function(item){
                        item.cloumnWidth = value;
                    })
                }
                me.chart.setOption({series:[{
                    name:indexSeries.name,
                    data:zUtil.clone(indexSeries.data),
                    dataChanged:true
                }]})
            }
        })
        me.colorPicker.attachEvent("onSelect", function(color,node){
            // console.log(node)
            indexSeries.data.forEach(function(item){
                item.color[seleNumber] = color
            })
            me.chart.setOption({series:[{
                name:indexSeries.name,
                data:zUtil.clone(indexSeries.data),
                dataChanged:true
            }]})

        });
    }
    //保存方法
    MiningIndexDialogPro.save = function () {

        //return;
        var me = this;
        // me.chart.setOption({series:[{
        //     name:indexSeries.name,
        //     data:zUtil.clone(indexSeries.data),
        //     dataChanged:true
        // }]})
        hanldeData = zUtil.clone(indexSeries);
        var obj = hanldeData.data[0];
        obj.fields.forEach(function(item,i){
            zUtil.each(miningIndexCofig,function(v,k){
                if(item === k){
                    v.color = obj.color[i];
                    v.company = obj.company[i];

                    v.labelFontSize = obj.labelFontSize[i];
                    v.labelFontFamily = obj.labelFontFamily[i];
                    v.labelFontStyle = obj.labelFontStyle[i];
                    v.labelFontWeight = obj.labelFontWeight[i];
                    v.labelFontColor = obj.labelFontColor[i];
                    v.nameFontSize = obj.nameFontSize[i];
                    v.nameFontFamily = obj.nameFontFamily[i];
                    v.nameFontStyle = obj.nameFontStyle[i];
                    v.nameFontWeight = obj.nameFontWeight[i];
                    v.nameFontColor = obj.nameFontColor[i];

                    v.show = obj.isShow[i];
                    v.shortName = obj.shortName[i];
                    v.labelIsShow = obj.labelIsShow[i];
                    v.nameIsShow = obj.nameIsShow[i];
                    v.max = obj.max[i];
                    v.min = obj.min[i];
                    v.maxHr = obj.maxHr[i];
                    v.minHr = obj.minHr[i];
                    v.cloumnWidth = obj.cloumnWidth;
                }
            })
            
        })
        //console.log(miningIndexCofig)
        // 保存配置文件
        var content = JSON.stringify(miningIndexCofig)
        var userName = 'dbadmin';
        var  option = me.chart.tpl.configOption;
        var hwFao = new HwFao(option.fileHost || option.host, option.fileCallCode || option.callCode); //地址:端口和存储标识(服务管理员分配)
        var filepath =  userName + "/columIndexConfigs/columnIndexJson.json";
        hwFao.write(filepath, content, function (res) {
            if (res.isSucceed) {
                console.log('配置文件保存成功')
            } else {
                alert(res.errMsg);
            }
        }, function (res) { alert(res); });
    }
    // 取消方法
    MiningIndexDialogPro.cancel = function(){
        var me = this;
        me.colors = hanldeData.data[0].color || [];
        me.companys = hanldeData.data[0].company || [];
        me.shortName = hanldeData.data[0].shortName || [];
        me.fields = hanldeData.data[0].fields || [];

        me.labelFontSize = hanldeData.data[0].labelFontSize || [];
        me.labelFontFamily = hanldeData.data[0].labelFontFamily||[];
        me.labelFontStyle = hanldeData.data[0].labelFontStyle||[];
        me.labelFontWeight = hanldeData.data[0].labelFontWeight||[];
        me.labelFontColor = hanldeData.data[0].labelFontColor||[];
        me.nameFontSize = hanldeData.data[0].nameFontSize || [];
        me.nameFontFamily = hanldeData.data[0].nameFontFamily||[];
        me.nameFontStyle = hanldeData.data[0].nameFontStyle||[];
        me. nameFontWeight = hanldeData.data[0].nameFontWeight||[];
        me. nameFontColor = hanldeData.data[0].nameFontColor||[];

        me.max = hanldeData.data[0].max || [];
        me.min = hanldeData.data[0].min || [];
        me.chart.setOption({series:[{
            name:hanldeData.name,
            data:zUtil.clone(hanldeData.data),
            dataChanged:true
        }]})
        this.setFormValue(seleNumber)
    }
    // 给from的每一项赋值
    MiningIndexDialogPro.setFormValue =function(indexNumber){
        var me  = this;
        indexNumber = indexNumber ||0;
        //
        me.names = indexSeries.data[0].name || [];
        me.colors = indexSeries.data[0].color || [];
        me.companys = indexSeries.data[0].company || [];
        me.shortName = indexSeries.data[0].shortName || [];
        me.fields = indexSeries.data[0].fields || [];

        me.labelFontSize = indexSeries.data[0].labelFontSize || [];
        me.labelFontFamily = indexSeries.data[0].labelFontFamily||[];
        me.labelFontStyle = indexSeries.data[0].labelFontStyle||[];
        me.labelFontWeight = indexSeries.data[0].labelFontWeight||[];
        me.labelFontColor = indexSeries.data[0].labelFontColor||[];
        me.nameFontSize = indexSeries.data[0].nameFontSize || [];
        me.nameFontFamily = indexSeries.data[0].nameFontFamily||[];
        me.nameFontStyle = indexSeries.data[0].nameFontStyle||[];
        me. nameFontWeight = indexSeries.data[0].nameFontWeight||[];
        me. nameFontColor = indexSeries.data[0].nameFontColor||[];


       
        me.max = indexSeries.data[0].max || [];
        me.min = indexSeries.data[0].min || [];
        me.isShow = indexSeries.data[0].isShow || [];
        me.nameIsShow = indexSeries.data[0].nameIsShow || [];
        me.labelIsShow = indexSeries.data[0].labelIsShow || [];
        me.companyIsShow = indexSeries.data[0].companyIsShow || [];
        me.maxData = indexSeries.data[0].maxData || [];
        me.mminData = indexSeries.data[0].minData || [];
        me.maxHr = indexSeries.data[0].maxHr || [];
        me.minHr = indexSeries.data[0].minHr || [];

        //from各元素赋值
        // me.form.setItemLabel('index_name',me.names[indexNumber]+' 属性'); 
        setColorPickerColor(me.colorPicker,me.colors[indexNumber]);
        me.form.setItemValue("index_color", me.colors[indexNumber] || "#C0D0E0");
        me.form.setItemValue('short_name',me.shortName[indexNumber])
        me.form.setItemValue('label',me.companys[indexNumber]);
        me.form.setItemLabel('label_cy_max',me.companys[indexNumber]); 
        me.form.setItemLabel('label_cy_min',me.companys[indexNumber]); 
        me.form.setItemValue('max_value',me.max[indexNumber])
        me.form.setItemValue('min_value',me.min[indexNumber]);
        me.form.setItemValue('max_h',me.maxHr[indexNumber])
        me.form.setItemValue('min_h',me.minHr[indexNumber]);
        me.form.setItemValue('index_show',me.isShow[indexNumber]);
        me.form.setItemValue('name_show',me.nameIsShow[indexNumber]);
        me.form.setItemValue('label_show',me.labelIsShow[indexNumber]);
        me.form.setItemValue('company_show',me.companyIsShow[indexNumber]);
        me.form.setItemValue('column_width',indexSeries.data[0].cloumnWidth || 15);

        me.setValueChartOption(indexNumber);
        me.setHeightChartOption(indexNumber);
    }
    // 重绘曲线
    MiningIndexDialogPro.setValueChartOption =function(num){
        var me= this;
        if(me.valueChart){
            var chartData = me.getValueChartData();
            me.valueChart.setOption({
                xAxis: {
                    data:chartData.xAxisData,
                },
                series:[{
                        name: 'value_bar',
                        color:[me.colors[num]],
                        data:chartData.data,
                        markArea:{
                            data: [[{
                                coord: [chartData.minIndex, 0],
                            }, {
                                coord: [chartData.maxIndex, chartData.maxNum],
                            }]]
                        }
                    }]
            })
        }
    }
    MiningIndexDialogPro.setHeightChartOption =function(num){
        var me= this;
        if(me.heightChart){
            me.maxHr = indexSeries.data[0].maxHr;
            me.minHr = indexSeries.data[0].minHr;
            var data2 = [me.minHr[num],me.maxHr[num]];
            me.heightChart.setOption({
                series:[{
                        name: 'height_bar',
                        color:[me.colors[num]],
                        data:data2
                    }]
            })
        }
    }
    // 获取曲线所需数据
    MiningIndexDialogPro.getValueChartData = function(){
        var me  = this;
        me.maxData = indexSeries.data[0].maxData;
        me.minData = indexSeries.data[0].minData;
        me.max = indexSeries.data[0].max;
        me.min = indexSeries.data[0].min;
        var max = me.maxData[seleNumber];
        var min = me.minData[seleNumber];
        if(max&&min){
            var sp = (max-min)/10;
            var xData = [],xAxisData =[];
            var data1 = [0,0,0,0,0,0,0,0,0,0];
            var minIndex = 1;
            var maxIndex = 10;
            for(var i = 0;i<10;i++){
                xData.push(sp*(i)+min)
            }
            xData.forEach(function(item,i){
                xAxisData.push(item.toFixed(2));
                if(me.min[seleNumber]>item && xData[i+1]&&me.min[seleNumber]<xData[i+1] ){
                    minIndex = i+1;
                }
                if(me.max[seleNumber]<item && xData[i-1]&&me.max[seleNumber]>xData[i-1] ){
                    maxIndex = i
                }
            })
            indexSeries.data.forEach(function(item){
                var value = item.value[seleNumber];
                if(value){
                    for(var i = 0;i<10;i++){
                        if(i>0){
                            if(value<xData[i]&&value>xData[i-1]){
                                data1[i]++
                            }
                        }else{
                            if(value<xData[i]){
                                data1[i]++
                            }
                        }
                    }
                }
            })
            var maxNum  = null;
            data1.forEach(function(item,i){
                if(maxNum ===null || maxNum<item){
                    maxNum = item
                }
            })
        }else{
            var data1 = [10,20,45,15,50,10,20,45,15,50];
            var xAxisData = [1,2,3,4,5,6,7,8,9,10]
        }
        return {
            data:data1,
            xAxisData:xAxisData,
            minIndex:minIndex,
            maxIndex:maxIndex,
            maxNum:maxNum
        }
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
    
    hwchart.dialog.MiningIndex = MiningIndexDialog
})