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
var KISBPM = KISBPM || {};
// ��������õķ���
KISBPM.URL = {

    getModel: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot + '/model/' + modelId + '/json'; // ��ȡ���������ͼ��Ϣ
    },

    // �������õĽӿ�
    getModelByinstance: function (instanceId) {// 2017.10.28 check fault
        return ACTIVITI.CONFIG.contextRoot + '/runtime/process-instances/' + instanceId + '/json'; // ͨ������ʵ��id��ȡ����ͼ
    },
    // �������õĽӿ�
    getHightlight: function (instanceId) {
        return ACTIVITI.CONFIG.contextRoot + '/process-instance/' + instanceId + '/highlights'; // ��ȡ������ʾ��Ϣ
    },

    getStencilSet: function() {
        return ACTIVITI.CONFIG.contextRoot + '/editor/stencilset?version=' + Date.now();
    },

    putModel: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot + '/model/' + modelId + '/save'; // ����
    },
    putModeljson: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot + '/model/' + modelId + '/savejson';// ����JSON
    }
};