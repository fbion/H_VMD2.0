/*
filename：hw_form.js
creater：闫祯祯
date created：2016.11.19
description：填报
date modified：2018.07.27
modifier：闫祯祯
version：2.3.16.0726
others：
copyright：Copyright @1999-2016, hwkj, All Rights Reserved
*/

/**
*表达式语法合格以后进一步校验是不是实际正确(如校验数据集是不是真的存在,字段是不是真的存在)
*/
(function () {
   /*  Handsontable.Core.prototype.getDatasets = function() {
        var names = {};
        var i = 0;
        var storeRoot = xds.vmd.getRootNode("dataset");
        if (typeof storeRoot != 'undefined') {
            storeRoot.eachChild(function(n) {
                names[i] = {};
                names[i].name = n.component.config.id;
                if (n.component.config.dsName) {
                    names[i].dsname = n.component.config.dsName;
                }
                names[i].fields = [];
                for (var key in n.childNodes) {
                    var field = n.childNodes[key];
                    if (field && field.attributes) {
                        names[i].fields.push(field.attributes.text);
                    }
                }
                i++
            }, this);
        }
        return names;
    } */
    Handsontable.Core.prototype.checkExp = function (exp,reportid) {
        //校验数据集,字段,单元格是不是真是存在
        var initialResult=runC(exp);
        if(initialResult.flag){
            //实际校验
            var pendingList=initialResult.rlist;
            if(pendingList[0]=="2"){//数据集表达式
                var existDs=this.getDatasets();//真实数据集名称及字段名
                var unknownDsName=exp.split(".")[0];//表达式用到的数据集
                var checkResult=this.checkName(unknownDsName,existDs,reportid);
                if(checkResult.isExist){//数据集存在
                    //校验字段是否真实存在
                    if(this.checkField(pendingList,checkResult.fields)){
                        return {flag:true};
                    }else{//表达式涉及的字段不存在
                        return {flag:false,usermsg:"字段不存在，检查字段名书写是否正确"};
                    }                    
                }else{//实际不存在该数据集，所以表达式错误
                    return {flag:false,usermsg:"数据集不存在，检查数据集名称是否正确"};
                }
            }else if(pendingList[0]=="10"){//组合表达式
                var result=this.checkComExp(pendingList);
                return result;
            }else{//其他
                return {flag:true};
            }
        }else{//未通过语法校验
            return {flag:false,usermsg:initialResult.msg,errormsg:initialResult.originalMsg};
        }
      
    };
    /**
     * 校验数据集名称
     */
    Handsontable.Core.prototype.checkName=function(unknownDsName,existDs,reportid){
        var isExist=false;
        var fields=null;
        for(var i=0;i<existDs.length;i++){
            var name=existDs[i].name;
            var dsname=existDs[i].dsname;
			 if(reportid){
                if(dsname&&dsname.indexOf(reportid)>-1){
                    var indexCount=dsname.indexOf(reportid);
                    if(dsname.length>indexCount){
                        dsname= dsname.substring(indexCount+reportid.length+1);
                    }
                }
            }
            if(unknownDsName==name||unknownDsName==dsname){//找到数据集
                isExist=true;
                fields=existDs[i].fields;
                break;
            } 
        }
        return {isExist:isExist,fields:fields};
    };
    /**
     * 校验数据集字段
     */
    Handsontable.Core.prototype.checkField=function(pendingList,fields){
        var result=false;
        if(pendingList[2]=="05"){
            result=pendingList[3]<=fields.length;
        }else{
            var field=pendingList[3];//字段名
            for(var i=0;i<fields.length;i++){
                if(field.toLowerCase()==fields[i].toLowerCase()){
                    result=true;
                    break;
                }
            }
        }
        return result;

    };
    Handsontable.Core.prototype.checkComExp=function(pendingList){
        var resultArray=[];
        var finalResult={flag:true};
        //初步解析结果
        var rlist=pendingList[1];
        function notSubExp(subexp){
            var operators=["(",")","+","-","*","/"];
            if(operators.indexOf(subexp)!=-1){//运算符
                return true;
            }else if(!isNaN(Number(subexp))){//数字
                return true;
            }else if(subexp.indexOf("\"")==0){//字符串
                return true;
            }else{
                return false;

            }
        }
        if(rlist.length==1){//诸如单独的数字，字符串等
            var result={flag:true};
            resultArray.push(result);
        }else{//表达式
            for(var i=0;i<rlist.length;i++){
                if(notSubExp(rlist[i])){//非表达式
                    var result={flag:true};
                    resultArray.push(result);
                }else{//子表达式
                    var nowresult=this.checkExp(rlist[i]);
                    resultArray.push(nowresult);
                }
            }
        }
        for(var i=0;i<resultArray.length;i++){
            if(!resultArray[i].flag){
                finalResult.flag=false;
                finalResult.usermsg=resultArray[i].usermsg;
                break;
            }
        }
        return finalResult;
    }

  
})()
