Vmd.define('hwchart.dialog.MiningIndexDialog',{
    requires:['hwchart.dialog.FontSeting'],
},function () { 
    var wellName = '';
    var indexNumber = 0;
    var seleIndex = null;
    var zUtil = zrender.util;
    var seriesData = null;
    var oriData = null;
    var miningIndexCofig = null;
    var dataIsChange = false;
    var fontSeting = hwchart.dialog.FontSeting;
        /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function MiningIndexDialog(chart,params) {
        var me = this;
        me.chart = chart;
        me.params = params;
        miningIndexCofig = me.chart.miningIndexCofig; // 用户的配置文件
        var series= chart._api.getModel().getSeries();
        series.forEach(function(item){
            if(item.subType === 'miningIndex'){
                seriesData = item.option.data;
                me.options = seriesData[params.dataIndex]
                // seriesData.forEach(function(item){
                //     if(item.id === params.data.id){
                //         me.options = item;
                //     }
                // })
            }
        })
        //console.log(me.options)
        seleIndex = params.event.target.parent;
        oriData = zUtil.clone(me.options);
        var parmData = this.options;
        me.names = parmData.name || [];
        me.valueData = parmData.value || [];
        me.colors = parmData.color || [];
        me.companys = parmData.company || [];
        me.shortName = parmData.shortName || [];
        me.fields = parmData.fields || [];

        me.labelFontSize = parmData.labelFontSize || [];
        me.labelFontFamily = parmData.labelFontFamily||[];
        me.labelFontStyle = parmData.labelFontStyle||[];
        me.labelFontWeight = parmData.labelFontWeight||[];
        me.labelFontColor = parmData.labelFontColor||[];

        me.nameFontSize = parmData.nameFontSize || [];
        me.nameFontFamily = parmData.nameFontFamily||[];
        me.nameFontStyle = parmData.nameFontStyle||[];
        me. nameFontWeight = parmData.nameFontWeight||[];
        me.nameFontColor = parmData.nameFontColor||[];

        me.isShow =  parmData.isShow || [];
        me.nameIsShow =  parmData.nameIsShow || [];
        me.labelIsShow = parmData.labelIsShow || [];
        me.companyIsShow =  parmData.companyIsShow || [];
        me.symbol = parmData.symbol;
        if(parmData&&parmData.id){
            wellName =  parmData.id;
        }
        this.initWindow();
    }

    var MiningIndexDialogPro= MiningIndexDialog.prototype;

    MiningIndexDialogPro.initWindow = function(){
        var me = this;
        var win = null;
        var myMingingIndexWins = new dhtmlXWindows();
        //myMingingIndexWins.setSkin('dhx_terrace');
        win = this.win = myMingingIndexWins.createWindow({
            id: "miningIndex",
            text: wellName + '开采指标属性配置',
            width: 650,
            height: 410,
            center:true
        });
        win.button('park').hide();
        win.button('minmax').hide();
        
        me.indexForm = win.attachForm(me.createForm());
        //indexForm.adjustParentSize();
        // 初始化设置对话框
        me.initFormWin();
        //setFItemValue(me.indexForm,indexNumber)
    }
    // 根据数据生成form数据
    MiningIndexDialogPro.createForm = function(delBnt){
        var me = this;
        var delBnt = delBnt || false;
        // var isImgType = true?me.symbol == '21':false;
        // var indexNames = [];
        var valueData;
        if(me.valueData){
            valueData = this.valueData;
        }else if(me.names){
            valueData = this.names;
        }else{
            return
        }
        
        var formData = [
            {type: "block", blockOffset:0,list:[
                {type: "fieldset", label:"指标",name:'index_groud', width: 160,offsetLeft:12,className:'index-box1', list:[
                    
                ]},
                {type:"newcolumn"},
                {type: "fieldset",label:"属性",className:'zb-box3', width: 450,blockOffset:0,offsetLeft:10, className:'index-box2',list:[
                    {type: "block", blockOffset:0,list:[
                        {type: "checkbox", name: 'index_show', value: "r1", label: "显示",position:'label-right'},
                        {type:"newcolumn"},
                        {type: "input", name: 'index_color', width:80, labelWidth: 40,offsetTop:12, label: "颜色", value: '',offsetLeft:15},
                        {type:"newcolumn"},
                        {type: "checkbox", name: 'index_all', value: "r1", label: "应用到全部",position:'label-right',offsetLeft:82}
                    ]},
                    
                    {type: "block", blockOffset:0,offsetTop:10,list:[
                        {type: "label", name: '', label: "标注",offsetTop:10,position:'label-right'},
                    ]},
                    {type: "block", blockOffset:0,offsetTop:0,offsetTop:2,list:[
                        {type: "checkbox", name: 'name_show', value: "r1", label: "",position:'label-right'},
                        {type:"newcolumn"},
                        {type: "input", name: 'short_name', width:60, labelWidth: 30,label: "简称", offsetTop:10, value: ''},
                        {type:"newcolumn"},
                        {type: "container", name: "name_font_set",inputHeight:40,inputWidth:100,}
                        
                        // {type:"newcolumn"},
                        // {type: "checkbox", name: 'name_all', value: "r1",label: "应用到全部",position:'label-right',offsetLeft:28,}
                    ]},
                    {type: "block", blockOffset:0,offsetTop:2,list:[
                        {type: "checkbox", name: 'label_show', value: "r1", label: "",position:'label-right'},
                        {type:"newcolumn"},
                        {type: "input", name: 'value', width:60, labelWidth: 30,label: "数值", offsetTop:10, value: '',},
                        {type:"newcolumn"},
                        {type: "checkbox", name: 'company_show', value: "r1", label: "",position:'label-right'},
                        {type:"newcolumn"},
                        {type: "input", name: 'label', width:60, labelWidth: 30,label: "单位", offsetTop:10, value: '',},
                        {type:"newcolumn"},
                        
                        //{type: "container", name: "company_font_set",inputHeight:40,inputWidth:100,}
                       
                        // {type:"newcolumn"},
                        // {type: "checkbox", name: 'company_all', value: "r1",label: "应用到全部",position:'label-right',offsetLeft:28,}
                    ]},
                    {type: "block", blockOffset:0,offsetLeft:0,offsetTop:8,list:[
                        {type: "container", name: "value_font_set",inputHeight:40,inputWidth:100,offsetLeft:0,}
                        
                        // {type:"newcolumn"},
                        // {type: "checkbox", name: 'label_all', value: "r1",label: "应用到全部",position:'label-right',offsetLeft:28,}
                    ]},
                ]}
            ]},
            {type: "block", offsetLeft: 450, offsetTop: 10, hidden:delBnt, list: [
                {type: "button", width: 50, name: "confirm", value: '确定',offsetLeft: 12},
                {type: "newcolumn"},
                {type: "button", width: 50, name: "cancel", value: '取消',  offsetLeft: 20}
                ]
            }
        ];
        var n = 0;
        valueData.forEach(function(item,i){
            if(item!=''&&item!=undefined&&item!=null){
                if(n ===0){
                    indexNumber = i;
                    var obj = {type: "radio", name:'indexName', value: i, labelWidth: 80,checked:true, label: me.names[i],position: "label-right"}
                }else{
                    var obj = {type: "radio", name:'indexName', value: i, labelWidth: 80, label: me.names[i],position: "label-right"}
                }
                n++;
                formData[0].list[0].list.push(obj)
            }
        })
        return formData;
    };

    MiningIndexDialogPro.initFormWin = function(){
        var me  = this;
        me.colorPicker = new dhtmlXColorPicker(me.indexForm.getInput("index_color"));
        me.colorPicker.loadUserLanguage("ch");
        me.setFormValue(indexNumber); // 给属性框赋值
        /*
            *调用字体设置组件
            *@params  chart 实例化对象
            *@params  parent 组件父容器
            *@params  fontStyle 初始文本样式
        */
        me.nameFontSet = new fontSeting(me.chart,me.indexForm.getContainer("name_font_set"));
        // 监听文字设置组件的变化
        me.nameFontSet.on('onFontStyleChange',function(font){
            if(me.indexForm.isItemChecked('name_show')){
                me.options.nameFontFamily[indexNumber] = font.fontFamily;
                me.options.nameFontSize[indexNumber] = font.fontSize;
                me.options.nameFontStyle[indexNumber] = font.fontStyle;
                me.options.nameFontWeight[indexNumber] = font.fontWeight;
                me.options.nameFontColor[indexNumber] = font.color;
                setDataValue(seriesData, me.options);
                me.chart.setOption({series:[{
                    name:me.params.seriesName,
                    data:seriesData,
                    dataChanged:true
                }]})    
            }
       })
        me.valueFontSet = new fontSeting(me.chart,me.indexForm.getContainer("value_font_set"));
        // 监听文字设置组件的变化
        me.valueFontSet.on('onFontStyleChange',function(font){
            if(me.indexForm.isItemChecked('company_show') ||me.indexForm.isItemChecked('label_show')){
                me.options.labelFontFamily[indexNumber] = font.fontFamily;
                me.options.labelFontSize[indexNumber] = font.fontSize;
                me.options.labelFontStyle[indexNumber] = font.fontStyle;
                me.options.labelFontWeight[indexNumber] = font.fontWeight;
                me.options.labelFontColor[indexNumber] = font.color;
                setDataValue(seriesData, me.options);
                me.chart.setOption({series:[{
                    name:me.params.seriesName,
                    data:seriesData,
                    dataChanged:true
                }]})    
            }
       })

        // 属性框操作
        me.indexForm.attachEvent("onButtonClick", function (name) {
            if (name == "confirm"){
                // if(!me.indexForm.isItemChecked('index_all')&&!me.indexForm.isItemChecked('label_all')
                // &&!me.indexForm.isItemChecked('company_all')&&!me.indexForm.isItemChecked('name_all')){
                //     me.win.close();
                //     return
                // }
                // if(me.indexForm.isItemChecked('index_all')){
                //     oriData.color = me.options.color;
                //     oriData.isShow = me.options.isShow;
                //     setDataValue(seriesData, oriData,true)
                // }
                // if(me.indexForm.isItemChecked('label_all')){
                //     oriData.labelIsShow = me.options.labelIsShow;
                //     setDataValue(seriesData, oriData,true)
                // }
                // if(me.indexForm.isItemChecked('company_all')){
                //     oriData.companyIsShow = me.options.companyIsShow;
                //     oriData.company = me.options.company;
                //     setDataValue(seriesData, oriData,true)
                // }
                // if(me.indexForm.isItemChecked('name_all')){
                //     oriData.nameIsShow = me.options.nameIsShow;
                //     oriData.shortName = me.options.shortName;
                //     setDataValue(seriesData, oriData,true)
                // }
                
                // me.chart.setOption({series:[{
                //     name:me.params.seriesName,
                //     data:seriesData,
                //     dataChanged:true
                // }]})    
                // oriData.fields.forEach(function(item,i){
                //     zUtil.each(miningIndexCofig,function(v,k){
                //         if(item === k){
                //             v.color = oriData.color[i];
                //             v.company = oriData.company[i];

                //             v.labelFontSize = oriData.labelFontSize[i];
                //             v.labelFontFamily = oriData.labelFontFamily[i];
                //             v.labelFontStyle = oriData.labelFontStyle[i];
                //             v.labelFontWeight = oriData.labelFontWeight[i];
                //             v.nameFontSize = oriData.nameFontSize[i];
                //             v.nameFontFamily = oriData.nameFontFamily[i];
                //             v.nameFontStyle = oriData.nameFontStyle[i];
                //             v.nameFontWeight = oriData.nameFontWeight[i];

                //             v.show = oriData.isShow[i];
                //             v.shortName = oriData.shortName[i];
                //             v.labelIsShow = oriData.labelIsShow[i];
                //             v.nameIsShow = oriData.nameIsShow[i];
                //             v.max = oriData.max[i];
                //             v.min = oriData.min[i];
                //             v.maxHr = oriData.maxHr[i];
                //             v.minHr = oriData.minHr[i];
                //             v.cloumnWidth = oriData.cloumnWidth;
                //         }
                //     })
                    
                // })
                // //console.log(miningIndexCofig)
                // // 保存配置文件
                // var content = JSON.stringify(miningIndexCofig);
                // var userName = 'dbadmin';
                // var  option = me.chart.tpl.configOption;
                // var hwFao = new HwFao(option.fileHost || option.host, option.fileCallCode || option.callCode); //地址:端口和存储标识(服务管理员分配)
                // var filepath =  userName + "/columIndexConfigs/columnIndexJson.json";
                // hwFao.write(filepath, content, function (res) {
                //     if (res.isSucceed) {
                //         alert('开采指标配置文件保存成功')
                //     } else {
                //         alert(res.errMsg);
                //     }
                // }, function (res) { alert(res); });
                me.win.close();
            }
            if(name == "cancel"){
                difData(oriData,me.options) 
                // console.log(dataIsChange)
                if(dataIsChange){
                    setDataValue(seriesData, oriData)
                    me.chart.setOption({series:[{
                        name:me.params.seriesName,
                        data:seriesData,
                        dataChanged:true
                    }]})    
                }
                me.win.close();
            }
        })
        me.indexForm.attachEvent("onChange", function (name,value,isCheck) {
            if(name === 'indexName'){
                // 根据选择的指标名称切换属性框内容
                indexNumber = value;
                me.setFormValue(value);
            }else{
                if(name === 'short_name'){
                    me.options.shortName[indexNumber] = value;
                    setDataValue(seriesData, me.options)
                }
                if(name === 'label'){
                    me.options.company[indexNumber] = value;
                    setDataValue(seriesData, me.options)
                }
                if(name === 'index_show'){
                    me.options.isShow[indexNumber] = isCheck;
                    setDataValue(seriesData, me.options)
                }
                if(name === 'label_show'){
                    me.options.labelIsShow[indexNumber] = isCheck;
                    setDataValue(seriesData, me.options)
                }
                if(name === 'name_show'){
                    me.options.nameIsShow[indexNumber] = isCheck;
                    setDataValue(seriesData, me.options)
                }
                if(name === 'company_show'){
                    me.options.companyIsShow[indexNumber] = isCheck;
                    setDataValue(seriesData, me.options)
                }
                if(name === 'value'){
                    if(isNaN(parseFloat(value))){
                        alert('请输入正确的数字')
                        return
                    }
                    me.options.value[indexNumber] = value;
                    setDataValue(seriesData, me.options)
                }

                if(name ==='index_all'){
                    setDataValue(seriesData, me.options,name,isCheck)
                }

                me.chart.setOption({series:[{
                    name:me.params.seriesName,
                    data:seriesData,
                    dataChanged:true
                }]})    
            }
        })
        me.colorPicker.attachEvent("onSelect", function(color,node){
            me.options.color[indexNumber] = color
            setDataValue(seriesData, me.options)
            me.chart.setOption({series:[{
                name:me.params.seriesName,
                data:seriesData,
                dataChanged:true
            }]})

        });
    }

    MiningIndexDialogPro.setFormValue =function(indexNumber){
        var me  = this;
        indexNumber = indexNumber ||0;
        me.indexForm.setItemLabel('index_name',me.names[indexNumber]+' 属性'); 
        setColorPickerColor(me.colorPicker,me.colors[indexNumber]);
        me.indexForm.setItemValue("index_color", me.colors[indexNumber] || "#C0D0E0");
        me.indexForm.setItemValue('short_name',me.shortName[indexNumber])
        me.indexForm.setItemValue('label',me.companys[indexNumber]);
        if(me.valueData){
            me.indexForm.setItemValue('value',me.valueData[indexNumber]);
        }
        me.indexForm.setItemValue('index_show',me.isShow[indexNumber]);
        me.indexForm.setItemValue('name_show',me.nameIsShow[indexNumber]);
        me.indexForm.setItemValue('label_show',me.labelIsShow[indexNumber]);
        me.indexForm.setItemValue('company_show',me.companyIsShow[indexNumber]);
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
    function setDataValue(seriesData,newData,name,isAll){
        if(isAll){
            seriesData.forEach(function(item){
                
                    item.color = newData.color;
                    item.isShow = newData.isShow;
                
            })
        }else{
            seriesData.forEach(function(item,i){
                if(item.id === newData.id){
                    seriesData[i] = newData;
                }else{
                    if(name ==='index_all'){
                        seriesData[i].color = oriData.color;
                    }
                }
            })
        }
    }
    // 对比数据是否发生变化
    function difData(oldData,newData){
        // console.log(oldData)
        // console.log(newData)
        zUtil.each(oldData,function(v,k){
            // console.log(typeof v)
            // console.log(k)
            if(typeof v =='string' || typeof v == "number"){
                if(v!=newData[k]){
                    dataIsChange = true;
                }
            }else{
                difData(v,newData[k])
            }
        })
    }
    hwchart.dialog.MiningIndexDialog = MiningIndexDialog
})