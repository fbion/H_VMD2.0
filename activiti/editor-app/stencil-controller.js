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

var appActivitiModeler = angular.module('activitiModeler');
appActivitiModeler.controller('StencilController', ['$rootScope', '$scope', '$http', '$modal', '$timeout', function ($rootScope, $scope, $http, $modal, $timeout) {

    // Property window toggle state
    $scope.propertyWindowState = { 'collapsed': false };

    $scope.propertyToggleFlag = true;
    $scope.paletteToggleFlag = true;

    $scope.modelInfo = '没有配置模块信息';
    // 2017.11.16：用于屏蔽modeShow == 2模式下双击除起始节点和任务节点之外的节点向外发送消息
    $scope.ifVisualDblClickSendMessage = false;

    $scope.dhxTabbarProperties = null;

    $scope.propertyToggle = function () {
        $scope.propertyToggleFlag = !$scope.propertyToggleFlag;
        //$scope.dhxTabbarProperties.tabs("tabIdSj").setActive();
        // 2017.12.28:控制属性面板Tab页的显示隐藏

        // 2017.12.29:等待属性面板显示完成，用于处理属性面板初始显示是会显示左右箭头的问题；
        // 因为js是单线程的，所以不用设置Timeout的延时，他会等待前一个操作完成后再执行
        var scope = $scope
        $timeout(function () {

            //debugger
            //if ($rootScope.modeShow == 0) {
            //    $scope.showPropertiesTabs();
            //}
            scope.dhxTabbarProperties.setSizes();
        });
        
    };
    $scope.paletteToggle = function () {
        var divEditorHeader = document.getElementById("editor-header");
        var divPaletteHelpWrapper = document.getElementById("paletteHelpWrapper");
        if (divEditorHeader && divPaletteHelpWrapper) {
            divPaletteHelpWrapper.style.top = divEditorHeader.offsetTop + divEditorHeader.offsetHeight + 10 + 'px';
        }

        $scope.paletteToggleFlag = !$scope.paletteToggleFlag;
    };
    //$scope.propertyClose = function () {
    //    $scope.propertyToggleFlag = true;
    //    //$scope.propertyToggleFlag = !$scope.propertyToggleFlag;
    //};

    // Tabbar点击事件，可以获取scope信息
    $scope.tabCick = function (id, lastId) {
    };

    $scope.ifHasProperties = function () {
        return true;
    };

    $scope.treeNodeSearch = function () {
        //alert($scope.nodeName);
    };

    $scope.tmpCnt = 0;
    $scope.onSearchTextChanged = function () {

        var strNodeName = $scope.nodeName;
        var bFlag = true;
        if (strNodeName) {
            bFlag = true;
            if (strNodeName.length > 0) {
                bFlag = true;
            }
            else {
                bFlag = false;
            }
        }
        else {
            bFlag = false;
        }
        for (var i = 0; i < $scope.stencilItemGroups.length; i++) {
            $scope.stencilItemGroups[i].expanded = bFlag;
        }
    };

    $scope.checkMouseNearPaletteBorder = function () {

        var divPaletteHelpWrapper = document.getElementById("paletteHelpWrapper");
        var nMousePosX = event.clientX; //鼠标当前位置的x坐标
        //var nMousePosY = event.clientY; //鼠标当前位置的y坐标
        divPaletteHelpWrapper.contains(event.srcElement)
        {
            //var x2 = x1 - divPaletteHelpWrapper.offsetLeft; //相对div左边界位置
            var nOffRight = divPaletteHelpWrapper.offsetLeft + divPaletteHelpWrapper.offsetWidth - nMousePosX;//相对div右边界位置
            //var y2 = x1 - divPaletteHelpWrapper.offsetTop; //相对div上边界位置
            //var y3 = divPaletteHelpWrapper.offsetTop + divPaletteHelpWrapper.height - y1;//相对div下边界位置
            if (Math.abs(nOffRight) < 10) {
                divPaletteHelpWrapper.style.cursor = 'e-resize';
                //alert('aaaaaaaaaaa');

                //return;
            }
            else {
                divPaletteHelpWrapper.style.cursor = 'default';
            }
        }

        //var divCanvasHelpWrapper = document.getElementById("canvasHelpWrapper");
        //divCanvasHelpWrapper.contains(event.srcElement)
        //{
        //    var nOffRight = divCanvasHelpWrapper.offsetLeft + divCanvasHelpWrapper.offsetWidth - nMousePosX;//相对div右边界位置
        //    if (nOffRight < 10) {
        //        divCanvasHelpWrapper.style.cursor = 'e-resize';
        //        //alert('aaaaaaaaaaa');

        //        //return;
        //    }
        //    else {
        //        divCanvasHelpWrapper.style.cursor = 'default';
        //    }
        //}
    };

    $scope.mouseMoveHandle = function () {

        //var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
        ////var nMousePosX = event.clientX; //鼠标当前位置的x坐标
        //var nOffLeft = divPropertiesHelpWrapper.offsetLeft - event.clientX;//相对div右边界位置
        //if (Math.abs(nOffLeft) < 10) {
        //    divPropertiesHelpWrapper.style.cursor = 'e-resize';
        //    return;
        //}
        //else {
        //    divPropertiesHelpWrapper.style.cursor = 'default';
        //}
        //if (!bPropertiesHelpWrapperDocked) {
        //    var nOffRight = divPropertiesHelpWrapper.offsetLeft + divPropertiesHelpWrapper.offsetWidth - event.clientX;//相对div右边界位置
        //    if (Math.abs(nOffRight) < 10) {
        //        divPropertiesHelpWrapper.style.cursor = 'e-resize';
        //    }
        //    else {
        //        divPropertiesHelpWrapper.style.cursor = 'default';
        //    }
        //}
    };

    $scope.checkMouseNearPropertiesBorder = function () {

        var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
        //var nMousePosX = event.clientX; //鼠标当前位置的x坐标
        var nOffLeft = divPropertiesHelpWrapper.offsetLeft - event.clientX;//相对div右边界位置
        if (Math.abs(nOffLeft) < 10) {
            divPropertiesHelpWrapper.style.cursor = 'e-resize';
            return;
        }
        else {
            divPropertiesHelpWrapper.style.cursor = 'default';
        }
        if (!bPropertiesHelpWrapperDocked) {
            var nOffRight = divPropertiesHelpWrapper.offsetLeft + divPropertiesHelpWrapper.offsetWidth - event.clientX;//相对div右边界位置
            if (Math.abs(nOffRight) < 10) {
                divPropertiesHelpWrapper.style.cursor = 'e-resize';
            }
            else {
                divPropertiesHelpWrapper.style.cursor = 'default';
            }
        }
    };

    $scope.getConvertTitle = function (strTitle) {
        var strResult = strTitle.toString();
        if (null == strResult || strResult.length <= 0)
            return strResult;
        if (strResult.length > 6) {
            strResult = strResult.substring(0, 5) + ' \n ' + strResult.substring(5, strResult.length);
        }
        return strResult;
    };
    // Add reference to global header-config
    $scope.headerConfig = KISBPM.HEADER_CONFIG;
    // sgw2017.07.22屏蔽点击属性面板标题时绘图区域下边界变化
    $scope.propertyWindowState.toggle = function () {
        $scope.propertyWindowState.collapsed = !$scope.propertyWindowState.collapsed;
        $timeout(function () {
            jQuery(window).trigger('resize');
        });
    };

    // Code that is dependent on an initialised Editor is wrapped in a promise for the editor
    $scope.editorFactory.promise.then(function () {

        /* Build stencil item list */

        // Build simple json representation of stencil set
        var stencilItemGroups = [];

        // Helper method: find a group in an array
        var findGroup = function (name, groupArray) {
            for (var index = 0; index < groupArray.length; index++) {
                if (groupArray[index].name === name) {
                    return groupArray[index];
                }
            }
            return null;
        };

        // Helper method: add a new group to an array of groups
        var addGroup = function (groupName, groupArray) {
            var group = { name: groupName, items: [], paletteItems: [], groups: [], visible: true };
            groupArray.push(group);
            return group;
        };

        /*
         StencilSet items2017.11.16从服务器获取流程信息
         */
        $http({ method: 'GET', url: KISBPM.URL.getStencilSet(), headers: { 'token': $rootScope.strOAuthId, 'einfo': $rootScope.streinfo, 'info': $rootScope.strinfo } }).success(function (data, status, headers, config) {

            //$http({ method: 'GET', url: KISBPM.URL.getStencilSet(), headers: { 'token': '{f0784bf4-1b44-4266-991f-bc7996946364}' } }).success(function (data, status, headers, config) {
            var quickMenuDefinition = ['UserTask', 'EndNoneEvent', 'ExclusiveGateway',
                                       'CatchTimerEvent', 'ThrowNoneEvent', 'TextAnnotation',
                                       'SequenceFlow', 'Association'];
            var ignoreForPaletteDefinition = ['SequenceFlow', 'MessageFlow', 'Association', 'DataAssociation', 'DataStore', 'SendTask'];
            var quickMenuItems = [];

            var morphRoles = [];
            for (var i = 0; i < data.rules.morphingRules.length; i++) {
                var role = data.rules.morphingRules[i].role;
                var roleItem = { 'role': role, 'morphOptions': [] };
                morphRoles.push(roleItem);
            }

            // Check all received items
            for (var stencilIndex = 0; stencilIndex < data.stencils.length; stencilIndex++) {
                // Check if the root group is the 'diagram' group. If so, this item should not be shown.
                var currentGroupName = data.stencils[stencilIndex].groups[0];
                if (currentGroupName === 'Diagram' || currentGroupName === 'Form') {
                    continue;  // go to next item
                }

                var removed = false;
                if (data.stencils[stencilIndex].removed) {
                    removed = true;
                }

                var currentGroup = undefined;
                if (!removed) {
                    // Check if this group already exists. If not, we create a new one

                    if (currentGroupName !== null && currentGroupName !== undefined && currentGroupName.length > 0) {

                        currentGroup = findGroup(currentGroupName, stencilItemGroups); // Find group in root groups array
                        if (currentGroup === null) {
                            currentGroup = addGroup(currentGroupName, stencilItemGroups);
                        }

                        // Add all child groups (if any)
                        for (var groupIndex = 1; groupIndex < data.stencils[stencilIndex].groups.length; groupIndex++) {
                            var childGroupName = data.stencils[stencilIndex].groups[groupIndex];
                            var childGroup = findGroup(childGroupName, currentGroup.groups);
                            if (childGroup === null) {
                                childGroup = addGroup(childGroupName, currentGroup.groups);
                            }

                            // The current group variable holds the parent of the next group (if any),
                            // and is basically the last element in the array of groups defined in the stencil item
                            currentGroup = childGroup;

                        }

                    }
                }

                // Construct the stencil item
                var stencilItem = {
                    'id': data.stencils[stencilIndex].id,
                    'name': data.stencils[stencilIndex].title,
                    'description': data.stencils[stencilIndex].description,
                    'icon': data.stencils[stencilIndex].icon,
                    'vectoricon': data.stencils[stencilIndex].icon,
                    'type': data.stencils[stencilIndex].type,
                    'roles': data.stencils[stencilIndex].roles,
                    'removed': removed,
                    'customIcon': false,
                    'canConnect': false,
                    'canConnectTo': false,
                    'canConnectAssociation': false
                };

                if (data.stencils[stencilIndex].customIconId && data.stencils[stencilIndex].customIconId > 0) {
                    stencilItem.customIcon = true;
                    stencilItem.icon = data.stencils[stencilIndex].customIconId;
                }

                if (!removed) {
                    if (quickMenuDefinition.indexOf(stencilItem.id) >= 0) {
                        quickMenuItems[quickMenuDefinition.indexOf(stencilItem.id)] = stencilItem;
                    }
                }

                if (stencilItem.id === 'TextAnnotation' || stencilItem.id === 'BoundaryCompensationEvent') {
                    stencilItem.canConnectAssociation = true;
                }

                for (var i = 0; i < data.stencils[stencilIndex].roles.length; i++) {
                    var stencilRole = data.stencils[stencilIndex].roles[i];
                    if (stencilRole === 'sequence_start') {
                        stencilItem.canConnect = true;
                    } else if (stencilRole === 'sequence_end') {
                        stencilItem.canConnectTo = true;
                    }

                    for (var j = 0; j < morphRoles.length; j++) {
                        if (stencilRole === morphRoles[j].role) {
                            if (!removed) {
                                morphRoles[j].morphOptions.push(stencilItem);
                            }
                            stencilItem.morphRole = morphRoles[j].role;
                            break;
                        }
                    }
                }

                if (currentGroup) {
                    // Add the stencil item to the correct group
                    currentGroup.items.push(stencilItem);
                    if (ignoreForPaletteDefinition.indexOf(stencilItem.id) < 0) {
                        // 设置矢量图标
                        $scope.setVectorIconName(stencilItem);
                        currentGroup.paletteItems.push(stencilItem);
                    }

                } else {
                    // It's a root stencil element
                    if (!removed) {
                        stencilItemGroups.push(stencilItem);
                    }
                }
            }

            for (var i = 0; i < stencilItemGroups.length; i++) {
                if (stencilItemGroups[i].paletteItems && stencilItemGroups[i].paletteItems.length == 0) {
                    stencilItemGroups[i].visible = false;
                }
            }

            // 2017.12.13：删除部分用不到的节点
            $scope.removeListNode(stencilItemGroups);
            // 2017.12.12：左侧节点列表
            $scope.stencilItemGroups = stencilItemGroups;

            var containmentRules = [];
            for (var i = 0; i < data.rules.containmentRules.length; i++) {
                var rule = data.rules.containmentRules[i];
                containmentRules.push(rule);
            }
            $scope.containmentRules = containmentRules;

            // remove quick menu items which are not available anymore due to custom pallette
            var availableQuickMenuItems = [];
            for (var i = 0; i < quickMenuItems.length; i++) {
                if (quickMenuItems[i]) {
                    // 设置矢量图标
                    $scope.setVectorIconName(quickMenuItems[i]);
                    availableQuickMenuItems[availableQuickMenuItems.length] = quickMenuItems[i];
                }
            }

            $scope.quickMenuItems = availableQuickMenuItems;
            $scope.morphRoles = morphRoles;

            // 20190118:将当前方法赋值给父窗体页面方法
            if (parent)
            {
                parent.getVisualSelectedNodesInfo = $scope.getVisualSelectedNodesInfo;
            }

        }).

        error(function (data, status, headers, config) {
            console.log('Something went wrong when fetching stencil items:' + JSON.stringify(data));
        });

        // 删除不显示的
        $scope.removeListNode = function (stencilItemGroups) {
            if (!stencilItemGroups) {
                return;
            }
            for (var i = 0; i < stencilItemGroups.length; i++) {
                for (var j = 0; j < stencilItemGroups[i].paletteItems.length; j++) {
                    var itemId = stencilItemGroups[i].paletteItems[j].id;

                    //---------------节点隐藏------------------
                    // 开始节点
                    if (
                        //   itemId == "StartNoneEvent" // 开始事件
                    itemId == "StartTimerEvent" // 计时器事件
                    || itemId == "StartSignalEvent" // 信号事件
                    || itemId == "StartMessageEvent" // 消息事件
                    || itemId == "StartErrorEvent" // 错误事件

                        // 任务节点
                        //|| itemId == "UserTask" // 用户任务
                        //|| itemId == "ServiceTask" // 服务任务
                        //|| itemId == "ScriptTask" // 脚本任务
                    || itemId == "BusinessRule" // 业务规则任务
                        //|| itemId == "ReceiveTask" // 接收任务
                        //|| itemId == "ManualTask" // 手动任务
                        //|| itemId == "MailTask" // 邮件任务
                    || itemId == "CamelTask" // 驼峰任务
                    || itemId == "MuleTask" // MuleTask
                        //|| itemId == "SendTask" // 发送任务

                        // 结构
                        //|| itemId == "SubProcess" // 子流程
                        //|| itemId == "EventSubProcess" // 子流程事件
                    || itemId == "CallActivity" // 呼叫活动

                        // 网关
                        //|| itemId == "ExclusiveGateway" // 高级分支
                    || itemId == "ParallelGateway" // 并行分支
                        || itemId == "InclusiveGateway" // 包容分支
                    || itemId == "EventGateway" // 事件分支

                        // 边界事件
                    || itemId == "BoundaryErrorEvent" // 边界错误事件
                    || itemId == "BoundaryTimerEvent" // 边界定时器事件
                    || itemId == "BoundarySignalEvent" // 边界信号事件
                    || itemId == "BoundaryMessageEvent" // 边界线消息事件
                    || itemId == "BoundaryCancelEvent" // 边界取消事件
                    || itemId == "BoundaryCompensationEvent" // 边界补偿事件

                        // 中间捕获事件
                        //|| itemId == "CatchTimerEvent" // 中间定时器捕获事件
                    || itemId == "CatchSignalEvent" // 中间信号捕获事件
                    || itemId == "CatchMessageEvent" // 中间消息捕获事件

                        // 中间触发事件
                    || itemId == "ThrowNoneEvent" // 中间空抛出事件
                    || itemId == "ThrowSignalEvent" // 中间信号抛出捕获事件

                        // 结束事件
                        //|| itemId == "EndNoneEvent" // 结束事件
                    || itemId == "EndErrorEvent" // 结束错误事件
                    || itemId == "EndCancelEvent" // 结束后取消事件
                        //|| itemId == "EndTerminateEvent" // 结束终止事件

                        // 泳道
                        || itemId == "Pool" // 流程池
                        || itemId == "Lane" // Lane

                        // 构件
                        //|| itemId == "TextAnnotation"// 文本注释
                        ) {
                        //stencilItemGroups[i].paletteItems.splice(j, 1);
                        //j--;
                        // 标识节点移除
                        stencilItemGroups[i].paletteItems[j].removed = true;
                    }
                        // ------------------节点修改---------------------
                    else if (itemId == "TextAnnotation") {
                        stencilItemGroups[i].paletteItems[j].name = "注释";
                    }
                    else if (itemId == "ExclusiveGateway") // 高级分支                        
                    {
                        stencilItemGroups[i].paletteItems[j].name = "流转";
                    }
                }
            }
        }

        //2017.12.06: 鼠标按下事件响应
        $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_MOUSEDOWN, function (event) {

            // 2017.12.08：节点多选
            //return;
            if ($rootScope.modeShow != 2) {
                return;
            }
            if (!(event.shiftKey || event.ctrlKey)) {
                return;
            }
            // 2017.11.16：用于屏蔽modeShow == 2模式下双击除起始节点和任务节点之外的节点向外发送消息
            if (!$rootScope.editor.ifVisualDblClickSendMessage) {
                return;
            }

            var selectedShape = $scope.selectedShape;
            if (selectedShape == "undefined" && selectedShape == null) {
                return;
            }

            //var selectedShape = shapes.first();
            var stencil = selectedShape.getStencil();
            if ($rootScope.modeShow == 2) {
                if (stencil) {
                    var strNodeType = stencil.idWithoutNs();
                    if (!(strNodeType == "StartNoneEvent" || strNodeType == "StartTimerEvent"
                    || strNodeType == "StartSignalEvent" || strNodeType == "StartMessageEvent"
                    || strNodeType == "StartErrorEvent" || strNodeType == "UserTask"
                    || strNodeType == "ServiceTask" || strNodeType == "ScriptTask"
                    || strNodeType == "BusinessRule" || strNodeType == "ReceiveTask"
                    || strNodeType == "ManualTask" || strNodeType == "MailTask"
                    || strNodeType == "CamelTask" || strNodeType == "MuleTask"
                    || strNodeType == "SendTask" || strNodeType == "BPMNDiagram")) {
                        return;
                    }
                }
            }

            if ($rootScope.selectedElementBeforeScrolling && stencil.id().indexOf('BPMNDiagram') !== -1) {
                // ignore canvas event because of empty selection when scrolling stops
                return;
            }

            if ($rootScope.selectedElementBeforeScrolling
                && $rootScope.selectedElementBeforeScrolling.getId() === selectedShape.getId()) {

                $rootScope.selectedElementBeforeScrolling = null;
                return;
            }

            //$scope.sendMultiNodeInfo(false);
            // 2017.12.08：节点多选
            $rootScope.editor._markSelection();
        });

        //2017.11.15: 双击事件响应
        $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK, function (event) {

            //console.log("EVENT_DBLCLICK");
            if ($rootScope.modeShow != 2) {

                return;
            }
            // 2017.11.16：用于屏蔽modeShow == 2模式下双击除起始节点和任务节点之外的节点向外发送消息
            if (!$rootScope.editor.ifVisualDblClickSendMessage) {
                return;
            }

            var selectedShape = $scope.selectedShape;
            if (selectedShape == "undefined" && selectedShape == null) {
                return;
            }

            //var selectedShape = shapes.first();
            var stencil = selectedShape.getStencil();
            if ($rootScope.modeShow == 2) {
                if (stencil) {
                    var strNodeType = stencil.idWithoutNs();
                    if (!(strNodeType == "StartNoneEvent"
                       || strNodeType == "StartTimerEvent"
                       || strNodeType == "StartSignalEvent"
                       || strNodeType == "StartMessageEvent"
                       || strNodeType == "StartErrorEvent"
                       || strNodeType == "UserTask"
                    || strNodeType == "ServiceTask"
                    || strNodeType == "ScriptTask"
                    || strNodeType == "BusinessRule"
                    || strNodeType == "ReceiveTask"
                    || strNodeType == "ManualTask"
                    || strNodeType == "MailTask"
                    || strNodeType == "CamelTask"
                    || strNodeType == "MuleTask"
                    || strNodeType == "SendTask")) {
                        return;
                    }
                }
            }

            if ($rootScope.selectedElementBeforeScrolling && stencil.id().indexOf('BPMNDiagram') !== -1) {
                // ignore canvas event because of empty selection when scrolling stops
                return;
            }

            if ($rootScope.selectedElementBeforeScrolling
                && $rootScope.selectedElementBeforeScrolling.getId() === selectedShape.getId()) {

                $rootScope.selectedElementBeforeScrolling = null;
                return;
            }

            //$scope.getVisualSelectedNodesInfo();
            //debugger
            $scope.sendNodeInfo(selectedShape, stencil, true);
        });

        // -----------------------------------------------------------------------------------------
        // 2017.12.05:用于当前质检消息返回应用
        /**
         * Helper method to find a stencil item.
         */
        $scope.sendNodeInfo = function (selectedShape, stencil, ifDblClick) {
            if (!stencil || !selectedShape) {
                return;
            }

            var objProcess = selectedShape.parent;
            if (!objProcess) {
                return;
            }
            var processIdTmp = objProcess.properties['oryx-process_id'];
            while (!processIdTmp) {
                objProcess = objProcess.parent;
                if (!objProcess) {
                    return;
                }
                processIdTmp = objProcess.properties['oryx-process_id'];
            }

            //var properties = stencil.properties();
            //alert(selectedShape.id)angular.toJson(taskresult)
            if (selectedShape.properties) {
                var formProperties = selectedShape.properties['oryx-formproperties'];

                if (objProcess) {
                    if (objProcess.properties) {
                        var process_id = processIdTmp;
                        //var process_id = selectedShape.parent.properties['oryx-process_id'];
                        var nodeName = selectedShape.properties["oryx-name"];
                        if (process_id) {
                            var taskresultStr = "";
                            if (formProperties && typeof (formProperties) != "undefined"
                                && typeof (formProperties.formProperties) != "undefined"
                                && formProperties.formProperties && formProperties.formProperties.toJSON) {
                                taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.properties["oryx-overrideid"] + "','formkeydefinition':'" + selectedShape.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeName + "','formProperties':" + formProperties.formProperties.toJSON() + "}";
                            }
                            else {
                                taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.properties["oryx-overrideid"] + "','formkeydefinition':'" + selectedShape.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeName + "'}";
                            }

                            // -------------------------------------------------------------------
                            var strVariantProcess = "";// 流程变量
                            if (objProcess.children.length > 0) {
                                var objStart = objProcess.children[0];
                                var formPropertiesStart = objStart.properties['oryx-formproperties'];

                                var nodeNameStart = objStart.properties["oryx-name"];
                                var nodeStencil = objStart.getStencil();
                                // 获取节点的类型，
                                var nodeType = null;
                                if (nodeStencil) {
                                    nodeType = nodeStencil.idWithoutNs();
                                }
                                // 如果是开始节点，就获取其节点变量作为流程变量
                                if ("StartNoneEvent" == nodeType
                                    || "StartTimerEvent" == nodeType
                                    || "StartSignalEvent" == nodeType
                                    || "StartMessageEvent" == nodeType
                                    || "StartErrorEvent" == nodeType) {
                                    // 判断是否有后续节点，用于排除不规范流程中有多个开始节点的情况
                                    if (objStart.outgoing.length > 0) {
                                        if (formPropertiesStart && formPropertiesStart.formProperties
                                            && typeof (formPropertiesStart.formProperties) != "undefined"
                                            && formPropertiesStart.formProperties && formPropertiesStart.formProperties.toJSON) {
                                            strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.properties["oryx-overrideid"] + "','formkeydefinition':'" + objStart.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeNameStart + "','formProperties':" + formPropertiesStart.formProperties.toJSON() + "}";
                                        }
                                        else {
                                            strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.properties["oryx-overrideid"] + "','formkeydefinition':'" + objStart.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeNameStart + "'}";
                                        }
                                    }
                                }
                            }

                            var strResultInfo = "";
                            strResultInfo += "{"; // 流程变量
                            if (objProcess) {
                                strResultInfo += "'modelId':'" + objProcess.resourceId + "',"; // 模板ID(ModelId)
                                if (objProcess.properties) {
                                    strResultInfo += "'modelName':'" + objProcess.properties["oryx-name"] + "',"; // 模板名称
                                }
                            }
                            //var stencilTmp = objProcess.getStencil();
                            //var titleTmp = stencilTmp.title();
                            if (strVariantProcess.length > 0) {
                                strResultInfo += "'variantProcess':" + strVariantProcess + ","; // 流程变量
                            }
                            if (taskresultStr.length > 0) {
                                strResultInfo += "'variantNode':" + taskresultStr; // 节点变量
                            }
                            strResultInfo += "}"; // 节点变量
                            // -------------------------------------------------------------------

                            //alert(strResultInfo);
                            // 调用父窗口页面定义的方法，传递变量信息
                            if (parent) {
                                if (ifDblClick) {
                                    if (parent.workflowNodeDblClick) {
                                        parent.workflowNodeDblClick(strResultInfo);
                                    }
                                }
                                else {
                                    if (parent.workflowNodeClick) {
                                        parent.workflowNodeClick(strResultInfo);
                                    }
                                }
                                //if (parent.iframeTest) {
                                //    parent.iframeTest(strResultInfo);
                                //}
                            }
                            try {
                                if ((navigator.userAgent.indexOf('MSIE') >= 0)
                                         && (navigator.userAgent.indexOf('Opera') < 0)) {
                                    window.external.PNodeClickFunction(taskresultStr);
                                } else {
                                    window.hwwebkit.WebCallFormMsgFunction("PNodeClickFunction", taskresultStr);
                                }
                            } catch (e) {
                                //alert(taskresultStr);
                            }

                        }
                    }
                }

            }
        };

        // -----------------------------------------------------------------------------------------
        // 2019.01.17:获取多选节点信息
        /**
         * Helper method to find a stencil item.
         */
        $scope.getVisualSelectedNodesInfo = function () {

            // 可视化节点多选模式
            if ($rootScope.modeShow != 3) {
                return;
            }
         

            //var selectedShape = $scope.selectedShape;
            var arrSelectedNodes = $rootScope.editor.selectionMarks;
            var strVisualSelectedNodeInfo = "[";
            for (var i = 0; i < arrSelectedNodes.length; i++) {
                var elementTmp = arrSelectedNodes[i];
                if (elementTmp.length <= 0)
                {
                    continue;
                }
                var selectedShape = elementTmp[0];
                if (selectedShape == "undefined" && selectedShape == null) {
                    continue;
                }

                var stencil = selectedShape.getStencil();
                if ($rootScope.modeShow == 2) {
                    if (stencil) {
                        var strNodeType = stencil.idWithoutNs();
                        if (!(strNodeType == "StartNoneEvent"
                           || strNodeType == "StartTimerEvent"
                           || strNodeType == "StartSignalEvent"
                           || strNodeType == "StartMessageEvent"
                           || strNodeType == "StartErrorEvent"
                           || strNodeType == "UserTask"
                        || strNodeType == "ServiceTask"
                        || strNodeType == "ScriptTask"
                        || strNodeType == "BusinessRule"
                        || strNodeType == "ReceiveTask"
                        || strNodeType == "ManualTask"
                        || strNodeType == "MailTask"
                        || strNodeType == "CamelTask"
                        || strNodeType == "MuleTask"
                        || strNodeType == "SendTask")) {
                            continue;
                        }
                    }
                }

                if ($rootScope.selectedElementBeforeScrolling && stencil.id().indexOf('BPMNDiagram') !== -1) {
                    // ignore canvas event because of empty selection when scrolling stops
                    continue;
                }

                if ($rootScope.selectedElementBeforeScrolling
                    && $rootScope.selectedElementBeforeScrolling.getId() === selectedShape.getId()) {

                    $rootScope.selectedElementBeforeScrolling = null;
                    continue;
                }

                strVisualSelectedNodeInfo += $scope.getSelectedNodeInfo(selectedShape, stencil, true);
                if (i < arrSelectedNodes.length - 1)
                {
                    strVisualSelectedNodeInfo += ",";
                }
            }
            strVisualSelectedNodeInfo += "]";

            // 20190118:返回多选节点数据信息
            return strVisualSelectedNodeInfo;
        }

        // -----------------------------------------------------------------------------------------
        // 2019.01.17:获取多选节点信息
        /**
         * Helper method to find a stencil item.
         */
        $scope.getSelectedNodeInfo = function (selectedShape, stencil, ifDblClick) {

            if (!stencil || !selectedShape) {
                return;
            }

            var objProcess = selectedShape.parent;
            if (!objProcess) {
                return;
            }
            var processIdTmp = objProcess.properties['oryx-process_id'];
            while (!processIdTmp) {
                objProcess = objProcess.parent;
                if (!objProcess) {
                    return;
                }
                processIdTmp = objProcess.properties['oryx-process_id'];
            }

            //var properties = stencil.properties();
            //alert(selectedShape.id)angular.toJson(taskresult)
            if (selectedShape.properties) {
                var formProperties = selectedShape.properties['oryx-formproperties'];

                if (objProcess) {
                    if (objProcess.properties) {
                        var process_id = processIdTmp;
                        //var process_id = selectedShape.parent.properties['oryx-process_id'];
                        var nodeName = selectedShape.properties["oryx-name"];
                        if (process_id) {
                            var taskresultStr = "";
                            if (formProperties && typeof (formProperties) != "undefined"
                                && typeof (formProperties.formProperties) != "undefined"
                                && formProperties.formProperties && formProperties.formProperties.toJSON) {
                                taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.properties["oryx-overrideid"] + "','formkeydefinition':'" + selectedShape.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeName + "','formProperties':" + formProperties.formProperties.toJSON() + "}";
                            }
                            else {
                                taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.properties["oryx-overrideid"] + "','formkeydefinition':'" + selectedShape.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeName + "'}";
                            }

                            // -------------------------------------------------------------------
                            var strVariantProcess = "";// 流程变量
                            if (objProcess.children.length > 0) {

                                // 开始节点，获取其节点变量作为流程变量
                                var objStart = $scope.getStartNode(objProcess);
                                var formPropertiesStart = objStart.properties['oryx-formproperties'];
                                var nodeNameStart = objStart.properties["oryx-name"];

                                // 判断是否有后续节点，用于排除不规范流程中有多个开始节点的情况
                                if (objStart && objStart.outgoing) {
                                    if (objStart.outgoing.length > 0) {
                                        if (formPropertiesStart && formPropertiesStart.formProperties
                                            && typeof (formPropertiesStart.formProperties) != "undefined"
                                            && formPropertiesStart.formProperties && formPropertiesStart.formProperties.toJSON) {
                                            strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.properties["oryx-overrideid"] + "','formkeydefinition':'" + objStart.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeNameStart + "','formProperties':" + formPropertiesStart.formProperties.toJSON() + "}";
                                        }
                                        else {
                                            strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.properties["oryx-overrideid"] + "','formkeydefinition':'" + objStart.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeNameStart + "'}";
                                        }
                                    }
                                }
                            }

                            var strResultInfo = "";
                            strResultInfo += "{"; // 流程变量
                            if (objProcess) {
                                strResultInfo += "'modelId':'" + objProcess.resourceId + "',"; // 模板ID(ModelId)
                                if (objProcess.properties) {
                                    strResultInfo += "'modelName':'" + objProcess.properties["oryx-name"] + "',"; // 模板名称
                                }
                            }
                            //var stencilTmp = objProcess.getStencil();
                            //var titleTmp = stencilTmp.title();
                            if (strVariantProcess.length > 0) {
                                strResultInfo += "'variantProcess':" + strVariantProcess + ","; // 流程变量
                            }
                            if (taskresultStr.length > 0) {
                                strResultInfo += "'variantNode':" + taskresultStr; // 节点变量
                            }
                            strResultInfo += "}"; // 节点变量
                            // -------------------------------------------------------------------

                            return strResultInfo;
                        }
                    }
                }

            }
        };

        $scope.getStartNode = function (objProcess) {

            if (!objProcess) {
                return null;
            }
            for (var i = 0; i < objProcess.children.length; i++) {
                var objNode = objProcess.children[i];
                var nodeStencil = objNode.getStencil();
                // 获取节点的类型，
                var nodeType = null;
                if (nodeStencil) {
                    nodeType = nodeStencil.idWithoutNs();
                }
                // 如果是开始节点，就获取其节点变量作为流程变量
                if ("StartNoneEvent" == nodeType
                    || "StartTimerEvent" == nodeType
                    || "StartSignalEvent" == nodeType
                    || "StartMessageEvent" == nodeType
                    || "StartErrorEvent" == nodeType) {

                    return objNode;
                }
            }
        };

        /**
         * 2017.12.07：发送多节点变量信息
         */
        $scope.sendMultiNodeInfo = function (ifDblClick) {
            if (!($rootScope.modelData)) {
                return;
            }
            //$rootScope.modelData;
            var strProcessId = $rootScope.modelData.modelId;
            var strProcessName = $rootScope.modelData.name;
            var objCanvas = $rootScope.editor.getCanvas();

            var strResultInfo = "";
            strResultInfo += "{"; // 流程变量
            strResultInfo += "'modelId':'" + strProcessId + "',"; // 模板ID(ModelId)
            strResultInfo += "'modelName':'" + $rootScope.modelData.name + "',"; // 模板名称
            strResultInfo += "'variants':["; // 模板ID(ModelId)

            var nCnt = $rootScope.editor.selection.length;
            for (var i = 0; i < nCnt; i++) {
                strResultInfo += "{";

                var selectedShape = $rootScope.editor.selection[i];
                //var propertiesSelected = $rootScope.editor.selection[i].properties;
                //if (propertiesSelected) {
                //    var formProperties = propertiesSelected['oryx-formproperties'];
                //    if (typeof (formProperties) != "undefined" && formProperties != null) {   

                //    }

                //}
                if (selectedShape.properties) {
                    var formProperties = selectedShape.properties['oryx-formproperties'];

                    if (selectedShape.parent) {
                        if (selectedShape.parent.properties) {
                            var process_id = selectedShape.parent.properties['oryx-process_id'];
                            var nodeName = selectedShape.properties["oryx-name"];
                            if (process_id) {
                                // 节点变量
                                var taskresultStr = "";
                                if (formProperties && typeof (formProperties) != "undefined"
                                    && formProperties.formProperties && typeof (formProperties.formProperties) != "undefined"
                                    && formProperties.formProperties.toJSON) {
                                    // 2017.12.07
                                    taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.properties["oryx-overrideid"] + "','formkeydefinition':'" + selectedShape.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeName + "','formProperties':" + formProperties.formProperties.toJSON() + "}";
                                    //taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.resourceId + "','taskNodeName':'" + nodeName + "','formProperties':" + formProperties.formProperties.toJSON() + "}";
                                }
                                else {
                                    // 2017.12.07
                                    taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.properties["oryx-overrideid"] + "','formkeydefinition':'" + selectedShape.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeName + "'}";
                                    //taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.resourceId + "','taskNodeName':'" + nodeName + "'}";
                                }

                                // -------------------------------------------------------------------
                                // 流程变量
                                var strVariantProcess = "";
                                if (selectedShape.parent.children.length > 0) {
                                    var objStart = selectedShape.parent.children[0];
                                    var formPropertiesStart = objStart.properties['oryx-formproperties'];
                                    var nodeNameStart = objStart.properties["oryx-name"];
                                    var nodeStencil = objStart.getStencil();
                                    // 获取节点的类型，
                                    var nodeType = nodeStencil.idWithoutNs();
                                    // 如果是开始节点，就获取其节点变量作为流程变量
                                    if ("StartNoneEvent" == nodeType
                                        || "StartTimerEvent" == nodeType
                                        || "StartSignalEvent" == nodeType
                                        || "StartMessageEvent" == nodeType
                                        || "StartErrorEvent" == nodeType) {
                                        // 判断是否有后续节点，用于排除不规范流程中有多个开始节点的情况
                                        if (objStart.outgoing.length > 0) {
                                            if (formPropertiesStart && typeof (formPropertiesStart.formProperties) != "undefined"
                                                && formPropertiesStart.formProperties
                                                && formPropertiesStart.formProperties.toJSON) {
                                                // 2017.12.07
                                                strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.properties["oryx-overrideid"] + "','formkeydefinition':'" + objStart.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeNameStart + "','formProperties':" + formPropertiesStart.formProperties.toJSON() + "}";
                                                //strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.resourceId + "','taskNodeName':'" + nodeNameStart + "','formProperties':" + formPropertiesStart.formProperties.toJSON() + "}";
                                            }
                                            else {
                                                // 2017.12.07
                                                strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.properties["oryx-overrideid"] + "','formkeydefinition':'" + objStart.properties["oryx-formkeydefinition"] + "','taskNodeName':'" + nodeNameStart + "'}";
                                                //strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.resourceId + "','taskNodeName':'" + nodeNameStart + "'}";
                                            }
                                        }
                                    }
                                }

                                if (strVariantProcess.length > 0) {
                                    strResultInfo += "'variantProcess':" + strVariantProcess + ","; // 流程变量
                                }
                                if (taskresultStr.length > 0) {
                                    strResultInfo += "'variantNode':" + taskresultStr; // 节点变量
                                }
                                // -------------------------------------------------------------------

                                // 调用父窗口页面定义的方法，传递变量信息
                                if (parent) {
                                    if (ifDblClick) {
                                        if (parent.workflowNodeDblClick) {
                                            parent.workflowNodeDblClick(strResultInfo);
                                        }
                                    }
                                    else {
                                        if (parent.workflowNodeClick) {
                                            parent.workflowNodeClick(strResultInfo);
                                        }
                                    }
                                }
                            }
                        }
                    }

                }
                strResultInfo += "}";
                if (i < nCnt - 1) {
                    strResultInfo += ",";
                }
            }

            strResultInfo += "]"; //
            strResultInfo += "}"; //
            //alert(strResultInfo);


            // 2017.12.06:目前暂未用到，所以注释掉
            //try {
            //    if ((navigator.userAgent.indexOf('MSIE') >= 0)
            //             && (navigator.userAgent.indexOf('Opera') < 0)) {
            //        window.external.PNodeClickFunction(strResultInfo);
            //    } else {
            //        window.hwwebkit.WebCallFormMsgFunction("PNodeClickFunction", strResultInfo);
            //    }
            //} catch (e) {
            //    alert(strResultInfo);
            //}
        };
        ////2017.11.15: 双击事件响应
        //$scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_DBLCLICK, function (event) {

        //    //console.log("EVENT_DBLCLICK");
        //    if ($rootScope.modeShow != 2) {

        //        return;
        //    }
        //    // 2017.11.16：用于屏蔽modeShow == 2模式下双击除起始节点和任务节点之外的节点向外发送消息
        //    if (!$rootScope.editor.ifVisualDblClickSendMessage) {
        //        return;
        //    }
        //    var selectedShape = $scope.selectedShape;
        //    //var selectedShape1 = $rootScope.editor.selectionMarks;
        //    if (selectedShape == "undefined" && selectedShape == null) {
        //        return;
        //    }

        //    //var selectedShape = shapes.first();
        //    var stencil = selectedShape.getStencil();
        //    if ($rootScope.modeShow == 2) {
        //        if (stencil) {
        //            var strNodeType = stencil.idWithoutNs();
        //            if (!(strNodeType == "StartNoneEvent"
        //               || strNodeType == "StartTimerEvent"
        //               || strNodeType == "StartSignalEvent"
        //               || strNodeType == "StartMessageEvent"
        //               || strNodeType == "StartErrorEvent"
        //               || strNodeType == "UserTask"
        //            || strNodeType == "ServiceTask"
        //            || strNodeType == "ScriptTask"
        //            || strNodeType == "BusinessRule"
        //            || strNodeType == "ReceiveTask"
        //            || strNodeType == "ManualTask"
        //            || strNodeType == "MailTask"
        //            || strNodeType == "CamelTask"
        //            || strNodeType == "MuleTask"
        //            || strNodeType == "SendTask")) {
        //                return;
        //            }
        //        }
        //    }

        //    if ($rootScope.selectedElementBeforeScrolling && stencil.id().indexOf('BPMNDiagram') !== -1) {
        //        // ignore canvas event because of empty selection when scrolling stops
        //        return;
        //    }

        //    if ($rootScope.selectedElementBeforeScrolling
        //        && $rootScope.selectedElementBeforeScrolling.getId() === selectedShape.getId()) {

        //        $rootScope.selectedElementBeforeScrolling = null;
        //        return;
        //    }

        //    //$scope.sendMultiNodeInfo(true);
        //    $scope.sendNodeInfo(selectedShape, stencil, true);
        //});

        //// -----------------------------------------------------------------------------------------
        //// 2017.12.05:用于当前质检消息返回应用
        ///**
        // * Helper method to find a stencil item.
        // */
        //$scope.sendNodeInfo = function (selectedShape, stencil, ifDblClick) {
        //    if (!stencil || !selectedShape) {
        //        return;
        //    }

        //    var objProcess = selectedShape.parent;
        //    if (!objProcess) {
        //        return;
        //    }
        //    var processIdTmp = objProcess.properties['oryx-process_id'];
        //    while (!processIdTmp) {
        //        objProcess = objProcess.parent;
        //        if (!objProcess) {
        //            return;
        //        }
        //        processIdTmp = objProcess.properties['oryx-process_id'];
        //    }
        //    //var properties = stencil.properties();
        //    //alert(selectedShape.id)angular.toJson(taskresult)
        //    if (selectedShape.properties) {
        //        var formProperties = selectedShape.properties['oryx-formproperties'];

        //        if (processIdTmp) {
        //            if (processIdTmp.properties) {
        //                var process_id = processIdTmp;
        //                var nodeName = selectedShape.properties["oryx-name"];
        //                if (process_id) {
        //                    var taskresultStr = "";
        //                    if (formProperties && typeof (formProperties) != "undefined"
        //                        && formProperties.formProperties && typeof (formProperties.formProperties) != "undefined"
        //                        && formProperties.formProperties.toJSON) {
        //                        taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.resourceId + "','taskNodeName':'" + nodeName + "','formProperties':" + formProperties.formProperties.toJSON() + "}";
        //                    }
        //                    else {
        //                        taskresultStr = "{'processKey':'" + process_id + "','taskNodeid':'" + selectedShape.resourceId + "','taskNodeName':'" + nodeName + "'}";
        //                    }

        //                    // -------------------------------------------------------------------
        //                    var strVariantProcess = "";// 流程变量
        //                    if (processIdTmp.children.length > 0) {
        //                        var objStart = processIdTmp.children[0];
        //                        var formPropertiesStart = objStart.properties['oryx-formproperties'];
        //                        var nodeNameStart = objStart.properties["oryx-name"];
        //                        var nodeStencil = objStart.getStencil();
        //                        // 获取节点的类型，
        //                        var nodeType = nodeStencil.idWithoutNs();
        //                        // 如果是开始节点，就获取其节点变量作为流程变量
        //                        if ("StartNoneEvent" == nodeType
        //                            || "StartTimerEvent" == nodeType
        //                            || "StartSignalEvent" == nodeType
        //                            || "StartMessageEvent" == nodeType
        //                            || "StartErrorEvent" == nodeType) {
        //                            // 判断是否有后续节点，用于排除不规范流程中有多个开始节点的情况
        //                            if (objStart.outgoing.length > 0) {
        //                                if (formPropertiesStart && typeof (formPropertiesStart.formProperties) != "undefined"
        //                                    && formPropertiesStart.formProperties && formPropertiesStart.formProperties.toJSON) {
        //                                    strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.resourceId + "','taskNodeName':'" + nodeNameStart + "','formProperties':" + formPropertiesStart.formProperties.toJSON() + "}";
        //                                }
        //                                else {
        //                                    strVariantProcess = "{'processKey':'" + process_id + "','taskNodeid':'" + objStart.resourceId + "','taskNodeName':'" + nodeNameStart + "'}";
        //                                }
        //                            }
        //                        }
        //                    }

        //                    var strResultInfo = "";
        //                    strResultInfo += "{"; // 流程变量
        //                    if (processIdTmp) {
        //                        strResultInfo += "'modelId':'" + processIdTmp.resourceId + "',"; // 模板ID(ModelId)
        //                        if (processIdTmp.properties) {
        //                            strResultInfo += "'modelName':'" + processIdTmp.properties["oryx-name"] + "',"; // 模板名称
        //                        }
        //                    }
        //                    //var stencilTmp = processIdTmp.getStencil();
        //                    //var titleTmp = stencilTmp.title();
        //                    if (strVariantProcess.length > 0) {
        //                        strResultInfo += "'variantProcess':" + strVariantProcess + ","; // 流程变量
        //                    }
        //                    if (taskresultStr.length > 0) {
        //                        strResultInfo += "'variantNode':" + taskresultStr; // 节点变量
        //                    }
        //                    strResultInfo += "}"; // 节点变量
        //                    // -------------------------------------------------------------------

        //                    //alert(strResultInfo);
        //                    // 调用父窗口页面定义的方法，传递变量信息
        //                    if (parent) {
        //                        if (ifDblClick) {
        //                            if (parent.workflowNodeDblClick) {
        //                                parent.workflowNodeDblClick(strResultInfo);
        //                            }
        //                        }
        //                        else {
        //                            if (parent.workflowNodeClick) {
        //                                parent.workflowNodeClick(strResultInfo);
        //                            }
        //                        }
        //                        //if (parent.iframeTest) {
        //                        //    parent.iframeTest(strResultInfo);
        //                        //}
        //                    }
        //                    try {
        //                        if ((navigator.userAgent.indexOf('MSIE') >= 0)
        //                                 && (navigator.userAgent.indexOf('Opera') < 0)) {
        //                            window.external.PNodeClickFunction(taskresultStr);
        //                        } else {
        //                            window.hwwebkit.WebCallFormMsgFunction("PNodeClickFunction", taskresultStr);
        //                        }
        //                    } catch (e) {
        //                        //alert(taskresultStr);
        //                    }

        //                }
        //            }
        //        }

        //    }
        //};
        
        /*
         * Listen to selection change events: show properties
         * 2017.09.29：此处为选中项变化的响应事件
         */
        $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function (event) {

            //console.log("EVENT_SELECTION_CHANGED");
            var shapes = event.elements;
            var canvasSelected = false;
            $scope.ifVisualDblClickSendMessage = true;
            //$scope.propertyToggleFlag = false;
            if (shapes && shapes.length == 0) {
                shapes = [$scope.editor.getCanvas()];
                canvasSelected = true;
            }
            //var json = $scope.editor.getJSONExt();
            if (shapes && shapes.length > 0) {
                //debugger
                var selectedShape = shapes.first();
                //var typeTmp = $scope.modelData.model.stencilset.namespace;
                var stencil = selectedShape.getStencil();
                //var typeTmp = stencil.type();
                //var aa = typeTmp.toString();

                if ($rootScope.selectedElementBeforeScrolling && stencil.id().indexOf('BPMNDiagram') !== -1) {
                    // ignore canvas event because of empty selection when scrolling stops
                    return;
                }

                if ($rootScope.selectedElementBeforeScrolling && $rootScope.selectedElementBeforeScrolling.getId() === selectedShape.getId()) {
                    $rootScope.selectedElementBeforeScrolling = null;
                    return;
                }

                // Store previous selection
                $scope.previousSelectedShape = $scope.selectedShape;

                // Only do something if another element is selected (Oryx fires this event multiple times)
                if ($scope.selectedShape !== undefined && $scope.selectedShape.getId() === selectedShape.getId()) {
                    if ($rootScope.forceSelectionRefresh) {
                        // Switch the flag again, this run will force refresh
                        $rootScope.forceSelectionRefresh = false;
                    } else {
                        // Selected the same element again, no need to update anything
                        return;
                    }
                }

                var selectedItem = { 'title': '', 'properties': [] };

                if (canvasSelected) {
                    selectedItem.auditData = {
                        'author': $scope.modelData.createdByUser,
                        'createDate': $scope.modelData.createDate
                    };
                }

                // Gather properties of selected item
                var properties = stencil.properties();
                var strNodeType = stencil.idWithoutNs();

                for (var i = 0; i < properties.length; i++) {
                    var property = properties[i];
                    //
                    //if (property.key.toString() == 'oryx-conditionsequenceflow')
                    //{
                    //    property.hasReadWriteMode = true;
                    //}
                    if (property.popular() == false) continue;
                    var key = property.prefix() + "-" + property.id();

                    if (key === 'oryx-name') {
                        selectedItem.title = selectedShape.properties[key];
                    }

                    // First we check if there is a config for 'key-type' and then for 'type' alone
                    var propertyConfig = KISBPM.PROPERTY_CONFIG[key + '-' + property.type()];
                    if (propertyConfig === undefined || propertyConfig === null) {
                        propertyConfig = KISBPM.PROPERTY_CONFIG[property.type()];
                    }

                    //// 2017.07.31 将邮件任务的接收人、发送人、主题、抄送、密件抄送、内容、HTML改为直接编辑模式
                    //if (key == 'oryx-mailtaskto'
                    //    || key == 'oryx-mailtaskfrom'
                    //    || key == 'oryx-mailtasksubject'
                    //    || key == 'oryx-mailtaskcc'
                    //    || key == 'oryx-mailtaskbcc'
                    //    || key == 'oryx-mailtasktext'
                    //    || key == 'oryx-mailtasktext'
                    //    || key == 'oryx-mailtaskhtml') {
                    //    propertyConfig = KISBPM.PROPERTY_CONFIG['string'];
                    //}

                    if (propertyConfig === undefined || propertyConfig === null) {
                        console.log('WARNING: no property configuration defined for ' + key + ' of type ' + property.type());
                    } else {

                        if (selectedShape.properties[key] === 'true') {
                            selectedShape.properties[key] = true;
                        }

                        if (KISBPM.CONFIG.showRemovedProperties == false && property.isHidden()) {
                            continue;
                        }

                        var currentProperty = {
                            'key': key,
                            'title': property.title(),
                            'type': property.type(),
                            'mode': 'read',
                            'hidden': property.isHidden(),
                            'value': selectedShape.properties[key]
                        };

                        if ((currentProperty.type === 'complex' || currentProperty.type === 'multiplecomplex') && currentProperty.value && currentProperty.value.length > 0) {
                            try {
                                currentProperty.value = JSON.parse(currentProperty.value);
                            } catch (err) {
                                // ignore
                            }
                        }

                        if (propertyConfig.readModeTemplateUrl !== undefined && propertyConfig.readModeTemplateUrl !== null) {
                            currentProperty.readModeTemplateUrl = propertyConfig.readModeTemplateUrl + '?version=' + $rootScope.staticIncludeVersion;
                        }
                        if (propertyConfig.writeModeTemplateUrl !== null && propertyConfig.writeModeTemplateUrl !== null) {
                            currentProperty.writeModeTemplateUrl = propertyConfig.writeModeTemplateUrl + '?version=' + $rootScope.staticIncludeVersion;
                        }

                        if (propertyConfig.templateUrl !== undefined && propertyConfig.templateUrl !== null) {
                            currentProperty.templateUrl = propertyConfig.templateUrl + '?version=' + $rootScope.staticIncludeVersion;
                            currentProperty.hasReadWriteMode = false;
                        }
                        else {
                            currentProperty.hasReadWriteMode = true;
                        }

                        if (currentProperty.value === undefined
                            || currentProperty.value === null
                            || currentProperty.value.length == 0) {
                            currentProperty.noValue = true;
                        }
                        if (currentProperty.type == 'string')// || currentProperty.type == 'kisbpm-multiinstance'
                        {
                            currentProperty.mode = 'write';
                        }

                        // 20190123：根据节点的oryx-overrideid属性，设置属性面板中模块信息的值
                        $scope.setNodePropertyOverrideId(currentProperty, strNodeType);

                        // 20190123：根据节点的oryx-formkeydefinition属性，设置属性面板中模块信息的值
                        $scope.setNodePropertyFormKeyDefinition(currentProperty);
                        //debugger;
                        //$scope.ifPropertyOverrideIdRepeated(selectedShape, currentProperty);
                        selectedItem.properties.push(currentProperty);
                    }
                }

                // 2017.10.28 check fault
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // 2017.09.29 点击选中返回节点信息
                if ($rootScope.modeShow == 2) {
                    //if (!(event.shiftKey || event.ctrlKey)) {
                    //    //$scope.sendMultiNodeInfo(false);
                    //}
                    //else
                    {
                        // 2017.12.08：节点多选
                        $rootScope.editor._markSelection();
                    }
                    $scope.sendNodeInfo(selectedShape, stencil, false);
                }
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                // Need to wrap this in an $apply block, see http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
                $scope.safeApply(function () {
                    $scope.selectedItem = selectedItem;
                    $scope.selectedShape = selectedShape;
                    // 2017.12.28:控制属性面板Tab页的显示隐藏
                    if ($rootScope.modeShow == 0) {
                        $scope.showPropertiesTabs();
                    }
                });

            } else {
                $scope.safeApply(function () {
                    $scope.selectedItem = {};
                    $scope.selectedShape = null;
                });
            }
        });
        $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function (event) {
            KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS);
            var shapes = event.elements;


            //var divFloat = jQuery('#idFloatNodes')[0];
            //if (divFloat) {
            //    divFloat.style.display = "none";
            //}

            if (shapes && shapes.length == 1) {

                var selectedShape = shapes.first();

                var a = $scope.editor.getCanvas().node.getScreenCTM();

                var absoluteXY = selectedShape.absoluteXY();

                absoluteXY.x *= a.a;
                absoluteXY.y *= a.d;

                var additionalIEZoom = 1;
                if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
                    var ua = navigator.userAgent;
                    if (ua.indexOf('MSIE') >= 0) {
                        //IE 10 and below
                        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100);
                        if (zoom !== 100) {
                            additionalIEZoom = zoom / 100
                        }
                    }
                }

                if (additionalIEZoom === 1) {
                    absoluteXY.y = absoluteXY.y - jQuery("#canvasSection").offset().top + 5;
                    absoluteXY.x = absoluteXY.x - jQuery("#canvasSection").offset().left;

                } else {
                    var canvasOffsetLeft = jQuery("#canvasSection").offset().left;
                    var canvasScrollLeft = jQuery("#canvasSection").scrollLeft();
                    var canvasScrollTop = jQuery("#canvasSection").scrollTop();

                    var offset = a.e - (canvasOffsetLeft * additionalIEZoom);
                    var additionaloffset = 0;
                    if (offset > 10) {
                        additionaloffset = (offset / additionalIEZoom) - offset;
                    }
                    absoluteXY.y = absoluteXY.y - (jQuery("#canvasSection").offset().top * additionalIEZoom) + 5 + ((canvasScrollTop * additionalIEZoom) - canvasScrollTop);
                    absoluteXY.x = absoluteXY.x - (canvasOffsetLeft * additionalIEZoom) + additionaloffset + ((canvasScrollLeft * additionalIEZoom) - canvasScrollLeft);
                }
                var bounds = new ORYX.Core.Bounds(a.e + absoluteXY.x, a.f + absoluteXY.y, a.e + absoluteXY.x + a.a * selectedShape.bounds.width(), a.f + absoluteXY.y + a.d * selectedShape.bounds.height());
                var shapeXY = bounds.upperLeft();

                var stencilItem = $scope.getStencilItemById(selectedShape.getStencil().idWithoutNs());
                var morphShapes = [];
                if (stencilItem && stencilItem.morphRole) {
                    for (var i = 0; i < $scope.morphRoles.length; i++) {
                        if ($scope.morphRoles[i].role === stencilItem.morphRole) {
                            morphShapes = $scope.morphRoles[i].morphOptions;
                        }
                    }
                }

                var nNodeWid = 24;
                var nNodeHei = 24;
                var x = shapeXY.x;
                if (bounds.width() < 48) {
                    x -= nNodeWid;
                }

                //if (morphShapes && morphShapes.length > 0) {
                //    // In case the element is not wide enough, start the 2 bottom-buttons more to the left
                //    // to prevent overflow in the right-menu
                //    var morphButton = document.getElementById('morph-button');
                //    morphButton.style.display = "block";
                //    morphButton.style.left = x + nNodeWid + 'px';
                //    morphButton.style.top = (shapeXY.y + bounds.height() + 2) + 'px';
                //}

                //var deleteButton = document.getElementById('delete-button');
                //deleteButton.style.display = "block";
                //deleteButton.style.left = x + 'px';
                //deleteButton.style.top = (shapeXY.y + bounds.height() + 2) + 'px';

                if (stencilItem && (stencilItem.canConnect || stencilItem.canConnectAssociation)) {
                    var quickButtonCounter = 0;

                    var arrFloatNodes = jQuery('.Oryx_button');
                    var divFloat = jQuery('#idFloatNodes')[0];
                    var divFloatWid = nNodeWid * arrFloatNodes.length / 2 + 6;
                    var divFloatHei = nNodeHei * arrFloatNodes.length / 5 + 4;

                    var quickButtonX = shapeXY.x + bounds.width() + 5;
                    var quickButtonY = shapeXY.y - divFloatHei; // 此处表示是距离父节点div上边界的距离，所以是减去一个高度

                    if (divFloat) {
                        divFloat.style.display = "block";
                        divFloat.style.left = quickButtonX - 3 + 'px';
                        divFloat.style.top = quickButtonY - 2 + 'px';
                        divFloat.style.width = divFloatWid + 'px';
                        divFloat.style.height = divFloatHei + 'px';
                    }

                    arrFloatNodes.each(function (i, obj) {
                        if (obj.id !== 'morph-button' && obj.id != 'delete-button') {
                            quickButtonCounter++;
                            if (quickButtonCounter > 5) {
                                quickButtonX = shapeXY.x + bounds.width() + 5;
                                quickButtonY += nNodeHei;
                                quickButtonCounter = 1;

                            } else if (quickButtonCounter > 1) {
                                quickButtonX += nNodeWid;
                            }
                            obj.style.display = "block";
                            obj.style.left = quickButtonX + 'px';
                            obj.style.top = quickButtonY + 'px';
                        }
                    });

                    if (morphShapes && morphShapes.length > 0) {
                        // In case the element is not wide enough, start the 2 bottom-buttons more to the left
                        // to prevent overflow in the right-menu
                        quickButtonX += nNodeWid;
                        var morphButton = document.getElementById('morph-button');
                        if (morphButton) {
                            morphButton.style.display = "block";
                            morphButton.style.left = quickButtonX + 'px';
                            morphButton.style.top = quickButtonY + 'px';
                        }
                    }

                    var deleteButton = document.getElementById('delete-button');
                    if (deleteButton) {
                        quickButtonX += nNodeWid;
                        deleteButton.style.display = "block";
                        deleteButton.style.left = quickButtonX + 'px';
                        deleteButton.style.top = quickButtonY + 'px';
                    }

                    //var j = 0;
                    //jQuery('#idFloatNodes').each(function (j, obj1) {
                    //    //obj1.style.position = 'absolute';
                    //    obj1.style.display = "block";
                    //    obj1.style.left = shapeXY.x + bounds.width() + 5 + 'px';
                    //    obj1.style.top = shapeXY.y + 'px';
                    //});
                }
            }
        });

        if (!$rootScope.stencilInitialized) {
            KISBPM.eventBus.addListener(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS, function (event) {
                jQuery('.Oryx_button').each(function (i, obj) {
                    obj.style.display = "none";
                });
                // 2017.09.01隐藏浮动节点背景div
                var divFloat = jQuery('#idFloatNodes')[0];
                if (divFloat) {
                    divFloat.style.display = "none";
                }
            });

            /*
             * Listen to property updates and act upon them
             */
            KISBPM.eventBus.addListener(KISBPM.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED, function (event) {
                if (event.property && event.property.key) {
                    // If the name property is been updated, we also need to change the title of the currently selected item
                    if (event.property.key === 'oryx-name' && $scope.selectedItem !== undefined && $scope.selectedItem !== null) {
                        $scope.selectedItem.title = event.newValue;
                    }

                    // Update "no value" flag
                    event.property.noValue = (event.property.value === undefined
                        || event.property.value === null
                        || event.property.value.length == 0);
                }
            });

            $rootScope.stencilInitialized = true;
        }

        // 20190123:表单键(key)改为模块信息
        $scope.ifPropertyOverrideIdRepeated = function (selectedShape, currentProperty) {

            if (!currentProperty || !$scope.modelData)
            {
                return false;
            }
            if (currentProperty.key != 'oryx-overrideid' || !$scope.modelData.model) {
                return false;
            }
            if (!$scope.modelData.model.childShapes) {
                return false;
            }
            
            var nodeSelName = '当前选中节点';
            if(selectedShape)
            {
                if(selectedShape.properties)
                {
                    if(selectedShape.properties['oryx-name'])
                    {
                        nodeSelName = selectedShape.properties['oryx-name'];
                    }
                }
            }
            for (var i = 0; i < $scope.modelData.model.childShapes.length; i++)
            {
                if ($scope.modelData.model.childShapes[i].properties['overrideid'] == currentProperty.value
                    && $scope.modelData.model.childShapes[i].resourceId != selectedShape.resourceId)
                {
                    var nodeName = $scope.modelData.model.childShapes[i].properties['name'];
                    alert(nodeName + '与' + nodeSelName + '节点编号重复，请重新输入!');
                    return true;
                }
            }

            return false;
        }


        // 20190123:表单键(key)改为模块信息
        $scope.setNodePropertyOverrideId = function (currentProperty, nodeType) {

            // 20190123：根据节点的oryx-formkeydefinition属性，设置属性面板中模块信息的值
            if (!currentProperty)
            {
                return;
            }
            if (currentProperty.key != 'oryx-overrideid') {
                return;
            }
            //debugger
            // 20190123:如果value为空，则赋值
            if (!currentProperty.value) {
                currentProperty.value = nodeType + '-' + $scope.createNewId(10);
            }
        }

        // 20190123:表单键(key)改为模块信息
        $scope.createNewId = function (len) {

            var length = 32;
            if (len)
            {
                length = len;
            }
            var guid = "";
            var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            for (var i = 0; i < length; i++) {
                var pos = Math.round(Math.random() * (arr.length - 1));
                guid += arr[pos];
            }
            return guid;
        }


        // 20190123:表单键(key)改为模块信息
        $scope.setNodePropertyFormKeyDefinition = function (currentProperty) {

            // 20190123：根据节点的oryx-formkeydefinition属性，设置属性面板中模块信息的值
            if (!currentProperty)
            {
                return;
            }
            if (currentProperty.key != 'oryx-formkeydefinition') {
                return;
            }
            //debugger
            try {
                var objModels = currentProperty.value;//JSON.parse(currentProperty.value);
                //var objModels;
				try
				{
					if(typeof(currentProperty.value) == "string") {
						objModels=JSON.parse(currentProperty.value);
					}
				} catch (ex) {
					objModels = currentProperty.value
				}
                //var objModels;
				if(typeof(objModels) == "string") { $scope.modelInfo = objModels;}
				else
				{ // 20190122:根据从弹框中选择的模块信息更新编辑框数据
					if (objModels&&objModels.modulesInfo) {
						if (objModels.modulesInfo.length) {
							if (objModels.modulesInfo.length > 0) {
								$scope.modelInfo = objModels.modulesInfo.length + '模块信息';
							}
						}
					}
				}              
                //$scope.modelInfo = '5模块信息';
                // 20190117:将节点属性的“表单键(key)”改为“模块信息”
                if ('表单键(key)' == currentProperty.title) {
                    currentProperty.title = '模块信息';
                }                
            } catch (e) {
                console.log('error：模块信息不是JSON格式!!!' + e);
                return;
            }
        }

        // 20190123:判断是否是Json格式
        $scope.isJSON = function (strJson) {

            if (typeof strJson == 'string') {
                try {
                    JSON.parse(str);
                    return true;
                } catch (e) {
                    console.log(e);
                    return false;
                }
            }
            console.log('It is not a string!')
        }

        // 将左侧树形列表节点的图标改为矢量图标
        $scope.setVectorIconName = function (stencilItem) {
            if (!stencilItem) {
                return;
            }

            //for (var i = 0; i < $scope.stencilItemGroups.length; i++) {

            //    for (var j = 0; j < $scope.stencilItemGroups[i].paletteItems.length; j++) {
            // 启动事件
            if (stencilItem.icon == 'startevent/none.png') {
                stencilItem.vectoricon = 'iconfont icon-yuanxing';
            }
            else if (stencilItem.icon == 'startevent/error.png') {
                stencilItem.vectoricon = 'iconfont icon-cuowushijian';
            }
            else if (stencilItem.icon == 'startevent/message.png') {
                stencilItem.vectoricon = 'iconfont icon-xiaoxishijian';
            }
            else if (stencilItem.icon == 'startevent/signal.png') {
                stencilItem.vectoricon = 'iconfont icon-xinhaoshijian';
            }
            else if (stencilItem.icon == 'startevent/timer.png') {
                stencilItem.vectoricon = 'iconfont icon-dingshishijian';
            }
                // 任务
            else if (stencilItem.icon == 'activity/list/type.user.png') {
                stencilItem.vectoricon = 'iconfont icon-yonghu'; // 用户任务
            }
            else if (stencilItem.icon == 'activity/list/type.service.png') {
                stencilItem.vectoricon = 'iconfont icon-shuxing';// 服务任务
            }
            else if (stencilItem.icon == 'activity/list/type.script.png') {
                stencilItem.vectoricon = 'iconfont icon-jiaobensvg'; // 脚本任务
            }
            else if (stencilItem.icon == 'activity/list/type.business.rule.png') {
                stencilItem.vectoricon = 'iconfont icon-yewuguize'; // 业务规则任务
            }
            else if (stencilItem.icon == 'activity/list/type.receive.png') {
                stencilItem.vectoricon = 'iconfont icon-youxiang'; // 接收任务
            }
            else if (stencilItem.icon == 'activity/list/type.manual.png') {
                stencilItem.vectoricon = 'iconfont icon-shoudong'; // 手动任务
            }
            else if (stencilItem.icon == 'activity/list/type.send.png') { // 邮件任务
                stencilItem.vectoricon = 'iconfont icon-youjian1';
            }
            else if (stencilItem.icon == 'activity/list/type.camel.png') {
                stencilItem.vectoricon = 'iconfont icon-luotuo2';
            }
            else if (stencilItem.icon == 'activity/list/type.mule.png') { // mule Task
                stencilItem.vectoricon = 'iconfont icon-task';
            }
                // 结构
            else if (stencilItem.icon == 'activity/expanded.subprocess.png') { // 子流程
                stencilItem.vectoricon = 'iconfont icon-ziliucheng';
            }
            else if (stencilItem.icon == 'activity/event.subprocess.png') { // 子流程事件
                stencilItem.vectoricon = 'iconfont icon-shijianziliucheng1';
            }
            else if (stencilItem.icon == 'activity/task.png') { // 呼叫活动
                stencilItem.vectoricon = 'iconfont icon-yuanjiaofangkuang1';
            }
                //else if (stencilItem.icon == 'activity/list/type.shell.png') {
                //    stencilItem.vectoricon = 'iconfont icon-yuanxing';
                //}
                //else if (stencilItem.icon == 'activity/subprocess.png') {
                //    stencilItem.vectoricon = 'iconfont icon-ziliucheng';
                //}
                //else if (stencilItem.icon == 'activity/event.subprocess.collapsed.png') {
                //    stencilItem.vectoricon = 'iconfont icon-yuanxing';
                //}
                // 网关
            else if (stencilItem.icon == 'gateway/exclusive.databased.png') {
                stencilItem.vectoricon = 'iconfont icon-gaojifenzhi-'; // 高级分支
            }
            else if (stencilItem.icon == 'gateway/parallel.png') {
                stencilItem.vectoricon = 'iconfont icon-binghang-'; // 并行分支
            }
            else if (stencilItem.icon == 'gateway/inclusive.png') {
                stencilItem.vectoricon = 'iconfont icon-baorongfenzhi-'; // 包容分支
            }
            else if (stencilItem.icon == 'gateway/eventbased.png') {
                stencilItem.vectoricon = 'iconfont icon-shijianfenzhi-'; // 事件分支
            }
                // 边界事件
            else if (stencilItem.icon == 'catching/error.png') {
                stencilItem.vectoricon = 'iconfont icon-cuowushijian';
            }
            else if (stencilItem.icon == 'catching/timer.png') {
                stencilItem.vectoricon = 'iconfont icon-dingshishijian';
            }
            else if (stencilItem.icon == 'catching/signal.png') {
                stencilItem.vectoricon = 'iconfont icon-xinhaoshijian1';
            }
            else if (stencilItem.icon == 'catching/message.png') {
                stencilItem.vectoricon = 'iconfont icon-xiaoxishijian';
            }
            else if (stencilItem.icon == 'catching/cancel.png') { // 边界取消事件
                stencilItem.vectoricon = 'iconfont icon-bianjiequxiaoshijian';
            }
            else if (stencilItem.icon == 'catching/compensation.png') { // 边界补偿事件
                stencilItem.vectoricon = 'iconfont icon-bianjiebuchangshijian';
            }
                ////////////////////////////////////////////////////////////////////////////////
                // 中间定时器捕获事件
                // 中间信号捕获事件
                // 中间消息捕获事件
                ////////////////////////////////////////////////////////////////////////////////

                // 中间触发事件
            else if (stencilItem.icon == 'throwing/none.png') {
                stencilItem.vectoricon = 'iconfont icon-zhongjiankong';
            }
            else if (stencilItem.icon == 'throwing/signal.png') {
                stencilItem.vectoricon = 'iconfont icon-zhongjianxinhaobuhuoshijian';
            }
                // 结束事件
            else if (stencilItem.icon == 'endevent/none.png') {
                stencilItem.vectoricon = 'iconfont icon-yuanxing';
            }
            else if (stencilItem.icon == 'endevent/error.png') { // 结束错误事件
                stencilItem.vectoricon = 'iconfont icon-jieshucuowushijian';
            }
            else if (stencilItem.icon == 'endevent/cancel.png') {
                stencilItem.vectoricon = 'iconfont icon-cuowu';
            }
            else if (stencilItem.icon == 'endevent/terminate.png') { // 结束终止事件
                stencilItem.vectoricon = 'iconfont icon-jieshuzhongzhishijian';
            }
                // 泳道
            else if (stencilItem.icon == 'swimlane/lane.png') {
                stencilItem.vectoricon = 'iconfont icon-lane';
            }
            else if (stencilItem.icon == 'swimlane/pool.png') {
                stencilItem.vectoricon = 'iconfont icon-liuchengchi';
            }
                // 构件
            else if (stencilItem.icon == 'artifact/text.annotation.png') {
                stencilItem.vectoricon = 'iconfont icon-wenbenzhushi';
            }
            else if (stencilItem.icon == 'connector/sequenceflow.png') {
                stencilItem.vectoricon = 'iconfont icon-jiantou';
                //stencilItem.vectoricon = 'iconfont icon-shunxuliudingyihuodongdezhihangshunxu';
            }
            else if (stencilItem.icon == 'connector/association.undirected.png') {
                stencilItem.vectoricon = 'iconfont icon-lianxiwenbenzhushiyuduixiang';
            }
            //else if (stencilItem.icon == 'connector/association.unidirectional.png') {
            //    stencilItem.vectoricon = 'icon-yuanxing';
            //}
            //else if (stencilItem.icon == 'connector/messageflow.png') {
            //    stencilItem.vectoricon = 'icon-yuanxing';
            //}
            //else if (stencilItem.icon == 'dataobject/data.store.png') {
            //    stencilItem.vectoricon = 'icon-yuanxing';
            //}



            //    }
            //}
        };

        $scope.morphShape = function () {
            $scope.safeApply(function () {

                var shapes = $rootScope.editor.getSelection();
                if (shapes && shapes.length == 1) {
                    $rootScope.currentSelectedShape = shapes.first();
                    var stencilItem = $scope.getStencilItemById($rootScope.currentSelectedShape.getStencil().idWithoutNs());
                    var morphShapes = [];
                    for (var i = 0; i < $scope.morphRoles.length; i++) {
                        if ($scope.morphRoles[i].role === stencilItem.morphRole) {
                            morphShapes = $scope.morphRoles[i].morphOptions.slice();
                        }
                    }

                    // Method to open shape select dialog (used later on)
                    var showSelectShapeDialog = function () {
                        $rootScope.morphShapes = morphShapes;
                        $modal({
                            backdrop: false,
                            keyboard: true,
                            template: 'editor-app/popups/select-shape.html?version=' + Date.now()
                        });
                    };

                    showSelectShapeDialog();
                }
            });
        };

        $scope.deleteShape = function () {
            KISBPM.TOOLBAR.ACTIONS.deleteItem({ '$scope': $scope });
        };

        $scope.quickAddItem = function (newItemId) {
            $scope.safeApply(function () {

                var shapes = $rootScope.editor.getSelection();
                if (shapes && shapes.length == 1) {
                    $rootScope.currentSelectedShape = shapes.first();

                    var containedStencil = undefined;
                    var stencilSets = $scope.editor.getStencilSets().values();
                    for (var i = 0; i < stencilSets.length; i++) {
                        var stencilSet = stencilSets[i];
                        var nodes = stencilSet.nodes();
                        for (var j = 0; j < nodes.length; j++) {
                            if (nodes[j].idWithoutNs() === newItemId) {
                                containedStencil = nodes[j];
                                break;
                            }
                        }
                    }

                    if (!containedStencil) return;

                    var option = { type: $scope.currentSelectedShape.getStencil().namespace() + newItemId, namespace: $scope.currentSelectedShape.getStencil().namespace() };
                    option['connectedShape'] = $rootScope.currentSelectedShape;
                    option['parent'] = $rootScope.currentSelectedShape.parent;
                    option['containedStencil'] = containedStencil;

                    var args = { sourceShape: $rootScope.currentSelectedShape, targetStencil: containedStencil };
                    var targetStencil = $scope.editor.getRules().connectMorph(args);
                    if (!targetStencil) { return; }// Check if there can be a target shape
                    option['connectingType'] = targetStencil.id();

                    var command = new KISBPM.CreateCommand(option, undefined, undefined, $scope.editor);

                    $scope.editor.executeCommands([command]);

                    // 2017.12.23：控制改变拖动添加的用户任务和手动任务节点的颜色
                    //$scope.changeDomNodeStyle();
                }
            });
        };

    }); // end of $scope.editorFactory.promise block
    // 20190123：属性项点击事件
    $scope.propertyClicked = function (index) {

        if (!$scope.selectedItem.properties[index].hidden) {
            if ('oryx-formkeydefinition' == $scope.selectedItem.properties[index].key) {

                // 20190122:点击模块信息（表单键(key)）的按钮，调用父窗口页面定义的方法，
                // 弹出模块选择界面，选择模块信息后，获取选择的多个模块信息对象数据，传递流程属性面板中
                if (parent) {
                    if (parent.workflowModelSel) {

                        // 20190122：提供父页面调用的传入绑定表单信息的方法
                        parent.setWorkflowNodeModelInfo = $scope.setWorkflowNodeModelInfo;

                        // 20190122：传递已经保存的模块信息串，初始没有的话就传空
                        parent.workflowModelSel($scope.selectedItem.properties[index].value);
                        //parent.workflowModelSel($scope.selectedItem.properties[index].nodeModelInfo);
                    }
                }
                //$scope.setWorkflowNodeModelInfo("");
            }
            else {
                $scope.selectedItem.properties[index].mode = "write";
            }
        }
    };

    // 20190122:设置节点绑定的表单信息
    $scope.setWorkflowNodeModelInfo = function (paraModelInfo) {

        // 20190122：从弹出的页面中获取字符串数据
        var objModels = JSON.parse(paraModelInfo);
        //var objModels;

        if ($scope.selectedShape)
        {
            if ($scope.selectedShape.properties) {
                $scope.selectedShape.properties['oryx-formkeydefinition'] = paraModelInfo;
            }
        }

        //var indexTmp = 13;
        //if ($scope.selectedItem.properties.length > indexTmp) {
        //    if (!$scope.selectedItem.properties[indexTmp].hidden) {
        //        if ('oryx-formkeydefinition' == $scope.selectedItem.properties[indexTmp].key) {
        //            $scope.selectedItem.properties[indexTmp].value = "aaaaaaaaaaaaaaaaaaaaaaaa";

        //            //$scope.selectedItem.properties[indexTmp].value = paraModelInfo;
        //            //$scope.selectedItem.properties[indexTmp].nodeModelInfo = paraModelInfo;
        //        }
        //    }
        //}

        // 20190122:根据从弹框中选择的模块信息更新编辑框数据
        if (objModels&&objModels.modulesInfo)
        {
            if(objModels.modulesInfo.length)
            {
                if (objModels.modulesInfo.length > 0) {
                    $scope.modelInfo = objModels.modulesInfo.length + '模块信息';
                    //$scope.selectedShape
                    //var oldValue = shape.properties[key]
                }
            }
        }
    };

    /* Click handler for clicking a property */
    $scope.eventTabClicked = function () {
        //
        //alert("aaaaaaaaaa");
    };

    /* Helper method to retrieve the template url for a property */
    $scope.getPropertyTemplateUrl = function (index) {
        //
        return $scope.selectedItem.properties[index].templateUrl;
    };
    $scope.getPropertyReadModeTemplateUrl = function (index) {
        //
        return $scope.selectedItem.properties[index].readModeTemplateUrl;
    };
    $scope.getPropertyWriteModeTemplateUrl = function (index) {
        //
        return $scope.selectedItem.properties[index].writeModeTemplateUrl;
    };

    /* Method available to all sub controllers (for property controllers) to update the internal Oryx model */
    $scope.updatePropertyInModel = function (property, shapeId) {

        var shape = $scope.selectedShape;
        // Some updates may happen when selected shape is already changed, so when an additional
        // shapeId is supplied, we need to make sure the correct shape is updated (current or previous)
        if (shapeId) {
            if (shape.id != shapeId && $scope.previousSelectedShape && $scope.previousSelectedShape.id == shapeId) {
                shape = $scope.previousSelectedShape;
            } else {
                shape = null;
            }
        }

        if (!shape) {
            // When no shape is selected, or no shape is found for the alternative
            // shape ID, do nothing
            return;
        }
        var key = property.key;
        var newValue = property.value;
        var oldValue = shape.properties[key];

        if (newValue != oldValue) {
            var commandClass = ORYX.Core.Command.extend({
                construct: function () {
                    this.key = key;
                    this.oldValue = oldValue;
                    this.newValue = newValue;
                    this.shape = shape;
                    this.facade = $scope.editor;
                },
                execute: function () {
                    this.shape.setProperty(this.key, this.newValue);
                    this.facade.getCanvas().update();
                    this.facade.updateSelection();
                },
                rollback: function () {
                    this.shape.setProperty(this.key, this.oldValue);
                    this.facade.getCanvas().update();
                    this.facade.updateSelection();
                }
            });
            // Instantiate the class
            var command = new commandClass();

            // Execute the command
            $scope.editor.executeCommands([command]);
            $scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_PROPWINDOW_PROP_CHANGED,
                elements: [shape],
                key: key
            });

            // Switch the property back to read mode, now the update is done
            property.mode = 'read';

            // Fire event to all who is interested
            // Fire event to all who want to know about this
            var event = {
                type: KISBPM.eventBus.EVENT_TYPE_PROPERTY_VALUE_CHANGED,
                property: property,
                oldValue: oldValue,
                newValue: newValue
            };
            KISBPM.eventBus.dispatch(event.type, event);
        } else {
            // Switch the property back to read mode, no update was needed
            property.mode = 'read';
        }

    };

    /**
     * Helper method that searches a group for an item with the given id.
     * If not found, will return undefined.
     */
    $scope.findStencilItemInGroup = function (stencilItemId, group) {

        var item;

        // Check all items directly in this group
        for (var j = 0; j < group.items.length; j++) {
            item = group.items[j];
            if (item.id === stencilItemId) {
                return item;
            }
        }

        // Check the child groups
        if (group.groups && group.groups.length > 0) {
            for (var k = 0; k < group.groups.length; k++) {
                item = $scope.findStencilItemInGroup(stencilItemId, group.groups[k]);
                if (item) {
                    return item;
                }
            }
        }

        return undefined;
    };

    /**
     * Helper method to find a stencil item.
     */
    $scope.getStencilItemById = function (stencilItemId) {
        for (var i = 0; i < $scope.stencilItemGroups.length; i++) {
            var element = $scope.stencilItemGroups[i];

            // Real group
            if (element.items !== null && element.items !== undefined) {
                var item = $scope.findStencilItemInGroup(stencilItemId, element);
                if (item) {
                    return item;
                }
            } else { // Root stencil item
                if (element.id === stencilItemId) {
                    return element;
                }
            }
        }
        return undefined;
    };

    /*
     * DRAG AND DROP FUNCTIONALITY
     */

    $scope.dropCallback = function (event, ui) {
        $scope.editor.handleEvents({
            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
            highlightId: "shapeRepo.attached"
        });
        $scope.editor.handleEvents({
            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
            highlightId: "shapeRepo.added"
        });

        $scope.editor.handleEvents({
            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
            highlightId: "shapeMenu"
        });

        KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_HIDE_SHAPE_BUTTONS);

        if ($scope.dragCanContain) {

            var item = $scope.getStencilItemById(ui.draggable[0].id);

            var pos = { x: event.pageX, y: event.pageY };

            var additionalIEZoom = 1;
            if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
                var ua = navigator.userAgent;
                if (ua.indexOf('MSIE') >= 0) {
                    //IE 10 and below
                    var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100);
                    if (zoom !== 100) {
                        additionalIEZoom = zoom / 100;
                    }
                }
            }

            var screenCTM = $scope.editor.getCanvas().node.getScreenCTM();

            // Correcting the UpperLeft-Offset
            pos.x -= (screenCTM.e / additionalIEZoom);
            pos.y -= (screenCTM.f / additionalIEZoom);
            // Correcting the Zoom-Factor
            pos.x /= screenCTM.a;
            pos.y /= screenCTM.d;

            // Correcting the ScrollOffset
            pos.x -= document.documentElement.scrollLeft;
            pos.y -= document.documentElement.scrollTop;

            var parentAbs = $scope.dragCurrentParent.absoluteXY();
            pos.x -= parentAbs.x;
            pos.y -= parentAbs.y;

            var containedStencil = undefined;
            var stencilSets = $scope.editor.getStencilSets().values();
            for (var i = 0; i < stencilSets.length; i++) {
                var stencilSet = stencilSets[i];
                var nodes = stencilSet.nodes();
                for (var j = 0; j < nodes.length; j++) {
                    if (nodes[j].idWithoutNs() === ui.draggable[0].id) {
                        containedStencil = nodes[j];
                        break;
                    }
                }

                if (!containedStencil) {
                    var edges = stencilSet.edges();
                    for (var j = 0; j < edges.length; j++) {
                        if (edges[j].idWithoutNs() === ui.draggable[0].id) {
                            containedStencil = edges[j];
                            break;
                        }
                    }
                }
            }

            if (!containedStencil) return;

            if ($scope.quickMenu) {
                var shapes = $scope.editor.getSelection();
                if (shapes && shapes.length == 1) {
                    var currentSelectedShape = shapes.first();

                    var option = {};
                    option.type = currentSelectedShape.getStencil().namespace() + ui.draggable[0].id;
                    option.namespace = currentSelectedShape.getStencil().namespace();
                    option.connectedShape = currentSelectedShape;
                    option.parent = $scope.dragCurrentParent;
                    option.containedStencil = containedStencil;

                    // If the ctrl key is not pressed, 
                    // snapp the new shape to the center 
                    // if it is near to the center of the other shape
                    if (!event.ctrlKey) {
                        // Get the center of the shape
                        var cShape = currentSelectedShape.bounds.center();
                        // Snapp +-20 Pixel horizontal to the center 
                        if (20 > Math.abs(cShape.x - pos.x)) {
                            pos.x = cShape.x;
                        }
                        // Snapp +-20 Pixel vertical to the center 
                        if (20 > Math.abs(cShape.y - pos.y)) {
                            pos.y = cShape.y;
                        }
                    }

                    option.position = pos;

                    if (containedStencil.idWithoutNs() !== 'SequenceFlow' && containedStencil.idWithoutNs() !== 'Association' &&
                            containedStencil.idWithoutNs() !== 'MessageFlow' && containedStencil.idWithoutNs() !== 'DataAssociation') {
                        var args = { sourceShape: currentSelectedShape, targetStencil: containedStencil };
                        var targetStencil = $scope.editor.getRules().connectMorph(args);
                        if (!targetStencil) { return; }// Check if there can be a target shape
                        option.connectingType = targetStencil.id();
                    }

                    var command = new KISBPM.CreateCommand(option, $scope.dropTargetElement, pos, $scope.editor);

                    $scope.editor.executeCommands([command]);
                }
            }
            else {
                var canAttach = false;
                if (containedStencil.idWithoutNs() === 'BoundaryErrorEvent' || containedStencil.idWithoutNs() === 'BoundaryTimerEvent' ||
                    containedStencil.idWithoutNs() === 'BoundarySignalEvent' || containedStencil.idWithoutNs() === 'BoundaryMessageEvent' ||
                    containedStencil.idWithoutNs() === 'BoundaryCancelEvent' || containedStencil.idWithoutNs() === 'BoundaryCompensationEvent') {
                    // Modify position, otherwise boundary event will get position related to left corner of the canvas instead of the container
                    pos = $scope.editor.eventCoordinates(event);
                    canAttach = true;
                }

                var option = {};
                option['type'] = $scope.modelData.model.stencilset.namespace + item.id;
                option['namespace'] = $scope.modelData.model.stencilset.namespace;
                option['position'] = pos;
                option['parent'] = $scope.dragCurrentParent;

                var commandClass = ORYX.Core.Command.extend({
                    construct: function (option, dockedShape, canAttach, position, facade) {
                        this.option = option;
                        this.docker = null;
                        this.dockedShape = dockedShape;
                        this.dockedShapeParent = dockedShape.parent || facade.getCanvas();
                        this.position = position;
                        this.facade = facade;
                        this.selection = this.facade.getSelection();
                        this.shape = null;
                        this.parent = null;
                        this.canAttach = canAttach;
                    },
                    execute: function () {
                        if (!this.shape) {
                            this.shape = this.facade.createShape(option);
                            this.parent = this.shape.parent;
                        } else if (this.parent) {
                            this.parent.add(this.shape);
                        }

                        if (this.canAttach && this.shape.dockers && this.shape.dockers.length) {
                            this.docker = this.shape.dockers[0];

                            this.dockedShapeParent.add(this.docker.parent);

                            // Set the Docker to the new Shape
                            this.docker.setDockedShape(undefined);
                            this.docker.bounds.centerMoveTo(this.position);
                            if (this.dockedShape !== this.facade.getCanvas()) {
                                this.docker.setDockedShape(this.dockedShape);
                            }
                            this.facade.setSelection([this.docker.parent]);
                        }

                        this.facade.getCanvas().update();
                        this.facade.updateSelection();

                    },
                    rollback: function () {
                        if (this.shape) {
                            this.facade.setSelection(this.selection.without(this.shape));
                            this.facade.deleteShape(this.shape);
                        }
                        if (this.canAttach && this.docker) {
                            this.docker.setDockedShape(undefined);
                        }
                        this.facade.getCanvas().update();
                        this.facade.updateSelection();

                    }
                });

                // Update canvas
                var command = new commandClass(option, $scope.dragCurrentParent, canAttach, pos, $scope.editor);
                $scope.editor.executeCommands([command]);

                // Fire event to all who want to know about this
                var dropEvent = {
                    type: KISBPM.eventBus.EVENT_TYPE_ITEM_DROPPED,
                    droppedItem: item,
                    position: pos
                };
                KISBPM.eventBus.dispatch(dropEvent.type, dropEvent);
            }
        }

        $scope.dragCurrentParent = undefined;
        $scope.dragCurrentParentId = undefined;
        $scope.dragCurrentParentStencil = undefined;
        $scope.dragCanContain = undefined;
        $scope.quickMenu = undefined;
        $scope.dropTargetElement = undefined;

        // 2017.12.23：控制改变拖动添加的用户任务和手动任务节点的颜色
        //$scope.changeDomNodeStyle();
    };

    // 2018.01.09:因为通过服务器文件stencilset.json控制了流程节点头像的绘制，所以此处注释掉
    // 2017.12.23：控制改变拖动添加的用户任务和手动任务节点的颜色
    $scope.changeDomNodeStyle = function () {

        //// 2017.12.23：用户任务
        //jQuery('svg').find('[id*=userTask]').find('path').attr({
        //    'style': 'fill: #227fff; stroke: none;'
        //});

        //// 2017.12.23：手动任务
        //jQuery('svg').find('[id*=manualTask]').find('path').attr({
        //    'style': 'fill: #227fff; stroke: none;'
        //});
    };


    $scope.overCallback = function (event, ui) {
        $scope.dragModeOver = true;
    };

    $scope.outCallback = function (event, ui) {
        $scope.dragModeOver = false;
    };

    $scope.startDragCallback = function (event, ui) {
        $scope.dragModeOver = false;
        $scope.quickMenu = false;
        if (!ui.helper.hasClass('stencil-item-dragged')) {
            ui.helper.addClass('stencil-item-dragged');
        }
    };

    $scope.startDragCallbackQuickMenu = function (event, ui) {
        $scope.dragModeOver = false;
        $scope.quickMenu = true;
    };

    // 2017.12.23:鼠标拖动节点列表中的节点元素添加节点
    $scope.dragCallback = function (event, ui) {

        if ($scope.dragModeOver != false) {

            var coord = $scope.editor.eventCoordinatesXY(event.pageX, event.pageY);

            var additionalIEZoom = 1;
            if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
                var ua = navigator.userAgent;
                if (ua.indexOf('MSIE') >= 0) {
                    //IE 10 and below
                    var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100);
                    if (zoom !== 100) {
                        additionalIEZoom = zoom / 100
                    }
                }
            }

            if (additionalIEZoom !== 1) {
                coord.x = coord.x / additionalIEZoom;
                coord.y = coord.y / additionalIEZoom;
            }

            var aShapes = $scope.editor.getCanvas().getAbstractShapesAtPosition(coord);

            if (aShapes.length <= 0) {
                if (event.helper) {
                    $scope.dragCanContain = false;
                    return false;
                }
            }

            if (aShapes[0] instanceof ORYX.Core.Canvas) {
                $scope.editor.getCanvas().setHightlightStateBasedOnX(coord.x);
            }

            if (aShapes.length == 1 && aShapes[0] instanceof ORYX.Core.Canvas) {
                var parentCandidate = aShapes[0];

                $scope.dragCanContain = true;
                $scope.dragCurrentParent = parentCandidate;
                $scope.dragCurrentParentId = parentCandidate.id;

                $scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                    highlightId: "shapeRepo.attached"
                });
                $scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                    highlightId: "shapeRepo.added"
                });
                return false;
            }
            else {
                var item = $scope.getStencilItemById(event.target.id);

                var parentCandidate = aShapes.reverse().find(function (candidate) {
                    return (candidate instanceof ORYX.Core.Canvas
                        || candidate instanceof ORYX.Core.Node
                        || candidate instanceof ORYX.Core.Edge);
                });

                if (!parentCandidate) {
                    $scope.dragCanContain = false;
                    return false;
                }

                if (item.type === "node") {

                    // check if the draggable is a boundary event and the parent an Activity
                    var _canContain = false;
                    var parentStencilId = parentCandidate.getStencil().id();

                    if ($scope.dragCurrentParentId && $scope.dragCurrentParentId === parentCandidate.id) {
                        return false;
                    }

                    var parentItem = $scope.getStencilItemById(parentCandidate.getStencil().idWithoutNs());
                    if (parentItem.roles.indexOf("Activity") > -1) {
                        if (item.roles.indexOf("IntermediateEventOnActivityBoundary") > -1) {
                            _canContain = true;
                        }
                    }
                    else if (parentCandidate.getStencil().idWithoutNs() === 'Pool') {
                        if (item.id === 'Lane') {
                            _canContain = true;
                        }
                    }

                    if (_canContain) {
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                            highlightId: "shapeRepo.attached",
                            elements: [parentCandidate],
                            style: ORYX.CONFIG.SELECTION_HIGHLIGHT_STYLE_RECTANGLE,
                            color: ORYX.CONFIG.SELECTION_VALID_COLOR
                        });

                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId: "shapeRepo.added"
                        });
                    }
                    else {
                        for (var i = 0; i < $scope.containmentRules.length; i++) {
                            var rule = $scope.containmentRules[i];
                            if (rule.role === parentItem.id) {
                                for (var j = 0; j < rule.contains.length; j++) {
                                    if (item.roles.indexOf(rule.contains[j]) > -1) {
                                        _canContain = true;
                                        break;
                                    }
                                }

                                if (_canContain) {
                                    break;
                                }
                            }
                        }

                        // Show Highlight
                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                            highlightId: 'shapeRepo.added',
                            elements: [parentCandidate],
                            color: _canContain ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
                        });

                        $scope.editor.handleEvents({
                            type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                            highlightId: "shapeRepo.attached"
                        });
                    }

                    $scope.dragCurrentParent = parentCandidate;
                    $scope.dragCurrentParentId = parentCandidate.id;
                    $scope.dragCurrentParentStencil = parentStencilId;
                    $scope.dragCanContain = _canContain;

                } else {
                    var canvasCandidate = $scope.editor.getCanvas();
                    var canConnect = false;

                    var targetStencil = $scope.getStencilItemById(parentCandidate.getStencil().idWithoutNs());
                    if (targetStencil) {
                        var associationConnect = false;
                        if (stencil.idWithoutNs() === 'Association' && (curCan.getStencil().idWithoutNs() === 'TextAnnotation' || curCan.getStencil().idWithoutNs() === 'BoundaryCompensationEvent')) {
                            associationConnect = true;
                        } else if (stencil.idWithoutNs() === 'DataAssociation' && curCan.getStencil().idWithoutNs() === 'DataStore') {
                            associationConnect = true;
                        }

                        if (targetStencil.canConnectTo || associationConnect) {
                            canConnect = true;
                        }
                    }

                    //Edge
                    $scope.dragCurrentParent = canvasCandidate;
                    $scope.dragCurrentParentId = canvasCandidate.id;
                    $scope.dragCurrentParentStencil = canvasCandidate.getStencil().id();
                    $scope.dragCanContain = canConnect;

                    // Show Highlight
                    $scope.editor.handleEvents({
                        type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                        highlightId: 'shapeRepo.added',
                        elements: [canvasCandidate],
                        color: ORYX.CONFIG.SELECTION_VALID_COLOR
                    });

                    $scope.editor.handleEvents({
                        type: ORYX.CONFIG.EVENT_HIGHLIGHT_HIDE,
                        highlightId: "shapeRepo.attached"
                    });
                }
            }
        }
    };

    $scope.dragCallbackQuickMenu = function (event, ui) {

        if ($scope.dragModeOver != false) {
            var coord = $scope.editor.eventCoordinatesXY(event.pageX, event.pageY);

            var additionalIEZoom = 1;
            if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
                var ua = navigator.userAgent;
                if (ua.indexOf('MSIE') >= 0) {
                    //IE 10 and below
                    var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100);
                    if (zoom !== 100) {
                        additionalIEZoom = zoom / 100
                    }
                }
            }

            if (additionalIEZoom !== 1) {
                coord.x = coord.x / additionalIEZoom;
                coord.y = coord.y / additionalIEZoom;
            }

            var aShapes = $scope.editor.getCanvas().getAbstractShapesAtPosition(coord);

            if (aShapes.length <= 0) {
                if (event.helper) {
                    $scope.dragCanContain = false;
                    return false;
                }
            }

            if (aShapes[0] instanceof ORYX.Core.Canvas) {
                $scope.editor.getCanvas().setHightlightStateBasedOnX(coord.x);
            }

            var stencil = undefined;
            var stencilSets = $scope.editor.getStencilSets().values();
            for (var i = 0; i < stencilSets.length; i++) {
                var stencilSet = stencilSets[i];
                var nodes = stencilSet.nodes();
                for (var j = 0; j < nodes.length; j++) {
                    if (nodes[j].idWithoutNs() === event.target.id) {
                        stencil = nodes[j];
                        break;
                    }
                }

                if (!stencil) {
                    var edges = stencilSet.edges();
                    for (var j = 0; j < edges.length; j++) {
                        if (edges[j].idWithoutNs() === event.target.id) {
                            stencil = edges[j];
                            break;
                        }
                    }
                }
            }

            var candidate = aShapes.last();

            var isValid = false;
            if (stencil) {
                if (stencil.type() === "node") {
                    //check containment rules
                    var canContain = $scope.editor.getRules().canContain({ containingShape: candidate, containedStencil: stencil });

                    var parentCandidate = aShapes.reverse().find(function (candidate) {
                        return (candidate instanceof ORYX.Core.Canvas
                            || candidate instanceof ORYX.Core.Node
                            || candidate instanceof ORYX.Core.Edge);
                    });

                    if (!parentCandidate) {
                        $scope.dragCanContain = false;
                        return false;
                    }

                    $scope.dragCurrentParent = parentCandidate;
                    $scope.dragCurrentParentId = parentCandidate.id;
                    $scope.dragCurrentParentStencil = parentCandidate.getStencil().id();
                    $scope.dragCanContain = canContain;
                    $scope.dropTargetElement = parentCandidate;
                    isValid = canContain;

                } else { //Edge

                    var shapes = $scope.editor.getSelection();
                    if (shapes && shapes.length == 1) {
                        var currentSelectedShape = shapes.first();
                        var curCan = candidate;
                        var canConnect = false;

                        var targetStencil = $scope.getStencilItemById(curCan.getStencil().idWithoutNs());
                        if (targetStencil) {
                            var associationConnect = false;
                            if (stencil.idWithoutNs() === 'Association' && (curCan.getStencil().idWithoutNs() === 'TextAnnotation' || curCan.getStencil().idWithoutNs() === 'BoundaryCompensationEvent')) {
                                associationConnect = true;
                            }
                            else if (stencil.idWithoutNs() === 'DataAssociation' && curCan.getStencil().idWithoutNs() === 'DataStore') {
                                associationConnect = true;
                            }

                            if (targetStencil.canConnectTo || associationConnect) {
                                while (!canConnect && curCan && !(curCan instanceof ORYX.Core.Canvas)) {
                                    candidate = curCan;
                                    //check connection rules
                                    canConnect = $scope.editor.getRules().canConnect({
                                        sourceShape: currentSelectedShape,
                                        edgeStencil: stencil,
                                        targetShape: curCan
                                    });
                                    curCan = curCan.parent;
                                }
                            }
                        }
                        var parentCandidate = $scope.editor.getCanvas();

                        isValid = canConnect;
                        $scope.dragCurrentParent = parentCandidate;
                        $scope.dragCurrentParentId = parentCandidate.id;
                        $scope.dragCurrentParentStencil = parentCandidate.getStencil().id();
                        $scope.dragCanContain = canConnect;
                        $scope.dropTargetElement = candidate;
                    }

                }
            }

            $scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_HIGHLIGHT_SHOW,
                highlightId: 'shapeMenu',
                elements: [candidate],
                color: isValid ? ORYX.CONFIG.SELECTION_VALID_COLOR : ORYX.CONFIG.SELECTION_INVALID_COLOR
            });
        }
    };

    // 2017.10.28 check fault
    // 2017.09.29 保存数据的接口
    if (!window.hwv) window.hwv = {};

    // 2017.12.01:外部调用绑定表单到表单键
    $scope.saveModel = function (taskNodeid, moduleid, successCallback) {
        var json = $scope.editor.getJSONExt();
        for (var p = 0; p < json.childShapes.length; p++) {
            if (json.childShapes[p].resourceId == taskNodeid) {
                json.childShapes[p].properties.formkeydefinition = moduleid;// 2017.12.01:外部调用绑定表单到表单键
            }
        }
        var modelMetaData = $scope.editor.getModelMetaData();
        json = JSON.stringify(json);
        var params = {
            json_xml: json
        };
        // Update
        // 2017.12.01:将外部调用saveModel传入的串保存入库
        $http({
            method: 'PUT',
            data: params,
            ignoreErrors: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            url: KISBPM.URL.putModeljson(modelMetaData.modelId)
        })

            .success(function (data, status, headers, config) {
                $scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_SAVED
                });
                // Execute any callback
                if (successCallback) {
                    successCallback();
                }

            })
            .error(function (data, status, headers, config) {
                $scope.error = {};
                alert('Something went wrong when updating the process model:' + JSON.stringify(data));
                $scope.status.loading = false;
            });
    };
    window.hwv.saveModel = $scope.saveModel;

    // 2017.12.01:外部调用绑定表单到表单键
    $scope.bindNodeForm = function (taskNodeid, moduleid, successCallback) {
        var json = $scope.editor.getJSONExt();
        if (!$scope.bindNodeModelId(taskNodeid, moduleid, json.childShapes)) {
            return;
        }
        var modelMetaData = $scope.editor.getModelMetaData();
        json = JSON.stringify(json);
        var params = {
            json_xml: json
        };

        // 2017.12.05:增加了用户登录认证
        var urlServiceAddr = KISBPM.URL.putModeljson(modelMetaData.modelId);
        var urlService = urlServiceAddr + "?info=kermit";
        //var einfo = Ext.util.Cookies.get('ecyLogin');
        var einfo = jQuery.cookie('ecyLogin');
        if (einfo && einfo != undefined && einfo != "undefined") {
            urlService = urlServiceAddr + "?einfo=" + einfo;
        } else {
            //var info = Ext.util.Cookies.get('login');
            var info = jQuery.cookie('login');
            if (!info || info == undefined || info == "undefined") {
                info = "kermit";
            }
            urlService = urlServiceAddr + "?info=" + info;
        }

        // Update
        // 2017.12.01:将外部调用bindNodeForm传入的串保存入库
        $http({
            method: 'PUT',
            data: params,
            ignoreErrors: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            url: urlService // 
            //url: KISBPM.URL.putModeljson(modelMetaData.modelId) // 
        })
            .success(function (data, status, headers, config) {
                $scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_SAVED
                });
                // Execute any callback
                if (successCallback) {
                    successCallback();
                }

            })
            .error(function (data, status, headers, config) {
                $scope.error = {};
                alert('Something went wrong when updating the process model:' + JSON.stringify(data));
                $scope.status.loading = false;
            });
    };


 // 20190129 成兵外部调用绑定表单到表单键,传入多个id一起绑定
    $scope.bindNodesForm = function (arrNodesid, successCallback) {
        var json = $scope.editor.getJSON();
        //var json = $scope.editor.getJSONExt();
        for (var i = 0; i < arrNodesid.length; i++) {
            if (!$scope.bindNodeModelId(arrNodesid[i].nodeId, arrNodesid[i].modulesInfo, json.childShapes)) {
                return false;
            }
        }
        var modelMetaData = $scope.editor.getModelMetaData();
        json = JSON.stringify(json);
        var params = {
            json_xml: json
        };

        // 2017.12.05:增加了用户登录认证
        var urlServiceAddr = KISBPM.URL.putModeljson(modelMetaData.modelId);
        var urlService = urlServiceAddr + "?info=kermit";
        //var einfo = Ext.util.Cookies.get('ecyLogin');
        var einfo = jQuery.cookie('ecyLogin');
        if (einfo && einfo != undefined && einfo != "undefined") {
            urlService = urlServiceAddr + "?einfo=" + einfo;
        } else {
            //var info = Ext.util.Cookies.get('login');
            var info = jQuery.cookie('login');
            if (!info || info == undefined || info == "undefined") {
                info = "kermit";
            }
            urlService = urlServiceAddr + "?info=" + info;
        }

        // Update
        // 2017.12.01:将外部调用bindNodeForm传入的串保存入库
        $http({
            method: 'PUT',
            data: params,
            ignoreErrors: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            url: urlService // 
            //url: KISBPM.URL.putModeljson(modelMetaData.modelId) // 
        })
            .success(function (data, status, headers, config) {
                $scope.editor.handleEvents({
                    type: ORYX.CONFIG.EVENT_SAVED
                });
                // Execute any callback
                if (successCallback) {
                    successCallback();
                }

            })
            .error(function (data, status, headers, config) {
                $scope.error = {};
                alert('Something went wrong when updating the process model:' + JSON.stringify(data));
                $scope.status.loading = false;
            });
    };





    // 2017.12.28:控制属性面板Tab页的显示隐藏
    $scope.showPropertiesTabs = function () {
        //debugger;
        if (!$scope.selectedItem || !$scope.selectedItem.properties || !$scope.dhxTabbarProperties || !$scope.dhxTabbarProperties.tabs) {
            return;
        }
        //debugger;

        //$scope.dhxTabbarProperties.tabs("tabIdJbsx").setActive();
        //$scope.dhxTabbarProperties.tabs("tabIdBl").hide();
        //$scope.dhxTabbarProperties.tabs("tabIdSj").hide();
        //$scope.dhxTabbarProperties.tabs("tabIdHq").hide();
        //$scope.dhxTabbarProperties.tabs("tabIdYj").hide();

        var bShowTabBl = false; // 变量
        var bShowTabSj = false; // 事件
        var bShowTabHq = false; // 会签
        var bShowTabYj = false; // 邮件

        //var bShowTabBl = true; // 变量
        //var bShowTabSj = true; // 事件
        //var bShowTabHq = true; // 会签
        //var bShowTabYj = true; // 邮件
        //debugger;
        for (var i = 0; i < $scope.selectedItem.properties.length; i++) {
            if ($scope.selectedItem.properties[i].key == 'oryx-formproperties'
                || $scope.selectedItem.properties[i].key == 'oryx-formkeydefinition') {

                bShowTabBl = true; // 变量
            }
            else if ($scope.selectedItem.properties[i].key == 'oryx-executionlisteners'
                || $scope.selectedItem.properties[i].key == 'oryx-eventlisteners'
                || $scope.selectedItem.properties[i].key == 'oryx-tasklisteners') {

                bShowTabSj = true; // 事件
            }
            else if ($scope.selectedItem.properties[i].key == 'oryx-multiinstance_type'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_cardinality'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_collection'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_variable'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_condition') {

                bShowTabHq = true; // 会签
            }
            else if ($scope.selectedItem.properties[i].key == 'oryx-mailtaskto'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskfrom'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtasksubject'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskcc'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskbcc'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtasktext'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskhtml'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskcharset') {

                bShowTabYj = true; // 邮件
            }
        }
        //debugger;
        // 变量
        if (bShowTabBl) {
            //debugger;
            $scope.dhxTabbarProperties.tabs("tabIdBl").show();
            $scope.dhxTabbarProperties.tabs("tabIdBl").cell.style.visibility = "visible";
            //window.setTimeout(function () {

            //    $scope.dhxTabbarProperties.tabs("tabIdBl").show();
            //    $scope.dhxTabbarProperties.tabs("tabIdBl").cell.style.visibility = "visible";
            //},1500);
        }
        else {
            //debugger;
            $scope.dhxTabbarProperties.tabs("tabIdBl").hide();
        }
        // 事件
        if (bShowTabSj) {
            $scope.dhxTabbarProperties.tabs("tabIdSj").show();
        }
        else {
            $scope.dhxTabbarProperties.tabs("tabIdSj").hide();
        }
        // 会签
        if (bShowTabHq) {
            $scope.dhxTabbarProperties.tabs("tabIdHq").show();
        }
        else {
            $scope.dhxTabbarProperties.tabs("tabIdHq").hide();
        }
        // 邮件
        if (bShowTabYj) {
            $scope.dhxTabbarProperties.tabs("tabIdYj").show();
        }
        else {
            $scope.dhxTabbarProperties.tabs("tabIdYj").hide();
        }
    };


    $scope.showPropertiesTabs1 = function () {
        //debugger;
        if (!$scope.selectedItem || !$scope.selectedItem.properties || !$scope.dhxTabbarProperties || !$scope.dhxTabbarProperties.tabs) {
            return;
        }

        //var bShowTabBl = false; // 变量
        //var bShowTabSj = false; // 事件
        //var bShowTabHq = false; // 会签
        //var bShowTabYj = false; // 邮件

        var bShowTabBl = true; // 变量
        var bShowTabSj = true; // 事件
        var bShowTabHq = true; // 会签
        var bShowTabYj = true; // 邮件

        var bShowTabBl1 = false; // 变量
        var bShowTabSj1 = false; // 事件
        var bShowTabHq1 = false; // 会签
        var bShowTabYj1 = false; // 邮件

        //debugger;
        for (var i = 0; i < $scope.selectedItem.properties.length; i++) {
            if ($scope.selectedItem.properties[i].key == 'oryx-formproperties'
                || $scope.selectedItem.properties[i].key == 'oryx-formkeydefinition') {

                bShowTabBl1 = true; // 变量
            }
            else if ($scope.selectedItem.properties[i].key == 'oryx-executionlisteners'
                || $scope.selectedItem.properties[i].key == 'oryx-eventlisteners'
                || $scope.selectedItem.properties[i].key == 'oryx-tasklisteners') {

                bShowTabSj1 = true; // 事件
            }
            else if ($scope.selectedItem.properties[i].key == 'oryx-multiinstance_type'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_cardinality'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_collection'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_variable'
                || $scope.selectedItem.properties[i].key == 'oryx-multiinstance_condition') {

                bShowTabHq1 = true; // 会签
            }
            else if ($scope.selectedItem.properties[i].key == 'oryx-mailtaskto'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskfrom'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtasksubject'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskcc'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskbcc'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtasktext'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskhtml'
                || $scope.selectedItem.properties[i].key == 'oryx-mailtaskcharset') {

                bShowTabYj1 = true; // 邮件
            }
        }


        // 变量
        if (!bShowTabBl) {
        bShowTabBl = false; // 变量
        }
        // 事件
        if (!bShowTabSj) {
            bShowTabSj = false; // 事件
        }
        // 会签
        if (!bShowTabHq) {
            bShowTabHq = false; // 会签
        }
        // 邮件
        if (!bShowTabYj) {
            bShowTabYj = false; // 邮件
        }

        //debugger;
        // 变量
        if (bShowTabBl) {
            //debugger;
            $scope.dhxTabbarProperties.tabs("tabIdBl").show();
            $scope.dhxTabbarProperties.tabs("tabIdBl").cell.style.visibility = "visible";
            //window.setTimeout(function () {

            //    $scope.dhxTabbarProperties.tabs("tabIdBl").show();
            //    $scope.dhxTabbarProperties.tabs("tabIdBl").cell.style.visibility = "visible";
            //},1500);
        }
        else {
            //debugger;
            $scope.dhxTabbarProperties.tabs("tabIdBl").hide();
            $scope.dhxTabbarProperties.tabs("tabIdBl").cell.style.visibility = "hidden";
        }
        // 事件
        if (bShowTabSj) {
            $scope.dhxTabbarProperties.tabs("tabIdSj").show();
        }
        else {
            $scope.dhxTabbarProperties.tabs("tabIdSj").hide();
        }
        // 会签
        if (bShowTabHq) {
            $scope.dhxTabbarProperties.tabs("tabIdHq").show();
        }
        else {
            $scope.dhxTabbarProperties.tabs("tabIdHq").hide();
        }
        // 邮件
        if (bShowTabYj) {
            $scope.dhxTabbarProperties.tabs("tabIdYj").show();
        }
        else {
            $scope.dhxTabbarProperties.tabs("tabIdYj").hide();
        }
    };

    $scope.bindNodeModelId = function (taskNodeid, moduleid, arrChildShapes) {
        if (!taskNodeid || !moduleid || !arrChildShapes) {
            return false;
        }
        if (arrChildShapes.length <= 0) {
            return false;
        }
        for (var p = 0; p < arrChildShapes.length; p++) {
            if (arrChildShapes[p].properties.overrideid == taskNodeid) {
                arrChildShapes[p].properties.formkeydefinition = moduleid;// 2017.12.01:外部调用绑定表单到表单键

                return true;
            }
            else {
                if (arrChildShapes[p].childShapes) {
                    if (arrChildShapes[p].childShapes.length > 0) {
                        if ($scope.bindNodeModelId(taskNodeid, moduleid, arrChildShapes[p].childShapes)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    //20190129 chengbing 
     $scope.getNodeModuleInfo = function (taskNodeid)
     {
     var json = $scope.editor.getJSON();
     return $scope.getNodeModuleInfoById(taskNodeid,json.childShapes)
     }
    //20190129 chengbing 
     $scope.getNodeModuleInfoById = function (taskNodeid, arrChildShapes) {
        if (!taskNodeid  || !arrChildShapes) {
            return "";
        }
        if (arrChildShapes.length <= 0) {
            return "";
        }
        for (var p = 0; p < arrChildShapes.length; p++) {
            if (arrChildShapes[p].properties.overrideid == taskNodeid) {
                return arrChildShapes[p].properties.formkeydefinition; 
                break;
            }
            else {
                if (arrChildShapes[p].childShapes) {
                    if (arrChildShapes[p].childShapes.length > 0) {
                        return $scope.getNodeModuleInfoById(taskNodeid, arrChildShapes[p].childShapes)
                    }
                }
            }
        }
        return ""
    };

    window.hwv.bindNodeForm = $scope.bindNodeForm;
    if (parent) {
        parent.bindNodeForm = $scope.bindNodeForm;
    }
    //20190129成兵
    window.hwv.bindNodesForm = $scope.bindNodesForm;
    if (parent) {
        parent.bindNodesForm = $scope.bindNodesForm;
    }
    //20190129成兵
    window.hwv.getNodeModuleInfo = $scope.getNodeModuleInfo;
    if (parent) {
        parent.getNodeModuleInfo = $scope.getNodeModuleInfo;
    }
    //  $scope.aa = true;

    $scope.aa = function () {

        return true;
    }

}]);

appActivitiModeler.directive('borderdragPalettehelpwrapper', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attr) {
            //绑定需要拖拽改变大小的元素对象   
            bindResizeRight(document.getElementById('paletteHelpWrapper'));
        }
    }

    function bindResizeRight(el) {
        //初始化参数   
        var els = el.style;
        //鼠标的 X 和 Y 轴坐标   
        var x = 0;
        //var y = 0;

        var nMouseDownPtX = 0;
        var nMouseDownPtY = 0;

        var bBorderDragFlag = false; // 标识是否调整边界
        var bMoveDragFlag = false; // 标识是否调整边界
        var divCanvasHelpWrapper = document.getElementById('canvasHelpWrapper');
        var divPropertiesHelpWrapper = document.getElementById('propertiesHelpWrapper');
        //var divNodeStearch = document.getElementById('idNodeStearch');
        var divEditorheader = document.getElementById('editor-header');
        var nCanvasHelpWrapper = 0;
        var nPaletteHelpWrapper = 0;
        //var nCanvasHelpWrapper = divCanvasHelpWrapper.offsetWidth;
        //var nPaletteHelpWrapper = el.offsetWidth;
        //邪恶的食指   
        jQuery(el).mousedown(function (e) {
            //按下元素后，计算当前鼠标与对象计算后的坐标  
            x = e.clientX - (el.offsetLeft + el.offsetWidth);
            //x = e.clientX - el.offsetWidth;
            //y = e.clientY - el.offsetHeight;

            nMouseDownPtX = e.clientX - el.offsetLeft;
            nMouseDownPtY = e.clientY - el.offsetTop;

            // 树形节点和
            nCanvasHelpWrapper = divCanvasHelpWrapper.offsetWidth;
            nPaletteHelpWrapper = el.offsetWidth;

            bBorderDragFlag = true;
            //if (x > 0 && x < 5) {
            if (Math.abs(x) > 5) {
                bBorderDragFlag = false;
                //return;
            }

            bMoveDragFlag = false;
            // padding: 10px 0px 5px 8px;
            var nPaddingTop = 10;
            var nPaddingRight = 15;
            var nPaddingBtm = 5;
            var nPaddingLeft = 8;
            var nDraggingWid = 5;
            if ((e.clientX >= el.offsetLeft && e.clientX <= el.offsetLeft + nPaddingLeft && e.clientY >= el.offsetTop && e.clientY <= el.offsetTop + el.offsetHeight) // left
                || (e.clientX >= el.offsetLeft + el.offsetWidth - nPaddingRight && e.clientX <= el.offsetLeft + el.offsetWidth - nDraggingWid && e.clientY >= el.offsetTop && e.clientY <= el.offsetTop + el.offsetHeight) // right
                || (e.clientY >= el.offsetTop && e.clientY <= el.offsetTop + nPaddingTop && e.clientX >= el.offsetLeft && e.clientX <= el.offsetLeft + el.offsetWidth - nPaddingRight) // top
                || (e.clientY >= el.offsetTop + el.offsetHeight - nPaddingBtm && e.clientY <= el.offsetTop + el.offsetHeight && e.clientX >= el.offsetLeft && e.clientX <= el.offsetLeft + el.offsetWidth - nPaddingRight)) { // bottom

                bMoveDragFlag = true;
                //return;
            }
            //在支持 setCapture 做些东东  
            el.setCapture ? (
            //捕捉焦点   
              el.setCapture(),
            //设置事件   
              el.onmousemove = function (ev) {
                  mouseMove(ev || event)
              },
              el.onmouseup = mouseUp
            ) : (
              //绑定事件   
              jQuery(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
            )
            //防止默认事件发生   
            e.preventDefault()
        });
        //移动事件   
        function mouseMove(e) {
            var nWidLeft = e.clientX - el.offsetLeft;
            //var nWidLeft = e.clientX - x;
            if (bBorderDragFlag) {
                if (nWidLeft < 50 || nWidLeft > 410) {
                    return;
                }
                els.width = nWidLeft + 'px'; //改变宽度
            }
            else if (bMoveDragFlag) {
                els.left = e.clientX - nMouseDownPtX + 'px';
                els.top = e.clientY - nMouseDownPtY + 'px';
            }
            //var fWidLeftPercent = nWidLeft / document.body.clientWidth;
            //els.width = fWidLeftPercent * 100 + '%'; //改变宽度
            //if (divNodeStearch) {
            //    divNodeStearch.style.width = els.width; //改变宽度
            //}

            //var divContainSvg = document.getElementById('idContainSvg');
            //if (divContainSvg) {
            //    divContainSvg.style.width = document.body.clientWidth - el.clientWidth - divPropertiesHelpWrapper.clientWidth + 'px'; //改变宽度
            //}
            //var divTmp = document.getElementById('canvasHelpWrapper');
            //divCanvasHelpWrapper.style.width = (1 - fWidLeftPercent) * 100 + '%'; //改变宽度
            //if (divEditorheader) {
            //    divEditorheader.style.width = divCanvasHelpWrapper.style.width; //改变宽度
            //}
        }
        //停止事件   
        function mouseUp() {
            //在支持 releaseCapture 做些东东   
            el.releaseCapture ? (
            //释放焦点   
              el.releaseCapture(),
            //移除事件   
              el.onmousemove = el.onmouseup = null
            ) : (
              //卸载事件   
              jQuery(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
            )
        }
    }
});

appActivitiModeler.directive('mousedragPalettehelpwrapper', function () {
    return {
        restrict: 'AE',
        link: function (scope, element, attr) {
            //绑定需要拖拽改变大小的元素对象   
            bindMouseDragPalettehelpwrapper(document.getElementById('paletteHelpWrapper'));
        }
    }

    function bindMouseDragPalettehelpwrapper(el) {
        //初始化参数   
        var els = el.style;
        //鼠标的 X 和 Y 轴坐标   
        var x = 0;
        var y = 0;
        var bDragFlag = false;
        var nPaletteHelpWrapper = 0;
        //邪恶的食指   
        jQuery(el).mousedown(function (e) {
            //按下元素后，计算当前鼠标与对象计算后的坐标  
            x = e.clientX - el.offsetLeft;
            y = e.clientY - el.offsetTop;

            nPaletteHelpWrapper = el.offsetWidth;

            bDragFlag = true;
            //if (Math.abs(x) > 10) {
            //    bDragFlag = false;
            //    return;
            //}
            //在支持 setCapture 做些东东  
            el.setCapture ? (
            //捕捉焦点   
              el.setCapture(),
            //设置事件   
              el.onmousemove = function (ev) {
                  mouseMove(ev || event)
              },
              el.onmouseup = mouseUp
            ) : (
              //绑定事件   
              jQuery(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
            )
            //防止默认事件发生   
            e.preventDefault()
        });
        //移动事件   
        function mouseMove(e) {
            els.left = e.clientX - x + 'px';
            els.top = e.clientY - y + 'px';
        }
        //停止事件   
        function mouseUp() {
            //在支持 releaseCapture 做些东东   
            el.releaseCapture ? (
            //释放焦点   
              el.releaseCapture(),
            //移除事件   
              el.onmousemove = el.onmouseup = null
            ) : (
              //卸载事件   
              jQuery(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
            )
        }
    }
});

appActivitiModeler.directive("borderdragPropertieshelpwrapper", function () {

    return {
        restrict: 'AE',
        link: function ($scope) {
            //绑定需要拖拽改变大小的元素对象   
            bindResize($scope, document.getElementById('propertiesHelpWrapper'));
        }
    }

    function bindResize($scope, el) {
        //初始化参数   
        var els = el.style;
        //鼠标的 X 和 Y 轴坐标   
        var nOffLeftX = 0;
        var nOffRightX = 0;
        var y = 0;
        var bDragLeftFlag = false;
        var bDragRightFlag = false;
        //var nDivWid = el.offsetWidth;
        var nDivLeft = el.offsetLeft;
        var nDivRight = el.offsetLeft + el.offsetWidth;
        //邪恶的食指   
        jQuery(el).mousedown(function (e) {
            //nDivWid = el.offsetWidth;
            nDivLeft = el.offsetLeft;
            nDivRight = el.offsetLeft + el.offsetWidth;
            //按下元素后，计算当前鼠标与对象计算后的坐标  
            nOffLeftX = e.clientX - nDivLeft;
            nOffRightX = nDivRight - e.clientX;
            //y = e.clientY - el.offsetHeight;

            bDragLeftFlag = true;
            bDragRightFlag = true;
            if (Math.abs(nOffLeftX) > 10) {
                bDragLeftFlag = false;
            }
            if (Math.abs(nOffRightX) > 10) {
                bDragRightFlag = false;
            }

            if (!bDragLeftFlag && !bDragRightFlag) {
                return;
            }
            //在支持 setCapture 做些东东  
            el.setCapture ? (
            //捕捉焦点   
              el.setCapture(),
            //设置事件   
              el.onmousemove = function (ev) {
                  mouseMove(ev || event)
              },
              el.onmouseup = mouseUp
            ) : (
              //绑定事件   
              jQuery(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp)
            )
            //防止默认事件发生   
            e.preventDefault()
        });

        //移动事件   
        function mouseMove(e) {
            if (!bDragLeftFlag && !bDragRightFlag) {
                return;
            }
            if (bDragLeftFlag) {
                var nWid = nDivRight - e.clientX;
                if (nWid >= 300) {
                    els.left = e.clientX + 'px'; // 保证左边界不变
                    els.width = nWid + 'px'; //改变宽度

                    // 2017.12.28：同步改变Tabbar的宽度；
                    var divTabbarProperties = document.getElementById("tabbarProperties");
                    if (divTabbarProperties) {
                        divTabbarProperties.style.width = nWid + "px";
                            $scope.dhxTabbarProperties.setSizes();
                    }

                    // 2017.12.25:停靠后才可以同步改变绘图div的宽度
                    if (bPropertiesHelpWrapperDocked) {
                        var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
                        var objCanvasSection = document.getElementById("canvasSection");
                        if (divPropertiesHelpWrapper && objCanvasSection && divTabbarProperties) {

                            if (objCanvasSection) {
                                var nCanvasHelpWrapper = 300;
                                if (document.body.offsetWidth && divPropertiesHelpWrapper.offsetWidth) {
                                    nCanvasHelpWrapper = document.body.offsetWidth - divPropertiesHelpWrapper.offsetWidth;
                                }
                                objCanvasSection.style.width = nCanvasHelpWrapper + "px";
                                //objCanvasSection.style.overflow = "auto";

                                var arrSvgCanvas = document.getElementsByClassName("ORYX_Editor");
                                if (arrSvgCanvas) {
                                    for (var i = 0; i < arrSvgCanvas.length; i++) {
                                        arrSvgCanvas[i].style.width = nCanvasHelpWrapper + "px";
                                        //arrSvgCanvas[i].style.height = document.body.clientHeight - nToolbarHei + "px";
                                        //arrSvgCanvas[i].style.overflow = "auto"; // 2017.12.14:设置绘图区域可以显示滚动条
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else if (bDragRightFlag && !bPropertiesHelpWrapperDocked) {
                var elsWidth = e.clientX - nDivLeft;
                if (elsWidth >= 300) {
                    els.left = nDivLeft + 'px'; // 保证左边界不变
                    els.width = elsWidth + 'px'; //改变宽度

                    var divTabbarProperties = document.getElementById("tabbarProperties");
                    if (divTabbarProperties) {
                        divTabbarProperties.style.width = elsWidth + "px";
                        $scope.dhxTabbarProperties.setSizes();
                    }
                }
            }
            //var nWidLeft = e.clientX - nOffLeftX;
            //els.height = e.clientY - y + 'px' //改变高度 
        };
        //停止事件   
        function mouseUp() {
            //在支持 releaseCapture 做些东东   
            el.releaseCapture ? (
            //释放焦点   
              el.releaseCapture(),
            //移除事件   
              el.onmousemove = el.onmouseup = null
            ) : (
              //卸载事件   
              jQuery(document).unbind("mousemove", mouseMove).unbind("mouseup", mouseUp)
            )
        };
    }
});
//var tabbarTmp;
appActivitiModeler.directive('tabBar', function () {
    return {
        restrict: 'AE',
        link: function ($scope, element, attr) {
            //debugger
            $scope.dhxTabbarProperties = new dhtmlXTabBar(element[0].id);
            var divArr = document.querySelectorAll("#" + element[0].id + " >div");
            for (var i = 0; i < divArr.length; i++) {
                var tab = divArr[i];
                var active = false
                if (i == 0) active = true;
                if (tab.id) {
                    var nTabWid = 60;
                    if (tab.id == "tabIdJbsx")
                    {
                        nTabWid = 80;
                    }
                    //myTabbar.tabs(id).setText(id, "<span style='color:red;'>Tab</span>");
                    //$scope.dhxTabbarProperties.addTab(tab.id, "<span style='color:red;'>" + tab.getAttribute('name') + "</span>", nTabWid, null, active);
                    $scope.dhxTabbarProperties.addTab(tab.id, tab.getAttribute('name'), nTabWid, null, active);
                    $scope.dhxTabbarProperties.tabs(tab.id).appendObject(tab);
                    //$scope.dhxTabbarProperties.tabs(tab.id).hide();
                }
            }
            //$scope.dhxTabbarProperties.attachEvent("onContentLoaded", function (id) {
            //    $scope.dhxTabbarProperties.tabs("tabIdSj").setActive();
            //});


            //// 2017.12.29:测试属性面板自适应
            //$scope.dhxTabbarProperties.tabsMode.parentElement.style.position = "relative";
            
            //var arrTabbarNodes = document.getElementsByClassName("dhxtabbar_cont");
            //resetNodesStyle(arrTabbarNodes);
        }
    }
});

// 2017.12.29:测试属性面板自适应
appActivitiModeler.directive('tabBar1', function () {
    return {
        restrict: 'AE',
        link: function ($scope, element, attr, $timeout) {

            $scope.dhxTabbarProperties = new dhtmlXTabBar(element[0].id);
            var divArr = document.querySelectorAll("#" + element[0].id + " >div");
            for (var i = 0; i < divArr.length; i++) {
                var tab = divArr[i];
                var active = false
                if (i == 0) active = true;
                if (tab.id) {
                    var nTabWid = 60;
                    if (tab.id == "tabIdJbsx")
                    {
                        nTabWid = 80;
                    }
                    //myTabbar.tabs(id).setText(id, "<span style='color:red;'>Tab</span>");
                    //$scope.dhxTabbarProperties.addTab(tab.id, "<span style='color:red;'>" + tab.getAttribute('name') + "</span>", nTabWid, null, active);
                    
                    var tmp1 = $scope.dhxTabbarProperties.addTab(tab.id, tab.getAttribute('name'), nTabWid, null, active);
                    $scope.dhxTabbarProperties.tabs(tab.id).appendObject(tab);
                    //$scope.dhxTabbarProperties.tabs(tab.id).hide();
                    //$scope.dhxTabbarProperties.setSizes();
                }
            }

            $scope.dhxTabbarProperties.attachEvent("onSelect", function (id, lastId) {
                // your code here
                // get list of tabs
                var arrTabsId = this.getAllTabs();
                for (var i = 0; i < arrTabsId.length; i++)
                {
                    if (arrTabsId[i] != id) {
                        var divTab = document.getElementById(arrTabsId[i]);
                        for (var j = 0; j < divTab.children.length; j++) {
                            divTab.children[j].style.display = "none";
                        }
                    }
                    else {
                        var divTab = document.getElementById(arrTabsId[i]);
                        for (var j = 0; j < divTab.children.length; j++) {
                            divTab.children[j].style.display = "flex";
                        }
                    }
                }

                return true;
            });
            // 2017.12.29:测试属性面板自适应
            $scope.dhxTabbarProperties.tabsMode.parentElement.style.position = "relative";
        }
    }
});
//appActivitiModeler.directive("hasProperties", function () {
//    if (attr.ifHasProperties) {
//        return scope[attr.ifHasProperties]();
//    }

//    return false;
//});

var KISBPM = KISBPM || {};
//create command for undo/redo
KISBPM.CreateCommand = ORYX.Core.Command.extend({
    construct: function (option, currentReference, position, facade) {
        this.option = option;
        this.currentReference = currentReference;
        this.position = position;
        this.facade = facade;
        this.shape;
        this.edge;
        this.targetRefPos;
        this.sourceRefPos;
        /*
		 * clone options parameters
		 */
        this.connectedShape = option.connectedShape;
        this.connectingType = option.connectingType;
        this.namespace = option.namespace;
        this.type = option.type;
        this.containedStencil = option.containedStencil;
        this.parent = option.parent;
        this.currentReference = currentReference;
        this.shapeOptions = option.shapeOptions;
    },
    execute: function () {

        if (this.shape) {
            if (this.shape instanceof ORYX.Core.Node) {
                this.parent.add(this.shape);
                if (this.edge) {
                    this.facade.getCanvas().add(this.edge);
                    this.edge.dockers.first().setDockedShape(this.connectedShape);
                    this.edge.dockers.first().setReferencePoint(this.sourceRefPos);
                    this.edge.dockers.last().setDockedShape(this.shape);
                    this.edge.dockers.last().setReferencePoint(this.targetRefPos);
                }

                this.facade.setSelection([this.shape]);

            } else if (this.shape instanceof ORYX.Core.Edge) {
                this.facade.getCanvas().add(this.shape);
                this.shape.dockers.first().setDockedShape(this.connectedShape);
                this.shape.dockers.first().setReferencePoint(this.sourceRefPos);
            }
        }
        else {
            this.shape = this.facade.createShape(this.option);
            this.edge = (!(this.shape instanceof ORYX.Core.Edge)) ? this.shape.getIncomingShapes().first() : undefined;
        }

        if (this.currentReference && this.position) {

            if (this.shape instanceof ORYX.Core.Edge) {

                if (!(this.currentReference instanceof ORYX.Core.Canvas)) {
                    this.shape.dockers.last().setDockedShape(this.currentReference);

                    if (this.currentReference.getStencil().idWithoutNs() === 'TextAnnotation') {
                        var midpoint = {};
                        midpoint.x = 0;
                        midpoint.y = this.currentReference.bounds.height() / 2;
                        this.shape.dockers.last().setReferencePoint(midpoint);
                    }
                    else {
                        this.shape.dockers.last().setReferencePoint(this.currentReference.bounds.midPoint());
                    }
                }
                else {
                    this.shape.dockers.last().bounds.centerMoveTo(this.position);
                }
                this.sourceRefPos = this.shape.dockers.first().referencePoint;
                this.targetRefPos = this.shape.dockers.last().referencePoint;

            } else if (this.edge) {
                this.sourceRefPos = this.edge.dockers.first().referencePoint;
                this.targetRefPos = this.edge.dockers.last().referencePoint;
            }
        } else {
            var containedStencil = this.containedStencil;
            var connectedShape = this.connectedShape;
            var bc = connectedShape.bounds;
            var bs = this.shape.bounds;

            var pos = bc.center();
            if (containedStencil.defaultAlign() === "north") {
                pos.y -= (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "northeast") {
                pos.x += (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y -= (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "southeast") {
                pos.x += (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y += (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "south") {
                pos.y += (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "southwest") {
                pos.x -= (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y += (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else if (containedStencil.defaultAlign() === "west") {
                pos.x -= (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.width() / 2);
            } else if (containedStencil.defaultAlign() === "northwest") {
                pos.x -= (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.width() / 2);
                pos.y -= (bc.height() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET_CORNER + (bs.height() / 2);
            } else {
                pos.x += (bc.width() / 2) + ORYX.CONFIG.SHAPEMENU_CREATE_OFFSET + (bs.width() / 2);
            }

            // Move shape to the new position
            this.shape.bounds.centerMoveTo(pos);

            // Move all dockers of a node to the position
            if (this.shape instanceof ORYX.Core.Node) {
                (this.shape.dockers || []).each(function (docker) {
                    docker.bounds.centerMoveTo(pos);
                });
            }

            //this.shape.update();
            this.position = pos;

            if (this.edge) {
                this.sourceRefPos = this.edge.dockers.first().referencePoint;
                this.targetRefPos = this.edge.dockers.last().referencePoint;
            }
        }

        this.facade.getCanvas().update();
        this.facade.updateSelection();

    },
    rollback: function () {
        this.facade.deleteShape(this.shape);
        if (this.edge) {
            this.facade.deleteShape(this.edge);
        }
        //this.currentParent.update();
        this.facade.setSelection(this.facade.getSelection().without(this.shape, this.edge));
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//--------------------------处理拖动事件----------------------------------//
var bPropertiesHelpWrapperDocked = false;
var Dragging = function (validateHandler) { //参数为验证点击区域是否为可移动区域，如果是返回欲移动元素，负责返回null
    var draggingObj = null; //dragging Dialog
    var diffX = 0;
    var diffY = 0;
    var nMouseOrgX = 0;
    var nMouseOrgY = 0;
    //var nMouseCurX = 0;
    //var nMouseCurY = 0;

    function mouseHandler(e) {
        var divTabbarTop = document.getElementsByClassName("dhxtabbar_tabs");
        switch (e.type) {
            case 'mousedown':

                //var divPropertiesBody = document.getElementById("idPropertiesBody");
                //if (divPropertiesBody && divPropertiesBody.contains(e.srcElement)) {
                //    return;
                //}
                if (divTabbarTop)
                {
                    draggingObj = validateHandler(e);//验证是否为可点击移动区域
                    if (draggingObj != null) {
                        diffX = e.clientX - draggingObj.offsetLeft;
                        diffY = e.clientY - draggingObj.offsetTop;
                        nMouseOrgX = e.clientX;
                        nMouseOrgY = e.clientY;

                        //e.stopPropagation();
                        e.preventDefault();
                    }
                }
                break;

            case 'mousemove':
                //var divPropertiesBody = document.getElementById("idPropertiesBody");
                //if (divPropertiesBody && divPropertiesBody.contains(e.srcElement)) {
                //    return;
                //}
                if (divTabbarTop) {
                    if (draggingObj) {

                        //根据位置判断停靠透明框是否显示
                        var nLeft = e.clientX - diffX;

                        if (nLeft + draggingObj.offsetWidth > document.body.clientWidth - 5) {
                            return;
                        }

                        var divFloatFrame = document.getElementById("idFloatFrame");
                        if (!divFloatFrame) {
                            createDockFrame();
                        }

                        if (divFloatFrame) {

                            if (nLeft + draggingObj.offsetWidth > document.body.clientWidth - 15) {
                                divFloatFrame.style.display = '';
                            }
                            else // 隐藏
                            {
                                divFloatFrame.style.display = 'none';
                            }
                        }

                        if (Math.abs(e.clientX - nMouseOrgX) > 30 || Math.abs(e.clientY - nMouseOrgY) > 30) {
                            bPropertiesHelpWrapperDocked = false;
                        }

                        if (bPropertiesHelpWrapperDocked) {
                            return;
                        }
                        var nLeft = e.clientX - diffX;
                        draggingObj.style.left = (nLeft) + 'px';
                        draggingObj.style.top = (e.clientY - diffY) + 'px';

                        //e.stopPropagation();
                        //e.preventDefault();
                    }
                }
                break;

            case 'mouseup':
                {
                    //var divPropertiesBody = document.getElementById("idPropertiesBody");
                    //if (divPropertiesBody && divPropertiesBody.contains(e.srcElement)) {
                    //    return;
                    //}
                    if (divTabbarTop) {

                        if (draggingObj) {


                            if (nLeft + draggingObj.offsetWidth > document.body.clientWidth - 5) {
                                return;
                            }

                            if (Math.abs(e.clientX - nMouseOrgX) > 30 || Math.abs(e.clientY - nMouseOrgY) > 30) {
                                //if (Math.abs(e.clientX - nMouseOrgX) > 30 || Math.abs(e.clientY - nMouseOrgY) > 30) {
                                bPropertiesHelpWrapperDocked = false;
                            }

                            if (!bPropertiesHelpWrapperDocked) {

                                var nLeft = e.clientX - diffX;

                                // 如果大于body的宽度，就实现停靠效果
                                // 与body的宽度比较
                                //var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
                                if (nLeft + draggingObj.offsetWidth > document.body.clientWidth) {
                                    //if (nLeft + draggingObj.offsetWidth > document.body.clientWidth) {
                                    dockPropertiesWindow(draggingObj);
                                }
                                else // 将属性面板拖动出来
                                {
                                    unDockPropertiesWindow(draggingObj);
                                }
                            }
                        }

                        var divFloatFrame = document.getElementById("idFloatFrame");
                        if (divFloatFrame) {
                            divFloatFrame.style.display = 'none';
                        }

                        //e.stopPropagation();
                        //e.preventDefault();

                        draggingObj = null;
                        diffX = 0;
                        diffY = 0;
                    }
                    break;
                }
        }
    };

    return {
        enable: function () {
            document.addEventListener('mousedown', mouseHandler);
            document.addEventListener('mousemove', mouseHandler);
            document.addEventListener('mouseup', mouseHandler);
        },
        disable: function () {
            document.removeEventListener('mousedown', mouseHandler);
            document.removeEventListener('mousemove', mouseHandler);
            document.removeEventListener('mouseup', mouseHandler);
        }
    }
}

// 显示停靠透明框
function createDockFrame() {

    var divNew = document.createElement("div");

    // 创建一个新的div
    var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
    var divCanvasHelpWrapper = document.getElementById("canvasSection");
    //var divCanvasHelpWrapper = document.getElementById("canvasHelpWrapper");
    var divEditorHeader = document.getElementById("editor-header");
    //var dividFloatFrame = document.getElementById("idFloatFrame");
    if (divPropertiesHelpWrapper && divCanvasHelpWrapper && divEditorHeader) {
        divNew.id = 'idFloatFrame';
        var scrollWidth = 16;
        divNew.style.width = divPropertiesHelpWrapper.clientWidth - scrollWidth + 'px';
        divNew.style.height = divCanvasHelpWrapper.offsetHeight - scrollWidth + 'px';
        divNew.style.position = 'absolute';
        divNew.style.top = divEditorHeader.offsetTop + divEditorHeader.offsetHeight + 'px';
        //divNew.style.left = divEditorHeader.offsetTop + divEditorHeader.offsetHeight + 'px';
        divNew.style.left = divCanvasHelpWrapper.offsetWidth
            - divPropertiesHelpWrapper.offsetWidth + 'px';

        document.body.appendChild(divNew);
    }

}

// 停靠实现思路是在现有的SVG绘图的div外层包一层div（此前要找到SVG绘图的div），嵌入到dom中；
// 然后改变新添加的div的宽度(原有宽度减去属性面板的宽度)
function dockPropertiesWindow(objDragging) {

    var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
    //var divPaletteHelpWrapper = document.getElementById("paletteHelpWrapper");
    var divCanvasHelpWrapper = document.getElementById("canvasHelpWrapper");
    var objCanvasSection = document.getElementById("canvasSection");
    var divEditorHeader = document.getElementById("editor-header");
    if (!divPropertiesHelpWrapper || !divCanvasHelpWrapper || !divEditorHeader || !objCanvasSection) {
        return;
    }
    if (objCanvasSection) {
        var nCanvasHelpWrapper = 300;
        if (document.body.offsetWidth && divPropertiesHelpWrapper.offsetWidth) {
            nCanvasHelpWrapper = document.body.offsetWidth - divPropertiesHelpWrapper.offsetWidth;
        }
        objCanvasSection.style.width = nCanvasHelpWrapper + "px";
        //objCanvasSection.style.overflow = "auto";

        var arrSvgCanvas = document.getElementsByClassName("ORYX_Editor");
        if (arrSvgCanvas) {
            for (var i = 0; i < arrSvgCanvas.length; i++) {
                arrSvgCanvas[i].style.width = nCanvasHelpWrapper + "px";
                //arrSvgCanvas[i].style.height = document.body.clientHeight - nToolbarHei + "px";
                //arrSvgCanvas[i].style.overflow = "auto"; // 2017.12.14:设置绘图区域可以显示滚动条
            }
        }
    }

    // 让属性面板固定到右侧
    if (null != objDragging) {
        objDragging.style.top = divEditorHeader.offsetTop + divEditorHeader.offsetHeight + 'px';
        objDragging.style.left = document.body.offsetWidth - divPropertiesHelpWrapper.offsetWidth + 'px';
        var divPropertiesBody = document.getElementById("idPropertiesBody");
        var divPropertiesTitle = document.getElementById("idPropertiesTitle");
        if (divPropertiesBody && divPropertiesTitle) {
            //
            divPropertiesBody.style.maxHeight = divCanvasHelpWrapper.offsetHeight - divPropertiesTitle.offsetHeight + 'px';
        }
        var divPropertiesBorder = document.getElementById("idPropertiesBorder");
        if (divPropertiesBorder) {
            divPropertiesBorder.className = '';
        }
        var btnPropertiesCloseBtn = document.getElementById("idPropertiesCloseBtn");
        if (btnPropertiesCloseBtn) {
            btnPropertiesCloseBtn.style.display = 'none';
        }
        var btnToolbarProperty = document.getElementById("idBtnProperty");
        if (btnToolbarProperty) {
            btnToolbarProperty.style.display = 'none';
        }

        bPropertiesHelpWrapperDocked = true;
    }
}

// 将属性面板拖拽出来时，是将新添加的div去掉，还原到原来的DOM结构
function unDockPropertiesWindow(objDragging) {

    var objPaletteHelpWrapper = document.getElementById("paletteHelpWrapper");
    var objCanvasSection = document.getElementById("canvasSection");

    if (!objCanvasSection) {
        return;
    }
    var nCanvasWid = document.body.clientWidth;
    objCanvasSection.style.width = nCanvasWid + "px";

    var arrSvgCanvas = document.getElementsByClassName("ORYX_Editor");
    if (arrSvgCanvas) {
        for (var i = 0; i < arrSvgCanvas.length; i++) {
            arrSvgCanvas[i].style.width = nCanvasWid + "px";
        }
    }

    var divPropertiesBorder = document.getElementById("idPropertiesBody");
    if (divPropertiesBorder) {
        //divPropertiesBorder.className = 'dialog-border';
        divPropertiesBorder.style.minHeight = '99px';
        //divPropertiesBorder.style.height = '300px';
        divPropertiesBorder.style.maxHeight = '399px';
    }

    var divPropertiesBorder = document.getElementById("idPropertiesBorder");
    if (divPropertiesBorder) {
        divPropertiesBorder.className = 'dialog-border';
        //divPropertiesBorder.style.minHeight = '99px';
        ////divPropertiesBorder.style.height = '300px';
        //divPropertiesBorder.style.maxHeight = '399px';
    }
    var btnPropertiesCloseBtn = document.getElementById("idPropertiesCloseBtn");
    if (btnPropertiesCloseBtn) {
        btnPropertiesCloseBtn.style.display = '';
    }
    var btnToolbarProperty = document.getElementById("idBtnProperty");
    if (btnToolbarProperty) {
        btnToolbarProperty.style.display = '';
    }
}


// 停靠实现思路是在现有的SVG绘图的div外层包一层div（此前要找到SVG绘图的div），嵌入到dom中；
// 然后改变新添加的div的宽度(原有宽度减去属性面板的宽度)
function resizeDockPropertiesWindow(objDragging) {

    var arrDiv = document.getElementsByClassName("ORYX_Editor");
    var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
    var divPaletteHelpWrapper = document.getElementById("paletteHelpWrapper");
    var divCanvasHelpWrapper = document.getElementById("canvasHelpWrapper");
    var divCanvasSection = document.getElementById("canvasSection");
    var divEditorHeader = document.getElementById("editor-header");
    //var divMainHeader = document.getElementById("main-header");

    var divNew = document.getElementById("idContainSvg");
    //var nScrollWidth = 15;
    if (divCanvasSection) {

        // 此处的document.body也可以去document.documentElement
        divCanvasSection.style.width = document.body.offsetWidth - divPaletteHelpWrapper.offsetWidth - divPropertiesHelpWrapper.offsetWidth + 'px';
        divCanvasSection.style.height = document.body.offsetHeight - divEditorHeader.offsetHeight + 'px';
    }

    // 让属性面板固定到右侧
    if (null != objDragging) {
        objDragging.style.top = divEditorHeader.offsetTop + divEditorHeader.offsetHeight + 'px';
        objDragging.style.left = document.body.offsetWidth - divPropertiesHelpWrapper.offsetWidth + 'px';
        var divPropertiesBorder = document.getElementById("idPropertiesBorder");
        if (divPropertiesBorder) {
            divPropertiesBorder.className = '';
            //divPropertiesBorder.style.height = divNew.style.height;
            //divPropertiesBorder.style.maxHeight = divNew.style.height;
        }
    }
}

function getDraggingDialog(e) {
    var target = e.target;
    if (target.id == "paletteHelpWrapper" || target.id == "paletteSection" || target.id == "idPropertiesBorder") {
        //target = document.getElementById("paletteHelpWrapper");
        return null;
    }
    else {
        if (target.className == "dhxtabbar_tabs_cont_left")
        {
            var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
            if (divPropertiesHelpWrapper) {
                while (target && target.className.indexOf('col-xs-9-ext') == -1) { // 这个条件会引起监视器出错
                    // 2017.10.28 check fault（问题点：这个条件导致在设计器中添加新节点或连线时会出现属性框停靠的效果）
                    //while (target && target.className && target.className.indexOf && target.className.indexOf('col-xs-9-ext') == -1) {
                    if (target.className.indexOf('property-row') > -1) {
                        return null;
                    }
                    target = target.offsetParent;
                }
            }
            else {
                //while (target && target.className.indexOf('col-xs-9-ext') == -1) { // 这个条件会引起监视器出错
                // 2017.10.28 check fault（问题点：这个条件导致在设计器中添加新节点或连线时会出现属性框停靠的效果）
                while (target && target.className && target.className.indexOf && target.className.indexOf('col-xs-9-ext') == -1) {
                    if (target.className.indexOf('property-row') > -1) {
                        return null;
                    }
                    target = target.offsetParent;
                }
            }
            if (target != null) {
                return target;
            } else {
                return null;
            }
        }
    }
    return null;
}

Dragging(getDraggingDialog).enable();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//var resizeWaiter = false;
window.onresize = function () {

    changeCanvasRegion();
}

function changeCanvasRegion() {

    // 2017.12.14：绘图区域显示滚动条
    var nToolbarHei = 0;
    var nPaletteHelpWrapperHei = 0;
    //var nPaletteHelpWrapperWid = 180;
    var divEditorHeader = document.getElementById("editor-header");
    var divPaletteHelpWrapper = document.getElementById("paletteHelpWrapper");
    var divCanvasSection = document.getElementById("canvasSection");
    var divPropertiesHelpWrapper = document.getElementById("propertiesHelpWrapper");
    if (!divEditorHeader || !divPaletteHelpWrapper || !divCanvasSection || !divPropertiesHelpWrapper) {
        return;
    }
    //nPaletteHelpWrapperWid = divPaletteHelpWrapper.offsetWidth;
    //nPaletteHelpWrapperWid = 0;
    if (divEditorHeader) {
        nToolbarHei = divEditorHeader.offsetHeight;
    }

    if (bPropertiesHelpWrapperDocked) {

        if (divCanvasSection) {
            var nCanvasHelpWrapper = 300;
            if (document.body.offsetWidth && divPropertiesHelpWrapper.offsetWidth) {
                nCanvasHelpWrapper = document.body.offsetWidth - divPropertiesHelpWrapper.offsetWidth;
            }
            divCanvasSection.style.width = nCanvasHelpWrapper + "px";
            divCanvasSection.style.height = document.body.offsetHeight - nToolbarHei + 'px';
            divCanvasSection.style.overflow = "auto";

            var arrSvgCanvas = document.getElementsByClassName("ORYX_Editor");
            if (arrSvgCanvas) {
                for (var i = 0; i < arrSvgCanvas.length; i++) {
                    arrSvgCanvas[i].style.width = nCanvasHelpWrapper + "px";
                    arrSvgCanvas[i].style.height = document.body.clientHeight - nToolbarHei + "px";
                    arrSvgCanvas[i].style.overflow = "auto"; // 2017.12.14:设置绘图区域可以显示滚动条
                }
            }
        }

        // 让属性面板固定到右侧
        divPropertiesHelpWrapper.style.top = divEditorHeader.offsetTop + nToolbarHei + 'px';
        divPropertiesHelpWrapper.style.left = document.body.offsetWidth - divPropertiesHelpWrapper.offsetWidth + 'px';
        var divPropertiesBody = document.getElementById("idPropertiesBody");
        var divPropertiesTitle = document.getElementById("idPropertiesTitle");
        if (divPropertiesBody && divPropertiesTitle) {
            //
            divPropertiesBody.style.maxHeight = divCanvasSection.offsetHeight - divPropertiesTitle.offsetHeight + 'px';
        }
        var divPropertiesBorder = document.getElementById("idPropertiesBorder");
        if (divPropertiesBorder) {
            divPropertiesBorder.className = '';
        }
        var btnPropertiesCloseBtn = document.getElementById("idPropertiesCloseBtn");
        if (btnPropertiesCloseBtn) {
            btnPropertiesCloseBtn.style.display = 'none';
        }
        var btnToolbarProperty = document.getElementById("idBtnProperty");
        if (btnToolbarProperty) {
            btnToolbarProperty.style.display = 'none';
        }
    }
    else {
        var nCanvasWid = document.body.clientWidth;
        divCanvasSection.style.width = nCanvasWid + "px";
        divCanvasSection.style.height = document.body.clientHeight - nToolbarHei + "px";
        divCanvasSection.style.overflow = "auto"; // 2017.12.14:设置绘图区域可以显示滚动条

        var arrSvgCanvas = document.getElementsByClassName("ORYX_Editor");
        if (arrSvgCanvas) {
            for (var i = 0; i < arrSvgCanvas.length; i++) {
                arrSvgCanvas[i].style.width = nCanvasWid + "px";
                arrSvgCanvas[i].style.height = document.body.clientHeight - nToolbarHei + "px";
                arrSvgCanvas[i].style.overflow = "auto"; // 2017.12.14:设置绘图区域可以显示滚动条
            }
        }
    }
};