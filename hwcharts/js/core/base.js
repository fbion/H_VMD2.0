/*!
 * Vmd base  JS Library 2.0.5
 * Copyright(c) 2017-2019 hanweikeji.
 */
// for old browsers
window.undefined = window.undefined;

/**
 * @class Vmd
 * Vmd core utilities and functions.
 * @singleton
 */

Vmd = {
    /**
     * The version of the framework
     * @type String
     */
    version: '2.0.5',
    versionDetail: {
        major: 2,
        minor: 0,
        patch: 5
    }
};


/**
 * Copies all the properties of config to obj.
 * @param {Object} obj The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 * @member Vmd apply
 */
Vmd.apply = function (o, c, defaults) {
    // no "this" reference for friendly out of scope calls
    if (defaults) {
        Vmd.apply(o, defaults);
    }
    if (o && c && typeof c == 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
};

(function () {
    var idSeed = 0,
        toString = Object.prototype.toString,
        ua = navigator.userAgent.toLowerCase(),
        check = function (r) {
            return r.test(ua);
        },
        version = function (is, regex) {
            var m;
            return (is && (m = regex.exec(Vmd.userAgent))) ? parseFloat(m[1]) : 0;
        },
        DOC = document,
        docMode = DOC.documentMode,
        isStrict = DOC.compatMode == "CSS1Compat",
        isOpera = check(/opera/),
        isChrome = check(/\bchrome\b/),
        isWebKit = check(/webkit/),
        isSafari = !isChrome && check(/safari/),
        isSafari2 = isSafari && check(/applewebkit\/4/), // unique to Safari 2
        isSafari3 = isSafari && check(/version\/3/),
        isSafari4 = isSafari && check(/version\/4/),
        isSafari5_0 = isSafari && check(/version\/5\.0/),
        isSafari5 = isSafari && check(/version\/5/),
        isIE = !isOpera && (check(/msie/) || check(/trident/)),
        isIE7 = isIE && ((check(/msie 7/) && docMode != 8 && docMode != 9 && docMode != 10) || docMode == 7),
        isIE8 = isIE && ((check(/msie 8/) && docMode != 7 && docMode != 9 && docMode != 10) || docMode == 8),
        isIE9 = isIE && ((check(/msie 9/) && docMode != 7 && docMode != 8 && docMode != 10) || docMode == 9),
        isIE10 = isIE && ((check(/msie 10/) && docMode != 7 && docMode != 8 && docMode != 9) || docMode == 10),
        isIE11 = isIE && ((check(/trident\/7\.0/) && docMode != 7 && docMode != 8 && docMode != 9 && docMode != 10) || docMode == 11),
        isIE6 = isIE && check(/msie 6/),

        isGecko = !isWebKit && !isIE && check(/gecko/), // IE11 adds "like gecko" into the user agent string
        isGecko2 = isGecko && check(/rv:1\.8/),
        isGecko3 = isGecko && check(/rv:1\.9/),
        isGecko4 = isGecko && check(/rv:2\.0/),
        isGecko5 = isGecko && check(/rv:5\./),
        isGecko10 = isGecko && check(/rv:10\./),
        isBorderBox = isIE && !isStrict,
        isFF3_0 = isGecko3 && check(/rv:1\.9\.0/),
        isFF3_5 = isGecko3 && check(/rv:1\.9\.1/),
        isFF3_6 = isGecko3 && check(/rv:1\.9\.2/),
        isWindows = check(/windows|win32/),
        isAir = check(/adobeair/),
        isMac = check(/macintosh|mac os x/),
        isLinux = check(/linux/),
        chromeVersion = version(true, /\bchrome\/(\d+\.\d+)/),
        firefoxVersion = version(true, /\bfirefox\/(\d+\.\d+)/),
        ieVersion = version(isIE, /msie (\d+\.\d+)/),
        operaVersion = version(isOpera, /version\/(\d+\.\d+)/),
        safariVersion = version(isSafari, /version\/(\d+\.\d+)/),
        webKitVersion = version(isWebKit, /webkit\/(\d+\.\d+)/),
        isSecure = /^https/i.test(window.location.protocol),
        nullLog,
        noArgs = [],
        nonEnumerables = [],

         enumerables = true,
         enumerablesTest = { toString: 1 },
        emptyFn = function () { },
        t = Vmd.apply({}, {
            constructor: emptyFn,
            toString: emptyFn,
            valueOf: emptyFn
        }),
        callOverrideParent = function () {
            var method = callOverrideParent.caller.caller; // skip callParent (our caller)
            return method.$owner.prototype[method.$name].apply(this, arguments);
        };

    if (t.constructor !== emptyFn) {
        nonEnumerables.push('constructor');
    }
    if (t.toString !== emptyFn) {
        nonEnumerables.push('toString');
    }
    if (t.valueOf !== emptyFn) {
        nonEnumerables.push('valueOf');
    }
    if (!nonEnumerables.length) {
        nonEnumerables = null;
    }

    for (i in enumerablesTest) {
        enumerables = null;
    }

    if (enumerables) {
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
                       'toLocaleString', 'toString', 'constructor'];
    }

    /**
     * An array containing extra enumerables for old browsers
     * @property {String[]}
     */
    Vmd.enumerables = enumerables;

    /**
     * Copies all the properties of config to the specified object.
     * Note that if recursive merging and cloning without referencing the original objects / arrays is needed, use
     * {@link Vmd.Object#merge} instead.
     * @param {Object} object The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} [defaults] A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    Vmd.apply = function (object, config, defaults) {
        if (defaults) {
            Vmd.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    };

    // Create the abstract Base class to provide an empty constructor and callParent implementations
    function Base() {
        //
    }

    Vmd.apply(Base, {
        $isClass: true,

        callParent: function (args) {
            var method;

            // This code is intentionally inlined for the least number of debugger stepping
            return (method = this.callParent.caller) && (method.$previous ||
                ((method = method.$owner ? method : method.caller) &&
                        method.$owner.superclass.self[method.$name])).apply(this, args || noArgs);
        }
    });

    Base.prototype = {
        constructor: function () {
        },
        callParent: function (args) {
            // NOTE: this code is deliberately as few expressions (and no function calls)
            // as possible so that a debugger can skip over this noise with the minimum number
            // of steps. Basically, just hit Step Into until you are where you really wanted
            // to be.
            var method,
                superMethod = (method = this.callParent.caller) && (method.$previous ||
                        ((method = method.$owner ? method : method.caller) &&
                                method.$owner.superclass[method.$name]));

            return superMethod.apply(this, args || noArgs);
        }
    };

    // remove css image flicker
    if (isIE6) {
        try {
            DOC.execCommand("BackgroundImageCache", false, true);
        } catch (e) { }
    }

    /*新增的ext.log功能*/
    var primitiveRe = /string|number|boolean/;
    function dumpObject(object) {
        var member, type, value, name,
            members = [];

        // Cannot use Vmd.encode since it can recurse endlessly (if we're lucky)
        // ...and the data could be prettier!
        for (name in object) {
            if (object.hasOwnProperty(name)) {
                value = object[name];

                type = typeof value;
                if (type == "function") {
                    continue;
                }

                if (type == 'undefined') {
                    member = type;
                } else if (value === null || primitiveRe.test(type) || Vmd.isDate(value)) {
                    member = Vmd.encode(value);
                } else if (Vmd.isArray(value)) {
                    member = '[ ]';
                } else if (Vmd.isObject(value)) {
                    member = '{ }';
                } else {
                    member = type;
                }
                members.push(Vmd.encode(name) + ': ' + member);
            }
        }

        if (members.length) {
            return ' \nData: {\n  ' + members.join(',\n  ') + '\n}';
        }
        return '';
    }

    function log(message) {
        var options, dump,
            con = Vmd.global.console,
            level = 'log',
            indent = log.indent || 0,
            stack,
            out,
            max;

        log.indent = indent;

        if (typeof message != 'string') {
            options = message;
            message = options.msg || '';
            level = options.level || level;
            dump = options.dump;
            stack = options.stack;

            if (options.indent) {
                ++log.indent;
            } else if (options.outdent) {
                log.indent = indent = Math.max(indent - 1, 0);
            }

            if (dump && !(con && con.dir)) {
                message += dumpObject(dump);
                dump = null;
            }
        }

        if (arguments.length > 1) {
            message += Array.prototype.slice.call(arguments, 1).join('');
        }

        message = indent ? Vmd.String.repeat(' ', log.indentSize * indent) + message : message;
        // w/o console, all messages are equal, so munge the level into the message:
        if (level != 'log') {
            message = '[' + level.charAt(0).toUpperCase() + '] ' + message;
        }

        // Not obvious, but 'console' comes and goes when Firebug is turned on/off, so
        // an early test may fail either direction if Firebug is toggled.
        //
        if (con) { // if (Firebug-like console)
            if (con[level]) {
                con[level](message);
            } else {
                con.log(message);
            }

            if (dump) {
                con.dir(dump);
            }

            if (stack && con.trace) {
                // Firebug's console.error() includes a trace already...
                if (!con.firebug || level != 'error') {
                    con.trace();
                }
            }
        } else {
            if (Vmd.isOpera) {
                opera.postError(message);
            } else {
                out = log.out;
                max = log.max;

                if (out.length >= max) {
                    // this formula allows out.max to change (via debugger), where the
                    // more obvious "max/4" would not quite be the same
                    Vmd.Array.erase(out, 0, out.length - 3 * Math.floor(max / 4)); // keep newest 75%
                }

                out.push(message);
            }
        }

        // Mostly informational, but the Vmd.Error notifier uses them:
        ++log.count;
        ++log.counters[level];
    }

    function logx(level, args) {
        if (typeof args[0] == 'string') {
            args.unshift({});
        }
        args[0].level = level;
        log.apply(this, args);
    }

    log.error = function () {
        logx('error', Array.prototype.slice.call(arguments));
    };
    log.info = function () {
        logx('info', Array.prototype.slice.call(arguments));
    };
    log.warn = function () {
        logx('warn', Array.prototype.slice.call(arguments));
    };

    log.count = 0;
    log.counters = { error: 0, warn: 0, info: 0, log: 0 };
    log.indentSize = 2;
    log.out = [];
    log.max = 750;
    log.show = function () {
        window.open('', 'extlog').document.write([
            '<html><head><script type="text/javascript">',
                'var lastCount = 0;',
                'function update () {',
                    'var ext = window.opener.Vmd,',
                        'extlog = ext && ext.log;',
                    'if (extlog && extlog.out && lastCount != extlog.count) {',
                        'lastCount = extlog.count;',
                        'var s = "<tt>" + extlog.out.join("~~~").replace(/[&]/g, "&amp;").replace(/[<]/g, "&lt;").replace(/[ ]/g, "&#160;").replace(/\\~\\~\\~/g, "<br/>") + "</tt>";',
                        'document.body.innerHTML = s;',
                    '}',
                    'setTimeout(update, 1000);',
                '}',
                'setTimeout(update, 1000);',
            '</script></head><body></body></html>'].join(''));
    };

    nullLog = function () { };
    nullLog.info = nullLog.warn = nullLog.error = Vmd.emptyFn;


    Vmd.apply(Vmd, {
        /**
       * @property {Function}
       * A reusable empty function
       */
        emptyFn: emptyFn,
        /**
         * URL to a blank file used by Vmd when in secure mode for iframe src and onReady src to prevent
         * the IE insecure content warning (<tt>'about:blank'</tt>, except for IE in secure mode, which is <tt>'javascript:""'</tt>).
         * @type String
         */
        SSL_SECURE_URL: isSecure && isIE ? 'javascript:""' : 'about:blank',
        /**
         * True if the browser is in strict (standards-compliant) mode, as opposed to quirks mode
         * @type Boolean
         */
        isStrict: isStrict,
        /**
         * True if the page is running over SSL
         * @type Boolean
         */
        isSecure: isSecure,
        /**
         * True when the document is fully initialized and ready for action
         * @type Boolean
         */
        isReady: false,

        /**
         * True if the {@link Vmd.Fx} Class is available
         * @type Boolean
         * @property enableFx
         */

        /**
         * HIGHLY EXPERIMENTAL
         * True to force css based border-box model override and turning off javascript based adjustments. This is a
         * runtime configuration and must be set before onReady.
         * @type Boolean
         */
        enableForcedBoxModel: false,

        /**
         * True to automatically uncache orphaned Vmd.Elements periodically (defaults to true)
         * @type Boolean
         */
        enableGarbageCollector: true,

        /**
         * True to automatically purge event listeners during garbageCollection (defaults to false).
         * @type Boolean
         */
        enableListenerCollection: false,

        /**
         * EXPERIMENTAL - True to cascade listener removal to child elements when an element is removed.
         * Currently not optimized for performance.
         * @type Boolean
         */
        enableNestedListenerRemoval: false,

        /**
         * Indicates whether to use native browser parsing for JSON methods.
         * This option is ignored if the browser does not support native JSON methods.
         * <b>Note: Native JSON methods will not work with objects that have functions.
         * Also, property names must be quoted, otherwise the data will not parse.</b> (Defaults to false)
         * @type Boolean
         */
        USE_NATIVE_JSON: false,

        /**
         * Copies all the properties of config to obj if they don't already exist.
         * @param {Object} obj The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf: function (o, c) {
            if (o) {
                for (var p in c) {
                    if (!Vmd.isDefined(o[p])) {
                        o[p] = c[p];
                    }
                }
            }
            return o;
        },

        /**
         * Generates unique ids. If the element already has an id, it is unchanged
         * @param {Mixed} el (optional) The element to generate an id for
         * @param {String} prefix (optional) Id prefix (defaults "ext-gen")
         * @return {String} The generated Id.
         */
        id: function (el, prefix) {
            el = Vmd.getDom(el, true) || {};
            if (!el.id) {
                el.id = (prefix || "ext-gen") + (++idSeed);
            }
            return el.id;
        },
        escapeId: (function () {
            var validIdRe = /^[a-zA-Z_][a-zA-Z0-9_\-]*$/i,
                escapeRx = /([\W]{1})/g,
                leadingNumRx = /^(\d)/g,
                escapeFn = function (match, capture) {
                    return "\\" + capture;
                },
                numEscapeFn = function (match, capture) {
                    return '\\00' + capture.charCodeAt(0).toString(16) + ' ';
                };

            return function (id) {
                return validIdRe.test(id)
                    ? id
                    // replace the number portion last to keep the trailing ' '
                    // from being escaped
                    : id.replace(escapeRx, escapeFn)
                        .replace(leadingNumRx, numEscapeFn);
            };
        }()),
        /**
       
         * @param {Function} superclass The constructor of class being extended.
         * @param {Object} overrides <p>A literal with members which are copied into the subclass's
         * prototype, and are therefore shared between all instances of the new class.</p>
         * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
         * to define the constructor of the new class, and is returned. If this property is
         * <i>not</i> specified, a constructor is generated and returned which just calls the
         * superclass's constructor passing on its parameters.</p>
         * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
         * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
         */
        extend: function () {
            // inline overrides
            var io = function (o) {
                for (var m in o) {
                    this[m] = o[m];
                }
            };
            var oc = Object.prototype.constructor;

            return function (sb, sp, overrides) {
                if (typeof sp == 'object') {
                    overrides = sp;
                    sp = sb;
                    sb = overrides.constructor != oc ? overrides.constructor : function () { sp.apply(this, arguments); };
                }
                //<debug>
                if (!sp) {
                    Vmd.Error.raise({
                        sourceClass: 'Vmd',
                        sourceMethod: 'extend',
                        msg: 'Attempting to extend from a class which has not been loaded on the page.'
                    });
                }
                //</debug>
                var F = function () { },
                    sbp,
                    spp = sp.prototype;

                F.prototype = spp;
                sbp = sb.prototype = new F();
                sbp.constructor = sb;
                sb.superclass = spp;
                if (spp.constructor == oc) {
                    spp.constructor = sp;
                }
                sb.override = function (o) {
                    Vmd.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function () {
                    return spp;
                });
                sbp.override = io;
                Vmd.override(sb, overrides);
                sb.extend = function (o) { return Vmd.extend(sb, o); };
                return sb;
            };
        }(),

        global: (function () {
            return this;
        })(),

        Base: Base,

        namespaceCache: {},

        createNamespace: function (namespaceOrClass, isClass) {
            var cache = Vmd.namespaceCache,
                namespace = isClass ? namespaceOrClass.substring(0, namespaceOrClass.lastIndexOf('.'))
                            : namespaceOrClass,
                ns = cache[namespace],
                i, n, part, parts, partials;

            if (!ns) {
                ns = Vmd.global;
                if (namespace) {
                    partials = [];
                    parts = namespace.split('.');

                    for (i = 0, n = parts.length; i < n; ++i) {
                        part = parts[i];

                        ns = ns[part] || (ns[part] = {});
                        partials.push(part);

                        cache[partials.join('.')] = ns; // build up prefixes as we go
                    }
                }
            }

            return ns;
        },

        getClassByName: function (className) {
            var parts = className.split('.'),
                cls = Vmd.global,
                n = parts.length,
                i;

            for (i = 0; cls && i < n; ++i) {
                cls = cls[parts[i]];
            }

            return cls || null;
        },

        addMembers: function (cls, target, members, handleNonEnumerables) {
            var i, name, member;

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    if (typeof member == 'function') {
                        member.$owner = cls;
                        member.$name = name;
                    }

                    target[name] = member;
                }
            }

            if (handleNonEnumerables && nonEnumerables) {
                for (i = nonEnumerables.length; i-- > 0;) {
                    name = nonEnumerables[i];
                    if (members.hasOwnProperty(name)) {
                        member = members[name];
                        if (typeof member == 'function') {
                            member.$owner = cls;
                            member.$name = name;
                        }

                        target[name] = member;
                    }
                }
            }
        },

        /**
         * Overrides members of the specified `target` with the given values.
         *
         * If the `target` is a function, it is assumed to be a constructor and the contents
         * of `overrides` are applied to its `prototype` using {@link Vmd#apply Vmd.apply}.
         * 
         * If the `target` is an instance of a class created using {@link #define},
         * the `overrides` are applied to only that instance. In this case, methods are
         * specially processed to allow them to use {@link Vmd.Base#callParent}.
         * 
         *      var panel = new Vmd.Panel({ ... });
         *      
         *      Vmd.override(panel, {
         *          initComponent: function () {
         *              // extra processing...
         *              
         *              this.callParent();
         *          }
         *      });
         *
         * If the `target` is none of these, the `overrides` are applied to the `target`
         * using {@link Vmd#apply Vmd.apply}.
         *
         * Please refer to {@link Vmd#define Vmd.define} for further details.
         *
         * @param {Object} target The target to override.
         * @param {Object} overrides The properties to add or replace on `target`. 
         * @method override
         */
        override: function (target, overrides) {
            var proto, statics;

            if (overrides) {
                if (target.$isClass) {
                    statics = overrides.statics;
                    if (statics) {
                        delete overrides.statics;
                    }

                    Vmd.addMembers(target, target.prototype, overrides, true);
                    if (statics) {
                        Vmd.addMembers(target, target, statics);
                    }
                } else if (typeof target == 'function') {
                    proto = target.prototype;
                    Vmd.apply(proto, overrides);
                    if (Vmd.isIE && overrides.hasOwnProperty('toString')) {
                        proto.toString = overrides.toString;
                    }
                } else {
                    var owner = target.self,
                        name, value;

                    if (owner && owner.$isClass) {
                        for (name in overrides) {
                            if (overrides.hasOwnProperty(name)) {
                                value = overrides[name];

                                if (typeof value == 'function') {
                                    //<debug>
                                    if (owner.$className) {
                                        value.displayName = owner.$className + '#' + name;
                                    }
                                    //</debug>

                                    value.$name = name;
                                    value.$owner = owner;
                                    value.$previous = target.hasOwnProperty(name)
                                        ? target[name] // already hooked, so call previous hook
                                        : callOverrideParent; // calls by name on prototype
                                }

                                target[name] = value;
                            }
                        }
                    } else {
                        Vmd.apply(target, overrides);

                        if (!target.constructor.$isClass) {
                            target.constructor.prototype.callParent = Base.prototype.callParent;
                            target.constructor.callParent = Base.callParent;
                        }
                    }
                }
            }
        },

        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
         * <pre><code>
Vmd.namespace('Company', 'Company.data');
Vmd.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
         * @param {String} namespace1
         * @param {String} namespace2
         * @param {String} etc
         * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
         * @method namespace
         */
        namespace: function () {
            var len1 = arguments.length,
                i = 0,
                len2,
                j,
                main,
                ns,
                sub,
                current;

            for (; i < len1; ++i) {
                main = arguments[i];
                ns = arguments[i].split('.');
                current = window[ns[0]];
                if (current === undefined) {
                    current = window[ns[0]] = {};
                }
                sub = ns.slice(1);
                len2 = sub.length;
                for (j = 0; j < len2; ++j) {
                    current = current[sub[j]] = current[sub[j]] || {};
                }
            }
            return current;
        },

        /**
         * Takes an object and converts it to an encoded URL. e.g. Vmd.urlEncode({foo: 1, bar: 2}); would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
         * @param {Object} o
         * @param {String} pre (optional) A prefix to add to the url encoded string
         * @return {String}
         */
        urlEncode: function (o, pre) {
            var empty,
                buf = [],
                e = encodeURIComponent;

            Vmd.iterate(o, function (key, item) {
                empty = Vmd.isEmpty(item);
                Vmd.each(empty ? key : item, function (val) {
                    buf.push('&', e(key), '=', (!Vmd.isEmpty(val) && (val != key || !empty)) ? (Vmd.isDate(val) ? Vmd.encode(val).replace(/"/g, '') : e(val)) : '');
                });
            });
            if (!pre) {
                buf.shift();
                pre = '';
            }
            return pre + buf.join('');
        },

        /**
         * Takes an encoded URL and and converts it to an object. Example: <pre><code>
Vmd.urlDecode("foo=1&bar=2"); // returns {foo: "1", bar: "2"}
Vmd.urlDecode("foo=1&bar=2&bar=3&bar=4", false); // returns {foo: "1", bar: ["2", "3", "4"]}
</code></pre>
         * @param {String} string
         * @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
         * @return {Object} A literal with members
         */
        urlDecode: function (string, overwrite) {
            if (Vmd.isEmpty(string)) {
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
            Vmd.each(pairs, function (pair) {
                pair = pair.split('=');
                name = d(pair[0]);
                value = d(pair[1]);
                obj[name] = overwrite || !obj[name] ? value :
                            [].concat(obj[name]).concat(value);
            });
            return obj;
        },

        /**
         * Appends content to the query string of a URL, handling logic for whether to place
         * a question mark or ampersand.
         * @param {String} url The URL to append to.
         * @param {String} s The content to append to the URL.
         * @return (String) The resulting URL
         */
        urlAppend: function (url, s) {
            if (!Vmd.isEmpty(s)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
            }
            return url;
        },

        /**
         * Converts any iterable (numeric indices and a length property) into a true array
         * Don't use this on strings. IE doesn't support "abc"[0] which this implementation depends on.
         * For strings, use this instead: "abc".match(/./g) => [a,b,c];
         * @param {Iterable} the iterable object to be turned into a true Array.
         * @return (Array) array
         */
        toArray: function () {
            return isIE ?
                function (a, i, j, res) {
                    res = [];
                    for (var x = 0, len = a.length; x < len; x++) {
                        res.push(a[x]);
                    }
                    return res.slice(i || 0, j || res.length);
                } :
                function (a, i, j) {
                    return Array.prototype.slice.call(a, i || 0, j || a.length);
                };
        }(),

        isIterable: function (v) {
            //check for array or arguments
            if (Vmd.isArray(v) || v.callee) {
                return true;
            }
            //check for node list type
            if (/NodeList|HTMLCollection/.test(toString.call(v))) {
                return true;
            }
            //NodeList has an item and length property
            //IXMLDOMNodeList has nextNode method, needs to be checked first.
            return ((typeof v.nextNode != 'undefined' || v.item) && Vmd.isNumber(v.length));
        },

        /**
         * Iterates an array calling the supplied function.
         * @param {Array/NodeList/Mixed} array The array to be iterated. If this
         * argument is not really an array, the supplied function is called once.
         * @param {Function} fn The function to be called with each item. If the
         * supplied function returns false, iteration stops and this method returns
         * the current <code>index</code>. This function is called with
         * the following arguments:
         * <div class="mdetail-params"><ul>
         * <li><code>item</code> : <i>Mixed</i>
         * <div class="sub-desc">The item at the current <code>index</code>
         * in the passed <code>array</code></div></li>
         * <li><code>index</code> : <i>Number</i>
         * <div class="sub-desc">The current index within the array</div></li>
         * <li><code>allItems</code> : <i>Array</i>
         * <div class="sub-desc">The <code>array</code> passed as the first
         * argument to <code>Vmd.each</code>.</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed.
         * Defaults to the <code>item</code> at the current <code>index</code>
         * within the passed <code>array</code>.
         * @return See description for the fn parameter.
         */
        each: function (array, fn, scope) {
            if (Vmd.isEmpty(array, true)) {
                return;
            }
            if (!Vmd.isIterable(array) || Vmd.isPrimitive(array)) {
                array = [array];
            }
            for (var i = 0, len = array.length; i < len; i++) {
                if (fn.call(scope || array[i], array[i], i, array) === false) {
                    return i;
                };
            }
        },

        /**
         * Iterates either the elements in an array, or each of the properties in an object.
         * <b>Note</b>: If you are only iterating arrays, it is better to call {@link #each}.
         * @param {Object/Array} object The object or array to be iterated
         * @param {Function} fn The function to be called for each iteration.
         * The iteration will stop if the supplied function returns false, or
         * all array elements / object properties have been covered. The signature
         * varies depending on the type of object being interated:
         * <div class="mdetail-params"><ul>
         * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
         * <div class="sub-desc">
         * When iterating an array, the supplied function is called with each item.</div></li>
         * <li>Objects : <tt>(String key, Object value, Object)</tt>
         * <div class="sub-desc">
         * When iterating an object, the supplied function is called with each key-value pair in
         * the object, and the iterated object</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed. Defaults to
         * the <code>object</code> being iterated.
         */
        iterate: function (obj, fn, scope) {
            if (Vmd.isEmpty(obj)) {
                return;
            }
            if (Vmd.isIterable(obj)) {
                Vmd.each(obj, fn, scope);
                return;
            } else if (typeof obj == 'object') {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (fn.call(scope || obj, prop, obj[prop], obj) === false) {
                            return;
                        };
                    }
                }
            }
        },

        /**
         * Return the dom node for the passed String (id), dom node, or Vmd.Element.
         * Optional 'strict' flag is needed for IE since it can return 'name' and
         * 'id' elements by using getElementById.
         * Here are some examples:
         * <pre><code>
// gets dom node based on id
var elDom = Vmd.getDom('elId');
// gets dom node based on the dom node
var elDom1 = Vmd.getDom(elDom);

// If we don&#39;t know if we are working with an
// Vmd.Element or a dom node use Vmd.getDom
function(el){
    var dom = Vmd.getDom(el);
    // do something with the dom node
}
         * </code></pre>
         * <b>Note</b>: the dom node to be found actually needs to exist (be rendered, etc)
         * when this method is called to be successful.
         * @param {Mixed} el
         * @return HTMLElement
         */
        getDom: function (el, strict) {
            if (!el || !DOC) {
                return null;
            }
            if (el.dom) {
                return el.dom;
            } else {
                if (typeof el == 'string') {
                    var e = DOC.getElementById(el);
                    // IE returns elements with the 'name' and 'id' attribute.
                    // we do a strict check to return the element with only the id attribute
                    if (e && isIE && strict) {
                        if (el == e.getAttribute('id')) {
                            return e;
                        } else {
                            return null;
                        }
                    }
                    return e;
                } else {
                    return el;
                }
            }
        },

        /**
         * Returns the current document body as an {@link Vmd.Element}.
         * @return Vmd.Element The document body
         */
        getBody: function () {
            return Vmd.get(DOC.body || DOC.documentElement);
        },

        /**
         * Returns the current document body as an {@link Vmd.Element}.
         * @return Vmd.Element The document body
         * @method
         */
        getHead: function () {
            var head;

            return function () {
                if (head == undefined) {
                    head = Vmd.get(DOC.getElementsByTagName("head")[0]);
                }

                return head;
            };
        }(),

        /**
         * <p>Removes this element from the document, removes all DOM event listeners, and deletes the cache reference.
         * All DOM event listeners are removed from this element. If {@link Vmd#enableNestedListenerRemoval} is
         * <code>true</code>, then DOM event listeners are also removed from all child nodes. The body node
         * will be ignored if passed in.</p>
         * @param {HTMLElement} node The node to remove
         * @method
         */
        removeNode: isIE && !isIE8 ? function () {
            var d;
            return function (n) {
                if (n && n.tagName != 'BODY') {
                    (Vmd.enableNestedListenerRemoval) ? Vmd.EventManager.purgeElement(n, true) : Vmd.EventManager.removeAll(n);
                    d = d || DOC.createElement('div');
                    d.appendChild(n);
                    d.innerHTML = '';
                    delete Vmd.elCache[n.id];
                }
            };
        }() : function (n) {
            if (n && n.parentNode && n.tagName != 'BODY') {
                (Vmd.enableNestedListenerRemoval) ? Vmd.EventManager.purgeElement(n, true) : Vmd.EventManager.removeAll(n);
                n.parentNode.removeChild(n);
                delete Vmd.elCache[n.id];
            }
        },

        /**
         * Returns the type of the given variable in string format. List of possible values are:
         *
         * - `undefined`: If the given value is `undefined`
         * - `null`: If the given value is `null`
         * - `string`: If the given value is a string
         * - `number`: If the given value is a number
         * - `boolean`: If the given value is a boolean value
         * - `date`: If the given value is a `Date` object
         * - `function`: If the given value is a function reference
         * - `object`: If the given value is an object
         * - `array`: If the given value is an array
         * - `regexp`: If the given value is a regular expression
         * - `element`: If the given value is a DOM Element
         * - `textnode`: If the given value is a DOM text node and contains something other than whitespace
         * - `whitespace`: If the given value is a DOM text node and contains only whitespace
         *
         * @param {Object} value
         * @return {String}
         * @markdown
         */
        typeOf: function (value) {
            var type,
                typeToString;

            if (value === null) {
                return 'null';
            }

            type = typeof value;

            if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
                return type;
            }

            typeToString = toString.call(value);

            switch (typeToString) {
                case '[object Array]':
                    return 'array';
                case '[object Date]':
                    return 'date';
                case '[object Boolean]':
                    return 'boolean';
                case '[object Number]':
                    return 'number';
                case '[object RegExp]':
                    return 'regexp';
            }

            if (type === 'function') {
                return 'function';
            }

            if (type === 'object') {
                if (value.nodeType !== undefined) {
                    if (value.nodeType === 3) {
                        return (nonWhitespaceRe).test(value.nodeValue) ? 'textnode' : 'whitespace';
                    }
                    else {
                        return 'element';
                    }
                }

                return 'object';
            }

            Vmd.Error.raise({
                sourceClass: 'Vmd',
                sourceMethod: 'typeOf',
                msg: 'Failed to determine the type of the specified value "' + value + '". This is most likely a bug.'
            });
        },

        /**
         * Coerces the first value if possible so that it is comparable to the second value.
         *
         * Coercion only works between the basic atomic data types String, Boolean, Number, Date, null and undefined.
         *
         * Numbers and numeric strings are coerced to Dates using the value as the millisecond era value.
         *
         * Strings are coerced to Dates by parsing using the {@link Vmd.Date#defaultFormat defaultFormat}.
         * 
         * For example
         *
         *     Vmd.coerce('false', true);
         *     
         * returns the boolean value `false` because the second parameter is of type `Boolean`.
         * 
         * @param {Mixed} from The value to coerce
         * @param {Mixed} to The value it must be compared against
         * @return The coerced value.
         */
        coerce: function (from, to) {
            var fromType = Vmd.typeOf(from),
                toType = Vmd.typeOf(to),
                isString = typeof from === 'string';

            if (fromType !== toType) {
                switch (toType) {
                    case 'string':
                        return String(from);
                    case 'number':
                        return Number(from);
                    case 'boolean':
                        return isString && (!from || from === 'false') ? false : Boolean(from);
                    case 'null':
                        return isString && (!from || from === 'null') ? null : from;
                    case 'undefined':
                        return isString && (!from || from === 'undefined') ? undefined : from;
                    case 'date':
                        return isString && isNaN(from) ? Vmd.Date.parse(from, Vmd.Date.defaultFormat) : Date(Number(from));
                }
            }
            return from;
        },
        /**
         * <p>Returns true if the passed value is empty.</p>
         * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
         * <li>null</li>
         * <li>undefined</li>
         * <li>an empty array</li>
         * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
         * </ul></div>
         * @param {Mixed} value The value to test
         * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         */
        isEmpty: function (v, allowBlank) {
            return v === null || v === undefined || ((Vmd.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },

        /**
         * Returns true if the passed value is a JavaScript array, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */

        isArray: ('isArray' in Array) ? Array.isArray : function (value) {
            return toString.call(value) === '[object Array]';
        },
        /**
         * Returns true if the passed object is a JavaScript date object, otherwise false.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate: function (value) {
            return toString.call(value) === '[object Date]';
        },

        /**
         * Returns true if the passed value is a JavaScript Object, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isObject: (toString.call(null) === '[object Object]') ?
        function (value) {
            // check ownerDocument here as well to exclude DOM nodes
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
        } :
        function (value) {
            return toString.call(value) === '[object Object]';
        },
        /**
        *扩展是否为空对象
        **/
        isEmptyObject: function (v) {
            var t;
            for (t in v)
                return !1;
            return !0
        },
        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isPrimitive: function (v) {
            return Vmd.isString(v) || Vmd.isNumber(v) || Vmd.isBoolean(v);
        },

        /**
         * Returns true if the passed value is a JavaScript Function, otherwise false.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isFunction:
        // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
        // Object.prototype.toString (slower)
        (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function (value) {
            return !!value && toString.call(value) === '[object Function]';
        } : function (value) {
            return !!value && typeof value === 'function';
        },

        /**
         * Returns true if the passed value is a number. Returns false for non-finite numbers.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isNumber: function (v) {
            return typeof v === 'number' && isFinite(v);
        },
        /**
       * Validates that a value is numeric.
       * @param {Object} value Examples: 1, '1', '2.34'
       * @return {Boolean} True if numeric, false otherwise
       */
        isNumeric: function (value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },
        /**
         * Returns true if the passed value is a string.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isString: function (v) {
            return typeof v === 'string';
        },

        /**
         * Returns true if the passed value is a boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean: function (v) {
            return typeof v === 'boolean';
        },

        /**
         * Returns true if the passed value is an HTMLElement
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isElement: function (v) {
            return v ? !!v.tagName : false;
        },
        /**
         * Returns true if the passed value is a TextNode
         * @param {Object} value The value to test
         * @return {Boolean}
         */
        isTextNode: function (value) {
            return value ? value.nodeName === "#text" : false;
        },
        /**
         * Returns true if the passed value is not undefined.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isDefined: function (v) {
            return typeof v !== 'undefined';
        },

        /**
         * True if the detected browser is Opera.
         * @type Boolean
         */
        isOpera: isOpera,
        /**
         * True if the detected browser uses WebKit.
         * @type Boolean
         */
        isWebKit: isWebKit,
        /**
         * True if the detected browser is Chrome.
         * @type Boolean
         */
        isChrome: isChrome,
        /**
         * True if the detected browser is Safari.
         * @type Boolean
         */
        isSafari: isSafari,
        /**
         * True if the detected browser is Safari 3.x.
         * @type Boolean
         */
        isSafari3: isSafari3,
        /**
         * True if the detected browser is Safari 4.x.
         * @type Boolean
         */
        isSafari4: isSafari4,
        /**
         * True if the detected browser is Safari 2.x.
         * @type Boolean
         */
        isSafari2: isSafari2,
        /**
         * True if the detected browser is Internet Explorer.
         * @type Boolean
         */
        isIE: isIE,
        /**
         * True if the detected browser is Internet Explorer 6.x.
         * @type Boolean
         */
        isIE6: isIE6,
        /**
         * True if the detected browser is Internet Explorer 7.x.
         * @type Boolean
         */
        isIE7: isIE7,
        /**
         * True if the detected browser is Internet Explorer 8.x.
         * @type Boolean
         */
        isIE8: isIE8,
        /**
         * True if the detected browser is Internet Explorer 9.x.
         * @type Boolean
         */
        isIE9: isIE9,
        isIE10: isIE10,
        isIE11: isIE11,
        /**
          * True if the detected browser uses a Gecko 1.9+ layout engine (e.g. Firefox 3.x).
          * @type Boolean
          */
        isGecko3: isGecko3,

        /**
         * True if the detected browser uses a Gecko 2.0+ layout engine (e.g. Firefox 4.x).
         * @type Boolean
         */
        isGecko4: isGecko4,

        /**
         * True if the detected browser uses a Gecko 5.0+ layout engine (e.g. Firefox 5.x).
         * @type Boolean
         */
        isGecko5: isGecko5,

        /**
         * True if the detected browser uses a Gecko 5.0+ layout engine (e.g. Firefox 5.x).
         * @type Boolean
         */
        isGecko10: isGecko10,

        /**
         * True if the detected browser uses FireFox 3.0
         * @type Boolean
         */
        isFF3_0: isFF3_0,

        /**
         * True if the detected browser uses FireFox 3.5
         * @type Boolean
         */
        isFF3_5: isFF3_5,

        /**
         * True if the detected browser uses FireFox 3.6
         * @type Boolean
         */
        isFF3_6: isFF3_6,

        /**
         * True if the detected browser uses FireFox 4
         * @type Boolean
         */
        isFF4: 4 <= firefoxVersion && firefoxVersion < 5,

        /**
         * True if the detected browser uses FireFox 5
         * @type Boolean
         */
        isFF5: 5 <= firefoxVersion && firefoxVersion < 6,

        /**
         * True if the detected browser uses FireFox 10
         * @type Boolean
         */
        isFF10: 10 <= firefoxVersion && firefoxVersion < 11,


        /**
         * True if the detected browser is Internet Explorer running in non-strict mode.
         * @type Boolean
         */
        isBorderBox: isBorderBox,
        /**
         * True if the detected platform is Linux.
         * @type Boolean
         */
        isLinux: isLinux,
        /**
         * True if the detected platform is Windows.
         * @type Boolean
         */
        isWindows: isWindows,
        /**
         * True if the detected platform is Mac OS.
         * @type Boolean
         */
        isMac: isMac,
        /**
         * True if the detected platform is Adobe Air.
         * @type Boolean
         */
        isAir: isAir,
        /**
        * The current version of Chrome (0 if the browser is not Chrome).
        * @type Number
        */
        chromeVersion: chromeVersion,

        /**
         * The current version of Firefox (0 if the browser is not Firefox).
         * @type Number
         */
        firefoxVersion: firefoxVersion,

        /**
         * The current version of IE (0 if the browser is not IE). This does not account
         * for the documentMode of the current page, which is factored into {@link #isIE7},
         * {@link #isIE8} and {@link #isIE9}. Thus this is not always true:
         *
         *     Vmd.isIE8 == (Vmd.ieVersion == 8)
         *
         * @type Number
         */
        ieVersion: ieVersion,

        /**
         * The current version of Opera (0 if the browser is not Opera).
         * @type Number
         */
        operaVersion: operaVersion,

        /**
         * The current version of Safari (0 if the browser is not Safari).
         * @type Number
         */
        safariVersion: safariVersion,

        /**
         * The current version of WebKit (0 if the browser does not use WebKit).
         * @type Number
         */
        webKitVersion: webKitVersion,
        /**
         * Logs a message. If a console is present it will be used. On Opera, the method
         * "opera.postError" is called. In other cases, the message is logged to an array
         * "Vmd.log.out". An attached debugger can watch this array and view the log. The
         * log buffer is limited to a maximum of "Vmd.log.max" entries (defaults to 250).
         * The `Vmd.log.out` array can also be written to a popup window by entering the
         * following in the URL bar (a "bookmarklet"):
         *
         *     javascript:void(Vmd.log.show());
         *
         * If additional parameters are passed, they are joined and appended to the message.
         * A technique for tracing entry and exit of a function is this:
         *
         *     function foo () {
         *         Vmd.log({ indent: 1 }, '>> foo');
         *
         *         // log statements in here or methods called from here will be indented
         *         // by one step
         *
         *         Vmd.log({ outdent: 1 }, '<< foo');
         *     }
         *
         * This method does nothing in a release build.
         *
         * @param {String/Object} [options] The message to log or an options object with any
         * of the following properties:
         *
         *  - `msg`: The message to log (required).
         *  - `level`: One of: "error", "warn", "info" or "log" (the default is "log").
         *  - `dump`: An object to dump to the log as part of the message.
         *  - `stack`: True to include a stack trace in the log.
         *  - `indent`: Cause subsequent log statements to be indented one step.
         *  - `outdent`: Cause this and following statements to be one step less indented.
         *
         * @param {String...} [message] The message to log (required unless specified in
         * options object).
         *
         * @method
         */
        log:
            log ||
            nullLog
    });

    /**
     * Creates namespaces to be used for scoping variables and classes so that they are not global.
     * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
     * <pre><code>
Vmd.namespace('Company', 'Company.data');
Vmd.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
     * @param {String} namespace1
     * @param {String} namespace2
     * @param {String} etc
     * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
     * @method ns
     */
    Vmd.ns = Vmd.namespace;

    Vmd.apply(Vmd, {

        /**
         * Clone simple variables including array, {}-like objects, DOM nodes and Date without keeping the old reference.
         * A reference for the object itself is returned if it's not a direct decendant of Object. For model cloning,
         * see {@link Vmd.data.Model#copy Model.copy}.
         * 
         * @param {Object} item The variable to clone
         * @return {Object} clone
         */
        clone: function (item) {
            var type,
                i,
                j,
                k,
                clone,
                key;

            if (item === null || item === undefined) {
                return item;
            }

            // DOM nodes
            // TODO proxy this to Vmd.Element.clone to handle automatic id attribute changing
            // recursively
            if (item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            type = toString.call(item);

            // Date
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }


            // Array
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = Vmd.clone(item[i]);
                }
            }
                // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Vmd.clone(item[key]);
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        if (item.hasOwnProperty(k)) {
                            clone[k] = item[k];
                        }
                    }
                }
            }

            return clone || item;
        },

        /**
         * @private
         * Generate a unique reference of Vmd in the global scope, useful for sandboxing
         */
        getUniqueGlobalNamespace: function () {
            var uniqueGlobalNamespace = this.uniqueGlobalNamespace,
                i;

            if (uniqueGlobalNamespace === undefined) {
                i = 0;

                do {
                    uniqueGlobalNamespace = 'ExtBox' + (++i);
                } while (Vmd.global[uniqueGlobalNamespace] !== undefined);

                Vmd.global[uniqueGlobalNamespace] = Vmd;
                this.uniqueGlobalNamespace = uniqueGlobalNamespace;
            }

            return uniqueGlobalNamespace;
        },

        /**
         * @private
         */
        functionFactoryCache: {},

        cacheableFunctionFactory: function () {
            var me = this,
                args = Array.prototype.slice.call(arguments),
                cache = me.functionFactoryCache,
                idx, fn, ln;

            if (Vmd.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Vmd=window.' + Vmd.name + ';' + args[ln];
                }
            }
            idx = args.join('');
            fn = cache[idx];
            if (!fn) {
                fn = Function.prototype.constructor.apply(Function.prototype, args);

                cache[idx] = fn;
            }
            return fn;
        },

        functionFactory: function () {
            var me = this,
                args = Array.prototype.slice.call(arguments),
                ln;

            if (Vmd.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Vmd=window.' + Vmd.name + ';' + args[ln];
                }
            }

            return Function.prototype.constructor.apply(Function.prototype, args);
        },

        /**
         * @private
         * @property
         */
        Logger: {
            verbose: emptyFn,
            log: emptyFn,
            info: emptyFn,
            warn: emptyFn,
            error: function (message) {
                throw new Error(message);
            },
            deprecate: emptyFn
        }
    });

    // When using Cmd optimizations, the namespace Vmd.app may already be defined
    // by this point since it's done up front by the tool. Check if app already
    // exists before overwriting it.
    ExtApp = Vmd.app;
    if (!ExtApp) {
        ExtApp = Vmd.app = {};
    }
    Vmd.apply(ExtApp, {
        namespaces: {},

        /**
        * @private
        */
        collectNamespaces: function (paths) {
            var namespaces = Vmd.app.namespaces,
                path;

            for (path in paths) {
                if (paths.hasOwnProperty(path)) {
                    namespaces[path] = true;
                }
            }
        },

        /**
        * Adds namespace(s) to known list.
        *
        * @param {String/String[]} namespace
        */
        addNamespaces: function (ns) {
            var namespaces = Vmd.app.namespaces,
                i, l;

            if (!Vmd.isArray(ns)) {
                ns = [ns];
            }

            for (i = 0, l = ns.length; i < l; i++) {
                namespaces[ns[i]] = true;
            }
        },

        /**
        * @private Clear all namespaces from known list.
        */
        clearNamespaces: function () {
            Vmd.app.namespaces = {};
        },

        /**
        * Get namespace prefix for a class name.
        *
        * @param {String} className
        *
        * @return {String} Namespace prefix if it's known, otherwise undefined
        */
        getNamespace: function (className) {
            var namespaces = Vmd.app.namespaces,
                deepestPrefix = '',
                prefix;

            for (prefix in namespaces) {
                if (namespaces.hasOwnProperty(prefix) &&
                    prefix.length > deepestPrefix.length &&
                    (prefix + '.' === className.substring(0, prefix.length + 1))) {
                    deepestPrefix = prefix;
                }
            }

            return deepestPrefix === '' ? undefined : deepestPrefix;
        }
    });
})();

Vmd.ns('Vmd.util', 'Vmd.supports');

Vmd.elCache = {};

/**
 * @class Function
 * These functions are available on every Function object (any JavaScript function).
 */
Vmd.apply(Function.prototype, {
    /**
    * Creates an interceptor function. The passed function is called before the original one. If it returns false,
    * the original one is not called. The resulting function returns the results of the original function.
    * The passed function is called with the parameters of the original function. Example usage:
    * <pre><code>
var sayHi = function(name){
   alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = sayHi.createInterceptor(function(name){
   return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
</code></pre>
    * @param {Function} fcn The function to call before the original
    * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
    * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
    * @return {Function} The new function
    */
    createInterceptor: function (fcn, scope) {
        var method = this;
        return !Vmd.isFunction(fcn) ?
                this :
                function () {
                    var me = this,
                        args = arguments;
                    fcn.target = me;
                    fcn.method = method;
                    return (fcn.apply(scope || me || window, args) !== false) ?
                            method.apply(me || window, args) :
                            null;
                };
    },

    /**
    * Creates a callback that passes arguments[0], arguments[1], arguments[2], ...
    * Call directly on any function. Example: <code>myFunction.createCallback(arg1, arg2)</code>
    * Will create a function that is bound to those 2 args. <b>If a specific scope is required in the
    * callback, use {@link #createDelegate} instead.</b> The function returned by createCallback always
    * executes in the window scope.
    * <p>This method is required when you want to pass arguments to a callback function.  If no arguments
    * are needed, you can simply pass a reference to the function as a callback (e.g., callback: myFn).
    * However, if you tried to pass a function with arguments (e.g., callback: myFn(arg1, arg2)) the function
    * would simply execute immediately when the code is parsed. Example usage:
    * <pre><code>
var sayHi = function(name){
   alert('Hi, ' + name);
}

// clicking the button alerts "Hi, Fred"
new Vmd.Button({
   text: 'Say Hi',
   renderTo: Vmd.getBody(),
   handler: sayHi.createCallback('Fred')
});
</code></pre>
    * @return {Function} The new function
   */
    createCallback: function (/*args...*/) {
        // make args available, in function below
        var args = arguments,
            method = this;
        return function () {
            return method.apply(window, args);
        };
    },

    /**
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>this.myFunction.createDelegate(this, [arg1, arg2])</code>
     * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
     * callback points to obj. Example usage:
     * <pre><code>
var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

var btn = new Vmd.Button({
    text: 'Say Hi',
    renderTo: Vmd.getBody()
});

// This callback will execute in the scope of the
// button instance. Clicking the button alerts
// "Hi, Fred. You clicked the "Say Hi" button."
btn.on('click', sayHi.createDelegate(btn, ['Fred']));
</code></pre>
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    createDelegate: function (obj, args, appendArgs) {
        var method = this;
        return function () {
            var callArgs = args || arguments;
            if (appendArgs === true) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            } else if (Vmd.isNumber(appendArgs)) {
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            return method.apply(obj || window, callArgs);
        };
    },

    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
sayHi.defer(2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
(function(){
    alert('Anonymous');
}).defer(100);
</code></pre>
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer: function (millis, obj, args, appendArgs) {
        var fn = this.createDelegate(obj, args, appendArgs);
        if (millis > 0) {
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    }
});

/**
 * @class String
 * These functions are available on every String object.
 */
Vmd.applyIf(String, {
    /**
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = String.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
     * </code></pre>
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     * @static
     */
    format: function (format) {
        var args = Vmd.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }
});

/**
 * @class Array
 */
Vmd.applyIf(Array.prototype, {
    /**
     * Checks whether or not the specified object exists in the array.
     * @param {Object} o The object to check for
     * @param {Number} from (Optional) The index at which to begin the search
     * @return {Number} The index of o in the array (or -1 if it is not found)
     */
    indexOf: function (o, from) {
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len : 0;
        for (; from < len; ++from) {
            if (this[from] === o) {
                return from;
            }
        }
        return -1;
    },

    /**
     * Removes the specified object from the array.  If the object is not found nothing happens.
     * @param {Object} o The object to remove
     * @return {Array} this array
     */
    remove: function (o) {
        var index = this.indexOf(o);
        if (index != -1) {
            this.splice(index, 1);
        }
        return this;
    }
});
/**
 * @class Vmd.util.TaskRunner
 * Provides the ability to execute one or more arbitrary tasks in a multithreaded
 * manner.  Generally, you can use the singleton {@link Vmd.TaskMgr} instead, but
 * if needed, you can create separate instances of TaskRunner.  Any number of
 * separate tasks can be started at any time and will run independently of each
 * other. Example usage:
 * <pre><code>
// Start a simple clock task that updates a div once per second
var updateClock = function(){
    Vmd.fly('clock').update(new Date().format('g:i:s A'));
} 
var task = {
    run: updateClock,
    interval: 1000 //1 second
}
var runner = new Vmd.util.TaskRunner();
runner.start(task);

// equivalent using TaskMgr
Vmd.TaskMgr.start({
    run: updateClock,
    interval: 1000
});

 * </code></pre>
 * <p>See the {@link #start} method for details about how to configure a task object.</p>
 * Also see {@link Vmd.util.DelayedTask}. 
 * 
 * @constructor
 * @param {Number} interval (optional) The minimum precision in milliseconds supported by this TaskRunner instance
 * (defaults to 10)
 */
Vmd.util.TaskRunner = function (interval) {
    interval = interval || 10;
    var tasks = [],
    	removeQueue = [],
    	id = 0,
    	running = false,

    	// private
    	stopThread = function () {
    	    running = false;
    	    clearInterval(id);
    	    id = 0;
    	},

    	// private
    	startThread = function () {
    	    if (!running) {
    	        running = true;
    	        id = setInterval(runTasks, interval);
    	    }
    	},

    	// private
    	removeTask = function (t) {
    	    removeQueue.push(t);
    	    if (t.onStop) {
    	        t.onStop.apply(t.scope || t);
    	    }
    	},

    	// private
    	runTasks = function () {
    	    var rqLen = removeQueue.length,
	    		now = new Date().getTime();

    	    if (rqLen > 0) {
    	        for (var i = 0; i < rqLen; i++) {
    	            tasks.remove(removeQueue[i]);
    	        }
    	        removeQueue = [];
    	        if (tasks.length < 1) {
    	            stopThread();
    	            return;
    	        }
    	    }
    	    for (var i = 0, t, itime, rt, len = tasks.length; i < len; ++i) {
    	        t = tasks[i];
    	        itime = now - t.taskRunTime;
    	        if (t.interval <= itime) {
    	            rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
    	            t.taskRunTime = now;
    	            if (rt === false || t.taskRunCount === t.repeat) {
    	                removeTask(t);
    	                return;
    	            }
    	        }
    	        if (t.duration && t.duration <= (now - t.taskStartTime)) {
    	            removeTask(t);
    	        }
    	    }
    	};

    /**
     * Starts a new task.
     * @method start
     * @param {Object} task <p>A config object that supports the following properties:<ul>
     * @return {Object} The task
     */
    this.start = function (task) {
        tasks.push(task);
        task.taskStartTime = new Date().getTime();
        task.taskRunTime = 0;
        task.taskRunCount = 0;
        startThread();
        return task;
    };

    /**
     * Stops an existing running task.
     * @method stop
     * @param {Object} task The task to stop
     * @return {Object} The task
     */
    this.stop = function (task) {
        removeTask(task);
        return task;
    };

    /**
     * Stops all tasks that are currently running.
     * @method stopAll
     */
    this.stopAll = function () {
        stopThread();
        for (var i = 0, len = tasks.length; i < len; i++) {
            if (tasks[i].onStop) {
                tasks[i].onStop();
            }
        }
        tasks = [];
        removeQueue = [];
    };
};

/**
 * @class Vmd.TaskMgr
 * @extends Vmd.util.TaskRunner
 * A static {@link Vmd.util.TaskRunner} instance that can be used to start and stop arbitrary tasks.  See
 * {@link Vmd.util.TaskRunner} for supported methods and task config properties.
 * <pre><code>
// Start a simple clock task that updates a div once per second
var task = {
    run: function(){
        Vmd.fly('clock').update(new Date().format('g:i:s A'));
    },
    interval: 1000 //1 second
}
Vmd.TaskMgr.start(task);
</code></pre>
 * <p>See the {@link #start} method for details about how to configure a task object.</p>
 * @singleton
 */
Vmd.TaskMgr = new Vmd.util.TaskRunner();


/*
 * This method evaluates the given code free of any local variable. In some browsers this
 * will be at global scope, in others it will be in a function.
 * @parma {String} code The code to evaluate.
 * @private
 * @method
 */
Vmd.globalEval = Vmd.global.execScript
    ? function (code) {
        execScript(code);
    }
    : function ($$code) {
        // IMPORTANT: because we use eval we cannot place this in the above function or it
        // will break the compressor's ability to rename local variables...
        (function () {
            // This var should not be replaced by the compressor. We need to do this so
            // that Vmd refers to the global Vmd, if we're sandboxing it may
            // refer to the local instance inside the closure
            var Vmd = this.Vmd;
            eval($$code);
        }());
    };


/***************************扩展原生方法base-lang.js***************************/
/*扩展ext的Array date function number object string*/
/**
 * @class Vmd.String
 *
 * A collection of useful static methods to deal with strings.
 * @singleton
 */

Vmd.String = (function () {
    var trimRegex = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
        escapeRe = /('|\\)/g,
        formatRe = /\{(\d+)\}/g,
        escapeRegexRe = /([-.*+?\^${}()|\[\]\/\\])/g,
        basicTrimRe = /^\s+|\s+$/g,
        whitespaceRe = /\s+/,
        varReplace = /(^[^a-z]*|[^\w])/gi,
        charToEntity,
        entityToChar,
        charToEntityRegex,
        entityToCharRegex,
        htmlEncodeReplaceFn = function (match, capture) {
            return charToEntity[capture];
        },
        htmlDecodeReplaceFn = function (match, capture) {
            return (capture in entityToChar) ? entityToChar[capture] : String.fromCharCode(parseInt(capture.substr(2), 10));
        },
        boundsCheck = function (s, other) {
            if (s === null || s === undefined || other === null || other === undefined) {
                return false;
            }

            return other.length <= s.length;
        };

    return {

        /**
         * Inserts a substring into a string.
         * @param {String} s The original string.
         * @param {String} value The substring to insert.
         * @param {Number} index The index to insert the substring. Negative indexes will insert from the end of
         * the string. Example: 
         *
         *     Vmd.String.insert("abcdefg", "h", -1); // abcdefhg
         *
         * @return {String} The value with the inserted substring
         */
        insert: function (s, value, index) {
            if (!s) {
                return value;
            }

            if (!value) {
                return s;
            }

            var len = s.length;

            if (!index && index !== 0) {
                index = len;
            }

            if (index < 0) {
                index *= -1;
                if (index >= len) {
                    // negative overflow, insert at start
                    index = 0;
                } else {
                    index = len - index;
                }
            }

            if (index === 0) {
                s = value + s;
            } else if (index >= s.length) {
                s += value;
            } else {
                s = s.substr(0, index) + value + s.substr(index);
            }
            return s;
        },

        /**
         * Checks if a string starts with a substring
         * @param {String} s The original string
         * @param {String} start The substring to check
         * @param {Boolean} [ignoreCase=false] True to ignore the case in the comparison
         */
        startsWith: function (s, start, ignoreCase) {
            var result = boundsCheck(s, start);

            if (result) {
                if (ignoreCase) {
                    s = s.toLowerCase();
                    start = start.toLowerCase();
                }
                result = s.lastIndexOf(start, 0) === 0;
            }
            return result;
        },

        /**
         * Checks if a string ends with a substring
         * @param {String} s The original string
         * @param {String} start The substring to check
         * @param {Boolean} [ignoreCase=false] True to ignore the case in the comparison
         */
        endsWith: function (s, end, ignoreCase) {
            var result = boundsCheck(s, end);

            if (result) {
                if (ignoreCase) {
                    s = s.toLowerCase();
                    end = end.toLowerCase();
                }
                result = s.indexOf(end, s.length - end.length) !== -1;
            }
            return result;
        },

        /**
         * Converts a string of characters into a legal, parse-able JavaScript `var` name as long as the passed
         * string contains at least one alphabetic character. Non alphanumeric characters, and *leading* non alphabetic
         * characters will be removed.
         * @param {String} s A string to be converted into a `var` name.
         * @return {String} A legal JavaScript `var` name.
         */
        createVarName: function (s) {
            return s.replace(varReplace, '');
        },

        /**
         * Convert certain characters (&, <, >, ', and ") to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode.
         * @return {String} The encoded text.
         * @method
         */
        htmlEncode: function (value) {
            return (!value) ? value : String(value).replace(charToEntityRegex, htmlEncodeReplaceFn);
        },

        /**
         * Convert certain characters (&, <, >, ', and ") from their HTML character equivalents.
         * @param {String} value The string to decode.
         * @return {String} The decoded text.
         * @method
         */
        htmlDecode: function (value) {
            return (!value) ? value : String(value).replace(entityToCharRegex, htmlDecodeReplaceFn);
        },

        /**
         * Checks if a string has values needing to be html encoded.
         * @private
         * @param {String} The string to test
         * @return {Boolean} `true` if the string contains HTML characters
         */
        hasHtmlCharacters: function (s) {
            return charToEntityRegex.test(s);
        },

        /**
         * Adds a set of character entity definitions to the set used by
         * {@link Vmd.String#htmlEncode} and {@link Vmd.String#htmlDecode}.
         *
         * This object should be keyed by the entity name sequence,
         * with the value being the textual representation of the entity.
         *
         *      Vmd.String.addCharacterEntities({
         *          '&amp;Uuml;':'Ü',
         *          '&amp;ccedil;':'ç',
         *          '&amp;ntilde;':'ñ',
         *          '&amp;egrave;':'è'
         *      });
         *      var s = Vmd.String.htmlEncode("A string with entities: èÜçñ");
         *
         * __Note:__ the values of the character entities defined on this object are expected
         * to be single character values.  As such, the actual values represented by the
         * characters are sensitive to the character encoding of the JavaScript source
         * file when defined in string literal form. Script tags referencing server
         * resources with character entities must ensure that the 'charset' attribute
         * of the script node is consistent with the actual character encoding of the
         * server resource.
         *
         * The set of character entities may be reset back to the default state by using
         * the {@link Vmd.String#resetCharacterEntities} method
         *
         * @param {Object} entities The set of character entities to add to the current
         * definitions.
         */
        addCharacterEntities: function (newEntities) {
            var charKeys = [],
                entityKeys = [],
                key, echar;
            for (key in newEntities) {
                echar = newEntities[key];
                entityToChar[key] = echar;
                charToEntity[echar] = key;
                charKeys.push(echar);
                entityKeys.push(key);
            }
            charToEntityRegex = new RegExp('(' + charKeys.join('|') + ')', 'g');
            entityToCharRegex = new RegExp('(' + entityKeys.join('|') + '|&#[0-9]{1,5};' + ')', 'g');
        },

        /**
         * Resets the set of character entity definitions used by
         * {@link Vmd.String#htmlEncode} and {@link Vmd.String#htmlDecode} back to the
         * default state.
         */
        resetCharacterEntities: function () {
            charToEntity = {};
            entityToChar = {};
            // add the default set
            this.addCharacterEntities({
                '&amp;': '&',
                '&gt;': '>',
                '&lt;': '<',
                '&quot;': '"',
                '&#39;': "'"
            });
        },

        /**
         * Appends content to the query string of a URL, handling logic for whether to place
         * a question mark or ampersand.
         * @param {String} url The URL to append to.
         * @param {String} string The content to append to the URL.
         * @return {String} The resulting URL
         */
        urlAppend: function (url, string) {
            if (!Vmd.isEmpty(string)) {
                return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
            }

            return url;
        },

        /**
         * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
         *
         *     var s = '  foo bar  ';
         *     alert('-' + s + '-');                   //alerts "- foo bar -"
         *     alert('-' + Vmd.String.trim(s) + '-');  //alerts "-foo bar-"
         *
         * @param {String} string The string to trim.
         * @return {String} The trimmed string.
         */
        trim: function (string) {
            return string.replace(trimRegex, "");
        },

        /**
         * Capitalize the given string
         * @param {String} string
         * @return {String}
         */
        capitalize: function (string) {
            return string.charAt(0).toUpperCase() + string.substr(1);
        },

        /**
         * Uncapitalize the given string.
         * @param {String} string
         * @return {String}
         */
        uncapitalize: function (string) {
            return string.charAt(0).toLowerCase() + string.substr(1);
        },

        /**
         * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length.
         * @param {String} value The string to truncate.
         * @param {Number} length The maximum length to allow before truncating.
         * @param {Boolean} [word=false] `true` to try to find a common word break.
         * @return {String} The converted text.
         */
        ellipsis: function (value, len, word) {
            if (value && value.length > len) {
                if (word) {
                    var vs = value.substr(0, len - 2),
                    index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                    if (index !== -1 && index >= (len - 15)) {
                        return vs.substr(0, index) + "...";
                    }
                }
                return value.substr(0, len - 3) + "...";
            }
            return value;
        },

        /**
         * Escapes the passed string for use in a regular expression.
         * @param {String} string
         * @return {String}
         */
        escapeRegex: function (string) {
            return string.replace(escapeRegexRe, "\\$1");
        },

        /**
         * Escapes the passed string for ' and \
         * @param {String} string The string to escape
         * @return {String} The escaped string
         */
        escape: function (string) {
            return string.replace(escapeRe, "\\$1");
        },

        /**
         * Utility function that allows you to easily switch a string between two alternating values.  The passed value
         * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
         * they are already different, the first value passed in is returned.  Note that this method returns the new value
         * but does not change the current string.
         *
         *     // alternate sort directions
         *     sort = Vmd.String.toggle(sort, 'ASC', 'DESC');
         *
         *     // instead of conditional logic:
         *     sort = (sort === 'ASC' ? 'DESC' : 'ASC');
         *
         * @param {String} string The current string.
         * @param {String} value The value to compare to the current string.
         * @param {String} other The new value to use if the string already equals the first value passed in.
         * @return {String} The new value.
         */
        toggle: function (string, value, other) {
            return string === value ? other : value;
        },

        /**
         * Pads the left side of a string with a specified character.  This is especially useful
         * for normalizing number and date strings.  Example usage:
         *
         *     var s = Vmd.String.leftPad('123', 5, '0');
         *     // s now contains the string: '00123'
         *
         * @param {String} string The original string.
         * @param {Number} size The total length of the output string.
         * @param {String} [character=' '] (optional) The character with which to pad the original string.
         * @return {String} The padded string.
         */
        leftPad: function (string, size, character) {
            var result = String(string);
            character = character || " ";
            while (result.length < size) {
                result = character + result;
            }
            return result;
        },

        /**
         * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
         * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
         *
         *     var cls = 'my-class',
         *         text = 'Some text';
         *     var s = Vmd.String.format('<div class="{0}">{1}</div>', cls, text);
         *     // s now contains the string: '<div class="my-class">Some text</div>'
         *
         * @param {String} string The tokenized string to be formatted.
         * @param {Mixed...} values The values to replace tokens `{0}`, `{1}`, etc in order.
         * @return {String} The formatted string.
         */
        format: function (format) {
            var args = Vmd.Array.toArray(arguments, 1);
            return format.replace(formatRe, function (m, i) {
                return args[i];
            });
        },

        /**
         * Returns a string with a specified number of repetitions a given string pattern.
         * The pattern be separated by a different string.
         *
         *      var s = Vmd.String.repeat('---', 4); // = '------------'
         *      var t = Vmd.String.repeat('--', 3, '/'); // = '--/--/--'
         *
         * @param {String} pattern The pattern to repeat.
         * @param {Number} count The number of times to repeat the pattern (may be 0).
         * @param {String} sep An option string to separate each pattern.
         */
        repeat: function (pattern, count, sep) {
            if (count < 1) {
                count = 0;
            }
            for (var buf = [], i = count; i--;) {
                buf.push(pattern);
            }
            return buf.join(sep || '');
        },

        /**
         * Splits a string of space separated words into an array, trimming as needed. If the
         * words are already an array, it is returned.
         *
         * @param {String/Array} words
         */
        splitWords: function (words) {
            if (words && typeof words == 'string') {
                return words.replace(basicTrimRe, '').split(whitespaceRe);
            }
            return words || [];
        }
    };
}());

// initialize the default encode / decode entities
Vmd.String.resetCharacterEntities();


/**
 * @class Vmd.Array
 * @singleton
 * @author Jacky Nguyen <jacky@sencha.com>
 * @docauthor Jacky Nguyen <jacky@sencha.com>
 *
 * A set of useful static methods to deal with arrays; provide missing methods for older browsers.
 */
(function () {

    var arrayPrototype = Array.prototype,
        slice = arrayPrototype.slice,
        supportsSplice = (function () {
            var array = [],
                lengthBefore,
                j = 20;

            if (!array.splice) {
                return false;
            }

            // This detects a bug in IE8 splice method:
            // see http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/6e946d03-e09f-4b22-a4dd-cd5e276bf05a/

            while (j--) {
                array.push("A");
            }

            array.splice(15, 0, "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F", "F");

            lengthBefore = array.length; //41
            array.splice(13, 0, "XXX"); // add one element

            if (lengthBefore + 1 != array.length) {
                return false;
            }
            // end IE8 bug

            return true;
        }()),
        supportsForEach = 'forEach' in arrayPrototype,
        supportsMap = 'map' in arrayPrototype,
        supportsIndexOf = 'indexOf' in arrayPrototype,
        supportsEvery = 'every' in arrayPrototype,
        supportsSome = 'some' in arrayPrototype,
        supportsFilter = 'filter' in arrayPrototype,
        supportsSort = (function () {
            var a = [1, 2, 3, 4, 5].sort(function () { return 0; });
            return a[0] === 1 && a[1] === 2 && a[2] === 3 && a[3] === 4 && a[4] === 5;
        }()),
        supportsSliceOnNodeList = true,
        ExtArray,
        erase,
        replace,
        splice;

    try {
        // IE 6 - 8 will throw an error when using Array.prototype.slice on NodeList
        if (typeof document !== 'undefined') {
            slice.call(document.getElementsByTagName('body'));
        }
    } catch (e) {
        supportsSliceOnNodeList = false;
    }

    function fixArrayIndex(array, index) {
        return (index < 0) ? Math.max(0, array.length + index)
                           : Math.min(array.length, index);
    }

    /*
    Does the same work as splice, but with a slightly more convenient signature. The splice
    method has bugs in IE8, so this is the implementation we use on that platform.
    In case A, it is obvious that copying of [4,5,6,7] must be left-to-right so
    that we don't end up with [0,1,6,7,6,7]. In case B, we have the opposite; we
    must go right-to-left or else we would end up with [0,1,a,b,c,4,4,4,4].
    */
    function replaceSim(array, index, removeCount, insert) {
        var add = insert ? insert.length : 0,
            length = array.length,
            pos = fixArrayIndex(array, index),
            remove,
            tailOldPos,
            tailNewPos,
            tailCount,
            lengthAfterRemove,
            i;

        // we try to use Array.push when we can for efficiency...
        if (pos === length) {
            if (add) {
                array.push.apply(array, insert);
            }
        } else {
            remove = Math.min(removeCount, length - pos);
            tailOldPos = pos + remove;
            tailNewPos = tailOldPos + add - remove;
            tailCount = length - tailOldPos;
            lengthAfterRemove = length - remove;

            if (tailNewPos < tailOldPos) { // case A
                for (i = 0; i < tailCount; ++i) {
                    array[tailNewPos + i] = array[tailOldPos + i];
                }
            } else if (tailNewPos > tailOldPos) { // case B
                for (i = tailCount; i--;) {
                    array[tailNewPos + i] = array[tailOldPos + i];
                }
            } // else, add == remove (nothing to do)

            if (add && pos === lengthAfterRemove) {
                array.length = lengthAfterRemove; // truncate array
                array.push.apply(array, insert);
            } else {
                array.length = lengthAfterRemove + add; // reserves space
                for (i = 0; i < add; ++i) {
                    array[pos + i] = insert[i];
                }
            }
        }

        return array;
    }

    function replaceNative(array, index, removeCount, insert) {
        if (insert && insert.length) {
            // Inserting at index zero with no removing: use unshift
            if (index === 0 && !removeCount) {
                array.unshift.apply(array, insert);
            }
                // Inserting/replacing in middle of array
            else if (index < array.length) {
                array.splice.apply(array, [index, removeCount].concat(insert));
            }
                // Appending to array
            else {
                array.push.apply(array, insert);
            }
        } else {
            array.splice(index, removeCount);
        }
        return array;
    }

    function eraseSim(array, index, removeCount) {
        return replaceSim(array, index, removeCount);
    }

    function eraseNative(array, index, removeCount) {
        array.splice(index, removeCount);
        return array;
    }

    function spliceSim(array, index, removeCount) {
        var pos = fixArrayIndex(array, index),
            removed = array.slice(index, fixArrayIndex(array, pos + removeCount));

        if (arguments.length < 4) {
            replaceSim(array, pos, removeCount);
        } else {
            replaceSim(array, pos, removeCount, slice.call(arguments, 3));
        }

        return removed;
    }

    function spliceNative(array) {
        return array.splice.apply(array, slice.call(arguments, 1));
    }

    erase = supportsSplice ? eraseNative : eraseSim;
    replace = supportsSplice ? replaceNative : replaceSim;
    splice = supportsSplice ? spliceNative : spliceSim;

    // NOTE: from here on, use erase, replace or splice (not native methods)...

    ExtArray = Vmd.Array = {
        /**
         * Iterates an array or an iterable value and invoke the given callback function for each item.
         *
         *     var countries = ['Vietnam', 'Singapore', 'United States', 'Russia'];
         *
         *     Vmd.Array.each(countries, function(name, index, countriesItSelf) {
         *         console.log(name);
         *     });
         *
         *     var sum = function() {
         *         var sum = 0;
         *
         *         Vmd.Array.each(arguments, function(value) {
         *             sum += value;
         *         });
         *
         *         return sum;
         *     };
         *
         *     sum(1, 2, 3); // returns 6
         *
         * The iteration can be stopped by returning false in the function callback.
         *
         *     Vmd.Array.each(countries, function(name, index, countriesItSelf) {
         *         if (name === 'Singapore') {
         *             return false; // break here
         *         }
         *     });
         *
         * {@link Vmd#each Vmd.each} is alias for {@link Vmd.Array#each Vmd.Array.each}
         *
         * @param {Array/NodeList/Object} iterable The value to be iterated. If this
         * argument is not iterable, the callback function is called once.
         * @param {Function} fn The callback function. If it returns false, the iteration stops and this method returns
         * the current `index`.
         * @param {Object} fn.item The item at the current `index` in the passed `array`
         * @param {Number} fn.index The current `index` within the `array`
         * @param {Array} fn.allItems The `array` itself which was passed as the first argument
         * @param {Boolean} fn.return Return false to stop iteration.
         * @param {Object} scope (Optional) The scope (`this` reference) in which the specified function is executed.
         * @param {Boolean} reverse (Optional) Reverse the iteration order (loop from the end to the beginning)
         * Defaults false
         * @return {Boolean} See description for the `fn` parameter.
         */
        each: function (array, fn, scope, reverse) {
            array = ExtArray.from(array);

            var i,
                ln = array.length;

            if (reverse !== true) {
                for (i = 0; i < ln; i++) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }
            else {
                for (i = ln - 1; i > -1; i--) {
                    if (fn.call(scope || array[i], array[i], i, array) === false) {
                        return i;
                    }
                }
            }

            return true;
        },

        /**
         * Iterates an array and invoke the given callback function for each item. Note that this will simply
         * delegate to the native Array.prototype.forEach method if supported. It doesn't support stopping the
         * iteration by returning false in the callback function like {@link Vmd.Array#each}. However, performance
         * could be much better in modern browsers comparing with {@link Vmd.Array#each}
         *
         * @param {Array} array The array to iterate
         * @param {Function} fn The callback function.
         * @param {Object} fn.item The item at the current `index` in the passed `array`
         * @param {Number} fn.index The current `index` within the `array`
         * @param {Array}  fn.allItems The `array` itself which was passed as the first argument
         * @param {Object} scope (Optional) The execution scope (`this`) in which the specified function is executed.
         */
        forEach: supportsForEach ? function (array, fn, scope) {
            array.forEach(fn, scope);
        } : function (array, fn, scope) {
            var i = 0,
                ln = array.length;

            for (; i < ln; i++) {
                fn.call(scope, array[i], i, array);
            }
        },

        /**
         * Get the index of the provided `item` in the given `array`, a supplement for the
         * missing arrayPrototype.indexOf in Internet Explorer.
         *
         * @param {Array} array The array to check
         * @param {Object} item The item to look for
         * @param {Number} from (Optional) The index at which to begin the search
         * @return {Number} The index of item in the array (or -1 if it is not found)
         */
        indexOf: supportsIndexOf ? function (array, item, from) {
            return arrayPrototype.indexOf.call(array, item, from);
        } : function (array, item, from) {
            var i, length = array.length;

            for (i = (from < 0) ? Math.max(0, length + from) : from || 0; i < length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }

            return -1;
        },

        /**
         * Checks whether or not the given `array` contains the specified `item`
         *
         * @param {Array} array The array to check
         * @param {Object} item The item to look for
         * @return {Boolean} True if the array contains the item, false otherwise
         */
        contains: supportsIndexOf ? function (array, item) {
            return arrayPrototype.indexOf.call(array, item) !== -1;
        } : function (array, item) {
            var i, ln;

            for (i = 0, ln = array.length; i < ln; i++) {
                if (array[i] === item) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Converts any iterable (numeric indices and a length property) into a true array.
         *
         *     function test() {
         *         var args = Vmd.Array.toArray(arguments),
         *             fromSecondToLastArgs = Vmd.Array.toArray(arguments, 1);
         *
         *         alert(args.join(' '));
         *         alert(fromSecondToLastArgs.join(' '));
         *     }
         *
         *     test('just', 'testing', 'here'); // alerts 'just testing here';
         *                                      // alerts 'testing here';
         *
         *     Vmd.Array.toArray(document.getElementsByTagName('div')); // will convert the NodeList into an array
         *     Vmd.Array.toArray('splitted'); // returns ['s', 'p', 'l', 'i', 't', 't', 'e', 'd']
         *     Vmd.Array.toArray('splitted', 0, 3); // returns ['s', 'p', 'l']
         *
         * {@link Vmd#toArray Vmd.toArray} is alias for {@link Vmd.Array#toArray Vmd.Array.toArray}
         *
         * @param {Object} iterable the iterable object to be turned into a true Array.
         * @param {Number} start (Optional) a zero-based index that specifies the start of extraction. Defaults to 0
         * @param {Number} end (Optional) a 1-based index that specifies the end of extraction. Defaults to the last
         * index of the iterable value
         * @return {Array} array
         */
        toArray: function (iterable, start, end) {
            if (!iterable || !iterable.length) {
                return [];
            }

            if (typeof iterable === 'string') {
                iterable = iterable.split('');
            }

            if (supportsSliceOnNodeList) {
                return slice.call(iterable, start || 0, end || iterable.length);
            }

            var array = [],
                i;

            start = start || 0;
            end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;

            for (i = start; i < end; i++) {
                array.push(iterable[i]);
            }

            return array;
        },

        /**
         * Plucks the value of a property from each item in the Array. Example:
         *
         *     Vmd.Array.pluck(Vmd.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
         *
         * @param {Array/NodeList} array The Array of items to pluck the value from.
         * @param {String} propertyName The property name to pluck from each element.
         * @return {Array} The value from each item in the Array.
         */
        pluck: function (array, propertyName) {
            var ret = [],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                ret.push(item[propertyName]);
            }

            return ret;
        },

        /**
         * Creates a new array with the results of calling a provided function on every element in this array.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} [scope] Callback function scope
         * @return {Array} results
         */
        map: supportsMap ? function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.map must have a callback function passed as second argument.');
            }
            return array.map(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.map must have a callback function passed as second argument.');
            }
            var results = [],
                i = 0,
                len = array.length;

            for (; i < len; i++) {
                results[i] = fn.call(scope, array[i], i, array);
            }

            return results;
        },

        /**
         * Executes the specified function for each array element until the function returns a falsy value.
         * If such an item is found, the function will return false immediately.
         * Otherwise, it will return true.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} scope Callback function scope
         * @return {Boolean} True if no false value is returned by the callback function.
         */
        every: supportsEvery ? function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.every must have a callback function passed as second argument.');
            }
            return array.every(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.every must have a callback function passed as second argument.');
            }
            var i = 0,
                ln = array.length;

            for (; i < ln; ++i) {
                if (!fn.call(scope, array[i], i, array)) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Executes the specified function for each array element until the function returns a truthy value.
         * If such an item is found, the function will return true immediately. Otherwise, it will return false.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} scope Callback function scope
         * @return {Boolean} True if the callback function returns a truthy value.
         */
        some: supportsSome ? function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.some must have a callback function passed as second argument.');
            }
            return array.some(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.some must have a callback function passed as second argument.');
            }
            var i = 0,
                ln = array.length;

            for (; i < ln; ++i) {
                if (fn.call(scope, array[i], i, array)) {
                    return true;
                }
            }

            return false;
        },

        /**
         * Shallow compares the contents of 2 arrays using strict equality.
         * @param {Array} array1
         * @param {Array} array2
         * @return {Boolean} `true` if the arrays are equal.
         */
        equals: function (array1, array2) {
            var len1 = array1.length,
                len2 = array2.length,
                i;

            // Short circuit if the same array is passed twice
            if (array1 === array2) {
                return true;
            }

            if (len1 !== len2) {
                return false;
            }

            for (i = 0; i < len1; ++i) {
                if (array1[i] !== array2[i]) {
                    return false;
                }
            }

            return true;
        },

        /**
         * Filter through an array and remove empty item as defined in {@link Vmd#isEmpty Vmd.isEmpty}
         *
         * See {@link Vmd.Array#filter}
         *
         * @param {Array} array
         * @return {Array} results
         */
        clean: function (array) {
            var results = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if (!Vmd.isEmpty(item)) {
                    results.push(item);
                }
            }

            return results;
        },

        /**
         * Returns a new array with unique items
         *
         * @param {Array} array
         * @return {Array} results
         */
        unique: function (array) {
            var clone = [],
                i = 0,
                ln = array.length,
                item;

            for (; i < ln; i++) {
                item = array[i];

                if (ExtArray.indexOf(clone, item) === -1) {
                    clone.push(item);
                }
            }

            return clone;
        },

        /**
         * Creates a new array with all of the elements of this array for which
         * the provided filtering function returns true.
         *
         * @param {Array} array
         * @param {Function} fn Callback function for each item
         * @param {Mixed} fn.item Current item.
         * @param {Number} fn.index Index of the item.
         * @param {Array} fn.array The whole array that's being iterated.
         * @param {Object} scope Callback function scope
         * @return {Array} results
         */
        filter: supportsFilter ? function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.filter must have a filter function passed as second argument.');
            }
            return array.filter(fn, scope);
        } : function (array, fn, scope) {
            if (!fn) {
                Vmd.Error.raise('Vmd.Array.filter must have a filter function passed as second argument.');
            }
            var results = [],
                i = 0,
                ln = array.length;

            for (; i < ln; i++) {
                if (fn.call(scope, array[i], i, array)) {
                    results.push(array[i]);
                }
            }

            return results;
        },

        /**
         * Returns the first item in the array which elicits a true return value from the
         * passed selection function.
         * @param {Array} array The array to search
         * @param {Function} fn The selection function to execute for each item.
         * @param {Mixed} fn.item The array item.
         * @param {String} fn.index The index of the array item.
         * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the
         * function is executed. Defaults to the array
         * @return {Object} The first item in the array which returned true from the selection
         * function, or null if none was found.
         */
        findBy: function (array, fn, scope) {
            var i = 0,
                len = array.length;

            for (; i < len; i++) {
                if (fn.call(scope || array, array[i], i)) {
                    return array[i];
                }
            }
            return null;
        },

        /**
         * Converts a value to an array if it's not already an array; returns:
         *
         * - An empty array if given value is `undefined` or `null`
         * - Itself if given value is already an array
         * - An array copy if given value is {@link Vmd#isIterable iterable} (arguments, NodeList and alike)
         * - An array with one item which is the given value, otherwise
         *
         * @param {Object} value The value to convert to an array if it's not already is an array
         * @param {Boolean} newReference (Optional) True to clone the given array and return a new reference if necessary,
         * defaults to false
         * @return {Array} array
         */
        from: function (value, newReference) {
            if (value === undefined || value === null) {
                return [];
            }

            if (Vmd.isArray(value)) {
                return (newReference) ? slice.call(value) : value;
            }

            var type = typeof value;
            // Both strings and functions will have a length property. In phantomJS, NodeList
            // instances report typeof=='function' but don't have an apply method...
            if (value && value.length !== undefined && type !== 'string' && (type !== 'function' || !value.apply)) {
                return ExtArray.toArray(value);
            }

            return [value];
        },

        /**
         * Removes the specified item from the array if it exists
         *
         * @param {Array} array The array
         * @param {Object} item The item to remove
         * @return {Array} The passed array itself
         */
        remove: function (array, item) {
            var index = ExtArray.indexOf(array, item);

            if (index !== -1) {
                erase(array, index, 1);
            }

            return array;
        },

        /**
         * Push an item into the array only if the array doesn't contain it yet
         *
         * @param {Array} array The array
         * @param {Object} item The item to include
         */
        include: function (array, item) {
            if (!ExtArray.contains(array, item)) {
                array.push(item);
            }
        },

        /**
         * Clone a flat array without referencing the previous one. Note that this is different
         * from Vmd.clone since it doesn't handle recursive cloning. It's simply a convenient, easy-to-remember method
         * for Array.prototype.slice.call(array)
         *
         * @param {Array} array The array
         * @return {Array} The clone array
         */
        clone: function (array) {
            return slice.call(array);
        },

        /**
         * Merge multiple arrays into one with unique items.
         *
         * {@link Vmd.Array#union} is alias for {@link Vmd.Array#merge}
         *
         * @param {Array} array1
         * @param {Array} array2
         * @param {Array} etc
         * @return {Array} merged
         */
        merge: function () {
            var args = slice.call(arguments),
                array = [],
                i, ln;

            for (i = 0, ln = args.length; i < ln; i++) {
                array = array.concat(args[i]);
            }

            return ExtArray.unique(array);
        },

        /**
         * Merge multiple arrays into one with unique items that exist in all of the arrays.
         *
         * @param {Array} array1
         * @param {Array} array2
         * @param {Array} etc
         * @return {Array} intersect
         */
        intersect: function () {
            var intersection = [],
                arrays = slice.call(arguments),
                arraysLength,
                array,
                arrayLength,
                minArray,
                minArrayIndex,
                minArrayCandidate,
                minArrayLength,
                element,
                elementCandidate,
                elementCount,
                i, j, k;

            if (!arrays.length) {
                return intersection;
            }

            // Find the smallest array
            arraysLength = arrays.length;
            for (i = minArrayIndex = 0; i < arraysLength; i++) {
                minArrayCandidate = arrays[i];
                if (!minArray || minArrayCandidate.length < minArray.length) {
                    minArray = minArrayCandidate;
                    minArrayIndex = i;
                }
            }

            minArray = ExtArray.unique(minArray);
            erase(arrays, minArrayIndex, 1);

            // Use the smallest unique'd array as the anchor loop. If the other array(s) do contain
            // an item in the small array, we're likely to find it before reaching the end
            // of the inner loop and can terminate the search early.
            minArrayLength = minArray.length;
            arraysLength = arrays.length;
            for (i = 0; i < minArrayLength; i++) {
                element = minArray[i];
                elementCount = 0;

                for (j = 0; j < arraysLength; j++) {
                    array = arrays[j];
                    arrayLength = array.length;
                    for (k = 0; k < arrayLength; k++) {
                        elementCandidate = array[k];
                        if (element === elementCandidate) {
                            elementCount++;
                            break;
                        }
                    }
                }

                if (elementCount === arraysLength) {
                    intersection.push(element);
                }
            }

            return intersection;
        },

        /**
         * Perform a set difference A-B by subtracting all items in array B from array A.
         *
         * @param {Array} arrayA
         * @param {Array} arrayB
         * @return {Array} difference
         */
        difference: function (arrayA, arrayB) {
            var clone = slice.call(arrayA),
                ln = clone.length,
                i, j, lnB;

            for (i = 0, lnB = arrayB.length; i < lnB; i++) {
                for (j = 0; j < ln; j++) {
                    if (clone[j] === arrayB[i]) {
                        erase(clone, j, 1);
                        j--;
                        ln--;
                    }
                }
            }

            return clone;
        },

        /**
         * Returns a shallow copy of a part of an array. This is equivalent to the native
         * call "Array.prototype.slice.call(array, begin, end)". This is often used when "array"
         * is "arguments" since the arguments object does not supply a slice method but can
         * be the context object to Array.prototype.slice.
         *
         * @param {Array} array The array (or arguments object).
         * @param {Number} begin The index at which to begin. Negative values are offsets from
         * the end of the array.
         * @param {Number} end The index at which to end. The copied items do not include
         * end. Negative values are offsets from the end of the array. If end is omitted,
         * all items up to the end of the array are copied.
         * @return {Array} The copied piece of the array.
         * @method slice
         */
        // Note: IE6 will return [] on slice.call(x, undefined).
        slice: ([1, 2].slice(1, undefined).length ?
            function (array, begin, end) {
                return slice.call(array, begin, end);
            } :
            // at least IE6 uses arguments.length for variadic signature
            function (array, begin, end) {
                // After tested for IE 6, the one below is of the best performance
                // see http://jsperf.com/slice-fix
                if (typeof begin === 'undefined') {
                    return slice.call(array);
                }
                if (typeof end === 'undefined') {
                    return slice.call(array, begin);
                }
                return slice.call(array, begin, end);
            }
        ),

        /**
         * Sorts the elements of an Array.
         * By default, this method sorts the elements alphabetically and ascending.
         *
         * @param {Array} array The array to sort.
         * @param {Function} sortFn (optional) The comparison function.
         * @param {Mixed} sortFn.a An item to compare.
         * @param {Mixed} sortFn.b Another item to compare.
         * @return {Array} The sorted array.
         */
        sort: supportsSort ? function (array, sortFn) {
            if (sortFn) {
                return array.sort(sortFn);
            } else {
                return array.sort();
            }
        } : function (array, sortFn) {
            var length = array.length,
                i = 0,
                comparison,
                j, min, tmp;

            for (; i < length; i++) {
                min = i;
                for (j = i + 1; j < length; j++) {
                    if (sortFn) {
                        comparison = sortFn(array[j], array[min]);
                        if (comparison < 0) {
                            min = j;
                        }
                    } else if (array[j] < array[min]) {
                        min = j;
                    }
                }
                if (min !== i) {
                    tmp = array[i];
                    array[i] = array[min];
                    array[min] = tmp;
                }
            }

            return array;
        },

        /**
         * Recursively flattens into 1-d Array. Injects Arrays inline.
         *
         * @param {Array} array The array to flatten
         * @return {Array} The 1-d array.
         */
        flatten: function (array) {
            var worker = [];

            function rFlatten(a) {
                var i, ln, v;

                for (i = 0, ln = a.length; i < ln; i++) {
                    v = a[i];

                    if (Vmd.isArray(v)) {
                        rFlatten(v);
                    } else {
                        worker.push(v);
                    }
                }

                return worker;
            }

            return rFlatten(array);
        },

        /**
         * Returns the minimum value in the Array.
         *
         * @param {Array/NodeList} array The Array from which to select the minimum value.
         * @param {Function} comparisonFn (optional) a function to perform the comparision which determines minimization.
         * If omitted the "<" operator will be used. Note: gt = 1; eq = 0; lt = -1
         * @param {Mixed} comparisonFn.min Current minimum value.
         * @param {Mixed} comparisonFn.item The value to compare with the current minimum.
         * @return {Object} minValue The minimum value
         */
        min: function (array, comparisonFn) {
            var min = array[0],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(min, item) === 1) {
                        min = item;
                    }
                }
                else {
                    if (item < min) {
                        min = item;
                    }
                }
            }

            return min;
        },

        /**
         * Returns the maximum value in the Array.
         *
         * @param {Array/NodeList} array The Array from which to select the maximum value.
         * @param {Function} comparisonFn (optional) a function to perform the comparision which determines maximization.
         * If omitted the ">" operator will be used. Note: gt = 1; eq = 0; lt = -1
         * @param {Mixed} comparisonFn.max Current maximum value.
         * @param {Mixed} comparisonFn.item The value to compare with the current maximum.
         * @return {Object} maxValue The maximum value
         */
        max: function (array, comparisonFn) {
            var max = array[0],
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                if (comparisonFn) {
                    if (comparisonFn(max, item) === -1) {
                        max = item;
                    }
                }
                else {
                    if (item > max) {
                        max = item;
                    }
                }
            }

            return max;
        },

        /**
         * Calculates the mean of all items in the array.
         *
         * @param {Array} array The Array to calculate the mean value of.
         * @return {Number} The mean.
         */
        mean: function (array) {
            return array.length > 0 ? ExtArray.sum(array) / array.length : undefined;
        },

        /**
         * Calculates the sum of all items in the given array.
         *
         * @param {Array} array The Array to calculate the sum value of.
         * @return {Number} The sum.
         */
        sum: function (array) {
            var sum = 0,
                i, ln, item;

            for (i = 0, ln = array.length; i < ln; i++) {
                item = array[i];

                sum += item;
            }

            return sum;
        },

        /**
         * Creates a map (object) keyed by the elements of the given array. The values in
         * the map are the index+1 of the array element. For example:
         * 
         *      var map = Vmd.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 1, b: 2, c: 3 };
         * 
         * Or a key property can be specified:
         * 
         *      var map = Vmd.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: 1, b: 2, c: 3 };
         * 
         * Lastly, a key extractor can be provided:
         * 
         *      var map = Vmd.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], function (obj) { return obj.name.toUpperCase(); });
         *
         *      // map = { A: 1, B: 2, C: 3 };
         * 
         * @param {Array} array The Array to create the map from.
         * @param {String/Function} [getKey] Name of the object property to use
         * as a key or a function to extract the key.
         * @param {Object} [scope] Value of this inside callback.
         * @return {Object} The resulting map.
         */
        toMap: function (array, getKey, scope) {
            var map = {},
                i = array.length;

            if (!getKey) {
                while (i--) {
                    map[array[i]] = i + 1;
                }
            } else if (typeof getKey == 'string') {
                while (i--) {
                    map[array[i][getKey]] = i + 1;
                }
            } else {
                while (i--) {
                    map[getKey.call(scope, array[i])] = i + 1;
                }
            }

            return map;
        },

        /**
         * Creates a map (object) keyed by a property of elements of the given array. The values in
         * the map are the array element. For example:
         * 
         *      var map = Vmd.Array.toMap(['a','b','c']);
         *
         *      // map = { a: 'a', b: 'b', c: 'c' };
         * 
         * Or a key property can be specified:
         * 
         *      var map = Vmd.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], 'name');
         *
         *      // map = { a: {name: 'a'}, b: {name: 'b'}, c: {name: 'c'} };
         * 
         * Lastly, a key extractor can be provided:
         * 
         *      var map = Vmd.Array.toMap([
         *              { name: 'a' },
         *              { name: 'b' },
         *              { name: 'c' }
         *          ], function (obj) { return obj.name.toUpperCase(); });
         *
         *      // map = { A: {name: 'a'}, B: {name: 'b'}, C: {name: 'c'} };
         *
         * @param {Array} array The Array to create the map from.
         * @param {String/Function} [getKey] Name of the object property to use
         * as a key or a function to extract the key.
         * @param {Object} [scope] Value of this inside callback.
         * @return {Object} The resulting map.
         */
        toValueMap: function (array, getKey, scope) {
            var map = {},
                i = array.length;

            if (!getKey) {
                while (i--) {
                    map[array[i]] = array[i];
                }
            } else if (typeof getKey == 'string') {
                while (i--) {
                    map[array[i][getKey]] = array[i];
                }
            } else {
                while (i--) {
                    map[getKey.call(scope, array[i])] = array[i];
                }
            }

            return map;
        },

        _replaceSim: replaceSim, // for unit testing
        _spliceSim: spliceSim,

        /**
         * Removes items from an array. This is functionally equivalent to the splice method
         * of Array, but works around bugs in IE8's splice method and does not copy the
         * removed elements in order to return them (because very often they are ignored).
         *
         * @param {Array} array The Array on which to replace.
         * @param {Number} index The index in the array at which to operate.
         * @param {Number} removeCount The number of items to remove at index.
         * @return {Array} The array passed.
         * @method
         */
        erase: erase,

        /**
         * Inserts items in to an array.
         *
         * @param {Array} array The Array in which to insert.
         * @param {Number} index The index in the array at which to operate.
         * @param {Array} items The array of items to insert at index.
         * @return {Array} The array passed.
         */
        insert: function (array, index, items) {
            return replace(array, index, 0, items);
        },

        /**
         * Replaces items in an array. This is functionally equivalent to the splice method
         * of Array, but works around bugs in IE8's splice method and is often more convenient
         * to call because it accepts an array of items to insert rather than use a variadic
         * argument list.
         *
         * @param {Array} array The Array on which to replace.
         * @param {Number} index The index in the array at which to operate.
         * @param {Number} removeCount The number of items to remove at index (can be 0).
         * @param {Array} insert (optional) An array of items to insert at index.
         * @return {Array} The array passed.
         * @method
         */
        replace: replace,

        /**
         * Replaces items in an array. This is equivalent to the splice method of Array, but
         * works around bugs in IE8's splice method. The signature is exactly the same as the
         * splice method except that the array is the first argument. All arguments following
         * removeCount are inserted in the array at index.
         *
         * @param {Array} array The Array on which to replace.
         * @param {Number} index The index in the array at which to operate.
         * @param {Number} removeCount The number of items to remove at index (can be 0).
         * @param {Object...} elements The elements to add to the array. If you don't specify
         * any elements, splice simply removes elements from the array.
         * @return {Array} An array containing the removed items.
         * @method
         */
        splice: splice,

        /**
         * Pushes new items onto the end of an Array.
         *
         * Passed parameters may be single items, or arrays of items. If an Array is found in the argument list, all its
         * elements are pushed into the end of the target Array.
         *
         * @param {Array} target The Array onto which to push new items
         * @param {Object...} elements The elements to add to the array. Each parameter may
         * be an Array, in which case all the elements of that Array will be pushed into the end of the
         * destination Array.
         * @return {Array} An array containing all the new items push onto the end.
         *
         */
        push: function (array) {
            var len = arguments.length,
                i = 1,
                newItem;

            if (array === undefined) {
                array = [];
            } else if (!Vmd.isArray(array)) {
                array = [array];
            }
            for (; i < len; i++) {
                newItem = arguments[i];
                Array.prototype.push[Vmd.isIterable(newItem) ? 'apply' : 'call'](array, newItem);
            }
            return array;
        }
    };

    /**
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#each
     */
    Vmd.each = ExtArray.each;

    /**
     * @method
     * @member Vmd.Array
     * @inheritdoc Vmd.Array#merge
     */
    ExtArray.union = ExtArray.merge;

    /**
     * Old alias to {@link Vmd.Array#min}
     * @deprecated 4.0.0 Use {@link Vmd.Array#min} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#min
     */
    Vmd.min = ExtArray.min;

    /**
     * Old alias to {@link Vmd.Array#max}
     * @deprecated 4.0.0 Use {@link Vmd.Array#max} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#max
     */
    Vmd.max = ExtArray.max;

    /**
     * Old alias to {@link Vmd.Array#sum}
     * @deprecated 4.0.0 Use {@link Vmd.Array#sum} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#sum
     */
    Vmd.sum = ExtArray.sum;

    /**
     * Old alias to {@link Vmd.Array#mean}
     * @deprecated 4.0.0 Use {@link Vmd.Array#mean} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#mean
     */
    Vmd.mean = ExtArray.mean;

    /**
     * Old alias to {@link Vmd.Array#flatten}
     * @deprecated 4.0.0 Use {@link Vmd.Array#flatten} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#flatten
     */
    Vmd.flatten = ExtArray.flatten;

    /**
     * Old alias to {@link Vmd.Array#clean}
     * @deprecated 4.0.0 Use {@link Vmd.Array#clean} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#clean
     */
    Vmd.clean = ExtArray.clean;

    /**
     * Old alias to {@link Vmd.Array#unique}
     * @deprecated 4.0.0 Use {@link Vmd.Array#unique} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#unique
     */
    Vmd.unique = ExtArray.unique;

    /**
     * Old alias to {@link Vmd.Array#pluck Vmd.Array.pluck}
     * @deprecated 4.0.0 Use {@link Vmd.Array#pluck Vmd.Array.pluck} instead
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#pluck
     */
    Vmd.pluck = ExtArray.pluck;

    /**
     * @method
     * @member Vmd
     * @inheritdoc Vmd.Array#toArray
     */
    Vmd.toArray = function () {
        return ExtArray.toArray.apply(ExtArray, arguments);
    };
}());

// @tag foundation,core
// @require Array.js
// @define Vmd.Function

/**
 * @class Vmd.Function
 *
 * A collection of useful static methods to deal with function callbacks
 * @singleton
 * @alternateClassName Vmd.util.Functions
 */
Vmd.Function = {

    /**
     * A very commonly used method throughout the framework. It acts as a wrapper around another method
     * which originally accepts 2 arguments for `name` and `value`.
     * The wrapped function then allows "flexible" value setting of either:
     *
     * - `name` and `value` as 2 arguments
     * - one single object argument with multiple key - value pairs
     *
     * For example:
     *
     *     var setValue = Vmd.Function.flexSetter(function(name, value) {
     *         this[name] = value;
     *     });
     *
     *     // Afterwards
     *     // Setting a single name - value
     *     setValue('name1', 'value1');
     *
     *     // Settings multiple name - value pairs
     *     setValue({
     *         name1: 'value1',
     *         name2: 'value2',
     *         name3: 'value3'
     *     });
     *
     * @param {Function} setter
     * @returns {Function} flexSetter
     */
    flexSetter: function (fn) {
        return function (a, b) {
            var k, i;

            if (a === null) {
                return this;
            }

            if (typeof a !== 'string') {
                for (k in a) {
                    if (a.hasOwnProperty(k)) {
                        fn.call(this, k, a[k]);
                    }
                }

                if (Vmd.enumerables) {
                    for (i = Vmd.enumerables.length; i--;) {
                        k = Vmd.enumerables[i];
                        if (a.hasOwnProperty(k)) {
                            fn.call(this, k, a[k]);
                        }
                    }
                }
            } else {
                fn.call(this, a, b);
            }

            return this;
        };
    },

    /**
     * Create a new function from the provided `fn`, change `this` to the provided scope, optionally
     * overrides arguments for the call. (Defaults to the arguments passed by the caller)
     *
     * {@link Vmd#bind Vmd.bind} is alias for {@link Vmd.Function#bind Vmd.Function.bind}
     *
     * @param {Function} fn The function to delegate.
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * **If omitted, defaults to the default global environment object (usually the browser window).**
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    bind: function (fn, scope, args, appendArgs) {
        if (arguments.length === 2) {
            return function () {
                return fn.apply(scope, arguments);
            };
        }

        var method = fn,
            slice = Array.prototype.slice;

        return function () {
            var callArgs = args || arguments;

            if (appendArgs === true) {
                callArgs = slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (typeof appendArgs == 'number') {
                callArgs = slice.call(arguments, 0); // copy arguments first
                Vmd.Array.insert(callArgs, appendArgs, args);
            }

            return method.apply(scope || Vmd.global, callArgs);
        };
    },

    /**
     * Create a new function from the provided `fn`, the arguments of which are pre-set to `args`.
     * New arguments passed to the newly created callback when it's invoked are appended after the pre-set ones.
     * This is especially useful when creating callbacks.
     *
     * For example:
     *
     *     var originalFunction = function(){
     *         alert(Vmd.Array.from(arguments).join(' '));
     *     };
     *
     *     var callback = Vmd.Function.pass(originalFunction, ['Hello', 'World']);
     *
     *     callback(); // alerts 'Hello World'
     *     callback('by Me'); // alerts 'Hello World by Me'
     *
     * {@link Vmd#pass Vmd.pass} is alias for {@link Vmd.Function#pass Vmd.Function.pass}
     *
     * @param {Function} fn The original function
     * @param {Array} args The arguments to pass to new callback
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * @return {Function} The new callback function
     */
    pass: function (fn, args, scope) {
        if (!Vmd.isArray(args)) {
            if (Vmd.isIterable(args)) {
                args = Vmd.Array.clone(args);
            } else {
                args = args !== undefined ? [args] : [];
            }
        }

        return function () {
            var fnArgs = [].concat(args);
            fnArgs.push.apply(fnArgs, arguments);
            return fn.apply(scope || this, fnArgs);
        };
    },

    /**
     * Create an alias to the provided method property with name `methodName` of `object`.
     * Note that the execution scope will still be bound to the provided `object` itself.
     *
     * @param {Object/Function} object
     * @param {String} methodName
     * @return {Function} aliasFn
     */
    alias: function (object, methodName) {
        return function () {
            return object[methodName].apply(object, arguments);
        };
    },

    /**
     * Create a "clone" of the provided method. The returned method will call the given
     * method passing along all arguments and the "this" pointer and return its result.
     *
     * @param {Function} method
     * @return {Function} cloneFn
     */
    clone: function (method) {
        return function () {
            return method.apply(this, arguments);
        };
    },

    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     sayHi('Fred'); // alerts "Hi, Fred"
     *
     *     // create a new function that validates input without
     *     // directly modifying the original function:
     *     var sayHiToFriend = Vmd.Function.createInterceptor(sayHi, function(name){
     *         return name == 'Brian';
     *     });
     *
     *     sayHiToFriend('Fred');  // no alert
     *     sayHiToFriend('Brian'); // alerts "Hi, Brian"
     *
     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to call before the original
     * @param {Object} [scope] The scope (`this` reference) in which the passed function is executed.
     * **If omitted, defaults to the scope in which the original function is called or the browser window.**
     * @param {Object} [returnValue=null] The value to return if the passed function return false.
     * @return {Function} The new function
     */
    createInterceptor: function (origFn, newFn, scope, returnValue) {
        var method = origFn;
        if (!Vmd.isFunction(newFn)) {
            return origFn;
        } else {
            returnValue = Vmd.isDefined(returnValue) ? returnValue : null;
            return function () {
                var me = this,
                    args = arguments;

                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || Vmd.global, args) !== false) ? origFn.apply(me || Vmd.global, args) : returnValue;
            };
        }
    },

    /**
     * Creates a delegate (callback) which, when called, executes after a specific delay.
     *
     * @param {Function} fn The function which will be called on a delay when the returned function is called.
     * Optionally, a replacement (or additional) argument list may be specified.
     * @param {Number} delay The number of milliseconds to defer execution by whenever called.
     * @param {Object} scope (optional) The scope (`this` reference) used by the function at execution time.
     * @param {Array} args (optional) Override arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position.
     * @return {Function} A function which, when called, executes the original function after the specified delay.
     */
    createDelayed: function (fn, delay, scope, args, appendArgs) {
        if (scope || args) {
            fn = Vmd.Function.bind(fn, scope, args, appendArgs);
        }

        return function () {
            var me = this,
                args = Array.prototype.slice.call(arguments);

            setTimeout(function () {
                fn.apply(me, args);
            }, delay);
        };
    },

    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     // executes immediately:
     *     sayHi('Fred');
     *
     *     // executes after 2 seconds:
     *     Vmd.Function.defer(sayHi, 2000, this, ['Fred']);
     *
     *     // this syntax is sometimes useful for deferring
     *     // execution of an anonymous function:
     *     Vmd.Function.defer(function(){
     *         alert('Anonymous');
     *     }, 100);
     *
     * {@link Vmd#defer Vmd.defer} is alias for {@link Vmd.Function#defer Vmd.Function.defer}
     *
     * @param {Function} fn The function to defer.
     * @param {Number} millis The number of milliseconds for the setTimeout call
     * (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (`this` reference) in which the function is executed.
     * **If omitted, defaults to the browser window.**
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer: function (fn, millis, scope, args, appendArgs) {
        fn = Vmd.Function.bind(fn, scope, args, appendArgs);
        if (millis > 0) {
            return setTimeout(Vmd.supports.TimeoutActualLateness ? function () {
                fn();
            } : fn, millis);
        }
        fn();
        return 0;
    },

    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     *
     *     var sayHi = function(name){
     *         alert('Hi, ' + name);
     *     }
     *
     *     sayHi('Fred'); // alerts "Hi, Fred"
     *
     *     var sayGoodbye = Vmd.Function.createSequence(sayHi, function(name){
     *         alert('Bye, ' + name);
     *     });
     *
     *     sayGoodbye('Fred'); // both alerts show
     *
     * @param {Function} originalFn The original function.
     * @param {Function} newFn The function to sequence
     * @param {Object} scope (optional) The scope (`this` reference) in which the passed function is executed.
     * If omitted, defaults to the scope in which the original function is called or the default global environment object (usually the browser window).
     * @return {Function} The new function
     */
    createSequence: function (originalFn, newFn, scope) {
        if (!newFn) {
            return originalFn;
        }
        else {
            return function () {
                var result = originalFn.apply(this, arguments);
                newFn.apply(scope || this, arguments);
                return result;
            };
        }
    },

    /**
     * Creates a delegate function, optionally with a bound scope which, when called, buffers
     * the execution of the passed function for the configured number of milliseconds.
     * If called again within that period, the impending invocation will be canceled, and the
     * timeout period will begin again.
     *
     * @param {Function} fn The function to invoke on a buffered timer.
     * @param {Number} buffer The number of milliseconds by which to buffer the invocation of the
     * function.
     * @param {Object} scope (optional) The scope (`this` reference) in which
     * the passed function is executed. If omitted, defaults to the scope specified by the caller.
     * @param {Array} args (optional) Override arguments for the call. Defaults to the arguments
     * passed by the caller.
     * @return {Function} A function which invokes the passed function after buffering for the specified time.
     */
    createBuffered: function (fn, buffer, scope, args) {
        var timerId;

        return function () {
            var callArgs = args || Array.prototype.slice.call(arguments, 0),
                me = scope || this;

            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(function () {
                fn.apply(me, callArgs);
            }, buffer);
        };
    },

    /**
     * Creates a throttled version of the passed function which, when called repeatedly and
     * rapidly, invokes the passed function only after a certain interval has elapsed since the
     * previous invocation.
     *
     * This is useful for wrapping functions which may be called repeatedly, such as
     * a handler of a mouse move event when the processing is expensive.
     *
     * @param {Function} fn The function to execute at a regular time interval.
     * @param {Number} interval The interval **in milliseconds** on which the passed function is executed.
     * @param {Object} scope (optional) The scope (`this` reference) in which
     * the passed function is executed. If omitted, defaults to the scope specified by the caller.
     * @returns {Function} A function which invokes the passed function at the specified interval.
     */
    createThrottled: function (fn, interval, scope) {
        var lastCallTime, elapsed, lastArgs, timer, execute = function () {
            fn.apply(scope || this, lastArgs);
            lastCallTime = Vmd.Date.now();
        };

        return function () {
            elapsed = Vmd.Date.now() - lastCallTime;
            lastArgs = arguments;

            clearTimeout(timer);
            if (!lastCallTime || (elapsed >= interval)) {
                execute();
            } else {
                timer = setTimeout(execute, interval - elapsed);
            }
        };
    },


    /**
     * Adds behavior to an existing method that is executed before the
     * original behavior of the function.  For example:
     * 
     *     var soup = {
     *         contents: [],
     *         add: function(ingredient) {
     *             this.contents.push(ingredient);
     *         }
     *     };
     *     Vmd.Function.interceptBefore(soup, "add", function(ingredient){
     *         if (!this.contents.length && ingredient !== "water") {
     *             // Always add water to start with
     *             this.contents.push("water");
     *         }
     *     });
     *     soup.add("onions");
     *     soup.add("salt");
     *     soup.contents; // will contain: water, onions, salt
     * 
     * @param {Object} object The target object
     * @param {String} methodName Name of the method to override
     * @param {Function} fn Function with the new behavior.  It will
     * be called with the same arguments as the original method.  The
     * return value of this function will be the return value of the
     * new method.
     * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
     * @return {Function} The new function just created.
     */
    interceptBefore: function (object, methodName, fn, scope) {
        var method = object[methodName] || Vmd.emptyFn;

        return (object[methodName] = function () {
            var ret = fn.apply(scope || this, arguments);
            method.apply(this, arguments);

            return ret;
        });
    },

    /**
     * Adds behavior to an existing method that is executed after the
     * original behavior of the function.  For example:
     * 
     *     var soup = {
     *         contents: [],
     *         add: function(ingredient) {
     *             this.contents.push(ingredient);
     *         }
     *     };
     *     Vmd.Function.interceptAfter(soup, "add", function(ingredient){
     *         // Always add a bit of extra salt
     *         this.contents.push("salt");
     *     });
     *     soup.add("water");
     *     soup.add("onions");
     *     soup.contents; // will contain: water, salt, onions, salt
     * 
     * @param {Object} object The target object
     * @param {String} methodName Name of the method to override
     * @param {Function} fn Function with the new behavior.  It will
     * be called with the same arguments as the original method.  The
     * return value of this function will be the return value of the
     * new method.
     * @param {Object} [scope] The scope to execute the interceptor function. Defaults to the object.
     * @return {Function} The new function just created.
     */
    interceptAfter: function (object, methodName, fn, scope) {
        var method = object[methodName] || Vmd.emptyFn;

        return (object[methodName] = function () {
            method.apply(this, arguments);
            return fn.apply(scope || this, arguments);
        });
    }
};

/**
 * @method
 * @member Vmd
 * @inheritdoc Vmd.Function#defer
 */
Vmd.defer = Vmd.Function.alias(Vmd.Function, 'defer');

/**
 * @method
 * @member Vmd
 * @inheritdoc Vmd.Function#pass
 */
Vmd.pass = Vmd.Function.alias(Vmd.Function, 'pass');

/**
 * @method
 * @member Vmd
 * @inheritdoc Vmd.Function#bind
 */
Vmd.bind = Vmd.Function.alias(Vmd.Function, 'bind');

// @tag foundation,core
// @require Function.js
// @define Vmd.Object

/**
 * @class Vmd.Object
 *
 * A collection of useful static methods to deal with objects.
 *
 * @singleton
 */

(function () {

    // The "constructor" for chain:
    var TemplateClass = function () { },
        ExtObject = Vmd.Object = {

            /**
             * Returns a new object with the given object as the prototype chain. This method is
             * designed to mimic the ECMA standard `Object.create` method and is assigned to that
             * function when it is available.
             * 
             * **NOTE** This method does not support the property definitions capability of the
             * `Object.create` method. Only the first argument is supported.
             * 
             * @param {Object} object The prototype chain for the new object.
             */
            chain: Object.create || function (object) {
                TemplateClass.prototype = object;
                var result = new TemplateClass();
                TemplateClass.prototype = null;
                return result;
            },

            /**
             * This method removes all keys from the given object.
             * @param {Object} object The object from which to remove all keys.
             * @return {Object} The given object.
             */
            clear: function (object) {
                var keys = ExtObject.getKeys(object),
                    n = keys.length;

                while (n--) {
                    delete object[keys[n]];
                }

                return object;
            },

            /**
             * Converts a `name` - `value` pair to an array of objects with support for nested structures. Useful to construct
             * query strings. For example:
             *
             *     var objects = Vmd.Object.toQueryObjects('hobbies', ['reading', 'cooking', 'swimming']);
             *
             *     // objects then equals:
             *     [
             *         { name: 'hobbies', value: 'reading' },
             *         { name: 'hobbies', value: 'cooking' },
             *         { name: 'hobbies', value: 'swimming' },
             *     ];
             *
             *     var objects = Vmd.Object.toQueryObjects('dateOfBirth', {
             *         day: 3,
             *         month: 8,
             *         year: 1987,
             *         extra: {
             *             hour: 4
             *             minute: 30
             *         }
             *     }, true); // Recursive
             *
             *     // objects then equals:
             *     [
             *         { name: 'dateOfBirth[day]', value: 3 },
             *         { name: 'dateOfBirth[month]', value: 8 },
             *         { name: 'dateOfBirth[year]', value: 1987 },
             *         { name: 'dateOfBirth[extra][hour]', value: 4 },
             *         { name: 'dateOfBirth[extra][minute]', value: 30 },
             *     ];
             *
             * @param {String} name
             * @param {Object/Array} value
             * @param {Boolean} [recursive=false] True to traverse object recursively
             * @return {Array}
             */
            toQueryObjects: function (name, value, recursive) {
                var self = ExtObject.toQueryObjects,
                    objects = [],
                    i, ln;

                if (Vmd.isArray(value)) {
                    for (i = 0, ln = value.length; i < ln; i++) {
                        if (recursive) {
                            objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                        }
                        else {
                            objects.push({
                                name: name,
                                value: value[i]
                            });
                        }
                    }
                }
                else if (Vmd.isObject(value)) {
                    for (i in value) {
                        if (value.hasOwnProperty(i)) {
                            if (recursive) {
                                objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                            }
                            else {
                                objects.push({
                                    name: name,
                                    value: value[i]
                                });
                            }
                        }
                    }
                }
                else {
                    objects.push({
                        name: name,
                        value: value
                    });
                }

                return objects;
            },

            /**
             * Takes an object and converts it to an encoded query string.
             *
             * Non-recursive:
             *
             *     Vmd.Object.toQueryString({foo: 1, bar: 2}); // returns "foo=1&bar=2"
             *     Vmd.Object.toQueryString({foo: null, bar: 2}); // returns "foo=&bar=2"
             *     Vmd.Object.toQueryString({'some price': '$300'}); // returns "some%20price=%24300"
             *     Vmd.Object.toQueryString({date: new Date(2011, 0, 1)}); // returns "date=%222011-01-01T00%3A00%3A00%22"
             *     Vmd.Object.toQueryString({colors: ['red', 'green', 'blue']}); // returns "colors=red&colors=green&colors=blue"
             *
             * Recursive:
             *
             *     Vmd.Object.toQueryString({
             *         username: 'Jacky',
             *         dateOfBirth: {
             *             day: 1,
             *             month: 2,
             *             year: 1911
             *         },
             *         hobbies: ['coding', 'eating', 'sleeping', ['nested', 'stuff']]
             *     }, true); // returns the following string (broken down and url-decoded for ease of reading purpose):
             *     // username=Jacky
             *     //    &dateOfBirth[day]=1&dateOfBirth[month]=2&dateOfBirth[year]=1911
             *     //    &hobbies[0]=coding&hobbies[1]=eating&hobbies[2]=sleeping&hobbies[3][0]=nested&hobbies[3][1]=stuff
             *
             * @param {Object} object The object to encode
             * @param {Boolean} [recursive=false] Whether or not to interpret the object in recursive format.
             * (PHP / Ruby on Rails servers and similar).
             * @return {String} queryString
             */
            toQueryString: function (object, recursive) {
                var paramObjects = [],
                    params = [],
                    i, j, ln, paramObject, value;

                for (i in object) {
                    if (object.hasOwnProperty(i)) {
                        paramObjects = paramObjects.concat(ExtObject.toQueryObjects(i, object[i], recursive));
                    }
                }

                for (j = 0, ln = paramObjects.length; j < ln; j++) {
                    paramObject = paramObjects[j];
                    value = paramObject.value;

                    if (Vmd.isEmpty(value)) {
                        value = '';
                    } else if (Vmd.isDate(value)) {
                        value = Vmd.Date.toString(value);
                    }

                    params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
                }

                return params.join('&');
            },

            /**
             * Converts a query string back into an object.
             *
             * Non-recursive:
             *
             *     Vmd.Object.fromQueryString("foo=1&bar=2"); // returns {foo: '1', bar: '2'}
             *     Vmd.Object.fromQueryString("foo=&bar=2"); // returns {foo: null, bar: '2'}
             *     Vmd.Object.fromQueryString("some%20price=%24300"); // returns {'some price': '$300'}
             *     Vmd.Object.fromQueryString("colors=red&colors=green&colors=blue"); // returns {colors: ['red', 'green', 'blue']}
             *
             * Recursive:
             *
             *     Vmd.Object.fromQueryString(
             *         "username=Jacky&"+
             *         "dateOfBirth[day]=1&dateOfBirth[month]=2&dateOfBirth[year]=1911&"+
             *         "hobbies[0]=coding&hobbies[1]=eating&hobbies[2]=sleeping&"+
             *         "hobbies[3][0]=nested&hobbies[3][1]=stuff", true);
             *
             *     // returns
             *     {
             *         username: 'Jacky',
             *         dateOfBirth: {
             *             day: '1',
             *             month: '2',
             *             year: '1911'
             *         },
             *         hobbies: ['coding', 'eating', 'sleeping', ['nested', 'stuff']]
             *     }
             *
             * @param {String} queryString The query string to decode
             * @param {Boolean} [recursive=false] Whether or not to recursively decode the string. This format is supported by
             * PHP / Ruby on Rails servers and similar.
             * @return {Object}
             */
            fromQueryString: function (queryString, recursive) {
                var parts = queryString.replace(/^\?/, '').split('&'),
                    object = {},
                    temp, components, name, value, i, ln,
                    part, j, subLn, matchedKeys, matchedName,
                    keys, key, nextKey;

                for (i = 0, ln = parts.length; i < ln; i++) {
                    part = parts[i];

                    if (part.length > 0) {
                        components = part.split('=');
                        name = decodeURIComponent(components[0]);
                        value = (components[1] !== undefined) ? decodeURIComponent(components[1]) : '';

                        if (!recursive) {
                            if (object.hasOwnProperty(name)) {
                                if (!Vmd.isArray(object[name])) {
                                    object[name] = [object[name]];
                                }

                                object[name].push(value);
                            }
                            else {
                                object[name] = value;
                            }
                        }
                        else {
                            matchedKeys = name.match(/(\[):?([^\]]*)\]/g);
                            matchedName = name.match(/^([^\[]+)/);

                            if (!matchedName) {
                                throw new Error('[Vmd.Object.fromQueryString] Malformed query string given, failed parsing name from "' + part + '"');
                            }

                            name = matchedName[0];
                            keys = [];

                            if (matchedKeys === null) {
                                object[name] = value;
                                continue;
                            }

                            for (j = 0, subLn = matchedKeys.length; j < subLn; j++) {
                                key = matchedKeys[j];
                                key = (key.length === 2) ? '' : key.substring(1, key.length - 1);
                                keys.push(key);
                            }

                            keys.unshift(name);

                            temp = object;

                            for (j = 0, subLn = keys.length; j < subLn; j++) {
                                key = keys[j];

                                if (j === subLn - 1) {
                                    if (Vmd.isArray(temp) && key === '') {
                                        temp.push(value);
                                    }
                                    else {
                                        temp[key] = value;
                                    }
                                }
                                else {
                                    if (temp[key] === undefined || typeof temp[key] === 'string') {
                                        nextKey = keys[j + 1];

                                        temp[key] = (Vmd.isNumeric(nextKey) || nextKey === '') ? [] : {};
                                    }

                                    temp = temp[key];
                                }
                            }
                        }
                    }
                }

                return object;
            },

            /**
             * Iterates through an object and invokes the given callback function for each iteration.
             * The iteration can be stopped by returning `false` in the callback function. For example:
             *
             *     var person = {
             *         name: 'Jacky'
             *         hairColor: 'black'
             *         loves: ['food', 'sleeping', 'wife']
             *     };
             *
             *     Vmd.Object.each(person, function(key, value, myself) {
             *         console.log(key + ":" + value);
             *
             *         if (key === 'hairColor') {
             *             return false; // stop the iteration
             *         }
             *     });
             *
             * @param {Object} object The object to iterate
             * @param {Function} fn The callback function.
             * @param {String} fn.key
             * @param {Object} fn.value
             * @param {Object} fn.object The object itself
             * @param {Object} [scope] The execution scope (`this`) of the callback function
             */
            each: function (object, fn, scope) {
                for (var property in object) {
                    if (object.hasOwnProperty(property)) {
                        if (fn.call(scope || object, property, object[property], object) === false) {
                            return;
                        }
                    }
                }
            },

            /**
             * Merges any number of objects recursively without referencing them or their children.
             *
             *     var extjs = {
             *         companyName: 'Vmd JS',
             *         products: ['Vmd JS', 'Vmd GWT', 'Vmd Designer'],
             *         isSuperCool: true,
             *         office: {
             *             size: 2000,
             *             location: 'Palo Alto',
             *             isFun: true
             *         }
             *     };
             *
             *     var newStuff = {
             *         companyName: 'Sencha Inc.',
             *         products: ['Vmd JS', 'Vmd GWT', 'Vmd Designer', 'Sencha Touch', 'Sencha Animator'],
             *         office: {
             *             size: 40000,
             *             location: 'Redwood City'
             *         }
             *     };
             *
             *     var sencha = Vmd.Object.merge(extjs, newStuff);
             *
             *     // extjs and sencha then equals to
             *     {
             *         companyName: 'Sencha Inc.',
             *         products: ['Vmd JS', 'Vmd GWT', 'Vmd Designer', 'Sencha Touch', 'Sencha Animator'],
             *         isSuperCool: true,
             *         office: {
             *             size: 40000,
             *             location: 'Redwood City',
             *             isFun: true
             *         }
             *     }
             *
             * @param {Object} destination The object into which all subsequent objects are merged.
             * @param {Object...} object Any number of objects to merge into the destination.
             * @return {Object} merged The destination object with all passed objects merged in.
             */
            merge: function (destination) {
                var i = 1,
                    ln = arguments.length,
                    mergeFn = ExtObject.merge,
                    cloneFn = Vmd.clone,
                    object, key, value, sourceKey;

                for (; i < ln; i++) {
                    object = arguments[i];

                    for (key in object) {
                        value = object[key];
                        if (value && value.constructor === Object) {
                            sourceKey = destination[key];
                            if (sourceKey && sourceKey.constructor === Object) {
                                mergeFn(sourceKey, value);
                            }
                            else {
                                destination[key] = cloneFn(value);
                            }
                        }
                        else {
                            destination[key] = value;
                        }
                    }
                }

                return destination;
            },

            /**
             * @private
             * @param destination
             */
            mergeIf: function (destination) {
                var i = 1,
                    ln = arguments.length,
                    cloneFn = Vmd.clone,
                    object, key, value;

                for (; i < ln; i++) {
                    object = arguments[i];

                    for (key in object) {
                        if (!(key in destination)) {
                            value = object[key];

                            if (value && value.constructor === Object) {
                                destination[key] = cloneFn(value);
                            }
                            else {
                                destination[key] = value;
                            }
                        }
                    }
                }

                return destination;
            },

            /**
             * Returns the first matching key corresponding to the given value.
             * If no matching value is found, null is returned.
             *
             *     var person = {
             *         name: 'Jacky',
             *         loves: 'food'
             *     };
             *
             *     alert(Vmd.Object.getKey(person, 'food')); // alerts 'loves'
             *
             * @param {Object} object
             * @param {Object} value The value to find
             */
            getKey: function (object, value) {
                for (var property in object) {
                    if (object.hasOwnProperty(property) && object[property] === value) {
                        return property;
                    }
                }

                return null;
            },

            /**
             * Gets all values of the given object as an array.
             *
             *     var values = Vmd.Object.getValues({
             *         name: 'Jacky',
             *         loves: 'food'
             *     }); // ['Jacky', 'food']
             *
             * @param {Object} object
             * @return {Array} An array of values from the object
             */
            getValues: function (object) {
                var values = [],
                    property;

                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        values.push(object[property]);
                    }
                }

                return values;
            },

            /**
             * Gets all keys of the given object as an array.
             *
             *     var values = Vmd.Object.getKeys({
             *         name: 'Jacky',
             *         loves: 'food'
             *     }); // ['name', 'loves']
             *
             * @param {Object} object
             * @return {String[]} An array of keys from the object
             * @method
             */
            getKeys: (typeof Object.keys == 'function')
                ? function (object) {
                    if (!object) {
                        return [];
                    }
                    return Object.keys(object);
                }
                : function (object) {
                    var keys = [],
                        property;

                    for (property in object) {
                        if (object.hasOwnProperty(property)) {
                            keys.push(property);
                        }
                    }

                    return keys;
                },

            /**
             * Gets the total number of this object's own properties
             *
             *     var size = Vmd.Object.getSize({
             *         name: 'Jacky',
             *         loves: 'food'
             *     }); // size equals 2
             *
             * @param {Object} object
             * @return {Number} size
             */
            getSize: function (object) {
                var size = 0,
                    property;

                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        size++;
                    }
                }

                return size;
            },

            /**
             * Checks if there are any properties on this object.
             * @param {Object} object
             * @return {Boolean} `true` if there no properties on the object.
             */
            isEmpty: function (object) {
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        return false;
                    }
                }
                return true;
            },

            /**
             * Shallow compares the contents of 2 objects using strict equality. Objects are
             * considered equal if they both have the same set of properties and the
             * value for those properties equals the other in the corresponding object.
             * 
             *     // Returns true
             *     Vmd.Object.equals({
             *         foo: 1,
             *         bar: 2
             *     }, {
             *         foo: 1,
             *         bar: 2
             *     });
             * 
             * @param {Object} object1
             * @param {Object} object2
             * @return {Boolean} `true` if the objects are equal.
             */
            equals: (function () {
                var check = function (o1, o2) {
                    var key;

                    for (key in o1) {
                        if (o1.hasOwnProperty(key)) {
                            if (o1[key] !== o2[key]) {
                                return false;
                            }
                        }
                    }
                    return true;
                };

                return function (object1, object2) {

                    // Short circuit if the same object is passed twice
                    if (object1 === object2) {
                        return true;
                    } if (object1 && object2) {
                        // Do the second check because we could have extra keys in
                        // object2 that don't exist in object1.
                        return check(object1, object2) && check(object2, object1);
                    } else if (!object1 && !object2) {
                        return object1 === object2;
                    } else {
                        return false;
                    }
                };
            })(),

            /**
             * @private
             */
            classify: function (object) {
                var prototype = object,
                    objectProperties = [],
                    propertyClassesMap = {},
                    objectClass = function () {
                        var i = 0,
                            ln = objectProperties.length,
                            property;

                        for (; i < ln; i++) {
                            property = objectProperties[i];
                            this[property] = new propertyClassesMap[property]();
                        }
                    },
                    key, value;

                for (key in object) {
                    if (object.hasOwnProperty(key)) {
                        value = object[key];

                        if (value && value.constructor === Object) {
                            objectProperties.push(key);
                            propertyClassesMap[key] = ExtObject.classify(value);
                        }
                    }
                }

                objectClass.prototype = prototype;

                return objectClass;
            }
        };

    /**
     * A convenient alias method for {@link Vmd.Object#merge}.
     *
     * @member Vmd
     * @method merge
     * @inheritdoc Vmd.Object#merge
     */
    Vmd.merge = Vmd.Object.merge;

    /**
     * @private
     * @member Vmd
     */
    Vmd.mergeIf = Vmd.Object.mergeIf;

    /**
     *
     * @member Vmd
     * @method urlEncode
     * @inheritdoc Vmd.Object#toQueryString
     * @deprecated 4.0.0 Use {@link Vmd.Object#toQueryString} instead
     */
    Vmd.urlEncode = function () {
        var args = Vmd.Array.from(arguments),
            prefix = '';

        // Support for the old `pre` argument
        if ((typeof args[1] === 'string')) {
            prefix = args[1] + '&';
            args[1] = false;
        }

        return prefix + ExtObject.toQueryString.apply(ExtObject, args);
    };

    /**
     * Alias for {@link Vmd.Object#fromQueryString}.
     *
     * @member Vmd
     * @method urlDecode
     * @inheritdoc Vmd.Object#fromQueryString
     * @deprecated 4.0.0 Use {@link Vmd.Object#fromQueryString} instead
     */
    Vmd.urlDecode = function () {
        return ExtObject.fromQueryString.apply(ExtObject, arguments);
    };

}());


/****************************扩展动态加载及class结构定义****************************************/



/**
*@class Vmd.Base
**/
(function (flexSetter) {

    var noArgs = [],
        Base = function () { },
        hookFunctionFactory = function (hookFunction, underriddenFunction, methodName, owningClass) {
            var result = function () {
                var result = this.callParent(arguments);
                hookFunction.apply(this, arguments);
                return result;
            };
            result.$name = methodName;
            result.$owner = owningClass;
            if (underriddenFunction) {
                result.$previous = underriddenFunction.$previous;
                underriddenFunction.$previous = result;
            }
            return result;
        };

    // These static properties will be copied to every newly created class with {@link Vmd#define}
    Vmd.apply(Base, {
        $className: 'Vmd.Base',

        $isClass: true,

        /**
         * Create a new instance of this Class.
         *
         *     Vmd.define('My.cool.Class', {
         *         ...
         *     });
         *
         *     My.cool.Class.create({
         *         someConfig: true
         *     });
         *
         * All parameters are passed to the constructor of the class.
         *
         * @return {Object} the created instance.
         * @static
         * @inheritable
         */
        create: function () {
            return Vmd.create.apply(Vmd, [this].concat(Array.prototype.slice.call(arguments, 0)));
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param config
         */
        extend: function (parent) {
            var parentPrototype = parent.prototype,
                basePrototype, prototype, i, ln, name, statics;

            prototype = this.prototype = Vmd.Object.chain(parentPrototype);
            prototype.self = this;

            this.superclass = prototype.superclass = parentPrototype;


            //mafei
            if (parentPrototype.constructor == Object.prototype.constructor) {
                parentPrototype.constructor = parent;
            }
            if (!parent.$isClass) {
                basePrototype = Vmd.Base.prototype;

                for (i in basePrototype) {
                    if (i in prototype) {
                        prototype[i] = basePrototype[i];
                    }
                }
            }

            //<feature classSystem.inheritableStatics>
            // Statics inheritance
            statics = parentPrototype.$inheritableStatics;

            if (statics) {
                for (i = 0, ln = statics.length; i < ln; i++) {
                    name = statics[i];

                    if (!this.hasOwnProperty(name)) {
                        this[name] = parent[name];
                    }
                }
            }
            //</feature>

            if (parent.$onExtended) {
                this.$onExtended = parent.$onExtended.slice();
            }

            //<feature classSystem.config>
            prototype.config = new prototype.configClass();
            prototype.initConfigList = prototype.initConfigList.slice();
            prototype.initConfigMap = Vmd.clone(prototype.initConfigMap);
            prototype.configMap = Vmd.Object.chain(prototype.configMap);
            //</feature>
        },

        /**
         * @private
         * @static
         * @inheritable
         */
        $onExtended: [],

        /**
         * @private
         * @static
         * @inheritable
         */
        triggerExtended: function () {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(this, 'Vmd.Base#triggerExtended', arguments);
            //</debug>

            var callbacks = this.$onExtended,
                ln = callbacks.length,
                i, callback;

            if (ln > 0) {
                for (i = 0; i < ln; i++) {
                    callback = callbacks[i];
                    callback.fn.apply(callback.scope || this, arguments);
                }
            }
        },

        /**
         * @private
         * @static
         * @inheritable
         */
        onExtended: function (fn, scope) {
            this.$onExtended.push({
                fn: fn,
                scope: scope
            });

            return this;
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param config
         */
        addConfig: function (config, fullMerge) {
            var prototype = this.prototype,
                configNameCache = Vmd.Class.configNameCache,
                hasConfig = prototype.configMap,
                initConfigList = prototype.initConfigList,
                initConfigMap = prototype.initConfigMap,
                defaultConfig = prototype.config,
                initializedName, name, value;

            for (name in config) {
                if (config.hasOwnProperty(name)) {
                    if (!hasConfig[name]) {
                        hasConfig[name] = true;
                    }

                    value = config[name];

                    initializedName = configNameCache[name].initialized;

                    if (!initConfigMap[name] && value !== null && !prototype[initializedName]) {
                        initConfigMap[name] = true;
                        initConfigList.push(name);
                    }
                }
            }

            if (fullMerge) {
                Vmd.merge(defaultConfig, config);
            }
            else {
                Vmd.mergeIf(defaultConfig, config);
            }

            prototype.configClass = Vmd.Object.classify(defaultConfig);
        },

        /**
         * Add / override static properties of this class.
         *
         *     Vmd.define('My.cool.Class', {
         *         ...
         *     });
         *
         *     My.cool.Class.addStatics({
         *         someProperty: 'someValue',      // My.cool.Class.someProperty = 'someValue'
         *         method1: function() { ... },    // My.cool.Class.method1 = function() { ... };
         *         method2: function() { ... }     // My.cool.Class.method2 = function() { ... };
         *     });
         *
         * @param {Object} members
         * @return {Vmd.Base} this
         * @static
         * @inheritable
         */
        addStatics: function (members) {
            var member, name;

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    if (typeof member == 'function' && !member.$isClass && member !== Vmd.emptyFn && member !== Vmd.identityFn) {
                        member.$owner = this;
                        member.$name = name;
                        //<debug>
                        member.displayName = Vmd.getClassName(this) + '.' + name;
                        //</debug>
                    }
                    this[name] = member;
                }
            }

            return this;
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param {Object} members
         */
        addInheritableStatics: function (members) {
            var inheritableStatics,
                hasInheritableStatics,
                prototype = this.prototype,
                name, member;

            inheritableStatics = prototype.$inheritableStatics;
            hasInheritableStatics = prototype.$hasInheritableStatics;

            if (!inheritableStatics) {
                inheritableStatics = prototype.$inheritableStatics = [];
                hasInheritableStatics = prototype.$hasInheritableStatics = {};
            }

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    //<debug>
                    if (typeof member == 'function') {
                        member.displayName = Vmd.getClassName(this) + '.' + name;
                    }
                    //</debug>
                    this[name] = member;

                    if (!hasInheritableStatics[name]) {
                        hasInheritableStatics[name] = true;
                        inheritableStatics.push(name);
                    }
                }
            }

            return this;
        },

        /**
         * Add methods / properties to the prototype of this class.
         *
         *     Vmd.define('My.awesome.Cat', {
         *         constructor: function() {
         *             ...
         *         }
         *     });
         *
         *      My.awesome.Cat.addMembers({
         *          meow: function() {
         *             alert('Meowww...');
         *          }
         *      });
         *
         *      var kitty = new My.awesome.Cat;
         *      kitty.meow();
         *
         * @param {Object} members
         * @static
         * @inheritable
         */
        addMembers: function (members) {
            var prototype = this.prototype,
                enumerables = Vmd.enumerables,
                names = [],
                i, ln, name, member;

            for (name in members) {
                names.push(name);
            }

            if (enumerables) {
                names.push.apply(names, enumerables);
            }

            for (i = 0, ln = names.length; i < ln; i++) {
                name = names[i];

                if (members.hasOwnProperty(name)) {
                    member = members[name];

                    if (typeof member == 'function' && !member.$isClass && member !== Vmd.emptyFn && member !== Vmd.identityFn) {
                        member.$owner = this;
                        member.$name = name;
                        //<debug>
                        member.displayName = (this.$className || '') + '#' + name;
                        //</debug>
                    }

                    prototype[name] = member;
                }
            }

            return this;
        },

        /**
         * @private
         * @static
         * @inheritable
         * @param name
         * @param member
         */
        addMember: function (name, member) {
            if (typeof member == 'function' && !member.$isClass && member !== Vmd.emptyFn && member !== Vmd.identityFn) {
                member.$owner = this;
                member.$name = name;
                //<debug>
                member.displayName = (this.$className || '') + '#' + name;
                //</debug>
            }

            this.prototype[name] = member;
            return this;
        },

        /**
         * Adds members to class.
         * @static
         * @inheritable
         * @deprecated 4.1 Use {@link #addMembers} instead.
         */
        implement: function () {
            this.addMembers.apply(this, arguments);
        },

        /**
         * Borrow another class' members to the prototype of this class.
         *
         *     Vmd.define('Bank', {
         *         money: '$$$',
         *         printMoney: function() {
         *             alert('$$$$$$$');
         *         }
         *     });
         *
         *     Vmd.define('Thief', {
         *         ...
         *     });
         *
         *     Thief.borrow(Bank, ['money', 'printMoney']);
         *
         *     var steve = new Thief();
         *
         *     alert(steve.money); // alerts '$$$'
         *     steve.printMoney(); // alerts '$$$$$$$'
         *
         * @param {Vmd.Base} fromClass The class to borrow members from
         * @param {Array/String} members The names of the members to borrow
         * @return {Vmd.Base} this
         * @static
         * @inheritable
         * @private
         */
        borrow: function (fromClass, members) {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(this, 'Vmd.Base#borrow', arguments);
            //</debug>

            var prototype = this.prototype,
                fromPrototype = fromClass.prototype,
                //<debug>
                className = Vmd.getClassName(this),
                //</debug>
                i, ln, name, fn, toBorrow;

            members = Vmd.Array.from(members);

            for (i = 0, ln = members.length; i < ln; i++) {
                name = members[i];

                toBorrow = fromPrototype[name];

                if (typeof toBorrow == 'function') {
                    fn = Vmd.Function.clone(toBorrow);

                    //<debug>
                    if (className) {
                        fn.displayName = className + '#' + name;
                    }
                    //</debug>

                    fn.$owner = this;
                    fn.$name = name;

                    prototype[name] = fn;
                }
                else {
                    prototype[name] = toBorrow;
                }
            }

            return this;
        },

        /**
         * Override members of this class. Overridden methods can be invoked via
         * {@link Vmd.Base#callParent}.
         *
         *     Vmd.define('My.Cat', {
         *         constructor: function() {
         *             alert("I'm a cat!");
         *         }
         *     });
         *
         *     My.Cat.override({
         *         constructor: function() {
         *             alert("I'm going to be a cat!");
         *
         *             this.callParent(arguments);
         *
         *             alert("Meeeeoooowwww");
         *         }
         *     });
         *
         *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
         *                               // alerts "I'm a cat!"
         *                               // alerts "Meeeeoooowwww"
         *
         * As of 4.1, direct use of this method is deprecated. Use {@link Vmd#define Vmd.define}
         * instead:
         *
         *     Vmd.define('My.CatOverride', {
         *         override: 'My.Cat',
         *         constructor: function() {
         *             alert("I'm going to be a cat!");
         *
         *             this.callParent(arguments);
         *
         *             alert("Meeeeoooowwww");
         *         }
         *     });
         *
         * The above accomplishes the same result but can be managed by the {@link Vmd.Loader}
         * which can properly order the override and its target class and the build process
         * can determine whether the override is needed based on the required state of the
         * target class (My.Cat).
         *
         * @param {Object} members The properties to add to this class. This should be
         * specified as an object literal containing one or more properties.
         * @return {Vmd.Base} this class
         * @static
         * @inheritable
         * @markdown
         * @deprecated 4.1.0 Use {@link Vmd#define Vmd.define} instead
         */
        override: function (members) {
            var me = this,
                enumerables = Vmd.enumerables,
                target = me.prototype,
                cloneFunction = Vmd.Function.clone,
                name, index, member, statics, names, previous;

            if (arguments.length === 2) {
                name = members;
                members = {};
                members[name] = arguments[1];
                enumerables = null;
            }

            do {
                names = []; // clean slate for prototype (1st pass) and static (2nd pass)
                statics = null; // not needed 1st pass, but needs to be cleared for 2nd pass

                for (name in members) { // hasOwnProperty is checked in the next loop...
                    if (name == 'statics') {
                        statics = members[name];
                    } else if (name == 'inheritableStatics') {
                        me.addInheritableStatics(members[name]);
                    } else if (name == 'config') {
                        me.addConfig(members[name], true);
                    } else {
                        names.push(name);
                    }
                }

                if (enumerables) {
                    names.push.apply(names, enumerables);
                }

                for (index = names.length; index--;) {
                    name = names[index];

                    if (members.hasOwnProperty(name)) {
                        member = members[name];

                        if (typeof member == 'function' && !member.$className && member !== Vmd.emptyFn && member !== Vmd.identityFn) {
                            if (typeof member.$owner != 'undefined') {
                                member = cloneFunction(member);
                            }

                            //<debug>
                            if (me.$className) {
                                member.displayName = me.$className + '#' + name;
                            }
                            //</debug>

                            member.$owner = me;
                            member.$name = name;

                            previous = target.hasOwnProperty(name) && target[name];
                            if (previous) {
                                member.$previous = previous;
                            }
                        }

                        target[name] = member;
                    }
                }

                target = me; // 2nd pass is for statics
                members = statics; // statics will be null on 2nd pass
            } while (members);

            return this;
        },

        // Documented downwards
        callParent: function (args) {
            var method;

            // This code is intentionally inlined for the least number of debugger stepping
            return (method = this.callParent.caller) && (method.$previous ||
                  ((method = method.$owner ? method : method.caller) &&
                        method.$owner.superclass.self[method.$name])).apply(this, args || noArgs);
        },

        // Documented downwards
        callSuper: function (args) {
            var method;

            // This code is intentionally inlined for the least number of debugger stepping
            return (method = this.callSuper.caller) &&
                    ((method = method.$owner ? method : method.caller) &&
                      method.$owner.superclass.self[method.$name]).apply(this, args || noArgs);
        },

        //<feature classSystem.mixins>
        /**
         * Used internally by the mixins pre-processor
         * @private
         * @static
         * @inheritable
         */
        mixin: function (name, mixinClass) {
            var me = this,
                mixin = mixinClass.prototype,
                prototype = me.prototype,
                key, statics, i, ln, staticName,
                mixinValue, hookKey, hookFunction;

            if (typeof mixin.onClassMixedIn != 'undefined') {
                mixin.onClassMixedIn.call(mixinClass, me);
            }

            if (!prototype.hasOwnProperty('mixins')) {
                if ('mixins' in prototype) {
                    prototype.mixins = Vmd.Object.chain(prototype.mixins);
                }
                else {
                    prototype.mixins = {};
                }
            }

            for (key in mixin) {
                mixinValue = mixin[key];
                if (key === 'mixins') {
                    Vmd.merge(prototype.mixins, mixinValue);
                }
                else if (key === 'xhooks') {
                    for (hookKey in mixinValue) {
                        hookFunction = mixinValue[hookKey];

                        // Mixed in xhook methods cannot call a parent.
                        hookFunction.$previous = Vmd.emptyFn;

                        if (prototype.hasOwnProperty(hookKey)) {

                            // Pass the hook function, and the existing function which it is to underride.
                            // The existing function has its $previous pointer replaced by a closure
                            // which calls the hookFunction and then the existing function's original $previous
                            hookFunctionFactory(hookFunction, prototype[hookKey], hookKey, me);
                        } else {
                            // There's no original function, so generate an implementation which calls
                            // the hook function. It will not get any $previous pointer.
                            prototype[hookKey] = hookFunctionFactory(hookFunction, null, hookKey, me);
                        }
                    }
                }
                else if (!(key === 'mixinId' || key === 'config') && (prototype[key] === undefined)) {
                    prototype[key] = mixinValue;
                }
            }

            //<feature classSystem.inheritableStatics>
            // Mixin statics inheritance
            statics = mixin.$inheritableStatics;

            if (statics) {
                for (i = 0, ln = statics.length; i < ln; i++) {
                    staticName = statics[i];

                    if (!me.hasOwnProperty(staticName)) {
                        me[staticName] = mixinClass[staticName];
                    }
                }
            }
            //</feature>

            //<feature classSystem.config>
            if ('config' in mixin) {
                me.addConfig(mixin.config, false);
            }
            //</feature>

            prototype.mixins[name] = mixin;
            return me;
        },
        //</feature>

        /**
         * Get the current class' name in string format.
         *
         *     Vmd.define('My.cool.Class', {
         *         constructor: function() {
         *             alert(this.self.getName()); // alerts 'My.cool.Class'
         *         }
         *     });
         *
         *     My.cool.Class.getName(); // 'My.cool.Class'
         *
         * @return {String} className
         * @static
         * @inheritable
         */
        getName: function () {
            return Vmd.getClassName(this);
        },

        /**
         * Create aliases for existing prototype methods. Example:
         *
         *     Vmd.define('My.cool.Class', {
         *         method1: function() { ... },
         *         method2: function() { ... }
         *     });
         *
         *     var test = new My.cool.Class();
         *
         *     My.cool.Class.createAlias({
         *         method3: 'method1',
         *         method4: 'method2'
         *     });
         *
         *     test.method3(); // test.method1()
         *
         *     My.cool.Class.createAlias('method5', 'method3');
         *
         *     test.method5(); // test.method3() -> test.method1()
         *
         * @param {String/Object} alias The new method name, or an object to set multiple aliases. See
         * {@link Vmd.Function#flexSetter flexSetter}
         * @param {String/Object} origin The original method name
         * @static
         * @inheritable
         * @method
         */
        createAlias: flexSetter(function (alias, origin) {
            this.override(alias, function () {
                return this[origin].apply(this, arguments);
            });
        }),

        /**
         * @private
         * @static
         * @inheritable
         */
        addXtype: function (xtype) {
            var prototype = this.prototype,
                xtypesMap = prototype.xtypesMap,
                xtypes = prototype.xtypes,
                xtypesChain = prototype.xtypesChain;

            if (!prototype.hasOwnProperty('xtypesMap')) {
                xtypesMap = prototype.xtypesMap = Vmd.merge({}, prototype.xtypesMap || {});
                xtypes = prototype.xtypes = prototype.xtypes ? [].concat(prototype.xtypes) : [];
                xtypesChain = prototype.xtypesChain = prototype.xtypesChain ? [].concat(prototype.xtypesChain) : [];
                prototype.xtype = xtype;
            }

            if (!xtypesMap[xtype]) {
                xtypesMap[xtype] = true;
                xtypes.push(xtype);
                xtypesChain.push(xtype);
                Vmd.ClassManager.setAlias(this, 'widget.' + xtype);
            }

            return this;
        }
    });

    Base.implement({
        /** @private */
        isInstance: true,

        /** @private */
        $className: 'Vmd.Base',

        /** @private */
        configClass: Vmd.emptyFn,

        /** @private */
        initConfigList: [],

        /** @private */
        configMap: {},

        /** @private */
        initConfigMap: {},

        /**
         * Get the reference to the class from which this object was instantiated. Note that unlike {@link Vmd.Base#self},
         * `this.statics()` is scope-independent and it always returns the class from which it was called, regardless of what
         * `this` points to during run-time
         *
         *     Vmd.define('My.Cat', {
         *         statics: {
         *             totalCreated: 0,
         *             speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
         *         },
         *
         *         constructor: function() {
         *             var statics = this.statics();
         *
         *             alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to
         *                                             // equivalent to: My.Cat.speciesName
         *
         *             alert(this.self.speciesName);   // dependent on 'this'
         *
         *             statics.totalCreated++;
         *         },
         *
         *         clone: function() {
         *             var cloned = new this.self;                      // dependent on 'this'
         *
         *             cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName
         *
         *             return cloned;
         *         }
         *     });
         *
         *
         *     Vmd.define('My.SnowLeopard', {
         *         extend: 'My.Cat',
         *
         *         statics: {
         *             speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'
         *         },
         *
         *         constructor: function() {
         *             this.callParent();
         *         }
         *     });
         *
         *     var cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'
         *
         *     var snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'
         *
         *     var clone = snowLeopard.clone();
         *     alert(Vmd.getClassName(clone));         // alerts 'My.SnowLeopard'
         *     alert(clone.groupName);                 // alerts 'Cat'
         *
         *     alert(My.Cat.totalCreated);             // alerts 3
         *
         * @protected
         * @return {Vmd.Class}
         */
        statics: function () {
            var method = this.statics.caller,
                self = this.self;

            if (!method) {
                return self;
            }

            return method.$owner;
        },

        /**
         * Call the "parent" method of the current method. That is the method previously
         * overridden by derivation or by an override (see {@link Vmd#define}).
         *
         *      Vmd.define('My.Base', {
         *          constructor: function (x) {
         *              this.x = x;
         *          },
         *
         *          statics: {
         *              method: function (x) {
         *                  return x;
         *              }
         *          }
         *      });
         *
         *      Vmd.define('My.Derived', {
         *          extend: 'My.Base',
         *
         *          constructor: function () {
         *              this.callParent([21]);
         *          }
         *      });
         *
         *      var obj = new My.Derived();
         *
         *      alert(obj.x);  // alerts 21
         *
         * This can be used with an override as follows:
         *
         *      Vmd.define('My.DerivedOverride', {
         *          override: 'My.Derived',
         *
         *          constructor: function (x) {
         *              this.callParent([x*2]); // calls original My.Derived constructor
         *          }
         *      });
         *
         *      var obj = new My.Derived();
         *
         *      alert(obj.x);  // now alerts 42
         *
         * This also works with static methods.
         *
         *      Vmd.define('My.Derived2', {
         *          extend: 'My.Base',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x*2]); // calls My.Base.method
         *              }
         *          }
         *      });
         *
         *      alert(My.Base.method(10);     // alerts 10
         *      alert(My.Derived2.method(10); // alerts 20
         *
         * Lastly, it also works with overridden static methods.
         *
         *      Vmd.define('My.Derived2Override', {
         *          override: 'My.Derived2',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x*2]); // calls My.Derived2.method
         *              }
         *          }
         *      });
         *
         *      alert(My.Derived2.method(10); // now alerts 40
         *
         * To override a method and replace it and also call the superclass method, use
         * {@link #callSuper}. This is often done to patch a method to fix a bug.
         *
         * @protected
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * from the current method, for example: `this.callParent(arguments)`
         * @return {Object} Returns the result of calling the parent method
         */
        callParent: function (args) {
            // NOTE: this code is deliberately as few expressions (and no function calls)
            // as possible so that a debugger can skip over this noise with the minimum number
            // of steps. Basically, just hit Step Into until you are where you really wanted
            // to be.
            var method,
                superMethod = (method = this.callParent.caller) && (method.$previous ||
                        ((method = method.$owner ? method : method.caller) &&
                                method.$owner.superclass[method.$name]));

            //<debug error>
            if (!superMethod) {
                method = this.callParent.caller;
                var parentClass, methodName;

                if (!method.$owner) {
                    if (!method.caller) {
                        throw new Error("Attempting to call a protected method from the public scope, which is not allowed");
                    }

                    method = method.caller;
                }

                parentClass = method.$owner.superclass;
                methodName = method.$name;

                if (!(methodName in parentClass)) {
                    throw new Error("this.callParent() was called but there's no such method (" + methodName +
                                ") found in the parent class (" + (Vmd.getClassName(parentClass) || 'Object') + ")");
                }
            }
            //</debug>

            return superMethod.apply(this, args || noArgs);
        },

        /**
         * This method is used by an override to call the superclass method but bypass any
         * overridden method. This is often done to "patch" a method that contains a bug
         * but for whatever reason cannot be fixed directly.
         * 
         * Consider:
         * 
         *      Vmd.define('Vmd.some.Class', {
         *          method: function () {
         *              console.log('Good');
         *          }
         *      });
         * 
         *      Vmd.define('Vmd.some.DerivedClass', {
         *          method: function () {
         *              console.log('Bad');
         * 
         *              // ... logic but with a bug ...
         *              
         *              this.callParent();
         *          }
         *      });
         * 
         * To patch the bug in `DerivedClass.method`, the typical solution is to create an
         * override:
         * 
         *      Vmd.define('App.paches.DerivedClass', {
         *          override: 'Vmd.some.DerivedClass',
         *          
         *          method: function () {
         *              console.log('Fixed');
         * 
         *              // ... logic but with bug fixed ...
         *
         *              this.callSuper();
         *          }
         *      });
         * 
         * The patch method cannot use `callParent` to call the superclass `method` since
         * that would call the overridden method containing the bug. In other words, the
         * above patch would only produce "Fixed" then "Good" in the console log, whereas,
         * using `callParent` would produce "Fixed" then "Bad" then "Good".
         *
         * @protected
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * from the current method, for example: `this.callSuper(arguments)`
         * @return {Object} Returns the result of calling the superclass method
         */
        callSuper: function (args) {
            // NOTE: this code is deliberately as few expressions (and no function calls)
            // as possible so that a debugger can skip over this noise with the minimum number
            // of steps. Basically, just hit Step Into until you are where you really wanted
            // to be.
            var method,
                superMethod = (method = this.callSuper.caller) &&
                        ((method = method.$owner ? method : method.caller) &&
                          method.$owner.superclass[method.$name]);

            //<debug error>
            if (!superMethod) {
                method = this.callSuper.caller;
                var parentClass, methodName;

                if (!method.$owner) {
                    if (!method.caller) {
                        throw new Error("Attempting to call a protected method from the public scope, which is not allowed");
                    }

                    method = method.caller;
                }

                parentClass = method.$owner.superclass;
                methodName = method.$name;

                if (!(methodName in parentClass)) {
                    throw new Error("this.callSuper() was called but there's no such method (" + methodName +
                                ") found in the parent class (" + (Vmd.getClassName(parentClass) || 'Object') + ")");
                }
            }
            //</debug>

            return superMethod.apply(this, args || noArgs);
        },

        /**
         * @property {Vmd.Class} self
         *
         * Get the reference to the current class from which this object was instantiated. Unlike {@link Vmd.Base#statics},
         * `this.self` is scope-dependent and it's meant to be used for dynamic inheritance. See {@link Vmd.Base#statics}
         * for a detailed comparison
         *
         *     Vmd.define('My.Cat', {
         *         statics: {
         *             speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
         *         },
         *
         *         constructor: function() {
         *             alert(this.self.speciesName); // dependent on 'this'
         *         },
         *
         *         clone: function() {
         *             return new this.self();
         *         }
         *     });
         *
         *
         *     Vmd.define('My.SnowLeopard', {
         *         extend: 'My.Cat',
         *         statics: {
         *             speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'
         *         }
         *     });
         *
         *     var cat = new My.Cat();                     // alerts 'Cat'
         *     var snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'
         *
         *     var clone = snowLeopard.clone();
         *     alert(Vmd.getClassName(clone));             // alerts 'My.SnowLeopard'
         *
         * @protected
         */
        self: Base,

        // Default constructor, simply returns `this`
        constructor: function () {
            return this;
        },

        //<feature classSystem.config>
        /**
         * Initialize configuration for this class. a typical example:
         *
         *     Vmd.define('My.awesome.Class', {
         *         // The default config
         *         config: {
         *             name: 'Awesome',
         *             isAwesome: true
         *         },
         *
         *         constructor: function(config) {
         *             this.initConfig(config);
         *         }
         *     });
         *
         *     var awesome = new My.awesome.Class({
         *         name: 'Super Awesome'
         *     });
         *
         *     alert(awesome.getName()); // 'Super Awesome'
         *
         * @protected
         * @param {Object} config
         * @return {Vmd.Base} this
         */
        initConfig: function (config) {
            var instanceConfig = config,
                configNameCache = Vmd.Class.configNameCache,
                defaultConfig = new this.configClass(),
                defaultConfigList = this.initConfigList,
                hasConfig = this.configMap,
                nameMap, i, ln, name, initializedName;

            this.initConfig = Vmd.emptyFn;

            this.initialConfig = instanceConfig || {};

            this.config = config = (instanceConfig) ? Vmd.merge(defaultConfig, config) : defaultConfig;

            if (instanceConfig) {
                defaultConfigList = defaultConfigList.slice();

                for (name in instanceConfig) {
                    if (hasConfig[name]) {
                        if (instanceConfig[name] !== null) {
                            defaultConfigList.push(name);
                            this[configNameCache[name].initialized] = false;
                        }
                    }
                }
            }

            for (i = 0, ln = defaultConfigList.length; i < ln; i++) {
                name = defaultConfigList[i];
                nameMap = configNameCache[name];
                initializedName = nameMap.initialized;

                if (!this[initializedName]) {
                    this[initializedName] = true;
                    this[nameMap.set].call(this, config[name]);
                }
            }

            return this;
        },

        /**
         * @private
         * @param config
         */
        hasConfig: function (name) {
            return Boolean(this.configMap[name]);
        },

        /**
         * @private
         */
        setConfig: function (config, applyIfNotSet) {
            if (!config) {
                return this;
            }

            var configNameCache = Vmd.Class.configNameCache,
                currentConfig = this.config,
                hasConfig = this.configMap,
                initialConfig = this.initialConfig,
                name, value;

            applyIfNotSet = Boolean(applyIfNotSet);

            for (name in config) {
                if (applyIfNotSet && initialConfig.hasOwnProperty(name)) {
                    continue;
                }

                value = config[name];
                currentConfig[name] = value;

                if (hasConfig[name]) {
                    this[configNameCache[name].set](value);
                }
            }

            return this;
        },

        /**
         * @private
         * @param name
         */
        getConfig: function (name) {
            var configNameCache = Vmd.Class.configNameCache;

            return this[configNameCache[name].get]();
        },

        /**
         * Returns the initial configuration passed to constructor when instantiating
         * this class.
         * @param {String} [name] Name of the config option to return.
         * @return {Object/Mixed} The full config object or a single config value
         * when `name` parameter specified.
         */
        getInitialConfig: function (name) {
            var config = this.config;

            if (!name) {
                return config;
            }
            else {
                return config[name];
            }
        },

        /**
         * @private
         * @param names
         * @param callback
         * @param scope
         */
        onConfigUpdate: function (names, callback, scope) {
            var self = this.self,
                //<debug>
                className = self.$className,
                //</debug>
                i, ln, name,
                updaterName, updater, newUpdater;

            names = Vmd.Array.from(names);

            scope = scope || this;

            for (i = 0, ln = names.length; i < ln; i++) {
                name = names[i];
                updaterName = 'update' + Vmd.String.capitalize(name);
                updater = this[updaterName] || Vmd.emptyFn;
                newUpdater = function () {
                    updater.apply(this, arguments);
                    scope[callback].apply(scope, arguments);
                };
                newUpdater.$name = updaterName;
                newUpdater.$owner = self;
                //<debug>
                newUpdater.displayName = className + '#' + updaterName;
                //</debug>

                this[updaterName] = newUpdater;
            }
        }
        //</feature>
        //,
        ///**
        // * @private
        // */
        //destroy: function () {
        //    this.destroy = Vmd.emptyFn;
        //}
    });

    /**
     * Call the original method that was previously overridden with {@link Vmd.Base#override}
     *
     *     Vmd.define('My.Cat', {
     *         constructor: function() {
     *             alert("I'm a cat!");
     *         }
     *     });
     *
     *     My.Cat.override({
     *         constructor: function() {
     *             alert("I'm going to be a cat!");
     *
     *             this.callOverridden();
     *
     *             alert("Meeeeoooowwww");
     *         }
     *     });
     *
     *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
     *                               // alerts "I'm a cat!"
     *                               // alerts "Meeeeoooowwww"
     *
     * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
     * from the current method, for example: `this.callOverridden(arguments)`
     * @return {Object} Returns the result of calling the overridden method
     * @protected
     * @deprecated as of 4.1. Use {@link #callParent} instead.
     */
    Base.prototype.callOverridden = Base.prototype.callParent;

    Vmd.Base = Base;

}(Vmd.Function.flexSetter));

/**
*@class Vmd.Class
**/
(function () {
    var ExtClass,
        Base = Vmd.Base,
        baseStaticMembers = [],
        baseStaticMember, baseStaticMemberLength;

    for (baseStaticMember in Base) {
        if (Base.hasOwnProperty(baseStaticMember)) {
            baseStaticMembers.push(baseStaticMember);
        }
    }

    baseStaticMemberLength = baseStaticMembers.length;

    // Creates a constructor that has nothing extra in its scope chain.
    function makeCtor(className) {
        function constructor() {
            // Opera has some problems returning from a constructor when Dragonfly isn't running. The || null seems to
            // be sufficient to stop it misbehaving. Known to be required against 10.53, 11.51 and 11.61.
            return this.constructor.apply(this, arguments) || null;
        }
        //<debug>
        if (className) {
            constructor.displayName = className;
        }
        //</debug>
        return constructor;
    }

    /**
     * @method constructor
     * Create a new anonymous class.
     *
     * @param {Object} data An object represent the properties of this class
     * @param {Function} onCreated Optional, the callback function to be executed when this class is fully created.
     * Note that the creation process can be asynchronous depending on the pre-processors used.
     *
     * @return {Vmd.Base} The newly created class
     */
    Vmd.Class = ExtClass = function (Class, data, onCreated) {
        if (typeof Class != 'function') {
            onCreated = data;
            data = Class;
            Class = null;
        }

        if (!data) {
            data = {};
        }

        Class = ExtClass.create(Class, data);

        ExtClass.process(Class, data, onCreated);

        return Class;
    };

    Vmd.apply(ExtClass, {
        /**
         * @private
         */
        onBeforeCreated: function (Class, data, hooks) {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, '>> Vmd.Class#onBeforeCreated', arguments);
            //</debug>

            Class.addMembers(data);

            hooks.onCreated.call(Class, Class);

            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, '<< Vmd.Class#onBeforeCreated', arguments);
            //</debug>
        },

        /**
         * @private
         */
        create: function (Class, data) {
            var name, i;

            if (!Class) {
                Class = makeCtor(
                    //<debug>
                    data.$className
                    //</debug>
                );
            }

            for (i = 0; i < baseStaticMemberLength; i++) {
                name = baseStaticMembers[i];
                Class[name] = Base[name];
            }

            return Class;
        },

        /**
         * @private
         */
        process: function (Class, data, onCreated) {
            var preprocessorStack = data.preprocessors || ExtClass.defaultPreprocessors,
                registeredPreprocessors = this.preprocessors,
                hooks = {
                    onBeforeCreated: this.onBeforeCreated
                },
                preprocessors = [],
                preprocessor, preprocessorsProperties,
                i, ln, j, subLn, preprocessorProperty;

            delete data.preprocessors;

            for (i = 0, ln = preprocessorStack.length; i < ln; i++) {
                preprocessor = preprocessorStack[i];

                if (typeof preprocessor == 'string') {
                    preprocessor = registeredPreprocessors[preprocessor];
                    preprocessorsProperties = preprocessor.properties;

                    if (preprocessorsProperties === true) {
                        preprocessors.push(preprocessor.fn);
                    }
                    else if (preprocessorsProperties) {
                        for (j = 0, subLn = preprocessorsProperties.length; j < subLn; j++) {
                            preprocessorProperty = preprocessorsProperties[j];

                            if (data.hasOwnProperty(preprocessorProperty)) {
                                preprocessors.push(preprocessor.fn);
                                break;
                            }
                        }
                    }
                }
                else {
                    preprocessors.push(preprocessor);
                }
            }

            hooks.onCreated = onCreated ? onCreated : Vmd.emptyFn;
            hooks.preprocessors = preprocessors;

            this.doProcess(Class, data, hooks);
        },

        doProcess: function (Class, data, hooks) {
            var me = this,
                preprocessors = hooks.preprocessors,
                preprocessor = preprocessors.shift(),
                doProcess = me.doProcess;

            for (; preprocessor ; preprocessor = preprocessors.shift()) {
                // Returning false signifies an asynchronous preprocessor - it will call doProcess when we can continue
                if (preprocessor.call(me, Class, data, hooks, doProcess) === false) {
                    return;
                }
            }
            hooks.onBeforeCreated.apply(me, arguments);
        },

        /** @private */
        preprocessors: {},

        /**
         * Register a new pre-processor to be used during the class creation process
         *
         * @param {String} name The pre-processor's name
         * @param {Function} fn The callback function to be executed. Typical format:
         *
         *     function(cls, data, fn) {
         *         // Your code here
         *
         *         // Execute this when the processing is finished.
         *         // Asynchronous processing is perfectly ok
         *         if (fn) {
         *             fn.call(this, cls, data);
         *         }
         *     });
         *
         * @param {Function} fn.cls The created class
         * @param {Object} fn.data The set of properties passed in {@link Vmd.Class} constructor
         * @param {Function} fn.fn The callback function that **must** to be executed when this
         * pre-processor finishes, regardless of whether the processing is synchronous or aynchronous.
         * @return {Vmd.Class} this
         * @private
         * @static
         */
        registerPreprocessor: function (name, fn, properties, position, relativeTo) {
            if (!position) {
                position = 'last';
            }

            if (!properties) {
                properties = [name];
            }

            this.preprocessors[name] = {
                name: name,
                properties: properties || false,
                fn: fn
            };

            this.setDefaultPreprocessorPosition(name, position, relativeTo);

            return this;
        },

        /**
         * Retrieve a pre-processor callback function by its name, which has been registered before
         *
         * @param {String} name
         * @return {Function} preprocessor
         * @private
         * @static
         */
        getPreprocessor: function (name) {
            return this.preprocessors[name];
        },

        /**
         * @private
         */
        getPreprocessors: function () {
            return this.preprocessors;
        },

        /**
         * @private
         */
        defaultPreprocessors: [],

        /**
         * Retrieve the array stack of default pre-processors
         * @return {Function[]} defaultPreprocessors
         * @private
         * @static
         */
        getDefaultPreprocessors: function () {
            return this.defaultPreprocessors;
        },

        /**
         * Set the default array stack of default pre-processors
         *
         * @private
         * @param {Array} preprocessors
         * @return {Vmd.Class} this
         * @static
         */
        setDefaultPreprocessors: function (preprocessors) {
            this.defaultPreprocessors = Vmd.Array.from(preprocessors);

            return this;
        },

        /**
         * Insert this pre-processor at a specific position in the stack, optionally relative to
         * any existing pre-processor. For example:
         *
         *     Vmd.Class.registerPreprocessor('debug', function(cls, data, fn) {
         *         // Your code here
         *
         *         if (fn) {
         *             fn.call(this, cls, data);
         *         }
         *     }).setDefaultPreprocessorPosition('debug', 'last');
         *
         * @private
         * @param {String} name The pre-processor name. Note that it needs to be registered with
         * {@link Vmd.Class#registerPreprocessor registerPreprocessor} before this
         * @param {String} offset The insertion position. Four possible values are:
         * 'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)
         * @param {String} relativeName
         * @return {Vmd.Class} this
         * @static
         */
        setDefaultPreprocessorPosition: function (name, offset, relativeName) {
            var defaultPreprocessors = this.defaultPreprocessors,
                index;

            if (typeof offset == 'string') {
                if (offset === 'first') {
                    defaultPreprocessors.unshift(name);

                    return this;
                }
                else if (offset === 'last') {
                    defaultPreprocessors.push(name);

                    return this;
                }

                offset = (offset === 'after') ? 1 : -1;
            }

            index = Vmd.Array.indexOf(defaultPreprocessors, relativeName);

            if (index !== -1) {
                Vmd.Array.splice(defaultPreprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        },

        configNameCache: {},

        getConfigNameMap: function (name) {
            var cache = this.configNameCache,
                map = cache[name],
                capitalizedName;

            if (!map) {
                capitalizedName = name.charAt(0).toUpperCase() + name.substr(1);

                map = cache[name] = {
                    internal: name,
                    initialized: '_is' + capitalizedName + 'Initialized',
                    apply: 'apply' + capitalizedName,
                    update: 'update' + capitalizedName,
                    'set': 'set' + capitalizedName,
                    'get': 'get' + capitalizedName,
                    doSet: 'doSet' + capitalizedName,
                    changeEvent: name.toLowerCase() + 'change'
                };
            }

            return map;
        }
    });

    /**
     * @cfg {String} extend
     * The parent class that this class extends. For example:
     *
     *     Vmd.define('Person', {
     *         say: function(text) { alert(text); }
     *     });
     *
     *     Vmd.define('Developer', {
     *         extend: 'Person',
     *         say: function(text) { this.callParent(["print "+text]); }
     *     });
     */
    ExtClass.registerPreprocessor('extend', function (Class, data, hooks) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#extendPreProcessor', arguments);
        //</debug>

        var Base = Vmd.Base,
            basePrototype = Base.prototype,
            extend = data.extend,
            Parent, parentPrototype, i;

        delete data.extend;

        if (extend && extend !== Object) {
            Parent = extend;
        }
        else {
            Parent = Base;
        }

        parentPrototype = Parent.prototype;

        if (!Parent.$isClass) {
            for (i in basePrototype) {
                if (!parentPrototype[i]) {
                    parentPrototype[i] = basePrototype[i];
                }
            }
        }

        Class.extend(Parent);

        Class.triggerExtended.apply(Class, arguments);

        if (data.onClassExtended) {
            Class.onExtended(data.onClassExtended, Class);
            delete data.onClassExtended;
        }

    }, true);

    //<feature classSystem.statics>
    /**
     * @cfg {Object} statics
     * List of static methods for this class. For example:
     *
     *     Vmd.define('Computer', {
     *          statics: {
     *              factory: function(brand) {
     *                  // 'this' in static methods refer to the class itself
     *                  return new this(brand);
     *              }
     *          },
     *
     *          constructor: function() { ... }
     *     });
     *
     *     var dellComputer = Computer.factory('Dell');
     */
    ExtClass.registerPreprocessor('statics', function (Class, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#staticsPreprocessor', arguments);
        //</debug>

        Class.addStatics(data.statics);

        delete data.statics;
    });
    //</feature>

    //<feature classSystem.inheritableStatics>
    /**
     * @cfg {Object} inheritableStatics
     * List of inheritable static methods for this class.
     * Otherwise just like {@link #statics} but subclasses inherit these methods.
     */
    ExtClass.registerPreprocessor('inheritableStatics', function (Class, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#inheritableStaticsPreprocessor', arguments);
        //</debug>

        Class.addInheritableStatics(data.inheritableStatics);

        delete data.inheritableStatics;
    });
    //</feature>

    //<feature classSystem.config>
    /**
     * @cfg {Object} config
     * List of configuration options with their default values.
     *
     * __Note:__ You need to make sure {@link Vmd.Base#initConfig} is called from your constructor if you are defining
     * your own class or singleton, unless you are extending a Component. Otherwise the generated getter and setter
     * methods will not be initialized.
     *
     * Each config item will have its own setter and getter method automatically generated inside the class prototype
     * during class creation time, if the class does not have those methods explicitly defined.
     *
     * As an example, let's convert the name property of a Person class to be a config item, then add extra age and
     * gender items.
     *
     *     Vmd.define('My.sample.Person', {
     *         config: {
     *             name: 'Mr. Unknown',
     *             age: 0,
     *             gender: 'Male'
     *         },
     *
     *         constructor: function(config) {
     *             this.initConfig(config);
     *
     *             return this;
     *         }
     *
     *         // ...
     *     });
     *
     * Within the class, this.name still has the default value of "Mr. Unknown". However, it's now publicly accessible
     * without sacrificing encapsulation, via setter and getter methods.
     *
     *     var jacky = new Person({
     *         name: "Jacky",
     *         age: 35
     *     });
     *
     *     alert(jacky.getAge());      // alerts 35
     *     alert(jacky.getGender());   // alerts "Male"
     *
     *     jacky.walk(10);             // alerts "Jacky is walking 10 steps"
     *
     *     jacky.setName("Mr. Nguyen");
     *     alert(jacky.getName());     // alerts "Mr. Nguyen"
     *
     *     jacky.walk(10);             // alerts "Mr. Nguyen is walking 10 steps"
     *
     * Notice that we changed the class constructor to invoke this.initConfig() and pass in the provided config object.
     * Two key things happened:
     *
     *  - The provided config object when the class is instantiated is recursively merged with the default config object.
     *  - All corresponding setter methods are called with the merged values.
     *
     * Beside storing the given values, throughout the frameworks, setters generally have two key responsibilities:
     *
     *  - Filtering / validation / transformation of the given value before it's actually stored within the instance.
     *  - Notification (such as firing events) / post-processing after the value has been set, or changed from a
     *    previous value.
     *
     * By standardize this common pattern, the default generated setters provide two extra template methods that you
     * can put your own custom logics into, i.e: an "applyFoo" and "updateFoo" method for a "foo" config item, which are
     * executed before and after the value is actually set, respectively. Back to the example class, let's validate that
     * age must be a valid positive number, and fire an 'agechange' if the value is modified.
     *
     *     Vmd.define('My.sample.Person', {
     *         config: {
     *             // ...
     *         },
     *
     *         constructor: {
     *             // ...
     *         },
     *
     *         applyAge: function(age) {
     *             if (typeof age !== 'number' || age < 0) {
     *                 console.warn("Invalid age, must be a positive number");
     *                 return;
     *             }
     *
     *             return age;
     *         },
     *
     *         updateAge: function(newAge, oldAge) {
     *             // age has changed from "oldAge" to "newAge"
     *             this.fireEvent('agechange', this, newAge, oldAge);
     *         }
     *
     *         // ...
     *     });
     *
     *     var jacky = new Person({
     *         name: "Jacky",
     *         age: 'invalid'
     *     });
     *
     *     alert(jacky.getAge());      // alerts 0
     *
     *     alert(jacky.setAge(-100));  // alerts 0
     *     alert(jacky.getAge());      // alerts 0
     *
     *     alert(jacky.setAge(35));    // alerts 0
     *     alert(jacky.getAge());      // alerts 35
     *
     * In other words, when leveraging the config feature, you mostly never need to define setter and getter methods
     * explicitly. Instead, "apply*" and "update*" methods should be implemented where necessary. Your code will be
     * consistent throughout and only contain the minimal logic that you actually care about.
     *
     * When it comes to inheritance, the default config of the parent class is automatically, recursively merged with
     * the child's default config. The same applies for mixins.
     */
    ExtClass.registerPreprocessor('config', function (Class, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#configPreProcessor', arguments);
        //</debug>

        var config = data.config,
            prototype = Class.prototype;

        delete data.config;

        Vmd.Object.each(config, function (name, value) {
            var nameMap = ExtClass.getConfigNameMap(name),
                internalName = nameMap.internal,
                initializedName = nameMap.initialized,
                applyName = nameMap.apply,
                updateName = nameMap.update,
                setName = nameMap.set,
                getName = nameMap.get,
                hasOwnSetter = (setName in prototype) || data.hasOwnProperty(setName),
                hasOwnApplier = (applyName in prototype) || data.hasOwnProperty(applyName),
                hasOwnUpdater = (updateName in prototype) || data.hasOwnProperty(updateName),
                optimizedGetter, customGetter;

            if (value === null || (!hasOwnSetter && !hasOwnApplier && !hasOwnUpdater)) {
                prototype[internalName] = value;
                prototype[initializedName] = true;
            }
            else {
                prototype[initializedName] = false;
            }

            if (!hasOwnSetter) {
                data[setName] = function (value) {
                    var oldValue = this[internalName],
                        applier = this[applyName],
                        updater = this[updateName];

                    if (!this[initializedName]) {
                        this[initializedName] = true;
                    }

                    if (applier) {
                        value = applier.call(this, value, oldValue);
                    }

                    if (typeof value != 'undefined') {
                        this[internalName] = value;

                        if (updater && value !== oldValue) {
                            updater.call(this, value, oldValue);
                        }
                    }

                    return this;
                };
            }

            if (!(getName in prototype) || data.hasOwnProperty(getName)) {
                customGetter = data[getName] || false;

                if (customGetter) {
                    optimizedGetter = function () {
                        return customGetter.apply(this, arguments);
                    };
                }
                else {
                    optimizedGetter = function () {
                        return this[internalName];
                    };
                }

                data[getName] = function () {
                    var currentGetter;

                    if (!this[initializedName]) {
                        this[initializedName] = true;
                        this[setName](this.config[name]);
                    }

                    currentGetter = this[getName];

                    if ('$previous' in currentGetter) {
                        currentGetter.$previous = optimizedGetter;
                    }
                    else {
                        this[getName] = optimizedGetter;
                    }

                    return optimizedGetter.apply(this, arguments);
                };
            }
        });

        Class.addConfig(config, true);
    });
    //</feature>

    //<feature classSystem.mixins>
    /**
     * @cfg {String[]/Object} mixins
     * List of classes to mix into this class. For example:
     *
     *     Vmd.define('CanSing', {
     *          sing: function() {
     *              alert("I'm on the highway to hell...")
     *          }
     *     });
     *
     *     Vmd.define('Musician', {
     *          mixins: ['CanSing']
     *     })
     *
     * In this case the Musician class will get a `sing` method from CanSing mixin.
     *
     * But what if the Musician already has a `sing` method? Or you want to mix
     * in two classes, both of which define `sing`?  In such a cases it's good
     * to define mixins as an object, where you assign a name to each mixin:
     *
     *     Vmd.define('Musician', {
     *          mixins: {
     *              canSing: 'CanSing'
     *          },
     * 
     *          sing: function() {
     *              // delegate singing operation to mixin
     *              this.mixins.canSing.sing.call(this);
     *          }
     *     })
     *
     * In this case the `sing` method of Musician will overwrite the
     * mixed in `sing` method. But you can access the original mixed in method
     * through special `mixins` property.
     */
    ExtClass.registerPreprocessor('mixins', function (Class, data, hooks) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#mixinsPreprocessor', arguments);
        //</debug>

        var mixins = data.mixins,
            name, mixin, i, ln;

        delete data.mixins;

        Vmd.Function.interceptBefore(hooks, 'onCreated', function () {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#mixinsPreprocessor#beforeCreated', arguments);
            //</debug>

            if (mixins instanceof Array) {
                for (i = 0, ln = mixins.length; i < ln; i++) {
                    mixin = mixins[i];
                    name = mixin.prototype.mixinId || mixin.$className;

                    Class.mixin(name, mixin);
                }
            }
            else {
                for (var mixinName in mixins) {
                    if (mixins.hasOwnProperty(mixinName)) {
                        Class.mixin(mixinName, mixins[mixinName]);
                    }
                }
            }
        });
    });
    //</feature>

    //<feature classSystem.backwardsCompatible>
    // Backwards compatible
    Vmd.extend = function (Class, Parent, members) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(Class, 'Vmd.Class#extend-backwards-compatible', arguments);
        //</debug>

        if (arguments.length === 2 && Vmd.isObject(Parent)) {
            members = Parent;
            Parent = Class;
            Class = null;
        }

        var cls;

        if (!Parent) {
            throw new Error("[Vmd.extend] Attempting to extend from a class which has not been loaded on the page.");
        }

        members.extend = Parent;
        members.preprocessors = [
            'extend'
            //<feature classSystem.statics>
            , 'statics'
            //</feature>
            //<feature classSystem.inheritableStatics>
            , 'inheritableStatics'
            //</feature>
            //<feature classSystem.mixins>
            , 'mixins'
            //</feature>
            //<feature classSystem.config>
            , 'config'
            //</feature>
        ];

        if (Class) {
            cls = new ExtClass(Class, members);
            // The 'constructor' is given as 'Class' but also needs to be on prototype
            cls.prototype.constructor = Class;
        } else {
            cls = new ExtClass(members);
        }

        cls.prototype.override = function (o) {
            for (var m in o) {
                if (o.hasOwnProperty(m)) {
                    this[m] = o[m];
                }
            }
        };

        return cls;
    };
    //</feature>
}());


/**
*@class Vmd.ClassManager
**/
(function (Class, alias, arraySlice, arrayFrom, global) {

    // Creates a constructor that has nothing extra in its scope chain.
    function makeCtor() {
        function constructor() {
            // Opera has some problems returning from a constructor when Dragonfly isn't running. The || null seems to
            // be sufficient to stop it misbehaving. Known to be required against 10.53, 11.51 and 11.61.
            return this.constructor.apply(this, arguments) || null;
        }
        return constructor;
    }

    var Manager = Vmd.ClassManager = {

        /**
         * @property {Object} classes
         * All classes which were defined through the ClassManager. Keys are the
         * name of the classes and the values are references to the classes.
         * @private
         */
        classes: {},

        /**
         * @private
         */
        existCache: {},

        /**
         * @private
         */
        namespaceRewrites: [{
            from: 'Vmd.',
            to: Vmd
        }],

        /**
         * @private
         */
        maps: {
            alternateToName: {},
            aliasToName: {},
            nameToAliases: {},
            nameToAlternates: {}
        },

        /** @private */
        enableNamespaceParseCache: true,

        /** @private */
        namespaceParseCache: {},

        /** @private */
        instantiators: [],

        /**
         * Checks if a class has already been created.
         *
         * @param {String} className
         * @return {Boolean} exist
         */
        isCreated: function (className) {
            var existCache = this.existCache,
                i, ln, part, root, parts;

            //<debug error>
            if (typeof className != 'string' || className.length < 1) {
                //throw new Error("[Vmd.ClassManager] Invalid classname, must be a string and must not be empty");
                Vmd.Error.raise({
                    sourceClass: "Vmd.ClassManager",
                    sourceMethod: "exist",
                    msg: "Invalid classname, must be a string and must not be empty"
                });
            }
            //</debug>

            if (this.classes[className] || existCache[className]) {
                return true;
            }

            root = global;
            parts = this.parseNamespace(className);

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (typeof part != 'string') {
                    root = part;
                } else {
                    if (!root || !root[part]) {
                        return false;
                    }

                    root = root[part];
                }
            }

            existCache[className] = true;

            this.triggerCreated(className);

            return true;
        },

        /**
         * @private
         */
        createdListeners: [],

        /**
         * @private
         */
        nameCreatedListeners: {},

        /**
         * @private
         */
        triggerCreated: function (className) {
            var listeners = this.createdListeners,
                nameListeners = this.nameCreatedListeners,
                alternateNames = this.maps.nameToAlternates[className],
                names = [className],
                i, ln, j, subLn, listener, name;

            for (i = 0, ln = listeners.length; i < ln; i++) {
                listener = listeners[i];
                listener.fn.call(listener.scope, className);
            }

            if (alternateNames) {
                names.push.apply(names, alternateNames);
            }

            for (i = 0, ln = names.length; i < ln; i++) {
                name = names[i];
                listeners = nameListeners[name];

                if (listeners) {
                    for (j = 0, subLn = listeners.length; j < subLn; j++) {
                        listener = listeners[j];
                        listener.fn.call(listener.scope, name);
                    }
                    delete nameListeners[name];
                }
            }
        },

        /**
         * @private
         */
        onCreated: function (fn, scope, className) {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(className, 'Vmd.ClassManager#onCreated', arguments);
            //</debug>

            var listeners = this.createdListeners,
                nameListeners = this.nameCreatedListeners,
                listener = {
                    fn: fn,
                    scope: scope
                };

            if (className) {
                if (this.isCreated(className)) {
                    fn.call(scope, className);
                    return;
                }

                if (!nameListeners[className]) {
                    nameListeners[className] = [];
                }

                nameListeners[className].push(listener);
            }
            else {
                listeners.push(listener);
            }
        },

        /**
         * Supports namespace rewriting
         * @private
         */
        parseNamespace: function (namespace) {
            //<debug error>
            if (typeof namespace != 'string') {
                //throw new Error("[Vmd.ClassManager] Invalid namespace, must be a string");
                Vmd.Error.raise({
                    sourceClass: "Vmd.ClassManager",
                    sourceMethod: "parseNamespace",
                    msg: "Invalid namespace, must be a string"
                });
            }
            //</debug>

            var cache = this.namespaceParseCache,
                parts,
                rewrites,
                root,
                name,
                rewrite, from, to, i, ln;

            if (this.enableNamespaceParseCache) {
                if (cache.hasOwnProperty(namespace)) {
                    return cache[namespace];
                }
            }

            parts = [];
            rewrites = this.namespaceRewrites;
            root = global;
            name = namespace;

            for (i = 0, ln = rewrites.length; i < ln; i++) {
                rewrite = rewrites[i];
                from = rewrite.from;
                to = rewrite.to;

                if (name === from || name.substring(0, from.length) === from) {
                    name = name.substring(from.length);

                    if (typeof to != 'string') {
                        root = to;
                    } else {
                        parts = parts.concat(to.split('.'));
                    }

                    break;
                }
            }

            parts.push(root);

            parts = parts.concat(name.split('.'));

            if (this.enableNamespaceParseCache) {
                cache[namespace] = parts;
            }

            return parts;
        },

        /**
         * Creates a namespace and assign the `value` to the created object
         *
         *     Vmd.ClassManager.setNamespace('MyCompany.pkg.Example', someObject);
         *
         *     alert(MyCompany.pkg.Example === someObject); // alerts true
         *
         * @param {String} name
         * @param {Object} value
         */
        setNamespace: function (name, value) {
            var root = global,
                parts = this.parseNamespace(name),
                ln = parts.length - 1,
                leaf = parts[ln],
                i, part;

            for (i = 0; i < ln; i++) {
                part = parts[i];

                if (typeof part != 'string') {
                    root = part;
                } else {
                    if (!root[part]) {
                        root[part] = {};
                    }

                    root = root[part];
                }
            }

            root[leaf] = value;

            return root[leaf];
        },

        /**
         * The new Vmd.ns, supports namespace rewriting
         * @private
         */
        createNamespaces: function () {
            var root = global,
                parts, part, i, j, ln, subLn;

            for (i = 0, ln = arguments.length; i < ln; i++) {
                parts = this.parseNamespace(arguments[i]);

                for (j = 0, subLn = parts.length; j < subLn; j++) {
                    part = parts[j];

                    if (typeof part != 'string') {
                        root = part;
                    } else {
                        if (!root[part]) {
                            root[part] = {};
                        }

                        root = root[part];
                    }
                }
            }

            return root;
        },

        /**
         * Sets a name reference to a class.
         *
         * @param {String} name
         * @param {Object} value
         * @return {Vmd.ClassManager} this
         */
        set: function (name, value) {
            var me = this,
                maps = me.maps,
                nameToAlternates = maps.nameToAlternates,
                targetName = me.getName(value),
                alternates;

            me.classes[name] = me.setNamespace(name, value);

            if (targetName && targetName !== name) {
                maps.alternateToName[name] = targetName;
                alternates = nameToAlternates[targetName] || (nameToAlternates[targetName] = []);
                alternates.push(name);
            }

            return this;
        },

        /**
         * Retrieve a class by its name.
         *
         * @param {String} name
         * @return {Vmd.Class} class
         */
        get: function (name) {
            var classes = this.classes,
                root,
                parts,
                part, i, ln;

            if (classes[name]) {
                return classes[name];
            }

            root = global;
            parts = this.parseNamespace(name);

            for (i = 0, ln = parts.length; i < ln; i++) {
                part = parts[i];

                if (typeof part != 'string') {
                    root = part;
                } else {
                    if (!root || !root[part]) {
                        return null;
                    }

                    root = root[part];
                }
            }

            return root;
        },

        /**
         * Register the alias for a class.
         *
         * @param {Vmd.Class/String} cls a reference to a class or a className
         * @param {String} alias Alias to use when referring to this class
         */
        setAlias: function (cls, alias) {
            var aliasToNameMap = this.maps.aliasToName,
                nameToAliasesMap = this.maps.nameToAliases,
                className;

            if (typeof cls == 'string') {
                className = cls;
            } else {
                className = this.getName(cls);
            }

            if (alias && aliasToNameMap[alias] !== className) {
                //<debug info>
                if (aliasToNameMap[alias] && Vmd.isDefined(global.console)) {
                    global.console.log("[Vmd.ClassManager] Overriding existing alias: '" + alias + "' " +
                        "of: '" + aliasToNameMap[alias] + "' with: '" + className + "'. Be sure it's intentional.");
                }
                //</debug>

                aliasToNameMap[alias] = className;
            }

            if (!nameToAliasesMap[className]) {
                nameToAliasesMap[className] = [];
            }

            if (alias) {
                Vmd.Array.include(nameToAliasesMap[className], alias);
            }

            return this;
        },

        /**
         * Adds a batch of class name to alias mappings
         * @param {Object} aliases The set of mappings of the form
         * className : [values...]
         */
        addNameAliasMappings: function (aliases) {
            var aliasToNameMap = this.maps.aliasToName,
                nameToAliasesMap = this.maps.nameToAliases,
                className, aliasList, alias, i;

            for (className in aliases) {
                aliasList = nameToAliasesMap[className] ||
                    (nameToAliasesMap[className] = []);

                for (i = 0; i < aliases[className].length; i++) {
                    alias = aliases[className][i];
                    if (!aliasToNameMap[alias]) {
                        aliasToNameMap[alias] = className;
                        aliasList.push(alias);
                    }
                }

            }
            return this;
        },

        /**
         *
         * @param {Object} alternates The set of mappings of the form
         * className : [values...]
         */
        addNameAlternateMappings: function (alternates) {
            var alternateToName = this.maps.alternateToName,
                nameToAlternates = this.maps.nameToAlternates,
                className, aliasList, alternate, i;

            for (className in alternates) {
                aliasList = nameToAlternates[className] ||
                    (nameToAlternates[className] = []);

                for (i = 0; i < alternates[className].length; i++) {
                    alternate = alternates[className][i];
                    if (!alternateToName[alternate]) {
                        alternateToName[alternate] = className;
                        aliasList.push(alternate);
                    }
                }

            }
            return this;
        },

        /**
         * Get a reference to the class by its alias.
         *
         * @param {String} alias
         * @return {Vmd.Class} class
         */
        getByAlias: function (alias) {
            return this.get(this.getNameByAlias(alias));
        },

        /**
         * Get the name of a class by its alias.
         *
         * @param {String} alias
         * @return {String} className
         */
        getNameByAlias: function (alias) {
            //mafei compat 3.4 通过Vmd.reg注册方式得到的组件
            var registerCmp = Vmd.ComponentMgr && Vmd.ComponentMgr.types[alias.replace('widget.', '')];
            return this.maps.aliasToName[alias] || registerCmp && registerCmp.$className || '';
        },

        /**
         * Get the name of a class by its alternate name.
         *
         * @param {String} alternate
         * @return {String} className
         */
        getNameByAlternate: function (alternate) {

            return this.maps.alternateToName[alternate] || '';
        },

        /**
         * Get the aliases of a class by the class name
         *
         * @param {String} name
         * @return {Array} aliases
         */
        getAliasesByName: function (name) {
            return this.maps.nameToAliases[name] || [];
        },

        /**
         * Get the name of the class by its reference or its instance;
         * 
         * {@link Vmd.ClassManager#getName} is usually invoked by the shorthand {@link Vmd#getClassName}.
         *
         *     Vmd.getName(Vmd.Action); // returns "Vmd.Action"
         *
         * @param {Vmd.Class/Object} object
         * @return {String} className
         */
        getName: function (object) {
            return object && object.$className || '';
        },

        /**
         * Get the class of the provided object; returns null if it's not an instance
         * of any class created with Vmd.define.
         *
         * {@link Vmd.ClassManager#getClass} is usually invoked by the shorthand {@link Vmd#getClass}.
         *
         *     var component = new Vmd.Component();
         *
         *     Vmd.getClass(component); // returns Vmd.Component
         *
         * @param {Object} object
         * @return {Vmd.Class} class
         */
        getClass: function (object) {
            return object && object.self || null;
        },

        /**
         * Defines a class.
         * @deprecated 4.1.0 Use {@link Vmd#define} instead, as that also supports creating overrides.
         */
        create: function (className, data, createdFn) {
            //<debug error>
            if (className != null && typeof className != 'string') {
                // throw new Error("[Vmd.define] Invalid class name '" + className + "' specified, must be a non-empty string");
                Vmd.Error.raise({
                    sourceClass: "Vmd",
                    sourceMethod: "define",
                    msg: "Invalid class name '" + className + "' specified, must be a non-empty string"
                });
            }
            //</debug>

            var ctor = makeCtor();
            if (typeof data == 'function') {
                data = data(ctor);
            }

            //<debug>
            if (className) {
                ctor.displayName = className;
            }
            //</debug>

            data.$className = className;

            return new Class(ctor, data, function () {
                var postprocessorStack = data.postprocessors || Manager.defaultPostprocessors,
                    registeredPostprocessors = Manager.postprocessors,
                    postprocessors = [],
                    postprocessor, i, ln, j, subLn, postprocessorProperties, postprocessorProperty;

                delete data.postprocessors;

                for (i = 0, ln = postprocessorStack.length; i < ln; i++) {
                    postprocessor = postprocessorStack[i];

                    if (typeof postprocessor == 'string') {
                        postprocessor = registeredPostprocessors[postprocessor];
                        postprocessorProperties = postprocessor.properties;

                        if (postprocessorProperties === true) {
                            postprocessors.push(postprocessor.fn);
                        }
                        else if (postprocessorProperties) {
                            for (j = 0, subLn = postprocessorProperties.length; j < subLn; j++) {
                                postprocessorProperty = postprocessorProperties[j];

                                if (data.hasOwnProperty(postprocessorProperty)) {
                                    postprocessors.push(postprocessor.fn);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        postprocessors.push(postprocessor);
                    }
                }

                data.postprocessors = postprocessors;
                data.createdFn = createdFn;
                Manager.processCreate(className, this, data);
            });
        },

        processCreate: function (className, cls, clsData) {
            var me = this,
                postprocessor = clsData.postprocessors.shift(),
                createdFn = clsData.createdFn;

            if (!postprocessor) {
                //<debug>
                Vmd.classSystemMonitor && Vmd.classSystemMonitor(className, 'Vmd.ClassManager#classCreated', arguments);
                //</debug>

                if (className) {
                    me.set(className, cls);
                }

                if (createdFn) {
                    createdFn.call(cls, cls);
                }

                if (className) {
                    me.triggerCreated(className);
                }
                return;
            }

            if (postprocessor.call(me, className, cls, clsData, me.processCreate) !== false) {
                me.processCreate(className, cls, clsData);
            }
        },

        createOverride: function (className, data, createdFn) {
            var me = this,
                overriddenClassName = data.override,
                requires = data.requires,
                uses = data.uses,
                compat = data.compatibility,
                classReady = function () {
                    var cls, temp;

                    if (requires) {
                        temp = requires;
                        requires = null; // do the real thing next time (which may be now)

                        // Since the override is going to be used (its target class is now
                        // created), we need to fetch the required classes for the override
                        // and call us back once they are loaded:
                        Vmd.Loader.require(temp, classReady);
                    } else {
                        // The target class and the required classes for this override are
                        // ready, so we can apply the override now:
                        cls = me.get(overriddenClassName);

                        // We don't want to apply these:
                        delete data.override;
                        delete data.compatibility;
                        delete data.requires;
                        delete data.uses;

                        Vmd.override(cls, data);

                        // This pushes the overridding file itself into Vmd.Loader.history
                        // Hence if the target class never exists, the overriding file will
                        // never be included in the build.
                        me.triggerCreated(className);

                        if (uses) {
                            Vmd.Loader.addUsedClasses(uses); // get these classes too!
                        }

                        if (createdFn) {
                            createdFn.call(cls); // last but not least!
                        }
                    }
                };

            me.existCache[className] = true;

            if (!compat || Vmd.checkVersion(compat)) {
                // Override the target class right after it's created
                me.onCreated(classReady, me, overriddenClassName);
            }

            return me;
        },

        /**
         * Instantiate a class by its alias.
         * 
         * {@link Vmd.ClassManager#instantiateByAlias} is usually invoked by the shorthand {@link Vmd#createByAlias}.
         *
         * If {@link Vmd.Loader} is {@link Vmd.Loader#setConfig enabled} and the class has not been defined yet, it will
         * attempt to load the class via synchronous loading.
         *
         *     var window = Vmd.createByAlias('widget.window', { width: 600, height: 800, ... });
         *
         * @param {String} alias
         * @param {Object...} args Additional arguments after the alias will be passed to the
         * class constructor.
         * @return {Object} instance
         */
        instantiateByAlias: function () {
            var alias = arguments[0],
                args = arraySlice.call(arguments),
                className = this.getNameByAlias(alias);

            if (!className) {
                className = this.maps.aliasToName[alias];

                //<debug error>
                if (!className) {
                    //throw new Error("[Vmd.createByAlias] Cannot create an instance of unrecognized alias: " + alias);
                    Vmd.Error.raise({
                        sourceClass: "Vmd",
                        sourceMethod: "createByAlias",
                        msg: "Cannot create an instance of unrecognized alias: " + alias
                    });
                }
                //</debug>

                //<debug warn>
                if (global.console) {
                    global.console.warn("[Vmd.Loader] Synchronously loading '" + className + "'; consider adding " +
                         "Vmd.require('" + alias + "') above Vmd.onReady");
                }
                //</debug>

                Vmd.syncRequire(className);
            }

            args[0] = className;

            return this.instantiate.apply(this, args);
        },

        /**
         * @private
         */
        instantiate: function () {
            var name = arguments[0],
                nameType = typeof name,
                args = arraySlice.call(arguments, 1),
                alias = name,
                possibleName, cls;

            if (nameType != 'function') {
                if (nameType != 'string' && args.length === 0) {
                    args = [name];
                    name = name.xclass;
                }

                //<debug error>
                if (typeof name != 'string' || name.length < 1) {
                    // throw new Error("[Vmd.create] Invalid class name or alias '" + name + "' specified, must be a non-empty string");
                    Vmd.Error.raise({
                        sourceClass: "Vmd",
                        sourceMethod: "create",
                        msg: "Invalid class name or alias '" + name + "' specified, must be a non-empty string"
                    });
                }
                //</debug>

                cls = this.get(name);
            }
            else {
                cls = name;
            }

            // No record of this class name, it's possibly an alias, so look it up
            if (!cls) {
                possibleName = this.getNameByAlias(name);

                if (possibleName) {
                    name = possibleName;

                    cls = this.get(name);
                }
            }

            // Still no record of this class name, it's possibly an alternate name, so look it up
            if (!cls) {
                possibleName = this.getNameByAlternate(name);

                if (possibleName) {
                    name = possibleName;

                    cls = this.get(name);
                }
            }

            // Still not existing at this point, try to load it via synchronous mode as the last resort
            if (!cls) {
                //<debug warn>
                if (global.console) {
                    global.console.warn("[Vmd.Loader] Synchronously loading '" + name + "'; consider adding " +
                         "Vmd.require('" + ((possibleName) ? alias : name) + "') above Vmd.onReady");
                }
                //</debug>

                Vmd.syncRequire(name);

                cls = this.get(name);
            }

            //<debug error>
            if (!cls) {
                //throw new Error("[Vmd.create] Cannot create an instance of unrecognized class name / alias: " + alias);
                Vmd.Error.raise({
                    sourceClass: "Vmd",
                    sourceMethod: "create",
                    msg: "Cannot create an instance of unrecognized class name / alias: " + alias
                });
            }

            if (typeof cls != 'function') {
                // throw new Error("[Vmd.create] '" + name + "' is a singleton and cannot be instantiated");
                Vmd.Error.raise({
                    sourceClass: "Vmd",
                    sourceMethod: "create",
                    msg: "'" + name + "' is a singleton and cannot be instantiated"
                });
            }
            //</debug>

            return this.getInstantiator(args.length)(cls, args);
        },

        /**
         * @private
         * @param name
         * @param args
         */
        dynInstantiate: function (name, args) {
            args = arrayFrom(args, true);
            args.unshift(name);

            return this.instantiate.apply(this, args);
        },

        /**
         * @private
         * @param length
         */
        getInstantiator: function (length) {
            var instantiators = this.instantiators,
                instantiator,
                i,
                args;

            instantiator = instantiators[length];

            if (!instantiator) {
                i = length;
                args = [];

                for (i = 0; i < length; i++) {
                    args.push('a[' + i + ']');
                }

                instantiator = instantiators[length] = new Function('c', 'a', 'return new c(' + args.join(',') + ')');
                //<debug>
                instantiator.displayName = "Vmd.ClassManager.instantiate" + length;
                //</debug>
            }

            return instantiator;
        },

        /**
         * @private
         */
        postprocessors: {},

        /**
         * @private
         */
        defaultPostprocessors: [],

        /**
         * Register a post-processor function.
         *
         * @private
         * @param {String} name
         * @param {Function} postprocessor
         */
        registerPostprocessor: function (name, fn, properties, position, relativeTo) {
            if (!position) {
                position = 'last';
            }

            if (!properties) {
                properties = [name];
            }

            this.postprocessors[name] = {
                name: name,
                properties: properties || false,
                fn: fn
            };

            this.setDefaultPostprocessorPosition(name, position, relativeTo);

            return this;
        },

        /**
         * Set the default post processors array stack which are applied to every class.
         *
         * @private
         * @param {String/Array} postprocessors The name of a registered post processor or an array of registered names.
         * @return {Vmd.ClassManager} this
         */
        setDefaultPostprocessors: function (postprocessors) {
            this.defaultPostprocessors = arrayFrom(postprocessors);

            return this;
        },

        /**
         * Insert this post-processor at a specific position in the stack, optionally relative to
         * any existing post-processor
         *
         * @private
         * @param {String} name The post-processor name. Note that it needs to be registered with
         * {@link Vmd.ClassManager#registerPostprocessor} before this
         * @param {String} offset The insertion position. Four possible values are:
         * 'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)
         * @param {String} relativeName
         * @return {Vmd.ClassManager} this
         */
        setDefaultPostprocessorPosition: function (name, offset, relativeName) {
            var defaultPostprocessors = this.defaultPostprocessors,
                index;

            if (typeof offset == 'string') {
                if (offset === 'first') {
                    defaultPostprocessors.unshift(name);

                    return this;
                }
                else if (offset === 'last') {
                    defaultPostprocessors.push(name);

                    return this;
                }

                offset = (offset === 'after') ? 1 : -1;
            }

            index = Vmd.Array.indexOf(defaultPostprocessors, relativeName);

            if (index !== -1) {
                Vmd.Array.splice(defaultPostprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        },

        /**
         * Converts a string expression to an array of matching class names. An expression can either refers to class aliases
         * or class names. Expressions support wildcards:
         *
         *      // returns ['Vmd.window.Window']
         *     var window = Vmd.ClassManager.getNamesByExpression('widget.window');
         *
         *     // returns ['widget.panel', 'widget.window', ...]
         *     var allWidgets = Vmd.ClassManager.getNamesByExpression('widget.*');
         *
         *     // returns ['Vmd.data.Store', 'Vmd.data.ArrayProxy', ...]
         *     var allData = Vmd.ClassManager.getNamesByExpression('Vmd.data.*');
         *
         * @param {String} expression
         * @return {String[]} classNames
         */
        getNamesByExpression: function (expression) {
            var nameToAliasesMap = this.maps.nameToAliases,
                names = [],
                name, alias, aliases, possibleName, regex, i, ln;

            //<debug error>
            if (typeof expression != 'string' || expression.length < 1) {
                //throw new Error("[Vmd.ClassManager.getNamesByExpression] Expression " + expression + " is invalid, must be a non-empty string");
                Vmd.Error.raise({
                    sourceClass: "Vmd.ClassManager",
                    sourceMethod: "getNamesByExpression",
                    msg: "Expression " + expression + " is invalid, must be a non-empty string"
                });
            }
            //</debug>

            if (expression.indexOf('*') !== -1) {
                expression = expression.replace(/\*/g, '(.*?)');
                regex = new RegExp('^' + expression + '$');

                for (name in nameToAliasesMap) {
                    if (nameToAliasesMap.hasOwnProperty(name)) {
                        aliases = nameToAliasesMap[name];

                        if (name.search(regex) !== -1) {
                            names.push(name);
                        }
                        else {
                            for (i = 0, ln = aliases.length; i < ln; i++) {
                                alias = aliases[i];

                                if (alias.search(regex) !== -1) {
                                    names.push(name);
                                    break;
                                }
                            }
                        }
                    }
                }

            } else {
                possibleName = this.getNameByAlias(expression);

                if (possibleName) {
                    names.push(possibleName);
                } else {
                    possibleName = this.getNameByAlternate(expression);

                    if (possibleName) {
                        names.push(possibleName);
                    } else {
                        names.push(expression);
                    }
                }
            }

            return names;
        }
    };

    //<feature classSystem.alias>
    /**
     * @cfg {String[]} alias
     * @member Vmd.Class
     * List of short aliases for class names.  Most useful for defining xtypes for widgets:
     *
     *     Vmd.define('MyApp.CoolPanel', {
     *         extend: 'Vmd.panel.Panel',
     *         alias: ['widget.coolpanel'],
     *         title: 'Yeah!'
     *     });
     *
     *     // Using Vmd.create
     *     Vmd.create('widget.coolpanel');
     *
     *     // Using the shorthand for defining widgets by xtype
     *     Vmd.widget('panel', {
     *         items: [
     *             {xtype: 'coolpanel', html: 'Foo'},
     *             {xtype: 'coolpanel', html: 'Bar'}
     *         ]
     *     });
     *
     * Besides "widget" for xtype there are alias namespaces like "feature" for ftype and "plugin" for ptype.
     */
    Manager.registerPostprocessor('alias', function (name, cls, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(name, 'Vmd.ClassManager#aliasPostProcessor', arguments);
        //</debug>

        var aliases = data.alias,
            i, ln;

        for (i = 0, ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            this.setAlias(cls, alias);
        }

    }, ['xtype', 'alias']);
    //</feature>

    //<feature classSystem.singleton>
    /**
     * @cfg {Boolean} singleton
     * @member Vmd.Class
     * When set to true, the class will be instantiated as singleton.  For example:
     *
     *     Vmd.define('Logger', {
     *         singleton: true,
     *         log: function(msg) {
     *             console.log(msg);
     *         }
     *     });
     *
     *     Logger.log('Hello');
     */
    Manager.registerPostprocessor('singleton', function (name, cls, data, fn) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(name, 'Vmd.ClassManager#singletonPostProcessor', arguments);
        //</debug>

        if (data.singleton) {
            fn.call(this, name, new cls(), data);
        }
        else {
            return true;
        }
        return false;
    });
    //</feature>

    //<feature classSystem.alternateClassName>
    /**
     * @cfg {String/String[]} alternateClassName
     * @member Vmd.Class
     * Defines alternate names for this class.  For example:
     *
     *     Vmd.define('Developer', {
     *         alternateClassName: ['Coder', 'Hacker'],
     *         code: function(msg) {
     *             alert('Typing... ' + msg);
     *         }
     *     });
     *
     *     var joe = Vmd.create('Developer');
     *     joe.code('stackoverflow');
     *
     *     var rms = Vmd.create('Hacker');
     *     rms.code('hack hack');
     */
    Manager.registerPostprocessor('alternateClassName', function (name, cls, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(name, 'Vmd.ClassManager#alternateClassNamePostprocessor', arguments);
        //</debug>

        var alternates = data.alternateClassName,
            i, ln, alternate;

        if (!(alternates instanceof Array)) {
            alternates = [alternates];
        }

        for (i = 0, ln = alternates.length; i < ln; i++) {
            alternate = alternates[i];

            //<debug error>
            if (typeof alternate != 'string') {
                throw new Error("[Vmd.define] Invalid alternate of: '" + alternate + "' for class: '" + name + "'; must be a valid string");
            }
            //</debug>

            this.set(alternate, cls);
        }
    });
    //</feature>

    Vmd.apply(Vmd, {
        /**
         * Instantiate a class by either full name, alias or alternate name.
         *
         * If {@link Vmd.Loader} is {@link Vmd.Loader#setConfig enabled} and the class has
         * not been defined yet, it will attempt to load the class via synchronous loading.
         *
         * For example, all these three lines return the same result:
         *
         *      // alias
         *      var window = Vmd.create('widget.window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // alternate name
         *      var window = Vmd.create('Vmd.Window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // full class name
         *      var window = Vmd.create('Vmd.window.Window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // single object with xclass property:
         *      var window = Vmd.create({
         *          xclass: 'Vmd.window.Window', // any valid value for 'name' (above)
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         * @param {String} [name] The class name or alias. Can be specified as `xclass`
         * property if only one object parameter is specified.
         * @param {Object...} [args] Additional arguments after the name will be passed to
         * the class' constructor.
         * @return {Object} instance
         * @member Vmd
         * @method create
         */
        create: alias(Manager, 'instantiate'),

        /**
         * Convenient shorthand to create a widget by its xtype or a config object.
         * See also {@link Vmd.ClassManager#instantiateByAlias}.
         *
         *      var button = Vmd.widget('button'); // Equivalent to Vmd.create('widget.button');
         *
         *      var panel = Vmd.widget('panel', { // Equivalent to Vmd.create('widget.panel')
         *          title: 'Panel'
         *      });
         *
         *      var grid = Vmd.widget({
         *          xtype: 'grid',
         *          ...
         *      });
         *
         * If a {@link Vmd.Component component} instance is passed, it is simply returned.
         *
         * @member Vmd
         * @param {String} [name] The xtype of the widget to create.
         * @param {Object} [config] The configuration object for the widget constructor.
         * @return {Object} The widget instance
         */
        widget: function (name, config) {
            // forms:
            //      1: (xtype)
            //      2: (xtype, config)
            //      3: (config)
            //      4: (xtype, component)
            //      5: (component)
            //      
            var xtype = name,
                alias, className, T, load;

            if (typeof xtype != 'string') { // if (form 3 or 5)
                // first arg is config or component
                config = name; // arguments[0]
                xtype = config.xtype;
            } else {
                config = config || {};
            }

            if (config.isComponent) {
                return config;
            }

            alias = 'widget.' + xtype;
            className = Manager.getNameByAlias(alias);

            // this is needed to support demand loading of the class
            if (!className) {
                load = true;
            }

            T = Manager.get(className);
            if (load || !T) {
                return Manager.instantiateByAlias(alias, config);
            }
            return new T(config);
        },

        /**
         * @inheritdoc Vmd.ClassManager#instantiateByAlias
         * @member Vmd
         * @method createByAlias
         */
        createByAlias: alias(Manager, 'instantiateByAlias'),

        /**
         * Defines a class or override. A basic class is defined like this:
         *
         *      Vmd.define('My.awesome.Class', {
         *          someProperty: 'something',
         *
         *          someMethod: function(s) {
         *              alert(s + this.someProperty);
         *          }
         *
         *          ...
         *      });
         *
         *      var obj = new My.awesome.Class();
         *
         *      obj.someMethod('Say '); // alerts 'Say something'
         *
         * To create an anonymous class, pass `null` for the `className`:
         *
         *      Vmd.define(null, {
         *          constructor: function () {
         *              // ...
         *          }
         *      });
         *
         * In some cases, it is helpful to create a nested scope to contain some private
         * properties. The best way to do this is to pass a function instead of an object
         * as the second parameter. This function will be called to produce the class
         * body:
         *
         *      Vmd.define('MyApp.foo.Bar', function () {
         *          var id = 0;
         *
         *          return {
         *              nextId: function () {
         *                  return ++id;
         *              }
         *          };
         *      });
         * 
         * _Note_ that when using override, the above syntax will not override successfully, because
         * the passed function would need to be executed first to determine whether or not the result 
         * is an override or defining a new object. As such, an alternative syntax that immediately 
         * invokes the function can be used:
         * 
         *      Vmd.define('MyApp.override.BaseOverride', function () {
         *          var counter = 0;
         *
         *          return {
         *              override: 'Vmd.Component',
         *              logId: function () {
         *                  console.log(++counter, this.id);
         *              }
         *          };
         *      }());
         * 
         *
         * When using this form of `Vmd.define`, the function is passed a reference to its
         * class. This can be used as an efficient way to access any static properties you
         * may have:
         *
         *      Vmd.define('MyApp.foo.Bar', function (Bar) {
         *          return {
         *              statics: {
         *                  staticMethod: function () {
         *                      // ...
         *                  }
         *              },
         *
         *              method: function () {
         *                  return Bar.staticMethod();
         *              }
         *          };
         *      });
         *
         * To define an override, include the `override` property. The content of an
         * override is aggregated with the specified class in order to extend or modify
         * that class. This can be as simple as setting default property values or it can
         * extend and/or replace methods. This can also extend the statics of the class.
         *
         * One use for an override is to break a large class into manageable pieces.
         *
         *      // File: /src/app/Panel.js
         *
         *      Vmd.define('My.app.Panel', {
         *          extend: 'Vmd.panel.Panel',
         *          requires: [
         *              'My.app.PanelPart2',
         *              'My.app.PanelPart3'
         *          ]
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls Vmd.panel.Panel's constructor
         *              //...
         *          },
         *
         *          statics: {
         *              method: function () {
         *                  return 'abc';
         *              }
         *          }
         *      });
         *
         *      // File: /src/app/PanelPart2.js
         *      Vmd.define('My.app.PanelPart2', {
         *          override: 'My.app.Panel',
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls My.app.Panel's constructor
         *              //...
         *          }
         *      });
         *
         * Another use of overrides is to provide optional parts of classes that can be
         * independently required. In this case, the class may even be unaware of the
         * override altogether.
         *
         *      Vmd.define('My.ux.CoolTip', {
         *          override: 'Vmd.tip.ToolTip',
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls Vmd.tip.ToolTip's constructor
         *              //...
         *          }
         *      });
         *
         * The above override can now be required as normal.
         *
         *      Vmd.define('My.app.App', {
         *          requires: [
         *              'My.ux.CoolTip'
         *          ]
         *      });
         *
         * Overrides can also contain statics:
         *
         *      Vmd.define('My.app.BarMod', {
         *          override: 'Vmd.foo.Bar',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x * 2]); // call Vmd.foo.Bar.method
         *              }
         *          }
         *      });
         * 
         * Starting in version 4.2.2, overrides can declare their `compatibility` based
         * on the framework version or on versions of other packages. For details on the
         * syntax and options for these checks, see `Vmd.checkVersion`.
         * 
         * The simplest use case is to test framework version for compatibility:
         * 
         *      Vmd.define('App.overrides.grid.Panel', {
         *          override: 'Vmd.grid.Panel',
         *
         *          compatibility: '4.2.2', // only if framework version is 4.2.2
         *
         *          //...
         *      });
         * 
         * An array is treated as an OR, so if any specs match, the override is
         * compatible.
         * 
         *      Vmd.define('App.overrides.some.Thing', {
         *          override: 'Foo.some.Thing',
         *
         *          compatibility: [
         *              '4.2.2',
         *              'foo@1.0.1-1.0.2'
         *          ],
         *
         *          //...
         *      });
         * 
         * To require that all specifications match, an object can be provided:
         * 
         *      Vmd.define('App.overrides.some.Thing', {
         *          override: 'Foo.some.Thing',
         *
         *          compatibility: {
         *              and: [
         *                  '4.2.2',
         *                  'foo@1.0.1-1.0.2'
         *              ]
         *          },
         *
         *          //...
         *      });
         * 
         * Because the object form is just a recursive check, these can be nested:
         * 
         *      Vmd.define('App.overrides.some.Thing', {
         *          override: 'Foo.some.Thing',
         *
         *          compatibility: {
         *              and: [
         *                  '4.2.2',  // exactly version 4.2.2 of the framework *AND*
         *                  {
         *                      // either (or both) of these package specs:
         *                      or: [
         *                          'foo@1.0.1-1.0.2',
         *                          'bar@3.0+'
         *                      ]
         *                  }
         *              ]
         *          },
         *
         *          //...
         *      });
         *
         * IMPORTANT: An override is only included in a build if the class it overrides is
         * required. Otherwise, the override, like the target class, is not included. In
         * Sencha Cmd v4, the `compatibility` declaration can likewise be used to remove
         * incompatible overrides from a build.
         *
         * @param {String} className The class name to create in string dot-namespaced format, for example:
         * 'My.very.awesome.Class', 'FeedViewer.plugin.CoolPager'
         * It is highly recommended to follow this simple convention:
         *  - The root and the class name are 'CamelCased'
         *  - Everything else is lower-cased
         * Pass `null` to create an anonymous class.
         * @param {Object} data The key - value pairs of properties to apply to this class. Property names can be of any valid
         * strings, except those in the reserved listed below:
         *  - `mixins`
         *  - `statics`
         *  - `config`
         *  - `alias`
         *  - `xtype` (for {@link Vmd.Component Components} only)
         *  - `self`
         *  - `singleton`
         *  - `alternateClassName`
         *  - `override`
         *
         * @param {Function} [createdFn] Callback to execute after the class is created, the execution scope of which
         * (`this`) will be the newly created class itself.
         * @return {Vmd.Base}
         * @member Vmd
         */
        define: function (className, data, createdFn) {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(className, 'ClassManager#define', arguments);
            //</debug>

            if (data.override) {
                return Manager.createOverride.apply(Manager, arguments);
            }

            return Manager.create.apply(Manager, arguments);
        },

        /**
         * Undefines a class defined using the #define method. Typically used
         * for unit testing where setting up and tearing down a class multiple
         * times is required.  For example:
         * 
         *     // define a class
         *     Vmd.define('Foo', {
         *        ...
         *     });
         *     
         *     // run test
         *     
         *     // undefine the class
         *     Vmd.undefine('Foo');
         * @param {String} className The class name to undefine in string dot-namespaced format.
         * @private
         */
        undefine: function (className) {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(className, 'Vmd.ClassManager#undefine', arguments);
            //</debug>

            var classes = Manager.classes,
                maps = Manager.maps,
                aliasToName = maps.aliasToName,
                nameToAliases = maps.nameToAliases,
                alternateToName = maps.alternateToName,
                nameToAlternates = maps.nameToAlternates,
                aliases = nameToAliases[className],
                alternates = nameToAlternates[className],
                parts, partCount, namespace, i;

            delete Manager.namespaceParseCache[className];
            delete nameToAliases[className];
            delete nameToAlternates[className];
            delete classes[className];

            if (aliases) {
                for (i = aliases.length; i--;) {
                    delete aliasToName[aliases[i]];
                }
            }

            if (alternates) {
                for (i = alternates.length; i--;) {
                    delete alternateToName[alternates[i]];
                }
            }

            parts = Manager.parseNamespace(className);
            partCount = parts.length - 1;
            namespace = parts[0];

            for (i = 1; i < partCount; i++) {
                namespace = namespace[parts[i]];
                if (!namespace) {
                    return;
                }
            }

            // Old IE blows up on attempt to delete window property
            try {
                delete namespace[parts[partCount]];
            }
            catch (e) {
                namespace[parts[partCount]] = undefined;
            }
        },

        /**
         * @inheritdoc Vmd.ClassManager#getName
         * @member Vmd
         * @method getClassName
         */
        getClassName: alias(Manager, 'getName'),

        /**
         * Returns the displayName property or className or object. When all else fails, returns "Anonymous".
         * @param {Object} object
         * @return {String}
         */
        getDisplayName: function (object) {
            if (object) {
                if (object.displayName) {
                    return object.displayName;
                }

                if (object.$name && object.$class) {
                    return Vmd.getClassName(object.$class) + '#' + object.$name;
                }

                if (object.$className) {
                    return object.$className;
                }
            }

            return 'Anonymous';
        },

        /**
         * @inheritdoc Vmd.ClassManager#getClass
         * @member Vmd
         * @method getClass
         */
        getClass: alias(Manager, 'getClass'),

        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
         *
         *     Vmd.namespace('Company', 'Company.data');
         *
         *     // equivalent and preferable to the above syntax
         *     Vmd.ns('Company.data');
         *
         *     Company.Widget = function() { ... };
         *
         *     Company.data.CustomStore = function(config) { ... };
         *
         * @param {String...} namespaces
         * @return {Object} The namespace object.
         * (If multiple arguments are passed, this will be the last namespace created)
         * @member Vmd
         * @method namespace
         */
        namespace: alias(Manager, 'createNamespaces')
    });

    /**
     * Old name for {@link Vmd#widget}.
     * @deprecated 4.0.0 Use {@link Vmd#widget} instead.
     * @method createWidget
     * @member Vmd
     */
    Vmd.createWidget = Vmd.widget;

    /**
     * Convenient alias for {@link Vmd#namespace Vmd.namespace}.
     * @inheritdoc Vmd#namespace
     * @member Vmd
     * @method ns
     */
    Vmd.ns = Vmd.namespace;

    Class.registerPreprocessor('className', function (cls, data) {
        if (data.$className) {
            cls.$className = data.$className;
            //<debug>
            cls.displayName = cls.$className;
            //</debug>
        }

        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(cls, 'Vmd.ClassManager#classNamePreprocessor', arguments);
        //</debug>
    }, true, 'first');

    Class.registerPreprocessor('alias', function (cls, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(cls, 'Vmd.ClassManager#aliasPreprocessor', arguments);
        //</debug>

        var prototype = cls.prototype,
            xtypes = arrayFrom(data.xtype),
            aliases = arrayFrom(data.alias),
            widgetPrefix = 'widget.',
            widgetPrefixLength = widgetPrefix.length,
            xtypesChain = Array.prototype.slice.call(prototype.xtypesChain || []),
            xtypesMap = Vmd.merge({}, prototype.xtypesMap || {}),
            i, ln, alias, xtype;

        for (i = 0, ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            //<debug error>
            if (typeof alias != 'string' || alias.length < 1) {
                throw new Error("[Vmd.define] Invalid alias of: '" + alias + "' for class: '" + name + "'; must be a valid string");
            }
            //</debug>

            if (alias.substring(0, widgetPrefixLength) === widgetPrefix) {
                xtype = alias.substring(widgetPrefixLength);
                Vmd.Array.include(xtypes, xtype);
            }
        }

        cls.xtype = data.xtype = xtypes[0];
        data.xtypes = xtypes;

        for (i = 0, ln = xtypes.length; i < ln; i++) {
            xtype = xtypes[i];

            if (!xtypesMap[xtype]) {
                xtypesMap[xtype] = true;
                xtypesChain.push(xtype);
            }
        }

        data.xtypesChain = xtypesChain;
        data.xtypesMap = xtypesMap;

        Vmd.Function.interceptAfter(data, 'onClassCreated', function () {
            //<debug>
            Vmd.classSystemMonitor && Vmd.classSystemMonitor(cls, 'Vmd.ClassManager#aliasPreprocessor#afterClassCreated', arguments);
            //</debug>

            var mixins = prototype.mixins,
                key, mixin;

            for (key in mixins) {
                if (mixins.hasOwnProperty(key)) {
                    mixin = mixins[key];

                    xtypes = mixin.xtypes;

                    if (xtypes) {
                        for (i = 0, ln = xtypes.length; i < ln; i++) {
                            xtype = xtypes[i];

                            if (!xtypesMap[xtype]) {
                                xtypesMap[xtype] = true;
                                xtypesChain.push(xtype);
                            }
                        }
                    }
                }
            }
        });

        for (i = 0, ln = xtypes.length; i < ln; i++) {
            xtype = xtypes[i];

            //<debug error>
            if (typeof xtype != 'string' || xtype.length < 1) {
                throw new Error("[Vmd.define] Invalid xtype of: '" + xtype + "' for class: '" + name + "'; must be a valid non-empty string");
            }
            //</debug>

            Vmd.Array.include(aliases, widgetPrefix + xtype);
        }

        data.alias = aliases;

    }, ['xtype', 'alias']);

}(Vmd.Class, Vmd.Function.alias, Array.prototype.slice, Vmd.Array.from, Vmd.global));

// simple mechanism for automated means of injecting large amounts of dependency info
// at the appropriate time in the load cycle
if (Vmd._alternatesMetadata) {
    Vmd.ClassManager.addNameAlternateMappings(Vmd._alternatesMetadata);
    Vmd._alternatesMetadata = null;
}

if (Vmd._aliasMetadata) {
    Vmd.ClassManager.addNameAliasMappings(Vmd._aliasMetadata);
    Vmd._aliasMetadata = null;
}

/**
*@class Vmd.Loader
**/
Vmd.Loader = new function () {
    var Loader = this,
        Manager = Vmd.ClassManager,
        Class = Vmd.Class,
        flexSetter = Vmd.Function.flexSetter,
        alias = Vmd.Function.alias,
        pass = Vmd.Function.pass,
        defer = Vmd.Function.defer,
        arrayErase = Vmd.Array.erase,
        //<if nonBrowser>
        isNonBrowser = typeof window == 'undefined',
        isNodeJS = isNonBrowser && (typeof require == 'function'),
        isJsdb = isNonBrowser && typeof system != 'undefined' && system.program.search(/jsdb/) !== -1,
        isPhantomJS = (typeof phantom != 'undefined' && phantom.fs),
        //</if>
        dependencyProperties = ['extend', 'mixins', 'requires'],
        isInHistory = {},
        history = [],
        slashDotSlashRe = /\/\.\//g,
        dotRe = /\./g,
        setPathCount = 0;

    Vmd.apply(Loader, {

        /**
         * @private
         */
        isInHistory: isInHistory,

        /**
         * An array of class names to keep track of the dependency loading order.
         * This is not guaranteed to be the same everytime due to the asynchronous
         * nature of the Loader.
         *
         * @property {Array} history
         */
        history: history,

        /**
         * Configuration
         * @private
         */
        config: {
            /**
             * @cfg {Boolean} enabled
             * Whether or not to enable the dynamic dependency loading feature.
             */
            enabled: false,

            /**
             * @cfg {Boolean} scriptChainDelay
             * millisecond delay between asynchronous script injection (prevents stack overflow on some user agents)
             * 'false' disables delay but potentially increases stack load.
             */
            scriptChainDelay: false,

            /**
             * @cfg {Boolean} disableCaching
             * Appends current timestamp to script files to prevent caching.
             */
            disableCaching: true,

            /**
             * @cfg {String} disableCachingParam
             * The get parameter name for the cache buster's timestamp.
             */
            disableCachingParam: '_dc',

            /**
             * @cfg {Boolean} garbageCollect
             * True to prepare an asynchronous script tag for garbage collection (effective only
             * if {@link #preserveScripts preserveScripts} is false)
             */
            garbageCollect: false,

            /**
             * @cfg {Object} paths
             * The mapping from namespaces to file paths
             *
             *     {
             *         'Vmd': '.', // This is set by default, Vmd.layout.container.Container will be
             *                     // loaded from ./layout/Container.js
             *
             *         'My': './src/my_own_folder' // My.layout.Container will be loaded from
             *                                     // ./src/my_own_folder/layout/Container.js
             *     }
             *
             * Note that all relative paths are relative to the current HTML document.
             * If not being specified, for example, <code>Other.awesome.Class</code>
             * will simply be loaded from <code>./Other/awesome/Class.js</code>
             */
            paths: {
                'Vmd': '.'
            },

            /**
             * @cfg {Boolean} preserveScripts
             * False to remove and optionally {@link #garbageCollect garbage-collect} asynchronously loaded scripts,
             * True to retain script element for browser debugger compatibility and improved load performance.
             */
            preserveScripts: true,

            /**
             * @cfg {String} scriptCharset
             * Optional charset to specify encoding of dynamic script content.
             */
            scriptCharset: undefined
        },

        /**
         * Set the configuration for the loader. This should be called right after ext-(debug).js
         * is included in the page, and before Vmd.onReady. i.e:
         *
         *     <script type="text/javascript" src="ext-core-debug.js"></script>
         *     <script type="text/javascript">
         *         Vmd.Loader.setConfig({
         *           enabled: true,
         *           paths: {
         *               'My': 'my_own_path'
         *           }
         *         });
         *     </script>
         *     <script type="text/javascript">
         *         Vmd.require(...);
         *
         *         Vmd.onReady(function() {
         *           // application code here
         *         });
         *     </script>
         *
         * Refer to config options of {@link Vmd.Loader} for the list of possible properties
         *
         * @param {Object} config The config object to override the default values
         * @return {Vmd.Loader} this
         */
        setConfig: function (name, value) {
            if (Vmd.isObject(name) && arguments.length === 1) {
                Vmd.merge(Loader.config, name);

                if ('paths' in name) {
                    Vmd.app.collectNamespaces(name.paths);
                }
            }
            else {
                Loader.config[name] = (Vmd.isObject(value)) ? Vmd.merge(Loader.config[name], value) : value;

                if (name === 'paths') {
                    Vmd.app.collectNamespaces(value);
                }
            }

            return Loader;
        },

        /**
         * Get the config value corresponding to the specified name. If no name is given, will return the config object
         * @param {String} name The config property name
         * @return {Object}
         */
        getConfig: function (name) {
            if (name) {
                return Loader.config[name];
            }

            return Loader.config;
        },

        /**
         * Sets the path of a namespace.
         * For Example:
         *
         *     Vmd.Loader.setPath('Vmd', '.');
         *
         * @param {String/Object} name See {@link Vmd.Function#flexSetter flexSetter}
         * @param {String} [path] See {@link Vmd.Function#flexSetter flexSetter}
         * @return {Vmd.Loader} this
         * @method
         */
        setPath: flexSetter(function (name, path) {
            Loader.config.paths[name] = path;
            Vmd.app.namespaces[name] = true;
            setPathCount++;

            return Loader;
        }),

        /**
         * Sets a batch of path entries
         *
         * @param {Object } paths a set of className: path mappings
         * @return {Vmd.Loader} this
         */
        addClassPathMappings: function (paths) {
            var name;

            if (setPathCount == 0) {
                Loader.config.paths = paths;
            } else {
                for (name in paths) {
                    Loader.config.paths[name] = paths[name];
                }
            }
            setPathCount++;
            return Loader;
        },

        /**
         * Translates a className to a file path by adding the
         * the proper prefix and converting the .'s to /'s. For example:
         *
         *     Vmd.Loader.setPath('My', '/path/to/My');
         *
         *     alert(Vmd.Loader.getPath('My.awesome.Class')); // alerts '/path/to/My/awesome/Class.js'
         *
         * Note that the deeper namespace levels, if explicitly set, are always resolved first. For example:
         *
         *     Vmd.Loader.setPath({
         *         'My': '/path/to/lib',
         *         'My.awesome': '/other/path/for/awesome/stuff',
         *         'My.awesome.more': '/more/awesome/path'
         *     });
         *
         *     alert(Vmd.Loader.getPath('My.awesome.Class')); // alerts '/other/path/for/awesome/stuff/Class.js'
         *
         *     alert(Vmd.Loader.getPath('My.awesome.more.Class')); // alerts '/more/awesome/path/Class.js'
         *
         *     alert(Vmd.Loader.getPath('My.cool.Class')); // alerts '/path/to/lib/cool/Class.js'
         *
         *     alert(Vmd.Loader.getPath('Unknown.strange.Stuff')); // alerts 'Unknown/strange/Stuff.js'
         *
         * @param {String} className
         * @return {String} path
         */
        getPath: function (className, split) {
            var path = '',
                paths = Loader.config.paths,
                prefix = Loader.getPrefix(className);

            if (prefix.length > 0) {
                if (prefix === className) {
                    return paths[prefix];
                }

                path = paths[prefix];
                className = className.substring(prefix.length + 1);

                //特殊处理
                if (split) {
                    if (className.indexOf(split) != -1) {
                        className = className.replace(/\$/g, '/');
                    }
                }


            }

            if (path.length > 0) {
                path += '/';
            }

            //mafei特殊处理
            if (split) {
                return path.replace(slashDotSlashRe, '/') + className + '.js';
            }

            return path.replace(slashDotSlashRe, '/') + className.replace(dotRe, "/") + '.js';
        },

        /**
         * @private
         * @param {String} className
         */
        getPrefix: function (className) {
            var paths = Loader.config.paths,
                prefix, deepestPrefix = '';

            if (paths.hasOwnProperty(className)) {
                return className;
            }

            for (prefix in paths) {
                if (paths.hasOwnProperty(prefix) && prefix + '.' === className.substring(0, prefix.length + 1)) {
                    if (prefix.length > deepestPrefix.length) {
                        deepestPrefix = prefix;
                    }
                }
            }

            return deepestPrefix;
        },

        /**
         * @private
         * @param {String} className
         */
        isAClassNameWithAKnownPrefix: function (className) {
            var prefix = Loader.getPrefix(className);

            // we can only say it's really a class if className is not equal to any known namespace
            return prefix !== '' && prefix !== className;
        },

        /**
         * Loads all classes by the given names and all their direct dependencies; optionally executes
         * the given callback function when finishes, within the optional scope.
         *
         * {@link Vmd#require} is alias for {@link Vmd.Loader#require}.
         *
         * @param {String/Array} expressions Can either be a string or an array of string
         * @param {Function} fn (Optional) The callback function
         * @param {Object} scope (Optional) The execution scope (`this`) of the callback function
         * @param {String/Array} excludes (Optional) Classes to be excluded, useful when being used with expressions
         */
        require: function (expressions, fn, scope, excludes) {
            if (fn) {
                fn.call(scope);
            }
        },

        /**
         * Synchronously loads all classes by the given names and all their direct dependencies; optionally
         * executes the given callback function when finishes, within the optional scope.
         *
         * {@link Vmd#syncRequire} is alias for {@link Vmd.Loader#syncRequire}.
         *
         * @param {String/Array} expressions Can either be a string or an array of string
         * @param {Function} fn (Optional) The callback function
         * @param {Object} scope (Optional) The execution scope (`this`) of the callback function
         * @param {String/Array} excludes (Optional) Classes to be excluded, useful when being used with expressions
         */
        syncRequire: function () { },

        /**
         * Explicitly exclude files from being loaded. Useful when used in conjunction with a broad include expression.
         * Can be chained with more `require` and `exclude` methods, eg:
         *
         *     Vmd.exclude('Vmd.data.*').require('*');
         *
         *     Vmd.exclude('widget.button*').require('widget.*');
         *
         * {@link Vmd#exclude} is alias for {@link Vmd.Loader#exclude}.
         *
         * @param {Array} excludes
         * @return {Object} object contains `require` method for chaining
         */
        exclude: function (excludes) {
            return {
                require: function (expressions, fn, scope) {
                    return Loader.require(expressions, fn, scope, excludes);
                },

                syncRequire: function (expressions, fn, scope) {
                    return Loader.syncRequire(expressions, fn, scope, excludes);
                }
            };
        },

        /**
         * Add a new listener to be executed when all required scripts are fully loaded
         *
         * @param {Function} fn The function callback to be executed
         * @param {Object} scope The execution scope (<code>this</code>) of the callback function
         * @param {Boolean} withDomReady Whether or not to wait for document dom ready as well
         */
        onReady: function (fn, scope, withDomReady, options) {
            var oldFn;

            if (withDomReady !== false && Vmd.onDocumentReady) {
                oldFn = fn;

                fn = function () {
                    Vmd.onDocumentReady(oldFn, scope, options);
                };
            }

            fn.call(scope);
        }
    });

    //<feature classSystem.loader>
    var queue = [],
        isClassFileLoaded = {},
        isFileLoaded = {},
        classNameToFilePathMap = {},
        scriptElements = {},
        readyListeners = [],
        usedClasses = [],
        requiresMap = {},
        comparePriority = function (listenerA, listenerB) {
            return listenerB.priority - listenerA.priority;
        };

    Vmd.apply(Loader, {
        /**
         * @private
         */
        documentHead: typeof document != 'undefined' && (document.head || document.getElementsByTagName('head')[0]),

        /**
         * Flag indicating whether there are still files being loaded
         * @private
         */
        isLoading: false,

        /**
         * Maintain the queue for all dependencies. Each item in the array is an object of the format:
         *
         *     {
         *          requires: [...], // The required classes for this queue item
         *          callback: function() { ... } // The function to execute when all classes specified in requires exist
         *     }
         *
         * @private
         */
        queue: queue,

        /**
         * Maintain the list of files that have already been handled so that they never get double-loaded
         * @private
         */
        isClassFileLoaded: isClassFileLoaded,

        /**
         * @private
         */
        isFileLoaded: isFileLoaded,

        /**
         * Maintain the list of listeners to execute when all required scripts are fully loaded
         * @private
         */
        readyListeners: readyListeners,

        /**
         * Contains classes referenced in `uses` properties.
         * @private
         */
        optionalRequires: usedClasses,

        /**
         * Map of fully qualified class names to an array of dependent classes.
         * @private
         */
        requiresMap: requiresMap,

        /**
         * @private
         */
        numPendingFiles: 0,

        /**
         * @private
         */
        numLoadedFiles: 0,

        /** @private */
        hasFileLoadError: false,

        /**
         * @private
         */
        classNameToFilePathMap: classNameToFilePathMap,

        /**
         * The number of scripts loading via loadScript.
         * @private
         */
        scriptsLoading: 0,

        /**
         * @private
         */
        syncModeEnabled: false,

        scriptElements: scriptElements,

        /**
         * Refresh all items in the queue. If all dependencies for an item exist during looping,
         * it will execute the callback and call refreshQueue again. Triggers onReady when the queue is
         * empty
         * @private
         */
        refreshQueue: function () {
            var ln = queue.length,
                i, item, j, requires;

            // When the queue of loading classes reaches zero, trigger readiness

            if (!ln && !Loader.scriptsLoading) {
                return Loader.triggerReady();
            }

            for (i = 0; i < ln; i++) {
                item = queue[i];

                if (item) {
                    requires = item.requires;

                    // Don't bother checking when the number of files loaded
                    // is still less than the array length
                    if (requires.length > Loader.numLoadedFiles) {
                        continue;
                    }

                    // Remove any required classes that are loaded
                    for (j = 0; j < requires.length;) {
                        if (Manager.isCreated(requires[j])) {
                            // Take out from the queue
                            arrayErase(requires, j, 1);
                        }
                        else {
                            j++;
                        }
                    }

                    // If we've ended up with no required classes, call the callback
                    if (item.requires.length === 0) {
                        arrayErase(queue, i, 1);
                        item.callback.call(item.scope);
                        Loader.refreshQueue();
                        break;
                    }
                }
            }

            return Loader;
        },

        /**
         * Inject a script element to document's head, call onLoad and onError accordingly
         * @private
         */
        injectScriptElement: function (url, onLoad, onError, scope, charset) {
            var script = document.createElement('script'),
                dispatched = false,
                config = Loader.config,
                onLoadFn = function () {

                    if (!dispatched) {
                        dispatched = true;
                        script.onload = script.onreadystatechange = script.onerror = null;
                        if (typeof config.scriptChainDelay == 'number') {
                            //free the stack (and defer the next script)
                            defer(onLoad, config.scriptChainDelay, scope);
                        } else {
                            onLoad.call(scope);
                        }
                        Loader.cleanupScriptElement(script, config.preserveScripts === false, config.garbageCollect);
                    }

                },
                onErrorFn = function (arg) {
                    defer(onError, 1, scope);   //free the stack
                    Loader.cleanupScriptElement(script, config.preserveScripts === false, config.garbageCollect);
                };

            script.type = 'text/javascript';
            script.onerror = onErrorFn;
            charset = charset || config.scriptCharset;
            if (charset) {
                script.charset = charset;
            }

            /*
             * IE9 Standards mode (and others) SHOULD follow the load event only
             * (Note: IE9 supports both onload AND readystatechange events)
             */
            if ('addEventListener' in script) {
                script.onload = onLoadFn;
            } else if ('readyState' in script) {   // for <IE9 Compatability
                script.onreadystatechange = function () {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        onLoadFn();
                    }
                };
            } else {
                script.onload = onLoadFn;
            }

            script.src = url;
            (Loader.documentHead || document.getElementsByTagName('head')[0]).appendChild(script);

            return script;
        },

        /**
         * @private
         */
        removeScriptElement: function (url) {
            if (scriptElements[url]) {
                Loader.cleanupScriptElement(scriptElements[url], true, !!Loader.getConfig('garbageCollect'));
                delete scriptElements[url];
            }

            return Loader;
        },

        /**
         * @private
         */
        cleanupScriptElement: function (script, remove, collect) {
            var prop;
            script.onload = script.onreadystatechange = script.onerror = null;
            if (remove) {
                Vmd.removeNode(script);       // Remove, since its useless now
                if (collect) {
                    for (prop in script) {
                        try {
                            if (prop != 'src') {
                                // If we set the src property to null IE
                                // will try and request a script at './null'
                                script[prop] = null;
                            }
                            delete script[prop];      // and prepare for GC
                        } catch (cleanEx) {
                            //ignore
                        }
                    }
                }
            }

            return Loader;
        },

        /**
         * Loads the specified script URL and calls the supplied callbacks. If this method
         * is called before {@link Vmd#isReady}, the script's load will delay the transition
         * to ready. This can be used to load arbitrary scripts that may contain further
         * {@link Vmd#require Vmd.require} calls.
         *
         * @param {Object/String} options The options object or simply the URL to load.
         * @param {String} options.url The URL from which to load the script.
         * @param {Function} [options.onLoad] The callback to call on successful load.
         * @param {Function} [options.onError] The callback to call on failure to load.
         * @param {Object} [options.scope] The scope (`this`) for the supplied callbacks.
         */
        loadScript: function (options) {
            var config = Loader.getConfig(),
                isString = typeof options == 'string',
                url = isString ? options : options.url,
                onError = !isString && options.onError,
                onLoad = !isString && options.onLoad,
                scope = !isString && options.scope,
                onScriptError = function () {
                    Loader.numPendingFiles--;
                    Loader.scriptsLoading--;

                    if (onError) {
                        onError.call(scope, "加载失败 '" + url + "', 请检查文件是否存在！");
                    }

                    if (Loader.numPendingFiles + Loader.scriptsLoading === 0) {
                        Loader.refreshQueue();
                    }
                },
                onScriptLoad = function () {
                    Loader.numPendingFiles--;
                    Loader.scriptsLoading--;

                    if (onLoad) {
                        onLoad.call(scope);
                    }

                    if (Loader.numPendingFiles + Loader.scriptsLoading === 0) {
                        Loader.refreshQueue();
                    }
                },
                src;

            Loader.isLoading = true;
            Loader.numPendingFiles++;
            Loader.scriptsLoading++;

            src = config.disableCaching ?
                (url + '?' + config.disableCachingParam + '=' + Vmd.Date.now()) : url;

            scriptElements[url] = Loader.injectScriptElement(src, onScriptLoad, onScriptError);
        },

        /**
         * Load a script file, supports both asynchronous and synchronous approaches
         * @private
         */
        loadScriptFile: function (url, onLoad, onError, scope, synchronous) {
            if (isFileLoaded[url]) {
                return Loader;
            }

            var config = Loader.getConfig(),
                noCacheUrl = url + (config.disableCaching ? ('?' + config.disableCachingParam + '=' + Vmd.Date.now()) : ''),
                isCrossOriginRestricted = false,
                xhr, status, onScriptError,
                debugSourceURL = "";

            scope = scope || Loader;

            Loader.isLoading = true;

            if (!synchronous) {
                onScriptError = function () {
                    //<debug error>
                    onError.call(scope, "加载失败 '" + url + "', 请检查文件是否存在！", synchronous);
                    //</debug>
                };

                scriptElements[url] = Loader.injectScriptElement(noCacheUrl, onLoad, onScriptError, scope);
            } else {
                if (typeof XMLHttpRequest != 'undefined') {
                    xhr = new XMLHttpRequest();
                } else {
                    xhr = new ActiveXObject('Microsoft.XMLHTTP');
                }

                try {
                    xhr.open('GET', noCacheUrl, false);
                    xhr.send(null);
                } catch (e) {
                    isCrossOriginRestricted = true;
                }

                status = (xhr.status === 1223) ? 204 :
                    (xhr.status === 0 && ((self.location || {}).protocol == 'file:' || (self.location || {}).protocol == 'ionp:')) ? 200 : xhr.status;

                isCrossOriginRestricted = isCrossOriginRestricted || (status === 0);

                if (isCrossOriginRestricted
                    //<if isNonBrowser>
                    && !isPhantomJS
                    //</if>
                ) {
                    //<debug error>
                    onError.call(Loader, "Failed loading synchronously via XHR: '" + url + "'; It's likely that the file is either " +
                                       "being loaded from a different domain or from the local file system whereby cross origin " +
                                       "requests are not allowed due to security reasons. Use asynchronous loading with " +
                                       "Vmd.require instead.", synchronous);
                    //</debug>
                }
                else if ((status >= 200 && status < 300) || (status === 304)
                    //<if isNonBrowser>
                    || isPhantomJS
                    //</if>
                ) {
                    // Debugger friendly, file names are still shown even though they're eval'ed code
                    // Breakpoints work on both Firebug and Chrome's Web Inspector
                    if (!Vmd.isIE) {
                        debugSourceURL = "\n//@ sourceURL=" + url;
                    }
                    //debugger
                    var script = function (text) {
                        if (!text) return text;
                        if (window.execScript) {
                            window.execScript(text);
                        } else {
                            var script = document.createElement('script');
                            script.setAttribute('type', 'text/javascript');
                            script.text = text;
                            document.head.appendChild(script);
                            document.head.removeChild(script);
                        }
                        return text;
                    }
                    //Vmd.globalEval(xhr.responseText + debugSourceURL);
                    script(xhr.responseText + debugSourceURL)
                    onLoad.call(scope);
                }
                else {
                    //<debug>
                    onError.call(Loader, "Failed loading synchronously via XHR: '" + url + "'; please " +
                                       "verify that the file exists. " +
                                       "XHR status code: " + status, synchronous);
                    //</debug>
                }

                // Prevent potential IE memory leak
                xhr = null;
            }
        },

        // documented above
        syncRequire: function () {
            var syncModeEnabled = Loader.syncModeEnabled;

            if (!syncModeEnabled) {
                Loader.syncModeEnabled = true;
            }

            Loader.require.apply(Loader, arguments);

            if (!syncModeEnabled) {
                Loader.syncModeEnabled = false;
            }

            Loader.refreshQueue();
        },

        // documented above
        require: function (expressions, fn, scope, excludes) {
            var excluded = {},
                included = {},
                excludedClassNames = [],
                possibleClassNames = [],
                classNames = [],
                _classNames = [],
                references = [],
                callback,
                syncModeEnabled,
                filePath, expression, _expression, exclude, className,
                possibleClassName, i, j, ln, subLn, clsSplit = '$', vmdux = 'vmd.ux.';

            if (excludes) {
                // Convert possible single string to an array.
                excludes = (typeof excludes === 'string') ? [excludes] : excludes;

                for (i = 0, ln = excludes.length; i < ln; i++) {
                    exclude = excludes[i];

                    if (typeof exclude == 'string' && exclude.length > 0) {
                        excludedClassNames = Manager.getNamesByExpression(exclude);

                        for (j = 0, subLn = excludedClassNames.length; j < subLn; j++) {
                            excluded[excludedClassNames[j]] = true;
                        }
                    }
                }
            }

            // Convert possible single string to an array.
            expressions = (typeof expressions === 'string') ? [expressions] : (expressions ? expressions : []);
            //mafei
            var _copyExpressions = Vmd.clone(expressions);
            expressions.forEach(function (item, index) {

                if (item.indexOf(clsSplit) != -1) {
                    var arr = item.split(clsSplit);
                    item = vmdux + arr[arr.length - 1];
                    expressions[index] = item;
                }
            })

            if (fn) {
                if (fn.length > 0) {
                    callback = function () {
                        var classes = [],
                            i, ln;

                        for (i = 0, ln = references.length; i < ln; i++) {
                            classes.push(Manager.get(references[i]));
                        }

                        return fn.apply(this, classes);
                    };
                }
                else {
                    callback = fn;
                }
            }
            else {
                callback = Vmd.emptyFn;
            }

            scope = scope || Vmd.global;

            for (i = 0, ln = expressions.length; i < ln; i++) {
                expression = expressions[i];
                _expression = _copyExpressions[i];
                if (typeof expression == 'string' && expression.length > 0) {
                    possibleClassNames = Manager.getNamesByExpression(expression);
                    subLn = possibleClassNames.length;

                    for (j = 0; j < subLn; j++) {
                        possibleClassName = possibleClassNames[j];

                        if (excluded[possibleClassName] !== true) {
                            references.push(possibleClassName);

                            if (!Manager.isCreated(possibleClassName) && !included[possibleClassName]) {
                                included[possibleClassName] = true;
                                classNames.push(possibleClassName);
                                _classNames.push(_expression);
                            }
                        }
                    }
                }
            }

            // If the dynamic dependency feature is not being used, throw an error
            // if the dependencies are not defined
            if (classNames.length > 0) {
                if (!Loader.config.enabled) {
                    //throw new Error("Vmd.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
                    //         "Missing required class" + ((classNames.length > 1) ? "es" : "") + ": " + classNames.join(', '));
                    Vmd.Error.raise({
                        sourceClass: "Vmd.Loader",
                        sourceMethod: "require",
                        msg: "Vmd.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
                             "Missing required class" + ((classNames.length > 1) ? "es" : "") + ": " + classNames.join(', ')
                    });
                }
            }
            else {
                callback.call(scope);
                return Loader;
            }

            syncModeEnabled = Loader.syncModeEnabled;

            if (!syncModeEnabled) {
                queue.push({
                    requires: classNames.slice(), // this array will be modified as the queue is processed,
                    // so we need a copy of it
                    callback: callback,
                    scope: scope
                });
            }

            ln = classNames.length;

            for (i = 0; i < ln; i++) {
                className = classNames[i];
                if (_classNames[i].indexOf(clsSplit) != -1) {
                    className = _classNames[i];
                    filePath = Loader.getPath(className, clsSplit);
                } else {
                    filePath = Loader.getPath(className);
                }

                // If we are synchronously loading a file that has already been asychronously loaded before
                // we need to destroy the script tag and revert the count
                // This file will then be forced loaded in synchronous
                if (syncModeEnabled && isClassFileLoaded.hasOwnProperty(className)) {
                    if (!isClassFileLoaded[className]) {
                        Loader.numPendingFiles--;
                        Loader.removeScriptElement(filePath);
                        delete isClassFileLoaded[className];
                    }
                }

                if (!isClassFileLoaded.hasOwnProperty(className)) {
                    isClassFileLoaded[className] = false;
                    classNameToFilePathMap[className] = filePath;

                    Loader.numPendingFiles++;
                    Loader.loadScriptFile(
                        filePath,
                        pass(Loader.onFileLoaded, [className, filePath], Loader),
                        pass(Loader.onFileLoadError, [className, filePath], Loader),
                        Loader,
                        syncModeEnabled
                    );
                }
            }

            if (syncModeEnabled) {
                callback.call(scope);

                if (ln === 1) {
                    return Manager.get(className);
                }
            }

            return Loader;
        },

        /**
         * @private
         * @param {String} className
         * @param {String} filePath
         */
        onFileLoaded: function (className, filePath) {

            var loaded = isClassFileLoaded[className];
            Loader.numLoadedFiles++;

            isClassFileLoaded[className] = true;
            isFileLoaded[filePath] = true;

            // In FF, when we sync load something that has had a script tag inserted, the load event may
            // sometimes fire even if we clean it up and set it to null, so check if we're already loaded here.
            if (!loaded) {
                Loader.numPendingFiles--;
            }

            if (Loader.numPendingFiles === 0) {
                Loader.refreshQueue();
            }
            //<debug>
            if (!Loader.syncModeEnabled && Loader.numPendingFiles === 0 && Loader.isLoading && !Loader.hasFileLoadError) {
                var missingClasses = [],
                    missingPaths = [],
                    requires,
                    i, ln, j, subLn;

                for (i = 0, ln = queue.length; i < ln; i++) {
                    requires = queue[i].requires;

                    for (j = 0, subLn = requires.length; j < subLn; j++) {
                        if (isClassFileLoaded[requires[j]]) {
                            missingClasses.push(requires[j]);
                        }
                    }
                }

                if (missingClasses.length < 1) {
                    return;
                }

                missingClasses = Vmd.Array.filter(Vmd.Array.unique(missingClasses), function (item) {
                    return !requiresMap.hasOwnProperty(item);
                }, Loader);

                if (missingClasses.length < 1) {
                    return;
                }

                for (i = 0, ln = missingClasses.length; i < ln; i++) {
                    missingPaths.push(classNameToFilePathMap[missingClasses[i]]);
                }

                throw new Error("The following classes are not declared even if their files have been " +
                    "loaded: '" + missingClasses.join("', '") + "'. Please check the source code of their " +
                    "corresponding files for possible typos: '" + missingPaths.join("', '"));
            }
            //</debug>

        },

        /**
         * @private
         */
        onFileLoadError: function (className, filePath, errorMessage, isSynchronous) {
            Loader.numPendingFiles--;
            Loader.hasFileLoadError = true;

            //<debug error>
            //throw new Error("[Vmd.Loader] " + errorMessage);
            //</debug>

            Vmd.Error.raise({
                sourceClass: "Vmd.Loader",
                classToLoad: className,
                loadPath: filePath,
                loadingType: isSynchronous ? 'synchronous' : 'async',
                msg: errorMessage
            });
        },

        /**
         * @private
         * Ensure that any classes referenced in the `uses` property are loaded.
         */
        addUsedClasses: function (classes) {
            var cls, i, ln;

            if (classes) {
                classes = (typeof classes == 'string') ? [classes] : classes;
                for (i = 0, ln = classes.length; i < ln; i++) {
                    cls = classes[i];
                    if (typeof cls == 'string' && !Vmd.Array.contains(usedClasses, cls)) {
                        usedClasses.push(cls);
                    }
                }
            }

            return Loader;
        },

        /**
         * @private
         */
        triggerReady: function () {
            var listener,
                refClasses = usedClasses;

            if (Loader.isLoading) {
                Loader.isLoading = false;

                if (refClasses.length !== 0) {
                    // Clone then empty the array to eliminate potential recursive loop issue
                    refClasses = refClasses.slice();
                    usedClasses.length = 0;
                    // this may immediately call us back if all 'uses' classes
                    // have been loaded
                    Loader.require(refClasses, Loader.triggerReady, Loader);
                    return Loader;
                }
            }

            Vmd.Array.sort(readyListeners, comparePriority);

            // this method can be called with Loader.isLoading either true or false
            // (can be called with false when all 'uses' classes are already loaded)
            // this may bypass the above if condition
            while (readyListeners.length && !Loader.isLoading) {
                // calls to refreshQueue may re-enter triggerReady
                // so we cannot necessarily iterate the readyListeners array
                listener = readyListeners.shift();
                listener.fn.call(listener.scope);
            }

            return Loader;
        },

        // Documented above already
        onReady: function (fn, scope, withDomReady, options) {
            var oldFn;

            if (withDomReady !== false && Vmd.onDocumentReady) {
                oldFn = fn;

                fn = function () {
                    Vmd.onDocumentReady(oldFn, scope, options);
                };
            }

            if (!Loader.isLoading) {
                fn.call(scope);
            }
            else {
                readyListeners.push({
                    fn: fn,
                    scope: scope,
                    priority: (options && options.priority) || 0
                });
            }
        },

        /**
         * @private
         * @param {String} className
         */
        historyPush: function (className) {
            if (className && isClassFileLoaded.hasOwnProperty(className) && !isInHistory[className]) {
                isInHistory[className] = true;
                history.push(className);
            }
            return Loader;
        }
    });

    /**
     * Turns on or off the "cache buster" applied to dynamically loaded scripts. Normally
     * dynamically loaded scripts have an extra query parameter appended to avoid stale
     * cached scripts. This method can be used to disable this mechanism, and is primarily
     * useful for testing. This is done using a cookie.
     * @param {Boolean} disable True to disable the cache buster.
     * @param {String} [path="/"] An optional path to scope the cookie.
     * @private
     */
    Vmd.disableCacheBuster = function (disable, path) {
        var date = new Date();
        date.setTime(date.getTime() + (disable ? 10 * 365 : -1) * 24 * 60 * 60 * 1000);
        date = date.toGMTString();
        document.cookie = 'ext-cache=1; expires=' + date + '; path=' + (path || '/');
    };

    //<if nonBrowser>
    if (isNonBrowser) {
        if (isNodeJS) {
            Vmd.apply(Loader, {
                syncModeEnabled: true,
                setPath: flexSetter(function (name, path) {
                    path = require('fs').realpathSync(path);
                    Loader.config.paths[name] = path;

                    return Loader;
                }),

                loadScriptFile: function (filePath, onLoad, onError, scope, synchronous) {
                    require(filePath);
                    onLoad.call(scope);
                }
            });
        }
        else if (isJsdb) {
            Vmd.apply(Loader, {
                syncModeEnabled: true,
                loadScriptFile: function (filePath, onLoad, onError, scope, synchronous) {
                    load(filePath);
                    onLoad.call(scope);
                }
            });
        }
    }
    //</if>
    //</feature>

    /**
     * @member Vmd
     * @method require
     * @inheritdoc Vmd.Loader#require
     */
    Vmd.require = alias(Loader, 'require');

    /**
     * @member Vmd
     * @method syncRequire
     * @inheritdoc Vmd.Loader#syncRequire
     */
    Vmd.syncRequire = alias(Loader, 'syncRequire');

    /**
     * Convenient shortcut to {@link Vmd.Loader#exclude}
     * @member Vmd
     * @method exclude
     * @inheritdoc Vmd.Loader#exclude
     */
    Vmd.exclude = alias(Loader, 'exclude');

    /**
     * @member Vmd
     * @method onReady
     * @ignore
     */
    Vmd.onReady = function (fn, scope, options) {
        Loader.onReady(fn, scope, true, options);
    };

    /**
     * @cfg {String[]} requires
     * @member Vmd.Class
     * List of classes that have to be loaded before instantiating this class.
     * For example:
     *
     *     Vmd.define('Mother', {
     *         requires: ['Child'],
     *         giveBirth: function() {
     *             // we can be sure that child class is available.
     *             return new Child();
     *         }
     *     });
     */
    Class.registerPreprocessor('loader', function (cls, data, hooks, continueFn) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(cls, 'Vmd.Loader#loaderPreprocessor', arguments);
        //</debug>

        var me = this,
            dependencies = [],
            dependency,
            className = Manager.getName(cls),
            i, j, ln, subLn, value, propertyName, propertyValue,
            requiredMap, requiredDep;

        /*
        Loop through the dependencyProperties, look for string class names and push
        them into a stack, regardless of whether the property's value is a string, array or object. For example:
        {
              extend: 'Vmd.MyClass',
              requires: ['Vmd.some.OtherClass'],
              mixins: {
                  observable: 'Vmd.util.Observable';
              }
        }
        which will later be transformed into:
        {
              extend: Vmd.MyClass,
              requires: [Vmd.some.OtherClass],
              mixins: {
                  observable: Vmd.util.Observable;
              }
        }
        */

        for (i = 0, ln = dependencyProperties.length; i < ln; i++) {
            propertyName = dependencyProperties[i];

            if (data.hasOwnProperty(propertyName)) {
                propertyValue = data[propertyName];

                if (typeof propertyValue == 'string') {
                    dependencies.push(propertyValue);
                }
                else if (propertyValue instanceof Array) {
                    for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                        value = propertyValue[j];

                        if (typeof value == 'string') {
                            dependencies.push(value);
                        }
                    }
                }
                else if (typeof propertyValue != 'function') {
                    for (j in propertyValue) {
                        if (propertyValue.hasOwnProperty(j)) {
                            value = propertyValue[j];

                            if (typeof value == 'string') {
                                dependencies.push(value);
                            }
                        }
                    }
                }
            }
        }

        if (dependencies.length === 0) {
            return;
        }

        //<feature classSystem.loader>
        //<debug error>
        var deadlockPath = [],
            detectDeadlock;

        /*
        Automatically detect deadlocks before-hand,
        will throw an error with detailed path for ease of debugging. Examples of deadlock cases:

        - A extends B, then B extends A
        - A requires B, B requires C, then C requires A

        The detectDeadlock function will recursively transverse till the leaf, hence it can detect deadlocks
        no matter how deep the path is.
        */

        if (className) {
            requiresMap[className] = dependencies;
            //<debug>
            requiredMap = Loader.requiredByMap || (Loader.requiredByMap = {});

            for (i = 0, ln = dependencies.length; i < ln; i++) {
                dependency = dependencies[i];
                (requiredMap[dependency] || (requiredMap[dependency] = [])).push(className);
            }
            //</debug>
            detectDeadlock = function (cls) {
                deadlockPath.push(cls);

                if (requiresMap[cls]) {
                    if (Vmd.Array.contains(requiresMap[cls], className)) {
                        //throw new Error("Deadlock detected while loading dependencies! '" + className + "' and '" +
                        //        deadlockPath[1] + "' " + "mutually require each other. Path: " +
                        //        deadlockPath.join(' -> ') + " -> " + deadlockPath[0]);

                        Vmd.Error.raise({
                            sourceClass: "Vmd.Loader",
                            msg: "Deadlock detected while loading dependencies! '" + className + "' and '" +
                                deadlockPath[1] + "' " + "mutually require each other. Path: " +
                                deadlockPath.join(' -> ') + " -> " + deadlockPath[0]
                        });
                    }

                    for (i = 0, ln = requiresMap[cls].length; i < ln; i++) {
                        detectDeadlock(requiresMap[cls][i]);
                    }
                }
            };

            detectDeadlock(className);
        }

        //</debug>
        //</feature>

        Loader.require(dependencies, function () {
            for (i = 0, ln = dependencyProperties.length; i < ln; i++) {
                propertyName = dependencyProperties[i];

                if (data.hasOwnProperty(propertyName)) {
                    propertyValue = data[propertyName];

                    if (typeof propertyValue == 'string') {
                        data[propertyName] = Manager.get(propertyValue);
                    }
                    else if (propertyValue instanceof Array) {
                        for (j = 0, subLn = propertyValue.length; j < subLn; j++) {
                            value = propertyValue[j];

                            if (typeof value == 'string') {
                                data[propertyName][j] = Manager.get(value);
                            }
                        }
                    }
                    else if (typeof propertyValue != 'function') {
                        for (var k in propertyValue) {
                            if (propertyValue.hasOwnProperty(k)) {
                                value = propertyValue[k];

                                if (typeof value == 'string') {
                                    data[propertyName][k] = Manager.get(value);
                                }
                            }
                        }
                    }
                }
            }

            continueFn.call(me, cls, data, hooks);
        });

        return false;
    }, true, 'after', 'className');

    //<feature classSystem.loader>
    /**
     * @cfg {String[]} uses
     * @member Vmd.Class
     * List of optional classes to load together with this class. These aren't neccessarily loaded before
     * this class is created, but are guaranteed to be available before Vmd.onReady listeners are
     * invoked. For example:
     *
     *     Vmd.define('Mother', {
     *         uses: ['Child'],
     *         giveBirth: function() {
     *             // This code might, or might not work:
     *             // return new Child();
     *
     *             // Instead use Vmd.create() to load the class at the spot if not loaded already:
     *             return Vmd.create('Child');
     *         }
     *     });
     */
    Manager.registerPostprocessor('uses', function (name, cls, data) {
        //<debug>
        Vmd.classSystemMonitor && Vmd.classSystemMonitor(cls, 'Vmd.Loader#usesPostprocessor', arguments);
        //</debug>

        var uses = data.uses;
        if (uses) {
            Loader.addUsedClasses(uses);
        }
    });

    Manager.onCreated(Loader.historyPush);
    //</feature>
};

// simple mechanism for automated means of injecting large amounts of dependency info
// at the appropriate time in the load cycle
if (Vmd._classPathMetadata) {
    Vmd.Loader.addClassPathMappings(Vmd._classPathMetadata);
    Vmd._classPathMetadata = null;
}

// initalize the default path of the framework
(function () {
    var scripts = document.getElementsByTagName('script'),
        currentScript = scripts[scripts.length - 1],
        src = currentScript.src,
        path = src.substring(0, src.lastIndexOf('/') + 1),
        Loader = Vmd.Loader;

    //<debug>
    if (src.indexOf("/platform/core/src/class/") != -1) {
        path = path + "../../../../extjs/";
    } else if (src.indexOf("/core/src/class/") != -1) {
        path = path + "../../../";
    }
    //</debug>

    Loader.setConfig({
        enabled: true,
        disableCaching:
            //<debug>
            (/[?&](?:cache|disableCacheBuster)\b/i.test(location.search) ||
             /(^|[ ;])ext-cache=1/.test(document.cookie)) ? false :
            //</debug>
            true,
        paths: {
            'Vmd': path + 'src'
        }
    });
})();

// allows a tools like dynatrace to deterministically detect onReady state by invoking
// a callback (intended for external consumption)
Vmd._endTime = new Date().getTime();
if (Vmd._beforereadyhandler) {
    Vmd._beforereadyhandler();
}
Vmd.Error = function (message) {

    this.message = (this.lang[message]) ? this.lang[message] : message;
};

Vmd.Error.prototype = new Error();
Vmd.apply(Vmd.Error.prototype, {

    lang: {},

    name: 'Vmd.Error',

    getName: function () {
        return this.name;
    },

    getMessage: function () {
        return this.message;
    },

    toJson: function () {
        return Vmd.encode(this);
    }
});


Vmd.Error = Vmd.extend(Error, {
    statics: {
        /**
         * @property {Boolean} ignore
         * Static flag that can be used to globally disable error reporting to the browser if set to true
         * (defaults to false). Note that if you ignore Vmd errors it's likely that some other code may fail
         * and throw a native JavaScript error thereafter, so use with caution. In most cases it will probably
         * be preferable to supply a custom error {@link #handle handling} function instead.
         *
         * Example usage:
         *
         *     Vmd.Error.ignore = true;
         *
         * @static
         */
        ignore: false,

        /**
         * Example usage:
         *
         *     Vmd.Error.raise('A simple string error message');
         *
         *     // or...
         *
         *     Vmd.define('Vmd.Foo', {
         *         doSomething: function(option){
         *             if (someCondition === false) {
         *                 Vmd.Error.raise({
         *                     msg: 'You cannot do that!',
         *                     option: option,   // whatever was passed into the method
         *                     'error code': 100 // other arbitrary info
         *                 });
         *             }
         *         }
         *     });
         *
         * @param {String/Object} err The error message string, or an object containing the attribute "msg" that will be
         * used as the error message. Any other data included in the object will also be logged to the browser console,
         * if available.
         * @static
         */
        raise: function (err) {
            err = err || {};
            if (Vmd.isString(err)) {
                err = { msg: err };
            }

            var method = this.raise.caller,
                msg;

            if (method) {
                if (method.$name) {
                    err.sourceMethod = method.$name;
                }
                if (method.$owner) {
                    err.sourceClass = method.$owner.$className;
                }
            }

            if (Vmd.Error.handle(err) !== true) {
                msg = Vmd.Error.prototype.toString.call(err);

                Vmd.log({
                    msg: msg,
                    level: 'error',
                    dump: err,
                    stack: true
                });

                if (err.sourceClass == 'Vmd.Loader') {

                    //Vmd.Msg.alert('动态加载失败', err.msg)
                    alert(err.msg)
                }

                throw new Vmd.Error(err);
            }
        },

        /**
         * Globally handle any Vmd errors that may be raised, optionally providing custom logic to
         * handle different errors individually. Return true from the function to bypass throwing the
         * error to the browser, otherwise the error will be thrown and execution will halt.
         *
         * Example usage:
         *
         *     Vmd.Error.handle = function(err) {
         *         if (err.someProperty == 'NotReallyAnError') {
         *             // maybe log something to the application here if applicable
         *             return true;
         *         }
         *         // any non-true return value (including none) will cause the error to be thrown
         *     }
         *
         * @param {Vmd.Error} err The Vmd.Error object being raised. It will contain any attributes that were originally
         * raised with it, plus properties about the method and class from which the error originated (if raised from a
         * class that uses the Vmd 4 class system).
         * @static
         */
        handle: function () {
            return Vmd.Error.ignore;
        }
    },

    // This is the standard property that is the name of the constructor.
    name: 'Vmd.Error',

    /**
     * Creates new Error object.
     * @param {String/Object} config The error message string, or an object containing the
     * attribute "msg" that will be used as the error message. Any other data included in
     * the object will be applied to the error instance and logged to the browser console, if available.
     */
    constructor: function (config) {
        if (Vmd.isString(config)) {
            config = { msg: config };
        }

        var me = this;

        Vmd.apply(me, config);

        me.message = me.message || me.msg; // 'message' is standard ('msg' is non-standard)
        // note: the above does not work in old WebKit (me.message is readonly) (Safari 4)
    },

    /**
     * Provides a custom string representation of the error object. This is an override of the base JavaScript
     * `Object.toString` method, which is useful so that when logged to the browser console, an error object will
     * be displayed with a useful message instead of `[object Object]`, the default `toString` result.
     *
     * The default implementation will include the error message along with the raising class and method, if available,
     * but this can be overridden with a custom implementation either at the prototype level (for all errors) or on
     * a particular error instance, if you want to provide a custom description that will show up in the console.
     * @return {String} The error message. If raised from within the Vmd 4 class system, the error message will also
     * include the raising class and method names, if available.
     */
    toString: function () {
        var me = this,
            className = me.sourceClass ? me.sourceClass : '',
            methodName = me.sourceMethod ? '.' + me.sourceMethod + '(): ' : '',
            msg = me.msg || '(No description provided)';

        return className + methodName + msg;
    }
});


