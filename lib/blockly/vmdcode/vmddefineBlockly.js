//---------------------------------------------------------------------
//--------自定义块 -----------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//添加变量块  固定格式
//goog.require('Blockly.FieldDate')
var addVarBlock = function(vars) {
	for (var i = 0; i < vars.length; i++) {
		Blockly.defineBlocksWithJsonArray([{
			"type": vars[i],
			"message0": vars[i],
			"output": "String",
			"colour": 230,
			"tooltip": "",
			"helpUrl": ""
		}]);
		Blockly.Vars.block.push(vars[i]);
		Blockly.JavaScript[vars[i]] = function(block) {
			var inputList;
			inputList = block.inputList[0];
			var fieldRow = inputList.fieldRow;
			var code = "";
			var varcode = fieldRow[0].value_;
			if (varcode == "sysdate")
				code = 'vmd.getSysDate()'
			else if (varcode == "sysdatetime")
				code = 'vmd.getSysDateTime()'
			else if (varcode == "login")
				code = 'vmd.getLogin()'
			else
				code = varcode + '.getValue()'
			return [code, ""];
		}
	}
}
addVarBlock(["sysdate","sysdatetime","login"])


//添加数据集块  固定格式
var addStoreBlock = function(storefields) {
	//添加数据集的字段值 块
	for (var i = 0; i < storefields.length; i++) {
	var storename=storefields[i].name
		Blockly.defineBlocksWithJsonArray([{
				"type": storefields[i].name,
				"message0": "%1",
				"args0": [
					{
						"type": "field_dropdown",
						"name": "field",
						"options": storefields[i].fields
					}
				],
				"output": null,
				"colour": 230,
				"tooltip": "",
				"helpUrl": ""
			},
			/*{
				"type": storefields[i].name+"rowtype",
				"message0": "%1",
				"args0": [{
						"type": "field_dropdown",
						"name": "type",
						"options": [
							["当前行", "currow"],
							["首行", "first"],
							["尾行", "end"]
						]
					}
				],
				"output": null,
				"colour": 230,
				"tooltip": "",
				"helpUrl": ""
			},*/
			{
				"type": "get" + storefields[i].name + "count",
				"message0": "COUNT",
				"output": null,
				"colour": 230,
				"tooltip": "",
				"helpUrl": ""
			},{
				"type": "get" + storefields[i].name + "Math",
				"message0": " %1 %2",
				"args0": [{
						"type": "field_dropdown",
						"name": "type",
						"options": [
							["sum", "sum"],
							["avg", "avg"],
							["max", "max"],
							["min", "min"]
						]
					},{
					"type": "field_dropdown",
					"name": "field",
					"options": storefields[i].fields
				}],
				"output": null,
				"colour": 230,
				"tooltip": "",
				"helpUrl": ""
			}
		]);
		//块的脚本转换
		Blockly.JavaScript[storefields[i].name] = function(block) {
			var inputList;
			inputList = block.inputList[0];
			var fieldRow = inputList.fieldRow;			
			var field = fieldRow[0].value_;
				code = storename + ".getCurrowValue('"+field+"')" ;
					
			//处理类型
			var fieldType=parent.blocklyGetFileType(field)
			if(fieldType==1)
				code=" Number("+code+")";	
			if(fieldType=="2")
				code=" new Date("+code+").getTime()";				
			return [code, ""];
		}
		
		//数据集记录数的脚本解析
		Blockly.JavaScript["get" + storefields[i].name + "count"] = function(block) {
			var inputList;
			inputList = block.inputList[0];
			var fieldRow = inputList.fieldRow;
			var code = "";
			code = storename + ".getCount()";
			return [code, ""];
		}
		//数据集记录数的脚本解析
		Blockly.JavaScript["get" + storefields[i].name + "Math"] = function(block) {
			var inputList;
			inputList = block.inputList[0];
			var fieldRow = inputList.fieldRow;
			var code = "";
			var type = fieldRow[0].value_;
			var field = fieldRow[1].value_;
			if(type=="sum")
				code = storename + ".getSum('"+field+"')";
			if(type=="max")
				code = storename + ".getMax('"+field+"')";
			if(type=="min")
				code = storename + ".getMin('"+field+"')";
			if(type=="avg")
				code = storename + ".getAvg('"+field+"')";	
			//处理类型
			var fieldType=parent.blocklyGetFileType(field)
			if(fieldType==1)
				code=" Number("+code+")";	
			if(fieldType=="2")
				code=" new Date("+code+").getTime()";		
			return [code, ""];
		}	

		Blockly.Datasets.block.push(storefields[i].name);
		Blockly.Datasets.block.push("get" + storefields[i].name + "count");
		Blockly.Datasets.block.push("get" + storefields[i].name + "Math");		
	}
}

//添加方法块   不同方法不同解析  需但对添加
Blockly.defineBlocksWithJsonArray([{
	"type": "vmdreturn",
	"message0": "return %1",
	"args0": [{
		"type": "input_value",
		"name": "VALUE"
	}],
	"inputsInline": false,
	"previousStatement": null,
	"colour": 230,
	"tooltip": "",
	"helpUrl": ""
},
{
  "type": "tonumber",
  "message0": "转换为数字 %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "output": "Number",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""	
},{
  "type": "todate",
  "message0": "转换为日期 %1",
  "args0": [
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "output": "Number",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""	
},
{
  "type": "returntip",
  "message0": "返回值 %1     提示消息 %2",
  "args0": [
    {
      "type": "input_value",
      "name": "state",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "msg",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);
Blockly.JavaScript["vmdreturn"] = function(block) {
	var b = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	return "return " + (Blockly.JavaScript.valueToCode(block, "VALUE", b) || "false") + ";\r\n"
}
Blockly.JavaScript["todate"] = function(block) {
	var b = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	var value=Blockly.JavaScript.valueToCode(block, "VALUE", b);
	if(new Date(value)=="Invalid Date")
		alert("输入的日期格式不正确")
	else
		return ["new Date(" + (Blockly.JavaScript.valueToCode(block, "VALUE", b) ) + ").getTime()",""]
}
Blockly.JavaScript["returntip"] = function(block) {	
	var b = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	return "return {status:" + (Blockly.JavaScript.valueToCode(block, "state", b) || "false") + ",\r\n"+
			"msg:"+ (Blockly.JavaScript.valueToCode(block, "msg", b) || "''") + "};\r\n";
}
Blockly.Functions.block.unshift("todate")
//Blockly.Functions.block.unshift("returntip")


//定义组合快
if (Blockly.Blocks.returntip) {
		d = Blockly.utils.xml.createElement("block");
		d.setAttribute("type","returntip");
		d.setAttribute("gap", 16);
		e = Blockly.utils.xml.createElement("value");
		e.setAttribute("name", "state");
		e_1 = Blockly.utils.xml.createElement("block");			
		e_1.setAttribute("type", "logic_boolean");
		e_1.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE));
		e.appendChild(e_1);	
		
		e1 = Blockly.utils.xml.createElement("value");
		e1.setAttribute("name", "msg");		
		e1_1 = Blockly.utils.xml.createElement("block");	
		e1_1.setAttribute("type", "text");
		e1_1.appendChild(Blockly.utils.xml.createTextNode(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE));
		e1.appendChild(e1_1);

		d.appendChild(e);
		d.appendChild(e1);
		Blockly.Functions.customBlock.unshift(d)
	}
