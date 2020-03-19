
/*基础工具类库*/
//return 时间戳到秒
var time = function () {
    var time = (new Date()).valueOf();
    return parseInt(time / 1000);
}
//return 时间戳，含小数点；小数点部分为毫秒；date('Y/m/d H:i:s',time()) or date('Y/m/d H:i:s')
var timeFloat = function () {
    var time = (new Date()).valueOf();
    return time / 1000;
}
var urlEncode = encodeURIComponent;
var urlDecode = function (str) {
    try {
        return decodeURIComponent(str);
    } catch (e) {
        return str;
    }
};

var UUID = function () {
    return 'uuid_' + time() + '_' + Math.ceil(Math.random() * 10000)
}
var round = function (val, point) {
    if (!point) point = 2;
    point = Math.pow(10, parseInt(point));
    return Math.round(parseFloat(val) * point) / point;
}
var roundFromTo = function (from, to) {//生成from到to的随机数；整数，包含to不包含from
    var react = to - from;
    return Math.ceil(Math.random() * react + from);
}
/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** randomWord(false,4) 生成任意4位长度的随机数
** randomWord(true,1,9) 生成任意1-9位长度的随机数
*/

function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}
var md5 = function (str) {
    return CryptoJS.MD5(str).toString();
}
var aesEncode = function (str, key) {
    return CryptoJS.AES.encrypt(str, key).toString();
}
var aesDecode = function (str, key) {
    return CryptoJS.AES.decrypt(str, key).toString(CryptoJS.enc.Utf8);
}
var replaceAll = function (str, find, replace_to) {
    while (str.indexOf(find) >= 0) {
        str = str.replace(find, replace_to);
    }
    return str;
}
var ltrim = function (str, remove) {
    if (!str || str.length == 0) return "";
    var i; remove = remove == undefined ? ' ' : remove;
    while (str.substring(0, remove.length) == remove) {
        str = str.substring(remove.length);
    }
    return str;
}
var rtrim = function (str, remove) {
    if (typeof (str) != 'string') return "";
    var i; remove = remove == undefined ? ' ' : remove;
    while (str.substring(str.length - remove.length) == remove) {
        str = str.substring(0, str.length - remove.length);
    }
    return str;
}
var trim = function (str, remove) {
    if (remove == undefined) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    return ltrim(rtrim(str, remove), remove);
}
var quoteHtml = function (str) {
    str = str.replace(/"/g, '&quot;');
    str = str.replace(/'/g, '&#39;');
    return str;
}
var quoteEncode = function (str) {
    str = str.replace(/(['"])/g, '\\$1');
    return str;
}
var isWap = function () {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
        return true;
    }
    return false;
}
//cookie操作
//titmeout 单位为天
var Cookie = (function () {
    var data = {};
    var _init = function () {
        data = {};//初始化
        var cookieArray = document.cookie.split("; ");
        for (var i = 0; i < cookieArray.length; i++) {
            var arr = cookieArray[i].split("=");
            data[arr[0]] = unescape(arr[1]);
        }
        return data;
    }
    var get = function (key) {//没有key代表获取所有
       
        return Ext.util.Cookies.get(key);
    };
    var set = function (key, value, timeout) {

        //timeout 以天计算
        var expDate=null;
        if (timeout) {
            expDate = new Date();
            expDate.setTime(expDate.getTime() + timeout * 3600 * 24 * 1000);
        }
        Ext.util.Cookies.set(key, value,expDate)

        
    };
    var del = function (key) {
        Ext.util.Cookies.clear(key)
    };
    var clear = function () {
        _init();
        for (var key in data) {
            del(key);
        }
    }
    return {
        get: get,
        set: set,
        del: del,
        clear: clear
    }
})();

//LocalData操作 数据存储
var LocalData = function () { };
var LocalData = (function () {
    var nameSpace = 'vmddata-';
    var makeKey = function (key) {
        if (key != '') {
            return nameSpace + key;
        } else {
            return key;
        }
    }
    var support = function () {
        try {
            if (window.localStorage) {
                return true;
            } else {
                return false;
            }
        } catch (e) { return false; }
    }
    var get = function (key) {//没有key代表获取所有
        key = makeKey(key);
        if (support()) {
            if (key != undefined) {
                return localStorage.getItem(key);
            } else {
                var result = {};
                for (var i = 0; i < localStorage.length; i++) {
                    result[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
                }
                return result;
            }
        } else {
            return Cookie.get(key);
        }
    };
    var set = function (key, value, timeout) {
        key = makeKey(key);
        if (support()) {
            localStorage.setItem(key, value);
        } else {
            Cookie.set(key, value, timeout);
        }
    };
    var del = function (key) {
        key = makeKey(key);
        if (support()) {
            localStorage.removeItem(key);
        } else {
            Cookie.del(key);
        }
    };

    //复杂数据读写 只存储json数据
    var setConfig = function (key, value) {
        key = makeKey(key);
        value = base64Encode(Ext.encode(value));
        if (support()) {
            localStorage.setItem(key, value);
        }
    }
    //复杂数据读写
    var getConfig = function (key) {
        var result = this.get(key);
        if (result === null || result == undefined || result == '') {
            return false;
        } else {
            return Ext.decode(base64Decode(result));
        }
    }
    var clear = function () {
        if (support()) {
            for (var i = 0; i < storage.length; i++) {
                localStorage.removeItem(storage.key(i));
            }
        } else {
            Cookie.clear();
        }
    }
    return {
        setSpace: function (space) {
            nameSpace = space ? space : '';
        },
        support: support,
        get: get,
        set: set,
        setConfig: setConfig,
        getConfig: getConfig,
        del: del,
        clear: clear
    }
})();


//ie 兼容
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

//队列数据类；用于历史记录记录前进后退等;数据浏览器持久化
//eg:  var historySearch  = new Queen(10,'historySearch');
function Queen(maxLength, identify) {
    //数据读取与存储
    var data = function (list) {
        if (!LocalData.support()) {
            return [];
        }
        if (list == undefined) {
            return LocalData.getConfig(identify);
        } else {
            return LocalData.setConfig(identify, list);
        }
    }
    var queenList = data();//本地存储初始化
    if (!queenList) {
        queenList = [];
    }
    var index = queenList.length - 1;
    var add = function (val) {
        index = queenList.length - 1;//重置
        if (val == '' || val == queenList[queenList.length - 1]) {
            return;
        }
        if (queenList.length - 1 >= maxLength) {
            queenList = queenList.slice(1, queenList.length);
        }
        queenList.push(val);
        data(queenList);
        index = queenList.length - 1;//重置
    };
    var next = function () {
        if (++index <= queenList.length - 1) {
            return queenList[index];
        } else {
            index = queenList.length;
            return '';
        }
    }
    var back = function () {
        if (--index >= 0) {
            return queenList[index];
        } else {
            index = 0;
            return queenList[0];
        }
    }
    var last = function () {
        return queenList[queenList.length - 1];
    }
    var clear = function () {
        index = 0;
        queenList = [];
        data(queenList);
    }
    return {
        add: add,
        back: back,
        next: next,
        last: last,
        clear: clear,
        list: function () {
            return queenList;
        }
    }
};
//是否在数组中。
var inArray = function (arr, value) {
    for (var i = 0, l = arr.length ; i < l ; i++) {
        if (arr[i] === value) {
            return true;
        }
    }
    return false;
}
var stopPP = function (e) {//防止事件冒泡
    e = e || window.event;
    if (!e) return;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.cancelBubble = true;
    e.keyCode = 0;
    e.returnValue = false;
}
var Title = (function () {
    var oldTitle = document.title;
    var reset = function () {
        document.title = oldTitle;
    }
    var set = function (msg) {
        document.title = msg + '        ' + oldTitle;
    }
    return {
        reset: reset,
        set: set
    }
})();
//获取keys
var objectKeys = function (obj) {
    var keys = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            keys.push(p);
        }
    }
    return keys;
}
//获取values
var objectValues = function (obj) {
    var values = [];
    for (var p in obj) {
        keys.push(obj[p]);
    }
    return values;
}

//yyyy-mm-dd H:i:s or yy-mm-dd  to timestamp
var strtotime = function (datetime) {
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/\//g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var y = arr[0];
    var m = arr[1] - 1;
    var d = arr[2];
    var h = arr[3] - 8; ///兼容八小时时差问题  
    var i = arr[4];
    var s = arr[5];
    //兼容无"时:分:秒"模式  
    if (arr[3] == 'undefined' || isNaN(h)) {
        h = 0;
    }
    if (arr[4] == 'undefined' || isNaN(i)) {
        i = 0;
    }
    if (arr[5] == 'undefined' || isNaN(s)) {
        s = 0;
    }
    var now = new Date(Date.UTC(y, m, d, h, i, s));
    return parseInt(now.getTime() / 1000);
}
var date = function (format, timestamp) {
    timestamp = parseInt(timestamp);
    var a, jsdate = ((timestamp) ? new Date(timestamp * 1000) : new Date());
    var pad = function (n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = { 1: "st", 2: "nd", 3: "rd", 21: "st", 22: "nd", 23: "rd", 31: "st" };
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day
        d: function () { return pad(f.j(), 2) },
        D: function () { return f.l().substr(0, 3) },
        j: function () { return jsdate.getDate() },
        l: function () { return txt_weekdays[f.w()] },
        N: function () { return f.w() + 1 },
        S: function () { return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th' },
        w: function () { return jsdate.getDay() },
        z: function () { return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0 },

        // Week
        W: function () {
            var a = f.z(), b = 364 + f.L() - a;
            var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= (6 - nd)) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                }
            }
        },

        // Month
        F: function () { return txt_months[f.n()] },
        m: function () { return pad(f.n(), 2) },
        M: function () { return f.F().substr(0, 3) },
        n: function () { return jsdate.getMonth() + 1 },
        t: function () {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },

        // Year
        L: function () { var y = f.Y(); return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0 },
        Y: function () { return jsdate.getFullYear() },
        y: function () { return (jsdate.getFullYear() + "").slice(2) },

        // Time
        a: function () { return jsdate.getHours() > 11 ? "pm" : "am" },
        A: function () { return f.a().toUpperCase() },
        B: function () {
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if ((String(beat)).length == 1) beat = "00" + beat;
            if ((String(beat)).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function () { return jsdate.getHours() % 12 || 12 },
        G: function () { return jsdate.getHours() },
        h: function () { return pad(f.g(), 2) },
        H: function () { return pad(jsdate.getHours(), 2) },
        i: function () { return pad(jsdate.getMinutes(), 2) },
        s: function () { return pad(jsdate.getSeconds(), 2) },

        O: function () {
            var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
            return t;
        },
        P: function () { var O = f.O(); return (O.substr(0, 3) + ":" + O.substr(3, 2)) },
        c: function () { return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P() },
        U: function () { return Math.round(jsdate.getTime() / 1000) }
    };
    return format.replace(/[\\]?([a-zA-Z])/g, function (t, s) {
        if (t != s) {
            ret = s;
        } else if (f[s]) {
            ret = f[s]();
        } else {
            ret = s;
        }
        return ret;
    });
}


var Base64Hex = (function () {
    var encode = function (str) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var out, i, len;
        var c1, c2, c3;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    var decode = function (str) {
        var base64DecodeChars = new Array(
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
		52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
		-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
		-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
		41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
        var c1, c2, c3, c4;
        var i, len, out;

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;

            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;

            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;

            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
    return {
        encode: encode,
        decode: decode
    }
})();
var Base64Server = (function () {
    var encode = function (stringToEncode) {
        var encodeUTF8string = function (str) {
            return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
				function toSolidBytes(match, p1) {
				    return String.fromCharCode('0x' + p1)
				});
        }
        if (typeof window !== 'undefined') {
            if (typeof window.btoa !== 'undefined') {
                return window.btoa(encodeUTF8string(stringToEncode));
            }
        } else {
            return new Buffer(stringToEncode).toString('base64');
        }
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        var o1, o2, o3, h1, h2, h3, h4, bits;
        var i = 0;
        var ac = 0;
        var enc = '';
        var tmpArr = [];
        if (!stringToEncode) {
            return stringToEncode
        }
        stringToEncode = encodeUTF8string(stringToEncode)
        do {
            o1 = stringToEncode.charCodeAt(i++);
            o2 = stringToEncode.charCodeAt(i++);
            o3 = stringToEncode.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            tmpArr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < stringToEncode.length)

        enc = tmpArr.join('');
        var r = stringToEncode.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    }
    // public method for decoding  
    var decode = function (encodedData) {
        var decodeUTF8string = function (str) {
            return decodeURIComponent(str.split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            }).join(''));
        }
        if (typeof window !== 'undefined') {
            if (typeof window.atob !== 'undefined') {
                return decodeUTF8string(window.atob(encodedData))
            }
        } else {
            return new Buffer(encodedData, 'base64').toString('utf-8')
        }
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
        var o1, o2, o3, h1, h2, h3, h4, bits;
        var i = 0
        var ac = 0
        var dec = ''
        var tmpArr = []

        if (!encodedData) {
            return encodedData
        }
        encodedData += ''
        do {
            h1 = b64.indexOf(encodedData.charAt(i++))
            h2 = b64.indexOf(encodedData.charAt(i++))
            h3 = b64.indexOf(encodedData.charAt(i++))
            h4 = b64.indexOf(encodedData.charAt(i++))

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4
            o1 = bits >> 16 & 0xff
            o2 = bits >> 8 & 0xff
            o3 = bits & 0xff;

            if (h3 === 64) {
                tmpArr[ac++] = String.fromCharCode(o1)
            } else if (h4 === 64) {
                tmpArr[ac++] = String.fromCharCode(o1, o2)
            } else {
                tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
            }
        } while (i < encodedData.length);
        dec = tmpArr.join('')
        return decodeUTF8string(dec.replace(/\0+$/, ''))
    }
    return {
        encode: encode,
        decode: decode
    }
})();


var authCrypt = (function () {
    var base64Encode = Base64Hex.encode;
    var base64Decode = Base64Hex.decode;
    var time = function () {
        var timeStamp = new Date().getTime();
        return parseInt(timeStamp / 1000);
    }
    var microtime = function (timeFloat) {
        var timeStamp = new Date().getTime();
        var sec = parseInt(timeStamp / 1000);
        return timeFloat ? (timeStamp / 1000) : (timeStamp - (sec * 1000)) / 1000 + ' ' + sec;
    }
    var chr = function (s) {
        return String.fromCharCode(s);
    }
    var ord = function (s) {
        return s.charCodeAt();
    }
    var authcode = function (str, operation, key, expiry) {
        var operation = operation ? operation : 'DECODE';
        var key = key ? key : '';
        var expiry = expiry ? expiry : 0;
        var ckey_length = 4;
        key = md5(key);
        var keya = md5(key.substr(0, 16));
        var keyb = md5(key.substr(16, 16));
        if (ckey_length) {
            if (operation == 'DECODE') {
                var keyc = str.substr(0, ckey_length);
            } else {
                var md5_time = md5(microtime());
                var start = md5_time.length - ckey_length;
                var keyc = md5_time.substr(start, ckey_length)
            }
        } else {
            var keyc = '';
        }

        var cryptkey = keya + md5(keya + keyc);
        var strbuf;
        if (operation == 'DECODE') {
            str = str.substr(ckey_length);
            strbuf = base64Decode(str);
        } else {
            expiry = expiry ? expiry + time() : 0;
            tmpstr = expiry.toString();
            if (tmpstr.length >= 10) {
                str = tmpstr.substr(0, 10) + md5(str + keyb).substr(0, 16) + str;
            } else {
                var count = 10 - tmpstr.length;
                for (var i = 0; i < count; i++) {
                    tmpstr = '0' + tmpstr;
                }
                str = tmpstr + md5(str + keyb).substr(0, 16) + str;
            }
            strbuf = str;
        }

        var box = new Array(256);
        for (var i = 0; i < 256; i++) {
            box[i] = i;
        }
        var rndkey = new Array();
        for (var i = 0; i < 256; i++) {
            rndkey[i] = cryptkey.charCodeAt(i % cryptkey.length);
        }
        for (var j = i = 0; i < 256; i++) {
            j = (j + box[i] + rndkey[i]) % 256;
            tmp = box[i];
            box[i] = box[j];
            box[j] = tmp;
        }

        var s = '';
        strbuf = strbuf.split('');
        for (var a = j = i = 0; i < strbuf.length; i++) {
            a = (a + 1) % 256;
            j = (j + box[a]) % 256;
            tmp = box[a];
            box[a] = box[j];
            box[j] = tmp;
            s += chr(ord(strbuf[i]) ^ (box[(box[a] + box[j]) % 256]));
        }

        if (operation == 'DECODE') {
            if ((s.substr(0, 10) == 0 || s.substr(0, 10) - time() > 0) && s.substr(10, 16) == md5(s.substr(26) + keyb).substr(0, 16)) {
                s = s.substr(26);
            } else {
                s = '';
            }
        } else {
            s = base64Encode(s);
            var regex = new RegExp('=', "g");
            s = s.replace(regex, '');
            s = keyc + s;
        }
        return s;
    }
    return {
        authcode: authcode,
        encode: function (string, key, expiry) {
            var result = authcode(string, "ENCODE", key, expiry);
            result = result.replace(/\+/g, '-');
            result = result.replace(/\//g, '_');
            result = result.replace(/=/g, '.');
            return result;
        },
        decode: function (string, key) {
            string = string.replace(/-/g, '+');
            string = string.replace(/_/g, '/');
            string = string.replace(/\./g, '=');
            var result = authcode(string, "DECODE", key);
            return result;
        }
    }
})();


var base64Encode = Base64Server.encode;
var base64Decode = Base64Server.decode;
var htmlEncode = function (str) {
    var s = "";
    if (!str || str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    //s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
}
var htmlDecode = function (str) {
    var temp = document.createElement("div");
    temp.innerHTML = str;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}
//去掉所有的html标记  
var htmlRemoveTags = function (str) {
    return str.replace(/<[^>]+>/g, "");
}
//ie js
if (!window.console) {
    window.console = {
        log: function () { },
        trace: function () { },
        info: function () { },
        warn: function () { },
        error: function () { },
        assert: function () { },
        dir: function () { },
        clear: function () { },
        profile: function () { }
    };
    //window.console = undefined;
}
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;
            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }
            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}

//tips message
//type: success/error/warning/info
var Tips = (function () {
    var inTime = 400;
    var delay = 1000;
    var staticPath = bootPATH + "/img/";
    if (typeof (G) != "undefined") {
        staticPath = G.staticPath;
    }
    var _init = function (single, msg, code) {
        var tipsIDname = UUID();
        if (single) {
            tipsIDname = 'messageTips';
        }

        var tipsID = "#" + tipsIDname;
        if ($(tipsID).length == 0) {
            var html = '<div id="' + tipsIDname + '" class="tips-box"><i class="tips-icon"></i><div class="tips-msg"><p></p></div>' +
                '<a class="tips-close">×</a><div style="clear:both"></div></div>'
            $('body').append(html);

            $(tipsID).show().css({ 'left': ($(window).width() - $(tipsID).innerWidth()) / 2 });
            $(window).bind('resize', function () {
                if ($(tipsID).css('display') == "none") return;
                self.stop(true, true)
                $(tipsID).css({ 'left': ($(window).width() - $(tipsID).width()) / 2 });
            });
            $(tipsID).find('.tips-close').click(function () {
                $(tipsID).animate({ opacity: 0 },
                    inTime, 0, function () {
                        $(this).hide();
                    });
            });
        }
        var self = $(tipsID), theType;
        switch (code) {//  success/warning/info/error
            case 100: delay = 2000;//加长时间 5s
            case true:
            case undefined:
            case 'success': theType = 'success'; break;
            case 'info': theType = 'info'; break;
            case 'warning': theType = 'warning'; break;
            case false:
            case 'error': theType = 'error'; delay = 2000; break;
            default: theType = 'info'; break;
        }

        self.removeClass().addClass('tips-box ' + theType);
        if (msg != undefined) self.find('.tips-msg p').html(msg);
        $(tipsID).show().css({ 'left': ($(window).width() - $(tipsID).innerWidth()) / 2 });
        return self;
    };
    var tips = function (msg, code, _delay) {
        if (msg && typeof (msg) == 'object') {
            code = msg.code;
            msg = msg.data;
        }
        var self = _init(false, msg, code);
		
		delay=_delay||delay;
        self.stop(true, true)
            .css({ opacity: 0, 'top': -self.height() })
            .show()
            .animate({ opacity: 1, top: 0 }, inTime, 0);
        setTimeout(function () {
            self.animate({ opacity: 0, top: -self.height() }, inTime, 0, function () {
                self.remove();
            });
        }, delay);
    };

    var pop = function (msg) {
        var tipsIDname = 'messageTipsPop';
        var $self = $("#" + tipsIDname);
        if ($self.length == 0) {
            var html = '<div id="' + tipsIDname + '" class="tips-box-pop"><div class="tips-msg"></div></div>';
            $('body').append(html);
            $self = $("#" + tipsIDname);
        }
        $self.find('.tips-msg').html(msg);
        $self.css({
            'left': ($(window).width() - $self.innerWidth()) / 2,
            'top': ($(window).height() - $self.innerHeight()) / 2
        });

        var animateTime = 150;
        $self.stop(true, true)
            .fadeIn(animateTime)
            .animate({ opacity: 0.4 }, animateTime, 0)
            .delay(delay)
            .animate({ opacity: 0 }, animateTime, 0, function () {
                $self.remove();
            });
    };

    var loading = function (msg, code) {
        if (typeof (msg) == 'object') {
            code = msg.code;
            msg = msg.data;
        }
        if (msg == undefined) msg = 'loading...';
        msg += "&nbsp;&nbsp; <img src='" + staticPath + "common/loading_circle.gif'/>";

        var self = _init(true, msg, code);
        self.stop(true, true)
            .css({ 'opacity': '0', 'top': -self.height() })
            .animate({ opacity: 1, top: 0 }, inTime, 0);
    };
    var close = function (msg, code) {
        if (typeof (msg) == 'object') {
            try {
                code = msg.code; msg = msg.data;
                if (code && typeof (msg) != 'string') {
                    msg = "Success!";
                    if (window.LNG && LNG.success) {
                        msg = LNG['success'];
                    }
                }
            } catch (e) {
                code = 0; msg = '';
            };
        }
        var self = _init(true, msg, code);
        setTimeout(function () {
            self.stop(true, true).animate({ opacity: 0, top: -self.height() }, inTime, 'linear', function () {
                self.remove();
            });
        }, delay);
        // $(self).stop(true,true)
        // 	.show()
        // 	.delay(delay)
        // 	.animate({opacity:0,top:- self.height()},inTime,'linear',function(){
        // 		self.remove();
        // 	});
    };
    return {
        tips: tips,
        pop: pop,
        loading: loading,
        close: close
    }
})();

if (!vmd.tip) vmd.tip = Tips.tips;
if(!vmd.pop) vmd.pop = Tips.pop;
var isWap = function () {
    if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
        return true;
    }
    return false;
};

(function ($) {
    $.getUrlParam = function (name, url) {
        if (!url) url = window.location.href;
        var urlParam = $.parseUrl(url);
        if (!name) {
            return urlParam;
        }
        return urlParam.params[name];//unescape
    };
    $.parseUrl = function (url) {
        if (!url) {
            url = window.location.href;
        }
        var a = document.createElement('a');
        a.href = url;
        var result = {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function () {
                var ret = {},
                    seg = a.search.replace(/^\?/, '').split('&'),
                    len = seg.length,
                    i = 0,
                    s;
                for (; i < len; i++) {
                    if (!seg[i]) {
                        continue;
                    }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/')
        };
        var port = result.port ? ':' + result.port : '';
        result.url = result.protocol + '://' + result.host + port + result.path + result.query;
        return result;
    }

    //选择器，目标含有特殊字符的预处理
    //http://stackoverflow.com/questions/2786538/need-to-escape-a-special-character-in-a-jquery-selector-string
    $.escape = function (str) {
        if (!str) {
            return str;
        }
        return str.replace(/[ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
    };
    $.setStyle = function (cssText, id) {
        var head = document.getElementsByTagName('head')[0] || document.documentElement;
        var element = document.getElementById(id);
        $(element).remove();

        element = document.createElement('style');
        id && (element.id = id);
        element.type = "text/css";
        head.appendChild(element);
        if (element.styleSheet !== undefined) {
            // IE http://support.microsoft.com/kb/262161
            if (document.getElementsByTagName('style').length > 31) {
                throw new Error('Exceed the maximal count of style tags in IE')
            }
            element.styleSheet.cssText = cssText
        } else {
            element.appendChild(document.createTextNode(cssText));
        }
    }
    $.addStyle = function (cssText) {
        var head = document.getElementsByTagName('head')[0] || document.documentElement;
        var id = 'add-style-css-text';
        var element = $('#' + id).get(0);
        if (!element) {
            element = document.createElement('style');
            element.id = 'add-style-css-text';
            element.type = "text/css";
            head.appendChild(element);
        }
        if (element.styleSheet !== undefined) {
            element.styleSheet.cssText += cssText
        } else {
            element.appendChild(document.createTextNode(cssText));
        }
    }
    // 进指定字符串通过浏览器下载 // http://danml.com/download.html
    $.supportUploadFolder = function () {
        if (isWap()) {
            return false;
        }
        var el = document.createElement('input');
        el.type = 'file';
        return typeof el.webkitdirectory !== "undefined" || typeof el.directory !== "undefined";
    };
    $.supportCanvas = function () {
        return !!document.createElement('canvas').getContext;
    }
    $.supportCss3 = function (style) {
        if (!style) style = 'box-shadow';
        var prefix = ['webkit', 'Moz', 'ms', 'o'],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };

        for (i in prefix) {
            humpString.push(_toHumb(prefix[i] + '-' + style));
        }
        humpString.push(_toHumb(style));
        for (i in humpString) {
            if (humpString[i] in htmlStyle) return true;
        }
        return false;
    }

    //打印html
    $.htmlPrint = function (html) {
        html = "<div style='width:100%;height:100%;'>" + html + "</div>";
        if ($.browser.opera) {
            var tab = window.open("", "print-preview");
            doc.open();
            var doc = tab.document;
            var paWindow = tab;
        } else {
            var $iframe = $("<iframe />");
            $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-2000px", top: "-2000px" });
            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
            var paWindow = $iframe[0].contentWindow;
        }
        if (!doc) throw "Cannot find document.";

        // $("link").each( function() {
        // 	doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
        // });
        doc.write(html);
        doc.close();
        setTimeout(function () {
            $(doc).ready(function () {
                paWindow.focus();
                paWindow.print();
                if (tab) tab.close();
            });
        }, 500);
    };
    $.fn.extend({
        //dom绑定enter事件  用于input
        keyEnter: function (callback) {
            this.each(function () {
                $(this).die('keydown').live('keydown', function (e) {
                    if (e.keyCode == 13 && callback) {
                        callback();
                    }
                });
            });
            return this;
        },

        myDbclick: function (callback) {
            var timeout = 0.5;
            $(this).die('mouseup').live('mouseup', function (e) {
                if (e.which !== 1) return;
                var preClick = $(this).data('myDbclick');
                var time = timeFloat();
                if (!preClick) {
                    $(this).data('myDbclick', time);
                    return;
                }
                if (time - preClick <= timeout) {
                    callback && callback(e);
                }
                $(this).data('myDbclick', time);
                return true;
            });
            return this;
        },


        //晃动 $('.wrap').shake(4,4,100);//次数；位移；运动时间
        shake: function (times, offset, delay) {
            $(this).stop(true, true).each(function () {
                var Obj = $(this);
                var marginLeft = parseInt(Obj.css('margin-left'));
                delay = delay > 50 ? delay : 50;
                Obj.animate({ 'margin-left': marginLeft + offset }, delay, function () {
                    Obj.animate({ 'margin-left': marginLeft }, delay, function () {
                        times = times - 1;
                        if (times > 0)
                            Obj.shake(times, offset, delay);
                    });
                });
            });
            return this;
        },
        //闪烁 $('.wrap').flash(4,100);//次数；运动时间
        flash: function (times, delay) {
            $(this).stop(true, true).each(function () {
                var Obj = $(this);
                delay = delay > 50 ? delay : 50;
                Obj.animate({ 'opacity': 0.3 }, delay, function () {
                    Obj.animate({ 'opacity': 1 }, delay, function () {
                        times = times - 1;
                        if (times > 0) {
                            Obj.flash(times, delay);
                        }
                    });
                });
            });
            return this;
        },
        scale: function (xScale, yScale) {
            var Obj = $(this);
            if ($.browser.mozilla || $.browser.opera || $.browser.safari) {
                Obj.css('transform', 'scale(' + xScale + ', ' + yScale + ')');
                Obj.css('transform-origin', '0px 0px');
            } else if ($.browser.msie && parseInt($.browser.version) >= 9) {
                Obj.css('-ms-transform', 'scale(' + xScale + ')');
                Obj.css('-ms-transform-origin', '0px 0px');
            } else if ($.browser.msie && parseInt($.browser.version) < 9) {
                Obj.css('zoom', xScale);
            } else {
                Obj.css('-webkit-transform', 'scale(' + xScale + ', ' + yScale + ')');
                Obj.css('-webkit-transform-origin', '0px 0px');
            }
        }
    });
})(jQuery);


//点击水波效果；按钮
var loadRipple = function (search_arr, ignoreArr) {
    var UUID = function () {
        var time = (new Date()).valueOf();
        return 'uuid_' + parseInt(time / 1000) + '_' + Math.ceil(Math.random() * 10000)
    }
    var getTarget = function ($target) {
        for (var i = 0; i < search_arr.length; i++) {
            var se = search_arr[i];
            if (se.substr(0, 1) == '#') {
                if ($target.attr('id') == se.substr(1)) {
                    return $target;
                } else if ($target.parent(se).length != 0) {
                    return $($target.parents(se)[0]);
                }
            } else if (se.substr(0, 1) == '.') {
                if ($target.hasClass(se.substr(1))) {
                    return $target;
                } else if ($target.parents(se).length != 0) {
                    return $($target.parents(se)[0]);
                }
            } else {
                if ($target.is(se)) {
                    return $target;
                } else if ($target.parents(se).length != 0) {
                    return $($target.parents(se)[0]);
                }
            }
        }
        return '';
    }
    var isIgnore = function ($target) {
        for (var i = 0; i < ignoreArr.length; i++) {
            var select = ignoreArr[i];
            if ($target.closest(select).length != 0) {//从当前想上查找
                return true;
            }
        }
        return false;
    }

    if (typeof (Worker) == "undefined" ||
        $.browser.msie && $.browser.version <= 10) { //ie 10不支持 但支持worker
        return;//不支持html5 css3
    }
    //|| $(e.target).parents(".aui-state-focus").length!=0
    $('body').on('mousedown', function (e) {
        var $target = getTarget($(e.target));
        if ($target == '' || isIgnore($target)) {
            return;
        }
        var uuid = 'ripple-' + UUID();
        var father = $target;//$(this) $target
        var circleWidth = $target.outerWidth();
        $('<div class="ripple-father" id="' + uuid + '"><div class="ripple"></div></div>').appendTo(father);
        if ($target.outerWidth() < $target.outerHeight()) {
            circleWidth = $target.outerHeight();
        }
        circleWidth = circleWidth > 150 ? 150 : circleWidth;
        circleWidth = circleWidth < 50 ? 50 : circleWidth;

        var $ripp = $('#' + uuid).css({
            left: 0,
            top: 0,
            'border-radius': $target.css("border-radius"),
            width: $target.innerWidth(),
            height: $target.innerHeight()
        });

        var position = $ripp.parent().css('position');
        if (position != 'absolute' && position != 'fixed') {//父元素为绝对定位则不设置相对定位
            $ripp.parent().css('position', 'relative');
            $ripp.parent().css({ left: 0, top: 0 });
        }
        $('#' + uuid + ' .ripple').css({
            'background': $target.css('color'),
            "margin-left": e.pageX - circleWidth / 2 - $target.offset().left,
            "margin-top": e.pageY - circleWidth / 2 - $target.offset().top,
            "width": circleWidth,
            "height": circleWidth
        });

        var animateTime = 700;
        setTimeout(function () {
            $ripp.find('.ripple').css('transform', "scale(2.5)");
        }, animateTime);
        $(this).one('click mouseup mouseleave', function (e) {
            $ripp.animate({ 'opacity': 0 }, 400, function () {
                $ripp.remove();
            });
        });
    });
};
//通用遮罩层
var MaskView = (function () {
    var opacity = 0.7;
    var color = '#000';
    var animatetime = 250;
    var maskId = "#windowMaskView";
    var maskContent = '#maskViewContent';
    var staticPath = "./static/";
    if (typeof (G) != "undefined") {
        staticPath = G.staticPath;
    }
    var add = function (content, t_opacity, t_color, time) {
        if (t_opacity != undefined) opacity == t_opacity;
        if (t_color != undefined) color == t_color;
        if (time != undefined) animatetime == time;

        if ($(maskId).length == 0) {
            var html = '<div id="windowMaskView" style="position:fixed;top:0;left:0;right:0;bottom:0;background:' +
			color + ';opacity:' + opacity + ';filter:alpha(opacity=' + (opacity * 100) + ');z-index:9998;"></div><div id="maskViewContent" style="position:absolute;z-index:9999"></div>';
            $('body').append(html);
            $(maskId).bind('click', close);
            $(maskContent).bind('click', function (e) {
                e.stopPropagation();
            });
            $(window).unbind('resize').bind('resize', _resize);
        }
        $(maskContent).html(content).fadeIn(animatetime); _resize();
        $(maskId).hide().fadeIn(animatetime);
    };
    var _resize = function () {
        var $content = $(maskContent);
        $content.css({ 'width': 'auto', 'height': 'auto' }).css({
            top: ($(window).height() - $content.height()) / 2,
            left: ($(window).width() - $content.width()) / 2
        });
        imageSize();
    }
    var tips = function (msg) {
        add("<div style='font-size:50px;color:#fff;'>" + msg + "</div>");
    }
    var image = function (url) {
        add("<img class='kod_image_view_loading' src='" + staticPath + "images/common/loading_black.gif' style='position:fixed;top:50%;left:50%;opacity:0.5;z-index:99'/>" +
			"<img src='" + htmlEncode(url) + "' class='image kod_image_view' " +
			" style='opacity:0.01;-webkit-box-reflect: below 1px -webkit-gradient(linear,left top,left bottom,from(transparent)," +
			"color-stop(80%,transparent),color-stop(70%,rgba(255,255,255,0)),to(rgba(255,255,255,0.3)));'/>");
        var $content = $(maskContent)
        var $dom = $content.find('.image');
        var dragFlag = false, E;
        var old_left, old_top;

        $('#maskViewContent .kod_image_view_loading').fadeIn(300);
        $('#maskViewContent .kod_image_view').load(function () {
            $('#maskViewContent .kod_image_view_loading').stop(true).fadeOut(500, function () {
                $(this).remove();
            });
            _resize();
            $(this).css('opacity', 1.0).addClass('animated-500 dialogShow');
        });
        $(document).bind({
            mousedown: function (e) {
                if (!$(e.target).hasClass('image')) return;
                dragFlag = true;
                $dom.css('cursor', 'move');
                stopPP(e); E = e;
                old_top = parseInt($content.css('top').replace('px', ''));
                old_left = parseInt($content.css('left').replace('px', ''));
            },
            mousemove: function (e) {
                if (!dragFlag) return;
                $content.css({
                    'left': old_left + (e.clientX - E.clientX),
                    'top': old_top + (e.clientY - E.clientY)
                });
            },
            mouseup: function () {
                dragFlag = false;
                $dom.css('cursor', 'default');
            },
            keydown: function (e) {
                if ($(maskId).length > 0 && e.keyCode == 27) {
                    MaskView.close();
                    stopPP(e);
                }
            }
        });

        $('#windowMaskView,#maskViewContent img').mouseWheel(function (delta) {
            var offset = delta > 0 ? 1 : -1;
            offset = offset * Math.abs(delta / 3);
            var o_w = parseInt($dom.width()),
				o_h = parseInt($dom.height()),
				w = o_w * (1 + offset / 5),
				h = o_h * (1 + offset / 5);
            if (w <= 20 || h <= 20) return;
            if (w >= 10000 || h >= 10000) return;

            var top = parseInt($content.css("top")) - (h - o_h) / 2;
            var left = parseInt($content.css("left")) - (w - o_w) / 2;
            $(maskContent + ' .image').stop(false)
				.animate({ 'width': w, 'height': h, 'top': top, 'left': left }, 100);
        });
    }
    var imageSize = function () {
        var $dom = $(maskContent).find('.image');
        if ($dom.length == 0) return;
        $dom.load(function () {
            if (this.complete || this.readyState == "complete") {
                var percent = 0.7,
					w_width = $(window).width(),
					w_height = $(window).height(),
					m_width = this.width,
					m_height = this.height,
					width, height;
                if (m_width >= w_width * percent) {
                    width = w_width * percent;
                    height = m_height / m_width * width;
                } else {
                    width = m_width;
                    height = m_height;
                }

                $dom.css({ 'width': width, 'height': height });
                var $content = $(maskContent);
                $content.css({ 'width': 'auto', 'height': 'auto' }).css({
                    top: ($(window).height() - $content.height()) / 2,
                    left: ($(window).width() - $content.width()) / 2
                });
            }
        });
    }
    var close = function () {
        $(maskId).fadeOut(animatetime);
        if ($(maskContent).find('.image').length != 0) {
            $(maskContent + ',' + maskContent + ' .image').animate({
                'width': 0,
                'height': 0,
                'top': $(window).height() / 2,
                'left': $(window).width() / 2
            }, animatetime * 1.3, 0, function () {
                $(maskContent).hide();
                _resize();
            });
        } else {
            $(maskContent).fadeOut(animatetime);
        }
    };
    return {
        image: image,
        tips: tips,
        close: close
    }
})();


//textarea自适应高度
(function ($) {
    $.fn.exists = function () {
        return $(this).length > 0;
    }
    $.fn.displayWidth = function () {//文本宽度
        var text = $(this).text() || $(this).val();
        var html = "<span style='z-index:-1;;white-space: nowrap;font-size:" + $(this).css('font-size') + "'>" + text + "</span>";
        var $html = $(html);
        $html.appendTo('body');
        var size = $html.get(0).offsetWidth;
        $html.remove();
        return size;
    }
    $.fn.autoTextarea = function (options) {
        var defaults = {
            minHeight: 34,
            padding: 0
        };
        var opts = $.extend({}, defaults, options);
        var ie = !!window.attachEvent && !window.opera;
        var resetHeight = function (that) {
            if ($(that).is('input')) {//input则自动调节宽度
                $(that).css('width', $(that).displayWidth() + 20);
                return;
            }
            if (!ie) that.style.height = opts.minHeight + "px";
            var height = that.scrollHeight - opts.padding;
            if (height <= opts.minHeight) {
                that.style.height = opts.minHeight + "px";
            } else {
                that.style.height = height + "px";
            }
        }
        this.each(function () {
            $(this).die("paste cut keydown keyup focus blur change")
				   .live("paste cut keydown keyup focus blur change", function () {
				       resetHeight(this);
				   });
            resetHeight(this);
        });
    };

    //长按
    $.fn.longPress = function (callback, time) {
        if (time == undefined) time = 2000;
        $(this).die('mousedown').live('mousedown', function () {
            var timer = setTimeout(function () {
                callback(this);
            }, time);
            $(this).data('longPressTimer', timer);
        }).die('mouseup').live('mouseup', function () {
            clearTimeout($(this).data('longPressTimer'));
        }).die('mouseout').live('mouseout', function () {
            clearTimeout($(this).data('longPressTimer'));
        });
    }

    $.fn.inputChange = function (callback) {
        this.each(function () {
            $(this).on('input propertychange change blur', function () {
                if ($(this).prop('comStart')) return;    // 中文输入过程中不截断
                var value = $(this).val();
                callback(this, value);
            }).on('compositionstart', function () {
                $(this).prop('comStart', true);
            }).on('compositionend', function () {
                $(this).prop('comStart', false);
                $(this).trigger('input');
            });
        });
        return this;
    }

    //自动focus，并移动光标到指定位置，默认移到最后
    $.fn.textFocus = function (index) {
        var range, len, index = index === undefined ? 0 : parseInt(v);
        if ($(this).is(':focus')) {
            return;
        }

        var thatDom = $(this).get(0);
        index = (index == undefined ? this.value.length : parseInt(index));
        if ($.browser.msie) {
            var range = thatDom.createTextRange();
            index === 0 ? range.collapse(false) : range.move("character", index);
            range.select();
        } else {
            thatDom.setSelectionRange(index, 0);
        }
        this.focus();
        return this;
    };

    //选中input内文本段，并移动光标到最后
    $.fn.textSelect = function (from, to) {
        if ($(this).length == 0 || $(this).is(':focus')) {
            return;
        }

        var thatDom = $(this).get(0);
        from = (from == undefined ? 0 : parseInt(from));
        to = (to == undefined ? $(this).val().length : parseInt(to));
        if ($.browser.msie) {
            var range = thatDom.createTextRange();
            range.moveEnd('character', to);
            range.moveStart('character', from);
            range.select();
        } else {
            thatDom.setSelectionRange(from, to - from);
        }
        this.focus();
        return this;
    };
})(jQuery);
//正则表达式封装
function createSearchRegex(query, caseSensitive, isRegex) {
    var regexFlags = caseSensitive ? "g" : "gi";
    var regexObject;

    if (isRegex) {
        try {
            regexObject = new RegExp(query, regexFlags);
        } catch (e) {

        }
    }

    if (!regexObject)
        regexObject = createPlainTextSearchRegex(query, regexFlags);

    return regexObject;
}


function createPlainTextSearchRegex(query, flags) {

    var regexSpecialCharacters = String.regexSpecialCharacters();
    var regex = "";
    for (var i = 0; i < query.length; ++i) {
        var c = query.charAt(i);
        if (regexSpecialCharacters.indexOf(c) != -1)
            regex += "\\";
        regex += c;
    }
    return new RegExp(regex, flags || "");
}
String.regexSpecialCharacters = function () {
    return "^[]{}()\\.$*+?|-,";
}
//20180523封装集合和字典数据结构


var StringMap = function () {
    this._map = {};
    this._size = 0;
}

StringMap.prototype = {

    put: function (key, value) {
        if (key === "__proto__") {
            if (!this._hasProtoKey) {
                ++this._size;
                this._hasProtoKey = true;
            }
            this._protoValue = value;
            return;
        }
        if (!Object.prototype.hasOwnProperty.call(this._map, key))
            ++this._size;
        this._map[key] = value;
    },


    remove: function (key) {
        var result;
        if (key === "__proto__") {
            if (!this._hasProtoKey)
                return undefined;
            --this._size;
            delete this._hasProtoKey;
            result = this._protoValue;
            delete this._protoValue;
            return result;
        }
        if (!Object.prototype.hasOwnProperty.call(this._map, key))
            return undefined;
        --this._size;
        result = this._map[key];
        delete this._map[key];
        return result;
    },


    keys: function () {
        var result = Object.keys(this._map);
        if (this._hasProtoKey)
            result.push("__proto__");
        return result;
    },


    values: function () {
        var result = Object.values(this._map);
        if (this._hasProtoKey)
            result.push(this._protoValue);
        return result;
    },


    get: function (key) {
        if (key === "__proto__")
            return this._protoValue;
        if (!Object.prototype.hasOwnProperty.call(this._map, key))
            return undefined;
        return this._map[key];
    },


    contains: function (key) {
        var result;
        if (key === "__proto__")
            return this._hasProtoKey;
        return Object.prototype.hasOwnProperty.call(this._map, key);
    },


    size: function () {
        return this._size;
    },

    clear: function () {
        this._map = {};
        this._size = 0;
        delete this._hasProtoKey;
        delete this._protoValue;
    }
}

/*tooltip*/
if (!vmd.utils) vmd.utils = {};
Ext.applyIf(vmd.utils, {

    toolTipMouseenter: function (e) {
        var extendParam = e.data ? e.data.extendParam : null,
            drawViewCallback = e.data ? e.data.drawViewCallback : null;
        this.setTimeoutId && (clearTimeout(this.setTimeoutId), this.setTimeoutId = 0), $("#tooltip").remove();
        var vtimeOut = 0;
        if (extendParam && extendParam.timeOut && (vtimeOut = extendParam.timeOut), !(extendParam && extendParam.showTtpInNeedScroll && $(this)[0].scrollWidth <= $(this).outerWidth())) {
            var handleElement = $(this),
                setTimeoutId = setTimeout(function () {
                    $("#tooltip").remove();
                    var tooltipData = handleElement.data("tooltip") ? handleElement.data("tooltip") : handleElement.attr("data-tooltip");
                    if ("function" == typeof tooltipData && (tooltipData = tooltipData()), void 0 !== tooltipData && "string" != typeof tooltipData && (tooltipData = handleElement[0].getAttribute("data-tooltip")), tooltipData && !handleElement.hasClass("hp-ui-button-active")) {
                        if (extendParam && extendParam.mouseenterCallBack && extendParam.mouseenterCallBack(), tooltipData && tooltipData.indexOf("()") && 0 == tooltipData.indexOf("'")) {
                            var tempTooltipData = tooltipData;
                            try {
                                tooltipData = eval(tooltipData)
                            } catch (e) {
                                tooltipData = tempTooltipData
                            }
                        }
                        var tooltip = $("<div id='tooltip'>").text(tooltipData).prependTo($("body"));
                        tooltip.data("target-dom", e.target);
                        var tooltip_taper_angle_Class = "tooltip-before";
                        extendParam && (extendParam.tooltipArrowClass && (tooltip_taper_angle_Class = extendParam.tooltipArrowClass), extendParam.tooltipClass && !tooltip.hasClass(extendParam.tooltipClass) && tooltip.addClass(extendParam.tooltipClass));
                        var tooltipAngle = $("<div id='" + tooltip_taper_angle_Class + "'>"),
                            tooltip_taper_angle = null;
                        tooltip_taper_angle = "tooltip-after" == tooltip_taper_angle_Class ? tooltipAngle.appendTo(tooltip) : tooltipAngle.prependTo(tooltip), drawViewCallback(tooltip, tooltip_taper_angle, handleElement)
                    }
                }, vtimeOut);
            vtimeOut > 0 && (this.setTimeoutId = setTimeoutId)
        }
    },
    toolTipMouseleave: function (e) {
        var t = e.data ? e.data.extendParam : null;
        $("#tooltip").remove(), this.setTimeoutId && (clearTimeout(this.setTimeoutId), this.setTimeoutId = 0), t && t.mouseleaveCallBack && t.mouseleaveCallBack()
    },
    baseTooltip: function (e, t, n) {
            this.removeTooltip(e);
            var o = $(e);
            o.on("mouseenter", null, {
                drawViewCallback: t,
                extendParam: n
            }, this.toolTipMouseenter), o.on("mouseleave", null, {
                drawViewCallback: t,
                extendParam: n
            }, this.toolTipMouseleave)
       
    },
    tooltip: function (e, t) {
        return t = t || {}, this.baseTooltip(e, function (e, n, o) {
           
        var i = o.offset().top + o.outerHeight() + 10,
            r = o.offset().left + o.outerWidth() / 2 - e.outerWidth() / 2;
        r = (r = Math.min(document.body.clientWidth - e.outerWidth() - 10, r)) <= 10 ? 10 : r;
        var s = o.offset().left + o.outerWidth() / 2 - r;
        n.css({
            left: t.beforeLeft || s
        }), i > document.body.clientHeight && n && "tooltip-after" == n.attr("id") && (i = o.offset().top - o.outerHeight()), e.css({
            top: i,
            left: r > 0 ? r : 0,
            zIndex: 1e5,
            maxWidth: t.maxWidth || "300px",
            paddingLeft: t.paddingLeft || "9px",
            textAlign: t.textAlign || "center"
        }).hide().fadeIn()
            
        }, t)
    },
    hideTooltip: function () {
        $("#tooltip").remove()
    },
    removeTooltip: function (e) {
        var t = this;
        $(e).each(function () {
            $(this).off("mouseenter", null, t.toolTipMouseenter), $(this).off("mouseleave", null, t.toolTipMouseleave)
        })
    }
});
$(window).on("resize", function () {
    $("#tooltip").remove()
});

