/******************************************************************
** 文件名:
** Copyright (c) 2017-2018 汉威公司技术研究院
** 创建人:成涛
** 日 期:2017-06-12.
** 修改人:成涛
** 日 期:2018-07-16  增加了对象访问方式,先实例化对象,后使用的方式
** 描 述:数据访问服务js版sdk 解决了跨域及低版本浏览器ajax请求的的问题
** 说 明:该文件不定时更新,不允许擅自修改,有问题,反馈后统一修改
** 版 本:1.201890109
******************************************************************/
window.hwDas = {
    token_name: "hwToken",
    ecylogin_name: "EcyLogin",
    token: "",//认证token
    ecyLogin: "",//加密用户名
    hosts: [],//服务器ip及端口列表
    appinfo: {
        callCode: "vmdCode",
        module: "",
        system: ""
    },
    acceptType: {
        '*': 'text/javascript, text/html, application/xml, text/xml, */*'
        , 'xml': 'application/xml, text/xml'
        , 'html': 'text/html'
        , 'text': 'text/plain'
        , 'json': 'application/json, text/javascript'
        , 'js': 'application/javascript, text/javascript'

    },
    corsSup: "",
    runMode: "normal",//运行状态,如果是测试模式设置为test,数据库操作都回滚
    debugStatus: "close"//调试状态,如果开启调试状态,就返回相应的sql语句等信息
}
/*
方法功能:登录
参数说明:
login:登录名
password:密码
successback:成功回调函数
errorback:错误回调函数
mark:为platform时,平台认证,为unity时,统一认证,空就是先统一认证后平台认证
*/
hwDas.login = function (login, password, successback, errorback, mark) {
    function successfunc(res) {
        if (res.isSucceed) {
            hwDas.token = res.token;
            hwDas.setCookie("hwToken", hwDas.token, { path: "/" });
        }
        if (typeof (successback) === "function") {
            successback(res);
        }
    }
    if (login === "") {
        throw new Error("第一个参数不能为空,请检查");
    }
    if (password === "") {
        throw new Error("第二个参数不能为空,请检查");
    }
    var url = "login";
    if (mark !== undefined) {
        url = mark + "/login";//平台认证
    }
    var base64 = new Base64();
    var encodepwd = base64.encode(password);
    hwDas.call("get", { url: url, type: "ssodas" }, {}, { login: login, encodepwd: encodepwd }, {}, successfunc, errorback);
}
/*
方法功能:获取数据
参数说明:
urlconfig:路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:"",url:""}
headers:请求头,格式为{}对象  如果分页要设置:startIndex: 记录开始索引, pageSize: 获取数据量, async异步(默认为true,当设置为false时 就是同步模式)
params:请求参数,格式为{}对象
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.get = function (urlconfig, headers, params, successback, errorback) {
    var config = hwDas.analyzeConfig(urlconfig, true);
    config.type = "idedas";
    hwDas.call("get", config, headers, params, {}, successback, errorback);
}
/*
方法功能:添加数据
参数说明:
urlconfig:路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:"",url:""}
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
datas:请求内容,格式为[{},{}]数组对象(多条记录)或是{}对象(单条记录)
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.add = function (urlconfig, headers, params, datas, successback, errorback) {
    if (typeof (datas) === "function" || typeof (datas) === "string") {
        throw new Error("调用add方法时,第四个参数类型有误,请检查");
    }
    var bodydata = hwDas.getbody(datas);
    var config = hwDas.analyzeConfig(urlconfig, true);
    config.type = "idedas";
    hwDas.call("post", config, headers, params, bodydata, successback, errorback);
}
/*
方法功能:修改数据
参数说明:
urlconfig:路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:"",url:""}
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
datas:请求内容,格式为[{},{}]数组对象(多条记录)或是{}对象(单条记录)
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.edit = function (urlconfig, headers, params, datas, successback, errorback) {
    if (typeof (datas) === "function" || typeof (datas) === "string") {
        throw new Error("调用edit方法时,第四个参数类型有误,请检查");
    }
    var bodydata = hwDas.getbody(datas);
    var config = hwDas.analyzeConfig(urlconfig, true);
    config.type = "idedas";
    //因为江汉出现了跨域的问题,所以先把delete和put请求处理成post请求处理
    hwDas.call("put", config, headers, params, bodydata, successback, errorback);
    //headers.ActionType = "put";
    //hwDas.call("post", config, headers, params, bodydata, successback, errorback);
}
/*
方法功能:删除数据
参数说明:
urlconfig:路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:"",url:""}
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.del = function (urlconfig, headers, params, successback, errorback) {
    var config = hwDas.analyzeConfig(urlconfig, true);
    config.type = "idedas";
    //因为江汉出现了跨域的问题,所以先把delete和put请求处理成post请求处理
    if (Object.prototype.toString.call(params) == '[object Array]') {
        headers.ActionType = "delete";
        hwDas.call("post", config, headers, {}, params, successback, errorback);
    }
    else {
        hwDas.call("delete", config, headers, params, {}, successback, errorback);
    }
   // headers.ActionType = "delete";
    //hwDas.call("post", config, headers, {}, params, successback, errorback);
}
/*
方法功能:保存数据(保存数据集)
参数说明:
urlconfig:路径信息,包括 url:相对Url地址,host:服务器信息,格式为{host:"",url:""}
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
datas:请求内容,格式为[{Value:{},Original:{},RowState:insert},{...}]数组对象(多条记录)或是{...}对象(单条记录)
--其中Value表示新值,RowState表示行状态(insert、update、delete),Original表示修改前的值（新增状态不需要传递）
--Original中的值 在服务变量中用:字段名_org的形式表示, 程序默认根据该规则把数据转换成变量值
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.save = function (urlconfig, headers, params, datas, successback, errorback) {
    if (typeof (datas) === "function" || typeof (datas) === "string") {
        throw new Error("调用save方法时,第四个参数类型有误,请检查");
    }
    var bodydata = hwDas.getbody(datas);
    var config = hwDas.analyzeConfig(urlconfig, true);
    config.type = "idedas";
    hwDas.call("save", config, headers, params, bodydata, successback, errorback);
}

/*
方法功能:检测文件是否存在
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:文件的相对存储路径
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.exist = function (urlconfig, filePath, successback, errorback) {
    var headers = { FilePath: filePath };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url =  config.mark + "/Exist";
    config.type = "filedas";
    hwDas.call("get", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:读取文件内容成字符串格式
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:文件的相对存储路径
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.read = function (urlconfig, filePath, successback, errorback) {
    var headers = { FilePath: filePath };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url = config.mark + "/Read";
    config.type = "filedas";
    hwDas.call("get", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:把字符串内容存储成文件
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:文件的相对存储路径
fileContent:文件内容,字符串格式
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.write = function (urlconfig, filePath, fileContent, successback, errorback) {
    var headers = { FilePath: filePath };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url =  config.mark + "/Write";
    config.type = "filedas";
    hwDas.call("post", config, headers, {}, fileContent, successback, errorback);
}
/*
方法功能:删除文件
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:要删除文件的相对路径
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.remove = function (urlconfig, filePath, successback, errorback) {
    var headers = { FilePath: filePath };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url = config.mark + "/Delete";
    config.type = "filedas";
    hwDas.call("post", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:拷贝文件
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:源相对目录
destPath:目标相对目录
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.copy = function (urlconfig, filePath, destPath, successback, errorback) {
    var headers = { FilePath: filePath, DestPath: destPath };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url = config.mark + "/Copy";
    config.type = "filedas";
    hwDas.call("post", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:移动文件
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:源相对目录
destPath:目标相对目录
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.move = function (urlconfig, filePath, destPath, successback, errorback) {
    var headers = { FilePath: filePath, DestPath: destPath };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url =  config.mark + "/Move";
    config.type = "filedas";
    hwDas.call("post", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:重命名文件
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:源相对目录
destPath:目标相对目录
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.rename = function (urlconfig, filePath, destName, successback, errorback) {
    var headers = { FilePath: filePath, DestPath: destName };
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url =  config.mark + "/ReName";
    config.type = "filedas";
    hwDas.call("post", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:获取指定目录下的文件列表
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:相对目录
fileType: 参数包括:fileType 文件后缀格式例如:".doc"
successback:成功回调函数
errorback:错误回调函数
*/
hwDas.getdirs = function (urlconfig, filePath, fileType, successback, errorback) {
    var headers = { FilePath: filePath };
    if (Object.prototype.toString.call(fileType) == '[object Array]') {
        headers.FileType = fileType.join(",");
    }
    else {
        headers.FileType = fileType;
    }
    var config = hwDas.analyzeConfig(urlconfig, false);
    config.url = config.mark + "/Dir";
    config.type = "filedas";
    hwDas.call("get", config, headers, {}, {}, successback, errorback);
}
/*
方法功能:下载文件
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
filePath:下载文件相对路径
destName:下载文件时用户下载页面文件名称
*/
hwDas.down = function (urlconfig, filePath, destName) {
    var config = hwDas.analyzeConfig(urlconfig, false);
    var authStr = hwDas.getAuthUrlParams();
    config.url = config.mark + "/Down?FilePath=" + encodeURIComponent(filePath) + "&destName=" + encodeURIComponent(destName) + authStr;
    config.type = "filedas";
    var url = hwDas.geturl(config);
    window.open(url, "_self");
}
/*
方法功能:获取上传url
参数说明:
urlconfig:mark:路径标识,格式为字符串,服务管理人员获取,其中vmd2.0使用的是vmd,host:服务器信息,格式为{host:"",mark:""}
dirPath:保存相对目录,可为空
*/
hwDas.getuploadurl = function (urlconfig, dirPath) {
    if (dirPath === undefined) {
        dirPath = "";
    }
    var config = hwDas.analyzeConfig(urlconfig, false);
    var authStr = hwDas.getAuthUrlParams();
    config.url = config.mark + "/Upload?dirPath=" + encodeURIComponent(dirPath) + authStr;
    config.type = "filedas";
    return hwDas.geturl(config);
}
//兼容性处理
//解析urlconfig
hwDas.analyzeConfig = function (urlconfig, isurl) {
    var config = {};
    if (typeof urlconfig === "object") {
        config = urlconfig;
    } else {
        if (isurl) {
            config = { url: urlconfig };
        }
        else {
            config = { mark: urlconfig };
        }
    }
    return config;
}

// 转换数据
hwDas.getbody = function (data) {
    var paramsList = [];
    if (data && data != null) {
        if (Object.prototype.toString.call(data) == '[object Array]') {
            paramsList = data;
        } else {
            paramsList.push(data);
        }
    } else {
        paramsList.push({});
    }
    return paramsList;
}
//参数转换
hwDas.call = function (requestType, urlconfig, headers, params, datas, successback, errorback) {
    var config = {}; //如果是数据访问服务就得填写,如果不是定制的数据服务就填写idedas为false
    if (typeof urlconfig === "object") {
        config = hwDas.clone(urlconfig);
    }
    else {
        config.url = urlconfig;
    }
    if (headers.idedas === false) {
        config.type = "orddas";
        delete headers.idedas;
    }
    else {
        config.type = config.type || "idedas";
    }
    var async = true;//默认是同步
    if (headers.async === false) {
        async = false;
        delete headers.async;
    }
    hwDas.ajax({
        urlconfig: config,
        type: requestType,
        headers: headers,
        params: params,
        data: datas,
        async: async,
        success: successback,
        error: errorback
    });
}
//成功后返回路径
hwDas.geturl = function (pathname) {
    var config = {};
    if (typeof pathname === "object") {
        config = pathname;
        pathname = config.url;
    }
    else {
        config.type = "orddas";
        config.url = pathname;
    }
    if (pathname.trim().indexOf("http://") == 0) {
        return pathname;
    }
    var allurl = "";
    var pathurl = (pathname.substring(0, 1) == '/') ? pathname.substring(1) : pathname;
    var host = "";
    var hostcount = hwDas.hosts.length;
    if (config.host) {
        host = config.host;
        hostcount = 1;
    }
    else {
        var host_i = Math.round(Math.random() * (hostcount - 1));//可基本均衡获取0到hostcount的随机整数
        host = hwDas.hosts[host_i];
    }
    if (hostcount > 0) {
        if (config.type == "ssodas") {
            allurl = "http://" + host + "/SSOService" + "/" + pathurl;
        }
        else if (config.type == "idedas") {
            allurl = "http://" + host + "/DasService/DataService" + "/" + pathurl;
        }
        else if (config.type == "rptdas") {
            allurl = "http://" + host + "/RasService" + "/" + pathurl;
        }
        else if (config.type == "filedas") {
            //allurl = "http://" + host + "/DasService/FileService" + "/" + pathurl;
			allurl = "http://" + host + "/FasService/File" + "/" + pathurl;
        }
        else if (config.type == "orddas") {
            allurl = "http://" + host + "/DasService" + "/" + pathurl;
        }
        else {
            allurl = "http://" + host + "/" + pathurl;
        }
    }
    else {
        allurl = "../" + pathurl;
    }
    return allurl;
}

//获取认证url参数
hwDas.getAuthUrlParams = function ()
{
    var a_url = "";
    var token = hwDas.token || hwDas.getUrlParameter(hwDas.token_name)|| hwDas.getCookie(hwDas.token_name) ;
    if (token) {
        a_url="&token=" + token;
    }
    else {
        var ecyLogin = hwDas.ecyLogin || hwDas.getUrlParameter(hwDas.ecylogin_name)|| hwDas.getCookie(hwDas.ecylogin_name) ;
        if (ecyLogin) {
            a_url = "&ecyLogin=" +ecyLogin;
        }
    }
    return a_url;
}



//重新过滤参数
hwDas.rehandle = function (options) {
    var headers = options.headers || options.urlconfig.headers;
    var datas = options.data || options.urlconfig.data;
    if (options.urlconfig.type == "idedas") {
        datas = hwDas.getbody(options.data);
    }
    var token = hwDas.token || hwDas.getUrlParameter(hwDas.token_name)|| hwDas.getCookie(hwDas.token_name) ;
    var dasheaders = {
        CallCode: options.urlconfig.callCode || hwDas.appinfo.callCode,
        SystemID: hwDas.appinfo.system,
        ModuleID: hwDas.appinfo.module,
        RunMode: hwDas.runMode,
        Debug: hwDas.debugStatus
    }
    if (token) {
        dasheaders.Token = token;
    }
    else {
        var ecyLogin = hwDas.ecyLogin || hwDas.getUrlParameter(hwDas.ecylogin_name)|| hwDas.getCookie(hwDas.ecylogin_name) ;
        if (ecyLogin) {
            dasheaders.EcyLogin = ecyLogin;
        }
    }

    if (headers) {
        if (dasheaders.EcyLogin || dasheaders.token) {//如果已经赋值,则删除自定义传递的 
            delete headers.Ecylogin;
            delete headers.token;
        }
        hwDas.extend(dasheaders, headers);
    }
    return {
        url: hwDas.geturl(options.urlconfig),
        type: options.type,
        async: options.async,
        timeout: options.timeout || options.urlconfig.timeout,
        data: datas,
        params: options.params || options.urlconfig.params,
        headers: dasheaders,
        contentType: options.contentType == undefined ? "application/json; charset=UTF-8" : options.contentType,
        dataType: options.dataType,
        success: function (resultdata, status) {
            if (resultdata.runInfos) {
                var runInfoCount = resultdata.runInfos.length;
                if (runInfoCount) {
                    var base64 = new Base64();
                    for (var i = 0; i < runInfoCount; i++) {
                        var runinfo = resultdata.runInfos[i];
                        if (runinfo.encodeSql) {
                            runinfo.text = base64.decode(runinfo.encodeSql);
                            delete runinfo.encodeSql;
                        }
                       
                        if (hwDas.debugStatus === "open") {
                            console.info(runinfo.title + ":" + runinfo.timeCost);
                        }
                    }
                }
            }
            if (hwDas.debugStatus === "open") {
                if (resultdata.runLog) {
                    console.log(resultdata.runLog);
                }
            }
            if (resultdata.isSucceed != false && typeof (options.success) == "function") {
                options.success(resultdata, status);
            }
            else {
                console.error(resultdata.errMsg);
                if (typeof (options.error) == "function") {
                    options.error(resultdata.errMsg, status);
                }
                else {
                    alert(resultdata.errMsg);
                }
            }
        },
        error: options.error || options.urlconfig.error,
        complete: options.complete || options.urlconfig.complete,
        progress: options.progress || options.urlconfig.progress
    };
}
//创建请求对象
hwDas.httpRequest = function () {
    var xdr;
    if (window.XMLHttpRequest) {
        xdr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xdr = new ActiveXObject("Microsoft.XmlHttp");
    }
    else {
        throw "不支持http请求";
    }
    return xdr;
}
//判断是否要跨域处理
hwDas.crossSupport = function () {
    if (hwDas.corsSup == "") {
        var browser = navigator.appName
        hwDas.corsSup = true;
        if (browser == "Microsoft Internet Explorer") {
            var b_version = navigator.appVersion
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (trim_Version == "MSIE6.0") {
                hwDas.corsSup = false;
            }
            else if (trim_Version == "MSIE7.0") {
                hwDas.corsSup = false;
            }
            else if (trim_Version == "MSIE8.0") {
                hwDas.corsSup = false;
            }
            else if (trim_Version == "MSIE9.0") {
                hwDas.corsSup = false;
            }
        }
    }
    return hwDas.corsSup;
}
//发送请求
hwDas.ajax = function (options) {
    if (options.das)//兼容处理
    {
        if (options.das.idedas === true) {
            options.das.type = "idedas";
        }
        else {
            options.das.type = "orddas";
        }
    }
    options.urlconfig = options.urlconfig || options.das;
    delete options.das;
    if (options.urlconfig) {
        options.urlconfig.url = options.urlconfig.url || options.url;
        options = hwDas.rehandle(options);
    }

    options.dataType = options.dataType == undefined ? "json" : options.dataType;
    options.async = options.async == undefined ? true : options.async;
    options.type = options.type.toLowerCase();
    options.timeout = /^\d+$/.test(options.timeout) ? options.timeout : 3*60 * 1000;//默认3*60秒超时(3分钟)
    var httpRegEx = /^(https?:)?\/\//i;
    var getOrPostRegEx = /^get|post$/i;
    var sameSchemeRegEx = new RegExp('^(\/\/|' + location.protocol + ')', 'i');
    var isXDomain = false;
    if ((!hwDas.crossSupport()) && window.XDomainRequest) {//options.async && getOrPostRegEx.test(options.type) && 
        if (httpRegEx.test(options.url) && sameSchemeRegEx.test(options.url)) {
            isXDomain = true;
        }
    }
    if (!options.headers) {
        options.headers = {};
    }
    var type = options.type;
    if (type === "save" || type === "runs") {
        options.type = "post";
        options.headers.ActionType = type;
    }
    else {
        if (options.type != "post" && options.type != "get" && isXDomain) {
            options.type = "post";
            options.headers.ActionType = type;
        }
    }
    var state = 1;
    if (isXDomain) {
        hwDas.sendXDomain(options, done);
    }
    else {
        hwDas.sendXMLHttp(options, done);
    }
    function done(xdr, status, response) {
        var isSuccess;
        if (state === 2) {
            return;
        }
        state = 2;
        var errCode = response.errCode;
        isSuccess = status >= 200 && status < 300 || status == 304;
        if (isSuccess) {
            if (status === 204) {
                response.error = "nocontent";
            } else if (status === 304) {
                response.error = "notmodified";
            }
        } else {
            errCode = status;
            if (status && status < 0) {
                status = 0;
            } else if (status == 401) {
                response.error = "Token认证失败,请重新登录";
            }
            else if (status == 400) {
                response.error = "请求无效，请稍后重试！";
                response.solution="解决方法:(1)请检查页面地址参数是否已经编码;(2)请检查url内容是否超长。"
            }
            else if (status == 408) {
                response.error = "请求超时，已被终止，请稍后重试！";
                response.solution = "解决方法:（1）出现该异常有如下情况：数据库连接不通、语句执行时间太长、服务器压力太大等;(2)请检查请求耗时情况，如果确实超时，请增大超时时间。"
            }
            else if (status == 500) {
                response.error = "服务器出错,服务未返回正确结果，请检查：\r\n"+
				"1、请检查服务url是否正确\r\n"+
				"2、数据服务是否不正确导致数据量过大；\r\n"+
				"3、报表的表达式是否正确；\r\n"+
				"4、报表的左父、上父属性是否正确；\r\n"+
				"不确定的联系技术支持人员。";
                response.solution = "解决方法:（1）请检查服务url是否正确;（2）请检查服务器服务是否正常。(3)报表定制是否存在问题，（4）报表服务是否正常运行"
            }
            else if (!response.error) {
                response.error = "请求出错，请稍后再试！";
            }
        }
        if (isSuccess) {
            if (options.success && typeof (options.success) == "function") {
                options.success(response.data, status, errCode);
            }
        } else {
            response.solution = response.solution || "";
            if (options.error && typeof (options.error) == "function") {
                if(!options.error(response.error, status, errCode))
				{
					console.error((response.url ? response.url : "") + response.error + response.solution);
				}
            }
            else {
                alert(response.error);
            console.error((response.url ? response.url : "") + response.error + response.solution);
            }
        }
        if (options.complete && typeof (options.complete) == "function") {
            options.complete(xdr, status, errCode);
        }
    }
}
//ie10+, Chrome, Firefox, Opera 8.0+, Safari
hwDas.sendXMLHttp = function (options, complete) {
    var xdr = hwDas.httpRequest();
    //xdr.timeout = options.timeout;
    var timeout = false;
    var timer = setTimeout(function () {
        timeout = true;
        xdr.abort();//请求中止
    }, options.timeout);

    var params = {};
    if (options.params) {
        hwDas.extend(params, options.params);
    }
    params.hwdhxrad = hwDas.getRadStr();
    var paramstr = hwDas.param2Str(params);
    //如果url参数超长就转成用post传输
    if (paramstr.length > 2000 && (options.type == "get" || options.type == "delete")) {
        options.headers.ActionType = options.type;
        options.type = "post";
        options.data = [];
        options.data.push(options.params);
        options.params = {};
        params.hwdhxrad = hwDas.getRadStr();
        paramstr = hwDas.param2Str(params);
    }
    var url = options.url + (options.url.indexOf("?") < 0 ? "?" : "&") + paramstr;
    var isQt = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
    //onreadystatechange函数对象
    xdr.onreadystatechange = function () {
        //readyState 的值等于4，从服务器拿到了数据
        if (xdr.readyState == 4 || (isQt == true && xdr.readyState == 3)) {
            clearTimeout(timer);//取消等待的超时
            if (timeout) {
                complete(xdr, 408, { error: 'timeout', url: url });
            }
            else if (xdr.status !== 0 && xdr.responseText) {
                hwDas.acceptResult(xdr, xdr.status, options.dataType, complete); //回调服务器响应数据
            }else if (xdr.status ==404) {
                hwDas.acceptResult(xdr, xdr.status, options.dataType, complete); //回调服务器响应数据
            }
        }
        if (timeout) return;//忽略中止请求
    }
    xdr.onerror = function () {
        complete(xdr, 500, { error: xdr.responseText || xdr.statusText, url: url });
    }
    xdr.ontimeout = function () {
        complete(xdr, 408, { error: 'timeout', url: url });
    }
    xdr.onprogress = function (e) {
        if (options.progress && typeof (options.error) == "function") {
            options.progress(xdr, e);
        }
    }
	xdr.onloadstart  = function (e) {
       // debugger
    }
    //初始化HTTP请求
    xdr.open(options.type, url, options.async);
    xdr.setRequestHeader("Accept", hwDas.acceptType[options.dataType]);
    if (options.headers && options.headers != null) {
        for (var header in options.headers)
            if (header == "Authorization") {
                xdr.setRequestHeader(header, "Bearer " + options.headers[header]);
            }
            else {
                xdr.setRequestHeader(header, encodeURIComponent(options.headers[header]));
            }
    }
    xdr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    if (options.type === "post" || options.type === "put") {
        if (!options.contentType) {
            //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
            options.contentType = "application/x-www-form-urlencoded;charset=UTF-8";
        }
    }
    if (options.contentType) {
        xdr.setRequestHeader("Content-type", options.contentType);
    }
    if (options.type == "post" || options.type == "put") {
        //给指定的HTTP请求头赋值
        var sendData = {};
        if (options.data) {
            if (typeof options.data === "string") {
                sendData = options.data;
            }
            else {
                sendData = JSON.stringify(options.data);
            }
        }
        xdr.send(sendData);
    }
    else {
        xdr.send();
    }
    if (!options.async)
        return xdr;

}
//跨域支持 ie9-
hwDas.sendXDomain = function (options, complete) {
    var xdr = new XDomainRequest();
    xdr.timeout = options.timeout;
    var params = { hwdhxrad: hwDas.getRadStr() };
    if (options.params) {
        hwDas.extend(params, options.params);
    }
    if (options.headers) {
        hwDas.extend(params, options.headers);
    }
    var paramstr = hwDas.param2Str(params);

    //如果url参数超长就转成用post传输
    if (paramstr.length > 2000 && (options.type == "get")) {
        options.headers.ActionType = options.type;
        options.type = "post";
        options.data = [];
        options.data.push(params);
        options.params = {};
        params.hwdhxrad = hwDas.getRadStr();
        paramstr = hwDas.param2Str(params);
    }
    var url = encodeURI(options.url) + (options.url.indexOf("?") < 0 ? "?" : "&") + paramstr;
    xdr.ontimeout = function () {
        complete(xdr, 408, { error: 'timeout', url: url });
    }
    xdr.onprogress = function (e) {
        if (options.progress && typeof (options.error) == "function") {
            options.progress(xdr, e);
        }
    }
    xdr.onerror = function () {
        complete(xdr, 500, { error: xdr.responseText || xdr.statusText, url: url });
    }
    //onreadystatechange函数对象
    xdr.onload = function () {
        hwDas.acceptResult(xdr, 200, xdr.contentType || options.dataType, complete);
    }
    //初始化HTTP请求
    xdr.open(options.type, url);
    if (options.type == "post") {
        //给指定的HTTP请求头赋值
        var sendData = "";
        if (options.data) {
            if (typeof options.data === "string") {
                sendData = options.data;
            }
            else {
                sendData = JSON.stringify(options.data);
            }
        }
        xdr.send(sendData);
    }
    else {
        xdr.send();
    }
    if (!options.async) return xdr;
}
//处理返回值
hwDas.acceptResult = function (xdr, status, userType, complete) {
    try {
        var response = { error: "", data: "" }
        if (status >= 200 && status < 300 || status == 304) {
            if (xdr.responseText != "") {
                if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
                    try {
                        response.data = JSON.parse(xdr.responseText);
                    } catch (e) {
                        status = 500;
                        response.error = 'Could not parse JSON in response,' + e;
                    }
                } else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
                    if (window.ActiveXObject) {
                        var doc = new ActiveXObject('Microsoft.XMLDOM');
                        doc.async = false;
                        try {
                            doc.loadXML(xdr.responseText);
                        } catch (e) {
                            doc = undefined;
                        }
                        if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                            status = 500;
                            response.error = 'Could not parse Xml in response';
                        }
                        response.data = doc;
                    } else {
                        if (xdr.responseXML && xdr.responseXML.parseError && xdr.responseXML.parseError.errorCode && xdr.responseXML.parseError.reason) {
                            status = 500;
                            response.error = xdr.responseXML.parseError.reason;
                        }
                        else if (xdr.responseXML) {
                            response.data = xdr.responseXML;
                        }
                        else {
                            response.data = xdr.responseText;
                        }
                    }
                }
                else if (userType === 'js') {
                    try {
                        response.data = eval(xdr.responseText);
                    } catch (e) {
                        status = 500;
                        response.error = 'parseerror';
                    }
                }
                else {
                    response.data = xdr.responseText;
                }
            }
        } else {
            response.error = xdr.responseText || xdr.statusText;
        }
    } catch (parseMessage) {
        throw parseMessage;
    } finally {
        complete(xdr, status, response);
    }
}
//对象合并 有则替换没有则添加
hwDas.extend = function (o, n) {
    for (var p in n) {
        if (n.hasOwnProperty(p))//&& (!o.hasOwnProperty(p))
            o[p] = n[p];
    }
}
//随机码
hwDas.getRadStr = function (len) {
    len = len || 5;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var res = "";
    for (i = 0; i < len; i++) {
        res += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return res;
}
//对象转换成编码的字符串
hwDas.param2Str = function (urlParams) {
    var sendString = [];
    if (typeof urlParams === "string") {
        var tmpArr = String.prototype.split.call(urlParams, '&');
        for (var i = 0, j = tmpArr.length; i < j; i++) {
            var datum = tmpArr[i].split('=');
            sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
        }
    } else if (typeof urlParams === 'object') {
        for (var k in urlParams) {
            var datum = urlParams[k];
            if (datum === undefined || datum === null) {
                continue;
            }
            if (Object.prototype.toString.call(datum) == "[object Array]") {
                for (var i = 0, j = datum.length; i < j; i++) {
                    sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                }
            } else {
                sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
            }
        }
    }
    return sendString.join('&');
}
//获取url参数
hwDas.getUrlParameter = function (param) {
    var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//删除url参数
hwDas.delUrlParameter = function (name) {
    var loca = window.location;
    var baseUrl = loca.origin + loca.pathname + "?";
    var query = loca.search.substr(1);
    if (query.indexOf(name) > -1) {
        var obj = {}
        var arr = query.split("&");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split("=");
            obj[arr[i][0]] = arr[i][1];
        };
        delete obj[name];
        var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
        return url
    };
}

//获取cookie值
hwDas.getCookie = function (cname) {
    var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}
//设置cookie值
hwDas.setCookie = function (key, value, options) {
    options = options || {};
    if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
    }
    return (document.cookie = [
        encodeURIComponent(key), '=',
        options.raw ? String(value) : encodeURIComponent(String(value)),
        options.expires ? '; expires=' + options.expires.toUTCString() : '',
        options.path ? '; path=' + options.path : '; path=/',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
    ].join(''));
}
hwDas.removeCookie = function (name) {
    this.setCookie(name, "", -1);
}
hwDas.clone = function (obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(hwDas.clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = hwDas.clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

//字符串去掉空格
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
}
//json 兼容
if (typeof JSON !== "object") {
    JSON = {};
}
(function () {
    "use strict";
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    function f(n) {
        return n < 10 ? "0" + n : n;
    }
    function this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                f(this.getUTCMonth() + 1) + "-" +
                f(this.getUTCDate()) + "T" +
                f(this.getUTCHours()) + ":" +
                f(this.getUTCMinutes()) + ":" +
                f(this.getUTCSeconds()) + "Z"
                : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }
    var gap;
    var indent;
    var meta;
    var rep;
    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }
    function str(key, holder) {
        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];
        if (value && typeof value === "object" &&
            typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value)
                    ? String(value)
                    : "null";

            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value) {
                    return "null";
                }
                gap += indent;
                partial = [];
                if (Object.prototype.toString.apply(value) === "[object Array]") {
                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }
                    v = partial.length === 0
                        ? "[]"
                        : gap
                            ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                            : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }
                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                } else {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ": " : ":") + v);
                            }
                        }
                    }
                }
                v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else if (typeof space === "string") {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", { "": value });
        }
    }

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;
            function walk(holder, key) {
                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                        ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (
                rx_one.test(
                    text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
                )
            ) {
                j = eval("(" + text + ")");
                return (typeof reviver === "function") ? walk({ "": j }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
}());

//base64处理
function Base64() {
    // private property  
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding  
    this.encode = function (input) {
        try {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        } catch (e) {
            console.log(e.name + ":编码失败," + e.message);
            return input;
        }
    }

    // public method for decoding  
    this.decode = function (input) {
        try {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        } catch (e) {
            console.log(e.name + ":解码失败," + e.message);
            return input;
        }
    }

    // private method for UTF-8 encoding  
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding  
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}  
/************************************服务SDK对象化使用***********************************************/

/******************认证访问服务对象***********************/
function HwCao(host, isasync, timeout) {
    this.config = { type: "ssodas", host: host, async: isasync, timeout: timeout };
}
/*
方法功能:登录
参数说明:
login:登录名
password:密码
successback:成功回调函数
errorback:错误回调函数
mark:为platform时,平台认证,为unity时,统一认证,空就是先统一认证后平台认证
*/
HwCao.prototype.login = function (mark, login, password, successback, errorback) {
    function successfunc(res) {
        if (res.isSucceed) {
            hwDas.token = res.token;
            hwDas.setCookie("hwToken", hwDas.token, { path: "/" });
        }
        if (typeof (successback) === "function") {
            successback(res);
        }
    }
    if (login === "") {
        throw new Error("第一个参数不能为空,请检查");
    }
    if (password === "") {
        throw new Error("第二个参数不能为空,请检查");
    }
    var url = "login";
    if (mark !== undefined) {
        url = mark + "/login";//平台认证
    }
    this.config.url = url;
    var base64 = new Base64();
    var encodepwd = base64.encode(password);
    hwDas.call("get", this.config, {}, { login: login, encodepwd: encodepwd }, {}, successfunc, errorback);
}
/*
 方法功能:获取token
参数说明:
appid:应用id
appkey:应用密钥
code:登录码
successback:成功回调函数
errorback:错误回调函数
 */
HwCao.prototype.token = function (appid, appkey, code, successback, errorback) {
    function successfunc(res) {
        if (res.isSucceed) {
            hwDas.token = res.token;
            hwDas.setCookie(hwDas.token_name, res.token, { path: "/" });
        }
        if (typeof (successback) === "function") {
            successback(res);
        }
    }
    this.config.url = "token";
    var ecyLogin = hwDas.ecyLogin || hwDas.getCookie(hwDas.ecylogin_name);
    hwDas.call("get", this.config, {}, { appid: appid, appkey: appkey, code: code, ecyLogin: ecyLogin }, {}, successfunc, errorback);
}
/*
 方法功能:刷新token
参数说明:
appid:应用id
appkey:应用密钥
token:原始token
successback:成功回调函数
errorback:错误回调函数
 */
HwCao.prototype.refresh = function (appid, appkey, token, successback, errorback) {
    function successfunc(res) {
        if (res.isSucceed) {
            hwDas.token = res.token;
            hwDas.setCookie(hwDas.token_name, res.token, { path: "/" });
        }
        if (typeof (successback) === "function") {
            successback(res);
        }
    }
    token = token || hwDas.token || hwDas.getCookie(hwDas.token_name) || hwDas.getUrlParameter(hwDas.token_name);
    this.config.url = "refresh";
    hwDas.call("get", this.config, {}, { token: token, appid: appid, appkey: appkey }, {}, successfunc, errorback);
}
/*
 方法功能:单点登录
参数说明:
appid:应用id
appkey:应用密钥
successback:成功回调函数
errorback:错误回调函数
 */
HwCao.prototype.signin = function (appid, appkey, successback, errorback) {
    var code = hwDas.getUrlParameter("code");
    var cookietoken = hwDas.token || hwDas.getCookie(hwDas.token_name) || hwDas.getUrlParameter(hwDas.token_name);
    var m_config = this.config;
    if (cookietoken) {
        //this.auth(appid, appkey,cookietoken, successback, errorback);
        successback();//如果token就直接跳过直接访问
    }
    else if (code) {
        this.token(appid, appkey, code, function (res) {
            if (res.isSucceed) {
                if (typeof (successback) === "function") {
                    successback(res);
                }
            } else {
                redirect(hwDas.delUrlParameter("code"));
            }
        }, function (res) { redirect(hwDas.delUrlParameter("code")); });
    }
    else {
        redirect(window.location.href);
    }

    function redirect(backurl) {
        m_config.url = "signin?backurl=" + encodeURIComponent(backurl);
        var url = hwDas.geturl(m_config);
        window.location.href = url;
    }
}
/*
 方法功能:注销
参数说明:
token:登录token
successback:成功回调函数
errorback:错误回调函数
 */
HwCao.prototype.logout = function (token, successback, errorback) {
    var token = token || hwDas.token || hwDas.getCookie(hwDas.token_name) || hwDas.getUrlParameter(hwDas.token_name);
    this.config.url = "logout";
    hwDas.call("get", this.config, {}, { token: token }, {}, successback, errorback);
}
/*
 方法功能:认证,验证token
参数说明:
appid:应用id
appkey:应用密钥
token:登录token
successback:成功回调函数
errorback:错误回调函数
 */
HwCao.prototype.auth = function (appid, appkey, token, successback, errorback) {
    function successfunc(res) {
        if (!res.isSucceed) {
            if (res.errCode === 401) {
                hwDas.setCookie(hwDas.token_name, "", { path: "/" });
            }
        }
        if (typeof (successback) === "function") {
            successback(res);
        }
    }
    var token = token || hwDas.token || hwDas.getCookie(hwDas.token_name) || hwDas.getUrlParameter(hwDas.token_name);
    this.config.url = "auth";
    hwDas.call("get", this.config, {}, { token: token, id: appid, key: appkey }, {}, successfunc, errorback);
}


/******************数据访问服务对象***********************/
function HwDao(host, callCode, isasync, timeout) {
    this.config = { host: host, callCode: callCode, async: isasync, timeout: timeout };
    this.isTransactioning = false;
    this.ajaxItems = [];
}
/*
方法功能:获取数据
参数说明:
parturl:相对Url地址
headers:请求头,格式为{}对象  如果分页要设置:startIndex: 记录开始索引, pageSize: 获取数据量, async异步(默认为true,当设置为false时 就是同步模式)
params:请求参数,格式为{}对象
successback:成功回调函数
errorback:错误回调函数
*/
HwDao.prototype.get = function (parturl, headers, params, successback, errorback) {
    this.config.url = parturl;
    hwDas.get(this.config, headers, params, successback, errorback);
}
/*
方法功能:添加数据
参数说明:
parturl:相对Url地址
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
datas:请求内容,格式为[{},{}]数组对象(多条记录)或是{}对象(单条记录)
successback:成功回调函数
errorback:错误回调函数
*/
HwDao.prototype.add = function (parturl, headers, params, datas, successback, errorback) {
    if (this.isTransactioning) {
        var callCode = headers[callCode] ? headers[callCode] : "";
        this.ajaxItems.push({ id: hwDas.getRadStr(5), type: "add", url: parturl, callCode: callCode, data: datas, successback: successback, errorback: errorback });
    }
    else {
        this.config.url = parturl;
        hwDas.add(this.config, headers, params, datas, successback, errorback);
    }
}
/*
方法功能:修改数据
参数说明:
parturl:相对Url地址
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
datas:请求内容,格式为[{},{}]数组对象(多条记录)或是{}对象(单条记录)
successback:成功回调函数
errorback:错误回调函数
*/
HwDao.prototype.edit = function (parturl, headers, params, datas, successback, errorback) {
    if (this.isTransactioning) {
        var callCode = headers[callCode] ? headers[callCode] : "";
        this.ajaxItems.push({ id: hwDas.getRadStr(5), type: "edit", url: parturl, callCode: callCode, data: datas, successback: successback, errorback: errorback });
    }
    else {
        this.config.url = parturl;
        hwDas.edit(this.config, headers, params, datas, successback, errorback);
    }
}
/*
方法功能:删除数据
参数说明:
parturl:相对Url地址
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
successback:成功回调函数
errorback:错误回调函数
*/
HwDao.prototype.del = function (parturl, headers, params, successback, errorback) {
    if (this.isTransactioning) {
        var callCode = headers[callCode] ? headers[callCode] : "";
        this.ajaxItems.push({ id: hwDas.getRadStr(5), type: "delete", url: parturl, callCode: callCode, data: params, successback: successback, errorback: errorback });
    }
    else {
        this.config.url = parturl;
        hwDas.del(this.config, headers, params, successback, errorback);
    }
}
/*
方法功能:保存数据(保存数据集)
参数说明:
parturl:相对Url地址
headers:请求头,格式为{}对象
params:请求参数,格式为{}对象
datas:请求内容,格式为[{Value:{},Original:{},RowState:insert},{...}]数组对象(多条记录)或是{...}对象(单条记录)
--其中Value表示新值,RowState表示行状态(insert、update、delete),Original表示修改前的值（新增状态不需要传递）
--Original中的值 在服务变量中用:字段名_org的形式表示, 程序默认根据该规则把数据转换成变量值
successback:成功回调函数
errorback:错误回调函数
*/
HwDao.prototype.save = function (parturl, headers, params, datas, successback, errorback) {
    if (this.isTransactioning) {
        var callCode = headers[callCode] ? headers[callCode] : "";
        this.ajaxItems.push({ id: hwDas.getRadStr(5), type: "save", url: parturl, callCode: callCode, data: datas, successback: successback, errorback: errorback });
    }
    else {
        this.config.url = parturl;
        hwDas.save(this.config, headers, params, datas, successback, errorback);
    }
}
//开始事务
HwDao.prototype.beginTransaction = function () {
    this.ajaxItems = [];
    this.isTransactioning = true;
}
//回滚事务
HwDao.prototype.rollBack = function () {
    this.ajaxItems = [];
    this.isTransactioning = false;
}
//提交事务
HwDao.prototype.commit = function (errorback) {
    if (this.isTransactioning && this.ajaxItems.length > 0) {
        this.config.url = "run/many/method";
        var bodydata = [];
        for (var j = 0, len = this.ajaxItems.length; j < len; j++) {
            var item = this.ajaxItems[j];
            var content = "";
            if (item.data) {
                if (typeof item.data === "string") {
                    content = item.data;
                }
                else {
                    var data = hwDas.getbody(item.data);
                    content = JSON.stringify(data);
                }
            }
            bodydata.push({ id: item.id, type: item.type, url: item.url, callCode: item.callCode, content: content });
        }
        this.config.type = "idedas";
        hwDas.call("runs", this.config, {}, {}, bodydata,
            function (res) {
                var resdatas = {};
                for (var j = 0, len = res.data.length; j < len; j++) {
                    var item = res.data[i];
                    if (resdatas[item.id]) {
                        resdatas[item.id].push(item);
                    }
                    else {
                        resdatas[item.id] = [item];
                    }
                }
                for (var j = 0, len = this.ajaxItems.length; j < len; j++) {
                    var item = this.ajaxItems[j];
                    item.successback(resdatas[item.id]);
                }
            }, errorback);
    }
}


/******************文件访问服务对象***********************/
function HwFao(host, mark, isasync, timeout) {
    this.config = { type:"filedas", mark: mark, host: host, async: isasync, timeout: timeout };
}
/*
方法功能:检测文件是否存在
参数说明:
filePath:文件的相对存储路径
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.exist = function (filePath, successback, errorback) {
    hwDas.exist(this.config, filePath, successback, errorback);
}
/*
方法功能:读取文件内容成字符串格式
参数说明:
filePath:文件的相对存储路径
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.read = function (filePath, successback, errorback) {
    hwDas.read(this.config, filePath, successback, errorback);
}
/*
方法功能:把字符串内容存储成文件
参数说明:
filePath:文件的相对存储路径
fileContent:文件内容,字符串格式
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.write = function (filePath, fileContent, successback, errorback) {
    hwDas.write(this.config, filePath, fileContent, successback, errorback);
}
/*
方法功能:删除文件
参数说明:
filePath:要删除文件的相对路径
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.remove = function (filePath, successback, errorback) {
    hwDas.remove(this.config, filePath, successback, errorback);
}
/*
方法功能:拷贝文件
参数说明:
filePath:源相对目录
destPath:目标相对目录
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.copy = function (filePath, destPath, successback, errorback) {
    hwDas.copy(this.config, filePath, destPath, successback, errorback);
}
/*
方法功能:移动文件
参数说明:
filePath:源相对目录
destPath:目标相对目录
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.move = function (filePath, destPath, successback, errorback) {
    hwDas.move(this.config, filePath, destPath, successback, errorback);
}
/*
方法功能:重命名文件
参数说明:
filePath:源相对目录
destPath:目标相对目录
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.rename = function (filePath, destName, successback, errorback) {
    hwDas.rename(this.config, filePath, destName, successback, errorback);
}
/*
方法功能:获取指定目录下的文件列表
参数说明:
filePath:相对目录
fileType: 参数包括:fileType 文件后缀格式例如:".doc"
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.getDirs = function (filePath, fileType, successback, errorback) {
    hwDas.getdirs(this.config, filePath, fileType, successback, errorback);
}
/*
方法功能:下载文件
参数说明:
filePath:下载文件相对路径
destName:下载文件时用户下载页面文件名称
*/
HwFao.prototype.down = function (filePath, destName) {
    hwDas.down(this.config, filePath, destName);
}
/*
方法功能:获取上传url
参数说明:
dirPath:保存相对目录,可为空
*/
HwFao.prototype.getUploadUrl = function (dirPath) {
    return  hwDas.getuploadurl(this.config, dirPath);
}
/*
方法功能:获取文档浏览路径
参数说明:
wdkHost:文档库host
callCode:授权码
docid:文档id
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.getViewUrl = function (filePath) {
    var authStr = hwDas.getAuthUrlParams();
    this.config.url = this.config.mark + "/View?filePath=" + encodeURIComponent(filePath) + authStr;
    return hwDas.geturl(this.config);
}
/*
方法功能:获取文档库上传url
参数说明:
wdkHost:文档库host
callCode:授权码
dirPath:保存相对目录,可为空
*/
HwFao.prototype.getWdkUploadUrl = function (wdkHost,callCode,dirPath) {
    if (dirPath === undefined) {
        dirPath = "";
    }
    var authStr = hwDas.getAuthUrlParams();
    this.config.url = this.config.mark + "/Wdk/Upload?wdkHost=" + wdkHost + "&callCode=" + callCode + "&dirPath=" + encodeURIComponent(dirPath) +  authStr;
    return hwDas.geturl(this.config);
}
/*
方法功能:文档库下载文件
参数说明:
wdkHost:文档库host
callCode:授权码
docid:文档id
destName:下载文件时用户下载页面文件名称
*/
HwFao.prototype.wdkDown = function (wdkHost, callCode, docid, destName) {
    var authStr = hwDas.getAuthUrlParams();
    this.config.url = this.config.mark + "/Down?wdkHost=" + wdkHost + "&callCode=" + callCode + "&docid=" + docid
        + "&destName=" + encodeURIComponent(destName) + authStr;
    var url = hwDas.geturl(this.config);
    window.open(url, "_self");
}
/*
方法功能:删除文档库文件
参数说明:
wdkHost:文档库host
callCode:授权码
docid:文档id
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.wdkRemove = function (wdkHost, callCode,docid, successback, errorback) {
    var headers = { wdkHost: wdkHost,   docid: docid };
    this.config.callCode = callCode;
    this.config.url = this.config.mark + "/Delete";
    hwDas.call("delete", this.config, headers, {}, {}, successback, errorback);
}
/*
方法功能:获取文档库文档显示路径
参数说明:
wdkHost:文档库host
callCode:授权码
docid:文档id
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.getWdkViewUrl = function (wdkHost, callCode, docid) {
    var authStr = hwDas.getAuthUrlParams();
    this.config.url = this.config.mark + "/View?wdkHost=" + wdkHost + "&callCode=" + callCode + "&docid=" + docid + authStr;
    return hwDas.geturl(this.config);
  
}
/*
方法功能:获取文档库文档浏览路径
参数说明:
wdkHost:文档库host
callCode:授权码
docid:文档id
successback:成功回调函数
errorback:错误回调函数
*/
HwFao.prototype.getWdkBrowseUrl = function (wdkHost, callCode, docid, successback, errorback) {
    var headers = { wdkHost: wdkHost, docid: docid };
    this.config.url = this.config.mark + "/Browse";
    this.config.callCode = callCode;
    var m_config = this.config;
    function successfunc(res) {
        if (res.isSucceed) {
            var docs = res.data;
            for (var i = 0; i < docs.length; i++) {
                var doc = docs[i];
                doc.url = "http://" + m_config.host + "/" + m_config.mark + "/" + (doc.path ? doc.path.replace(/\\/g,"/"):"");
            }
            successback(res);
        }
    }
    hwDas.call("get", this.config, headers, {}, {}, successfunc, errorback);

}



/******************报表访问服务对象***********************/
function HwRao(host, mark, isasync, timeout) {
    this.config = { type: "rptdas", mark: mark || "report", host: host, async: isasync, timeout: timeout };
}
/*
方法功能:获取上传url
参数说明:
dirPath:保存相对目录,可为空
*/
HwRao.prototype.getUploadUrl = function (dirPath) {
    if (dirPath === undefined) {
        dirPath = "";
    }
    var authStr = hwDas.getAuthUrlParams();
    this.config.url = "File/" + this.config.mark + "/Upload?dirPath=" + encodeURIComponent(dirPath) + authStr;
    return hwDas.geturl(this.config);
}
/*
方法功能:获取json
参数说明:
filePath:文件的相对存储路径
fileContent:文件内容,字符串格式
successback:成功回调函数
errorback:错误回调函数
*/
HwRao.prototype.saveJson = function (filePath, fileContent, successback, errorback) {
    this.config.url = "File/" + this.config.mark + "/Write";
    hwDas.call("post", this.config, {filePath: filePath}, {}, fileContent, successback, errorback);
}
/*
方法功能:获取json
参数说明:
filePath:文件的相对存储路径
tableNames:表名,表1,表2;表11,表12;表21,表22
successback:成功回调函数
errorback:错误回调函数
*/
HwRao.prototype.getJson = function (filePath, tableNames,successback, errorback,configPath) {
    this.config.url = "Report/" + this.config.mark + "/json";
    if(configPath){
        hwDas.call("get", this.config, {}, { filePath: filePath, tableNames: tableNames ,rptHeaderHost:configPath.rptHeaderHost,rptHeaderPath:configPath.rptHeaderPath}, {}, successback, errorback);
    }
    else{
        hwDas.call("get", this.config, {}, { filePath: filePath, tableNames: tableNames }, {}, successback, errorback);
    }
}
/*
方法功能:获取xml
参数说明:
filePath:文件的相对存储路径
successback:成功回调函数
errorback:错误回调函数
*/
HwRao.prototype.getXml = function (filePath, successback, errorback) {
    this.config.url = "Report/" + this.config.mark + "/xml";
    hwDas.call("get", this.config, {}, { filePath: filePath }, {}, successback, errorback);
}
/*
方法功能:获取矩阵
参数说明:
data:数据内容,格式为:{modeldata:"",resulttype:"",tables:{}} 
示例为:{modeldata:"模板串",resulttype:"jsonstr",tables:{"store":{"host":"xxx:xx","callcode":"xxx","method":"get","path":"xx/xx/x","params":{}}}}
successback:成功回调函数
errorback:错误回调函数
*/
HwRao.prototype.getMatrix = function (headers,data, successback, errorback) {
    this.config.url = "Report/matrix";
    hwDas.call("post", this.config, headers, {}, data, successback, errorback);
}
/*
方法功能:导出Excel
参数说明:
*/
HwRao.prototype.exportExcel = function (data,success,error) {
    this.config.url = "Report/excel/export";
    var url = hwDas.geturl(this.config);
	/*//原下载模式，通过表单提交方式，但无法展示滚动条
    var temp = document.createElement("form");
    temp.id = "hwdasreport_exportForm";
    temp.action = url;
    temp.method = "post";
    temp.style.display = "none";
    var opt = document.createElement("textarea");
    opt.name = "Body";
    if (data) {
        if (typeof data === "string") {
            opt.value = data;
        }
        else {
            opt.value = JSON.stringify(data);
        }
    }
    temp.appendChild(opt);
    document.body.appendChild(temp);
    temp.submit();
    document.body.removeChild(temp);
	*/
	
	 var myMask ;
	 if(window.Ext!=undefined){
		 myMask= new Ext.LoadMask(Ext.getBody(), {
                            msg: "正在生成Excel...",
                            msgCls: 'z-index:10000;'
                        });
	}	
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);        // 也可以使用POST方式，根据接口
	xhr.setRequestHeader("Content-Type","application/json;charset=utf-8");
    xhr.responseType = "blob";    // 返回类型blob
    // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
    xhr.onload = function () {
		if(myMask)myMask.hide()
        // 请求完成
        if (this.status === 200) {
			if(success)success();
            var blob = this.response;			
			if(window.navigator.msSaveOrOpenBlob)
			{
				window.navigator.msSaveOrOpenBlob(blob,data.name+'.xlsx')
			}
			else
			{
				var reader = new FileReader();
				reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a的href		
				reader.onload = function (e) {
					// 转换完成，创建一个a标签用于下载
					var temp = document.createElement('a');
					temp.download =data.name+'.xlsx';
					temp.href = e.target.result;
					$("body").append(temp);     // 修复firefox中无法触发click
					temp.click();
					$(temp).remove();
				}
			}		            
        }else {
			if(error)error();
		}		
    };
    // 发送ajax请求
    xhr.send(JSON.stringify(data));	
	if(myMask)myMask.show();
	
}
/*
 方法功能:获取导入Excel的文件上传url
 参数说明:
 */
HwRao.prototype.getImportExcelUrl = function () {
    var authStr = hwDas.getAuthUrlParams();
    this.config.url = "Report/excel/import?hwdhxrad="+ hwDas.getRadStr() + authStr;
    return hwDas.geturl(this.config);
}