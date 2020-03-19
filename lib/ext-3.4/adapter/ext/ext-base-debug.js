/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
// for old browsers
window.undefined = window.undefined;

/**
 * @class Ext
 * Ext core utilities and functions.
 * @singleton
 */

Ext = {
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
 * @member Ext apply
 */
Ext.apply = function (o, c, defaults) {
    // no "this" reference for friendly out of scope calls
    if (defaults) {
        Ext.apply(o, defaults);
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
             return (is && (m = regex.exec(Ext.userAgent))) ? parseFloat(m[1]) : 0;
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
        t = Ext.apply({}, {
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
    Ext.enumerables = enumerables;

    /**
     * Copies all the properties of config to the specified object.
     * Note that if recursive merging and cloning without referencing the original objects / arrays is needed, use
     * {@link Ext.Object#merge} instead.
     * @param {Object} object The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} [defaults] A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    Ext.apply = function (object, config, defaults) {
        if (defaults) {
            Ext.apply(object, defaults);
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

    Ext.apply(Base, {
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

        // Cannot use Ext.encode since it can recurse endlessly (if we're lucky)
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
                } else if (value === null || primitiveRe.test(type) || Ext.isDate(value)) {
                    member = Ext.encode(value);
                } else if (Ext.isArray(value)) {
                    member = '[ ]';
                } else if (Ext.isObject(value)) {
                    member = '{ }';
                } else {
                    member = type;
                }
                members.push(Ext.encode(name) + ': ' + member);
            }
        }

        if (members.length) {
            return ' \nData: {\n  ' + members.join(',\n  ') + '\n}';
        }
        return '';
    }

    function log(message) {
        var options, dump,
            con = Ext.global.console,
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

        message = indent ? Ext.String.repeat(' ', log.indentSize * indent) + message : message;
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
            if (Ext.isOpera) {
                opera.postError(message);
            } else {
                out = log.out;
                max = log.max;

                if (out.length >= max) {
                    // this formula allows out.max to change (via debugger), where the
                    // more obvious "max/4" would not quite be the same
                    Ext.Array.erase(out, 0, out.length - 3 * Math.floor(max / 4)); // keep newest 75%
                }

                out.push(message);
            }
        }

        // Mostly informational, but the Ext.Error notifier uses them:
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
                    'var ext = window.opener.Ext,',
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
    nullLog.info = nullLog.warn = nullLog.error = Ext.emptyFn;


    Ext.apply(Ext, {
        /**
       * @property {Function}
       * A reusable empty function
       */
        emptyFn: emptyFn,
        /**
         * URL to a blank file used by Ext when in secure mode for iframe src and onReady src to prevent
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
         * True if the {@link Ext.Fx} Class is available
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
         * True to automatically uncache orphaned Ext.Elements periodically (defaults to true)
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
                    if (!Ext.isDefined(o[p])) {
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
            el = Ext.getDom(el, true) || {};
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
         * For example, to create a subclass of Ext GridPanel:
         * <pre><code>
MyGridPanel = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(config) {

//      Create configuration for this Grid.
        var store = new Ext.data.Store({...});
        var colModel = new Ext.grid.ColumnModel({...});

//      Create a new config object containing our computed properties
//      *plus* whatever was in the config parameter.
        config = Ext.apply({
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
                    Ext.Error.raise({
                        sourceClass: 'Ext',
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
                    Ext.override(sb, o);
                };
                sbp.superclass = sbp.supr = (function () {
                    return spp;
                });
                sbp.override = io;
                Ext.override(sb, overrides);
                sb.extend = function (o) { return Ext.extend(sb, o); };
                return sb;
            };
        }(),

        global: (function () {
            return this;
        })(),

        Base: Base,

        namespaceCache: {},

        createNamespace: function (namespaceOrClass, isClass) {
            var cache = Ext.namespaceCache,
                namespace = isClass ? namespaceOrClass.substring(0, namespaceOrClass.lastIndexOf('.'))
                            : namespaceOrClass,
                ns = cache[namespace],
                i, n, part, parts, partials;

            if (!ns) {
                ns = Ext.global;
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
                cls = Ext.global,
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
         * of `overrides` are applied to its `prototype` using {@link Ext#apply Ext.apply}.
         * 
         * If the `target` is an instance of a class created using {@link #define},
         * the `overrides` are applied to only that instance. In this case, methods are
         * specially processed to allow them to use {@link Ext.Base#callParent}.
         * 
         *      var panel = new Ext.Panel({ ... });
         *      
         *      Ext.override(panel, {
         *          initComponent: function () {
         *              // extra processing...
         *              
         *              this.callParent();
         *          }
         *      });
         *
         * If the `target` is none of these, the `overrides` are applied to the `target`
         * using {@link Ext#apply Ext.apply}.
         *
         * Please refer to {@link Ext#define Ext.define} for further details.
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

                    Ext.addMembers(target, target.prototype, overrides, true);
                    if (statics) {
                        Ext.addMembers(target, target, statics);
                    }
                } else if (typeof target == 'function') {
                    proto = target.prototype;
                    Ext.apply(proto, overrides);
                    if (Ext.isIE && overrides.hasOwnProperty('toString')) {
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
                        Ext.apply(target, overrides);

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
Ext.namespace('Company', 'Company.data');
Ext.namespace('Company.data'); // equivalent and preferable to above syntax
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
         * Takes an object and converts it to an encoded URL. e.g. Ext.urlEncode({foo: 1, bar: 2}); would return "foo=1&bar=2".  Optionally, property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
         * @param {Object} o
         * @param {String} pre (optional) A prefix to add to the url encoded string
         * @return {String}
         */
        urlEncode: function (o, pre) {
            var empty,
                buf = [],
                e = encodeURIComponent;

            Ext.iterate(o, function (key, item) {
                empty = Ext.isEmpty(item);
                Ext.each(empty ? key : item, function (val) {
                    buf.push('&', e(key), '=', (!Ext.isEmpty(val) && (val != key || !empty)) ? (Ext.isDate(val) ? Ext.encode(val).replace(/"/g, '') : e(val)) : '');
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
Ext.urlDecode("foo=1&bar=2"); // returns {foo: "1", bar: "2"}
Ext.urlDecode("foo=1&bar=2&bar=3&bar=4", false); // returns {foo: "1", bar: ["2", "3", "4"]}
</code></pre>
         * @param {String} string
         * @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
         * @return {Object} A literal with members
         */
        urlDecode: function (string, overwrite) {
            if (Ext.isEmpty(string)) {
                return {};
            }
            var obj = {},
                pairs = string.split('&'),
                d = decodeURIComponent,
                name,
                value;
            Ext.each(pairs, function (pair) {
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
            if (!Ext.isEmpty(s)) {
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
            if (Ext.isArray(v) || v.callee) {
                return true;
            }
            //check for node list type
            if (/NodeList|HTMLCollection/.test(toString.call(v))) {
                return true;
            }
            //NodeList has an item and length property
            //IXMLDOMNodeList has nextNode method, needs to be checked first.
            return ((typeof v.nextNode != 'undefined' || v.item) && Ext.isNumber(v.length));
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
         * argument to <code>Ext.each</code>.</div></li>
         * </ul></div>
         * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed.
         * Defaults to the <code>item</code> at the current <code>index</code>
         * within the passed <code>array</code>.
         * @return See description for the fn parameter.
         */
        each: function (array, fn, scope) {
            if (Ext.isEmpty(array, true)) {
                return;
            }
            if (!Ext.isIterable(array) || Ext.isPrimitive(array)) {
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
            if (Ext.isEmpty(obj)) {
                return;
            }
            if (Ext.isIterable(obj)) {
                Ext.each(obj, fn, scope);
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
         * Return the dom node for the passed String (id), dom node, or Ext.Element.
         * Optional 'strict' flag is needed for IE since it can return 'name' and
         * 'id' elements by using getElementById.
         * Here are some examples:
         * <pre><code>
// gets dom node based on id
var elDom = Ext.getDom('elId');
// gets dom node based on the dom node
var elDom1 = Ext.getDom(elDom);

// If we don&#39;t know if we are working with an
// Ext.Element or a dom node use Ext.getDom
function(el){
    var dom = Ext.getDom(el);
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
         * Returns the current document body as an {@link Ext.Element}.
         * @return Ext.Element The document body
         */
        getBody: function () {
            return Ext.get(DOC.body || DOC.documentElement);
        },

        /**
         * Returns the current document body as an {@link Ext.Element}.
         * @return Ext.Element The document body
         * @method
         */
        getHead: function () {
            var head;

            return function () {
                if (head == undefined) {
                    head = Ext.get(DOC.getElementsByTagName("head")[0]);
                }

                return head;
            };
        }(),

        /**
         * <p>Removes this element from the document, removes all DOM event listeners, and deletes the cache reference.
         * All DOM event listeners are removed from this element. If {@link Ext#enableNestedListenerRemoval} is
         * <code>true</code>, then DOM event listeners are also removed from all child nodes. The body node
         * will be ignored if passed in.</p>
         * @param {HTMLElement} node The node to remove
         * @method
         */
        removeNode: isIE && !isIE8 ? function () {
            var d;
            return function (n) {
                if (n && n.tagName != 'BODY') {
                    (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n, true) : Ext.EventManager.removeAll(n);
                    d = d || DOC.createElement('div');
                    d.appendChild(n);
                    d.innerHTML = '';
                    delete Ext.elCache[n.id];
                }
            };
        }() : function (n) {
            if (n && n.parentNode && n.tagName != 'BODY') {
                (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(n, true) : Ext.EventManager.removeAll(n);
                n.parentNode.removeChild(n);
                delete Ext.elCache[n.id];
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

            Ext.Error.raise({
                sourceClass: 'Ext',
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
         * Strings are coerced to Dates by parsing using the {@link Ext.Date#defaultFormat defaultFormat}.
         * 
         * For example
         *
         *     Ext.coerce('false', true);
         *     
         * returns the boolean value `false` because the second parameter is of type `Boolean`.
         * 
         * @param {Mixed} from The value to coerce
         * @param {Mixed} to The value it must be compared against
         * @return The coerced value.
         */
        coerce: function (from, to) {
            var fromType = Ext.typeOf(from),
                toType = Ext.typeOf(to),
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
                        return isString && isNaN(from) ? Ext.Date.parse(from, Ext.Date.defaultFormat) : Date(Number(from));
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
            return v === null || v === undefined || ((Ext.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
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
            return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
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
         *     Ext.isIE8 == (Ext.ieVersion == 8)
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
         * "Ext.log.out". An attached debugger can watch this array and view the log. The
         * log buffer is limited to a maximum of "Ext.log.max" entries (defaults to 250).
         * The `Ext.log.out` array can also be written to a popup window by entering the
         * following in the URL bar (a "bookmarklet"):
         *
         *     javascript:void(Ext.log.show());
         *
         * If additional parameters are passed, they are joined and appended to the message.
         * A technique for tracing entry and exit of a function is this:
         *
         *     function foo () {
         *         Ext.log({ indent: 1 }, '>> foo');
         *
         *         // log statements in here or methods called from here will be indented
         *         // by one step
         *
         *         Ext.log({ outdent: 1 }, '<< foo');
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
Ext.namespace('Company', 'Company.data');
Ext.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
</code></pre>
     * @param {String} namespace1
     * @param {String} namespace2
     * @param {String} etc
     * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
     * @method ns
     */
    Ext.ns = Ext.namespace;

    Ext.apply(Ext, {

        /**
         * Clone simple variables including array, {}-like objects, DOM nodes and Date without keeping the old reference.
         * A reference for the object itself is returned if it's not a direct decendant of Object. For model cloning,
         * see {@link Ext.data.Model#copy Model.copy}.
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
            // TODO proxy this to Ext.Element.clone to handle automatic id attribute changing
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
                    clone[i] = Ext.clone(item[i]);
                }
            }
                // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Ext.clone(item[key]);
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
         * Generate a unique reference of Ext in the global scope, useful for sandboxing
         */
        getUniqueGlobalNamespace: function () {
            var uniqueGlobalNamespace = this.uniqueGlobalNamespace,
                i;

            if (uniqueGlobalNamespace === undefined) {
                i = 0;

                do {
                    uniqueGlobalNamespace = 'ExtBox' + (++i);
                } while (Ext.global[uniqueGlobalNamespace] !== undefined);

                Ext.global[uniqueGlobalNamespace] = Ext;
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

            if (Ext.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Ext=window.' + Ext.name + ';' + args[ln];
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

            if (Ext.isSandboxed) {
                ln = args.length;
                if (ln > 0) {
                    ln--;
                    args[ln] = 'var Ext=window.' + Ext.name + ';' + args[ln];
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

    // When using Cmd optimizations, the namespace Ext.app may already be defined
    // by this point since it's done up front by the tool. Check if app already
    // exists before overwriting it.
    ExtApp = Ext.app;
    if (!ExtApp) {
        ExtApp = Ext.app = {};
    }
    Ext.apply(ExtApp, {
        namespaces: {},

        /**
        * @private
        */
        collectNamespaces: function (paths) {
            var namespaces = Ext.app.namespaces,
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
            var namespaces = Ext.app.namespaces,
                i, l;

            if (!Ext.isArray(ns)) {
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
            Ext.app.namespaces = {};
        },

        /**
        * Get namespace prefix for a class name.
        *
        * @param {String} className
        *
        * @return {String} Namespace prefix if it's known, otherwise undefined
        */
        getNamespace: function (className) {
            var namespaces = Ext.app.namespaces,
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

Ext.ns('Ext.util', 'Ext.lib', 'Ext.data', 'Ext.supports');

Ext.elCache = {};

/**
 * @class Function
 * These functions are available on every Function object (any JavaScript function).
 */
Ext.apply(Function.prototype, {
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
        return !Ext.isFunction(fcn) ?
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
new Ext.Button({
   text: 'Say Hi',
   renderTo: Ext.getBody(),
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

var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
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
            } else if (Ext.isNumber(appendArgs)) {
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
Ext.applyIf(String, {
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
        var args = Ext.toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }
});

/**
 * @class Array
 */
Ext.applyIf(Array.prototype, {
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
 * @class Ext.util.TaskRunner
 * Provides the ability to execute one or more arbitrary tasks in a multithreaded
 * manner.  Generally, you can use the singleton {@link Ext.TaskMgr} instead, but
 * if needed, you can create separate instances of TaskRunner.  Any number of
 * separate tasks can be started at any time and will run independently of each
 * other. Example usage:
 * <pre><code>
// Start a simple clock task that updates a div once per second
var updateClock = function(){
    Ext.fly('clock').update(new Date().format('g:i:s A'));
} 
var task = {
    run: updateClock,
    interval: 1000 //1 second
}
var runner = new Ext.util.TaskRunner();
runner.start(task);

// equivalent using TaskMgr
Ext.TaskMgr.start({
    run: updateClock,
    interval: 1000
});

 * </code></pre>
 * <p>See the {@link #start} method for details about how to configure a task object.</p>
 * Also see {@link Ext.util.DelayedTask}. 
 * 
 * @constructor
 * @param {Number} interval (optional) The minimum precision in milliseconds supported by this TaskRunner instance
 * (defaults to 10)
 */
Ext.util.TaskRunner = function(interval){
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
     * <p>Before each invocation, Ext injects the property <code>taskRunCount</code> into the task object so
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
 * @class Ext.TaskMgr
 * @extends Ext.util.TaskRunner
 * A static {@link Ext.util.TaskRunner} instance that can be used to start and stop arbitrary tasks.  See
 * {@link Ext.util.TaskRunner} for supported methods and task config properties.
 * <pre><code>
// Start a simple clock task that updates a div once per second
var task = {
    run: function(){
        Ext.fly('clock').update(new Date().format('g:i:s A'));
    },
    interval: 1000 //1 second
}
Ext.TaskMgr.start(task);
</code></pre>
 * <p>See the {@link #start} method for details about how to configure a task object.</p>
 * @singleton
 */
Ext.TaskMgr = new Ext.util.TaskRunner();(function(){
	var libFlyweight;
	
	function fly(el) {
        if (!libFlyweight) {
            libFlyweight = new Ext.Element.Flyweight();
        }
        libFlyweight.dom = el;
        return libFlyweight;
    }
    
    (function(){
	var doc = document,
		isCSS1 = doc.compatMode == "CSS1Compat",
		MAX = Math.max,		
        ROUND = Math.round,
		PARSEINT = parseInt;
		
	Ext.lib.Dom = {
	    isAncestor : function(p, c) {
		    var ret = false;
			
			p = Ext.getDom(p);
			c = Ext.getDom(c);
			if (p && c) {
				if (p.contains) {
					return p.contains(c);
				} else if (p.compareDocumentPosition) {
					return !!(p.compareDocumentPosition(c) & 16);
				} else {
					while (c = c.parentNode) {
						ret = c == p || ret;	        			
					}
				}	            
			}	
			return ret;
		},
		
        getViewWidth : function(full) {
            return full ? this.getDocumentWidth() : this.getViewportWidth();
        },

        getViewHeight : function(full) {
            return full ? this.getDocumentHeight() : this.getViewportHeight();
        },

        getDocumentHeight: function() {            
            return MAX(!isCSS1 ? doc.body.scrollHeight : doc.documentElement.scrollHeight, this.getViewportHeight());
        },

        getDocumentWidth: function() {            
            return MAX(!isCSS1 ? doc.body.scrollWidth : doc.documentElement.scrollWidth, this.getViewportWidth());
        },

        getViewportHeight: function(){
	        return Ext.isIE ? 
	        	   (Ext.isStrict ? doc.documentElement.clientHeight : doc.body.clientHeight) :
	        	   self.innerHeight;
        },

        getViewportWidth : function() {
	        return !Ext.isStrict && !Ext.isOpera ? doc.body.clientWidth :
	        	   Ext.isIE ? doc.documentElement.clientWidth : self.innerWidth;
        },
        
        getY : function(el) {
            return this.getXY(el)[1];
        },

        getX : function(el) {
            return this.getXY(el)[0];
        },

        getXY : function(el) {
            var p, 
            	pe, 
            	b,
            	bt, 
            	bl,     
            	dbd,       	
            	x = 0,
            	y = 0, 
            	scroll,
            	hasAbsolute, 
            	bd = (doc.body || doc.documentElement),
            	ret = [0,0];
            	
            el = Ext.getDom(el);

            if(el != bd){
	            if (el.getBoundingClientRect) {
	                b = el.getBoundingClientRect();
	                scroll = fly(document).getScroll();
	                ret = [ROUND(b.left + scroll.left), ROUND(b.top + scroll.top)];
	            } else {  
		            p = el;		
		            hasAbsolute = fly(el).isStyle("position", "absolute");
		
		            while (p) {
			            pe = fly(p);		
		                x += p.offsetLeft;
		                y += p.offsetTop;
		
		                hasAbsolute = hasAbsolute || pe.isStyle("position", "absolute");
		                		
		                if (Ext.isGecko) {		                    
		                    y += bt = PARSEINT(pe.getStyle("borderTopWidth"), 10) || 0;
		                    x += bl = PARSEINT(pe.getStyle("borderLeftWidth"), 10) || 0;	
		
		                    if (p != el && !pe.isStyle('overflow','visible')) {
		                        x += bl;
		                        y += bt;
		                    }
		                }
		                p = p.offsetParent;
		            }
		
		            if (Ext.isSafari && hasAbsolute) {
		                x -= bd.offsetLeft;
		                y -= bd.offsetTop;
		            }
		
		            if (Ext.isGecko && !hasAbsolute) {
		                dbd = fly(bd);
		                x += PARSEINT(dbd.getStyle("borderLeftWidth"), 10) || 0;
		                y += PARSEINT(dbd.getStyle("borderTopWidth"), 10) || 0;
		            }
		
		            p = el.parentNode;
		            while (p && p != bd) {
		                if (!Ext.isOpera || (p.tagName != 'TR' && !fly(p).isStyle("display", "inline"))) {
		                    x -= p.scrollLeft;
		                    y -= p.scrollTop;
		                }
		                p = p.parentNode;
		            }
		            ret = [x,y];
	            }
         	}
            return ret;
        },

        setXY : function(el, xy) {
            (el = Ext.fly(el, '_setXY')).position();
            
            var pts = el.translatePoints(xy),
            	style = el.dom.style,
            	pos;            	
            
            for (pos in pts) {	            
	            if (!isNaN(pts[pos])) {
	                style[pos] = pts[pos] + "px";
                }
            }
        },

        setX : function(el, x) {
            this.setXY(el, [x, false]);
        },

        setY : function(el, y) {
            this.setXY(el, [false, y]);
        }
    };
})();Ext.lib.Event = function() {
    var loadComplete = false,
        unloadListeners = {},
        retryCount = 0,
        onAvailStack = [],
        _interval,
        locked = false,
        win = window,
        doc = document,

        // constants
        POLL_RETRYS = 200,
        POLL_INTERVAL = 20,
        TYPE = 0,
        FN = 1,
        OBJ = 2,
        ADJ_SCOPE = 3,
        SCROLLLEFT = 'scrollLeft',
        SCROLLTOP = 'scrollTop',
        UNLOAD = 'unload',
        MOUSEOVER = 'mouseover',
        MOUSEOUT = 'mouseout',
        // private
        doAdd = function() {
            var ret;
            if (win.addEventListener) {
                ret = function(el, eventName, fn, capture) {
                    if (eventName == 'mouseenter') {
                        fn = fn.createInterceptor(checkRelatedTarget);
                        el.addEventListener(MOUSEOVER, fn, (capture));
                    } else if (eventName == 'mouseleave') {
                        fn = fn.createInterceptor(checkRelatedTarget);
                        el.addEventListener(MOUSEOUT, fn, (capture));
                    } else {
                        el.addEventListener(eventName, fn, (capture));
                    }
                    return fn;
                };
            } else if (win.attachEvent) {
                ret = function(el, eventName, fn, capture) {
                    el.attachEvent("on" + eventName, fn);
                    return fn;
                };
            } else {
                ret = function(){};
            }
            return ret;
        }(),
        // private
        doRemove = function(){
            var ret;
            if (win.removeEventListener) {
                ret = function (el, eventName, fn, capture) {
                    if (eventName == 'mouseenter') {
                        eventName = MOUSEOVER;
                    } else if (eventName == 'mouseleave') {
                        eventName = MOUSEOUT;
                    }
                    el.removeEventListener(eventName, fn, (capture));
                };
            } else if (win.detachEvent) {
                ret = function (el, eventName, fn) {
                    el.detachEvent("on" + eventName, fn);
                };
            } else {
                ret = function(){};
            }
            return ret;
        }();

    function checkRelatedTarget(e) {
        return !elContains(e.currentTarget, pub.getRelatedTarget(e));
    }

    function elContains(parent, child) {
       if(parent && parent.firstChild){
         while(child) {
            if(child === parent) {
                return true;
            }
            child = child.parentNode;
            if(child && (child.nodeType != 1)) {
                child = null;
            }
          }
        }
        return false;
    }

    // private
    function _tryPreloadAttach() {
        var ret = false,
            notAvail = [],
            element, i, v, override,
            tryAgain = !loadComplete || (retryCount > 0);

        if(!locked){
            locked = true;
            
            for(i = 0; i < onAvailStack.length; ++i){
                v = onAvailStack[i];
                if(v && (element = doc.getElementById(v.id))){
                    if(!v.checkReady || loadComplete || element.nextSibling || (doc && doc.body)) {
                        override = v.override;
                        element = override ? (override === true ? v.obj : override) : element;
                        v.fn.call(element, v.obj);
                        onAvailStack.remove(v);
                        --i;
                    }else{
                        notAvail.push(v);
                    }
                }
            }

            retryCount = (notAvail.length === 0) ? 0 : retryCount - 1;

            if (tryAgain) {
                startInterval();
            } else {
                clearInterval(_interval);
                _interval = null;
            }
            ret = !(locked = false);
        }
        return ret;
    }

    // private
    function startInterval() {
        if(!_interval){
            var callback = function() {
                _tryPreloadAttach();
            };
            _interval = setInterval(callback, POLL_INTERVAL);
        }
    }

    // private
    function getScroll() {
        var dd = doc.documentElement,
            db = doc.body;
        if(dd && (dd[SCROLLTOP] || dd[SCROLLLEFT])){
            return [dd[SCROLLLEFT], dd[SCROLLTOP]];
        }else if(db){
            return [db[SCROLLLEFT], db[SCROLLTOP]];
        }else{
            return [0, 0];
        }
    }

    // private
    function getPageCoord (ev, xy) {
        ev = ev.browserEvent || ev;
        var coord  = ev['page' + xy];
        if (!coord && coord !== 0) {
            coord = ev['client' + xy] || 0;

            if (Ext.isIE) {
                coord += getScroll()[xy == "X" ? 0 : 1];
            }
        }

        return coord;
    }

    var pub =  {
        extAdapter: true,
        onAvailable : function(p_id, p_fn, p_obj, p_override) {
            onAvailStack.push({
                id:         p_id,
                fn:         p_fn,
                obj:        p_obj,
                override:   p_override,
                checkReady: false });

            retryCount = POLL_RETRYS;
            startInterval();
        },

        // This function should ALWAYS be called from Ext.EventManager
        addListener: function(el, eventName, fn) {
            el = Ext.getDom(el);
            if (el && fn) {
                if (eventName == UNLOAD) {
                    if (unloadListeners[el.id] === undefined) {
                        unloadListeners[el.id] = [];
                    }
                    unloadListeners[el.id].push([eventName, fn]);
                    return fn;
                }
                return doAdd(el, eventName, fn, false);
            }
            return false;
        },

        // This function should ALWAYS be called from Ext.EventManager
        removeListener: function(el, eventName, fn) {
            el = Ext.getDom(el);
            var i, len, li, lis;
            if (el && fn) {
                if(eventName == UNLOAD){
                    if((lis = unloadListeners[el.id]) !== undefined){
                        for(i = 0, len = lis.length; i < len; i++){
                            if((li = lis[i]) && li[TYPE] == eventName && li[FN] == fn){
                                unloadListeners[el.id].splice(i, 1);
                            }
                        }
                    }
                    return;
                }
                doRemove(el, eventName, fn, false);
            }
        },

        getTarget : function(ev) {
            ev = ev.browserEvent || ev;
            return this.resolveTextNode(ev.target || ev.srcElement);
        },

        resolveTextNode : Ext.isGecko ? function(node){
            if(!node){
                return;
            }
            // work around firefox bug, https://bugzilla.mozilla.org/show_bug.cgi?id=101197
            var s = HTMLElement.prototype.toString.call(node);
            if(s == '[xpconnect wrapped native prototype]' || s == '[object XULElement]'){
                return;
            }
            return node.nodeType == 3 ? node.parentNode : node;
        } : function(node){
            return node && node.nodeType == 3 ? node.parentNode : node;
        },

        getRelatedTarget : function(ev) {
            ev = ev.browserEvent || ev;
            return this.resolveTextNode(ev.relatedTarget ||
                (/(mouseout|mouseleave)/.test(ev.type) ? ev.toElement :
                 /(mouseover|mouseenter)/.test(ev.type) ? ev.fromElement : null));
        },

        getPageX : function(ev) {
            return getPageCoord(ev, "X");
        },

        getPageY : function(ev) {
            return getPageCoord(ev, "Y");
        },


        getXY : function(ev) {
            return [this.getPageX(ev), this.getPageY(ev)];
        },

        stopEvent : function(ev) {
            this.stopPropagation(ev);
            this.preventDefault(ev);
        },

        stopPropagation : function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.stopPropagation) {
                ev.stopPropagation();
            } else {
                ev.cancelBubble = true;
            }
        },

        preventDefault : function(ev) {
            ev = ev.browserEvent || ev;
            if (ev.preventDefault) {
                ev.preventDefault();
            } else {
                if (ev.keyCode) {
                    ev.keyCode = 0;
                }
                ev.returnValue = false;
            }
        },

        getEvent : function(e) {
            e = e || win.event;
            if (!e) {
                var c = this.getEvent.caller;
                while (c) {
                    e = c.arguments[0];
                    if (e && Event == e.constructor) {
                        break;
                    }
                    c = c.caller;
                }
            }
            return e;
        },

        getCharCode : function(ev) {
            ev = ev.browserEvent || ev;
            return ev.charCode || ev.keyCode || 0;
        },

        //clearCache: function() {},
        // deprecated, call from EventManager
        getListeners : function(el, eventName) {
            Ext.EventManager.getListeners(el, eventName);
        },

        // deprecated, call from EventManager
        purgeElement : function(el, recurse, eventName) {
            Ext.EventManager.purgeElement(el, recurse, eventName);
        },

        _load : function(e) {
            loadComplete = true;
            
            if (Ext.isIE && e !== true) {
                // IE8 complains that _load is null or not an object
                // so lets remove self via arguments.callee
                doRemove(win, "load", arguments.callee);
            }
        },

        _unload : function(e) {
             var EU = Ext.lib.Event,
                i, v, ul, id, len, scope;

            for (id in unloadListeners) {
                ul = unloadListeners[id];
                for (i = 0, len = ul.length; i < len; i++) {
                    v = ul[i];
                    if (v) {
                        try{
                            scope = v[ADJ_SCOPE] ? (v[ADJ_SCOPE] === true ? v[OBJ] : v[ADJ_SCOPE]) :  win;
                            v[FN].call(scope, EU.getEvent(e), v[OBJ]);
                        }catch(ex){}
                    }
                }
            };

            Ext.EventManager&&Ext.EventManager._unload();

            doRemove(win, UNLOAD, EU._unload);
        }
    };

    // Initialize stuff.
    pub.on = pub.addListener;
    pub.un = pub.removeListener;
    if (doc && doc.body) {
        pub._load(true);
    } else {
        doAdd(win, "load", pub._load);
    }
    doAdd(win, UNLOAD, pub._unload);
    _tryPreloadAttach();

    return pub;
}();
/*
* Portions of this file are based on pieces of Yahoo User Interface Library
* Copyright (c) 2007, Yahoo! Inc. All rights reserved.
* YUI licensed under the BSD License:
* http://developer.yahoo.net/yui/license.txt
*/
Ext.lib.Ajax = function() {
    var activeX = ['Msxml2.XMLHTTP.6.0',
                   'Msxml2.XMLHTTP.3.0',
                   'Msxml2.XMLHTTP'],
        CONTENTTYPE = 'Content-Type';

    // private
    function setHeader(o) {
        var conn = o.conn,
            prop,
            headers = {};

        function setTheHeaders(conn, headers){
            for (prop in headers) {
                if (headers.hasOwnProperty(prop)) {
                    conn.setRequestHeader(prop, headers[prop]);
                }
            }
        }

        Ext.apply(headers, pub.headers, pub.defaultHeaders);
        setTheHeaders(conn, headers);
        delete pub.headers;
    }

    // private
    function createExceptionObject(tId, callbackArg, isAbort, isTimeout) {
        return {
            tId : tId,
            status : isAbort ? -1 : 0,
            statusText : isAbort ? 'transaction aborted' : 'communication failure',
            isAbort: isAbort,
            isTimeout: isTimeout,
            argument : callbackArg
        };
    }

    // private
    function initHeader(label, value) {
        (pub.headers = pub.headers || {})[label] = value;
    }

    // private
    function createResponseObject(o, callbackArg) {
        var headerObj = {},
            headerStr,
            conn = o.conn,
            t,
            s,
            // see: https://prototype.lighthouseapp.com/projects/8886/tickets/129-ie-mangles-http-response-status-code-204-to-1223
            isBrokenStatus = conn.status == 1223;

        try {
            headerStr = o.conn.getAllResponseHeaders();
            Ext.each(headerStr.replace(/\r\n/g, '\n').split('\n'), function(v){
                t = v.indexOf(':');
                if(t >= 0){
                    s = v.substr(0, t).toLowerCase();
                    if(v.charAt(t + 1) == ' '){
                        ++t;
                    }
                    headerObj[s] = v.substr(t + 1);
                }
            });
        } catch(e) {}

        return {
            tId : o.tId,
            // Normalize the status and statusText when IE returns 1223, see the above link.
            status : isBrokenStatus ? 204 : conn.status,
            statusText : isBrokenStatus ? 'No Content' : conn.statusText,
            getResponseHeader : function(header){return headerObj[header.toLowerCase()];},
            getAllResponseHeaders : function(){return headerStr;},
            responseText : conn.responseText,
            responseXML : conn.responseXML,
            argument : callbackArg
        };
    }

    // private
    function releaseObject(o) {
        if (o.tId) {
            pub.conn[o.tId] = null;
        }
        o.conn = null;
        o = null;
    }

    // private
    function handleTransactionResponse(o, callback, isAbort, isTimeout) {
        if (!callback) {
            releaseObject(o);
            return;
        }

        var httpStatus, responseObject;

        try {
            if (o.conn.status !== undefined && o.conn.status != 0) {
                httpStatus = o.conn.status;
            }
            else {
                httpStatus = 13030;
            }
        }
        catch(e) {
            httpStatus = 13030;
        }

        if ((httpStatus >= 200 && httpStatus < 300) || (Ext.isIE && httpStatus == 1223)) {
            responseObject = createResponseObject(o, callback.argument);
            if (callback.success) {
                if (!callback.scope) {
                    callback.success(responseObject);
                }
                else {
                    callback.success.apply(callback.scope, [responseObject]);
                }
            }
        }
        else {
            switch (httpStatus) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    responseObject = createExceptionObject(o.tId, callback.argument, (isAbort ? isAbort : false), isTimeout);
                    if (callback.failure) {
                        if (!callback.scope) {
                            callback.failure(responseObject);
                        }
                        else {
                            callback.failure.apply(callback.scope, [responseObject]);
                        }
                    }
                    break;
                default:
                    responseObject = createResponseObject(o, callback.argument);
                    if (callback.failure) {
                        if (!callback.scope) {
                            callback.failure(responseObject);
                        }
                        else {
                            callback.failure.apply(callback.scope, [responseObject]);
                        }
                    }
            }
        }

        releaseObject(o);
        responseObject = null;
    }
    
    function checkResponse(o, callback, conn, tId, poll, cbTimeout){
        if (conn && conn.readyState == 4) {
            clearInterval(poll[tId]);
            poll[tId] = null;

            if (cbTimeout) {
                clearTimeout(pub.timeout[tId]);
                pub.timeout[tId] = null;
            }
            handleTransactionResponse(o, callback);
        }
    }
    
    function checkTimeout(o, callback){
        pub.abort(o, callback, true);
    }
    

    // private
    function handleReadyState(o, callback){
        callback = callback || {};
        var conn = o.conn,
            tId = o.tId,
            poll = pub.poll,
            cbTimeout = callback.timeout || null;

        if (cbTimeout) {
            pub.conn[tId] = conn;
            pub.timeout[tId] = setTimeout(checkTimeout.createCallback(o, callback), cbTimeout);
        }
        poll[tId] = setInterval(checkResponse.createCallback(o, callback, conn, tId, poll, cbTimeout), pub.pollInterval);
    }

    // private
    function asyncRequest(method, uri, callback, postData) {
        var o = getConnectionObject() || null;

        if (o) {
            o.conn.open(method, uri, true);

            if (pub.useDefaultXhrHeader) {
                initHeader('X-Requested-With', pub.defaultXhrHeader);
            }

            if(postData && pub.useDefaultHeader && (!pub.headers || !pub.headers[CONTENTTYPE])){
                initHeader(CONTENTTYPE, pub.defaultPostHeader);
            }

            if (pub.defaultHeaders || pub.headers) {
                setHeader(o);
            }

            handleReadyState(o, callback);
            o.conn.send(postData || null);
        }
        return o;
    }

    // private
    function getConnectionObject() {
        var o;

        try {
            if (o = createXhrObject(pub.transactionId)) {
                pub.transactionId++;
            }
        } catch(e) {
        } finally {
            return o;
        }
    }

    // private
    function createXhrObject(transactionId) {
        var http;

        try {
            http = new XMLHttpRequest();
        } catch(e) {
            for (var i = Ext.isIE6 ? 1 : 0; i < activeX.length; ++i) {
                try {
                    http = new ActiveXObject(activeX[i]);
                    break;
                } catch(e) {}
            }
        } finally {
            return {conn : http, tId : transactionId};
        }
    }

    var pub = {
        request : function(method, uri, cb, data, options) {
            if(options){
                var me = this,
                    xmlData = options.xmlData,
                    jsonData = options.jsonData,
                    hs;

                Ext.applyIf(me, options);

                if(xmlData || jsonData){
                    hs = me.headers;
                    if(!hs || !hs[CONTENTTYPE]){
                        initHeader(CONTENTTYPE, xmlData ? 'text/xml' : 'application/json');
                    }
                    data = xmlData || (!Ext.isPrimitive(jsonData) ? Ext.encode(jsonData) : jsonData);
                }
            }
            return asyncRequest(method || options.method || "POST", uri, cb, data);
        },

        serializeForm : function(form) {
            var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements, 
                hasSubmit = false, 
                encoder = encodeURIComponent, 
                name, 
                data = '', 
                type, 
                hasValue;
    
            Ext.each(fElements, function(element){
                name = element.name;
                type = element.type;
        
                if (!element.disabled && name) {
                    if (/select-(one|multiple)/i.test(type)) {
                        Ext.each(element.options, function(opt){
                            if (opt.selected) {
                                hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                                data += String.format("{0}={1}&", encoder(name), encoder(hasValue ? opt.value : opt.text));
                            }
                        });
                    } else if (!(/file|undefined|reset|button/i.test(type))) {
                        if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) {
                            //mafei 20180112 修复通过form取值的问题
                            //data += encoder(name) + '=' + encoder(element.value) + '&';
                            var val = element.value;
                            var cmp = Ext.getCmp(element.id)
                            if (cmp) {
                                if (cmp.emptyText == val) val = "";
                                data += encoder(name) + '=' + encoder(val) + '&';
                            }else
                                data += encoder(name) + '=' + encoder(val) + '&';
                            hasSubmit = /submit/i.test(type);
                        }
                    }
                }
            });
            return data.substr(0, data.length - 1);
        },

        useDefaultHeader : true,
        defaultPostHeader : 'application/x-www-form-urlencoded; charset=UTF-8',
        useDefaultXhrHeader : true,
        defaultXhrHeader : 'XMLHttpRequest',
        poll : {},
        timeout : {},
        conn: {},
        pollInterval : 50,
        transactionId : 0,

//  This is never called - Is it worth exposing this?
//          setProgId : function(id) {
//              activeX.unshift(id);
//          },

//  This is never called - Is it worth exposing this?
//          setDefaultPostHeader : function(b) {
//              this.useDefaultHeader = b;
//          },

//  This is never called - Is it worth exposing this?
//          setDefaultXhrHeader : function(b) {
//              this.useDefaultXhrHeader = b;
//          },

//  This is never called - Is it worth exposing this?
//          setPollingInterval : function(i) {
//              if (typeof i == 'number' && isFinite(i)) {
//                  this.pollInterval = i;
//              }
//          },

//  This is never called - Is it worth exposing this?
//          resetDefaultHeaders : function() {
//              this.defaultHeaders = null;
//          },

        abort : function(o, callback, isTimeout) {
            var me = this,
                tId = o.tId,
                isAbort = false;

            if (me.isCallInProgress(o)) {
                o.conn.abort();
                clearInterval(me.poll[tId]);
                me.poll[tId] = null;
                clearTimeout(pub.timeout[tId]);
                me.timeout[tId] = null;

                handleTransactionResponse(o, callback, (isAbort = true), isTimeout);
            }
            return isAbort;
        },

        isCallInProgress : function(o) {
            // if there is a connection and readyState is not 0 or 4
            return o.conn && !{0:true,4:true}[o.conn.readyState];
        }
    };
    return pub;
}();(function(){
    var EXTLIB = Ext.lib,
        noNegatives = /width|height|opacity|padding/i,
        offsetAttribute = /^((width|height)|(top|left))$/,
        defaultUnit = /width|height|top$|bottom$|left$|right$/i,
        offsetUnit =  /\d+(em|%|en|ex|pt|in|cm|mm|pc)$/i,
        isset = function(v){
            return typeof v !== 'undefined';
        },
        now = function(){
            return new Date();
        };

    EXTLIB.Anim = {
        motion : function(el, args, duration, easing, cb, scope) {
            return this.run(el, args, duration, easing, cb, scope, Ext.lib.Motion);
        },

        run : function(el, args, duration, easing, cb, scope, type) {
            type = type || Ext.lib.AnimBase;
            if (typeof easing == "string") {
                easing = Ext.lib.Easing[easing];
            }
            var anim = new type(el, args, duration, easing);
            anim.animateX(function() {
                if(Ext.isFunction(cb)){
                    cb.call(scope);
                }
            });
            return anim;
        }
    };

    EXTLIB.AnimBase = function(el, attributes, duration, method) {
        if (el) {
            this.init(el, attributes, duration, method);
        }
    };

    EXTLIB.AnimBase.prototype = {
        doMethod: function(attr, start, end) {
            var me = this;
            return me.method(me.curFrame, start, end - start, me.totalFrames);
        },


        setAttr: function(attr, val, unit) {
            if (noNegatives.test(attr) && val < 0) {
                val = 0;
            }
            Ext.fly(this.el, '_anim').setStyle(attr, val + unit);
        },


        getAttr: function(attr) {
            var el = Ext.fly(this.el),
                val = el.getStyle(attr),
                a = offsetAttribute.exec(attr) || [];

            if (val !== 'auto' && !offsetUnit.test(val)) {
                return parseFloat(val);
            }

            return (!!(a[2]) || (el.getStyle('position') == 'absolute' && !!(a[3]))) ? el.dom['offset' + a[0].charAt(0).toUpperCase() + a[0].substr(1)] : 0;
        },


        getDefaultUnit: function(attr) {
            return defaultUnit.test(attr) ? 'px' : '';
        },

        animateX : function(callback, scope) {
            var me = this,
                f = function() {
                me.onComplete.removeListener(f);
                if (Ext.isFunction(callback)) {
                    callback.call(scope || me, me);
                }
            };
            me.onComplete.addListener(f, me);
            me.animate();
        },


        setRunAttr: function(attr) {
            var me = this,
                a = this.attributes[attr],
                to = a.to,
                by = a.by,
                from = a.from,
                unit = a.unit,
                ra = (this.runAttrs[attr] = {}),
                end;

            if (!isset(to) && !isset(by)){
                return false;
            }

            var start = isset(from) ? from : me.getAttr(attr);
            if (isset(to)) {
                end = to;
            }else if(isset(by)) {
                if (Ext.isArray(start)){
                    end = [];
                    for(var i=0,len=start.length; i<len; i++) {
                        end[i] = start[i] + by[i];
                    }
                }else{
                    end = start + by;
                }
            }

            Ext.apply(ra, {
                start: start,
                end: end,
                unit: isset(unit) ? unit : me.getDefaultUnit(attr)
            });
        },


        init: function(el, attributes, duration, method) {
            var me = this,
                actualFrames = 0,
                mgr = EXTLIB.AnimMgr;

            Ext.apply(me, {
                isAnimated: false,
                startTime: null,
                el: Ext.getDom(el),
                attributes: attributes || {},
                duration: duration || 1,
                method: method || EXTLIB.Easing.easeNone,
                useSec: true,
                curFrame: 0,
                totalFrames: mgr.fps,
                runAttrs: {},
                animate: function(){
                    var me = this,
                        d = me.duration;

                    if(me.isAnimated){
                        return false;
                    }

                    me.curFrame = 0;
                    me.totalFrames = me.useSec ? Math.ceil(mgr.fps * d) : d;
                    mgr.registerElement(me);
                },

                stop: function(finish){
                    var me = this;

                    if(finish){
                        me.curFrame = me.totalFrames;
                        me._onTween.fire();
                    }
                    mgr.stop(me);
                }
            });

            var onStart = function(){
                var me = this,
                    attr;

                me.onStart.fire();
                me.runAttrs = {};
                for(attr in this.attributes){
                    this.setRunAttr(attr);
                }

                me.isAnimated = true;
                me.startTime = now();
                actualFrames = 0;
            };


            var onTween = function(){
                var me = this;

                me.onTween.fire({
                    duration: now() - me.startTime,
                    curFrame: me.curFrame
                });

                var ra = me.runAttrs;
                for (var attr in ra) {
                    this.setAttr(attr, me.doMethod(attr, ra[attr].start, ra[attr].end), ra[attr].unit);
                }

                ++actualFrames;
            };

            var onComplete = function() {
                var me = this,
                    actual = (now() - me.startTime) / 1000,
                    data = {
                        duration: actual,
                        frames: actualFrames,
                        fps: actualFrames / actual
                    };

                me.isAnimated = false;
                actualFrames = 0;
                me.onComplete.fire(data);
            };

            me.onStart = new Ext.util.Event(me);
            me.onTween = new Ext.util.Event(me);
            me.onComplete = new Ext.util.Event(me);
            (me._onStart = new Ext.util.Event(me)).addListener(onStart);
            (me._onTween = new Ext.util.Event(me)).addListener(onTween);
            (me._onComplete = new Ext.util.Event(me)).addListener(onComplete);
        }
    };


    Ext.lib.AnimMgr = new function() {
        var me = this,
            thread = null,
            queue = [],
            tweenCount = 0;


        Ext.apply(me, {
            fps: 1000,
            delay: 1,
            registerElement: function(tween){
                queue.push(tween);
                ++tweenCount;
                tween._onStart.fire();
                me.start();
            },

            unRegister: function(tween, index){
                tween._onComplete.fire();
                index = index || getIndex(tween);
                if (index != -1) {
                    queue.splice(index, 1);
                }

                if (--tweenCount <= 0) {
                    me.stop();
                }
            },

            start: function(){
                if(thread === null){
                    thread = setInterval(me.run, me.delay);
                }
            },

            stop: function(tween){
                if(!tween){
                    clearInterval(thread);
                    for(var i = 0, len = queue.length; i < len; ++i){
                        if(queue[0].isAnimated){
                            me.unRegister(queue[0], 0);
                        }
                    }

                    queue = [];
                    thread = null;
                    tweenCount = 0;
                }else{
                    me.unRegister(tween);
                }
            },

            run: function(){
                var tf, i, len, tween;
                for(i = 0, len = queue.length; i<len; i++) {
                    tween = queue[i];
                    if(tween && tween.isAnimated){
                        tf = tween.totalFrames;
                        if(tween.curFrame < tf || tf === null){
                            ++tween.curFrame;
                            if(tween.useSec){
                                correctFrame(tween);
                            }
                            tween._onTween.fire();
                        }else{
                            me.stop(tween);
                        }
                    }
                }
            }
        });

        var getIndex = function(anim) {
            var i, len;
            for(i = 0, len = queue.length; i<len; i++) {
                if(queue[i] === anim) {
                    return i;
                }
            }
            return -1;
        };

        var correctFrame = function(tween) {
            var frames = tween.totalFrames,
                frame = tween.curFrame,
                duration = tween.duration,
                expected = (frame * duration * 1000 / frames),
                elapsed = (now() - tween.startTime),
                tweak = 0;

            if(elapsed < duration * 1000){
                tweak = Math.round((elapsed / expected - 1) * frame);
            }else{
                tweak = frames - (frame + 1);
            }
            if(tweak > 0 && isFinite(tweak)){
                if(tween.curFrame + tweak >= frames){
                    tweak = frames - (frame + 1);
                }
                tween.curFrame += tweak;
            }
        };
    };

    EXTLIB.Bezier = new function() {

        this.getPosition = function(points, t) {
            var n = points.length,
                tmp = [],
                c = 1 - t,
                i,
                j;

            for (i = 0; i < n; ++i) {
                tmp[i] = [points[i][0], points[i][1]];
            }

            for (j = 1; j < n; ++j) {
                for (i = 0; i < n - j; ++i) {
                    tmp[i][0] = c * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                    tmp[i][1] = c * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
                }
            }

            return [ tmp[0][0], tmp[0][1] ];

        };
    };


    EXTLIB.Easing = {
        easeNone: function (t, b, c, d) {
            return c * t / d + b;
        },


        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },


        easeOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        }
    };

    (function() {
        EXTLIB.Motion = function(el, attributes, duration, method) {
            if (el) {
                EXTLIB.Motion.superclass.constructor.call(this, el, attributes, duration, method);
            }
        };

        Ext.extend(EXTLIB.Motion, Ext.lib.AnimBase);

        var superclass = EXTLIB.Motion.superclass,
            pointsRe = /^points$/i;

        Ext.apply(EXTLIB.Motion.prototype, {
            setAttr: function(attr, val, unit){
                var me = this,
                    setAttr = superclass.setAttr;

                if (pointsRe.test(attr)) {
                    unit = unit || 'px';
                    setAttr.call(me, 'left', val[0], unit);
                    setAttr.call(me, 'top', val[1], unit);
                } else {
                    setAttr.call(me, attr, val, unit);
                }
            },

            getAttr: function(attr){
                var me = this,
                    getAttr = superclass.getAttr;

                return pointsRe.test(attr) ? [getAttr.call(me, 'left'), getAttr.call(me, 'top')] : getAttr.call(me, attr);
            },

            doMethod: function(attr, start, end){
                var me = this;

                return pointsRe.test(attr)
                        ? EXTLIB.Bezier.getPosition(me.runAttrs[attr], me.method(me.curFrame, 0, 100, me.totalFrames) / 100)
                        : superclass.doMethod.call(me, attr, start, end);
            },

            setRunAttr: function(attr){
                if(pointsRe.test(attr)){

                    var me = this,
                        el = this.el,
                        points = this.attributes.points,
                        control = points.control || [],
                        from = points.from,
                        to = points.to,
                        by = points.by,
                        DOM = EXTLIB.Dom,
                        start,
                        i,
                        end,
                        len,
                        ra;


                    if(control.length > 0 && !Ext.isArray(control[0])){
                        control = [control];
                    }else{
                        /*
                        var tmp = [];
                        for (i = 0,len = control.length; i < len; ++i) {
                            tmp[i] = control[i];
                        }
                        control = tmp;
                        */
                    }

                    Ext.fly(el, '_anim').position();
                    DOM.setXY(el, isset(from) ? from : DOM.getXY(el));
                    start = me.getAttr('points');


                    if(isset(to)){
                        end = translateValues.call(me, to, start);
                        for (i = 0,len = control.length; i < len; ++i) {
                            control[i] = translateValues.call(me, control[i], start);
                        }
                    } else if (isset(by)) {
                        end = [start[0] + by[0], start[1] + by[1]];

                        for (i = 0,len = control.length; i < len; ++i) {
                            control[i] = [ start[0] + control[i][0], start[1] + control[i][1] ];
                        }
                    }

                    ra = this.runAttrs[attr] = [start];
                    if (control.length > 0) {
                        ra = ra.concat(control);
                    }

                    ra[ra.length] = end;
                }else{
                    superclass.setRunAttr.call(this, attr);
                }
            }
        });

        var translateValues = function(val, start) {
            var pageXY = EXTLIB.Dom.getXY(this.el);
            return [val[0] - pageXY[0] + start[0], val[1] - pageXY[1] + start[1]];
        };
    })();
})();// Easing functions
(function(){
    // shortcuts to aid compression
    var abs = Math.abs,
        pi = Math.PI,
        asin = Math.asin,
        pow = Math.pow,
        sin = Math.sin,
        EXTLIB = Ext.lib;

    Ext.apply(EXTLIB.Easing, {

        easeBoth: function (t, b, c, d) {
            return ((t /= d / 2) < 1)  ?  c / 2 * t * t + b  :  -c / 2 * ((--t) * (t - 2) - 1) + b;
        },

        easeInStrong: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },

        easeOutStrong: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },

        easeBothStrong: function (t, b, c, d) {
            return ((t /= d / 2) < 1)  ?  c / 2 * t * t * t * t + b  :  -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },

        elasticIn: function (t, b, c, d, a, p) {
            if (t == 0 || (t /= d) == 1) {
                return t == 0 ? b : b + c;
            }
            p = p || (d * .3);

            var s;
            if (a >= abs(c)) {
                s = p / (2 * pi) * asin(c / a);
            } else {
                a = c;
                s = p / 4;
            }

            return -(a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p)) + b;

        },

        elasticOut: function (t, b, c, d, a, p) {
            if (t == 0 || (t /= d) == 1) {
                return t == 0 ? b : b + c;
            }
            p = p || (d * .3);

            var s;
            if (a >= abs(c)) {
                s = p / (2 * pi) * asin(c / a);
            } else {
                a = c;
                s = p / 4;
            }

            return a * pow(2, -10 * t) * sin((t * d - s) * (2 * pi) / p) + c + b;
        },

        elasticBoth: function (t, b, c, d, a, p) {
            if (t == 0 || (t /= d / 2) == 2) {
                return t == 0 ? b : b + c;
            }

            p = p || (d * (.3 * 1.5));

            var s;
            if (a >= abs(c)) {
                s = p / (2 * pi) * asin(c / a);
            } else {
                a = c;
                s = p / 4;
            }

            return t < 1 ?
                    -.5 * (a * pow(2, 10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p)) + b :
                    a * pow(2, -10 * (t -= 1)) * sin((t * d - s) * (2 * pi) / p) * .5 + c + b;
        },

        backIn: function (t, b, c, d, s) {
            s = s ||  1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },


        backOut: function (t, b, c, d, s) {
            if (!s) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },


        backBoth: function (t, b, c, d, s) {
            s = s || 1.70158;

            return ((t /= d / 2 ) < 1) ?
                    c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b :
                    c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        },


        bounceIn: function (t, b, c, d) {
            return c - EXTLIB.Easing.bounceOut(d - t, 0, c, d) + b;
        },


        bounceOut: function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            }
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        },


        bounceBoth: function (t, b, c, d) {
            return (t < d / 2) ?
                    EXTLIB.Easing.bounceIn(t * 2, 0, c, d) * .5 + b :
                    EXTLIB.Easing.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        }
    });
})();

(function() {
    var EXTLIB = Ext.lib;
    // Color Animation
    EXTLIB.Anim.color = function(el, args, duration, easing, cb, scope) {
        return EXTLIB.Anim.run(el, args, duration, easing, cb, scope, EXTLIB.ColorAnim);
    };

    EXTLIB.ColorAnim = function(el, attributes, duration, method) {
        EXTLIB.ColorAnim.superclass.constructor.call(this, el, attributes, duration, method);
    };

    Ext.extend(EXTLIB.ColorAnim, EXTLIB.AnimBase);

    var superclass = EXTLIB.ColorAnim.superclass,
        colorRE = /color$/i,
        transparentRE = /^transparent|rgba\(0, 0, 0, 0\)$/,
        rgbRE = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,
        hexRE= /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,
        hex3RE = /^#?([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})$/i,
        isset = function(v){
            return typeof v !== 'undefined';
        };

    // private
    function parseColor(s) {
        var pi = parseInt,
            base,
            out = null,
            c;

        if (s.length == 3) {
            return s;
        }

        Ext.each([hexRE, rgbRE, hex3RE], function(re, idx){
            base = (idx % 2 == 0) ? 16 : 10;
            c = re.exec(s);
            if(c && c.length == 4){
                out = [pi(c[1], base), pi(c[2], base), pi(c[3], base)];
                return false;
            }
        });
        return out;
    }

    Ext.apply(EXTLIB.ColorAnim.prototype, {
        getAttr : function(attr) {
            var me = this,
                el = me.el,
                val;
            if(colorRE.test(attr)){
                while(el && transparentRE.test(val = Ext.fly(el).getStyle(attr))){
                    el = el.parentNode;
                    val = "fff";
                }
            }else{
                val = superclass.getAttr.call(me, attr);
            }
            return val;
        },

        doMethod : function(attr, start, end) {
            var me = this,
                val,
                floor = Math.floor,
                i,
                len,
                v;

            if(colorRE.test(attr)){
                val = [];
                end = end || [];

                for(i = 0, len = start.length; i < len; i++) {
                    v = start[i];
                    val[i] = superclass.doMethod.call(me, attr, v, end[i]);
                }
                val = 'rgb(' + floor(val[0]) + ',' + floor(val[1]) + ',' + floor(val[2]) + ')';
            }else{
                val = superclass.doMethod.call(me, attr, start, end);
            }
            return val;
        },

        setRunAttr : function(attr) {
            var me = this,
                a = me.attributes[attr],
                to = a.to,
                by = a.by,
                ra;

            superclass.setRunAttr.call(me, attr);
            ra = me.runAttrs[attr];
            if(colorRE.test(attr)){
                var start = parseColor(ra.start),
                    end = parseColor(ra.end);

                if(!isset(to) && isset(by)){
                    end = parseColor(by);
                    for(var i=0,len=start.length; i<len; i++) {
                        end[i] = start[i] + end[i];
                    }
                }
                ra.start = start;
                ra.end = end;
            }
        }
    });
})();


(function() {
    // Scroll Animation
    var EXTLIB = Ext.lib;
    EXTLIB.Anim.scroll = function(el, args, duration, easing, cb, scope) {
        return EXTLIB.Anim.run(el, args, duration, easing, cb, scope, EXTLIB.Scroll);
    };

    EXTLIB.Scroll = function(el, attributes, duration, method) {
        if(el){
            EXTLIB.Scroll.superclass.constructor.call(this, el, attributes, duration, method);
        }
    };

    Ext.extend(EXTLIB.Scroll, EXTLIB.ColorAnim);

    var superclass = EXTLIB.Scroll.superclass,
        SCROLL = 'scroll';

    Ext.apply(EXTLIB.Scroll.prototype, {

        doMethod : function(attr, start, end) {
            var val,
                me = this,
                curFrame = me.curFrame,
                totalFrames = me.totalFrames;

            if(attr == SCROLL){
                val = [me.method(curFrame, start[0], end[0] - start[0], totalFrames),
                       me.method(curFrame, start[1], end[1] - start[1], totalFrames)];
            }else{
                val = superclass.doMethod.call(me, attr, start, end);
            }
            return val;
        },

        getAttr : function(attr) {
            var me = this;

            if (attr == SCROLL) {
                return [me.el.scrollLeft, me.el.scrollTop];
            }else{
                return superclass.getAttr.call(me, attr);
            }
        },

        setAttr : function(attr, val, unit) {
            var me = this;

            if(attr == SCROLL){
                me.el.scrollLeft = val[0];
                me.el.scrollTop = val[1];
            }else{
                superclass.setAttr.call(me, attr, val, unit);
            }
        }
    });
})();	
	if (Ext.isIE&&window.attachEvent) {
        function fnCleanUp() {
            var p = Function.prototype;
            delete p.createSequence;
            delete p.defer;
            delete p.createDelegate;
            delete p.createCallback;
            delete p.createInterceptor;

            window.detachEvent("onunload", fnCleanUp);
        }
        window.attachEvent("onunload", fnCleanUp);
    }
})();

/*
 * This method evaluates the given code free of any local variable. In some browsers this
 * will be at global scope, in others it will be in a function.
 * @parma {String} code The code to evaluate.
 * @private
 * @method
 */
Ext.globalEval = Ext.global.execScript
    ? function (code) {
        execScript(code);
    }
    : function ($$code) {
        // IMPORTANT: because we use eval we cannot place this in the above function or it
        // will break the compressor's ability to rename local variables...
        (function () {
            // This var should not be replaced by the compressor. We need to do this so
            // that Ext refers to the global Ext, if we're sandboxing it may
            // refer to the local instance inside the closure
            var Ext = this.Ext;
            eval($$code);
        }());
    };


/**
*@class Ext.Version
**/
(function () {

    // Current core version
    // also fix Ext-more.js
    var version = '3.4.0',
        // used by checkVersion to avoid temp arrays:
        checkVerTemp = [''],
        endOfVersionRe = /([^\d\.])/,
        notDigitsRe = /[^\d]/g,
        plusMinusRe = /[\-+]/g,
        stripRe = /\s/g,
        underscoreRe = /_/g,
        Version;

    Ext.Version = Version = Ext.extend(Object, {
        isVersion: true,

        padModes: {
            '~': NaN,
            '^': Infinity
        },

        /**
         * @property {String} [release=""]
         * The release level. The following values are understood:
         * 
         *  * `"dev"`
         *  * `"alpha"` or `"a"`
         *  * `"beta"` or `"b"`
         *  * `"RC"` or `"rc"`
         *  * `"#"`
         *  * `"pl"` or `"p"`
         * @readonly
         */
        release: '',

        /**
         * @param {String/Number} version The version number.
         * @param {String} [defaultMode="^"] The padding mode (e.g., '^', '>' or '~').
         * This is ignored if the `version` contains an explicit mode prefix.
         * @return {Ext.Version} this
         */
        constructor: function (version, defaultMode) {
            var me = this,
                padModes = me.padModes,
                ch, i, pad, parts, release, releaseStartIndex, ver;

            if (version.isVersion) {
                return version;
            }

            me.version = ver = String(version).toLowerCase().
                                    replace(underscoreRe, '.').replace(plusMinusRe, '');

            ch = ver.charAt(0);
            if (ch in padModes) {
                ver = ver.substring(1);
                pad = padModes[ch];
            } else {
                pad = defaultMode ? padModes[defaultMode] : 0; // careful - NaN is falsey!
            }
            me.pad = pad;

            releaseStartIndex = ver.search(endOfVersionRe);
            me.shortVersion = ver;

            if (releaseStartIndex !== -1) {
                me.release = release = ver.substr(releaseStartIndex, version.length);
                me.shortVersion = ver.substr(0, releaseStartIndex);
                release = Version.releaseValueMap[release] || release;
            }

            me.releaseValue = release || pad;
            me.shortVersion = me.shortVersion.replace(notDigitsRe, '');

            /**
             * @property {Number[]} parts
             * The split array of version number components found in the version string.
             * For example, for "1.2.3", this would be `[1, 2, 3]`.
             * @readonly
             * @private
             */
            me.parts = parts = ver.split('.');
            for (i = parts.length; i--;) {
                parts[i] = parseInt(parts[i], 10);
            }
            if (pad === Infinity) {
                // have to add this to the end to create an upper bound:
                parts.push(pad);
            }

            /**
             * @property {Number} major
             * The first numeric part of the version number string.
             * @readonly
             */
            me.major = parts[0] || pad;

            /**
             * @property {Number} [minor]
             * The second numeric part of the version number string.
             * @readonly
             */
            me.minor = parts[1] || pad;

            /**
             * @property {Number} [patch]
             * The third numeric part of the version number string.
             * @readonly
             */
            me.patch = parts[2] || pad;

            /**
             * @property {Number} [build]
             * The fourth numeric part of the version number string.
             * @readonly
             */
            me.build = parts[3] || pad;

            return me;
        },

        /**
         * Compares this version instance to the specified `other` version.
         *
         * @param {String/Number/Ext.Version} other The other version to which to compare.
         * @return {Number} -1 if this version is less than the target version, 1 if this
         * version is greater, and 0 if they are equal.
         */
        compareTo: function (other) {
            // "lhs" == "left-hand-side"
            // "rhs" == "right-hand-side"
            var me = this,
                lhsPad = me.pad,
                lhsParts = me.parts,
                lhsLength = lhsParts.length,
                rhsVersion = other.isVersion ? other : new Version(other),
                rhsPad = rhsVersion.pad,
                rhsParts = rhsVersion.parts,
                rhsLength = rhsParts.length,
                length = Math.max(lhsLength, rhsLength),
                i, lhs, rhs;

            for (i = 0; i < length; i++) {
                lhs = (i < lhsLength) ? lhsParts[i] : lhsPad;
                rhs = (i < rhsLength) ? rhsParts[i] : rhsPad;

                // When one or both of the values are NaN these tests produce false
                // and we end up treating NaN as equal to anything.
                if (lhs < rhs) {
                    return -1;
                }
                if (lhs > rhs) {
                    return 1;
                }
            }

            // same comments about NaN apply here...
            lhs = me.releaseValue;
            rhs = rhsVersion.releaseValue;
            if (lhs < rhs) {
                return -1;
            }
            if (lhs > rhs) {
                return 1;
            }

            return 0;
        },

        /**
         * Override the native toString method
         * @private
         * @return {String} version
         */
        toString: function () {
            return this.version;
        },

        /**
         * Override the native valueOf method
         * @private
         * @return {String} version
         */
        valueOf: function () {
            return this.version;
        },

        /**
         * Returns the major component value.
         * @return {Number}
         */
        getMajor: function () {
            return this.major;
        },

        /**
         * Returns the minor component value.
         * @return {Number}
         */
        getMinor: function () {
            return this.minor;
        },

        /**
         * Returns the patch component value.
         * @return {Number}
         */
        getPatch: function () {
            return this.patch;
        },

        /**
         * Returns the build component value.
         * @return {Number}
         */
        getBuild: function () {
            return this.build;
        },

        /**
         * Returns the release component text (e.g., "beta").
         * @return {String}
         */
        getRelease: function () {
            return this.release;
        },

        /**
         * Returns the release component value for comparison purposes.
         * @return {Number/String}
         */
        getReleaseValue: function () {
            return this.releaseValue;
        },

        /**
         * Returns whether this version if greater than the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if greater than the target, false otherwise
         */
        isGreaterThan: function (target) {
            return this.compareTo(target) > 0;
        },

        /**
         * Returns whether this version if greater than or equal to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if greater than or equal to the target, false otherwise
         */
        isGreaterThanOrEqual: function (target) {
            return this.compareTo(target) >= 0;
        },

        /**
         * Returns whether this version if smaller than the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if smaller than the target, false otherwise
         */
        isLessThan: function (target) {
            return this.compareTo(target) < 0;
        },

        /**
         * Returns whether this version if less than or equal to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if less than or equal to the target, false otherwise
         */
        isLessThanOrEqual: function (target) {
            return this.compareTo(target) <= 0;
        },

        /**
         * Returns whether this version equals to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version equals to the target, false otherwise
         */
        equals: function (target) {
            return this.compareTo(target) === 0;
        },

        /**
         * Returns whether this version matches the supplied argument. Example:
         *
         *     var version = new Ext.Version('1.0.2beta');
         *     console.log(version.match(1)); // True
         *     console.log(version.match(1.0)); // True
         *     console.log(version.match('1.0.2')); // True
         *     console.log(version.match('1.0.2RC')); // False
         *
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version matches the target, false otherwise
         */
        match: function (target) {
            target = String(target);
            return this.version.substr(0, target.length) === target;
        },

        /**
         * Returns this format: [major, minor, patch, build, release]. Useful for comparison.
         * @return {Number[]}
         */
        toArray: function () {
            var me = this;
            return [me.getMajor(), me.getMinor(), me.getPatch(), me.getBuild(), me.getRelease()];
        },

        /**
         * Returns shortVersion version without dots and release
         * @return {String}
         */
        getShortVersion: function () {
            return this.shortVersion;
        },

        /**
         * Convenient alias to {@link Ext.Version#isGreaterThan isGreaterThan}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        gt: function (target) {
            return this.compareTo(target) > 0;
        },

        /**
         * Convenient alias to {@link Ext.Version#isLessThan isLessThan}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        lt: function (target) {
            return this.compareTo(target) < 0;
        },

        /**
         * Convenient alias to {@link Ext.Version#isGreaterThanOrEqual isGreaterThanOrEqual}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        gtEq: function (target) {
            return this.compareTo(target) >= 0;
        },

        /**
         * Convenient alias to {@link Ext.Version#isLessThanOrEqual isLessThanOrEqual}
         * @param {String/Number/Ext.Version} target
         * @return {Boolean}
         */
        ltEq: function (target) {
            return this.compareTo(target) <= 0;
        }
    });

    Ext.apply(Version, {
        // @private
        releaseValueMap: {
            dev: -6,
            alpha: -5,
            a: -5,
            beta: -4,
            b: -4,
            rc: -3,
            '#': -2,
            p: -1,
            pl: -1
        },

        /**
         * Converts a version component to a comparable value
         *
         * @static
         * @param {Object} value The value to convert
         * @return {Object}
         */
        getComponentValue: function (value) {
            return !value ? 0 : (isNaN(value) ? this.releaseValueMap[value] || value : parseInt(value, 10));
        },

        /**
         * Compare 2 specified versions by ensuring the first parameter is a `Version`
         * instance and then calling the `compareTo` method.
         *
         * @static
         * @param {String} current The current version to compare to
         * @param {String} target The target version to compare to
         * @return {Number} Returns -1 if the current version is smaller than the target version, 1 if greater, and 0 if they're equivalent
         */
        compare: function (current, target) {
            var ver = current.isVersion ? current : new Version(current);
            return ver.compareTo(target);
        }
    });

    /**
     * @class Ext
     */
    Ext.apply(Ext, {
        /**
         * @private
         */
        versions: {},

        /**
         * @private
         */
        lastRegisteredVersion: null,

        /**
         * Set version number for the given package name.
         *
         * @param {String} packageName The package name, e.g. 'core', 'touch', 'ext'.
         * @param {String/Ext.Version} version The version, e.g. '1.2.3alpha', '2.4.0-dev'.
         * @return {Ext}
         */
        setVersion: function (packageName, version) {
            Ext.lastRegisteredVersion = Ext.versions[packageName] = new Version(version);
            return this;
        },

        /**
         * Get the version number of the supplied package name; will return the last
         * registered version (last `Ext.setVersion` call) if there's no package name given.
         *
         * @param {String} [packageName] The package name, e.g., 'core', 'touch', 'ext'.
         * @return {Ext.Version} The version.
         */
        getVersion: function (packageName) {
            if (packageName === undefined) {
                return Ext.lastRegisteredVersion;
            }

            return Ext.versions[packageName];
        },

        /**
         * This method checks the registered package versions against the provided version
         * `specs`. A `spec` is either a string or an object indicating a boolean operator.
         * This method accepts either form or an array of these as the first argument. The
         * second argument applies only when the first is an array and indicates whether
         * all `specs` must match or just one.
         * 
         * ## Package Version Specifications
         * The string form of a `spec` is used to indicate a version or range of versions
         * for a particular package. This form of `spec` consists of three (3) parts:
         * 
         *  * Package name followed by "@". If not provided, the framework is assumed.
         *  * Minimum version.
         *  * Maximum version.
         * 
         * At least one version number must be provided. If both minimum and maximum are
         * provided, these must be separated by a "-".
         * 
         * Some examples of package version specifications:
         * 
         *      4.2.2           (exactly version 4.2.2 of the framework)
         *      4.2.2+          (version 4.2.2 or higher of the framework)
         *      4.2.2-          (version 4.2.2 or higher of the framework)
         *      4.2.1 - 4.2.3   (versions from 4.2.1 up to 4.2.3 of the framework)
         *      - 4.2.2         (any version up to version 4.2.1 of the framework)
         *      
         *      foo@1.0         (exactly version 1.0 of package "foo")
         *      foo@1.0-1.3     (versions 1.0 up to 1.3 of package "foo")
         * 
         * **NOTE:** This syntax is the same as that used in Sencha Cmd's package
         * requirements declarations.
         * 
         * ## Boolean Operator Specifications
         * Instead of a string, an object can be used to describe a boolean operation to
         * perform on one or more `specs`. The operator is either **`and`** or **`or`**
         * and can contain an optional **`not`**.
         * 
         * For example:
         * 
         *      {
         *          not: true,  // negates boolean result
         *          and: [
         *              '4.2.2',
         *              'foo@1.0.1 - 2.0.1'
         *          ]
         *      }
         * 
         * Each element of the array can in turn be a string or object spec. In other
         * words, the value is passed to this method (recursively) as the first argument
         * so these two calls are equivalent:
         * 
         *      Ext.checkVersion({
         *          not: true,  // negates boolean result
         *          and: [
         *              '4.2.2',
         *              'foo@1.0.1 - 2.0.1'
         *          ]
         *      });
         *
         *      !Ext.checkVersion([
         *              '4.2.2',
         *              'foo@1.0.1 - 2.0.1'
         *          ], true);
         * 
         * ## Examples
         * 
         *      // A specific framework version
         *      Ext.checkVersion('4.2.2');
         * 
         *      // A range of framework versions:
         *      Ext.checkVersion('4.2.1-4.2.3');
         * 
         *      // A specific version of a package:
         *      Ext.checkVersion('foo@1.0.1');
         * 
         *      // A single spec that requires both a framework version and package
         *      // version range to match:
         *      Ext.checkVersion({
         *          and: [
         *              '4.2.2',
         *              'foo@1.0.1-1.0.2'
         *          ]
         *      });
         * 
         *      // These checks can be nested:
         *      Ext.checkVersion({
         *          and: [
         *              '4.2.2',  // exactly version 4.2.2 of the framework *AND*
         *              {
         *                  // either (or both) of these package specs:
         *                  or: [
         *                      'foo@1.0.1-1.0.2',
         *                      'bar@3.0+'
         *                  ]
         *              }
         *          ]
         *      });
         * 
         * ## Version Comparisons
         * Version comparsions are assumed to be "prefix" based. That is to say, `"foo@1.2"`
         * matches any version of "foo" that has a major version 1 and a minor version of 2.
         * 
         * This also applies to ranges. For example `"foo@1.2-2.2"` matches all versions
         * of "foo" from 1.2 up to 2.2 regardless of the specific patch and build.
         * 
         * ## Use in Overrides
         * This methods primary use is in support of conditional overrides on an
         * `Ext.define` declaration.
         * 
         * @param {String/Array/Object} specs A version specification string, an object
         * containing `or` or `and` with a value that is equivalent to `specs` or an array
         * of either of these.
         * @param {Boolean} [matchAll=false] Pass `true` to require all specs to match.
         * @return {Boolean} True if `specs` matches the registered package versions.
         */
        checkVersion: function (specs, matchAll) {
            var isArray = Ext.isArray(specs),
                compat = isArray ? specs : checkVerTemp,
                length = compat.length,
                versions = Ext.versions,
                frameworkVer = versions.ext || versions.touch,
                i, index, matches, minVer, maxVer, spec, range, ver;

            if (!isArray) {
                checkVerTemp[0] = specs;
            }

            for (i = 0; i < length; ++i) {
                if (!Ext.isString(spec = compat[i])) {
                    matches = Ext.checkVersion(spec.and || spec.or, !spec.or);
                    if (spec.not) {
                        matches = !matches;
                    }
                } else {
                    if (spec.indexOf(' ') >= 0) {
                        spec = spec.replace(stripRe, '');
                    }

                    // For "name@..." syntax, we need to find the package by the given name
                    // as a registered package.
                    index = spec.indexOf('@');
                    if (index < 0) {
                        range = spec;
                        ver = frameworkVer;
                    } else {
                        if (!(ver = versions[spec.substring(0, index)])) {
                            // The package is not registered, so if we must matchAll then
                            // we are done - FAIL:
                            if (matchAll) {
                                return false;
                            }
                            // Otherwise this spec is not a match so we can move on to the
                            // next...
                            continue;
                        }
                        range = spec.substring(index + 1);
                    }

                    // Now look for a version, version range or partial range:
                    index = range.indexOf('-');
                    if (index < 0) {
                        // just a version or "1.0+"
                        if (range.charAt(index = range.length - 1) === '+') {
                            minVer = range.substring(0, index);
                            maxVer = null;
                        } else {
                            minVer = maxVer = range;
                        }
                    } else if (index > 0) {
                        // a range like "1.0-1.5" or "1.0-"
                        minVer = range.substring(0, index);
                        maxVer = range.substring(index + 1); // may be empty
                    } else {
                        // an upper limit like "-1.5"
                        minVer = null;
                        maxVer = range.substring(index + 1);
                    }

                    matches = true;
                    if (minVer) {
                        minVer = new Version(minVer, '~'); // prefix matching
                        matches = minVer.ltEq(ver);
                    }
                    if (matches && maxVer) {
                        maxVer = new Version(maxVer, '~'); // prefix matching
                        matches = maxVer.gtEq(ver);
                    }
                } // string spec

                if (matches) {
                    // spec matched and we are looking for any match, so we are GO!
                    if (!matchAll) {
                        return true;
                    }
                } else if (matchAll) {
                    // spec does not match the registered package version
                    return false;
                }
            }

            // In the loop above, for matchAll we return FALSE on mismatch, so getting
            // here with matchAll means we had no mismatches. On the other hand, if we
            // are !matchAll, we return TRUE on match and so we get here only if we found
            // no matches.
            return !!matchAll;
        },

        /**
         * Create a closure for deprecated code.
         *
         *     // This means Ext.oldMethod is only supported in 4.0.0beta and older.
         *     // If Ext.getVersion('extjs') returns a version that is later than '4.0.0beta', for example '4.0.0RC',
         *     // the closure will not be invoked
         *     Ext.deprecate('extjs', '4.0.0beta', function() {
         *         Ext.oldMethod = Ext.newMethod;
         *
         *         ...
         *     });
         *
         * @param {String} packageName The package name
         * @param {String} since The last version before it's deprecated
         * @param {Function} closure The callback function to be executed with the specified version is less than the current version
         * @param {Object} scope The execution scope (`this`) if the closure
         */
        deprecate: function (packageName, since, closure, scope) {
            if (Version.compare(Ext.getVersion(packageName), since) < 1) {
                closure.call(scope);
            }
        }
    }); // End Versioning

    Ext.setVersion('core', version);

}());


/*加入vmd2工具库*/
; (function (undefined) {
    if (String.prototype.trim === undefined) // fix for iOS 3.2
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '')
        }

    // For iOS 3.x
    // from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
    //这个方法的作用就是累似一个累计处理的作用，将前一条数据的处理结果用作下一次的处理
    //比如[1,2,3,4,].reduce(function(x,y){ return x+y}); ==> ((1+2)+3)+4,

    if (Array.prototype.reduce === undefined) Array.prototype.reduce = function (fun) {
        if (this === void 0 || this === null) throw new TypeError()
        var t = Object(this),
          len = t.length >>> 0,
          k = 0,
          accumulator
        if (typeof fun != 'function') throw new TypeError()
        if (len == 0 && arguments.length == 1) throw new TypeError()
        //取初始值  
        if (arguments.length >= 2) accumulator = arguments[1] //如果参数长度大于2个，则将第二个参数作为初始值
        else do {
            if (k in t) {
                accumulator = t[k++] //否则将数组的第一条数据作为初绍值
                break
            }
            if (++k >= len) throw new TypeError() //什么情况下会执行到这里来？？？
        } while (true)
        //遍历数组，将前一次的结果传入处理函数进行累计处理
        while (k < len) {
            if (k in t) accumulator = fun.call(undefined, accumulator, t[k], k, t)
            k++
        }
        return accumulator
    };
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function forEach(callback, thisArg) {
            var T, k;
            if (this == null) {
                throw new TypeError("this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {

                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

})()
;
(function (a, b) { function G(a) { var b = F[a] = {}; return p.each(a.split(s), function (a, c) { b[c] = !0 }), b } function J(a, c, d) { if (d === b && a.nodeType === 1) { var e = "data-" + c.replace(I, "-$1").toLowerCase(); d = a.getAttribute(e); if (typeof d == "string") { try { d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : H.test(d) ? p.parseJSON(d) : d } catch (f) { } p.data(a, c, d) } else d = b } return d } function K(a) { var b; for (b in a) { if (b === "data" && p.isEmptyObject(a[b])) continue; if (b !== "toJSON") return !1 } return !0 } function ba() { return !1 } function bb() { return !0 } function bh(a) { return !a || !a.parentNode || a.parentNode.nodeType === 11 } function bi(a, b) { do a = a[b]; while (a && a.nodeType !== 1); return a } function bj(a, b, c) { b = b || 0; if (p.isFunction(b)) return p.grep(a, function (a, d) { var e = !!b.call(a, d, a); return e === c }); if (b.nodeType) return p.grep(a, function (a, d) { return a === b === c }); if (typeof b == "string") { var d = p.grep(a, function (a) { return a.nodeType === 1 }); if (be.test(b)) return p.filter(b, d, !c); b = p.filter(b, d) } return p.grep(a, function (a, d) { return p.inArray(a, b) >= 0 === c }) } function bk(a) { var b = bl.split("|"), c = a.createDocumentFragment(); if (c.createElement) while (b.length) c.createElement(b.pop()); return c } function bC(a, b) { return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b)) } function bD(a, b) { if (b.nodeType !== 1 || !p.hasData(a)) return; var c, d, e, f = p._data(a), g = p._data(b, f), h = f.events; if (h) { delete g.handle, g.events = {}; for (c in h) for (d = 0, e = h[c].length; d < e; d++) p.event.add(b, c, h[c][d]) } g.data && (g.data = p.extend({}, g.data)) } function bE(a, b) { var c; if (b.nodeType !== 1) return; b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), p.support.html5Clone && a.innerHTML && !p.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && bv.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), b.removeAttribute(p.expando) } function bF(a) { return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [] } function bG(a) { bv.test(a.type) && (a.defaultChecked = a.checked) } function bX(a, b) { if (b in a) return b; var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = bV.length; while (e--) { b = bV[e] + c; if (b in a) return b } return d } function bY(a, b) { return a = b || a, p.css(a, "display") === "none" || !p.contains(a.ownerDocument, a) } function bZ(a, b) { var c, d, e = [], f = 0, g = a.length; for (; f < g; f++) { c = a[f]; if (!c.style) continue; e[f] = p._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && bY(c) && (e[f] = p._data(c, "olddisplay", cb(c.nodeName)))) : (d = bH(c, "display"), !e[f] && d !== "none" && p._data(c, "olddisplay", d)) } for (f = 0; f < g; f++) { c = a[f]; if (!c.style) continue; if (!b || c.style.display === "none" || c.style.display === "") c.style.display = b ? e[f] || "" : "none" } return a } function b$(a, b, c) { var d = bO.exec(b); return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b } function b_(a, b, c, d) { var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0, f = 0; for (; e < 4; e += 2) c === "margin" && (f += p.css(a, c + bU[e], !0)), d ? (c === "content" && (f -= parseFloat(bH(a, "padding" + bU[e])) || 0), c !== "margin" && (f -= parseFloat(bH(a, "border" + bU[e] + "Width")) || 0)) : (f += parseFloat(bH(a, "padding" + bU[e])) || 0, c !== "padding" && (f += parseFloat(bH(a, "border" + bU[e] + "Width")) || 0)); return f } function ca(a, b, c) { var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = !0, f = p.support.boxSizing && p.css(a, "boxSizing") === "border-box"; if (d <= 0) { d = bH(a, b); if (d < 0 || d == null) d = a.style[b]; if (bP.test(d)) return d; e = f && (p.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0 } return d + b_(a, b, c || (f ? "border" : "content"), e) + "px" } function cb(a) { if (bR[a]) return bR[a]; var b = p("<" + a + ">").appendTo(e.body), c = b.css("display"); b.remove(); if (c === "none" || c === "") { bI = e.body.appendChild(bI || p.extend(e.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 })); if (!bJ || !bI.createElement) bJ = (bI.contentWindow || bI.contentDocument).document, bJ.write("<!doctype html><html><body>"), bJ.close(); b = bJ.body.appendChild(bJ.createElement(a)), c = bH(b, "display"), e.body.removeChild(bI) } return bR[a] = c, c } function ch(a, b, c, d) { var e; if (p.isArray(b)) p.each(b, function (b, e) { c || cd.test(a) ? d(a, e) : ch(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d) }); else if (!c && p.type(b) === "object") for (e in b) ch(a + "[" + e + "]", b[e], c, d); else d(a, b) } function cy(a) { return function (b, c) { typeof b != "string" && (c = b, b = "*"); var d, e, f, g = b.toLowerCase().split(s), h = 0, i = g.length; if (p.isFunction(c)) for (; h < i; h++) d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c) } } function cz(a, c, d, e, f, g) { f = f || c.dataTypes[0], g = g || {}, g[f] = !0; var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === cu; for (; j < k && (l || !h) ; j++) h = i[j](c, d, e), typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = cz(a, c, d, e, h, g))); return (l || !h) && !g["*"] && (h = cz(a, c, d, e, "*", g)), h } function cA(a, c) { var d, e, f = p.ajaxSettings.flatOptions || {}; for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]); e && p.extend(!0, a, e) } function cB(a, c, d) { var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields; for (f in k) f in d && (c[k[f]] = d[f]); while (j[0] === "*") j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type")); if (e) for (f in i) if (i[f] && i[f].test(e)) { j.unshift(f); break } if (j[0] in d) g = j[0]; else { for (f in d) { if (!j[0] || a.converters[f + " " + j[0]]) { g = f; break } h || (h = f) } g = g || h } if (g) return g !== j[0] && j.unshift(g), d[g] } function cC(a, b) { var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0; a.dataFilter && (b = a.dataFilter(b, a.dataType)); if (g[1]) for (c in a.converters) i[c.toLowerCase()] = a.converters[c]; for (; e = g[++j];) if (e !== "*") { if (h !== "*" && h !== e) { c = i[h + " " + e] || i["* " + e]; if (!c) for (d in i) { f = d.split(" "); if (f[1] === e) { c = i[h + " " + f[0]] || i["* " + f[0]]; if (c) { c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e)); break } } } if (c !== !0) if (c && a["throws"]) b = c(b); else try { b = c(b) } catch (k) { return { state: "parsererror", error: c ? k : "No conversion from " + h + " to " + e } } } h = e } return { state: "success", data: b } } function cK() { try { return new a.XMLHttpRequest } catch (b) { } } function cL() { try { return new a.ActiveXObject("Microsoft.XMLHTTP") } catch (b) { } } function cT() { return setTimeout(function () { cM = b }, 0), cM = p.now() } function cU(a, b) { p.each(b, function (b, c) { var d = (cS[b] || []).concat(cS["*"]), e = 0, f = d.length; for (; e < f; e++) if (d[e].call(a, b, c)) return }) } function cV(a, b, c) { var d, e = 0, f = 0, g = cR.length, h = p.Deferred().always(function () { delete i.elem }), i = function () { var b = cM || cT(), c = Math.max(0, j.startTime + j.duration - b), d = 1 - (c / j.duration || 0), e = 0, f = j.tweens.length; for (; e < f; e++) j.tweens[e].run(d); return h.notifyWith(a, [j, d, c]), d < 1 && f ? c : (h.resolveWith(a, [j]), !1) }, j = h.promise({ elem: a, props: p.extend({}, b), opts: p.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: cM || cT(), duration: c.duration, tweens: [], createTween: function (b, c, d) { var e = p.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(e), e }, stop: function (b) { var c = 0, d = b ? j.tweens.length : 0; for (; c < d; c++) j.tweens[c].run(1); return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this } }), k = j.props; cW(k, j.opts.specialEasing); for (; e < g; e++) { d = cR[e].call(j, a, k, j.opts); if (d) return d } return cU(j, k), p.isFunction(j.opts.start) && j.opts.start.call(a, j), p.fx.timer(p.extend(i, { anim: j, queue: j.opts.queue, elem: a })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always) } function cW(a, b) { var c, d, e, f, g; for (c in a) { d = p.camelCase(c), e = b[d], f = a[c], p.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = p.cssHooks[d]; if (g && "expand" in g) { f = g.expand(f), delete a[d]; for (c in f) c in a || (a[c] = f[c], b[c] = e) } else b[d] = e } } function cX(a, b, c) { var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], q = a.nodeType && bY(a); c.queue || (j = p._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function () { j.unqueued || k() }), j.unqueued++, l.always(function () { l.always(function () { j.unqueued--, p.queue(a, "fx").length || j.empty.fire() }) })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], p.css(a, "display") === "inline" && p.css(a, "float") === "none" && (!p.support.inlineBlockNeedsLayout || cb(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)), c.overflow && (m.overflow = "hidden", p.support.shrinkWrapBlocks || l.done(function () { m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2] })); for (d in b) { f = b[d]; if (cO.exec(f)) { delete b[d]; if (f === (q ? "hide" : "show")) continue; o.push(d) } } g = o.length; if (g) { h = p._data(a, "fxshow") || p._data(a, "fxshow", {}), q ? p(a).show() : l.done(function () { p(a).hide() }), l.done(function () { var b; p.removeData(a, "fxshow", !0); for (b in n) p.style(a, b, n[b]) }); for (d = 0; d < g; d++) e = o[d], i = l.createTween(e, q ? h[e] : 0), n[e] = h[e] || p.style(a, e), e in h || (h[e] = i.start, q && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0)) } } function cY(a, b, c, d, e) { return new cY.prototype.init(a, b, c, d, e) } function cZ(a, b) { var c, d = { height: a }, e = 0; for (; e < 4; e += 2 - b) c = bU[e], d["margin" + c] = d["padding" + c] = a; return b && (d.opacity = d.width = a), d } function c_(a) { return p.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1 } var c, d, e = a.document, f = a.location, g = a.navigator, h = a.jQuery, i = a.$, j = Array.prototype.push, k = Array.prototype.slice, l = Array.prototype.indexOf, m = Object.prototype.toString, n = Object.prototype.hasOwnProperty, o = String.prototype.trim, p = function (a, b) { return new p.fn.init(a, b, c) }, q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, r = /\S/, s = /\s+/, t = r.test(" ") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^[\],:{}\s]*$/, x = /(?:^|:|,)(?:\s*\[)+/g, y = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, z = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, A = /^-ms-/, B = /-([\da-z])/gi, C = function (a, b) { return (b + "").toUpperCase() }, D = function () { e.addEventListener ? (e.removeEventListener("DOMContentLoaded", D, !1), p.ready()) : e.readyState === "complete" && (e.detachEvent("onreadystatechange", D), p.ready()) }, E = {}; p.fn = p.prototype = { constructor: p, init: function (a, c, d) { var f, g, h, i; if (!a) return this; if (a.nodeType) return this.context = this[0] = a, this.length = 1, this; if (typeof a == "string") { a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? f = [null, a, null] : f = u.exec(a); if (f && (f[1] || !c)) { if (f[1]) return c = c instanceof p ? c[0] : c, i = c && c.nodeType ? c.ownerDocument || c : e, a = p.parseHTML(f[1], i, !0), v.test(f[1]) && p.isPlainObject(c) && this.attr.call(a, c, !0), p.merge(this, a); g = e.getElementById(f[2]); if (g && g.parentNode) { if (g.id !== f[2]) return d.find(a); this.length = 1, this[0] = g } return this.context = e, this.selector = a, this } return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a) } return p.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), p.makeArray(a, this)) }, selector: "", jquery: "1.8.0", length: 0, size: function () { return this.length }, toArray: function () { return k.call(this) }, get: function (a) { return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a] }, pushStack: function (a, b, c) { var d = p.merge(this.constructor(), a); return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d }, each: function (a, b) { return p.each(this, a, b) }, ready: function (a) { return p.ready.promise().done(a), this }, eq: function (a) { return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, slice: function () { return this.pushStack(k.apply(this, arguments), "slice", k.call(arguments).join(",")) }, map: function (a) { return this.pushStack(p.map(this, function (b, c) { return a.call(b, c, b) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: j, sort: [].sort, splice: [].splice }, p.fn.init.prototype = p.fn, p.extend = p.fn.extend = function () { var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1; typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), typeof h != "object" && !p.isFunction(h) && (h = {}), j === i && (h = this, --i); for (; i < j; i++) if ((a = arguments[i]) != null) for (c in a) { d = h[c], e = a[c]; if (h === e) continue; k && e && (p.isPlainObject(e) || (f = p.isArray(e))) ? (f ? (f = !1, g = d && p.isArray(d) ? d : []) : g = d && p.isPlainObject(d) ? d : {}, h[c] = p.extend(k, g, e)) : e !== b && (h[c] = e) } return h }, p.extend({ noConflict: function (b) { return a.$ === p && (a.$ = i), b && a.jQuery === p && (a.jQuery = h), p }, isReady: !1, readyWait: 1, holdReady: function (a) { a ? p.readyWait++ : p.ready(!0) }, ready: function (a) { if (a === !0 ? --p.readyWait : p.isReady) return; if (!e.body) return setTimeout(p.ready, 1); p.isReady = !0; if (a !== !0 && --p.readyWait > 0) return; d.resolveWith(e, [p]), p.fn.trigger && p(e).trigger("ready").off("ready") }, isFunction: function (a) { return p.type(a) === "function" }, isArray: Array.isArray || function (a) { return p.type(a) === "array" }, isWindow: function (a) { return a != null && a == a.window }, isNumeric: function (a) { return !isNaN(parseFloat(a)) && isFinite(a) }, type: function (a) { return a == null ? String(a) : E[m.call(a)] || "object" }, isPlainObject: function (a) { if (!a || p.type(a) !== "object" || a.nodeType || p.isWindow(a)) return !1; try { if (a.constructor && !n.call(a, "constructor") && !n.call(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (c) { return !1 } var d; for (d in a); return d === b || n.call(a, d) }, isEmptyObject: function (a) { var b; for (b in a) return !1; return !0 }, error: function (a) { throw new Error(a) }, parseHTML: function (a, b, c) { var d; return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b, b = 0), b = b || e, (d = v.exec(a)) ? [b.createElement(d[1])] : (d = p.buildFragment([a], b, c ? null : []), p.merge([], (d.cacheable ? p.clone(d.fragment) : d.fragment).childNodes))) }, parseJSON: function (b) { if (!b || typeof b != "string") return null; b = p.trim(b); if (a.JSON && a.JSON.parse) return a.JSON.parse(b); if (w.test(b.replace(y, "@").replace(z, "]").replace(x, ""))) return (new Function("return " + b))(); p.error("Invalid JSON: " + b) }, parseXML: function (c) { var d, e; if (!c || typeof c != "string") return null; try { a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c)) } catch (f) { d = b } return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && p.error("Invalid XML: " + c), d }, noop: function () { }, globalEval: function (b) { b && r.test(b) && (a.execScript || function (b) { a.eval.call(a, b) })(b) }, camelCase: function (a) { return a.replace(A, "ms-").replace(B, C) }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase() }, each: function (a, c, d) { var e, f = 0, g = a.length, h = g === b || p.isFunction(a); if (d) { if (h) { for (e in a) if (c.apply(a[e], d) === !1) break } else for (; f < g;) if (c.apply(a[f++], d) === !1) break } else if (h) { for (e in a) if (c.call(a[e], e, a[e]) === !1) break } else for (; f < g;) if (c.call(a[f], f, a[f++]) === !1) break; return a }, trim: o ? function (a) { return a == null ? "" : o.call(a) } : function (a) { return a == null ? "" : a.toString().replace(t, "") }, makeArray: function (a, b) { var c, d = b || []; return a != null && (c = p.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || p.isWindow(a) ? j.call(d, a) : p.merge(d, a)), d }, inArray: function (a, b, c) { var d; if (b) { if (l) return l.call(b, a, c); d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0; for (; c < d; c++) if (c in b && b[c] === a) return c } return -1 }, merge: function (a, c) { var d = c.length, e = a.length, f = 0; if (typeof d == "number") for (; f < d; f++) a[e++] = c[f]; else while (c[f] !== b) a[e++] = c[f++]; return a.length = e, a }, grep: function (a, b, c) { var d, e = [], f = 0, g = a.length; c = !!c; for (; f < g; f++) d = !!b(a[f], f), c !== d && e.push(a[f]); return e }, map: function (a, c, d) { var e, f, g = [], h = 0, i = a.length, j = a instanceof p || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || p.isArray(a)); if (j) for (; h < i; h++) e = c(a[h], h, d), e != null && (g[g.length] = e); else for (f in a) e = c(a[f], f, d), e != null && (g[g.length] = e); return g.concat.apply([], g) }, guid: 1, proxy: function (a, c) { var d, e, f; return typeof c == "string" && (d = a[c], c = a, a = d), p.isFunction(a) ? (e = k.call(arguments, 2), f = function () { return a.apply(c, e.concat(k.call(arguments))) }, f.guid = a.guid = a.guid || f.guid || p.guid++, f) : b }, access: function (a, c, d, e, f, g, h) { var i, j = d == null, k = 0, l = a.length; if (d && typeof d == "object") { for (k in d) p.access(a, c, k, d[k], 1, g, e); f = 1 } else if (e !== b) { i = h === b && p.isFunction(e), j && (i ? (i = c, c = function (a, b, c) { return i.call(p(a), c) }) : (c.call(a, e), c = null)); if (c) for (; k < l; k++) c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h); f = 1 } return f ? a : j ? c.call(a) : l ? c(a[0], d) : g }, now: function () { return (new Date).getTime() } }), p.ready.promise = function (b) { if (!d) { d = p.Deferred(); if (e.readyState === "complete" || e.readyState !== "loading" && e.addEventListener) setTimeout(p.ready, 1); else if (e.addEventListener) e.addEventListener("DOMContentLoaded", D, !1), a.addEventListener("load", p.ready, !1); else { e.attachEvent("onreadystatechange", D), a.attachEvent("onload", p.ready); var c = !1; try { c = a.frameElement == null && e.documentElement } catch (f) { } c && c.doScroll && function g() { if (!p.isReady) { try { c.doScroll("left") } catch (a) { return setTimeout(g, 50) } p.ready() } }() } } return d.promise(b) }, p.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) { E["[object " + b + "]"] = b.toLowerCase() }), c = p(e); var F = {}; p.Callbacks = function (a) { a = typeof a == "string" ? F[a] || G(a) : p.extend({}, a); var c, d, e, f, g, h, i = [], j = !a.once && [], k = function (b) { c = a.memory && b, d = !0, h = f || 0, f = 0, g = i.length, e = !0; for (; i && h < g; h++) if (i[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) { c = !1; break } e = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable()) }, l = { add: function () { if (i) { var b = i.length; (function d(b) { p.each(b, function (b, c) { p.isFunction(c) && (!a.unique || !l.has(c)) ? i.push(c) : c && c.length && d(c) }) })(arguments), e ? g = i.length : c && (f = b, k(c)) } return this }, remove: function () { return i && p.each(arguments, function (a, b) { var c; while ((c = p.inArray(b, i, c)) > -1) i.splice(c, 1), e && (c <= g && g--, c <= h && h--) }), this }, has: function (a) { return p.inArray(a, i) > -1 }, empty: function () { return i = [], this }, disable: function () { return i = j = c = b, this }, disabled: function () { return !i }, lock: function () { return j = b, c || l.disable(), this }, locked: function () { return !j }, fireWith: function (a, b) { return b = b || [], b = [a, b.slice ? b.slice() : b], i && (!d || j) && (e ? j.push(b) : k(b)), this }, fire: function () { return l.fireWith(this, arguments), this }, fired: function () { return !!d } }; return l }, p.extend({ Deferred: function (a) { var b = [["resolve", "done", p.Callbacks("once memory"), "resolved"], ["reject", "fail", p.Callbacks("once memory"), "rejected"], ["notify", "progress", p.Callbacks("memory")]], c = "pending", d = { state: function () { return c }, always: function () { return e.done(arguments).fail(arguments), this }, then: function () { var a = arguments; return p.Deferred(function (c) { p.each(b, function (b, d) { var f = d[0], g = a[b]; e[d[1]](p.isFunction(g) ? function () { var a = g.apply(this, arguments); a && p.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a]) } : c[f]) }), a = null }).promise() }, promise: function (a) { return typeof a == "object" ? p.extend(a, d) : d } }, e = {}; return d.pipe = d.then, p.each(b, function (a, f) { var g = f[2], h = f[3]; d[f[1]] = g.add, h && g.add(function () { c = h }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith }), d.promise(e), a && a.call(e, e), e }, when: function (a) { var b = 0, c = k.call(arguments), d = c.length, e = d !== 1 || a && p.isFunction(a.promise) ? d : 0, f = e === 1 ? a : p.Deferred(), g = function (a, b, c) { return function (d) { b[a] = this, c[a] = arguments.length > 1 ? k.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c) } }, h, i, j; if (d > 1) { h = new Array(d), i = new Array(d), j = new Array(d); for (; b < d; b++) c[b] && p.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e } return e || f.resolveWith(j, c), f.promise() } }), p.support = function () { var b, c, d, f, g, h, i, j, k, l, m, n = e.createElement("div"); n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = n.getElementsByTagName("*"), d = n.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5"; if (!c || !c.length || !d) return {}; f = e.createElement("select"), g = f.appendChild(e.createElement("option")), h = n.getElementsByTagName("input")[0], b = { leadingWhitespace: n.firstChild.nodeType === 3, tbody: !n.getElementsByTagName("tbody").length, htmlSerialize: !!n.getElementsByTagName("link").length, style: /top/.test(d.getAttribute("style")), hrefNormalized: d.getAttribute("href") === "/a", opacity: /^0.5/.test(d.style.opacity), cssFloat: !!d.style.cssFloat, checkOn: h.value === "on", optSelected: g.selected, getSetAttribute: n.className !== "t", enctype: !!e.createElement("form").enctype, html5Clone: e.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel: e.compatMode === "CSS1Compat", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, h.checked = !0, b.noCloneChecked = h.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !g.disabled; try { delete n.test } catch (o) { b.deleteExpando = !1 } !n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", m = function () { b.noCloneEvent = !1 }), n.cloneNode(!0).fireEvent("onclick"), n.detachEvent("onclick", m)), h = e.createElement("input"), h.value = "t", h.setAttribute("type", "radio"), b.radioValue = h.value === "t", h.setAttribute("checked", "checked"), h.setAttribute("name", "t"), n.appendChild(h), i = e.createDocumentFragment(), i.appendChild(n.lastChild), b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = h.checked, i.removeChild(h), i.appendChild(n); if (n.attachEvent) for (k in { submit: !0, change: !0, focusin: !0 }) j = "on" + k, l = j in n, l || (n.setAttribute(j, "return;"), l = typeof n[j] == "function"), b[k + "Bubbles"] = l; return p(function () { var c, d, f, g, h = "padding:0;margin:0;border:0;display:block;overflow:hidden;", i = e.getElementsByTagName("body")[0]; if (!i) return; c = e.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", i.insertBefore(c, i.firstChild), d = e.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", f = d.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = f[0].offsetHeight === 0, f[0].style.display = "", f[1].style.display = "none", b.reliableHiddenOffsets = l && f[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = d.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = i.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || { width: "4px" }).width === "4px", g = e.createElement("div"), g.style.cssText = d.style.cssText = h, g.style.marginRight = g.style.width = "0", d.style.width = "1px", d.appendChild(g), b.reliableMarginRight = !parseFloat((a.getComputedStyle(g, null) || {}).marginRight)), typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = h + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1), i.removeChild(c), c = d = f = g = null }), i.removeChild(n), c = d = f = g = h = i = n = null, b }(); var H = /^(?:\{.*\}|\[.*\])$/, I = /([A-Z])/g; p.extend({ cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (p.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function (a) { return a = a.nodeType ? p.cache[a[p.expando]] : a[p.expando], !!a && !K(a) }, data: function (a, c, d, e) { if (!p.acceptData(a)) return; var f, g, h = p.expando, i = typeof c == "string", j = a.nodeType, k = j ? p.cache : a, l = j ? a[h] : a[h] && h; if ((!l || !k[l] || !e && !k[l].data) && i && d === b) return; l || (j ? a[h] = l = p.deletedIds.pop() || ++p.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = p.noop)); if (typeof c == "object" || typeof c == "function") e ? k[l] = p.extend(k[l], c) : k[l].data = p.extend(k[l].data, c); return f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[p.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[p.camelCase(c)])) : g = f, g }, removeData: function (a, b, c) { if (!p.acceptData(a)) return; var d, e, f, g = a.nodeType, h = g ? p.cache : a, i = g ? a[p.expando] : p.expando; if (!h[i]) return; if (b) { d = c ? h[i] : h[i].data; if (d) { p.isArray(b) || (b in d ? b = [b] : (b = p.camelCase(b), b in d ? b = [b] : b = b.split(" "))); for (e = 0, f = b.length; e < f; e++) delete d[b[e]]; if (!(c ? K : p.isEmptyObject)(d)) return } } if (!c) { delete h[i].data; if (!K(h[i])) return } g ? p.cleanData([a], !0) : p.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null }, _data: function (a, b, c) { return p.data(a, b, c, !0) }, acceptData: function (a) { var b = a.nodeName && p.noData[a.nodeName.toLowerCase()]; return !b || b !== !0 && a.getAttribute("classid") === b } }), p.fn.extend({ data: function (a, c) { var d, e, f, g, h, i = this[0], j = 0, k = null; if (a === b) { if (this.length) { k = p.data(i); if (i.nodeType === 1 && !p._data(i, "parsedAttrs")) { f = i.attributes; for (h = f.length; j < h; j++) g = f[j].name, g.indexOf("data-") === 0 && (g = p.camelCase(g.substring(5)), J(i, g, k[g])); p._data(i, "parsedAttrs", !0) } } return k } return typeof a == "object" ? this.each(function () { p.data(this, a) }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", p.access(this, function (c) { if (c === b) return k = this.triggerHandler("getData" + e, [d[0]]), k === b && i && (k = p.data(i, a), k = J(i, a, k)), k === b && d[1] ? this.data(d[0]) : k; d[1] = c, this.each(function () { var b = p(this); b.triggerHandler("setData" + e, d), p.data(this, a, c), b.triggerHandler("changeData" + e, d) }) }, null, c, arguments.length > 1, null, !1)) }, removeData: function (a) { return this.each(function () { p.removeData(this, a) }) } }), p.extend({ queue: function (a, b, c) { var d; if (a) return b = (b || "fx") + "queue", d = p._data(a, b), c && (!d || p.isArray(c) ? d = p._data(a, b, p.makeArray(c)) : d.push(c)), d || [] }, dequeue: function (a, b) { b = b || "fx"; var c = p.queue(a, b), d = c.shift(), e = p._queueHooks(a, b), f = function () { p.dequeue(a, b) }; d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire() }, _queueHooks: function (a, b) { var c = b + "queueHooks"; return p._data(a, c) || p._data(a, c, { empty: p.Callbacks("once memory").add(function () { p.removeData(a, b + "queue", !0), p.removeData(a, c, !0) }) }) } }), p.fn.extend({ queue: function (a, c) { var d = 2; return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? p.queue(this[0], a) : c === b ? this : this.each(function () { var b = p.queue(this, a, c); p._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && p.dequeue(this, a) }) }, dequeue: function (a) { return this.each(function () { p.dequeue(this, a) }) }, delay: function (a, b) { return a = p.fx ? p.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) { var d = setTimeout(b, a); c.stop = function () { clearTimeout(d) } }) }, clearQueue: function (a) { return this.queue(a || "fx", []) }, promise: function (a, c) { var d, e = 1, f = p.Deferred(), g = this, h = this.length, i = function () { --e || f.resolveWith(g, [g]) }; typeof a != "string" && (c = a, a = b), a = a || "fx"; while (h--) (d = p._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(i)); return i(), f.promise(c) } }); var L, M, N, O = /[\t\r\n]/g, P = /\r/g, Q = /^(?:button|input)$/i, R = /^(?:button|input|object|select|textarea)$/i, S = /^a(?:rea|)$/i, T = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, U = p.support.getSetAttribute; p.fn.extend({ attr: function (a, b) { return p.access(this, p.attr, a, b, arguments.length > 1) }, removeAttr: function (a) { return this.each(function () { p.removeAttr(this, a) }) }, prop: function (a, b) { return p.access(this, p.prop, a, b, arguments.length > 1) }, removeProp: function (a) { return a = p.propFix[a] || a, this.each(function () { try { this[a] = b, delete this[a] } catch (c) { } }) }, addClass: function (a) { var b, c, d, e, f, g, h; if (p.isFunction(a)) return this.each(function (b) { p(this).addClass(a.call(this, b, this.className)) }); if (a && typeof a == "string") { b = a.split(s); for (c = 0, d = this.length; c < d; c++) { e = this[c]; if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else { f = " " + e.className + " "; for (g = 0, h = b.length; g < h; g++) ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " "); e.className = p.trim(f) } } } return this }, removeClass: function (a) { var c, d, e, f, g, h, i; if (p.isFunction(a)) return this.each(function (b) { p(this).removeClass(a.call(this, b, this.className)) }); if (a && typeof a == "string" || a === b) { c = (a || "").split(s); for (h = 0, i = this.length; h < i; h++) { e = this[h]; if (e.nodeType === 1 && e.className) { d = (" " + e.className + " ").replace(O, " "); for (f = 0, g = c.length; f < g; f++) while (d.indexOf(" " + c[f] + " ") > -1) d = d.replace(" " + c[f] + " ", " "); e.className = a ? p.trim(d) : "" } } } return this }, toggleClass: function (a, b) { var c = typeof a, d = typeof b == "boolean"; return p.isFunction(a) ? this.each(function (c) { p(this).toggleClass(a.call(this, c, this.className, b), b) }) : this.each(function () { if (c === "string") { var e, f = 0, g = p(this), h = b, i = a.split(s); while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e) } else if (c === "undefined" || c === "boolean") this.className && p._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : p._data(this, "__className__") || "" }) }, hasClass: function (a) { var b = " " + a + " ", c = 0, d = this.length; for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) > -1) return !0; return !1 }, val: function (a) { var c, d, e, f = this[0]; if (!arguments.length) { if (f) return c = p.valHooks[f.type] || p.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(P, "") : d == null ? "" : d); return } return e = p.isFunction(a), this.each(function (d) { var f, g = p(this); if (this.nodeType !== 1) return; e ? f = a.call(this, d, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : p.isArray(f) && (f = p.map(f, function (a) { return a == null ? "" : a + "" })), c = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()]; if (!c || !("set" in c) || c.set(this, f, "value") === b) this.value = f }) } }), p.extend({ valHooks: { option: { get: function (a) { var b = a.attributes.value; return !b || b.specified ? a.value : a.text } }, select: { get: function (a) { var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = a.type === "select-one"; if (f < 0) return null; c = i ? f : 0, d = i ? f + 1 : h.length; for (; c < d; c++) { e = h[c]; if (e.selected && (p.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !p.nodeName(e.parentNode, "optgroup"))) { b = p(e).val(); if (i) return b; g.push(b) } } return i && !g.length && h.length ? p(h[f]).val() : g }, set: function (a, b) { var c = p.makeArray(b); return p(a).find("option").each(function () { this.selected = p.inArray(p(this).val(), c) >= 0 }), c.length || (a.selectedIndex = -1), c } } }, attrFn: {}, attr: function (a, c, d, e) { var f, g, h, i = a.nodeType; if (!a || i === 3 || i === 8 || i === 2) return; if (e && p.isFunction(p.fn[c])) return p(a)[c](d); if (typeof a.getAttribute == "undefined") return p.prop(a, c, d); h = i !== 1 || !p.isXMLDoc(a), h && (c = c.toLowerCase(), g = p.attrHooks[c] || (T.test(c) ? M : L)); if (d !== b) { if (d === null) { p.removeAttr(a, c); return } return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d) } return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f) }, removeAttr: function (a, b) { var c, d, e, f, g = 0; if (b && a.nodeType === 1) { d = b.split(s); for (; g < d.length; g++) e = d[g], e && (c = p.propFix[e] || e, f = T.test(e), f || p.attr(a, e, ""), a.removeAttribute(U ? e : c), f && c in a && (a[c] = !1)) } }, attrHooks: { type: { set: function (a, b) { if (Q.test(a.nodeName) && a.parentNode) p.error("type property can't be changed"); else if (!p.support.radioValue && b === "radio" && p.nodeName(a, "input")) { var c = a.value; return a.setAttribute("type", b), c && (a.value = c), b } } }, value: { get: function (a, b) { return L && p.nodeName(a, "button") ? L.get(a, b) : b in a ? a.value : null }, set: function (a, b, c) { if (L && p.nodeName(a, "button")) return L.set(a, b, c); a.value = b } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function (a, c, d) { var e, f, g, h = a.nodeType; if (!a || h === 3 || h === 8 || h === 2) return; return g = h !== 1 || !p.isXMLDoc(a), g && (c = p.propFix[c] || c, f = p.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c] }, propHooks: { tabIndex: { get: function (a) { var c = a.getAttributeNode("tabindex"); return c && c.specified ? parseInt(c.value, 10) : R.test(a.nodeName) || S.test(a.nodeName) && a.href ? 0 : b } } } }), M = { get: function (a, c) { var d, e = p.prop(a, c); return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b }, set: function (a, b, c) { var d; return b === !1 ? p.removeAttr(a, c) : (d = p.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c } }, U || (N = { name: !0, id: !0, coords: !0 }, L = p.valHooks.button = { get: function (a, c) { var d; return d = a.getAttributeNode(c), d && (N[c] ? d.value !== "" : d.specified) ? d.value : b }, set: function (a, b, c) { var d = a.getAttributeNode(c); return d || (d = e.createAttribute(c), a.setAttributeNode(d)), d.value = b + "" } }, p.each(["width", "height"], function (a, b) { p.attrHooks[b] = p.extend(p.attrHooks[b], { set: function (a, c) { if (c === "") return a.setAttribute(b, "auto"), c } }) }), p.attrHooks.contenteditable = { get: L.get, set: function (a, b, c) { b === "" && (b = "false"), L.set(a, b, c) } }), p.support.hrefNormalized || p.each(["href", "src", "width", "height"], function (a, c) { p.attrHooks[c] = p.extend(p.attrHooks[c], { get: function (a) { var d = a.getAttribute(c, 2); return d === null ? b : d } }) }), p.support.style || (p.attrHooks.style = { get: function (a) { return a.style.cssText.toLowerCase() || b }, set: function (a, b) { return a.style.cssText = "" + b } }), p.support.optSelected || (p.propHooks.selected = p.extend(p.propHooks.selected, { get: function (a) { var b = a.parentNode; return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null } })), p.support.enctype || (p.propFix.enctype = "encoding"), p.support.checkOn || p.each(["radio", "checkbox"], function () { p.valHooks[this] = { get: function (a) { return a.getAttribute("value") === null ? "on" : a.value } } }), p.each(["radio", "checkbox"], function () { p.valHooks[this] = p.extend(p.valHooks[this], { set: function (a, b) { if (p.isArray(b)) return a.checked = p.inArray(p(a).val(), b) >= 0 } }) }); var V = /^(?:textarea|input|select)$/i, W = /^([^\.]*|)(?:\.(.+)|)$/, X = /(?:^|\s)hover(\.\S+|)\b/, Y = /^key/, Z = /^(?:mouse|contextmenu)|click/, $ = /^(?:focusinfocus|focusoutblur)$/, _ = function (a) { return p.event.special.hover ? a : a.replace(X, "mouseenter$1 mouseleave$1") }; p.event = { add: function (a, c, d, e, f) { var g, h, i, j, k, l, m, n, o, q, r; if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = p._data(a))) return; d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = p.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) { return typeof p != "undefined" && (!a || p.event.triggered !== a.type) ? p.event.dispatch.apply(h.elem, arguments) : b }, h.elem = a), c = p.trim(_(c)).split(" "); for (j = 0; j < c.length; j++) { k = W.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), r = p.event.special[l] || {}, l = (f ? r.delegateType : r.bindType) || l, r = p.event.special[l] || {}, n = p.extend({ type: l, origType: k[1], data: e, handler: d, guid: d.guid, selector: f, namespace: m.join(".") }, o), q = i[l]; if (!q) { q = i[l] = [], q.delegateCount = 0; if (!r.setup || r.setup.call(a, e, m, h) === !1) a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h) } r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? q.splice(q.delegateCount++, 0, n) : q.push(n), p.event.global[l] = !0 } a = null }, global: {}, remove: function (a, b, c, d, e) { var f, g, h, i, j, k, l, m, n, o, q, r = p.hasData(a) && p._data(a); if (!r || !(m = r.events)) return; b = p.trim(_(b || "")).split(" "); for (f = 0; f < b.length; f++) { g = W.exec(b[f]) || [], h = i = g[1], j = g[2]; if (!h) { for (h in m) p.event.remove(a, h + b[f], c, d, !0); continue } n = p.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null; for (l = 0; l < o.length; l++) q = o[l], (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || d === "**" && q.selector) && (o.splice(l--, 1), q.selector && o.delegateCount--, n.remove && n.remove.call(a, q)); o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, r.handle) === !1) && p.removeEvent(a, h, r.handle), delete m[h]) } p.isEmptyObject(m) && (delete r.handle, p.removeData(a, "events", !0)) }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function (c, d, f, g) { if (!f || f.nodeType !== 3 && f.nodeType !== 8) { var h, i, j, k, l, m, n, o, q, r, s = c.type || c, t = []; if ($.test(s + p.event.triggered)) return; s.indexOf("!") >= 0 && (s = s.slice(0, -1), i = !0), s.indexOf(".") >= 0 && (t = s.split("."), s = t.shift(), t.sort()); if ((!f || p.event.customEvent[s]) && !p.event.global[s]) return; c = typeof c == "object" ? c[p.expando] ? c : new p.Event(s, c) : new p.Event(s), c.type = s, c.isTrigger = !0, c.exclusive = i, c.namespace = t.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, m = s.indexOf(":") < 0 ? "on" + s : ""; if (!f) { h = p.cache; for (j in h) h[j].events && h[j].events[s] && p.event.trigger(c, d, h[j].handle.elem, !0); return } c.result = b, c.target || (c.target = f), d = d != null ? p.makeArray(d) : [], d.unshift(c), n = p.event.special[s] || {}; if (n.trigger && n.trigger.apply(f, d) === !1) return; q = [[f, n.bindType || s]]; if (!g && !n.noBubble && !p.isWindow(f)) { r = n.delegateType || s, k = $.test(r + s) ? f : f.parentNode; for (l = f; k; k = k.parentNode) q.push([k, r]), l = k; l === (f.ownerDocument || e) && q.push([l.defaultView || l.parentWindow || a, r]) } for (j = 0; j < q.length && !c.isPropagationStopped() ; j++) k = q[j][0], c.type = q[j][1], o = (p._data(k, "events") || {})[c.type] && p._data(k, "handle"), o && o.apply(k, d), o = m && k[m], o && p.acceptData(k) && o.apply(k, d) === !1 && c.preventDefault(); return c.type = s, !g && !c.isDefaultPrevented() && (!n._default || n._default.apply(f.ownerDocument, d) === !1) && (s !== "click" || !p.nodeName(f, "a")) && p.acceptData(f) && m && f[s] && (s !== "focus" && s !== "blur" || c.target.offsetWidth !== 0) && !p.isWindow(f) && (l = f[m], l && (f[m] = null), p.event.triggered = s, f[s](), p.event.triggered = b, l && (f[m] = l)), c.result } return }, dispatch: function (c) { c = p.event.fix(c || a.event); var d, e, f, g, h, i, j, k, l, m, n, o = (p._data(this, "events") || {})[c.type] || [], q = o.delegateCount, r = [].slice.call(arguments), s = !c.exclusive && !c.namespace, t = p.event.special[c.type] || {}, u = []; r[0] = c, c.delegateTarget = this; if (t.preDispatch && t.preDispatch.call(this, c) === !1) return; if (q && (!c.button || c.type !== "click")) { g = p(this), g.context = this; for (f = c.target; f != this; f = f.parentNode || this) if (f.disabled !== !0 || c.type !== "click") { i = {}, k = [], g[0] = f; for (d = 0; d < q; d++) l = o[d], m = l.selector, i[m] === b && (i[m] = g.is(m)), i[m] && k.push(l); k.length && u.push({ elem: f, matches: k }) } } o.length > q && u.push({ elem: this, matches: o.slice(q) }); for (d = 0; d < u.length && !c.isPropagationStopped() ; d++) { j = u[d], c.currentTarget = j.elem; for (e = 0; e < j.matches.length && !c.isImmediatePropagationStopped() ; e++) { l = j.matches[e]; if (s || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) c.data = l.data, c.handleObj = l, h = ((p.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, r), h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation())) } } return t.postDispatch && t.postDispatch.call(this, c), c.result }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (a, b) { return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, c) { var d, f, g, h = c.button, i = c.fromElement; return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || e, f = d.documentElement, g = d.body, a.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a } }, fix: function (a) { if (a[p.expando]) return a; var b, c, d = a, f = p.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props; a = p.Event(d); for (b = g.length; b;) c = g[--b], a[c] = d[c]; return a.target || (a.target = d.srcElement || e), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, f.filter ? f.filter(a, d) : a }, special: { ready: { setup: p.bindReady }, load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function (a, b, c) { p.isWindow(this) && (this.onbeforeunload = c) }, teardown: function (a, b) { this.onbeforeunload === b && (this.onbeforeunload = null) } } }, simulate: function (a, b, c, d) { var e = p.extend(new p.Event, c, { type: a, isSimulated: !0, originalEvent: {} }); d ? p.event.trigger(e, null, b) : p.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault() } }, p.event.handle = p.event.dispatch, p.removeEvent = e.removeEventListener ? function (a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1) } : function (a, b, c) { var d = "on" + b; a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c)) }, p.Event = function (a, b) { if (this instanceof p.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? bb : ba) : this.type = a, b && p.extend(this, b), this.timeStamp = a && a.timeStamp || p.now(), this[p.expando] = !0; else return new p.Event(a, b) }, p.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = bb; var a = this.originalEvent; if (!a) return; a.preventDefault ? a.preventDefault() : a.returnValue = !1 }, stopPropagation: function () { this.isPropagationStopped = bb; var a = this.originalEvent; if (!a) return; a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0 }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = bb, this.stopPropagation() }, isDefaultPrevented: ba, isPropagationStopped: ba, isImmediatePropagationStopped: ba }, p.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, b) { p.event.special[a] = { delegateType: b, bindType: b, handle: function (a) { var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector; if (!e || e !== d && !p.contains(d, e)) a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b; return c } } }), p.support.submitBubbles || (p.event.special.submit = { setup: function () { if (p.nodeName(this, "form")) return !1; p.event.add(this, "click._submit keypress._submit", function (a) { var c = a.target, d = p.nodeName(c, "input") || p.nodeName(c, "button") ? c.form : b; d && !p._data(d, "_submit_attached") && (p.event.add(d, "submit._submit", function (a) { a._submit_bubble = !0 }), p._data(d, "_submit_attached", !0)) }) }, postDispatch: function (a) { a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && p.event.simulate("submit", this.parentNode, a, !0)) }, teardown: function () { if (p.nodeName(this, "form")) return !1; p.event.remove(this, "._submit") } }), p.support.changeBubbles || (p.event.special.change = { setup: function () { if (V.test(this.nodeName)) { if (this.type === "checkbox" || this.type === "radio") p.event.add(this, "propertychange._change", function (a) { a.originalEvent.propertyName === "checked" && (this._just_changed = !0) }), p.event.add(this, "click._change", function (a) { this._just_changed && !a.isTrigger && (this._just_changed = !1), p.event.simulate("change", this, a, !0) }); return !1 } p.event.add(this, "beforeactivate._change", function (a) { var b = a.target; V.test(b.nodeName) && !p._data(b, "_change_attached") && (p.event.add(b, "change._change", function (a) { this.parentNode && !a.isSimulated && !a.isTrigger && p.event.simulate("change", this.parentNode, a, !0) }), p._data(b, "_change_attached", !0)) }) }, handle: function (a) { var b = a.target; if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments) }, teardown: function () { return p.event.remove(this, "._change"), V.test(this.nodeName) } }), p.support.focusinBubbles || p.each({ focus: "focusin", blur: "focusout" }, function (a, b) { var c = 0, d = function (a) { p.event.simulate(b, a.target, p.event.fix(a), !0) }; p.event.special[b] = { setup: function () { c++ === 0 && e.addEventListener(a, d, !0) }, teardown: function () { --c === 0 && e.removeEventListener(a, d, !0) } } }), p.fn.extend({ on: function (a, c, d, e, f) { var g, h; if (typeof a == "object") { typeof c != "string" && (d = d || c, c = b); for (h in a) this.on(h, c, d, a[h], f); return this } d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b)); if (e === !1) e = ba; else if (!e) return this; return f === 1 && (g = e, e = function (a) { return p().off(a), g.apply(this, arguments) }, e.guid = g.guid || (g.guid = p.guid++)), this.each(function () { p.event.add(this, a, e, d, c) }) }, one: function (a, b, c, d) { return this.on(a, b, c, d, 1) }, off: function (a, c, d) { var e, f; if (a && a.preventDefault && a.handleObj) return e = a.handleObj, p(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this; if (typeof a == "object") { for (f in a) this.off(f, c, a[f]); return this } if (c === !1 || typeof c == "function") d = c, c = b; return d === !1 && (d = ba), this.each(function () { p.event.remove(this, a, d, c) }) }, bind: function (a, b, c) { return this.on(a, null, b, c) }, unbind: function (a, b) { return this.off(a, null, b) }, live: function (a, b, c) { return p(this.context).on(a, this.selector, b, c), this }, die: function (a, b) { return p(this.context).off(a, this.selector || "**", b), this }, delegate: function (a, b, c, d) { return this.on(b, a, c, d) }, undelegate: function (a, b, c) { return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c) }, trigger: function (a, b) { return this.each(function () { p.event.trigger(a, b, this) }) }, triggerHandler: function (a, b) { if (this[0]) return p.event.trigger(a, b, this[0], !0) }, toggle: function (a) { var b = arguments, c = a.guid || p.guid++, d = 0, e = function (c) { var e = (p._data(this, "lastToggle" + a.guid) || 0) % d; return p._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1 }; e.guid = c; while (d < b.length) b[d++].guid = c; return this.click(e) }, hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a) } }), p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) { p.fn[b] = function (a, c) { return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b) }, Y.test(b) && (p.event.fixHooks[b] = p.event.keyHooks), Z.test(b) && (p.event.fixHooks[b] = p.event.mouseHooks) }), function (a, b) { function bd(a, b, c, d) { var e = 0, f = b.length; for (; e < f; e++) Z(a, b[e], c, d) } function be(a, b, c, d, e, f) { var g, h = $.setFilters[b.toLowerCase()]; return h || Z.error(b), (a || !(g = e)) && bd(a || "*", d, g = [], e), g.length > 0 ? h(g, c, f) : [] } function bf(a, c, d, e, f) { var g, h, i, j, k, l, m, n, p = 0, q = f.length, s = L.POS, t = new RegExp("^" + s.source + "(?!" + r + ")", "i"), u = function () { var a = 1, c = arguments.length - 2; for (; a < c; a++) arguments[a] === b && (g[a] = b) }; for (; p < q; p++) { s.exec(""), a = f[p], j = [], i = 0, k = e; while (g = s.exec(a)) { n = s.lastIndex = g.index + g[0].length; if (n > i) { m = a.slice(i, g.index), i = n, l = [c], B.test(m) && (k && (l = k), k = e); if (h = H.test(m)) m = m.slice(0, -5).replace(B, "$&*"); g.length > 1 && g[0].replace(t, u), k = be(m, g[1], g[2], l, k, h) } } k ? (j = j.concat(k), (m = a.slice(i)) && m !== ")" ? B.test(m) ? bd(m, j, d, e) : Z(m, c, d, e ? e.concat(k) : k) : o.apply(d, j)) : Z(a, c, d, e) } return q === 1 ? d : Z.uniqueSort(d) } function bg(a, b, c) { var d, e, f, g = [], i = 0, j = D.exec(a), k = !j.pop() && !j.pop(), l = k && a.match(C) || [""], m = $.preFilter, n = $.filter, o = !c && b !== h; for (; (e = l[i]) != null && k; i++) { g.push(d = []), o && (e = " " + e); while (e) { k = !1; if (j = B.exec(e)) e = e.slice(j[0].length), k = d.push({ part: j.pop().replace(A, " "), captures: j }); for (f in n) (j = L[f].exec(e)) && (!m[f] || (j = m[f](j, b, c))) && (e = e.slice(j.shift().length), k = d.push({ part: f, captures: j })); if (!k) break } } return k || Z.error(a), g } function bh(a, b, e) { var f = b.dir, g = m++; return a || (a = function (a) { return a === e }), b.first ? function (b, c) { while (b = b[f]) if (b.nodeType === 1) return a(b, c) && b } : function (b, e) { var h, i = g + "." + d, j = i + "." + c; while (b = b[f]) if (b.nodeType === 1) { if ((h = b[q]) === j) return b.sizset; if (typeof h == "string" && h.indexOf(i) === 0) { if (b.sizset) return b } else { b[q] = j; if (a(b, e)) return b.sizset = !0, b; b.sizset = !1 } } } } function bi(a, b) { return a ? function (c, d) { var e = b(c, d); return e && a(e === !0 ? c : e, d) } : b } function bj(a, b, c) { var d, e, f = 0; for (; d = a[f]; f++) $.relative[d.part] ? e = bh(e, $.relative[d.part], b) : (d.captures.push(b, c), e = bi(e, $.filter[d.part].apply(null, d.captures))); return e } function bk(a) { return function (b, c) { var d, e = 0; for (; d = a[e]; e++) if (d(b, c)) return !0; return !1 } } var c, d, e, f, g, h = a.document, i = h.documentElement, j = "undefined", k = !1, l = !0, m = 0, n = [].slice, o = [].push, q = ("sizcache" + Math.random()).replace(".", ""), r = "[\\x20\\t\\r\\n\\f]", s = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", t = s.replace("w", "w#"), u = "([*^$|!~]?=)", v = "\\[" + r + "*(" + s + ")" + r + "*(?:" + u + r + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + t + ")|)|)" + r + "*\\]", w = ":(" + s + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", x = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", y = r + "*([\\x20\\t\\r\\n\\f>+~])" + r + "*", z = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + v + "|" + w.replace(2, 7) + "|[^\\\\(),])+", A = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"), B = new RegExp("^" + y), C = new RegExp(z + "?(?=" + r + "*,|$)", "g"), D = new RegExp("^(?:(?!,)(?:(?:^|,)" + r + "*" + z + ")*?|" + r + "*(.*?))(\\)|$)"), E = new RegExp(z.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + y, "g"), F = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, G = /[\x20\t\r\n\f]*[+~]/, H = /:not\($/, I = /h\d/i, J = /input|select|textarea|button/i, K = /\\(?!\\)/g, L = { ID: new RegExp("^#(" + s + ")"), CLASS: new RegExp("^\\.(" + s + ")"), NAME: new RegExp("^\\[name=['\"]?(" + s + ")['\"]?\\]"), TAG: new RegExp("^(" + s.replace("[-", "[-\\*") + ")"), ATTR: new RegExp("^" + v), PSEUDO: new RegExp("^" + w), CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"), POS: new RegExp(x, "ig"), needsContext: new RegExp("^" + r + "*[>+~]|" + x, "i") }, M = {}, N = [], O = {}, P = [], Q = function (a) { return a.sizzleFilter = !0, a }, R = function (a) { return function (b) { return b.nodeName.toLowerCase() === "input" && b.type === a } }, S = function (a) { return function (b) { var c = b.nodeName.toLowerCase(); return (c === "input" || c === "button") && b.type === a } }, T = function (a) { var b = !1, c = h.createElement("div"); try { b = a(c) } catch (d) { } return c = null, b }, U = T(function (a) { a.innerHTML = "<select></select>"; var b = typeof a.lastChild.getAttribute("multiple"); return b !== "boolean" && b !== "string" }), V = T(function (a) { a.id = q + 0, a.innerHTML = "<a name='" + q + "'></a><div name='" + q + "'></div>", i.insertBefore(a, i.firstChild); var b = h.getElementsByName && h.getElementsByName(q).length === 2 + h.getElementsByName(q + 0).length; return g = !h.getElementById(q), i.removeChild(a), b }), W = T(function (a) { return a.appendChild(h.createComment("")), a.getElementsByTagName("*").length === 0 }), X = T(function (a) { return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== j && a.firstChild.getAttribute("href") === "#" }), Y = T(function (a) { return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || a.getElementsByClassName("e").length === 0 ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length !== 1) }), Z = function (a, b, c, d) { c = c || [], b = b || h; var e, f, g, i, j = b.nodeType; if (j !== 1 && j !== 9) return []; if (!a || typeof a != "string") return c; g = ba(b); if (!g && !d) if (e = F.exec(a)) if (i = e[1]) { if (j === 9) { f = b.getElementById(i); if (!f || !f.parentNode) return c; if (f.id === i) return c.push(f), c } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(i)) && bb(b, f) && f.id === i) return c.push(f), c } else { if (e[2]) return o.apply(c, n.call(b.getElementsByTagName(a), 0)), c; if ((i = e[3]) && Y && b.getElementsByClassName) return o.apply(c, n.call(b.getElementsByClassName(i), 0)), c } return bm(a, b, c, d, g) }, $ = Z.selectors = { cacheLength: 50, match: L, order: ["ID", "TAG"], attrHandle: {}, createPseudo: Q, find: { ID: g ? function (a, b, c) { if (typeof b.getElementById !== j && !c) { var d = b.getElementById(a); return d && d.parentNode ? [d] : [] } } : function (a, c, d) { if (typeof c.getElementById !== j && !d) { var e = c.getElementById(a); return e ? e.id === a || typeof e.getAttributeNode !== j && e.getAttributeNode("id").value === a ? [e] : b : [] } }, TAG: W ? function (a, b) { if (typeof b.getElementsByTagName !== j) return b.getElementsByTagName(a) } : function (a, b) { var c = b.getElementsByTagName(a); if (a === "*") { var d, e = [], f = 0; for (; d = c[f]; f++) d.nodeType === 1 && e.push(d); return e } return c } }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function (a) { return a[1] = a[1].replace(K, ""), a[3] = (a[4] || a[5] || "").replace(K, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4) }, CHILD: function (a) { return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || Z.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && Z.error(a[0]), a }, PSEUDO: function (a) { var b, c = a[4]; return L.CHILD.test(a[0]) ? null : (c && (b = D.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a) } }, filter: { ID: g ? function (a) { return a = a.replace(K, ""), function (b) { return b.getAttribute("id") === a } } : function (a) { return a = a.replace(K, ""), function (b) { var c = typeof b.getAttributeNode !== j && b.getAttributeNode("id"); return c && c.value === a } }, TAG: function (a) { return a === "*" ? function () { return !0 } : (a = a.replace(K, "").toLowerCase(), function (b) { return b.nodeName && b.nodeName.toLowerCase() === a }) }, CLASS: function (a) { var b = M[a]; return b || (b = M[a] = new RegExp("(^|" + r + ")" + a + "(" + r + "|$)"), N.push(a), N.length > $.cacheLength && delete M[N.shift()]), function (a) { return b.test(a.className || typeof a.getAttribute !== j && a.getAttribute("class") || "") } }, ATTR: function (a, b, c) { return b ? function (d) { var e = Z.attr(d, a), f = e + ""; if (e == null) return b === "!="; switch (b) { case "=": return f === c; case "!=": return f !== c; case "^=": return c && f.indexOf(c) === 0; case "*=": return c && f.indexOf(c) > -1; case "$=": return c && f.substr(f.length - c.length) === c; case "~=": return (" " + f + " ").indexOf(c) > -1; case "|=": return f === c || f.substr(0, c.length + 1) === c + "-" } } : function (b) { return Z.attr(b, a) != null } }, CHILD: function (a, b, c, d) { if (a === "nth") { var e = m++; return function (a) { var b, f, g = 0, h = a; if (c === 1 && d === 0) return !0; b = a.parentNode; if (b && (b[q] !== e || !a.sizset)) { for (h = b.firstChild; h; h = h.nextSibling) if (h.nodeType === 1) { h.sizset = ++g; if (h === a) break } b[q] = e } return f = a.sizset - d, c === 0 ? f === 0 : f % c === 0 && f / c >= 0 } } return function (b) { var c = b; switch (a) { case "only": case "first": while (c = c.previousSibling) if (c.nodeType === 1) return !1; if (a === "first") return !0; c = b; case "last": while (c = c.nextSibling) if (c.nodeType === 1) return !1; return !0 } } }, PSEUDO: function (a, b, c, d) { var e = $.pseudos[a] || $.pseudos[a.toLowerCase()]; return e || Z.error("unsupported pseudo: " + a), e.sizzleFilter ? e(b, c, d) : e } }, pseudos: { not: Q(function (a, b, c) { var d = bl(a.replace(A, "$1"), b, c); return function (a) { return !d(a) } }), enabled: function (a) { return a.disabled === !1 }, disabled: function (a) { return a.disabled === !0 }, checked: function (a) { var b = a.nodeName.toLowerCase(); return b === "input" && !!a.checked || b === "option" && !!a.selected }, selected: function (a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0 }, parent: function (a) { return !$.pseudos.empty(a) }, empty: function (a) { var b; a = a.firstChild; while (a) { if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) return !1; a = a.nextSibling } return !0 }, contains: Q(function (a) { return function (b) { return (b.textContent || b.innerText || bc(b)).indexOf(a) > -1 } }), has: Q(function (a) { return function (b) { return Z(a, b).length > 0 } }), header: function (a) { return I.test(a.nodeName) }, text: function (a) { var b, c; return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b) }, radio: R("radio"), checkbox: R("checkbox"), file: R("file"), password: R("password"), image: R("image"), submit: S("submit"), reset: S("reset"), button: function (a) { var b = a.nodeName.toLowerCase(); return b === "input" && a.type === "button" || b === "button" }, input: function (a) { return J.test(a.nodeName) }, focus: function (a) { var b = a.ownerDocument; return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href) }, active: function (a) { return a === a.ownerDocument.activeElement } }, setFilters: { first: function (a, b, c) { return c ? a.slice(1) : [a[0]] }, last: function (a, b, c) { var d = a.pop(); return c ? a : [d] }, even: function (a, b, c) { var d = [], e = c ? 1 : 0, f = a.length; for (; e < f; e = e + 2) d.push(a[e]); return d }, odd: function (a, b, c) { var d = [], e = c ? 0 : 1, f = a.length; for (; e < f; e = e + 2) d.push(a[e]); return d }, lt: function (a, b, c) { return c ? a.slice(+b) : a.slice(0, +b) }, gt: function (a, b, c) { return c ? a.slice(0, +b + 1) : a.slice(+b + 1) }, eq: function (a, b, c) { var d = a.splice(+b, 1); return c ? a : d } } }; $.setFilters.nth = $.setFilters.eq, $.filters = $.pseudos, X || ($.attrHandle = { href: function (a) { return a.getAttribute("href", 2) }, type: function (a) { return a.getAttribute("type") } }), V && ($.order.push("NAME"), $.find.NAME = function (a, b) { if (typeof b.getElementsByName !== j) return b.getElementsByName(a) }), Y && ($.order.splice(1, 0, "CLASS"), $.find.CLASS = function (a, b, c) { if (typeof b.getElementsByClassName !== j && !c) return b.getElementsByClassName(a) }); try { n.call(i.childNodes, 0)[0].nodeType } catch (_) { n = function (a) { var b, c = []; for (; b = this[a]; a++) c.push(b); return c } } var ba = Z.isXML = function (a) { var b = a && (a.ownerDocument || a).documentElement; return b ? b.nodeName !== "HTML" : !1 }, bb = Z.contains = i.compareDocumentPosition ? function (a, b) { return !!(a.compareDocumentPosition(b) & 16) } : i.contains ? function (a, b) { var c = a.nodeType === 9 ? a.documentElement : a, d = b.parentNode; return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d)) } : function (a, b) { while (b = b.parentNode) if (b === a) return !0; return !1 }, bc = Z.getText = function (a) { var b, c = "", d = 0, e = a.nodeType; if (e) { if (e === 1 || e === 9 || e === 11) { if (typeof a.textContent == "string") return a.textContent; for (a = a.firstChild; a; a = a.nextSibling) c += bc(a) } else if (e === 3 || e === 4) return a.nodeValue } else for (; b = a[d]; d++) c += bc(b); return c }; Z.attr = function (a, b) { var c, d = ba(a); return d || (b = b.toLowerCase()), $.attrHandle[b] ? $.attrHandle[b](a) : U || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null) }, Z.error = function (a) { throw new Error("Syntax error, unrecognized expression: " + a) }, [0, 0].sort(function () { return l = 0 }), i.compareDocumentPosition ? e = function (a, b) { return a === b ? (k = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1 } : (e = function (a, b) { if (a === b) return k = !0, 0; if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex; var c, d, e = [], g = [], h = a.parentNode, i = b.parentNode, j = h; if (h === i) return f(a, b); if (!h) return -1; if (!i) return 1; while (j) e.unshift(j), j = j.parentNode; j = i; while (j) g.unshift(j), j = j.parentNode; c = e.length, d = g.length; for (var l = 0; l < c && l < d; l++) if (e[l] !== g[l]) return f(e[l], g[l]); return l === c ? f(a, g[l], -1) : f(e[l], b, 1) }, f = function (a, b, c) { if (a === b) return c; var d = a.nextSibling; while (d) { if (d === b) return -1; d = d.nextSibling } return 1 }), Z.uniqueSort = function (a) { var b, c = 1; if (e) { k = l, a.sort(e); if (k) for (; b = a[c]; c++) b === a[c - 1] && a.splice(c--, 1) } return a }; var bl = Z.compile = function (a, b, c) { var d, e, f, g = O[a]; if (g && g.context === b) return g; e = bg(a, b, c); for (f = 0; d = e[f]; f++) e[f] = bj(d, b, c); return g = O[a] = bk(e), g.context = b, g.runs = g.dirruns = 0, P.push(a), P.length > $.cacheLength && delete O[P.shift()], g }; Z.matches = function (a, b) { return Z(a, null, null, b) }, Z.matchesSelector = function (a, b) { return Z(b, null, null, [a]).length > 0 }; var bm = function (a, b, e, f, g) { a = a.replace(A, "$1"); var h, i, j, k, l, m, p, q, r, s = a.match(C), t = a.match(E), u = b.nodeType; if (L.POS.test(a)) return bf(a, b, e, f, s); if (f) h = n.call(f, 0); else if (s && s.length === 1) { if (t.length > 1 && u === 9 && !g && (s = L.ID.exec(t[0]))) { b = $.find.ID(s[1], b, g)[0]; if (!b) return e; a = a.slice(t.shift().length) } q = (s = G.exec(t[0])) && !s.index && b.parentNode || b, r = t.pop(), m = r.split(":not")[0]; for (j = 0, k = $.order.length; j < k; j++) { p = $.order[j]; if (s = L[p].exec(m)) { h = $.find[p]((s[1] || "").replace(K, ""), q, g); if (h == null) continue; m === r && (a = a.slice(0, a.length - r.length) + m.replace(L[p], ""), a || o.apply(e, n.call(h, 0))); break } } } if (a) { i = bl(a, b, g), d = i.dirruns++, h == null && (h = $.find.TAG("*", G.test(a) && b.parentNode || b)); for (j = 0; l = h[j]; j++) c = i.runs++, i(l, b) && e.push(l) } return e }; h.querySelectorAll && function () { var a, b = bm, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [":active"], g = i.matchesSelector || i.mozMatchesSelector || i.webkitMatchesSelector || i.oMatchesSelector || i.msMatchesSelector; T(function (a) { a.innerHTML = "<select><option selected></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + r + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || e.push(":checked") }), T(function (a) { a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + r + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled") }), e = e.length && new RegExp(e.join("|")), bm = function (a, d, f, g, h) { if (!g && !h && (!e || !e.test(a))) if (d.nodeType === 9) try { return o.apply(f, n.call(d.querySelectorAll(a), 0)), f } catch (i) { } else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") { var j = d.getAttribute("id"), k = j || q, l = G.test(a) && d.parentNode || d; j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k); try { return o.apply(f, n.call(l.querySelectorAll(a.replace(C, "[id='" + k + "'] $&")), 0)), f } catch (i) { } finally { j || d.removeAttribute("id") } } return b(a, d, f, g, h) }, g && (T(function (b) { a = g.call(b, "div"); try { g.call(b, "[test!='']:sizzle"), f.push($.match.PSEUDO) } catch (c) { } }), f = new RegExp(f.join("|")), Z.matchesSelector = function (b, c) { c = c.replace(d, "='$1']"); if (!ba(b) && !f.test(c) && (!e || !e.test(c))) try { var h = g.call(b, c); if (h || a || b.document && b.document.nodeType !== 11) return h } catch (i) { } return Z(c, null, null, [b]).length > 0 }) }(), Z.attr = p.attr, p.find = Z, p.expr = Z.selectors, p.expr[":"] = p.expr.pseudos, p.unique = Z.uniqueSort, p.text = Z.getText, p.isXMLDoc = Z.isXML, p.contains = Z.contains }(a); var bc = /Until$/, bd = /^(?:parents|prev(?:Until|All))/, be = /^.[^:#\[\.,]*$/, bf = p.expr.match.needsContext, bg = { children: !0, contents: !0, next: !0, prev: !0 }; p.fn.extend({ find: function (a) { var b, c, d, e, f, g, h = this; if (typeof a != "string") return p(a).filter(function () { for (b = 0, c = h.length; b < c; b++) if (p.contains(h[b], this)) return !0 }); g = this.pushStack("", "find", a); for (b = 0, c = this.length; b < c; b++) { d = g.length, p.find(a, this[b], g); if (b > 0) for (e = d; e < g.length; e++) for (f = 0; f < d; f++) if (g[f] === g[e]) { g.splice(e--, 1); break } } return g }, has: function (a) { var b, c = p(a, this), d = c.length; return this.filter(function () { for (b = 0; b < d; b++) if (p.contains(this, c[b])) return !0 }) }, not: function (a) { return this.pushStack(bj(this, a, !1), "not", a) }, filter: function (a) { return this.pushStack(bj(this, a, !0), "filter", a) }, is: function (a) { return !!a && (typeof a == "string" ? bf.test(a) ? p(a, this.context).index(this[0]) >= 0 : p.filter(a, this).length > 0 : this.filter(a).length > 0) }, closest: function (a, b) { var c, d = 0, e = this.length, f = [], g = bf.test(a) || typeof a != "string" ? p(a, b || this.context) : 0; for (; d < e; d++) { c = this[d]; while (c && c.ownerDocument && c !== b && c.nodeType !== 11) { if (g ? g.index(c) > -1 : p.find.matchesSelector(c, a)) { f.push(c); break } c = c.parentNode } } return f = f.length > 1 ? p.unique(f) : f, this.pushStack(f, "closest", a) }, index: function (a) { return a ? typeof a == "string" ? p.inArray(this[0], p(a)) : p.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1 }, add: function (a, b) { var c = typeof a == "string" ? p(a, b) : p.makeArray(a && a.nodeType ? [a] : a), d = p.merge(this.get(), c); return this.pushStack(bh(c[0]) || bh(d[0]) ? d : p.unique(d)) }, addBack: function (a) { return this.add(a == null ? this.prevObject : this.prevObject.filter(a)) } }), p.fn.andSelf = p.fn.addBack, p.each({ parent: function (a) { var b = a.parentNode; return b && b.nodeType !== 11 ? b : null }, parents: function (a) { return p.dir(a, "parentNode") }, parentsUntil: function (a, b, c) { return p.dir(a, "parentNode", c) }, next: function (a) { return bi(a, "nextSibling") }, prev: function (a) { return bi(a, "previousSibling") }, nextAll: function (a) { return p.dir(a, "nextSibling") }, prevAll: function (a) { return p.dir(a, "previousSibling") }, nextUntil: function (a, b, c) { return p.dir(a, "nextSibling", c) }, prevUntil: function (a, b, c) { return p.dir(a, "previousSibling", c) }, siblings: function (a) { return p.sibling((a.parentNode || {}).firstChild, a) }, children: function (a) { return p.sibling(a.firstChild) }, contents: function (a) { return p.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : p.merge([], a.childNodes) } }, function (a, b) { p.fn[a] = function (c, d) { var e = p.map(this, b, c); return bc.test(a) || (d = c), d && typeof d == "string" && (e = p.filter(d, e)), e = this.length > 1 && !bg[a] ? p.unique(e) : e, this.length > 1 && bd.test(a) && (e = e.reverse()), this.pushStack(e, a, k.call(arguments).join(",")) } }), p.extend({ filter: function (a, b, c) { return c && (a = ":not(" + a + ")"), b.length === 1 ? p.find.matchesSelector(b[0], a) ? [b[0]] : [] : p.find.matches(a, b) }, dir: function (a, c, d) { var e = [], f = a[c]; while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !p(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c]; return e }, sibling: function (a, b) { var c = []; for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a); return c } }); var bl = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", bm = / jQuery\d+="(?:null|\d+)"/g, bn = /^\s+/, bo = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bp = /<([\w:]+)/, bq = /<tbody/i, br = /<|&#?\w+;/, bs = /<(?:script|style|link)/i, bt = /<(?:script|object|embed|option|style)/i, bu = new RegExp("<(?:" + bl + ")[\\s/>]", "i"), bv = /^(?:checkbox|radio)$/, bw = /checked\s*(?:[^=]|=\s*.checked.)/i, bx = /\/(java|ecma)script/i, by = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, bz = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }, bA = bk(e), bB = bA.appendChild(e.createElement("div")); bz.optgroup = bz.option, bz.tbody = bz.tfoot = bz.colgroup = bz.caption = bz.thead, bz.th = bz.td, p.support.htmlSerialize || (bz._default = [1, "X<div>", "</div>"]), p.fn.extend({ text: function (a) { return p.access(this, function (a) { return a === b ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || e).createTextNode(a)) }, null, a, arguments.length) }, wrapAll: function (a) { if (p.isFunction(a)) return this.each(function (b) { p(this).wrapAll(a.call(this, b)) }); if (this[0]) { var b = p(a, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && b.insertBefore(this[0]), b.map(function () { var a = this; while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild; return a }).append(this) } return this }, wrapInner: function (a) { return p.isFunction(a) ? this.each(function (b) { p(this).wrapInner(a.call(this, b)) }) : this.each(function () { var b = p(this), c = b.contents(); c.length ? c.wrapAll(a) : b.append(a) }) }, wrap: function (a) { var b = p.isFunction(a); return this.each(function (c) { p(this).wrapAll(b ? a.call(this, c) : a) }) }, unwrap: function () { return this.parent().each(function () { p.nodeName(this, "body") || p(this).replaceWith(this.childNodes) }).end() }, append: function () { return this.domManip(arguments, !0, function (a) { (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a) }) }, prepend: function () { return this.domManip(arguments, !0, function (a) { (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild) }) }, before: function () { if (!bh(this[0])) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this) }); if (arguments.length) { var a = p.clean(arguments); return this.pushStack(p.merge(a, this), "before", this.selector) } }, after: function () { if (!bh(this[0])) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this.nextSibling) }); if (arguments.length) { var a = p.clean(arguments); return this.pushStack(p.merge(this, a), "after", this.selector) } }, remove: function (a, b) { var c, d = 0; for (; (c = this[d]) != null; d++) if (!a || p.filter(a, [c]).length) !b && c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), p.cleanData([c])), c.parentNode && c.parentNode.removeChild(c); return this }, empty: function () { var a, b = 0; for (; (a = this[b]) != null; b++) { a.nodeType === 1 && p.cleanData(a.getElementsByTagName("*")); while (a.firstChild) a.removeChild(a.firstChild) } return this }, clone: function (a, b) { return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () { return p.clone(this, a, b) }) }, html: function (a) { return p.access(this, function (a) { var c = this[0] || {}, d = 0, e = this.length; if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(bm, "") : b; if (typeof a == "string" && !bs.test(a) && (p.support.htmlSerialize || !bu.test(a)) && (p.support.leadingWhitespace || !bn.test(a)) && !bz[(bp.exec(a) || ["", ""])[1].toLowerCase()]) { a = a.replace(bo, "<$1></$2>"); try { for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), c.innerHTML = a); c = 0 } catch (f) { } } c && this.empty().append(a) }, null, a, arguments.length) }, replaceWith: function (a) { return bh(this[0]) ? this.length ? this.pushStack(p(p.isFunction(a) ? a() : a), "replaceWith", a) : this : p.isFunction(a) ? this.each(function (b) { var c = p(this), d = c.html(); c.replaceWith(a.call(this, b, d)) }) : (typeof a != "string" && (a = p(a).detach()), this.each(function () { var b = this.nextSibling, c = this.parentNode; p(this).remove(), b ? p(b).before(a) : p(c).append(a) })) }, detach: function (a) { return this.remove(a, !0) }, domManip: function (a, c, d) { a = [].concat.apply([], a); var e, f, g, h, i = 0, j = a[0], k = [], l = this.length; if (!p.support.checkClone && l > 1 && typeof j == "string" && bw.test(j)) return this.each(function () { p(this).domManip(a, c, d) }); if (p.isFunction(j)) return this.each(function (e) { var f = p(this); a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d) }); if (this[0]) { e = p.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, g.childNodes.length === 1 && (g = f); if (f) { c = c && p.nodeName(f, "tr"); for (h = e.cacheable || l - 1; i < l; i++) d.call(c && p.nodeName(this[i], "table") ? bC(this[i], "tbody") : this[i], i === h ? g : p.clone(g, !0, !0)) } g = f = null, k.length && p.each(k, function (a, b) { b.src ? p.ajax ? p.ajax({ url: b.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : p.error("no ajax") : p.globalEval((b.text || b.textContent || b.innerHTML || "").replace(by, "")), b.parentNode && b.parentNode.removeChild(b) }) } return this } }), p.buildFragment = function (a, c, d) { var f, g, h, i = a[0]; return c = c || e, c = (c[0] || c).ownerDocument || c[0] || c, typeof c.createDocumentFragment == "undefined" && (c = e), a.length === 1 && typeof i == "string" && i.length < 512 && c === e && i.charAt(0) === "<" && !bt.test(i) && (p.support.checkClone || !bw.test(i)) && (p.support.html5Clone || !bu.test(i)) && (g = !0, f = p.fragments[i], h = f !== b), f || (f = c.createDocumentFragment(), p.clean(a, c, f, d), g && (p.fragments[i] = h && f)), { fragment: f, cacheable: g } }, p.fragments = {}, p.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) { p.fn[a] = function (c) { var d, e = 0, f = [], g = p(c), h = g.length, i = this.length === 1 && this[0].parentNode; if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) return g[b](this[0]), this; for (; e < h; e++) d = (e > 0 ? this.clone(!0) : this).get(), p(g[e])[b](d), f = f.concat(d); return this.pushStack(f, a, g.selector) } }), p.extend({ clone: function (a, b, c) { var d, e, f, g; p.support.html5Clone || p.isXMLDoc(a) || !bu.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bB.innerHTML = a.outerHTML, bB.removeChild(g = bB.firstChild)); if ((!p.support.noCloneEvent || !p.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !p.isXMLDoc(a)) { bE(a, g), d = bF(a), e = bF(g); for (f = 0; d[f]; ++f) e[f] && bE(d[f], e[f]) } if (b) { bD(a, g); if (c) { d = bF(a), e = bF(g); for (f = 0; d[f]; ++f) bD(d[f], e[f]) } } return d = e = null, g }, clean: function (a, b, c, d) { var f, g, h, i, j, k, l, m, n, o, q, r, s = 0, t = []; if (!b || typeof b.createDocumentFragment == "undefined") b = e; for (g = b === e && bA; (h = a[s]) != null; s++) { typeof h == "number" && (h += ""); if (!h) continue; if (typeof h == "string") if (!br.test(h)) h = b.createTextNode(h); else { g = g || bk(b), l = l || g.appendChild(b.createElement("div")), h = h.replace(bo, "<$1></$2>"), i = (bp.exec(h) || ["", ""])[1].toLowerCase(), j = bz[i] || bz._default, k = j[0], l.innerHTML = j[1] + h + j[2]; while (k--) l = l.lastChild; if (!p.support.tbody) { m = bq.test(h), n = i === "table" && !m ? l.firstChild && l.firstChild.childNodes : j[1] === "<table>" && !m ? l.childNodes : []; for (f = n.length - 1; f >= 0; --f) p.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f]) } !p.support.leadingWhitespace && bn.test(h) && l.insertBefore(b.createTextNode(bn.exec(h)[0]), l.firstChild), h = l.childNodes, l = g.lastChild } h.nodeType ? t.push(h) : t = p.merge(t, h) } l && (g.removeChild(l), h = l = g = null); if (!p.support.appendChecked) for (s = 0; (h = t[s]) != null; s++) p.nodeName(h, "input") ? bG(h) : typeof h.getElementsByTagName != "undefined" && p.grep(h.getElementsByTagName("input"), bG); if (c) { q = function (a) { if (!a.type || bx.test(a.type)) return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a) }; for (s = 0; (h = t[s]) != null; s++) if (!p.nodeName(h, "script") || !q(h)) c.appendChild(h), typeof h.getElementsByTagName != "undefined" && (r = p.grep(p.merge([], h.getElementsByTagName("script")), q), t.splice.apply(t, [s + 1, 0].concat(r)), s += r.length) } return t }, cleanData: function (a, b) { var c, d, e, f, g = 0, h = p.expando, i = p.cache, j = p.support.deleteExpando, k = p.event.special; for (; (e = a[g]) != null; g++) if (b || p.acceptData(e)) { d = e[h], c = d && i[d]; if (c) { if (c.events) for (f in c.events) k[f] ? p.event.remove(e, f) : p.removeEvent(e, f, c.handle); i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, p.deletedIds.push(d)) } } } }), function () { var a, b; p.uaMatch = function (a) { a = a.toLowerCase(); var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || []; return { browser: b[1] || "", version: b[2] || "0" } }, a = p.uaMatch(g.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.webkit && (b.safari = !0), p.browser = b, p.sub = function () { function a(b, c) { return new a.fn.init(b, c) } p.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) { return d && d instanceof p && !(d instanceof a) && (d = a(d)), p.fn.init.call(this, c, d, b) }, a.fn.init.prototype = a.fn; var b = a(e); return a } }(); var bH, bI, bJ, bK = /alpha\([^)]*\)/i, bL = /opacity=([^)]*)/, bM = /^(top|right|bottom|left)$/, bN = /^margin/, bO = new RegExp("^(" + q + ")(.*)$", "i"), bP = new RegExp("^(" + q + ")(?!px)[a-z%]+$", "i"), bQ = new RegExp("^([-+])=(" + q + ")", "i"), bR = {}, bS = { position: "absolute", visibility: "hidden", display: "block" }, bT = { letterSpacing: 0, fontWeight: 400, lineHeight: 1 }, bU = ["Top", "Right", "Bottom", "Left"], bV = ["Webkit", "O", "Moz", "ms"], bW = p.fn.toggle; p.fn.extend({ css: function (a, c) { return p.access(this, function (a, c, d) { return d !== b ? p.style(a, c, d) : p.css(a, c) }, a, c, arguments.length > 1) }, show: function () { return bZ(this, !0) }, hide: function () { return bZ(this) }, toggle: function (a, b) { var c = typeof a == "boolean"; return p.isFunction(a) && p.isFunction(b) ? bW.apply(this, arguments) : this.each(function () { (c ? a : bY(this)) ? p(this).show() : p(this).hide() }) } }), p.extend({ cssHooks: { opacity: { get: function (a, b) { if (b) { var c = bH(a, "opacity"); return c === "" ? "1" : c } } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": p.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, c, d, e) { if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return; var f, g, h, i = p.camelCase(c), j = a.style; c = p.cssProps[i] || (p.cssProps[i] = bX(j, i)), h = p.cssHooks[c] || p.cssHooks[i]; if (d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c]; g = typeof d, g === "string" && (f = bQ.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(p.css(a, c)), g = "number"); if (d == null || g === "number" && isNaN(d)) return; g === "number" && !p.cssNumber[i] && (d += "px"); if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b) try { j[c] = d } catch (k) { } }, css: function (a, c, d, e) { var f, g, h, i = p.camelCase(c); return c = p.cssProps[i] || (p.cssProps[i] = bX(a.style, i)), h = p.cssHooks[c] || p.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = bH(a, c)), f === "normal" && c in bT && (f = bT[c]), d || e !== b ? (g = parseFloat(f), d || p.isNumeric(g) ? g || 0 : f) : f }, swap: function (a, b, c) { var d, e, f = {}; for (e in b) f[e] = a.style[e], a.style[e] = b[e]; d = c.call(a); for (e in b) a.style[e] = f[e]; return d } }), a.getComputedStyle ? bH = function (a, b) { var c, d, e, f, g = getComputedStyle(a, null), h = a.style; return g && (c = g[b], c === "" && !p.contains(a.ownerDocument.documentElement, a) && (c = p.style(a, b)), bP.test(c) && bN.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c } : e.documentElement.currentStyle && (bH = function (a, b) { var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style; return e == null && f && f[b] && (e = f[b]), bP.test(e) && !bM.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), e === "" ? "auto" : e }), p.each(["height", "width"], function (a, b) { p.cssHooks[b] = { get: function (a, c, d) { if (c) return a.offsetWidth !== 0 || bH(a, "display") !== "none" ? ca(a, b, d) : p.swap(a, bS, function () { return ca(a, b, d) }) }, set: function (a, c, d) { return b$(a, c, d ? b_(a, b, d, p.support.boxSizing && p.css(a, "boxSizing") === "border-box") : 0) } } }), p.support.opacity || (p.cssHooks.opacity = { get: function (a, b) { return bL.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "" }, set: function (a, b) { var c = a.style, d = a.currentStyle, e = p.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = d && d.filter || c.filter || ""; c.zoom = 1; if (b >= 1 && p.trim(f.replace(bK, "")) === "" && c.removeAttribute) { c.removeAttribute("filter"); if (d && !d.filter) return } c.filter = bK.test(f) ? f.replace(bK, e) : f + " " + e } }), p(function () { p.support.reliableMarginRight || (p.cssHooks.marginRight = { get: function (a, b) { return p.swap(a, { display: "inline-block" }, function () { if (b) return bH(a, "marginRight") }) } }), !p.support.pixelPosition && p.fn.position && p.each(["top", "left"], function (a, b) { p.cssHooks[b] = { get: function (a, c) { if (c) { var d = bH(a, b); return bP.test(d) ? p(a).position()[b] + "px" : d } } } }) }), p.expr && p.expr.filters && (p.expr.filters.hidden = function (a) { return a.offsetWidth === 0 && a.offsetHeight === 0 || !p.support.reliableHiddenOffsets && (a.style && a.style.display || bH(a, "display")) === "none" }, p.expr.filters.visible = function (a) { return !p.expr.filters.hidden(a) }), p.each({ margin: "", padding: "", border: "Width" }, function (a, b) { p.cssHooks[a + b] = { expand: function (c) { var d, e = typeof c == "string" ? c.split(" ") : [c], f = {}; for (d = 0; d < 4; d++) f[a + bU[d] + b] = e[d] || e[d - 2] || e[0]; return f } }, bN.test(a) || (p.cssHooks[a + b].set = b$) }); var cc = /%20/g, cd = /\[\]$/, ce = /\r?\n/g, cf = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, cg = /^(?:select|textarea)/i; p.fn.extend({ serialize: function () { return p.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { return this.elements ? p.makeArray(this.elements) : this }).filter(function () { return this.name && !this.disabled && (this.checked || cg.test(this.nodeName) || cf.test(this.type)) }).map(function (a, b) { var c = p(this).val(); return c == null ? null : p.isArray(c) ? p.map(c, function (a, c) { return { name: b.name, value: a.replace(ce, "\r\n") } }) : { name: b.name, value: c.replace(ce, "\r\n") } }).get() } }), p.param = function (a, c) { var d, e = [], f = function (a, b) { b = p.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b) }; c === b && (c = p.ajaxSettings && p.ajaxSettings.traditional); if (p.isArray(a) || a.jquery && !p.isPlainObject(a)) p.each(a, function () { f(this.name, this.value) }); else for (d in a) ch(d, a[d], c, f); return e.join("&").replace(cc, "+") }; var ci, cj, ck = /#.*$/, cl = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, cm = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, cn = /^(?:GET|HEAD)$/, co = /^\/\//, cp = /\?/, cq = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, cr = /([?&])_=[^&]*/, cs = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, ct = p.fn.load, cu = {}, cv = {}, cw = ["*/"] + ["*"]; try { ci = f.href } catch (cx) { ci = e.createElement("a"), ci.href = "", ci = ci.href } cj = cs.exec(ci.toLowerCase()) || [], p.fn.load = function (a, c, d) { if (typeof a != "string" && ct) return ct.apply(this, arguments); if (!this.length) return this; var e, f, g, h = this, i = a.indexOf(" "); return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), p.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (f = "POST"), p.ajax({ url: a, type: f, dataType: "html", data: c, complete: function (a, b) { d && h.each(d, g || [a.responseText, b, a]) } }).done(function (a) { g = arguments, h.html(e ? p("<div>").append(a.replace(cq, "")).find(e) : a) }), this }, p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) { p.fn[b] = function (a) { return this.on(b, a) } }), p.each(["get", "post"], function (a, c) { p[c] = function (a, d, e, f) { return p.isFunction(d) && (f = f || e, e = d, d = b), p.ajax({ type: c, url: a, data: d, success: e, dataType: f }) } }), p.extend({ getScript: function (a, c) { return p.get(a, b, c, "script") }, getJSON: function (a, b, c) { return p.get(a, b, c, "json") }, ajaxSetup: function (a, b) { return b ? cA(a, p.ajaxSettings) : (b = a, a = p.ajaxSettings), cA(a, b), a }, ajaxSettings: { url: ci, isLocal: cm.test(cj[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": cw }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": a.String, "text html": !0, "text json": p.parseJSON, "text xml": p.parseXML }, flatOptions: { context: !0, url: !0 } }, ajaxPrefilter: cy(cu), ajaxTransport: cy(cv), ajax: function (a, c) { function y(a, c, f, i) { var k, s, t, u, w, y = c; if (v === 2) return; v = 2, h && clearTimeout(h), g = b, e = i || "", x.readyState = a > 0 ? 4 : 0, f && (u = cB(l, x, f)); if (a >= 200 && a < 300 || a === 304) l.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (p.lastModified[d] = w), w = x.getResponseHeader("Etag"), w && (p.etag[d] = w)), a === 304 ? (y = "notmodified", k = !0) : (k = cC(l, u), y = k.state, s = k.data, t = k.error, k = !t); else { t = y; if (!y || a) y = "error", a < 0 && (a = 0) } x.status = a, x.statusText = "" + (c || y), k ? o.resolveWith(m, [s, y, x]) : o.rejectWith(m, [x, y, t]), x.statusCode(r), r = b, j && n.trigger("ajax" + (k ? "Success" : "Error"), [x, l, k ? s : t]), q.fireWith(m, [x, y]), j && (n.trigger("ajaxComplete", [x, l]), --p.active || p.event.trigger("ajaxStop")) } typeof a == "object" && (c = a, a = b), c = c || {}; var d, e, f, g, h, i, j, k, l = p.ajaxSetup({}, c), m = l.context || l, n = m !== l && (m.nodeType || m instanceof p) ? p(m) : p.event, o = p.Deferred(), q = p.Callbacks("once memory"), r = l.statusCode || {}, t = {}, u = {}, v = 0, w = "canceled", x = { readyState: 0, setRequestHeader: function (a, b) { if (!v) { var c = a.toLowerCase(); a = u[c] = u[c] || a, t[a] = b } return this }, getAllResponseHeaders: function () { return v === 2 ? e : null }, getResponseHeader: function (a) { var c; if (v === 2) { if (!f) { f = {}; while (c = cl.exec(e)) f[c[1].toLowerCase()] = c[2] } c = f[a.toLowerCase()] } return c === b ? null : c }, overrideMimeType: function (a) { return v || (l.mimeType = a), this }, abort: function (a) { return a = a || w, g && g.abort(a), y(0, a), this } }; o.promise(x), x.success = x.done, x.error = x.fail, x.complete = q.add, x.statusCode = function (a) { if (a) { var b; if (v < 2) for (b in a) r[b] = [r[b], a[b]]; else b = a[x.status], x.always(b) } return this }, l.url = ((a || l.url) + "").replace(ck, "").replace(co, cj[1] + "//"), l.dataTypes = p.trim(l.dataType || "*").toLowerCase().split(s), l.crossDomain == null && (i = cs.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] == cj[1] && i[2] == cj[2] && (i[3] || (i[1] === "http:" ? 80 : 443)) == (cj[3] || (cj[1] === "http:" ? 80 : 443)))), l.data && l.processData && typeof l.data != "string" && (l.data = p.param(l.data, l.traditional)), cz(cu, l, c, x); if (v === 2) return x; j = l.global, l.type = l.type.toUpperCase(), l.hasContent = !cn.test(l.type), j && p.active++ === 0 && p.event.trigger("ajaxStart"); if (!l.hasContent) { l.data && (l.url += (cp.test(l.url) ? "&" : "?") + l.data, delete l.data), d = l.url; if (l.cache === !1) { var z = p.now(), A = l.url.replace(cr, "$1_=" + z); l.url = A + (A === l.url ? (cp.test(l.url) ? "&" : "?") + "_=" + z : "") } } (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", l.contentType), l.ifModified && (d = d || l.url, p.lastModified[d] && x.setRequestHeader("If-Modified-Since", p.lastModified[d]), p.etag[d] && x.setRequestHeader("If-None-Match", p.etag[d])), x.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + cw + "; q=0.01" : "") : l.accepts["*"]); for (k in l.headers) x.setRequestHeader(k, l.headers[k]); if (!l.beforeSend || l.beforeSend.call(m, x, l) !== !1 && v !== 2) { w = "abort"; for (k in { success: 1, error: 1, complete: 1 }) x[k](l[k]); g = cz(cv, l, c, x); if (!g) y(-1, "No Transport"); else { x.readyState = 1, j && n.trigger("ajaxSend", [x, l]), l.async && l.timeout > 0 && (h = setTimeout(function () { x.abort("timeout") }, l.timeout)); try { v = 1, g.send(t, y) } catch (B) { if (v < 2) y(-1, B); else throw B } } return x } return x.abort() }, active: 0, lastModified: {}, etag: {} }); var cD = [], cE = /\?/, cF = /(=)\?(?=&|$)|\?\?/, cG = p.now(); p.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var a = cD.pop() || p.expando + "_" + cG++; return this[a] = !0, a } }), p.ajaxPrefilter("json jsonp", function (c, d, e) { var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && cF.test(j), m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cF.test(i); if (c.dataTypes[0] === "jsonp" || l || m) return f = c.jsonpCallback = p.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(cF, "$1" + f) : m ? c.data = i.replace(cF, "$1" + f) : k && (c.url += (cE.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () { return h || p.error(f + " was not called"), h[0] }, c.dataTypes[0] = "json", a[f] = function () { h = arguments }, e.always(function () { a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, cD.push(f)), h && p.isFunction(g) && g(h[0]), h = g = b }), "script" }), p.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function (a) { return p.globalEval(a), a } } }), p.ajaxPrefilter("script", function (a) { a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1) }), p.ajaxTransport("script", function (a) { if (a.crossDomain) { var c, d = e.head || e.getElementsByTagName("head")[0] || e.documentElement; return { send: function (f, g) { c = e.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) { if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || g(200, "success") }, d.insertBefore(c, d.firstChild) }, abort: function () { c && c.onload(0, 1) } } } }); var cH, cI = a.ActiveXObject ? function () { for (var a in cH) cH[a](0, 1) } : !1, cJ = 0; p.ajaxSettings.xhr = a.ActiveXObject ? function () { return !this.isLocal && cK() || cL() } : cK, function (a) { p.extend(p.support, { ajax: !!a, cors: !!a && "withCredentials" in a }) }(p.ajaxSettings.xhr()), p.support.ajax && p.ajaxTransport(function (c) { if (!c.crossDomain || p.support.cors) { var d; return { send: function (e, f) { var g, h, i = c.xhr(); c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async); if (c.xhrFields) for (h in c.xhrFields) i[h] = c.xhrFields[h]; c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest"); try { for (h in e) i.setRequestHeader(h, e[h]) } catch (j) { } i.send(c.hasContent && c.data || null), d = function (a, e) { var h, j, k, l, m; try { if (d && (e || i.readyState === 4)) { d = b, g && (i.onreadystatechange = p.noop, cI && delete cH[g]); if (e) i.readyState !== 4 && i.abort(); else { h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m); try { l.text = i.responseText } catch (a) { } try { j = i.statusText } catch (n) { j = "" } !h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204) } } } catch (o) { e || f(-1, o) } l && f(h, j, l, k) }, c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++cJ, cI && (cH || (cH = {}, p(a).unload(cI)), cH[g] = d), i.onreadystatechange = d) : d() }, abort: function () { d && d(0, 1) } } } }); var cM, cN, cO = /^(?:toggle|show|hide)$/, cP = new RegExp("^(?:([-+])=|)(" + q + ")([a-z%]*)$", "i"), cQ = /queueHooks$/, cR = [cX], cS = { "*": [function (a, b) { var c, d, e, f = this.createTween(a, b), g = cP.exec(b), h = f.cur(), i = +h || 0, j = 1; if (g) { c = +g[2], d = g[3] || (p.cssNumber[a] ? "" : "px"); if (d !== "px" && i) { i = p.css(f.elem, a, !0) || c || 1; do e = j = j || ".5", i = i / j, p.style(f.elem, a, i + d), j = f.cur() / h; while (j !== 1 && j !== e) } f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c } return f }] }; p.Animation = p.extend(cV, { tweener: function (a, b) { p.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" "); var c, d = 0, e = a.length; for (; d < e; d++) c = a[d], cS[c] = cS[c] || [], cS[c].unshift(b) }, prefilter: function (a, b) { b ? cR.unshift(a) : cR.push(a) } }), p.Tween = cY, cY.prototype = { constructor: cY, init: function (a, b, c, d, e, f) { this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (p.cssNumber[c] ? "" : "px") }, cur: function () { var a = cY.propHooks[this.prop]; return a && a.get ? a.get(this) : cY.propHooks._default.get(this) }, run: function (a) { var b, c = cY.propHooks[this.prop]; return this.pos = b = p.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : cY.propHooks._default.set(this), this } }, cY.prototype.init.prototype = cY.prototype, cY.propHooks = { _default: { get: function (a) { var b; return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = p.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop] }, set: function (a) { p.fx.step[a.prop] ? p.fx.step[a.prop](a) : a.elem.style && (a.elem.style[p.cssProps[a.prop]] != null || p.cssHooks[a.prop]) ? p.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now } } }, cY.propHooks.scrollTop = cY.propHooks.scrollLeft = { set: function (a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now) } }, p.each(["toggle", "show", "hide"], function (a, b) { var c = p.fn[b]; p.fn[b] = function (d, e, f) { return d == null || typeof d == "boolean" || !a && p.isFunction(d) && p.isFunction(e) ? c.apply(this, arguments) : this.animate(cZ(b, !0), d, e, f) } }), p.fn.extend({ fadeTo: function (a, b, c, d) { return this.filter(bY).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) }, animate: function (a, b, c, d) { var e = p.isEmptyObject(a), f = p.speed(b, c, d), g = function () { var b = cV(this, p.extend({}, a), f); e && b.stop(!0) }; return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g) }, stop: function (a, c, d) { var e = function (a) { var b = a.stop; delete a.stop, b(d) }; return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () { var b = !0, c = a != null && a + "queueHooks", f = p.timers, g = p._data(this); if (c) g[c] && g[c].stop && e(g[c]); else for (c in g) g[c] && g[c].stop && cQ.test(c) && e(g[c]); for (c = f.length; c--;) f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1)); (b || !d) && p.dequeue(this, a) }) } }), p.each({ slideDown: cZ("show"), slideUp: cZ("hide"), slideToggle: cZ("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) { p.fn[a] = function (a, c, d) { return this.animate(b, a, c, d) } }), p.speed = function (a, b, c) { var d = a && typeof a == "object" ? p.extend({}, a) : { complete: c || !c && b || p.isFunction(a) && a, duration: a, easing: c && b || b && !p.isFunction(b) && b }; d.duration = p.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in p.fx.speeds ? p.fx.speeds[d.duration] : p.fx.speeds._default; if (d.queue == null || d.queue === !0) d.queue = "fx"; return d.old = d.complete, d.complete = function () { p.isFunction(d.old) && d.old.call(this), d.queue && p.dequeue(this, d.queue) }, d }, p.easing = { linear: function (a) { return a }, swing: function (a) { return .5 - Math.cos(a * Math.PI) / 2 } }, p.timers = [], p.fx = cY.prototype.init, p.fx.tick = function () { var a, b = p.timers, c = 0; for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1); b.length || p.fx.stop() }, p.fx.timer = function (a) { a() && p.timers.push(a) && !cN && (cN = setInterval(p.fx.tick, p.fx.interval)) }, p.fx.interval = 13, p.fx.stop = function () { clearInterval(cN), cN = null }, p.fx.speeds = { slow: 600, fast: 200, _default: 400 }, p.fx.step = {}, p.expr && p.expr.filters && (p.expr.filters.animated = function (a) { return p.grep(p.timers, function (b) { return a === b.elem }).length }); var c$ = /^(?:body|html)$/i; p.fn.offset = function (a) { if (arguments.length) return a === b ? this : this.each(function (b) { p.offset.setOffset(this, a, b) }); var c, d, e, f, g, h, i, j, k, l, m = this[0], n = m && m.ownerDocument; if (!n) return; return (e = n.body) === m ? p.offset.bodyOffset(m) : (d = n.documentElement, p.contains(d, m) ? (c = m.getBoundingClientRect(), f = c_(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, { top: k, left: l }) : { top: 0, left: 0 }) }, p.offset = { bodyOffset: function (a) { var b = a.offsetTop, c = a.offsetLeft; return p.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(p.css(a, "marginTop")) || 0, c += parseFloat(p.css(a, "marginLeft")) || 0), { top: b, left: c } }, setOffset: function (a, b, c) { var d = p.css(a, "position"); d === "static" && (a.style.position = "relative"); var e = p(a), f = e.offset(), g = p.css(a, "top"), h = p.css(a, "left"), i = (d === "absolute" || d === "fixed") && p.inArray("auto", [g, h]) > -1, j = {}, k = {}, l, m; i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), p.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j) } }, p.fn.extend({ position: function () { if (!this[0]) return; var a = this[0], b = this.offsetParent(), c = this.offset(), d = c$.test(b[0].nodeName) ? { top: 0, left: 0 } : b.offset(); return c.top -= parseFloat(p.css(a, "marginTop")) || 0, c.left -= parseFloat(p.css(a, "marginLeft")) || 0, d.top += parseFloat(p.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(p.css(b[0], "borderLeftWidth")) || 0, { top: c.top - d.top, left: c.left - d.left } }, offsetParent: function () { return this.map(function () { var a = this.offsetParent || e.body; while (a && !c$.test(a.nodeName) && p.css(a, "position") === "static") a = a.offsetParent; return a || e.body }) } }), p.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, c) { var d = /Y/.test(c); p.fn[a] = function (e) { return p.access(this, function (a, e, f) { var g = c_(a); if (f === b) return g ? c in g ? g[c] : g.document.documentElement[e] : a[e]; g ? g.scrollTo(d ? p(g).scrollLeft() : f, d ? f : p(g).scrollTop()) : a[e] = f }, a, e, arguments.length, null) } }), p.each({ Height: "height", Width: "width" }, function (a, c) { p.each({ padding: "inner" + a, content: c, "": "outer" + a }, function (d, e) { p.fn[e] = function (e, f) { var g = arguments.length && (d || typeof e != "boolean"), h = d || (e === !0 || f === !0 ? "margin" : "border"); return p.access(this, function (c, d, e) { var f; return p.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? p.css(c, d, e, h) : p.style(c, d, e, h) }, c, g ? e : b, g) } }) }), a.jQuery = a.$ = p, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () { return p }) })(window);
; vmd = jQuery;
