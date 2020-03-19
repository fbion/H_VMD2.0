/*
 filename：dhtmlxgrid_excell_dhxcalendar_ext_tb.js
 creater：
 date created：2016.11.19
 description：
 date modified：2017.09.07
 modifier：刘志伟
 version：2.2.10.0907
 others：
 copyright：Copyright @1999-2016, hwkj, All Rights Reserved
 */
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-27
 * Time: 下午4:13
 * To change this template use File | Settings | File Templates.
 */
function CreateJSPath(str,dis){
    var scripts = document.getElementsByTagName("script");
    var path = "";
    if(str && str.indexOf("js") != -1){
        for (var i = 0, l = scripts.length; i < l; i++) {
            var src = scripts[i].src;
            if (src.indexOf(str) != -1) {
                path = src.split(str)[0];
                break;
            }
        }
    }

    var href = location.href;
    href = href.split("#")[0].split("?")[0].split("/");

    var isAbsolutePath = true;
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        isAbsolutePath = false;
        href.length = href.length - 1;
        path = path.split("/");
        path = href.concat(path);
    }
    if(isAbsolutePath){
        path = path.split("/");
    }
    path.length = path.length - 1 + (dis || 0);
    path = path.join("/");
    return path;
}

var bootPath = CreateJSPath("hwApiEX.js",-1);

document.write("<script src=\"" + bootPath + "/js/hwstock.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/hwcharts-more.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/hwcharts-plugin.src.js\"></script>");

document.write("<script src=\"" + bootPath + "/js/hwAPI.js\"></script>");

document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"" + bootPath + "/libs/dhtmlx/dhtmlx_pro_full/dhtmlx.css\"/>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxCommon/codebase/dhtmlxcommon.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxCommon/codebase/dhtmlxcore.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxCommon/codebase/dhtmlxcontainer.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxMessage/codebase/dhtmlxmessage.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxWindows/codebase/dhtmlxwindows.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxWindows/codebase/ext/dhtmlxwindows_dnd.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxCalendar/codebase/dhtmlxcalendar.js\"></script>");

document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxForm/codebase/dhtmlxform.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxForm/codebase/ext/dhtmlxform_item_container.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxForm/codebase/ext/dhtmlxform_item_combo.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxForm/codebase/ext/dhtmlxform_item_colorpicker.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxForm/codebase/dhtmlxform_ext.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxColorPicker/codebase/dhtmlxcolorpicker.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxToolbar/codebase/dhtmlxtoolbar.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxCombo/codebase/dhtmlxcombo.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/dhtmlxgrid_ext.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_rowspan.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_splt.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_selection.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_mcol.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_undo.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/excells/dhtmlxgrid_excell_hwch.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_nxml.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_filter.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/ext/dhtmlxgrid_srnd.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/excells/dhtmlxgrid_excell_link.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxPopup/codebase/dhtmlxpopup.js\"></script>");
//document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxGrid/codebase/excells/dhtmlxmenu.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxMenu/codebase/dhtmlxmenu.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxMenu/codebase/ext/dhtmlxmenu_ext.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxLayout/codebase/dhtmlxlayout.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxDataStore/codebase/datastore_ext.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxCommon/codebase/dhtmlxdataprocessor.js\"></script>");
document.write("<script src=\"" +  bootPath + "/libs/dhtmlx/dhtmlxUploader/dhtmlXFileUploader.js\"></script>");

document.write("<script src=\"" + bootPath + "/js/modules/exporting.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/modules/exporting-plug.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/data-review.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/data_extract.src.js\"></script>");

//    document.write("<script src=\"" + bootPath + "/js/plugins/drag-legend.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/export-csv.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/property-interact.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/realign-datalabel.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/series-add-delete.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/template-export.src.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/plugins/draggable-series.js\"></script>");

document.write("<script src=\"" + bootPath + "/js/load/html2canvas.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/load/bluebird.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/load/canvg.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/load/swfobject.js\"></script>");
document.write("<script src=\"" + bootPath + "/js/load/downloadify.js\"></script>");