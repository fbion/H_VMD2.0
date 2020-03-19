/**
 * Created by Administrator on 2018-09-27.
 */

/**
 * Check for string
 * @param {Object} s
 */
function isString(s) {
    return typeof s === 'string';
};

/**
 * Check for object
 * @param {Object} obj
 */
function isObject(obj) {
    return obj && typeof obj === 'object';
};

/**
 * Check for array
 * @param {Object} obj
 */
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

/**
 * Check for number
 * @param {Object} n
 */
function isNumber(n) {
    return typeof n === 'number';
};

//根据序列名在定制文件中查找序列样式
function findSeriesThemeByName(name, sereisThemes){
//    if(!isArray(sereisThemes)) return null;
    for(var each in sereisThemes){
        if(sereisThemes.hasOwnProperty(each)){
            if(sereisThemes[each] && sereisThemes[each].name == name.trim()){
                return sereisThemes[each];
            }
        }
    }
    return null;
}

/**
 * 获取滚动条滚动距离
 * @returns {Array|*}
 * @private
 */
function ___getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {     // Explorer 6 Strict
        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;
    }
    return [xScroll,yScroll];
};


function getBrowserType(){
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
        (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    return Sys;
}

function getIEDocumentMode(){
    // 判断是否为IE
    var isIE = navigator.userAgent.toLocaleLowerCase().indexOf('msie') !== -1;

    // 判断是否为IE5678
    var isLteIE8 = isIE && !-[1,];

    // 用于防止因通过IE8+的文档兼容性模式设置文档模式，导致版本判断失效
    var dm = document.documentMode, isIE5, isIE6, isIE7, isIE8, isIE9, isIE10, isIE11;
    if (dm){
        return dm;
        isIE5 = dm === 5;
        isIE6 = dm === 6;
        isIE7 = dm === 7;
        isIE8 = dm === 8;
        isIE9 = dm === 9;
        isIE10 = dm === 10;
        isIE11 = dm === 11;
    }
    else{
        // 判断是否为IE5，IE5的文本模式为怪异模式(quirks),真实的IE5.5浏览器中没有document.compatMode属性
        isIE5 = (isLteIE8 && (!document.compatMode || document.compatMode === 'BackCompat'));
        // 判断是否为IE6，IE7开始有XMLHttpRequest对象
        isIE6 = isLteIE8 && !isIE5 && !XMLHttpRequest;
        // 判断是否为IE7，IE8开始有document.documentMode属性
        isIE7 = isLteIE8 && !isIE6 && !document.documentMode;
        // 判断是否IE8
        isIE8 = isLteIE8 && document.documentMode;
        // 判断IE9，IE10开始支持严格模式，严格模式中函数内部this为undefined
        isIE9 = !isLteIE8 && (function(){
                "use strict";
                return !!this;
            }());
        // 判断IE10，IE11开始移除了attachEvent属性
        isIE10 = isIE && !!document.attachEvent && (function(){
                "use strict";
                return !this;
            }());
        // 判断IE11
        isIE11 = isIE && !document.attachEvent;
        if(isIE5){
            return 5;
        }
        else if(isIE6){
            return 6;
        }
        else if(isIE7){
            return 7;
        }
        else if(isIE8){
            return 8;
        }
        else if(isIE9){
            return 6;
        }
        else if(isIE9){
            return 6;
        }
        else if(isIE10){
            return 10;
        }
        else if(isIE11){
            return 11;
        }
    }
};

//默认在本页面弹出，在添加dhtmlx_iframe.js的页面弹出
function getDhtmlxWindow(){
    //是否是最顶层窗口，即没有嵌入到iframe中
    _isTopWindow = true;
    parentFrame = null;
    dhtmlxPopWindow = null;
    topWindow = window;
    try{
        while(true){
            if(topWindow.dhtmlx_iframe){
                _isTopWindow = false;
                dhtmlxPopWindow = topWindow;
                var frames = dhtmlxPopWindow.parent.document.getElementsByTagName("iframe");
                for(var i = 0; i < frames.length; i++){
                    if(frames[i].contentWindow == window){
                        parentFrame =  frames[i];
                    }
                }
            }

            if(topWindow.parent == topWindow){
                break;
            }
            topWindow = topWindow.parent
        }
    }
    catch (e){

    }
//    for(topWindow = window; topWindow.parent!=null && topWindow.parent != topWindow; topWindow = topWindow.parent)
//    {
//        _isTopWindow = false;
//        if(topWindow.dhtmlx_iframe){
//            dhtmlxPopWindow = topWindow;
//        }
//        var frames = topWindow.parent.document.getElementsByTagName("iframe");
//        for(var i = 0; i < frames.length; i++){
//            if(frames[i].contentWindow == window){
//                parentFrame =  frames[i];
//            }
//        }
//    }
    if(!dhtmlxPopWindow){
//        dhtmlxPopWindow = topWindow;
        _isTopWindow = true;
    }
    if(!parentFrame){
        _isTopWindow = true;
    }
    return null;
}

/**
 * 动态加载js、css文件模块
 */
var classcodes = [];
function LoadFileList(_files,succes){           /*加载一批文件，_files:文件路径数组,可包括js,css,less文件,succes:加载成功回调函数*/
    var FileArray=[];
    if(typeof _files==="object"){
        FileArray=_files;
    }else if(typeof _files==="string"){
        /*如果文件列表是字符串，则用,切分成数组*/
        FileArray=_files.split(",");

    }
    if(FileArray!=null && FileArray.length>0){
        var LoadedCount=0;
        for(var i=0;i< FileArray.length;i++){
            loadFile(FileArray[i],function(){
                LoadedCount++;
                if(LoadedCount==FileArray.length){
                    succes();
                }
            })
        }
    }
    else if(FileArray!=null && FileArray.length==0){
        succes();
    }
    /*加载JS文件,url:文件路径,success:加载成功回调函数*/
    function loadFile(url, success) {
        if (!FileIsExt(classcodes,url)) {
            var ThisType=GetFileType(url);
            var fileObj=null;
            if(ThisType==".js"){
                fileObj=document.createElement('script');
                fileObj.src = url;
            }else if(ThisType==".css"){
                fileObj=document.createElement('link');
                fileObj.href = url;
                fileObj.type = "text/css";
                fileObj.rel="stylesheet";
            }else if(ThisType==".less"){
                fileObj=document.createElement('link');
                fileObj.href = url;
                fileObj.type = "text/css";
                fileObj.rel="stylesheet/less";
            }
            success = success || function(){};
            fileObj.onload = fileObj.onreadystatechange = function() {
                if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                    success();
                    classcodes.push(url)
                }
            }
            document.getElementsByTagName('head')[0].appendChild(fileObj);
        }else{
            success();
        }
    }
    /*获取文件类型,后缀名，小写*/
    function GetFileType(url){
        if(url!=null && url.length>0){
            return url.substr(url.lastIndexOf(".")).toLowerCase();
        }
        return "";
    }
    /*文件是否已加载*/
    function FileIsExt(FileArray,_url){
        if(FileArray!=null && FileArray.length>0){
            var len =FileArray.length;
            for (var i = 0; i < len; i++) {
                if (FileArray[i] ==_url) {
                    return true;
                }
            }
        }
        return false;
    }
}

function ContainsJS(jsName){
    var scripts = document.getElementsByTagName("script");
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(jsName) != -1) {
            return true;
        }
    }
    return false;
}

function CreateJSPath(str,dis){
    var scripts = document.getElementsByTagName("script");
    var path = "";
    if(str && str.indexOf("js") != -1){
        for (var i = 0, l = scripts.length; i < l; i++) {
            var src = scripts[i].src;
            if (src.indexOf(str) != -1) {
                path = src.split(str)[0];
                break;
            }
        }
    }

    var href = location.href;
    href = href.split("#")[0].split("?")[0].split("/");

    var isAbsolutePath = true;
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        isAbsolutePath = false;
        href.length = href.length - 1;
        path = path.split("/");
        path = href.concat(path);
    }
    if(isAbsolutePath){
        path = path.split("/");
    }
    path.length = path.length - 1 + (dis || 0);
    path = path.join("/");
    return path;
}

//深度拷贝对象或数组
function deepCopy(){
    var i,
        args = arguments,
        len,
        ret = {},
        doCopy = function (copy, original) {
            var value, key;

            // An object is replacing a primitive
            if (typeof copy !== 'object') {
                copy = {};
            }

            for (key in original) {
                if (original.hasOwnProperty(key)) {
                    value = original[key];

                    // Copy the contents of objects, but not arrays or DOM nodes
                    if (value && typeof value === 'object' && Object.prototype.toString.call(value) !== '[object Array]'
                        && key !== 'renderTo' && typeof value.nodeType !== 'number') {
                        copy[key] = doCopy(copy[key] || {}, value);

                        // Primitives and arrays are copied over directly
                    } else if(isArray(value)){
                        copy[key] = doCopy(copy[key] || [], value);
                    } else{
                        copy[key] = original[key];
                    }
                }
            }
            return copy;
        };

    // If first argument is true, copy into the existing object. Used in setOptions.
    if (args[0] === true) {
        ret = args[1];
        args = Array.prototype.slice.call(args, 2);
    }

    // For each argument, extend the return
    len = args.length;
    for (i = 0; i < len; i++) {
        ret = doCopy(ret, args[i]);
    }

    return ret;
}