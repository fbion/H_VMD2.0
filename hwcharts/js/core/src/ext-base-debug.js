/*!
 * Vmd JS Library 3.4.0
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
    version: '3.4.0',
    versionDetail: {
        major: 3,
        minor: 4,
        patch: 0
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

    /*新增extjs4.2中的ext.log功能*/
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
         * <p>Extends one class to create a subclass and optionally overrides members with the passed literal. This method
         * also adds the function "override()" to the subclass that can be used to override members of the class.</p>
         * For example, to create a subclass of Vmd GridPanel:
         * <pre><code>
MyGridPanel = Vmd.extend(Vmd.grid.GridPanel, {
    constructor: function(config) {

//      Create configuration for this Grid.
        var store = new Vmd.data.Store({...});
        var colModel = new Vmd.grid.ColumnModel({...});

//      Create a new config object containing our computed properties
//      *plus* whatever was in the config parameter.
        config = Vmd.apply({
            store: store,
            colModel: colModel
        }, config);

        MyGridPanel.superclass.constructor.call(this, config);

//      Your postprocessing here
    },

    yourMethod: function() {
        // etc.
    }
});
</code></pre>
         *
         * <p>This function also supports a 3-argument call in which the subclass's constructor is
         * passed as an argument. In this form, the parameters are as follows:</p>
         * <div class="mdetail-params"><ul>
         * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
         * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
         * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
         * prototype, and are therefore shared among all instances of the new class.</div></li>
         * </ul></div>
         *
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
        isEmptyObject:function(v){
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
Vmd.util.TaskRunner = function(interval){
    interval = interval || 10;
    var tasks = [], 
    	removeQueue = [],
    	id = 0,
    	running = false,

    	// private
    	stopThread = function(){
	        running = false;
	        clearInterval(id);
	        id = 0;
	    },

    	// private
    	startThread = function(){
	        if(!running){
	            running = true;
	            id = setInterval(runTasks, interval);
	        }
	    },

    	// private
    	removeTask = function(t){
	        removeQueue.push(t);
	        if(t.onStop){
	            t.onStop.apply(t.scope || t);
	        }
	    },
	    
    	// private
    	runTasks = function(){
	    	var rqLen = removeQueue.length,
	    		now = new Date().getTime();	    			    		
	    
	        if(rqLen > 0){
	            for(var i = 0; i < rqLen; i++){
	                tasks.remove(removeQueue[i]);
	            }
	            removeQueue = [];
	            if(tasks.length < 1){
	                stopThread();
	                return;
	            }
	        }	        
	        for(var i = 0, t, itime, rt, len = tasks.length; i < len; ++i){
	            t = tasks[i];
	            itime = now - t.taskRunTime;
	            if(t.interval <= itime){
	                rt = t.run.apply(t.scope || t, t.args || [++t.taskRunCount]);
	                t.taskRunTime = now;
	                if(rt === false || t.taskRunCount === t.repeat){
	                    removeTask(t);
	                    return;
	                }
	            }
	            if(t.duration && t.duration <= (now - t.taskStartTime)){
	                removeTask(t);
	            }
	        }
	    };

    /**
     * Starts a new task.
     * @method start
     * @param {Object} task <p>A config object that supports the following properties:<ul>
     * <li><code>run</code> : Function<div class="sub-desc"><p>The function to execute each time the task is invoked. The
     * function will be called at each interval and passed the <code>args</code> argument if specified, and the
     * current invocation count if not.</p>
     * <p>If a particular scope (<code>this</code> reference) is required, be sure to specify it using the <code>scope</code> argument.</p>
     * <p>Return <code>false</code> from this function to terminate the task.</p></div></li>
     * <li><code>interval</code> : Number<div class="sub-desc">The frequency in milliseconds with which the task
     * should be invoked.</div></li>
     * <li><code>args</code> : Array<div class="sub-desc">(optional) An array of arguments to be passed to the function
     * specified by <code>run</code>. If not specified, the current invocation count is passed.</div></li>
     * <li><code>scope</code> : Object<div class="sub-desc">(optional) The scope (<tt>this</tt> reference) in which to execute the
     * <code>run</code> function. Defaults to the task config object.</div></li>
     * <li><code>duration</code> : Number<div class="sub-desc">(optional) The length of time in milliseconds to invoke
     * the task before stopping automatically (defaults to indefinite).</div></li>
     * <li><code>repeat</code> : Number<div class="sub-desc">(optional) The number of times to invoke the task before
     * stopping automatically (defaults to indefinite).</div></li>
     * </ul></p>
     * <p>Before each invocation, Vmd injects the property <code>taskRunCount</code> into the task object so
     * that calculations based on the repeat count can be performed.</p>
     * @return {Object} The task
     */
    this.start = function(task){
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
    this.stop = function(task){
        removeTask(task);
        return task;
    };

    /**
     * Stops all tasks that are currently running.
     * @method stopAll
     */
    this.stopAll = function(){
        stopThread();
        for(var i = 0, len = tasks.length; i < len; i++){
            if(tasks[i].onStop){
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


