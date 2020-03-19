


vmd.loadHwWorkFlow = function(comp, config, afterloader) {
	Ext.apply(comp, {
		workFlowInfo: null,
		modelId: "",
		modelName: "",
		taskNodeKey: "", //当前节点id
		taskNodeName: "", // 当前节点name
		startNodeId: "", //开始节点id信息
		assignee: "", //关系人
		processInstanceId: "", //流程实例ID
		taskId: "", //任务id
		eLogin: "", //当前加密登录用户
		login: "",
		token: "",
		taskVars: null, //
		formVars: null,
		processDefinitionInfo: "", //流程定义信息	
		processDefinitionId: "", //流程定义id
		creatTime: null,
		afterLoader: null,
		workFlowServerIp: "",
		beforeInit: function() {
			//初始化完成之后获取节点
			var me = this;
			if(this.taskId != "") {
				this.getTaskId(this.taskId, function() {});
				this.getTaskVars(this.taskId, function() {
					me.getFormVars(me.taskId, me.afterLoader);
				});
			} //通过流程实例判断，是否为通过流程实例获取任务id ，存在流程实例id  则获取流程信息，否则启动新流程
			else {
				if(this.processInstanceId != "") { //通过流程实例获取任务id
					me.afterLoader();
				} else {
					this.getProcessDefinitio(me.afterLoader); //获取流程实例
				}
			}
		},
		/*
		 **获取所有节点信息(该方法需在vmd中绑定节点后才可获取)
		 * @return  {array} 
		 */
		getAllNodesInfo: function() {
			return this.workFlowInfo.variantNode;
		},
		/*
		 **获取节点信息(该方法需在vmd中绑定节点后才可获取)
		 * @param  {string}nodeId  节点id
		 * @return  {object}  节点对象 
		 */
		getNodeInfo: function(nodeId) {
			if(!nodeId || nodeId == "")
				return null;
			var nodeObj = null;
			for(var i = 0; i < this.workFlowInfo.variantNode.length; i++) {
				if(this.workFlowInfo.variantNode[i].taskNodeid == nodeId) {
					nodeObj = this.workFlowInfo.variantNode[i];
					break;
				}
			}
			return nodeObj;
		},
		/*
		 **获取节点变量(该方法需在vmd中绑定节点后才可获取)
		 * @param  {string}nodeId  节点id
		 * @return  {array}  节点变量对象 
		 */
		getNodeVar: function(nodeId) {
			if(!nodeId || nodeId == "")
				return [];
			var nodeVarArray = [];
			for(var i = 0; i < this.workFlowInfo.variantNode.length; i++) {
				if(this.workFlowInfo.variantNode[i].taskNodeid == nodeId) {
					nodeVarArray = this.workFlowInfo.variantNode[i].formProperties || [];
					break;
				}
			}
			return nodeVarArray;
		},
		/*
		 **获取节点变量和值(该方法需在vmd中绑定节点后才可获取)
		 * @param  {string}nodeId  节点id
		 * @param  {string}Varname  变量名
		 * @return  {string}  节点变量值 
		 */
		getNodeVarValue: function(nodeId, Varname) {
			if(!nodeId || nodeId == "")
				return [];
			var nodeVarArray = [];
			var value = "";
			for(var i = 0; i < this.workFlowInfo.variantNode.length; i++) {
				if(this.workFlowInfo.variantNode[i].taskNodeid == nodeId) {
					nodeVarArray = this.workFlowInfo.variantNode[i].formProperties || [];
					for(var j = 0; j < nodeVarArray.length; j++) {
						if(Varname == nodeVarArray[j].id)
							value: eval(nodeVarArray[j].value || "").getValue() || ""
						break;
					}
					break;
				}
			}
			return value;
		},
		/*
		 **获取节点所有的变量(该方法需在vmd中绑定节点后才可获取)
		 * @param  {string}nodeId  节点id
		 * @return  {array}  节点变量数组对象数组 
		 */
		getNodeAllVarValue: function(nodeId) {
			if(!nodeId || nodeId == "")
				return [];
			var nodeVarArray = [];
			var nodeVarValueArray = [];
			for(var i = 0; i < this.workFlowInfo.variantNode.length; i++) {
				if(this.workFlowInfo.variantNode[i].taskNodeid == nodeId) {
					nodeVarArray = this.workFlowInfo.variantNode[i].formProperties || [];
					for(var j = 0; j < nodeVarArray.length; j++) {
						if(nodeVarArray[j].id!='调用规则'&&nodeVarArray[j].name!='调用规则')
						{if(nodeVarArray[j].value) {
							var value = "";
							if(window[nodeVarArray[j].value] != undefined) {
								value = eval(nodeVarArray[j].value || "").getValue() || "";
							} else {
								try {
									value = eval(nodeVarArray[j].value);
								} catch(err) {
									value = eval("(function(){" + nodeVarArray[j].value + "})()") || "";
								}
							}
							nodeVarValueArray.push({
								id: nodeVarArray[j].id,
								value: value || ''
							})
						}}						
					}
					break;
				}
			}
			return nodeVarValueArray;
		},
		/*
		 **获取全局变量(该方法需在vmd中绑定节点后才可获取)
		 * @return  {array}  节点变量节点对象数组 
		 */
		getGlobalVar: function() {
			return this.workFlowInfo.variantProcess || [];
		},
		/*
		 **获取所有全局变量和值
		 * @return  {array}  返回全局变量数组 
		 */
		getAllGlobalVarValue: function() {
			return this.taskVars || [];
		},
		/*
		 **获取全局变量和值
		 * @param  {string}varName  全局变量名称
		 * @return  {object}  返回指定变量的值 
		 */
		getGlobalVarValue: function(varName) {
			if(!varName || varName == "")
				return "";
			var GlobalVarArray = this.taskVars || [];
			var varValue = ""; // = [];
			for(var j = 0; j < GlobalVarArray.length; j++) {
				if(varName == GlobalVarArray[j].name) {
					varValue = GlobalVarArray[j].value
					break;
				}
			}
			return varValue;
		},
		/*
		 **提交工作流  根据初始化时设置的 工作流id、流程实例、任务id等信息进行提交
		 * @param  {function}callback  提交成功的回调，回调中参数为下一节点的节点信息、任务号等。
		 * @return  {void}   
		 */
		submit: function(callBack) {
			if(this.taskId == "") {
				//任务ID为空，启动新流程
				startProcess(callBack);
			} else {
				submitTask(callBack);
			}
		},
		/*
		 **获取工作流所需参数  包括token/info
		 * @return  {object}   
		 */
		_getparams: function() {
			if(vmd && vmd.core && vmd.core.isDesignMode()) {
				return {
					info: "kermit"
				}
			} else {
				if(hwDas.runMode == "test" || hwDas.debugStatus == "open") {
					return {
						info: getUrlParam("username") || "kermit"
					}
				} else {
					if(this.token)
						return {
							hwToken: this.token
						}
					else if(this.eLogin) return {
						einfo: this.eLogin
					}
					else return {
						info: this.login
					}
				}
			}
		},
		/*
		 **通过任务id获取节点id
		 * @param  {string}taskId  任务id。
		 * @param  {function}callback  获取成功的回调，回调中参数为对应节点的节点信息等。
		 * @return  {void}   
		 */
		getTaskId: function(taskId, callBack) {
			var successFun;
			var errorFun;
			var me = this;
			if(!taskId)
				return;
			if(typeof callBack == "object") {
				successFun = me._getobjpro(callBack, "success");
				errorFun = me._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			// 获取根节点下的文件夹节点信息
			hwDas.ajax({
				url: "http://" + (me.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/tasks/" + taskId,
				type: 'get',
				params: me._getparams(),
				success: function(result) {
					me.assignee = result.assignee;
					me.TaskNodeKey = result.taskDefinitionKey;
					me.TaskNodeName = result.name;
					me.processInstanceId = result.processInstanceId;
					me.creatTime = result.createTime;
					if(successFun)
						successFun.apply(me, [result]);
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("获取工作流节点失败" + JSON.stringify(msg))
					//Ext.Msg.alert("提示", "获取工作流节点失败", function() {})
				}
			})
		},
		/*
		 **通过任务id获取表单变量
		 * @param  {string}taskId  任务id。
		 * @param  {function}callback  获取成功的回调，回调中参数为返回的表单变量信息等。
		 * @return  {void}   
		 */
		getFormVars: function(taskId, callBack) {
			var successFun;
			var errorFun;
			var thisobject = this;
			if(typeof callBack == "object") {
				successFun = thisobject._getobjpro(callBack, "success");
				errorFun = thisobject._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(taskId == "" || !taskId)
				return;
			// 获取根节点下的文件夹节点信息
			hwDas.ajax({
				//workFlowIp
				url: "http://" + (thisobject.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/form/form-data?taskId=" + taskId,
				type: 'get',
				params: thisobject._getparams(),
				success: function(result) {
					var processForm = result;
					var formvarlist = [];
					for(var item in processForm.formProperties) {
						if(processForm.formProperties[item].writable == true) {
							formvarlist.push(processForm.formProperties[item]);
						} else {
							var isExist = false;
							var i = thisobject.taskVars.length;
							while(i--) {
								if(thisobject.taskVars[i].name === processForm.formProperties[item].name) {
									isExist = true;
								}
							}
							if(isExist) {
								thisobject.taskVars.push(processForm.formProperties[item]);
							}
						}
					}
					thisobject.formVars = formvarlist;
					if(successFun)
						successFun.apply(null, [result]);
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("获取工作流节点失败" + JSON.stringify(msg))
					//Ext.Msg.alert("提示", "获取工作流节点失败", function() {})
				}
			})
		},
		/*
		 **通过任务id获取节点变量
		 * @param  {string}taskId  任务id。
		 * @param  {function}callback  获取成功的回调，回调中参数为返回的节点变量信息等。
		 * @return  {void}   
		 */
		getTaskVars: function(taskId, callBack) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;

			if(taskId == "" || !taskId)
				return;
			// 获取根节点下的文件夹节点信息
			var me = this;
			hwDas.ajax({
				//workFlowIp
				url: "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/tasks/" + taskId + "/variables",
				type: 'get',
				params: this._getparams(),
				success: function(result) {
					me.taskVars = result;
					if(successFun)
						successFun.apply(me, [result]);
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("获取工作流节点失败" + JSON.stringify(msg))
					//Ext.Msg.alert("提示", "获取工作流节点失败", function() {})
				}
			})
		},
		/*
		 **在taskid为空时,获取流程变量和表单信息。
		 * @param  {function}callback  获取成功的回调，回调中参数为流程变量和表单信息等。
		 * @return  {void}   
		 */
		getProcessDefinitio: function(callBack) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			this.getProcessDefinitioByModelId.apply(this, [{
				success: function(result) {
					this.processDefinitionInfo = result;
					this.processDefinitionId = result.id;
					if(successFun)
						successFun.apply(null, [result]);
				},
				error: errorFun
			}, this.modelId])
		},
		/*
		 **通过模型id获取流程定义信息。
		 * @param  {function}callback  获取成功的回调，回调中参数为流程定义信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}modelId  流程模型id。
		 * @return  {void}   
		 */
		getProcessDefinitioByModelId: function(callBack, modelId) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!modelId) {
				if(errorFun)
					errorFun.apply(null, ["模型id不能为空！"])
				else
					console.log("模型id不能为空！")
				return;
			}
			var me = this;
			hwDas.ajax({
				url: "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/repository/modeltoprocessdefinition?id=" + modelId,
				type: 'get',
				params: this._getparams(),
				success: function(result) {
					if(successFun)
						successFun.apply(me, [result]);
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("获取流程定义Id失败，请检查该流程是否已发布" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "获取流程定义Id失败，请检查该流程是否已发布", function() {})
				}
			})
		},
		/*
		 **启动流程 通过回调返回流程实例信息
		 * @param  {function}callback  获取成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @return  {void}   
		 */
		startProcess: function(callBack) {
			this._startProcess.apply(this, [callBack]);
		},
		/*
		 **启动流程  通过回调返回下个节点信息
		 * @param  {function}callback  启动成功的回调，回调中参数为下个节点信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @return  {void}   
		 */
		startProcess2: function(callBack) {
			this._startProcess.apply(this, [callBack, 'hw']);
		},
		/*
		 **启动流程      对象内部调用用
		 * @param  {function}callback  获取成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}type  类型  ‘hw’ 代表返回下个节点信息。
		 * @return  {void}
		 */
		_startProcess: function(callBack, type) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(this.processDefinitionId !== null && this.processDefinitionId !== undefined && this.processDefinitionId !== '') {
				//组织参数
				var ProcessInstancesParams = this._getStartProcessparams.apply(this, []);
				this._startProcessByProcessDefinition.apply(this, [{
					success: function(result) { //成功则证明该流程已发布 可启动
						this.processInstanceId = result.id;
						if(successFun)
							successFun.apply(null, [result])
					},
					error: errorFun
				}, ProcessInstancesParams, type])
			} else {
				console.log("获取流程定义Id失败，请检查该流程是否已发布") //Ext.Msg.alert("提示", "获取流程定义Id失败，请检查该流程是否已发布", function() {})
			}
		},
		/*
		 **启动流程 参数获取  	   对象内部调用用
		 * @return  {void}
		 */
		_getStartProcessparams: function() {
			var ProcessInstancesParams = {};
			ProcessInstancesParams.processDefinitionId = this.processDefinitionId;
			ProcessInstancesParams.variables = [];
			var nodeinfo = this.getNodeAllVarValue(this.startNodeId)
			for(var i = 0; i < nodeinfo.length; i++) {
				ProcessInstancesParams.variables.push({
					"name": nodeinfo[i].id,
					"value": nodeinfo[i].value
				});
			}
			return ProcessInstancesParams
		},
		/*
		 **通过流程定义信息启动流程 返回流程实例信息
		 * @param  {function}callback  获取成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}ProcessDefinitio  流程定义id。
		 * @return  {void}   
		 */
		startProcessByProcessDefinition: function(callBack, ProcessDefinitio) {
			this._startProcessByProcessDefinition.apply(this, [callBack, ProcessDefinitio])
		},
		/*
		 **通过流程定义信息启动流程 返回下个节点信息
		 * @param  {function}callback  获取成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}ProcessDefinitio  流程定义id。 
		 * @return  {void}   
		 */
		startProcessByProcessDefinition2: function(callBack, ProcessDefinitio) {
			this._startProcessByProcessDefinition(this, [callBack, ProcessDefinitio, 'hw'])
		},
		/*
		 **通过流程定义信息启动流程  对象内部调用用
		 * @param  {function}callback  获取成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}ProcessDefinitio  流程定义id。
		 * @param  {string}type  类型  ‘hw’ 代表返回下个节点信息。
		 * @return  {void}   
		 */
		_startProcessByProcessDefinition: function(callBack, ProcessDefinitio, type) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!ProcessDefinitio) {
				if(errorFun)
					errorFun.apply(null, ["流程定义id不能为空！"])
				else
					console.log("流程定义id不能为空！")
				return;
			}
			var aurl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/process-instances";
			if(type && type == 'hw')
				aurl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/hwprocess-instances";

			//成功则证明该流程已发布 可启动
			var me = this;
			hwDas.ajax({
				url: aurl,
				type: 'post',
				params: this._getparams(),
				contentType: 'application/json;charset=UTF-8',
				data: ProcessDefinitio,
				success: function(result) {
					if(successFun)
						successFun.apply(me, [result])
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("启动流程实例失败" + JSON.stringify(msg))
					//Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				}
			})
		},
		/*
		 **根据模型ID,参数启动流程，返回流程实例信息
		 * @param  {function}callback  启动成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}modelId  模型id。
		 * @param  {array}startuser  参数列表， [{name:"",value:""}]。	
		 * @return  {void}   
		 */
		startProcessByModelId: function(callBack, modelId, startuser) {
			this._startProcessByModelId.apply(this, [callBack, modelId, startuser]);
		},
		/*
		 **根据模型ID,参数启动流程，返回下个节点信息
		 * @param  {function}callback  启动成功的回调，回调中参数为下个节点信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}modelId  流程模型id  。
		 * @param  {array}startuser  参数列表  [{name:"",value:""}]。
		 * @return  {void}   
		 */
		startProcessByModelId2: function(callBack, modelId, startuser) {
			this._startProcessByModelId(this, [callBack, modelId, startuser, 'hw']);
		},
		/*
		 **根据模型ID,参数启动流程，   对象内部调用用
		 * @param  {function}callback  启动成功的回调，回调中参数为流程实例信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。
		 * @param  {string}modelId  模型id。
		 * @param  {array}startuser  参数列表， [{name:"",value:""}]。	
		 * @param  {string}type  类型  ‘hw’ 代表返回下个节点信息。
		 * @return  {void}   
		 */
		_startProcessByModelId: function(callBack, modelId, startuser, type) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;

			if(!modelId) {
				if(errorFun)
					errorFun.apply(null, ["模型id不能为空！"])
				else
					console.log("模型id不能为空！")
				return;
			}
			this.getProcessDefinitioByModelId.apply(this, [{
				success: function(result) {
					var processDefinition = {};
					processDefinition.processDefinitionId = result.id;
					processDefinition.variables = startuser;
					this._startProcessByProcessDefinition.apply(this, [{
						success: function(result1) {
							//Ext.Msg.alert("提示", "启动流程成功", function() {})
							if(successFun)
								successFun.apply(null, [result])
						},
						error: errorFun
					}, processDefinition, type])
				},
				error: errorFun
			}, modelId])
		},
		_getobjpro: function(obj, pro) {
			for(var key in obj) {
				if(key == pro) {
					return obj[key];
				}
			}
			return null;
		},
		/*
		 **启动流程  并将待办信息写入到待办中心，无需再单独写待办
		 * @param  {object}startConfig  启动流程所需参数，格式如下：其中moduleId必须填写，variables不传时会自动获取
		   {	modelId:30057,//必填 通过模版id启动
				variables:[ {"name": "", "value": ""}],//list 选填，为空会自己组织参数 {"name": "", "value": ""}
				assigneeListId:"assigneeList",//string 选填，在启用会签时需要，此名称与流程图中要一致
				assigneeList:["kermit","dbadmin","ceshi02"],//lsit 选填，在启用会签时需要，设置会签人员
				msgData:"",//string 选填，消息体内容,消息推送用
				isSendMsg:"",//bool 选填，是否发消息,默认true
				isGtask:"",//bool 选填，是否保存待办，默认true
				title:"",//string 选填，流程启动后待办名称，不传内部写入流程实例名称
				content:""//string 选填，流程启动后待办内容
				remark:"",// 备注
				tasklink:"",// 任务链接，用于查询已办使用
				formusername:"",// 表单处理人名称(保留字段未做处理)  汉字名
				business:"",// 业务键值,建立流程与业务对应关系
				success:""//function 选填，成功回调
				error:""//function 选填，失败回调
				}
		 * @return  {void}   
		 */
		startProcess_StandbyCenter: function(startConfig) {
			var successFun;
			var errorFun;
			successFun = this._getobjpro(startConfig, "success");
			errorFun = this._getobjpro(startConfig, "error");
			if(!this._getobjpro(startConfig, "modelId") && !this.modelId) {
				Ext.Msg.alert("提示", "未设置流程模版id，启动失败！", function() {})
				return;
			}
			if(!startConfig.modelId)
				startConfig.modelId = this.modelId;
			if(!startConfig.variables)
				startConfig.variables = this._getStartProcessparams().variables;
			var aurl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/process-instancesbyMessage";
			//成功则证明该流程已发布 可启动
			var me = this;
			hwDas.ajax({
				url: aurl,
				type: 'post',
				params: this._getparams(),
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify(startConfig),
				success: function(result) {
					if(result.result=="true" && successFun)
						successFun.apply(me, [result])
					else if(result.result=="false" && errorFun)
						errorFun.apply(null, [result]);
					console.log("启动流程实例" + JSON.stringify(result)) //Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("启动流程实例失败" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				}
			})
		},
		/*
		 **设置签收人员  内部调用
		 * @param  {object}callback  回调函数集合	   {	success:""//function 必填，成功回调			error:""//function 必填，失败回调			}
		 * @param  {string}taskid  如果通过任务id签收 则需要传递此参数
		 * * @return  {void}
		 */
		_setAssigne: function(callback, taskid) {
			var successFun = callback.success;
			var errorFun = callback.error;
			if(!this.assignee) {
				var claimjson = {};
				claimjson.action = "claim";
				claimjson.eassignee = this.eLogin;
				var me = this;
				hwDas.ajax({
					url: "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/etasks/" + (taskid || this.taskId),
					type: 'post',
					params: this._getparams(),
					contentType: 'application/json;charset=UTF-8',
					data: claimjson,
					success: function(result) {
						if(successFun)
							successFun.apply(me, [msg]);
					},
					error: function(msg) {
						if(errorFun)
							errorFun.apply(null, [msg]);
						console.log(JSON.stringify(msg))
					}
				})
			} else
				successFun();
		},
		/*
		 **提交任务  内部调用
		 * @param  {object}callback  回调函数集合  {	success:""//function 必填，成功回调	error:""//function 必填，失败回调}
		 * @param  {string}type 参数  hw 标识带有下个节点信息的返回
		 * @param  {string}taskid 参数  任务id，无则按照绑定的任务id运行
		 * @return  {void}   
		 */
		_submitTask: function(callback, type, taskid, params) {
			var successFun = callback.success;
			var errorFun = callback.error;
			var ProcessInstancesParams = {};
			ProcessInstancesParams.taskId = taskid || this.taskId;
			ProcessInstancesParams.properties = params || this.getNodeAllVarValue(this.TaskNodeKey);
			var surl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/form/form-data";
			if(type === 'hw')
				surl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/form/hwform-data";
			var me = this;
			hwDas.ajax({
				url: surl,
				type: 'post',
				params: this._getparams(),
				contentType: 'application/json;charset=UTF-8',
				data: ProcessInstancesParams,
				success: function(result) {
					if(successFun)
						successFun.apply(me, [result])
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(this, [msg]);
					console.log("提交任务失败" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "提交任务失败", function() {})
				}
			})
		},
		/*
		 **提交任务 返回提交状态信息	
		 * @param  {function}callback  启动成功的回调，回调中参数为提交状态信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @return  {void}   
		 */
		SubmitTask: function(callBack) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!this.taskId) {
				if(errorFun)
					errorFun.apply(null, ["任务id不能为空！"])
				else
					console.log("任务id不能为空！")
				return;
			}
			this._setAssigne.apply(this, [{ //先设置签收人员
				success: this._submitTask.apply(this, [{
					sucess: successFun,
					error: errorFun
				}]),
				error: errorFun
			}])
		},
		/*
		 **提交任务 并返回下一个节点的任务信息，通过回调进行传递
		 * @param  {function}callback  启动成功的回调，回调中参数为下一个节点的任务信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @return  {void}   
		 */
		SubmitTask2: function(callBack) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!this.taskId) {
				if(errorFun)
					errorFun.apply(null, ["任务id不能为空！"])
				else
					console.log("任务id不能为空！")
				return;
			}
			this._setAssigne.apply(this, [{ //先设置签收人员
				success: this._submitTask.apply(this, [{
					sucess: successFun,
					error: errorFun
				}, 'hw']),
				error: errorFun
			}])
		},
		/*
		 **提交任务 并返回下一个节点的任务信息，通过回调进行传递
		 * @param  {function}callback  启动成功的回调，回调中参数为下一个节点的任务信息等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}taskid  要提交的任务id。	
		 * @param  {array}params  要提交的任务参数 [{name:"",value:""}]。	
		 * @return  {void}   
		 */
		SubmitTaskById: function(callBack, taskid, params) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!taskid && !this.taskId) {
				if(errorFun)
					errorFun.apply(null, ["任务id不能为空！"])
				else
					console.log("任务id不能为空！")
				return;
			}
			var taskid1 = taskid || this.taskId;
			this._setAssigne.apply(this, [{ //先设置签收人员
				success: this._submitTask.apply(this, [{ // 设置成功后调用提交方法
					sucess: successFun,
					error: errorFun
				}, 'hw', taskid, params]),
				error: errorFun
			}, taskid])
		},
		/*
		 **提交任务流程  并将待办信息写入到待办中心，无需再单独写待办
		 * @param  {object}submitConfig  启动流程所需参数，格式如下：其中taskId必须填写，properties不传时会自动获取
		   {	taskId:30057,//必填 通过模版id启动
				properties:[ {"id": "", "value": ""}],//list 选填，为空会自己组织参数 {"name": "", "value": ""}
				assigneeListId:"assigneeList",//string 选填，在启用会签时需要，此名称与流程图中要一致
				assigneeList:["kermit","dbadmin","ceshi02"],//lsit 选填，在启用会签时需要，设置会签人员
				msgData:"",//string 选填，消息体内容,消息推送用
				isSendMsg:"",//bool 选填，是否发消息,默认true
				isGtask:"",//bool 选填，是否保存待办，默认true
				title:"",//string 选填，流程启动后待办名称，不传内部写入流程实例名称
				content:"",//string 选填，流程启动后待办内容
				auditresult:"",//string 选填，审批结果
				auditsug:"",//string 选填，审批意见
				remark:"",// 备注
				tasklink:"",// 任务链接，用于查询已办使用
				formusername:"",// 表单处理人名称
				business:"",// 业务键值,建立流程与业务对应关系
				success:""//function 选填，成功回调
				error:""//function 选填，失败回调
				}
		 * @return  {void}   
		 */
		submitTask_StandbyCenter: function(submitConfig) {
			var successFun;
			var errorFun;
			successFun = this._getobjpro(submitConfig, "success");
			errorFun = this._getobjpro(submitConfig, "error");
			if(!this._getobjpro(submitConfig, "modelId") && !this.modelId) {
				Ext.Msg.alert("提示", "未设置流程模版id，启动失败！", function() {})
				return;
			}
			if(!submitConfig.taskId)
				submitConfig.taskId = this.taskId;
			if(!submitConfig.properties)
				submitConfig.properties = this.getNodeAllVarValue(this.TaskNodeKey);
			var aurl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/form/hwform-data-unifyByMsg";
			//成功则证明该流程已发布 可启动	
			var me = this;
			hwDas.ajax({
				url: aurl,
				type: 'post',
				params: this._getparams(),
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify(submitConfig),
				success: function(result) {
					if(result.result=="true" && successFun)
						successFun.apply(me, [result])
					else if(result.result=="false" && errorFun)
						errorFun.apply(null, [result]);
					console.log("提交任务" + JSON.stringify(result)) //Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("提交任务失败" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				}
			})
		},
		/*
		 **通过流程实例id获取任务id和节点id（根据用户和用户组进行提取）
		 * @param  {function}callback  启动成功的回调，回调中参数为任务id和节点id等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}processInstanceId  流程实例id。	
		 * @return  {void}   
		 */
		getTaskIdByProcessInstanceId: function(callBack, processInstanceId) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!processInstanceId && !this.processInstanceId) {
				if(errorFun)
					errorFun.apply(null, ["流程实例id不能为空！"])
				else
					console.log("流程实例id不能为空！")
				return;
			}
			this.getTaskIdByProcessInstanceId1({
				success: function(result) {
					if(result.size > 0 && successFun) {
						successFun.apply(this, [result]);
					} else {
						this.getTaskIdByProcessInstanceId2({
							success: function(result1) {
								if(result1.size > 0 && successFun) {
									successFun.apply(null, [result1]);
								} else {
									successFun.apply(null, [""]);
								}
							},
							error: errorFun
						}, processInstanceId || this.processInstanceId)
					}
				},
				error: errorFun
			}, processInstanceId || this.processInstanceId)
		},
		/*
		 **通过流程实例id和用户 获取任务id和节点id  ；用户自动读取cookie获取	
		 * @param  {function}callback  启动成功的回调，回调中参数为任务id和节点id等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}processInstanceId  流程实例id。	
		 * @return  {void}   
		 */
		getTaskIdByProcessInstanceId1: function(callBack, processInstanceId) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!processInstanceId && !this.processInstanceId) {
				if(errorFun)
					errorFun.apply(null, ["流程实例id不能为空！"])
				else
					console.log("流程实例id不能为空！")
				return;
			}
			this._getTaskInfoByProcessInstanceId.apply(this, [{
				success: successFun,
				error: errorFun
			}, processInstanceId || this.processInstanceId, "eassignee"]);
		},
		/*
		 **通过流程实例id和候选用户 获取任务id和节点id；候选用户自动读取cookie获取	
		 * @param  {function}callback  启动成功的回调，回调中参数为任务id和节点id等；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}processInstanceId  流程实例id。	
		 * @return  {void}   
		 */
		getTaskIdByProcessInstanceId2: function(callBack, processInstanceId) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!processInstanceId && !this.processInstanceId) {
				if(errorFun)
					errorFun.apply(this, ["流程实例id不能为空！"])
				else
					console.log("流程实例id不能为空！")
				return;
			}
			this._getTaskInfoByProcessInstanceId(this, [{
				success: successFun,
				error: errorFun
			}, processInstanceId || this.processInstanceId, "ecandidateUser"]);
		},
		/*
		 **通过流程实例id获取任务信息，返回流程对象信息，通过回调进行传递
		 * @param  {function}callback  启动成功的回调，回调中参数为任务信息，流程对象信息；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}processInstanceId  流程实例id。	
		 * @return  {void}   
		 */
		getTaskInfoByProcessInstanceId: function(callBack, processInstanceId) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!processInstanceId) {
				if(errorFun)
					errorFun.apply(this, ["流程实例id不能为空！"])
				else
					console.log("流程实例id不能为空！")
				return;
			}
			this._getTaskInfoByProcessInstanceId.apply(this, [{
				success: successFun,
				error: errorFun
			}, processInstanceId || this.processInstanceId]);
		},
		/*
		 **通过流程实例id获取任务信息，返回流程对象信息，通过回调进行传递
		 * @param  {function}callback  启动成功的回调，回调中参数为任务信息，流程对象信息；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {string}processInstanceId  流程实例id。
		 * @param  {string}type  类型 来定义获取的类型方式 ecandidateUser为通过候选用户；eassignee 为通过签收人获取。
		 * @return  {void}   
		 */
		_getTaskInfoByProcessInstanceId: function(callBack, processInstanceId, type) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			if(!processInstanceId && errorFun) {
				errorFun.apply(this, ["流程实例id不能为空！"])
				return;
			} else
				console.log("流程实例id不能为空！")
			var s_params = {
				processInstanceId: processInstanceId || this.processInstanceId,
				size: 1,
				sort: "createTime",
				order: "desc"
			};
			if(type === "ecandidateUser")
				s_params.ecandidateUser = this.eLogin;
			if(type === "eassignee")
				s_params.eassignee = this.eLogin;
			var _params = this._getparams() //获取用户信息
			for(var key in _params) //添加用户信息
				s_params[key] = _params[key];
			var me = this;
			hwDas.ajax({
				das: false,
				url: "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/tasks",
				type: 'get',
				dataType: "json",
				params: s_params,
				success: function(result) {
					if(successFun)
						successFun.apply(me, [result]);
				},
				error: function(msg, f) {
					if(errorFun)
						errorFun.apply(null, [msg])
					console.log("通过流程实例id获取任务失败！" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "通过流程实例id和代理用户获取任务失败！", function() {})
				}
			})
		},
		/*
		 **分配会签人员
		 * @param  {function}callback  启动成功的回调，回调中参数为任务信息，流程对象信息；也可以是成功、失败函数的对象集合{success:function(){}.error:function(){}}。	
		 * @param  {array}assigneeList  会签人员列表 此处为非加密的用户。		
		 * @param  {string}assigneelistName  会签名称，次名称为节点启用会签时设置的名称，默认为“assigneeList”。
		 * @return  {void}   
		 */
		allotAssignee: function(callBack, assigneeList, assigneelistName) {
			var successFun;
			var errorFun;
			if(typeof callBack == "object") {
				successFun = this._getobjpro(callBack, "success");
				errorFun = this._getobjpro(callBack, "error");
			} else
				successFun = callBack;
			var me = this;
			hwDas.ajax({
				das: false,
				url: "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/tasks/" + thisobject.taskId + "/collections/" + (assigneelistName || "assigneeList"),
				type: 'post',
				contentType: "application/json;charset=utf-8",
				dataType: "json",
				params: this._getparams(),
				data: assigneeList,
				success: function(result) {
					if(successFun)
						successFun.apply(me, [result]);
					console.log("分配会签人员成功！" + JSON.stringify(msg))
				},
				error: function(msg, f) {
					if(errorFun)
						errorFun.apply(null, [msg])
					console.log("分配会签人员失败！" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "分配会签人员失败！", function() {})
				}
			})
		},
		/*
		 **带审批历程的流程中断接口
		 * @param  {object}deleteinstanceConfig  格式如下：其中taskId必须填写，properties不传时会自动获取
		   {	taskId:30057,//string 选填，任务id,
				processInstanceId:"",//string 选填，流程实例id
				deleteReason:"",//string 选填，中断原因
				formusername:"",// 表单处理人名称
				title:"",//string 选填，流程启动后待办名称，不传内部写入流程实例名称
				content:"",//string 选填，流程启动后待办内容			
				remark:"",//string 选填，备注
				business:"",//string 选填，修改业务主键
				msgData:"",//string 选填，消息体内容,消息推送用
				isSendMsg:"",//bool 选填，是否发消息,默认true
				isGtask:"",//bool 选填，是否保存待办，默认true
				success:function(result){},//function 选填，成功回调
				error:function(result){}//function 选填，失败回调
				}
		 * @return  {void}    
		 */
		deleteinstance_StandbyCenter: function(deleteinstanceConfig) {
			var successFun;
			var errorFun;
			successFun = this._getobjpro(deleteinstanceConfig, "success");
			errorFun = this._getobjpro(deleteinstanceConfig, "error");
			var dataSend = {}
			var _taskId = deleteinstanceConfig.taskId || "";
			var _processInstanceId = deleteinstanceConfig.processInstanceId || ""
			this.processInstanceId;
			if(!_taskId && !_processInstanceId) {
				if(this.taskId) deleteinstanceConfig.taskId = this.taskId
				else if(this.processInstanceId) deleteinstanceConfig.processInstanceId = this.processInstanceId
				else {
					Ext.Msg.alert("提示", "未绑定流程或未设置流程实例与任务id，关闭失败！", function() {})
					return;
				}
			}
			var aurl = "http://" + (this.workFlowServerIp || vmdSettings.workflowIp) + "/activiti-rest/service/runtime/deleteinstancebyMsg";
			//成功则证明该流程已发布 可启动	
			var me = this;
			hwDas.ajax({
				url: aurl,
				type: 'post',
				params: this._getparams(),
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify(deleteinstanceConfig),
				success: function(result) {
					if(result.result && successFun)
						successFun.apply(me, [result])
					else if(!result.result && errorFun)
						errorFun.apply(null, [result]);
					console.log("关闭失败！" + JSON.stringify(result)) //Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				},
				error: function(msg) {
					if(errorFun)
						errorFun.apply(null, [msg]);
					console.log("关闭失败！" + JSON.stringify(msg)) //Ext.Msg.alert("提示", "启动流程实例失败", function() {})
				}
			})
		}
	})

	comp.taskId = getUrlParam("taskId") || config.taskId || "";
	comp.processInstanceId = getUrlParam("processInstanceId") || config.processInstanceId || "";
	comp.eLogin =getUrlParam('ecyLogin') || getUrlParam('EcyLogin') || getUrlParam('hwEcyLogin')||Ext.util.Cookies.get('ecyLogin') || Ext.util.Cookies.get('EcyLogin') || Ext.util.Cookies.get('hwEcyLogin') 	;
	comp.token = getUrlParam('hwToken') || getUrlParam('token')||Ext.util.Cookies.get('hwToken')|| Ext.util.Cookies.get('token');
	comp.login = getUrlParam('login')|| Ext.util.Cookies.get('login') || Ext.util.Cookies.get('Login');
	comp.workFlowInfo = config.configInfo;
	
	comp.afterLoader = afterloader;
	if(!comp.workFlowInfo) {
		comp.modelId = config.modelId;
		comp.modelName = config.modelName;
		comp.startNodeId = config.startNodeId;
	} else {
		comp.modelId = comp.workFlowInfo.modelId;
		comp.modelName = comp.workFlowInfo.modelName;
		comp.startNodeId = comp.workFlowInfo.startNodeId;
	}
	comp.workFlowServerIp = "";
	if(vmd.workspace)
		comp.workFlowServerIp = vmd.workspace.workflowIp || "";

}