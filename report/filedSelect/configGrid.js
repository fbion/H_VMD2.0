/*
filename：configGrid.js
creater：lifen
date created：2017.07.11
description：
date modified：
modifier：
version：2.2.7.0711
others：
copyright：Copyright © 1999-2016, hwkj, All Rights Reserved
*/
var configGrid = {
    allFields: "",
    hiddenFields: "",
    moveFields: ""
}

//读取文件中数据
function readData(mainGrid,configFile,num, callBack) {

  var hwFao = new HwFao(hwDas.serverHost, "report");//地址:端口和存储标识(服务管理员分配)
  var filepath = mainGrid.configFile;
  hwFao.read(filepath, function (res) {
      if (res.isSucceed) {
         // var str = JSON.stringify(res.data);
            var configData = JSON.parse(res.data);
            configGrid.allFields = configData.allFields;
            configGrid.hiddenFields = configData.hiddenFields;
            configGrid.moveFields = configData.moveFields;
            // 模版中列数跟配置文件做比较。如果一致则配置文件起作用
            if (num == configGrid.allFields.split(",").length) {
                setInitHeader(mainGrid);
            }
            callBack.call(this, configGrid);
      } else {
          alert(res.errMsg);
      }
  }, function (res) { alert(res); });
};

//初始化表头
function setInitHeader(mainGrid) {

    if (configGrid.allFields) {
        var allFields = configGrid.allFields.split(",");
        //设置所有列显示
        for (var i = 0; i < allFields.length; i++) {
            mainGrid.grid.setColumnHidden(allFields[i], false);
			setFirstColHideLeftBorder(mainGrid.grid,parseInt(allFields[i]),'');
        }
    }

    if (configGrid.hiddenFields) {
        var hiddenFields = configGrid.hiddenFields.split(",");
		
     var showFiled=configGrid.allFields.split(",");
		showFiled=getShowField(showFiled,hiddenFields);
		if(showFiled.length>0){
			if(parseInt(showFiled[0])>0)
		       setFirstColHideLeftBorder(mainGrid.grid,parseInt(showFiled[0]),"none");
		}
        //设置隐藏列隐藏
        for (var i = 0; i < hiddenFields.length; i++) {
            mainGrid.grid.setColumnHiddenForHeader(parseInt(hiddenFields[i]), true);
        }
		
		
    }
}