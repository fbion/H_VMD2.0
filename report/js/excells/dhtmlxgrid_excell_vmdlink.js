/*
Product Name: dhtmlxSuite 
Version: 5.0.8 
Edition: Professional 
License: content of this file is covered by DHTMLX Commercial or Enterprise license. Usage without proper license is prohibited. To obtain it contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/


/*
HTML Link eXcell v.1.0  for dhtmlxGrid 
(c)DHTMLX LTD. 2005


The corresponding  cell value in XML should be a "^" delimited list of following values:
1st - Link Text 
2nd - URL (optional)
3rd - target (optional, default is _blank)

Samples:
<cell>Stephen King</cell>
<cell>Stephen King^http://www.stephenking.com/</cell>
<cell>Stephen King^http://www.stephenking.com/^_self</cell>
*/

/**
*	@desc: link editor
*	@returns: dhtmlxGrid cell editor object
*	@type: public
*/

function eXcell_vmdlink(cell) {
	this.cell = cell;
    this.grid = this.cell.parentNode.grid;
    this.isDisabled=function(){return true;}
	this.edit = function(){}
	this.getValue = function(){
		if(this.cell.firstChild.getAttribute){
		    var target = this.cell.firstChild.getAttribute("target");
		    return this.cell.firstChild.innerHTML;
			//return this.cell.firstChild.innerHTML+"^"+this.cell.firstChild.getAttribute("href")+(target?("^"+target):"");
		}

		else
			return "";
	}
	this.setValue = function (val) {
	    var that = this;
		if((typeof(val)!="number") && (!val || val.toString()._dhx_trim()=="")){		
			this.setCValue("&nbsp;",valsAr);			
			return (this.cell._clearCell=true);
		}
		var valsAr = val.split("^");
		if(valsAr.length==1)
			valsAr[1] = "";
		else{
		    if (valsAr.length > 1) {
				valsAr[1] = "href='"+valsAr[1]+"'";
				if(valsAr.length==3)
					valsAr[1]+= " target='"+valsAr[2]+"'";
				else
					valsAr[1]+= " target='_blank'";
			}
		}

		this.setCValue("<a  href='javascript:void(0)'" + valsAr[1] + " onclick='(_isIE?event:arguments[0]).cancelBubble = true;this.parentNode.parentNode.grid.hyperlinkClick(this)'>" + valsAr[0] + "</a>", valsAr[0]);
	}
}

eXcell_vmdlink.prototype = new eXcell;

eXcell_vmdlink.prototype.getTitle = function () {
    var z = this.cell.firstChild;
    return (_isIE ? z.innerText : z.textContent);
	//return ((z&&z.tagName)?z.getAttribute("href"):"");
}

eXcell_vmdlink.prototype.getContent = function () {
	var z=this.cell.firstChild;
	return ((z&&z.tagName)?z.innerHTML:"");
}

dhtmlXGridObject.prototype.hyperlinkClick = function (el) {
    var cellObj = this.cells4(el.parentNode);
    var _attrs = cellObj.cell._attrs;
    var originCell = this.hwReport.getOriginCellById(_attrs.sid);
    var cellType = this.hwReport.cellTypes.get(originCell.fillcelltype);
    var url = (cellType && cellType.url && dhx.trim(cellType.url.replace("?", ""))) || "";
    var urlParams = url ? url.split("&").filter(function (item) {return !!item }).map(function (item) { return item.split("=").map(function (a) { return dhx.trim(a) }) }) : [];
    for (var i = 0; i < urlParams.length; i++) {
        //if (/^\{[\w\W]+\}$/g.test(urlParams[i][1]) || /\{@value\}/g.test(urlParams[i][1]) || this.hwReport.checkParamType(urlParams[i][1]) != "string") {
        urlParams[i][1] = this.hwReport.getValue(urlParams[i][1], cellObj);
        //}
    }
    this.editor = cellObj;
    this.cell = cellObj.cell;
    this.row = cellObj.cell.parentNode;
    var LeftLinkClickName = "onLeftLinkClick";
    this.hwReport.callEvent("onLeftLinkClick", [this, cellObj, urlParams.map(function (item) { return item.join("=") }).join("&")]);
    if (this.LeftLinkClickName) {
        LeftLinkClickName = this.LeftLinkClickName;
    }
    if (Ext.isFunction(window[LeftLinkClickName])) {
        window[LeftLinkClickName](urlParams.map(function (item) { return item.join("=") }).join("&"), this, cellObj);
    }
    if (Ext.isFunction(window[this.hwReport.reportId + "_LeftLinkClick"])) {
        window[this.hwReport.reportId + "_LeftLinkClick"](urlParams.map(function (item) { return item.join("=") }).join("&"), this, cellObj);
    }
    this.editor = null;
}
//(c)dhtmlx ltd. www.dhtmlx.com

