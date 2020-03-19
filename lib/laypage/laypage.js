/**
 
 @Name : layui.laypage 分页组件
 @Author：贤心
 @License：MIT
 
 */

;!function(){
    "use strict";
  
    var doc = document
    ,id = 'getElementById'
    ,tag = 'getElementsByTagName'
    ,isLayui = window.layui && layui.define, ready = {
        getPath: function () {
            var jsPath = document.currentScript ? document.currentScript.src : function () {
                var js = document.scripts
                , last = js.length - 1
                , src;
                for (var i = last; i > 0; i--) {
                    if (js[i].readyState === 'interactive') {
                        src = js[i].src;
                        break;
                    }
                }
                return src || js[last].src;
            }();
          //  return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
		  if(typeof vmd!='undefined')
		  {
			  return vmd.virtualPath  +'/lib/laypage/';  
		  }
		  else{
			 return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
		    }
        }()

        //获取节点的style属性值
      , getStyle: function (node, name) {
          var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
          return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
      }

        //载入CSS配件
      , link: function (href, fn, cssname) {

          //未设置路径，则不主动加载css
          if (!laypage.path) return;

          var head = document.getElementsByTagName("head")[0], link = document.createElement('link');
          if (typeof fn === 'string') cssname = fn;
          var app = (cssname || href).replace(/\.|\//g, '');
          var id = 'layuicss-' + app, timeout = 0;

          link.rel = 'stylesheet';
          link.href = laypage.path + href;
          link.id = id;
 
          if (!document.getElementById(id)) {
              head.appendChild(link);
          }

          if (typeof fn !== 'function') return;

          //轮询css是否加载完毕
          (function poll() {
              if (++timeout > 8 * 1000 / 100) {
                  return window.console && console.error('laypage.css: Invalid');
              };
              parseInt(ready.getStyle(document.getElementById(id), 'width')) === 1989 ? fn() : setTimeout(poll, 100);
          }());
      }
    }

    , laypage = {
        v: '5.0.9'
      , config: {} //全局配置项
      , index: (window.laypage && window.laypage.v) ? 100000 : 0
      , path: ready.getPath

        //设置全局项
      , set: function (options) {
          var that = this;
          that.config = lay.extend({}, that.config, options);
          return that;
      }

        //主体CSS等待事件
      , ready: function (fn) {
          var cssname = 'laypage', ver = ''
          , path = (isLayui ? 'modules/laypage/' : 'theme/') + 'default/laypage.css?v=' + laypage.v + ver;
		  // , path ='/theme/default/laypage.css?v=' + laypage.v + ver;
          isLayui ? layui.addcss(path, fn, cssname) : ready.link(path, fn, cssname);
          return this;
      }
        , on: function (elem, even, fn) {
            elem.attachEvent ? elem.attachEvent('on' + even, function (e) { //for ie
                e.target = e.srcElement;
                fn.call(elem, e);
            }) : elem.addEventListener(even, fn, false);
            return this;
        }
    }

    //操作当前实例
    , thisPage = function () {
        var that = this;
        return {
            //提示框
            hint: function (content) {
                that.hint.call(that, content);
            }
          , laypage: that
          , config: that.config
        };
    }
  
  //字符常量
  ,MOD_NAME = 'laypage', DISABLED = 'layui-disabled'
  
  //构造器
  ,Class = function(options){
    var that = this;
    that.config = options || {};
    that.config.index = ++laypage.index;
    that.render(true);
  }

    
    //DOM查找
  ,lay = function(selector){   
      return new LAY(selector);
  }
  
    //DOM构造器
  ,LAY = function(selector){
      var index = 0
      ,nativeDOM = typeof selector === 'object' ? [selector] : (
        this.selector = selector
        ,document.querySelectorAll(selector || null)
      );
      for(; index < nativeDOM.length; index++){
          this.push(nativeDOM[index]);
      }
  };
  
  
    /*
      lay对象操作
    */
  
    LAY.prototype = [];
    LAY.prototype.constructor = LAY;
  
    //普通对象深度扩展
    lay.extend = function(){
        var ai = 1, args = arguments
        ,clone = function(target, obj){
            target = target || (obj.constructor === Array ? [] : {}); 
            for(var i in obj){
                //如果值为对象，则进入递归，继续深度合并
                target[i] = (obj[i] && (obj[i].constructor === Object))
                  ? clone(target[i], obj[i])
                : obj[i];
            }
            return target;
        }

        args[0] = typeof args[0] === 'object' ? args[0] : {};

        for(; ai < args.length; ai++){
            if(typeof args[ai] === 'object'){
                clone(args[0], args[ai])
            }
        }
        return args[0];
    };
  
    //ie版本
   lay.ie = function(){
        var agent = navigator.userAgent.toLowerCase();
        return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
          (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
        ) : false;
    }();
  
    //中止冒泡
    lay.stope = function(e){
        e = e || window.event;
        e.stopPropagation 
          ? e.stopPropagation() 
        : e.cancelBubble = true;
    };
  
    //对象遍历
    lay.each = function(obj, fn){
        var key
        ,that = this;
        if(typeof fn !== 'function') return that;
        obj = obj || [];
        if(obj.constructor === Object){
            for(key in obj){
                if(fn.call(obj[key], key, obj[key])) break;
            }
        } else {
            for(key = 0; key < obj.length; key++){
                if(fn.call(obj[key], key, obj[key])) break;
            }
        }
        return that;
    };
  
    //数字前置补零
    lay.digit = function(num, length, end){
        var str = '';
        num = String(num);
        length = length || 2;
        for(var i = num.length; i < length; i++){
            str += '0';
        }
        return num < Math.pow(10, length) ? str + (num|0) : num;
    };
  
    //创建元素
    lay.elem = function(elemName, attr){
        var elem = document.createElement(elemName);
        lay.each(attr || {}, function(key, value){
            elem.setAttribute(key, value);
        });
        return elem;
    };
  
    //追加字符
    LAY.addStr = function(str, new_str){
        str = str.replace(/\s+/, ' ');
        new_str = new_str.replace(/\s+/, ' ').split(' ');
        lay.each(new_str, function(ii, item){
            if(!new RegExp('\\b'+ item + '\\b').test(str)){
                str = str + ' ' + item;
            }
        });
        return str.replace(/^\s|\s$/, '');
    };
  
    //移除值
    LAY.removeStr = function(str, new_str){
        str = str.replace(/\s+/, ' ');
        new_str = new_str.replace(/\s+/, ' ').split(' ');
        lay.each(new_str, function(ii, item){
            var exp = new RegExp('\\b'+ item + '\\b')
            if(exp.test(str)){
                str = str.replace(exp, '');
            }
        });
        return str.replace(/\s+/, ' ').replace(/^\s|\s$/, '');
    };
  
    //查找子元素
    LAY.prototype.find = function(selector){
        var that = this;
        var index = 0, arr = []
        ,isObject = typeof selector === 'object';
    
        this.each(function(i, item){
            var nativeDOM = isObject ? [selector] : item.querySelectorAll(selector || null);
            for(; index < nativeDOM.length; index++){
                arr.push(nativeDOM[index]);
            }
            that.shift();
        });
    
        if(!isObject){
            that.selector =  (that.selector ? that.selector + ' ' : '') + selector
        }
    
        lay.each(arr, function(i, item){
            that.push(item);
        });
    
        return that;
    };
  
    //DOM遍历
    LAY.prototype.each = function(fn){
        return lay.each.call(this, this, fn);
    };
  
    //添加css类
    LAY.prototype.addClass = function(className, type){
        return this.each(function(index, item){
            item.className = LAY[type ? 'removeStr' : 'addStr'](item.className, className)
        });
    };
  
    //移除css类
    LAY.prototype.removeClass = function(className){
        return this.addClass(className, true);
    };
  
    //是否包含css类
    LAY.prototype.hasClass = function(className){
        var has = false;
        this.each(function(index, item){
            if(new RegExp('\\b'+ className +'\\b').test(item.className)){
                has = true;
            }
        });
        return has;
    };
  
    //添加或获取属性
    LAY.prototype.attr = function(key, value){
        var that = this;
        return value === undefined ? function(){
            if(that.length > 0) return that[0].getAttribute(key);
        }() : that.each(function(index, item){
            item.setAttribute(key, value);
        });   
    };
  
    //移除属性
    LAY.prototype.removeAttr = function(key){
        return this.each(function(index, item){
            item.removeAttribute(key);
        });
    };
  
    //设置HTML内容
    LAY.prototype.html = function(html){
        return this.each(function(index, item){
            item.innerHTML = html;
        });
    };
  
    //设置值
    LAY.prototype.val = function(value){
        return this.each(function(index, item){
            item.value = value;
        });
    };
  
    //追加内容
    LAY.prototype.append = function(elem){
        return this.each(function(index, item){
            typeof elem === 'object' 
              ? item.appendChild(elem)
            :  item.innerHTML = item.innerHTML + elem;
        });
    };
  
    //移除内容
    LAY.prototype.remove = function(elem){
        return this.each(function(index, item){
            elem ? item.removeChild(elem) : item.parentNode.removeChild(item);
        });
    };
  
    //事件绑定
    LAY.prototype.on = function(eventName, fn){
        return this.each(function(index, item){
            item.attachEvent ? item.attachEvent('on' + eventName, function(e){
                e.target = e.srcElement;
                fn.call(item, e);
            }) : item.addEventListener(eventName, fn, false);
        });
    };
  
    //解除事件
    LAY.prototype.off = function(eventName, fn){
        return this.each(function(index, item){
            item.detachEvent 
              ? item.detachEvent('on'+ eventName, fn)  
            : item.removeEventListener(eventName, fn, false);
        });
    };
  
  //判断传入的容器类型
  Class.prototype.type = function(){
    var config = this.config;
    if(typeof config.elem === 'object'){
      return config.elem.length === undefined ? 2 : 3;
    }
  };

  //分页视图
  Class.prototype.view = function(){
    var that = this
    ,config = that.config
    ,groups = config.groups = 'groups' in config ? (config.groups|0) : 5; //连续页码个数
    
    //排版
    config.layout = typeof config.layout === 'object' 
      ? config.layout 
    : ['prev', 'page', 'next'];
    
    config.count = config.count|0; //数据总数
    config.curr = (config.curr|0) || 1; //当前页

    //每页条数的选择项
    config.limits = typeof config.limits === 'object'
      ? config.limits
    : [10, 20, 30, 40, 50];
    config.limit = (config.limit|0) || 10; //默认条数
    
    //总页数
    config.pages = Math.ceil(config.count/config.limit) || 1;
    
    //当前页不能超过总页数
    if(config.curr > config.pages){
      config.curr = config.pages;
    }
    
    //连续分页个数不能低于0且不能大于总页数
    if(groups < 0){
      groups = 1;
    } else if (groups > config.pages){
      groups = config.pages;
    }
    
    config.prev = 'prev' in config ? config.prev : '&#x4E0A;&#x4E00;&#x9875;'; //上一页文本
    config.next = 'next' in config ? config.next : '&#x4E0B;&#x4E00;&#x9875;'; //下一页文本
    
    //计算当前组
    var index = config.pages > groups 
      ? Math.ceil( (config.curr + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1) )
    : 1
    
    //视图片段
    ,views = {
      //上一页
      prev: function(){
        return config.prev 
          ? '<a href="javascript:;" class="layui-laypage-prev'+ (config.curr == 1 ? (' ' + DISABLED) : '') +'" data-page="'+ (config.curr - 1) +'">'+ config.prev +'</a>'
        : '';
      }()
      
      //页码
      ,page: function(){
        var pager = [];
        
        //数据量为0时，不输出页码
        if(config.count < 1){
          return '';
        }
        
        //首页
        if(index > 1 && config.first !== false && groups !== 0){
          pager.push('<a href="javascript:;" class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">'+ (config.first || 1) +'</a>');
        }

        //计算当前页码组的起始页
        var halve = Math.floor((groups-1)/2) //页码数等分
        ,start = index > 1 ? config.curr - halve : 1
        ,end = index > 1 ? (function(){
          var max = config.curr + (groups - halve - 1);
          return max > config.pages ? config.pages : max;
        }()) : groups;
        
        //防止最后一组出现“不规定”的连续页码数
        if(end - start < groups - 1){
          start = end - groups + 1;
        }

        //输出左分割符
        if(config.first !== false && start > 2){
          pager.push('<span class="layui-laypage-spr">&#x2026;</span>')
        }
        
        //输出连续页码
        for(; start <= end; start++){
          if(start === config.curr){
            //当前页
            pager.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" '+ (/^#/.test(config.theme) ? 'style="background-color:'+ config.theme +';"' : '') +'></em><em>'+ start +'</em></span>');
          } else {
            pager.push('<a href="javascript:;" data-page="'+ start +'">'+ start +'</a>');
          }
        }
        
        //输出输出右分隔符 & 末页
        if(config.pages > groups && config.pages > end && config.last !== false){
          if(end + 1 < config.pages){
            pager.push('<span class="layui-laypage-spr">&#x2026;</span>');
          }
          if(groups !== 0){
            pager.push('<a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="'+ config.pages +'">'+ (config.last || config.pages) +'</a>');
          }
        }

        return pager.join('');
      }()
      
      //下一页
      ,next: function(){
        return config.next 
          ? '<a href="javascript:;" class="layui-laypage-next'+ (config.curr == config.pages ? (' ' + DISABLED) : '') +'" data-page="'+ (config.curr + 1) +'">'+ config.next +'</a>'
        : '';
      }()
      
      //数据总数
      ,count: '<span class="layui-laypage-count">共 '+ config.count +' 条</span>'
      
      //每页条数
      ,limit: function(){
        var options = ['<span class="layui-laypage-limits"><select lay-ignore>'];
        lay.each(config.limits, function(index, item){
          options.push(
            '<option value="'+ item +'"'
            +(item === config.limit ? 'selected' : '') 
            +'>'+ item +' 条/页</option>'
          );
        });
        return options.join('') +'</select></span>';
      }()
      
      //刷新当前页
      ,refresh: ['<a href="javascript:;" data-page="'+ config.curr +'" class="layui-laypage-refresh">'
        ,'<i class="layui-icon layui-icon-refresh"></i>'
      ,'</a>'].join('')

      //跳页区域
      ,skip: function(){
        return ['<span class="layui-laypage-skip">&#x5230;&#x7B2C;'
          ,'<input type="text" min="1" value="'+ config.curr +'" class="layui-input">'
          ,'&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>'
        ,'</span>'].join('');
      }()
    };

    return ['<div class="layui-box layui-laypage layui-laypage-'+ (config.theme ? (
      /^#/.test(config.theme) ? 'molv' : config.theme
    ) : 'default') +'" id="layui-laypage-'+ config.index +'">'
      ,function(){
        var plate = [];
        lay.each(config.layout, function(index, item){
          if(views[item]){
            plate.push(views[item])
          }
        });
        return plate.join('');
      }()
    ,'</div>'].join('');
  };

  //跳页的回调
  Class.prototype.jump = function(elem, isskip){
    if(!elem) return;
    var that = this
    ,config = that.config
    ,childs = elem.children
    ,btn = elem[tag]('button')[0]
    ,input = elem[tag]('input')[0]
    ,select = elem[tag]('select')[0]
    ,skip = function(){
      var curr = input.value.replace(/\s|\D/g, '')|0;
      if(curr){
        config.curr = curr;
        that.render();
      }
    };
    
    if(isskip) return skip();
    
    //页码
    for(var i = 0, len = childs.length; i < len; i++){
      if(childs[i].nodeName.toLowerCase() === 'a'){
        laypage.on(childs[i], 'click', function(){
          var curr = this.getAttribute('data-page')|0;
          if(curr < 1 || curr > config.pages) return;
          config.curr = curr;
          that.render();
        });
      }
    }
    
    //条数
    if(select){
      laypage.on(select, 'change', function(){
        var value = this.value;
        if(config.curr*value > config.count){
          config.curr = Math.ceil(config.count/value);
        }
        config.limit = value;
        that.render();
      });
    }
    
    //确定
    if(btn){
      laypage.on(btn, 'click', function(){
        skip();
      });
    }
  };
  
  //输入页数字控制
  Class.prototype.skip = function(elem){
    if(!elem) return;
    var that = this, input = elem[tag]('input')[0];
    if(!input) return;
    laypage.on(input, 'keyup', function(e){
      var value = this.value
      ,keyCode = e.keyCode;
      if(/^(37|38|39|40)$/.test(keyCode)) return;
      if(/\D/.test(value)){
        this.value = value.replace(/\D/, '');
      }
      if(keyCode === 13){
        that.jump(elem, true)
      }
    });
  };

  //渲染分页
  Class.prototype.render = function(load){
    var that = this
    ,config = that.config
    ,type = that.type()
    ,view = that.view();
    
    if(type === 2){
      config.elem && (config.elem.innerHTML = view);
    } else if(type === 3){
      config.elem.html(view);
    } else {
      if(doc[id](config.elem)){
        doc[id](config.elem).innerHTML = view;
      }
    }

    config.jump && config.jump(config, load);
    
    var elem = doc[id]('layui-laypage-' + config.index);
    that.jump(elem);
    
    if(config.hash && !load){
      location.hash = '!'+ config.hash +'='+ config.curr;
    }
    
    that.skip(elem);
  };
  
    //核心接口
  laypage.render = function (options) {
      var inst = new Class(options);
      return thisPage.call(inst);
  };
    
    //暴露lay
  window.lay = window.lay || lay;

    //加载方式
  isLayui ? (
    laypage.ready()
    , layui.define(function (exports) { //layui加载
        laypage.path = layui.cache.dir;
        exports(MOD_NAME, laypage);
    })
  ) : (
    (typeof define === 'function' && define.amd) ? define(function () { //requirejs加载
        return laypage;
    }) : function () { //普通script标签加载
        laypage.ready();
        window.laypage = laypage
    }()
  );
}();