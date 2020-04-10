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

var ACTIVITI = ACTIVITI || {};

ACTIVITI.CONFIG = {
// 2017.10.28 check fault
    //'contextRoot' : 'http://192.168.1.186:8080/activiti-rest/service'
    //'contextRoot': 'http://192.168.1.186:8888/activiti-rest/service' 
    'contextRoot': 'http://www.hanweikeji.com:8004/activiti-rest/service'
    
        
    //'contextRoot' : 'http://localhost:8081/activiti-rest/service'
	//'contextRoot' : '/activiti-editor/service'
}

// 2017.12.04����ȡVMD2.0�����õĹ�������ַ
if (parent) {
    if (parent.vmd) {
        if (parent.vmd.workspace) {
            if (parent.vmd.workspace.workflowIp) {
                ACTIVITI.CONFIG.contextRoot = "http://" + parent.vmd.workspace.workflowIp + "/activiti-rest/service";
            }
            else {
                if (parent.vmdSettings) {
                    if (parent.vmdSettings.workflowIp) {
                        ACTIVITI.CONFIG.contextRoot = "http://" + parent.vmdSettings.workflowIp + "/activiti-rest/service";
                    }
                }
            }
        }
        else {
            if (parent.vmdSettings) {
                if (parent.vmdSettings.workflowIp) {
                    ACTIVITI.CONFIG.contextRoot = "http://" + parent.vmdSettings.workflowIp + "/activiti-rest/service";
                }
            }
        }
    }
    else {
        if (parent.vmdSettings) {
            if (parent.vmdSettings.workflowIp) {
                ACTIVITI.CONFIG.contextRoot = "http://" + parent.vmdSettings.workflowIp + "/activiti-rest/service";
            }
        }
    }
}