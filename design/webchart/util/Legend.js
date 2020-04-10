  Ext.define('vmd.d.webchart.util.Legend', {
    requires: [
        'vmd.d.webchart.util.Font'
    ],
    
    // show: true, // 是否显示
    // title: "", // 标题
    // fontTitle: {}, // 标题字体
    // rows: 2, // 行数
    // cols: 2, // 列数
    // posHori: 2, // 横向位置，0：左，1：中，2：右
    // posVert: 2, // 纵向位置，0：上，1：中，2：下
    // borderOffTop: 5, // 上边距
    // borderOffBtm: 5, // 下边距
    // borderOffLeft: 5, // 左边距
    // borderOffRight: 5, // 右边距
    // itemWidth: 30, // 图例项宽度
    // itemHeight: 24, // 图例项高度
    // fontItem: {}, // 图例项字体
    // itemSpaceHori: 8, // 横向间距
    // itemSpaceVert: 5, // 纵向间距
    // arrItem: [], // 图例项名称数组

    constructor: function (legend) {        
        this.fontItem = new vmd.d.webchart.util.Font(legend.textStyle);
        this.show= legend.show;// 是否显示
        this.title= legend.title||"";// 标题
        this.fontTitle= legend.fontTitle || {};// 标题字体
        this.rows= legend.rows || 3;// 行数
        this.cols= legend.cols || 2;// 列数
        this.width= legend.width || 160;// 宽度
        this.height= legend.height || 80;// 高度
        this.posHori= legend.posHori || 'right';// 横向位置，left：左，center：中，right：右
        this.posVert= legend.posVert || 'bottom';// 纵向位置，top：上，middle：中，bottom：下
        // this.orient= legend.orient || "vertical";// horizontal/vertical
		this.orient= 1; // horizontal/vertical
		if(legend.orient == "horizontal")
		{
			this.orient= 2; // horizontal/vertical
		}
				if(legend.padding)
		{
			if(legend.padding.length > 0)
			{
				this.borderOffTop = legend.padding[0];// 上边距
				this.borderOffRight = legend.padding[1];// 右边距	
				this.borderOffBtm = legend.padding[2];// 下边距
				this.borderOffLeft = legend.padding[3];// 左边距	
			}
		}	
		
        this.itemWidth = legend.itemWidth||30;// 图例项宽度
        this.itemHeight = legend.itemHeight||24;// 图例项高度
        this.itemGap = legend.itemGap||8;// 横向/纵向间距
        //this.itemSpaceHori= legend.itemSpaceHori||8;// 横向间距
        //this.itemSpaceVert= legend.itemSpaceVert||5;// 纵向间距
        // this.arrItem= legend.arrItem||[];// 图例项名称数组
		this.data = legend.data || [];// 图例项名称数组	
    },

    // 序列化
    serialize: function(){
        var legend = this;
        var obj = {};
		obj.padding = [];
        // obj.fontItem = legend.fontItem.serialize();
        obj.textStyle = legend.fontItem.serialize();
        obj.show= legend.show;// 是否显示
        obj.title= legend.title||"";// 标题
        // obj.fontTitle= legend.fontTitle || {};// 标题字体
        obj.rows= legend.rows || 3;// 行数
        obj.cols= legend.cols || 2;// 列数
        obj.width= legend.width || 160;// 宽度
        obj.height= legend.height || 80;// 高度
        obj.posHori= legend.posHori || 'right';// 横向位置，left：左，center：中，right：右
        obj.posVert= legend.posVert || 'bottom';// 纵向位置，top：上，middle：中，bottom：下
        obj.orient= "horizontal";// horizontal/vertical
		if(legend.orient == 1)
		{
			obj.orient= "vertical";// horizontal/vertical
		}

		if(obj.padding)
		{
			obj.padding[0] = legend.borderOffTop||5;// 上边距
			obj.padding[1] = legend.borderOffRight||5;// 右边距
			obj.padding[2] = legend.borderOffBtm||5;// 下边距
			obj.padding[3] = legend.borderOffLeft||5;// 左边距	
		}	
		
        obj.itemWidth= legend.itemWidth||30;// 图例项宽度
        obj.itemHeight= legend.itemHeight||24;// 图例项高度
        obj.itemGap= legend.itemGap||8;// 横向/纵向间距
        // obj.itemSpaceHori= legend.itemSpaceHori||8;// 横向间距
        // obj.itemSpaceVert= legend.itemSpaceVert||5;// 纵向间距
        // obj.arrItem= legend.arrItem||[];// 图例项名称数组		
		obj.data = legend.data || [];// 图例项名称数组		
		// obj.orient = "vertical";
        // 将行数、列数转换为图例的宽高
        // obj.height = obj.itemHeight * obj.rows + obj.itemGap * (obj.rows - 1) + legend.borderOffTop + legend.borderOffBtm;
        // obj.width = obj.itemWidth * obj.cols;
		// obj.orient = "vertical";
        // if(obj.rows < obj.cols)
        // {
           //  obj.width = obj.itemWidth * obj.cols + obj.itemGap * (obj.cols - 1) + obj.borderOffLeft + obj.borderOffRight;
            // obj.height = obj.itemHeight * obj.rows;
			// obj.orient = "horizontal";
        // }

        return obj;
    },

    // 反序列化
    deserialize: function(){
    
    }

})