Vmd.define('hwchart.dialog.FontSeting',{
    requires:[],
},function () { 
    var zUtil = zrender.util;
        /**
     * @constructor
     * @alias module:echarts/chart/helper/SymbolDraw
     * @param {module:zrender/graphic/Group} [symbolCtor]
     */
    function FontSeting(chart,parents,fontStyle) {
		this.chart = chart;
		fontStyle  = fontStyle ||{};
		this.fontOption = {
			color:fontStyle.color ||'#000',
			fontSize:fontStyle.fontSize||12,
			fontStyle:fontStyle.fontStyle||'normal',
			fontWeight:fontStyle.fontWeight||'normal',
			fontFamily:fontStyle.fontFamily ||'Microsoft YaHei'
		};
		
		zrender.Eventful.call(this);
		this.initFrom(parents);
    }

	var FontSetingDialogPro= FontSeting.prototype;
	
	FontSetingDialogPro.initFrom = function(parents){
		var me  = this;
		var fromData = [{
			type: "block",
			width: 300,
			offsetLeft:0,
			className:'font-box',
			list: [{type: "combo",
					position: "label-left",
					label: '文本',
					labelWidth: 30,
					labelHeight: 18,
					width: 80,
					name: "font_family",
					options: [{
							value: 'SimSun',
							text: '宋体'
						},
						{
							value: 'SimHei',
							text: '黑体'
						},
						{
							value: 'Microsoft YaHei',
							text: '微软雅黑'
						},
						{
							value: 'FangSong',
							text: '仿宋'
						},
						{
							value: 'KaiTi',
							text: '楷体'
						},
						{
							value: 'STHeiti Light',
							text: '华文细黑'
						},
						{
							value: "Arial",
							text: "Arial"
						}
					]},
					{
						type: "newcolumn"
					},
					{type: "combo",
					position: "label-left",
					label: '',
					labelHeight: 18,
					width: 50,
					name: "font_size",
					options: [
						{
							value: 8,
							text: 8
						},
						{
							value: 10,
							text: 10
						},
						{
							value: 12,
							text: 12
						},
						{
							value: 14,
							text: 14
						},
						{
							value: 16,
							text: 16
						},
						{
							value: 18,
							text: 18
						},
						{
							value: 20,
							text: 20
						},
						{
							value: 22,
							text: 22
						},
						{
							value: 24,
							text: 24
						},
						{
							value: 28,
							text: 28
						},
						{
							value: 32,
							text: 32
						}
					]},
					{type:"newcolumn"},
					{type: "checkbox", width: 20, name: "bold", value: '',offsetLeft:1,className:'font-bnt font-bnt1'},
					{type:"newcolumn"},
					{type: "checkbox", width: 20, name: "italic", value: '',offsetLeft:2,className:'font-bnt font-bnt2'},
					{type:"newcolumn"},
					{type: "block",offsetTop: 0,offsetLeft: 0,className:'font-block', list:[
						{type: "button", width:22, name: "color", value: '',offsetLeft: 2,className:'font-bnt font-bnt3'},
						{type: "input", width:26, name: "font_color", value: '',offsetTop:0,offsetLeft: -20,className:'font-color'},
					]},
				]
			}
		]
		me.from = new dhtmlXForm(parents,fromData);
		me.colorPicker = new dhtmlXColorPicker(me.from.getInput("font_color"));
		me.colorPicker.loadUserLanguage("ch");
		me.setFormValue();
		me.from.attachEvent("onChange", function (name,value,isCheck){
            if(name === 'bold'){
				if(isCheck){
					me.fontOption.fontWeight = 'bold';
				}else{
					me.fontOption.fontWeight = 'normal';
				}
				me.trigger('onFontStyleChange',me.fontOption)
			}
			if(name === 'italic'){
				if(isCheck){
					me.fontOption.fontStyle = 'italic';
				}else{
					me.fontOption.fontStyle = 'normal';
				}
				me.trigger('onFontStyleChange',me.fontOption)
			}
			if(name === 'font_size'){
				var fontSizeCom =  me.from.getCombo("font_size");
				me.fontOption.fontSize = parseFloat(fontSizeCom.getActualValue());
				me.trigger('onFontStyleChange',me.fontOption)
			}
			if(name === 'font_family'){
				me.fontOption.fontFamily = value;
				me.trigger('onFontStyleChange',me.fontOption)	
			}
	    });
	    me.from.attachEvent("onButtonClick", function (name){
			if(name === 'color'){
				me.colorPicker.show();
			}
		});
		me.colorPicker.attachEvent("onSelect", function(color,node){
			me.fontOption.color = color;	
			me.from.setItemValue("font_color", "");
			me.trigger('onFontStyleChange',me.fontOption)
        });
		   
	}

    FontSetingDialogPro.setFormValue = function(){
		var me  = this;
		setColorPickerColor(me.colorPicker,me.fontOption.color);
        me.from.setItemValue('font_size',me.fontOption.fontSize)
		me.from.setItemValue('font_family',me.fontOption.fontFamily);
		if(me.fontOption.fontWeight === 'bold'){
			me.from.setItemValue('bold',true);
		}else{
			me.from.setItemValue('bold',false);
		}
		if(me.fontOption.fontStyle === 'italic' || me.fontOption.fontStyle === 'oblique'){
			me.from.setItemValue('italic',true);
		}else{
			me.from.setItemValue('italic',false);
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

	//继承EventFul
	zrender.util.mixin(FontSeting, zrender.Eventful);
    hwchart.dialog.FontSeting = FontSeting;
})