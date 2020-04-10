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

var activitiModeler = angular.module('activitiModeler', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngDragDrop',
  'mgcrea.ngStrap', 
  'ngGrid',
  'ngAnimate',
  'pascalprecht.translate',
  'duScroll'
]);

var activitiModule = activitiModeler;

activitiModeler
  // Initialize routes
  .config(['$selectProvider', '$translateProvider', function ($selectProvider, $translateProvider) {

      // Override caret for bs-select directive
      angular.extend($selectProvider.defaults, {
          caretHtml: '&nbsp;<i class="icon icon-caret-down"></i>'
      });
        
        // Initialize angular-translate
        $translateProvider.useStaticFilesLoader({
            prefix: './editor-app/i18n/',
            suffix: '.json'
        });
        
        $translateProvider.preferredLanguage('zh-CN');  
        // remember language
        $translateProvider.useCookieStorage();
        
  }])
  .run(['$rootScope', '$timeout', '$modal', '$translate', '$location', '$window', '$http', '$q',
        function($rootScope, $timeout, $modal, $translate, $location, $window, $http, $q) {
	  
			  $rootScope.config = ACTIVITI.CONFIG;
			  
			  $rootScope.editorInitialized = false;
		      
		      $rootScope.editorFactory = $q.defer();
		
		      $rootScope.forceSelectionRefresh = false;
		
		      $rootScope.ignoreChanges = false; // by default never ignore changes
		      
		      $rootScope.validationErrors = [];
		      
		      $rootScope.staticIncludeVersion = Date.now();

		      $rootScope.strOAuthId = '';

            $rootScope.strinfo = '';
	    $rootScope.streinfo = '';

            // 模式：0：设计器模式，1：监视器模式；2：支持可视化模式；3：支持可视化节点多选模式
	    $rootScope.modeShow = 0;
	    $rootScope.arrSelectedNodeId = null;

			  /**
		       * A 'safer' apply that avoids concurrent updates (which $apply allows).
		       */
		      $rootScope.safeApply = function(fn) {
		          var phase = this.$root.$$phase;
		          if(phase == '$apply' || phase == '$digest') {
		              if(fn && (typeof(fn) === 'function')) {
		                  fn();
		              }
		          } else {
		              this.$apply(fn);
		          }
		      };
	  
	  
            /**
             * Initialize the event bus: couple all Oryx events with a dispatch of the
             * event of the event bus. This way, it gets much easier to attach custom logic
             * to any event.
             */

            // 2017.10.28 check fault
                /* Helper method to fetch model from server (always needed) */
                function fetchModel(modelId,token,info,einfo,processId) {

                    var modelUrl = KISBPM.URL.getModel(modelId); // 2017.08.16:调用服务获取流程图的URL

                    // 20190118:从URL获取参数信息
                    parseUrlParams();

                    //从Cookie中获取OAuth的Id
                    var strOAuthIdTmp = null;
                    // 2017.09.18:李成虎反馈增加其他两个认证值的获取
                    var strOAuthIdInfo = null;
                    var strOAuthIdEInfo = null;
                    // 2017.12.06:先走url传递的参数，如果都为空，则从cookie获取
                    if (token || info || einfo) {
                        if (token) {
                            strOAuthIdTmp = token;
                        }
                        if (info) {
                            strOAuthIdInfo = info;
                        }
                        if (einfo) {
                            strOAuthIdEInfo = einfo;
                        }
                    } else {
                        strOAuthIdTmp = null;//jQuery.cookie('Token'); // 2017.11.29 由于目前工作流未能与数据服务统一处理token，所以此处暂时赋空值
                        // 2017.09.18:李成虎反馈增加其他两个认证值的获取
                        strOAuthIdInfo = jQuery.cookie('info');
                        strOAuthIdEInfo = jQuery.cookie('einfo');
                    }

                    if (strOAuthIdTmp) {
                        $rootScope.strOAuthId = strOAuthIdTmp;
                    }
                    else if (strOAuthIdEInfo) {
                        $rootScope.streinfo = strOAuthIdEInfo;
                    }
                    else if (strOAuthIdInfo) {
                        $rootScope.strinfo = strOAuthIdInfo;
                    }
                    //$rootScope.strOAuthId = '{f0784bf4-1b44-4266-991f-bc7996946364}';
                    // 监视器模式
                    if (1 == $rootScope.modeShow)
                    {
                        var instanceId = processId;
                        var processDefinitionId = null;
                        var ModelByinstanceUrl = KISBPM.URL.getModelByinstance(instanceId);
                        //var HightlightUrl = KISBPM.URL.getHightlight(instanceId);
                        $http({ method: 'GET', url: ModelByinstanceUrl, headers: { 'token': $rootScope.strOAuthId, 'einfo': $rootScope.streinfo, 'info': $rootScope.strinfo } }).
                        //$http({ method: 'GET', url: instanceUrl, headers: { 'token': '{f0784bf4-1b44-4266-991f-bc7996946364}' } }).
                        success(function (data, status, headers, config) {

                            var OAuthconfig = {};
                            OAuthconfig.idOAuth = $rootScope.strOAuthId;
                            OAuthconfig.einfo = $rootScope.streinfo;
                            OAuthconfig.info = $rootScope.strinfo;
                            $rootScope.editor = new ORYX.Editor(data, OAuthconfig, $rootScope.arrSelectedNodeId);
                            //$rootScope.editor = new ORYX.Editor(data, OAuthconfig, $rootScope.arrSelectedNodeId);

                            $rootScope.editor.modeShow = $rootScope.modeShow;
                            $rootScope.modelData = angular.fromJson(data);
                            $rootScope.editorFactory.resolve();
                        }).
                        error(function (data, status, headers, config) {
                            console.log('Error loading model with id ' + instanceId + ' ' + data);
                        });

                        //////////////////////////////////////////////////////////////////////////////////////////////////////
                        // 2017.08.16:调用服务获取高亮信息
                        //var instanceId = processId;
                        var instanceUrl = KISBPM.URL.getHightlight(instanceId);

                        $http({ method: 'GET', url: instanceUrl, headers: { 'token': $rootScope.strOAuthId, 'einfo': $rootScope.streinfo, 'info': $rootScope.strinfo } }).
                        //$http({ method: 'GET', url: instanceUrl, headers: { 'token': '{f0784bf4-1b44-4266-991f-bc7996946364}' } }).
                            success(function (data, status, headers, config) {

                                if (1 == $rootScope.modeShow) {
                                    if ($rootScope.editor)
                                    {
                                        $rootScope.editor.jsonHighlight = data;
                                    }
                                }

                            }).
                            error(function (data, status, headers, config) {
                                console.log('Error loading model with id ' + instanceId + ' ' + data);
                            });
                        //////////////////////////////////////////////////////////////////////////////////////////////////////
                    }
                    else
                    {
                        // 20190118：获取流程信息
                        $http({ method: 'GET', url: modelUrl, headers: { 'token': $rootScope.strOAuthId, 'einfo': $rootScope.streinfo, 'info': $rootScope.strinfo } }).
                        //$http({ method: 'GET', url: modelUrl, headers: { 'token': '{f0784bf4-1b44-4266-991f-bc7996946364}' } }).
                            success(function (data, status, headers, config) {

                                var OAuthconfig = {};
                                OAuthconfig.idOAuth = $rootScope.strOAuthId;
                                OAuthconfig.einfo = $rootScope.streinfo;
                                OAuthconfig.info = $rootScope.strinfo;
                                // 20190118:获取流程信息后初始化流程
                                $rootScope.editor = new ORYX.Editor(data, OAuthconfig, $rootScope.arrSelectedNodeId);

                                $rootScope.editor.modeShow = $rootScope.modeShow;

                                //////////////////////////////////////////////////////////////////////////////////////////////////////
                                // sgw2017.08.14:从URL参数中获取是否是监视器模式，设计到设计器中进行状态控制；

                                // 2017.08.14：延时是为了等待插件加载完成后，
                                // 在$rootScope.editor.loadedPlugins数组中找到type==‘ORYX.Plugins.DragDocker’这个的插件对象
                                // 然后赋值这个对象的modeShow成员变量，用于在程序中判断显示模式（设计/监视）
                                //window.setTimeout(function () {
                                //    //alert("bbbbbbbbbbbb");

                                //},500)
                                //window.location.search;
                                //var strModeState = getUrlParameter('mode');
                                //$rootScope.editor.modeShow = 0;
                                //ORYX.Plugins.DragDocker.modeShow = 0; // 采用静态变量方式
                                //if (strModeState == 'monitor')
                                //{
                                //    ORYX.Plugins.DragDocker.modeShow = 1; // 采用静态变量方式

                                //    $rootScope.editor.modeShow = 1;

                                //    //ORYX.Plugins.DragDocker.modeShow = 1;
                                //}
                                //////////////////////////////////////////////////////////////////////////////////////////////////////
                                
                                // 2017.11.16 从服务端获取的流程信息;
                                //$rootScope.modelData.modelId; // 模板ID
                                $rootScope.modelData = angular.fromJson(data);
                                $rootScope.editorFactory.resolve();
                            }).
                            error(function (data, status, headers, config) {
                                console.log('Error loading model with id ' + modelId + ' ' + data);
                            });
                    }
                }


            // 从URL中获取参数
                function parseUrlParams() {

                // 获取显示模式参数
                var strModeState = getUrlParameter('mode');
                    // 模式：0：设计器模式，1：监视器模式；2：支持可视化模式；3：支持可视化节点多选模式
                $rootScope.modeShow = 0;
                //ORYX.Plugins.DragDocker.modeShow = 0; // 采用静态变量方式
                if (strModeState == 'monitor') {

                    //$rootScope.editor.modeShow = 1;
                    $rootScope.modeShow = 1; //监视器模式；
                    //ORYX.Plugins.DragDocker.modeShow = 1; // 采用静态变量方式
                }
                else if (strModeState == 'visual') {

                    $rootScope.modeShow = 2; // 2：支持可视化模式
                }
                else if (strModeState == 'visualmultiple') {

                    $rootScope.modeShow = 3; // 3：支持可视化节点多选模式
                }

                    // 2017.12.12：获取通URL传入的选中节点的ID(oryx-overrideid)
                if ($rootScope.modeShow == 2) // 可视化模式
                {
                    var strSelectedNodesId = getUrlParameter('selectedNodesId');
                    if (strSelectedNodesId) {
                        $rootScope.arrSelectedNodeId = strSelectedNodesId.split(",");
                    }
                }
            }


            // 从URL中获取参数
            function getUrlParameter(param) {
                var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) {

                    try {
                        return decodeURIComponent(r[2]);
                    } catch (ex) {
                        return unescape(r[2]);
                    }

                }

                return "";
            }

            function initScrollHandling() {
                var canvasSection = jQuery('#canvasSection');
                canvasSection.scroll(function() {

                    // Hides the resizer and quick menu items during scrolling

                    var selectedElements = $rootScope.editor.selection;
                    var subSelectionElements = $rootScope.editor._subSelection;

                    $rootScope.selectedElements = selectedElements;
                    $rootScope.subSelectionElements = subSelectionElements;
                    if (selectedElements && selectedElements.length > 0) {
                    	$rootScope.selectedElementBeforeScrolling = selectedElements[0];
                    }

                    jQuery('.Oryx_button').each(function(i, obj) {
                    	$rootScope.orginalOryxButtonStyle = obj.style.display;
                    	obj.style.display = 'none';
                    });
                    
                    jQuery('.resizer_southeast').each(function(i, obj) {
                    	$rootScope.orginalResizerSEStyle = obj.style.display;
                        obj.style.display = 'none';
                    });
                    jQuery('.resizer_northwest').each(function(i, obj) {
                    	$rootScope.orginalResizerNWStyle = obj.style.display;
                        obj.style.display = 'none';
                    });
                    $rootScope.editor.handleEvents({type:ORYX.CONFIG.EVENT_CANVAS_SCROLL});
                });

                canvasSection.scrollStopped(function(){

                    // Puts the quick menu items and resizer back when scroll is stopped.

                    $rootScope.editor.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
                    $rootScope.editor.setSelection($rootScope.selectedElements, $rootScope.subSelectionElements);
                    $rootScope.selectedElements = undefined;
                    $rootScope.subSelectionElements = undefined;

                    function handleDisplayProperty(obj) {
                        if (jQuery(obj).position().top > 0) {
                            obj.style.display = 'block';
                        } else {
                            obj.style.display = 'none';
                        }
                    }

                    jQuery('.Oryx_button').each(function(i, obj) {
                        handleDisplayProperty(obj);
                    });
                    
                    jQuery('.resizer_southeast').each(function(i, obj) {
                        handleDisplayProperty(obj);
                    });
                    jQuery('.resizer_northwest').each(function(i, obj) {
                        handleDisplayProperty(obj);
                    });

                });
            }

            /**
             * Initialize the Oryx Editor when the content has been loaded
             */
            $rootScope.$on('$includeContentLoaded', function (event) {
	            if (!$rootScope.editorInitialized) {

	            	ORYX._loadPlugins();
	
	                var modelId = EDITOR.UTIL.getParameterByName('modelId');
                    var token = EDITOR.UTIL.getParameterByName('token');
	                var info = EDITOR.UTIL.getParameterByName('info');
                    var einfo = EDITOR.UTIL.getParameterByName('einfo');
                    var processId = EDITOR.UTIL.getParameterByName('processId');
	                fetchModel(modelId,token,info,einfo,processId);
	
	                $rootScope.window = {};
	                var updateWindowSize = function() {
	                    $rootScope.window.width = $window.innerWidth;
	                    $rootScope.window.height  = $window.innerHeight;
	                };
	
	                // Window resize hook
	                angular.element($window).bind('resize', function() {
	                    $rootScope.safeApply(updateWindowSize());
	                });
	
	                $rootScope.$watch('window.forceRefresh', function(newValue) {
	                    if(newValue) {
	                        $timeout(function() {
	                            updateWindowSize();
	                            $rootScope.window.forceRefresh = false;
	                        });
	                    }
	                });
	
	                updateWindowSize();

	                // Hook in resizing of main panels when window resizes
	                // TODO: perhaps move to a separate JS-file?
	                jQuery(window).resize(function () {

	                    // Calculate the offset based on the bottom of the module header
	                    var offset = jQuery("#editor-header").offset();
	                    var propSectionHeight = jQuery('#propertySection').height();
	                    var canvas = jQuery('#canvasSection');
	                    //var mainHeader = jQuery('#main-header');

	                    if (offset == undefined || offset === null
	                        || propSectionHeight === undefined || propSectionHeight === null
	                        || canvas === undefined || canvas === null) {
	                        return;
	                    }
	                    
	                    if ($rootScope.editor)
	                	{
	        	        	var selectedElements = $rootScope.editor.selection;
	        	            var subSelectionElements = $rootScope.editor._subSelection;
	        	
	        	            $rootScope.selectedElements = selectedElements;
	        	            $rootScope.subSelectionElements = subSelectionElements;
	        	            if (selectedElements && selectedElements.length > 0)
	        	            {
	        	            	$rootScope.selectedElementBeforeScrolling = selectedElements[0];
	        	            	
	        	            	$rootScope.editor.setSelection([]); // needed cause it checks for element changes and does nothing if the elements are the same
	        	                $rootScope.editor.setSelection($rootScope.selectedElements, $rootScope.subSelectionElements);
	        	                $rootScope.selectedElements = undefined;
	        	                $rootScope.subSelectionElements = undefined;
	        	            }
	                	}

	                    var totalAvailable = jQuery(window).height() - offset.top - 21;
	                    //var totalAvailable = jQuery(window).height() - offset.top - mainHeader.height() - 21;
	                    canvas.height(totalAvailable - propSectionHeight);
                        // 2017.12.21:节点列表浮动出来后，不重新设置节点列表的高度
	                    //jQuery('#paletteSection').height(totalAvailable);

	                    // Update positions of the resize-markers, according to the canvas

	                    var actualCanvas = null;
	                    if (canvas && canvas[0].children[1]) {
	                        actualCanvas = canvas[0].children[1];
	                    }

	                    var canvasTop = canvas.position().top;
	                    var canvasLeft = canvas.position().left;
	                    var canvasHeight = canvas[0].clientHeight;
	                    var canvasWidth = canvas[0].clientWidth;
	                    var iconCenterOffset = 8;
	                    var widthDiff = 0;

	                    var actualWidth = 0;
	                    if(actualCanvas) {
	                        // In some browsers, the SVG-element clientwidth isn't available, so we revert to the parent
	                        actualWidth = actualCanvas.clientWidth || actualCanvas.parentNode.clientWidth;
	                    }


	                    if(actualWidth < canvas[0].clientWidth) {
	                        widthDiff = actualWidth - canvas[0].clientWidth;
	                        // In case the canvas is smaller than the actual viewport, the resizers should be moved
	                        canvasLeft -= widthDiff / 2;
	                        canvasWidth += widthDiff;
	                    }

	                    var iconWidth = 17;
	                    var iconOffset = 20;

	                    var north = jQuery('#canvas-grow-N');
	                    north.css('top', canvasTop + iconOffset + 'px');
	                    north.css('left', canvasLeft - 10 + (canvasWidth - iconWidth) / 2 + 'px');

	                    var south = jQuery('#canvas-grow-S');
	                    south.css('top', (canvasTop + canvasHeight - iconOffset - iconCenterOffset) +  'px');
	                    south.css('left', canvasLeft - 10 + (canvasWidth - iconWidth) / 2 + 'px');

	                    var east = jQuery('#canvas-grow-E');
	                    east.css('top', canvasTop - 10 + (canvasHeight - iconWidth) / 2 + 'px');
	                    east.css('left', (canvasLeft + canvasWidth - iconOffset - iconCenterOffset) + 'px');

	                    var west = jQuery('#canvas-grow-W');
	                    west.css('top', canvasTop -10 + (canvasHeight - iconWidth) / 2 + 'px');
	                    west.css('left', canvasLeft + iconOffset + 'px');

	                    north = jQuery('#canvas-shrink-N');
	                    north.css('top', canvasTop + iconOffset + 'px');
	                    north.css('left', canvasLeft + 10 + (canvasWidth - iconWidth) / 2 + 'px');

	                    south = jQuery('#canvas-shrink-S');
	                    south.css('top', (canvasTop + canvasHeight - iconOffset - iconCenterOffset) +  'px');
	                    south.css('left', canvasLeft +10 + (canvasWidth - iconWidth) / 2 + 'px');

	                    east = jQuery('#canvas-shrink-E');
	                    east.css('top', canvasTop + 10 + (canvasHeight - iconWidth) / 2 +  'px');
	                    east.css('left', (canvasLeft + canvasWidth - iconOffset - iconCenterOffset) + 'px');

	                    west = jQuery('#canvas-shrink-W');
	                    west.css('top', canvasTop + 10 + (canvasHeight - iconWidth) / 2 + 'px');
	                    west.css('left', canvasLeft + iconOffset + 'px');
	                });

	                jQuery(window).trigger('resize');

	                jQuery.fn.scrollStopped = function(callback) {
	                    jQuery(this).scroll(function(){
	                        var self = this, $this = jQuery(self);
	                        if ($this.data('scrollTimeout')) {
	                            clearTimeout($this.data('scrollTimeout'));
	                        }
	                        $this.data('scrollTimeout', setTimeout(callback,50,self));
	                    });
	                };
	                
	                // Always needed, cause the DOM element on which the scroll event listeners are attached are changed for every new model
	                initScrollHandling();
	                
	                //var tmp = document.getElementById("sid-BDF28BBE-AD1B-4481-90FB-1BD3D1B6114Fbg_frame");
	                //tmp.style.stroke = "#ff0000";

	                $rootScope.editorInitialized = true;
	            }
            });

            /**
             * Initialize the event bus: couple all Oryx events with a dispatch of the
             * event of the event bus. This way, it gets much easier to attach custom logic
             * to any event.
             */

            $rootScope.editorFactory.promise.then(function() {

                KISBPM.eventBus.editor = $rootScope.editor;

                var eventMappings = [
                    { oryxType : ORYX.CONFIG.EVENT_SELECTION_CHANGED, kisBpmType : KISBPM.eventBus.EVENT_TYPE_SELECTION_CHANGE },
                    { oryxType : ORYX.CONFIG.EVENT_DBLCLICK, kisBpmType : KISBPM.eventBus.EVENT_TYPE_DOUBLE_CLICK },
                    { oryxType : ORYX.CONFIG.EVENT_MOUSEOUT, kisBpmType : KISBPM.eventBus.EVENT_TYPE_MOUSE_OUT },
                    { oryxType : ORYX.CONFIG.EVENT_MOUSEOVER, kisBpmType : KISBPM.eventBus.EVENT_TYPE_MOUSE_OVER }

                ];

                eventMappings.forEach(function(eventMapping) {
                    $rootScope.editor.registerOnEvent(eventMapping.oryxType, function(event) {
                        KISBPM.eventBus.dispatch(eventMapping.kisBpmType, event);
                    });
                });
                
                $rootScope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SHAPEREMOVED, function (event) {
    	    		var validateButton = document.getElementById(event.shape.resourceId + "-validate-button");
    	    		if (validateButton)
    	    		{
    	    			validateButton.style.display = 'none';
    	    		}
                });

                // The Oryx canvas is ready (we know since we're in this promise callback) and the
                // event bus is ready. The editor is now ready for use
                KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_EDITOR_READY, {type : KISBPM.eventBus.EVENT_TYPE_EDITOR_READY});

            });
            
            // Alerts
            $rootScope.alerts = {
                queue: []
            };
          
            $rootScope.showAlert = function(alert) {
                if(alert.queue.length > 0) {
                    alert.current = alert.queue.shift();
                    // Start timout for message-pruning
                    alert.timeout = $timeout(function() {
                        if (alert.queue.length == 0) {
                            alert.current = undefined;
                            alert.timeout = undefined;
                        } else {
                            $rootScope.showAlert(alert);
                        }
                    }, (alert.current.type == 'error' ? 5000 : 1000));
                } else {
                    $rootScope.alerts.current = undefined;
                }
            };
          
            $rootScope.addAlert = function(message, type) {
                var newAlert = {message: message, type: type};
                if (!$rootScope.alerts.timeout) {
                    // Timeout for message queue is not running, start one
                    $rootScope.alerts.queue.push(newAlert);
                    $rootScope.showAlert($rootScope.alerts);
                } else {
                    $rootScope.alerts.queue.push(newAlert);
                }
            };
          
            $rootScope.dismissAlert = function() {
                if (!$rootScope.alerts.timeout) {
                    $rootScope.alerts.current = undefined;
                } else {
                    $timeout.cancel($rootScope.alerts.timeout);
                    $rootScope.alerts.timeout = undefined;
                    $rootScope.showAlert($rootScope.alerts);
                }
            };
          
            $rootScope.addAlertPromise = function(promise, type) {
                if (promise) {
                    promise.then(function(data) {
                        $rootScope.addAlert(data, type);
                    });
                }
            };
          
        }
  ])

    // Moment-JS date-formatting filter
    .filter('dateformat', function() {
        return function(date, format) {
            if (date) {
                if (format) {
                    return moment(date).format(format);
                } else {
                    return moment(date).calendar();
                }
            }
            return '';
        };
    });
