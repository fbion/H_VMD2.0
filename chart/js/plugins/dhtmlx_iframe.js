/**
 * Created by Administrator on 2015-7-22.
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

var bootPath = CreateJSPath("dhtmlx_iframe.js",-2);
window.dhtmlx_iframe = true;
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

