//屏蔽掉所有blockly块的右键菜单
Blockly.ContextMenu.blockHelpOption = function () {

}

// add 生成img标签解析器
goog.ui.tree.BaseNode.prototype.getLabelSafeself = function () {
    var a = goog.html.SafeHtml.create("image", { "class": this.config_.cssItemLabel, title: this.getToolTip(), "src": this.getCategoryImg().trueUrl || null, "backgroundData": JSON.stringify(this.getCategoryImg()) });
    return goog.html.SafeHtml.concat(a, '')

}
// 获取图片类别
goog.ui.tree.BaseNode.prototype.getCategoryImg = function () {
    let style_pt = this.html_.privateDoNotAccessOrElseSafeHtmlWrappedValue_,
        trueUrl = '', clickUrl = '';
    if (style_pt) {
        switch (style_pt) {
            case "Logic":
            case "逻辑":
                trueUrl = "img/if.png";
                clickUrl = "img/if_click.png";
                break;
            case "Math":
            case "数学":
                trueUrl = "img/math.png";
                clickUrl = "img/math_click.png";
                break;
            case "Text":
            case "文本":
                trueUrl = "img/text.png";
                clickUrl = "img/text_click.png";
                break;
            // pt case start
            case "Var":
            case "变量":
                trueUrl = "img/variable.png";
                clickUrl = "img/variable_click.png";
                break;

            case "Dataset":
            case "数据集":
                trueUrl = "img/datatable.png";
                clickUrl = "img/datatable_click.png";
                break;
            case "Functions":
            case "函数":
                trueUrl = "img/function.png";
                clickUrl = "img/function_click.png";
                break;



        }
    }
    return {
        clickUrl: clickUrl,
        trueUrl: trueUrl
    };
}

// 获取行内html样式
goog.ui.tree.BaseNode.prototype.getRowSafeHtml = function () {
    var a = {};
    a["padding-" + (this.isRightToLeft() ? "right" : "left")] = this.getPixelIndent_() + "px";
    a = { "class": this.getRowClassName(), style: a };
    //判断如果不为空  再生成img
    var b = [this.getExpandIconSafeHtml(), this.getIconSafeHtml(), this.getLabelSafeHtml(), this.html_.privateDoNotAccessOrElseSafeHtmlWrappedValue_ ? this.getLabelSafeself() : ''];
    return goog.html.SafeHtml.create("div", a, b)
}


//动态加载数据集
Blockly.Vars = {};
Blockly.Vars.block=[];//记录blockly添加的名称，创建时动态添加块。
Blockly.Vars.NAME_TYPE = 'VMDVARS';
Blockly.Vars.flyoutCategory = function (a) {
    /*function b(a, b) {
        for (var d = 0; d < a.length; d++) {
            var e = a[d][0]
                , f = a[d][1]
                , g = Blockly.utils.xml.createElement("block");
            g.setAttribute("type", b);
            g.setAttribute("gap", 16);
            var m = Blockly.utils.xml.createElement("mutation");
            m.setAttribute("name", e);
            g.appendChild(m);
            for (e = 0; e < f.length; e++) {
                var p = Blockly.utils.xml.createElement("arg");
                p.setAttribute("name", f[e]);
                m.appendChild(p)
            }
            c.push(g)
        }
    }
	*/
    var c = [];
	//添加块到工区栏方法
	var  addBlock= function(name)
	{
		    var d = Blockly.utils.xml.createElement("block");
		    d.setAttribute("type", name);
		    d.setAttribute("gap", 16);
		    var e = Blockly.utils.xml.createElement("field");
		    e.setAttribute("name", "NAME");
		    e.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE));
		    d.appendChild(e);
		    c.push(d)
		
	}
	//添加块到工区栏
	for(var i=0;i<Blockly.Vars.block.length;i++)
	{
		addBlock(Blockly.Vars.block[i])
	}
    c.length && c[c.length - 1].setAttribute("gap", 24);
    return c
}


//动态加载数据集
Blockly.Datasets = {};
Blockly.Datasets.block=[];
Blockly.Datasets.NAME_TYPE = 'VMDDATASETS';
Blockly.Datasets.flyoutCategory = function (a) {
  /*  function b(a, b) {
        for (var d = 0; d < a.length; d++) {
            var e = a[d][0]
                , f = a[d][1]
                , g = Blockly.utils.xml.createElement("block");
            g.setAttribute("type", b);
            g.setAttribute("gap", 16);
            var m = Blockly.utils.xml.createElement("mutation");
            m.setAttribute("name", e);
            g.appendChild(m);
            for (e = 0; e < f.length; e++) {
                var p = Blockly.utils.xml.createElement("arg");
                p.setAttribute("name", f[e]);
                m.appendChild(p)
            }
            c.push(g)
        }
    }
	*/
    var c = [];
    //添加块到工区栏方法
    var  addBlock= function(name)
    {
    	    var d = Blockly.utils.xml.createElement("block");
    	    d.setAttribute("type", name);
    	    d.setAttribute("gap", 16);
    	    var e = Blockly.utils.xml.createElement("field");
    	    e.setAttribute("name", "NAME");
    	    e.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE));
    	    d.appendChild(e);
    	    c.push(d)
    	
    }
    //添加块到工区栏
    for(var i=0;i<Blockly.Datasets.block.length;i++)
    {
    	addBlock(Blockly.Datasets.block[i])
    }
    c.length && c[c.length - 1].setAttribute("gap", 24);

    return c
}



//动态加载数据集
Blockly.Functions = {};
Blockly.Functions.block = [];//添加基础块
Blockly.Functions.customBlock = [];//添加组合块
Blockly.Functions.NAME_TYPE = 'VMDFUNCTIONS';
Blockly.Functions.flyoutCategory = function (a) {
	//获取工作区定义的方法块
	function b(a, b) {
		for (var d = 0; d < a.length; d++) {
			var e = a[d][0],
				f = a[d][1],
				g = Blockly.utils.xml.createElement("block");
			g.setAttribute("type", b);
			g.setAttribute("gap", 16);
			var m = Blockly.utils.xml.createElement("mutation");
			m.setAttribute("name", e);
			g.appendChild(m);
			for (e = 0; e < f.length; e++) {
				var p = Blockly.utils.xml.createElement("arg");
				p.setAttribute("name", f[e]);
				m.appendChild(p)
			}
			c.push(g)
		}
	}
	var c = [];
	//添加默认方法块
	if (Blockly.Blocks.procedures_defnoreturn) {
		var d = Blockly.utils.xml.createElement("block");
		d.setAttribute("type", "procedures_defnoreturn");
		d.setAttribute("gap", 16);
		var e = Blockly.utils.xml.createElement("field");
		e.setAttribute("name", "NAME");
		e.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE));
		d.appendChild(e);
		c.push(d)
	}
	//添加默认方法块
	Blockly.Blocks.procedures_defreturn && (d = Blockly.utils.xml.createElement("block"), d.setAttribute("type",
			"procedures_defreturn"), d.setAttribute("gap", 16), e = Blockly.utils.xml.createElement("field"), e.setAttribute(
			"name", "NAME"), e.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE)),
		d.appendChild(e), c.push(d));
		
	//添加默认方法块
	Blockly.Blocks.procedures_ifreturn && (d = Blockly.utils.xml.createElement("block"), d.setAttribute("type",
		"procedures_ifreturn"), d.setAttribute("gap", 16), c.push(d));	
	
     //添加自定义基础块到工区栏方法
	var  addBlock= function(name)
	{
  	    var d = Blockly.utils.xml.createElement("block");
  	    d.setAttribute("type", name);
  	    d.setAttribute("gap", 16);  	    
  	    c.push(d)  	
	}  
	//添加基础块到工区栏
	for(var i=0;i<Blockly.Functions.block.length;i++)
	{
		addBlock(Blockly.Functions.block[i])
	}
	//添加组合块
	for(var i=0;i<Blockly.Functions.customBlock.length;i++)
	{
		c.push(Blockly.Functions.customBlock[i])
	}
	
    c.length && c[c.length - 1].setAttribute("gap", 24);
	a = Blockly.Procedures.allProcedures(a);
	b(a[0], "procedures_callnoreturn");
	b(a[1], "procedures_callreturn");
    return c
}