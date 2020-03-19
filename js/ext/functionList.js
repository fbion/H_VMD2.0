Ext.define('vmd.ext.functionList', {
    statics: {
        init: function () {
            var e = {
                php: [{
                    reg: /\n.*?\s*function\s+([_\w]+)\s*\(.*\)*/g,
                    regName: /.*function\s+(.*\))/,
                    regIndex: 1,
                    typeExtents: {
                        "function-value": /\s*(private|protected)\s*/,
                        "function-var": /\s*(public)\s*/
                    },
                    type: "function"
                }, {
                    reg: /\s*class\s+(\w*)\s*.*\{/g,
                    regName: /\s*class\s+(\w*)\s*.*\{/,
                    regIndex: 1,
                    type: "class"
                }],
                javascript: [{
                    reg: /\s*([\$\w'"\[\]\.]+)\s*=\s*function\s*\([\w,\s\*\[\]\<\>&$]*\)\s*\{/g,
                    regName: /\s*([\$\w'"\[\]\.]+)\s*=\s*function\s*(.*)/,
                    regIndex: 1,
                    regName_all: [1, 2],
                    type: "function function-var"
                }, {
                    reg: /\s*function\s+([\w\s]+)\s*\([\w,\s\*\[\]\<\>&$]*\)\s*\{/g,
                    regName: /\s*function\s+([\w\s]+)\s*(.*)/,
                    regIndex: 1,
                    regName_all: [1, 2],
                    type: "function function-define"
                }
				/*, {
                    reg: /\s*([\w\.]+)\s*:\s*function\s*\([\w,\s\*\[\]\<\>&$]*\)\s*\{/g,
                    regName: /\s*([\w\.]+)\s*:\s*function\s*(\([\w,\s\*\[\]\<\>&$]*\))/,
                    regIndex: 1,
                    regName_all: [1, 2],
                    type: "function function-value"
                }*/],
                python: [{
                    reg: /\s*class\s+(\w+)\s*\(/g,
                    regName: /\s*class\s+(\w+)\s*\(/,
                    regIndex: 1,
                    type: "class"
                }, {
                    reg: /\s*def\s+(\w+)\s*\(.*\)/g,
                    regName: /\s*def\s+(\w+)\s*\(.*\)/,
                    regIndex: 1,
                    type: "function"
                }],
                ruby: [{
                    reg: /\s*class\s+(\w+)\s*/g,
                    regName: /\s*class\s+(\w+)\s*/,
                    regIndex: 1,
                    type: "class"
                }, {
                    reg: /\s*def\s+(\w+)\s*/g,
                    regName: /\s*def\s+(\w+)\s*/,
                    regIndex: 1,
                    type: "function"
                }],
                golang: [{
                    reg: /\s*class\s+(\w+)\s*/g,
                    regName: /\s*class\s+(\w+)\s*/,
                    regIndex: 1,
                    type: "class"
                }, {
                    reg: /\s*func\s+(\w+)\s*.*\{/g,
                    regName: /\s*func\s+(\w+)\s*/,
                    regIndex: 1,
                    type: "function"
                }],
                java: [{
                    reg: /\s*(final)?\s*(public|private|protected)\s*.*\s+(\w+)\s*\(.*\).*\{/g,
                    regName: /\s*(final)?\s*(public|private|protected)\s*.*\s+(\w+)\s*\(.*\).*\{/,
                    regIndex: 3,
                    type: "function"
                }, {
                    reg: /\s*class\s+(\w+)\s*/g,
                    regName: /\s*class\s+(\w+)\s*/,
                    regIndex: 1,
                    type: "class"
                }],
                csharp: [{
                    reg: /\s*(public|private|protected)\s*.*\s+(\w+)\s*\(.*\).*/g,
                    regName: /\s*(public|private|protected)\s*.*\s+(\w+)\s*\(.*\).*/,
                    regIndex: 2,
                    type: "function"
                }, {
                    reg: /\s*class\s+(\w+)\s*/g,
                    regName: /\s*class\s+(\w+)\s*/,
                    regIndex: 1,
                    type: "class"
                }],
                actionscript: [{
                    reg: /\s*function\s*(\w+)\s*\(.*\).*\s*\{/g,
                    regName: /\s*function\s*(\w+)\s*\(.*\).*\s*\{/,
                    regIndex: 1,
                    type: "function"
                }, {
                    reg: /\s*class\s+(\w+)\s*.*\{/g,
                    regName: /\s*class\s+(\w+)\s*.*\{/,
                    regIndex: 1,
                    type: "class"
                }],
                objectivec: [{
                    reg: /[\+-]\s*\(.*\)\s*(\w+)\s*\:\s*\(.*/g,
                    regName: /[\+-]\s*\(.*\)\s*(\w+)\s*\:\s*\(.*/,
                    regIndex: 1,
                    type: "function"
                }, {
                    reg: /[\+-]\s*\([^:\{\}]*\)\s*(\w*)\s*\{/g,
                    regName: /[\+-]\s*\([^:\{\}]*\)\s*(\w*)\s*\{/,
                    regIndex: 1,
                    type: "function"
                }, {
                    reg: /@implementation\s+(\w*)/g,
                    regName: /@implementation\s+(\w*)/,
                    regIndex: 1,
                    type: "class"
                }, {
                    reg: /#pragma\s+(mark\s+)?(.*)/g,
                    regName: /#pragma\s+(mark\s+)?(.*)/,
                    regIndex: 2,
                    type: "mark"
                }],
                c_cpp: [{
                    reg: /([\w*]+\s+)+\*?(\w+)\s*\([\w\s\n\*\/\<\>\[\]\.&,:-]*\)\s*\{/g,
                    regName: /\s+(\w+)\s*\(/,
                    regIndex: 1,
                    type: "function"
                }, {
                    reg: /\s*(\w+)::~?(\w+)\s*\([\w\s\n\*\/\<\>\[\]\.&,:-]*\)\s*\{/g,
                    regName: /\s*(\w+)::~?(\w+)\s*\(/,
                    regIndex: 2,
                    type: "function function-define"
                }, {
                    reg: /\s*class\s+(\w+)\s*:/g,
                    regName: /\s*class\s+(\w+)\s*:/,
                    regIndex: 1,
                    type: "class"
                }]
            }
      , t = function (e, t) {
          var a = e.match(t.reg);
          if (a) {
              for (var i = [], n = a.length, o = 0, s = e, r = 0; n > r; r++) {
                  var l = {};
                  l.the_match = a[r];
                  var c = l.the_match.match(t.regName);
                  if (c && !(c.length < t.regIndex) && c[t.regIndex]) {
                      l.name = c[t.regIndex];
                      var d = s.indexOf(l.the_match)
                        , p = l.the_match.indexOf(l.name);
                      if (l.pos_start = o + d + p,
                      l.pos_end = l.pos_start + l.name.length,
                      t.regName_all !== void 0) {
                          l.name = "";
                          for (var u = t.regName_all, f = 0; u.length > f; f++)
                              l.name += c[u[f]]
                      }
                      o = o + d + l.the_match.length,
                      s = e.substr(o),
                      l.type = t.type,
                      t.typeExtents !== void 0 && $.each(t.typeExtents, function (e, t) {
                          l.the_match.match(t) && (l.type += " " + e)
                      }),
                      i.push(l)
                  }
              }
              return i
          }
      }
      , a = function (a, i) {
          if (void 0 !== e[i]) {
              for (var n = e[i], o = [], s = 0; n.length > s; s++) {
                  var r = t(a, n[s]);
                  r && Array.prototype.push.apply(o, r)
              }
              o.sort(function (e, t) {
                  var a = "pos_start";
                  return e[a] < t[a] ? -1 : e[a] >= t[a] ? 1 : void 0
              });
              for (var l = a.split("\n"), c = 0, d = o[c], p = 0, u = 0; l.length > u && d; u++) {
                  for (; d && d.pos_start >= p && d.pos_start <= p + l[u].length;)
                      o[c].range = {
                          start: {
                              row: u,
                              column: d.pos_start - p
                          },
                          end: {
                              row: u,
                              column: d.pos_end - p
                          }
                      },
                      c++,
                      d = o[c];
                  p = p + l[u].length + 1
              }
              return o
          }
      }
      , i = function (e) {
          return e = e.replace(/[\r\n {]+/gi, " "),
          e = e.replace(/"/gi, "'"),
          e = e.replace(/\</gi, "&lt;"),
          e = e.replace(/\>/gi, "&gt;")
      };
            return function (t) {

                var n = ""
                  , o = '<div class="cell-null">无函数对象</div>'
                  , s = t.funcList
                  , r = s.child(".function-search input")
                  , l = s.child(".function-list-box")
                  , Editor = t
                  , c = function () {
                      var e = Editor;
                      //if (!e || e.kod === void 0)
                      //    return l.html(o),
                      //    void 0;
                      var t = function (e) {
                          var t = e.replace(/(^\s*)|(\s*$)/g, "");
                          return t.replace(/(\{$)/, "")
                      }
                        , s = 'javascript'
                        , c = a(e.getValue(), s);
                      if (c === void 0 || 0 == c.length)
                        return Ext.DomHelper.overwrite(l, o),
                          void 0;
                      var p = e.getCursorPosition().row;
                      n = "";
                      for (var f = 0; c.length > f; f++) {
                          var h = c[f]
                            , m = h.range;
                          if (m) {
                              c.length - 1 > f && p >= c[f].range.start.row && c[f + 1].range && c[f + 1].range.start.row > p && (h.type += " row-select"),
                              f == c.length - 1 && p >= c[f].range.start.row && (h.type += " row-select");
                              var v = m.start.row + "," + m.start.column + "," + m.end.row + "," + m.end.column
                                , g = t(t(h.the_match)).substr(0, 150);
                              n += '<div xh=' + f + ' class="list-row ' + i(h.type) + ' " title="' + i(g) + '" data-range="' + v + '">' + '<span class="icon"></span>' + '<span class="cell">' + i(h.name) + "</span></div>"
                          }
                      }
                      r.getValue() || d(r.getValue()),
                      u()
                  }
                  , d = function (e) {
                      if ("" == n)
                          return Ext.DomHelper.overwrite(l, o),
                          void 0;
                      if (!e || "" == e)
                          return Ext.DomHelper.overwrite(l, n),
                          u(),
                          void 0;
                      function parseDom(arg) {

                          var objE = document.createElement("div");

                          objE.innerHTML = arg;

                          return objE.childNodes;

                      };
                      var t1 = parseDom("<div>" + n + "</div>")
                      var t = Ext.fly(t1);
                      Ext.each(t.query('.cell'), function (item, index) {

                          var cur = Ext.get(item);
                          var t = Ext.getDom(item).textContent || Ext.getDom(item).innerText
                            , a = t.toLowerCase().indexOf(e.toLowerCase());
                          -1 != a ? (t = t.substr(0, a) + "<b>" + t.substr(a, e.length) + "</b>" + t.substr(a + e.length),
                          Ext.DomHelper.overwrite(cur, t)) : cur.parent().remove()
                      });
                      //t.child(".cell").each(function () {
                      //    var t = $(this).text()
                      //      , a = t.toLowerCase().indexOf(e.toLowerCase());
                      //    -1 != a ? (t = t.substr(0, a) + "<b>" + t.substr(a, e.length) + "</b>" + t.substr(a + e.length),
                      //    $(this).html(t)) : $(this).parent().remove()
                      //});

                      Ext.DomHelper.overwrite(l, t.dom[0].innerHTML);

                      p(l.child(".list-row:first"))
                  }
                  , p = function (e) {
                      if (e && e.dom) {
                          //l.child(".list-row").removeClass("row-select");
                          l.query('.list-row').forEach(function (item) {
                              
                              Ext.fly(item).removeClass("row-select");
                          })
                          e.addClass("row-select");
                          var t = e.getAttribute("data-range")
                            , a = t.split(",")
                            , i = {
                                start: {
                                    row: parseInt(a[0]),
                                    column: parseInt(a[1])
                                },
                                end: {
                                    row: parseInt(a[2]),
                                    column: parseInt(a[3])
                                }
                            };
                          Editor.revealRange(i)
                      }
                  }
                  , u = function () {
                      var e = l;
                      //if (e.getHeight() != e.getAttribute("scrollHeight")) {
                      //    var t = e.getScroll().top
                      //      , a = t + e.height()
                      //      , i = e.child(".row-select").getAttribute("xh")
                      //      , n = e.child(".list-row:first").getHeight()
                      //      , o = e.getScroll().top;
                      //    t > i * n ? o = i * n : (i + 1) * n > a && (o = i * n - e.getHeight() + n),
                      //    e.scroll(o)
                      //}
                  }
                  , f = function () {
                      var e = "mouse_is_down";

                      var mouseEvent = function (t, obj) {

                          var a = Ext.get(obj);
                          switch (t.type) {
                              case "mouseover":
                                  a.parent().hasClass(e) ? p(a) : a.addClass("row-hover");
                                  break;
                              case "mousedown":
                                  p(a),
                                  a.parent().addClass(e);
                                  break;
                              case "mouseout":
                                  a.removeClass("row-hover");
                                  break;
                              case "mouseup":
                                  a.parent().removeClass(e);
                                  break;
                              default:
                          }
                      }
                      l.on('mouseover', mouseEvent, this, {
                          delegate: '.list-row'
                      })
                      l.on('mousedown', mouseEvent, this, {
                          delegate: '.list-row'
                      })
                      l.on('mouseout', mouseEvent, this, {
                          delegate: '.list-row'
                      })
                      l.on('mouseup', mouseEvent, this, {
                          delegate: '.list-row'
                      })
                      l.on("mouseup", function () {
                          r.focus()
                      });

                      var t = function () {
                          var e = r.getValue();
                          d(e),
                          "" == e ? s.child(".search-reset").addClass("hidden") : s.child(".search-reset").removeClass("hidden")
                      };
                      r.un("keydown").on("keydown", function (e) {
                          switch (e.keyCode) {
                              case 37:
                                  break;
                              case 39:
                                  break;
                              case 38:
                                  0 != s.child(".row-select").prev() && (p(s.child(".row-select").prev()),
                                  u()),
                                  e.stopEvent();
                                  break;
                              case 40:
                                  0 != s.child(".row-select").next() && (p(s.child(".row-select").next()),
                                  u()),
                                  e.stopEvent();
                                  break;
                              case 27:
                              case 13:
                                  p(s.child(".row-select")),
                                  r.getValue(""),
                                  t(),
                                  Editor.focus(),
                                  e.stopEvent();
                                  break;
                              default:
                                  setTimeout(t, 5)
                          }
                      }),
                      s.child(".search-reset").un("click").on("click", function () {
                          r.set({value:''},false);
                          t();
                          //Editor.focus()
                      })
                  };
                return f(),
                {
                    refresh: c
                }
            }

        }
    }
})