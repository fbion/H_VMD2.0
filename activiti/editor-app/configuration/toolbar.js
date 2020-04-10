/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */
'use strict';
// 2018.01.05:工具条的命令
var KISBPM = KISBPM || {};
KISBPM.TOOLBAR_CONFIG = {
    "items" : [
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.SAVE",
            "cssClass" : "editor-icon editor-icon-save",
            "action" : "KISBPM.TOOLBAR.ACTIONS.saveModel"
        },
        {
            "type" : "separator",
            "title" : "",
            "cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.CUT",
            "cssClass" : "editor-icon editor-icon-cut",
            "action" : "KISBPM.TOOLBAR.ACTIONS.cut",
            "enabled" : false,
            "enabledAction" : "element"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.COPY",
            "cssClass" : "editor-icon editor-icon-copy",
            "action" : "KISBPM.TOOLBAR.ACTIONS.copy",
            "enabled" : false,
            "enabledAction" : "element"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.PASTE",
            "cssClass" : "editor-icon editor-icon-paste",
            "action" : "KISBPM.TOOLBAR.ACTIONS.paste",
            "enabled" : false
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.DELETE",
            "cssClass" : "editor-icon editor-icon-delete",
            "action" : "KISBPM.TOOLBAR.ACTIONS.deleteItem",
            "enabled" : false,
            "enabledAction" : "element"
        },
        {
            "type" : "separator",
            "title" : "TOOLBAR.ACTION.SAVE",
            "cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.REDO",
            "cssClass" : "editor-icon editor-icon-redo",
            "action" : "KISBPM.TOOLBAR.ACTIONS.redo",
            "enabled" : false
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.UNDO",
            "cssClass" : "editor-icon editor-icon-undo",
            "action" : "KISBPM.TOOLBAR.ACTIONS.undo",
            "enabled" : false
        },
        {
            "type" : "separator",
            "title" : "TOOLBAR.ACTION.SAVE",
            "cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ALIGNVERTICAL",
            "cssClass" : "editor-icon editor-icon-align-vertical",
            "action" : "KISBPM.TOOLBAR.ACTIONS.alignVertical",
            "enabled" : false,
            "enabledAction" : "element",
            "minSelectionCount" : 2
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ALIGNHORIZONTAL",
            "cssClass" : "editor-icon editor-icon-align-horizontal",
            "action" : "KISBPM.TOOLBAR.ACTIONS.alignHorizontal",
            "enabledAction" : "element",
            "enabled" : false,
            "minSelectionCount" : 2
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.SAMESIZE",
            "cssClass" : "editor-icon editor-icon-same-size",
            "action" : "KISBPM.TOOLBAR.ACTIONS.sameSize",
            "enabledAction" : "element",
            "enabled" : false,
            "minSelectionCount" : 2
        },
        {
        	"type" : "separator",
        	"title" : "TOOLBAR.ACTION.SAVE",
        	"cssClass" : "toolbar-separator"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMIN",
            "cssClass" : "editor-icon editor-icon-zoom-in",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomIn"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMOUT",
            "cssClass" : "editor-icon editor-icon-zoom-out",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomOut"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMACTUAL",
            "cssClass" : "editor-icon editor-icon-zoom-actual",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomActual"
        },
        {
            "type" : "button",
            "title" : "TOOLBAR.ACTION.ZOOMFIT",
            "cssClass" : "editor-icon editor-icon-zoom-fit",
            "action" : "KISBPM.TOOLBAR.ACTIONS.zoomFit"
        },
        {
            "type" : "separator",
            "title" : "TOOLBAR.ACTION.SAVE",
            "cssClass" : "toolbar-separator"
        },
    	{
            "type" : "button",
            "title" : "TOOLBAR.ACTION.BENDPOINT.ADD",
            "cssClass" : "editor-icon editor-icon-bendpoint-add",
            "action" : "KISBPM.TOOLBAR.ACTIONS.addBendPoint",
            "id" : "add-bendpoint-button"
    	},
    	{
    	    "type" : "button",
    	    "title" : "TOOLBAR.ACTION.BENDPOINT.REMOVE",
    	    "cssClass" : "editor-icon editor-icon-bendpoint-remove",
    	    "action" : "KISBPM.TOOLBAR.ACTIONS.removeBendPoint",
    	    "id" : "remove-bendpoint-button"
    	}
    ],
    
    "secondaryItems" : [
		{
		    "type" : "button",
		    "title" : "Close",
		    "cssClass" : "editor-icon editor-icon-close",
		    "action" : "KISBPM.TOOLBAR.ACTIONS.closeEditor"
		}
    ]
};
// 2018.01.05:工具条的命令（扩展）
KISBPM.TOOLBAR_CONFIG_HW = {
    "items": [
        {
            "type": "button",
            "icon": "iconfont icon-baocun",
            "title": "TOOLBAR.ACTION.SAVE",
            "cssClass": "editor-icon editor-icon-save",
            "action": "KISBPM.TOOLBAR.ACTIONS.saveModel"
        },
        {
            "type": "separator",
            "icon": "",
            "title": "",
            "cssClass": "toolbar-separator"
        },
        {
            "type": "button",
            "icon": "iconfont icon-jianqie1",
            "title": "TOOLBAR.ACTION.CUT",
            "cssClass": "editor-icon editor-icon-cut",
            "action": "KISBPM.TOOLBAR.ACTIONS.cut",
            "enabled": false,
            "enabledAction": "element"
        },
        {
            "type": "button",
            "icon": "iconfont icon-fuzhi",
            "title": "TOOLBAR.ACTION.COPY",
            "cssClass": "editor-icon editor-icon-copy",
            "action": "KISBPM.TOOLBAR.ACTIONS.copy",
            "enabled": false,
            "enabledAction": "element"
        },
        {
            "type": "button",
            "icon": "iconfont icon-niantie",
            "title": "TOOLBAR.ACTION.PASTE",
            "cssClass": "editor-icon editor-icon-paste",
            "action": "KISBPM.TOOLBAR.ACTIONS.paste",
            "enabled": false
        },
        {
            "type": "button",
            "icon": "iconfont icon-shanchushuzimianbanbianjitai2",
            "title": "TOOLBAR.ACTION.DELETE",
            "cssClass": "editor-icon editor-icon-delete",
            "action": "KISBPM.TOOLBAR.ACTIONS.deleteItem",
            "enabled": false,
            "enabledAction": "element"
        },
        {
            "type": "separator",
            "icon": "TOOLBAR.ACTION.SAVE",
            "title": "TOOLBAR.ACTION.SAVE",
            "cssClass": "toolbar-separator"
        },
        {
            "type": "button",
            "icon": "iconfont icon-youxuanzhuan",
            "title": "TOOLBAR.ACTION.REDO",
            "cssClass": "editor-icon editor-icon-redo",
            "action": "KISBPM.TOOLBAR.ACTIONS.redo",
            "enabled": false
        },
        {
            "type": "button",
            "icon": "iconfont icon-zuoxuanzhuan",
            "title": "TOOLBAR.ACTION.UNDO",
            "cssClass": "editor-icon editor-icon-undo",
            "action": "KISBPM.TOOLBAR.ACTIONS.undo",
            "enabled": false
        },
        {
            "type": "separator",
            "icon": "TOOLBAR.ACTION.SAVE",
            "title": "TOOLBAR.ACTION.SAVE",
            "cssClass": "toolbar-separator"
        },
        {
            "type": "button",
            "icon": "iconfont icon-chuizhijuzhongduiqi1",
            "title": "TOOLBAR.ACTION.ALIGNVERTICAL",
            "cssClass": "editor-icon editor-icon-align-vertical",
            "action": "KISBPM.TOOLBAR.ACTIONS.alignVertical",
            "enabled": false,
            "enabledAction": "element",
            "minSelectionCount": 2
        },
        {
            "type": "button",
            "icon": "iconfont icon-shuipingjuzhongduiqi1",
            "title": "TOOLBAR.ACTION.ALIGNHORIZONTAL",
            "cssClass": "editor-icon editor-icon-align-horizontal",
            "action": "KISBPM.TOOLBAR.ACTIONS.alignHorizontal",
            "enabledAction": "element",
            "enabled": false,
            "minSelectionCount": 2
        },
        {
            "type": "button",
            "icon": "iconfont icon-xiangtongdaxiao1",
            "title": "TOOLBAR.ACTION.SAMESIZE",
            "cssClass": "editor-icon editor-icon-same-size",
            "action": "KISBPM.TOOLBAR.ACTIONS.sameSize",
            "enabledAction": "element",
            "enabled": false,
            "minSelectionCount": 2
        },
        {
            "type": "separator",
            "icon": "TOOLBAR.ACTION.SAVE",
            "title": "TOOLBAR.ACTION.SAVE",
            "cssClass": "toolbar-separator"
        },
        {
            "type": "button",
            "icon": "iconfont icon-fangda1",
            "title": "TOOLBAR.ACTION.ZOOMIN",
            "cssClass": "editor-icon editor-icon-zoom-in",
            "action": "KISBPM.TOOLBAR.ACTIONS.zoomIn"
        },
        {
            "type": "button",
            "icon": "iconfont icon-suoxiao1",
            "title": "TOOLBAR.ACTION.ZOOMOUT",
            "cssClass": "editor-icon editor-icon-zoom-out",
            "action": "KISBPM.TOOLBAR.ACTIONS.zoomOut"
        },
        {
            "type": "button",
            "icon": "iconfont icon-guangbiaozhuashou",
            "title": "TOOLBAR.ACTION.WANDER",
            "cssClass": "editor-icon editor-icon-zoom-out",
            "action": "KISBPM.TOOLBAR.ACTIONS.mouseWander",
            "id": "mouse-wander-button"
        },
        {
            "type": "button",
            "icon": "iconfont icon-guangbiao",
            "title": "TOOLBAR.ACTION.NORMAL",
            "cssClass": "editor-icon editor-icon-zoom-out",
            "action": "KISBPM.TOOLBAR.ACTIONS.mouseNormal",
    	    "id": "mouse-normal-button"
        },
        {
            "type": "button",
            "icon": "iconfont icon-shijidaxiao",
            "title": "TOOLBAR.ACTION.ZOOMACTUAL",
            "cssClass": "editor-icon editor-icon-zoom-actual",
            "action": "KISBPM.TOOLBAR.ACTIONS.zoomActual"
        },
        {
            "type": "button",
            "icon": "iconfont icon-quanping1",
            "title": "TOOLBAR.ACTION.ZOOMFIT",
            "cssClass": "editor-icon editor-icon-zoom-fit",
            "action": "KISBPM.TOOLBAR.ACTIONS.zoomFit"
        },
        {
            "type": "separator",
            "icon": "TOOLBAR.ACTION.SAVE",
            "title": "TOOLBAR.ACTION.SAVE",
            "cssClass": "toolbar-separator"
        },
    	{
    	    "type": "button",
    	    "icon": "iconfont icon-zengjiashunxuliuzhuanzhedian",
    	    "title": "TOOLBAR.ACTION.BENDPOINT.ADD",
    	    "cssClass": "editor-icon editor-icon-bendpoint-add",
    	    "action": "KISBPM.TOOLBAR.ACTIONS.addBendPoint",
    	    "id": "add-bendpoint-button"
    	},
    	{
    	    "type": "button",
    	    "icon": "iconfont icon-jianshaoshunxuliuzhuanzhedian",
    	    "title": "TOOLBAR.ACTION.BENDPOINT.REMOVE",
    	    "cssClass": "editor-icon editor-icon-bendpoint-remove",
    	    "action": "KISBPM.TOOLBAR.ACTIONS.removeBendPoint",
    	    "id": "remove-bendpoint-button"
    	},
        {
            "type": "separator",
            "icon": "",
            "title": "",
            "cssClass": "toolbar-separator"
        },
    	{
    	    "type": "button",
    	    "icon": "iconfont icon-iconfont-edu06",
    	    "title": "TOOLBAR.ACTION.NODELIST",
    	    "cssClass": "editor-icon editor-icon-save",
    	    "action": "",
    	    "id": "nodelist-button"
    	},
    	{
    	    "type": "button",
    	    "icon": "iconfont icon-shuxing",
    	    "title": "TOOLBAR.ACTION.PROPERTIES",
    	    "cssClass": "editor-icon editor-icon-save",
    	    "action": "",
    	    "id": "properties-button"
    	}
    ],

    "secondaryItems": [
		{
		    "type": "button",
		    //"icon": "Close111",
		    "icon": "iconfont icon-shuxing",
		    //"title": "Close",
		    //"cssClass": "editor-icon editor-icon-close",
		    //"action": "KISBPM.TOOLBAR.ACTIONS.closeEditor"
		}
    ]
};