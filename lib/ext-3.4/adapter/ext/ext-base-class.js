
/**
*@class Ext.Base
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

    // These static properties will be copied to every newly created class with {@link Ext#define}
    Ext.apply(Base, {
        $className: 'Ext.Base',

        $isClass: true,

        /**
         * Create a new instance of this Class.
         *
         *     Ext.define('My.cool.Class', {
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
            return Ext.create.apply(Ext, [this].concat(Array.prototype.slice.call(arguments, 0)));
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

            prototype = this.prototype = Ext.Object.chain(parentPrototype);
            prototype.self = this;

            this.superclass = prototype.superclass = parentPrototype;


            //mafei
            if (parentPrototype.constructor == Object.prototype.constructor) {
                parentPrototype.constructor = parent;
            }
            if (!parent.$isClass) {
                basePrototype = Ext.Base.prototype;

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
            prototype.initConfigMap = Ext.clone(prototype.initConfigMap);
            prototype.configMap = Ext.Object.chain(prototype.configMap);
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
            Ext.classSystemMonitor && Ext.classSystemMonitor(this, 'Ext.Base#triggerExtended', arguments);
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
                configNameCache = Ext.Class.configNameCache,
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
                Ext.merge(defaultConfig, config);
            }
            else {
                Ext.mergeIf(defaultConfig, config);
            }

            prototype.configClass = Ext.Object.classify(defaultConfig);
        },

        /**
         * Add / override static properties of this class.
         *
         *     Ext.define('My.cool.Class', {
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
         * @return {Ext.Base} this
         * @static
         * @inheritable
         */
        addStatics: function (members) {
            var member, name;

            for (name in members) {
                if (members.hasOwnProperty(name)) {
                    member = members[name];
                    if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn && member !== Ext.identityFn) {
                        member.$owner = this;
                        member.$name = name;
                        //<debug>
                        member.displayName = Ext.getClassName(this) + '.' + name;
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
                        member.displayName = Ext.getClassName(this) + '.' + name;
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
         *     Ext.define('My.awesome.Cat', {
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
                enumerables = Ext.enumerables,
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

                    if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn && member !== Ext.identityFn) {
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
            if (typeof member == 'function' && !member.$isClass && member !== Ext.emptyFn && member !== Ext.identityFn) {
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
         *     Ext.define('Bank', {
         *         money: '$$$',
         *         printMoney: function() {
         *             alert('$$$$$$$');
         *         }
         *     });
         *
         *     Ext.define('Thief', {
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
         * @param {Ext.Base} fromClass The class to borrow members from
         * @param {Array/String} members The names of the members to borrow
         * @return {Ext.Base} this
         * @static
         * @inheritable
         * @private
         */
        borrow: function (fromClass, members) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(this, 'Ext.Base#borrow', arguments);
            //</debug>

            var prototype = this.prototype,
                fromPrototype = fromClass.prototype,
                //<debug>
                className = Ext.getClassName(this),
                //</debug>
                i, ln, name, fn, toBorrow;

            members = Ext.Array.from(members);

            for (i = 0, ln = members.length; i < ln; i++) {
                name = members[i];

                toBorrow = fromPrototype[name];

                if (typeof toBorrow == 'function') {
                    fn = Ext.Function.clone(toBorrow);

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
         * {@link Ext.Base#callParent}.
         *
         *     Ext.define('My.Cat', {
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
         * As of 4.1, direct use of this method is deprecated. Use {@link Ext#define Ext.define}
         * instead:
         *
         *     Ext.define('My.CatOverride', {
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
         * The above accomplishes the same result but can be managed by the {@link Ext.Loader}
         * which can properly order the override and its target class and the build process
         * can determine whether the override is needed based on the required state of the
         * target class (My.Cat).
         *
         * @param {Object} members The properties to add to this class. This should be
         * specified as an object literal containing one or more properties.
         * @return {Ext.Base} this class
         * @static
         * @inheritable
         * @markdown
         * @deprecated 4.1.0 Use {@link Ext#define Ext.define} instead
         */
        override: function (members) {
            var me = this,
                enumerables = Ext.enumerables,
                target = me.prototype,
                cloneFunction = Ext.Function.clone,
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

                        if (typeof member == 'function' && !member.$className && member !== Ext.emptyFn && member !== Ext.identityFn) {
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
                    prototype.mixins = Ext.Object.chain(prototype.mixins);
                }
                else {
                    prototype.mixins = {};
                }
            }

            for (key in mixin) {
                mixinValue = mixin[key];
                if (key === 'mixins') {
                    Ext.merge(prototype.mixins, mixinValue);
                }
                else if (key === 'xhooks') {
                    for (hookKey in mixinValue) {
                        hookFunction = mixinValue[hookKey];

                        // Mixed in xhook methods cannot call a parent.
                        hookFunction.$previous = Ext.emptyFn;

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
         *     Ext.define('My.cool.Class', {
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
            return Ext.getClassName(this);
        },

        /**
         * Create aliases for existing prototype methods. Example:
         *
         *     Ext.define('My.cool.Class', {
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
         * {@link Ext.Function#flexSetter flexSetter}
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
                xtypesMap = prototype.xtypesMap = Ext.merge({}, prototype.xtypesMap || {});
                xtypes = prototype.xtypes = prototype.xtypes ? [].concat(prototype.xtypes) : [];
                xtypesChain = prototype.xtypesChain = prototype.xtypesChain ? [].concat(prototype.xtypesChain) : [];
                prototype.xtype = xtype;
            }

            if (!xtypesMap[xtype]) {
                xtypesMap[xtype] = true;
                xtypes.push(xtype);
                xtypesChain.push(xtype);
                Ext.ClassManager.setAlias(this, 'widget.' + xtype);
            }

            return this;
        }
    });

    Base.implement({
        /** @private */
        isInstance: true,

        /** @private */
        $className: 'Ext.Base',

        /** @private */
        configClass: Ext.emptyFn,

        /** @private */
        initConfigList: [],

        /** @private */
        configMap: {},

        /** @private */
        initConfigMap: {},

        /**
         * Get the reference to the class from which this object was instantiated. Note that unlike {@link Ext.Base#self},
         * `this.statics()` is scope-independent and it always returns the class from which it was called, regardless of what
         * `this` points to during run-time
         *
         *     Ext.define('My.Cat', {
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
         *     Ext.define('My.SnowLeopard', {
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
         *     alert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'
         *     alert(clone.groupName);                 // alerts 'Cat'
         *
         *     alert(My.Cat.totalCreated);             // alerts 3
         *
         * @protected
         * @return {Ext.Class}
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
         * overridden by derivation or by an override (see {@link Ext#define}).
         *
         *      Ext.define('My.Base', {
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
         *      Ext.define('My.Derived', {
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
         *      Ext.define('My.DerivedOverride', {
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
         *      Ext.define('My.Derived2', {
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
         *      Ext.define('My.Derived2Override', {
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
                                ") found in the parent class (" + (Ext.getClassName(parentClass) || 'Object') + ")");
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
         *      Ext.define('Ext.some.Class', {
         *          method: function () {
         *              console.log('Good');
         *          }
         *      });
         * 
         *      Ext.define('Ext.some.DerivedClass', {
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
         *      Ext.define('App.paches.DerivedClass', {
         *          override: 'Ext.some.DerivedClass',
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
                                ") found in the parent class (" + (Ext.getClassName(parentClass) || 'Object') + ")");
                }
            }
            //</debug>

            return superMethod.apply(this, args || noArgs);
        },

        /**
         * @property {Ext.Class} self
         *
         * Get the reference to the current class from which this object was instantiated. Unlike {@link Ext.Base#statics},
         * `this.self` is scope-dependent and it's meant to be used for dynamic inheritance. See {@link Ext.Base#statics}
         * for a detailed comparison
         *
         *     Ext.define('My.Cat', {
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
         *     Ext.define('My.SnowLeopard', {
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
         *     alert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'
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
         *     Ext.define('My.awesome.Class', {
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
         * @return {Ext.Base} this
         */
        initConfig: function (config) {
            var instanceConfig = config,
                configNameCache = Ext.Class.configNameCache,
                defaultConfig = new this.configClass(),
                defaultConfigList = this.initConfigList,
                hasConfig = this.configMap,
                nameMap, i, ln, name, initializedName;

            this.initConfig = Ext.emptyFn;

            this.initialConfig = instanceConfig || {};

            this.config = config = (instanceConfig) ? Ext.merge(defaultConfig, config) : defaultConfig;

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

            var configNameCache = Ext.Class.configNameCache,
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
            var configNameCache = Ext.Class.configNameCache;

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

            names = Ext.Array.from(names);

            scope = scope || this;

            for (i = 0, ln = names.length; i < ln; i++) {
                name = names[i];
                updaterName = 'update' + Ext.String.capitalize(name);
                updater = this[updaterName] || Ext.emptyFn;
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
        //    this.destroy = Ext.emptyFn;
        //}
    });

    /**
     * Call the original method that was previously overridden with {@link Ext.Base#override}
     *
     *     Ext.define('My.Cat', {
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

    Ext.Base = Base;

}(Ext.Function.flexSetter));

/**
*@class Ext.Class
**/
(function () {
    var ExtClass,
        Base = Ext.Base,
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
     * @return {Ext.Base} The newly created class
     */
    Ext.Class = ExtClass = function (Class, data, onCreated) {
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

    Ext.apply(ExtClass, {
        /**
         * @private
         */
        onBeforeCreated: function (Class, data, hooks) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(Class, '>> Ext.Class#onBeforeCreated', arguments);
            //</debug>

            Class.addMembers(data);

            hooks.onCreated.call(Class, Class);

            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(Class, '<< Ext.Class#onBeforeCreated', arguments);
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

            hooks.onCreated = onCreated ? onCreated : Ext.emptyFn;
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
         * @param {Object} fn.data The set of properties passed in {@link Ext.Class} constructor
         * @param {Function} fn.fn The callback function that **must** to be executed when this
         * pre-processor finishes, regardless of whether the processing is synchronous or aynchronous.
         * @return {Ext.Class} this
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
         * @return {Ext.Class} this
         * @static
         */
        setDefaultPreprocessors: function (preprocessors) {
            this.defaultPreprocessors = Ext.Array.from(preprocessors);

            return this;
        },

        /**
         * Insert this pre-processor at a specific position in the stack, optionally relative to
         * any existing pre-processor. For example:
         *
         *     Ext.Class.registerPreprocessor('debug', function(cls, data, fn) {
         *         // Your code here
         *
         *         if (fn) {
         *             fn.call(this, cls, data);
         *         }
         *     }).setDefaultPreprocessorPosition('debug', 'last');
         *
         * @private
         * @param {String} name The pre-processor name. Note that it needs to be registered with
         * {@link Ext.Class#registerPreprocessor registerPreprocessor} before this
         * @param {String} offset The insertion position. Four possible values are:
         * 'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)
         * @param {String} relativeName
         * @return {Ext.Class} this
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

            index = Ext.Array.indexOf(defaultPreprocessors, relativeName);

            if (index !== -1) {
                Ext.Array.splice(defaultPreprocessors, Math.max(0, index + offset), 0, name);
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
     *     Ext.define('Person', {
     *         say: function(text) { alert(text); }
     *     });
     *
     *     Ext.define('Developer', {
     *         extend: 'Person',
     *         say: function(text) { this.callParent(["print "+text]); }
     *     });
     */
    ExtClass.registerPreprocessor('extend', function (Class, data, hooks) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#extendPreProcessor', arguments);
        //</debug>

        var Base = Ext.Base,
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
     *     Ext.define('Computer', {
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
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#staticsPreprocessor', arguments);
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
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#inheritableStaticsPreprocessor', arguments);
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
     * __Note:__ You need to make sure {@link Ext.Base#initConfig} is called from your constructor if you are defining
     * your own class or singleton, unless you are extending a Component. Otherwise the generated getter and setter
     * methods will not be initialized.
     *
     * Each config item will have its own setter and getter method automatically generated inside the class prototype
     * during class creation time, if the class does not have those methods explicitly defined.
     *
     * As an example, let's convert the name property of a Person class to be a config item, then add extra age and
     * gender items.
     *
     *     Ext.define('My.sample.Person', {
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
     *     Ext.define('My.sample.Person', {
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
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#configPreProcessor', arguments);
        //</debug>

        var config = data.config,
            prototype = Class.prototype;

        delete data.config;

        Ext.Object.each(config, function (name, value) {
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
     *     Ext.define('CanSing', {
     *          sing: function() {
     *              alert("I'm on the highway to hell...")
     *          }
     *     });
     *
     *     Ext.define('Musician', {
     *          mixins: ['CanSing']
     *     })
     *
     * In this case the Musician class will get a `sing` method from CanSing mixin.
     *
     * But what if the Musician already has a `sing` method? Or you want to mix
     * in two classes, both of which define `sing`?  In such a cases it's good
     * to define mixins as an object, where you assign a name to each mixin:
     *
     *     Ext.define('Musician', {
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
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#mixinsPreprocessor', arguments);
        //</debug>

        var mixins = data.mixins,
            name, mixin, i, ln;

        delete data.mixins;

        Ext.Function.interceptBefore(hooks, 'onCreated', function () {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#mixinsPreprocessor#beforeCreated', arguments);
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
    Ext.extend = function (Class, Parent, members) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(Class, 'Ext.Class#extend-backwards-compatible', arguments);
        //</debug>

        if (arguments.length === 2 && Ext.isObject(Parent)) {
            members = Parent;
            Parent = Class;
            Class = null;
        }

        var cls;

        if (!Parent) {
            throw new Error("[Ext.extend] Attempting to extend from a class which has not been loaded on the page.");
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
*@class Ext.ClassManager
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

    var Manager = Ext.ClassManager = {

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
            from: 'Ext.',
            to: Ext
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
                //throw new Error("[Ext.ClassManager] Invalid classname, must be a string and must not be empty");
                Ext.Error.raise({
                    sourceClass: "Ext.ClassManager",
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
            Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'Ext.ClassManager#onCreated', arguments);
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
                //throw new Error("[Ext.ClassManager] Invalid namespace, must be a string");
                Ext.Error.raise({
                    sourceClass: "Ext.ClassManager",
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
         *     Ext.ClassManager.setNamespace('MyCompany.pkg.Example', someObject);
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
         * The new Ext.ns, supports namespace rewriting
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
         * @return {Ext.ClassManager} this
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
         * @return {Ext.Class} class
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
         * @param {Ext.Class/String} cls a reference to a class or a className
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
                if (aliasToNameMap[alias] && Ext.isDefined(global.console)) {
                    global.console.log("[Ext.ClassManager] Overriding existing alias: '" + alias + "' " +
                        "of: '" + aliasToNameMap[alias] + "' with: '" + className + "'. Be sure it's intentional.");
                }
                //</debug>

                aliasToNameMap[alias] = className;
            }

            if (!nameToAliasesMap[className]) {
                nameToAliasesMap[className] = [];
            }

            if (alias) {
                Ext.Array.include(nameToAliasesMap[className], alias);
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
         * @return {Ext.Class} class
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
            //mafei compat 3.4 通过Ext.reg注册方式得到的组件
            var registerCmp = Ext.ComponentMgr.types[alias.replace('widget.', '')];
            return this.maps.aliasToName[alias] || registerCmp && registerCmp.$className || '';
        },

        /**
         * Get the name of a class by its alternate name.
         *
         * @param {String} alternate
         * @return {String} className
         */
        getNameByAlternate: function (alternate) {
            
            return this.maps.alternateToName[alternate]|| '';
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
         * {@link Ext.ClassManager#getName} is usually invoked by the shorthand {@link Ext#getClassName}.
         *
         *     Ext.getName(Ext.Action); // returns "Ext.Action"
         *
         * @param {Ext.Class/Object} object
         * @return {String} className
         */
        getName: function (object) {
            return object && object.$className || '';
        },

        /**
         * Get the class of the provided object; returns null if it's not an instance
         * of any class created with Ext.define.
         *
         * {@link Ext.ClassManager#getClass} is usually invoked by the shorthand {@link Ext#getClass}.
         *
         *     var component = new Ext.Component();
         *
         *     Ext.getClass(component); // returns Ext.Component
         *
         * @param {Object} object
         * @return {Ext.Class} class
         */
        getClass: function (object) {
            return object && object.self || null;
        },

        /**
         * Defines a class.
         * @deprecated 4.1.0 Use {@link Ext#define} instead, as that also supports creating overrides.
         */
        create: function (className, data, createdFn) {
            //<debug error>
            if (className != null && typeof className != 'string') {
                // throw new Error("[Ext.define] Invalid class name '" + className + "' specified, must be a non-empty string");
                Ext.Error.raise({
                    sourceClass: "Ext",
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
                Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'Ext.ClassManager#classCreated', arguments);
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
                        Ext.Loader.require(temp, classReady);
                    } else {
                        // The target class and the required classes for this override are
                        // ready, so we can apply the override now:
                        cls = me.get(overriddenClassName);

                        // We don't want to apply these:
                        delete data.override;
                        delete data.compatibility;
                        delete data.requires;
                        delete data.uses;

                        Ext.override(cls, data);

                        // This pushes the overridding file itself into Ext.Loader.history
                        // Hence if the target class never exists, the overriding file will
                        // never be included in the build.
                        me.triggerCreated(className);

                        if (uses) {
                            Ext.Loader.addUsedClasses(uses); // get these classes too!
                        }

                        if (createdFn) {
                            createdFn.call(cls); // last but not least!
                        }
                    }
                };

            me.existCache[className] = true;

            if (!compat || Ext.checkVersion(compat)) {
                // Override the target class right after it's created
                me.onCreated(classReady, me, overriddenClassName);
            }

            return me;
        },

        /**
         * Instantiate a class by its alias.
         * 
         * {@link Ext.ClassManager#instantiateByAlias} is usually invoked by the shorthand {@link Ext#createByAlias}.
         *
         * If {@link Ext.Loader} is {@link Ext.Loader#setConfig enabled} and the class has not been defined yet, it will
         * attempt to load the class via synchronous loading.
         *
         *     var window = Ext.createByAlias('widget.window', { width: 600, height: 800, ... });
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
                    //throw new Error("[Ext.createByAlias] Cannot create an instance of unrecognized alias: " + alias);
                    Ext.Error.raise({
                        sourceClass: "Ext",
                        sourceMethod: "createByAlias",
                        msg: "Cannot create an instance of unrecognized alias: " + alias
                    });
                }
                //</debug>

                //<debug warn>
                if (global.console) {
                    global.console.warn("[Ext.Loader] Synchronously loading '" + className + "'; consider adding " +
                         "Ext.require('" + alias + "') above Ext.onReady");
                }
                //</debug>

                Ext.syncRequire(className);
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
                    // throw new Error("[Ext.create] Invalid class name or alias '" + name + "' specified, must be a non-empty string");
                    Ext.Error.raise({
                        sourceClass: "Ext",
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
                    global.console.warn("[Ext.Loader] Synchronously loading '" + name + "'; consider adding " +
                         "Ext.require('" + ((possibleName) ? alias : name) + "') above Ext.onReady");
                }
                //</debug>

                Ext.syncRequire(name);

                cls = this.get(name);
            }

            //<debug error>
            if (!cls) {
                //throw new Error("[Ext.create] Cannot create an instance of unrecognized class name / alias: " + alias);
                Ext.Error.raise({
                    sourceClass: "Ext",
                    sourceMethod: "create",
                    msg: "Cannot create an instance of unrecognized class name / alias: " + alias
                });
            }

            if (typeof cls != 'function') {
                // throw new Error("[Ext.create] '" + name + "' is a singleton and cannot be instantiated");
                Ext.Error.raise({
                    sourceClass: "Ext",
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
                instantiator.displayName = "Ext.ClassManager.instantiate" + length;
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
         * @return {Ext.ClassManager} this
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
         * {@link Ext.ClassManager#registerPostprocessor} before this
         * @param {String} offset The insertion position. Four possible values are:
         * 'first', 'last', or: 'before', 'after' (relative to the name provided in the third argument)
         * @param {String} relativeName
         * @return {Ext.ClassManager} this
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

            index = Ext.Array.indexOf(defaultPostprocessors, relativeName);

            if (index !== -1) {
                Ext.Array.splice(defaultPostprocessors, Math.max(0, index + offset), 0, name);
            }

            return this;
        },

        /**
         * Converts a string expression to an array of matching class names. An expression can either refers to class aliases
         * or class names. Expressions support wildcards:
         *
         *      // returns ['Ext.window.Window']
         *     var window = Ext.ClassManager.getNamesByExpression('widget.window');
         *
         *     // returns ['widget.panel', 'widget.window', ...]
         *     var allWidgets = Ext.ClassManager.getNamesByExpression('widget.*');
         *
         *     // returns ['Ext.data.Store', 'Ext.data.ArrayProxy', ...]
         *     var allData = Ext.ClassManager.getNamesByExpression('Ext.data.*');
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
                //throw new Error("[Ext.ClassManager.getNamesByExpression] Expression " + expression + " is invalid, must be a non-empty string");
                Ext.Error.raise({
                    sourceClass: "Ext.ClassManager",
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
     * @member Ext.Class
     * List of short aliases for class names.  Most useful for defining xtypes for widgets:
     *
     *     Ext.define('MyApp.CoolPanel', {
     *         extend: 'Ext.panel.Panel',
     *         alias: ['widget.coolpanel'],
     *         title: 'Yeah!'
     *     });
     *
     *     // Using Ext.create
     *     Ext.create('widget.coolpanel');
     *
     *     // Using the shorthand for defining widgets by xtype
     *     Ext.widget('panel', {
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
        Ext.classSystemMonitor && Ext.classSystemMonitor(name, 'Ext.ClassManager#aliasPostProcessor', arguments);
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
     * @member Ext.Class
     * When set to true, the class will be instantiated as singleton.  For example:
     *
     *     Ext.define('Logger', {
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
        Ext.classSystemMonitor && Ext.classSystemMonitor(name, 'Ext.ClassManager#singletonPostProcessor', arguments);
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
     * @member Ext.Class
     * Defines alternate names for this class.  For example:
     *
     *     Ext.define('Developer', {
     *         alternateClassName: ['Coder', 'Hacker'],
     *         code: function(msg) {
     *             alert('Typing... ' + msg);
     *         }
     *     });
     *
     *     var joe = Ext.create('Developer');
     *     joe.code('stackoverflow');
     *
     *     var rms = Ext.create('Hacker');
     *     rms.code('hack hack');
     */
    Manager.registerPostprocessor('alternateClassName', function (name, cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(name, 'Ext.ClassManager#alternateClassNamePostprocessor', arguments);
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
                throw new Error("[Ext.define] Invalid alternate of: '" + alternate + "' for class: '" + name + "'; must be a valid string");
            }
            //</debug>

            this.set(alternate, cls);
        }
    });
    //</feature>

    Ext.apply(Ext, {
        /**
         * Instantiate a class by either full name, alias or alternate name.
         *
         * If {@link Ext.Loader} is {@link Ext.Loader#setConfig enabled} and the class has
         * not been defined yet, it will attempt to load the class via synchronous loading.
         *
         * For example, all these three lines return the same result:
         *
         *      // alias
         *      var window = Ext.create('widget.window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // alternate name
         *      var window = Ext.create('Ext.Window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // full class name
         *      var window = Ext.create('Ext.window.Window', {
         *          width: 600,
         *          height: 800,
         *          ...
         *      });
         *
         *      // single object with xclass property:
         *      var window = Ext.create({
         *          xclass: 'Ext.window.Window', // any valid value for 'name' (above)
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
         * @member Ext
         * @method create
         */
        create: alias(Manager, 'instantiate'),

        /**
         * Convenient shorthand to create a widget by its xtype or a config object.
         * See also {@link Ext.ClassManager#instantiateByAlias}.
         *
         *      var button = Ext.widget('button'); // Equivalent to Ext.create('widget.button');
         *
         *      var panel = Ext.widget('panel', { // Equivalent to Ext.create('widget.panel')
         *          title: 'Panel'
         *      });
         *
         *      var grid = Ext.widget({
         *          xtype: 'grid',
         *          ...
         *      });
         *
         * If a {@link Ext.Component component} instance is passed, it is simply returned.
         *
         * @member Ext
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
         * @inheritdoc Ext.ClassManager#instantiateByAlias
         * @member Ext
         * @method createByAlias
         */
        createByAlias: alias(Manager, 'instantiateByAlias'),

        /**
         * Defines a class or override. A basic class is defined like this:
         *
         *      Ext.define('My.awesome.Class', {
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
         *      Ext.define(null, {
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
         *      Ext.define('MyApp.foo.Bar', function () {
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
         *      Ext.define('MyApp.override.BaseOverride', function () {
         *          var counter = 0;
         *
         *          return {
         *              override: 'Ext.Component',
         *              logId: function () {
         *                  console.log(++counter, this.id);
         *              }
         *          };
         *      }());
         * 
         *
         * When using this form of `Ext.define`, the function is passed a reference to its
         * class. This can be used as an efficient way to access any static properties you
         * may have:
         *
         *      Ext.define('MyApp.foo.Bar', function (Bar) {
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
         *      Ext.define('My.app.Panel', {
         *          extend: 'Ext.panel.Panel',
         *          requires: [
         *              'My.app.PanelPart2',
         *              'My.app.PanelPart3'
         *          ]
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls Ext.panel.Panel's constructor
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
         *      Ext.define('My.app.PanelPart2', {
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
         *      Ext.define('My.ux.CoolTip', {
         *          override: 'Ext.tip.ToolTip',
         *
         *          constructor: function (config) {
         *              this.callParent(arguments); // calls Ext.tip.ToolTip's constructor
         *              //...
         *          }
         *      });
         *
         * The above override can now be required as normal.
         *
         *      Ext.define('My.app.App', {
         *          requires: [
         *              'My.ux.CoolTip'
         *          ]
         *      });
         *
         * Overrides can also contain statics:
         *
         *      Ext.define('My.app.BarMod', {
         *          override: 'Ext.foo.Bar',
         *
         *          statics: {
         *              method: function (x) {
         *                  return this.callParent([x * 2]); // call Ext.foo.Bar.method
         *              }
         *          }
         *      });
         * 
         * Starting in version 4.2.2, overrides can declare their `compatibility` based
         * on the framework version or on versions of other packages. For details on the
         * syntax and options for these checks, see `Ext.checkVersion`.
         * 
         * The simplest use case is to test framework version for compatibility:
         * 
         *      Ext.define('App.overrides.grid.Panel', {
         *          override: 'Ext.grid.Panel',
         *
         *          compatibility: '4.2.2', // only if framework version is 4.2.2
         *
         *          //...
         *      });
         * 
         * An array is treated as an OR, so if any specs match, the override is
         * compatible.
         * 
         *      Ext.define('App.overrides.some.Thing', {
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
         *      Ext.define('App.overrides.some.Thing', {
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
         *      Ext.define('App.overrides.some.Thing', {
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
         *  - `xtype` (for {@link Ext.Component Components} only)
         *  - `self`
         *  - `singleton`
         *  - `alternateClassName`
         *  - `override`
         *
         * @param {Function} [createdFn] Callback to execute after the class is created, the execution scope of which
         * (`this`) will be the newly created class itself.
         * @return {Ext.Base}
         * @member Ext
         */
        define: function (className, data, createdFn) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'ClassManager#define', arguments);
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
         *     Ext.define('Foo', {
         *        ...
         *     });
         *     
         *     // run test
         *     
         *     // undefine the class
         *     Ext.undefine('Foo');
         * @param {String} className The class name to undefine in string dot-namespaced format.
         * @private
         */
        undefine: function (className) {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(className, 'Ext.ClassManager#undefine', arguments);
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
         * @inheritdoc Ext.ClassManager#getName
         * @member Ext
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
                    return Ext.getClassName(object.$class) + '#' + object.$name;
                }

                if (object.$className) {
                    return object.$className;
                }
            }

            return 'Anonymous';
        },

        /**
         * @inheritdoc Ext.ClassManager#getClass
         * @member Ext
         * @method getClass
         */
        getClass: alias(Manager, 'getClass'),

        /**
         * Creates namespaces to be used for scoping variables and classes so that they are not global.
         * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
         *
         *     Ext.namespace('Company', 'Company.data');
         *
         *     // equivalent and preferable to the above syntax
         *     Ext.ns('Company.data');
         *
         *     Company.Widget = function() { ... };
         *
         *     Company.data.CustomStore = function(config) { ... };
         *
         * @param {String...} namespaces
         * @return {Object} The namespace object.
         * (If multiple arguments are passed, this will be the last namespace created)
         * @member Ext
         * @method namespace
         */
        namespace: alias(Manager, 'createNamespaces')
    });

    /**
     * Old name for {@link Ext#widget}.
     * @deprecated 4.0.0 Use {@link Ext#widget} instead.
     * @method createWidget
     * @member Ext
     */
    Ext.createWidget = Ext.widget;

    /**
     * Convenient alias for {@link Ext#namespace Ext.namespace}.
     * @inheritdoc Ext#namespace
     * @member Ext
     * @method ns
     */
    Ext.ns = Ext.namespace;

    Class.registerPreprocessor('className', function (cls, data) {
        if (data.$className) {
            cls.$className = data.$className;
            //<debug>
            cls.displayName = cls.$className;
            //</debug>
        }

        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.ClassManager#classNamePreprocessor', arguments);
        //</debug>
    }, true, 'first');

    Class.registerPreprocessor('alias', function (cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.ClassManager#aliasPreprocessor', arguments);
        //</debug>

        var prototype = cls.prototype,
            xtypes = arrayFrom(data.xtype),
            aliases = arrayFrom(data.alias),
            widgetPrefix = 'widget.',
            widgetPrefixLength = widgetPrefix.length,
            xtypesChain = Array.prototype.slice.call(prototype.xtypesChain || []),
            xtypesMap = Ext.merge({}, prototype.xtypesMap || {}),
            i, ln, alias, xtype;

        for (i = 0, ln = aliases.length; i < ln; i++) {
            alias = aliases[i];

            //<debug error>
            if (typeof alias != 'string' || alias.length < 1) {
                throw new Error("[Ext.define] Invalid alias of: '" + alias + "' for class: '" + name + "'; must be a valid string");
            }
            //</debug>

            if (alias.substring(0, widgetPrefixLength) === widgetPrefix) {
                xtype = alias.substring(widgetPrefixLength);
                Ext.Array.include(xtypes, xtype);
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

        Ext.Function.interceptAfter(data, 'onClassCreated', function () {
            //<debug>
            Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.ClassManager#aliasPreprocessor#afterClassCreated', arguments);
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
                throw new Error("[Ext.define] Invalid xtype of: '" + xtype + "' for class: '" + name + "'; must be a valid non-empty string");
            }
            //</debug>

            Ext.Array.include(aliases, widgetPrefix + xtype);
        }

        data.alias = aliases;

    }, ['xtype', 'alias']);

}(Ext.Class, Ext.Function.alias, Array.prototype.slice, Ext.Array.from, Ext.global));

// simple mechanism for automated means of injecting large amounts of dependency info
// at the appropriate time in the load cycle
if (Ext._alternatesMetadata) {
    Ext.ClassManager.addNameAlternateMappings(Ext._alternatesMetadata);
    Ext._alternatesMetadata = null;
}

if (Ext._aliasMetadata) {
    Ext.ClassManager.addNameAliasMappings(Ext._aliasMetadata);
    Ext._aliasMetadata = null;
}

/**
*@class Ext.Loader
**/
Ext.Loader = new function () {
    var Loader = this,
        Manager = Ext.ClassManager,
        Class = Ext.Class,
        flexSetter = Ext.Function.flexSetter,
        alias = Ext.Function.alias,
        pass = Ext.Function.pass,
        defer = Ext.Function.defer,
        arrayErase = Ext.Array.erase,
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

    Ext.apply(Loader, {

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
             *         'Ext': '.', // This is set by default, Ext.layout.container.Container will be
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
                'Ext': '.'
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
         * is included in the page, and before Ext.onReady. i.e:
         *
         *     <script type="text/javascript" src="ext-core-debug.js"></script>
         *     <script type="text/javascript">
         *         Ext.Loader.setConfig({
         *           enabled: true,
         *           paths: {
         *               'My': 'my_own_path'
         *           }
         *         });
         *     </script>
         *     <script type="text/javascript">
         *         Ext.require(...);
         *
         *         Ext.onReady(function() {
         *           // application code here
         *         });
         *     </script>
         *
         * Refer to config options of {@link Ext.Loader} for the list of possible properties
         *
         * @param {Object} config The config object to override the default values
         * @return {Ext.Loader} this
         */
        setConfig: function (name, value) {
            if (Ext.isObject(name) && arguments.length === 1) {
                Ext.merge(Loader.config, name);

                if ('paths' in name) {
                    Ext.app.collectNamespaces(name.paths);
                }
            }
            else {
                Loader.config[name] = (Ext.isObject(value)) ? Ext.merge(Loader.config[name], value) : value;

                if (name === 'paths') {
                    Ext.app.collectNamespaces(value);
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
         *     Ext.Loader.setPath('Ext', '.');
         *
         * @param {String/Object} name See {@link Ext.Function#flexSetter flexSetter}
         * @param {String} [path] See {@link Ext.Function#flexSetter flexSetter}
         * @return {Ext.Loader} this
         * @method
         */
        setPath: flexSetter(function (name, path) {
            Loader.config.paths[name] = path;
            Ext.app.namespaces[name] = true;
            setPathCount++;

            return Loader;
        }),

        /**
         * Sets a batch of path entries
         *
         * @param {Object } paths a set of className: path mappings
         * @return {Ext.Loader} this
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
         *     Ext.Loader.setPath('My', '/path/to/My');
         *
         *     alert(Ext.Loader.getPath('My.awesome.Class')); // alerts '/path/to/My/awesome/Class.js'
         *
         * Note that the deeper namespace levels, if explicitly set, are always resolved first. For example:
         *
         *     Ext.Loader.setPath({
         *         'My': '/path/to/lib',
         *         'My.awesome': '/other/path/for/awesome/stuff',
         *         'My.awesome.more': '/more/awesome/path'
         *     });
         *
         *     alert(Ext.Loader.getPath('My.awesome.Class')); // alerts '/other/path/for/awesome/stuff/Class.js'
         *
         *     alert(Ext.Loader.getPath('My.awesome.more.Class')); // alerts '/more/awesome/path/Class.js'
         *
         *     alert(Ext.Loader.getPath('My.cool.Class')); // alerts '/path/to/lib/cool/Class.js'
         *
         *     alert(Ext.Loader.getPath('Unknown.strange.Stuff')); // alerts 'Unknown/strange/Stuff.js'
         *
         * @param {String} className
         * @return {String} path
         */
        getPath: function (className,split) {
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
				className=className.split('/')[0].toLowerCase()+className.substring(className.indexOf('/'));
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
         * {@link Ext#require} is alias for {@link Ext.Loader#require}.
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
         * {@link Ext#syncRequire} is alias for {@link Ext.Loader#syncRequire}.
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
         *     Ext.exclude('Ext.data.*').require('*');
         *
         *     Ext.exclude('widget.button*').require('widget.*');
         *
         * {@link Ext#exclude} is alias for {@link Ext.Loader#exclude}.
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

            if (withDomReady !== false && Ext.onDocumentReady) {
                oldFn = fn;

                fn = function () {
                    Ext.onDocumentReady(oldFn, scope, options);
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

    Ext.apply(Loader, {
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
                Ext.removeNode(script);       // Remove, since its useless now
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
         * is called before {@link Ext#isReady}, the script's load will delay the transition
         * to ready. This can be used to load arbitrary scripts that may contain further
         * {@link Ext#require Ext.require} calls.
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
                (url + '?' + config.disableCachingParam + '=' + Ext.Date.now()) : url;

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
                noCacheUrl = url + (config.disableCaching ? ('?' + config.disableCachingParam + '=' + Ext.Date.now()) : ''),
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
                                       "Ext.require instead.", synchronous);
                    //</debug>
                }
                else if ((status >= 200 && status < 300) || (status === 304)
                    //<if isNonBrowser>
                    || isPhantomJS
                    //</if>
                ) {
                    // Debugger friendly, file names are still shown even though they're eval'ed code
                    // Breakpoints work on both Firebug and Chrome's Web Inspector
                    if (!Ext.isIE) {
                        debugSourceURL = "\n//@ sourceURL=" + url;
                    }
                    //debugger
                    var script=function (text) {
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
                    //Ext.globalEval(xhr.responseText + debugSourceURL);
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
                filePath, expression,_expression, exclude, className,
                possibleClassName, i, j, ln, subLn,clsSplit='$',vmdux='vmd.ux.';

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
            var _copyExpressions = Ext.clone(expressions);
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
                callback = Ext.emptyFn;
            }

            scope = scope || Ext.global;

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
                    //throw new Error("Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
                    //         "Missing required class" + ((classNames.length > 1) ? "es" : "") + ": " + classNames.join(', '));
                    Ext.Error.raise({
                        sourceClass: "Ext.Loader",
                        sourceMethod: "require",
                        msg: "Ext.Loader is not enabled, so dependencies cannot be resolved dynamically. " +
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

                missingClasses = Ext.Array.filter(Ext.Array.unique(missingClasses), function (item) {
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
            //throw new Error("[Ext.Loader] " + errorMessage);
            //</debug>

            Ext.Error.raise({
                sourceClass: "Ext.Loader",
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
                    if (typeof cls == 'string' && !Ext.Array.contains(usedClasses, cls)) {
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

            Ext.Array.sort(readyListeners, comparePriority);

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

            if (withDomReady !== false && Ext.onDocumentReady) {
                oldFn = fn;

                fn = function () {
                    Ext.onDocumentReady(oldFn, scope, options);
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
    Ext.disableCacheBuster = function (disable, path) {
        var date = new Date();
        date.setTime(date.getTime() + (disable ? 10 * 365 : -1) * 24 * 60 * 60 * 1000);
        date = date.toGMTString();
        document.cookie = 'ext-cache=1; expires=' + date + '; path=' + (path || '/');
    };

    //<if nonBrowser>
    if (isNonBrowser) {
        if (isNodeJS) {
            Ext.apply(Loader, {
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
            Ext.apply(Loader, {
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
     * @member Ext
     * @method require
     * @inheritdoc Ext.Loader#require
     */
    Ext.require = alias(Loader, 'require');

    /**
     * @member Ext
     * @method syncRequire
     * @inheritdoc Ext.Loader#syncRequire
     */
    Ext.syncRequire = alias(Loader, 'syncRequire');

    /**
     * Convenient shortcut to {@link Ext.Loader#exclude}
     * @member Ext
     * @method exclude
     * @inheritdoc Ext.Loader#exclude
     */
    Ext.exclude = alias(Loader, 'exclude');

    /**
     * @member Ext
     * @method onReady
     * @ignore
     */
    Ext.onReady = function (fn, scope, options) {
        Loader.onReady(fn, scope, true, options);
    };

    /**
     * @cfg {String[]} requires
     * @member Ext.Class
     * List of classes that have to be loaded before instantiating this class.
     * For example:
     *
     *     Ext.define('Mother', {
     *         requires: ['Child'],
     *         giveBirth: function() {
     *             // we can be sure that child class is available.
     *             return new Child();
     *         }
     *     });
     */
    Class.registerPreprocessor('loader', function (cls, data, hooks, continueFn) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.Loader#loaderPreprocessor', arguments);
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
              extend: 'Ext.MyClass',
              requires: ['Ext.some.OtherClass'],
              mixins: {
                  observable: 'Ext.util.Observable';
              }
        }
        which will later be transformed into:
        {
              extend: Ext.MyClass,
              requires: [Ext.some.OtherClass],
              mixins: {
                  observable: Ext.util.Observable;
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
                    if (Ext.Array.contains(requiresMap[cls], className)) {
                        //throw new Error("Deadlock detected while loading dependencies! '" + className + "' and '" +
                        //        deadlockPath[1] + "' " + "mutually require each other. Path: " +
                        //        deadlockPath.join(' -> ') + " -> " + deadlockPath[0]);

                        Ext.Error.raise({
                            sourceClass: "Ext.Loader",
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
     * @member Ext.Class
     * List of optional classes to load together with this class. These aren't neccessarily loaded before
     * this class is created, but are guaranteed to be available before Ext.onReady listeners are
     * invoked. For example:
     *
     *     Ext.define('Mother', {
     *         uses: ['Child'],
     *         giveBirth: function() {
     *             // This code might, or might not work:
     *             // return new Child();
     *
     *             // Instead use Ext.create() to load the class at the spot if not loaded already:
     *             return Ext.create('Child');
     *         }
     *     });
     */
    Manager.registerPostprocessor('uses', function (name, cls, data) {
        //<debug>
        Ext.classSystemMonitor && Ext.classSystemMonitor(cls, 'Ext.Loader#usesPostprocessor', arguments);
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
if (Ext._classPathMetadata) {
    Ext.Loader.addClassPathMappings(Ext._classPathMetadata);
    Ext._classPathMetadata = null;
}

// initalize the default path of the framework
(function () {
    var scripts = document.getElementsByTagName('script'),
        currentScript = scripts[scripts.length - 1],
        src = currentScript.src,
        path = src.substring(0, src.lastIndexOf('/') + 1),
        Loader = Ext.Loader;

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
            'Ext': path + 'src'
        }
    });
})();

// allows a tools like dynatrace to deterministically detect onReady state by invoking
// a callback (intended for external consumption)
Ext._endTime = new Date().getTime();
if (Ext._beforereadyhandler) {
    Ext._beforereadyhandler();
}



