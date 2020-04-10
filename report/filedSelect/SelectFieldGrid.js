/*
filename：SelectFieldGrid.js
creater：lifen
date created：2017.07.11
description：
date modified：
modifier：
version：2.2.12.1028
others：
copyright：Copyright © 1999-2016, hwkj, All Rights Reserved
*/

function getCheckBox() {
    var checkbox = [];
    var inputs = document.getElementsByTagName("input");//获取所有的input标签对象
    for (var i = 0; i < inputs.length; i++) {
        var obj = inputs[i];
        if (obj.type == 'checkbox') {
            checkbox.push(obj);
        }
    }
    return checkbox;
}

//点击选择字段按钮
function selectField(datavalue, configData,configFile,ReportID) {
  //  var dhxWins = new dhtmlXWindows();
    if(datavalue.headerLength==0){
        vmd.alert("提示", "未检测到表头，请先设置表头！");
        return;
    }

    var winLeft =0;
    var winRight = 0;
	var widthz;
	if(datavalue.oldColWidths){
		widthz=getAllColumnWidth(datavalue.oldColWidths);
	}
	else{
		widthz=getAllColumnWidth(datavalue.colWidths);
	}
	//var winWidth=widthz+105;
	var winWidth=600;
   var winHeight =(getAllHeaderHeight(datavalue.grid.getRowsHeight(), datavalue.headerLength) + 60)*2+140;
	//var winHeight =400;
    if(winHeight<500)
        winHeight=500;
    if(winWidth>parseInt(screen.availWidth))
	   winWidth=parseInt(screen.availWidth)
   /* var reportWin = dhxWins.createWindow("fieldselect", winLeft, winRight, winWidth, winHeight);
    reportWin.center();
    reportWin.setModal(true);
    reportWin.setText("字段选择");
	reportWin.attachEvent("close", function(){
		reportWin.setModal(false);
		reportWin.hide();
	})*/
	if(!configData){
		configData={};
	}
    
	var headerObj=datavalue.headerdefine;
    var domContent=datavalue.getCellsDom();
    if(domContent.title&&domContent.title.length>0){
        headerObj.main.body.sections[0].title[0].cells[0].data=domContent.title[0][0].textContent;
    }
    if(domContent.header&&domContent.header.length>0){
        var headers=domContent.header;
        for(var i=0;i<headers.length;i++){
            var headerRow=headers[i];
            if(headerRow&&headerRow.length>0){
                for(var j=0;j<headerRow.length;j++){
                    headerObj.main.body.sections[0].header[i].cells[domContent.header[i][j]._cellIndex].data=domContent.header[i][j].textContent;
                }
            }
        }
    }
	if(headerObj){
			headerObj.main.body.sections[0].data=[];
			headerObj.main.body.fixedcol=0;
	}
	var bottomJson=Ext.encode(headerObj);
	if(headerObj)
	{
		var hf=headerObj.main.body.columns.hiddenFields;
			if(hf){
				configData.hiddenFields=hf;
			}
			var oldwidth=headerObj.main.body.columns.oldwidth;
			if(oldwidth)
			{
				if(oldwidth.length>0){
					headerObj.main.body.columns.width=[];
					for(var i=0;i<oldwidth.length;i++){
						headerObj.main.body.columns.width.push(oldwidth[i]);
					}
				}
			}
	}
	var headerJson = Ext.encode(headerObj);
	var gridData={};
	gridData.headerJson=headerJson;
	gridData.bottomJson=bottomJson;
	gridData.colWidths=datavalue.colWidths;
	gridData.oldColWidths=datavalue.oldColWidths;
	gridData.fixedColCount=datavalue.fixedColCount;
	//gridData.fixedColCount=0;
	gridData.heights=datavalue.grid.getRowsHeight();
	gridData.headerLength=datavalue.headerLength;
	//gridData.grid=JSON2.stringify(datavalue.grid);
	if(datavalue.external_title)
	{
	    gridData.title=datavalue.external_title;
	}
    var params = { datavalue: encodeURIComponent(JSON.stringify(gridData)), configFile:configFile,reportID:ReportID,args: JSON.stringify({ allFields: configData.allFields, hiddenFields: configData.hiddenFields, moveFields: configData.moveFields }) };
//	var url = vmd.virtualPath+"\\filedSelect\\FieldSelect.html";
 //   reportWin.attachURL(url, false, params);
    window.fieldParams={};
    window.fieldParams.params=params;
    window.fieldParams.hwreport=datavalue;
    var win=new vmd.window({
        url: vmd.virtualPath +'/report/filedSelect/FieldSelect.html?params='+params,
        auto:false,
        width:winWidth,
        height:winHeight,
        title:'字段选择'
    })
    win.show();
  //  return reportWin;
    return win;
}

function fieldSelect() {

    //var dhxWins = new dhtmlXWindows();
    //var w1 = dhxWins.createWindow("w1", 50, 70, 320, 200);
    //w1.setText("URL via iframe, POST w/o params");
    //w1.button("close").disable();

    // iframe, get
    //w1.attachURL("HwRptJs/filedSelect/subGridHeader.html", {dialogWidth:width, dialogHeight: height,center:'yes'});
    //return;
    /**
     * 将配置文件信息传给子页面
     * @type {Object}
     */
    //debugger
    var width = parseInt(screen.availWidth); //屏幕可用宽度
    var height = "450px";
    returnValue = window.showModalDialog("HwRptJs/filedSelect/subGridHeader.html", self, "dialogWidth=" + width + "; dialogHeight=" + height + ";center=yes;");

    //返回值是1的情况下
    //window.location.reload();
    //debugger
    upLoad(returnValue);
}

//上传服务器数据
function upLoad(value,filename,virpath, callback) {
    if (value) {
        configGrid.allFields = value.allFields;
        configGrid.hiddenFields = value.hidFields;
        configGrid.moveFields = value.moveFields;
        //调用ajax上传数据
        upDataSave(filename,virpath, configGrid.allFields, configGrid.hiddenFields, configGrid.moveFields, callback);
    }
}

// 根据隐藏列和全部列获取显示列数组信息
function getShowField(showFiled,hiddenFields){
	if(showFiled.length>hiddenFields.length)
		{
			for(var h=0;h<hiddenFields.length;h++){
				for(var s=0;s<showFiled.length; s++)
				{
					if(showFiled[s]==hiddenFields[h])
					{
						showFiled.splice(s,1);
						h=-1;
					}
				}
			}
		}
	return showFiled;
}

//获取key为setHeader的value值
function getAllFields(gridObj, attributelist) {
    //debugger
    var count = attributelist.length;
    for (var each in attributelist) {
        var key = attributelist[each].key;
        if (key == undefined) {
            break;
        }
        var value = attributelist[each].value;
        if (key == "setHeader") {
			if(value&&value[2])
            return value[2].length;
        }
    }
}

function getAllColumnWidth(colWidths) {
	var allWidth=0;
    for (var i=0;i<colWidths.length;i++) {
        var eachWidth = parseInt(colWidths[i]);
        allWidth+=eachWidth;
    }
	return allWidth;
}

function getAllHeaderHeight(heights,headerLength) {
	var allHeaderHeight=0;
	 for (var i=0;i<headerLength;i++) {
        var eachheight = parseInt(heights[i]);
        allHeaderHeight+=eachheight;
    }
	return allHeaderHeight;
}

//获取锁定列的value值
function getLockColumnNum(gridObj, attributelist) {
    //debugger
    var count = attributelist.length;
    for (var each in attributelist) {
        var key = attributelist[each].key;
        if (key == undefined) {
            break;
        }
        var value = attributelist[each].value;
        if (key == "splitAt") {
            return value;
        }
    }
    return 0;
}
function gridInit(gridObj, attributelist) {
    var count = attributelist.length;
    for(var each in attributelist)
    {
        var key = attributelist[each].key;
        if (key==undefined) {
             break;
        }
        var value = attributelist[each].value;
        if (typeof value == "object") { 
            if (value instanceof Array)
                gridObj[key].apply(gridObj, value);
			if (key == "setHeader") {
				gridObj.attachHeader(gridObj.hdrLabels,gridObj._hstyles,"_aHead");
			}
        } 
		else {
			if (key == "setHeaderRowHeight") {
				value="0,"+value;
			}
            gridObj[key](value);
        }
    }
}

// 设置左边列全部隐藏。最左边显示的第一列的左边框为实际第一列的左边框
// mainGrid:报表对象；index:显示的第一列的id; state:状态（none:隐藏;'':显示）
function setFirstColHideLeftBorder(mainGrid,index,state){
	setHeaderLeftBoder(mainGrid,index,state);
	var t = { rows: [mainGrid.obj.rows[0]] }
    mainGrid.forEachRow(function (id) {
        if (mainGrid.rowsAr[id].tagName == "TR")
            t.rows.push(mainGrid.rowsAr[id])
    })
	var z = t.rows.length;
	var rowSpanNum=1;
	var borderLeftColorStr;
	var isrowSpan=false;
	var rowSpanRowStart=0;
    if(index>=1){	
        for (var i = 0; i < z; i++) {
            var x = t.rows[i].childNodes;
			if (x.length == mainGrid._cCount) {
				isrowSpan=false;
				if(x[0]["rowSpan"]>1){
				   rowSpanNum	= x[0]["rowSpan"];
				   borderLeftColorStr=x[0].style["borderLeftColor"];
				   isrowSpan=true;
				   rowSpanRowStart=i;
				}
			}
			if(isrowSpan&&i<=rowSpanRowStart+rowSpanNum-1)
			{
			  // 行合并 
			  if (x.length != this._cCount) {
                for (var j = 0; j < x.length; j++)
                {
					if (x[j]["_cellIndex"] == index) {
						if(state=="none"){
						   x[j].style["borderLeftColor"]=borderLeftColorStr;
						}
						else
						{
							if(x[j]&&x[j].style["borderLeftColor"]!='')
								x[j].style["borderLeftColor"]='';
						}
						break;
					}else
					{
						if(x[j]["colSpan"]>1)
						{ 
					        // 列合并的设置合并单元格的第一个的左边框
							if(index>x[j]["_cellIndex"]&&index<=x[j]["_cellIndex"]+x[j]["colSpan"]-1){
								if(state=="none"){
								   x[j].style["borderLeftColor"]=borderLeftColorStr;
								}
								else
								{
									if(x[j]&&x[j].style["borderLeftColor"]!='')
										x[j].style["borderLeftColor"]='';
								}
								break;
							}
						}
					}
				}	
			  }else
			  {				  
				if(state=="none"){
					x[index].style["borderLeftColor"]=borderLeftColorStr;
				}
				else
				{
					if(x[index]&&x[index].style["borderLeftColor"]!='')
						x[index].style["borderLeftColor"]='';
				}
			  }
			}
			else{
			   if(index < x.length)
				{
					if(x[0]){
						if(x[0].style){
							if(state=="none"){
								x[index].style["borderLeftColor"]=x[0].style["borderLeftColor"];
							}
							else
							{
								if(x[index]&&x[index].style["borderLeftColor"]!='')
									x[index].style["borderLeftColor"]='';
							}
						}
					}
				}
			}
		}
	}
}

// 设置复杂表头隐藏列之后的左边框
function setHeaderLeftBoder(mainGrid,index,state)
{
	var t = mainGrid.hdr.childNodes;
	if(t&&t.length==1){
		var r=t[0].childNodes;
		var z =r.length;
		var rowSpanNum=1;
		var borderLeftColorStr;
		var isrowSpan=false;
		var rowSpanRowStart=0;
		if(index>=1){	
			for (var i = 0; i < z; i++) {
				var x = r[i].childNodes;	
				for (var j = 0; j < x.length; j++)
				{	
				  if(x[j].tagName == "TD"){		
						isrowSpan=false;
						if(x[0]["rowSpan"]>1){
							rowSpanNum	= x[0]["rowSpan"];
							borderLeftColorStr=x[0].style["borderLeftColor"];
							isrowSpan=true;
							rowSpanRowStart=i;
						}
						if(isrowSpan&&i<=rowSpanRowStart+rowSpanNum-1)
						{
							if (x[j]["_cellIndex"] == index) {
									if(state=="none"){
										 x[j].style["borderLeftColor"]=borderLeftColorStr;
										 break;
									}
									else
									{
										if(x[j]&&x[j].style["borderLeftColor"]!='')
										{
											x[j].style["borderLeftColor"]='';
											break;
										}
									}	 
								}else
								{
									if(x[j]["colSpan"]>1)
									{ 
										// 列合并的设置合并单元格的第一个的左边框
										if(index>x[j]["_cellIndex"]&&index<=x[j]["_cellIndex"]+x[j]["colSpan"]-1){
											if(state=="none"){
											   x[j].style["borderLeftColor"]=borderLeftColorStr;
											   break;
											}
											else
											{
												if(x[j]&&x[j].style["borderLeftColor"]!='')
												{
													x[j].style["borderLeftColor"]='';
													break;
												}
											}
										}
									}
								}	
						}else
						  {	
						   if (x[j]["_cellIndex"] == index) {				  
								if(state=="none"){
									if(index<x.length){
										if(borderLeftColorStr){
											  x[j].style["borderLeftColor"]=borderLeftColorStr;
										}
										else
										{
											 x[j].style["borderLeftColor"]=x[0].style["borderLeftColor"];
										}
									  break;
									}
								}
								else
								{
									if(x[j]&&x[j].style["borderLeftColor"]!=''){
										if(x[j]["colSpan"]>1)
										{ 
										  continue;
										}
										x[j].style["borderLeftColor"]='';
										break;
									}
								}
						   }
						
						}
					}
					
				}
			}
		}
    }
}