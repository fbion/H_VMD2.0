webpackJsonp([129], {
    1025: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            var t = this
              , e = t.$createElement
              , i = t._self._c || e;
            return i("div", [i("div", {
                staticClass: "index"
            }, [t._m(0), t._v(" "), i("Row", {
                staticStyle: {
                    position: "relative",
                    "z-index": "3"
                },
                attrs: {
                    type: "flex",
                    justify: "center",
                    align: "middle"
                }
            }, [i("i-col", {
                attrs: {
                    span: "24"
                }
            }, [i("h2", [i("canvasText", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.index % 2 != 0,
                    expression: "index % 2 !== 0"
                }],
                key: "canvas1",
                attrs: {
                    cid: "canvas1",
                    content: "新春快乐"
                }
            }), t._v(" "), i("canvasText", {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: t.index % 2 == 0,
                    expression: "index % 2 === 0"
                }],
                key: "canvas2",
                attrs: {
                    cid: "canvas2",
                    content: "VMD2.0"
                }
            })], 1), t._v(" "), i("div", {
                staticClass: "list"
            }, [i("Button", {
                staticStyle: {
                    "min-width": "130px"
                },
                attrs: {
                    size: "large",
                    shape: "circle",
                    type: "primary",
                    icon: "ios-keypad"
                },
                on: {
                    click: t.handleStart
                }
            }, ["zh-CN" === t.lang ? [t._v("开始使用")] : [t._v("Getting Started")]], 2), t._v(" "), i("Button", {
                staticStyle: {
                    "min-width": "130px",
					"display":"none"
                },
				
                attrs: {
                    size: "large",
                    shape: "circle",
                    type: "success",
                    icon: "social-github"
					
					
                },
                on: {
                    click: t.handleGithub
                }
            }, [t._v("GitHub\n                    ")])], 1)])], 1)], 1), t._v(" "), i("canvas", {
                attrs: {
                    id: "indexLizi"
                }
            }), t._v(" "), i("div", {
                staticClass: "index-lang"
            }, [i("span", {
                on: {
                   // click: t.handleChangeLang
                }
            }, ["zh-CN" === t.lang ? [t._v("")] : [t._v("中文")]], 2)])])
        }
          , n = [function() {
            var t = this
              , e = t.$createElement
              , i = t._self._c || e;
            return i("div", {
                staticClass: "bg"
            }, [i("span")])
        }
        ];
        r._withStripped = !0;
        var s = {
            render: r,
            staticRenderFns: n
        };
        e.default = s
    },
    1050: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = function() {
            var t = this
              , e = t.$createElement
              , i = t._self._c || e;
            return i("div", [i("canvas", {
                attrs: {
                    id: t.cid,
                    width: "800",
                    height: "400"
                }
            })])
        }
          , n = [];
        r._withStripped = !0;
        var s = {
            render: r,
            staticRenderFns: n
        };
        e.default = s
    },
    1115: function(t, e) {},
    1116: function(t, e) {},
    1131: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var r = i(788)
          , n = i.n(r);
        for (var s in r)
            ["default", "default"].indexOf(s) < 0 && function(t) {
                i.d(e, t, function() {
                    return r[t]
                })
            }(s);
        var a = i(1050)
          , o = i.n(a)
          , h = i(87)
          , l = h(n.a, o.a, !1, null, null, null);
        l.options.__file = "src/components/canvas-text.vue",
        e.default = l.exports
    },
    609: function(t, e, i) {
        "use strict";
        function r(t) {
            l || (i(1116),
            i(1115))
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(911)
          , s = i.n(n);
        for (var a in n)
            ["default", "default"].indexOf(a) < 0 && function(t) {
                i.d(e, t, function() {
                    return n[t]
                })
            }(a);
        var o = i(1025)
          , h = i.n(o)
          , l = !1
          , u = i(87)
          , c = r
          , p = u(s.a, h.a, !1, c, "data-v-a83bd3b0", null);
        p.options.__file = "src/views/index.vue",
        e.default = p.exports
    },
    788: function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        e.default = {
            props: {
                cid: {
                    type: String
                },
                content: {
                    type: String
                },
                width: {
                    type: Number,
                    default: 800
                },
                height: {
                    type: Number,
                    default: 400
                }
            },
            data: function() {
                return {}
            },
            methods: {},
            mounted: function() {
                function t(t, e) {
                    this.x = t,
                    this.y = e,
                    this.color = h[Math.floor(Math.random() * h.length)],
                    this.futurRadius = i(1.1, 5.1),
                    this.radius = 1.1,
                    this.dying = !1,
                    this.base = [t, e],
                    this.drawParticle = function() {
                        this.radius < this.futurRadius && !1 === this.dying ? this.radius += l : this.dying = !0,
                        this.dying && (this.radius -= l),
                        s.save(),
                        s.fillStyle = this.color,
                        s.beginPath(),
                        s.arc(this.x, this.y, this.radius, 2 * Math.PI, !1),
                        s.closePath(),
                        s.fill(),
                        s.restore(),
                        (this.y < 0 || this.radius < 1) && (this.x = this.base[0],
                        this.y = this.base[1],
                        this.dying = !1)
                    }
                }
                function e(t, e, i, r) {
                    this.text = t,
                    this.size = e,
                    this.x = i,
                    this.y = r,
                    this.placement = []
                }
                function i(t, e) {
                    return t + Math.random() * (e - t + 1)
                }
                var r = this.cid
                  , n = document.getElementById(r)
                  , s = n.getContext("2d")
                  , a = n.width
                  , o = n.height
                  , h = ["#ffffff", "#fffb8f", "#eaff8f", "#91d5ff", "#ffadd2", "#d3adf7"]
                  , l = .1;
                e.prototype.getValue = function() {
                    s.textAlign = "center",
                    s.font = this.size + "px arial",
                    s.fillText(this.text, this.x, this.y);
                    for (var e = s.getImageData(0, 0, a, o), i = new Uint32Array(e.data.buffer), r = 0; r < o; r += 7)
                        for (var n = 0; n < a; n += 7)
                            if (i[r * a + n]) {
                                var h = new t(n,r);
                                this.placement.push(h)
                            }
                }
                ;
                var u = new e(this.content,200,a / 2,o / 2);
                u.getValue(),
                function t() {
                    window.requestAnimationFrame(t),
                    s.clearRect(0, 0, a, o);
                    for (var e = 0; e < u.placement.length; e++)
                        u.placement[e].drawParticle()
                }()
            },
            beforeDestroy: function() {}
        }
    },
    911: function(t, e, i) {
        "use strict";
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = i(211)
          , s = r(n)
          , a = i(92)
          , o = r(a)
          , h = i(59)
          , l = r(h)
          , u = i(1131)
          , c = r(u);
        (function(t, e) {
            function i(t, e, r, n) {
                i._super_.call(this),
                this.reset(t, e, r, n)
            }
            function r(t, e, i, n) {
                r._super_.call(this),
                this.x = t,
                this.y = e,
                this.width = i,
                this.height = n
            }
            function n(t, e) {
                n._super_.call(this),
                this.x = t,
                this.y = e
            }
            function a(t, e, i) {
                a._super_.call(this),
                this.x = t,
                this.y = e,
                this.radius = i,
                this.angle = 0,
                this.center = {
                    x: this.x,
                    y: this.y
                }
            }
            function h(t, e, i, r, n) {
                h._super_.call(this),
                i - t >= 0 ? (this.x1 = t,
                this.y1 = e,
                this.x2 = i,
                this.y2 = r) : (this.x1 = i,
                this.y1 = r,
                this.x2 = t,
                this.y2 = e),
                this.dx = this.x2 - this.x1,
                this.dy = this.y2 - this.y1,
                this.minx = Math.min(this.x1, this.x2),
                this.miny = Math.min(this.y1, this.y2),
                this.maxx = Math.max(this.x1, this.x2),
                this.maxy = Math.max(this.y1, this.y2),
                this.dot = this.x2 * this.y1 - this.x1 * this.y2,
                this.xxyy = this.dx * this.dx + this.dy * this.dy,
                this.gradient = this.getGradient(),
                this.length = this.getLength(),
                this.direction = Y.Util.initValue(n, ">")
            }
            function l() {
                this.vector = new Y.Vector2D(0,0),
                this.random = 0,
                this.crossType = "dead",
                this.alert = !0
            }
            function u(t, e) {
                u._super_.call(this, t, e),
                this.gl = this.element.getContext("experimental-webgl", {
                    antialias: !0,
                    stencil: !1,
                    depth: !1
                }),
                this.gl || alert("Sorry your browser do not suppest WebGL!"),
                this.initVar(),
                this.setMaxRadius(),
                this.initShaders(),
                this.initBuffers(),
                this.gl.blendEquation(this.gl.FUNC_ADD),
                this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA),
                this.gl.enable(this.gl.BLEND)
            }
            function c(t, e, i) {
                c._super_.call(this, t, e),
                this.context = this.element.getContext("2d"),
                this.imageData = null,
                this.rectangle = null,
                this.rectangle = i,
                this.createImageData(i)
            }
            function p(t, e) {
                p._super_.call(this, t, e),
                this.stroke = null,
                this.context = this.element.getContext("2d"),
                this.bufferCache = {}
            }
            function d(t, e, i) {
                d._super_.call(this, t, e),
                this.stroke = i
            }
            function f(t, e) {
                f._super_.call(this, t, e),
                this.stroke = null
            }
            function m(t, e, i) {
                this.proton = t,
                this.element = e,
                this.stroke = i
            }
            function g(t, e, i) {
                this.element = i,
                this.type = Y.Util.initValue(t, "canvas"),
                this.proton = e,
                this.renderer = this.getRenderer()
            }
            function y(e, i, r) {
                this.mouseTarget = Y.Util.initValue(e, t),
                this.ease = Y.Util.initValue(i, .7),
                this._allowEmitting = !1,
                this.initEventHandler(),
                y._super_.call(this, r)
            }
            function v(t) {
                this.selfBehaviours = [],
                v._super_.call(this, t)
            }
            function x(t) {
                this.initializes = [],
                this.particles = [],
                this.behaviours = [],
                this.emitTime = 0,
                this.emitTotalTimes = -1,
                this.damping = .006,
                this.bindEmitter = !0,
                this.rate = new Y.Rate(1,.1),
                x._super_.call(this, t),
                this.id = "emitter_" + x.ID++
            }
            function P(t, e, i, r) {
                P._super_.call(this, i, r),
                this.distanceVec = new Y.Vector2D,
                this.centerPoint = Y.Util.initValue(t, new Y.Vector2D),
                this.force = Y.Util.initValue(this.normalizeValue(e), 100),
                this.name = "GravityWell"
            }
            function w(t, e, i, r) {
                w._super_.call(this, i, r),
                this.reset(t, e),
                this.name = "Color"
            }
            function E(t, e, i, r, n) {
                E._super_.call(this, r, n),
                this.reset(t, e, i),
                this.name = "Rotate"
            }
            function _(t, e, i, r) {
                _._super_.call(this, i, r),
                this.reset(t, e),
                this.name = "Scale"
            }
            function b(t, e, i, r) {
                b._super_.call(this, i, r),
                this.reset(t, e),
                this.name = "Alpha"
            }
            function U(t, e, i, r) {
                U._super_.call(this, i, r),
                this.reset(t, e),
                this.name = "CrossZone"
            }
            function I(t, e, i, r, n) {
                I._super_.call(this, r, n),
                this.reset(t, e, i),
                this.name = "Collision"
            }
            function T(t, e, i) {
                T._super_.call(this, 0, t, e, i),
                this.name = "Gravity"
            }
            function R(t, e, i, r, n) {
                R._super_.call(this, t, e, i, r, n),
                this.force *= -1,
                this.name = "Repulsion"
            }
            function A(t, e, i, r, n) {
                A._super_.call(this, r, n),
                this.reset(t, e, i),
                this.time = 0,
                this.name = "RandomDrift"
            }
            function S(t, e, i, r, n) {
                S._super_.call(this, r, n),
                this.targetPosition = Y.Util.initValue(t, new Y.Vector2D),
                this.radius = Y.Util.initValue(i, 1e3),
                this.force = Y.Util.initValue(this.normalizeValue(e), 100),
                this.radiusSq = this.radius * this.radius,
                this.attractionForce = new Y.Vector2D,
                this.lengthSq = 0,
                this.name = "Attraction"
            }
            function B(t, e, i, r) {
                B._super_.call(this, i, r),
                this.force = this.normalizeForce(new Y.Vector2D(t,e)),
                this.name = "Force"
            }
            function C(t, e, i) {
                C._super_.call(this),
                this.image = this.setSpanValue(t),
                this.w = Y.Util.initValue(e, 20),
                this.h = Y.Util.initValue(i, this.w)
            }
            function M(t, e, i) {
                M._super_.call(this),
                this.radius = Y.Util.setSpanValue(t, e, i)
            }
            function V(t, e, i) {
                V._super_.call(this),
                this.massPan = Y.Util.setSpanValue(t, e, i)
            }
            function D(t, e, i) {
                D._super_.call(this),
                this.rPan = Y.Util.setSpanValue(t),
                this.thaPan = Y.Util.setSpanValue(e),
                this.type = Y.Util.initValue(i, "vector")
            }
            function O(t) {
                O._super_.call(this),
                this.zone = Y.Util.initValue(t, new Y.PointZone)
            }
            function L(t, e, i) {
                L._super_.call(this),
                this.lifePan = Y.Util.setSpanValue(t, e, i)
            }
            function z() {}
            function k(t, e) {
                this.numPan = Y.Util.initValue(t, 1),
                this.timePan = Y.Util.initValue(e, 1),
                this.numPan = Y.Util.setSpanValue(this.numPan),
                this.timePan = Y.Util.setSpanValue(this.timePan),
                this.startTime = 0,
                this.nextTime = 0,
                this.init()
            }
            function F(t, e) {
                this.id = "Behaviour_" + F.id++,
                this.life = Y.Util.initValue(t, 1 / 0),
                this.easing = Y.ease.setEasingByName(e),
                this.age = 0,
                this.energy = 1,
                this.dead = !1,
                this.parents = [],
                this.name = "Behaviour"
            }
            function G(t, e, i, r) {
                this.x = t,
                this.y = e,
                this.width = i,
                this.height = r,
                this.bottom = this.y + this.height,
                this.right = this.x + this.width
            }
            function N(t) {
                Y.Util.isArray(t) ? this.colorArr = t : this.colorArr = [t]
            }
            function q(t, e, i) {
                this.isArray = !1,
                Y.Util.isArray(t) ? (this.isArray = !0,
                this.a = t) : (this.a = Y.Util.initValue(t, 1),
                this.b = Y.Util.initValue(e, this.a),
                this.center = Y.Util.initValue(i, !1))
            }
            function W(t, e) {
                this.proParticleCount = Y.Util.initValue(t, 0),
                this.releaseTime = Y.Util.initValue(e, -1),
                this.poolList = [],
                this.timeoutID = 0;
                for (var i = 0; i < this.proParticleCount; i++)
                    this.add();
                this.releaseTime > 0 && (this.timeoutID = setTimeout(this.release, this.releaseTime / 1e3))
            }
            function Q(t) {
                this.id = "particle_" + Q.ID++,
                this.reset(!0),
                Y.Util.setPrototypeByObject(this, t)
            }
            function X() {
                this.mats = [],
                this.size = 0;
                for (var t = 0; t < 20; t++)
                    this.mats.push(Y.Mat3.create([0, 0, 0, 0, 0, 0, 0, 0, 0]))
            }
            function j(t) {
                this.type = "null",
                this.particle = null,
                this.emitter = null,
                this.particles = [],
                Y.Util.setPrototypeByObject(this, t)
            }
            function Z() {
                this.initialize()
            }
            function Y(t, e) {
                this.proParticleCount = Y.Util.initValue(t, Y.POOL_MAX),
                this.integrationType = Y.Util.initValue(e, Y.EULER),
                this.emitters = [],
                this.renderers = [],
                this.time = 0,
                this.oldTime = 0,
                Y.pool = new Y.ParticlePool(this.proParticleCount),
                Y.integrator = new Y.NumericalIntegration(this.integrationType)
            }
            Y.POOL_MAX = 1e3,
            Y.TIME_STEP = 60,
            Y.MEASURE = 100,
            Y.EULER = "euler",
            Y.RK2 = "runge-kutta2",
            Y.RK4 = "runge-kutta4",
            Y.VERLET = "verlet",
            Y.PARTICLE_CREATED = "partilcleCreated",
            Y.PARTICLE_UPDATE = "partilcleUpdate",
            Y.PARTICLE_SLEEP = "particleSleep",
            Y.PARTICLE_DEAD = "partilcleDead",
            Y.PROTON_UPDATE = "protonUpdate",
            Y.PROTON_UPDATE_AFTER = "protonUpdateAfter",
            Y.EMITTER_ADDED = "emitterAdded",
            Y.EMITTER_REMOVED = "emitterRemoved",
            Y.amendChangeTabsBug = !0,
            Y.TextureBuffer = {},
            Y.TextureCanvasBuffer = {},
            Y.prototype = {
                addRender: function(t) {
                    t.proton = this,
                    this.renderers.push(t.proton)
                },
                addEmitter: function(t) {
                    this.emitters.push(t),
                    t.parent = this,
                    this.dispatchEvent(new Y.Event({
                        type: Y.EMITTER_ADDED,
                        emitter: t
                    }))
                },
                removeEmitter: function(t) {
                    var e = this.emitters.indexOf(t);
                    this.emitters.splice(e, 1),
                    t.parent = null,
                    this.dispatchEvent(new Y.Event({
                        type: Y.EMITTER_REMOVED,
                        emitter: t
                    }))
                },
                update: function() {
                    this.dispatchEvent(new Y.Event({
                        type: Y.PROTON_UPDATE
                    })),
                    this.oldTime || (this.oldTime = (new Date).getTime());
                    var t = (new Date).getTime();
                    if (this.elapsed = (t - this.oldTime) / 1e3,
                    Y.amendChangeTabsBug && this.amendChangeTabsBug(),
                    this.oldTime = t,
                    this.elapsed > 0)
                        for (var e = 0; e < this.emitters.length; e++)
                            this.emitters[e].update(this.elapsed);
                    this.dispatchEvent(new Y.Event({
                        type: Y.PROTON_UPDATE_AFTER
                    }))
                },
                amendChangeTabsBug: function() {
                    this.elapsed > .5 && (this.oldTime = (new Date).getTime(),
                    this.elapsed = 0)
                },
                getParticleNumber: function() {
                    for (var t = 0, e = 0; e < this.emitters.length; e++)
                        t += this.emitters[e].particles.length;
                    return t
                },
                destory: function() {
                    for (var t = 0; t < this.emitters.length; t++)
                        this.emitters[t].destory(),
                        delete this.emitters[t];
                    this.emitters = [],
                    this.time = 0,
                    this.oldTime = 0,
                    Y.pool.release()
                }
            },
            t.Proton = Y;
            var H = Z.prototype;
            Z.initialize = function(t) {
                t.addEventListener = H.addEventListener,
                t.removeEventListener = H.removeEventListener,
                t.removeAllEventListeners = H.removeAllEventListeners,
                t.hasEventListener = H.hasEventListener,
                t.dispatchEvent = H.dispatchEvent
            }
            ,
            H._listeners = null,
            H.initialize = function() {}
            ,
            H.addEventListener = function(t, e) {
                var i = this._listeners;
                i ? this.removeEventListener(t, e) : i = this._listeners = {};
                var r = i[t];
                return r || (r = i[t] = []),
                r.push(e),
                e
            }
            ,
            H.removeEventListener = function(t, e) {
                var i = this._listeners;
                if (i) {
                    var r = i[t];
                    if (!r)
                        return;
                    for (var n = 0, s = r.length; n < s; n++)
                        if (r[n] == e) {
                            1 == s ? delete i[t] : r.splice(n, 1);
                            break
                        }
                }
            }
            ,
            H.removeAllEventListeners = function(t) {
                t ? this._listeners && delete this._listeners[t] : this._listeners = null
            }
            ,
            H.dispatchEvent = function(t, e) {
                var i = !1
                  , r = this._listeners;
                if (t && r) {
                    "string" == typeof t && (t = {
                        type: t
                    });
                    var n = r[t.type];
                    if (!n)
                        return i;
                    t.target = e || this,
                    n = n.slice();
                    for (var s = 0, a = n.length; s < a; s++) {
                        var o = n[s];
                        i = o.handleEvent ? i || o.handleEvent(t) : i || o(t)
                    }
                }
                return !!i
            }
            ,
            H.hasEventListener = function(t) {
                var e = this._listeners;
                return !!e && !!e[t]
            }
            ,
            Y.EventDispatcher = Z,
            Y.EventDispatcher.initialize(Y.prototype),
            j.PARTICLE_CREATED = Y.PARTICLE_CREATED,
            j.PARTICLE_UPDATA = Y.PARTICLE_UPDATA,
            j.PARTICLE_SLEEP = Y.PARTICLE_SLEEP,
            j.PARTICLE_DEAD = Y.PARTICLE_DEAD,
            Y.Event = j;
            var $ = $ || {
                initValue: function(t, i) {
                    var t = null != t && t != e ? t : i;
                    return t
                },
                isArray: function(t) {
                    return "object" == (void 0 === t ? "undefined" : (0,
                    o.default)(t)) && t.hasOwnProperty("length")
                },
                destroyArray: function(t) {
                    t.length = 0
                },
                destroyObject: function(t) {
                    for (var e in t)
                        delete t[e]
                },
                getVector2D: function(t, e) {
                    return "object" == (void 0 === t ? "undefined" : (0,
                    o.default)(t)) ? t : new Y.Vector2D(t,e)
                },
                judgeVector2D: function(t) {
                    var e = "";
                    return (t.hasOwnProperty("x") || t.hasOwnProperty("y") || t.hasOwnProperty("p") || t.hasOwnProperty("position")) && (e += "p"),
                    (t.hasOwnProperty("vx") || t.hasOwnProperty("vx") || t.hasOwnProperty("v") || t.hasOwnProperty("velocity")) && (e += "v"),
                    (t.hasOwnProperty("ax") || t.hasOwnProperty("ax") || t.hasOwnProperty("a") || t.hasOwnProperty("accelerate")) && (e += "a"),
                    e
                },
                setVector2DByObject: function(t, e) {
                    e.hasOwnProperty("x") && (t.p.x = e.x),
                    e.hasOwnProperty("y") && (t.p.y = e.y),
                    e.hasOwnProperty("vx") && (t.v.x = e.vx),
                    e.hasOwnProperty("vy") && (t.v.y = e.vy),
                    e.hasOwnProperty("ax") && (t.a.x = e.ax),
                    e.hasOwnProperty("ay") && (t.a.y = e.ay),
                    e.hasOwnProperty("p") && particle.p.copy(e.p),
                    e.hasOwnProperty("v") && particle.v.copy(e.v),
                    e.hasOwnProperty("a") && particle.a.copy(e.a),
                    e.hasOwnProperty("position") && particle.p.copy(e.position),
                    e.hasOwnProperty("velocity") && particle.v.copy(e.velocity),
                    e.hasOwnProperty("accelerate") && particle.a.copy(e.accelerate)
                },
                addPrototypeByObject: function(t, e, i) {
                    for (var r in e)
                        i ? i.indexOf(r) < 0 && (t[r] = Y.Util.getSpanValue(e[r])) : t[r] = Y.Util.getSpanValue(e[r]);
                    return t
                },
                setPrototypeByObject: function(t, e, i) {
                    for (var r in e)
                        t.hasOwnProperty(r) && (i ? i.indexOf(r) < 0 && (t[r] = Y.Util.getSpanValue(e[r])) : t[r] = Y.Util.getSpanValue(e[r]));
                    return t
                },
                setSpanValue: function(t, e, i) {
                    return t instanceof Y.Span ? t : e ? i ? new Y.Span(t,e,i) : new Y.Span(t,e) : new Y.Span(t)
                },
                getSpanValue: function(t) {
                    return t instanceof Y.Span ? t.getValue() : t
                },
                inherits: function(t, e) {
                    if (t._super_ = e,
                    s.default)
                        t.prototype = (0,
                        s.default)(e.prototype, {
                            constructor: {
                                value: e
                            }
                        });
                    else {
                        var i = function() {};
                        i.prototype = e.prototype,
                        t.prototype = new i,
                        t.prototype.constructor = t
                    }
                },
                getImageData: function(t, e, i) {
                    t.drawImage(e, i.x, i.y);
                    var r = t.getImageData(i.x, i.y, i.width, i.height);
                    return t.clearRect(i.x, i.y, i.width, i.height),
                    r
                },
                getImage: function(t, e, i, r) {
                    "string" == typeof t ? this.loadAndSetImage(t, e, i, r) : "object" == (void 0 === t ? "undefined" : (0,
                    o.default)(t)) ? this.loadAndSetImage(t.src, e, i, r) : t instanceof Image && this.loadedImage(t.src, e, i, r, t)
                },
                loadedImage: function(t, e, i, r, n) {
                    if (e.target = n,
                    e.transform.src = t,
                    Y.TextureBuffer[t] || (Y.TextureBuffer[t] = e.target),
                    i)
                        if (Y.TextureCanvasBuffer[t])
                            e.transform.canvas = Y.TextureCanvasBuffer[t];
                        else {
                            var s = Y.WebGLUtil.nhpot(e.target.width)
                              , a = Y.WebGLUtil.nhpot(e.target.height);
                            e.transform.canvas = Y.DomUtil.createCanvas("canvas" + t, s, a);
                            var o = e.transform.canvas.getContext("2d");
                            o.drawImage(e.target, 0, 0, e.target.width, e.target.height),
                            Y.TextureCanvasBuffer[t] = e.transform.canvas
                        }
                    r && r(e)
                },
                loadAndSetImage: function(t, e, i, r) {
                    if (Y.TextureBuffer[t])
                        this.loadedImage(t, e, i, r, Y.TextureBuffer[t]);
                    else {
                        var n = this
                          , s = new Image;
                        s.onload = function(s) {
                            n.loadedImage(t, e, i, r, s.target)
                        }
                        ,
                        s.src = t
                    }
                },
                hexToRGB: function(t) {
                    var e = "#" == t.charAt(0) ? t.substring(1, 7) : t;
                    return {
                        r: parseInt(e.substring(0, 2), 16),
                        g: parseInt(e.substring(2, 4), 16),
                        b: parseInt(e.substring(4, 6), 16)
                    }
                },
                rgbToHex: function(t) {
                    return "rgb(" + t.r + ", " + t.g + ", " + t.b + ")"
                }
            };
            Y.Util = $;
            var K = K || {
                ipot: function(t) {
                    return 0 == (t & t - 1)
                },
                nhpot: function(t) {
                    --t;
                    for (var e = 1; e < 32; e <<= 1)
                        t |= t >> e;
                    return t + 1
                },
                makeTranslation: function(t, e) {
                    return [1, 0, 0, 0, 1, 0, t, e, 1]
                },
                makeRotation: function(t) {
                    var e = Math.cos(t)
                      , i = Math.sin(t);
                    return [e, -i, 0, i, e, 0, 0, 0, 1]
                },
                makeScale: function(t, e) {
                    return [t, 0, 0, 0, e, 0, 0, 0, 1]
                },
                matrixMultiply: function(t, e) {
                    var i = t[0]
                      , r = t[1]
                      , n = t[2]
                      , s = t[3]
                      , a = t[4]
                      , o = t[5]
                      , h = t[6]
                      , l = t[7]
                      , u = t[8]
                      , c = e[0]
                      , p = e[1]
                      , d = e[2]
                      , f = e[3]
                      , m = e[4]
                      , g = e[5]
                      , y = e[6]
                      , v = e[7]
                      , x = e[8];
                    return [i * c + r * f + n * y, i * p + r * m + n * v, i * d + r * g + n * x, s * c + a * f + o * y, s * p + a * m + o * v, s * d + a * g + o * x, h * c + l * f + u * y, h * p + l * m + u * v, h * d + l * g + u * x]
                }
            };
            Y.WebGLUtil = K;
            var J = J || {
                createCanvas: function(t, e, i, r) {
                    var n = document.createElement("canvas")
                      , s = r || "absolute";
                    return n.id = t,
                    n.width = e,
                    n.height = i,
                    n.style.position = s,
                    n.style.opacity = 0,
                    this.transformDom(n, -500, -500, 0, 0),
                    n
                },
                transformDom: function(t, e, i, r, n) {
                    t.style.WebkitTransform = "translate(" + e + "px, " + i + "px) scale(" + r + ") rotate(" + n + "deg)",
                    t.style.MozTransform = "translate(" + e + "px, " + i + "px) scale(" + r + ") rotate(" + n + "deg)",
                    t.style.OTransform = "translate(" + e + "px, " + i + "px) scale(" + r + ") rotate(" + n + "deg)",
                    t.style.msTransform = "translate(" + e + "px, " + i + "px) scale(" + r + ") rotate(" + n + "deg)",
                    t.style.transform = "translate(" + e + "px, " + i + "px) scale(" + r + ") rotate(" + n + "deg)"
                }
            };
            Y.DomUtil = J,
            X.prototype.set = function(t, e) {
                0 == e ? Y.Mat3.set(t, this.mats[0]) : Y.Mat3.multiply(this.mats[e - 1], t, this.mats[e]),
                this.size = Math.max(this.size, e + 1)
            }
            ,
            X.prototype.push = function(t) {
                0 == this.size ? Y.Mat3.set(t, this.mats[0]) : Y.Mat3.multiply(this.mats[this.size - 1], t, this.mats[this.size]),
                this.size++
            }
            ,
            X.prototype.pop = function() {
                this.size > 0 && this.size--
            }
            ,
            X.prototype.top = function() {
                return this.mats[this.size - 1]
            }
            ,
            Y.MStack = X,
            Q.ID = 0,
            Q.prototype = {
                getDirection: function() {
                    return Math.atan2(this.v.x, -this.v.y) * (180 / Math.PI)
                },
                reset: function(t) {
                    return this.life = 1 / 0,
                    this.age = 0,
                    this.energy = 1,
                    this.dead = !1,
                    this.sleep = !1,
                    this.target = null,
                    this.sprite = null,
                    this.parent = null,
                    this.mass = 1,
                    this.radius = 10,
                    this.alpha = 1,
                    this.scale = 1,
                    this.rotation = 0,
                    this.color = null,
                    this.easing = Y.ease.setEasingByName(Y.easeLinear),
                    t ? (this.transform = {},
                    this.p = new Y.Vector2D,
                    this.v = new Y.Vector2D,
                    this.a = new Y.Vector2D,
                    this.old = {
                        p: new Y.Vector2D,
                        v: new Y.Vector2D,
                        a: new Y.Vector2D
                    },
                    this.behaviours = []) : (Y.Util.destroyObject(this.transform),
                    this.p.set(0, 0),
                    this.v.set(0, 0),
                    this.a.set(0, 0),
                    this.old.p.set(0, 0),
                    this.old.v.set(0, 0),
                    this.old.a.set(0, 0),
                    this.removeAllBehaviours()),
                    this.transform.rgb = {
                        r: 255,
                        g: 255,
                        b: 255
                    },
                    this
                },
                update: function(t, e) {
                    if (!this.sleep) {
                        this.age += t;
                        var i, r = this.behaviours.length;
                        for (i = 0; i < r; i++)
                            this.behaviours[i] && this.behaviours[i].applyBehaviour(this, t, e)
                    }
                    if (this.age >= this.life)
                        this.destory();
                    else {
                        var n = this.easing(this.age / this.life);
                        this.energy = Math.max(1 - n, 0)
                    }
                },
                addBehaviour: function(t) {
                    this.behaviours.push(t),
                    t.hasOwnProperty("parents") && t.parents.push(this),
                    t.initialize(this)
                },
                addBehaviours: function(t) {
                    var e, i = t.length;
                    for (e = 0; e < i; e++)
                        this.addBehaviour(t[e])
                },
                removeBehaviour: function(t) {
                    var e = this.behaviours.indexOf(t);
                    if (e > -1) {
                        var t = this.behaviours.splice(e, 1);
                        t.parents = null
                    }
                },
                removeAllBehaviours: function() {
                    Y.Util.destroyArray(this.behaviours)
                },
                destory: function() {
                    this.removeAllBehaviours(),
                    this.energy = 0,
                    this.dead = !0,
                    this.parent = null
                }
            },
            Y.Particle = Q,
            W.prototype = {
                create: function(t) {
                    return t ? new newTypeParticle : new Y.Particle
                },
                getCount: function() {
                    return this.poolList.length
                },
                add: function() {
                    return this.poolList.push(this.create())
                },
                get: function() {
                    return 0 === this.poolList.length ? this.create() : this.poolList.pop().reset()
                },
                set: function(t) {
                    if (this.poolList.length < Y.POOL_MAX)
                        return this.poolList.push(t)
                },
                release: function() {
                    for (var t = 0; t < this.poolList.length; t++)
                        this.poolList[t].destory && this.poolList[t].destory(),
                        delete this.poolList[t];
                    this.poolList = []
                }
            },
            Y.ParticlePool = W;
            var tt = {
                randomAToB: function(t, e, i) {
                    return i ? Math.floor(Math.random() * (e - t)) + t : t + Math.random() * (e - t)
                },
                randomFloating: function(t, e, i) {
                    return tt.randomAToB(t - e, t + e, i)
                },
                randomZone: function(t) {},
                degreeTransform: function(t) {
                    return t * Math.PI / 180
                },
                toColor16: function(t) {
                    return "#" + t.toString(16)
                },
                randomColor: function() {
                    return "#" + ("00000" + (16777216 * Math.random() << 0).toString(16)).slice(-6)
                }
            };
            Y.MathUtils = tt;
            var et = function(t) {
                this.type = Y.Util.initValue(t, Y.EULER)
            };
            et.prototype = {
                integrate: function(t, e, i) {
                    this.eulerIntegrate(t, e, i)
                },
                eulerIntegrate: function(t, e, i) {
                    t.sleep || (t.old.p.copy(t.p),
                    t.old.v.copy(t.v),
                    t.a.multiplyScalar(1 / t.mass),
                    t.v.add(t.a.multiplyScalar(e)),
                    t.p.add(t.old.v.multiplyScalar(e)),
                    i && t.v.multiplyScalar(i),
                    t.a.clear())
                }
            },
            Y.NumericalIntegration = et;
            var it = function(t, e) {
                this.x = t || 0,
                this.y = e || 0
            };
            it.prototype = {
                set: function(t, e) {
                    return this.x = t,
                    this.y = e,
                    this
                },
                setX: function(t) {
                    return this.x = t,
                    this
                },
                setY: function(t) {
                    return this.y = t,
                    this
                },
                setComponent: function(t, e) {
                    switch (t) {
                    case 0:
                        this.x = e;
                        break;
                    case 1:
                        this.y = e;
                        break;
                    default:
                        throw new Error("index is out of range: " + t)
                    }
                },
                getGradient: function() {
                    return 0 != this.x ? Math.atan2(this.y, this.x) : this.y > 0 ? Math.PI / 2 : this.y < 0 ? -Math.PI / 2 : void 0
                },
                getComponent: function(t) {
                    switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    default:
                        throw new Error("index is out of range: " + t)
                    }
                },
                copy: function(t) {
                    return this.x = t.x,
                    this.y = t.y,
                    this
                },
                add: function(t, i) {
                    return i !== e ? this.addVectors(t, i) : (this.x += t.x,
                    this.y += t.y,
                    this)
                },
                addXY: function(t, e) {
                    return this.x += t,
                    this.y += e,
                    this
                },
                addVectors: function(t, e) {
                    return this.x = t.x + e.x,
                    this.y = t.y + e.y,
                    this
                },
                addScalar: function(t) {
                    return this.x += t,
                    this.y += t,
                    this
                },
                sub: function(t, i) {
                    return i !== e ? this.subVectors(t, i) : (this.x -= t.x,
                    this.y -= t.y,
                    this)
                },
                subVectors: function(t, e) {
                    return this.x = t.x - e.x,
                    this.y = t.y - e.y,
                    this
                },
                multiplyScalar: function(t) {
                    return this.x *= t,
                    this.y *= t,
                    this
                },
                divideScalar: function(t) {
                    return 0 !== t ? (this.x /= t,
                    this.y /= t) : this.set(0, 0),
                    this
                },
                min: function(t) {
                    return this.x > t.x && (this.x = t.x),
                    this.y > t.y && (this.y = t.y),
                    this
                },
                max: function(t) {
                    return this.x < t.x && (this.x = t.x),
                    this.y < t.y && (this.y = t.y),
                    this
                },
                clamp: function(t, e) {
                    return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x),
                    this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y),
                    this
                },
                negate: function() {
                    return this.multiplyScalar(-1)
                },
                dot: function(t) {
                    return this.x * t.x + this.y * t.y
                },
                lengthSq: function() {
                    return this.x * this.x + this.y * this.y
                },
                length: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                normalize: function() {
                    return this.divideScalar(this.length())
                },
                distanceTo: function(t) {
                    return Math.sqrt(this.distanceToSquared(t))
                },
                rotate: function(t) {
                    var e = this.x
                      , i = this.y;
                    return this.x = e * Math.cos(t) + i * Math.sin(t),
                    this.y = -e * Math.sin(t) + i * Math.cos(t),
                    this
                },
                distanceToSquared: function(t) {
                    var e = this.x - t.x
                      , i = this.y - t.y;
                    return e * e + i * i
                },
                setLength: function(t) {
                    var e = this.length();
                    return 0 !== e && t !== e && this.multiplyScalar(t / e),
                    this
                },
                lerp: function(t, e) {
                    return this.x += (t.x - this.x) * e,
                    this.y += (t.y - this.y) * e,
                    this
                },
                equals: function(t) {
                    return t.x === this.x && t.y === this.y
                },
                toArray: function() {
                    return [this.x, this.y]
                },
                clear: function() {
                    return this.x = 0,
                    this.y = 0,
                    this
                },
                clone: function() {
                    return new Y.Vector2D(this.x,this.y)
                }
            },
            Y.Vector2D = it;
            var rt = function(t, e) {
                this.r = Math.abs(t) || 0,
                this.tha = e || 0
            };
            rt.prototype = {
                set: function(t, e) {
                    return this.r = t,
                    this.tha = e,
                    this
                },
                setR: function(t) {
                    return this.r = t,
                    this
                },
                setTha: function(t) {
                    return this.tha = t,
                    this
                },
                copy: function(t) {
                    return this.r = t.r,
                    this.tha = t.tha,
                    this
                },
                toVector: function() {
                    return new Y.Vector2D(this.getX(),this.getY())
                },
                getX: function() {
                    return this.r * Math.sin(this.tha)
                },
                getY: function() {
                    return -this.r * Math.cos(this.tha)
                },
                normalize: function() {
                    return this.r = 1,
                    this
                },
                equals: function(t) {
                    return t.r === this.r && t.tha === this.tha
                },
                toArray: function() {
                    return [this.r, this.tha]
                },
                clear: function() {
                    return this.r = 0,
                    this.tha = 0,
                    this
                },
                clone: function() {
                    return new Y.Polar2D(this.r,this.tha)
                }
            },
            Y.Polar2D = rt,
            q.prototype = {
                getValue: function(t) {
                    return this.isArray ? this.a[Math.floor(this.a.length * Math.random())] : this.center ? Y.MathUtils.randomFloating(this.a, this.b, t) : Y.MathUtils.randomAToB(this.a, this.b, t)
                }
            },
            Y.Span = q,
            Y.getSpan = function(t, e, i) {
                return new Y.Span(t,e,i)
            }
            ,
            Y.Util.inherits(N, Y.Span),
            N.prototype.getValue = function() {
                var t = this.colorArr[Math.floor(this.colorArr.length * Math.random())];
                return "random" == t || "Random" == t ? Y.MathUtils.randomColor() : t
            }
            ,
            Y.ColorSpan = N,
            G.prototype = {
                contains: function(t, e) {
                    return t <= this.right && t >= this.x && e <= this.bottom && e >= this.y
                }
            },
            Y.Rectangle = G;
            var nt = nt || {
                create: function(t) {
                    var e = new Float32Array(9);
                    return t && this.set(t, e),
                    e
                },
                set: function(t, e) {
                    for (var i = 0; i < 9; i++)
                        e[i] = t[i];
                    return e
                },
                multiply: function(t, e, i) {
                    var r = t[0]
                      , n = t[1]
                      , s = t[2]
                      , a = t[3]
                      , o = t[4]
                      , h = t[6]
                      , l = t[7]
                      , u = e[0]
                      , c = e[1]
                      , p = e[2]
                      , d = e[3]
                      , f = e[4]
                      , m = e[6]
                      , g = e[7];
                    return i[0] = u * r + c * a,
                    i[1] = u * n + c * o,
                    i[2] = s * p,
                    i[3] = d * r + f * a,
                    i[4] = d * n + f * o,
                    i[6] = m * r + g * a + h,
                    i[7] = m * n + g * o + l,
                    i
                },
                inverse: function(t, e) {
                    var i, r = t[0], n = t[1], s = t[3], a = t[4], o = t[6], h = t[7], l = a, u = -s, c = h * s - a * o, p = r * l + n * u;
                    return i = 1 / p,
                    e[0] = l * i,
                    e[1] = -n * i,
                    e[3] = u * i,
                    e[4] = r * i,
                    e[6] = c * i,
                    e[7] = (-h * r + n * o) * i,
                    e
                },
                multiplyVec2: function(t, e, i) {
                    var r = e[0]
                      , n = e[1];
                    return i[0] = r * t[0] + n * t[3] + t[6],
                    i[1] = r * t[1] + n * t[4] + t[7],
                    i
                }
            };
            Y.Mat3 = nt,
            F.id = 0,
            F.prototype = {
                reset: function(t, e) {
                    this.life = Y.Util.initValue(t, 1 / 0),
                    this.easing = Y.Util.initValue(e, Y.ease.setEasingByName(Y.easeLinear))
                },
                normalizeForce: function(t) {
                    return t.multiplyScalar(Y.MEASURE)
                },
                normalizeValue: function(t) {
                    return t * Y.MEASURE
                },
                initialize: function(t) {},
                applyBehaviour: function(t, e, i) {
                    if (this.age += e,
                    this.age >= this.life || this.dead)
                        this.energy = 0,
                        this.dead = !0,
                        this.destory();
                    else {
                        var r = this.easing(t.age / t.life);
                        this.energy = Math.max(1 - r, 0)
                    }
                },
                destory: function() {
                    var t, e = this.parents.length;
                    for (t = 0; t < e; t++)
                        this.parents[t].removeBehaviour(this);
                    this.parents = []
                }
            },
            Y.Behaviour = F,
            k.prototype = {
                init: function() {
                    this.startTime = 0,
                    this.nextTime = this.timePan.getValue()
                },
                getValue: function(t) {
                    return this.startTime += t,
                    this.startTime >= this.nextTime ? (this.startTime = 0,
                    this.nextTime = this.timePan.getValue(),
                    1 == this.numPan.b ? this.numPan.getValue(!1) > .5 ? 1 : 0 : this.numPan.getValue(!0)) : 0
                }
            },
            Y.Rate = k,
            z.prototype.reset = function() {}
            ,
            z.prototype.init = function(t, e) {
                e ? this.initialize(e) : this.initialize(t)
            }
            ,
            z.prototype.initialize = function(t) {}
            ,
            Y.Initialize = z;
            var st = {
                initialize: function(t, e, i) {
                    var r, n = i.length;
                    for (r = 0; r < n; r++)
                        i[r]instanceof Y.Initialize ? i[r].init(t, e) : Y.InitializeUtil.init(t, e, i[r]);
                    Y.InitializeUtil.bindEmitter(t, e)
                },
                init: function(t, e, i) {
                    Y.Util.setPrototypeByObject(e, i),
                    Y.Util.setVector2DByObject(e, i)
                },
                bindEmitter: function(t, e) {
                    t.bindEmitter && (e.p.add(t.p),
                    e.v.add(t.v),
                    e.a.add(t.a),
                    e.v.rotate(Y.MathUtils.degreeTransform(t.rotation)))
                }
            };
            Y.InitializeUtil = st,
            Y.Util.inherits(L, Y.Initialize),
            L.prototype.initialize = function(t) {
                this.lifePan.a == 1 / 0 ? t.life = 1 / 0 : t.life = this.lifePan.getValue()
            }
            ,
            Y.Life = L,
            Y.Util.inherits(O, Y.Initialize),
            O.prototype.reset = function(t) {
                this.zone = Y.Util.initValue(t, new Y.PointZone)
            }
            ,
            O.prototype.initialize = function(t) {
                this.zone.getPosition(),
                t.p.x = this.zone.vector.x,
                t.p.y = this.zone.vector.y
            }
            ,
            Y.Position = O,
            Y.P = O,
            Y.Util.inherits(D, Y.Initialize),
            D.prototype.reset = function(t, e, i) {
                this.rPan = Y.Util.setSpanValue(t),
                this.thaPan = Y.Util.setSpanValue(e),
                this.type = Y.Util.initValue(i, "vector")
            }
            ,
            D.prototype.normalizeVelocity = function(t) {
                return t * Y.MEASURE
            }
            ,
            D.prototype.initialize = function(t) {
                if ("p" == this.type || "P" == this.type || "polar" == this.type) {
                    var e = new Y.Polar2D(this.normalizeVelocity(this.rPan.getValue()),this.thaPan.getValue() * Math.PI / 180);
                    t.v.x = e.getX(),
                    t.v.y = e.getY()
                } else
                    t.v.x = this.normalizeVelocity(this.rPan.getValue()),
                    t.v.y = this.normalizeVelocity(this.thaPan.getValue())
            }
            ,
            Y.Velocity = D,
            Y.V = D,
            Y.Util.inherits(V, Y.Initialize),
            V.prototype.initialize = function(t) {
                t.mass = this.massPan.getValue()
            }
            ,
            Y.Mass = V,
            Y.Util.inherits(M, Y.Initialize),
            M.prototype.reset = function(t, e, i) {
                this.radius = Y.Util.setSpanValue(t, e, i)
            }
            ,
            M.prototype.initialize = function(t) {
                t.radius = this.radius.getValue(),
                t.transform.oldRadius = t.radius
            }
            ,
            Y.Radius = M,
            Y.Util.inherits(C, Y.Initialize),
            C.prototype.initialize = function(t) {
                var e = this.image.getValue();
                t.target = "string" == typeof e ? {
                    width: this.w,
                    height: this.h,
                    src: e
                } : e
            }
            ,
            C.prototype.setSpanValue = function(t) {
                return t instanceof Y.ColorSpan ? t : new Y.ColorSpan(t)
            }
            ,
            Y.ImageTarget = C,
            Y.Util.inherits(B, Y.Behaviour),
            B.prototype.reset = function(t, e, i, r) {
                this.force = this.normalizeForce(new Y.Vector2D(t,e)),
                i && B._super_.prototype.reset.call(this, i, r)
            }
            ,
            B.prototype.applyBehaviour = function(t, e, i) {
                B._super_.prototype.applyBehaviour.call(this, t, e, i),
                t.a.add(this.force)
            }
            ,
            Y.Force = B,
            Y.F = B,
            Y.Util.inherits(S, Y.Behaviour),
            S.prototype.reset = function(t, e, i, r, n) {
                this.targetPosition = Y.Util.initValue(t, new Y.Vector2D),
                this.radius = Y.Util.initValue(i, 1e3),
                this.force = Y.Util.initValue(this.normalizeValue(e), 100),
                this.radiusSq = this.radius * this.radius,
                this.attractionForce = new Y.Vector2D,
                this.lengthSq = 0,
                r && S._super_.prototype.reset.call(this, r, n)
            }
            ,
            S.prototype.applyBehaviour = function(t, e, i) {
                S._super_.prototype.applyBehaviour.call(this, t, e, i),
                this.attractionForce.copy(this.targetPosition),
                this.attractionForce.sub(t.p),
                this.lengthSq = this.attractionForce.lengthSq(),
                this.lengthSq > 4e-6 && this.lengthSq < this.radiusSq && (this.attractionForce.normalize(),
                this.attractionForce.multiplyScalar(1 - this.lengthSq / this.radiusSq),
                this.attractionForce.multiplyScalar(this.force),
                t.a.add(this.attractionForce))
            }
            ,
            Y.Attraction = S,
            Y.Util.inherits(A, Y.Behaviour),
            A.prototype.reset = function(t, e, i, r, n) {
                this.panFoce = new Y.Vector2D(t,e),
                this.panFoce = this.normalizeForce(this.panFoce),
                this.delay = i,
                r && A._super_.prototype.reset.call(this, r, n)
            }
            ,
            A.prototype.applyBehaviour = function(t, e, i) {
                A._super_.prototype.applyBehaviour.call(this, t, e, i),
                this.time += e,
                this.time >= this.delay && (t.a.addXY(Y.MathUtils.randomAToB(-this.panFoce.x, this.panFoce.x), Y.MathUtils.randomAToB(-this.panFoce.y, this.panFoce.y)),
                this.time = 0)
            }
            ,
            Y.RandomDrift = A,
            Y.Util.inherits(R, Y.Attraction),
            R.prototype.reset = function(t, e, i, r, n) {
                R._super_.prototype.reset.call(this, t, e, i, r, n),
                this.force *= -1
            }
            ,
            Y.Repulsion = R,
            Y.Util.inherits(T, Y.Force),
            T.prototype.reset = function(t, e, i) {
                T._super_.prototype.reset.call(this, 0, t, e, i)
            }
            ,
            Y.Gravity = T,
            Y.G = T,
            Y.Util.inherits(I, Y.Behaviour),
            I.prototype.reset = function(t, e, i, r, n) {
                this.emitter = Y.Util.initValue(t, null),
                this.mass = Y.Util.initValue(e, !0),
                this.callback = Y.Util.initValue(i, null),
                this.collisionPool = [],
                this.delta = new Y.Vector2D,
                r && I._super_.prototype.reset.call(this, r, n)
            }
            ,
            I.prototype.applyBehaviour = function(t, e, i) {
                for (var r, n, s, a, o, h = this.emitter ? this.emitter.particles.slice(i) : this.pool.slice(i), l = h.length, u = 0; u < l; u++)
                    (r = h[u]) !== t && (this.delta.copy(r.p),
                    this.delta.sub(t.p),
                    n = this.delta.lengthSq(),
                    distance = t.radius + r.radius,
                    n <= distance * distance && (s = distance - Math.sqrt(n),
                    s += .5,
                    totalMass = t.mass + r.mass,
                    a = this.mass ? r.mass / totalMass : .5,
                    o = this.mass ? t.mass / totalMass : .5,
                    t.p.add(this.delta.clone().normalize().multiplyScalar(s * -a)),
                    r.p.add(this.delta.normalize().multiplyScalar(s * o)),
                    this.callback && this.callback(t, r)))
            }
            ,
            Y.Collision = I,
            Y.Util.inherits(U, Y.Behaviour),
            U.prototype.reset = function(t, e, i, r) {
                this.zone = t,
                this.zone.crossType = Y.Util.initValue(e, "dead"),
                i && U._super_.prototype.reset.call(this, i, r)
            }
            ,
            U.prototype.applyBehaviour = function(t, e, i) {
                U._super_.prototype.applyBehaviour.call(this, t, e, i),
                this.zone.crossing(t)
            }
            ,
            Y.CrossZone = U,
            Y.Util.inherits(b, Y.Behaviour),
            b.prototype.reset = function(t, i, r, n) {
                this.same = null == i || i == e,
                this.a = Y.Util.setSpanValue(Y.Util.initValue(t, 1)),
                this.b = Y.Util.setSpanValue(i),
                r && b._super_.prototype.reset.call(this, r, n)
            }
            ,
            b.prototype.initialize = function(t) {
                t.transform.alphaA = this.a.getValue(),
                this.same ? t.transform.alphaB = t.transform.alphaA : t.transform.alphaB = this.b.getValue()
            }
            ,
            b.prototype.applyBehaviour = function(t, e, i) {
                b._super_.prototype.applyBehaviour.call(this, t, e, i),
                t.alpha = t.transform.alphaB + (t.transform.alphaA - t.transform.alphaB) * this.energy,
                t.alpha < .001 && (t.alpha = 0)
            }
            ,
            Y.Alpha = b,
            Y.Util.inherits(_, Y.Behaviour),
            _.prototype.reset = function(t, i, r, n) {
                this.same = null == i || i == e,
                this.a = Y.Util.setSpanValue(Y.Util.initValue(t, 1)),
                this.b = Y.Util.setSpanValue(i),
                r && _._super_.prototype.reset.call(this, r, n)
            }
            ,
            _.prototype.initialize = function(t) {
                t.transform.scaleA = this.a.getValue(),
                t.transform.oldRadius = t.radius,
                this.same ? t.transform.scaleB = t.transform.scaleA : t.transform.scaleB = this.b.getValue()
            }
            ,
            _.prototype.applyBehaviour = function(t, e, i) {
                _._super_.prototype.applyBehaviour.call(this, t, e, i),
                t.scale = t.transform.scaleB + (t.transform.scaleA - t.transform.scaleB) * this.energy,
                t.scale < 1e-4 && (t.scale = 0),
                t.radius = t.transform.oldRadius * t.scale
            }
            ,
            Y.Scale = _,
            Y.Util.inherits(E, Y.Behaviour),
            E.prototype.reset = function(t, i, r, n, s) {
                this.same = null == i || i == e,
                this.a = Y.Util.setSpanValue(Y.Util.initValue(t, "Velocity")),
                this.b = Y.Util.setSpanValue(Y.Util.initValue(i, 0)),
                this.style = Y.Util.initValue(r, "to"),
                n && E._super_.prototype.reset.call(this, n, s)
            }
            ,
            E.prototype.initialize = function(t) {
                t.rotation = this.a.getValue(),
                t.transform.rotationA = this.a.getValue(),
                this.same || (t.transform.rotationB = this.b.getValue())
            }
            ,
            E.prototype.applyBehaviour = function(t, e, i) {
                E._super_.prototype.applyBehaviour.call(this, t, e, i),
                this.same ? "V" != this.a.a && "Velocity" != this.a.a && "v" != this.a.a || (t.rotation = t.getDirection()) : "to" == this.style || "TO" == this.style || "_" == this.style ? t.rotation += t.transform.rotationB + (t.transform.rotationA - t.transform.rotationB) * this.energy : t.rotation += t.transform.rotationB
            }
            ,
            Y.Rotate = E,
            Y.Util.inherits(w, Y.Behaviour),
            w.prototype.reset = function(t, e, i, r) {
                this.color1 = this.setSpanValue(t),
                this.color2 = this.setSpanValue(e),
                i && w._super_.prototype.reset.call(this, i, r)
            }
            ,
            w.prototype.initialize = function(t) {
                t.color = this.color1.getValue(),
                t.transform.beginRGB = Y.Util.hexToRGB(t.color),
                this.color2 && (t.transform.endRGB = Y.Util.hexToRGB(this.color2.getValue()))
            }
            ,
            w.prototype.applyBehaviour = function(t, e, i) {
                this.color2 ? (w._super_.prototype.applyBehaviour.call(this, t, e, i),
                t.transform.rgb.r = t.transform.endRGB.r + (t.transform.beginRGB.r - t.transform.endRGB.r) * this.energy,
                t.transform.rgb.g = t.transform.endRGB.g + (t.transform.beginRGB.g - t.transform.endRGB.g) * this.energy,
                t.transform.rgb.b = t.transform.endRGB.b + (t.transform.beginRGB.b - t.transform.endRGB.b) * this.energy,
                t.transform.rgb.r = parseInt(t.transform.rgb.r, 10),
                t.transform.rgb.g = parseInt(t.transform.rgb.g, 10),
                t.transform.rgb.b = parseInt(t.transform.rgb.b, 10)) : (t.transform.rgb.r = t.transform.beginRGB.r,
                t.transform.rgb.g = t.transform.beginRGB.g,
                t.transform.rgb.b = t.transform.beginRGB.b)
            }
            ,
            w.prototype.setSpanValue = function(t) {
                return t ? t instanceof Y.ColorSpan ? t : new Y.ColorSpan(t) : null
            }
            ,
            Y.Color = w,
            Y.Util.inherits(P, Y.Behaviour),
            P.prototype.reset = function(t, e, i, r) {
                this.distanceVec = new Y.Vector2D,
                this.centerPoint = Y.Util.initValue(t, new Y.Vector2D),
                this.force = Y.Util.initValue(this.normalizeValue(e), 100),
                i && P._super_.prototype.reset.call(this, i, r)
            }
            ,
            P.prototype.initialize = function(t) {}
            ,
            P.prototype.applyBehaviour = function(t, e, i) {
                this.distanceVec.set(this.centerPoint.x - t.p.x, this.centerPoint.y - t.p.y);
                var r = this.distanceVec.lengthSq();
                if (0 != r) {
                    var n = this.distanceVec.length()
                      , s = this.force * e / (r * n);
                    t.v.x += s * this.distanceVec.x,
                    t.v.y += s * this.distanceVec.y
                }
            }
            ,
            Y.GravityWell = P,
            x.ID = 0,
            Y.Util.inherits(x, Y.Particle),
            Y.EventDispatcher.initialize(x.prototype),
            x.prototype.emit = function(t, e) {
                this.emitTime = 0,
                this.emitTotalTimes = Y.Util.initValue(t, 1 / 0),
                1 == e || "life" == e || "destroy" == e ? this.life = "once" == t ? 1 : this.emitTotalTimes : isNaN(e) || (this.life = e),
                this.rate.init()
            }
            ,
            x.prototype.stopEmit = function() {
                this.emitTotalTimes = -1,
                this.emitTime = 0
            }
            ,
            x.prototype.removeAllParticles = function() {
                for (var t = 0; t < this.particles.length; t++)
                    this.particles[t].dead = !0
            }
            ,
            x.prototype.createParticle = function(t, e) {
                var i = Y.pool.get();
                return this.setupParticle(i, t, e),
                this.dispatchEvent(new Y.Event({
                    type: Y.PARTICLE_CREATED,
                    particle: i
                })),
                i
            }
            ,
            x.prototype.addSelfInitialize = function(t) {
                t.init ? t.init(this) : this.initAll()
            }
            ,
            x.prototype.addInitialize = function() {
                var t, e = arguments.length;
                for (t = 0; t < e; t++)
                    this.initializes.push(arguments[t])
            }
            ,
            x.prototype.removeInitialize = function(t) {
                var e = this.initializes.indexOf(t);
                e > -1 && this.initializes.splice(e, 1)
            }
            ,
            x.prototype.removeInitializers = function() {
                Y.Util.destroyArray(this.initializes)
            }
            ,
            x.prototype.addBehaviour = function() {
                var t, e = arguments.length;
                for (t = 0; t < e; t++)
                    this.behaviours.push(arguments[t]),
                    arguments[t].hasOwnProperty("parents") && arguments[t].parents.push(this)
            }
            ,
            x.prototype.removeBehaviour = function(t) {
                var e = this.behaviours.indexOf(t);
                e > -1 && this.behaviours.splice(e, 1)
            }
            ,
            x.prototype.removeAllBehaviours = function() {
                Y.Util.destroyArray(this.behaviours)
            }
            ,
            x.prototype.integrate = function(t) {
                var e = 1 - this.damping;
                Y.integrator.integrate(this, t, e);
                var i, r = this.particles.length;
                for (i = 0; i < r; i++) {
                    var n = this.particles[i];
                    n.update(t, i),
                    Y.integrator.integrate(n, t, e),
                    this.dispatchEvent(new Y.Event({
                        type: Y.PARTICLE_UPDATE,
                        particle: n
                    }))
                }
            }
            ,
            x.prototype.emitting = function(t) {
                if ("once" == this.emitTotalTimes) {
                    var e, i = this.rate.getValue(99999);
                    for (e = 0; e < i; e++)
                        this.createParticle();
                    this.emitTotalTimes = "none"
                } else if (!isNaN(this.emitTotalTimes) && (this.emitTime += t,
                this.emitTime < this.emitTotalTimes)) {
                    var e, i = this.rate.getValue(t);
                    for (e = 0; e < i; e++)
                        this.createParticle()
                }
            }
            ,
            x.prototype.update = function(t) {
                this.age += t,
                (this.age >= this.life || this.dead) && this.destroy(),
                this.emitting(t),
                this.integrate(t);
                var e, i, r = this.particles.length;
                for (i = r - 1; i >= 0; i--)
                    e = this.particles[i],
                    e.dead && (Y.pool.set(e),
                    this.particles.splice(i, 1),
                    this.dispatchEvent(new Y.Event({
                        type: Y.PARTICLE_DEAD,
                        particle: e
                    })))
            }
            ,
            x.prototype.setupParticle = function(t, e, i) {
                var r = this.initializes
                  , n = this.behaviours;
                e && (r = e instanceof Array ? e : [e]),
                i && (n = i instanceof Array ? i : [i]),
                Y.InitializeUtil.initialize(this, t, r),
                t.addBehaviours(n),
                t.parent = this,
                this.particles.push(t)
            }
            ,
            x.prototype.destroy = function() {
                this.dead = !0,
                this.emitTotalTimes = -1,
                0 == this.particles.length && (this.removeInitializers(),
                this.removeAllBehaviours(),
                this.parent && this.parent.removeEmitter(this))
            }
            ,
            Y.Emitter = x,
            Y.Util.inherits(v, Y.Emitter),
            v.prototype.addSelfBehaviour = function() {
                var t, e = arguments.length;
                for (t = 0; t < e; t++)
                    this.selfBehaviours.push(arguments[t])
            }
            ,
            v.prototype.removeSelfBehaviour = function(t) {
                var e = this.selfBehaviours.indexOf(t);
                e > -1 && this.selfBehaviours.splice(e, 1)
            }
            ,
            v.prototype.update = function(t) {
                if (v._super_.prototype.update.call(this, t),
                !this.sleep) {
                    var e, i = this.selfBehaviours.length;
                    for (e = 0; e < i; e++)
                        this.selfBehaviours[e].applyBehaviour(this, t, e)
                }
            }
            ,
            Y.BehaviourEmitter = v,
            Y.Util.inherits(y, Y.Emitter),
            y.prototype.initEventHandler = function() {
                var t = this;
                this.mousemoveHandler = function(e) {
                    t.mousemove.call(t, e)
                }
                ,
                this.mousedownHandler = function(e) {
                    t.mousedown.call(t, e)
                }
                ,
                this.mouseupHandler = function(e) {
                    t.mouseup.call(t, e)
                }
                ,
                this.mouseTarget.addEventListener("mousemove", this.mousemoveHandler, !1)
            }
            ,
            y.prototype.emit = function() {
                this._allowEmitting = !0
            }
            ,
            y.prototype.stopEmit = function() {
                this._allowEmitting = !1
            }
            ,
            y.prototype.mousemove = function(t) {
                t.layerX || 0 == t.layerX ? (this.p.x += (t.layerX - this.p.x) * this.ease,
                this.p.y += (t.layerY - this.p.y) * this.ease) : (t.offsetX || 0 == t.offsetX) && (this.p.x += (t.offsetX - this.p.x) * this.ease,
                this.p.y += (t.offsetY - this.p.y) * this.ease),
                this._allowEmitting && y._super_.prototype.emit.call(this, "once")
            }
            ,
            y.prototype.destroy = function() {
                y._super_.prototype.destroy.call(this),
                this.mouseTarget.removeEventListener("mousemove", this.mousemoveHandler, !1)
            }
            ,
            Y.FollowEmitter = y;
            var at = at || {
                easeLinear: function(t) {
                    return t
                },
                easeInQuad: function(t) {
                    return Math.pow(t, 2)
                },
                easeOutQuad: function(t) {
                    return -(Math.pow(t - 1, 2) - 1)
                },
                easeInOutQuad: function(t) {
                    return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2)
                },
                easeInCubic: function(t) {
                    return Math.pow(t, 3)
                },
                easeOutCubic: function(t) {
                    return Math.pow(t - 1, 3) + 1
                },
                easeInOutCubic: function(t) {
                    return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2)
                },
                easeInQuart: function(t) {
                    return Math.pow(t, 4)
                },
                easeOutQuart: function(t) {
                    return -(Math.pow(t - 1, 4) - 1)
                },
                easeInOutQuart: function(t) {
                    return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2)
                },
                easeInSine: function(t) {
                    return 1 - Math.cos(t * (Math.PI / 2))
                },
                easeOutSine: function(t) {
                    return Math.sin(t * (Math.PI / 2))
                },
                easeInOutSine: function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                },
                easeInExpo: function(t) {
                    return 0 === t ? 0 : Math.pow(2, 10 * (t - 1))
                },
                easeOutExpo: function(t) {
                    return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
                },
                easeInOutExpo: function(t) {
                    return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t))
                },
                easeInCirc: function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                },
                easeOutCirc: function(t) {
                    return Math.sqrt(1 - Math.pow(t - 1, 2))
                },
                easeInOutCirc: function(t) {
                    return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                },
                easeInBack: function(t) {
                    var e = 1.70158;
                    return t * t * ((e + 1) * t - e)
                },
                easeOutBack: function(t) {
                    var e = 1.70158;
                    return (t -= 1) * t * ((e + 1) * t + e) + 1
                },
                easeInOutBack: function(t) {
                    var e = 1.70158;
                    return (t /= .5) < 1 ? .5 * t * t * ((1 + (e *= 1.525)) * t - e) : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2)
                },
                setEasingByName: function(t) {
                    switch (t) {
                    case "easeLinear":
                        return Y.ease.easeLinear;
                    case "easeInQuad":
                        return Y.ease.easeInQuad;
                    case "easeOutQuad":
                        return Y.ease.easeOutQuad;
                    case "easeInOutQuad":
                        return Y.ease.easeInOutQuad;
                    case "easeInCubic":
                        return Y.ease.easeInCubic;
                    case "easeOutCubic":
                        return Y.ease.easeOutCubic;
                    case "easeInOutCubic":
                        return Y.ease.easeInOutCubic;
                    case "easeInQuart":
                        return Y.ease.easeInQuart;
                    case "easeOutQuart":
                        return Y.ease.easeOutQuart;
                    case "easeInOutQuart":
                        return Y.ease.easeInOutQuart;
                    case "easeInSine":
                        return Y.ease.easeInSine;
                    case "easeOutSine":
                        return Y.ease.easeOutSine;
                    case "easeInOutSine":
                        return Y.ease.easeInOutSine;
                    case "easeInExpo":
                        return Y.ease.easeInExpo;
                    case "easeOutExpo":
                        return Y.ease.easeOutExpo;
                    case "easeInOutExpo":
                        return Y.ease.easeInOutExpo;
                    case "easeInCirc":
                        return Y.ease.easeInCirc;
                    case "easeOutCirc":
                        return Y.ease.easeOutCirc;
                    case "easeInOutCirc":
                        return Y.ease.easeInOutCirc;
                    case "easeInBack":
                        return Y.ease.easeInBack;
                    case "easeOutBack":
                        return Y.ease.easeOutBack;
                    case "easeInOutBack":
                        return Y.ease.easeInOutBack;
                    default:
                        return Y.ease.easeLinear
                    }
                }
            };
            Y.ease = at,
            Y.easeLinear = "easeLinear",
            Y.easeInQuad = "easeInQuad",
            Y.easeOutQuad = "easeOutQuad",
            Y.easeInOutQuad = "easeInOutQuad",
            Y.easeInCubic = "easeInCubic",
            Y.easeOutCubic = "easeOutCubic",
            Y.easeInOutCubic = "easeInOutCubic",
            Y.easeInQuart = "easeInQuart",
            Y.easeOutQuart = "easeOutQuart",
            Y.easeInOutQuart = "easeInOutQuart",
            Y.easeInSine = "easeInSine",
            Y.easeOutSine = "easeOutSine",
            Y.easeInOutSine = "easeInOutSine",
            Y.easeInExpo = "easeInExpo",
            Y.easeOutExpo = "easeOutExpo",
            Y.easeInOutExpo = "easeInOutExpo",
            Y.easeInCirc = "easeInCirc",
            Y.easeOutCirc = "easeOutCirc",
            Y.easeInOutCirc = "easeInOutCirc",
            Y.easeInBack = "easeInBack",
            Y.easeOutBack = "easeOutBack",
            Y.easeInOutBack = "easeInOutBack",
            g.prototype = {
                start: function() {
                    this.addEventHandler(),
                    this.renderer.start()
                },
                stop: function() {
                    this.renderer.stop()
                },
                resize: function(t, e) {
                    this.renderer.resize(t, e)
                },
                setStroke: function(t, e) {
                    this.renderer.hasOwnProperty("stroke") ? this.renderer.setStroke(t, e) : alert("Sorry this renderer do not suppest stroke method!")
                },
                createImageData: function(t) {
                    this.renderer instanceof Y.PixelRender && this.renderer.createImageData(t)
                },
                setMaxRadius: function(t) {
                    this.renderer instanceof Y.WebGLRender && this.renderer.setMaxRadius(t)
                },
                blendEquation: function(t) {
                    this.renderer instanceof Y.WebGLRender && this.renderer.blendEquation(t)
                },
                blendFunc: function(t, e) {
                    this.renderer instanceof Y.WebGLRender && this.renderer.blendFunc(t, e)
                },
                setType: function(t) {
                    this.type = t,
                    this.renderer = this.getRenderer()
                },
                getRenderer: function() {
                    switch (this.type) {
                    case "dom":
                        return new Y.DomRender(this.proton,this.element);
                    case "canvas":
                        return new Y.CanvasRender(this.proton,this.element);
                    case "webgl":
                        return new Y.WebGLRender(this.proton,this.element);
                    case "easel":
                    case "easeljs":
                        return new Y.EaselRender(this.proton,this.element);
                    case "pixel":
                        return new Y.PixelRender(this.proton,this.element);
                    default:
                        return new Y.BaseRender(this.proton,this.element)
                    }
                },
                render: function(t) {
                    this.renderer.render(t)
                },
                addEventHandler: function() {
                    this.onProtonUpdate && (this.renderer.onProtonUpdate = this.onProtonUpdate),
                    this.onParticleCreated && (this.renderer.onParticleCreated = this.onParticleCreated),
                    this.onParticleUpdate && (this.renderer.onParticleUpdate = this.onParticleUpdate),
                    this.onParticleDead && (this.renderer.onParticleDead = this.onParticleDead)
                }
            },
            Y.Renderer = g,
            m.prototype = {
                start: function() {
                    var t = this;
                    this.proton.addEventListener(Y.PROTON_UPDATE, function(e) {
                        t.onProtonUpdate.call(t)
                    }),
                    this.proton.addEventListener(Y.PROTON_UPDATE_AFTER, function(e) {
                        t.onProtonUpdateAfter.call(t)
                    }),
                    this.proton.addEventListener(Y.EMITTER_ADDED, function(e) {
                        t.onEmitterAdded.call(t, e.emitter)
                    }),
                    this.proton.addEventListener(Y.EMITTER_REMOVED, function(e) {
                        t.onEmitterRemoved.call(t, e.emitter)
                    });
                    var e, i = this.proton.emitters.length;
                    for (e = 0; e < i; e++) {
                        var r = this.proton.emitters[e];
                        this.addEmitterListener(r)
                    }
                },
                resize: function(t, e) {},
                addEmitterListener: function(t) {
                    var e = this;
                    t.addEventListener(Y.PARTICLE_CREATED, function(t) {
                        e.onParticleCreated.call(e, t.particle)
                    }),
                    t.addEventListener(Y.PARTICLE_UPDATE, function(t) {
                        e.onParticleUpdate.call(e, t.particle)
                    }),
                    t.addEventListener(Y.PARTICLE_DEAD, function(t) {
                        e.onParticleDead.call(e, t.particle)
                    })
                },
                stop: function() {
                    var t, e = this.proton.emitters.length;
                    for (this.proton.removeAllEventListeners(),
                    t = 0; t < e; t++) {
                        this.proton.emitters[t].removeAllEventListeners()
                    }
                },
                onEmitterAdded: function(t) {
                    this.addEmitterListener(t)
                },
                onEmitterRemoved: function(t) {
                    t.removeAllEventListeners()
                },
                onProtonUpdate: function() {},
                onProtonUpdateAfter: function() {},
                onParticleCreated: function(t) {},
                onParticleUpdate: function(t) {},
                onParticleDead: function(t) {}
            },
            Y.BaseRender = m,
            Y.Util.inherits(f, Y.BaseRender),
            f.prototype.start = function() {
                f._super_.prototype.start.call(this)
            }
            ,
            f.prototype.setStroke = function(t, e) {
                t = Y.Util.initValue(t, "#000000"),
                e = Y.Util.initValue(e, 1),
                this.stroke = {
                    color: t,
                    thinkness: e
                }
            }
            ,
            f.prototype.onProtonUpdate = function() {}
            ,
            f.prototype.onParticleCreated = function(t) {
                if (t.target) {
                    var e = this;
                    Y.Util.getImage(t.target, t, !1, function(t) {
                        e.setImgInDIV.call(e, t)
                    })
                } else
                    t.transform.canvas = Y.DomUtil.createCanvas(t.id + "_canvas", t.radius + 1, t.radius + 1, "absolute"),
                    t.transform.bakOldRadius = t.radius,
                    this.stroke ? (t.transform.canvas.width = 2 * t.radius + 2 * this.stroke.thinkness,
                    t.transform.canvas.height = 2 * t.radius + 2 * this.stroke.thinkness) : (t.transform.canvas.width = 2 * t.radius + 1,
                    t.transform.canvas.height = 2 * t.radius + 1),
                    t.transform.context = t.transform.canvas.getContext("2d"),
                    t.transform.context.fillStyle = t.color,
                    t.transform.context.beginPath(),
                    t.transform.context.arc(t.radius, t.radius, t.radius, 0, 2 * Math.PI, !0),
                    this.stroke && (t.transform.context.strokeStyle = this.stroke.color,
                    t.transform.context.lineWidth = this.stroke.thinkness,
                    t.transform.context.stroke()),
                    t.transform.context.closePath(),
                    t.transform.context.fill(),
                    this.element.appendChild(t.transform.canvas)
            }
            ,
            f.prototype.onParticleUpdate = function(t) {
                t.target ? t.target instanceof Image && (t.transform.canvas.style.opacity = t.alpha,
                Y.DomUtil.transformDom(t.transform.canvas, t.p.x - t.target.width / 2, t.p.y - t.target.height / 2, t.scale, t.rotation)) : (t.transform.canvas.style.opacity = t.alpha,
                t.transform.oldRadius ? Y.DomUtil.transformDom(t.transform.canvas, t.p.x - t.transform.oldRadius, t.p.y - t.transform.oldRadius, t.scale, t.rotation) : Y.DomUtil.transformDom(t.transform.canvas, t.p.x - t.transform.bakOldRadius, t.p.y - t.transform.bakOldRadius, t.scale, t.rotation))
            }
            ,
            f.prototype.onParticleDead = function(t) {
                t.transform.canvas && this.element.removeChild(t.transform.canvas)
            }
            ,
            f.prototype.setImgInDIV = function(t) {
                t.transform.canvas = Y.DomUtil.createCanvas(t.id + "_canvas", t.target.width + 1, t.target.height + 1, "absolute", t.p.x - t.radius, t.p.y - t.radius),
                t.transform.context = t.transform.canvas.getContext("2d"),
                t.transform.context.drawImage(t.target, 0, 0, t.target.width, t.target.height),
                this.element.appendChild(t.transform.canvas)
            }
            ,
            Y.DomRender = f,
            Y.Util.inherits(d, Y.BaseRender),
            d.prototype.resize = function(t, e) {}
            ,
            d.prototype.start = function() {
                d._super_.prototype.start.call(this)
            }
            ,
            d.prototype.onProtonUpdate = function() {}
            ,
            d.prototype.onParticleCreated = function(t) {
                if (t.target)
                    t.target = t.target.clone(),
                    t.target.parent || (!t.target.image || (t.target.regX = t.target.image.width / 2,
                    t.target.regY = t.target.image.height / 2),
                    this.element.addChild(t.target));
                else {
                    var e = new createjs.Graphics;
                    this.stroke && (1 == this.stroke ? e.beginStroke("#000000") : this.stroke instanceof String && e.beginStroke(this.stroke)),
                    e.beginFill(t.color).drawCircle(0, 0, t.radius);
                    var i = new createjs.Shape(e);
                    t.target = i,
                    this.element.addChild(t.target)
                }
            }
            ,
            d.prototype.onParticleUpdate = function(t) {
                t.target && (t.target.x = t.p.x,
                t.target.y = t.p.y,
                t.target.alpha = t.alpha,
                t.target.scaleX = t.target.scaleY = t.scale,
                t.target.rotation = t.rotation)
            }
            ,
            d.prototype.onParticleDead = function(t) {
                t.target && t.target.parent && t.target.parent.removeChild(t.target)
            }
            ,
            Y.EaselRender = d,
            Y.Util.inherits(p, Y.BaseRender),
            p.prototype.resize = function(t, e) {
                this.element.width = t,
                this.element.height = e
            }
            ,
            p.prototype.start = function() {
                p._super_.prototype.start.call(this)
            }
            ,
            p.prototype.setStroke = function(t, e) {
                t = Y.Util.initValue(t, "#000000"),
                e = Y.Util.initValue(e, 1),
                this.stroke = {
                    color: t,
                    thinkness: e
                }
            }
            ,
            p.prototype.onProtonUpdate = function() {
                this.context.clearRect(0, 0, this.element.width, this.element.height)
            }
            ,
            p.prototype.onParticleCreated = function(t) {
                t.target ? Y.Util.getImage(t.target, t, !1) : t.color = t.color ? t.color : "#ff0000"
            }
            ,
            p.prototype.onParticleUpdate = function(t) {
                if (t.target) {
                    if (t.target instanceof Image) {
                        var e = t.target.width * t.scale | 0
                          , i = t.target.height * t.scale | 0
                          , r = t.p.x - e / 2
                          , n = t.p.y - i / 2;
                        if (t.color) {
                            t.transform.buffer || (t.transform.buffer = this.getBuffer(t.target));
                            var s = t.transform.buffer.getContext("2d");
                            s.clearRect(0, 0, t.transform.buffer.width, t.transform.buffer.height),
                            s.globalAlpha = t.alpha,
                            s.drawImage(t.target, 0, 0),
                            s.globalCompositeOperation = "source-atop",
                            s.fillStyle = Y.Util.rgbToHex(t.transform.rgb),
                            s.fillRect(0, 0, t.transform.buffer.width, t.transform.buffer.height),
                            s.globalCompositeOperation = "source-over",
                            s.globalAlpha = 1,
                            this.context.drawImage(t.transform.buffer, 0, 0, t.transform.buffer.width, t.transform.buffer.height, r, n, e, i)
                        } else
                            this.context.save(),
                            this.context.globalAlpha = t.alpha,
                            this.context.translate(t.p.x, t.p.y),
                            this.context.rotate(Y.MathUtils.degreeTransform(t.rotation)),
                            this.context.translate(-t.p.x, -t.p.y),
                            this.context.drawImage(t.target, 0, 0, t.target.width, t.target.height, r, n, e, i),
                            this.context.globalAlpha = 1,
                            this.context.restore()
                    }
                } else
                    t.transform.rgb ? this.context.fillStyle = "rgba(" + t.transform.rgb.r + "," + t.transform.rgb.g + "," + t.transform.rgb.b + "," + t.alpha + ")" : this.context.fillStyle = t.color,
                    this.context.beginPath(),
                    this.context.arc(t.p.x, t.p.y, t.radius, 0, 2 * Math.PI, !0),
                    this.stroke && (this.context.strokeStyle = this.stroke.color,
                    this.context.lineWidth = this.stroke.thinkness,
                    this.context.stroke()),
                    this.context.closePath(),
                    this.context.fill()
            }
            ,
            p.prototype.onParticleDead = function(t) {}
            ,
            p.prototype.getBuffer = function(t) {
                if (t instanceof Image) {
                    var e = t.width + "_" + t.height
                      , i = this.bufferCache[e];
                    return i || (i = document.createElement("canvas"),
                    i.width = t.width,
                    i.height = t.height,
                    this.bufferCache[e] = i),
                    i
                }
            }
            ,
            Y.CanvasRender = p,
            Y.Util.inherits(c, Y.BaseRender),
            c.prototype.resize = function(t, e) {
                this.element.width = t,
                this.element.height = e
            }
            ,
            c.prototype.createImageData = function(t) {
                this.rectangle = t || new Y.Rectangle(0,0,this.element.width,this.element.height),
                this.imageData = this.context.createImageData(this.rectangle.width, this.rectangle.height),
                this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y)
            }
            ,
            c.prototype.start = function() {
                c._super_.prototype.start.call(this)
            }
            ,
            c.prototype.onProtonUpdate = function() {
                this.context.clearRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height),
                this.imageData = this.context.getImageData(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height)
            }
            ,
            c.prototype.onProtonUpdateAfter = function() {
                this.context.putImageData(this.imageData, this.rectangle.x, this.rectangle.y)
            }
            ,
            c.prototype.onParticleCreated = function(t) {}
            ,
            c.prototype.onParticleUpdate = function(t) {
                this.imageData && this.setPixel(this.imageData, Math.floor(t.p.x - this.rectangle.x), Math.floor(t.p.y - this.rectangle.y), t)
            }
            ,
            c.prototype.setPixel = function(t, e, i, r) {
                var n = r.transform.rgb;
                if (!(e < 0 || e > this.element.width || i < 0 || i > this.elementwidth)) {
                    var s = 4 * ((i >> 0) * t.width + (e >> 0));
                    t.data[s] = n.r,
                    t.data[s + 1] = n.g,
                    t.data[s + 2] = n.b,
                    t.data[s + 3] = 255 * r.alpha
                }
            }
            ,
            c.prototype.onParticleDead = function(t) {}
            ,
            Y.PixelRender = c,
            Y.Util.inherits(u, Y.BaseRender),
            u.prototype.resize = function(t, e) {
                this.umat[4] = -2,
                this.umat[7] = 1,
                this.smat[0] = 1 / t,
                this.smat[4] = 1 / e,
                this.mstack.set(this.umat, 0),
                this.mstack.set(this.smat, 1),
                this.gl.viewport(0, 0, t, e),
                this.element.width = t,
                this.element.height = e
            }
            ,
            u.prototype.setMaxRadius = function(t) {
                this.circleCanvasURL = this.createCircle(t)
            }
            ,
            u.prototype.getVertexShader = function() {
                return ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n")
            }
            ,
            u.prototype.getFragmentShader = function() {
                return ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n")
            }
            ,
            u.prototype.initVar = function() {
                this.mstack = new Y.MStack,
                this.umat = Y.Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]),
                this.smat = Y.Mat3.create([.01, 0, 1, 0, .01, 0, 0, 0, 1]),
                this.texturebuffers = {}
            }
            ,
            u.prototype.start = function() {
                u._super_.prototype.start.call(this),
                this.resize(this.element.width, this.element.height)
            }
            ,
            u.prototype.blendEquation = function(t) {
                this.gl.blendEquation(this.gl[t])
            }
            ,
            u.prototype.blendFunc = function(t, e) {
                this.gl.blendFunc(this.gl[t], this.gl[e])
            }
            ,
            u.prototype.getShader = function(t, e, i) {
                var r;
                return r = i ? t.createShader(t.FRAGMENT_SHADER) : t.createShader(t.VERTEX_SHADER),
                t.shaderSource(r, e),
                t.compileShader(r),
                t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (alert(t.getShaderInfoLog(r)),
                null)
            }
            ,
            u.prototype.initShaders = function() {
                var t = this.getShader(this.gl, this.getFragmentShader(), !0)
                  , e = this.getShader(this.gl, this.getVertexShader(), !1);
                this.sprogram = this.gl.createProgram(),
                this.gl.attachShader(this.sprogram, e),
                this.gl.attachShader(this.sprogram, t),
                this.gl.linkProgram(this.sprogram),
                this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS) || alert("Could not initialise shaders"),
                this.gl.useProgram(this.sprogram),
                this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition"),
                this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord"),
                this.gl.enableVertexAttribArray(this.sprogram.tca),
                this.gl.enableVertexAttribArray(this.sprogram.vpa),
                this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat"),
                this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler"),
                this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture"),
                this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor"),
                this.gl.uniform1i(this.sprogram.useTex, 1)
            }
            ,
            u.prototype.initBuffers = function() {
                this.unitIBuffer = this.gl.createBuffer(),
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
                var t = [0, 3, 1, 0, 2, 3];
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(t), this.gl.STATIC_DRAW);
                for (var e = [], i = 0; i < 100; i++)
                    e.push(i);
                for (idx = new Uint16Array(e),
                this.unitI33 = this.gl.createBuffer(),
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33),
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW),
                e = [],
                i = 0; i < 100; i++)
                    e.push(i, i + 1, i + 2);
                idx = new Uint16Array(e),
                this.stripBuffer = this.gl.createBuffer(),
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer),
                this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW)
            }
            ,
            u.prototype.createCircle = function(t) {
                this.circleCanvasRadius = Y.WebGLUtil.nhpot(Y.Util.initValue(t, 32));
                var e = Y.DomUtil.createCanvas("circle_canvas", 2 * this.circleCanvasRadius, 2 * this.circleCanvasRadius)
                  , i = e.getContext("2d");
                return i.beginPath(),
                i.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, 2 * Math.PI, !0),
                i.closePath(),
                i.fillStyle = "#FFF",
                i.fill(),
                e.toDataURL()
            }
            ,
            u.prototype.setImgInCanvas = function(t) {
                var e = t.target.width
                  , i = t.target.height
                  , r = Y.WebGLUtil.nhpot(t.target.width)
                  , n = Y.WebGLUtil.nhpot(t.target.height)
                  , s = t.target.width / r
                  , a = t.target.height / n;
                this.texturebuffers[t.transform.src] || (this.texturebuffers[t.transform.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()]),
                t.transform.texture = this.texturebuffers[t.transform.src][0],
                t.transform.vcBuffer = this.texturebuffers[t.transform.src][1],
                t.transform.tcBuffer = this.texturebuffers[t.transform.src][2],
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t.transform.tcBuffer),
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0, s, 0, 0, a, a, a]), this.gl.STATIC_DRAW),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t.transform.vcBuffer),
                this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0, e, 0, 0, i, e, i]), this.gl.STATIC_DRAW);
                var o = t.transform.canvas.getContext("2d")
                  , h = o.getImageData(0, 0, r, n);
                this.gl.bindTexture(this.gl.TEXTURE_2D, t.transform.texture),
                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, h),
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR),
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST),
                this.gl.generateMipmap(this.gl.TEXTURE_2D),
                t.transform.textureLoaded = !0,
                t.transform.textureWidth = e,
                t.transform.textureHeight = i
            }
            ,
            u.prototype.setStroke = function(t, e) {}
            ,
            u.prototype.onProtonUpdate = function() {}
            ,
            u.prototype.onParticleCreated = function(t) {
                var e = this;
                t.transform.textureLoaded = !1,
                t.transform.tmat = Y.Mat3.create(),
                t.transform.tmat[8] = 1,
                t.transform.imat = Y.Mat3.create(),
                t.transform.imat[8] = 1,
                t.target ? Y.Util.getImage(t.target, t, !0, function(t) {
                    e.setImgInCanvas.call(e, t),
                    t.transform.oldScale = 1
                }) : Y.Util.getImage(this.circleCanvasURL, t, !0, function(t) {
                    e.setImgInCanvas.call(e, t),
                    t.transform.oldScale = t.radius / e.circleCanvasRadius
                })
            }
            ,
            u.prototype.onParticleUpdate = function(t) {
                t.transform.textureLoaded && (this.updateMatrix(t),
                this.gl.uniform3f(this.sprogram.color, t.transform.rgb.r / 255, t.transform.rgb.g / 255, t.transform.rgb.b / 255),
                this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, !1, this.mstack.top()),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t.transform.vcBuffer),
                this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, !1, 0, 0),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, t.transform.tcBuffer),
                this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, !1, 0, 0),
                this.gl.bindTexture(this.gl.TEXTURE_2D, t.transform.texture),
                this.gl.uniform1i(this.sprogram.samplerUniform, 0),
                this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer),
                this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0),
                this.mstack.pop())
            }
            ,
            u.prototype.onParticleDead = function(t) {}
            ,
            u.prototype.updateMatrix = function(t) {
                var e = Y.WebGLUtil.makeTranslation(-t.transform.textureWidth / 2, -t.transform.textureHeight / 2)
                  , i = Y.WebGLUtil.makeTranslation(t.p.x, t.p.y)
                  , r = t.rotation * (Math.PI / 180)
                  , n = Y.WebGLUtil.makeRotation(r)
                  , s = t.scale * t.transform.oldScale
                  , a = Y.WebGLUtil.makeScale(s, s)
                  , o = Y.WebGLUtil.matrixMultiply(e, a);
                o = Y.WebGLUtil.matrixMultiply(o, n),
                o = Y.WebGLUtil.matrixMultiply(o, i),
                Y.Mat3.inverse(o, t.transform.imat),
                o[2] = t.alpha,
                this.mstack.push(o)
            }
            ,
            Y.WebGLRender = u,
            l.prototype = {
                getPosition: function() {},
                crossing: function(t) {}
            },
            Y.Zone = l,
            Y.Util.inherits(h, Y.Zone),
            h.prototype.getPosition = function() {
                return this.random = Math.random(),
                this.vector.x = this.x1 + this.random * this.length * Math.cos(this.gradient),
                this.vector.y = this.y1 + this.random * this.length * Math.sin(this.gradient),
                this.vector
            }
            ,
            h.prototype.getDirection = function(t, e) {
                var i = this.dy
                  , r = -this.dx;
                return (i * t + r * e + this.dot) * (0 == r ? 1 : r) > 0
            }
            ,
            h.prototype.getDistance = function(t, e) {
                return (this.dy * t + -this.dx * e + this.dot) / Math.sqrt(this.xxyy)
            }
            ,
            h.prototype.getSymmetric = function(t) {
                var e = t.getGradient()
                  , i = this.getGradient()
                  , r = 2 * (i - e)
                  , n = t.x
                  , s = t.y;
                return t.x = n * Math.cos(r) - s * Math.sin(r),
                t.y = n * Math.sin(r) + s * Math.cos(r),
                t
            }
            ,
            h.prototype.getGradient = function() {
                return Math.atan2(this.dy, this.dx)
            }
            ,
            h.prototype.getRange = function(t, e) {
                Math.abs(this.getGradient()) <= Math.PI / 4 ? t.p.x < this.maxx && t.p.x > this.minx && e() : t.p.y < this.maxy && t.p.y > this.miny && e()
            }
            ,
            h.prototype.getLength = function() {
                return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
            }
            ,
            h.prototype.crossing = function(t) {
                var e = this;
                "dead" == this.crossType ? ">" == this.direction || "R" == this.direction || "right" == this.direction || "down" == this.direction ? this.getRange(t, function() {
                    e.getDirection(t.p.x, t.p.y) && (t.dead = !0)
                }) : this.getRange(t, function() {
                    e.getDirection(t.p.x, t.p.y) || (t.dead = !0)
                }) : "bound" == this.crossType ? this.getRange(t, function() {
                    e.getDistance(t.p.x, t.p.y) <= t.radius && (0 == e.dx ? t.v.x *= -1 : 0 == e.dy ? t.v.y *= -1 : e.getSymmetric(t.v))
                }) : "cross" == this.crossType && this.alert && (alert("Sorry lineZone does not support cross method"),
                this.alert = !1)
            }
            ,
            Y.LineZone = h,
            Y.Util.inherits(a, Y.Zone),
            a.prototype.getPosition = function() {
                return this.random = Math.random(),
                this.angle = 2 * Math.PI * Math.random(),
                this.vector.x = this.x + this.random * this.radius * Math.cos(this.angle),
                this.vector.y = this.y + this.random * this.radius * Math.sin(this.angle),
                this.vector
            }
            ,
            a.prototype.setCenter = function(t, e) {
                this.center.x = t,
                this.center.y = e
            }
            ,
            a.prototype.crossing = function(t) {
                var e = t.p.distanceTo(this.center);
                "dead" == this.crossType ? e - t.radius > this.radius && (t.dead = !0) : "bound" == this.crossType ? e + t.radius >= this.radius && this.getSymmetric(t) : "cross" == this.crossType && this.alert && (alert("Sorry CircleZone does not support cross method"),
                this.alert = !1)
            }
            ,
            a.prototype.getSymmetric = function(t) {
                var e = t.v.getGradient()
                  , i = this.getGradient(t)
                  , r = 2 * (i - e)
                  , n = t.v.x
                  , s = t.v.y;
                t.v.x = n * Math.cos(r) - s * Math.sin(r),
                t.v.y = n * Math.sin(r) + s * Math.cos(r)
            }
            ,
            a.prototype.getGradient = function(t) {
                return -Math.PI / 2 + Math.atan2(t.p.y - this.center.y, t.p.x - this.center.x)
            }
            ,
            Y.CircleZone = a,
            Y.Util.inherits(n, Y.Zone),
            n.prototype.getPosition = function() {
                return this.vector.x = this.x,
                this.vector.y = this.y,
                this.vector
            }
            ,
            n.prototype.crossing = function(t) {
                this.alert && (alert("Sorry PointZone does not support crossing method"),
                this.alert = !1)
            }
            ,
            Y.PointZone = n,
            Y.Util.inherits(r, Y.Zone),
            r.prototype.getPosition = function() {
                return this.vector.x = this.x + Math.random() * this.width,
                this.vector.y = this.y + Math.random() * this.height,
                this.vector
            }
            ,
            r.prototype.crossing = function(t) {
                "dead" == this.crossType ? (t.p.x + t.radius < this.x ? t.dead = !0 : t.p.x - t.radius > this.x + this.width && (t.dead = !0),
                t.p.y + t.radius < this.y ? t.dead = !0 : t.p.y - t.radius > this.y + this.height && (t.dead = !0)) : "bound" == this.crossType ? (t.p.x - t.radius < this.x ? (t.p.x = this.x + t.radius,
                t.v.x *= -1) : t.p.x + t.radius > this.x + this.width && (t.p.x = this.x + this.width - t.radius,
                t.v.x *= -1),
                t.p.y - t.radius < this.y ? (t.p.y = this.y + t.radius,
                t.v.y *= -1) : t.p.y + t.radius > this.y + this.height && (t.p.y = this.y + this.height - t.radius,
                t.v.y *= -1)) : "cross" == this.crossType && (t.p.x + t.radius < this.x && t.v.x <= 0 ? t.p.x = this.x + this.width + t.radius : t.p.x - t.radius > this.x + this.width && t.v.x >= 0 && (t.p.x = this.x - t.radius),
                t.p.y + t.radius < this.y && t.v.y <= 0 ? t.p.y = this.y + this.height + t.radius : t.p.y - t.radius > this.y + this.height && t.v.y >= 0 && (t.p.y = this.y - t.radius))
            }
            ,
            Y.RectZone = r,
            Y.Util.inherits(i, Y.Zone),
            i.prototype.reset = function(t, e, i, r) {
                this.imageData = t,
                this.x = Y.Util.initValue(e, 0),
                this.y = Y.Util.initValue(i, 0),
                this.d = Y.Util.initValue(r, 2),
                this.vectors = [],
                this.setVectors()
            }
            ,
            i.prototype.setVectors = function() {
                var t, e, i = this.imageData.width, r = this.imageData.height;
                for (t = 0; t < i; t += this.d)
                    for (e = 0; e < r; e += this.d) {
                        var n = 4 * ((e >> 0) * i + (t >> 0));
                        this.imageData.data[n + 3] > 0 && this.vectors.push({
                            x: t + this.x,
                            y: e + this.y
                        })
                    }
                return this.vector
            }
            ,
            i.prototype.getBound = function(t, e) {
                var i = 4 * ((e >> 0) * this.imageData.width + (t >> 0));
                return this.imageData.data[i + 3] > 0
            }
            ,
            i.prototype.getPosition = function() {
                return this.vector.copy(this.vectors[Math.floor(Math.random() * this.vectors.length)])
            }
            ,
            i.prototype.getColor = function(t, e) {
                t -= this.x,
                e -= this.y;
                var i = 4 * ((e >> 0) * this.imageData.width + (t >> 0));
                return {
                    r: this.imageData.data[i],
                    g: this.imageData.data[i + 1],
                    b: this.imageData.data[i + 2],
                    a: this.imageData.data[i + 3]
                }
            }
            ,
            i.prototype.crossing = function(t) {
                "dead" == this.crossType ? this.getBound(t.p.x - this.x, t.p.y - this.y) ? t.dead = !0 : t.dead = !1 : "bound" == this.crossType && (this.getBound(t.p.x - this.x, t.p.y - this.y) || t.v.negate())
            }
            ,
            Y.ImageZone = i;
            var ot = function e() {
                if (t.console && t.console.log) {
                    var i = arguments;
                    if ("string" == typeof arguments[0])
                        if (0 == arguments[0].indexOf("+")) {
                            var r = parseInt(arguments[0]);
                            e.once < r && (delete i[0],
                            console.log(i),
                            e.once++)
                        } else
                            console.log(i);
                    else
                        console.log(i)
                }
            };
            ot.once = 0,
            Y.log = ot;
            var ht = ht || {
                addEventListener: function(t, e) {
                    t.addEventListener(Y.PROTON_UPDATE, function(t) {
                        e()
                    })
                },
                setStyle: function(t) {
                    var e = t || "#ff0000"
                      , i = Y.Util.hexToRGB(e);
                    return "rgba(" + i.r + "," + i.g + "," + i.b + ",0.5)"
                },
                drawZone: function(t, e, i, r) {
                    var n = e.getContext("2d")
                      , s = this.setStyle();
                    this.addEventListener(t, function() {
                        r && n.clearRect(0, 0, e.width, e.height),
                        i instanceof Y.PointZone ? (n.beginPath(),
                        n.fillStyle = s,
                        n.arc(i.x, i.y, 10, 0, 2 * Math.PI, !0),
                        n.fill(),
                        n.closePath()) : i instanceof Y.LineZone ? (n.beginPath(),
                        n.strokeStyle = s,
                        n.moveTo(i.x1, i.y1),
                        n.lineTo(i.x2, i.y2),
                        n.stroke(),
                        n.closePath()) : i instanceof Y.RectZone ? (n.beginPath(),
                        n.strokeStyle = s,
                        n.drawRect(i.x, i.y, i.width, i.height),
                        n.stroke(),
                        n.closePath()) : i instanceof Y.CircleZone && (n.beginPath(),
                        n.strokeStyle = s,
                        n.arc(i.x, i.y, i.radius, 0, 2 * Math.PI, !0),
                        n.stroke(),
                        n.closePath())
                    })
                },
                drawEmitter: function(t, e, i, r) {
                    var n = e.getContext("2d")
                      , s = this.setStyle();
                    this.addEventListener(t, function() {
                        r && n.clearRect(0, 0, e.width, e.height),
                        n.beginPath(),
                        n.fillStyle = s,
                        n.arc(i.p.x, i.p.y, 10, 0, 2 * Math.PI, !0),
                        n.fill(),
                        n.closePath()
                    })
                },
                test: {},
                setTest: function(t, e) {
                    this.test[t] = e
                },
                getTest: function(t) {
                    return !!this.test.hasOwnProperty(t) && this.test[t]
                }
            };
            Y.Debug = ht
        }
        )(window),
        function() {
            for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i)
                window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"],
                window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(e, i) {
                var r = (new Date).getTime()
                  , n = Math.max(0, 16 - (r - t))
                  , s = window.setTimeout(function() {
                    e(r + n)
                }, n);
                return t = r + n,
                s
            }
            ),
            window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            }
            )
        }();
        var p;
        e.default = {
            components: {
                canvasText: c.default
            },
            data: function() {
                return {
                    lang: this.$lang,
                    index: 0
                }
            },
            computed: {
                suffix: function() {
                    return "zh-CN" === this.lang ? "" : "-en"
                }
            },
            methods: {
                handleChangeLang: function() {
                    var t = "zh-CN" === this.lang ? "en-US" : "zh-CN";
                    l.default.$emit("on-change-lang", t, "/")
                },
                nextIndex: function() {
                    var t = this;
                    this.timmer && clearTimeout(this.timmer),
                    this.index++,
                    this.timmer = setTimeout(function() {
                        t.nextIndex()
                    }, 3e3)
                },
                handleStart: function() {
                   // this.$router.push("/docs/guide/install")
					window.open("/modules/eQ9ULgcVb1/eQ9ULgcVb5/eQ9ULgcVc5.html",'_self')
                },
                handleGithub: function() {
                  //  window.open("https://github.com/iview/iview")
                }
            },
            mounted: function() {
                function t(t) {
                    p = new Proton,
                    o = new Proton.Emitter,
                    o.rate = new Proton.Rate(new Proton.Span(1,3),1),
                    o.addInitialize(new Proton.Mass(1)),
                    o.addInitialize(new Proton.Radius(2,4)),
                    o.addInitialize(new Proton.P(new Proton.LineZone(10,n.height,n.width - 10,n.height))),
                    o.addInitialize(new Proton.Life(1,1.5)),
                    o.addInitialize(new Proton.V(new Proton.Span(4,6),new Proton.Span(0,0,!0),"polar")),
                    o.addBehaviour(new Proton.Gravity(1)),
                    o.addBehaviour(new Proton.Color("#ff0000","random")),
                    o.emit(),
                    p.addEmitter(o),
                    a = new Proton.Renderer("canvas",p,n),
                    a.onProtonUpdate = function() {
                        l(s.canvas)
                    }
                    ,
                    a.start(),
                    o.addEventListener(Proton.PARTICLE_DEAD, function(t) {
                        Math.random() < .7 ? e(t.particle) : i(t.particle)
                    })
                }
                function e(t) {
                    var e = new Proton.Emitter;
                    e.rate = new Proton.Rate(new Proton.Span(250,300),1),
                    e.addInitialize(new Proton.Mass(1)),
                    e.addInitialize(new Proton.Radius(1,2)),
                    e.addInitialize(new Proton.Life(1,3)),
                    e.addInitialize(new Proton.V(new Proton.Span(2,4),new Proton.Span(0,360),"polar")),
                    e.addBehaviour(new Proton.RandomDrift(10,10,.05)),
                    e.addBehaviour(new Proton.Alpha(1,0)),
                    e.addBehaviour(new Proton.Gravity(3));
                    var i = Math.random() > .3 ? Proton.MathUtils.randomColor() : "random";
                    e.addBehaviour(new Proton.Color(i)),
                    e.p.x = t.p.x,
                    e.p.y = t.p.y,
                    e.emit("once", !0),
                    p.addEmitter(e)
                }
                function i(t) {
                    var e = new Proton.Emitter;
                    e.rate = new Proton.Rate(new Proton.Span(100,120),1),
                    e.addInitialize(new Proton.Mass(1)),
                    e.addInitialize(new Proton.Radius(4,8)),
                    e.addInitialize(new Proton.Life(1,2)),
                    e.addInitialize(new Proton.V([1, 2],new Proton.Span(0,360),"polar")),
                    e.addBehaviour(new Proton.Alpha(1,0)),
                    e.addBehaviour(new Proton.Scale(1,.1)),
                    e.addBehaviour(new Proton.Gravity(1));
                    var i = Proton.MathUtils.randomColor();
                    e.addBehaviour(new Proton.Color(i)),
                    e.p.x = t.p.x,
                    e.p.y = t.p.y,
                    e.emit("once", !0),
                    p.addEmitter(e)
                }
                function r() {
                    requestAnimationFrame(r),
                    p.update()
                }
                this.lang = this.$lang,
                this.nextIndex();
                var n, s, a, o, h = document.createElement("canvas"), l = function(t) {
                    h.width = t.width,
                    h.height = t.height,
                    h.getContext("2d").drawImage(t, 0, 0),
                    t.width = t.width,
                    t.getContext("2d").globalAlpha = .9,
                    t.getContext("2d").drawImage(h, 0, 0),
                    t.getContext("2d").globalAlpha = 1
                };
                !function() {
                    n = document.getElementById("indexLizi"),
                    n.width = window.innerWidth,
                    n.height = window.innerHeight,
                    s = n.getContext("2d"),
                    t(),
                    r()
                }()
            },
            beforeDestroy: function() {
                this.timmer && clearTimeout(this.timmer),
                p.destory()
            }
        }
    }
});
