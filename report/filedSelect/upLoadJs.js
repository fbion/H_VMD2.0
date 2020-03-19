/*
filename：upLoadJs.js
creater：lifen
date created：2017.07.11
description：
date modified：
modifier：
version：2.2.7.0711
others：
copyright：Copyright © 1999-2016, hwkj, All Rights Reserved
*/


function upDataSave(file, virpath,aFields, hidFields, moveFields, callback) {
    //"fileName=" + file + "&allFields=" + aFields + "&hiddenFields=" + hidFields + "&moveFields=" +moveFields
    var paras = { fileName: file.rptHeaderPath, allFields: aFields, hiddenFields: hidFields, moveFields: moveFields };
    var host= vmdSettings.vmdFileServiceIp||vmdSettings.dataServiceIp;
     var hwFao = new HwFao( host, "report");//地址:端口和存储标识(服务管理员分配)
  var filepath = file.rptHeaderPath;
  var content =JSON.stringify(paras);
  hwFao.write(filepath, content, function (res) {
      if (res.isSucceed) {
          var str = JSON.stringify(res.data);
        if(callback){
			callback();
		}
      } else {
          alert(res.errMsg);
      }
  }, function (res) { alert(res); });

//   var host= vmdSettings.vmdReportIp;
//   var hwRao = new HwRao( host, "report");//地址:端口和存储标识(服务管理员分配)
// var filepath = file.rptHeaderPath;
// var content =JSON.stringify(paras);
// hwRao.saveJson(filepath, content, function (res) {
//    if (res.isSucceed) {
//        var str = JSON.stringify(res.data);
//      if(callback){
//          callback();
//      }
//    } else {
//        alert(res.errMsg);
//    }
// }, function (res) { alert(res); });


};

//对象转换成字符串
function objTostr(o) {
    var r = [];
    if (typeof o == "string" || o == null) {
        return o;
    }
    if (typeof o == "object") {
        if (!o.sort) {
            r[0] = "{"
            for (var i in o) {
                r[r.length] = i;
                r[r.length] = ":";
                r[r.length] = objTostr(o[i]);
                r[r.length] = ",";
            }
            r[r.length - 1] = "}"
        } else {
            //r[0] = "["
            for (var i = 0; i < o.length; i++) {
                r[r.length] = objTostr(o[i]);
                if (!(i == o.length - 1)) {
                    r[r.length] = ",";
                }
            }
            //r[r.length - 1] = "]"
        }
        return r.join("");
    }
    return o.toString();
}


