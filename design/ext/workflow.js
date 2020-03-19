Ext.define('ide.ext.workflow', {

	getVersion: function(version) {
		return version || '3.0.2'
	},
	statics: {
		init: function(layout) {
			
			var nodeInfo = Ext.decode(unescape(getUrlParam("nodeInfo")));
			if(nodeInfo) {
				var hasWorkFlow = false;
				var workFlowInfo = {};
				for(var i = 0; i < layout.components.length; i++) {
					if(layout.components[i].cid == "vmdWorkFlow") {
						hasWorkFlow = true;
						workFlowInfo = layout.components[i];
					}
				}
                
				//有工作流节点 需要添加节点信息
				if(hasWorkFlow) {
					var workflowId = workFlowInfo.id;
					var flowInfo = Ext.decode(workFlowInfo.userConfig.flowInfo)
					var configInfo = Ext.decode(workFlowInfo.userConfig.configInfo)
					var hasNode = false;

					for(var i = 0; i < configInfo.variantNode.length; i++) {
						if(configInfo.variantNode[i].taskNodeid == nodeInfo.variantNode.taskNodeid) {
							hasNode = true;
							break;
						}
					}
					if(!hasNode) {
						//添加节点
						xds.vmd.addNode([{
							cid: 'vmdWorkFlowNode',
							name: nodeInfo.variantNode.taskNodeName,
							nodeId: nodeInfo.variantNode.taskNodeid,
							id: nodeInfo.variantNode.taskNodeid
						}], workflowId)
						//添加节点变量
						var varObj = nodeInfo.variantNode.formProperties || [];
						var varData = [];
						for(var j = 0; j < varObj.length; j++) {
							varData.push({
								cid: 'vmdWorkFlowNodeVar',
								name: varObj[j].name,
								type: varObj[j].type
							})
						}
						//xds.vmd.addNode(varData, nodeInfo.variantNode.taskNodeid)
						configInfo.variantNode.push(nodeInfo.variantNode);
						xds.vmd.getTreeNodeById(workflowId).component.setConfig("configInfo", Ext.encode(configInfo))
					}

				}
				//无工作流节点 需要新建工作流节点
				else {
					var configInfo = {
						modelId: nodeInfo.modelId, //.getSelectedItemId(),
						modelName: nodeInfo.modelName || "",
						startNodeId: nodeInfo.variantProcess.taskNodeid,
						variantNode: [nodeInfo.variantNode],
						variantProcess: nodeInfo.variantProcess.formProperties || []
					};
					var flowInfo = {
						modelId: nodeInfo.modelId, //.getSelectedItemId(),
						modelName: nodeInfo.modelName || ""
					}
					//添加工作流节点
					xds.vmd.addNode([{
						cid: 'vmdWorkFlow',
						flowInfo: Ext.encode(flowInfo),
						configInfo: Ext.encode(configInfo),
						id: "hwWorkFlow"
					}])
					//添加全局变量节点
					var gvarObj = nodeInfo.variantProcess.formProperties || [];
					if(gvarObj.length > 0) {
						
						//添加工作流节点
						xds.vmd.addNode([{
							cid: 'vmdWorkFlowVarFord',
							name: "全局变量",
							nodeId: "hwglobalvariable",
							id: "hwglobalvariable"
						}], "hwWorkFlow")
						var gvarData = [];
						for(var j = 0; j < gvarObj.length; j++) {
							gvarData.push({
								cid: 'vmdWorkFlowNodeVar',
								name: gvarObj[j].name,
								type: gvarObj[j].type
							})
						}
						//xds.vmd.addNode(gvarData, "hwglobalvariable")
					}
					//添加节点
					xds.vmd.addNode([{
						cid: 'vmdWorkFlowNode',
						name: nodeInfo.variantNode.taskNodeName,
						nodeId: nodeInfo.variantNode.taskNodeid,
						id: nodeInfo.variantNode.taskNodeid
					}], "hwWorkFlow")
					//添加节点变量
					var varObj = nodeInfo.variantNode.formProperties || [];
					var varData = [];
					for(var j = 0; j < varObj.length; j++) {
						varData.push({
							cid: 'vmdWorkFlowNodeVar',
							name: varObj[j].name,
							type: varObj[j].type
						})
					}
					//xds.vmd.addNode(varData, nodeInfo.variantNode.taskNodeid)
				}
			} else {}
		}

	}

})