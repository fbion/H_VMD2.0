/*
description:报表在线设计功能封装
creater：mafei
date created：2018.11.24 
modifier：mafei
version：2.0.4.1124
copyright：Copyright © 2016-2018, hwkj, All Rights Reserved
*/
var page = this;

function ToolBarButton(t, selectionState) {
	this.toolbarbutton = null;
	this.selectionState = selectionState;
	this.icon = null;
	this.initToolBarButton(t);
}

function ToolBarMenuButton(t, e, o) {
	this.data = null,
		this.dropdown = null,
		this.container = null,
		this.isSeparation = !1,
		this.initToolBarMenuButton(t, e, o)
}

function ToolBarImageMenuButton(t, e, o) {
	this.initToolBarImageMenuButton(t, e, o)
}

function ToolBarContentMenuButton(t, e, o) {
	this.initToolBatContentMenuButton(t, e, o)
}

function ToolBarFontColorButton(t) {
	this.initToolBarFontColorMenuButton(t)
}

function ToolBarFontBgColorButton(t) {
	this.initToolBarFontBgColorMenuButton(t)
}

function ToolBarPaintBrushColorButton(t) {
	this.initToolBarPaintBrushColorMenuButton(t)
}

function ToolBarBorderButton(t, e, o) {
	this.container = e,
		this.onItemClickCallback = o,
		this.initToolBarBorderButton(t, o)
}
ToolBarButton.prototype._initStatus = function() {
		this.toolbarbutton && this.toolbarbutton.on("mousedown",
			function() {
				this.toolbarbutton.addClass("pressed")
					.one("mouseup",
						function() {
							this.toolbarbutton.removeClass("pressed")
						}.bind(this))
				var t = $("#tooltip"),
					e = t && t.data("target-dom");
				e && this.toolbarbutton.find(e) && t.remove()
			}.bind(this))
	},
	ToolBarButton.prototype.isEnable = function() {
		return !this.toolbarbutton.hasClass("toolbar-button-wrapper-disabled")
	},
	ToolBarButton.prototype.toggleCheck = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-checked") ? this.toolbarbutton.removeClass("toolbar-button-wrapper-checked") : this.toolbarbutton.addClass("toolbar-button-wrapper-checked")
	},
	ToolBarButton.prototype.check = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-checked") || this.toolbarbutton.addClass("toolbar-button-wrapper-checked")
	},
	ToolBarButton.prototype.uncheck = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-checked") && this.toolbarbutton.removeClass("toolbar-button-wrapper-checked")
	},
	ToolBarButton.prototype.isChecked = function() {
		return !!this.toolbarbutton.hasClass("toolbar-button-wrapper-checked")
	},
	ToolBarButton.prototype.disable = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-disabled") || this.toolbarbutton.addClass("toolbar-button-wrapper-disabled")
	},
	ToolBarButton.prototype.enable = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-disabled") && this.toolbarbutton.removeClass("toolbar-button-wrapper-disabled")
	},
	ToolBarButton.prototype.isHidden = function() {
		return !this.toolbarbutton.hasClass("toolbar-button-wrapper-hidden")
	},
	ToolBarButton.prototype.hide = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-hidden") || this.toolbarbutton.addClass("toolbar-button-wrapper-hidden")
	},
	ToolBarButton.prototype.show = function() {
		this.toolbarbutton.hasClass("toolbar-button-wrapper-hidden") && this.toolbarbutton.removeClass("toolbar-button-wrapper-hidden")
	},
	ToolBarButton.prototype.removeIconClassName = function(t) {
		this.icon.removeClass(t)
	},
	ToolBarButton.prototype.addIconClassName = function(t) {
		this.icon.addClass(t)
	},
	ToolBarButton.prototype.resetIconClassName = function() {
		this.icon.attr("class", ""),
			this.icon.addClass("docx-icon-container docx-icon-img-container")
	},
	ToolBarButton.prototype.initToolBarButton = function(t) {
		if (!t || !t.find) return null;
		this.toolbarbutton = $(t),
			this.icon = $(this.toolbarbutton.find(".docx-icon-container")[0]),
			this._initStatus()
	},
	ToolBarButton.prototype.registerSelectionState = function(t) {
		t.key || (t.key = this.toolbarbutton.attr("class"));
		try {
			this.selectionState.registerSelectionState(t)
		} catch (e) {
			$(window).bind("SelectionStateInitFinished",
				function() {
					selectionState.registerSelectionState(t)
				})
		}
	},
	ToolBarButton.prototype.registerInnerSheetSelectionState = function(t) {
		t.key || (t.key = this.toolbarbutton.attr("class"));
		try {
			innerSheetSelectionState.registerSelectionState(t)
		} catch (e) {
			$(window).bind("SelectionStateInitFinished",
				function() {
					innerSheetSelectionState.registerSelectionState(t)
				})
		}
	},
	ToolBarMenuButton.prototype = new ToolBarButton,
	ToolBarMenuButton.prototype.initToolBarMenuButton = function(t, e, o) {
		this.data = e,
			this.container = o,
			this.initToolBarButton(t)
	},
	ToolBarMenuButton.prototype.toggleIcon = function(t) {},
	ToolBarMenuButton.prototype.dropdownClickHandler = function(t) {
		var e = this;
		return function(o) {
			e.toggleIcon(t),
				e.toolbarbutton.attr("identity", t.identity),
				e.dropdown && e.dropdown.hide(),
				"function" == typeof t.rowclickcallback ? t.rowclickcallback(o) : "function" == typeof t.clickcallback && t.clickcallback(o)
		}
	},
	ToolBarMenuButton.prototype.prepareDropDownData = function(t) {},
	ToolBarMenuButton.prototype.initDropDown = function(t, e) {
		this.dropdown = new DropDown(t, e);
		var o = this;
		$(window).bind("SheetMouseDown",
				function(t) {
					o.dropdown.hide()
				}),
			$(window).bind("SheetScroll",
				function(t) {
					o.dropdown.hide()
				})
	},
	ToolBarMenuButton.prototype.handle = function(t) {
		if (!this.isSeparation || !$(t.target).parents(".toolbar-menu-button-icon").length && t.target != this.toolbarbutton.find(".toolbar-menu-button-icon")[0] && (t.target != this.toolbarbutton[0] || t.target == this.toolbarbutton[0] && t.offsetX > 22)) {
			if ($("#tooltip").remove(), !this.dropdown) {
				var e = this.prepareDropDownData(this.data);
				this.initDropDown(e, this.container)
			}
			if ("sheet-sort" == this.toolbarbutton.attr("id")) {
				var o = this.dropdown.getLastStatus(),
					n = reportToolbar.isSelectedSingleRow();
				if (!o || n && "multi" == o || !n && "single" == o) {
					var i = ["sheet-ascending-range-sort", "sheet-descending-range-sort"],
						r = {
							"sheet-ascending-range-sort": "'将选中范围按' + reportToolbar.getSelectedCol()[1] + '列升序'",
							"sheet-descending-range-sort": "'将选中范围按' + reportToolbar.getSelectedCol()[1] + '列降序'"
						},
						a = "single";
					n ? (r = {
								"sheet-ascending-range-sort": "选中多行后可用",
								"sheet-descending-range-sort": "选中多行后可用"
							},
							this.dropdown.disable(i)) : (this.dropdown.enable(i), a = "multi"),
						this.dropdown.updateToolTip(r),
						this.dropdown.setLastStatus(a)
				}
			} else if ("sheet-freeze" === this.toolbarbutton.attr("id")) {
				this.dropdown.enable(["sheet-freeze-cancel"])
			}
			this.dropdown.toggleDropDown()
		} else {
			this.dropdown && this.dropdown.hide();
			for (var l = 0; l < this.data.length; l++) {
				var c = this.data[l];
				if (this.toolbarbutton.attr("identity") == c.identity) {
					if ("function" == typeof c.iconclickcallback) {
						c.iconclickcallback();
						break
					}
					if ("function" == typeof c.clickcallback) {
						c.clickcallback();
						break
					}
				}
			}
		}
	},
	ToolBarMenuButton.prototype.check = function(t) {
		for (var e = null,
				o = 0; o < this.data.length; o++) {
			if (t == (e = this.data[o]).identity) return this.toggleIcon(e),
				this.toolbarbutton.attr("identity", e.identity),
				e;
			e = null
		}
		return this.resetIconClassName(),
			this.toolbarbutton.attr("identity", ""),
			null
	},
	ToolBarImageMenuButton.prototype = new ToolBarMenuButton,
	ToolBarImageMenuButton.prototype.initToolBarImageMenuButton = function(t, e, o) {
		this.initToolBarMenuButton(t, e, o)
	},
	ToolBarImageMenuButton.prototype.prepareDropDownData = function(t) {
		for (var e = [], o = 0; o < t.length; o++) {
			var n = t[o],
				i = {
					iconClsName: n.rowIconClsName,
					image: n.image,
					content: n.content,
					fontFamily: n.fontFamily,
					hover: n.hover,
					clickcallback: this.dropdownClickHandler(n),
					identity: n.identity
				};
			e.push(i)
		}
		return e
	},
	ToolBarImageMenuButton.prototype.toggleIcon = function(t) {
		this.resetIconClassName(),
			this.addIconClassName(t.iconClassName)
	},
	ToolBarContentMenuButton.prototype = new ToolBarMenuButton,
	ToolBarContentMenuButton.prototype.initToolBatContentMenuButton = function(t, e, o) {
		this.initToolBarMenuButton(t, e, o)
	},
	ToolBarContentMenuButton.prototype.prepareDropDownData = function(t) {
		for (var e = [], o = 0; o < t.length; o++) {
			var n = t[o],
				i = {
					iconClsName: n.rowIconClsName,
					image: n.image,
					content: n.content,
					hover: n.hover,
					fontFamily: n.fontFamily,
					disable: n.disable,
					clickcallback: this.dropdownClickHandler(n),
					title: n.title,
					detail: n.detail,
					template: n.template,
					contentClsName: n.contentClsName
				};
			e.push(i)
		}
		return e
	},
	ToolBarContentMenuButton.prototype.toggleIcon = function(t) {
		this.resetIconContent(),
			this.setIconContent(t),
			t.fontFamily && this.setFontFamily(t)
	},
	ToolBarContentMenuButton.prototype.resetIconClassName = function() {},
	ToolBarContentMenuButton.prototype.resetIconContent = function() {
		this.icon[0].innerText = ""
	},
	ToolBarContentMenuButton.prototype.setIconContent = function(t) {
		this.icon[0].innerText = t.iconContent || t.content || ""
	},
	ToolBarContentMenuButton.prototype.setFontFamily = function(t) {
		this.toolbarbutton.find(".toolbar-menu-button-icon").css("font-family", t.fontFamily)
	},
	ToolBarContentMenuButton.prototype.check = function(t) {
		var e = ToolBarMenuButton.prototype.check.call(this, t);
		return e || this.resetIconContent(),
			e
	},
	ToolBarFontColorButton.prototype = new ToolBarButton,
	ToolBarFontColorButton.prototype.initToolBarFontColorMenuButton = function(t) {
		this.initToolBarButton(t)
	},
	ToolBarFontColorButton.prototype.check = function(t) {
		t = t || "transparent"
	},
	ToolBarFontBgColorButton.prototype = new ToolBarButton,
	ToolBarFontBgColorButton.prototype.initToolBarFontBgColorMenuButton = function(t) {
		this.initToolBarButton(t)
	},
	ToolBarFontBgColorButton.prototype.check = function(t) {
		t = t || "transparent"
	},

	ToolBarPaintBrushColorButton.prototype = new ToolBarButton,
	ToolBarPaintBrushColorButton.prototype.initToolBarPaintBrushColorMenuButton = function(t) {
		this.initToolBarButton(t)
	},
	ToolBarPaintBrushColorButton.prototype.check = function(t) {
		t = t || "transparent"
	},
	ToolBarBorderButton.prototype = new ToolBarButton,
	ToolBarBorderButton.prototype.initToolBarBorderButton = function(t) {
		this.initToolBarButton(t)
	},
	ToolBarBorderButton.prototype.initBorderMenu = function(t) {
		this.borderMenu = new BorderMenu(t, this.onItemClickCallback)
	},
	ToolBarBorderButton.prototype.check = function(t) {},
	ToolBarBorderButton.prototype.handle = function(t) {
		this.borderMenu ? this.borderMenu.togglePalette(t) : (this.initBorderMenu(this.container), this.borderMenu.showPalette())
	};
var ToolBar = function() {
		function t(t, e) {
			var o = !1;
			if (t && t.length && e)
				for (var n = 0; n < t.length; n++)
					if (e == t[n]) {
						o = !0;
						break
					}
			return o
		}
		this.toolbarbuttons = {},
			self.toolbar = $("#toolbar"),
			this.iteratethrough = function(e, o) {
				for (var n = Object.getOwnPropertyNames(this.toolbarbuttons), i = 0; i < n.length; i++) {
					var r = this.toolbarbuttons[n[i]];
					r && r[e] && "function" == typeof r[e] && !t(o, n[i]) && r[e]()
				}
			},
			this.disable = function() {
				this.iteratethrough("disable")
			},
			this.enable = function() {
				this.iteratethrough("enable")
			},
			this.hide = function() {
				self.toolbar.removeClass("toolbar-shown").addClass("toolbar-hidden"),
					this.iteratethrough("hide")
			},
			this.show = function() {
				self.toolbar.removeClass("toolbar-hidden").addClass("toolbar-shown"),
					this.iteratethrough("show")
			},
			this.isEnable = function() {
				for (var t = Object.getOwnPropertyNames(this.toolbarbuttons), e = 0; e < t.length; e++) {
					var o = this.toolbarbuttons[t[e]];
					if (o && o.isEnable && o.isHidden && !o.isEnable() && !o.isHidden()) return !1
				}
				return !0
			},
			this.checkSingle = function(t, e) {
				for (var o = 0; o < e.length; o++) {
					var n = this.toolbarbuttons[e[o]];
					if (n && 0 == t.indexOf(n.toolbarbutton.attr("id"))) return n.check && n.check(t.split("&")[1]),
						o
				}
				return -1
			},
			this.uncheck = function(t) {
				this.iteratethrough("uncheck", t)
			},
			this.setDefaultCheck = function(t, e) {
				if (t instanceof Array || "string" == typeof t) {
					t = [].concat(t);
					for (var o = 0; o < t.length; o++)
						for (var n = t[o], i = 0; i < e.length; i++)
							if (-1 != n.indexOf(e[i])) {
								e.splice(i, 1);
								break
							}
					return t.concat(e)
				}
				return t
			},
			this.addIgnoreCheckItem = function(t) {
				this.ignoreCheckList || (this.ignoreCheckList = []),
					this.ignoreCheckList.push(t)
			},
			this.check = function(t) {
				this.uncheck(this.ignoreCheckList);
				var e = Object.getOwnPropertyNames(this.toolbarbuttons);
				if (window.isSheet || "BB08J2" != padeditor.ace.getSubId() || (t = this.setDefaultCheck(t, ["font-family", "font-size", "toolbar-font-color-group", "horizontal-align"])), t instanceof Array)
					for (var o = 0; o < t.length; o++) {
						var n = this.checkSingle(t[o], e); - 1 != n && e.splice(n, 1)
					} else "string" == typeof t ? this.checkSingle(t, e) : this.iteratethrough("check")
			},
			this.registerBaseListeners = function() {
				var t = this;
				$(window).bind("AfterSelectionState",
					function(e) {
						var o = e.detail.state;
						o = o || [],
							t.check(o)
					})
			}
	},
	ToolBarSheet = function(reportToolbar) {
		var me = this;
		//this.hot = {};
		var toolbar = reportToolbar.toolbar || {};
		//var reportToolbar = reporttoolbar;
		var _selectionState = reportToolbar.selectionState;
		var t = {
			"sheet-undo": "sheetundobutton",
			"sheet-redo": "sheetredobutton",
			"sheet-font-family": "sheetfontfamily",
			"sheet-font-size": "sheetfontsize",
			"sheet-bold": "sheetboldbutton",
			"sheet-italic": "sheetitalicsbutton",
			"sheet-underline": "sheetunderlinebutton",
			"sheet-strike": "sheetstrikebutton",
			"sheet-horizontal-align": "sheethorizontalalign",
			"sheet-vertical-align": "sheetverticalalign",
			"sheet-merge": "sheetmergecell",
			"sheet-sort": "sheetsort",
			"sheet-freeze": "sheetfreeze",
			"sheet-border": "sheetborder",
			"sheet-format": "sheetformat",
			"sheet-format-painter": "sheetformatpainterbutton",
			"sheet-clear-format": "sheetclearformatbutton",
			"sheet-textwrap": "sheettextwrapbutton"
		};
		e = {
			init: function() {
				e.inhert();
				e.initToolBarButtons();
				e.registerBaseListeners();
				e.registerListeners();
			},
			inhert: function() {
				this.temp = ToolBar,
					this.temp(),
					delete this.temp
			},
			registerListeners: function() {
				var t = this;
				$(window).on("networkOnline",
						function() {
							window.gEditable && t.toolbarbuttons.sheetinsertimage.enable()
						}),
					$(window).on("networkOffline",
						function() {
							t.toolbarbuttons.sheetinsertimage.disable()
						})
			},
			initToolBarButtons: function() {
				e.toolbarbuttons.sheetundobutton = new ToolBarButton(toolbar["sheet-undobutton"]);
				e.toolbarbuttons.sheetredobutton = new ToolBarButton(toolbar["sheet-redobutton"]);
				// e.toolbarbuttons.sheetundobutton.hide()
				// e.toolbarbuttons.sheetredobutton.hide()
				e.toolbarbuttons.sheetundobutton.disable()
				e.toolbarbuttons.sheetredobutton.disable()
				e.initFormatPainterButton(),
					e.initClearFormatButton(),
					e.initBoldButton(),
					e.initItalicsButton(),
					e.initUnderlineButton(),
					e.initStrikeButton(),
					e.initHorizontalAlign(),
					e.initVerticalAlign(),
					e.initFontColorButton(),
					e.initPaintBrushButton(),
					e.initFontSizeButton(),
					e.initFontFamilyButton(),
					e.initMergeCellButton(),
					e.initFormatButton(),
					e.initFreezeButton(),
					e.initBorderButton(),
					e.initTextwrapButton()

			},

			initFormatPainterButton: function() {
				var t = toolbar["sheet-format-painter"];
				e.toolbarbuttons.sheetformatpainterbutton = new ToolBarButton(t);
				e.addIgnoreCheckItem("sheetformatpainterbutton"),
					$(window).on("click",
						function(t) {
							0 == $(t.target).parents(".sheet-format-painter").length && (e.toolbarbuttons.sheetformatpainterbutton.uncheck(), "undefined" != typeof sheetHot && $(sheetHot.rootElement).removeClass("pointer_format"))
						}),
					$(top).bind("SheetDocumentLoadFinished",
						function() {
							$(top).bind("clearMatchProp",
								function() {
									e.toolbarbuttons.sheetformatpainterbutton.uncheck(),
										"undefined" != typeof sheetHot && $(sheetHot.rootElement).removeClass("pointer_format")
								})
						}),
					t.on("click",
						function() {
							e.toolbarbuttons.sheetformatpainterbutton.check();
							"undefined" != typeof sheetHot && $(sheetHot.rootElement).addClass("pointer_format")
						})
			},
			initClearFormatButton: function() {
				e.toolbarbuttons.sheetclearformatbutton = new ToolBarButton(toolbar["sheet-clear-format"]),
					e.addIgnoreCheckItem("sheetclearformatbutton")
			},
			initBoldButton: function() {
				e.toolbarbuttons.sheetboldbutton = new ToolBarButton(toolbar["sheet-boldbutton"], _selectionState);

				e.toolbarbuttons.sheetboldbutton.registerSelectionState({
					judge: function(t) {

						var e = $(t).css("font-weight");
						return "bold" == e ? "sheet-boldbutton" : parseInt(e) && parseInt(e) >= 700 ? "sheet-boldbutton" : void 0
					}
				})
			},
			initItalicsButton: function() {
				e.toolbarbuttons.sheetitalicsbutton = new ToolBarButton(toolbar["sheet-italicsbutton"]),
					e.toolbarbuttons.sheetitalicsbutton.registerSelectionState({
						judge: function(t) {
							if ("italic" == $(t).css("font-style")) return "sheet-italicsbutton"
						}
					})
			},
			initUnderlineButton: function() {
				e.toolbarbuttons.sheetunderlinebutton = new ToolBarButton(toolbar["sheet-underlinebutton"]),
					e.toolbarbuttons.sheetunderlinebutton.registerSelectionState({
						judge: function(t) {
							if (-1 != $(t).css("text-decoration").indexOf("underline")) return "sheet-underlinebutton"
						}
					})
			},
			initStrikeButton: function() {
				e.toolbarbuttons.sheetstrikebutton = new ToolBarButton(toolbar["sheet-strikebutton"]);
				e.toolbarbuttons.sheetstrikebutton.registerSelectionState({
					judge: function(t) {
						if (-1 != $(t).css("text-decoration").indexOf("line-through")) return "sheet-strikebutton"
					}
				})
				e.toolbarbuttons.sheetstrikebutton.hide()
			},
			initBorderButton: function() {
				e.toolbarbuttons.sheetborder = new ToolBarBorderButton(toolbar["sheet-border"], toolbar["toolbar-sheet-border-group"],
					function(t, e) {

						if (t && e) {
							var o = "sheetborder:" + t + ":" + e;
							reportToolbar.sheetButtonClick(o)
						} else console.log("setborder error borderCmd or selectedColor is null")
					})
			},
			initHorizontalAlign: function() {
				e.toolbarbuttons.sheethorizontalalign = new ToolBarImageMenuButton(toolbar["sheet-horizontal-align"], [{
						rowIconClsName: "docx-icon-common toolbar-icon-sheet-left-align-row",
						hover: "左对齐",
						identity: "sheet-horizontal-align-left",
						iconClassName: "docx-icon-common toolbar-icon-sheet-left-align",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-left-align")
						}
					}, {
						rowIconClsName: "docx-icon-common toolbar-icon-sheet-center-align-row",
						hover: "居中对齐",
						identity: "sheet-horizontal-align-center",
						iconClassName: "docx-icon-common toolbar-icon-sheet-center-align",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-center-align")
						}
					}, {
						rowIconClsName: "docx-icon-common toolbar-icon-sheet-right-align-row",
						hover: "右对齐",
						identity: "sheet-horizontal-align-right",
						iconClassName: "docx-icon-common toolbar-icon-sheet-right-align",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-right-align")
						}
					}], toolbar["toolbar-sheet-horizontal-align-group"]),
					e.toolbarbuttons.sheethorizontalalign.registerSelectionState({
						judge: function(t) {
							return ["left", "center", "right"].contains($(t).css("text-align")) ? "sheet-horizontal-align&sheet-horizontal-align-" + $(t).css("text-align") : "sheet-horizontal-align&sheet-horizontal-align-left"
						}
					})
			},
			initVerticalAlign: function() {
				e.toolbarbuttons.sheetverticalalign = new ToolBarImageMenuButton(toolbar["sheet-vertical-align"], [{
						rowIconClsName: "docx-icon-common toolbar-icon-sheet-top-align-row",
						hover: "顶端对齐",
						identity: "sheet-vertical-align-top",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-top-align")
						}
					}, {
						rowIconClsName: "docx-icon-common toolbar-icon-sheet-middle-align-row",
						hover: "居中对齐",
						identity: "sheet-vertical-align-middle",
						iconClassName: "docx-icon-common toolbar-icon-sheet-middle-align",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-middle-align")
						}
					}, {
						rowIconClsName: "docx-icon-common toolbar-icon-sheet-bottom-align-row",
						hover: "底端对齐",
						identity: "sheet-vertical-align-bottom",
						iconClassName: "docx-icon-common toolbar-icon-sheet-bottom-align",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-bottom-align")
						}
					}], toolbar["toolbar-sheet-vertical-align-group"]),
					e.toolbarbuttons.sheetverticalalign.registerSelectionState({
						judge: function(t) {
							return ["top", "middle", "bottom"].contains($(t).css("vertical-align")) ? "sheet-vertical-align&sheet-vertical-align-" + $(t).css("vertical-align") : "sheet-vertical-align&sheet-vertical-align-middle"
						}
					})
			},
			initFontColorButton: function() {
				e.toolbarbuttons.sheetfontcolorbutton = new ToolBarFontColorButton(toolbar["toolbar-sheet-font-color-group"]);
				toolbar["sheet-fontcolor-button"].colorPicker({
					colorButton: e.toolbarbuttons.sheetfontcolorbutton,
					onColorChange: function(t) {
						var e = "fontcolor:" + t;
						reportToolbar.sheetButtonClick(e)
					}
				});
				//test
				//
				toolbar["toolbar-sheet-font-color-group"].find(".toolbar-colorPicker-picker-wrapper").on("mousedown",
					function(t) {
						t.preventDefault()
					})
			},
			initPaintBrushButton: function() {
				e.toolbarbuttons.sheetpaintbrushcolorbutton = new ToolBarPaintBrushColorButton(toolbar["toolbar-sheet-paint-brush-color-group"]);
				toolbar["sheet-paint-brush-color-button"].colorPicker({
					colorButton: e.toolbarbuttons.sheetpaintbrushcolorbutton,
					pickerType: 2,
					onColorChange: function(t) {
						var e = "cellcolor:" + t;
						reportToolbar.sheetButtonClick(e)
					}
				});
				//test
				toolbar["toolbar-sheet-paint-brush-color-group"].find(".toolbar-colorPicker-picker-paint-wrapper").on("mousedown",
					function(t) {
						t.preventDefault()
					})
			},
			initFontSizeButton: function() {
				e.toolbarbuttons.sheetfontsize = new ToolBarContentMenuButton(toolbar["sheet-font-size"], [
				 {
						content: "12",
						identity: "sheet-font-size-12",
						iconContent: "12",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:12")
						}
					}, {
						content: "13",
						identity: "sheet-font-size-13",
						iconContent: "13",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:13")
						}
					}, {
						content: "14",
						identity: "sheet-font-size-14",
						iconContent: "14",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:14")
						}
					}, {
						content: "15",
						identity: "sheet-font-size-15",
						iconContent: "15",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:15")
						}
					}, {
						content: "16",
						identity: "sheet-font-size-16",
						iconContent: "16",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:16")
						}
					}, {
						content: "18",
						identity: "sheet-font-size-18",
						iconContent: "18",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:18")
						}
					}, {
						content: "19",
						identity: "sheet-font-size-19",
						iconContent: "19",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:19")
						}
					}, {
						content: "20",
						identity: "sheet-font-size-20",
						iconContent: "20",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:20")
						}
					}, {
						content: "21",
						identity: "sheet-font-size-21",
						iconContent: "21",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:21")
						}
					}, {
						content: "24",
						identity: "sheet-font-size-24",
						iconContent: "24",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:24")
						}
					}, {
						content: "27",
						identity: "sheet-font-size-27",
						iconContent: "27",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:27")
						}
					}, {
						content: "29",
						identity: "sheet-font-size-29",
						iconContent: "29",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:29")
						}
					}, {
						content: "30",
						identity: "sheet-font-size-30",
						iconContent: "30",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:30")
						}
					}, {
						content: "32",
						identity: "sheet-font-size-32",
						iconContent: "32",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:32")
						}
					}, {
						content: "35",
						identity: "sheet-font-size-35",
						iconContent: "35",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:35")
						}
					}, {
						content: "36",
						identity: "sheet-font-size-36",
						iconContent: "36",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:36")
						}
					}, {
						content: "37",
						identity: "sheet-font-size-37",
						iconContent: "37",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:37")
						}
					}, {
						content: "48",
						identity: "sheet-font-size-48",
						iconContent: "48",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:48")
						}
					}, {
						content: "64",
						identity: "sheet-font-size-64",
						iconContent: "64",
						iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:64")
						}
					}, {
						content: "96",
						identity: "sheet-font-size-96",
						iconContent: "96",
						iconClassName: "docx-icon-common toolbar-icon-sheet-middle-align",
						contentClsName: "dropdown-c-content-small",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("fontsize:96")
						}
					}], toolbar["toolbar-sheet-font-size-group"]),
					e.toolbarbuttons.sheetfontsize.registerSelectionState({
						judge: function(t) {
							var e, o = sheetHot.getSelectedRange();
							return o && (e = sheetHot.getCellMeta(o[0].highlight.row, o[0].highlight.col)).style && e.style.fontsize ? "sheet-font-size&sheet-font-size-" + parseInt(e.style.fontsize) : $(t).css("font-size") ? "sheet-font-size&sheet-font-size-" + (parseInt($(t).css("font-size")) - 4) : void 0
						}
					})
			},
			initFontFamilyButton: function() {
				e.toolbarbuttons.sheetfontfamily = new ToolBarContentMenuButton(toolbar["sheet-font-family"], [{
					content: "宋体",
					identity: "sheet-font-family-SimSun",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					fontFamily: "SimSun",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:0")
					}
				}, {
					content: "微软雅黑",
					identity: "sheet-font-family-Microsoft YaHei",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					fontFamily: "Microsoft YaHei",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:1")
					}
				}, {
					content: "华文仿宋",
					identity: "sheet-font-family-STFangsong",
					fontFamily: "STFangsong",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:2")
					}
				}, {
					content: "华文楷体",
					identity: "sheet-font-family-STKaiti",
					fontFamily: "STKaiti",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:3")
					}
				}, {
					content: "华文宋体",
					identity: "sheet-font-family-STSong",
					fontFamily: "STSong",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:4")
					}
				}, {
					content: "Arial",
					identity: "sheet-font-family-Arial",
					fontFamily: "Arial",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:5")
					}
				}, {
					content: "Comic Sans MS",
					identity: "sheet-font-family-Comic Sans MS",
					fontFamily: "Comic Sans MS",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:6")
					}
				}, {
					content: "Courier New",
					identity: "sheet-font-family-Courier New",
					fontFamily: "Courier New",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:7")
					}
				}, {
					content: "Georgia",
					identity: "sheet-font-family-Georgia",
					fontFamily: "Georgia",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:8")
					}
				}, {
					content: "Impact",
					identity: "sheet-font-family-Impact",
					fontFamily: "Impact",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:9")
					}
				}, {
					content: "Times New Roman",
					identity: "sheet-font-family-Times New Roman",
					fontFamily: "Times New Roman",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:10")
					}
				}, {
					content: "Trebuchet MS",
					identity: "sheet-font-family-Trebuchet MS",
					fontFamily: "Trebuchet MS",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:11")
					}
				}, {
					content: "Verdana",
					identity: "sheet-font-family-Verdana",
					fontFamily: "Verdana",
					iconClassName: "docx-icon-common toolbar-icon-sheet-top-align",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("fontfamily:12")
					}
				}], toolbar["toolbar-sheet-font-family-group"]);
				var t = ["Microsoft YaHei", "STFangsong", "STKaiti", "STSong", "Arial", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Times New Roman", "Trebuchet MS", "Verdana"];
				e.toolbarbuttons.sheetfontfamily.registerSelectionState({
					judge: function(e) {
						for (var o = 0; o < t.length; o++) {
							var n = $(e).css("font-family");
							if (-1 != (n = (n = n.split(",")[0]).replace(/\"/g, "")).indexOf(t[o])) return "sheet-font-family&sheet-font-family-" + t[o]
						}
						// return "sheet-font-family&sheet-font-family-Microsoft YaHei"
					}
				})
			},
			initMergeCellButton: function() {
				e.toolbarbuttons.sheetmergecell = new ToolBarButton(toolbar["sheet-merge-cell"]);
				$(".sheet-merge-cell hp-ui-button top-5 toolbar-button-wrapper toolbar-inline-block").on("mousedown",
					function(t) {
						reportToolbar.sheetButtonClick("sheet-merge-cell")
					})

				e.toolbarbuttons.sheetmergecell.registerSelectionState({
					judge: function(t) {

						var cell = sheetHot.dealInvert()[0];
						var sr = cell.sr;
						var er = cell.er;
						var sc = cell.sc;
						var ec = cell.ec;
						if (sr == er && sc == ec) {
							e.toolbarbuttons.sheetmergecell.disable()
						} else {
							e.toolbarbuttons.sheetmergecell.enable()
						}
						if (sr == er && sc == ec) {
							var td = sheetHot.getCell(sr, sc)
							if (td.style.fontWeight == 'bold') {
								$("#sheet-boldbutton").addClass('pressed')
							} else {
								$("#sheet-boldbutton").removeClass('pressed')

							}
							if (td.style.fontStyle == 'italic') {
								$("#sheet-italicsbutton").addClass('pressed')
							} else {
								$("#sheet-italicsbutton").removeClass('pressed')
							}
							if (td.style.textDecoration == 'underline') {
								$("#sheet-underlinebutton").addClass('pressed')
								$("#sheet-strikebutton").removeClass('pressed')
							} else {
								$("#sheet-underlinebutton").removeClass('pressed')
							}
							if (td.style.textDecoration == 'line-through') {
								$("#sheet-underlinebutton").removeClass('pressed')
								$("#sheet-strikebutton").addClass('pressed')
							} else {
								$("#sheet-strikebutton").removeClass('pressed')
							}
						}
						// if (sheetHot.isRedoAvailable()) {
						// 	e.toolbarbuttons.sheetredobutton.enable()
						// } else {
						// 	e.toolbarbuttons.sheetredobutton.disable()
						// }
						// if (sheetHot.isUndoAvailable()) {
						// 	e.toolbarbuttons.sheetundobutton.enable()
						// } else {
						// 	e.toolbarbuttons.sheetundobutton.disable()
						// }

					}
				})
			},
			initFreezeButton: function() {
				e.toolbarbuttons.sheetfreeze = new ToolBarImageMenuButton(toolbar["sheet-freeze"], [
					// {
					// 	content: "锁定首行",
					// 	identity: "sheet-freeze-row",
					// 	hover: "滚动时保持首行可见",
					// 	iconClassName: "docx-icon-common toolbar-icon-freeze",
					// 	contentClsName: "dropdown-c-content-normal",
					// 	clickcallback: function() {
					// 		reportToolbar.sheetButtonClick("sheet-freeze-row")
					// 	}
					// }, 
					{
						content: "锁定首列",
						identity: "sheet-freeze-col",
						hover: "滚动时保持首列可见",
						iconClassName: "docx-icon-common toolbar-icon-freeze",
						contentClsName: "dropdown-c-content-normal",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-freeze-col")
						}
					}, {
						content: "锁定窗格",
						identity: "sheet-freeze-cell",
						hover: "锁定至当前选中单元格",
						iconClassName: "docx-icon-common toolbar-icon-freeze",
						contentClsName: "dropdown-c-content-normal",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-freeze-cell")
						}
					}, {
						content: "取消锁定",
						identity: "sheet-freeze-cancel",
						hover: "取消当前所有锁定操作, 可滚动整个工作表",
						iconClassName: "docx-icon-common toolbar-icon-freeze",
						contentClsName: "dropdown-c-content-normal",
						clickcallback: function() {
							reportToolbar.sheetButtonClick("sheet-freeze-cancel")
						}
					}
				], toolbar["toolbar-sheet-freeze-group"])
			},
			initFormatButton: function() {

				e.toolbarbuttons.sheetformat = new ToolBarContentMenuButton(toolbar["sheet-format"], [{
					title: "常规",
					iconContent: "常规",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-default",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-default")
					}
				}, {
					title: "纯文本",
					iconContent: "纯文本",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-text",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-text")
					}
				}, {
					template: "template-dropdown-separator-row"
				}, {
					title: "数字",
					iconContent: "数字",
					detail: "0.95",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-numeral",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-numeral")
					}
				}, {
					title: "百分比",
					iconContent: "百分比",
					detail: "90.00%",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-percentage",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-percentage")
					}
				}, {
					title: "科学计数",
					iconContent: "科学计数",
					detail: "9.50E-01",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-exponential",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-exponential")
					}
				}, {
					template: "template-dropdown-separator-row"
				}, {
					title: "人民币",
					iconContent: "人民币",
					detail: "￥5.00",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-currency-chs",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-currency-chs")
					}
				}, {
					title: "港币",
					iconContent: "港币",
					detail: "HK$5.00",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-currency-hk",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-currency-hk")
					}
				}, {
					title: "美元",
					iconContent: "美元",
					detail: "$5.00",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-currency-en",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-currency-en")
					}
				}, {
					template: "template-dropdown-separator-row"
				}, {
					title: "时间",
					iconContent: "时间",
					detail: "11:33:34",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-time",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-time")
					}
				}, {
					title: "短日期",
					iconContent: "短日期",
					detail: "2016/12/12",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-date",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-date")
					}
				}, {
					title: "长日期",
					iconContent: "长日期",
					detail: "2016年12月12日",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-date-chs",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-date-chs")
					}
				}, {
					title: "日期时间",
					iconContent: "日期时间",
					detail: "2016/12/12 11:33:34",
					template: "template-dropdown-celltype-row",
					identity: "sheet-format-date-time",
					contentClsName: "dropdown-c-content-normal",
					clickcallback: function() {
						reportToolbar.sheetButtonClick("sheet-format-date-time")
					}
				}], toolbar["toolbar-sheet-format-group"]);
				e.toolbarbuttons.sheetformat.registerSelectionState({
					judge: function(t) {
						var e, o = sheetHot && sheetHot.getSelectedRange();
						if (o) {
							var n = (e = sheetHot.getCellMeta(o[0].highlight.row, o[0].highlight.col)).style && e.style.format,
								i = sheetHot.numericMap && sheetHot.numericMap.getNumericResult(o[0].highlight.row, o[0].highlight.col),
								r = i && i.autoType,
								a = n || r;
							if (a) return "sheet-format&sheet-format-" + a
						}
						return "sheet-format&sheet-format-default"
					}
				})
			},
			initTextwrapButton: function() {
				e.toolbarbuttons.sheettextwrapbutton = new ToolBarButton($("#sheet-textwrapbutton"));
			},
			initSearchButton: function() {
				e.toolbarbuttons.sheetsearch = new ToolBarButton($("#sheet-search"))
			},
			isToolBarButtonEnable: function(o) {
				if (o == "sheet-textwrap") return true;
				return !t[o] || this.toolbarbuttons[t[o]].isEnable()
			},
			bindHotEvents: function(t) {
				var o = function(t, o, n) {
					// n.length > 0 ? e.toolbarbuttons.sheetundobutton.enable() : e.toolbarbuttons.sheetundobutton.disable(),
					// o.length > 0 ? e.toolbarbuttons.sheetredobutton.enable() : e.toolbarbuttons.sheetredobutton.disable()
				};
				// t.addHook("afterDoDone", o),
				// t.addHook("afterUndoRedoDone", o),
				t.addHook("tryInsertShape",
					function(t) {
						setTimeout(function() {
							t ? padeditor.aceObserver.trigger("insert-image", t) : ($.report({
								act_type: 238
							}), padeditor.ace.insertImage())
						})
					})
			}
		};
		return e.init(),
			e
	},
	toolbarController = null;

$(".hp-ui-button-menu-wrapper a").on("click",
	function() {
		if (!$(this).hasClass("hp-ui-button-menu-disabled")) {
			var t = $(this).closest(".hp-ui-button");
			t.find(".hp-ui-button-menuitem-selected").removeClass("hp-ui-button-menuitem-selected"),
				buttonCloseMenu(t)
		}
	});
var buttonCloseMenu = function(t) {
	$("body").off(".hp-ui-button-menu"),
		t.find(".hp-ui-button-menu-wrapper").hide(),
		t.removeClass("hp-ui-button-active"),
		t.find(".hp-ui-button-menuitem-selected").removeClass("hp-ui-button-menuitem-selected"),
		t.trigger("menu-closed")
};

$(".hp-ui-button-menu").on("click",
	function() {
		var t = $(this);
		if (!t.attr("disabled")) {
			$("#tooltip").remove();
			var e = t.hasClass("hp-ui-button-menu-reverse"),
				o = t.find(".hp-ui-button-menu-wrapper"),
				n = t.find(".hp-ui-button-list-ul"),
				i = t.find(".hp-ui-button-list-ul li"),
				r = -1;
			if (t.data("close", buttonCloseMenu), o.is(":visible")) buttonCloseMenu(t);
			else {
				n.css("min-width", t.outerWidth() + "px"),
					o.show(),
					t.addClass("hp-ui-button-active");
				var a = Math.max(200, Math.min($("body").height() - n.offset().top - 50, 435));
				n.css("max-height", a + "px"),
					e && n.css("top", "-" + (n.outerHeight() + t.outerHeight() + 10) + "px"),
					window.setTimeout(function() {
							$("body").on("keydown.hp-ui-button-menu",
								function(e) {
									if (o.is(":hidden")) return !0;
									var a = r;
									switch (e.keyCode) {
										case 13:
											return n.find("li.hp-ui-button-menuitem-selected > a").trigger("click"), !1;
										case 27:
											return buttonCloseMenu(t), !1;
										case 38:
											r = r - 1 < 0 ? i.length - 1 : r - 1;
											break;
										case 40:
											r = (r + 1) % i.length;
											break;
										default:
											return !0
									}
									return n.find("li:nth-child(" + (a + 1) + ")").removeClass("hp-ui-button-menuitem-selected"),
										n.find("li:nth-child(" + (r + 1) + ")").addClass("hp-ui-button-menuitem-selected"), !1
								}).on("click.hp-ui-button-menu",
								function() {
									buttonCloseMenu(t)
								})
						},
						0)
			}
		}
	});
! function(t) {
	var e, o, n, i, r = 0,
		a = {
			control: t('<div class="toolbar-colorPicker-picker-wrapper" data-tooltip="字体颜色" class="hp-ui-button toolbar-menu-button-wrapper toolbar-colorPicker-menu-button-wrapper"><div id="toolbar-colorPicker-picker-outer-container" class="toolbar-menu-button-outer-container toolbar-menu-button-colorPicker-outer-container toolbar-inline-block" style="user-select: none;"><div id="toolbar-colorPicker-picker-inner-container" class="toolbar-button-inner-container toolbar-inline-block" style="user-select;none;"><div id="toolbar-colorPicker-picker-caption" class="toolbar-colorPicker-picker-caption toolbar-inline-block" style="user-select: none;"> <div id="toolbar-colorPicker-picker-text-outer" class="toolbar-colorPicker-picker-text-outer" style="user-select: none;"> <div id="toolbar-colorPicker-picker-text-bg" class="toolbar-colorPicker-picker-text-background" style="user-select: none;"> <div id="toolbar-colorPicker-picker-text-char" class="toolbar-colorPicker-picker-text-char toolbar-inline-block" style="user-select: none;">A</div></div></div></div><div id="toolbar-colorPicker-picker-icon-outer" class="toolbar-colorPicker-picker-icon-outer" style="user-select: none;"><div id="toolbar-colorPicker-picker-icon" class="toolbar-colorPicker-picker-icon toolbar-inline-block" style="user-select: none;"></div> </div></div></div></div>'),
			docControl: t('<div class="toolbar-colorPicker-picker-wrapper" data-tooltip="字体颜色" class="hp-ui-button toolbar-menu-button-wrapper toolbar-colorPicker-menu-button-wrapper"><div id="toolbar-colorPicker-picker-outer-container" class="toolbar-menu-button-outer-container toolbar-menu-button-colorPicker-outer-container toolbar-inline-block" style="user-select: none;"><div id="toolbar-colorPicker-picker-inner-container" class="toolbar-button-inner-container toolbar-inline-block" style="user-select;none;"><div id="toolbar-colorPicker-picker-caption" class="toolbar-colorPicker-picker-caption toolbar-inline-block" style="user-select: none;"> <div id="toolbar-colorPicker-picker-docx-text-outer" class="toolbar-colorPicker-picker-text-outer" style="user-select: none;"> <div id="toolbar-colorPicker-picker-text-bg" class="toolbar-colorPicker-picker-text-background" style="user-select: none;"> <div id="toolbar-colorPicker-picker-text-char" class="toolbar-colorPicker-picker-text-char toolbar-inline-block" style="user-select: none;">A</div></div></div></div><div id="toolbar-colorPicker-picker-icon-outer" class="toolbar-colorPicker-picker-icon-outer" style="user-select: none;"><div id="toolbar-colorPicker-picker-icon" class="toolbar-colorPicker-picker-icon toolbar-inline-block" style="user-select: none;"></div> </div></div></div></div>'),
			paintBrushControl: t('<div class="toolbar-colorPicker-picker-paint-wrapper" data-tooltip="填充颜色" class="hp-ui-button toolbar-menu-button-wrapper toolbar-colorPicker-menu-button-wrapper"><div id="toolbar-colorPicker-picker-paint-outer-container" class="toolbar-menu-button-outer-container toolbar-menu-button-colorPicker-outer-container toolbar-inline-block" style="user-select: none;"><div id="toolbar-colorPicker-picker-paint-inner-container" class="toolbar-button-inner-container toolbar-inline-block" style="user-select;none;"><div id="toolbar-colorPicker-picker-paint-caption" class="toolbar-colorPicker-picker-caption toolbar-inline-block" style="user-select: none;"> <div id="toolbar-colorPicker-picker-paint-text-outer" class="toolbar-colorPicker-picker-text-outer" style="user-select: none;"> <div id="toolbar-colorPicker-picker-paint-text-bg" class="toolbar-colorPicker-picker-text-background" style="user-select: none;"> <div id="toolbar-colorPicker-picker-paint-text-char" class="toolbar-colorPicker-picker-text-char docx-icon-common toolbar-colorPicker-picker-paint-brush toolbar-inline-block" style="user-select: none;"></div></div></div></div><div id="toolbar-colorPicker-picker-paint-icon-outer" class="toolbar-colorPicker-picker-icon-outer" style="user-select: none;"><div id="toolbar-colorPicker-picker-paint-icon" class="toolbar-colorPicker-picker-icon toolbar-inline-block" style="user-select: none;"></div> </div></div></div></div>'),
			paintDocBrushControl: t('<div class="toolbar-colorPicker-picker-paint-wrapper" data-tooltip="突出显示" class="hp-ui-button toolbar-menu-button-wrapper toolbar-colorPicker-menu-button-wrapper"><div id="toolbar-colorPicker-picker-paint-outer-container" class="toolbar-menu-button-outer-container toolbar-menu-button-colorPicker-outer-container toolbar-inline-block" style="user-select: none;"><div id="toolbar-colorPicker-picker-paint-inner-container" class="toolbar-button-inner-container toolbar-inline-block" style="user-select;none;"><div id="toolbar-colorPicker-picker-paint-caption" class="toolbar-colorPicker-picker-caption toolbar-inline-block" style="user-select: none;"> <div id="toolbar-colorPicker-picker-paint-docx-text-outer" class="toolbar-colorPicker-picker-text-outer" style="user-select: none;"> <div id="toolbar-colorPicker-picker-paint-text-bg" class="toolbar-colorPicker-picker-text-background" style="user-select: none;"> <div id="toolbar-colorPicker-picker-paint-text-char" class="toolbar-colorPicker-picker-text-char docx-icon-common toolbar-colorPicker-picker-doc-paint-brush toolbar-inline-block" style="user-select: none;"></div></div></div></div><div id="toolbar-colorPicker-picker-paint-icon-outer" class="toolbar-colorPicker-picker-icon-outer" style="user-select: none;"><div id="toolbar-colorPicker-picker-paint-icon" class="toolbar-colorPicker-picker-icon toolbar-inline-block" style="user-select: none;"></div> </div></div></div></div>'),
			palette: t('<div id="colorPicker_palette"  class="colorPicker-palette common-web-popup-boxshadow" />'),
			swatch: t('<div class="colorPicker-swatch" data-tooltip="">&nbsp;</div>'),
			tableRow: t('<tr class="colorPicker-palette-table-row" style="user-select: none;"></tr>'),
			paletteTable: t('<div style="user-select;none;" > <table  cellspacing="0" cellpadding="0" style="user-select: none;" ><tbody class="colorPicker-palette-table-body" id="colorPicker_tableBody" style="user-select: none;"></tbody> </table></div>')
		},
		s = {},
		l = "#000000",
		c = "#00b0f0",
		u = "#000000",
		d = "#00b0f0",
		h = {},
		p = {},
		f = {};
	t.fn.colorPicker = function(e) {
		t.fn.colorPicker.initColorPicker(e)
		this.each(function() {
			var o, m, g, b, v, w = t(this),
				y = t.extend({}, t.fn.colorPicker.defaults, e),
				C = t.fn.colorPicker.toHex(y.pickerDefault),
				k = t.fn.colorPicker.toHex(y.brushPickerDefault),
				S = a.palette.clone().attr("id", "colorPicker_palette-" + r),
				T = S[0].id,
				x = a.paletteTable.clone(),
				_ = x.find("#colorPicker_tableBody");
			if (e.colorButton) {

				e.colorButton.toolbarbutton.colorPickerBodyId = T;
			}
			h[T] = y.pickerType, s[T] = y, e.colorButton && (1 == y.pickerType ? n = e.colorButton : 2 == y.pickerType && (i = e.colorButton)), 1 == y.pickerType && y.isDoc ? o = a.docControl.clone() : 1 != y.pickerType || y.isDoc ? 2 == y.pickerType && y.isDoc ? o = a.paintDocBrushControl.clone() : 2 != y.pickerType || y.isDoc || (o = a.paintBrushControl.clone()) : o = a.control.clone(), t.each(y.colors, function(e) {
				e % 10 == 0 && (g && g.appendTo(_), g = a.tableRow.clone()), m = a.swatch.clone(), e < 10 && m.css("margin-bottom", "7px");
				var o = "#" + this;
				1 == y.pickerType ? (m.attr("id", "colorPicker-swatch-" + e), p[o] = "#" + m.attr("id")) : 2 == y.pickerType && (m.attr("id", "colorPicker-swatch-paint-" + e), f[o] = "#" + m.attr("id")), "transparent" === y.colors[e] ? (m.addClass("transparent").text("X"), t.fn.colorPicker.bindPalette(m, "transparent")) : (m.css("background-color", o), t.fn.colorPicker.bindPalette(m)), m.appendTo(g)
			}), g.appendTo(_), x.appendTo(S), t("body").append(S), S.hide(), w.after(o), 1 == y.pickerType ? (l = C, u = C, y.isDoc ? t("#toolbar-colorPicker-picker-docx-text-outer").css("border-bottom-color", C) : t("#toolbar-colorPicker-picker-text-outer").css("border-bottom-color", C)) : 2 == y.pickerType && (c = k, d = k, y.isDoc ? t("#toolbar-colorPicker-picker-paint-docx-text-outer").css("border-bottom-color", k) : t("#toolbar-colorPicker-picker-paint-text-outer").css("border-bottom-color", k)), b = o.find(".toolbar-colorPicker-picker-caption"), v = o.find(".toolbar-colorPicker-picker-icon-outer"), b && b.bind("click", function() {
				w.is(":not(:disabled)") && t.fn.colorPicker.applyColor(t("#" + T), o)
			}), v && v.bind("click", function() {
				var _color = t.fn.colorPicker.getCurColor(o);
				d = u = t.fn.colorPicker.toHex(_color);
				w.is(":not(:disabled)") && t.fn.colorPicker.togglePalette(t("#" + T), o)
			}), e && e.onColorChange ? o.data("onColorChange", e.onColorChange) : o.data("onColorChange", function() {}), r++
		});
		padutils.tooltip(".colorPicker-palette [data-tooltip]");
		return this;
	};
	t.extend(!0, t.fn.colorPicker, {
		initColorPicker: function(e) {

			e.colorPickerClass && a.control.addClass(e.colorPickerClass), window.addEventListener("SheetMouseDown", function(e) {
				t.fn.colorPicker.hidePalette()
			}), window.addEventListener("SheetScroll", function(e) {
				t.fn.colorPicker.hidePalette()
			}), window.addEventListener("closedropdown", function(e) {
				t.fn.colorPicker.hidePalette()
			})
			if (typeof sheetHot != 'undefined') {
				sheetHot.theT = t.fn.colorPicker
			}
		},
		toHex: function(t) {
			if (t.match(/[0-9A-F]{6}|[0-9A-F]{3}$/i)) return "#" === (t = t.toLowerCase()).charAt(0) ? t : "#" + t;
			if (!t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/)) return !1;
			var e = [parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10), parseInt(RegExp.$3, 10)],
				o = function(t) {
					if (t.length < 2)
						for (var e = 0, o = 2 - t.length; e < o; e++) t = "0" + t;
					return t
				};
			return 3 === e.length ? "#" + o(e[0].toString(16)) + o(e[1].toString(16)) + o(e[2].toString(16)) : void 0
		},
		checkMouse: function(n, i) {
			n.preventDefault();
			var r = o,
				a = t(n.target).parents("#" + r.attr("id")).length;
			if (!(n.target === e[0] || a > 0)) {
				var s = !1,
					l = n.target.id;
				l.length > 0 && l.indexOf("toolbar-colorPicker-picker") >= 0 && (s = !0), s || t.fn.colorPicker.hidePalette()
			}
		},
		hidePalette: function() {
			o && (o.unbind("mousedown", t.fn.colorPicker.checkMouse), t(document).unbind("mousedown", t.fn.colorPicker.checkMouse), t(window).unbind("resize", t.fn.colorPicker.hidePalette), o.removeClass("open"), o.hide())
		},
		showPalette: function(o) {
			var r = t.fn.colorPicker.getCurrentPickerType(),
				a = t.fn.colorPicker.getCurrentOptsType();
			if (1 == r) {
				if (!n.isEnable()) return;
				a.isDoc ? t.fn.colorPicker.addSwatchDownClass(1, l) : t.fn.colorPicker.addSwatchDownClass(1, u)
			} else if (2 == r) {
				if (!i.isEnable()) return;
				a.isDoc ? t.fn.colorPicker.addSwatchDownClass(2, c) : t.fn.colorPicker.addSwatchDownClass(2, d)
			}
			t("#tooltip").remove();
			var s = e.offset().left + o.outerWidth() < t(document.body).width() ? e.offset().left : e.offset().left + e.outerWidth() - o.outerWidth();
			o.css({
				top: e.offset().top + e.outerHeight() + 4,
				left: s
			});
			if (o) {
				o.addClass("open"), o.show();
				o.bind("mousedown", t.fn.colorPicker.checkMouse);
				t(document).bind("mousedown", t.fn.colorPicker.checkMouse);
				t(window).bind("resize", t.fn.colorPicker.hidePalette)
			}

		},
		togglePalette: function(n, i) {
			i && (e = i);
			var r = (o = n).attr("id");
			for (var a in h) {
				if (r !== a) {
					t("#" + a).unbind("mousedown", t.fn.colorPicker.checkMouse);
					t("#" + a).removeClass("open");
					t("#" + a).hide()
				}

			}
			o.hasClass("open") ? t.fn.colorPicker.hidePalette() : t.fn.colorPicker.showPalette(n)
		},
		applyColor: function(r, a) {
			o = r;
			var s, h = t.fn.colorPicker.getCurrentOptsType(),
				p = t.fn.colorPicker.getCurrentPickerType();
			if (1 == p) {
				if (!n.isEnable()) return;
				h.isDoc ? t.fn.colorPicker.addSwatchDownClass(1, l) : t.fn.colorPicker.addSwatchDownClass(1, u)
			} else if (2 == p) {
				if (!i.isEnable()) return;
				h.isDoc ? t.fn.colorPicker.addSwatchDownClass(2, c) : t.fn.colorPicker.addSwatchDownClass(2, d)
			}
			t.fn.colorPicker.hidePalette(), a && (e = a), 1 == (p = t.fn.colorPicker.getCurrentPickerType()) ? s = h.isDoc ? l : u : 2 == p && (s = h.isDoc ? c : d), t.fn.colorPicker.hidePalette(), s && e && e.data("onColorChange").call(e, s)
		},
		getCurColor: function(o) {

			var _color = o.find("#toolbar-colorPicker-picker-text-outer").css("border-bottom-color") || o.find("#toolbar-colorPicker-picker-paint-text-outer").css("border-bottom-color")
			return _color;
		},
		changeColor: function(o) {
			// o = "#ff0000"
			var n = t.fn.colorPicker.getCurrentPickerType(),
				i = t.fn.colorPicker.getCurrentOptsType();
			1 == n ? i.isDoc ? e.find("#toolbar-colorPicker-picker-docx-text-outer").css("border-bottom-color", o) :
				e.find("#toolbar-colorPicker-picker-text-outer").css("border-bottom-color", o) :
				2 == n && (i.isDoc ? e.find("#toolbar-colorPicker-picker-paint-docx-text-outer").css("border-bottom-color", o) :
					e.find("#toolbar-colorPicker-picker-paint-text-outer").css("border-bottom-color", o));
			t.fn.colorPicker.hidePalette();
			e._color = o;
			e.data("onColorChange").call(e, o)
		},
		getCurrentPickerType: function() {
			if (o && h) {
				var t = o.attr("id");
				return h[t]
			}
			return 0
		},
		getCurrentOptsType: function() {
			if (o && s) {
				var t = o.attr("id");
				return s[t]
			}
			return 0
		},
		removeSwatchDownClass: function(t, e) {
			if (e)
				if (1 == t) {
					var n = o.find(p[e]);
					p[e] && n.hasClass("colorPicker-swatch-down") && n.removeClass("colorPicker-swatch-down")
				} else {
					var i = o.find(f[e]);
					f[e] && i.hasClass("colorPicker-swatch-down") && i.removeClass("colorPicker-swatch-down")
				}
		},
		addSwatchDownClass: function(e, n) {
			if (n)
				if (n = t.fn.colorPicker.toHex(n), 1 == e) {
					var i = o.find(p[n]);
					p[n] && !i.hasClass("colorPicker-swatch-down") && i.addClass("colorPicker-swatch-down")
				} else if (2 == e) {
				var r = o.find(f[n]);
				f[n] && !r.hasClass("colorPicker-swatch-down") && r.addClass("colorPicker-swatch-down")
			}
		},
		bindPalette: function(e, o) {

			o = o || t.fn.colorPicker.toHex(e.css("background-color")), e.bind({
				click: function(e) {
					var n = t.fn.colorPicker.getCurrentPickerType(),
						i = t.fn.colorPicker.getCurrentOptsType();
					1 == n ? i.isDoc ? (t.fn.colorPicker.removeSwatchDownClass(1, l), l = o) : (t.fn.colorPicker.removeSwatchDownClass(1, u), u = o) : 2 == n && (i.isDoc ? (t.fn.colorPicker.removeSwatchDownClass(2, c), c = o) : (t.fn.colorPicker.removeSwatchDownClass(2, d), d = o));
					t.fn.colorPicker.changeColor(o)
					// sheetHot.theT = t.fn.colorPicker;
				},
				mouseover: function(e) {
					t(this).hasClass("colorPicker-swatch-down") || t(this).addClass("colorPicker-swatch-hover")
				},
				mouseout: function(e) {
					t(this).hasClass("colorPicker-swatch-hover") && t(this).removeClass("colorPicker-swatch-hover")
				}
			})
		}
	}), t.fn.colorPicker.changePickerColor = function(e, o, n) {
		if (e) {
			var i = t.fn.colorPicker.toHex(e);
			if (o) {
				var r = t.fn.colorPicker.toHex(t.fn.colorPicker.defaults.pickerDefault);
				t.fn.colorPicker.removeSwatchDownClass(1, l), l = r, t.fn.colorPicker.addSwatchDownClass(1, l), t("#toolbar-colorPicker-picker-text-outer").css("border-bottom-width", "0")
			} else if (i) {
				t.fn.colorPicker.removeSwatchDownClass(1, l), l = i, t.fn.colorPicker.addSwatchDownClass(1, l), t("#toolbar-colorPicker-picker-text-outer").css("border-bottom-color", i), "0px" === t("#toolbar-colorPicker-picker-text-outer").css("border-bottom-width") && t("#toolbar-colorPicker-picker-text-outer").css("border-bottom-width", "4px")
			}
		}
		if (n) {
			var a = t.fn.colorPicker.toHex(n);
			a && (t.fn.colorPicker.removeSwatchDownClass(2, c), c = a, t.fn.colorPicker.addSwatchDownClass(2, c), t("#toolbar-colorPicker-picker-paint-text-outer").css("border-bottom-color", a))
		}
	}, t.fn.colorPicker.isColorPaletteShow = function(e) {
		var n = !1;
		return e == t.fn.colorPicker.getCurrentPickerType() && o && o.hasClass("open") && (n = !0), n
	}, t.fn.colorPicker.defaults = {
		pickerDefault: "#000000",
		brushPickerDefault: "#00b0f0",
		colors: ["c00000", "ff0000", "ffc003", "ffff00", "91d051", "00af50", "00b0f0", "0070c0", "002060", "70309f", "ffffff", "000000", "e7e6e6", "44546a", "4472c4", "ed7d31", "a5a5a5", "ffc003", "5b9bd5", "70ad47", "f4f5f8", "848484", "d0cece", "d6dce4", "d9e2f2", "fae5d5", "ededed", "fff2cc", "deebf6", "e2efd9", "d8d8d8", "595959", "afabab", "adb9ca", "b4c6e7", "f7cbac", "dbdbdb", "fee598", "bdd7ee", "c5e0b3", "bfbfbf", "3f3f3f", "757070", "8496b0", "8eaad8", "f4b183", "c9c9c9", "ffd964", "9dc2e5", "a8d08d", "a5a5a5", "262626", "3a3838", "333f4f", "2f5496", "c55b11", "7b7b7b", "bf9001", "2e75b5", "538135", "7e7e7e", "0c0c0c", "171616", "232a35", "1e3864", "833d0b", "525252", "7e6000", "1f4e79", "375623"],
		colorsTips: ["白", "黑", "红", "橙", "黄", "葱绿", "湖蓝", "天色", "紫", "白练", "鼠", "虹", "薄卵", "蒸栗", "白绿", "蓝白", "天空", "紫水晶", "白鼠", "墨", "甚三红", "雄黄", "金子", "薄青", "白群", "薄花", "紫苑", "灰青", "石墨", "红绯", "红金", "枯茶", "绿青", "浅葱", "薄缥", "紫霞", "薄纯", "漆黑", "朱绯", "褐", "黑茶", "深绿", "苍蓝", "琉璃", "葡萄"],
		colorPickerClass: "",
		pickerType: 1
	}
}(jQuery);

Ext.define("BorderMenu", {
	isSetColorCallback: !1,
	borderColorPickerPalette: null,
	lastSelectedColor: "#000000",
	constructor: function(t, _event) {
		this.itemclick = _event;
		this.init(t);
	},
	togglePalette: function(t, ct) {

		var tbp = this.activetbp;
		var me = this;
		if (tbp) {
			tbp.hasClass("open") ? me.hidePalette(t) : me.showPalette(t)
		}

	},
	checkMouse: function(t) {
		if (t && t.currentTarget && t.currentTarget.id == 'ext-gen1') return
		if (t) {
			if (t.preventDefault(), t.currentTarget && t.currentTarget.id) {
				var e = t.currentTarget.id;
				if (e.length > 0 && "toolbar_border_palette" == e) return
			}
			var o = $(t.target).parents(".toolbar-sheet-border-group");
			if (o && o.attr("class") && o.attr("class").indexOf('toolbar-sheet-border-group') != -1) return;
			var n = $(t.target).parents("#common-color-picker-palette");
			if (n && "common-color-picker-palette" == n.attr("id") || "common-color-picker-palette" == $(t.target).attr("id")) return
		}
		//toolbar-border-palette
		if (this.hidePalette) {
			this.hidePalette(t);
		} else {
			try {
				// CommonColorPicker.getInstance().activeBorderMenu.hidePalette();
				var pl = $('.toolbar-border-palette');
				if (pl.hasClass('open')) {
					pl.prev().click()
				}
			} catch (ex) {

			}

		}

	},
	hidePalette: function(t) {
		var me = this;
		$(document).unbind("mousedown", me.checkMouse);
		$(window).unbind("resize", me.hidePalette);
		var tbp = this.activetbp;
		tbp.removeClass("open");
		tbp.hide();
	},
	setActivetbp: function(info) {

		this.activetbp = info;
	},
	showPalette: function(e) {
		var o = this.activetbp;
		var t = this.ct;
		o.css({
			position: 'absolute',
			left: t.offset().left,
			display: 'block',
			top: t.offset().top + 28
		})

		if (sheetHot) {
			sheetHot.customBorderPalette = o;
		}

		this.lastSelectedColor && t.find("#toolbar-border-palette-color-picker-text-outer").css("border-bottom-color", this.lastSelectedColor);
		r = null;
		o.addClass("open");

		o.show();
		var inst = CommonColorPicker.getInstance();
		//单例模式处理
		inst.activeBorderMenu = this;
		$(document).bind("mousedown", this.checkMouse);
		$(window).bind("resize", this.hidePalette)

		if (!page.moreBorderColorButton) {

			var MyDiv2 = document.getElementById('common-color-tableBody');
			var button2 = document.createElement("input");
			button2.setAttribute("type", "button");
			button2.setAttribute("value", "自定义颜色");
			button2.setAttribute("class", 'vmd-button');
			button2.style.width = "190px";
			MyDiv2.appendChild(button2);
			button2.onclick = function() {
				var value = ''
				dhtmlXColorPicker.prototype.i18n.zn = {
					labelHue: "H",
					labelSat: "S",
					labelLum: "L",
					labelRed: "R",
					labelGreen: "g",
					labelBlue: "B",
					btnSelect: "选择",
					btnCancel: "取消"
				}
				myColorPicker = new dhtmlXColorPicker({
					input: button2,
					color: value,
					closeable: false
				});
				myColorPicker.loadUserLanguage('zn');

				myColorPicker.show();
				myColorPicker.base.childNodes[0].style["z-index"] = '60300'
				var myEvent = myColorPicker.attachEvent("onSelect", function(color, node) {
					selectColor = color
					sheetHot.customBorderColor = color;
					sheetHot.borderSet();
					myColorPicker.unload();
					myColorPicker = null;
					sheetHot.render();
					if (sheetHot && sheetHot.customBorderPalette) {
						sheetHot.customBorderPalette.hide()
					}
					$("#toolbar_border_palette").hide();
				});
				var myEvent = myColorPicker.attachEvent("onCancel", function(color, node) {
					myColorPicker.unload();
					myColorPicker = null;
					if (sheetHot && sheetHot.customBorderPalette) {
						sheetHot.customBorderPalette.hide()
					}
					$("#toolbar_border_palette").hide();
				});
			}
			page.moreBorderColorButton = true;
		}
	},
	bindColorPicker: function(_t) {
		var t = this.ct;
		var me = this;
		_t && _t.bind("click", function(event) {
			//单例模式处理
			var inst = CommonColorPicker.getInstance();
			// inst.activeBorderMenu = me;
			me.isSetColorCallback || (me.isSetColorCallback = !0, inst.setColorSelectedCallback("toolbar-border-menu", function(val) {

				var _that = inst.activeBorderMenu;
				_that.hidePalette();
				if (val) {
					_that.lastSelectedColor = val;
					_that.ct.find("#toolbar-border-palette-color-picker-text-outer").css("border-bottom-color", val);
					null != _that.itemclick && _that.itemclick(null != r ? _that.bordertype[r] : "border-change", _that.lastSelectedColor)
				}

			}));

			var tbp = me.activetbp;
			var o = tbp.offset(),
				n = o.top + tbp.outerHeight(),
				a = o.left + 198 < $(document.body).width() ? o.left : o.left + tbp.outerWidth() - 198;
			inst.toggleColorPalette(me.lastSelectedColor, n, a, "toolbar-border-menu", t, !0)
		})
	},
	bindCell: function(t, o) {
		var me = this;
		t.bind({
			click: function(t) {
				$(this).parents('#tableBody').find('.toolbar-border-palette-table-row td >div').removeClass("toolbar-border-palette-icon-selected");
				$(this).addClass("toolbar-border-palette-icon-selected");
				r = o;
				me.itemclick(me.bordertype[o], me.lastSelectedColor);

				sheetHot.customBorderType = me.bordertype[o];
				sheetHot.borderSet()
			},
			mouseover: function(t) {
				$(this).hasClass("toolbar-border-palette-icon-selected") || $(this).addClass("toolbar-border-palette-icon-hover")
			},
			mouseout: function(t) {
				$(this).hasClass("toolbar-border-palette-icon-hover") && $(this).removeClass("toolbar-border-palette-icon-hover")
			}
		})
	},
	init: function(t) {
		this.ct = t;
		this.bordertype
		var o = ["toolbar-icon-sheet-border-all", "toolbar-icon-sheet-border-inner", "toolbar-icon-sheet-border-horizontal", "toolbar-icon-sheet-border-vertical", "toolbar-icon-sheet-border-outer", "toolbar-icon-sheet-border-left", "toolbar-icon-sheet-border-top", "toolbar-icon-sheet-border-right", "toolbar-icon-sheet-border-bottom", "toolbar-icon-sheet-border-clear"],
			n = ["所有边框", "内部边框", "水平边框", "垂直边框", "外部边框", "左侧边框", "顶部边框", "右侧边框", "底部边框", "无边框"],
			i = ["border-all", "border-inner", "border-horizontal", "border-vertical", "border-outer", "border-left", "border-top", "border-right", "border-bottom", "border-clear"],
			r = null,
			a = {
				palette: $('<div id="toolbar_border_palette"   class="toolbar-border-palette" />'),
				tableCell: $('<td class="toolbar-border-palette-table-td toolbar-inline-block" data-tooltip="" style="user-select: none;"> <div class="toolbar-border-palette-icon-outer toolbar-inline-block"  style="user-select: none;"> <div class="toolbar-border-palette-icon-container" style="user-select: none;">&nbsp;</div> </div></td>'),
				tableRow: $('<tr class="toolbar-border-palette-table-row" style="user-select: none;"></tr>'),
				paletteTable: $('<div style="user-select;none;" > <table class="toolbar-border-palette-table" cellspacing="0" cellpadding="0" style="user-select: none;" ><tbody class="toolbar-border-palette-table-body" id="tableBody" style="user-select: none;"></tbody> </table></div>'),
				borderColorPicker: $('<div id = "toolbar-border-palette-color-picker" class="toolbar-border-palette-color-picker-outer" style="user-select:none"><div id="toolbar-border-palette-color-picker-caption" class="toolbar-border-palette-colorPicker-picker-caption toolbar-inline-block" style="user-select: none;"> <div id="toolbar-border-palette-color-picker-text-outer" class="toolbar-border-palette-colorPicker-picker-text-outer" style="user-select: none;"> <div id="toolbar-border-palette-color-picker-text-bg" class="toolbar-border-palette-colorPicker-picker-text-background" style="user-select: none;"> <div id="toolbar-border-palette-color-picker-text-char" class="docx-icon-common toolbar-border-palette-colorPicker-picker-border-color toolbar-inline-block" style="user-select: none;"></div></div></div></div><div class="toolbar-border-palette-color-picker-text toolbar-inline-block">边框颜色</div><div class="toolbar-border-palette-colorPicker-icon toolbar-inline-block"></div></div>')
			};
		this.bordertype = i;
		var me = this;
		var _c = a.palette.clone()
		for (var e, i, r, l = _c, c = a.paletteTable.clone(), u = a.borderColorPicker.clone(), d = 0; d < o.length; d++) {
			d % 5 == 0 && (e && (r = c.find("#tableBody"), e.appendTo(r)), e = a.tableRow.clone()), (i = a.tableCell.clone()).find(".toolbar-border-palette-icon-container").addClass("docx-icon-common " + o[d]);
			var h = n[d];
			i.attr("data-tooltip", h), i.children().first().attr("id", "border-palette-swatch-" + d), me.bindCell(i.children().first(), d), i.appendTo(e)
		}

		e.appendTo(r);
		c.appendTo(l);
		me.bindColorPicker(u);
		u.appendTo(l);
		if (t) {
			vmd('body').append(l)
			//t.append(l);
			window.addEventListener("SheetMouseDown", function(t) {
				me.hidePalette(t)

			}, !1)
			window.addEventListener("SheetScroll", function(t) {
				me.hidePalette(t)
			}, !1)

		}


		//this.setActivetbp(t.find('.toolbar-border-palette'));
		this.setActivetbp(_c);
		padutils.tooltip("#toolbar_border_palette [data-tooltip]")
		Ext.defer(function() {
			padutils.tooltip("#toolbar_border_palette [data-tooltip]")
		})
	}
})

//工具
padutils = {
	validUrlRe: new RegExp("^(?:https?|sftp|ftps?|ssh|ircs?|file|gopher|telnet|nntp|worldwind|chrome|chrome-extension|svn|git|mms|smb|afp|nfs|(x-)?man|gopher|txmt)://|^mailto:|^xmpp:|^sips?:|^tel:|^sms:|^news:|^bitcoin:|^magnet:|^urn:|^geo:|^/", "i"),
	escapeHtml: function(e) {
		var t = /[&<>'"]/g;
		return t.MAP || (t.MAP = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&#34;",
			"'": "&#39;"
		}), e.replace(t, function(e) {
			return t.MAP[e]
		})
	},
	uniqueId: function() {
		function e(e, t) {
			return (Array(t + 1).join("0") + Number(e).toString(35)).slice(-t)
		}
		return [pad.getClientIp(), e(+new Date, 7), e(Math.floor(1e9 * Math.random()), 4)].join(".")
	},
	getLength: function(e) {
		for (var t = 0, n = 0; n < e.length; n++) {
			t += e.charCodeAt(n) <= 255 ? 1 : 2
		}
		return t
	},
	splitString: function(e, t) {
		var n = "",
			o = 0;
		if (padutils.getLength(e) <= t) n = e;
		else
			for (var i = 0; i < e.length; i++) {
				var r = e.charAt(i);
				if ((o += e.charCodeAt(i) <= 255 ? 1 : 2) > t) {
					n += "...";
					break
				}
				n += r
			}
		return n
	},
	getIsMobile: function() {
		return -1 != navigator.userAgent.toLowerCase().indexOf("iphone") || -1 != navigator.userAgent.toLowerCase().indexOf("ipad") || -1 != navigator.userAgent.toLowerCase().indexOf("android") || -1 != navigator.userAgent.toLowerCase().indexOf("ipod")
	},

	timediff: function(e) {
		function t(e, t) {
			return (e = Math.round(e)) + " " + t + (1 != e ? "s" : "") + " ago"
		}
		return (e = Math.max(0, (+new Date - +e - pad.clientTimeOffset) / 1e3)) < 60 ? t(e, "second") : (e /= 60) < 60 ? t(e, "minute") : (e /= 60) < 24 ? t(e, "hour") : t(e /= 24, "day")
	},

	getCheckbox: function(e) {
		return $(e).is(":checked")
	},
	setCheckbox: function(e, t) {
		t ? $(e).attr("checked", "checked") : $(e).removeAttr("checked")
	},
	bindCheckboxChange: function(e, t) {
		$(e).bind("click change", t)
	},
	encodeUserId: function(e) {
		return e.replace(/[^a-y0-9]/g, function(e) {
			return "." == e ? "-" : "z" + e.charCodeAt(0) + "z"
		})
	},
	decodeUserId: function(e) {
		return e.replace(/[a-y0-9]+|-|z.+?z/g, function(e) {
			return "-" == e ? "." : "z" == e.charAt(0) ? String.fromCharCode(Number(e.slice(1, -1))) : e
		})
	},
	setToolToastCss: function(e) {
		var t = $("#toolToast");
		t.length > 0 && e && $.each(e, function(e, n) {
			t.css(e, n)
		})
	},
	hideToolToast: function(e, t) {
		t || (t = $("#toolToastWrap:last")), setTimeout(function() {
			t.remove(), 0 == $("#toolToast:last").filter(":visible").length && $("#toolToast:last").show(), e && e()
		}, 200)
	},
	toolToast: function(e, t, n, o, i) {
		var r = !1;
		if (n && n.supportMobile && (r = !0, t || (t = {}), t)) {
			if (!t.top) try {
				t.top = $("header").height() + $("header").offset().top + $(window).scrollTop() + 10
			} catch (e) {
				"doc" === clientVars.padType ? t.top = "137px" : "sheet" === clientVars.padType && (t.top = "112px"), console.log("showTooltoast mobile fail")
			}
			t["background-color"] || (t["background-color"] = "rgba(0,0,0,0.7)"), t.color || (t.color = "#ffffff"), t["padding-left"] || (t["padding-left"] = "10px"), t["padding-right"] || (t["padding-right"] = "10px")
		}
		if (!padutils.getIsMobile() || r) {
			var s, a;
			if (padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0), a = o && i ? o : $("body"), "object" != typeof t && (t = {}), !i && !r) {
				delete t.top, delete t.left, delete t.right, delete t.bottom, delete t.width, delete t.height, delete t["max-width"], delete t["max-height"], delete t.position, delete t.transform;
				try {
					"doc" === clientVars.padType ? (s = $(".editor-wrapper").offset().top + $("#padeditor").scrollTop(), t.top = s, t.transform = "translateY(-50%)") : "sheet" === clientVars.padType && (t.top = $("header").height() + $("header").offset().top)
				} catch (e) {
					"doc" === clientVars.padType ? (t.top = "137px", t.transform = "translateY(-50%)") : "sheet" === clientVars.padType && (t.top = "112px"), console.log("showTooltoast fail")
				}
			}
			var c = $('<div id="toolToastWrap">').prependTo(a);
			c.css({
				left: "20px",
				right: "30px",
				borderSizing: "border-box",
				display: "none",
				position: "absolute",
				zIndex: 501
			}), r || c.css(t);
			var l = $("<div id='toolToast'>").prependTo(c),
				u = $("<span></span>").html(e).prependTo(l);
			if (r && (t && l.css(t), c.css("right", "20px")), n && n.isNeedBtn) {
				var d = $('<span id="toolToastBtn"></span>').html(n.btnText);
				u.append(d);
				var p = n.btnTextAfter;
				if (p) {
					var h = $('<span id="toolToastBtnAfter"></span').html(p);
					u.append(h)
				}
				d.click(function() {
					n.btnCallBack && n.btnCallBack()
				})
			}
			if (n && n.isNeedClose) {
				var f = $("<div class='toast-colse'>");
				l.append(f), f.hover(function() {
					$(this).addClass("toast-colse-hover")
				}, function() {
					$(this).removeClass("toast-colse-hover")
				}), l.css("padding-right", 36), f.click(function() {
					padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0)
				})
			} else if (n && n.isWarnning) {
				var g = $("<div class='toast-mark-white'>");
				l.prepend(g), l.css("background-color", "#ff7d6f"), l.css("color", "white"), l.css("padding-left", 34);
				var m = $("<div class='toast-colse-white'>");
				l.append(m), l.css("padding-right", 36), m.click(function() {
					padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0)
				})
			}
			c.show(), l.show(), n && n.toolToastCloseTime && parseFloat(n.toolToastCloseTime) && setTimeout(function() {
				padutils.hideToolToast(n && n.toolToastRemoveCallBack ? n.toolToastRemoveCallBack : void 0, c)
			}, parseFloat(n.toolToastCloseTime))
		}
	},
	toolTipMouseenter: function(e) {
		var extendParam = e.data ? e.data.extendParam : null,
			drawViewCallback = e.data ? e.data.drawViewCallback : null;
		padutils.setTimeoutId && (clearTimeout(padutils.setTimeoutId), padutils.setTimeoutId = 0), $("#tooltip").remove();
		var vtimeOut = 0;
		if (extendParam && extendParam.timeOut && (vtimeOut = extendParam.timeOut), !(extendParam && extendParam.showTtpInNeedScroll && $(this)[0].scrollWidth <= $(this).outerWidth())) {
			var handleElement = $(this),
				setTimeoutId = setTimeout(function() {
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
			vtimeOut > 0 && (padutils.setTimeoutId = setTimeoutId)
		}
	},
	toolTipMouseleave: function(e) {
		var t = e.data ? e.data.extendParam : null;
		$("#tooltip").remove(), padutils.setTimeoutId && (clearTimeout(padutils.setTimeoutId), padutils.setTimeoutId = 0), t && t.mouseleaveCallBack && t.mouseleaveCallBack()
	},
	baseTooltip: function(e, t, n) {
		if (!padutils.getIsMobile()) {
			this.removeTooltip(e);
			var o = $(e);
			o.on("mouseenter", null, {
				drawViewCallback: t,
				extendParam: n
			}, this.toolTipMouseenter), o.on("mouseleave", null, {
				drawViewCallback: t,
				extendParam: n
			}, this.toolTipMouseleave)
		}
	},
	tooltip: function(e, t) {
		return t = t || {}, padutils.baseTooltip(e, function(e, n, o) {
			if (o.siblings(".dropdown-wrapper.open").length > 0 || o.siblings(".toolbar-border-palette.open").length > 0 || "toolbar-colorPicker-picker-wrapper" == o.attr("id") && $.fn.colorPicker.isColorPaletteShow(1) || "toolbar-colorPicker-picker-paint-wrapper" == o.attr("id") && $.fn.colorPicker.isColorPaletteShow(2) || ("sheet-calculate-button" == o.attr("id") || "sheet-calculate-more" == o.attr("id")) && $("#sheet-calculate").siblings(".dropdown-wrapper.open").length > 0) $("#tooltip").remove();
			else {
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
			}
		}, t)
	},
	hideTooltip: function() {
		$("#tooltip").remove()
	},
	removeTooltip: function(e) {
		var t = this;
		$(e).each(function() {
			$(this).off("mouseenter", null, t.toolTipMouseenter), $(this).off("mouseleave", null, t.toolTipMouseleave)
		})
	},
	horizontalTooltip: function(e, t, n) {
		return t || (t = {}), t.tooltipArrowClass || (t.tooltipArrowClass = "tooltip-right"), padutils.baseTooltip(e, function(e, o, i) {
			n && n.height ? e.css("height", n.height) : e.css("height", i.outerHeight() - 6), e.css("line-height", e.css("height")), t && t["min-width"] && e.css("min-width", t["min-width"] - 16);
			var r, s = i.offset().top;
			r = "tooltip-right" == $(o).get(0).id ? i.offset().left + i.outerWidth() : i.offset().left - e.outerWidth() - 9, t && t.left && (r += t.left), s < 0 && o.css({
				top: e.outerHeight() / 2 + s
			}), e.css({
				top: s > 0 ? s : 0,
				left: r > 0 ? r : 0,
				zIndex: 1e5
			}).hide().fadeIn()
		}, t)
	},
	btnState: function(e, t, n, o) {
		e.mousedown(function(e) {
			$(this).addClass(o), $(this).removeClass(n + " " + t)
		}), e.mouseup(function(e) {
			$(this).removeClass(o + " " + t), $(this).addClass(n)
		}), e.mouseenter(function(e) {
			$(this).addClass(n), $(this).removeClass(t)
		}), e.mouseleave(function(e) {
			$(this).addClass(t), $(this).removeClass(n + " " + o)
		})
	},
	toolTextCount: function(e, t, n, o, i) {
		var r = i || $("body");
		o && o.isNeedReflush && $(window).resize(function() {
			n && "left" in n || (s = r.outerWidth() / 2 - e.outerWidth() / 2, e.css({
				left: s > 0 ? s : 0
			}))
		});
		var s = r.outerWidth() / 2 - e.outerWidth() / 2;
		e.css({
			left: s > 0 ? s : 0
		}), n && $.each(n, function(t, n) {
			e.css(t, n)
		}), e.text(t), e.show()
	},
	hideTextCount: function(e) {
		e.hide()
	}
};

$(window).on("resize", function() {
	$("#tooltip").remove()
});

//改为类结构，不用静态对象
Ext.define('ReportToolbar', {
	isSelectedSingleRow: function() {},
	isSingleMergeCell: function() {
		var e = window.sheetNode;
		if (!e) return !0;
		var t = e.getHotInstance(),
			n = e.getHotInstance().getSelectedRange(),
			o = t.mergeCells && t.mergeCells.mergedCellInfoCollection || null;
		if (!o || !o.length || !n) return !1;
		for (var r = 0, i = o.length; r < i; r++) {
			var a = o[r];
			if (n.from.row == a.row && n.from.col == a.col && n.to.row == a.row + a.rowspan - 1 && n.to.col == a.col + a.colspan - 1) return !0
		}
		return !1
	},
	getToolbarTpl: function() {
		return '<span  id="toolbar" class="toolbar toolbar-linespace-clear">' +
			'    <span class="hp-ui-button-group " data-type="sheet-undoredo">' +
			'        <div data-tooltip="撤销(Ctrl+Z)" class="sheet-undobutton hp-ui-button top-5 toolbar-button-wrapper toolbar-inline-block toolbar-button-wrapper-disabled" style="display:none">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-undo" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <div  data-tooltip="重做(Ctrl+Y)" class="sheet-redobutton hp-ui-button top-5 toolbar-button-wrapper toolbar-inline-block toolbar-button-wrapper-disabled" style="display:none">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-redo" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <div  data-tooltip="格式刷" class="sheet-format-painter hp-ui-button toolbar-button-wrapper toolbar-inline-block" style:"top:-1px">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-formatpainter" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <div  data-tooltip="清除格式" class="sheet-clear-format hp-ui-button toolbar-button-wrapper toolbar-inline-block" style:"top:-1px">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-clearformat" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <span  class="toolbar-sheet-format-group toolbar-inline-block" style="display:none">' +
			'            <div  data-tooltip="格式" identity="sheet-format-default" class="toolbar-button-wrapper-disabled sheet-format hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-menu-button-content docx-icon-container toolbar-inline-block toolbar-menu-button-content-format" style="user-select: none;">常规</div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'    </span>' +
			'    <span class="hp-ui-button-group vertical-separator">' +
			'    </span>' +
			'    <span class="toolbar-sheet-font--group hp-ui-button-group" data-type="sheet-align">' +
			'        <span  class="toolbar-sheet-font-family-group toolbar-inline-block">' +
			'            <div  data-tooltip="字体" identity="sheet-font-family-Microsoft YaHei" class="sheet-font-family hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-menu-button-content docx-icon-container toolbar-inline-block toolbar-menu-button-content-font-family" style="user-select: none; font-family: &quot;Microsoft YaHei&quot;;">微软雅黑</div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'        <span  class="toolbar-sheet-font-size-group toolbar-inline-block">' +
			'            <div data-tooltip="字号" identity="sheet-font-size-10" class="sheet-font-size hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-menu-button-content docx-icon-container toolbar-inline-block toolbar-menu-button-content-font-size" style="user-select: none;">10</div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'    </span>' +
			'    <span class="hp-ui-button-group vertical-separator">' +
			'    </span>' +
			'    <span  class="toolbar-sheet-group hp-ui-button-group" data-type="sheet-format">' +
			'        <div  data-tooltip="加粗 (Ctrl+B)" class="sheet-boldbutton hp-ui-button toolbar-button-wrapper toolbar-inline-block">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-bold" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <div  data-tooltip="倾斜 (Ctrl+I)" class="sheet-italicsbutton hp-ui-button toolbar-button-wrapper toolbar-inline-block">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-italic" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <div  data-tooltip="下划线 (Ctrl+U)" class="sheet-underlinebutton hp-ui-button toolbar-button-wrapper toolbar-inline-block">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-underline" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <div data-tooltip="删除线 (Ctrl+D)" class="sheet-strikebutton hp-ui-button toolbar-button-wrapper toolbar-inline-block">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container docx-icon-common toolbar-icon-strikethrough" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'        <span  class="toolbar-sheet-font-color-group toolbar-inline-block toolbar-font-color"  style="width:42px">' +
			'            <input class="sheet-fontcolor-button" type="text" name="sheet-fontcolor-button" value="#FFFFFF" style="display: none"/>' +
			'            </span>' +
			'        </span>' +
			'        <span class="hp-ui-button-group vertical-separator"> </span>' +
			'        <span  class="toolbar-sheet-align--group hp-ui-button-group" data-type="sheet-align">' +
			'           <span  class="toolbar-sheet-paint-brush-color-group toolbar-inline-block toolbar-font-color "  style="width:42px">' +
			'           <input class="sheet-paint-brush-color-button" type="text" name="sheet-paint-brush-color-button" value="#FFFFFF" style="display: none"/>' +
			'        </span>  ' +
			'        <span  class="toolbar-sheet-border-group toolbar-inline-block">' +
			'            <div  data-tooltip="边框" identity="sheet-left-align" class="sheet-border hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-inline-block" style="user-select: none;">' +
			'                            <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                                <div class="docx-icon-container docx-icon-img-container docx-icon-common toolbar-icon-sheet-border-all" style="user-select: none;">' +
			'                                </div>' +
			'                            </div>' +
			'                        </div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'        <span class="toolbar-sheet-mergecell-group toolbar-inline-block">' +
			'            <div  data-tooltip="合并单元格" class="sheet-merge-cell hp-ui-button top-5 toolbar-button-wrapper toolbar-inline-block toolbar-button-wrapper-disabled">' +
			'                <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                            <div class="docx-icon-img-container docx-icon-common toolbar-icon-merge-cell" style="user-select: none;">' +
			'                            </div>' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'    </span>' +
			'    <span class="hp-ui-button-group vertical-separator">' +
			'    </span>' +
			'    <span  class="toolbar-sheet-opr--group hp-ui-button-group" data-type="sheet-align">' +
			'        <span  class="toolbar-sheet-horizontal-align-group toolbar-inline-block">' +
			'            <div  data-tooltip="对齐" identity="sheet-horizontal-align-left" class="sheet-horizontal-align hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-inline-block" style="user-select: none;">' +
			'                            <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                                <div class="docx-icon-container docx-icon-img-container docx-icon-common toolbar-icon-sheet-left-align" style="user-select: none;">' +
			'                                </div>' +
			'                            </div>' +
			'                        </div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'        <span class="toolbar-sheet-vertical-align-group toolbar-inline-block">' +
			'            <div  data-tooltip="垂直对齐" identity="sheet-vertical-align-middle" class="sheet-vertical-align hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-inline-block" style="user-select: none;">' +
			'                            <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                                <div class="docx-icon-container docx-icon-img-container docx-icon-common toolbar-icon-sheet-middle-align" style="user-select: none;">' +
			'                                </div>' +
			'                            </div>' +
			'                        </div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'        <span class="toolbar-sheet-textwrapbutton-group toolbar-inline-block">' +
			'            <div  data-tooltip="自动换行" class="sheet-textwrapbutton hp-ui-button top-5 toolbar-button-wrapper toolbar-inline-block">' +
			'                <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                            <div class="docx-icon-img-container docx-icon-common toolbar-icon-textwrap" style="user-select: none;">' +
			'                            </div>' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'    </span>' +
			'    <span class="hp-ui-button-group vertical-separator">' +
			'    </span>' +
			'    <span  class="toolbar-sheet-cell--group hp-ui-button-group" data-type="sheet-align">' +
			'        <span  class="toolbar-sheet-freeze-group toolbar-inline-block">' +
			'            <div data-tooltip="冻结" class="sheet-freeze hp-ui-button toolbar-menu-button-wrapper">' +
			'                <div class="toolbar-menu-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="toolbar-menu-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="toolbar-menu-button-icon toolbar-inline-block" style="user-select: none;">' +
			'                            <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                                <div class="docx-icon-container docx-icon-img-container docx-icon-common toolbar-icon-freeze" style="user-select: none;">' +
			'                                </div>' +
			'                            </div>' +
			'                        </div>' +
			'                        <div class="toolbar-menu-button-dropdown toolbar-inline-block" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </span>' +
			'    </span>' +
			'        <div id="maxium" data-tooltip="最大化" style="font-size: 16px;height:20px;width:20px;margin:8px" class="icon-resize-full hp-ui-button toolbar-button-wrapper toolbar-inline-block">' +
			'            <div class="toolbar-button-outer-container toolbar-inline-block" style="user-select: none;">' +
			'                <div class="toolbar-button-inner-container toolbar-inline-block" style="user-select: none;">' +
			'                    <div class="docx-icon toolbar-inline-block" style="user-select: none;">' +
			'                        <div class="docx-icon-img-container toolbar-icon-max" style="user-select: none;">' +
			'                        </div>' +
			'                    </div>' +
			'                </div>' +
			'            </div>' +
			'        </div>' +
			'</span>' +
			'<script id="template-dropdown-wrapper" type="text/html"><div id="dropdown-wrapper" class="dropdown-wrapper common-web-popup-boxshadow"></div></script>' +
			'<script id="template-dropdown-image-content-row" type="text/html"><li class="li-dropdown-ic li-dropdown"><div class="dropdown-ic-img-wrapper dropdown-img-wrapper"><div class="dropdown-ic-img dropdown-img"></div></div><div class="dropdown-ic-content-wrapper dropdown-content-wrapper"><div class="dropdown-ic-content dropdown-content"></div></div></li></script>' +
			'<script id="template-dropdown-image-row" type="text/html"><li class="li-dropdown-i li-dropdown"><div class="dropdown-i-img-wrapper dropdown-img-wrapper"><div class="dropdown-i-img dropdown-img"></div></div></li></script>' +
			'<script id="template-dropdown-content-row" type="text/html"><li class="li-dropdown-c li-dropdown"><div class="dropdown-c-content-wrapper dropdown-content-wrapper"><div class="dropdown-c-content dropdown-content"></div></div></li></script>' +
			'<script id="template-dropdown-celltype-row" type="text/html"><li class="li-dropdown-celltype li-dropdown"><div class="dropdown-celltype-wrapper"><div class="dropdown-celltype-title"></div><div class="dropdown-celltype-detail"></div></div></li></script>' +
			'<script id="template-dropdown-separator-row" type="text/html"><div class="dropdown-separator-wrapper"><div class="dropdown-separator"></div></div></script>'
	},

	closeDropDown: function(e) {
		var t = document.createEvent("CustomEvent");
		t.initCustomEvent("closedropdown", !0, !0, {}), e.target.dispatchEvent(t)
	},
	jugeIsInsertReturn: function(e) {
		var t, n, o, r;
		switch (n = [(t = padeditor.ace.getRep()).selStart[0], t.selStart[1]], o = [t.selEnd[0], t.selEnd[1]], t.lines.atIndex(n[0]), r = t.lines.atIndex(t.selEnd[0]), e) {
			case "start":
				if (0 != n[1]) return !0;
				break;
			case "end":
				if (o[1] != r.text.length) return !0
		}
		return !1
	},
	getDom: function(cls) {
		if (this.hot && this.hot.rootScope.isNestedTable) {
			return vmd(this.hot.rootScope.el.dom).find(cls);
		} else {
			var toolbar = this.dom
			return vmd(toolbar).find(cls);
		}
	},
	setToolbar: function(name) {
		if (!this.toolbar) this.toolbar = {};
		this.toolbar[name] = this.getDom('.' + name);
	},
	_initToolbar: function() {
		var me = this;
		var toolbars = ['toolbar', 'sheet-undobutton', 'sheet-redobutton', 'sheet-format-painter', 'sheet-clear-format',
			'toolbar-sheet-format-group', 'sheet-format', 'toolbar-sheet-font--group', 'toolbar-sheet-font-family-group',
			'sheet-font-family', 'toolbar-sheet-font-size-group', 'sheet-font-size', 'toolbar-sheet-group', 'sheet-boldbutton',
			'sheet-italicsbutton', 'sheet-underlinebutton', 'sheet-strikebutton', 'toolbar-sheet-font-color-group',
			'sheet-fontcolor-button', 'toolbar-sheet-align--group', 'toolbar-sheet-paint-brush-color-group', 'sheet-paint-brush-color-button',
			'toolbar-sheet-border-group', 'sheet-border', 'toolbar-sheet-mergecell-group', 'sheet-merge-cell', 'toolbar-sheet-horizontal-align-group',
			'sheet-horizontal-align', 'toolbar-sheet-vertical-align-group', 'toolbar-sheet-textwrapbutton-group', 'sheet-textwrapbutton',
			'toolbar-sheet-cell--group', 'toolbar-sheet-freeze-group', 'sheet-freeze', "sheet-vertical-align", 'toolbar-max'
		];
		Ext.each(toolbars, function(item) {
			me.setToolbar(item);
		})
	},
	initToolbarEl: function() {
		this._initToolbar();
	},
	bind: function(cmp) {
		if (!(cmp && cmp.grid)) return;
		this.hot = cmp.grid;
		cmp.grid.toolbar = this.toolbar;
	},
	init: function(config) {
		//下来集中处理
		var me = this;
		if (config && config.hot) {
			this.hot = config.hot;
		}

		this.initToolbarEl();

		function t(t) {
			return function(n) {
				n.preventDefault ? n.preventDefault() : n.returnValue = !1;
				me.closeDropDown(n);
				me.toolbarClick(t, n);
				return !1;
			}
		}

		this.getDom('.innerSheet-savebutton').click(t("innersheetsave"));
		this.getDom('.toolbar').mousedown(function(e) {
			e.preventDefault ? e.preventDefault() : e.returnValue = !1
		})
		this.getDom('.sheet-format').click(t("sheet-format"))
		this.getDom('.sheet-merge-cell').click(t("sheet-merge"));

		this.getDom(".sheet-textwrapbutton").click(t("sheet-textwrap"));
		this.getDom(".alignleftbutton").click(t("alignleft"));
		this.getDom(".aligncenterbutton").click(t("aligncenter"));
		this.getDom(".alignrightbutton").click(t("alignright"));
		this.getDom(".sheet-undobutton").click(t("sheet-undo"));
		this.getDom(".sheet-redobutton").click(t("sheet-redo"));
		this.getDom(".sheet-format-painter").click(t("sheet-format-painter"));
		this.getDom(".sheet-clear-format").click(t("sheet-clear-format"));
		this.getDom(".sheet-border").click(t("sheet-border"));
		this.getDom(".sheet-boldbutton").click(t("sheet-bold"));
		this.getDom(".sheet-italicsbutton").click(t("sheet-italic"));
		this.getDom(".sheet-underlinebutton").click(t("sheet-underline"));
		this.getDom(".sheet-strikebutton").click(t("sheet-strike"));
		this.getDom(".sheet-horizontal-align").click(t("sheet-horizontal-align"));
		this.getDom(".sheet-vertical-align").click(t("sheet-vertical-align"));
		this.getDom(".sheet-font-size").click(t("sheet-font-size"));
		this.getDom(".sheet-font-family").click(t("sheet-font-family"));
		this.getDom(".sheet-sort").click(t("sheet-sort"));
		this.getDom(".sheet-freeze").click(t("sheet-freeze"));

		this.getDom(".toolbar-main").on("click", function(e) {

			me.getDom(".toolbar [data-type!=" + $(e.currentTarget).attr("data-type") + "]").removeClass("toolbar-show");
			me.getDom(".toolbar [data-type=" + $(e.currentTarget).attr("data-type") + "]").toggleClass("toolbar-show");
		})

		//初始化
		this.selectionState = new SheetSelectionState()
		this.toolbarController = new ToolBarSheet(this);
		//工具按钮增加tooltip
		padutils.tooltip(".canvas-toolbar [data-tooltip]");
	},
	dataURLToBlob: function(e) {
		var t;
		t = e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]);
		for (var n = e.split(",")[0].split(":")[1].split(";")[0], o = new ArrayBuffer(t.length), r = new Uint8Array(o), i = 0; i < t.length; i++) r[i] = t.charCodeAt(i);
		return new Blob([o], {
			type: n
		})
	},
	isEnabled: function() {
		return this.toolbarController.isEnable()
	},
	hide: function() {
		try {
			this.toolbarController.hide()
		} catch (e) {
			this.getDom(".toolbar").css("display", "none")
		}
	},
	show: function() {
		try {
			this.toolbarController.show()
		} catch (e) {
			this.getDom(".toolbar").css("display", "inline-block")
		}
	},
	disable: function() {
		this.toolbarController && this.toolbarController.disable()
	},
	enable: function() {
		this.toolbarController && this.toolbarController.enable()
	},
	toolbarClick: function(t, n) {
		var me = this;
		//var reportToolbar = this.hot.rootScope.reportToolbar;
		var reportToolbar = me;
		if (!this.toolbarController.isToolBarButtonEnable(t)) return !1;

		this.isEnabled() && (function(o) {
			if ("font-family" == t) me.toolbarController.toolbarbuttons.fontfamilybutton.handle(n);
			else if ("font-size" == t) me.toolbarController.toolbarbuttons.fontsizebutton.handle(n);
			else if ("insertimage" == t) o.insertImage();
			else if ("insertline" == t) o.insertline();
			else if ("inserttable" == t) o.inserttable();
			else if ("undo" == t || "redo" == t) o.doUndoRedo(t);
			else if ("formatpainter" == t) n.stopPropagation(), o.getCursorNodeFormat();
			else if ("clearformatting" == t) o.clearAllNodeFormat();
			else if ("fontsizezoom" == t);
			else if ("fontsizeshrink" == t);
			else if ("export" == t) o.doExport2();
			else if ("horizontal-align" == t) me.toolbarController.toolbarbuttons.horizontalalign.handle(n);
			else if ("insertunorderedlist" == t) o.doInsertUnorderedList();
			else if ("insertorderedlist" == t) o.doInsertOrderedList();
			else if ("inserttasklist" == t) o.doInsertTaskList();
			else if ("code" == t) o.doInsertCodeList();
			else if ("insertcomment" == t) o.doInsertComment();
			else if ("alignleft" == t) padeditor.ace.callWithAce(function(e) {
				e.doTextAlign("left")
			});
			else if ("aligncenter" == t) padeditor.ace.callWithAce(function(e) {
				e.doTextAlign("center")
			});
			else if ("alignright" == t) padeditor.ace.callWithAce(function(e) {
				e.doTextAlign("right")
			});
			else if ("indent" == t) o.doIndentOutdent(!1) || o.doInsertUnorderedList();
			else if ("outdent" == t) o.doIndentOutdent(!0);
			else if ("sheet-horizontal-align" == t) me.toolbarController.toolbarbuttons.sheethorizontalalign.handle(n);
			else if ("sheet-vertical-align" == t) me.toolbarController.toolbarbuttons.sheetverticalalign.handle(n);
			else if ("sheet-font-size" == t) me.toolbarController.toolbarbuttons.sheetfontsize.handle(n);
			else if ("sheet-font-family" == t) me.toolbarController.toolbarbuttons.sheetfontfamily.handle(n);
			else if ("sheet-sort" == t) me.toolbarController.toolbarbuttons.sheetsort.handle(n);
			else if ("sheet-freeze" == t) me.toolbarController.toolbarbuttons.sheetfreeze.handle(n);
			else if ("sheet-insert-link" == t) {
				(new SheetLinkBubble).show()
			} else if ("sheet-insert-image" == t) n.preventDefault(), o.insertImage();
			else if ("sheet-calculate" == t) me.toolbarController.toolbarbuttons.sheetcalculate.handle(n);
			else if ("sheet-format" == t) me.toolbarController.toolbarbuttons.sheetformat.handle(n);
			else if ("sheet-border" == t) {
				me.toolbarController.toolbarbuttons.sheetborder.handle(n);
			} else if ("header-1" == t || "header-2" == t) o.doSetHeadingLevel(t.split("-")[1]);
			else if ("sheet-bold" == t || "sheet-italic" == t || "sheet-underline" == t || "sheet-strike" == t || "sheet-undo" == t || "sheet-redo" == t || "sheet-merge" == t || "sheet-fix-row-col" == t || "sheet-format-painter" == t || "sheet-clear-format" == t) reportToolbar.sheetButtonClick(t);
			else if ("sheet-textwrap" === t) reportToolbar.sheetButtonClick(t);
			else if ("innersheetbold" == t || "innersheetitalics" == t || "innersheetunderline" == t || "innersheetstrike" == t || "innersheetundo" == t || "innersheetredo" == t || "innersheetformatpainter" == t || "innersheetclearformatting" == t) reportToolbar.innerSheetButtonClick(t);
			else if ("innersheetfontfamily" == t) me.toolbarController.toolbarbuttons.innersheetfontfamilybutton.handle(n);
			else if ("innersheetfontsize" == t) me.toolbarController.toolbarbuttons.innersheetfontsizebutton.handle(n);
			else if ("sheet-filter" === t) reportToolbar.sheetButtonClick(t);

		})({})
	},
	forEachAttr: function(e, t) {
		for (var n in e)
			if (n == t) return !0;
		return !1
	},
	setSelectionState: function(e) {
		clientVars.isMobile || $(padeditor.ace.getRoot()).trigger("getselectionstate")
	},
	editMode: function(e) {
		!($(e.target).parents("body > header").length || $(e.target).parents("#padeditor").length || $(e.target).parents("#padsidebar").length || $(e.target).parents("#mainmodals").length || $(e.target).is("#modaloverlay") || $(e.target).parents("#modaloverlay").length || $(e.target).is(".lightbox-container") || $(e.target).parents(".lightbox-container").length) || $(e.target).is("#padeditor") || $(e.target).is("#createpadform2") || $(e.target).parents("#createpadform2").length ? $("body").removeClass("edit-mode") : ($(e.target).is("#editor") || $(e.target).parents("#editor").length) && $("body").addClass("edit-mode")
	},
	readyToInsertImage: function() {
		var t = padeditor.aceObserver.insertpixelImage();
		return e.insertLoading(t), t
	},
	insertLoading: function(e) {
		$("<style>.placeholder-" + e + " .inline-img{width: 22px;background: url('//s1.url.cn/tim/docs/static/img/insertimagload-ed5b87dc53.png') no-repeat;background-size: 22px 22px;background-position:center;height:30pxanimation:  loadingAnimation 2s linear infinite; -webkit-animation: loadingAnimation 2s linear infinite; -moz-animation: loadingAnimation 2s linear infinite;}</style>").appendTo("head")
	},

	sheetButtonClick: function(t, n) {
		var o = this.hot;
		var p1 = t.split(':')[0];
		var p2 = t.split(':')[1];
		var p3 = t.split(':')[2];
		//处理操作
		if (o) {
			if (!o.getSelected()) {
				vmd.tip('请选择正确单元格区域', 'error');
				return;
			}
			if (t == 'sheet-undo') {
				if (o.isUndoAvailable()) o.undo();
				o.render()
				return;
			}
			if (t == 'sheet-redo') {
				if (o.isRedoAvailable()) o.redo();
				o.render()
				return;
			}
			if (t.split('-')[1] == "freeze") {
				var c = t.split('-')[2];
				if (c == 'cancel') {
					o.freeze(null, null, true)
				} else if (c == "row") {
					o.freeze(1, 0, false)
				} else if (c == "col") {
					o.freeze(0, 1, false)
					// o.setColHeader('lock', 0, 1)
				} else if (c == "cell") {
					if (!o.getSelected()) {
						vmd.tip('请选择正确单元格区域', 'error');
					} else {
						var temp = o.dealInvert()[0]
						var sr = temp.sr;
						var er = temp.er;
						var sc = temp.sc;
						var ec = temp.ec;
						if (sr == er && sc == ec) {
							o.freeze(sr + 1, sc + 1, false)
						}
					}
				}
				return;
			}
			if (t == "sheet-format-painter") {
				var cells = o.dealInvert();
				for (var i = 0; i < cells.length; i++) {
					var part = cells[i]
					var sr = part.sr
					var sc = part.sc
					var el = sheetHot.getCell(sr, sc)
					var info = o.getCellMeta(sr, sc).cellAttributeInfo;

					o.addHookOnce('afterSelectionEnd', function(sr, sc, er, ec, selectionLayerLevel) {
						var arr = [];
						for (var i = sr; i < er + 1; i++) {
							for (var n = sc; n < ec + 1; n++) {
								arr.push({
									row: i,
									col: n
								});
							}
						}
						for (var k = 0; k < arr.length; k++) {
							var r = arr[k].row;
							var c = arr[k].col;

							var td = sheetHot.getCell(r, c);
							td.style.backgroundColor = el.style.backgroundColor;
							td.style.fontSize = el.style.fontSize;
							td.style.fontFamily = el.style.fontFamily;
							td.style.color = el.style.color;
							td.style.fontStyle = el.style.fontStyle;
							td.style.textDecoration = el.style.textDecoration;
							td.style.fontWeight = el.style.fontWeight;
							td.style.verticalAlign = el.style.verticalAlign;

							if (!o.isNestedFirst(r, c)) {
								var temp = info.clone();
								temp.bgcolorInfo = info.bgcolorInfo.clone();
								temp.contentDetailInfo = info.contentDetailInfo.clone();
								temp.fontInfos = info.fontInfos.clone();
								// temp.borderInfo = info.borderInfo.clone();   //边框需要处理

								temp.textValue.value = this.getDataAtCell(r, c);

								o.setCellMeta(r, c, 'cellAttributeInfo', temp)

							}

						}
					})
				}
				return;
			}
			if (t == "sheet-merge") {
				if (!o.getSelected()) {
					vmd.tip('请选择正确单元格区域', 'error');
				} else {
					o.mergeCell();
				}
				return;
			}
			if (t == "sheet-clear-format") {
				o.contextMenu_clearCSS()
				o.render();
				return;
			}
			if (t == "sheet-textwrap") {
				var cell = o.dealInvert()[0];
				for (var i = cell.sr; i < cell.er + 1; i++) {
					for (var n = cell.sc; n < cell.ec + 1; n++) {
						var state = o.getCellMeta(i, n).cellAttributeInfo.alignInfo.autoenter.value;
						if (state == 1) {
							o.changeAttributeInfo(i, n, 'autoenter', 0)
						} else {
							o.changeAttributeInfo(i, n, 'autoenter', 1)
						}
					}
				}
			}
			///////////////////////////////////
			var cells = o.dealInvert();
			for (var i = 0; i < cells.length; i++) {
				var part = cells[i]
				var sr = part.sr
				var sc = part.sc
				var er = part.er
				var ec = part.ec
				if (sr == er && sc == ec) {
					o.changeCellMeta(sr, sc, t, o)
				} else {
					var arr = [];
					for (var i = sr; i < er + 1; i++) {
						for (var n = sc; n < ec + 1; n++) {
							arr.push({
								row: i,
								col: n
							});
						}
					}
					for (var k = 0; k < arr.length; k++) {
						var r = arr[k].row;
						var c = arr[k].col;
						if (o.getCellMeta(r, c).mergeId != 2) {
							o.changeCellMeta(r, c, t, o)
						}
					}
				}
			}

			var mObj = o.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
			var copy = [];
			for (var n = 0; n < mObj.length; n++) {
				copy.push(mObj[n])
			}
			o.updateSettings({
				mergeCells: copy
			})
		}
	}
})

var CommonColorPicker = function() {
	var t, e, o = !1,
		n = ["toolbar-border-palette-color-picker"],
		i = ["c00000", "ff0000", "ffc003", "ffff00", "91d051", "00af50", "00b0f0", "0070c0", "002060", "70309f", "ffffff", "000000", "e7e6e6", "44546a", "4472c4", "ed7d31", "a5a5a5", "ffc003", "5b9bd5", "70ad47", "f4f5f8", "848484", "d0cece", "d6dce4", "d9e2f2", "fae5d5", "ededed", "fff2cc", "deebf6", "e2efd9", "d8d8d8", "595959", "afabab", "adb9ca", "b4c6e7", "f7cbac", "dbdbdb", "fee598", "bdd7ee", "c5e0b3", "bfbfbf", "3f3f3f", "757070", "8496b0", "8eaad8", "f4b183", "c9c9c9", "ffd964", "9dc2e5", "a8d08d", "a5a5a5", "262626", "3a3838", "333f4f", "2f5496", "c55b11", "7b7b7b", "bf9001", "2e75b5", "538135", "7e7e7e", "0c0c0c", "171616", "232a35", "1e3864", "833d0b", "525252", "7e6000", "1f4e79", "375623"],
		r = "#000000",
		a = {},
		s = {},
		l = "common-color-picker-palette",
		c = {
			palette: $('<div id="common-color-picker-palette"  class="common-color-picker-palette" />'),
			tableRow: $('<tr class="colorPicker-palette-table-row" style="user-select: none;"></tr>'),
			swatch: $('<div class="colorPicker-swatch" data-tooltip="">&nbsp;</div>'),
			paletteTable: $('<div style="user-select;none;" > <table class="toolbar-border-palette-table" cellspacing="0" cellpadding="0" style="user-select: none;" ><tbody class="toolbar-border-palette-table-body" id="common-color-tableBody" style="user-select: none;"></tbody> </table></div>')
		};

	function u(t) {
		if (t.match(/[0-9A-F]{6}|[0-9A-F]{3}$/i)) return "#" === (t = t.toLowerCase()).charAt(0) ? t : "#" + t;
		if (!t.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s* \)$/)) return !1;
		var e = [parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10), parseInt(RegExp.$3, 10)],
			o = function(t) {
				if (t.length < 2)
					for (var e = 0, o = 2 - t.length; e < o; e++) t = "0" + t;
				return t
			};
		return 3 === e.length ? "#" + o(e[0].toString(16)) + o(e[1].toString(16)) + o(e[2].toString(16)) : void 0
	}
	var d = {
		setColorSelectedCallback: function(t, e) {
			return void 0 == s[t] && (s[t] = e, !0)
		},
		toggleColorPalette: function(o, n, i, r, a, s) {
			t && (e = r, l = s ? "common-color-picker-palette" : "colorPicker-palette", t.hasClass("open") ? d.hideColorPalette(a) : d.showColorPalette(o, n, i, a))
		},
		checkMouse: function(t) {
			var e = $(t.target).parents("#common-color-picker-palette");
			if (!e || "common-color-picker-palette" != e.attr("id")) {
				for (var o = 0; o < n.length; o++)
					if (t.target.id == n[o] || $(t.target).parents("#" + n[o]).attr("id") == n[o]) return;
				d.hideColorPalette(t)
			}
		},
		hideColorPalette: function(e) {
			t && (t.unbind("mousedown", d.checkMouse), $(document).unbind("mousedown", d.checkMouse), $(window).unbind("resize", d.hideColorPalette), t.removeClass("open"), t.hide())
		},
		showColorPalette: function(e, o, n, i) {
			//先清空历史记录
			try {
				t.find("#common-color-tableBody").children().find('div').removeClass('colorPicker-swatch-down')
			} catch (ex) {}

			t && (d.updateSwatchSelectedClass(2, r), d.updateSwatchSelectedClass(1, e), t.css({
				top: o,
				left: n
			}), l && !t.hasClass(l) && (t.removeClass("common-color-picker-palette"), t.removeClass("colorPicker-palette"), t.addClass(l)), t.bind("mousedown", d.checkMouse), $(document).bind("mousedown", d.checkMouse), $(window).bind("resize", d.hideColorPalette), t.addClass("open"), t.show())
		},
		updateSwatchSelectedClass: function(e, o) {
			if (o = u(o)) {
				var n = a[o];
				if (t && void 0 != n) {
					var i = t.find("#common-color-tableBody").children(),
						r = Math.floor(n / 10),
						s = $(i[r]).children(),
						l = $(s[n % 10]);
					l && (1 == e ? l.hasClass("colorPicker-swatch-down") || l.addClass("colorPicker-swatch-down") : 2 == e && l.hasClass("colorPicker-swatch-down") && l.removeClass("colorPicker-swatch-down"))
				}
			}
		},
		bindSwatch: function(t, o) {

			o = o || u(t.css("background-color")), t.bind({
				click: function(t) {
					// if (o && o !== r) {
					if (d.updateSwatchSelectedClass(2, r), r = o, e) {
						var n = s[e];
						n && n(o)
					}
					sheetHot.customBorderColor = o || '#000';
					d.hideColorPalette(t)
					sheetHot.borderSet();
					//}
				},
				mouseover: function(t) {
					$(this).hasClass("colorPicker-swatch-down") || $(this).addClass("colorPicker-swatch-hover")
				},
				mouseout: function(t) {
					$(this).hasClass("colorPicker-swatch-hover") && $(this).removeClass("colorPicker-swatch-hover")
				}
			})
		},
		init: function() {
			t = c.palette.clone();
			for (var e = null, n = null, r = c.paletteTable.clone(), s = r.find("#common-color-tableBody"), l = 0; l < i.length; l++) {
				l % 10 == 0 && (n && n.appendTo(s), n = c.tableRow.clone()), e = c.swatch.clone(), l < 10 && e.css("margin-bottom", "7px");
				var u = "#" + i[l];
				a[u] = l, e.css("background-color", u), e.attr("id", "common-colorPicker-swatch-" + l), d.bindSwatch(e, u), e.appendTo(n)
			}
			n.appendTo(s), r.appendTo(t), $("body").append(t), t.hide(), padutils.tooltip(".common-color-picker-palette [data-tooltip]"), window.addEventListener("SheetMouseDown", function(t) {
				d.hideColorPalette()
			}), window.addEventListener("SheetScroll", function(t) {
				d.hideColorPalette()
			}), o = !0
		}
	};
	return {
		getInstance: function() {
			return o || d.init(), d
		}
	}
}();

//下拉框
indexDropdown = 0;
DropDown = function(e, t) {
	var n = 0,
		o = 0,
		i = null,
		r = null,
		s = {},
		a = null,
		c = {
			getMyId: function(e) {
				return e + "-" + n
			},
			setMyRowId: function(e, t) {
				var i = "li-dropdown-" + n + "-" + o++;
				e.attr("id", i), t && (s[t] = "#" + i)
			},
			initMyId: function() {
				n = indexDropdown++, i.attr("id", c.getMyId("dropdown-wrapper"))
			},
			isNoemalImageContentTemplate: function(e) {
				return "template-dropdown-image-content-row" == e || "template-dropdown-image-row" == e || "template-dropdown-content-row" == e
			},
			getNormalImageContentRowHtml: function(e, t) {
				if ("template-dropdown-image-content-row" == t || "template-dropdown-image-row" == t || "template-dropdown-content-row" == t) {
					var n = $($("#" + t).html()),
						o = e.image,
						i = e.content,
						r = e.fontFamily,
						s = e.clickcallback,
						a = e.hover,
						l = e.disable,
						u = e.iconClsName,
						d = e.contentClsName;
					if (!o && !i && !s) return;
					return e.drawviewcallback ? e.drawviewcallback(n, e) : (o ? $(n).find(".dropdown-img").css("background-image", "url(" + o + ")") : $(n).find(".dropdown-img img").hide(), i ? $(n).find(".dropdown-content").append(i) : $(n).find(".dropdown-content").hide(), d && $(n).find(".dropdown-content").addClass(d), r && $(n).find(".dropdown-content").css("font-family", r), l && $(n).find(".dropdown-content").css("opacity", .3), a && ($(n).first("li.li-dropdown").attr("data-tooltip", a), padutils.horizontalTooltip($(n).first("li.li-dropdown"), {
						"min-width": 66,
						left: -15
					})), u && $(n).find(".dropdown-img").addClass(u)), !l && s && "function" == typeof s && $(n).on("click", function(e) {
						s(e)
					}), padutils.btnState($(n), "", "li-dropdown-hover", "li-dropdown-clicked"), c.setMyRowId($(n), e.identity), n
				}
				return null
			},
			isCelltypeTemplate: function(e) {
				return "template-dropdown-celltype-row" === e || "template-dropdown-separator-row" === e
			},
			getCelltypeRowHtml: function(e, t) {
				if ("template-dropdown-celltype-row" === t) {
					var n = $($("#" + t).html()),
						o = e.title,
						i = e.detail,
						r = e.clickcallback,
						s = e.hover;
					if (!o || !r) return;
					return e.drawviewcallback ? e.drawviewcallback(n, e) : ($(n).find(".dropdown-celltype-title").append(o), i ? $(n).find(".dropdown-celltype-detail").append(i) : $(n).find(".dropdown-celltype-detail").addClass("hidden"), s && ($(n).first("li.li-dropdown").attr("data-tooltip", s), padutils.horizontalTooltip($(n).first("li.li-dropdown"), {
						"min-width": 66,
						left: -15
					}))), r && "function" == typeof r && $(n).on("click", function(e) {
						r(e)
					}), padutils.btnState($(n), "", "li-dropdown-hover", "li-dropdown-clicked"), c.setMyRowId($(n), e.identity), n
				}
				return "template-dropdown-separator-row" === t ? n = $($("#" + t).html()) : null
			},
			getRowTemplate: function(e) {
				return e.template || (e.image || e.iconClsName) && e.content && "template-dropdown-image-content-row" || (e.image || e.iconClsName) && !e.content && "template-dropdown-image-row" || !(e.image || e.iconClsName) && e.content && "template-dropdown-content-row" || "template-dropdown-image-content-row"
			},
			getRowHtml: function(e) {
				var t = c.getRowTemplate(e),
					n = null;
				return c.isCelltypeTemplate(t) ? n = c.getCelltypeRowHtml(e, t) : c.isNoemalImageContentTemplate(t) && (n = c.getNormalImageContentRowHtml(e, t)), n
			},
			updateDropDown: function(e) {
				r.append($(e))
			},
			disable: function(e) {
				if (e)
					for (var t = 0; t < e.length; t++) {
						var n = e[t];
						s[n] && ($(s[n]).hasClass("disabled") || $(s[n]).addClass("disabled"))
					}
			},
			enable: function(e) {
				if (e)
					for (var t = 0; t < e.length; t++) {
						var n = e[t];
						s[n] && $(s[n]).hasClass("disabled") && $(s[n]).removeClass("disabled")
					}
			},
			getLastStatus: function() {
				return a
			},
			setLastStatus: function(e) {
				a = e
			},
			updateToolTip: function(e) {
				if (e)
					for (var t in e) s[t] && $(s[t]).attr("data-tooltip", e[t])
			},
			hide: function() {

				i.removeClass("open"), i.children("li").each(function() {
					$(this).removeClass("li-dropdown-selected")
				})
			},
			show: function() {
				if (c.isEnableOpenDropDown() && (i.addClass("open"), c.setMaxHeight(), t)) {
					t.children().first().offset().left + i.outerWidth(!0) < $(document.body).width() || t.children().first().outerWidth(!0) >= i.outerWidth(!0) ? i.css("left", 2) : i.css("left", t.children().first().outerWidth(!0) - i.outerWidth(!0));
					var e = t.children().first().text().trim();
					e || ((e = t.children().first().attr("identity")) && -1 != e.indexOf("left") ? e = "左对齐" : e && -1 != e.indexOf("right") ? e = "右对齐" : e && -1 != e.indexOf("center") && (e = "居中对齐")), e && i.children("li").each(function() {
						if ($(this).text().trim() == e) $(this).addClass("li-dropdown-selected");
						else if ($(this).attr("data-tooltip") == e) $(this).addClass("li-dropdown-selected");
						else {
							var t = $(this).text().trim(),
								n = t && t.split("\n");
							n && n[0] === e && $(this).addClass("li-dropdown-selected")
						}
					})
				}
			},
			setMaxHeight: function() {
				if (r) {
					var e = $("header").height(),
						t = $(window).height() - e - 50;
					r.css("max-height", t + "px")
				}
			},
			toggleDropDown: function() {
				i.hasClass("open") ? c.hide() : c.show()
			},
			bodyclickhandler: function(e, t) {
				$(e.target).is("#" + t.attr("id")) || $(e.target).parents("#" + t.attr("id")).length && 0 == $(e.target).parents(i.attr("id")).length || c.hide()
			},
			registerEventListeners: function() {
				$("body").on("click", function(e) {
					c.bodyclickhandler(e, t)
				}), $(window).on("resize", function(e) {
					c.bodyclickhandler(e, t)
				}), window.addEventListener("closedropdown", function(e) {
					c.bodyclickhandler(e, t)
				}), i.on("mousedown", function(e) {
					e.preventDefault()
				})
			},
			disableOpenDropDown: function() {
				$(t).addClass("dropdown-container-disabled"), c.hide()
			},
			enableOpenDropDown: function() {
				$(t).removeClass("dropdown-container-disabled")
			},
			isEnableOpenDropDown: function() {
				return !$(t).hasClass("dropdown-container-disabled")
			},
			init: function(e, t) {

				switch (e.length) {
					case 3:
						for (var n in i = $($("#template-dropdown-wrapper").html()), c.initMyId(), (r = $("<div></div>")).addClass("dropdown-wrapper-box"), i.append(r), t.append(i), e) {
							var o = c.getRowHtml(e[n]);
							c.updateDropDown(o)
						}
						c.registerEventListeners(), $(window).on("resize", c.setMaxHeight)
						break;
					case 4:
						for (var n in i = $($("#template-dropdown-wrapper").html()), c.initMyId(), (r = $("<div></div>")).addClass("dropdown-wrapper-box"), i.append(r), t.append(i), e) {
							var o = c.getRowHtml(e[n]);
							c.updateDropDown(o)
						}
						c.registerEventListeners(), $(window).on("resize", c.setMaxHeight)
						break;
					default:
						for (var n in i = $($("#template-dropdown-wrapper").html()), c.initMyId(), (r = $("<div></div>")).addClass("fontSizeDropDown"), i.append(r), t.append(i), e) {
							var o = c.getRowHtml(e[n]);
							c.updateDropDown(o)
						}
						c.registerEventListeners(), $(window).on("resize", c.setMaxHeight)
						break;
				}
			}
		};
	return c.init(e, t), c
};

//selectionState
var SheetSelectionState = function() {
	var e = {
		registerSelectionStateListeners: t,
		registerSelectionState: function(e) {
			"function" == typeof e.judge && o.push(e)
		}
	};

	function t() {
		function e() {
			t(window)
		}

		function t(e) {
			e && ($(e).bind("mouseup", function(e) {
				setTimeout(function() {
					n()
				}, 0)
			}), $(e).bind("getselectionstate", function() {
				setTimeout(function() {
					n()
				}, 0)
			}), $(e).bind("keyup", function(e) {
				[13, 37, 38, 39, 40].contains(e.keyCode) && setTimeout(function() {
					n()
				}, 0)
			}))
		};
		e()
	}

	function n() {
		var e, t = (e = window.frames.sheet ? window.frames.sheet.document : document, $("td.current", e) || null);
		if (!t || !t.length) return null;
		var n = function(e) {
			if (!e || !e.length) return [];
			for (var t = null, n = 0; n < e.length; n++) {
				var o = r(e[n]);
				if (null == t) t = o;
				else {
					for (var i = [], a = 0; a < t.length; a++) {
						var s = t[a];
						o.contains(s) && i.push(s)
					}
					if (!i) return [];
					t = i
				}
			}
			return t || []
		}(t);
	}
	var o = [];

	function r(e) {
		return e ? function(e) {
			return function(e, t) {
				for (var n = [], o = 0; o < e.length; o++)
					if ("function" == typeof e[o].judge) {
						var r = e[o].judge(t);
						1 == r ? "string" == typeof e[o].key && n.push(e[o].key) : "string" == typeof r && n.push(r)
					}
				return n
			}(o, e)
		}(e) : []
	}
	return t(), e
};

/*  lf */
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function() {
	//十六进制颜色值的正则表达式
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var that = this;
	if (/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = that;
		}
		return strHex;
	} else if (reg.test(that)) {
		var aNum = that.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return that;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return that;
	}
}

//设置边框的具体方法
Handsontable.Core.prototype.borderSet = function() {
	var o = this;
	if (!o.dealInvert()) {
		vmd.tip('请选择正确单元格区域', 'error');
		return;
	}
	if (typeof this.customBorderType == 'undefined') return;
	// if(typeof this.customBorderColor == 'undefined') return;
	color = this.customBorderColor || "#000";
	style = this.customBorderType;

	var cell = o.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;

	var origin = 'none';
	var ms = '1px solid ' + color

	if (style == 'border-all') {
		for (var i = sr; i < er + 1; i++) {
			for (n = sc; n < ec + 1; n++) {
				var el = o.getCell(i, n);
				var left = o.getCell(i, n - 1);
				var top = o.getCell(i - 1, n);
				var firstRow = false;
				var firstCol = false;
				if (o.fpArray && o.fpArray.length > 0) {
					for (var k = 0; k < o.fpArray.length; k++) {
						var arr = o.fpArray[k];
						if (arr.sr == i && arr.sc <= n && arr.ec >= n) firstRow = true;
						if (arr.sc == n && arr.sr <= i && arr.er >= i) firstCol = true;
					}
				}
				if (firstRow || i == 0) {
					el.style.borderTop = ms;
				} else {
					top.style.borderBottom = ms;
					o.changeAttributeInfo(i - 1, n, 'borderB', ms)
				}
				if (firstCol || n == 0) {
					el.style.borderLeft = ms;
				} else {
					left.style.borderRight = ms;
					o.changeAttributeInfo(i, n - 1, 'borderR', ms)
				}

				o.changeAttributeInfo(i, n, 'borderT', ms)
				o.changeAttributeInfo(i, n, 'borderL', ms)
				o.changeAttributeInfo(i, n, 'borderR', ms)
				o.changeAttributeInfo(i, n, 'borderB', ms)
				el.style.borderRight = ms;
				el.style.borderBottom = ms;

			}
		}
		for (var i = sr; i < er + 1; i++) {
			if (sc != 0) {
				o.changeAttributeInfo(i, sc - 1, 'borderR', ms)
			}
		}

		for (var n = sc; n < ec + 1; n++) {
			if (sc != 0) {
				o.changeAttributeInfo(sr - 1, n, 'borderB', ms)
			}
		}
	}
	if (style == 'border-clear') {
		for (var i = sr; i < er + 1; i++) {
			for (n = sc; n < ec + 1; n++) {
				// var el = o.getCell(i, n);
				// var left = o.getCell(i, n - 1);
				// var top = o.getCell(i - 1, n);
				var firstRow = false;
				var firstCol = false;
				if (o.fpArray && o.fpArray.length > 0) {
					for (var k = 0; k < o.fpArray.length; k++) {
						var arr = o.fpArray[k];
						if (arr.sr == i && arr.sc <= n && arr.ec >= n) firstRow = true;
						if (arr.sc == n && arr.sr <= i && arr.er >= i) firstCol = true;
					}
				}
				if (firstRow || i == 0) {
					// el.style.borderTop = origin;
				} else {
					// top.style.borderBottom = origin;
				}
				if (firstCol || n == 0) {
					// el.style.borderLeft = origin;
				} else {
					// left.style.borderRight = origin;
				}
				o.changeAttributeInfo(i, n, 'borderT', origin)
				o.changeAttributeInfo(i, n, 'borderL', origin)
				o.changeAttributeInfo(i, n, 'borderR', origin)
				o.changeAttributeInfo(i, n, 'borderB', origin)
				// el.style.borderRight = origin;
				// el.style.borderBottom = origin;
			}
		}
		for (var i = sr; i < er + 1; i++) {
			if (sc != 0) {
				o.changeAttributeInfo(i, sc - 1, 'borderR', origin)
			}
		}

		for (var n = sc; n < ec + 1; n++) {
			if (sc != 0) {
				o.changeAttributeInfo(sr - 1, n, 'borderB', origin)
			}
		}
	}

	if (style == 'border-left') {
		for (var i = sr; i < er + 1; i++) {
			var firstRow = false;
			var firstCol = false;
			if (o.fpArray && o.fpArray.length > 0) {
				for (var k = 0; k < o.fpArray.length; k++) {
					var arr = o.fpArray[k];
					if (arr.sc == i && arr.sr >= sr && arr.er <= er) firstCol = true;
				}
			}
			if (sc == 0 || firstCol) {
				o.changeAttributeInfo(i, sc, 'borderL', ms)
				// o.getCell(i, sc).style.borderLeft = ms;
			} else {
				o.changeAttributeInfo(i, sc - 1, 'borderR', ms)
				// o.getCell(i, sc - 1).style.borderRight = ms;
			}
		}
	}
	if (style == 'border-right') {
		for (var i = sr; i < er + 1; i++) {
			var scell=o.getCell(i,sc);
			// 合并单元格设置右边框问题修复添加（2019.11.15 lf）
			if(scell&&scell.cellprop&&scell.cellprop&&scell.cellprop.mergeId&&scell.cellprop.mergeId==1){
					var arr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
					for (var j = 0; j < arr.length; j++) {
						var row = arr[j].row;
						var col = arr[j].col;
						if(i==row&&sc==col){
							var colspan = arr[j].colspan;
							if(sc+colspan-1==ec){
								o.changeAttributeInfo(i, sc, 'borderR', ms);
								break;
							}
						}
					}
				}	
			else{
				o.changeAttributeInfo(i, ec, 'borderR', ms);
			}
			
			// o.getCell(i, ec).style.borderRight = ms;
		}
	}
	if (style == 'border-top') {
		for (var i = sc; i < ec + 1; i++) {
			var firstRow = false;
			var firstCol = false;
			if (o.fpArray && o.fpArray.length > 0) {
				for (var k = 0; k < o.fpArray.length; k++) {
					var arr = o.fpArray[k];
					if (arr.sr == i && arr.sc <= sc && arr.ec >= ec) firstRow = true;
				}
			}
			if (sr == 0 || firstCol) {
				o.changeAttributeInfo(sr, i, 'borderT', ms)
				// o.getCell(sr, i).style.borderTop = ms;
			} else {
				o.changeAttributeInfo(sr - 1, i, 'borderB', ms)
				// o.getCell(sr - 1, i).style.borderBottom = ms;
			}
		}
	}
	if (style == 'border-bottom') {
		for (var i = sc; i < ec + 1; i++) {
			var scell=o.getCell(sr,i);
			// 合并单元格设置下边框问题修复添加（2019.11.15 lf）
			if(scell&&scell.cellprop&&scell.cellprop&&scell.cellprop.mergeId&&scell.cellprop.mergeId==1){
					var arr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
					for (var j = 0; j < arr.length; j++) {
						var row = arr[j].row;
						var col = arr[j].col;
						if(sr==row&&i==col){
							var rowspan = arr[j].rowspan;
							if(sr+rowspan-1==er){
								o.changeAttributeInfo(sr, i, 'borderB', ms);
								break;
							}
						}
					}
				}	
			else{
			o.changeAttributeInfo(er, i, 'borderB', ms)
			// o.getCell(er, i).style.borderBottom = ms;
			}
		}
	}
	if (style == 'border-inner') {
		for (var i = sr; i < er + 1; i++) {
			for (n = sc; n < ec + 1; n++) {
				// var el = o.getCell(i, n);
				o.changeAttributeInfo(i, n, 'borderB', ms)
				// el.style.borderBottom = ms;
				o.changeAttributeInfo(i, n, 'borderR', ms)
				// el.style.borderRight = ms;
			}
		}
		for (var i = sc; i < ec + 1; i++) {
			o.changeAttributeInfo(er, i, 'borderB', '1px solid #ccc')
			// o.getCell(er, i).style.borderBottom = '1px solid #ccc';
		}
		for (var i = sr; i < er + 1; i++) {
			o.changeAttributeInfo(i, ec, 'borderR', '1px solid #ccc')
			// o.getCell(i, ec).style.borderRight = '1px solid #ccc';
		}
	}
	if (style == 'border-vertical') {
		for (var i = sr; i < er + 1; i++) {
			for (n = sc; n < ec + 1; n++) {
				// var el = o.getCell(i, n);
				o.changeAttributeInfo(i, n, 'borderR', ms)
				// el.style.borderRight = ms;
			}
		}
		for (var i = sr; i < er + 1; i++) {
			o.changeAttributeInfo(i, ec, 'borderR', '1px solid #ccc')
			// o.getCell(i, ec).style.borderRight = '1px solid #ccc';
		}
	}
	if (style == 'border-horizontal') {
		for (var i = sr; i < er + 1; i++) {
			for (n = sc; n < ec + 1; n++) {
				// var el = o.getCell(i, n);
				o.changeAttributeInfo(i, n, 'borderB', ms)
				// el.style.borderBottom = ms;
			}
		}
		for (var i = sc; i < ec + 1; i++) {
			o.changeAttributeInfo(er, i, 'borderB', '1px solid #ccc')
			// o.getCell(er, i).style.borderBottom = '1px solid #ccc';
		}
	}
	if (style == "border-outer") {

		for (var i = sr; i < er + 1; i++) {
			var firstRow = false;
			var firstCol = false;
			if (o.fpArray && o.fpArray.length > 0) {
				for (var k = 0; k < o.fpArray.length; k++) {
					var arr = o.fpArray[k];
					if (arr.sc == i && arr.sr >= sr && arr.er <= er) firstCol = true;
				}
			}
			if (sc == 0 || firstCol) {
				o.changeAttributeInfo(i, sc, 'borderL', ms)
				// o.getCell(i, sc).style.borderLeft = ms;
			} else {
				o.changeAttributeInfo(i, sc - 1, 'borderR', ms)
				// o.getCell(i, sc - 1).style.borderRight = ms;
			}
		}

		for (var i = sr; i < er + 1; i++) {
			o.changeAttributeInfo(i, ec, 'borderR', ms)
			// o.getCell(i, ec).style.borderRight = ms;
		}

		for (var i = sc; i < ec + 1; i++) {
			var firstRow = false;
			var firstCol = false;
			if (o.fpArray && o.fpArray.length > 0) {
				for (var k = 0; k < o.fpArray.length; k++) {
					var arr = o.fpArray[k];
					if (arr.sr == i && arr.sc <= sc && arr.ec >= ec) firstRow = true;
				}
			}
			if (sr == 0 || firstCol) {
				o.changeAttributeInfo(sr, i, 'borderT', ms)
				// o.getCell(sr, i).style.borderTop = ms;
			} else {
				o.changeAttributeInfo(sr - 1, i, 'borderB', ms)
				// o.getCell(sr - 1, i).style.borderBottom = ms;
			}
		}

		for (var i = sc; i < ec + 1; i++) {
			o.changeAttributeInfo(er, i, 'borderB', ms)
			// o.getCell(er, i).style.borderBottom = ms;
		}
	}
	this.render();
}

Handsontable.Core.prototype.freeze = function(r, c, flag) {
	//冻结，flag用来取消
	this.colHeadArray = null
	this.fullColArray();
	var copy = [];
	var marr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	for (var i = 0; i < marr.length; i++) {
		copy.push(marr[i])
	}
	if (flag) {
		this.updateSettings({
			fixedColumnsLeft: 0,
			fixedRowsTop: 0
		})
		this.fixedrow = 0;
		this.fixedcol = 0;
		for (var i = 0; i < this.countCols(); i++) {
			this.setCellMeta(0, i, 'col_lock', false)
			if (this.getCellMeta(0, i).col_hide) {
				if (this.getCellMeta(0, i).col_hide) {
					this.colHeadArray[i] = this.numToEng(i) + "<i class='report-iconfont icon-yincang font-20'></i>"
				} else {
					this.colHeadArray[i] = this.numToEng(i)
				}
			}
		}
	} else {
		this.updateSettings({
			fixedColumnsLeft: c,
			fixedRowsTop: r
		})
		this.fixedrow = r;
		this.fixedcol = c;
		for (var i = 0; i < this.countCols(); i++) {
			this.setCellMeta(0, i, 'col_lock', false)
		}
		for (var b = 0; b < c; b++) {
			this.setCellMeta(0, b, 'col_lock', true)
		}
		for (var n = 0; n < this.countCols(); n++) {
			var lock = this.getCellMeta(0, n).col_lock;
			var hide = this.getCellMeta(0, n).col_hide;
			if (hide && lock) {
				this.colHeadArray[n] = this.numToEng(n) + '锁定' + "<i class='report-iconfont icon-yincang font-20'></i>"
			} else if (hide && !lock) {
				this.colHeadArray[n] = this.numToEng(n) + "<i class='report-iconfont icon-yincang font-20'></i>"
			} else if (!hide && lock) {
				this.colHeadArray[n] = this.numToEng(n) + '锁定'
			} else {
				this.colHeadArray[n] = this.numToEng(n)
			}
		}
	}
	this.updateSettings({
		colHeaders: this.colHeadArray,
		mergeCells: copy
	})
}

Handsontable.Core.prototype.afterRender = function() {
	var hot = this;
	if (typeof this.subTableNo == 'undefined') this.subTableNo = 1;
	if (typeof this.allPrintInfo == 'undefined') {
		this.allPrintInfo = {
			print_paperSize: 'A4',
			print_quality: '100点/英寸',
			print_direction: 1,
			print_marginTop: 3,
			print_marginBottom: 3,
			print_marginLeft: 1,
			print_marginRight: 1,
			print_header: 1,
			print_footer: 3
		}
	}
	if (this.nestedTableArray) {
		this.drawNestedTable()
		for (var i = 0; i < this.nestedTableArray.length; i++) {
			var arr = this.nestedTableArray[i];
			var cell = this.getCell(arr.sr, arr.sc);
			if (cell && cell.style) {
				cell.style.padding = '0 0'
				cell.ondblclick = this.nestedTable
			}
			this.changeAttributeInfo(arr.sr, arr.sc, 'cmbType', 'qtb')
			this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_tableName', arr.qtb_tableName)
			this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_style', arr.qtb_style)
			this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_template', arr.qtb_template)
			this.changeAttributeInfo(arr.sr, arr.sc, 'qtb_unfold', arr.qtb_unfold)
		}
	}
	if ($('.wtSpreader') && $('.wtSpreader')[0]) {
		$('.wtSpreader')[0].onmouseup = function(e) {
			if (typeof sheetHot_me != 'undefined') {
				var offsetLeft = vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0] && vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetLeft;
				var offsetTop = vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0] && vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetTop;
				if (hot.nestedTableArray) {
					hot.nestedTableValid();
				}
				if (hot.nestedTimes && hot.cornerSet) {
					if (!hot.nestedTableValidForDrag()) {
						vmd.tip('嵌套表区域不可重叠', 'error')
						var cell = hot.dealInvert()[0];
						for (var i = 0; i < hot.nestedTableArray.length; i++) {
							var arr = hot.nestedTableArray[i];
							if (arr.sr == cell.sr && arr.sc == cell.sc) {
								var copy = [];
								var ma = hot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
								for (var n = 0; n < ma.length; n++) {
									copy.push(ma[n])
								}
								copy.push({
									col: arr.sc,
									colspan: arr.ec - arr.sc + 1,
									removed: false,
									row: arr.sr,
									rowspan: arr.er - arr.sr + 1
								})
								hot.updateSettings({
									mergeCells: copy
								})
								return;
							}
						}
						return;
					}
					var top;
					var left;
					if (hot.whichClick == 'left') {
						top = (vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetTop - 20) + 'px'
					}
					if (hot.whichClick == 'left') {
						left = (vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetLeft - 20) + 'px'
					}
					var cssText = {
						'background-image': "url('../design/css/imgs/tz.png')",
						'background-repeat': 'no-repeat',
						'background-color': 'transparent',
						'cursor': 'se-resize',
						'height': '16px',
						'width': '16px',
						'top': top,
						'left': left,
						'border': 'none'
					}
					if (sheetHot_me.el && sheetHot_me.el.dom) {
						vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner').css(cssText)
						vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner').css(cssText)
					}
				} else if (hot.nestedTimes && !hot.cornerSet) {
					if (hot.whichClick == 'right') {
						var cell = hot.dealInvert()[0];
						var last = hot.selectedCell;
						if (!this.selectChanged) {
							left = offsetLeft + 'px'
							top = offsetTop + 'px'
						} else {
							if (e.which == 3) {
								left = offsetLeft + 'px'
								top = offsetTop + 'px'
							} else {
								left = offsetLeft + 'px'
								top = offsetTop + 'px'
							}
						}
						var cssText = {
							'background-image': "url('../design/css/imgs/tz.png')",
							'background-repeat': 'no-repeat',
							'background-color': 'transparent',
							'cursor': 'se-resize',
							'height': '16px',
							'width': '16px',
							'top': top,
							'left': left,
							'border': 'none'
						}
						if (sheetHot_me.el && sheetHot_me.el.dom) {
							vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner').css(cssText)
							vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner').css(cssText)
						}
					}
				}
				if (hot.nestedTimes && hot.cornerSet) {
					hot.handleNestedDrag();
				} else if (hot.nestedTimes && !hot.cornerSet) {
					hot.inMerge()
					if (!hot.inmerge) {
						hot.mergeCell()
					}
				}
				//分片操作
				if (hot.times && hot.cornerSet) {
					if (hot.fpAreaValidForDrag()) {
						hot.fpDrag();
					} else {
						vmd.tip('分片区域不可重叠', 'error')
					}
				}
			}
		};
		$('.wtSpreader')[0].onmousedown = function(e) {
			if (e.which == 1) {
				hot.whichClick = 'left'
			} else if (e.which == 3) {
				hot.whichClick = 'right'
			}
		};
	}
	if (this.fathers) {
		for (var i = 0; i < this.fathers.length; i++) {
			var arr = this.fathers[i]
			if (arr != null) {
				var father = this.numToEng(arr.fc) + (parseInt(arr.fr) + 1) + '';
				this.changeAttributeInfo(arr.cr, arr.cc, arr.type, father)
			}
		}
	}
	//拿到flList和fpList中的已有的分栏分片画上边框
	if (this.fpArray) {
		for (var x = 0; x < hot.fpArray.length; x++) {
			//重绘外边框
			var sr = hot.fpArray[x].sr
			var sc = hot.fpArray[x].sc
			var er = hot.fpArray[x].er
			var ec = hot.fpArray[x].ec
			var ms = '2px solid #000'
			for (var a = sr; a < er + 1; a++) {
				if (sc == 0) {
					if (hot.getCell(a, sc) && hot.getCell(a, sc).style)
						hot.getCell(a, sc).style.borderLeft = ms;
				} else {
					if (hot.getCell(a, sc - 1) && hot.getCell(a, sc - 1).style)
						hot.getCell(a, sc - 1).style.borderRight = ms;
				}
			}
			for (var b = sc; b < ec + 1; b++) {
				if (sr == 0) {
					if (hot.getCell(sr, b) && hot.getCell(sr, b).style)
						hot.getCell(sr, b).style.borderTop = ms;
				} else {
					if (hot.getCell(sr - 1, b) && hot.getCell(sr - 1, b).style)
						hot.getCell(sr - 1, b).style.borderBottom = ms;
				}
			}
			for (var b = sc; b < ec + 1; b++) {
				if (hot.getCell(er, b) && hot.getCell(er, b).style)
					hot.getCell(er, b).style.borderBottom = ms;
			}
			for (var b = sr; b < er + 1; b++) {
				if (hot.getCell(b, ec) && hot.getCell(b, ec).style)
					hot.getCell(b, ec).style.borderRight = ms;
			}
		}
	}
}

Handsontable.Core.prototype.afterRenderer = function(td, row, col, prop, value, cellProperties) {
	if (typeof this.fixedcol == 'undefined') this.fixedcol = 0;
	if (typeof this.fixedrow == 'undefined') this.fixedrow = 0;
	if (!this.nestedNo) this.nestedNo = null;
	if (!this.fpNo) this.fpNo = null;
	if (!this.times) this.times = false;
	td.cellprop = cellProperties;
	if (!cellProperties.cellAttributeInfo) {
		cellProperties.cellAttributeInfo = new gridCellInfoObject()
	}
	var cellInfo = cellProperties.cellAttributeInfo
	var ha = cellInfo.alignInfo.align.value.HAlign.value;
	var va = cellInfo.alignInfo.align.value.VAlign.value
	var fontSetting = cellInfo.fontInfos
	var borders = cellInfo.borderInfo;
	cellProperties.cellName = this.numToEng(col) + (row + 1) + '';
	if (typeof cellProperties.row_hide == 'undefined') {
		cellProperties.row_hide = false;
	}
	if (typeof cellProperties.col_hide == 'undefined') {
		cellProperties.col_hide = false;
	}
	if (typeof cellProperties.rowtype == 'undefined') {
		cellProperties.rowtype == '';
	}
	if (typeof cellProperties.col_lock == 'undefined') {
		cellProperties.col_lock = false;
	}
	if (typeof cellProperties.theCellChanged == 'undefined') {
		cellProperties.theCellChanged = false;
	}
	if (!cellProperties.mergeId) cellProperties.mergeId = 0;
	if (this.nestedTableArray) {
		var flag = false;
		for (var i = 0; i < this.nestedTableArray.length; i++) {
			if (this.nestedTableArray[i].sr == row && this.nestedTableArray[i].sr == col) {
				flag = true;
				break;
			}
		}
		if (!flag) {
			if (ha == 'left') td.style.textAlign = 'left';
			if (ha == 'center') td.style.textAlign = 'center';
			if (ha == 'right') td.style.textAlign = 'right';
			if (va == 'top') td.style.verticalAlign = 'top';
			if (va == 'middle') td.style.verticalAlign = 'middle';
			if (va == 'bottom') td.style.verticalAlign = 'bottom';
			if (fontSetting.fontWeight.value == 'bold') {
				td.style.fontWeight = 'bold'
			} else {
				td.style.fontWeight = ''
			}
			if (fontSetting.fontShape.value == 'italic') {
				td.style.fontStyle = 'italic'
			} else {
				td.style.fontStyle = ''
			}
			if (fontSetting.underline.value == 'underline') td.style.textDecoration = 'underline';

			if (fontSetting.fontFamily) {
				td.style.fontFamily = fontSetting.fontFamily.value;
			}

			if (fontSetting.fontSize) {
				if (fontSetting.fontSize.value) td.style.fontSize = fontSetting.fontSize.value + 'px';
			}

			td.style.color = fontSetting.ColorSelect.value;
			if (col == 0) {
				td.style.borderLeft = borders.borderL.value;
			}
			if (row == 0) {
				td.style.borderTop = borders.borderT.value;
			}
			td.style.borderRight = borders.borderR.value;
			td.style.borderBottom = borders.borderB.value;
			td.style.backgroundColor = cellProperties.cellAttributeInfo.bgcolorInfo.ColorSelectInner.value
		}
	} else {
		if (ha == 'left') td.style.textAlign = 'left';
		if (ha == 'center') td.style.textAlign = 'center';
		if (ha == 'right') td.style.textAlign = 'right';
		if (va == 'top') td.style.verticalAlign = 'top';
		if (va == 'middle') td.style.verticalAlign = 'middle';
		if (va == 'bottom') td.style.verticalAlign = 'bottom';
		if (fontSetting.fontWeight.value == 'bold') {
			td.style.fontWeight = 'bold'
		} else {
			td.style.fontWeight = ''
		}
		if (fontSetting.fontShape.value == 'italic') {
			td.style.fontStyle = 'italic'
		} else {
			td.style.fontStyle = ''
		}
		if (fontSetting.underline.value == 'underline') td.style.textDecoration = 'underline';

		if (fontSetting.fontFamily) {
			td.style.fontFamily = fontSetting.fontFamily.value;
		}

		if (fontSetting.fontSize) {
			if (fontSetting.fontSize.value) td.style.fontSize = fontSetting.fontSize.value + 'px';
		}

		td.style.color = fontSetting.ColorSelect.value;
		if (col == 0) {
			td.style.borderLeft = borders.borderL.value;
		}
		// else{
		// 	this.getCell(row,col-1).style.borderRight = borders.borderR.value;
		// }
		if (row == 0) {
			td.style.borderTop = borders.borderT.value;
		}
		// else{
		// 	this.getCell(row-1,col).style.borderBottom = borders.borderB.value;
		// }
		td.style.borderRight = borders.borderR.value;
		td.style.borderBottom = borders.borderB.value;
		td.style.backgroundColor = cellProperties.cellAttributeInfo.bgcolorInfo.ColorSelectInner.value
	}

	//组织menus数组
	if (typeof this.menus == 'undefined') this.menus = [];
	var nevereSet = true;
	var menu = cellProperties.cellAttributeInfo.menu;
	if (menu.menuDataset.value != '' || menu.menuName.value != '' || menu.menuParam.value != '') {
		for (var i = 0; i < this.menus.length; i++) {
			if (cellProperties.cellName == this.menus[i].cellName) {
				nevereSet = false;
				break;
			}
		}
		if (nevereSet) {
			var obj = {
				id: menu.menuID.value,
				params: menu.menuParam.value,
				source: menu.menuSource.value,
				sets: menu.menuDataset.value,
				event: menu.menuEvent.value,
				pid: menu.menuPID.value,
				text: menu.menuText.value,
				cellName: cellProperties.cellName
			}
			this.menus.push(obj)
		}
	}

}

Handsontable.Core.prototype.contextMenu_clearCSS = function() {
	var selectCells = this.dealInvert()
	for (var i = 0; i < selectCells.length; i++) {
		var sr = selectCells[i].sr
		var sc = selectCells[i].sc
		var er = selectCells[i].er
		var ec = selectCells[i].ec

		for (var n = sr; n < er + 1; n++) {
			for (var b = sc; b < ec + 1; b++) {
				var context = this.getCellMeta(n, b).cellAttributeInfo.textValue.value;
				this.setCellMeta(n, b, 'cellAttributeInfo', new gridCellInfoObject())

				if (context != '') {
					this.changeAttributeInfo(n, b, 'txtValue', context)
				} else {
					this.setCellMeta(n, b, 'theCellChanged', false)
				}
			}
		}
	}
	this.render()
}

Handsontable.Core.prototype.contextMenu_clearAll = function() {
	var selectCells = this.dealInvert()
	var cells = [];
	for (var i = 0; i < selectCells.length; i++) {
		var sr = selectCells[i].sr
		var sc = selectCells[i].sc
		var er = selectCells[i].er
		var ec = selectCells[i].ec

		for (var n = sr; n < er + 1; n++) {
			for (var b = sc; b < ec + 1; b++) {
				var context = this.getCellMeta(n, b).cellAttributeInfo.textValue.value;
				this.setCellMeta(n, b, 'cellAttributeInfo', new gridCellInfoObject())
				var temp = [n, b, '']
				cells.push(temp)
			}
		}
		this.setDataAtCell(cells)
		for (var n = sr; n < er + 1; n++) {
			for (var b = sc; b < ec + 1; b++) {
				var context = this.getCellMeta(n, b).cellAttributeInfo.textValue.value;
				this.setCellMeta(n, b, 'theCellChanged', false)
			}
		}
	}
}

Handsontable.Core.prototype.contextMenu_fpSet = function() {
	this.fpAreaValid();
	var fp = xds.eastlayout.reportInst.hwFP;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;

	if (this.fpStatus == 'new') {
		if (!this.fpNameNo) {
			this.fpNameNo = 0;
		}
		this.fpNameNo++;
		fp.allEnable()
		var obj = {
			sr: sr,
			sc: sc,
			er: er,
			ec: ec,
			sliceName: '分片' + this.fpNameNo,
			emptyRow: false,
			emptyCol: false
		}
		if (!this.fpArray) this.fpArray = [];
		this.fpArray.push(obj)
		this.fpCss(true);
		this.fpStatus = 'exist'
		fp.seg_fp.setValue(true)
		fp.seg_sliceName.setValue(obj.sliceName)
	} else if (this.fpStatus == 'exist') {
		fp.seg_fp.setValue(true)

		var arr = this.fpArray;
		var no;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].sr == sr && arr[i].sc == sc && arr[i].er == er && arr[i].ec == ec) {
				no = i;
				break;
			}
		}

		arr.splice(i, 1);
		fp.seg_fp.enable();
		fp.seg_fp.setValue(false)
		// fp.allDisable();
		this.fpCss(false)
	} else if (this.fpStatus == 'forbid') {
		vmd.tip('分片区域不可重叠', 'error')
		fp.seg_fp.setValue(false)
		fp.seg_fp.disable()
	}
}
Handsontable.Core.prototype.contextMenu_removeCol = function() {
	this.nestedTableArrayTemp = this.nestedTableArray;
	this.nestedTableArray = [];
	var c;
	var cells = this.dealInvert()[0];

	var count = cells.ec - cells.sc + 1;
	var c = cells.sc;

	if (typeof this.fathers == 'undefined') this.fathers = [];
	var del = [];
	var len = this.fathers.length;
	this.alter('remove_col', c, count)
	for (var i = 0; i < len; i++) {
		var arr = this.fathers[i];
		if (arr != null) {
			if (c == arr.fc || c == arr.cc) {
				this.changeAttributeInfo(arr.cr, arr.cc, arr.type, '')
				this.fathers.splice(i--, 1)
			} else {
				if (c < arr.fc) {
					arr.fc -= count;
				}
				if (c < arr.cc) {
					arr.cc -= count;
				}
			}
		}
	}
	var f = this.fathers;
	
	for (var i = 0; i < f.length; i++) {
		var temp = f[i]
		if (temp.type == "leftParent") {
			this.changeAttributeInfo(temp.cr, temp.cc, temp.type, this.numToEng(temp.fc) + (parseInt(temp.fr) + 1) + '')
		}
	}

	//this.alter('remove_col', c, count)

	this.fullColWidthArray()
	this.colHeadWidthArray.splice(c, count)
	var arr = this.colHeadWidthArray;
	for (var n = 0; n < this.countCols(); n++) {
		var colWidthInst = this.getPlugin('ManualColumnResize');
		colWidthInst.setManualSize(n, arr[n])
	}

	this.fullColArray()
	for (var i = 0; i < this.countCols(); i++) {
		var hflag = this.getCellMeta(0, i).col_hide;
		var lflag = this.getCellMeta(0, i).col_lock;
		var en = this.numToEng(i)
		var arr = this.colHeadArray;
		if (hflag && lflag) {
			arr[i] = en + "锁定<i class='report-iconfont icon-yincang font-20'></i>"
		} else if (hflag) {
			arr[i] = en + "<i class='report-iconfont icon-yincang font-20'></i>"
		} else if (lflag) {
			arr[i] = en + '锁定'
		} else {
			arr[i] = en
		}
	}

	this.updateSettings({
		colHeaders: this.colHeadArray
	})
	this.scrollViewportTo(0, 0)
}
Handsontable.Core.prototype.drawNestedTable = function() {
	if (this.nestedTableArray) {
		for (var i = 0; i < this.nestedTableArray.length; i++) {

			var cell = this.getCell(this.nestedTableArray[i].sr, this.nestedTableArray[i].sc);
			this.setCellMeta(this.nestedTableArray[i].sr, this.nestedTableArray[i].sc, 'readOnly', true)
			if (cell && cell.childNodes) {
				for (var a = 0; a < cell.childNodes.length; a++) {
					cell.removeChild(cell.childNodes[a])
				}
			}
			var info = this.nestedTableArray[i].info;
			if (info != null) {
				if (info && info.main && info.main.body && info.main.body.rowNum) {
					var startRow = info.main.body.rowNum;
					var startCol = info.main.body.colNum;
				} else {
					var section = info.main ? info.main.body.sections : info.body.sections;
					var startRow = section[section.length - 1].endrow
					var startCol = section[section.length - 1].endcol
				}
			} else {
				var startRow = 0;
				var startCol = 0;
			}
			var table = new Handsontable(cell, {
				startRows: startRow,
				startCols: startCol,
				viewportColumnRenderingOffset: startCol,
				viewportRowRenderingOffset: startRow, //设置可视行列外预渲染的行列数
				autoInsertRow: false,
				colHeaders: false,
				rowHeaders: false, //显示行头列头
				autoColumnSize: false, //自适应列大小
				manualColumnResize: false,
				mergeCells: true,
				renderAllRows: true,
				contextMenu: false,
				readOnly: true,
				minSpareRows: 0,
				minSpareCols: 0,
				allowEmpty: true,
				disableVisualSelection: true,
				rowHeaders: false,
				colHeaders: false
			});
			if (info != null) {
				if (info.body) {
					info.main = {}
					info.main.body = info.body
				}
				table.loadWebModelOnClould(info, table)
			}

			cell.style.padding = '0 0'
			cell.ondblclick = this.nestedTable
			// cell.readOnly = true;

			if (cell && cell.childNodes) {
				cell.childNodes[0].childNodes[0].style.overflow = 'hidden'
			}

			for (var b = 0; b < table.countRows(); b++) {
				for (var n = 0; n < table.countCols(); n++) {
					var td = table.getCell(b, n)
					var cellInfo = table.getCellMeta(b, n).cellAttributeInfo;

					if (typeof td != 'undefined' && typeof cellInfo != 'undefined' && td != null) {
						td.style.backgroundColor = cellInfo.bgcolorInfo.ColorSelectInner.value;
						td.style.textAlign = cellInfo.alignInfo.align.value.HAlign.value;
						td.style.verticalAlign = cellInfo.alignInfo.align.value.VAlign.value;
						td.style.fontWeight = cellInfo.fontInfos.fontWeight.value;
						td.style.fontStyle = cellInfo.fontInfos.fontShape.value;
						td.style.underline = cellInfo.fontInfos.underline.value;
						td.style.fontFamily = cellInfo.fontInfos.fontFamily.value;
						td.style.fontSize = cellInfo.fontInfos.fontSize.value + 'px';
						td.style.color = cellInfo.fontInfos.ColorSelect.value;
						td.style.borderLeft = cellInfo.borderInfo.borderL.value;
						td.style.borderRight = cellInfo.borderInfo.borderR.value;
						td.style.borderTop = cellInfo.borderInfo.borderT.value;
						td.style.borderBottom = cellInfo.borderInfo.borderB.value;
					}
				}
			}
		}
	}
}
Handsontable.Core.prototype.setNestedTable = function() {
	var me = this;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	this.getCell(sr, sc).ondblclick = this.nestedTable;
	var cellmetal = this.getCellMeta(sr, sc);
	cellmetal.readOnly = true;
	this.changeAttributeInfo(sr, sc, 'cmbType', 'qtb')
}
Handsontable.Core.prototype.cancelNestedTable = function() {
	var me = this;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	this.getCell(sr, sc).ondblclick = null;
	var cellmetal = this.getCellMeta(sr, sc);
	cellmetal.readOnly = false;
	this.changeAttributeInfo(sr, sc, 'cmbType', 'cg')
}
Handsontable.Core.prototype.nestedTableHandle = function() {
	var cells = this.dealInvert()[0];
	if (cells.er >= this.fixedrow && cells.ec >= this.fixedcol && cells.sr >= this.fixedrow && cells.sc >= this.fixedcol) {
		if (this.nestedStatus == 'new') {
			var cell = this.getCell(cells.sr, cells.sc);
			if (!this.nestedTableArray) {
				this.nestedTableArray = [];
			}
			var obj = {
				sr: cells.sr,
				sc: cells.sc,
				er: cells.er,
				ec: cells.ec,
				info: null,
				qtb_template: '',
				qtb_tableName: 'subTable' + this.subTableNo,
				qtb_unfold: false,
				qtb_style: 0
			}

			// for (var i = cells.sr; i < cells.er + 1; i++) {
			// 	for (var n = cells.sc; n < cells.ec + 1; n++) {
			// 		this.changeAttributeInfo(i, n, 'cmbType', 'qtb')
			// 	}
			// }
			this.changeAttributeInfo(cells.sr, cells.sc, 'cmbType', 'qtb')
			this.nestedTableArray.push(obj)
			if (!this.inmerge) this.mergeCell();
			this.setNestedTable();
			this.subTableNo++;

		} else if (this.nestedStatus == 'exist') {
			this.nestedTableArray.splice(this.nestedNo, 1);
			this.cancelNestedTable();
			this.mergeCell();
			for (var i = cells.sr; i < cells.er + 1; i++) {
				for (var n = cells.sc; n < cells.ec + 1; n++) {
					this.changeAttributeInfo(i, n, 'cmbType', 'cg')
				}
			}
		} else {
			alert('嵌套区域禁止交叉')
		}
	} else {
		vmd.tip('禁止在锁定列中设置嵌套表', 'error')
	}
}
Handsontable.Core.prototype.nestedTable = function() {
	var cell = sheetHot.dealInvert()[0]
	var info = sheetHot.nestedTableArray[sheetHot.nestedNo].info;
	var first = sheetHot.getCell(cell.sr, cell.sc);
	if (info) {
		window.nestedWin = new vmd.window({
			url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwRx5kbNsK.html',
			title: '嵌套表编辑器',
			enableLoading: true, //启用进度加载
			width: 1400,
			height: 750,
			auto: true, //auto为true 自动适应窗口，配合offset使用
			offset: [50, 50]
		})
		nestedWin.info = info;
		window.nestedWin.show(); //窗口显示
		window.nestedWin.displayNested = function(flag, saveInfo) {
			if (flag) {
				var dot = sheetHot.getCell(cell.sr, cell.sc);
				if (sheetHot.nestedNo != null) {
					var qtb_tableName = sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_tableName;
				} else {
					var qtb_tableName = '';
				}
				var obj = {
					sr: cell.sr,
					sc: cell.sc,
					er: cell.er,
					ec: cell.ec,
					info: saveInfo,
					qtb_tableName: qtb_tableName
					// qtb_template: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_template,
					// qtb_unfold: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_unfold,
					// qtb_style: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_style
				}
				sheetHot.nestedTableArray.splice(sheetHot.nestedNo, 1, obj)
				sheetHot.drawNestedTable()
			}
		}
		window.nestedWin.on('hide', function() {})
	} else {
		window.nestedWin = new vmd.window({
			url: '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwRx5kbNsK.html',
			title: '嵌套表编辑器',
			enableLoading: true, //启用进度加载
			width: 1400,
			height: 750,
			auto: true, //auto为true 自动适应窗口，配合offset使用
			offset: [50, 50],
			params: {} //url中追加的编码的参数，json格式 
		})
		window.nestedWin.show(); //窗口显示
		window.nestedWin.displayNested = function(flag, saveInfo) {
			if (flag) {
				var dot = sheetHot.getCell(cell.sr, cell.sc);
				var obj = {
					sr: cell.sr,
					sc: cell.sc,
					er: cell.er,
					ec: cell.ec,
					info: saveInfo,
					qtb_template: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_template,
					qtb_tableName: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_tableName,
					qtb_unfold: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_unfold,
					qtb_style: sheetHot.nestedTableArray[sheetHot.nestedNo].qtb_style
				}
				sheetHot.nestedTableArray.splice(sheetHot.nestedNo, 1, obj)
				sheetHot.drawNestedTable()
			}
		}
		window.nestedWin.on('hide', function() {})
	}
}
Handsontable.Core.prototype.fpDrag = function() {
	var cell = this.dealInvert()[0];
	if (this.fpNo != null) {
		var _temp = this.fpArray[this.fpNo];
		//先去除外边框
		var origin = '1px solid #ccc'

		for (var a = _temp.sc; a < _temp.ec + 1; a++) {
			if (_temp.sr == 0) {
				if (this.getCell(_temp.sr, a) && this.getCell(_temp.sr, a).style) {
					this.getCell(_temp.sr, a).style.borderTop = origin;
				}

			} else {
				if (this.getCell(_temp.sr - 1, a) && this.getCell(_temp.sr - 1, a).style) {
					this.getCell(_temp.sr - 1, a).style.borderBottom = origin;
				}
			}
		}
		for (var b = _temp.sr; b < _temp.er + 1; b++) {
			if (_temp.sc == 0) {
				if (this.getCell(b, _temp.sc) && this.getCell(b, _temp.sc).style) {
					this.getCell(b, _temp.sc).style.borderLeft = origin;
				}

			} else {
				if (this.getCell(b, _temp.sc - 1) && this.getCell(b, _temp.sc - 1).style) {
					this.getCell(b, _temp.sc - 1).style.borderRight = origin;
				}
			}
		}
		for (var c = _temp.sc; c < _temp.ec + 1; c++) {
			if (this.getCell(_temp.er, c) && this.getCell(_temp.er, c).style)
				this.getCell(_temp.er, c).style.borderBottom = origin;
		}
		for (var d = _temp.sr; d < _temp.er + 1; d++) {
			if (this.getCell(d, _temp.ec) && this.getCell(d, _temp.ec).style)
				this.getCell(d, _temp.ec).style.borderRight = origin;
		}

		_temp.er = cell.er;
		_temp.ec = cell.ec;
		//重绘外边框
		var sr = _temp.sr
		var sc = _temp.sc
		var er = _temp.er
		var ec = _temp.ec
		var ms = '2px solid #000'

		for (var a = sr; a < er + 1; a++) {
			if (sc == 0) {
				if (this.getCell(a, sc) && this.getCell(a, sc).style)
					this.getCell(a, sc).style.borderLeft = ms;
			} else {
				if (this.getCell(a, sc - 1) && this.getCell(a, sc - 1).style)
					this.getCell(a, sc - 1).style.borderRight = ms;
			}
		}
		for (var b = sc; b < ec + 1; b++) {
			if (sr == 0) {
				if (this.getCell(sr, b) && this.getCell(sr, b).style)
					this.getCell(sr, b).style.borderTop = ms;
			} else {
				if (this.getCell(sr - 1, b) && this.getCell(sr - 1, b).style)
					this.getCell(sr - 1, b).style.borderBottom = ms;
			}
		}
		for (var b = sc; b < ec + 1; b++) {
			if (this.getCell(er, b) && this.getCell(er, b).style)
				this.getCell(er, b).style.borderBottom = ms;
		}
		for (var b = sr; b < er + 1; b++) {
			if (this.getCell(b, ec) && this.getCell(b, ec).style)
				this.getCell(b, ec).style.borderRight = ms;
		}
	}
}
Handsontable.Core.prototype.arrayValid = function(array) {
	for (var i = 0; i < array.length; i++) {
		for (var n = 0; n < array.length; n++) {
			var nArr = array[n];
			var iArr = array[i];
			var r;
			var c;
			var rRepeat = false;
			var cRepeat = false;
			if (i != n) {
				var nc = nArr.ec - nArr.sc + 1;
				var nr = nArr.er - nArr.sr + 1;
				var ic = iArr.ec - iArr.sc + 1;
				var ir = iArr.er - iArr.sr + 1;

				if (nArr.er > iArr.er) {
					r = nArr.er - iArr.er + 1;
				} else {
					r = iArr.er - nArr.er + 1;
				}

				if (nArr.ec > nArr.sc) {
					c = nArr.ec - iArr.ec + 1;
				} else {
					c = iArr.ec - nArr.ec + 1;
				}

				if (r < nr + ir) {
					rRepeat = true;
				}
				if (c < nc + ic) {
					cRepeat = true;
				}
				if (rRepeat && cRepeat) {
					return true;
				}
			}
		}
	}
	return false;
}
Handsontable.Core.prototype.fpCss = function(flag) {
	var cell = this.dealInvert()[0]
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	if (flag) {
		var arr = [];
		for (var i = sr; i < er + 1; i++) {
			for (var n = sc; n < ec + 1; n++) {
				arr.push({
					row: i,
					col: n
				});
			}
		}
		var ms = '2px solid #000'
		var o = this
		for (var a = sr; a < er + 1; a++) {
			if (sc == 0) {
				if (o.getCell(a, sc) && o.getCell(a, sc).style)
					o.getCell(a, sc).style.borderLeft = ms;
			} else {
				if (o.getCell(a, sc - 1) && o.getCell(a, sc - 1).style)
					o.getCell(a, sc - 1).style.borderRight = ms;
			}

		}
		for (var b = sc; b < ec + 1; b++) {
			if (sr == 0) {
				if (o.getCell(sr, b) && o.getCell(sr, b).style)
					o.getCell(sr, b).style.borderTop = ms;
			} else {
				if (o.getCell(sr - 1, b) && o.getCell(sr - 1, b).style)
					o.getCell(sr - 1, b).style.borderBottom = ms;
			}

		}
		for (var b = sc; b < ec + 1; b++) {
			if (o.getCell(er, b) && o.getCell(er, b).style)
				o.getCell(er, b).style.borderBottom = ms;
		}
		for (var b = sr; b < er + 1; b++) {
			if (o.getCell(b, ec) && o.getCell(b, ec).style)
				o.getCell(b, ec).style.borderRight = ms;
		}
	} else {
		var o = this;
		var origin = '1px solid #ccc'
		var arr = [];
		for (var i = sr; i < er + 1; i++) {
			for (var n = sc; n < ec + 1; n++) {
				arr.push({
					row: i,
					col: n
				});
			}
		}
		for (var k = 0; k < arr.length; k++) {
			var r = arr[k].row;
			var c = arr[k].col;
			var el = o.getCell(r, c)
			o.setCellMeta(r, c, 'theCellChanged', true);
			if (el && el.style) {
				el.style.borderRight = origin;
				el.style.borderBottom = origin;
			}
		}

		for (var a = sc; a < ec + 1; a++) {
			if (sr == 0) {
				if (o.getCell(sr, a) && o.getCell(sr, a).style) {
					o.getCell(sr, a).style.borderTop = origin;
				}

			} else {
				if (o.getCell(sr - 1, a) && o.getCell(sr - 1, a).style) {
					o.getCell(sr - 1, a).style.borderBottom = origin;
				}
			}
		}
		for (var b = sr; b < er + 1; b++) {
			if (sc == 0) {
				if (o.getCell(b, sc) && o.getCell(b, sc).style) {
					o.getCell(b, sc).style.borderLeft = origin;
				}

			} else {
				if (o.getCell(b, sc - 1) && o.getCell(b, sc - 1).style) {
					o.getCell(b, sc - 1).style.borderRight = origin;
				}
			}
		}
	}
}
Handsontable.Core.prototype.fpAreaValid = function() {

	var fp = xds.eastlayout.reportInst.hwFP;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var er = cell.er;
	var sc = cell.sc;
	var ec = cell.ec;
	if (sr == er && sc == ec) {
		//一个单元格
		fp.allDisable();
		this.fpStatus = 'forbid'
	} else {
		if (!this.fpArray || this.fpArray.length == 0) {
			fp.allDisable();
			this.fpStatus = 'new'
		} else {
			var arr = this.fpArray
			for (var i = 0; i < arr.length; i++) {
				if (
					//判断重合
					((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
					((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er)) ||
					((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
					((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er))
				) {
					//判断全等
					if ((ec == arr[i].ec && arr[i].sc == sc && arr[i].sr == sr && er == arr[i].er)) {
						//全等情况
						fp.allEnable();
						this.fpStatus = 'exist'
						break;
					} else {
						//判断嵌套
						fp.allDisable();
						this.fpStatus = 'forbid'
						break;
					}
				} else {
					//不重合情况
					if ( //判断包围
						((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
						((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er)) ||
						((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
						((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er))) {
						fp.allDisable();
						this.fpStatus = 'forbid'
						break;
					} else {
						//全新
						fp.allDisable();
						this.fpStatus = 'new'
					}
				}
			}
		}
	}
}
Handsontable.Core.prototype.fpAreaValidForDrag = function() {
	var flag;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var er = cell.er;
	var sc = cell.sc;
	var ec = cell.ec;
	if (!this.fpArray || this.fpArray.length == 0) {
		flag = true;
	} else {
		var arr = this.fpArray
		for (var i = 0; i < arr.length; i++) {
			if (
				//判断重合
				((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
				((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er)) ||
				((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
				((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er))
			) {
				if (sr == arr[i].sr && sc == arr[i].sc) {
					flag = true;
				} else {
					flag = false;
					break;
				}
			} else {
				//不重合情况
				if (sr <= arr[i].sr && sc <= arr[i].sc && er >= arr[i].er && ec >= arr[i].ec) {
					flag = false
					break;
				} else {
					//全新
					flag = true;
				}
			}
		}
	}
	return flag;
}
Handsontable.Core.prototype.inMerge = function() {
	this.inmerge = false;
	var arr = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	for (var i = 0; i < arr.length; i++) {
		var row = arr[i].row;
		var col = arr[i].col;
		var rowspan = arr[i].rowspan;
		var colspan = arr[i].colspan;
		if (sr == row && sc == col && er == sr + rowspan - 1 && ec == sc + colspan - 1) {
			this.inmerge = true;
			break;
		}
	}
}
Handsontable.Core.prototype.fpCanDrag = function() {
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	this.cornerSet = false;
	this.times = false;
	//分片拖拽第一步
	var flag = true;
	if (this.fpArray && this.fpArray.length > 0) {
		for (var i = 0; i < this.fpArray.length; i++) {
			var arr = this.fpArray;
			if ((arr[i].sr <= sr && arr[i].er >= er) && (arr[i].sc <= sc && arr[i].ec >= ec)) {
				if (this.fpAlreadyIn) {
					if (this.fpNo == i) {
						this.times = true;
						this.fpNo = i;
						this.cornerSet = false;
						flag = false;
						break;
					} else {
						this.selectCell(arr[i].sr, arr[i].sc, arr[i].er, arr[i].ec)
						this.times = true;
						this.fpNo = i;
						this.cornerSet = false;
						flag = false;
						break;
					}
				} else {
					this.times = true;
					this.selectCell(arr[i].sr, arr[i].sc, arr[i].er, arr[i].ec)
					this.fpNo = i;
					this.cornerSet = false;
					this.fpAlreadyIn = true;
					flag = false;
					break;
				}
			} else {
				flag = true;
			}
		}
	} else {
		flag = true;
	}
	if (flag) {
		this.fpAlreadyIn = false;
		this.cornerSet = false;
		this.times = false;
		this.fpNo = null;
	}
}
Handsontable.Core.prototype.handleNestedDrag = function() {
	var cell = this.dealInvert()[0];
	if (this.nestedNo != null) {
		var arr = this.nestedTableArray[this.nestedNo];
		var obj = {
			ec: arr.ec,
			er: arr.er,
			info: arr.info,
			sc: arr.sc,
			sr: arr.sr,
			qtb_template: arr.qtb_template,
			qtb_tableName: arr.qtb_tableName,
			qtb_unfold: arr.qtb_unfold,
			qtb_style: arr.qtb_style
		}
		//原区域切换为文本
		for (var i = arr.sr; i < arr.er + 1; i++) {
			for (var n = arr.sc; n < arr.ec + 1; n++) {
				this.changeAttributeInfo(i, n, 'cmbType', 'cg')
			}
		}
		obj.sr = cell.sr;
		obj.er = cell.er;
		obj.sc = cell.sc;
		obj.ec = cell.ec;
		for (var c = obj.sr; c < obj.er + 1; c++) {
			for (var d = obj.sc; d < obj.ec + 1; d++) {
				this.changeAttributeInfo(c, d, 'cmbType', 'qtb')
				this.changeAttributeInfo(c, d, 'qtb_template', arr.qtb_template)
				this.changeAttributeInfo(c, d, 'qtb_tableName', arr.qtb_tableName)
				this.changeAttributeInfo(c, d, 'qtb_unfold', arr.qtb_unfold)
				this.changeAttributeInfo(c, d, 'qtb_style', arr.qtb_style)
			}
		}
		obj.cell = this.getCell(cell.sr, cell.sc);

		this.nestedTableArray.splice(this.nestedNo, 1, obj);
		this.mergeCell();
	}
}
Handsontable.Core.prototype.allDrag = function(type, me) {
	var resizeRange = function() {};
	if (type == 'fp') {
		var resizeRange = function() {
			if (me.grid.fpNo != null) {
				// this.times = true;
				me.grid.cornerSet = true;
				var arr = me.grid.fpArray[me.grid.fpNo]
				var _select = [arr.sr, arr.sc, arr.er, arr.ec]
				Ext.defer(function() {
					me.grid.cornerSet = true;
					me.grid.selectCells([_select]);
				}, 20)
			}
		}
		if (this.times) {
			//分片拖拽
			vmd(me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner').css({
				'background-color': 'red',
				'cursor': 'se-resize'
			}).
			unbind('mousedown').
			on('mousedown', resizeRange)
		}
	}
	if (type == 'nested') {
		var resizeRange = function() {
			if (me.grid.nestedNo != null) {
				// me.grid.cornerSet = true;
				var arr = me.grid.nestedTableArray[me.grid.nestedNo]
				var _select = [arr.sr, arr.sc, arr.er, arr.ec]
				me.grid.getPlugin("contextMenu").executeCommand('mergeCells', _select)
				Ext.defer(function() {
					me.grid.cornerSet = true;
					me.grid.selectCells([_select]);
				}, 20)
			}
		}
		if (this.nestedTimes) {
			var offsetTop = vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetTop;
			var offsetLeft = vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4)[0].offsetLeft;
			var top;
			var left;

			if (this.whichClick == 'left') {
				top = (offsetTop - 20) + 'px';
			} else {
				if (!this.selectChanged) {
					top = offsetTop + 'px';
				} else {
					top = (offsetTop - 20) + 'px';
				}
			}
			if (this.whichClick == 'left') {
				left = (offsetLeft - 20) + 'px';
			} else {
				if (!this.selectChanged) {
					left = offsetLeft + 'px';
				} else {
					left = (offsetLeft - 20) + 'px';
				}
			}
			var cssText = {
				'background-image': "url('../design/css/imgs/tz.png')",
				'background-repeat': 'no-repeat',
				'background-color': 'transparent',
				'cursor': 'se-resize',
				'height': '16px',
				'width': '16px',
				'top': top,
				'left': left,
				'border': 'none'
			}
			vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4).removeClass('corner').css(cssText).
			unbind('mousedown').
			on('mousedown', resizeRange)

			vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.area').eq(4).removeClass('corner').css(cssText).
			unbind('mousedown').
			on('mousedown', resizeRange)
		}
	}
	if (type == null) {
		this.cornerSet = false;
		vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.area').eq(4).addClass('corner').css({
			'background-color': '#4B89FF',
			'cursor': 'crosshair',
			'height': '6px',
			'width': '6px'
		}).unbind('mousedown', resizeRange)
		vmd(sheetHot_me.el.dom).find('.htBorders .wtBorder.current').eq(4).addClass('corner').css({
			'background-color': '#4B89FF',
			'cursor': 'crosshair',
			'height': '6px',
			'width': '6px'
		}).unbind('mousedown', resizeRange)
	}
}
Handsontable.Core.prototype.nestedCanDrag = function() {
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	//嵌套表拖拽第一步
	var flag;
	this.cornerSet = false;
	this.nestedTimes = false;
	this.oriNestedArea = null;
	if (this.nestedTableArray && this.nestedTableArray.length > 0) {
		for (var i = 0; i < this.nestedTableArray.length; i++) {
			var arr = this.nestedTableArray;
			if ((arr[i].sr <= sr && arr[i].er >= er) && (arr[i].sc <= sc && arr[i].ec >= ec)) {
				if (this.nestedAlreadyIn) {
					if (this.nestedNo == i) {
						this.nestedTimes = true;
						this.oriNestedArea = {
							sr: arr[i].sr,
							sc: arr[i].sc,
							er: arr[i].er,
							ec: arr[i].ec
						}
						this.nestedNo = i;
						this.cornerSet = false;
						flag = false;
						break;
					} else {
						this.selectCell(arr[i].sr, arr[i].sc, arr[i].er, arr[i].ec)
						this.nestedTimes = true;
						this.oriNestedArea = {
							sr: arr[i].sr,
							sc: arr[i].sc,
							er: arr[i].er,
							ec: arr[i].ec
						}
						this.nestedNo = i;
						this.cornerSet = false;
						flag = false;
						break;
					}
				} else {
					this.nestedTimes = true;
					this.oriNestedArea = {
						sr: arr[i].sr,
						sc: arr[i].sc,
						er: arr[i].er,
						ec: arr[i].ec
					}
					this.selectCell(arr[i].sr, arr[i].sc, arr[i].er, arr[i].ec)
					this.nestedNo = i;
					this.cornerSet = false;
					this.nestedAlreadyIn = true;
					flag = false;
					break;
				}
			} else {
				flag = true;
			}
		}
	} else {
		flag = true;
	}
	if (flag) {
		this.nestedAlreadyIn = false;
		this.cornerSet = false;
		this.nestedTimes = false;
		this.nestedNo = null;
	}
}
Handsontable.Core.prototype.nestedTableValid = function() {
	var cell = this.dealInvert()[0];
	if (cell) {
		var sr = cell.sr;
		var sc = cell.sc;
		var er = cell.er;
		var ec = cell.ec;
		if (!this.nestedTableArray || this.nestedTableArray.length < 1) {
			this.nestedStatus = 'new'
		} else {
			var arr = this.nestedTableArray
			for (var i = 0; i < arr.length; i++) {
				if (
					//判断重合
					((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
					((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er)) ||
					((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
					((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er))
				) {
					//判断全等
					if ((ec == arr[i].ec && arr[i].sc == sc && arr[i].sr == sr && er == arr[i].er)) {
						//全等情况
						this.nestedStatus = 'exist'
						this.nestedNo = i;
						break;
					} else {
						//判断嵌套
						this.nestedStatus = 'forbid'
						break;
					}
				} else {
					//不重合情况
					if ( //判断包围
						((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
						((arr[i].sc <= sc && sc <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er)) ||
						((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= sr && sr <= arr[i].er)) ||
						((arr[i].sc <= ec && ec <= arr[i].ec) && (arr[i].sr <= er && er <= arr[i].er))) {
						this.nestedStatus = 'forbid'
						break;
					} else {
						//全新
						this.nestedStatus = 'new'
					}
				}
			}
		}
	}
}
Handsontable.Core.prototype.nestedTableValidForDrag = function() {
	var flag;
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	if (!this.nestedTableArray || this.nestedTableArray.length < 1) {
		flag = true;
	} else {
		var arr = this.nestedTableArray
		for (var i = 0; i < arr.length; i++) {
			if (sr <= arr[i].sr && sc <= arr[i].sc && er >= arr[i].er && ec >= arr[i].ec) {
				if (sr == arr[i].sr && sc == arr[i].sc) {
					flag = true;
				} else {
					flag = false;
					break;
				}
			} else {
				flag = true;
			}
		}
	}
	return flag;
}
Handsontable.Core.prototype.handleMergeRemoveRow = function(index, amount, physicalRows) {
	var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var copy = [];
	var ds = index;
	var de = index + amount - 1;

	for (var i = 0; i < mObj.length; i++) {
		var obj = mObj[i]
		var s = obj.row;
		var e = obj.row + obj.rowspan - 1;

		if (ds == de) {
			if (s <= ds && ds <= e) {
				if (obj.rowspan > 1) {
					obj.rowspan--;
					copy.push(obj)
				} else {
					//不做记录
				}
			} else if (s > ds) {
				obj.row--;
				// obj.rowspan--;
				copy.push(obj)
			} else if (e < ds) {
				copy.push(obj)
			}
		} else {
			if (ds < s && de < e && de < s) {
				obj.row -= amount;
				copy.push(obj)
			} else
			if (ds > e && de > e && ds > s) {
				copy.push(obj)
			} else
			if (ds <= s && e <= de) {
				//不做记录
			} else
			if (ds <= s && de < e && de >= s) {
				obj.row = ds;
				obj.rowspan = e - de
				copy.push(obj)
			} else
			if (ds > s && e < de) {
				obj.rowspan = ds - s
				copy.push(obj)
			} else
			if (s < ds && de >= e) {
				obj.rowspan -= amount;
				copy.push(obj)
			} else if (ds > s && de <= e) {
				obj.rowspan -= amount
				copy.push(obj)
			}
		}
	}
	this.updateSettings({
		mergeCells: copy
	})
}
Handsontable.Core.prototype.handleMergeRemoveCol = function(index, amount, physicalCols) {
	var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var copy = [];
	var ds = index;
	var de = index + amount - 1;

	for (var i = 0; i < mObj.length; i++) {
		var obj = mObj[i]
		var s = obj.col;
		var e = obj.col + obj.colspan - 1;
		if (ds == de) {
			if (s <= ds && ds <= e) {
				if (obj.colspan > 1) {
					obj.colspan--;
					copy.push(obj)
				} else {
					//不做记录
				}
			} else if (s > ds) {
				obj.col--;
				// obj.colspan--;
				copy.push(obj)
			} else if (e < ds) {
				copy.push(obj)
			}
		} else {
			if (ds < s && de < e && de < s) {
				obj.col -= amount;
				copy.push(obj)
			} else
			if (ds > e && de > e && ds > s) {
				copy.push(obj)
			} else
			if (ds <= s && e <= de) {
				//不做记录
			} else
			if (ds <= s && de < e && de >= s) {
				obj.col = ds;
				obj.colspan = e - de
				copy.push(obj)
			} else
			if (ds > s && e < de) {
				obj.colspan = ds - s
				copy.push(obj)
			} else
			if (s < ds && de >= e) {
				obj.colspan -= amount;
				copy.push(obj)
			} else if (ds > s && de <= e) {
				obj.colspan -= amount
				copy.push(obj)
			}
		}
	}
	this.updateSettings({
		mergeCells: copy
	})
}
Handsontable.Core.prototype.handleFPRemoveRow = function(index, amount, physicalRows) {
	if (this.fpArray) {
		var arr = this.fpArray;
		var copy = [];
		var ds = index;
		var de = index + amount - 1;

		for (var i = 0; i < arr.length; i++) {
			var obj = {
				ec: arr[i].ec,
				emptyCol: arr[i].emptyCol,
				emptyRow: arr[i].emptyRow,
				er: arr[i].er,
				sc: arr[i].sc,
				sliceName: arr[i].sliceName,
				sr: arr[i].sr
			}
			var s = obj.sr;
			var e = obj.er;

			if (ds < s && de < e && de < s) {
				obj.sr -= amount;
				obj.er -= amount;
				copy.push(obj)
			} else if (ds > e) {
				copy.push(obj)
			} else if (ds <= s && e <= de) {
				//不做记录
			} else if (ds <= s && de < e && de >= s) {
				obj.sr = ds;
				obj.er = obj.er - amount;
				copy.push(obj)
			} else if (ds > s && e < de) {
				//合并单元格删除有问题
			} else if (s < ds && de >= e) {
				obj.er = ds;
				copy.push(obj)
			} else if (ds > s && de <= e) {
				obj.er = obj.er - amount;
				copy.push(obj)
			}

		}
		this.fpArray = copy;
		this.render()
	}
}
Handsontable.Core.prototype.handleFPRemoveCol = function(index, amount, physicalRows) {
	if (this.fpArray) {
		var arr = this.fpArray;
		var copy = [];
		var ds = index;
		var de = index + amount - 1;

		for (var i = 0; i < arr.length; i++) {
			var obj = {
				ec: arr[i].ec,
				emptyCol: arr[i].emptyCol,
				emptyRow: arr[i].emptyRow,
				er: arr[i].er,
				sc: arr[i].sc,
				sliceName: arr[i].sliceName,
				sr: arr[i].sr
			}
			var s = obj.sc;
			var e = obj.ec;

			if (ds < s && de < e && de < s) {
				obj.sc -= amount;
				obj.ec -= amount;
				copy.push(obj)
			} else if (ds > e) {
				copy.push(obj)
			} else if (ds <= s && e <= de) {
				//不做记录
			} else if (ds <= s && de < e && de >= s) {
				obj.sc = ds;
				obj.ec = obj.ec - amount;
				copy.push(obj)
			} else if (ds > s && e < de) {
				//合并单元格删除有问题
			} else if (s < ds && de >= e) {
				obj.ec = ds;
				copy.push(obj)
			} else if (ds > s && de <= e) {
				obj.ec = obj.ec - amount;
				copy.push(obj)
			}
		}
		this.fpArray = copy;
		this.render()
	}
}
Handsontable.Core.prototype.afterPaste = function(data, cells) {
	var marr = sheetHot.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	if (!this.pasteStop) {
		var copyc = data[0].length;
		var copyr = data.length;
		var sr = this.dealInvert()[0].sr;
		var sc = this.dealInvert()[0].sc;
		var er = this.dealInvert()[0].er;
		var ec = this.dealInvert()[0].ec;

		//复制粘贴合并单元格
		if (this.cvmArray.length > 0) {
			var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
			var copy = [];
			for (var a = 0; a < mObj.length; a++) {
				copy.push({
					row: mObj[a].row,
					col: mObj[a].col,
					rowspan: mObj[a].rowspan,
					colspan: mObj[a].colspan,
					removed: mObj[a].removed
				})
			}
			var repeatRow = Math.ceil((this.unExpand.endRow - this.unExpand.startRow + 1) / this.copyRange.r)
			var repeatCol = Math.ceil((this.unExpand.endCol - this.unExpand.startCol + 1) / this.copyRange.c)
			for (var r = 0; r < repeatRow; r++) {
				for (var c = 0; c < repeatCol; c++) {
					for (var i = 0; i < this.cvmArray.length; i++) {
						var nowR = sr + this.cvmArray[i].rowDiffer + r * this.copyRange.r;
						var nowC = sc + this.cvmArray[i].colDiffer + c * this.copyRange.c;
						if (nowR <= er && nowC <= ec) {
							// this.getPlugin('MergeCells').merge(nowR, nowC, nowR + this.cvmArray[i].rowspan - 1, nowC + this.cvmArray[i].colspan - 1)
							copy.push({
								row: nowR,
								col: nowC,
								rowspan: this.cvmArray[i].rowspan,
								colspan: this.cvmArray[i].colspan,
								removed: false
							})
						}
					}
				}
			}
			this.updateSettings({
				mergeCells: copy
			})
		}
		if (this.cvArray.length > 0) {
			for (var a = sr; a < er + 1; a++) {
				for (var b = sc; b < ec + 1; b++) {
					var temp = this.cvArray[(a - sr) % copyr][(b - sc) % copyc]
					var ab = this.getCellMeta(a, b).cellAttributeInfo;
					ab.alignInfo.align.value.HAlign.value = temp.alignInfo.align.value.HAlign.value;
					ab.alignInfo.align.value.VAlign.value = temp.alignInfo.align.value.VAlign.value;

					ab.fontInfos.ColorSelect.value = temp.fontInfos.ColorSelect.value
					ab.fontInfos.fontFamily.value = temp.fontInfos.fontFamily.value
					ab.fontInfos.fontShape.value = temp.fontInfos.fontShape.value
					ab.fontInfos.fontSize.value = temp.fontInfos.fontSize.value
					ab.fontInfos.fontWeight.value = temp.fontInfos.fontWeight.value
					ab.fontInfos.underline.value = temp.fontInfos.underline.value

					ab.borderInfo.BorderStyle.value = temp.borderInfo.BorderStyle.value
					ab.borderInfo.ColorSelect.value = temp.borderInfo.ColorSelect.value
					ab.borderInfo.LineStyle.value = temp.borderInfo.LineStyle.value
					ab.borderInfo.borderB.value = temp.borderInfo.borderB.value
					ab.borderInfo.borderR.value = temp.borderInfo.borderR.value

					if (a == 0) {
						ab.borderInfo.borderT.value = temp.topBorderInfo
					} else {
						this.getCellMeta(a - 1, b).cellAttributeInfo.borderInfo.borderB.value = temp.topBorderInfo;
					}
					if (b == 0) {
						ab.borderInfo.borderL.value = temp.leftBorderInfo;
					} else {
						this.getCellMeta(a, b - 1).cellAttributeInfo.borderInfo.borderR.value = temp.leftBorderInfo;
					}

					ab.bgcolorInfo.ColorSelectInner.value = temp.bgcolorInfo.ColorSelectInner.value;
				}
			}
		}

		this.render()
	}
}

Handsontable.Core.prototype.contextMenu_removeRow = function() {
	this.nestedTableArrayTemp = this.nestedTableArray;
	this.nestedTableArray = [];
	var c;
	var cells = this.dealInvert()[0];

	var count = cells.er - cells.sr + 1;
	var c = cells.sr;

	if (this.fixedrow && c < this.fixedrow) {
		this.fixedrow--;
	}

	if (typeof this.fathers == 'undefined') this.fathers = [];
	var del = [];
	var len = this.fathers.length;
	this.alter('remove_row', c, count)
	for (var i = 0; i < len; i++) {
		var arr = this.fathers[i];
		if (arr != null) {
			if (c == arr.fr || c == arr.cr) {
				this.changeAttributeInfo(arr.cr, arr.cc, arr.type, '')
				this.fathers.splice(i--, 1)

			} else {
				if (c < arr.fr) {
					arr.fr -= count;
				}
				if (c < arr.cr) {
					arr.cr -= count;
				}
			}
		}
	}

	//this.alter('remove_row', c, count)

	this.fullRowHeightArray()
	var arr = this.rowHeadHeightArray;
	arr.splice(c, count)
	for (var n = 0; n < this.countRows(); n++) {
		var rowHeightInst = this.getPlugin('ManualRowResize');
		rowHeightInst.setManualSize(n, arr[n])
	}
	this.fullRowArray()
	for (var i = 0; i < this.countRows(); i++) {
		var type = this.getCellMeta(i, 0).rowtype;
		var arr = this.rowHeadArray
		var flag = this.getCellMeta(i, 0).row_hide;
		if (flag) {
			if (type == 'title') {
				arr[i] = (i + 1) + "标题<i class='report-iconfont icon-yincang font-20'></i>"
			} else if (type == 'header') {
				arr[i] = (i + 1) + "表头<i class='report-iconfont icon-yincang font-20'></i>"
			} else if (type == 'data') {
				arr[i] = (i + 1) + "数据<i class='report-iconfont icon-yincang font-20'></i>"
			} else {
				arr[i] = (i + 1) + "<i class='report-iconfont icon-yincang font-20'></i>";
			}
		} else {
			if (type == 'title') {
				arr[i] = (i + 1) + '标题';
			} else if (type == 'header') {
				arr[i] = (i + 1) + '表头'
			} else if (type == 'data') {
				arr[i] = (i + 1) + '数据'
			} else {
				arr[i] = (i + 1)
			}
		}
	}
	this.updateSettings({
		rowHeaders: this.rowHeadArray
	})
	this.scrollViewportTo(0, 0)
}
Handsontable.Core.prototype.handleNestedTableRemoveRow = function(index, amount, physicalRows) {
	if (this.nestedTableArrayTemp) {
		//特殊操作，在删除行列时先置空嵌套表保证能走到删除后
		this.nestedTableArray = this.nestedTableArrayTemp;

		var arr = this.nestedTableArray;
		var copy = [];
		var ds = index;
		var de = index + amount - 1;

		for (var i = 0; i < arr.length; i++) {
			var obj = {
				ec: arr[i].ec,
				er: arr[i].er,
				info: arr[i].info,
				sc: arr[i].sc,
				sr: arr[i].sr,
				qtb_template: arr[i].qtb_template,
				qtb_tableName: arr[i].qtb_tableName,
				qtb_unfold: arr[i].qtb_unfold,
				qtb_style: arr[i].qtb_style
			}
			var s = obj.sr;
			var e = obj.er;

			if (ds < s && de < e && de < s) {
				obj.sr -= amount;
				obj.er -= amount;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			} else if (ds > e) {
				copy.push(obj)
			} else if (ds <= s && e <= de) {
				//不做记录
			} else if (ds <= s && de < e && de >= s) {
				obj.sr = ds;
				obj.er = obj.er - amount;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			} else if (ds > s && e < de) {
				// obj.rowspan = ds - s
				// copy.push(obj)
				// ?????????????
				//合并单元格删除有问题
			} else if (s < ds && de >= e) {
				obj.er = ds;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			} else if (ds > s && de <= e) {
				obj.er = obj.er - amount;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			}
		}
		this.nestedTableArray = copy;
		this.render()
	}
}
Handsontable.Core.prototype.handleNestedTableRemoveCol = function(index, amount, physicalRows) {
	if (this.nestedTableArrayTemp) {
		//特殊操作，在删除行列时先置空嵌套表保证能走到删除后
		this.nestedTableArray = this.nestedTableArrayTemp;

		var arr = this.nestedTableArray;
		var copy = [];
		var ds = index;
		var de = index + amount - 1;

		for (var i = 0; i < arr.length; i++) {
			var obj = {
				ec: arr[i].ec,
				er: arr[i].er,
				info: arr[i].info,
				sc: arr[i].sc,
				sr: arr[i].sr,
				qtb_template: arr[i].qtb_template,
				qtb_tableName: arr[i].qtb_tableName,
				qtb_unfold: arr[i].qtb_unfold,
				qtb_style: arr[i].qtb_style
			}
			var s = obj.sc;
			var e = obj.ec;

			if (ds < s && de < e && de < s) {
				obj.sc -= amount;
				obj.er -= amount;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			} else if (ds > e) {
				copy.push(obj)
			} else if (ds <= s && e <= de) {
				//不做记录
			} else if (ds <= s && de < e && de >= s) {
				obj.sc = ds;
				obj.ec = obj.ec - amount;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			} else if (ds > s && e < de) {
				// obj.rowspan = ds - s
				// copy.push(obj)
				// ?????????????
				//合并单元格删除有问题
			} else if (s < ds && de >= e) {
				obj.ec = ds;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			} else if (ds > s && de <= e) {
				obj.ec = obj.ec - amount;
				obj.cell = this.getCell(obj.sr, obj.sc);
				copy.push(obj)
			}
		}
		this.nestedTableArray = copy;
		this.render()
	}
}
Handsontable.Core.prototype.insertRow = function(val, position) {
	var isheader = false;
	if (this.nestedTableArray) {
		this.nestedTableArrayTemp = this.nestedTableArray;
		this.nestedTableArray = [];
	}
	var c;

	if (typeof position != 'undefined') {
		c = position;
	} else {
		if (this.getCellMeta(0, 0).state != 'cell' && this.getCellMeta(0, 0).stateTemp || this.getCellMeta(0, 0).stateTemp == 0) {
			c = this.getCellMeta(0, 0).stateTemp
		} else {
			c = this.getCellMeta(0, 0).stateCell[0]
		}
	}

	//插入后合并单元格处理
	var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var copy = [];
	for (var i = 0; i < mObj.length; i++) {
		var obj = mObj[i]
		var s = obj.row;
		var e = obj.row + obj.rowspan - 1;
		if (s < c && c <= e) {
			copy.push(obj)
		} else if (c <= s) {
			copy.push(obj)
		} else {
			copy.push(obj)
		}
	}

	//插入后表头属性设置1
	if (this.getCellMeta(c, 0).rowtype == 'header') {
		isheader = true;
	}
	if (this.fathers) {
		for (var o = 0; o < this.fathers.length; o++) {
			var arr = this.fathers[o];
			if (arr != null) {
				if (c <= arr.cr) {
					arr.cr += val;
				}
				if (c <= arr.fr) {
					arr.fr += val;
				}
			}
		}
	}
	this.alter('insert_row', c, val)

	this.fullRowHeightArray()
	for (var i = 0; i < val; i++) {
		this.rowHeadHeightArray.splice(c, 0, 26)
	}
	var arr = this.rowHeadHeightArray;
	for (var n = 0; n < this.countRows(); n++) {
		var arr = this.rowHeadHeightArray;
		var rowWidthInst = this.getPlugin('ManualRowResize');
	}
	this.fullRowArray()
	for (var i = 0; i < this.countRows(); i++) {
		var type = this.getCellMeta(i, 0).rowtype;
		var arr = this.rowHeadArray
		var flag = this.getCellMeta(i, 0).row_hide;
		if (flag) {
			if (type == 'title') {
				arr[i] = (i + 1) + "标题<i class='report-iconfont icon-yincang font-20'></i>"
			} else if (type == 'header') {
				arr[i] = (i + 1) + "表头<i class='report-iconfont icon-yincang font-20'></i>"
			} else if (type == 'data') {
				arr[i] = (i + 1) + "数据<i class='report-iconfont icon-yincang font-20'></i>"
			} else {
				arr[i] = (i + 1) + "<i class='report-iconfont icon-yincang font-20'></i>";
			}
		} else {
			if (type == 'title') {
				arr[i] = (i + 1) + '标题';
			} else if (type == 'header') {
				arr[i] = (i + 1) + '表头'
			} else if (type == 'data') {
				arr[i] = (i + 1) + '数据'
			} else {
				arr[i] = (i + 1)
			}
		}
	}

	if (isheader) {
		for (var a = c; a < val + c; a++) {
			this.rowHeadArray[a] += '表头';
			this.setCellMeta(a, 0, 'rowtype', 'header')
		}
	}

	//插入后分片处理
	if (this.fpArray) {
		var fpArray = this.fpArray;
		var fpCopy = [];
		for (var e = 0; e < fpArray.length; e++) {
			var obj = {
				ec: fpArray[e].ec,
				emptyCol: fpArray[e].emptyCol,
				emptyRow: fpArray[e].emptyRow,
				er: fpArray[e].er,
				sc: fpArray[e].sc,
				sliceName: fpArray[e].sliceName,
				sr: fpArray[e].sr
			}
			var s = obj.sr;
			var e = obj.er;
			if (s < c && c <= e) {
				obj.er += val;
				fpCopy.push(obj)
			} else if (c <= s) {
				obj.sr += val;
				obj.er += val;
				fpCopy.push(obj)
			} else {
				fpCopy.push(obj)
			}
		}
		this.fpArray = fpCopy;
	}

	//插入嵌套表处理
	if (this.nestedTableArrayTemp) {
		this.nestedTableArray = this.nestedTableArrayTemp;
		var nested = this.nestedTableArray;
		var nesCopy = [];
		for (var o = 0; o < nested.length; o++) {
			var obj = {
				ec: nested[o].ec,
				er: nested[o].er,
				info: nested[o].info,
				sc: nested[o].sc,
				sr: nested[o].sr,
				qtb_template: nested[o].qtb_template,
				qtb_tableName: nested[o].qtb_tableName,
				qtb_unfold: nested[o].qtb_unfold,
				qtb_style: nested[o].qtb_style
			}
			var s = obj.sr;
			var e = obj.er;
			if (s < c && c <= e) {
				obj.er += val;
				nesCopy.push(obj)
			} else if (c <= s) {
				this.setCellMeta(obj.sr, obj.sc, 'readOnly', false)
				this.getCell(obj.sr, obj.sc).ondblclick = null;
				obj.sr += val;
				obj.er += val;
				this.setCellMeta(obj.sr, obj.sc, 'readOnly', true)
				this.getCell(obj.sr, obj.sc).ondblclick = this.nestedTable;
				nesCopy.push(obj)
			} else {
				nesCopy.push(obj)
			}
		}
		this.nestedTableArray = nesCopy;
	}

	this.updateSettings({
		rowHeaders: this.rowHeadArray,
		mergeCells: copy
	})

	selected = this.getSelectedRange();
	var selCell = selected[0];

	if (!this.isCol() && !this.isRow()) {
		c = this.getSelected()[0][0]
	}
	selected[0].from.col = 0;
	selected[0].from.row = c;
	selected[0].to.col = this.countCols() - 1;
	selected[0].to.row = c + val - 1;
	this.selectCells(selected, false);
}
Handsontable.Core.prototype.insertCol = function(val) {
	if (this.nestedTableArray) {
		this.nestedTableArrayTemp = this.nestedTableArray;
		this.nestedTableArray = [];
	}
	var c;
	// var this = this;
	if (this.getCellMeta(0, 0).state != 'cell' && this.getCellMeta(0, 0).stateTemp || this.getCellMeta(0, 0).stateTemp == 0) {
		c = this.getCellMeta(0, 0).stateTemp
	} else {
		c = this.getCellMeta(0, 0).stateCell[1]
	}

	var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var copy = [];

	for (var i = 0; i < mObj.length; i++) {
		var obj = mObj[i]
		var s = obj.col;
		var e = obj.col + obj.colspan - 1;
		if (s < c && c <= e) {
			copy.push(obj)
		} else if (c <= s) {
			copy.push(obj)
		} else {
			copy.push(obj)
		}
	}
	if (this.fathers) {
		for (var o = 0; o < this.fathers.length; o++) {
			var arr = this.fathers[o];
			if (arr != null) {
				if (c <= arr.cc) {
					arr.cc += val;
				}
				if (c <= arr.fc) {
					arr.fc += val;
				}
			}
		}
	}
	this.alter('insert_col', c, val)

	this.fullColWidthArray()
	for (var n = 0; n < this.countRows(); n++) {
		if (this.colHeadArray) {
			var rowHead = this.colHeadArray;
			if ((rowHead[n] + '').indexOf('数据') > -1) {
				this.setCellMeta(n, 0, 'rowtype', 'data')
			}
			if ((rowHead[n] + '').indexOf('标题') > -1) {
				this.setCellMeta(n, 0, 'rowtype', 'title')
			}
			if ((rowHead[n] + '').indexOf('表头') > -1) {
				this.setCellMeta(n, 0, 'rowtype', 'header')
			}
		}
	}
	for (var i = 0; i < val; i++) {
		this.colHeadWidthArray.splice(c, 0, 80)
	}
	var arr = this.colHeadWidthArray;
	for (var n = 0; n < this.countCols(); n++) {
		var arr = this.colHeadWidthArray;
		var colWidthInst = this.getPlugin('ManualColumnResize');
		colWidthInst.setManualSize(n, arr[n])
	}

	this.fullColArray()
	for (var i = 0; i < this.countCols(); i++) {
		var hflag = this.getCellMeta(0, i).col_hide;
		var lflag = this.getCellMeta(0, i).col_lock;
		var en = this.numToEng(i)
		var arr = this.colHeadArray;
		if (hflag && lflag) {
			arr[i] = en + "锁定<i class='report-iconfont icon-yincang font-20'></i>"
		} else if (hflag) {
			arr[i] = en + "<i class='report-iconfont icon-yincang font-20'></i>"
		} else if (lflag) {
			arr[i] = en + '锁定'
		} else {
			arr[i] = en
		}
	}

	//插入后分片处理
	if (this.fpArray) {
		var fpArray = this.fpArray;
		var fpCopy = [];
		for (var e = 0; e < fpArray.length; e++) {
			var obj = {
				ec: fpArray[e].ec,
				emptyCol: fpArray[e].emptyCol,
				emptyRow: fpArray[e].emptyRow,
				er: fpArray[e].er,
				sc: fpArray[e].sc,
				sliceName: fpArray[e].sliceName,
				sr: fpArray[e].sr
			}
			var s = obj.sc;
			var e = obj.ec;
			if (s < c && c <= e) {
				obj.ec += val;
				fpCopy.push(obj)
			} else if (c <= s) {
				obj.sc += val;
				obj.ec += val;
				fpCopy.push(obj)
			} else {
				fpCopy.push(obj)
			}
		}
		this.fpArray = fpCopy;
	}

	//插入嵌套表处理
	if (this.nestedTableArrayTemp) {

		this.nestedTableArray = this.nestedTableArrayTemp;
		var nested = this.nestedTableArray;

		var nesCopy = [];
		for (var o = 0; o < nested.length; o++) {
			var obj = {
				ec: nested[o].ec,
				er: nested[o].er,
				info: nested[o].info,
				sc: nested[o].sc,
				sr: nested[o].sr,
				qtb_template: nested[o].qtb_template,
				qtb_tableName: nested[o].qtb_tableName,
				qtb_unfold: nested[o].qtb_unfold,
				qtb_style: nested[o].qtb_style
			}
			var s = obj.sc;
			var e = obj.ec;
			if (s < c && c <= e) {
				// 
				obj.ec += val;
				this.getCell(obj.sr, obj.sc).onclick = null;
				nesCopy.push(obj)
			} else if (c <= s) {
				this.setCellMeta(obj.sr, obj.sc, 'readOnly', false)
				this.getCell(obj.sr, obj.sc).ondblclick = null;
				obj.sc += val;
				obj.ec += val;
				this.setCellMeta(obj.sr, obj.sc, 'readOnly', true)
				this.getCell(obj.sr, obj.sc).ondblclick = this.nestedTable;
				nesCopy.push(obj)
			} else {
				obj.cell = this.getCell(obj.sr, obj.sc)
				nesCopy.push(obj)
			}
		}
		this.nestedTableArray = nesCopy;
	}

	if (this.fixedcol && this.fixedcol > c) {
		this.fixedcol = this.fixedcol + val;
		for (var i = c; i < c + val; i++) {
			this.colHeadArray[i] += '锁定'
		}
		this.updateSettings({
			fixedColumnsLeft: this.fixedcol,
			colHeaders: this.colHeadArray,
			mergeCells: copy
		})
	} else {
		this.updateSettings({
			colHeaders: this.colHeadArray,
			mergeCells: copy
		})
	}

	selected = this.getSelectedRange();

	if (!this.isCol() && !this.isRow()) {
		c = this.getSelected()[0][1]
	}
	selected[0].from.row = 0;
	selected[0].from.col = c;
	selected[0].to.row = this.countRows() - 1;
	selected[0].to.col = c + val - 1;


	this.selectCells(selected, false);
}
Handsontable.Core.prototype.contextMenu_clearText = function() {
	var selectCells = this.dealInvert()
	for (var i = 0; i < selectCells.length; i++) {
		var sr = selectCells[i].sr
		var sc = selectCells[i].sc
		var er = selectCells[i].er
		var ec = selectCells[i].ec
		var cells = [];
		for (var n = sr; n < er + 1; n++) {
			for (var b = sc; b < ec + 1; b++) {
				// this.setDataAtCell(n, b, '')
				var temp = [n, b, '']
				cells.push(temp)
			}
		}
		this.setDataAtCell(cells)
	}
}



Handsontable.Core.prototype.toolbarFontFamily = function() {
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	var ff = this.toolbar['sheet-font-family'][0].children[0].children[0].children[0];
	if (this.getCellMeta(sr, sc) && this.getCellMeta(sr, sc).cellAttributeInfo) {
		var temp = this.getCellMeta(sr, sc).cellAttributeInfo.fontInfos.fontFamily.value;
		if (temp == '0' || temp == 'SimSun') {
			ff.innerText = '宋体';
			ff.style.fontFamily = 'SimSun'
		}
		if (temp == '1' || temp == 'Microsoft YaHei') {
			ff.innerText = '微软雅黑';
			ff.style.fontFamily = 'Microsoft YaHei'
		}
		if (temp == '2' || temp == 'STFangsong') {
			ff.innerText = '华文仿宋';
			ff.style.fontFamily = 'STFangsong'
		}
		if (temp == '3' || temp == 'STKaiti') {
			ff.innerText = '华文楷体';
			ff.style.fontFamily = 'STKaiti'
		}
		if (temp == '4' || temp == 'STSong') {
			ff.innerText = '华文宋体';
			ff.style.fontFamily = 'STSong'
		}
		if (temp == '5' || temp == 'Arial') {
			ff.innerText = 'Arial';
			ff.style.fontFamily = 'Arial'
		}
		if (temp == '6' || temp == 'Comic Sans MS') {
			ff.innerText = 'Comic Sans MS';
			ff.style.fontFamily = 'Comic Sans MS'
		}
		if (temp == '7' || temp == 'Courier New') {
			ff.innerText = 'Courier New';
			ff.style.fontFamily = 'Courier New'
		}
		if (temp == '8' || temp == 'Georgia') {
			ff.innerText = 'Georgia';
			ff.style.fontFamily = 'Georgia'
		}
		if (temp == '9' || temp == 'Impact') {
			ff.innerText = 'Impact';
			ff.style.fontFamily = 'Impact'
		}
		if (temp == '10' || temp == 'Times New Roman') {
			ff.innerText = 'Times New Roman';
			ff.style.fontFamily = 'Times New Roman'
		}
		if (temp == '11' || temp == 'Trebuchet MS') {
			ff.innerText = 'Trebuchet MS';
			ff.style.fontFamily = 'Trebuchet MS'
		}
		if (temp == '12' || temp == 'Verdana') {
			ff.innerText = 'Verdana';
			ff.style.fontFamily = 'Verdana'
		}
	}
}
Handsontable.Core.prototype.toolbarFontSize = function() {
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	var fs = this.toolbar['sheet-font-size'][0].children[0].children[0].children[0];
	if (this.getCell(sr, sc) && this.getCell(sr, sc).style) {
		var tmp = this.getCell(sr, sc).style.fontSize;
		if (tmp.split('px')[0] == '') {
			fs.innerText = 12;
		} else {
			fs.innerText = tmp.split('px')[0];
		}
	}
}
Handsontable.Core.prototype.changeCellMeta = function(sr, sc, t, o) {
	var p1 = t.split(':')[0];
	var p2 = t.split(':')[1];
	var p3 = t.split(':')[2];
	o.setCellMeta(sr, sc, 'theCellChanged', true);
	var el = o.getCell(sr, sc);

	if (p1 == 'fontfamily') {
		if (t == 'fontfamily:0') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'SimSun';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'SimSun')
		}
		if (t == "fontfamily:1") {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Microsoft YaHei';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Microsoft YaHei')
		}
		if (t == 'fontfamily:2') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'STFangsong';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'STFangsong')
		}
		if (t == 'fontfamily:3') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'STKaiti';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'STKaiti')
		}
		if (t == 'fontfamily:4') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'STSong';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'STSong')
		}
		if (t == 'fontfamily:5') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Arial';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Arial')
		}
		if (t == 'fontfamily:6') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Comic Sans MS';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Comic Sans MS')
		}
		if (t == 'fontfamily:7') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Courier New';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Courier New')
		}
		if (t == 'fontfamily:8') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Georgia';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Georgia')
		}
		if (t == 'fontfamily:9') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Impact';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Impact')
		}
		if (t == 'fontfamily:10') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Times New Roman';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Times New Roman')
		}
		if (t == 'fontfamily:11') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Trebuchet MS';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Trebuchet MS')
		}
		if (t == 'fontfamily:12') {
			if (typeof el != 'undefined') {
				el.style.fontFamily = 'Verdana';
			}
			o.changeAttributeInfo(sr, sc, "fontFamily", 'Verdana')
		}
		this.toolbarFontFamily();
	}
	if (p1 == 'fontsize') {
		o.changeAttributeInfo(sr, sc, "fontSize", p2)
		if (typeof el != 'undefined') {
			el.style.fontSize = p2 + 'px';
		}
		this.toolbarFontSize();
	}
	if (p1 == 'fontcolor') {
		o.changeAttributeInfo(sr, sc, "fontColorSelect", p2)
		if (typeof el != 'undefined') {
			el.style.color = p2;
		}
	}
	if (p1 == 'cellcolor') {
		o.changeAttributeInfo(sr, sc, "colorDisplay", p2)
		if (typeof el != 'undefined') {
			el.style.backgroundColor = p2;
		}
	}
	var vAlign = this.toolbar['sheet-vertical-align'][0].children[0].children[0].children[0].children[0].children[0]
	var hAlign = this.toolbar['toolbar-sheet-horizontal-align-group'][0].children[0].children[0].children[0].children[0].children[0].children[0];
	if (t == 'sheet-left-align') {
		var temp = o.getCellMeta(sr, sc).cellAttributeInfo
		temp.alignInfo.align.value.HAlign.value = 'left';
		o.setCellMeta(sr, sc, 'cellAttributeInfo', temp)
		hAlign.style.backgroundPosition = '0 -1200px';
	}
	if (t == 'sheet-center-align') {
		var temp = o.getCellMeta(sr, sc).cellAttributeInfo
		temp.alignInfo.align.value.HAlign.value = 'center';
		o.setCellMeta(sr, sc, 'cellAttributeInfo', temp)
		if (typeof el != 'undefined') {
			el.style.textAlign = 'center';
		}
		hAlign.style.backgroundPosition = '0 -1148px';
	}
	if (t == 'sheet-right-align') {
		var temp = o.getCellMeta(sr, sc).cellAttributeInfo
		temp.alignInfo.align.value.HAlign.value = 'right';
		o.setCellMeta(sr, sc, 'cellAttributeInfo', temp)
		if (typeof el != 'undefined') {
			el.style.textAlign = 'right';
		}
		hAlign.style.backgroundPosition = '0 -1304px';
	}
	if (t == 'sheet-top-align') {
		var temp = o.getCellMeta(sr, sc).cellAttributeInfo
		temp.alignInfo.align.value.VAlign.value = 'top';
		o.setCellMeta(sr, sc, 'cellAttributeInfo', temp)
		if (typeof el != 'undefined') {
			el.style.verticalAlign = 'top';
		}
		vAlign.style.backgroundPosition = '0 -1356px';
	}
	if (t == 'sheet-middle-align') {
		var temp = o.getCellMeta(sr, sc).cellAttributeInfo
		temp.alignInfo.align.value.VAlign.value = 'middle';
		o.setCellMeta(sr, sc, 'cellAttributeInfo', temp)
		if (typeof el != 'undefined') {
			el.style.verticalAlign = 'middle';
		}
		vAlign.style.backgroundPosition = '0 -1252px';
	}
	if (t == 'sheet-bottom-align') {
		var temp = o.getCellMeta(sr, sc).cellAttributeInfo
		temp.alignInfo.align.value.VAlign.value = 'bottom';
		o.setCellMeta(sr, sc, 'cellAttributeInfo', temp)
		if (typeof el != 'undefined') {
			el.style.verticalAlign = 'bottom';
		}
		vAlign.style.backgroundPosition = '0 -1096px';
	}
	var fontInfo = o.getCellMeta(sr, sc).cellAttributeInfo.fontInfos;

	if (t == "sheet-bold") {
		if (fontInfo.fontWeight.value != 'bold') {
			o.changeAttributeInfo(sr, sc, "fontWeight", 'bold')
			this.toolbar['sheet-boldbutton'].addClass('pressed')
		} else {
			o.changeAttributeInfo(sr, sc, "fontWeight", '')
			this.toolbar['sheet-boldbutton'].removeClass('pressed')
		}
	}
	if (t == 'sheet-italic') {
		if (fontInfo.fontShape.value != 'italic') {
			o.changeAttributeInfo(sr, sc, "fontShape", 'italic')
			this.toolbar['sheet-italicsbutton'].addClass('pressed')
		} else {
			o.changeAttributeInfo(sr, sc, "fontShape", '')
			this.toolbar['sheet-italicsbutton'].removeClass('pressed')
		}
	}
	if (t == "sheet-underline") {
		if (fontInfo.underline.value != 'underline') {
			o.changeAttributeInfo(sr, sc, "underline", 'underline')
			this.toolbar['sheet-underlinebutton'].addClass('pressed')
		} else {
			o.changeAttributeInfo(sr, sc, "underline", '')
			this.toolbar['sheet-underlinebutton'].removeClass('pressed')
		}
	}
}
//调用右键菜单接口的合并方法
Handsontable.Core.prototype.mergeCell = function() {
	var cells = this.dealInvert()[0];
	this.getPlugin("contextMenu").executeCommand('mergeCells', cells)
}
//兼容各个方向的选择
Handsontable.Core.prototype.dealInvert = function() {
	var result = [];
	var allPart = this.getSelected();
	if (allPart && allPart.length) {
		for (var i = 0; i < allPart.length; i++) {
			var s1 = allPart[i][0];
			var s2 = allPart[i][1];
			var s3 = allPart[i][2];
			var s4 = allPart[i][3];
			var sr;
			var sc;
			var er;
			var ec;
			if (s3 >= s1) {
				er = s3;
				sr = s1;
			} else {
				er = s1;
				sr = s3;
			}
			if (s4 >= s2) {
				ec = s4;
				sc = s2;
			} else {
				ec = s2;
				sc = s4;
			}
			result.push({
				sr: sr,
				sc: sc,
				er: er,
				ec: ec
			})
		}
	}
	return result;
}
Handsontable.Core.prototype.setColHeader = function(type, sc, ec) {
	var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var copy = [];
	for (var n = 0; n < mObj.length; n++) {
		copy.push(mObj[n])
	}
	if (this.dealInvert()[0]) {
		var rows = [];
		var start = sc || this.dealInvert()[0].sc;
		var end = ec || this.dealInvert()[0].ec;
		for (var i = start; i < end + 1; i++) {
			var hflag = this.getCellMeta(0, i).col_hide;
			var lflag = this.getCellMeta(0, i).col_lock;
			this.fullColArray();
			var temp = (this.colHeadArray[i] + '');

			if (type == 'hide') {
				if (hflag) {
					this.setCellMeta(0, i, 'col_hide', false)
					if (temp.indexOf('锁定') != -1) {
						this.colHeadArray[i] = this.numToEng(i) + '锁定'
					} else {
						this.colHeadArray[i] = this.numToEng(i)
					}
					// 取消隐藏列之后改变起宽度的值 2019-11-8 lf(打开已定制模板用到)
					if(this.colHeadWidthArray[i]==0){
						this.colHeadWidthArray[i]=40;
					}

				} else {
					this.setCellMeta(0, i, 'col_hide', true)
					if (temp.indexOf('锁定') != -1) {
						this.colHeadArray[i] = this.numToEng(i) + '锁定' + "<i class='report-iconfont icon-yincang font-20'></i>"
					} else {
						this.colHeadArray[i] = this.numToEng(i) + "<i class='report-iconfont icon-yincang font-20'></i>"
					}
				}
			} else if (type == 'lock') {
				if (lflag) {
					if (this.getCellMeta(0, i).col_hide) {
						this.colHeadArray[i] = this.numToEng(i) + "<i class='report-iconfont icon-yincang font-20'></i>"
					} else {
						this.colHeadArray[i] = this.numToEng(i)
					}
					this.setCellMeta(0, i, 'col_lock', false)
				} else {
					this.setCellMeta(0, i, 'col_lock', true)
					if (this.getCellMeta(0, i).col_hide) {
						this.colHeadArray[i] = this.numToEng(i) + '锁定' + "<i class='report-iconfont icon-yincang font-20'></i>"
					} else {
						this.colHeadArray[i] = this.numToEng(i) + '锁定'
					}
				}
			}
		}
	}
	this.updateSettings({
		colHeaders: this.colHeadArray,
		colWidths: this.colHeadWidthArray,
		mergeCells: copy
	})
}
Handsontable.Core.prototype.setRowHeader = function(type) {

	var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var copy = [];
	for (var n = 0; n < mObj.length; n++) {
		copy.push(mObj[n])
	}
	if (this.dealInvert()[0]) {
		var rows = [];
		var start = this.dealInvert()[0].sr;
		var end = this.dealInvert()[0].er;
		for (var i = start; i < end + 1; i++) {
			var types = this.getCellMeta(i, 0).rowtype;
			this.fullRowArray();
			var temp = (this.rowHeadArray[i] + '');
			var flag = this.getCellMeta(i, 0).row_hide;
			if (type == 'title') {
				if (i != 0) {
					vmd.tip('标题只能在首行设置', 'error')
				} else {
					if (types == 'title') {
						this.setCellMeta(i, 0, 'rowtype', 'header')
						if (flag) {
							// this.rowHeadArray[i] = (i + 1) + "<i class='report-iconfont icon-yincang font-20'></i>"
							this.rowHeadArray[i] = (i + 1) + '表头' + "<i class='report-iconfont icon-yincang font-20'></i>"
						} else {
							// this.rowHeadArray[i] = (i + 1)
							this.rowHeadArray[i] = (i + 1) + '表头'
						}
					} else {
						this.setCellMeta(i, 0, 'rowtype', 'title')
						if (flag) {
							this.rowHeadArray[i] = (i + 1) + '标题' + "<i class='report-iconfont icon-yincang font-20'></i>"
						} else {
							this.rowHeadArray[i] = (i + 1) + '标题'
						}
					}
				}
			} else if (type == 'header') {
				if (i != 0 && (this.getCellMeta(i - 1, 0).rowtype == 'data' || !this.getCellMeta(i - 1, 0).rowtype)) {
					vmd.tip('表头应在标题后连续设置', 'error')
				} else {
					if (types == 'header') {
						this.setCellMeta(i, 0, 'rowtype', 'none')
						if (flag) {
							this.rowHeadArray[i] = (i + 1) + "<i class='report-iconfont icon-yincang font-20'></i>"
						} else {
							this.rowHeadArray[i] = (i + 1)
						}
					} else {
						this.setCellMeta(i, 0, 'rowtype', 'header')
						if (flag) {
							this.rowHeadArray[i] = (i + 1) + '表头' + "<i class='report-iconfont icon-yincang font-20'></i>"
						} else {
							this.rowHeadArray[i] = (i + 1) + '表头'
						}
					}
				}
			} else if (type == 'data') {
				if (types == 'data') {
					this.setCellMeta(i, 0, 'rowtype', 'none')
					if (flag) {
						this.rowHeadArray[i] = (i + 1) + "<i class='report-iconfont icon-yincang font-20'></i>"
					} else {
						this.rowHeadArray[i] = (i + 1)
					}
				} else {
					this.setCellMeta(i, 0, 'rowtype', 'data')
					if (flag) {
						this.rowHeadArray[i] = (i + 1) + '数据' + "<i class='report-iconfont icon-yincang font-20'></i>"
					} else {
						this.rowHeadArray[i] = (i + 1) + '数据'
					}
				}
			} else if (type == 'hide') {
				var cn;
				if (types == 'title') cn = '标题';
				if (types == 'header') cn = '表头';
				if (types == 'data') cn = '数据';
				if (typeof types == 'undefined' || types == 'none') cn = '';

				if (flag) {
					this.setCellMeta(i, 0, 'row_hide', false)
					this.rowHeadArray[i] = (i + 1) + cn
				} else {
					this.setCellMeta(i, 0, 'row_hide', true)
					this.rowHeadArray[i] = (i + 1) + cn + "<i class='report-iconfont icon-yincang font-20'></i>"
				}
			}
		}
	}
	this.updateSettings({
		rowHeaders: this.rowHeadArray,
		mergeCells: copy
	})
}
Handsontable.Core.prototype.isNestedFirst = function(r, c) {
	if (this.nestedTableArray) {
		for (var i = 0; i < this.nestedTableArray.length; i++) {
			if (this.nestedTableArray[i].sr == r && this.nestedTableArray[i].sc == c) {
				return true;
			}
		}
	} else {
		return false;
	}
	return false;
}
Handsontable.Core.prototype.checkFathers = function(row, col) {
	for (var i = 0; i < row; i++) {
		for (var n = 0; n < col; n++) {
			if(!this.getCellMeta(i, n).cellAttributeInfo) continue;
			var l = this.getCellMeta(i, n).cellAttributeInfo.extraInfo.leftParent.value;
			var r = this.getCellMeta(i, n).cellAttributeInfo.extraInfo.rightParent.value
			if (l != '') {
				var p1 = l.match(/^[a-z|A-Z]+/gi);
				var p2 = l.match(/\d+$/gi);
				var fc = this.engToNum(p1[0]) - 1
				var fr = p2[0] - 1
				if (fr == i && fc == n) {
					vmd.alert('保存未成功', '单元格' + l + '设置自己为左父，请检查设置')
					return true;
				}
			}
			if (r != '') {
				var p1 = r.match(/^[a-z|A-Z]+/gi);
				var p2 = r.match(/\d+$/gi);
				var fc = this.engToNum(p1[0]) - 1
				var fr = p2[0] - 1
				if (fr == i && fc == n) {
					vmd.alert('保存未成功', '单元格' + r + '设置自己为左父，请检查设置')
					return true;
				}
			}
		}
	}
}
Handsontable.Core.prototype.saveRptInfo = function(reportid, directPass) {
	var rows = this.countRows();
	var cols = this.countCols();
	var maxRow = 0;
	var maxCol = 0;
	// var rCount = 0;
	// var cCount = 0; //行列标题表头数
	this.vmdRptDataSets = this.getDatasets(this);
	for (var i = 0; i < rows; i++) {
		for (var n = 0; n < cols; n++) {
			var rowCol = this.setCellDataset(i, n, reportid, maxRow, maxCol, this, directPass);
			if (rowCol) {
				maxRow = rowCol.maxRow;
				maxCol = rowCol.maxCol;
			} else {
				return null;
			}
		}
	}
	//判断左父上父是否可以保存
	if (!directPass) {
		if (this.checkFathers(maxRow + 1, maxCol + 1)) return null;
	}
	for (var t = 0; t < maxRow + 1; t++) {
		if (this.getCellMeta(t, 0).rowtype == 'title') {
			if (t != 0 && typeof this.getCellMeta(t - 1, 0).rowtype == 'undefined') {
				vmd.tip('标题行类型必须作为首行或由首行连贯设置，保存未成功，请修改报表设置', 'error')
				return null
			}
			if (t != 0 && this.getCellMeta(t - 1, 0).rowtype && this.getCellMeta(t - 1, 0).rowtype == 'data') {
				vmd.tip('标题行类型必须作为首行或由首行连贯设置，保存未成功，请修改报表设置', 'error')
				return null
			}
			if (t != 0 && this.getCellMeta(t - 1, 0).rowtype && this.getCellMeta(t - 1, 0).rowtype == 'header') {
				vmd.tip('标题行类型必须作为首行或由首行连贯设置，保存未成功，请修改报表设置', 'error')
				return null
			}
		}
	}
	var report = {};
	report.main = {}
	report.main.style = {};
	report.main.body = {};
	report.main.celltypes = {};
	report.main.body.rowNum = maxRow + 1;
	report.main.body.colNum = maxCol + 1;
	report.main.datasource = {};
	report.main.datasource.tables = {};
	report.main.tree = {};
	report.main.body.columns = {};
	report.main.body.columns.width = [];
	report.subs = {};
	report.main.page = {
		pagemargin: {
			top: this.allPrintInfo.print_marginTop,
			bottom: this.allPrintInfo.print_marginBottom,
			left: this.allPrintInfo.print_marginLeft,
			right: this.allPrintInfo.print_marginRight,
			header: this.allPrintInfo.print_header,
			footer: this.allPrintInfo.print_footer
		},
		pageproperty: {
			pagedirection: this.allPrintInfo.print_direction,
			type: this.allPrintInfo.print_paperSize,
			printquality: this.allPrintInfo.print_quality
		}
	}
	var styleInfo = new reportInfos();

	//将右键菜单用到的数据集存入styleInfo
	for (var i = 0; i < this.menus.length; i++) {
		if (this.menus[i].source == '1') {
			var norepeat = true;
			for (var n = 0; n < styleInfo.datasets.length; n++) {
				if (this.menus[i].sets == styleInfo.datasets[n]) {
					norepeat = false;
				}
			}
			if (norepeat) {
				styleInfo.datasets.push(this.menus[i].sets)
			}
		}
	}

	if (typeof this.checkArray != 'undefined') {
		this.saveCheckRules(report);
	}
	if (typeof this.submitArray != 'undefined') {
		this.saveSubmitRules(report);
	}
	// 嵌套表信息获取
	if (this.nestedTableArray && this.nestedTableArray.length > 0) {
		getSubRptInfo(this, report);
	}
	for (var coli = 0; coli < maxCol + 1; coli++) {
		if (this.getCellMeta(0, coli).col_hide) {
			report.main.body.columns.width.push(0);
		} else {
			if (this.colHeadWidthArray) {
				report.main.body.columns.width.push(this.colHeadWidthArray[coli]);
			} else {
				report.main.body.columns.width.push(80)
			}
		}
	}
	//分栏
	if (this.flList && this.flList.length > 0) {
		report.main.subfields = {};
		for (var i = 0; i < this.flList.length; i++) {
			var fl = this.flList[i];
			if (fl) {
				var subfield = {};
				subfield.subfieldTypeWraper = fl.seg_style.value;
				subfield.subfieldCount = fl.seg_columnsNumber.value;
				subfield.showSeparator = fl.seg_dividingLine.value == "N" ? false : true;
				subfield.subfieldSpace = fl.seg_columnsMargin.value;
				subfield.subfieldApplaycationWraper = fl.seg_applyTo.value;
				subfield.subCondition = fl.seg_condition.value;
				subfield.startRow = fl.flSRow.value;
				subfield.endRow = fl.flERow.value;
				subfield.startCol = fl.flSCol.value;
				subfield.endCol = fl.flECol.value;
				report.subfieldList[i] = subfield;
			}
		}
	}
	
	report.main.body.sections = [];
	if (this.fpArray && this.fpArray.length > 0) {
		if (this.fpSaveValid(report.main.body.rowNum, report.main.body.colNum)) {
			for (var i = 0; i < this.fpArray.length; i++) {
				var fp = this.fpArray[i];
				if (fp) {
					var section = {};
					section.startrow = fp.sr + 1;
					section.endrow = fp.er + 1;
					section.startcol = fp.sc + 1;
					section.endcol = fp.ec + 1;
					section.name = fp.sliceName;

					section.patchrow = fp.emptyRow;
					section.patchcol = fp.emptyCol;
					var s = this.getSectionRowInfo(fp.sr, fp.er, fp.sc, fp.ec, styleInfo, reportid);
					if (s.title) {
						section.title = s.title;
						if (s.headers) {
							section.header = s.headers;
							section.data = s.data;
							report.main.body.sections.push(section);
							report.main.style.fonts = styleInfo.fontsInfo;
							report.main.style.borders = styleInfo.bordersInfo;
							report.main.style.aligns = styleInfo.alignInfos;
							report.main.style.numbers = styleInfo.numberInfos;
							report.main.tree = styleInfo.treeFieldInfos;
							if (styleInfo.eventInfoLength > 0) {
								report.main.events = styleInfo.eventInfo
							}

							if (styleInfo.menuInfoLength > 0) {
								report.main.menus = styleInfo.menuInfo
							}
							if (styleInfo.linkInfoLength > 0) {
								report.main.links = styleInfo.linkInfo
							}
						}
					}
				}
			}
		} else {
			vmd.tip('存在不在分片区域中的有效单元格，请检查报表', 'error')
			return null;
		}
	} else {
		var section = {};
		section.startrow = "1";
		section.endrow = (parseInt(maxRow) + 1).toString();
		section.startcol = "1";
		section.endcol = maxCol + 1;

		var s = this.getSectionRowInfo(0, parseInt(maxRow), 0, parseInt(maxCol), styleInfo, reportid);
		report.main.style.fonts = styleInfo.fontsInfo;
		report.main.style.borders = styleInfo.bordersInfo;
		report.main.style.aligns = styleInfo.alignInfos;
		report.main.style.numbers = styleInfo.numberInfos;
		report.main.tree = styleInfo.treeFieldInfos;
		if (styleInfo.eventInfoLength > 0) {
			report.main.events = styleInfo.eventInfo
		}

		if (styleInfo.menuInfoLength > 0) {
			report.main.menus = styleInfo.menuInfo
		}
		if (styleInfo.linkInfoLength > 0) {
			report.main.links = styleInfo.linkInfo
		}

		if (s.title) section.title = s.title;
		if (s.headers) section.header = s.headers;
		section.data = s.data;
		report.main.body.sections.push(section);
	}
	//单元格类型属性	
	report.main.celltypes = styleInfo.cellTypeInfos;
	if (styleInfo && styleInfo.datasets && styleInfo.datasets.length > 0) {
		for (var i = 0; i < styleInfo.datasets.length; i++) {
			var ds = styleInfo.datasets[i];
			var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
			if (typeof storeRoot != 'undefined') {
				storeRoot.eachChild(function(n) {
					var dsname;
					if (n.component && n.component.getConfig()) {
						dsname = n.component.getConfig().dsName;
						if (reportid) {
							if (dsname && dsname.indexOf(reportid) > -1) {
								var indexCount = dsname.indexOf(reportid);
								if (dsname.length > indexCount) {
									dsname = dsname.substring(indexCount + reportid.length + 1);
								}
							}
						}
					}
					if (ds == n.id || dsname == ds) {
						var dsi = {};
						if (dsname)
							dsi.name = dsname;
						dsi.factname = n.id;
						if (dsInList(report.main.datasource.tables, dsi))
							report.main.datasource.tables[ds] = dsi;
					}
				}, this);
			}
		}
	}

	// if (typeof sheetHot != 'undefined') {
	// 	sheetHot.rptInfo = report;
	// }

	if (this.fixedrow >= report.main.body.sections[0].title.length + report.main.body.sections[0].header.length) {
		report.main.body.fixedrow = this.fixedrow
	} else {
		report.main.body.fixedrow = report.main.body.sections[0].title.length + report.main.body.sections[0].header.length
	}
	report.main.body.fixedcol = this.fixedcol;
	// report.main.menus = this.menus;
	return report;
}
// 判断数据集是否在数组内（保存用）
function dsInList(list, ds) {
	if (Object.keys(list).length == 0)
		return true;
	for (key in list) {
		var datas = list[key];
		if (datas.factname == ds.factname && datas.name == ds.name) {
			return false;
		} else {
			continue;
		}
	}
	return true;
}
// 根据单元格内容设置单元格数据集以及报表有效最大行列数
Handsontable.Core.prototype.setCellDataset = function(i, n, reportid, maxRow, maxCol, report, directPass) {
	var cellInfo = report.getCellMeta(i, n)
	var att = cellInfo.cellAttributeInfo;
	var rowCol = {};
	//2019.8.5 添加att判断防止没有数据自动添加行
	if (cellInfo && att && cellInfo.theCellChanged) {
		if (i > maxRow)
			maxRow = i;
		if (n > maxCol)
			maxCol = n;
		if (att) {
			var s = att.textValue.value
			if (s != null) {
				if (s.substring(0, 1) == "=") {
					var filed = s.substring(1);
					if (!report.dataFiledValid(filed, i, n, reportid, directPass)) {
						return null;
					}
					var c = filed.split('.');
					if (c && c.length > 1) {
						//获取数据集信息
						if (att && c[0] != att.dataSet) {
							att.dataSet = c[0];
						}
					}
				}
			}
		}
	}
	else if (cellInfo && att && cellInfo.mergeId=="2"){
		if (i > maxRow)
			maxRow = i;
		if (n > maxCol)
			maxCol = n;
	}
	rowCol.maxRow = maxRow;
	rowCol.maxCol = maxCol;
	return rowCol;
}
Handsontable.Core.prototype.fpSaveValid = function(rowNum, colNum) {
	var flag = false;
	var arr = this.fpArray;
	for (var i = 0; i < rowNum; i++) {
		for (var n = 0; n < colNum; n++) {
			for (var k = 0; k < this.fpArray.length; k++) {
				var arr = this.fpArray[k];
				if (arr.sc <= n && arr.ec >= n) {
					// if (arr.sr <= i && arr.sc <= n && arr.er >= i && arr.ec >= n) {
					flag = true;
					break;
				} else {
					flag = false;
				}
			}
			if (!flag) {
				return false;
			}
		}
	}
	return true;
}

Handsontable.Core.prototype.getSectionRowInfo = function(startrow, endrow, startcol, endcol, report, reportid) {
	var mArray = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
	var section = {};
	section.title = [];
	section.headers = [];
	section.data = [];
	//遍历有效行列提取属性信息
	for (var rowi = startrow; rowi <= endrow; rowi++) {
		var rowInfo = {};
		rowInfo.cells = [];

		//循环列，保存单元格详细信息
		for (var coli = startcol; coli <= endcol; coli++) {
			var cell = this.getCellMeta(rowi, coli)
			var cellInfo = {};
			var align = {};

			// 对齐信息
			if (cell.cellAttributeInfo && cell.cellAttributeInfo.alignInfo) {
				var info = cell.cellAttributeInfo.alignInfo;
				align.halign = (info.align.value.HAlign.value == 'start') ? 'left' : info.align.value.HAlign.value;
				align.valign = info.align.value.VAlign.value;
				align.textcontrol = info.textControl.value;
				if (info.escapelabel && info.escapelabel.checked == true) {
					align.escapelabel = 1;
				} else {
					align.escapelabel = 0;
				}
				align.txtdirection = info.textDirection.value;
				align.rotation = info.rotation.value;
				align.singlerotation = info.singleRotation.value;
				if (info.topPadding.value && info.rightPadding.value && info.bottomPadding.value && info.leftPadding.value) {
					align.padding = info.topPadding.value.toString() + " " + info.rightPadding.value.toString() +
						" " + info.bottomPadding.value.toString() + " " + info.leftPadding.value.toString();
				} else {
					align.padding = '0 4'
				}
				align.autoenter = cell.cellAttributeInfo.alignInfo.autoenter.value;
				align.rowspace = info.verticalSpace.value;
				cellInfo.align = report.getAlignInfoID(align).toString();
			}

			cellInfo.merged = "0";
			cellInfo.fonts = '1';
			cellInfo.borders = '1';
			cellInfo.data = "";
			cellInfo.datatype = '0';

			if (cell) {
				//获取合并单元格信息
				if (cell.mergeId == '1') {
					cellInfo.merged = '1';
					for (var i = 0; i < mArray.length; i++) {
						var mA = mArray[i];
						if (mA.row == rowi && mA.col == coli) {
							cellInfo.rowspan = mA.rowspan;
							cellInfo.colspan = mA.colspan;
						}
					}
				}
				if (cell.mergeId == '2') cellInfo.merged = '2';

				//cellAttributeInfo对象信息保存
				if (cell.cellAttributeInfo) {
					var font = {};
					font.weight = "0";
					font.italic = "0";

					if (cell) {
						// 字体信息
						var fontInfo = cell.cellAttributeInfo.fontInfos;
						if (fontInfo) {
							if (fontInfo.fontFamily.value) {
								font.name = fontInfo.fontFamily.value;
							}
							if (fontInfo.fontSize.value) {
								font.size = fontInfo.fontSize.value;
							}

							if (fontInfo.fontShape.value == "italic" && fontInfo.fontWeight.value == "bold") {
								font.italic = "1";
								font.weight = "700";
							} else if (fontInfo.fontWeight.value == "bold") {
								font.weight = "700";
								font.italic = "0";
							} else if (fontInfo.fontShape.value == "italic") {
								font.weight = "0";
								font.italic = "1";
							}
							if (fontInfo.underline.value == "underline") {
								font.unline = "1";
							} else {
								font.unline = "0";
							}
							if (fontInfo.ColorSelect.value) {
								font.color = fontInfo.ColorSelect.value.toString();
								var c = fontInfo.ColorSelect.value.toString();
								if (c != "#000" && c != "#000000") {
									cellInfo.forecolor = c;
								}
							}
						}
						cell.cellAttributeInfo.fontid = report.getFontInfoID(font).toString();

						//边框信息
						var border = {};
						var boderInfo = cell.cellAttributeInfo.borderInfo;
						if (boderInfo) {
							var colorIndexL = boderInfo.borderL.value.indexOf("#");
							var colorIndexR = boderInfo.borderR.value.indexOf("#");
							var colorIndexT = boderInfo.borderT.value.indexOf("#");
							var colorIndexB = boderInfo.borderB.value.indexOf("#");
							if (boderInfo.borderL.value == 'none') {
								border.left = "0,RGB(255,255,255),0"
							} else {
								if (colorIndexL != -1) {
									border.left = "1," + this.colorRgb(boderInfo.borderL.value.substring(colorIndexL)) + ",0";
								} else {
									border.left = "1, RGB" + boderInfo.borderL.value.toUpperCase().split('RGB')[1] + ",0";
								}
							}
							if (boderInfo.borderR.value == 'none') {
								border.right = "0,RGB(255,255,255),0"
							} else {
								if (colorIndexR != -1) {
									border.right = "1," + this.colorRgb(boderInfo.borderR.value.substring(colorIndexR)) + ",0";
								} else {
									border.right = "1,RGB" + boderInfo.borderR.value.toUpperCase().split('RGB')[1] + ",0";
								}
							}
							if (boderInfo.borderT.value == 'none') {
								border.top = "0,RGB(255,255,255),0"
							} else {
								if (colorIndexT != -1) {
									border.top = "1," + this.colorRgb(boderInfo.borderT.value.substring(colorIndexT)) + ",0";
								} else {
									border.top = "1,RGB" + boderInfo.borderT.value.toUpperCase().split('RGB')[1] + ",0";
								}
							}
							if (boderInfo.borderB.value == 'none') {
								border.bottom = "0,RGB(255,255,255),0"
							} else {
								if (colorIndexB != -1) {
									border.bottom = "1," + this.colorRgb(boderInfo.borderB.value.substring(colorIndexB)) + ",0";
								} else {
									border.bottom = "1,RGB" + boderInfo.borderB.value.toUpperCase().split('RGB')[1] + ",0";
								}
							}
						}
						cell.cellAttributeInfo.borderid = report.getBorderInfoID(border).toString();

						// 单元格类型信息（超链接、序号、GUID、文本、密码，按钮、下拉框等）
						cellTextTypeInfo(cell, cellInfo, report, rowi, coli, this);


						if (cell.cellAttributeInfo.leftLink.linkParam.value != "") {
							var links = {};
							var linkInfo = cell.cellAttributeInfo.leftLink;
							if (linkInfo) {
								links.param = linkInfo.linkParam.value;
							}
							cell.cellAttributeInfo.linkid = report.getLinksID(links).toString();
						}
						// 右键菜单

						if (this.menus && this.menus.length > 0) {
							var menus = {};
							for (var i = 0; i < this.menus.length; i++) {
								var menuitem = this.menus[i];
								if (cell.cellName == menuitem.cellName) {
									menus.id = menuitem.id;
									menus.param = menuitem.params;
									menus.source = menuitem.source;
									menus.sets = menuitem.sets;
									// menus.cmbMenuID = menuInfo.cmbMenuID.value;
									menus.pid = menuitem.pid;
									menus.text = menuitem.text;
									cell.cellAttributeInfo.menuId = report.getMenusID(menus).toString();
									break;
								}
							}
						} else {
							var menus;
							var menuInfo = cell.cellAttributeInfo.menu;
							if (menuInfo && menuInfo.menuID.value != "") {
								if (!menus) menus = {};

								menus.id = menuInfo.menuID.value;
								menus.param = menuInfo.menuParam.value;
								menus.source = menuInfo.menuSource.value;
								menus.sets = menuInfo.menuDataset.value;
								menus.cmbMenuID = menuInfo.cmbMenuID.value;
								menus.pid = menuInfo.menuPID.value;
								menus.text = menuInfo.menuText.value;

								cell.cellAttributeInfo.menuId = report.getMenusID(menus).toString();
							}
						}
						this.saveEvents(cell, report)

						// 数字信息
						var number = {};
						if (cell.cellAttributeInfo.numberInfo) {
							var info = cell.cellAttributeInfo.numberInfo;
							var nType = info.allSortCom.value;
							// 常规
							if (nType == "myConventional") {
								number.type = "0";
							}
							// 数字
							if (nType == "myNumber") {
								number.type = "1";
								// if (info.xs.value > 0) {
								number.decimal = info.xs.value.toString();
								// }
								if (info.noZeroCheckBox.checked) {
									number.zerovisible = '1';
								} else {
									number.zerovisible = '0';
								}
								if (info.useCommaCheckBox.checked) {
									number.separator = true;
								}
								if (info.numShowType.value) {
									number.numbering = info.numShowType.value;
								}
							}
							// 货币
							if (nType == "myCurrency") {
								number.type = "2";
								// if (info.xs1.value > 0) {
								number.decimal = info.xs1.value.toString();
								// }
								if (info.noZeroCheckBox1.checked) {
									number.zerovisible = '1';
								} else {
									number.zerovisible = '0';
								}
							}
							// 日期
							if (nType == "myDate") {
								number.type = "3";
								if (info.dateSortCom.value) {
									number.dateformat = info.dateSortCom.value;
								}
							}
							// 时间
							if (nType == "myTime") {
								number.type = "4";
							}
							// 百分比
							if (nType == "myPercentage") {
								number.type = "5";
								// if (info.xs3.value > 0) {
								number.decimal = info.xs3.value.toString();
								// }
								if (info.noZeroCheckBox3.checked) {
									number.zerovisible = '1';
								} else {
									number.zerovisible = '0';
								}
							}
							// 科学计数
							if (nType == "mySciCounting") {
								number.type = "6";
								// if (info.xs4.value > 0) {
								number.decimal = info.xs4.value.toString();
								// }
								if (info.noZeroCheckBox4.checked) {
									number.zerovisible = '1';
								} else {
									number.zerovisible = '0';
								}
							}
							//文本
							if (nType == "myText") {
								number.type = "7";
							}
							// 特殊
							if (nType == "mySpecial") {
								number.type = "8";
							}
							// // 自定义
							// if (numType == "myCustomize") {
							// 	number.type = "10";
							// }
							// // 会计专用
							// if (numType == "myAccounting") {
							// 	number.type = "2";
							// 	if (num.xs2.value > 0) {
							// 		number.decimal = num.xs2.value.toString();
							// 	}
							// 	if (num.noZeroCheckBox2.checked) {
							// 		number.showzero = true;
							// 	}
							// }
						}

						cell.cellAttributeInfo.numberid = report.getNumberInfoID(number).toString();
						cellInfo.fonts = cell.cellAttributeInfo.fontid;
						cellInfo.borders = cell.cellAttributeInfo.borderid;
						cellInfo.number = cell.cellAttributeInfo.numberid
						cellInfo.event = cell.cellAttributeInfo.eventid;
						cellInfo.links = cell.cellAttributeInfo.linkid;
						cellInfo.menus = cell.cellAttributeInfo.menuId;
						cellInfo.datatype = '0';
						// 扩展方向
						var e = cell.cellAttributeInfo.extraInfo.direction.value;
						if (e == "2") {
							cellInfo.expand = "2";
						} else if (e == "3") {
							cellInfo.expand = "1";
						}
						// 左父
						var lp = cell.cellAttributeInfo.extraInfo.leftParent.value;
						if (lp != "" && isNaN(lp)) {
							cellInfo.hparent = lp;
						}
						// 上父
						var rp = cell.cellAttributeInfo.extraInfo.rightParent.value;
						if (rp != "" && isNaN(rp)) {
							cellInfo.vparent = rp;
						}
						//内容表达式属性信息
						if (cell.cellAttributeInfo.contentDetailInfo) {
							var tj = cell.cellAttributeInfo.contentDetailInfo;
							if (tj.nr_bgColor.value)
								cellInfo.bgcolorexp = tj.nr_bgColor.value;
							if (tj.nr_frontColor.value)
								cellInfo.forecolorexp = tj.nr_frontColor.value;
							if (tj.nr_leftMargin.value)
								cellInfo.leftmargin = tj.nr_leftMargin.value;
							if (tj.nr_rowText.value)
								cellInfo.fontsexp = tj.nr_rowText.value;
							if (tj.nr_width.value)
								cellInfo.widthexp = tj.nr_width.value;
							if (tj.nr_available.value)
								cellInfo.enableexp = tj.nr_available.value;
							if (tj.nr_height.value)
								cellInfo.heightexp = tj.nr_height.value;
							if(tj.nr_sameValueDown.checked){
								cellInfo.bottomMerged=tj.nr_sameValueDown.checked;
								}
								if(tj.nr_downDependencies.value){
									cellInfo.btmmergeconditionexp=tj.nr_downDependencies.value;
								}
								if(tj.nr_sameValueRight.checked){
									cellInfo.rightMerged=tj.nr_sameValueRight.checked;
								}
								if(tj.nr_rightDependencies.value){
									cellInfo.rgtmergeconditionexp=tj.nr_rightDependencies.value;
								}
						}

						//背景色
						if (cell.cellAttributeInfo.bgcolorInfo) {
							var c = cell.cellAttributeInfo.bgcolorInfo.ColorSelectInner.value;
							if (c != "#fff" && c != "#FFF" && c != '#ffffff' && c != '#FFFFFF') {
								cellInfo.backgroundcolor = c;
							}
						}

						// 显示值
						if (cell.cellAttributeInfo.showValue.value) {
							cellInfo.showvalue = cell.cellAttributeInfo.showValue.value;
							var s = cellInfo.showvalue;
							if (s != null) {
								if (s.substring(0, 1) == "=") {
									var filed = s.substring(1);
									//if (!this.dataFiledValid(filed, rowi, coli, reportid)) {
									//	return null;
									//}
									var c = filed.split('.');
									if (c && c.length > 1) {
										//获取数据集信息
										var index = report.inDsArray(c[0]);
										if (index == -1) {
											report.datasets.push(c[0]);
										}
									}
								}
							}
						}
						// 表达式校验 2018.9.13
						if (cell.cellAttributeInfo.textValue.value && cell.cellAttributeInfo.textValue.value.trim().replace(/(^s*)|(s*$)/g, "").length != 0) {}
						if (cell.cellAttributeInfo.dataSet) {
							var index = report.inDsArray(cell.cellAttributeInfo.dataSet);
							if (index == -1) {
								report.datasets.push(cell.cellAttributeInfo.dataSet);
							}
							// 保存为xml需要将数据集名称保存为ds的格式
							if (cell.cellAttributeInfo.textValue.value && cell.cellAttributeInfo.textValue.value.substring(0, 1) == "=") {
								cellInfo.datavalue = cell.cellAttributeInfo.textValue.value.trim();
								var s = cell.cellAttributeInfo.textValue.value.trim().substring(1);
								if (s.indexOf("TreeBranch") > -1 || s.indexOf("TreeLeaf") > -1) {
									var tree = {};
									var t = s.split('(');
									if (t.length > 1) {
										var t2 = t[1].indexOf(")");
										var t1 = t[1].substring(0, t2);
										var t3 = t1.split(',');
										if (t3.length == 3) {
											tree.dsname = dsdata;
											tree.id = t3[0];
											tree.parentid = t3[1];
											tree.showfield = t3[2];
											tree.cell = this.convert(cell.cellIndex) + "" + cell.parentNode.rowIndex;
											if (s.indexOf("TreeBranch") > -1) {
												tree.treetype = "branch";
											} else {
												tree.treetype = "leaf";
											}
										}
									}
									report.getTreeInfoID(tree).toString();
								}
							} else {
								cellInfo.data = cell.cellAttributeInfo.textValue.value;
							}
						} else {
							if (cell.cellAttributeInfo.textValue.value && cell.cellAttributeInfo.textValue.value.substring(0, 1) == "=") {
								cellInfo.datavalue = cell.cellAttributeInfo.textValue.value.trim();
							} else {
								cellInfo.data = cell.cellAttributeInfo.textValue.value;
							}
						}
					} else {
						var align = {};
						align.halign = "left";
						align.valign = "middle";
						// cellInfo.width = this.getColWidth(coli);
						cellInfo.align = report.getAlignInfoID(align).toString();
						cellInfo.fonts = '1';
						cellInfo.borders = '1';
						cellInfo.data = "";
						cellInfo.datatype = '0';
					}
				} else {
					var align = {};
					align.halign = "left";
					align.valign = "middle";
					// cellInfo.width = this.getColWidth(coli)
					cellInfo.align = report.getAlignInfoID(align).toString();
					cellInfo.merged = "2";
					cellInfo.fonts = '1';
					cellInfo.borders = '1';
					cellInfo.data = "";
					cellInfo.datatype = '0';
				}
			}
			// 嵌套表id
			if (cell.subIndex > -1) {
				cellInfo.subrptindex = cell.subIndex;
			}
			rowInfo.cells.push(cellInfo);
		}

		// 行类型设置
		if (this.getCellMeta(rowi, 0).cellAttributeInfo) {
			// 行高设置和行隐藏
			// rowInfo.height = hh.toString();？？？？
			this.fullRowHeightArray()
			if (this.getCellMeta(rowi, 0).row_hide) {
				rowInfo.height = 0;
			} else {
				rowInfo.height = isNaN(parseInt(this.rowHeadHeightArray[rowi])) ? 26 : (parseInt(this.rowHeadHeightArray[rowi]) == 0 ? 26 : parseInt(this.rowHeadHeightArray[rowi]));
			}
			var type = this.getCellMeta(rowi, 0).rowtype;
			if (typeof type != 'undefined') {
				// 标题
				if (type.indexOf("title") > -1) {
					section.title.push(rowInfo);
				}
				// 表头
				else if (type.indexOf("header") > -1) {
					section.headers.push(rowInfo);
				}
				// 数据
				else if (type.indexOf('data') > -1) {
					section.data.push(rowInfo);
				} else {
					section.data.push(rowInfo);
				}
			} else {
				section.data.push(rowInfo);
			}
		}
	}
	return section;
}

Handsontable.Core.prototype.getDatasets = function(report) {
	var names = [];
	var i = 0;
	var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
	if (typeof storeRoot != 'undefined') {
			var setstore = function(n) {
			var name = {};
			name.name = n.component.config.id;
			if (n.component.config.dsName) {
				name.dsname = n.component.config.dsName;
			}
			name.fields = [];
			for (var key in n.childNodes) {
				var field = n.childNodes[key];
				if (field && field.attributes) {
					name.fields.push(field.attributes.text);
				}
			}
			if (name) {
				names.push(name);
			}
		}
	storeRoot.eachChild(function(n) {
			if (n.component.cid == 'vmdDataSet') {
				n.eachChild(function(m) {
					if (m.component.config.storeConfig) {
						setstore(m)
					}
				})
			} else if (n.component.config.storeConfig) {
				setstore(n)
			}
		}, report);
	}
	return names;
}
//获取嵌套表信息
function getSubRptInfo(grid, report) {
	var arrList = grid.nestedTableArray;
	if (arrList.length > 0) {
		for (var i = 0; i < arrList.length; i++) {
			var subRpt = arrList[i];
			//var cell =grid.getCellMeta(subRpt.sr,subRpt.sc);
			// 设置单元格与子报表关联的id
			grid.setCellMeta(subRpt.sr, subRpt.sc, 'subIndex', i)
			if (subRpt.info != null) {
				if (subRpt.info && subRpt.info.style) {
					report.subs[i] = subRpt.info;
				} else if (subRpt.info && subRpt.info.main && subRpt.info.main.style) {
					report.subs[i] = subRpt.info.main;
				}
				report.subs[i].name = subRpt.qtb_tableName;
			}
		}
	}
}

//文本信息
function cellTextTypeInfo(cell, cellInfo, report, row, col, hot) {
	var cabInfo = cell.cellAttributeInfo;
	if (cabInfo) {
		var temp = cabInfo.contentInfo.cmbType.value;
		switch (temp) {
			// case "cg":
			// 	defaultType(txt, cellInfo, report);
			// 	break;
			//文本类型
			case "wb":
				var txt = cabInfo.cell_TextInfo;
				if (txt) {
					switch (txt.wb_allType.value) {
						case "wb":
							textType(txt, cellInfo, report);
							break;
						case "xh": //序号
							orderType(txt, cellInfo, report)
							break;
						case "id":
							textIDType(txt, cellInfo, report);
							break;
						case "guid": //guid
							guidType(txt, cellInfo, report)
							break;
						case "mm": //密码
							passWordType(txt, cellInfo, report)
							break;
					}
				}
				break;
			case "sz": //数字
				numberType(cabInfo.cell_NumberInfo, cellInfo, report)
				break;
			case "xlk": //下拉框
				comboBoxType(cabInfo.cell_ComboInfo, cellInfo, report, row, col, hot);
				break;
			case "xls": //下拉树
				dropDownTreeType(cabInfo.cell_DropDownTreeInfo, cellInfo, report, row, col, hot)
				break;
			case "xlwg": //下拉网格
				dropDownGridType(cabInfo.cell_ddg, cellInfo, report, row, col, hot)
				break;
			case "dxan": //单选按钮
				radioGroupType(cabInfo.cell_RadioButtonInfo, cellInfo, report, row, col, hot);
				break;
			case "fxk": //复选框
				checkBoxType(cabInfo.cell_CheckBoxInfo, cellInfo, report)
				break;
			case "sczj": //上传组件
				upLoadType(cabInfo.cell_UploadInfo, cellInfo, report)
				break;
			case "qtb": //嵌套表
				nestedType(cabInfo.cell_NestedTableInfo, cellInfo, report, cell.subIndex)
				break;
			case "fwb": //富文本
				richEditType(cabInfo.cell_RichTextInfo, cellInfo, report)
				break;
			case "tx": //图形
				graphicType(cabInfo.cell_GraphicInfo, cellInfo, report)
				break;
			case "jdt": //进度条
				progressBarType(cabInfo.cell_ProgressBarInfo, cellInfo, report)
				break;
			case "spzj": //审批组件
				approvalType(cabInfo.cell_ApprovlInfo, cellInfo, report)
				break;
			case "rq": //日期
				dateType(cabInfo.cell_DateInfo, cellInfo, report)
				break;
			case "an": //按钮
				buttonType(cabInfo.cell_ButtonInfo, cellInfo, report)
				break;
		}

		if (cabInfo.leftLink.linkParam.value != "") {
			hyperLink(cell, cellInfo, report)
		}
	}
}

function progressBarType(cell, cellInfo, report) {
	var progressbar = {}
	progressbar.type = "jdt"
	// progressbar

}

function nestedType(cell, cellInfo, report, subIndex) {
	var nested = {}
	nested.type = "SubRpt"
	nested.subrptindex = subIndex
	nested.subrptpath = cell.qtb_template.value;
	// nested.spread = cell.qtb_style.value
	nested.subrptname = cell.qtb_tableName.value
	if (cell.qtb_unfold.checked) {
		nested.spread = '1'
	} else {
		nested.spread = '0'
	}
	if (cell.qtb_style.value == '0') {
		nested.subrptshowmode = 'embed'
	} else {
		nested.subrptshowmode = 'expand'
	}
	cellInfo.fillcelltype = report.getCellTypeID(nested).toString();
}



//文本ID
function textIDType(cell, cellInfo, report) {
	var id = {};
	id.type = "id";
	id.length = cell.wb_id_length.value;
	id.isallownull = cell.wb_id_allowEmpty.checked;
	id.emptydisplay = cell.wb_id_emptyAlert.value;
	cellInfo.fillcelltype = report.getCellTypeID(id).toString();
}

//图形
function graphicType(cell, cellInfo, report) {
	//
}
//下拉树
function dropDownTreeType(cell, cellInfo, report, row, col, hot) {
	var ddt = {};
	ddt.type = "dropdowntree";
	ddt.width = cell.myWidth.value;
	ddt.selectableType = cell.selectableType.value
	ddt.height = cell.ddt_height.value;
	ddt.isallownull = cell.ddt_allowEmpty.checked;
	ddt.emptydisplay = cell.ddt_emptyAlert.value;

	ddt.bindsource = {};
	ddt.bindsource.tablename = cell.xls_dataSet.value;
	ddt.bindsource.valuecolumn = cell.xls_myValueFiled.value;
	ddt.bindsource.showcolumn = cell.xls_myDisplayFiled.value;
	ddt.bindsource.parentcolumn = cell.xls_myFatherFiled.value;
	ddt.bindsource.nodecolumn = cell.xls_myNodeFiled.value;
	ddt.bindsource.rootvalue = cell.xls_rootValue.value;
	ddt.bindsource.roottext = cell.xls_rootNodeText.value;

	if (cell.xls_dataSet.value) {
		var index = report.inDsArray(cell.xls_dataSet.value);
		if (index == -1) {
			report.datasets.push(cell.xls_dataSet.value);
		}
	}

	if (hot.getCellMeta(row, col).filterInfo_xls) {
		var arr = hot.getCellMeta(row, col).filterInfo_xls;
		ddt.bindsource.conditions = [];
		for (var i = 0; i < arr.length; i++) {
			ddt.bindsource.conditions.push({
				field: arr[i].name,
				value: arr[i].value
			})
		}
	}


	cellInfo.fillcelltype = report.getCellTypeID(ddt).toString();
}

function setDropDownTreeType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = 'xls'
	attribute.cell_DropDownTreeInfo.myWidth.value = ctype.width;
	attribute.cell_DropDownTreeInfo.selectableType.value = ctype.selectableType;
	attribute.cell_DropDownTreeInfo.ddt_height.value = ctype.height;
	attribute.cell_DropDownTreeInfo.ddt_allowEmpty.checked = ctype.isallownull;
	attribute.cell_DropDownTreeInfo.ddt_emptyAlert.value = ctype.emptydisplay;
	attribute.cell_DropDownTreeInfo.xls_myValueFiled.value = ctype.bindsource.valuecolumn
	attribute.cell_DropDownTreeInfo.xls_myDisplayFiled.value = ctype.bindsource.showcolumn
	attribute.cell_DropDownTreeInfo.xls_myFatherFiled.value = ctype.bindsource.parentcolumn
	attribute.cell_DropDownTreeInfo.xls_myNodeFiled.value = ctype.bindsource.nodecolumn
	attribute.cell_DropDownTreeInfo.xls_rootValue.value = ctype.bindsource.rootvalue
	attribute.cell_DropDownTreeInfo.xls_rootNodeText.value = ctype.bindsource.roottext

	if (grid) {
		var transed = grid.transformDsName(ctype.bindsource.tablename)
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_DropDownTreeInfo.xls_dataSet.value = transed.dataname.factname;
		} else {
			attribute.cell_DropDownTreeInfo.xls_dataSet.value = ctype.bindsource.tablename
		}

		if (ctype.bindsource.conditions) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
				obj.push({
					name: ctype.bindsource.conditions[i].field,
					value: ctype.bindsource.conditions[i].value
				})
				if (i == 0) {
					temp += ctype.bindsource.conditions[i].field
				} else {
					temp += "," + ctype.bindsource.conditions[i].field
				}
			}
			grid.setCellMeta(row, col, 'filterInfo_xls', obj)
			attribute.cell_DropDownTreeInfo.filter_xls.value = temp
		}
	} else {
		var transed = design.transformDsName(ctype.bindsource.tablename)
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_DropDownTreeInfo.xls_dataSet.value = transed.dataname.factname;
		} else {
			attribute.cell_DropDownTreeInfo.xls_dataSet.value = ctype.bindsource.tablename
		}

		if (ctype.bindsource.conditions) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
				obj.push({
					name: ctype.bindsource.conditions[i].field,
					value: ctype.bindsource.conditions[i].value
				})
				if (i == 0) {
					temp += ctype.bindsource.conditions[i].field
				} else {
					temp += "," + ctype.bindsource.conditions[i].field
				}
			}
			initInfo.filter.push({
				row: row,
				col: col,
				// grid.setCellMeta(row, col, 'filterInfo_xls', obj)
				name: 'filterInfo_xls',
				value: obj

			})
			attribute.cell_DropDownTreeInfo.filter_xls.value = temp
		}
	}
}

// 下拉网格
function dropDownGridType(cell, cellInfo, report, row, col, hot) {
	var ddg = {};
	ddg.type = "vmdgrid"
	ddg.isenableedit = cell.ddg_allowEdit.checked;
	ddg.isprint = cell.ddg_allowPrint.checked;
	ddg.width = cell.ddg_myWidth.value;
	ddg.isallownull = cell.ddg_allowEmpty.checked;
	ddg.emptydisplay = cell.ddg_emptyAlert.value;
	ddg.ismulti = cell.ddg_multi.checked;
	ddg.separator = cell.ddg_separator.value;
	ddg.height = cell.ddg_height.value;

	ddg.bindsource = {};
	ddg.bindsource.tablename = cell.ddg_dataSet.value;
	ddg.bindsource.valuecolumn = cell.ddg_saveFiled.value;
	ddg.bindsource.showcolumn = cell.ddg_myDisplayFiled.value;
	if (hot.getCellMeta(row, col).dataInfo_xlwg) {
		var arr = hot.getCellMeta(row, col).dataInfo_xlwg;
		ddg.bindsource.multicolumns = [];
		for (var i = 0; i < arr.length; i++) {
			ddg.bindsource.multicolumns.push({
				id: i,
				colname: arr[i].name,
				showtext: arr[i].cnname,
				cellid: arr[i].search,
				width: arr[i].width
			})
		}
	}
	if (hot.getCellMeta(row, col).filterInfo_xlwg) {
		var arr = hot.getCellMeta(row, col).filterInfo_xlwg;
		ddg.bindsource.conditions = [];
		for (var i = 0; i < arr.length; i++) {
			ddg.bindsource.conditions.push({
				field: arr[i].name,
				value: arr[i].value
			})
		}
	}

	if (cell.ddg_dataSet.value) {
		var index = report.inDsArray(cell.ddg_dataSet.value);
		if (index == -1) {
			report.datasets.push(cell.ddg_dataSet.value);
		}
	}

	cellInfo.fillcelltype = report.getCellTypeID(ddg).toString();
}

function setDropDownGridType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = 'xlwg'
	attribute.cell_ddg.ddg_allowEdit.checked = ctype.isenableedit
	attribute.cell_ddg.ddg_allowPrint.checked = ctype.isprint
	attribute.cell_ddg.ddg_myWidth.value = ctype.width
	attribute.cell_ddg.ddg_allowEmpty.checked = ctype.isallownull
	attribute.cell_ddg.ddg_emptyAlert.value = ctype.emptydisplay
	attribute.cell_ddg.ddg_multi.checked = ctype.ismulti;
	attribute.cell_ddg.ddg_height.value = ctype.height;
	attribute.cell_ddg.ddg_separator.value = ctype.separator;
	attribute.cell_ddg.ddg_saveFiled.value = ctype.bindsource.valuecolumn
	attribute.cell_ddg.ddg_myDisplayFiled.value = ctype.bindsource.showcolumn

	if (grid) {
		var transed = grid.transformDsName(ctype.bindsource.tablename)
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_ddg.ddg_dataSet.value = transed.dataname.factname
		} else {
			attribute.cell_ddg.ddg_dataSet.value = ctype.bindsource.tablename
		}
		if (ctype.bindsource.multicolumns) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.multicolumns.length; i++) {
				obj.push({
					name: ctype.bindsource.multicolumns[i].colname,
					cnname: ctype.bindsource.multicolumns[i].showtext,
					search: ctype.bindsource.multicolumns[i].cellid,
					width: ctype.bindsource.multicolumns[i].width
				})
				if (i == 0) {
					temp += ctype.bindsource.multicolumns[i].colname
				} else {
					temp += "," + ctype.bindsource.multicolumns[i].colname
				}
			}
			grid.setCellMeta(row, col, 'dataInfo_xlwg', obj)
			attribute.cell_ddg.ddg_dropDownDisplayColumn.value = temp
		}

		if (ctype.bindsource.conditions) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
				obj.push({
					name: ctype.bindsource.conditions[i].field,
					value: ctype.bindsource.conditions[i].value
				})
				if (i == 0) {
					temp += ctype.bindsource.conditions[i].field
				} else {
					temp += "," + ctype.bindsource.conditions[i].field
				}
			}
			hot.setCellMeta(row, col, 'filterInfo_xlwg', obj)
			attribute.cell_ddg.ddg_filterCondition.value = temp
		}
	} else {
		var transed = design.transformDsName(ctype.bindsource.tablename)
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_ddg.ddg_dataSet.value = transed.dataname.factname
		} else {
			attribute.cell_ddg.ddg_dataSet.value = ctype.bindsource.tablename
		}
		if (ctype.bindsource.multicolumns) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.multicolumns.length; i++) {
				obj.push({
					name: ctype.bindsource.multicolumns[i].colname,
					cnname: ctype.bindsource.multicolumns[i].showtext,
					search: ctype.bindsource.multicolumns[i].cellid,
					width: ctype.bindsource.multicolumns[i].width
				})
				if (i == 0) {
					temp += ctype.bindsource.multicolumns[i].colname
				} else {
					temp += "," + ctype.bindsource.multicolumns[i].colname
				}
			}
			// hot.setCellMeta(row, col, 'dataInfo_xlwg', obj)
			initInfo.dataInfo.push({
				row: row,
				col: col,
				name: 'dataInfo_xlwg',
				value: obj
			})
			attribute.cell_ddg.ddg_dropDownDisplayColumn.value = temp
		}

		if (ctype.bindsource.conditions) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
				obj.push({
					name: ctype.bindsource.conditions[i].field,
					value: ctype.bindsource.conditions[i].value
				})
				if (i == 0) {
					temp += ctype.bindsource.conditions[i].field
				} else {
					temp += "," + ctype.bindsource.conditions[i].field
				}
			}
			// hot.setCellMeta(row, col, 'filterInfo_xlwg', obj)
			initInfo.filter.push({
				row: row,
				col: col,
				name: 'filterInfo_xlwg',
				value: obj
			})
			attribute.cell_ddg.ddg_filterCondition.value = temp
		}
	}
}

// 文本类型
function textType(cell, cellInfo, report) {

	var text = {};
	text.type = "Text";
	text.regexptip = '';
	text.charexp = cell.wb_rule_charExp.value;
	text.fillrule = cell.wb_text_fillRules.value;
	text.ismultiline = cell.wb_text_allowRows.checked;
	text.ischar = cell.wb_text_symbol.checked;
	text.isenableedit = cell.wb_text_allowEdit.checked;
	text.isallownull = cell.wb_text_allowEmpty.checked;
	text.isprint = cell.wb_text_allowPrint.checked;
	text.emptydisplay = cell.wb_text_emptyAlert.value;
	// text.regexp = cell.wb_rule_regexp.value;
	text.minlen = cell.wb_rule_min.value;
	text.maxlen = cell.wb_rule_max.value;
	text.tellformart = cell.wb_rule_phoneType.value;
	cellInfo.fillcelltype = report.getCellTypeID(text).toString();
}

// //嵌套表 
// function nested(cell, cellInfo, report) {
// 	var nested = {};
// 	nested.type = "vmdsubreport";
// 	nested.subrptshowmode = '';
// 	nested.subrptindex = cell.subIndex;
// 	nested.subrptname = '';
// 	nested.subrpttype = '';
// 	nested.subrptpath = '';
// 	cellInfo.fillcelltype = report.getCellTypeID(nested).toString();
// }

// 超链接信息
function hyperLink(cell, cellInfo, report) {
	var hlink = {};
	hlink.type = "HyperLink";
	hlink.url = cell.cellAttributeInfo.leftLink.linkParam.value;
	cellInfo.fillcelltype = report.getCellTypeID(hlink).toString();
}

// 数字类型
function numberType(cell, cellInfo, report) {
	var numberInfo = {};
	numberInfo.type = "Number";
	numberInfo.isenableedit = cell.sz_allowEdit.checked;
	numberInfo.isallownull = cell.sz_allowEmpty.checked;
	numberInfo.isdecimal = cell.sz_allowFloat.checked;
	numberInfo.isnegative = cell.sz_allowNegative.checked;
	numberInfo.isprint = cell.sz_allowPrint.checked;
	numberInfo.decimalnumbers = cell.sz_decimalPoints.value;
	numberInfo.emptydisplay = cell.sz_emptyAlert.value;
	numberInfo.islimit = cell.sz_limit.checked;
	numberInfo.maxvalue = cell.sz_max.checked;
	numberInfo.minvalue = cell.sz_min.checked;
	if (numberInfo.maxvalue) {
		numberInfo.max = cell.sz_maxValue.value
	}
	if (numberInfo.minvalue) {
		numberInfo.min = cell.sz_minValue.value
	}
	cellInfo.fillcelltype = report.getCellTypeID(numberInfo).toString();
}
// 下拉框类型
function comboBoxType(cell, cellInfo, report, row, col, hot) {
	var comboBox = {};
	comboBox.type = "Combox";
	comboBox.isenableedit = cell.xlk_allowEdit.checked;
	comboBox.isprint = cell.xlk_allowPrint.checked;
	// comboBox.clicktrigger = cell.xlk_oneClick.checked;
	comboBox.separator = cell.xlk_separator.value;
	comboBox.ismulti = cell.xlk_ismulti.checked;
	comboBox.width = cell.xlk_myWidth.value;
	comboBox.height = cell.xlk_height.value;
	comboBox.isallownull = cell.xlk_allowEmpty.checked;
	comboBox.emptydisplay = cell.xlk_emptyAlert.value;
	comboBox.noValueClear = cell.noValueClear.checked;

	comboBox.bindsource = {};
	comboBox.bindsource.tablename = cell.xlk_dataSet.value;
	comboBox.bindsource.valuecolumn = cell.xlk_saveFiled.value;
	comboBox.bindsource.showcolumn = cell.xlk_myDisplayFiled.value;
	comboBox.bindsource.condition = cell.xlk_filterCondition.value;

	if (cell.xlk_dataSet.value) {
		var index = report.inDsArray(cell.xlk_dataSet.value);
		if (index == -1) {
			report.datasets.push(cell.xlk_dataSet.value);
		}
	}

	if (hot.getCellMeta(row, col).filterInfo_xlk) {
		var arr = hot.getCellMeta(row, col).filterInfo_xlk;
		comboBox.bindsource.conditions = [];
		for (var i = 0; i < arr.length; i++) {
			comboBox.bindsource.conditions.push({
				field: arr[i].name,
				value: arr[i].value
			})
		}
	}

	cellInfo.fillcelltype = report.getCellTypeID(comboBox).toString();
}
// 单选按钮
function radioGroupType(cell, cellInfo, report, row, col, hot) {
	var radioGroup = {};
	radioGroup.type = "RadioGroup";
	radioGroup.isenableedit = cell.dxan_allowEdit.checked;
	radioGroup.isprint = cell.dxan_allowPrint.checked;
	radioGroup.autolayout = cell.dxan_auto.checked;
	radioGroup.colcount = cell.dxan_displayRows.value;
	radioGroup.linespace = cell.dxan_rowMargin.value;
	radioGroup.displaystyle = cell.dxan_displayType.checked;

	radioGroup.bindsource = {};
	radioGroup.bindsource.tablename = cell.dxan_dataSet.value;
	radioGroup.bindsource.valuecolumn = cell.dxan_saveFiled.value;
	radioGroup.bindsource.showcolumn = cell.dxan_myDisplayFiled.value;
	radioGroup.bindsource.condition = cell.dxan_filterCondition.value;

	if (cell.dxan_dataSet.value) {
		var index = report.inDsArray(cell.dxan_dataSet.value);
		if (index == -1) {
			report.datasets.push(cell.dxan_dataSet.value);
		}
	}

	if (hot.getCellMeta(row, col).filterInfo_dxan) {
		var arr = hot.getCellMeta(row, col).filterInfo_dxan;
		radioGroup.bindsource.conditions = [];
		for (var i = 0; i < arr.length; i++) {
			radioGroup.bindsource.conditions.push({
				field: arr[i].name,
				value: arr[i].value
			})
		}
	}


	cellInfo.fillcelltype = report.getCellTypeID(radioGroup).toString();
}
// 上传组件
function upLoadType(cell, cellInfo, report) {
	var upLoad = {};
	upLoad.type = "UpLoad";
	if (cell.sczj_Type.value == "0") {
		upLoad.filetype = "word";
	} else {
		upLoad.filetype = "image";
	}

	upLoad.uploadnumer = cell.sczj_max.value;
	upLoad.colexp = cell.sczj_everyRow.value;
	upLoad.pageexp = cell.sczj_everyPage.value;
	upLoad.add = cell.sczj_add.checked;
	upLoad.delete = cell.sczj_delete.checked;
	upLoad.enableadd = cell.sczj_addText.value;
	upLoad.enabledelete = cell.sczj_deleteText.value;
	upLoad.wordMode = cell.sczj_wdk.checked

	upLoad.bindsource = {}

	upLoad.bindsource.docid = cell.sczj_dataId.value
	upLoad.bindsource.filename = cell.sczj_dataName.value
	upLoad.bindsource.filepath = cell.sczj_dataPath.value
	upLoad.bindsource.tablename = cell.sczj_dataSet.value
	upLoad.bindsource.filesize = cell.sczj_dataSize.value
	upLoad.bindsource.fileext = cell.sczj_dataType.value

	if (cell.sczj_dataSet.value) {
		var index = report.inDsArray(cell.sczj_dataSet.value);
		if (index == -1) {
			report.datasets.push(cell.sczj_dataSet.value);
		}
	}

	upLoad.addeventid = "";
	upLoad.deleteeventid = "";
	upLoad.showmode = cell.sczj_display.value;
	cellInfo.fillcelltype = report.getCellTypeID(upLoad).toString();
}
// 日期
function dateType(cell, cellInfo, report) {
	var date = {};
	date.type = "Date";
	if (cell.rq_customize.checked) {
		date.allowuserdefine = 1
		date.format = cell.rq_customFormat.value.toString().replace(/yyyy/g, "%Y").replace(/MM/g, "%m").replace(/dd/g, "%d").replace(/hh/g, "%H").replace(/mm/g, "i%")
	} else {
		date.allowuserdefine = 0
		date.format = cell.rq_dateStyle.value;
	}
	if (cell.rq_allowEmpty.checked) {
		date.isallownull = 1
		date.emptydisplay = '';
	} else {
		date.isallownull = 0
		date.emptydisplay = cell.rq_emptyAlert.value
	}
	if (cell.rq_allowEdit.checked) {
		date.isenableedit = 1
	} else {
		date.isenableedit = 0
	}
	if (cell.rq_defaultToday.checked) {
		date.isdefultdate = 1
	} else {
		date.isdefultdate = 0
	}
	if (cell.rq_allowPrint.checked) {
		date.isprint = 1
	} else {
		date.isprint = 0
	}
	cellInfo.fillcelltype = report.getCellTypeID(date).toString();
}
// 按钮
function buttonType(cell, cellInfo, report) {
	var button = {};
	button.type = "Button";
	button.bottontype = cell.button_styleType.value;
	button.rowselect = cell.button_rowSelect.value
	button.delstore = cell.button_delStore.value;
	button.allowalert = cell.button_alert.value;
	button.lastdeleteonlydata = cell.lastDeleteOnlyData.value;
	button.carrycol = cell.button_carry.value;
	button.text = cell.button_text.value;
	button.allowprint = cell.button_allowPrint.value;
	button.labelposition = cell.button_wbStyle.value;
	button.click = cell.buttoneve_click.value;
	button.dblclick = cell.buttoneve_dbClick.value;
	cellInfo.fillcelltype = report.getCellTypeID(button).toString();
}

function setButtonType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = "an";
	attribute.cell_ButtonInfo.button_styleType.value = ctype.bottontype;
	attribute.cell_ButtonInfo.button_rowSelect.value = ctype.rowselect;
	attribute.cell_ButtonInfo.button_delStore.value = ctype.delstore;
	attribute.cell_ButtonInfo.button_alert.value = ctype.allowalert;
	attribute.cell_ButtonInfo.lastDeleteOnlyData.value = ctype.lastdeleteonlydata;
	attribute.cell_ButtonInfo.button_carry.value = ctype.carrycol;
	attribute.cell_ButtonInfo.button_text.value = ctype.text;
	attribute.cell_ButtonInfo.button_allowPrint.value = ctype.allowprint;
	attribute.cell_ButtonInfo.button_wbStyle.value = ctype.labelposition;
	attribute.cell_ButtonInfo.buttoneve_click.value = ctype.click;
	attribute.cell_ButtonInfo.buttoneve_dbClick.value = ctype.dblclick;
}
// 复选框
function checkBoxType(cell, cellInfo, report) {
	var checkBox = {};
	checkBox.type = "CheckBoxGroup";
	checkBox.displayLabel = cell.fxk_displayLabel.value;
	checkBox.separator = cell.fxk_separator.value;
	checkBox.startchar = cell.fxk_starter.value;
	checkBox.endchar = cell.fxk_ender.value;
	checkBox.isenableedit = cell.fxk_allowEdit.checked;
	checkBox.isprint = cell.fxk_allowPrint.checked;
	checkBox.isallselect = cell.fxk_proveAll.checked;
	checkBox.isother = cell.fxk_proveOther.checked;
	checkBox.multigroup = cell.fxk_mutilGroup.checked;
	checkBox.autolayout = cell.fxk_auto.checked;
	checkBox.colcount = "";
	checkBox.linespace = cell.fxk_rowMargin.value;
	checkBox.displaystyle = cell.fxk_displayCol.value;
	checkBox.isallownull = cell.fxk_allowEmpty.checked;
	checkBox.emptydisplay = cell.fxk_emptyAlert.value;

	checkBox.bindsource = {};
	checkBox.bindsource.tablename = cell.fxk_dataSet.value;
	checkBox.bindsource.valuecolumn = cell.fxk_saveFiled.value;
	checkBox.bindsource.showcolumn = cell.fxk_myDisplayFiled.value;
	checkBox.bindsource.condition = cell.fxk_filterCondition.value;

	if (cell.fxk_dataSet.value) {
		var index = report.inDsArray(cell.fxk_dataSet.value);
		if (index == -1) {
			report.datasets.push(cell.fxk_dataSet.value);
		}
	}

	cellInfo.fillcelltype = report.getCellTypeID(checkBox).toString();
}
// 多列信息绑定
function multiColumnsBind(info) {
	var multicolumns = [];
	if (info.multicolumns.length > 0) {
		for (var i = 0; i < info.multicolumns.length; i++) {
			var cols = {};
			var oldCol = info.multicolumns[i];
			cols.colname = "";
			cols.showtext = "";
			cols.width = "";
			cols.isfilter = "";
			multicolumns.push(cols);
		}
	}
	return multicolumns;
}

// 序号组件
function orderType(cell, cellInfo, report) {
	var order = {};
	order.type = "order";
	order.isprint = cell.wb_no_allowPrint.checked;
	order.isallownull = cell.wb_no_allowEmpty.checked;
	order.emptydisplay = cell.wb_no_emptyAlert.value;
	cellInfo.fillcelltype = report.getCellTypeID(order).toString();
}
// guid
function guidType(cell, cellInfo, report) {
	var guid = {};
	guid.type = "guid";
	guid.isallownull = cell.wb_guid_allowEmpty.checked;
	guid.emptydisplay = cell.wb_guid_emptyAlert.value;
	guid.length = cell.wb_guid_length.value;
	cellInfo.fillcelltype = report.getCellTypeID(guid).toString();
}
// 密码
function passWordType(cell, cellInfo, report) {
	var passWord = {};
	passWord.type = "PassWord";
	passWord.isenableedit = cell.wb_password_allowEdit.checked;
	passWord.isprint = cell.wb_password_allowPrint.checked;
	passWord.isallownull = cell.wb_password_allowEmpty.checked;
	passWord.emptydisplay = cell.wb_password_emptyAlert.checked;
	cellInfo.fillcelltype = report.getCellTypeID(passWord).toString();
}
//审批组件
function approvalType(cell, cellInfo, report) {
	var approval = {};
	approval.type = "Approval";
	approval.isenableedit = cell.spzj_allowEdit.checked;
	approval.isprint = cell.spzj_allowPrint.checked;
	approval.Items = [];
	var spbm = {};
	spbm = approvalItems(cell, "ApprovalDepartment", report);
	approval.Items.push(spbm);
	var spyj = {};
	spyj = approvalItems(cell, "ApprovalComment", report);
	approval.Items.push(spyj);
	var spz = {};
	spz = approvalItems(cell, "ApprovalSeal", report);
	approval.Items.push(spz);
	var spr = {};
	spr = approvalItems(cell, "ApprovalPerson", report);
	approval.Items.push(spr);
	var sprq = {};
	sprq = approvalItems(cell, "ApprovalDate", report);
	approval.Items.push(sprq);
	var spa = {};
	spa = approvalItems(cell, "Agree", report);
	approval.Items.push(spa);
	var spdisa = {};
	spdisa = approvalItems(cell, "DisAgree", report);
	approval.Items.push(spdisa);
	var spsb = {};
	spsb = approvalItems(cell, "SenBack", report);
	approval.Items.push(spsb);
	cellInfo.fillcelltype = report.getCellTypeID(approval).toString();
}
// 审批项
function approvalItems(cell, type, report) {
	var spItem = {};
	spItem.type = type;
	switch (type) {
		case "ApprovalDepartment":
			spItem.isshow = cell.spzj_spbm_display.checked;
			spItem.value = cell.spzj_spbm_bmmc.value;
			spItem.labelvalue = cell.spzj_spbm_bqmc.value;
			spItem.x = cell.spzj_spbm_x.value;
			spItem.y = cell.spzj_spbm_y.value;
			spItem.width = cell.spzj_spbm_width.value;
			spItem.height = cell.spzj_spbm_height.value;
			spItem.fontname = cell.spzj_spbm_fontFamily.value;
			spItem.fontsize = cell.spzj_spbm_fontSize.value;
			spItem.italic = cell.spzj_spbm_fontStyle.value;
			spItem.underline = cell.spzj_spbm_underLine.value;
			spItem.fontcolor = cell.spzj_spbm_color.value;
			spItem.fontweight = cell.spzj_spbm_fontWeight.value
			spItem.font = cell.spzj_spbm_font.value
			// spItem.mark = cell.spzj_spbm_mark.value;
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)

			break;
		case "ApprovalComment":
			spItem.isshow = cell.spzj_spyj_display.checked;
			spItem.value = cell.spzj_spyj_yjnr.value;
			spItem.labelvalue = cell.spzj_spyj_bqmc.value;
			spItem.x = cell.spzj_spyj_x.value;
			spItem.y = cell.spzj_spyj_y.value;
			spItem.width = cell.spzj_spyj_width.value;
			spItem.height = cell.spzj_spyj_height.value;
			spItem.fontname = cell.spzj_spyj_fontFamily.value;
			spItem.fontsize = cell.spzj_spyj_fontSize.value;
			spItem.italic = cell.spzj_spyj_fontStyle.value;
			spItem.underline = cell.spzj_spyj_underLine.value;
			spItem.fontcolor = cell.spzj_spyj_color.value;
			spItem.fontweight = cell.spzj_spyj_fontWeight.value
			spItem.font = cell.spzj_spyj_font.value
			// spItem.mark = cell.spzj_spyj_mark.value;
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)

			break;
		case "ApprovalSeal":
			spItem.isshow = cell.spzj_spz_display.checked;
			spItem.src = cell.spzj_spz_tply.value;
			spItem.labelvalue = cell.spzj_spz_bqmc.value;
			spItem.x = cell.spzj_spz_x.value;
			spItem.y = cell.spzj_spz_y.value;
			spItem.width = cell.spzj_spz_width.value;
			spItem.height = cell.spzj_spz_height.value;
			spItem.fontname = cell.spzj_spz_fontFamily.value;;
			spItem.fontsize = cell.spzj_spz_fontSize.value;;
			spItem.italic = cell.spzj_spz_fontStyle.value;;
			spItem.underline = cell.spzj_spz_underLine.value;;
			spItem.fontcolor = cell.spzj_spz_color.value;;
			spItem.fontweight = cell.spzj_spz_fontWeight.value
			spItem.font = cell.spzj_spz_font.value
			// spItem.mark = cell.spzj_spz_mark.value;
			getApprovalDataSet(spItem.src, spItem.labelvalue, report)
			break;
		case "ApprovalPerson":
			spItem.isshow = cell.spzj_spr_display.checked;
			spItem.value = cell.spzj_spr_spr.value;
			spItem.labelvalue = cell.spzj_spr_bqmc.value;
			spItem.x = cell.spzj_spr_x.value;
			spItem.y = cell.spzj_spr_y.value;
			spItem.width = cell.spzj_spr_width.value;
			spItem.height = cell.spzj_spr_height.value;
			spItem.namepicture = cell.spzj_spr_qmzp.value;
			spItem.fontname = cell.spzj_spr_fontFamily.value;;
			spItem.fontsize = cell.spzj_spr_fontSize.value;;
			spItem.italic = cell.spzj_spr_fontStyle.value;;
			spItem.underline = cell.spzj_spr_underLine.value;;
			spItem.fontcolor = cell.spzj_spr_color.value;;
			spItem.fontweight = cell.spzj_spr_fontWeight.value
			spItem.font = cell.spzj_spr_font.value
			// spItem.mark = cell.spzj_spr_mark.value;
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)
			break;
		case "ApprovalDate":
			spItem.isshow = cell.spzj_sprq_display.checked;
			spItem.value = cell.spzj_sprq_sprq.value;
			spItem.labelvalue = cell.spzj_sprq_bqmc.value;
			spItem.x = cell.spzj_sprq_x.value;
			spItem.y = cell.spzj_sprq_y.value;
			spItem.width = cell.spzj_sprq_width.value;
			spItem.height = cell.spzj_sprq_height.value;
			spItem.dateformat = cell.spzj_sprq_rqgs.value;
			spItem.fontname = cell.spzj_sprq_fontFamily.value;;
			spItem.fontsize = cell.spzj_sprq_fontSize.value;;
			spItem.italic = cell.spzj_sprq_fontStyle.value;;
			spItem.underline = cell.spzj_sprq_underLine.value;;
			spItem.fontcolor = cell.spzj_sprq_color.value;;
			spItem.fontweight = cell.spzj_sprq_fontWeight.value
			spItem.font = cell.spzj_sprq_font.value
			// spItem.mark = cell.spzj_sprq_mark.value;
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)
			break;
		case "Agree":
			spItem.isshow = cell.spzj_ty_display.checked;
			spItem.value = cell.spzj_ty_spjg.value;
			spItem.labelvalue = cell.spzj_ty_bqmc.value;
			spItem.x = cell.spzj_ty_x.value;
			spItem.y = cell.spzj_ty_y.value;
			spItem.width = cell.spzj_ty_width.value;
			spItem.height = cell.spzj_ty_height.value;
			spItem.fontname = cell.spzj_ty_fontFamily.value;;
			spItem.fontsize = cell.spzj_ty_fontSize.value;;
			spItem.italic = cell.spzj_ty_fontStyle.value;;
			spItem.underline = cell.spzj_ty_underLine.value;;
			spItem.fontcolor = cell.spzj_ty_color.value;;
			spItem.fontweight = cell.spzj_ty_fontWeight.value
			// spItem.mark = cell.spzj_ty_mark.value;
			spItem.font = cell.spzj_ty_font.value
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)
			break;
		case "DisAgree":
			spItem.isshow = cell.spzj_bty_display.checked;
			spItem.value = cell.spzj_bty_spjg.value;
			spItem.labelvalue = cell.spzj_bty_bqmc.value;
			spItem.x = cell.spzj_bty_x.value;
			spItem.y = cell.spzj_bty_y.value;
			spItem.width = cell.spzj_bty_width.value;
			spItem.height = cell.spzj_bty_height.value;
			spItem.fontname = cell.spzj_bty_fontFamily.value;;
			spItem.fontsize = cell.spzj_bty_fontSize.value;;
			spItem.italic = cell.spzj_bty_fontStyle.value;;
			spItem.underline = cell.spzj_bty_underLine.value;;
			spItem.fontcolor = cell.spzj_bty_color.value;;
			spItem.fontweight = cell.spzj_bty_fontWeight.value
			spItem.font = cell.spzj_bty_font.value
			// spItem.mark = cell.spzj_bty_mark.value;
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)
			break;
		case "SenBack":
			spItem.isshow = cell.spzj_th_display.checked;
			spItem.value = cell.spzj_th_spjg.value;
			spItem.labelvalue = cell.spzj_th_bqmc.value;
			spItem.x = cell.spzj_th_x.value;
			spItem.y = cell.spzj_th_y.value;
			spItem.width = cell.spzj_th_width.value;
			spItem.height = cell.spzj_th_height.value;
			spItem.fontname = cell.spzj_th_fontFamily.value;;
			spItem.fontsize = cell.spzj_th_fontSize.value;;
			spItem.italic = cell.spzj_th_fontStyle.value;;
			spItem.underline = cell.spzj_th_underLine.value;;
			spItem.fontcolor = cell.spzj_th_color.value;;
			spItem.fontweight = cell.spzj_th_fontWeight.value
			spItem.font = cell.spzj_th_font.value
			// spItem.mark = cell.spzj_th_mark.value;
			getApprovalDataSet(spItem.value, spItem.labelvalue, report)
			break;
	}
	return spItem;
}
// 获取审批组件用到的数据集
function getApprovalDataSet(value, labelValue, report) {
	if (value) {
		var str = value.trim().substring(0, 1);
		if (str == "=") {
			var s = value.trim().substring(1).split('.');
			var index = report.inDsArray(s[0]);
			if (index == -1) {
				report.datasets.push(s[0]);
			}
		}
	}
	if (labelValue) {
		var str = labelValue.trim().substring(0, 1);
		if (str == "=") {
			var s = value.trim().substring(1).split('.');
			var index = report.inDsArray(s[0]);
			if (index == -1) {
				report.datasets.push(s[0]);
			}
		}
	}
}
// 富文本
function richEditType(cell, cellInfo, report) {
	var richEdit = {};
	richEdit.type = "RichEdit";
	richEdit.firstindent = cell.fwb_indent.value;
	richEdit.isenableedit = cell.fwb_allowEdit.checked;
	richEdit.isprint = cell.fwb_allowPrint.checked;
	richEdit.isallownull = cell.fwb_allowEmpty.checked;
	richEdit.emptydisplay = cell.fwb_emptyAlert.value;
	cellInfo.fillcelltype = report.getCellTypeID(richEdit).toString();
}
//保存时判断数据集是否合法
// Handsontable.Core.prototype.dataFiledValid = function(filed, r, c) {
// 	if (typeof runC != 'undefined' && !runC(filed).flag) {
// 		// vmd.tip('错误单元格 ' + this.numToEng(c) + (r+1)+',保存未成功','error')
// 		vmd.alert('错误单元格 ' + this.numToEng(c) + (r + 1), '保存未成功' + '\t' + runC(filed).msg[0])
// 		throw runC(filed).msg[0];
// 	}
// }
Handsontable.Core.prototype.dataFiledValid = function(filed, r, c, reportid, directPass) {
	if (directPass) {
		//拖动设置属性后保存xml模板直接通过
		return true;
	} else {
		//嵌套表暂时不判断
		if (typeof reportid == 'undefined') {
			//嵌套表
			return true;
		} else {
			var result = this.checkExp(filed, reportid);
			if (!result.flag) {
				vmd.alert('错误单元格 ' + this.numToEng(c) + (r + 1), '保存未成功!  ' + reportid + ' 报表组件的 ' + this.numToEng(c) + (r + 1) + ' 单元格；' + '\n' + '\t' + result.usermsg)
				return false;
			}
			return true;
		}
	}
}
Handsontable.Core.prototype.changeAttributeInfo = function(r, c, id, value) {
	// if (!(id == 'txtValue' && value == '')) {

	this.setCellMeta(r, c, 'theCellChanged', true);
	if (!this.getCellMeta(r, c).cellAttributeInfo) this.setCellMeta(r, c, 'cellAttributeInfo', new gridCellInfoObject())
	var temp = this.getCellMeta(r, c).cellAttributeInfo;
    temp.setCellInfos(id, value);
	
	this.setCellMeta(r, c, 'cellAttributeInfo', temp);
	// }
}


Handsontable.Core.prototype.colorRgb = function(str) {
	//十六进制颜色值的正则表达式
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

	var sColor = str.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return "RGB(" + sColorChange.join(",") + ")";
	} else {
		return sColor;
	}
};

Handsontable.Core.prototype.addRowAndCol = function(row, cellCount) {
	// 初始化行数不够，添加行
	var ra = false;
	var ca = false;
	if (row > this.countRows()) {
		ra = true;
	}
	// 初始化列数不够，添加列
	if (cellCount > this.countCols()) {
		ca = true
	}
	if (ra && ca) {
		this.alter('insert_row', 0, row - 30)
		this.alter('insert_col', 0, cellCount - 30)
		this.updateSettings({
			viewportColumnRenderingOffset: cellCount + 1,
			viewportRowRenderingOffset: row + 1, //设置可视行列外预渲染的行列数
		})
	} else if (ra && !ca) {
		this.alter('insert_row', 0, row - 30)
		this.updateSettings({
			viewportColumnRenderingOffset: cellCount + 1,
			viewportRowRenderingOffset: row + 1, //设置可视行列外预渲染的行列数
		})
	} else if (!ra && ca) {
		this.alter('insert_col', 0, cellCount - 30)
		this.updateSettings({
			viewportColumnRenderingOffset: cellCount + 1,
			viewportRowRenderingOffset: row + 1, //设置可视行列外预渲染的行列数
		})
	} else {
		this.updateSettings({
			viewportColumnRenderingOffset: cellCount + 1,
			viewportRowRenderingOffset: row + 1, //设置可视行列外预渲染的行列数
		})
	}
}

Handsontable.Core.prototype.setCols = function(resultInfo) {
	var rows;
	var cols;
	var body = resultInfo.main.body;
	var cw = body.columns.width
	this.fullColWidthArray();
	// this.colHeadWidthArray = resultInfo.main.body.columns.width;
	this.fullColArray();
	if (body.sections.length > 1 && !body.rowNum) {
		var tCol = -1;
		var tRow = -1;
		for (var i = 0; i < body.sections.length; i++) {
			if (body.sections[i].endcol > tCol) tCol = body.sections[i].endcol;
			if (body.sections[i].endrow > tRow) tRow = body.sections[i].endrow;
		}
		rows = tRow;
		cols = tCol;
	} else {
		rows = body.rowNum;
		cols = body.colNum || body.columns.width.length;
	}
	for (var n = 0; n < cols; n++) {
		if (cw[n] == 0) {
			this.setCellMeta(0, n, 'col_hide', true)
			this.colHeadArray[n] += "<i class='report-iconfont icon-yincang font-20'></i>"
			this.colHeadWidthArray[n] = 80;
		} else {
			this.colHeadWidthArray[n] = cw[n]
		}
	}

	for (var i = 0; i < resultInfo.main.body.fixedrow; i++) {
		this.setCellMeta(i, 0, 'col_lock', true)
	}

	for (var n = 0; n < resultInfo.main.body.fixedcol; n++) {
		this.setCellMeta(0, n, 'row_lock', true)
	}

	//2019.8.8
	// this.updateSettings({
	// 	fixedRowsTop: resultInfo.main.body.fixedrow || 0,
	// 	fixedColumnsLeft: resultInfo.main.body.fixedcol || 0
	// })

	this.fixedrow = resultInfo.main.body.fixedrow || 0;
	this.fixedcol = resultInfo.main.body.fixedcol || 0;
	for (var i = 0; i < this.fixedcol; i++) {
		if (this.getCellMeta(0, i).col_hide) {
			this.colHeadArray[i] = this.numToEng(i) + '锁定' + "<i class='report-iconfont icon-yincang font-20'></i>"
		} else {
			this.colHeadArray[i] = this.numToEng(i) + '锁定'
		}
	}
}
Handsontable.Core.prototype.changed = function(r, c) {
	var rr = r - 1;
	var cc = c - 1;
	for (var a = 0; a < rr; a++) {
		for (var b = 0; b < cc; b++) {
			this.setCellMeta(a, b, 'theCellChanged', true)
		}
	}
}
//json结构解析模板信息到对应单元格
Handsontable.Core.prototype.loadWebModelOnClould = function(resultInfo, handsontable, type) {
	//main、兼容嵌套、subfields、checkrules、flfp

	if (resultInfo && resultInfo.main && resultInfo.main.body && resultInfo.main.body.sections) {
		var row = resultInfo.main.body.rowNum || resultInfo.main.body.sections[0].endrow;
		var cellCount = resultInfo.main.body.colNum || resultInfo.main.body.sections[0].endcol;
		row = parseInt(row);
		cellCount = parseInt(cellCount);

		//增加行列
		handsontable.addRowAndCol(row, cellCount);
		//设有效标识
		handsontable.changed(row, cellCount);
		//设置列宽
		handsontable.setCols(resultInfo);

		if (resultInfo.main.body.fixedcol > 0) {
			for (var i = 0; i < resultInfo.main.body.fixedcol; i++) {
				this.setCellMeta(0, i, 'col_lock', true);
			}
		}

		//打印信息
		if (resultInfo && resultInfo.main.page) {
			handsontable.allPrintInfo = {
				print_paperSize: resultInfo.main.page.pageproperty.type,
				print_quality: resultInfo.main.page.pageproperty.printquality,
				print_direction: resultInfo.main.page.pageproperty.pagedirection,
				print_marginTop: resultInfo.main.page.pagemargin.top,
				print_marginBottom: resultInfo.main.page.pagemargin.bottom,
				print_marginLeft: resultInfo.main.page.pagemargin.left,
				print_marginRight: resultInfo.main.page.pagemargin.right,
				print_header: resultInfo.main.page.pagemargin.header,
				print_footer: resultInfo.main.page.pagemargin.footer
			}
		}

		handsontable.tempMergeArray = []

		if (resultInfo.main.body.sections.length > 0) {
			var sectionTitleAndHeader = 0;
			for (var s in resultInfo.main.body.sections) {
				if (typeof resultInfo.main.body.sections[s] == 'object') {
					var section = resultInfo.main.body.sections[s];
					sectionTitleAndHeader = sectionTitleAndHeader + section.header.length + section.title.length;
					if (resultInfo.main.body.sections.length > 1) {
						var fp = {};
						fp.sliceName = section.name;
						fp.emptyRow = section.patchrow;
						fp.emptyCol = section.patchcol;
						fp.sr = section.startrow - 1;
						fp.er = section.endrow - 1;
						fp.sc = section.startcol - 1;
						fp.ec = section.endcol - 1;
						if (!handsontable.fpArray)
							handsontable.fpArray = [];
						handsontable.fpArray.push(fp);
					}
					var titleNum = 0;
					var headerNum = 0;
					var dataNum = 0;
					// 标题行
					if (section.title && section.title.length > 0) {
						titleNum = section.title.length;
						handsontable.getCellInfoOnClould(section.title, section, resultInfo, handsontable, 0, "title");

					}
					if (section.header && section.header.length > 0) {
						headerNum = section.header.length;
						handsontable.getCellInfoOnClould(section.header, section, resultInfo, handsontable, titleNum, "header");
					}
					if (section.data && section.data.length > 0) {
						dataNum = section.data[0].cells.length;
						handsontable.getCellInfoOnClould(section.data, section, resultInfo, handsontable, titleNum + headerNum, "data");
					}

					if (handsontable.tempMergeArray.length == 0) {
						handsontable.updateSettings({
							rowHeaders: handsontable.rowHeadArray,
							rowHeights: handsontable.rowHeadHeightArray,
							colWidths: handsontable.colHeadWidthArray,
							colHeaders: handsontable.colHeadArray
						})
						handsontable.setDataAtCell(handsontable.tempDataArray)
					} else {
						handsontable.updateSettings({
							rowHeaders: handsontable.rowHeadArray,
							mergeCells: handsontable.tempMergeArray,
							rowHeights: handsontable.rowHeadHeightArray,
							colWidths: handsontable.colHeadWidthArray,
							colHeaders: handsontable.colHeadArray
						})
						handsontable.setDataAtCell(handsontable.tempDataArray)
					}
					//组织fathers数组存储左父上父信息
					if (!handsontable.fathers) handsontable.fathers = [];
					// main.body.sections[""0""].data[""0""].cells[1].hparent
					for (var i = 0; i < section.data.length; i++) {
						for (var n = 0; n < section.data[i].cells.length; n++) {
							if (section.data[i].cells[n] && section.data[i].cells[n].hparent) {
								var cr = i + sectionTitleAndHeader;
								var p = section.data[i].cells[n].hparent;
								var p1 = p.match(/^[a-z|A-Z]+/gi);
								var p2 = p.match(/\d+$/gi);
								var obj = {
									cc: n + parseInt(section.startcol) - 1,
									cr: cr + parseInt(section.startrow) - 1,
									fc: handsontable.engToNum(p1[0]) - 1,
									fr: p2[0] - 1,
									type: "leftParent"
								}
								handsontable.fathers.push(obj)
							}
							if (section.data[i].cells[n] && section.data[i].cells[n].vparent) {
								var cr = i + sectionTitleAndHeader;
								var p = section.data[i].cells[n].vparent;
								var p1 = p.match(/^[a-z|A-Z]+/gi);
								var p2 = p.match(/\d+$/gi);
								var obj = {
									cc: n + parseInt(section.startcol) - 1,
									cr: cr + parseInt(section.startrow) - 1,
									fc: handsontable.engToNum(p1[0]) - 1,
									fr: p2[0] - 1,
									type: "rightParent"
								}
								handsontable.fathers.push(obj)
							}
						}
					}
					// if (resultInfo.fathers) handsontable.fathers = resultInfo.fathers;
				}
			}
		}
	}

	//组织嵌套表数组
	if (resultInfo && resultInfo.subs && (Object.keys(resultInfo.subs)).length > 0) {
		var count = 0;
		var cellType = resultInfo.main.celltypes;
		handsontable.nestedTableArray = [];
		var info = resultInfo.main.body.sections;
		for (var i = 0; i < info.length; i++) {
			for (var n = 0; n < info[i].data.length; n++) {
				for (var x = 0; x < info[i].data[n].cells.length; x++) {
					if (info[i].data[n].cells[x].fillcelltype) {
						var name = info[i].data[n].cells[x].fillcelltype;
						var cellTypeInfo = cellType[name];
						var sr = n + info[i].header.length + info[i].title.length;
						var sc = x;
						var er;
						var ec;

						var merged = handsontable.tempMergeArray;
						for (var t = 0; t < merged.length; t++) {
							if (merged[t].row == sr && merged[t].col == x) {
								er = sr + merged[t].rowspan - 1;
								ec = sc + merged[t].colspan - 1;
								subsInfo = resultInfo.subs[count];
								if (subsInfo) {
									handsontable.nestedTableArray.push({
										sr: sr,
										sc: sc,
										er: er,
										ec: ec,
										info: subsInfo,
										qtb_template: cellTypeInfo.subrptpath,
										qtb_tableName: cellTypeInfo.subrptname,
										qtb_unfold: cellTypeInfo.spread == '1' ? true : false,
										qtb_style: cellTypeInfo.subrptshowmode == 'embed' ? '0' : '1'
									})
									count++

								}
							}
						}
					}
				}
			}
		}
	}

	if (resultInfo && resultInfo.main.subfields && resultInfo.main.subfields.length > 0) {
		for (f in resultInfo.main.subfields) {
			var section = resultInfo.main.subfields[f];
			var fl = new flSetting();
			fl.seg_columnsNumber.value = section.subfieldCount;
			fl.seg_style.value = section.subfieldTypeWraper;
			fl.seg_dividingLine.value = section.showSeparator;
			fl.seg_columnsMargin.value = section.subfieldSpace;
			fl.seg_applyTo.value = section.subfieldApplaycationWraper;
			fl.seg_condition.value = section.subCondition;
			fl.flSRow.value = section.startRow;
			fl.flSCol.value = section.startCol;
			fl.flERow.value = section.endRow;
			fl.flECol.value = section.endCol;
			if (!handsontable.flList)
				handsontable.flList = [];
			handsontable.flList.push(fl);
		}
	}

	if (resultInfo && resultInfo.main.checkrules) {
		this.setCheckRules(resultInfo.main.checkrules)
	}

	if (resultInfo && resultInfo.main.submitrules) {
		this.setSubmitRules(resultInfo.main.submitrules)
	}



	//拿到flList和fpList中的已有的分栏分片画上边框
	if (handsontable.fpArray) {
		for (var x = 0; x < handsontable.fpArray.length; x++) {
			//重绘外边框
			var sr = handsontable.fpArray[x].sr
			var sc = handsontable.fpArray[x].sc
			var er = handsontable.fpArray[x].er
			var ec = handsontable.fpArray[x].ec
			var ms = '2px solid #000'

			for (var a = sr; a < er + 1; a++) {
				if (sc == 0) {
					// handsontable.changeAttributeInfo(a, sc, 'borderL', ms)
					if (handsontable.getCell(a, sc) && handsontable.getCell(a, sc).style)
						handsontable.getCell(a, sc).style.borderLeft = ms;
				} else {
					// handsontable.changeAttributeInfo(a, sc - 1, 'borderR', ms)
					if (handsontable.getCell(a, sc - 1) && handsontable.getCell(a, sc - 1).style)
						handsontable.getCell(a, sc - 1).style.borderRight = ms;
				}
			}
			for (var b = sc; b < ec + 1; b++) {
				if (sr == 0) {
					// handsontable.changeAttributeInfo(sr, b, 'borderT', ms)
					if (handsontable.getCell(sr, b) && handsontable.getCell(sr, b).style)
						handsontable.getCell(sr, b).style.borderTop = ms;
				} else {
					// handsontable.changeAttributeInfo(sr - 1, b, 'borderB', ms)
					if (handsontable.getCell(sr - 1, b) && handsontable.getCell(sr - 1, b).style)
						handsontable.getCell(sr - 1, b).style.borderBottom = ms;
				}
			}
			for (var b = sc; b < ec + 1; b++) {
				// handsontable.changeAttributeInfo(er, b, 'borderB', ms)
				if (handsontable.getCell(er, b) && handsontable.getCell(er, b).style)
					handsontable.getCell(er, b).style.borderBottom = ms;
			}
			for (var b = sr; b < er + 1; b++) {
				// handsontable.changeAttributeInfo(b, ec, 'borderR', ms)
				if (handsontable.getCell(b, ec) && handsontable.getCell(b, ec).style)
					handsontable.getCell(b, ec).style.borderRight = ms;
			}
		}
		handsontable.updateSettings({})
	}

	//撤销列表清除,
	// this.undoRedo.doneActions = []

	// xds.vmdreportInfo.list
}

Handsontable.Core.prototype.getCellInfoOnClould = function(row, section, resultInfo, grid, number, rowtype) {
	var specialCharacter = function(str) {
		try {
			if (str != null) {
				str = str.replace(/&lt;/g, "<");
				str = str.replace(/&gt;/g, ">");
				str = str.replace(/&amp;/g, "&");
				str = str.replace(/&apos;/g, "\'");
				str = str.replace(/&quot;/g, "\"");
				return str;
			} else {
				return '';
			}
		} catch (ex) {

		}
	}
	var style = resultInfo.style || resultInfo.main.style;
	var cellType = resultInfo.main.celltypes;
	if (typeof grid.tempDataArray == 'undefined') grid.tempDataArray = [];
	grid.fullRowArray();
	grid.fullRowHeightArray();
	for (var rw = 0; rw < row.length; rw++) {
		var rowInfo = row[rw];
		var rr = rw + number + parseInt(section.startrow) - 1;

		// 行头属性设置
		if (rowInfo.height == '0') {
			grid.rowHeadHeightArray[rr] = 0
			grid.setCellMeta(rr, 0, 'row_hide', true)
		} else {
			grid.rowHeadHeightArray[rr] = rowInfo.height;
		}
		grid.setCellMeta(rr, 0, 'rowtype', rowtype)
		var cn = grid.getRowHeadName(rowtype);

		var flag = grid.getCellMeta(rr, 0).row_hide;

		if (!flag) {
			grid.rowHeadArray[rr] = (rr + 1) + cn
		} else {
			grid.rowHeadArray[rr] = (rr + 1) + cn + "<i class='report-iconfont icon-yincang font-20'></i>"
		}

		var cellCount = rowInfo.cells.length;
		for (var c = 0; c < cellCount; c++) {
			var col = rowInfo.cells[c];
			var colid = c + parseInt(section.startcol) - 1;
			var gcell = grid.getCellMeta(rr, colid);
			if (gcell) {
				gcell.theCellChanged = true;
				var attribute = new gridCellInfoObject();
				var colAlignId = parseInt(col.align);
				if (style && style.aligns) {
					var colAlign = style.aligns[colAlignId];
					attribute.alignInfo.align.value.HAlign.value = colAlign.halign;
					attribute.alignInfo.align.value.VAlign.value = colAlign.valign;
				}

				if (col.data) {
					attribute.textValue.value = specialCharacter(col.data);
					var value = specialCharacter(col.data);
					grid.tempDataArray.push({
						'0': rr,
						'1': colid,
						'2': value
					})
				} else if (col.datavalue) {
					attribute.textValue.value = specialCharacter(col.datavalue);
					var value = specialCharacter(col.datavalue);
					grid.tempDataArray.push({
						'0': rr,
						'1': colid,
						'2': value
					})
				}

				var linkid = parseInt(col.links)
				if (linkid && resultInfo && resultInfo.main && resultInfo.main.links) {
					var link = resultInfo.main.links[linkid];
					attribute.leftLink.linkParam.value = link.param;
				}

				var eventid = parseInt(col.events)
				if (eventid && resultInfo && resultInfo.main && resultInfo.main.events) {
					var event = resultInfo.main.events[eventid];
					attribute.leftLink.linkEvent.value = event.click;
					attribute.menu.menuEvent.value = event.itemClick;
				}

				var menuID = parseInt(col.menus)
				if (menuID && resultInfo && resultInfo.main && resultInfo.main.menus) {
					var menu = resultInfo.main.menus[menuID];
					attribute.menu.menuID.value = menu.id;
					attribute.menu.menuParam.value = menu.param;
					attribute.menu.menuSource.value = menu.source;
					attribute.menu.menuDataset.value = menu.sets;
					//attribute.menu.cmbMenuID.value = menu.cmbMenuID;
					attribute.menu.menuChoose.checked = menu.choose;
					attribute.menu.menuPID.value = menu.pid;
					attribute.menu.menuText.value = menu.text;
				}

				if (colAlign && colAlign.textcontrol) attribute.alignInfo.textControl.value = colAlign.textcontrol;

				if (colAlign && colAlign.escapelabel) {
					if (colAlign.escapelabel == 0) {
						attribute.alignInfo.escapelabel.checked = false;
					} else {
						attribute.alignInfo.escapelabel.checked = true;
					}
				}
				if (colAlign && colAlign.txtdirection) attribute.alignInfo.textDirection.value = colAlign.txtdirection;
				if (colAlign && colAlign.rotation) attribute.alignInfo.rotation.value = colAlign.rotation;
				if (colAlign && colAlign.singlerotation) attribute.alignInfo.singleRotation.value = colAlign.singlerotation;
				if (colAlign && colAlign.autoenter) attribute.alignInfo.autoenter.value = colAlign.autoenter;
				if (colAlign && colAlign.padding) {
					var p = colAlign.padding;
					var pp = p.split(' ');
					attribute.alignInfo.topPadding.value = pp[0];
					attribute.alignInfo.bottomPadding.value = pp[2];
					attribute.alignInfo.leftPadding.value = pp[3];
					attribute.alignInfo.rightPadding.value = pp[1];
				}
				if (colAlign && colAlign.rowspace) attribute.alignInfo.verticalSpace.value = colAlign.rowspace;
				if (col.hparent) {
					attribute.extraInfo.leftParent.value = col.hparent;
				}
				if (col.vparent) {
					attribute.extraInfo.rightParent.value = col.vparent;
				}
				if (col.expand == "1") {
					attribute.extraInfo.direction.value = "3";
				} else if (col.expand == "2") {
					attribute.extraInfo.direction.value = "2";
				} else {
					attribute.extraInfo.direction.value = "1";
				}
				if (col.bgcolorexp) {
					attribute.contentDetailInfo.nr_bgColorCheck.checked = true;
					attribute.contentDetailInfo.nr_bgColor.value = col.bgcolorexp;
				}
				if (col.forecolorexp) {
					attribute.contentDetailInfo.nr_frontColorCheck.checked = true;
					attribute.contentDetailInfo.nr_frontColor.value = col.forecolorexp;
				}
				if (col.leftmargin) {
					attribute.contentDetailInfo.nr_leftMarginCheck.checked = true;
					attribute.contentDetailInfo.nr_leftMargin.value = col.leftmargin;
				}
				if (col.fontsexp) {
					attribute.contentDetailInfo.nr_rowTextCheck.checked = true;
					attribute.contentDetailInfo.nr_rowText.value = col.fontsexp;
				}
				if (col.widthexp) {
					attribute.contentDetailInfo.nr_widthCheck.checked = true;
					attribute.contentDetailInfo.nr_width.value = col.widthexp;
				}
				if (col.enableexp) {
					attribute.contentDetailInfo.nr_availableCheck.checked = true;
					attribute.contentDetailInfo.nr_available.value = col.enableexp;
				}
				if (col.heightexp) {
					attribute.contentDetailInfo.nr_heightCheck.checked = true;
					attribute.contentDetailInfo.nr_height.value = col.heightexp;
				}
				if(col.bottomMerged){
					attribute.contentDetailInfo.nr_sameValueDown.checked = true;
				}
				if(col.btmmergeconditionexp){
					attribute.contentDetailInfo.nr_downDependencies.value = col.btmmergeconditionexp;
				}
				if(col.rightMerged){
					attribute.contentDetailInfo.nr_sameValueRight.checked = true;
				}
				if(col.rgtmergeconditionexp){
					attribute.contentDetailInfo.nr_rightDependencies.value = col.rgtmergeconditionexp;
				}
				var f = parseInt(col.fonts);
				if (style && style.fonts && style.fonts[f]) {
					var ff = style.fonts[f];
					attribute.fontInfos.fontFamily.value = ff.name;
					if ((ff.weight == "700" || ff.weight == "1") && ff.italic == "1") {
						attribute.fontInfos.fontShape.value = "italic";
						attribute.fontInfos.fontWeight.value = "bold";
					} else if (ff.weight == "700" || ff.weight == "1") {
						attribute.fontInfos.fontWeight.value = "bold";
					} else if (ff.italic == "1") {
						attribute.fontInfos.fontShape.value = "italic";
					} else {
						attribute.fontInfos.fontShape.value = "";
						attribute.fontInfos.fontWeight.value = "";
					}
					attribute.fontInfos.fontSize.value = ff.size < 12 ? 12 : ff.size;
					if (ff.unline == "1") {
						attribute.fontInfos.underline.value = "underline";
					} else {
						attribute.fontInfos.underline.value = "";
					}
					if (ff.color) {
						attribute.fontInfos.ColorSelect.value = ff.color.colorHex();
					}
					attribute.fontid = col.fonts;
					if (typeof col.forecolor == 'object') {
						var temp = ''
						for (var key in col.forecolor) {
							temp += col.forecolor[key]
						}
						attribute.fontInfos.ColorSelect.value = temp;
					} else if (typeof col.forecolor == 'string') {
						attribute.fontInfos.ColorSelect.value = col.forecolor.colorHex();
					}
				}

				var b = parseInt(col.borders);
				if (style && style.borders && style.borders[b]) {
					var bb = style.borders[b];
					if (bb.bottom && bb.bottom == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderB.value = 'none';
					} else {
						if (bb.bottom && bb.bottom != "1,RGB(204,204,204),0") {
							var temp = bb.bottom.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderB.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderB.value = rgb;
							}
						}
					}
					// if (rr == 0) {
					if (bb.top && bb.top == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderT.value = 'none';
					} else {
						if (bb.top && bb.top != "1,RGB(204,204,204),0") {

							var temp = bb.top.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderT.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderT.value = rgb;

							}
						}
					}
					// }
					// if (colid == 0) {
					if (bb.left && bb.left == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderL.value = 'none';
					} else {
						if (bb.left && bb.left != "1,RGB(204,204,204),0") {

							var temp = bb.left.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderL.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderL.value = rgb;
							}

						}
					}
					// }
					if (bb.right && bb.right == "0,RGB(255,255,255),0") {
						attribute.borderInfo.borderR.value = 'none';
					} else {
						if (bb.right && bb.right != "1,RGB(204,204,204),0") {
							var temp = bb.right.split(',');
							var rgb = temp[1] + ',' + temp[2] + ',' + temp[3];
							if (rgb.indexOf('px') == -1) {
								attribute.borderInfo.borderR.value = '1px solid ' + rgb;
							} else {
								attribute.borderInfo.borderR.value = rgb;
							}
						}
					}
				}
				attribute.borderid = col.borders;
				// d1
				if (col.backgroundcolor) {
					var bg = col.backgroundcolor;
					if (typeof bg == 'string') {
						attribute.bgcolorInfo.ColorSelectInner.value = col.backgroundcolor
					} else if (typeof bg == 'object') {
						var temp = '';
						for (var key in bg) {
							temp += bg[key];
						}
						attribute.bgcolorInfo.ColorSelectInner.value = temp
					}
				}
				if (col.rowspan && parseInt(col.rowspan) > 1 && col.colspan && parseInt(col.colspan) > 1) {

				}
				// 数字属性信息
				var m = parseInt(col.number);
				if (style && style.numbers && style.numbers[m]) {
					var numinfo = style.numbers[m];
					if (numinfo.type == '0') {
						attribute.numberInfo.allSortCom.value = "myConventional";
					} else
					if (numinfo.type == "1") {
						attribute.numberInfo.allSortCom.value = "myNumber";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs.value = 0;
						}
						if (typeof numinfo.separator != 'undefined') {
							attribute.numberInfo.useCommaCheckBox.checked = true;
						}
						if (numinfo.zerovisible == '1') {
							attribute.numberInfo.noZeroCheckBox.checked = true;
						} else {
							attribute.numberInfo.noZeroCheckBox.checked = false
						}
						if (numinfo.numbering) {
							attribute.numberInfo.numShowType.value = numinfo.numbering;
						}
					} else
					if (numinfo.type == "2") {
						attribute.numberInfo.allSortCom.value = "myCurrency";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs1.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs1.value = 0;
						}
						if (numinfo.zerovisible == '1') {
							attribute.numberInfo.noZeroCheckBox1.checked = true;
						} else {
							attribute.numberInfo.noZeroCheckBox1.checked = false
						}
					} else
					if (numinfo.type == "3") {
						attribute.numberInfo.allSortCom.value = "myDate";
						attribute.numberInfo.dateSortCom.value = numinfo.dateformat;
					} else
					if (numinfo.type == "4") {
						attribute.numberInfo.allSortCom.value = "myTime";
					} else
					if (numinfo.type == "5") {
						attribute.numberInfo.allSortCom.value = "myPercentage";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs3.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs3.value = 0;
						}

						if (numinfo.zerovisible == '1') {
							attribute.numberInfo.noZeroCheckBox3.checked = true;
						} else {
							attribute.numberInfo.noZeroCheckBox3.checked = false
						}
					} else
					if (numinfo.type == "6") {
						attribute.numberInfo.allSortCom.value = "mySciCounting";
						if (typeof numinfo.decimal != 'undefined') {
							attribute.numberInfo.xs4.value = parseInt(numinfo.decimal);
						} else {
							attribute.numberInfo.xs4.value = 0;
						}

						if (numinfo.zerovisible == '1') {
							attribute.numberInfo.noZeroCheckBox4.checked = true;
						} else {
							attribute.numberInfo.noZeroCheckBox4.checked = false
						}
					} else
					if (numinfo.type == "7") {
						attribute.numberInfo.allSortCom.value = "myText";
					} else
					if (numinfo.type == "8") {
						attribute.numberInfo.allSortCom.value = "mySpecial";
					}
				}
				attribute.numberid = col.number;
				// 单元格类型
				setCellType(cellType, col, attribute, rr, colid, grid, resultInfo)

				if (col.showvalue)
					attribute.showValue.value = specialCharacter(col.showvalue);
				gcell.cellAttributeInfo = attribute;
			}
			if (col.merged == "1") {
				var obj;
				var cs;
				var rs;
				var colspan = 1;
				// parseInt(col.colspan);
				var rowspan = 1;
				// parseInt(col.rowspan);
				if (col.colspan && parseInt(col.colspan)) {
					colspan = parseInt(col.colspan);
				}
				if (col.rowspan && parseInt(col.rowspan)) {
					rowspan = parseInt(col.rowspan);
				}
				cs = colspan;
				rs = rowspan;

				obj = {
					row: rr,
					col: colid,
					rowspan: rs,
					colspan: cs
				};

				grid.tempMergeArray.push(obj)
				for (var i = obj[0]; i < obj[2]; i++) {
					for (n = obj[1]; n < obj[3]; n++) {
						grid.setCellMeta(i, n, 'mergeId', 2)
					}
				}
				grid.setCellMeta(rr, colid, 'mergeId', 1)
			}
			if (col.subrptindex != "undefined" && col.subrptindex >= 0) {
				// 设置嵌套表信息
				setSubRptInfo(grid, col, resultInfo, rr, colid, gcell);
			}
			if (resultInfo && resultInfo.main && resultInfo.main.events) {
				//设置取到的事件
				this.setEvents(resultInfo.main.events, attribute, col, rr, colid, resultInfo.main.celltypes[col.fillcelltype])
			}
		}
	}
}

// 设置嵌套表信息
function setSubRptInfo(grid, col, resultInfo, rr, colid, gcell) {
	//grid.nestedTableArray
	var subInfo = {};
	var index = parseInt(col.subrptindex);
	if (resultInfo.subs && resultInfo.subs[index]) {
		subInfo.sr = rr;
		subInfo.sc = colid;
		subInfo.info = {};
		subInfo.info.main = resultInfo.subs[index];
		if (col.colspan && parseInt(col.colspan) > 1 && col.rowspan && parseInt(col.rowspan) > 1) {
			subInfo.er = rr + parseInt(col.rowspan) - 1;
			subInfo.ec = colid + parseInt(col.colspan) - 1;
		} else if (col.colspan && parseInt(col.colspan) > 1) {
			subInfo.er = rr;
			subInfo.ec = colid + parseInt(col.colspan) - 1;
		} else if (col.rowspan && parseInt(col.rowspan) > 1) {
			subInfo.er = rr + parseInt(col.rowspan) - 1;
			subInfo.ec = colid;
		} else {
			subInfo.er = rr;
			subInfo.ec = colid;
		}
		subInfo.qtb_tableName = resultInfo.subs[index].name;
		if (typeof grid.nestedTableArray == 'undefined') grid.nestedTableArray = [];
		grid.nestedTableArray.push(subInfo);
	}
}



//超链接信息
function setHyperLink(typeInfo, attribute) {
	attribute.leftLink.linkParam.value = typeInfo.url;
}
//右键菜单信息
function setMenuType(typeInfo, attribute) {
	// attribute.menu
}

// 英文字母的转换
Handsontable.Core.prototype.getRowHeadName = function(rowtype) {
	var cn = '';
	if (rowtype == 'title') {
		cn = '标题';
	}
	if (rowtype == 'header') {
		cn = '表头';
	}
	if (rowtype == 'data') {
		cn = '数据';
	}
	return cn;
}
Handsontable.Core.prototype.convert = function(n) {
	var s = '';
	while (n > 0) {
		var m = n % 26;
		if (m == 0) m = 26;
		s = String.fromCharCode(m + 64) + s;
		n = (n - m) / 26;
	}
	return s;
}
//初始化在线编辑区，新建模板或者加载在线编辑的模板时调用
function initWebEditArea(me) {
	//  var me = this;
	// 添加表达式编辑区
	//exp.id = "expdiv";
	var exp = document.createElement("div");
	me.exp = exp;
	exp.style.height = "30px";
	exp.style.border = " 1px solid rgba(0, 0, 0, .15)";
	var d1 = document.createElement("div");
	d1.className = "expdiv";
	exp.appendChild(d1);
	var input = document.createElement("input");
	//input.id = "expinput";
	me.expinput = input;
	input.className = "expinput";
	d1.appendChild(input);
	var btn = document.createElement("button");
	btn.className = "expbtn";
	d1.appendChild(btn);
	var exp1 = document.createElement("div");
	me.datasetExp = exp1;
	//exp1.id = "datasetExp";
	exp1.className = "expdiv";
	exp1.style.display = "none";
	exp.appendChild(exp1);
	var exp2 = document.createElement("div");
	me.valuediv = exp2;
	//exp2.id = "valuediv";
	exp2.className = "expdiv";
	exp2.style.display = "";
	exp.appendChild(exp2);
	var valueInput = document.createElement("input");
	me.valueInput = valueInput;
	//valueInput.id = "valueInput";
	valueInput.className = "exp_value_input";
	exp2.appendChild(valueInput);
	var lable = document.createElement("label");
	lable.innerHTML = "数据集：";
	lable.className = "explabel";
	exp1.appendChild(lable);
	var combods = document.createElement("select");
	//combods.id = "cmbDataset";
	me.cmbDataset = combods
	combods.className = "expcombobox";
	exp1.appendChild(combods);
	var opNone = document.createElement("option");
	opNone.innerHTML = "请选择...";
	opNone.selected = true;
	opNone.disabled = true;
	combods.appendChild(opNone);
	if (typeof xds == 'undefined') xds = parent.xds;
	var storeRoot = xds.vmd.getRootNode("dataset");
	storeRoot && storeRoot.eachChild(function(n) {
			var op = document.createElement("option");
			op._id = n.id;
			op.innerHTML = n.id;
			combods.appendChild(op);
		},
		this);
	var lable1 = document.createElement("label");
	lable1.innerHTML = "数据列：";
	lable1.className = "explabel";
	exp1.appendChild(lable1);
	var comboField = document.createElement("select");
	//comboField.id = "cmbFiled";
	me.cmbFiled = comboField
	comboField.className = "expcombobox";
	var opNone = document.createElement("option");
	opNone.innerHTML = "请选择...";
	opNone.selected = true;
	opNone.disabled = true;
	comboField.appendChild(opNone);
	exp1.appendChild(comboField);
	var lable2 = document.createElement("label");
	lable2.innerHTML = "数据设置：";
	lable2.className = "explabel";
	exp1.appendChild(lable2);
	var comboOpration = document.createElement("select");
	me.cmbOpration = comboOpration
	//comboOpration.id = "cmbOpration";
	comboOpration.className = "expcombobox";
	var opNone = document.createElement("option");
	opNone.innerHTML = "请选择...";
	opNone.selected = true;
	opNone.disabled = true;
	comboOpration.appendChild(opNone);
	var opSingle = document.createElement("option");
	opSingle._id = "单值";
	opSingle.innerHTML = "单值";
	comboOpration.appendChild(opSingle);
	var opSelect = document.createElement("option");
	opSelect._id = "列表";
	opSelect.innerHTML = "列表";
	comboOpration.appendChild(opSelect);
	var opGroup = document.createElement("option");
	opGroup._id = "分组";
	opGroup.innerHTML = "分组";
	comboOpration.appendChild(opGroup);
	exp1.appendChild(comboOpration);
	me.expEl.appendChild(exp);
	//this.el.appendChild(exp);
	// 数据集下拉框选项改变事件
	combods.addEventListener("change", function() {
		var name = this.value;
		if (name != "请选择...") {
			if (comboField.options.length > 0) {
				for (var i = comboField.options.length; i >= 1; i--) {
					comboField.options.remove(1);
				}
			}
			// 数据字段设置
			if (typeof xds == 'undefined') xds = parent.xds;
			var storeRoot = xds.vmd.getRootNode("dataset");
			var storeNode = storeRoot && storeRoot.findChildBy(function() {
				return this.id == name;
			});
			storeNode && storeNode.eachChild(function(c) {
				var op = document.createElement("option");
				op._id = c.text;
				op.innerHTML = c.text;
				comboField.appendChild(op);
			}, this);
			var selectCell = me.grid.dealInvert();
			var r = selectCell[0].sr;
			var c = selectCell[0].sc
			var cell;
			if (selectCell.length > 0) {
				cell = me.grid.getCellMeta(r, c);
			}
			if (cell) {
				if (cell.cellAttributeInfo)
					var value;
				switch (cell.cellAttributeInfo.opration) {
					case "single":
						value = "=" + name + "." + cell.cellAttributeInfo.field;
						break;
					case "select":
						value = "=" + name + ".Select(" + cell.cellAttributeInfo.field + ")";
						break;
					case "group":
						value = "=" + name + ".Group(" + cell.cell.cellAttributeInfo.field + ")";
						break;
				}
				cell.cellAttributeInfo.textValue.value = value;
				me.grid.setDataAtCell(r, c, value);
				cell.cellAttributeInfo.dataSet = name;
				me.grid.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
				me.grid.setCellMeta(r, c, 'theCellChanged', true)
			}
		}
	});
	combods.addEventListener("focus", function() {
		if (combods.options.length > 0) {
			for (var i = combods.options.length; i >= 1; i--) {
				combods.options.remove(1);
			}
		}
		if (typeof xds == 'undefined') xds = parent.xds;
		var storeRoot = xds.vmd.getRootNode("dataset");
		storeRoot && storeRoot.eachChild(function(n) {
				var op = document.createElement("option");
				op._id = n.id;
				op.innerHTML = n.id;
				combods.appendChild(op);
			},
			this);
	});
	//数据字段发生变化时
	comboField.addEventListener("change", function() {
		var name = this.value;
		if (name != "请选择...") {
			var selectCell = me.grid.dealInvert();
			var r = selectCell[0].sr;
			var c = selectCell[0].sc
			var cell;
			if (selectCell.length > 0) {
				cell = me.grid.getCellMeta(r, c);
			}
			if (cell) {
				if (cell.cellAttributeInfo)
					var value;
				switch (cell.cellAttributeInfo.opration) {
					case "single":
						value = "=" + cell.cellAttributeInfo.dataSet + "." + name;
						break;
					case "select":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Select(" + name + ")";
						break;
					case "group":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Group(" + name + ")";
						break;
				}
				cell.cellAttributeInfo.textValue.value = value;
				me.grid.setDataAtCell(r, c, value);
				cell.cellAttributeInfo.field = name;
				me.grid.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
				me.grid.setCellMeta(r, c, 'theCellChanged', true)
			}
		}
	});
	//数据设置发生变化时（单值、分组、列表等）
	comboOpration.addEventListener("change", function() {
		var name = this.value;
		if (name != "请选择...") {
			var selectCell = me.grid.dealInvert();
			var r = selectCell[0].sr;
			var c = selectCell[0].sc
			var cell;
			if (selectCell.length > 0) {
				cell = me.grid.getCellMeta(r, c);
			}
			if (cell) {
				if (cell.cellAttributeInfo)
					var value;
				switch (name) {
					case "单值":
						value = "=" + cell.cellAttributeInfo.dataSet + "." + cell.cellAttributeInfo.field;
						cell.cellAttributeInfo.opration = "single";
						me.grid.changeAttributeInfo(r, c, 'extraDirection', 1)
						break;
						tore, hs
					case "列表":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Select(" + cell.cellAttributeInfo.field + ")";
						cell.cellAttributeInfo.opration = "select";
						me.grid.changeAttributeInfo(r, c, 'extraDirection', 2)
						break;
					case "分组":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Group(" + cell.cellAttributeInfo.field + ")";
						cell.cellAttributeInfo.opration = "group";
						me.grid.changeAttributeInfo(r, c, 'extraDirection', 2)
						break;
				}
				cell.cellAttributeInfo.textValue.value = value;
				me.grid.setDataAtCell(r, c, value);
				me.grid.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
				me.grid.setCellMeta(r, c, 'theCellChanged', true)
			}
		}
	});
	// 表达式编辑区文本框
	valueInput.addEventListener("change", function() {
		var cell = me.grid.dealInvert();
		if (cell && cell.length > 0) {
			for (var i = 0; i < cell.length; i++) {
				var setData = [];
				var arrys = cell[i];
				for (var r = arrys.sr; r <= arrys.er; r++) {
					for (var c = arrys.sc; c <= arrys.ec; c++) {
						var sdata = [];
						var cellInfo = me.grid.getCellMeta(r, c);
						cellInfo.cellAttributeInfo.textValue.value = this.value;
						sdata.push(r);
						sdata.push(c);
						sdata.push(this.value);
						me.grid.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
						me.grid.setCellMeta(r, c, 'theCellChanged', true)
						setData.push(sdata);
					}
				}
				me.grid.setDataAtCell(setData);
			}
		}
	});
	window.openVisualEditor = function(flag, value) {
		// var aLotOfExpression;
		//Ext.Msg.alert("提示", "正在开发中", function () { })
		// 
		var cell = me.grid.dealInvert();
		var myurl;
		//判断是否需要打开界面就显示颜色选择器
		if (flag == 2 || flag == 3) {
			myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwSTxnY47C.html?color=' + true;
		} else {
			myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwSTxnY47C.html?color=' + false;
		}
		if (value == null) value = ''
		window.expWin = new vmd.window({
			url: myurl,
			auto: false,
			title: '表达式设置',
			height: 540,
			width: 702,
			modal: false,
			params: {
				expression: value
			},
			closeAction: 'hide'
		});
		window.BtnOk = function(exp) {

			//  
			if (cell && cell.length > 0) {
				for (var i = 0; i < cell.length; i++) {
					var setData = [];
					var arrys = cell[i];
					for (var r = arrys.sr; r <= arrys.er; r++) {
						for (var c = arrys.sc; c <= arrys.ec; c++) {
							var sdata = [];
							var cellInfo = me.grid.getCellMeta(r, c);
							switch (flag) {
								case 0:
									cellInfo.cellAttributeInfo.textValue.value = exp;
									//me.grid.setDataAtCell(r, c, exp);
									sdata.push(r);
									sdata.push(c);
									sdata.push(exp);
									setData.push(sdata);
									break;
								case 1:
									cellInfo.cellAttributeInfo.showValue.value = exp;
									parent.xds.eastlayout.reportInst.txtShowValue.setValue(exp);
									break;
								case 2:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_bgColor.value = exp;
									parent.xds.eastlayout.reportInst.nr_bgColor.setValue(exp);
									break;
								case 3:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_frontColor.value = exp;
									parent.xds.eastlayout.reportInst.nr_frontColor.setValue(exp);
									break;
								case 4:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_leftMargin.value = exp;
									parent.xds.eastlayout.reportInst.nr_leftMargin.setValue(exp);
									break;
								case 5:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_rowText.value = exp;
									parent.xds.eastlayout.reportInst.nr_rowText.setValue(exp);
									break;
								case 6:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_width.value = exp;
									parent.xds.eastlayout.reportInst.nr_width.setValue(exp);
									break;
								case 7:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_available.value = exp;
									parent.xds.eastlayout.reportInst.nr_available.setValue(exp);
									break;
								case 8:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_height.value = exp;
									parent.xds.eastlayout.reportInst.nr_height.setValue(exp);
									break;
								case 9:
									parent.xds.eastlayout.reportInst.hwReporting.re_expression.setValue(exp)
									break;
								case 'menuID':
									cellInfo.cellAttributeInfo.menu.menuID.value = exp;
									parent.xds.eastlayout.reportInst.hwLinkAndMenu.menuID.setValue(exp)
									parent.sheetHot.handleMenus('menuID', exp)
									break;
								case 'linkParam':

									cellInfo.cellAttributeInfo.leftLink.linkParam.value = exp;
									parent.xds.eastlayout.reportInst.hwLinkAndMenu.linkParam.setValue(exp)
									// parent.sheetHot.handleMenus('linkParam', exp)
									parent.sheetHot.changeAttributeInfo(r, c, 'linkParam', exp)
									break;
								case 'menuParam':

									cellInfo.cellAttributeInfo.menu.menuParam.value = exp;
									parent.xds.eastlayout.reportInst.hwLinkAndMenu.menuParam.setValue(exp)
									// parent.sheetHot.handleMenus('menuParam', exp)
									parent.sheetHot.changeAttributeInfo(r, c, 'menuParam', exp)
									break;
								case 'xlk':
									cellInfo.cellAttributeInfo.cell_ComboInfo.xlk_filterCondition.value = exp;
									parent.xds.eastlayout.reportInst.CellTypeProperty.ComboTypeProperty.hwData_xlk.data_filterCondition.setValue(exp)
									break;
								case 'dxan':
									cellInfo.cellAttributeInfo.cell_RadioButtonInfo.dxan_filterCondition.value = exp;
									parent.xds.eastlayout.reportInst.CellTypeProperty.RadioButtonProperty.hwData_xlk.data_filterCondition.setValue(exp)
									break;
								case 'fxk':
									cellInfo.cellAttributeInfo.cell_CheckBoxInfo.fxk_filterCondition.value = exp;
									parent.xds.eastlayout.reportInst.CellTypeProperty.CheckBoxProperty.hwData_xlk.data_filterCondition.setValue(exp)
									break;
							}
							me.grid.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
							me.grid.setCellMeta(r, c, 'theCellChanged', true)
						}
					}
					if (flag == 0) {
						me.grid.setDataAtCell(setData);
					}
				}
			}
		}
		window.expWin.show();
	}
	btn.addEventListener("click", function() {
		//   openVisualEditor(0, me.grid.selectCell.cell.innerText);
		var selectCell = me.grid.getSelected();
		var value = "";
		if (selectCell.length > 0) {
			value = me.grid.getDataAtCell(selectCell[0][0], selectCell[0][1]);
		}
		openVisualEditor(0, value);
	});
	me.flList = [];
	me.fpList = [];
	window.grid = me;
	window.setGridInfo = function(flobj, fpobj) {
		if (flobj) {
			var flag = false;
			var no;
			if (me.grid.flList.length > 0) {
				for (var key in me.grid.flList) {
					if (me.grid.flList[key].flSRow == flobj.flSRow &&
						me.grid.flList[key].flSCol == flobj.flSCol &&
						me.grid.flList[key].flECol == flobj.flECol &&
						me.grid.flList[key].flERow == flobj.flERow
					) {
						flag = true
						no = key;
					}
				}
			}
			if (flag) {
				me.grid.flList[no].seg_columnsNumber.value = flobj.seg_columnsNumber.value;
				me.grid.flList[no].seg_applyTo.value = flobj.seg_applyTo.value;
				me.grid.flList[no].seg_columnsMargin.value = flobj.seg_columnsMargin.value;
				me.grid.flList[no].seg_condition.value = flobj.seg_condition.value;
				me.grid.flList[no].seg_dividingLine.value = flobj.seg_dividingLine.value;
				me.grid.flList[no].seg_style.value = flobj.seg_style.value;
			} else {
				me.grid.flList.push(flobj)
			}
		}
		if (fpobj) {
			var flag = false;
			var no;
			if (me.grid.fpList.length > 0) {
				for (var key in me.grid.fpList) {
					if (me.grid.fpList[key].flSRow == fpobj.fpSRow &&
						me.grid.fpList[key].flSCol == fpobj.fpSCol &&
						me.grid.fpList[key].flECol == fpobj.fpECol &&
						me.grid.fpList[key].flERow == fpobj.fpERow
					) {
						flag = true
						no = key;
					}
				}
			}
			if (flag) {
				me.grid.fpList[no].seg_emptyCol.checked = fpobj.seg_emptyCol.checked;
				me.grid.fpList[no].seg_emptyRow.checked = fpobj.seg_emptyRow.checked;
				me.grid.fpList[no].seg_sliceName.value = fpobj.seg_sliceName.value;
				me.grid.fpList[no].seg_fp.checked = fpobj.seg_fp.checked;
			} else {
				me.grid.fpList.push(fpobj)
			}
		}
	};
}

Handsontable.Core.prototype.fullRowArray = function() {
	if (!this.rowHeadArray) this.rowHeadArray = [];
	for (var i = this.rowHeadArray.length; i < this.countRows(); i++) {
		this.rowHeadArray.push(i + 1)
	}
}
Handsontable.Core.prototype.fullColArray = function() {
	if (!this.colHeadArray) this.colHeadArray = [];
	for (var i = 0; i < this.countCols(); i++) {
		temp = this.numToEng(i);
		this.colHeadArray.push(temp)
	}
}
Handsontable.Core.prototype.fullRowHeightArray = function() {
	if (!this.rowHeadHeightArray) {
		this.rowHeadHeightArray = [];
		for (var i = 0; i < this.countRows(); i++) {
			this.rowHeadHeightArray.push(26)
		}
	}
}
Handsontable.Core.prototype.fullColWidthArray = function() {
	if (!this.colHeadWidthArray) {
		this.colHeadWidthArray = [];
		for (var i = 0; i < this.countCols(); i++) {
			this.colHeadWidthArray.push(80)
		}
	}
}
Handsontable.Core.prototype.isCell = function() {
	if (this.getCellMeta(0, 0).state == 'cell') {
		return false
	} else {
		return true
	}
}
// Handsontable.Core.prototype.isXML = function() {
// 	if (grid && grid.parent && grid.parent.indexOf('.xml') > -1) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }
Handsontable.Core.prototype.isCol = function() {
	if (this.getCellMeta(0, 0).state == 'row') {
		return false
	} else {
		return true
	}
}
Handsontable.Core.prototype.isRow = function() {
	if (this.getCellMeta(0, 0).state == 'col') {
		return false
	} else {
		return true
	}
}
Handsontable.Core.prototype.numToEng = function(colIndex) {
	var num = colIndex + 1;
	var stringName = "";
	if (num > 0) {
		if (num >= 1 && num <= 26) {
			stringName = String.fromCharCode(64 + parseInt(num));
		} else {
			while (num > 26) {
				var count = parseInt(num / 26);
				var remainder = num % 26;
				if (remainder == 0) {
					remainder = 26;
					count--;
					stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
				} else {
					stringName = String.fromCharCode(64 + parseInt(remainder)) + stringName;
				}
				num = count;
			}
			stringName = String.fromCharCode(64 + parseInt(num)) + stringName;
		}
	}
	return stringName;
}
Handsontable.Core.prototype.engToNum = function(value) {
	if (value) {
		var num = '';
		if (value.length == 1) {
			num = value.charCodeAt() - 64;
		}
		if (value.length == 2) {
			var p1 = value.charAt(0);
			var p2 = value.charAt(1);
			var count = p1.charCodeAt() - 64;
			num = (count * 26) + p2.charCodeAt() - 64;
		}
		return num;
	}
}

Handsontable.Core.prototype.handleMenus = function(id, value) {
	var cell = this.dealInvert()[0]
	if (cell.sr == cell.er && cell.sc == cell.ec) {
		var alreadySet = false;
		var no = null;
		var cellName = '' + this.numToEng(cell.sc) + (cell.sr + 1)
		for (var i = 0; i < this.menus.length; i++) {
			if (cellName == this.menus[i].cellName) {
				no = i;
				alreadySet = true;
				break;
			}
		}
		if (alreadySet) {
			switch (id) {
				case 'id':
					this.menus[no].id = value;
					break;
				case 'params':
					this.menus[no].params = value;
					break;
				case 'source':
					this.menus[no].source = value;
					break;
				case 'sets':
					this.menus[no].sets = value;
					break;
				case 'event':
					this.menus[no].event = value;
					break;
				case 'pid':
					this.menus[no].pid = value;
					break;
				case 'text':
					this.menus[no].text = value;
					break;
			}
			this.setInfoMenu(cell, this.menus[no]);
		} else {
			var obj = {
				id: '',
				params: '',
				source: '1',
				sets: '',
				event: '',
				pid: '',
				text: '',
				cellName: cellName
			}
			obj[id] = value;
			this.menus.push(obj)
			// this.setInfoMenu(cell, this.menus[no]);
		}
	}
}
Handsontable.Core.prototype.setInfoMenu = function(arrys, menu) {
	for (var r = arrys.sr; r <= arrys.er; r++) {
		for (var c = arrys.sc; c <= arrys.ec; c++) {
			var sdata = [];
			var cellInfo = this.getCellMeta(r, c);
			cellInfo.cellAttributeInfo.menu.menuID.value = menu.id;
			cellInfo.cellAttributeInfo.menu.menuParam.value = menu.params;
			cellInfo.cellAttributeInfo.menu.menuSource.value = menu.source;
			cellInfo.cellAttributeInfo.menu.menuDataset.value = menu.sets;
			//attribute.menu.cmbMenuID.value = menu.cmbMenuID;
			cellInfo.cellAttributeInfo.menu.menuChoose.checked = menu.choose;
			cellInfo.cellAttributeInfo.menu.menuPID.value = menu.pid;
			cellInfo.cellAttributeInfo.menu.menuText.value = menu.text;
			this.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
			this.setCellMeta(r, c, 'theCellChanged', true)
		}
	}
}

window.openVisualSelector = function(data, data1, urlCode, filter) {
	var myurl;
	if (typeof filter == 'undefined') {
		myurl = '/system/modules/eQ9ULgcVb1/hwYa3IA0Y1/hwHCHpNfHv/hw1c3f0610.html'
	} else {
		myurl = '/system/modules/eQ9ULgcVb1/hwYa3IA0Y1/hwHCHpNfHv/hwfSA4EDtH.html'
	}
	if (data) {
		// 创建一个新窗口（有url指向） 
		window.selectorWin = new vmd.window({
			url: myurl,
			title: '下拉显示列显示字段选择',
			enableLoading: true, //启用进度加载
			width: 780,
			height: 480,
			auto: false, //auto为true 自动适应窗口，配合offset使用
			params: {
				data: data,
				data1: data1,
				type: urlCode
			} //url中追加的编码的参数，json格式 
		})
		window.selectorWin.show(); //窗口显示
		window.selectorWin.close = function(result, urlCode, filter) {
			if (result) {
				var temp = ""
				for (var i = 0; i < result.length; i++) {
					if (i == 0) {
						temp = result[0].name.toString();
					} else {
						temp += "," + result[i].name.toString()
					}
				}
				if (filter) {
					switch (urlCode) {
						case "xlwg":
							xds.eastlayout.reportInst.CellTypeProperty.hwDropDownGridProperty.hwData_xlk.data_filterCondition.setValue(temp)
							sheetHot.filterInfoToCell(result, 'xlwg', temp);
							break;
						case "xlk":
							xds.eastlayout.reportInst.CellTypeProperty.ComboTypeProperty.hwData_xlk.data_filterCondition.setValue(temp)
							sheetHot.filterInfoToCell(result, 'xlk', temp);
							break;
						case "dxan":
							xds.eastlayout.reportInst.CellTypeProperty.RadioButtonProperty.hwData_xlk.data_filterCondition.setValue(temp)
							sheetHot.filterInfoToCell(result, 'dxan', temp);
							break;
						case "xls":
							xds.eastlayout.reportInst.CellTypeProperty.DropDownTreeProperty.Data_xls.filter_xls.setValue(temp)
							sheetHot.filterInfoToCell(result, 'xls', temp);
							break;
					}
				} else {
					switch (urlCode) {
						case "xlwg":
							xds.eastlayout.reportInst.CellTypeProperty.hwDropDownGridProperty.hwData_xlk.data_dropDownDisplayColumn.setValue(temp)
							sheetHot.dataInfoToCell(result, 'xlwg', temp);
							break;

					}
				}
				window.selectorWin.hide() //窗口隐藏 
			} else {
				window.selectorWin.hide() //窗口隐藏 
			}
		}
	}
}
Handsontable.Core.prototype.filterInfoToCell = function(result, type, value) {
	var cell = this.dealInvert()[0];
	for (var i = cell.sr; i < cell.er + 1; i++) {
		for (var n = cell.sc; n < cell.ec + 1; n++) {
			this.setCellMeta(i, n, 'filterInfo' + '_' + type, result)
			var cellInfo = this.getCellMeta(i, n).cellAttributeInfo;
			switch (type) {
				case 'xlwg':
					cellInfo.cell_ddg.ddg_filterCondition.value = value;
					break;
				case 'dxan':
					cellInfo.cell_RadioButtonInfo.dxan_filterCondition.value = value;
					break;
				case 'xlk':
					cellInfo.cell_ComboInfo.xlk_filterCondition.value = value;
					break;
				case 'xls':
					cellInfo.cell_DropDownTreeInfo.filter_xls.value = value;
					break;
			}
		}
	}
}
Handsontable.Core.prototype.dataInfoToCell = function(result, type, value) {
	var cell = this.dealInvert()[0];
	for (var i = cell.sr; i < cell.er + 1; i++) {
		for (var n = cell.sc; n < cell.ec + 1; n++) {
			this.setCellMeta(i, n, 'dataInfo' + '_' + type, result)
			var cellInfo = this.getCellMeta(i, n).cellAttributeInfo;
			switch (type) {
				case 'xlwg':
					cellInfo.cell_ddg.ddg_dropDownDisplayColumn.value = value;
					// .cell_DropDownTreeInfo.xlk_dropDownDisplayColumn.value = value;
					break;
			}
		}
	}
}
//设置单元格属性信息
function setCellType(cellType, col, attribute, r, c, grid, resultInfo) {
	var index = parseInt(col.fillcelltype);
	if (index > 0 && cellType) {
		var ctype = cellType[index];
		switch (ctype.type) {
			case "HyperLink":
				setHyperLink(ctype, attribute);
				break;
			case "id":
				setIdType(ctype, attribute)
				break;
			case "menu":
				setMenuType(ctype, attribute)
				break;
			case "Text":
				setTextInfo(ctype, attribute);
				break;
			case "order":
				setOrderType(ctype, attribute);
				break;
			case "guid":
				setGuidType(ctype, attribute);
				break;
			case "PassWord":
				setPasswordType(ctype, attribute)
				break;
			case "Number":
				setNumberType(ctype, attribute)
				break;
			case "Combox":
				setComboType(ctype, attribute, r, c, grid)
				break;
			case "dropdowntree":
				setDropDownTreeType(ctype, attribute, r, c, grid)
				break;
			case "vmdgrid":
				setDropDownGridType(ctype, attribute, r, c, grid)
				break;
			case "RadioGroup":
				setRadioGroupType(ctype, attribute, r, c, grid)
				break;
			case "CheckBoxGroup":
				setCheckBoxType(ctype, attribute, r, c, grid)
				break;
			case "UpLoad":
				setUpLoadType(ctype, attribute, r, c, grid)
				break;
			case "Approval":
				setApprovalType(ctype, attribute, r, c, grid)
				break;
			case "Date":
				setDateType(ctype, attribute, r, c, grid)
				break;
			case "Button":
				setButtonType(ctype, attribute, r, c, grid);
				break;
			case "SubRpt":
				setNestedType(ctype, attribute, r, c, grid)
				break;
			case "tx":

				break;
			case "jdt":

				break;
			case "RichEdit":
				setRichEditType(ctype, attribute)
				break;
		}
	} else {
		if (col.fillcelltype && cellType) {
			var ctype = cellType[col.fillcelltype];
			setNestedType(ctype, attribute)
			grid.setCellMeta(r, c, 'readOnly', true)
			//to be continue
		}
	}
}

setNestedType = function(ctype, attribute) {
	attribute.contentInfo.cmbType.value = 'qtb';
	if (ctype) {
		attribute.cell_NestedTableInfo.qtb_template.value = ctype.subrptpath
		// attribute.cell_NestedTableInfo.qtb_style.value = ctype.spread
		attribute.cell_NestedTableInfo.qtb_tableName.value = ctype.subrptname
		if (ctype.spread == '1') {
			attribute.cell_NestedTableInfo.qtb_unfold.checked = true;
		} else {
			attribute.cell_NestedTableInfo.qtb_unfold.checked = false;
		}
		if (ctype.subrptshowmode == 'embed') {
			attribute.cell_NestedTableInfo.qtb_style.value = '0'
		} else {
			attribute.cell_NestedTableInfo.qtb_style.value = '1'
		}
	}
}

function setIdType(ctype, attribute) {
	attribute.contentInfo.cmbType.value = 'wb'
	attribute.cell_TextInfo.wb_allType.value = 'id'
	attribute.cell_TextInfo.wb_id_length.value = ctype.length
	attribute.cell_TextInfo.wb_id_emptyAlert.value = ctype.emptydisplay
	if (typeof ctype.isallownull == 'undefined' || ctype.isallownull == '1') {
		ctype.isallownull = true
	} else if (ctype.isallownull == '0') {
		ctype.isallownull = false;
	}
	attribute.cell_TextInfo.wb_id_allowEmpty.checked = ctype.isallownull
}

// 解析文本-文本类型
function setTextInfo(ctype, attribute) {
	attribute.contentInfo.cmbType.value = 'wb'
	attribute.cell_TextInfo.wb_allType.value = "wb";
	if (typeof ctype.ismultiline == 'undefined' || ctype.ismultiline == '0') {
		ctype.ismultiline = false;
	} else if (ctype.ismultiline == '1') {
		ctype.ismultiline = true;
	}
	if (typeof ctype.isenableedit == 'undefined' || ctype.isenableedit == '1') {
		ctype.isenableedit = true;
	} else if (ctype.isenableedit == '0') {
		ctype.isenableedit = false;
	}
	if (typeof ctype.isallownull == 'undefined' || ctype.isallownull == '1') {
		ctype.isallownull = true;
	} else if (ctype.isallownull == '0') {
		ctype.isallownull = false;
	}
	if (typeof ctype.isprint == 'undefined' || ctype.isprint == '1') {
		ctype.isprint = true;
	} else if (ctype.isprint == '0') {
		ctype.isprint = false;
	}
	if (typeof ctype.ischar == 'undefined' || ctype.ischar == '0') {
		ctype.ischar = false;
	} else if (ctype.ischar == '1') {
		ctype.ischar = true;
	}
	
	// text.regexp = cell.wb_rule_regexp.value;
	attribute.cell_TextInfo.wb_text_fillRules.value = ctype.fillrule
	attribute.cell_TextInfo.wb_text_allowRows.checked = ctype.ismultiline
	attribute.cell_TextInfo.wb_text_symbol.checked = ctype.ischar
	attribute.cell_TextInfo.wb_text_allowEdit.checked = ctype.isenableedit
	attribute.cell_TextInfo.wb_text_allowEmpty.checked = ctype.isallownull
	attribute.cell_TextInfo.wb_text_allowPrint.checked = ctype.isprint
	attribute.cell_TextInfo.wb_text_emptyAlert.value = ctype.emptydisplay
	attribute.cell_TextInfo.wb_rule_charExp.value = ctype.charexp||ctype.regexp
	attribute.cell_TextInfo.wb_rule_min.value = ctype.minlen
	attribute.cell_TextInfo.wb_rule_max.value = ctype.maxlen
	attribute.cell_TextInfo.wb_rule_phoneType.value = ctype.tellformart
	// attribute.cell_TextInfo.wb_rule_regexp.value = ctype.regexp
}

function setOrderType(ctype, attribute) {
	attribute.contentInfo.cmbType.value = 'wb'
	attribute.cell_TextInfo.wb_allType.value = "xh";
	if (typeof ctype.isprint == 'undefined' || ctype.isprint == '1') {
		ctype.isprint = true
	} else if (ctype.isprint == '0') {
		ctype.isprint = false;
	}
	if (typeof ctype.isallownull == 'undefined' || ctype.isallownull == '1') {
		ctype.isallownull = true
	} else if (ctype.isallownull == '0') {
		ctype.isallownull = false;
	}
	attribute.cell_TextInfo.wb_no_allowPrint.checked = ctype.isprint;
	attribute.cell_TextInfo.wb_no_allowEmpty.checked = ctype.isallownull;
	attribute.cell_TextInfo.wb_no_emptyAlert.value = ctype.emptydisplay;
}

function setGuidType(ctype, attribute) {
	attribute.contentInfo.cmbType.value = 'wb'
	if (typeof ctype.isallownull == 'undefined' || ctype.isallownull == '1') {
		ctype.isallownull = true
	} else if (ctype.isallownull == '0') {
		ctype.isallownull = false;
	}
	attribute.cell_TextInfo.wb_allType.value = "guid";
	attribute.cell_TextInfo.wb_guid_allowEmpty.checked = ctype.isallownull;
	attribute.cell_TextInfo.wb_guid_emptyAlert.value = ctype.emptydisplay;
	attribute.cell_TextInfo.wb_guid_length.value = ctype.length
	// attribute.cell_TextInfo. ctype.isenableedit
	// attribute.cell_TextInfo. ctype.isprint
	// attribute.cell_TextInfo. ctype.errordisplay
	// attribute.cell_TextInfo. ctype.editcondition
}

function setPasswordType(ctype, attribute) {
	attribute.contentInfo.cmbType.value = 'wb'
	attribute.cell_TextInfo.wb_allType.value = "mm";
	if (typeof ctype.isenableedit == 'undefined' || ctype.isenableedit == '1') {
		ctype.isenableedit = true
	} else if (ctype.isenableedit == '0') {
		ctype.isenableedit = false;
	}
	if (typeof ctype.isprint == 'undefined' || ctype.isprint == '1') {
		ctype.isprint = true
	} else if (ctype.isprint == '0') {
		ctype.isprint = false;
	}
	if (typeof ctype.isallownull == 'undefined' || ctype.isallownull == '1') {
		ctype.isallownull = true
	} else if (ctype.isallownull == '0') {
		ctype.isallownull = false;
	}
	attribute.cell_TextInfo.wb_password_allowEdit.checked = ctype.isenableedit;
	attribute.cell_TextInfo.wb_password_allowPrint.checked = ctype.isprint;
	attribute.cell_TextInfo.wb_password_allowEmpty.checked = ctype.isallownull;
	attribute.cell_TextInfo.wb_password_emptyAlert.value = ctype.emptydisplay;
}

function setNumberType(ctype, attribute) {
	attribute.contentInfo.cmbType.value = "sz";
	attribute.cell_NumberInfo.sz_allowEdit.checked = ctype.isenableedit
	attribute.cell_NumberInfo.sz_allowEmpty.checked = ctype.isallownull
	attribute.cell_NumberInfo.sz_allowFloat.checked = ctype.isdecimal
	attribute.cell_NumberInfo.sz_allowNegative.checked = ctype.isnegative
	attribute.cell_NumberInfo.sz_allowPrint.checked = ctype.isprint
	attribute.cell_NumberInfo.sz_decimalPoints.value = ctype.decimalnumbers
	attribute.cell_NumberInfo.sz_emptyAlert.value = ctype.emptydisplay
	attribute.cell_NumberInfo.sz_limit.checked = ctype.islimit
	attribute.cell_NumberInfo.sz_max.checked = ctype.maxvalue
	attribute.cell_NumberInfo.sz_min.checked = ctype.minvalue
	attribute.cell_NumberInfo.sz_maxValue.value = ctype.max;
	attribute.cell_NumberInfo.sz_minValue.value = ctype.min;
}

function setComboType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = "xlk";
	attribute.cell_ComboInfo.noValueClear.checked = ctype.noValueClear || false
	attribute.cell_ComboInfo.xlk_allowEdit.checked = ctype.isenableedit
	attribute.cell_ComboInfo.xlk_allowPrint.checked = ctype.isprint
	attribute.cell_ComboInfo.xlk_height.value = ctype.height;
	attribute.cell_ComboInfo.xlk_separator.value = ctype.separator;
	attribute.cell_ComboInfo.xlk_ismulti.checked = ctype.ismulti;
	attribute.cell_ComboInfo.xlk_myWidth.value = ctype.width
	attribute.cell_ComboInfo.xlk_allowEmpty.checked = ctype.isallownull
	attribute.cell_ComboInfo.xlk_emptyAlert.value = ctype.emptydisplay
	attribute.cell_ComboInfo.xlk_saveFiled.value = ctype.bindsource.valuecolumn
	if (grid) {
		var transed = grid.transformDsName(ctype.bindsource.tablename)
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_ComboInfo.xlk_dataSet.value = transed.dataname.factname
		} else {
			attribute.cell_ComboInfo.xlk_dataSet.value = ctype.bindsource.tablename
		}

		attribute.cell_ComboInfo.xlk_myDisplayFiled.value = ctype.bindsource.showcolumn
		if (ctype && ctype.bindsource && ctype.bindsource.conditions) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
				obj.push({
					name: ctype.bindsource.conditions[i].field,
					value: ctype.bindsource.conditions[i].value
				})
				if (i == 0) {
					temp += ctype.bindsource.conditions[i].field
				} else {
					temp += "," + ctype.bindsource.conditions[i].field
				}
			}
			grid.setCellMeta(row, col, 'filterInfo_xlk', obj)
			attribute.cell_ComboInfo.xlk_filterCondition.value = temp
		}
	} else {
		var transed = design.transformDsName(ctype.bindsource.tablename)
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_ComboInfo.xlk_dataSet.value = transed.dataname.factname
		} else {
			attribute.cell_ComboInfo.xlk_dataSet.value = ctype.bindsource.tablename
		}

		attribute.cell_ComboInfo.xlk_myDisplayFiled.value = ctype.bindsource.showcolumn
		if (ctype && ctype.bindsource && ctype.bindsource.conditions) {
			var obj = [];
			var temp = '';
			for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
				obj.push({
					name: ctype.bindsource.conditions[i].field,
					value: ctype.bindsource.conditions[i].value
				})
				if (i == 0) {
					temp += ctype.bindsource.conditions[i].field
				} else {
					temp += "," + ctype.bindsource.conditions[i].field
				}
			}
			attribute.cell_ComboInfo.xlk_filterCondition.value = temp
		}
		initInfo.filter.push({
			row: row,
			col: col,
			name: 'filterInfo_xlk',
			value: obj
		})
	}

}

function setRadioGroupType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = "dxan";
	attribute.cell_RadioButtonInfo.dxan_allowEdit.checked = ctype.isenableedit
	attribute.cell_RadioButtonInfo.dxan_allowPrint.checked = ctype.isprint
	attribute.cell_RadioButtonInfo.dxan_auto.checked = ctype.autolayout
	attribute.cell_RadioButtonInfo.dxan_displayRows.value = ctype.colcount
	attribute.cell_RadioButtonInfo.dxan_rowMargin.value = ctype.linespace
	attribute.cell_RadioButtonInfo.dxan_displayType.checked = ctype.displaystyle
	if (ctype && ctype.bindsource) {
		if (grid) {
			var transed = grid.transformDsName(ctype.bindsource.tablename)
			if (transed && transed.dataname && transed.dataname.factname) {
				attribute.cell_RadioButtonInfo.dxan_dataSet.value = transed.dataname.factname
			} else {
				attribute.cell_RadioButtonInfo.dxan_dataSet.value = ctype.bindsource.tablename
			}
			attribute.cell_RadioButtonInfo.dxan_saveFiled.value = ctype.bindsource.valuecolumn
			attribute.cell_RadioButtonInfo.dxan_myDisplayFiled.value = ctype.bindsource.showcolumn
			// attribute.cell_RadioButtonInfo.dxan_filterCondition.value = ctype.bindsource.condition

			if (ctype.bindsource.conditions) {
				var obj = [];
				var temp = '';
				for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
					obj.push({
						name: ctype.bindsource.conditions[i].field,
						value: ctype.bindsource.conditions[i].value
					})
					if (i == 0) {
						temp += ctype.bindsource.conditions[i].field
					} else {
						temp += "," + ctype.bindsource.conditions[i].field
					}
				}
				grid.setCellMeta(row, col, 'filterInfo_dxan', obj)
				attribute.cell_RadioButtonInfo.dxan_filterCondition.value = temp
			}
		} else {
			var transed = design.transformDsName(ctype.bindsource.tablename)
			if (transed && transed.dataname && transed.dataname.factname) {
				attribute.cell_RadioButtonInfo.dxan_dataSet.value = transed.dataname.factname
			} else {
				attribute.cell_RadioButtonInfo.dxan_dataSet.value = ctype.bindsource.tablename
			}
			attribute.cell_RadioButtonInfo.dxan_saveFiled.value = ctype.bindsource.valuecolumn
			attribute.cell_RadioButtonInfo.dxan_myDisplayFiled.value = ctype.bindsource.showcolumn
			// attribute.cell_RadioButtonInfo.dxan_filterCondition.value = ctype.bindsource.condition

			if (ctype.bindsource.conditions) {
				var obj = [];
				var temp = '';
				for (var i = 0; i < ctype.bindsource.conditions.length; i++) {
					obj.push({
						name: ctype.bindsource.conditions[i].field,
						value: ctype.bindsource.conditions[i].value
					})
					if (i == 0) {
						temp += ctype.bindsource.conditions[i].field
					} else {
						temp += "," + ctype.bindsource.conditions[i].field
					}
				}
				// grid.setCellMeta(row, col, 'filterInfo_dxan', obj)
				initInfo.filter.push({
					row: row,
					col: col,
					name: 'filterInfo_dxan',
					value: obj
				})
				attribute.cell_RadioButtonInfo.dxan_filterCondition.value = temp
			}
		}
	}
}

function setCheckBoxType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = "fxk";
	attribute.cell_CheckBoxInfo.fxk_separator.value = ctype.separator;
	attribute.cell_CheckBoxInfo.fxk_starter.value = ctype.startchar;
	attribute.cell_CheckBoxInfo.fxk_ender.value = ctype.endchar;
	attribute.cell_CheckBoxInfo.fxk_allowEdit.checked = ctype.isenableedit;
	attribute.cell_CheckBoxInfo.fxk_allowPrint.checked = ctype.isprint;
	attribute.cell_CheckBoxInfo.fxk_proveAll.checked = ctype.isallselect;
	attribute.cell_CheckBoxInfo.fxk_proveOther.checked = ctype.isother;
	attribute.cell_CheckBoxInfo.fxk_mutilGroup.checked = ctype.multigroup;
	attribute.cell_CheckBoxInfo.fxk_auto.checked = ctype.autolayout;
	attribute.cell_CheckBoxInfo.fxk_rowMargin.value = ctype.linespace;
	attribute.cell_CheckBoxInfo.fxk_displayCol.value = ctype.displaystyle;
	attribute.cell_CheckBoxInfo.fxk_allowEmpty.checked = ctype.isallownull;
	attribute.cell_CheckBoxInfo.fxk_emptyAlert.value = ctype.emptydisplay;

	if (ctype && ctype.bindsource) {
		var transed;
		if (grid) {
			transed = grid.transformDsName(ctype.bindsource.tablename)
		} else {
			transed = design.transformDsName(ctype.bindsource.tablename)
		}
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_CheckBoxInfo.fxk_dataSet.value = transed.dataname.factname
		} else {
			attribute.cell_CheckBoxInfo.fxk_dataSet.value = ctype.bindsource.tablename
		}

		attribute.cell_CheckBoxInfo.fxk_saveFiled.value = ctype.bindsource.valuecolumn
		attribute.cell_CheckBoxInfo.fxk_myDisplayFiled.value = ctype.bindsource.showcolumn
		attribute.cell_CheckBoxInfo.fxk_filterCondition.value = ctype.bindsource.condition
	}
}

function setUpLoadType(ctype, attribute, row, col, grid, initInfo, design) {
	attribute.contentInfo.cmbType.value = "sczj";
	if (ctype.filetype == 'word') {
		attribute.cell_UploadInfo.sczj_Type.value = 0;
	} else {
		attribute.cell_UploadInfo.sczj_Type.value = 1;
	}

	attribute.cell_UploadInfo.sczj_max.value = ctype.uploadnumer;
	attribute.cell_UploadInfo.sczj_everyRow.value = ctype.colexp;
	attribute.cell_UploadInfo.sczj_everyPage.value = ctype.pageexp;
	attribute.cell_UploadInfo.sczj_add.checked = ctype.add;
	attribute.cell_UploadInfo.sczj_delete.checked = ctype.delete;
	attribute.cell_UploadInfo.sczj_addText.value = ctype.enableadd;
	attribute.cell_UploadInfo.sczj_deleteText.value = ctype.enabledelete;
	attribute.cell_UploadInfo.sczj_display.value = ctype.showmode;
	// upload.wordMode = cell.sczj_wdk.checked
	attribute.cell_UploadInfo.sczj_wdk.checked = ctype.wordMode;

	if (ctype && ctype.bindsource) {
		attribute.cell_UploadInfo.sczj_dataId.value = ctype.bindsource.docid
		attribute.cell_UploadInfo.sczj_dataName.value = ctype.bindsource.filename
		attribute.cell_UploadInfo.sczj_dataPath.value = ctype.bindsource.filepath
		var transed;
		if (grid) {
			transed = grid.transformDsName(ctype.bindsource.tablename);
		} else {
			transed = design.transformDsName(ctype.bindsource.tablename)
		}
		if (transed && transed.dataname && transed.dataname.factname) {
			attribute.cell_UploadInfo.sczj_dataSet.value = transed.dataname.factname
		} else {
			attribute.cell_UploadInfo.sczj_dataSet.value = ctype.bindsource.tablename
		}

		attribute.cell_UploadInfo.sczj_dataSize.value = ctype.bindsource.filesize
		attribute.cell_UploadInfo.sczj_dataType.value = ctype.bindsource.fileext
	}
}

function setRichEditType(ctype, attribute) {
	attribute.contentInfo.cmbType.value = "fwb";
	attribute.cell_RichTextInfo.fwb_indent.value = ctype.firstindent
	attribute.cell_RichTextInfo.fwb_allowEdit.checked = ctype.isenableedit
	attribute.cell_RichTextInfo.fwb_allowPrint.checked = ctype.isprint
	attribute.cell_RichTextInfo.fwb_allowEmpty.checked = ctype.isallownull
	attribute.cell_RichTextInfo.fwb_emptyAlert.value = ctype.emptydisplay
}

function setApprovalType(ctype, attribute, row, col, grid, initInfo, design) {

	attribute.contentInfo.cmbType.value = "spzj";
	var cell = attribute.cell_ApprovlInfo;
	cell.spzj_allowEdit.checked = ctype.isenableedit
	cell.spzj_allowPrint.checked = ctype.isprint

	var ct0 = ctype.Items[0];
	var ct1 = ctype.Items[1];
	var ct2 = ctype.Items[2];
	var ct3 = ctype.Items[3];
	var ct4 = ctype.Items[4];
	var ct5 = ctype.Items[5];
	var ct6 = ctype.Items[6];
	var ct7 = ctype.Items[7];

	cell.spzj_spbm_display.checked = ct0.isshow
	cell.spzj_spbm_bmmc.value = ct0.value
	cell.spzj_spbm_bqmc.value = ct0.labelvalue
	cell.spzj_spbm_x.value = ct0.x
	cell.spzj_spbm_y.value = ct0.y
	cell.spzj_spbm_width.value = ct0.width
	cell.spzj_spbm_height.value = ct0.height
	cell.spzj_spbm_fontFamily.value = ct0.fontname;
	cell.spzj_spbm_fontSize.value = ct0.fontsize;
	cell.spzj_spbm_fontStyle.value = ct0.italic;
	cell.spzj_spbm_underLine.value = ct0.underline;
	cell.spzj_spbm_color.value = ct0.fontcolor;
	cell.spzj_spbm_fontWeight.value = ct0.fontweight
	cell.spzj_spbm_font.value = ct0.font
	// cell.spzj_spbm_mark.value = ct0.mark

	cell.spzj_spyj_display.checked = ct1.isshow
	cell.spzj_spyj_yjnr.value = ct1.value
	cell.spzj_spyj_bqmc.value = ct1.labelvalue
	cell.spzj_spyj_x.value = ct1.x
	cell.spzj_spyj_y.value = ct1.y
	cell.spzj_spyj_width.value = ct1.width
	cell.spzj_spyj_height.value = ct1.height
	cell.spzj_spyj_fontFamily.value = ct1.fontname
	cell.spzj_spyj_fontSize.value = ct1.fontsize
	cell.spzj_spyj_fontStyle.value = ct1.italic
	cell.spzj_spyj_underLine.value = ct1.underline
	cell.spzj_spyj_color.value = ct1.fontcolor
	cell.spzj_spyj_fontWeight.value = ct1.fontweight
	cell.spzj_spyj_font.value = ct1.font
	// cell.spzj_spyj_mark.value = ct1.mark

	cell.spzj_spz_display.checked = ct2.isshow
	cell.spzj_spz_tply.value = ct2.src
	cell.spzj_spz_bqmc.value = ct2.labelvalue
	cell.spzj_spz_x.value = ct2.x
	cell.spzj_spz_y.value = ct2.y
	cell.spzj_spz_width.value = ct2.width
	cell.spzj_spz_height.value = ct2.height
	cell.spzj_spz_fontFamily.value = ct2.fontname
	cell.spzj_spz_fontSize.value = ct2.fontsize
	cell.spzj_spz_fontStyle.value = ct2.italic
	cell.spzj_spz_underLine.value = ct2.underline
	cell.spzj_spz_color.value = ct2.fontcolor
	cell.spzj_spz_fontWeight.value = ct2.fontweight
	cell.spzj_spz_font.value = ct2.font
	// cell.spzj_spz_mark.value = ct2.mark

	cell.spzj_spr_display.checked = ct3.isshow
	cell.spzj_spr_spr.value = ct3.value
	cell.spzj_spr_bqmc.value = ct3.labelvalue
	cell.spzj_spr_x.value = ct3.x
	cell.spzj_spr_y.value = ct3.y
	cell.spzj_spr_width.value = ct3.width
	cell.spzj_spr_height.value = ct3.height
	cell.spzj_spr_qmzp.value = ct3.namepicture
	cell.spzj_spr_fontFamily.value = ct3.fontname
	cell.spzj_spr_fontSize.value = ct3.fontsize
	cell.spzj_spr_fontStyle.value = ct3.italic
	cell.spzj_spr_underLine.value = ct3.underline
	cell.spzj_spr_color.value = ct3.fontcolor
	cell.spzj_spr_fontWeight.value = ct3.fontweight
	cell.spzj_spr_font.value = ct3.font
	// cell.spzj_spr_mark.value = ct3.mark

	cell.spzj_sprq_display.checked = ct4.isshow
	cell.spzj_sprq_sprq.value = ct4.value
	cell.spzj_sprq_bqmc.value = ct4.labelvalue
	cell.spzj_sprq_x.value = ct4.x
	cell.spzj_sprq_y.value = ct4.y
	cell.spzj_sprq_width.value = ct4.width
	cell.spzj_sprq_height.value = ct4.height
	cell.spzj_sprq_rqgs.value = ct4.dateformat
	cell.spzj_sprq_fontFamily.value = ct4.fontname
	cell.spzj_sprq_fontSize.value = ct4.fontsize
	cell.spzj_sprq_fontStyle.value = ct4.italic
	cell.spzj_sprq_underLine.value = ct4.underline
	cell.spzj_sprq_color.value = ct4.fontcolor
	cell.spzj_sprq_fontWeight.value = ct4.fontweight
	cell.spzj_sprq_font.value = ct4.font
	// cell.spzj_sprq_mark.value = ct4.mark

	cell.spzj_ty_display.checked = ct5.isshow
	cell.spzj_ty_spjg.value = ct5.value
	cell.spzj_ty_bqmc.value = ct5.labelvalue
	cell.spzj_ty_x.value = ct5.x
	cell.spzj_ty_y.value = ct5.y
	cell.spzj_ty_width.value = ct5.width
	cell.spzj_ty_height.value = ct5.height
	cell.spzj_ty_fontFamily.value = ct5.fontname
	cell.spzj_ty_fontSize.value = ct5.fontsize
	cell.spzj_ty_fontStyle.value = ct5.italic
	cell.spzj_ty_underLine.value = ct5.underline
	cell.spzj_ty_color.value = ct5.fontcolor
	cell.spzj_ty_fontWeight.value = ct5.fontweight
	cell.spzj_ty_font.value = ct5.font
	// cell.spzj_ty_mark.value = ct5.mark

	cell.spzj_bty_display.checked = ct6.isshow
	cell.spzj_bty_spjg.value = ct6.value
	cell.spzj_bty_bqmc.value = ct6.labelvalue
	cell.spzj_bty_x.value = ct6.x
	cell.spzj_bty_y.value = ct6.y
	cell.spzj_bty_width.value = ct6.width
	cell.spzj_bty_height.value = ct6.height
	cell.spzj_bty_fontFamily.value = ct6.fontname
	cell.spzj_bty_fontSize.value = ct6.fontsize
	cell.spzj_bty_fontStyle.value = ct6.italic
	cell.spzj_bty_underLine.value = ct6.underline
	cell.spzj_bty_color.value = ct6.fontcolor
	cell.spzj_bty_fontWeight.value = ct6.fontweight
	cell.spzj_bty_font.value = ct6.font
	// cell.spzj_bty_mark.value = ct6.mark

	cell.spzj_th_display.checked = ct7.isshow
	cell.spzj_th_spjg.value = ct7.value
	cell.spzj_th_bqmc.value = ct7.labelvalue
	cell.spzj_th_x.value = ct7.x
	cell.spzj_th_y.value = ct7.y
	cell.spzj_th_width.value = ct7.width
	cell.spzj_th_height.value = ct7.height
	cell.spzj_th_fontFamily.value = ct7.fontname
	cell.spzj_th_fontSize.value = ct7.fontsize
	cell.spzj_th_fontStyle.value = ct7.italic
	cell.spzj_th_underLine.value = ct7.underline
	cell.spzj_th_color.value = ct7.fontcolor
	cell.spzj_th_fontWeight.value = ct7.fontweight
	cell.spzj_th_font.value = ct7.font
	// cell.spzj_th_mark.value = ct7.mark

}

function setDateType(ctype, attribute, row, col, grid, initInfo, design) {

	attribute.contentInfo.cmbType.value = "rq";
	if (ctype.isenableedit == 1) {
		attribute.cell_DateInfo.rq_allowEdit.checked = true
	} else {
		attribute.cell_DateInfo.rq_allowEdit.checked = false
	}

	if (ctype.isdefultdate == 1) {
		attribute.cell_DateInfo.rq_defaultToday.checked = true
	} else {
		attribute.cell_DateInfo.rq_defaultToday.checked = false
	}
	if (ctype.allowuserdefine == 1) {
		attribute.cell_DateInfo.rq_customize.checked = true
		attribute.cell_DateInfo.rq_dateStyle.value = ''
		attribute.cell_DateInfo.rq_customFormat.value = ctype.format
	} else {
		attribute.cell_DateInfo.rq_customize.checked = false
		attribute.cell_DateInfo.rq_dateStyle.value = ctype.format
		attribute.cell_DateInfo.rq_customFormat.value = ''
	}
	attribute.cell_DateInfo.rq_allowPrint.checked = ctype.isprint
	attribute.cell_DateInfo.rq_allowEmpty.checked = ctype.isallownull
	attribute.cell_DateInfo.rq_emptyAlert.value = ctype.emptydisplay
}



Handsontable.Core.prototype.addCheck = function(list) {
	if (!this.checkArray) {
		this.checkArray = [];
	}
	var uid = vmd.getGuid();
	var rule = {
		id: uid,
		name: '校验规则' + (this.checkArray.length + 1),
		expression: '',
		falseAlert: '',
		immediate: false
	}
	this.checkArray.push(rule);
	var ca = this.checkArray;

	var ul;
	var cl = document.getElementsByClassName(' vmd-dataview x-abs-layout-item')[0];
	if (cl && cl.childNodes.length == 0) {
		ul = document.createElement("ul");
		cl.appendChild(ul);
	} else {
		ul = cl.childNodes[0];
	}

	this.newLi(ul, this.checkArray[this.checkArray.length - 1])
}

Handsontable.Core.prototype.delCheck = function() {
	if (!this.checkId) {
		return;
	} else {
		var index = this.checkId;
		for (var i = 0; i < this.checkArray.length; i++) {
			if (index == this.checkArray[i].id) {
				this.checkArray.splice(i, 1);
				break;
			}
		}
		this.checkListRedraw();
	}
	var temp = xds.eastlayout.reportInst.hwReporting;
	temp.re_checkName.setValue("")
	temp.re_expression.setValue("")
	temp.re_alert.setValue("")
	temp.re_immediate.setValue("false")
}

Handsontable.Core.prototype.checkListRedraw = function() {
	var checkList = xds.eastlayout.reportInst.hwReporting.checkList;
	if(checkList.el&&checkList.el.dom)
	{
		checkList.el.dom.removeChild(checkList.el.dom.childNodes[0]);
		var ul = document.createElement("ul");
		checkList.el.dom.appendChild(ul);
		if (this.checkArray && this.checkArray.length > 0) {
			for (var i = 0; i < this.checkArray.length; i++) {
				this.newLi(ul, this.checkArray[i]);
			}
		}
  }
}

Handsontable.Core.prototype.newLi = function(ul, info) {
	var that = this;
	var checkInst = xds.eastlayout.reportInst.hwReporting;
	var exp = checkInst.re_expression;
	var falseAlert = checkInst.re_alert;
	var imm = checkInst.re_immediate;
	var name = checkInst.re_checkName;

	var li = document.createElement('li')
	li.innerText = info.name;
	li.setAttribute('id', info.id)
	li.style.fontSize = '14px';
	li.style.padding = '4px';
	li.style.cursor = 'pointer';
	li.style.display = 'list-item';
	li.style.textAlign = '-webkit-match-parent';
	ul.appendChild(li)
	var ca = this.checkArray;
	li.onclick = function() {
		for (var i = 0; i < ca.length; i++) {
			if (li.id == ca[i].id) {
				exp.setValue(ca[i].expression)
				falseAlert.setValue(ca[i].falseAlert)
				imm.setValue(ca[i].immediate)
				name.setValue(ca[i].name)
			}
		}
		var temp = li.parentElement.childNodes;
		for (var n = 0; n < temp.length; n++) {
			temp[n].style.backgroundColor = 'white'
			temp[n].style.color = '#000'
		}
		li.style.backgroundColor = '#50BFFF'
		li.style.color = 'white'
		that.checkId = li.id;
		if (document.getElementsByClassName('x-form-textarea x-form-field x-abs-layout-item') && document.getElementsByClassName('x-form-textarea x-form-field x-abs-layout-item')[0]) {
			document.getElementsByClassName('x-form-textarea x-form-field x-abs-layout-item')[0].onblur = function() {
				if (that.checkId) {
					var ca = that.checkArray;
					for (var i = 0; i < ca.length; i++) {
						if (that.checkId == ca[i].id) {
							ca[i].falseAlert = falseAlert.getValue()
						}
					}
				}
			}
		}
		xds.eastlayout.reportInst.hwReporting.re_immediate.el.dom.parentElement.onclick = function() {
			if (that.checkId) {
				var ca = that.checkArray;
				for (var i = 0; i < ca.length; i++) {
					if (that.checkId == ca[i].id) {
						ca[i].immediate = imm.getValue()
					}
				}
			}
		}
	}
	li.onmouseover = function() {
		li.style.backgroundColor = '#50BFFF'
	}
	li.onmouseleave = function() {
		if (li.id != that.checkId) {
			li.style.backgroundColor = "white"
		}
	}
}

Handsontable.Core.prototype.addSubmit = function() {
	var path = LocalData.get('path');
	var data = LocalData.get('data');
	var that = this;
	// 创建一个新窗口（有url指向） 
	var newWin = new vmd.window({
		url: '/system/modules/eQ9ULgcVb1/hwYa3IA0Y1/hwHCHpNfHv/hwZ51dmjGt.html',
		title: '添加提交规则',
		enableLoading: true, //启用进度加载
		width: 420,
		height: 580,
		auto: false, //auto为true 自动适应窗口，配合offset使用
		params: {} //url中追加的编码的参数，json格式 
	})
	newWin.show(); //窗口显示
	window.getSubmitData = function(id, name, text, obj, save) {
		that.setSubmitList(id, name, text, obj, save);
	}
	window.edClose = function() {
		newWin.hide();
	}
}

Handsontable.Core.prototype.submitLi = function(ul, info, canclick) {
	var flag = true;
	for (var i = 0; i < ul.childNodes.length; i++) {
		var existId = ul.childNodes[i].id;
		if (existId == info.id) {
			flag = false;
		}
	}
	if (flag) {
		var that = this;
		var checkInst = xds.eastlayout.reportInst.hwReporting;
		var exp = checkInst.re_expression;
		var falseAlert = checkInst.re_alert;
		var imm = checkInst.re_immediate;
		var name = checkInst.re_checkName;
		var li = document.createElement('li')
		li.innerText = info.name;
		li.setAttribute('id', info.id)
		li.style.fontSize = '14px';
		li.style.padding = '4px';
		li.style.cursor = 'pointer';
		li.style.display = 'list-item';
		li.style.textAlign = '-webkit-match-parent';
		ul.appendChild(li)
		li.onclick = function() {
			that.liid = li.id;
			var checkInst = xds.eastlayout.reportInst.hwReporting;
			var change = checkInst.hwCheckbox;
			var temp = li.parentElement.childNodes;
			for (var n = 0; n < temp.length; n++) {
				temp[n].style.backgroundColor = 'white'
				temp[n].style.color = "#000"
			}

			li.style.backgroundColor = '#50BFFF'
			li.style.color = 'white'

			for (var i = 0; i < that.submitArray.length; i++) {
				if (li.id == that.submitArray[i].id) {
					change.setValue(that.submitArray[i].updatemode)
				}
			}
			// if (that.submitId != li.id) {
			that.submitId = li.id;
			that.removeAllSubmit();

			for (var i = 0; i < that.submitArray.length; i++) {
				if (li.id == that.submitArray[i].id) {
					for (var n = 0; n < that.submitArray[i].banding.length; n++) {
						that.submitRedraw(that.submitArray[i].banding, n);
					}
					return;
				}
			}
			// }
		}
		li.onmouseover = function() {
			li.style.backgroundColor = '#50BFFF'
			// li.style.color = 'white'
		}
		li.onmouseleave = function() {
			if (li.id != that.submitId) {
				li.style.backgroundColor = "white"
				li.style.color = "#000"
			}
		}
		if (canclick) this.submitId = li.id;
		li.click();
	}
}

Handsontable.Core.prototype.setSubmitList = function(data, path, id, obj, save) {
	var flag = true;
	if (typeof this.submitArray == 'undefined') this.submitArray = [];
	for (var i = 0; i < this.submitArray.length; i++) {
		if (this.submitArray[i].name == path) flag = false;
	}
	if (flag) {
		var that = this;
		var band = [];
		var body = (xds.eastlayout.ContentProperty && xds.eastlayout.ContentProperty.hwReporting.fieldBinding.el && xds.eastlayout.ContentProperty.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1]) ||
			(xds.eastlayout.reportInst && xds.eastlayout.reportInst.hwReporting.fieldBinding.el && xds.eastlayout.reportInst.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1])

		for (var i = 0; i < data.length; i++) {
			var guid = vmd.getGuid();
			band.push({
				name: data[i].name,
				noRe: false,
				cell: '',
				id: guid
			})
			var tr = document.createElement('tr');
			tr.setAttribute('id', guid)
			var td1 = document.createElement('td')
			var td2 = document.createElement('td')
			var td3 = document.createElement('td')
			td1.style = "border:1px solid #ccc;width:90px"
			td2.style = "border:1px solid #ccc;width:90px"
			td3.style = "border:1px solid #ccc;width:90px"
			tr.appendChild(td1)
			tr.appendChild(td2)
			tr.appendChild(td3)
			body.appendChild(tr)
			var input = document.createElement('input')
			input.setAttribute('type', 'text')
			input.style = "border:none;padding:3px"
			td2.appendChild(input);
			td1.innerText = data[i].name
			var check = document.createElement('input');
			check.setAttribute('type', 'checkBox')
			td3.appendChild(check)
			input.onblur = function() {
				var value = this.value;
				var tid = this.parentElement.parentElement.id;
				for (var i = 0; i < that.submitArray.length; i++) {
					if (that.submitId == that.submitArray[i].id) {
						for (var n = 0; n < that.submitArray[i].banding.length; n++) {
							if (tid == that.submitArray[i].banding[n].id) {
								that.submitArray[i].banding[n].cell = value;
							}
						}
					}
				}
			}
			check.onclick = function() {
				var value = this.checked;
				var tid = this.parentElement.parentElement.id;
				for (var i = 0; i < that.submitArray.length; i++) {
					if (that.submitId == that.submitArray[i].id) {
						for (var n = 0; n < that.submitArray[i].banding.length; n++) {
							if (tid == that.submitArray[i].banding[n].id) {
								that.submitArray[i].banding[n].noRe = value;
							}
						}
					}
				}
			}
		}
		var gid = vmd.getGuid()
		var info = {
			name: path,
			id: gid
		}

		var paramsObj = {};
		paramsObj.name = 'CallCode';
		paramsObj.value = 'vmdcode';

		var saveObj = {};
		saveObj.id = id;
		saveObj.name = obj.url.split("/")[obj.url.split("/").length - 1];
		saveObj.project = '';
		saveObj.explain = '';
		saveObj.method = 'Get';
		saveObj.path = obj.url;
		saveObj.host = '';
		saveObj.params = paramsObj;

		this.submitArray.push({
			id: gid,
			banding: band,
			name: path,
			definedname: '', //模板名_name_tablename
			// saveserver: "<server id name= project explain method path host" > < serverparams > < serverparam name = \"CallCode\" value=\"&quot;vmdcode&quot;\" /></serverparams><body contenttype=\"\" formbody=\"\" /></server>"
			saveserver: saveObj,
			updatemode: true

		})
		this.submitLi((xds.eastlayout.ContentProperty && xds.eastlayout.ContentProperty.hwReporting.submitList.el.dom.childNodes[0]) ||
			(xds.eastlayout.reportInst && xds.eastlayout.reportInst.hwReporting.submitList.el.dom.childNodes[0]), info, true)
	} else {
		vmd.tip('禁止重复添加相同规则', 'error')
	}
}

Handsontable.Core.prototype.removeAllSubmit = function() {
	var body = xds.eastlayout.reportInst.hwReporting.fieldBinding&&xds.eastlayout.reportInst.hwReporting.fieldBinding.el&&xds.eastlayout.reportInst.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
	if(body){
		var objChilds = body.children; /* 得到子元素 */
		if (objChilds&&objChilds.length != 0) { /* 长度不为0，开始删除 */
			for (var i = objChilds.length - 1; i >=1; i--) {
				body.removeChild(objChilds[i]);
			}
		}
	}	
}
/**
 * 提交规则的刷新按钮
 */
Handsontable.Core.prototype.refreshSubmit = function() {
	var target;
	var url;
	var id;
	var index;
	for (var i = 0; i < this.submitArray.length; i++) {
		if (this.submitArray[i].id == this.submitId) {
			target = this.submitArray[i].banding;
			url=this.submitArray[i].saveserver.path;
			id=this.submitArray[i].saveserver.id;
			index=i;
			break;
		}
	}
	var body = (xds.eastlayout.ContentProperty && xds.eastlayout.ContentProperty.hwReporting.fieldBinding.el && xds.eastlayout.ContentProperty.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1]) ||
	(xds.eastlayout.reportInst && xds.eastlayout.reportInst.hwReporting.fieldBinding.el && xds.eastlayout.reportInst.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1])
	var urlConfig = {
		host: vmd.MicService.getDasIp(),
		url: url
	};
	var headers = {
		startIndex:0,
		pageSize : 1
	};
	var params={};
	var that=this;
	//hwDas.save(urlConfig, headers, params,[],
	var urlparam = "DataService/Service/Method";
	hwDas.get(urlparam, {}, {
		resourceid: id
	},
		function (result) {
			var datajson = result.data[0].datas;
			for (var i = 0; i < datajson.length; i++) {
				if (datajson[i].name == "save") {
					var id = datajson[i].id;
						urlparam = "DataService/Service/Parameter";
					hwDas.get(urlparam, {}, {
						methodid: id
					}, function(result) {
			var fields = result.data[0].datas;
			if(fields&&fields.length>0){
				for (var i = 0; i < fields.length; i++) {
					var name=fields[i].code;
					if(!fieldInSubmit(target,name)){
						var guid = vmd.getGuid();
						var tr = document.createElement('tr');
						tr.setAttribute('id', guid)
						var td1 = document.createElement('td')
						var td2 = document.createElement('td')
						var td3 = document.createElement('td')
						td1.style = "border:1px solid #ccc;width:90px"
						td2.style = "border:1px solid #ccc;width:90px"
						td3.style = "border:1px solid #ccc;width:90px"
						tr.appendChild(td1)
						tr.appendChild(td2)
						tr.appendChild(td3)
						body.appendChild(tr)
						var input = document.createElement('input')
						input.setAttribute('type', 'text')
						input.style = "border:none;padding:3px"
						td2.appendChild(input);
						td1.innerText = name;
						var check = document.createElement('input');
						check.setAttribute('type', 'checkBox')
						td3.appendChild(check)
						input.onblur = function() {
							var value = this.value;
							var tid = this.parentElement.parentElement.id;
							for (var i = 0; i < that.submitArray.length; i++) {
								if (that.submitId == that.submitArray[i].id) {
									for (var n = 0; n < that.submitArray[i].banding.length; n++) {
										if (tid == that.submitArray[i].banding[n].id) {
											that.submitArray[i].banding[n].cell = value;
										}
									}
								}
							}
						}
						check.onclick = function() {
							var value = this.checked;
							var tid = this.parentElement.parentElement.id;
							for (var i = 0; i < that.submitArray.length; i++) {
								if (that.submitId == that.submitArray[i].id) {
									for (var n = 0; n < that.submitArray[i].banding.length; n++) {
										if (tid == that.submitArray[i].banding[n].id) {
											that.submitArray[i].banding[n].noRe = value;
										}
									}
								}
							}
						}
						that.submitArray[index].banding.push({
							name: name,
							noRe: false,
							cell: '',
							id: guid});
					}
				}
			}
		},function (msg) {
			
		})
	}
  }
		},
		function (msg) {
			
		}
	);

}
// 判断一个字段是否在提交规则中（2019-11-8 lf）
function fieldInSubmit(target,field){
	for (var n = 0; n < target.length; n++) {
		if( target[n].name==field){
			return true;
		}
	}
	return false;
}

/**
 * 提交规则的绑定按钮
 */
Handsontable.Core.prototype.fieldBinding = function() {
	/**
	 * 取出小括号内的内容
	 * @param text
	 * @returns {string}
	 */
	var getParenthesesStr = function(text) {
		if (typeof text != 'undefined') {
			var regex = /\((.+?)\)/g;
			var result = text.match(regex);
			if (result) {
				txt = result[0].toString();
				result = txt.substring(1, txt.length).substring(0, txt.length - 2);
				return result
			} else {
				return text;
			}

		}
	}

	var target;
	for (var i = 0; i < this.submitArray.length; i++) {
		if (this.submitArray[i].id == this.submitId) {
			target = this.submitArray[i].banding;
			break;
		}
	}
	var cellSet = [];
	for (var a = 0; a < this.countRows(); a++) {
		for (var b = 0; b < this.countCols(); b++) {
			var data = this.getData()[a][b];
			if (data != null) {
				if (data.indexOf("=") == 0) {
					if (data.split(".") && data.split(".")[1]) {
						var obj = {
							r: a,
							c: b,
							value: getParenthesesStr(data.split(".")[1])
						}
						cellSet.push(obj);
					}
				}
			}
		}
	}
	for (var n = 0; n < target.length; n++) {
		var tid = target[n].id;
		var tfiled = target[n].name;
		// var tcell = target[n].cell;
		for (var t = 0; t < cellSet.length; t++) {
			var a = cellSet[t].r;
			var b = cellSet[t].c;
			if ((cellSet[t].value).toLowerCase() == tfiled.toLowerCase()) {
				var content = document.getElementById(tid).childNodes[1].childNodes[0]
				var result = this.numToEng(b) + (a + 1);
				target[n].cell = result;
				content.value = result;
				break;
			}
		}
	}
}

Handsontable.Core.prototype.submitRedraw = function(info, num) {
	var that = this;
	var body = xds.eastlayout.reportInst.hwReporting.fieldBinding.el && xds.eastlayout.reportInst.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
	var tr = document.createElement("tr")
	var td1 = document.createElement("td")
	var td2 = document.createElement("td")
	var td3 = document.createElement("td")
	var tf = document.createElement('input');
	tf.setAttribute('type', 'text')
	td2.appendChild(tf)
	td1.innerText = info[num].name
	tf.value = info[num].cell
	tf.style.border = 'none'
	tf.style.textAlign = 'center'
	// td3.setAttribute('value', info[num].noRe)
	var checkbox = document.createElement('input')
	checkbox.setAttribute('type', 'checkbox')
	td3.appendChild(checkbox)
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	body.appendChild(tr);
	td1.style.border = '1px solid #ccc';
	td2.style.border = '1px solid #ccc';
	td3.style.border = '1px solid #ccc';
	checkbox.checked = info[num].noRe
	tr.setAttribute('id', info[num].id)
	tf.onblur = function() {
		var value = this.value;
		var tid = this.parentElement.parentElement.id;
		for (var i = 0; i < that.submitArray.length; i++) {
			if (that.submitId == that.submitArray[i].id) {
				for (var n = 0; n < that.submitArray[i].banding.length; n++) {
					if (tid == that.submitArray[i].banding[n].id) {
						that.submitArray[i].banding[n].cell = value;
					}
				}
			}
		}
	}
	checkbox.onclick = function() {
		var value = this.checked;
		var tid = this.parentElement.parentElement.id;
		for (var i = 0; i < that.submitArray.length; i++) {
			if (that.submitId == that.submitArray[i].id) {
				for (var n = 0; n < that.submitArray[i].banding.length; n++) {
					if (tid == that.submitArray[i].banding[n].id) {
						that.submitArray[i].banding[n].noRe = value;
					}
				}
			}
		}
	}
}

Handsontable.Core.prototype.delSubmit = function() {
	if (this.submitId) {
		for (var i = 0; i < this.submitArray.length; i++) {
			if (this.submitArray[i].id == this.submitId) {
				this.submitArray.splice(i, 1);
				var item = document.getElementById(this.submitId);
				var father = item.parentElement;
				father.removeChild(item)

				this.submitId = null;
				break;
			}
		}
		this.removeAllSubmit();
	}
}


Handsontable.Core.prototype.saveCheckRules = function(report) {
	var arr = this.checkArray;
	report.main.checkrules = [];
	for (var i = 0; i < this.checkArray.length; i++) {
		report.main.checkrules.push({
			id: this.checkArray[i].id,
			name: this.checkArray[i].name,
			checkexp: this.checkArray[i].expression,
			errormsg: this.checkArray[i].falseAlert,
			checktype: this.checkArray[i].immediate
		})
	}
}

Handsontable.Core.prototype.setCheckRules = function(info) {

	this.checkArray = [];
	for (var i = 0; i < info.length; i++) {
		this.checkArray.push({
			id: info[i].id,
			name: info[i].name,
			expression: info[i].checkexp,
			falseAlert: info[i].errormsg,
			immediate: info[i].checktype
		})
	}
}



Handsontable.Core.prototype.saveSubmitRules = function(report) {

	var arr = this.submitArray;
	report.main.submitrules = [];
	for (var i = 0; i < this.submitArray.length; i++) {
		var temp = [];
		for (var n = 0; n < this.submitArray[i].banding.length; n++) {
			var obj = {
				norepeat: this.submitArray[i].banding[n].noRe,
				fieldname: this.submitArray[i].banding[n].name,
				cellid: this.submitArray[i].banding[n].cell,
				id: this.submitArray[i].banding[n].id
			}
			temp.push(obj)
		}
		report.main.submitrules.push({
			name: this.submitArray[i].name,
			definedname: this.submitArray[i].definedname,
			saveserver: this.submitArray[i].saveserver,
			values: temp,
			id: this.submitArray[i].id,
			updatemode: typeof(this.submitArray[i].updatemode) == 'undefined' ? false : this.submitArray[i].updatemode
		})
	}
}

Handsontable.Core.prototype.setSubmitRules = function(info) {

	this.submitArray = [];
	for (var i = 0; i < info.length; i++) {
		var temp = [];
		for (var n = 0; n < info[i].values.length; n++) {
			var obj = {
				noRe: info[i].values[n].norepeat,
				name: info[i].values[n].fieldname,
				cell: info[i].values[n].cellid,
				id: info[i].values[n].id || vmd.getGuid()
			}
			temp.push(obj)
		}
		this.submitArray.push({
			name: info[i].name,
			definedname: info[i].definedname,
			saveserver: info[i].saveserver,
			banding: temp,
			id: info[i].id || vmd.getGuid(),
			updatemode: info[i].updatemode || false
		})
	}
	// this.setSaveSubmit()
}



Handsontable.Core.prototype.setSaveSubmit = function() {

	var body = (xds.eastlayout.ContentProperty && xds.eastlayout.ContentProperty.hwReporting.fieldBinding.el && xds.eastlayout.ContentProperty.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1]) ||
		(xds.eastlayout.reportInst && xds.eastlayout.reportInst.hwReporting.fieldBinding.el && xds.eastlayout.reportInst.hwReporting.fieldBinding.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[1])
	if (body && body.childNodes && this.submitArray) {
		if (body.childNodes.length > 0) {
            // 当没有提交规则时。清空提交规则  2019.11.5 lf
            if(this.submitArray&&this.submitArray.length==0){
            }else {
                for (var i = 0; i < this.submitArray.length; i++) {
                    this.submitLi((xds.eastlayout.ContentProperty && xds.eastlayout.ContentProperty.hwReporting.submitList.el.dom.childNodes[0]) ||
                        (xds.eastlayout.reportInst && xds.eastlayout.reportInst.hwReporting.submitList.el.dom.childNodes[0]), {
                        name: this.submitArray[i].name,
                        id: this.submitArray[i].id
                    })
                }
            }
		}
	}
}

Handsontable.Core.prototype.setSaveCheck = function() {
	this.checkListRedraw();
}

Handsontable.Core.prototype.saveEvents = function(cell, report) {
	var events = {};
	var hasEvent = false;
	if (cell.cellAttributeInfo.leftLink && cell.cellAttributeInfo.leftLink.linkEvent.value) {
		events.click = cell.cellAttributeInfo.leftLink.linkEvent.value;
		hasEvent = true;
	}
	if (cell.cellAttributeInfo.menu && cell.cellAttributeInfo.menu.menuEvent.value) {
		events.itemClick = cell.cellAttributeInfo.menu.menuEvent.value;
		hasEvent = true;
	}
	var cell_TextInfo = cell.cellAttributeInfo.cell_TextInfo;
	if (cell_TextInfo) {
		if (cell_TextInfo.text_click.value) {
			events.click = cell_TextInfo.text_click.value;
			hasEvent = true;
		}
		if (cell_TextInfo.text_change.value) {
			events.change = cell_TextInfo.text_change.value;
			hasEvent = true;
		}
	}
	var numberInfo = cell.cellAttributeInfo.cell_NumberInfo;
	if (numberInfo) {
		if (numberInfo.number_click.value) {
			events.click = numberInfo.number_click.value;
			hasEvent = true;
		}
		if (numberInfo.number_change.value) {
			events.change = numberInfo.number_change.value;
			hasEvent = true;
		}
	}
	var cell_CheckBoxInfo = cell.cellAttributeInfo.cell_CheckBoxInfo;
	if (cell_CheckBoxInfo) {
		if (cell_CheckBoxInfo.checkbox_click.value) {
			events.click = cell_CheckBoxInfo.checkbox_click.value;
			hasEvent = true;
		}
		if (cell_CheckBoxInfo.checkbox_change.value) {
			events.change = cell_CheckBoxInfo.checkbox_change.value;
			hasEvent = true;
		}
	}
	var cell_ComboInfo = cell.cellAttributeInfo.cell_ComboInfo;
	if (cell_ComboInfo) {
		if (cell_ComboInfo.combo_click.value) {
			events.click = cell_ComboInfo.combo_click.value;
			hasEvent = true;
		}
		if (cell_ComboInfo.combo_change.value) {
			events.change = cell_ComboInfo.combo_change.value;
			hasEvent = true;
		}
	}
	var cell_DropDownTreeInfo = cell.cellAttributeInfo.cell_DropDownTreeInfo;
	if (cell_DropDownTreeInfo) {
		if (cell_DropDownTreeInfo.combotree_click.value) {
			events.click = cell_DropDownTreeInfo.combotree_click.value;
			hasEvent = true;
		}
		if (cell_DropDownTreeInfo.combotree_change.value) {
			events.change = cell_DropDownTreeInfo.combotree_change.value;
			hasEvent = true;
		}
	}
	var cell_ddg = cell.cellAttributeInfo.cell_ddg;
	if (cell_ddg) {
		if (cell_ddg.combogrid_click.value) {
			events.click = cell_ddg.combogrid_click.value;
			hasEvent = true;
		}
		if (cell_ddg.combogrid_change.value) {
			events.change = cell_ddg.combogrid_change.value;
			hasEvent = true;
		}
	}
	var cell_RadioButtonInfo = cell.cellAttributeInfo.cell_RadioButtonInfo;
	if (cell_RadioButtonInfo) {
		if (cell_RadioButtonInfo.radio_click.value) {
			events.click = cell_RadioButtonInfo.radio_click.value;
			hasEvent = true;
		}
		if (cell_RadioButtonInfo.radio_change.value) {
			events.change = cell_RadioButtonInfo.radio_change.value;
			hasEvent = true;
		}
	}
	var cell_UploadInfo = cell.cellAttributeInfo.cell_UploadInfo;
	if (cell_UploadInfo) {
		if (cell_UploadInfo.upload_click.value) {
			events.click = cell_UploadInfo.upload_click.value;
			hasEvent = true;
		}
		if (cell_UploadInfo.upload_dblclick.value) {
			events.click = cell_UploadInfo.upload_dblclick.value;
			hasEvent = true;
		}
		if (cell_UploadInfo.upload_change.value) {
			events.change = cell_UploadInfo.upload_change.value;
			hasEvent = true;
		}
	}
	var cell_RichTextInfo = cell.cellAttributeInfo.cell_RichTextInfo;
	if (cell_RichTextInfo) {
		if (cell_RichTextInfo.richedit_click.value) {
			events.click = cell_RichTextInfo.richedit_click.value;
			hasEvent = true;
		}
		if (cell_RichTextInfo.richedit_change.value) {
			events.change = cell_RichTextInfo.richedit_change.value;
			hasEvent = true;
		}
	}
	if (cell.cellAttributeInfo.cell_ApprovlInfo && cell.cellAttributeInfo.cell_ApprovlInfo.spzj_approval.value) {
		events.approval = cell.cellAttributeInfo.cell_ApprovlInfo.spzj_approval.value;
		hasEvent = true;
	}
	var cell_DateInfo = cell.cellAttributeInfo.cell_DateInfo;
	if (cell_DateInfo) {
		if (cell_DateInfo.date_click.value) {
			events.click = cell_DateInfo.date_click.value;
			hasEvent = true;
		}
		if (cell_DateInfo.date_dblclick.value) {
			events.dbclick = cell_DateInfo.date_dblclick.value;
			hasEvent = true;
		}
		if (cell_DateInfo.date_change.value) {
			events.change = cell_DateInfo.date_change.value;
			hasEvent = true;
		}

	}
	var cell_ButtonInfo = cell.cellAttributeInfo.cell_ButtonInfo;
	if (cell_ButtonInfo) {
		if (cell_ButtonInfo.buttoneve_click.value) {
			events.click = cell_ButtonInfo.buttoneve_click.value;
			hasEvent = true;
		}
		if (cell_ButtonInfo.buttoneve_dbClick.value) {
			events.dbclick = cell_ButtonInfo.buttoneve_dbClick.value;
			hasEvent = true;
		}
	}

	if (hasEvent) {
		cell.cellAttributeInfo.eventid = report.getEventsID(events).toString();
		for (var key in events) {
			xds.vmd.addEventForDesignerCmp(this.rootScope.viewerNode.component, events[key], events[key])
		}
	}


}

Handsontable.Core.prototype.setEvents = function(events, attribute, info, row, col, fillcelltype) {

	var hot = this;
	var ctype = info.event;
	var type;
	switch (attribute.contentInfo.cmbType.value) {
		case 'wb':
			type = 'text'
			break;
		case 'sz':
			type = 'number'
			break;
		case 'xlk':
			type = 'combo'
			break;
		case 'xls':
			type = 'combotree'
			break;
		case 'xlwg':
			type = 'combogrid'
			break;
		case 'dxan':
			type = 'radio'
			break;
		case 'fxk':
			type = 'checkbox'
			break;
		case 'sczj':
			type = 'upload'
			break;
		case 'fwb':
			type = 'richedit'
			break;
		case 'spzj':
			type = 'approval'
			break;
		case 'rq':
			type = 'date'
			break;
		case 'an':
			type = 'button'
			break;
	}
	if (ctype) {
		var eve = events[ctype];
		if (eve && eve.change) {
			if (typeof eve.change == 'string') {
				hot.changeAttributeInfo(row, col, type + '_change', eve.change)
			} else {
				var event = eve.change;
				var text;
				for (var i = 0; i < event.length; i++) {
					if (event[i].name && event[i].dataSet) {
						text = "/*" + event[i].name + "(" + event[i].dataSet + ")" + "*/"
					} else
					if (event[i].name && event[i].javascript) {
						text = "/*" + event[i].javascript + "*/"
					} else
					if (event[i].name && event[i].rptName) {
						text = "/*" + event[i].name + "(" + event[i].rptName + ")" + "*/"
					} else {
						text = "/*" + event[i].name + "(" + ")" + "*/"
					}
				}
				var val;
				var funcName = (this.rootScope.viewerNode.id + "_" + this.numToEng(col) + (row + 1) + "_" + type + "_change").toLowerCase();
				var func = "function " + funcName + "(sender)" + "{\n" + text + "\n}"
				var code = xds.vmd.events;
				if (code.indexOf(func) == -1) {
					val = code + '\n' + func;
				} else {
					val = code
				}
				if (val.trim()) {
					xds.vmd.events = val;
					hot.changeAttributeInfo(row, col, type + '_change', funcName)
				}
			}
		}
		if (eve && eve.dbclick) {
			if (typeof eve.dbclick == 'string') {
				hot.changeAttributeInfo(row, col, type + '_dblclick', eve.dbclick)
			} else {
				var event = eve.dbclick;
				var text;
				for (var i = 0; i < event.length; i++) {
					if (event[i].name && event[i].dataSet) {
						text = "/*" + event[i].name + "(" + event[i].dataSet + ")" + "*/"
					} else
					if (event[i].name && event[i].javascript) {
						text = "/*" + event[i].javascript + "*/"
					} else
					if (event[i].name && event[i].rptName) {
						text = "/*" + event[i].name + "(" + event[i].rptName + ")" + "*/"
					} else {
						text = "/*" + event[i].name + "(" + ")" + "*/"
					}
				}
				var val;
				var funcName = (this.rootScope.viewerNode.id + "_" + this.numToEng(col) + (row + 1) + "_" + type + "_dbclick").toLowerCase();
				var func = "function " + funcName + "(sender)" + "{\n" + text + "\n}"
				var code = xds.vmd.events;
				if (code.indexOf(func) == -1) {
					val = code + '\n' + func;
				} else {
					val = code
				}
				if (val.trim()) {
					// sender.setValue(funcName.toLowerCase())
					xds.vmd.events = val;
					hot.changeAttributeInfo(row, col, type + '_dblclick', funcName)
				}
			}
		}
		if (eve && eve.click) {
			if (typeof eve.click == 'string') {
				if (fillcelltype && fillcelltype.url) {
					// attribute.leftLink.linkEvent.value = eve.click
					hot.changeAttributeInfo(row, col, 'linkEvent', eve.click)
				} else {
					hot.changeAttributeInfo(row, col, type + '_click', eve.click)
				}
			} else {
				var event = eve.click;
				var text;
				for (var i = 0; i < event.length; i++) {
					if (event[i].name && event[i].dataSet) {
						text = "/*" + event[i].name + "(" + event[i].dataSet + ")" + "*/"
					} else
					if (event[i].name && event[i].javascript) {
						text = "/*" + event[i].javascript + "*/"
					} else
					if (event[i].name && event[i].rptName) {
						text = "/*" + event[i].name + "(" + event[i].rptName + ")" + "*/"
					} else {
						text = "/*" + event[i].name + "(" + ")" + "*/"
					}
				}
				var val;
				var funcName = (this.rootScope.viewerNode.id + "_" + this.numToEng(col) + (row + 1) + "_" + type + "_click").toLowerCase();
				var func = "function " + funcName + "(sender)" + "{\n" + text + "\n}"
				var code = xds.vmd.events;
				if (code.indexOf(func) == -1) {
					val = code + '\n' + func;
				} else {
					val = code
				}
				if (val.trim()) {
					xds.vmd.events = val;
					hot.changeAttributeInfo(row, col, type + '_click', funcName)
				}
			}
		}
		if (eve && eve.itemClick) {
			attribute.menu.menuEvent.value = eve.itemClick
		}
		if (eve && eve.approval) {
			attribute.cell_ApprovlInfo.spzj_approval.value = eve.approval
		}
	}
}

Handsontable.Core.prototype.transformDsName = function(dataname) {
	var obj = {}
	var reportid = (this.rootScope && this.rootScope.viewerNode.id) || '';
	var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
	if (typeof storeRoot != 'undefined') {
		storeRoot.eachChild(function(n) {
			var dsname;
			if (n.component && n.component.getConfig()) {
				dsname = n.component.getConfig().dsName;
				if (reportid) {
					if (dsname && dsname.indexOf(reportid) > -1) {
						var indexCount = dsname.indexOf(reportid);
						if (dsname.length > indexCount) {
							dsname = dsname.substring(indexCount + reportid.length + 1);
						}
					}
				}
			}
			if (dataname == n.id || dsname == dataname) {
				var dsi = {};
				if (dsname)
					dsi.name = dsname;
				dsi.factname = n.id;
				obj.dataname = dsi;
			}
		}, this);
	}
	return obj;
}

//调试方法，控制台打印当前mergeID
Handsontable.Core.prototype.showMergeId = function() {
	var row = this.countRows();
	var col = this.countCols();
	var result = [];
	var doms = []
	for (var i = 0; i < row; i++) {
		result.push([]);
		doms.push([]);
		for (var n = 0; n < col; n++) {
			result[i].push(this.getCellMeta(i, n).mergeId)
			doms[i].push(this.getCell(i, n))
		}
	}
	console.log(result)
	console.log(doms)
}
Handsontable.Core.prototype.pasteFromOut = function(e) {
	var cando = this.runHooks('beforePaste', e);
	if (cando) {
		var me = this;
		var fontfamilyMap = [
			'SimSun',
			'Microsoft YaHei',
			'STFangsong',
			'STKaiti',
			'STSong',
			'Arial',
			'Comic Sans MS',
			'Courier New',
			'Georgia',
			'Impact',
			'Times New Roman',
			'Trebuchet MS',
			'Verdana',
		];
		var tempMergeArr = [];
		var tempDataArr = [];
		var cell = this.dealInvert()[0];
		var sr = cell.sr;
		var sc = cell.sc;
		var context = e.mCopyText;
		var marr = e.mMergeCells;
		var style = e.mStyles;
		//纯文本类型的外部信息
		if (context == '' && marr == null && style == null) {
			this.setDataAtCell(sr, sc, e.value)
		} else { //有格式如表格区域复制粘贴
			//复制区域行列数
			var copyRangeC = context.length;
			var copyRangeR = context[0].length;
			var er = copyRangeC + sr;
			var ec = copyRangeR + sc;
			if (ec >= this.countCols()) this.alter('insert_col', this.countCols() - 1, ec - this.countCols() + 1);
			if (er >= this.countRows()) this.alter('insert_row', this.countRows() - 1, er - this.countRows() + 1);
			if (marr != null) this.getPlugin('MergeCells').unmerge(sr, sc, er, ec);
			var counti = 0;
			var countn = 0;
			for (var i = sr; i < er; i++) {
				for (var n = sc; n < ec; n++) {
					if (style != null) {
						var s = style[counti][countn];
						if (s != null) {
							var meta = this.getCellMeta(i, n).cellAttributeInfo;
							if (meta) {
								meta.fontInfos.ColorSelect.value = s.fontcolor ? s.fontcolor : '#000';
								meta.fontInfos.fontSize.value = s.fontsize ? s.fontsize : '10';
								meta.fontInfos.fontWeight.value = s.bold == 'bold' ? 'bold' : ''
								meta.fontInfos.fontShape.value = s.italic == 'italic' ? 'italic' : ''
								meta.fontInfos.underline.value = s.underline == 'underline' ? 'underline' : 'N';
								meta.bgcolorInfo.ColorSelectInner.value = s.cellcolor ? s.cellcolor : '#fff';
								meta.alignInfo.align.value.HAlign.value = s.h_align ? s.h_align : 'left';
								meta.alignInfo.align.value.VAlign.value = s.v_align ? s.v_align : 'middle';
								if (s.fontfamily) meta.fontInfos.fontFamily.value = fontfamilyMap[s.fontfamily];
								// "border-top-attr:#ff0000--border-right-attr:#ff0000--border-bottom-attr:#ff0000--border-left-attr:#ff0000"
								if (s && s.sheetborder) {
									var borders = s.sheetborder.split('--');
									for (var t = 0; t < borders.length; t++) {
										if (borders[t].indexOf('top') != -1) {
											meta.borderInfo.borderT.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
											if (i == sr && sr > 0)
												this.changeAttributeInfo(sr - 1, n, 'borderB', '1px solid #' + borders[t].split('#')[borders[t].split.length - 1]);
										}
										if (borders[t].indexOf('bottom') != -1) meta.borderInfo.borderB.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
										if (borders[t].indexOf('left') != -1) {
											meta.borderInfo.borderL.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
											if (n == sc && sc > 0)
												this.changeAttributeInfo(i, sc - 1, 'borderR', '1px solid #' + borders[t].split('#')[borders[t].split.length - 1]);
										}
										if (borders[t].indexOf('right') != -1) meta.borderInfo.borderR.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
									}
								}
							}
						}
					}
					// this.setCellMeta(i, n, 'cellAttributeInfo', meta);
					var data = context[counti][countn];
					if (data == null) data = '';
					tempDataArr.push([i, n, data]);
					// this.changeAttributeInfo(i,n,'txtValue',data)
					countn = (countn == style[0].length - 1) ? 0 : countn + 1
				}
				counti = (counti == style.length - 1) ? 0 : counti + 1
			}
			var mObj = this.getPlugin('MergeCells').mergedCellsCollection.mergedCells;
			for (var k = 0; k < marr.length; k++) {
				tempMergeArr.push({
					row: sr + marr[k].row,
					col: sc + marr[k].col,
					rowspan: marr[k].rowspan,
					colspan: marr[k].colspan,
					removed: false
				})
			}
			for (var h = 0; h < mObj.length; h++) {
				tempMergeArr.push(mObj[h]);
			}
			this.updateSettings({
				mergeCells: tempMergeArr
			})
			this.setDataAtCell(tempDataArr)
			Ext.defer(function() {
				for (var p = 0; p < tempDataArr.length; p++) {
					me.changeAttributeInfo(tempDataArr[p][0], tempDataArr[p][1], 'txtValue', tempDataArr[p][2])
				}
			}, 500)
			for (var i = sr; i < er; i++) {
				for (var n = sc; n < ec; n++) {
					if (style != null) {
						var s = style[counti][countn];
						if (s != null) {
							var meta = this.getCellMeta(i, n).cellAttributeInfo;
							if (meta) {
								meta.fontInfos.ColorSelect.value = s.fontcolor ? s.fontcolor : '#000';
								meta.fontInfos.fontSize.value = s.fontsize ? s.fontsize : '10';
								meta.fontInfos.fontWeight.value = s.bold == 'bold' ? 'bold' : ''
								meta.fontInfos.fontShape.value = s.italic == 'italic' ? 'italic' : ''
								meta.fontInfos.underline.value = s.underline == 'underline' ? 'underline' : 'N';
								meta.bgcolorInfo.ColorSelectInner.value = s.cellcolor ? s.cellcolor : '#fff';
								meta.alignInfo.align.value.HAlign.value = s.h_align ? s.h_align : 'left';
								meta.alignInfo.align.value.VAlign.value = s.v_align ? s.v_align : 'middle';
								if (s.fontfamily) meta.fontInfos.fontFamily.value = fontfamilyMap[s.fontfamily];
								// "border-top-attr:#ff0000--border-right-attr:#ff0000--border-bottom-attr:#ff0000--border-left-attr:#ff0000"
								if (s && s.sheetborder) {
									var borders = s.sheetborder.split('--');
									for (var t = 0; t < borders.length; t++) {
										if (borders[t].indexOf('top') != -1) {
											meta.borderInfo.borderT.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
											if (i == sr && sr > 0)
												this.changeAttributeInfo(sr - 1, n, 'borderB', '1px solid #' + borders[t].split('#')[borders[t].split.length - 1]);
										}
										if (borders[t].indexOf('bottom') != -1) meta.borderInfo.borderB.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
										if (borders[t].indexOf('left') != -1) {
											meta.borderInfo.borderL.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
											if (n == sc && sc > 0)
												this.changeAttributeInfo(i, sc - 1, 'borderR', '1px solid #' + borders[t].split('#')[borders[t].split.length - 1]);
										}
										if (borders[t].indexOf('right') != -1) meta.borderInfo.borderR.value = '1px solid #' + borders[t].split('#')[borders[t].split.length - 1];
									}
								}
							}
						}
					}
					// this.setCellMeta(i, n, 'cellAttributeInfo', meta);
					var data = context[counti][countn];
					if (data == null) data = '';
					tempDataArr.push([i, n, data]);
					// this.changeAttributeInfo(i,n,'txtValue',data)
					countn = (countn == style[0].length - 1) ? 0 : countn + 1
				}
				counti = (counti == style.length - 1) ? 0 : counti + 1
			}
			this.render();
			this.selectCell(sr, sc)
		}
	}
}
Handsontable.Core.prototype.toolbarMutual = function(cell) {
	if (cell && this.toolbar) {
		var r = cell.sr;
		var c = cell.sc;
		var meta = this.getCellMeta(r, c).cellAttributeInfo;
		if (meta) {
			this.toolbarFontFamily();
			this.toolbarFontSize();
			var font = meta.fontInfos;
			if (font.fontWeight.value == 'bold') {
				this.toolbar["sheet-boldbutton"].addClass('pressed')
			} else {
				this.toolbar["sheet-boldbutton"].removeClass('pressed');
			}
			if (font.fontShape.value == 'italic') {
				this.toolbar["sheet-italicsbutton"].addClass('pressed')
			} else {
				this.toolbar["sheet-italicsbutton"].removeClass('pressed');
			}
			if (font.underline.value == 'underline') {
				this.toolbar["sheet-underlinebutton"].addClass('pressed')
			} else {
				this.toolbar["sheet-underlinebutton"].removeClass('pressed');
			}
			var align = meta.alignInfo;
			// var vAlign = this.toolbar['sheet-vertical-align'][0].lastChild.parentElement;
			// var hAlign = this.toolbar["sheet-horizontal-align"][0].lastElementChild.parentElement
			var vAlign = this.toolbar['sheet-vertical-align'][0].children[0].children[0].children[0].children[0].children[0]
			var hAlign = this.toolbar['toolbar-sheet-horizontal-align-group'][0].children[0].children[0].children[0].children[0].children[0].children[0];
			switch (align.align.value.HAlign.value) {
				case 'left':
					// hAlign.style.backgroundPosition = '0 -1200px'
					hAlign.style.backgroundPosition = '0 -1200px';
					break;
				case 'center':
					hAlign.style.backgroundPosition = '0 -1148px'
					break;
				case 'right':
					hAlign.style.backgroundPosition = '0 -1304px'
					break;
			}
			switch (align.align.value.VAlign.value) {
				case 'top':
					vAlign.style.backgroundPosition = '0 -1356px'
					break;
				case 'middle':
					vAlign.style.backgroundPosition = '0 -1252px'
					break;
				case 'bottom':
					vAlign.style.backgroundPosition = '0 -1096px'
					break;
			}
			if (align.autoenter.value == 1) {
				this.toolbar["sheet-textwrapbutton"][0].style.backgroundColor = 'rgba(65,70,80,.3)'
			} else {
				this.toolbar["sheet-textwrapbutton"][0].style.backgroundColor = '#fff'
			}
		}
		if (cell.sr == cell.er && cell.sc == cell.ec) {
			this.toolbar['sheet-merge-cell'].addClass('toolbar-button-wrapper-disabled')
		} else {
			this.toolbar['sheet-merge-cell'].removeClass('toolbar-button-wrapper-disabled')
		}
	}
}

Handsontable.Core.prototype.pasteInfoForOut = function(type) {
	var arr = []
	var cell = this.dealInvert()[0];
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	var o = new GhostTableCopy(this)
	var t = o.getCopyContent({
		from: {
			row: cell.sr,
			col: cell.sc
		},
		to: {
			row: cell.er,
			col: cell.ec
		}
	}, !1, !1);
	var count = 0;
	var oriDom = parseDom(t.html);
	if (sr == 0) {
		for (var i = sc; i < ec + 1; i++) {
			oriDom[1].lastChild.childNodes[0].appendChild(this.getCell(0, i).cloneNode(true))
		}
	}
	for (var i = sr; i < er + 1; i++) {
		for (var n = ec; n > sc - 1; n--) {
			var father = oriDom[1].lastChild.childNodes[count];
			if (father && father.childNodes && father.childNodes.length > 0) var len = father.childNodes.length;
			if (father && father.childNodes && father.childNodes.length > 0) var mydom = father.childNodes[n - sc];
			if (this.getCellMeta(i, n).mergeId == '1') {
				mydom.rowSpan = this.getCell(i, n).rowSpan;
				mydom.colSpan = this.getCell(i, n).colSpan;
			} else if (this.getCellMeta(i, n).mergeId == '2') {
				father.removeChild(mydom)
			}
		}
		count++
	}
	t.html = nodeToString(oriDom);
	if (type == 'cut') {
		var txtValue = [];
		for (var i = sr; i < er + 1; i++) {
			for (var n = sc; n < ec + 1; n++) {
				this.setCellMeta(i, n, 'cellAttributeInfo', new gridCellInfoObject());
				txtValue.push([i, n, '']);
			}
		}
		this.setDataAtCell(txtValue)
		this.render();
	}
	return t;
}

function nodeToString(nodeList) {
	//createElement()返回一个Element对象
	var tmpNode = document.createElement("div");
	//appendChild()  参数Node对象   返回Node对象  Element方法
	//cloneNode()  参数布尔类型  返回Node对象   Element方法
	for (var i = 0; i < nodeList.length; i++) {
		tmpNode.appendChild(nodeList[i].cloneNode(true))
	}
	var str = tmpNode.innerHTML;
	tmpNode = nodeList = null; // prevent memory leaks in IE  
	return str;
}

function parseDom(arg) {
	var objE = document.createElement("div");
	objE.innerHTML = arg;
	return objE.childNodes;
};


initExp = function() {
	if (!window.expAlreadyInit) {
		var expEdit = {};
		// var toolbar = document.getElementById('canvas_toolbar')
		var toolbar = document.getElementsByClassName('canvas-toolbar-bwrap')[0].lastChild.childNodes[0]

		var exp = document.createElement("div");
		toolbar.appendChild(exp)
		exp.style.height = "30px";
		exp.style.border = " 1px solid rgba(0, 0, 0, .15)";
		toolbar.append(exp)

		var d1 = document.createElement("div");
		d1.className = "expdiv";
		exp.appendChild(d1);

		var input = document.createElement("input");
		input.className = "expinput";
		input.setAttribute('id', 'exp_cellName')
		d1.appendChild(input);

		var btn = document.createElement("button");
		btn.className = "expbtn";
		d1.appendChild(btn);

		var exp1 = document.createElement("div");
		exp1.className = "expdiv";
		exp1.setAttribute('id', 'exp_dataSet')
		exp1.style.display = "none";
		exp.appendChild(exp1);

		var exp2 = document.createElement("div");
		exp2.className = "expdiv";
		exp2.style.display = "";
		exp.appendChild(exp2);

		var valueInput = document.createElement("input");
		valueInput.setAttribute('id', 'exp_cellValue')
		valueInput.setAttribute('autocomplete', 'off')
		valueInput.className = "exp_value_input";
		exp2.appendChild(valueInput);

		var lable = document.createElement("label");
		lable.innerHTML = "数据集：";
		lable.className = "explabel";
		exp1.appendChild(lable);

		var combods = document.createElement("select");
		combods.setAttribute('id', 'combods')
		combods.className = "expcombobox";
		exp1.appendChild(combods);

		var opNone = document.createElement("option");
		opNone.innerHTML = "请选择...";
		opNone.selected = true;
		opNone.disabled = true;
		combods.appendChild(opNone);

		if (typeof xds == 'undefined') xds = parent.xds;
		var storeRoot = parent.xds.vmd.getRootNode("dataset");
		storeRoot && storeRoot.eachChild(function(n) {
				var op = document.createElement("option");
				op._id = n.id;
				op.innerHTML = n.id;
				combods.appendChild(op);
			},
			this);
		var lable1 = document.createElement("label");
		lable1.innerHTML = "数据列：";
		lable1.className = "explabel";
		exp1.appendChild(lable1);
		var comboField = document.createElement("select");
		comboField.setAttribute('id', 'comboField')
		//comboField.id = "cmbFiled";
		// me.cmbFiled = comboField
		comboField.className = "expcombobox";
		var opNone = document.createElement("option");
		opNone.innerHTML = "请选择...";
		opNone.selected = true;
		opNone.disabled = true;
		comboField.appendChild(opNone);
		exp1.appendChild(comboField);
		var lable2 = document.createElement("label");
		lable2.innerHTML = "数据设置：";
		lable2.className = "explabel";
		exp1.appendChild(lable2);
		var comboOpration = document.createElement("select");
		comboOpration.setAttribute('id', 'comboOpration')
		// me.cmbOpration = comboOpration
		//comboOpration.id = "cmbOpration";
		comboOpration.className = "expcombobox";
		var opNone = document.createElement("option");
		opNone.innerHTML = "请选择...";
		opNone.selected = true;
		opNone.disabled = true;
		comboOpration.appendChild(opNone);
		var opSingle = document.createElement("option");
		opSingle._id = "单值";
		opSingle.innerHTML = "单值";
		comboOpration.appendChild(opSingle);
		var opSelect = document.createElement("option");
		opSelect._id = "列表";
		opSelect.innerHTML = "列表";
		comboOpration.appendChild(opSelect);
		var opGroup = document.createElement("option");
		opGroup._id = "分组";
		opGroup.innerHTML = "分组";
		comboOpration.appendChild(opGroup);
		exp1.appendChild(comboOpration);

		// 数据集下拉框选项改变事件
		combods.addEventListener("change", function() {

			var name = this.value;
			if (name != "请选择...") {
				if (comboField.options.length > 0) {
					for (var i = comboField.options.length; i >= 1; i--) {
						comboField.options.remove(1);
					}
				}
				// 数据字段设置
				if (typeof xds == 'undefined') xds = parent.xds;
				var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
				var storeNode = storeRoot && storeRoot.findChildBy(function() {
					return this.id == name;
				});
				storeNode && storeNode.eachChild(function(c) {
					var op = document.createElement("option");
					op._id = c.text;
					op.innerHTML = c.text;
					comboField.appendChild(op);
				}, this);

				var selectCell = sheetHot.dealInvert();
				var r = selectCell[0].sr;
				var c = selectCell[0].sc
				var cell;
				if (selectCell.length > 0) {
					cell = sheetHot.getCellMeta(r, c);
				}
				if (cell) {
					if (cell.cellAttributeInfo)
						var value;
					switch (cell.cellAttributeInfo.opration) {
						case "single":
							value = "=" + name + "." + cell.cellAttributeInfo.field;
							break;
						case "select":
							value = "=" + name + ".Select(" + cell.cellAttributeInfo.field + ")";
							break;
						case "group":
							value = "=" + name + ".Group(" + cell.cell.cellAttributeInfo.field + ")";
							break;
					}
					cell.cellAttributeInfo.textValue.value = value;
					sheetHot.setDataAtCell(r, c, value);
					cell.cellAttributeInfo.dataSet = name;
					sheetHot.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
					sheetHot.setCellMeta(r, c, 'theCellChanged', true)
				}
			}
		});

		combods.addEventListener("focus", function() {
			if (combods.options.length > 0) {
				for (var i = combods.options.length; i >= 1; i--) {
					combods.options.remove(1);
				}
			}
			if (typeof xds == 'undefined') xds = parent.xds;
			var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
			storeRoot && storeRoot.eachChild(function(n) {
					var op = document.createElement("option");
					op._id = n.id;
					op.innerHTML = n.id;
					combods.appendChild(op);
				},
				this);
		});

		//数据字段发生变化时
		comboField.addEventListener("change", function() {

			var name = this.value;
			if (name != "请选择...") {
				var selectCell = sheetHot.dealInvert();
				var r = selectCell[0].sr;
				var c = selectCell[0].sc
				var cell;
				if (selectCell.length > 0) {
					cell = sheetHot.getCellMeta(r, c);
				}
				if (cell) {
					if (cell.cellAttributeInfo)
						var value;
					switch (cell.cellAttributeInfo.opration) {
						case "single":
							value = "=" + cell.cellAttributeInfo.dataSet + "." + name;
							break;
						case "select":
							value = "=" + cell.cellAttributeInfo.dataSet + ".Select(" + name + ")";
							break;
						case "group":
							value = "=" + cell.cellAttributeInfo.dataSet + ".Group(" + name + ")";
							break;
					}
					cell.cellAttributeInfo.textValue.value = value;
					sheetHot.setDataAtCell(r, c, value);
					cell.cellAttributeInfo.field = name;
					sheetHot.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
					sheetHot.setCellMeta(r, c, 'theCellChanged', true)
				}
			}
		});

		//数据设置发生变化时（单值、分组、列表等）
		comboOpration.addEventListener("change", function() {
			var name = this.value;
			if (name != "请选择...") {
				var selectCell = sheetHot.dealInvert();
				var r = selectCell[0].sr;
				var c = selectCell[0].sc
				var cell;
				if (selectCell.length > 0) {
					cell = sheetHot.getCellMeta(r, c);
				}
				if (cell) {
					if (cell.cellAttributeInfo)
						var value;
					switch (name) {
						case "单值":
							value = "=" + cell.cellAttributeInfo.dataSet + "." + cell.cellAttributeInfo.field;
							cell.cellAttributeInfo.opration = "single";
							sheetHot.changeAttributeInfo(r, c, 'extraDirection', 1)
							break;
							tore, hs
						case "列表":
							value = "=" + cell.cellAttributeInfo.dataSet + ".Select(" + cell.cellAttributeInfo.field + ")";
							cell.cellAttributeInfo.opration = "select";
							sheetHot.changeAttributeInfo(r, c, 'extraDirection', 2)
							break;
						case "分组":
							value = "=" + cell.cellAttributeInfo.dataSet + ".Group(" + cell.cellAttributeInfo.field + ")";
							cell.cellAttributeInfo.opration = "group";
							sheetHot.changeAttributeInfo(r, c, 'extraDirection', 2)
							break;
					}
					cell.cellAttributeInfo.textValue.value = value;
					sheetHot.setDataAtCell(r, c, value);
					sheetHot.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
					sheetHot.setCellMeta(r, c, 'theCellChanged', true)
				}
			}
		});

		// 表达式编辑区文本框
		valueInput.addEventListener("change", function() {
			var cell = sheetHot.dealInvert();
			if (cell && cell.length > 0) {
				for (var i = 0; i < cell.length; i++) {
					var setData = [];
					var arrys = cell[i];
					for (var r = arrys.sr; r <= arrys.er; r++) {
						for (var c = arrys.sc; c <= arrys.ec; c++) {
							var sdata = [];
							var cellInfo = sheetHot.getCellMeta(r, c);
							cellInfo.cellAttributeInfo.textValue.value = this.value;
							sdata.push(r);
							sdata.push(c);
							sdata.push(this.value);
							sheetHot.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
							sheetHot.setCellMeta(r, c, 'theCellChanged', true)
							setData.push(sdata);
						}
					}
					sheetHot.setDataAtCell(setData);
				}

			}
		});

		window.openVisualEditor = function(flag, value) {
			// var aLotOfExpression;
			//Ext.Msg.alert("提示", "正在开发中", function () { })
			// 
			var cell = sheetHot.dealInvert();
			var myurl;
			//判断是否需要打开界面就显示颜色选择器
			if (flag == 2 || flag == 3) {
				myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwSTxnY47C.html?color=' + true;
			} else {
				myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwSTxnY47C.html?color=' + false;
			}
			if (value == null) value = ''
			window.expWin = new vmd.window({
				url: myurl,
				auto: false,
				title: '表达式设置',
				height: 540,
				width: 702,
				modal: false,
				params: {
					expression: value
				},
				closeAction: 'hide'
			});
			window.BtnOk = function(exp) {
				//  
				if (cell && cell.length > 0) {
					for (var i = 0; i < cell.length; i++) {
						var setData = [];
						var arrys = cell[i];
						for (var r = arrys.sr; r <= arrys.er; r++) {
							for (var c = arrys.sc; c <= arrys.ec; c++) {
								var sdata = [];
								var cellInfo = sheetHot.getCellMeta(r, c);
								switch (flag) {
									case 0:
										cellInfo.cellAttributeInfo.textValue.value = exp;
										//sheetHot.setDataAtCell(r, c, exp);
										sdata.push(r);
										sdata.push(c);
										sdata.push(exp);
										setData.push(sdata);
										break;
									case 1:
										cellInfo.cellAttributeInfo.showValue.value = exp;
										parent.xds.eastlayout.reportInst.txtShowValue.setValue(exp);
										break;
									case 2:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_bgColor.value = exp;
										parent.xds.eastlayout.reportInst.nr_bgColor.setValue(exp);
										break;
									case 3:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_frontColor.value = exp;
										parent.xds.eastlayout.reportInst.nr_frontColor.setValue(exp);
										break;
									case 4:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_leftMargin.value = exp;
										parent.xds.eastlayout.reportInst.nr_leftMargin.setValue(exp);
										break;
									case 5:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_rowText.value = exp;
										parent.xds.eastlayout.reportInst.nr_rowText.setValue(exp);
										break;
									case 6:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_width.value = exp;
										parent.xds.eastlayout.reportInst.nr_width.setValue(exp);
										break;
									case 7:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_available.value = exp;
										parent.xds.eastlayout.reportInst.nr_available.setValue(exp);
										break;
									case 8:
										cellInfo.cellAttributeInfo.contentDetailInfo.nr_height.value = exp;
										parent.xds.eastlayout.reportInst.nr_height.setValue(exp);
										break;
									case 9:
										parent.xds.eastlayout.reportInst.hwReporting.re_expression.setValue(exp)

										for (var i = 0; i < sheetHot.checkArray.length; i++) {
											if (sheetHot.checkArray[i].id == sheetHot.checkId) {
												sheetHot.checkArray[i].expression = exp;
											}
										}
										break;
									case 'menuID':
										cellInfo.cellAttributeInfo.menu.menuID.value = exp;
										parent.xds.eastlayout.reportInst.hwLinkAndMenu.menuID.setValue(exp)
										parent.sheetHot.handleMenus('menuID', exp)
										break;
									case 'linkParam':
										cellInfo.cellAttributeInfo.leftLink.linkParam.value = exp;
										parent.xds.eastlayout.reportInst.hwLinkAndMenu.linkParam.setValue(exp)
										parent.sheetHot.handleMenus('linkParam', exp)
										break;
									case 'menuParam':
										cellInfo.cellAttributeInfo.menu.menuParam.value = exp;
										parent.xds.eastlayout.reportInst.hwLinkAndMenu.menuParam.setValue(exp)
										parent.sheetHot.handleMenus('menuParam', exp)
										break;
									case 'xlk':
										cellInfo.cellAttributeInfo.cell_ComboInfo.xlk_filterCondition.value = exp;
										parent.xds.eastlayout.reportInst.CellTypeProperty.ComboTypeProperty.hwData_xlk.data_filterCondition.setValue(exp)
										break;
									case 'dxan':
										cellInfo.cellAttributeInfo.cell_RadioButtonInfo.dxan_filterCondition.value = exp;
										parent.xds.eastlayout.reportInst.CellTypeProperty.RadioButtonProperty.hwData_xlk.data_filterCondition.setValue(exp)
										break;
									case 'fxk':
										cellInfo.cellAttributeInfo.cell_CheckBoxInfo.fxk_filterCondition.value = exp;
										parent.xds.eastlayout.reportInst.CellTypeProperty.CheckBoxProperty.hwData_xlk.data_filterCondition.setValue(exp)
										break;
								}

								sheetHot.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
								sheetHot.setCellMeta(r, c, 'theCellChanged', true)
							}
						}
						if (flag == 0) {
							sheetHot.setDataAtCell(setData);
						}
					}
				}

			}
			window.expWin.show();
		}

		btn.addEventListener("click", function() {
			//   openVisualEditor(0, sheetHot.selectCell.cell.innerText);
			var selectCell = sheetHot.getSelected();
			var value = "";
			if (selectCell.length > 0) {
				value = sheetHot.getDataAtCell(selectCell[0][0], selectCell[0][1]);
			}
			openVisualEditor(0, value);
		});

		this.flList = [];
		this.fpList = [];
		// window.grid = me;
		window.setGridInfo = function(flobj, fpobj) {
			if (flobj) {
				var flag = false;
				var no;
				if (sheetHot.flList.length > 0) {
					for (var key in sheetHot.flList) {
						if (sheetHot.flList[key].flSRow == flobj.flSRow &&
							sheetHot.flList[key].flSCol == flobj.flSCol &&
							sheetHot.flList[key].flECol == flobj.flECol &&
							sheetHot.flList[key].flERow == flobj.flERow
						) {
							flag = true
							no = key;
						}
					}
				}
				if (flag) {
					sheetHot.flList[no].seg_columnsNumber.value = flobj.seg_columnsNumber.value;
					sheetHot.flList[no].seg_applyTo.value = flobj.seg_applyTo.value;
					sheetHot.flList[no].seg_columnsMargin.value = flobj.seg_columnsMargin.value;
					sheetHot.flList[no].seg_condition.value = flobj.seg_condition.value;
					sheetHot.flList[no].seg_dividingLine.value = flobj.seg_dividingLine.value;
					sheetHot.flList[no].seg_style.value = flobj.seg_style.value;
				} else {
					sheetHot.flList.push(flobj)
				}
			}
			if (fpobj) {
				var flag = false;
				var no;
				if (sheetHot.fpList.length > 0) {
					for (var key in sheetHot.fpList) {
						if (sheetHot.fpList[key].flSRow == fpobj.fpSRow &&
							sheetHot.fpList[key].flSCol == fpobj.fpSCol &&
							sheetHot.fpList[key].flECol == fpobj.fpECol &&
							sheetHot.fpList[key].flERow == fpobj.fpERow
						) {
							flag = true
							no = key;
						}
					}
				}
				if (flag) {
					sheetHot.fpList[no].seg_emptyCol.checked = fpobj.seg_emptyCol.checked;
					sheetHot.fpList[no].seg_emptyRow.checked = fpobj.seg_emptyRow.checked;
					sheetHot.fpList[no].seg_sliceName.value = fpobj.seg_sliceName.value;
					sheetHot.fpList[no].seg_fp.checked = fpobj.seg_fp.checked;
				} else {
					sheetHot.fpList.push(fpobj)
				}
			}
		};
		window.expAlreadyInit = true;
	}
}

Handsontable.Core.prototype.expeditMutual = function(cell) {
	var sr = cell.sr;
	var sc = cell.sc;
	var er = cell.er;
	var ec = cell.ec;
	if ((sr == er && sc == ec) || this.getCellMeta(sr, sc).mergeId == 1) {
		//设置选取的单元格id
		var inputID = document.getElementById("exp_cellName") || document.getElementsByClassName('expinput')[0];
		var expInput = document.getElementById("exp_dataSet") || document.getElementsByClassName("expdiv")[1];
		if (inputID) {
			inputID.value = this.convert(sc + 1) + (sr + 1);
		}
		//判断是否是数据集字段
		var cd = this.getDataAtCell(sr, sc);
		cd = cd == null ? '' : cd;
		var valueInput = document.getElementById('exp_cellValue') || document.getElementsByClassName("exp_value_input")[0];
		if (valueInput) {
			if (cd.indexOf('=') > -1) {
				valueInput.style.display = 'none';
				expInput.style.display = '';
				//取值修改下拉框
				// combods
				// comboField
				// comboOpration
				this.paser(cd, this.getCellMeta(sr, sc).cellAttributeInfo, xds.active && xds.active.component.id || parent.xds.active && parent.xds.active.component.id)

			} else {
				valueInput.style.display = '';
				expInput.style.display = 'none';
				valueInput.value = cd;
			}
		}
	}
}

Handsontable.Core.prototype.paser = function(exp, cellInfo, reportid) {
	var e = exp.trim().substring(1);
	var s = e.split(".");
	if (s.length > 1) {
		cellInfo.dataSet = s[0];
		// 数据集
		var all_options = document.getElementById("combods") && document.getElementById("combods").options || document.getElementsByClassName("expcombobox")[0].options;
		// 数据列
		var comboField = document.getElementById("comboField") || document.getElementsByClassName("expcombobox")[1];
		//数据设置
		var cmbOpration = document.getElementById("comboOpration") || document.getElementsByClassName("expcombobox")[2];

		for (i = 0; i < all_options.length; i++) {
			//通过数据集获取在vmd2.0中定义的名称
			var ds = getDSByDsName(s[0], reportid);
			if (ds && all_options[i]._id == ds) // 根据option标签的ID来进行判断
			{
				all_options[i].selected = true;
				setFieldCmb(ds, comboField);
				break;
			}
		}
		var opr = "";
		if (s[1].indexOf("(") > -1) {
			var op = s[1].split('(');
			if (op.length > 1) {
				if (op[0] == "Select") {
					cellInfo.opration = "select";
					opr = "列表";
				} else if (op[0] == "Group") {
					cellInfo.opration = "group";
					opr = "分组";
				}
				var field = op[1].split(')');
				cellInfo.field = field[0];
			}
		} else {
			cellInfo.field = s[1];
			opr = "单值";
		}
		for (i = 0; i < comboField.options.length; i++) {
			if (i > 0 && comboField.options[i]._id.toLowerCase() == cellInfo.field.toLowerCase()) // 根据option标签的ID来进行判断
			{
				comboField.options[i].selected = true;
				break;
			}
		}
		for (i = 0; i < cmbOpration.options.length; i++) {
			if (i > 0 && cmbOpration.options[i]._id == opr) // 根据option标签的ID来进行判断
			{
				cmbOpration.options[i].selected = true;
				break;
			}
		}
	}
};

getDSByDsName = function(dsName, reportid) {
	var r_store;
	if (!dsName)
		return r_store;
	var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
	if (typeof storeRoot != 'undefined') {
		storeRoot.eachChild(function(n) {
			var dsname;
			if (n.component && n.component.getConfig()) {
				dsname = n.component.getConfig().dsName;
				if (reportid) {
					if (dsname && dsname.indexOf(reportid) > -1) {
						var indexCount = dsname.indexOf(reportid);
						if (dsname.length > indexCount) {
							dsname = dsname.substring(indexCount + reportid.length + 1);
						}
					}
				}
			}
			if (dsName == n.id || dsname == dsName) {
				r_store = n.id;
			}
		}, this);
	}
	return r_store;
}

setFieldCmb = function(dsname, comboField) {
	if (comboField.options.length > 0) {
		for (var i = comboField.options.length; i >= 1; i--) {
			comboField.options.remove(1);
		}
	}
	// 数据字段设置
	if (typeof xds == 'undefined') xds = parent.xds;
	var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
	var storeNode = storeRoot && storeRoot.findChildBy(function() {
		return this.id == dsname;
	});
	storeNode && storeNode.eachChild(function(c) {
		var op = document.createElement("option");
		op._id = c.text;
		op.innerHTML = c.text;
		comboField.appendChild(op);
	}, this);
}



Handsontable.Core.prototype.addInitInfo = function(initInfo) {
	if (initInfo) {

		this.colHeadArray = initInfo.colHeadArray;
		this.colHeadWidthArray = initInfo.colHeadWidthArray;
		this.rowHeadArray = initInfo.rowHeadArray;
		//设置行类型
		for (var i = 0; i < this.rowHeadArray.length; i++) {
			var info = this.rowHeadArray[i];
			if (info) {
				if (info.indexOf('标题') > 0) {
					this.setCellMeta(i, 0, 'rowtype', 'title')
				}
				if (info.indexOf('表头') > 0) {
					this.setCellMeta(i, 0, 'rowtype', 'header')
				}
				if (info.indexOf('数据') > 0) {
					this.setCellMeta(i, 0, 'rowtype', 'data')
				}
				if (info.indexOf('yincang') > 0) {
					this.setCellMeta(i, 0, 'row_hide', true)
				}
			}
		}
		// 解析模板，列隐藏的设置列隐藏属性（打开已定制的模板用到）  2019-11-8 lf 
		for(var i=0;i<this.colHeadWidthArray.length;i++){
			var colwidth=this.colHeadWidthArray[i];
			if (colwidth== 0) {
				this.setCellMeta(0, i, 'col_hide', true)
			}
		}

		this.rowHeadHeightArray = initInfo.rowHeadHeightArray;
		this.fixedrow = initInfo.fixedRowsTop;
		this.fixedcol = initInfo.fixedColumnsLeft;
		this.nestedTableArray = initInfo.nestedTableArray;
		this.fpArray = initInfo.fpArray;
		this.fathers = initInfo.fathers;
		this.readOnly = initInfo.readOnly;
		this.flArray = initInfo.flList;

		this.submitArray = initInfo.submitArray;
		this.checkArray = initInfo.checkArray;
		this.filter = initInfo.filter;
		this.dataInfo = initInfo.dataInfo;

		// 设置列锁定属性（打开模板不能设置取消列锁定，因此添加）2020-1-7 lf
		for(var i=0;i<this.fixedcol;i++){
			this.setCellMeta(0, i, 'col_lock', true)
		}

		// this.menus = [];
		// // this.menus = initInfo.menus;

		// for (var key in initInfo.menus) {
		// 	// var info = initInfo.menus[key];
		// 	// var name = info.cellName
		// 	// var num = name.replace(/[^0-9]/ig, "");
		// 	// var letter = name.split(num)[0]
		// 	// var row = this.engToNum(letter) - 1
		// 	// var col = num - 1
		// 	// this.changeAttributeInfo(row, col, 'menuID', info.id)
		// 	// this.changeAttributeInfo(row, col, 'menuPID', info.pid)
		// 	// this.changeAttributeInfo(row, col, 'menuDataset', info.sets)
		// 	// this.changeAttributeInfo(row, col, 'menuParam', info.params)
		// 	// this.changeAttributeInfo(row, col, 'menuText', info.text)
		// 	// this.changeAttributeInfo(row, col, 'menuSource', info.source)
		// 	this.menus.push(initInfo.menus[key])
		// }

		//拿到flList和fpList中的已有的分栏分片画上边框
		if (this.fpArray) {
			for (var x = 0; x < this.fpArray.length; x++) {
				//重绘外边框
				var sr = this.fpArray[x].sr
				var sc = this.fpArray[x].sc
				var er = this.fpArray[x].er
				var ec = this.fpArray[x].ec
				var ms = '2px solid #000'

				for (var a = sr; a < er + 1; a++) {
					if (sc == 0) {
						// handsontable.changeAttributeInfo(a, sc, 'borderL', ms)
						if (this.getCell(a, sc) && this.getCell(a, sc).style)
							this.getCell(a, sc).style.borderLeft = ms;
					} else {
						// handsontable.changeAttributeInfo(a, sc - 1, 'borderR', ms)
						if (this.getCell(a, sc - 1) && this.getCell(a, sc - 1).style)
							this.getCell(a, sc - 1).style.borderRight = ms;
					}
				}
				for (var b = sc; b < ec + 1; b++) {
					if (sr == 0) {
						// handsontable.changeAttributeInfo(sr, b, 'borderT', ms)
						if (this.getCell(sr, b) && this.getCell(sr, b).style)
							this.getCell(sr, b).style.borderTop = ms;
					} else {
						// handsontable.changeAttributeInfo(sr - 1, b, 'borderB', ms)
						if (this.getCell(sr - 1, b) && this.getCell(sr - 1, b).style)
							this.getCell(sr - 1, b).style.borderBottom = ms;
					}
				}
				for (var b = sc; b < ec + 1; b++) {
					// handsontable.changeAttributeInfo(er, b, 'borderB', ms)
					if (this.getCell(er, b) && this.getCell(er, b).style)
						this.getCell(er, b).style.borderBottom = ms;
				}
				for (var b = sr; b < er + 1; b++) {
					// handsontable.changeAttributeInfo(b, ec, 'borderR', ms)
					if (this.getCell(b, ec) && this.getCell(b, ec).style)
						this.getCell(b, ec).style.borderRight = ms;
				}
			}
			this.updateSettings({})
		}
	}
	this.render()
}

//初始化在线编辑区，新建模板或者加载在线编辑的模板时调用
function initWebEditArea(me) {
	//  var me = this;
	// 添加表达式编辑区
	//exp.id = "expdiv";
	var exp = document.createElement("div");
	me.exp = exp;
	exp.style.height = "30px";
	exp.style.border = " 1px solid rgba(0, 0, 0, .15)";
	var d1 = document.createElement("div");
	d1.className = "expdiv";
	exp.appendChild(d1);
	var input = document.createElement("input");
	//input.id = "expinput";
	me.expinput = input;
	input.className = "expinput";
	d1.appendChild(input);
	var btn = document.createElement("button");
	btn.className = "expbtn";
	d1.appendChild(btn);
	var exp1 = document.createElement("div");
	me.datasetExp = exp1;
	//exp1.id = "datasetExp";
	exp1.className = "expdiv";
	exp1.style.display = "none";
	exp.appendChild(exp1);
	var exp2 = document.createElement("div");
	me.valuediv = exp2;
	//exp2.id = "valuediv";
	exp2.className = "expdiv";
	exp2.style.display = "";
	exp.appendChild(exp2);
	var valueInput = document.createElement("input");
	me.valueInput = valueInput;
	//valueInput.id = "valueInput";
	valueInput.className = "exp_value_input";
	exp2.appendChild(valueInput);
	var lable = document.createElement("label");
	lable.innerHTML = "数据集：";
	lable.className = "explabel";
	exp1.appendChild(lable);
	var combods = document.createElement("select");
	//combods.id = "cmbDataset";
	me.cmbDataset = combods
	combods.className = "expcombobox";
	exp1.appendChild(combods);
	var opNone = document.createElement("option");
	opNone.innerHTML = "请选择...";
	opNone.selected = true;
	opNone.disabled = true;
	combods.appendChild(opNone);
	if (typeof xds == 'undefined') xds = parent.xds;

	var storeRoot = parent.xds.vmd.getRootNode("dataset");
	storeRoot && storeRoot.eachChild(function(n) {
			var op = document.createElement("option");
			op._id = n.id;
			op.innerHTML = n.id;
			combods.appendChild(op);
		},
		me);
	var lable1 = document.createElement("label");
	lable1.innerHTML = "数据列：";
	lable1.className = "explabel";
	exp1.appendChild(lable1);
	var comboField = document.createElement("select");
	//comboField.id = "cmbFiled";
	me.cmbFiled = comboField
	comboField.className = "expcombobox";
	var opNone = document.createElement("option");
	opNone.innerHTML = "请选择...";
	opNone.selected = true;
	opNone.disabled = true;
	comboField.appendChild(opNone);
	exp1.appendChild(comboField);
	var lable2 = document.createElement("label");
	lable2.innerHTML = "数据设置：";
	lable2.className = "explabel";
	exp1.appendChild(lable2);
	var comboOpration = document.createElement("select");
	me.cmbOpration = comboOpration
	//comboOpration.id = "cmbOpration";
	comboOpration.className = "expcombobox";
	var opNone = document.createElement("option");
	opNone.innerHTML = "请选择...";
	opNone.selected = true;
	opNone.disabled = true;
	comboOpration.appendChild(opNone);
	var opSingle = document.createElement("option");
	opSingle._id = "单值";
	opSingle.innerHTML = "单值";
	comboOpration.appendChild(opSingle);
	var opSelect = document.createElement("option");
	opSelect._id = "列表";
	opSelect.innerHTML = "列表";
	comboOpration.appendChild(opSelect);
	var opGroup = document.createElement("option");
	opGroup._id = "分组";
	opGroup.innerHTML = "分组";
	comboOpration.appendChild(opGroup);
	exp1.appendChild(comboOpration);
	me.expEl.appendChild(exp);
	//this.el.appendChild(exp);
	// 数据集下拉框选项改变事件
	combods.addEventListener("change", function() {

		var name = this.value;
		if (name != "请选择...") {
			if (comboField.options.length > 0) {
				for (var i = comboField.options.length; i >= 1; i--) {
					comboField.options.remove(1);
				}
			}
			// 数据字段设置
			if (typeof xds == 'undefined') xds = parent.xds;
			var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");

			var storeNode = storeRoot && storeRoot.findChildBy(function() {
				return this.id == name;
			});
			storeNode && storeNode.eachChild(function(c) {

				var op = document.createElement("option");
				op._id = c.text;
				op.innerHTML = c.text;
				comboField.appendChild(op);
			}, me);

			var selectCell = me.grid.dealInvert();
			var r = selectCell[0].sr;
			var c = selectCell[0].sc
			var cell;
			if (selectCell.length > 0) {
				cell = me.grid.getCellMeta(r, c);
			}
			if (cell) {
				if (cell.cellAttributeInfo)
					var value;
				switch (cell.cellAttributeInfo.opration) {
					case "single":
						value = "=" + name + "." + cell.cellAttributeInfo.field;
						break;
					case "select":
						value = "=" + name + ".Select(" + cell.cellAttributeInfo.field + ")";
						break;
					case "group":
						value = "=" + name + ".Group(" + cell.cell.cellAttributeInfo.field + ")";
						break;
				}
				cell.cellAttributeInfo.textValue.value = value;
				me.grid.setDataAtCell(r, c, value);
				cell.cellAttributeInfo.dataSet = name;
				me.grid.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
				me.grid.setCellMeta(r, c, 'theCellChanged', true)
			}
		}
	});

	combods.addEventListener("focus", function() {
		if (combods.options.length > 0) {
			for (var i = combods.options.length; i >= 1; i--) {
				combods.options.remove(1);
			}
		}
		if (typeof xds == 'undefined') xds = parent.xds;
		var storeRoot = xds.vmd.getRootNode("dataset") || parent.xds.vmd.getRootNode("dataset");
		storeRoot && storeRoot.eachChild(function(n) {
				var op = document.createElement("option");
				op._id = n.id;
				op.innerHTML = n.id;
				combods.appendChild(op);
			},
			this);
	});

	//数据字段发生变化时
	comboField.addEventListener("change", function() {
		var name = this.value;
		if (name != "请选择...") {
			var selectCell = me.grid.dealInvert();
			var r = selectCell[0].sr;
			var c = selectCell[0].sc
			var cell;
			if (selectCell.length > 0) {
				cell = me.grid.getCellMeta(r, c);
			}
			if (cell) {
				if (cell.cellAttributeInfo)
					var value;
				switch (cell.cellAttributeInfo.opration) {
					case "single":
						value = "=" + cell.cellAttributeInfo.dataSet + "." + name;
						break;
					case "select":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Select(" + name + ")";
						break;
					case "group":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Group(" + name + ")";
						break;
				}
				cell.cellAttributeInfo.textValue.value = value;
				me.grid.setDataAtCell(r, c, value);
				cell.cellAttributeInfo.field = name;
				me.grid.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
				me.grid.setCellMeta(r, c, 'theCellChanged', true)
			}
		}
	});
	//数据设置发生变化时（单值、分组、列表等）
	comboOpration.addEventListener("change", function() {
		var name = this.value;
		if (name != "请选择...") {
			var selectCell = me.grid.dealInvert();
			var r = selectCell[0].sr;
			var c = selectCell[0].sc
			var cell;
			if (selectCell.length > 0) {
				cell = me.grid.getCellMeta(r, c);
			}
			if (cell) {
				if (cell.cellAttributeInfo)
					var value;
				switch (name) {
					case "单值":
						value = "=" + cell.cellAttributeInfo.dataSet + "." + cell.cellAttributeInfo.field;
						cell.cellAttributeInfo.opration = "single";
						me.grid.changeAttributeInfo(r, c, 'extraDirection', 1)
						break;
						tore, hs
					case "列表":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Select(" + cell.cellAttributeInfo.field + ")";
						cell.cellAttributeInfo.opration = "select";
						me.grid.changeAttributeInfo(r, c, 'extraDirection', 2)
						break;
					case "分组":
						value = "=" + cell.cellAttributeInfo.dataSet + ".Group(" + cell.cellAttributeInfo.field + ")";
						cell.cellAttributeInfo.opration = "group";
						me.grid.changeAttributeInfo(r, c, 'extraDirection', 2)
						break;
				}
				cell.cellAttributeInfo.textValue.value = value;
				me.grid.setDataAtCell(r, c, value);
				me.grid.setCellMeta(r, c, 'cellAttributeInfo', cell.cellAttributeInfo)
				me.grid.setCellMeta(r, c, 'theCellChanged', true)
			}
		}
	});
	// 表达式编辑区文本框
	valueInput.addEventListener("change", function() {
		var cell = me.grid.dealInvert();
		if (cell && cell.length > 0) {
			for (var i = 0; i < cell.length; i++) {
				var setData = [];
				var arrys = cell[i];
				for (var r = arrys.sr; r <= arrys.er; r++) {
					for (var c = arrys.sc; c <= arrys.ec; c++) {
						var sdata = [];
						var cellInfo = me.grid.getCellMeta(r, c);
						cellInfo.cellAttributeInfo.textValue.value = this.value;
						sdata.push(r);
						sdata.push(c);
						sdata.push(this.value);
						me.grid.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
						me.grid.setCellMeta(r, c, 'theCellChanged', true)
						setData.push(sdata);
					}
				}
				me.grid.setDataAtCell(setData);
			}

		}
	});

	window.openVisualEditor = function(flag, value) {
		// var aLotOfExpression;
		//Ext.Msg.alert("提示", "正在开发中", function () { })
		// 
		var cell = me.grid.dealInvert();
		var myurl;
		//判断是否需要打开界面就显示颜色选择器
		if (flag == 2 || flag == 3) {
			myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwSTxnY47C.html?color=' + true;
		} else {
			myurl = '/system/modules/eQ9ULgcVb1/eQ9ULgcVb5/hwihB4MLqR/hwSTxnY47C.html?color=' + false;
		}
		if (value == null) value = ''
		window.expWin = new vmd.window({
			url: myurl,
			auto: false,
			title: '表达式设置',
			height: 540,
			width: 702,
			modal: false,
			params: {
				expression: value
			},
			closeAction: 'hide'
		});
		window.BtnOk = function(exp) {
			//  
			if (cell && cell.length > 0) {
				for (var i = 0; i < cell.length; i++) {
					var setData = [];
					var arrys = cell[i];
					for (var r = arrys.sr; r <= arrys.er; r++) {
						for (var c = arrys.sc; c <= arrys.ec; c++) {
							var sdata = [];
							var cellInfo = me.grid.getCellMeta(r, c);
							switch (flag) {
								case 0:
									cellInfo.cellAttributeInfo.textValue.value = exp;
									//me.grid.setDataAtCell(r, c, exp);
									sdata.push(r);
									sdata.push(c);
									sdata.push(exp);
									setData.push(sdata);
									break;
								case 1:
									cellInfo.cellAttributeInfo.showValue.value = exp;
									parent.xds.eastlayout.reportInst.txtShowValue.setValue(exp);
									break;
								case 2:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_bgColor.value = exp;
									parent.xds.eastlayout.reportInst.nr_bgColor.setValue(exp);
									break;
								case 3:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_frontColor.value = exp;
									parent.xds.eastlayout.reportInst.nr_frontColor.setValue(exp);
									break;
								case 4:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_leftMargin.value = exp;
									parent.xds.eastlayout.reportInst.nr_leftMargin.setValue(exp);
									break;
								case 5:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_rowText.value = exp;
									parent.xds.eastlayout.reportInst.nr_rowText.setValue(exp);
									break;
								case 6:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_width.value = exp;
									parent.xds.eastlayout.reportInst.nr_width.setValue(exp);
									break;
								case 7:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_available.value = exp;
									parent.xds.eastlayout.reportInst.nr_available.setValue(exp);
									break;
								case 8:
									cellInfo.cellAttributeInfo.contentDetailInfo.nr_height.value = exp;
									parent.xds.eastlayout.reportInst.nr_height.setValue(exp);
									break;
								case 9:

									parent.xds.eastlayout.reportInst.hwReporting.re_expression.setValue(exp)
									for (var i = 0; i < sheetHot.checkArray.length; i++) {
										if (sheetHot.checkArray[i].id == sheetHot.checkId) {
											sheetHot.checkArray[i].expression = exp
										}
									}
									break;
								case 'menuID':
									cellInfo.cellAttributeInfo.menu.menuID.value = exp;
									parent.xds.eastlayout.reportInst.hwLinkAndMenu.menuID.setValue(exp)
									parent.sheetHot.handleMenus('menuID', exp)
									break;
								case 'linkParam':
									cellInfo.cellAttributeInfo.leftLink.linkParam.value = exp;
									parent.xds.eastlayout.reportInst.hwLinkAndMenu.linkParam.setValue(exp)
									parent.sheetHot.handleMenus('linkParam', exp)
									break;
								case 'menuParam':
									cellInfo.cellAttributeInfo.menu.menuParam.value = exp;
									parent.xds.eastlayout.reportInst.hwLinkAndMenu.menuParam.setValue(exp)
									parent.sheetHot.handleMenus('menuParam', exp)
									break;
								case 'xlk':
									cellInfo.cellAttributeInfo.cell_ComboInfo.xlk_filterCondition.value = exp;
									parent.xds.eastlayout.reportInst.CellTypeProperty.ComboTypeProperty.hwData_xlk.data_filterCondition.setValue(exp)
									break;
								case 'dxan':
									cellInfo.cellAttributeInfo.cell_RadioButtonInfo.dxan_filterCondition.value = exp;
									parent.xds.eastlayout.reportInst.CellTypeProperty.RadioButtonProperty.hwData_xlk.data_filterCondition.setValue(exp)
									break;
								case 'fxk':
									cellInfo.cellAttributeInfo.cell_CheckBoxInfo.fxk_filterCondition.value = exp;
									parent.xds.eastlayout.reportInst.CellTypeProperty.CheckBoxProperty.hwData_xlk.data_filterCondition.setValue(exp)
									break;
							}

							me.grid.setCellMeta(r, c, 'cellAttributeInfo', cellInfo.cellAttributeInfo)
							me.grid.setCellMeta(r, c, 'theCellChanged', true)
						}
					}
					if (flag == 0) {
						me.grid.setDataAtCell(setData);
					}
				}
			}

		}
		window.expWin.show();
	}

	btn.addEventListener("click", function() {
		//   openVisualEditor(0, me.grid.selectCell.cell.innerText);
		var selectCell = me.grid.getSelected();
		var value = "";
		if (selectCell.length > 0) {
			value = me.grid.getDataAtCell(selectCell[0][0], selectCell[0][1]);
		}
		openVisualEditor(0, value);
	});

	me.flList = [];
	me.fpList = [];
	window.grid = me;
	window.setGridInfo = function(flobj, fpobj) {
		if (flobj) {
			var flag = false;
			var no;
			if (me.grid.flList.length > 0) {
				for (var key in me.grid.flList) {
					if (me.grid.flList[key].flSRow == flobj.flSRow &&
						me.grid.flList[key].flSCol == flobj.flSCol &&
						me.grid.flList[key].flECol == flobj.flECol &&
						me.grid.flList[key].flERow == flobj.flERow
					) {
						flag = true
						no = key;
					}
				}
			}
			if (flag) {
				me.grid.flList[no].seg_columnsNumber.value = flobj.seg_columnsNumber.value;
				me.grid.flList[no].seg_applyTo.value = flobj.seg_applyTo.value;
				me.grid.flList[no].seg_columnsMargin.value = flobj.seg_columnsMargin.value;
				me.grid.flList[no].seg_condition.value = flobj.seg_condition.value;
				me.grid.flList[no].seg_dividingLine.value = flobj.seg_dividingLine.value;
				me.grid.flList[no].seg_style.value = flobj.seg_style.value;
			} else {
				me.grid.flList.push(flobj)
			}
		}
		if (fpobj) {
			var flag = false;
			var no;
			if (me.grid.fpList.length > 0) {
				for (var key in me.grid.fpList) {
					if (me.grid.fpList[key].flSRow == fpobj.fpSRow &&
						me.grid.fpList[key].flSCol == fpobj.fpSCol &&
						me.grid.fpList[key].flECol == fpobj.fpECol &&
						me.grid.fpList[key].flERow == fpobj.fpERow
					) {
						flag = true
						no = key;
					}
				}
			}
			if (flag) {
				me.grid.fpList[no].seg_emptyCol.checked = fpobj.seg_emptyCol.checked;
				me.grid.fpList[no].seg_emptyRow.checked = fpobj.seg_emptyRow.checked;
				me.grid.fpList[no].seg_sliceName.value = fpobj.seg_sliceName.value;
				me.grid.fpList[no].seg_fp.checked = fpobj.seg_fp.checked;
			} else {
				me.grid.fpList.push(fpobj)
			}
		}
	};
}

// //处理沙雕边框选择框，其他地方点击关闭
// $(document).click(function() {
// 	
// });
// $("#toolbar_border_palette").click(function(event) {
// 	event.stopPropagation();
// });



Ext.define("vmd.report.ClipBord", {
	constructor: function(grid) {
		this.hot = grid;
		this.copyCallbacks = [];
		this.cutCallbacks = [];
		this.pasteCallbacks = [];
		this.mObjects = null;
		this.mCopyText = "";
		this.mStyles = null;
		this.mClasses = null;
		this.mMergeCells = null;
	},
	onpaste: function(e) {
		var t, n;
		var r = this;
		var o = this;
		var i = function(e) {
			return true;
		};
		if (i(e.target) && "WebkitAppearance" in document.documentElement.style) {
			t = e.clipboardData.getData("Text"), -1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && ("" === (n = t.split("\n"))[n.length - 1] && n.pop(), t = n.join("\n")), n = t.split("\n");
			for (var o = 0; o < n.length - 1; o++) {
				var a = n[o].length;
				13 === n[o].slice(a - 1).charCodeAt() && (n[o] = n[o].slice(0, a - 1))
			}
			if (t = n.join("\n"), r.mObjects = null, t === r.ObjectCopyFlag) r.mObjects = e.clipboardData.getData("text/json"), r.mObjects = JSON.parse(r.mObjects);
			else if (r.mCopyText !== t) {
				var s = r.parseCopyContent2Table(e);
				s ? (r.mCopyText = s && s.data ? s.data : t, r.mStyles = s && s.styles ? s.styles : null, r.mTemplate = s && s.template ? s.template : null, r.mMergeCells = s && s.mergeCells ? s.mergeCells : null, r.mFormula = s && s.formula ? s.formula : null, r.mClasses = null, r.isMaintaining = !0) : r.parseCopyImgs(e) || r.automaticIdentifyLink.call(r, t)
			} else t || r.parseCopyImgs(e);
			sheetHot.copyFromOut = r;
			return this.value = t, !1
		}
	},
	parseCopyContent2Table: function(e) {
		if (!e || !e.clipboardData) return null;
		var t = e.clipboardData.getData("text/html"),
			n = this.clipCopyContent(t),
			o = null;
		if (n) {
			var r = this.getTableHTML(n);
			o = this.parsePasteTableHTML(r)
		}
		return o
	},
	getTableHTML: function(e) {
		if (!e) return null;
		if (!(e = this.securityCheck(e))) return null;
		var t = document.createElement("iframe");
		t.name = ["copyTemplate"], t.style.position = "absolute", t.style.top = "99999px", t.style.left = "99999px", document.body.appendChild(t), window.frames.copyTemplate.document.body.innerHTML = e, setTimeout(function() {
			t.remove()
		}, 0);
		var n = window.frames.copyTemplate.document,
			o = n.body.lastElementChild;
		return o && o.tagName && "table" == o.tagName.toLowerCase() ? o : (o = window.frames.copyTemplate.document.getElementsByTagName("table")[0]) || (this.isSingleSpanOfBodyChildren(n) ? o = this.prepareSingleCellTable(n) : null)
	},
	clipCopyContent: function(e) {
		if (!e) return null;
		var t = e.indexOf("<html"),
			n = e.lastIndexOf("</html>"),
			o = null;
		return -1 != t && -1 != n && (n += "</html>".length, o = e.substring(t, n)), o
	},
	parseCopyImgs: function(e) {
		if (!e || !e.clipboardData) return null;
		for (var t = e.clipboardData.items, n = 0; n < t.length; ++n) {
			var o = t[n];
			if ("image/png" == o.type || "image/jpeg" == o.type) {
				var r = o.getAsFile();
				this.mObjects ? this.mObjects.push(r) : this.mObjects = [r]
			}
		}
		return this.mObjects && this.mObjects.length
	},
	automaticIdentifyLink: function(e) {},
	setClipboardData: function(e, t) {
		e && (e.plain || e.html) && (t.clipboardData ? (t.clipboardData.clearData(), e.plain && t.clipboardData.setData("text/plain", e.plain), e.html && t.clipboardData.setData("text/html", e.html), e.json && t.clipboardData.setData("text/json", e.json), t.preventDefault()) : window.clipboardData && (window.clipboardData.clearData(), e.plain && window.clipboardData.setData("text", e.plain), t.preventDefault()))
	},
	selectNodeText: function(e) {
		e && e.select()
	},
	getSelectionText: function() {
		var e = "";
		return window.getSelection ? e = window.getSelection().toString() : document.selection && "Control" !== document.selection.type && (e = document.selection.createRange().text), e
	},
	getInnerCopyData: function() {
		var e = {
			mCopyText: this.mCopyText || null,
			mStyles: this.mStyles || null,
			mClasses: this.mClasses || null,
			mTemplate: this.mTemplate || null
		};
		return JSON.stringify(e)
	},
	copyable: function(e, t, n, o, r, i) {
		if (e != this.ObjectCopyFlag) {
			if ("string" != typeof e && void 0 === e.toString) throw new Error("copyable requires string parameter");
			Handsontable.mobileBrowser || (this.elTextarea.value = e, this.selectNodeText(this.elTextarea)), t && n && o && (this.mCopyText = e, this.mStyles = t, this.mClasses = n, this.mMergeCells = r, this.isMaintaining = !1, this.mTemplate = o, this.mFormula = i)
		} else this.mCopyText = this.ObjectCopyFlag
	},
	clearCopyData: function() {
		this.mCopyText = null, this.mStyles = null, this.mTemplate = null, this.mClasses = null, this.mFiles = null, this.mObjects = null, this.isMaintaining = !0, this.mMergeCells = null
	},
	onCopy: function(e) {
		this.copyCallbacks.push(e)
	},
	onCut: function(e) {
		this.cutCallbacks.push(e)
	},
	onPaste: function(e) {
		this.pasteCallbacks.push(e)
	},
	removeCallback: function(e) {
		var t, n;
		for (t = 0, n = this.copyCallbacks.length; t < n; t++)
			if (this.copyCallbacks[t] === e) return this.copyCallbacks.splice(t, 1), !0;
		for (t = 0, n = this.cutCallbacks.length; t < n; t++)
			if (this.cutCallbacks[t] === e) return this.cutCallbacks.splice(t, 1), !0;
		for (t = 0, n = this.pasteCallbacks.length; t < n; t++)
			if (this.pasteCallbacks[t] === e) return this.pasteCallbacks.splice(t, 1), !0;
		return !1
	},
	triggerCopy: function(e) {
		var t = null;
		if (this.copyCallbacks)
			for (var n = 0, o = this.copyCallbacks.length; n < o; n++) {
				var r = this.copyCallbacks[n](e);
				r && (t = r)
			}
		return t
	},
	triggerCut: function(e) {
		var t = null;
		if (this.cutCallbacks)
			for (var n = 0, o = this.cutCallbacks.length; n < o; n++) {
				var r = this.cutCallbacks[n](e);
				r && (t = r)
			}
		return t
	},
	triggerPaste: function(e, t) {
		var n = this;
		n.pasteCallbacks && (void 0 === t && window && window.clipboardData && (t = window.clipboardData.getData("Text")) !== n.mCopyText && n.automaticIdentifyLink.call(n, t), setTimeout(function() {
			for (var o = t || n.mCopyText, r = 0, i = n.pasteCallbacks.length; r < i; r++) n.pasteCallbacks[r](o, n, e)
		}, 50))
	},
	destroy: function() {
		// this.hasBeenDestroyed() || 0 != --this.refCounter || (this.elDiv && this.elDiv.parentNode && (this.elDiv.parentNode.removeChild(this.elDiv), this.elDiv = null, this.elTextarea = null), document.documentElement.removeEventListener("keydown", this.onKeyDownRef), this.onKeyDownRef = null)
	},
	hasBeenDestroyed: function() {
		return !this.refCounter
	},
	isSingleSpanOfBodyChildren: function(e) {
		if (!e) return !1;
		for (var t, n = e.body, o = 0, r = n.children.length; o < r; o++) {
			var i = n.children[o];
			if (i && "span" == i.tagName.toLowerCase()) {
				if (t) return !1;
				t = i
			}
		}
		return !!t
	},
	prepareSingleCellTable: function(e) {
		if (!e) return null;
		var t, n, o, r, i = e.getElementsByTagName("span")[0];
		if (i) {
			t = document.createElement("table"), n = document.createElement("tbody"), o = document.createElement("tr"), r = document.createElement("td");
			for (var a = i.style, s = 0, l = a.length; s < l; s++) a[s] && a[a[s]] && (r.style[a[s]] = a[a[s]]);
			r.innerHTML = i.innerHTML, o.appendChild(r), n.appendChild(o), t.appendChild(n), i.parentNode.replaceChild(t, i)
		}
		return t
	},
	securityCheck: function(e) {
		return e = this.deleteTagByTagName(e, "script"), this.deleteTagByTagName(e, "iframe")
	},
	deleteTagByTagName: function(e, t) {
		if (!e || !t) return e;
		for (var n, o = e, r = 100; r--;) {
			if ((n = this.deleteOneTagByTagName(o, t)) === o) return n;
			o = n
		}
		return 0 == r ? "" : n
	},
	deleteOneTagByTagName: function(e, t) {
		if (!t) return e;
		var n = e.indexOf("<" + t);
		if (-1 != n) {
			var o = e.indexOf("</" + t);
			if (-1 != o) return e.substring(0, n) + e.substring(o + t.length + 3)
		}
		return e
	},
	parseImgsToShape: function(e) {
		if (e) return e.forEach(function(e) {}), []
	},
	parsePasteTableHTML: function(e) {
		var me = this;
		var o
		if (!this.ii) this.ii = new vmd.report.ClipBordParse;
		return e ? function(e) {
			return me.ii.parse(e)
		}(e) : null
	},
})

Ext.define('vmd.report.ClipBordParse', {
	constructor: function() {
		this.init();
	},
	init: function() {
		this.initNotificationCenter(), this.initSubscription()
	},
	initNotificationCenter: function() {
		this.notificationCenter = []
	},
	initSubscription: function() {
		this.subscribe("beforeStandardizeCells", this.standardizeCellsWithMergeCells), this.subscribe("beforeParseCell", this.parseFormula), this.subscribe("beforeParseCell", this.parseData), this.subscribe("beforeParseCell", this.parseFontFamily), this.subscribe("beforeParseCell", this.parseFontSize), this.subscribe("beforeParseCell", this.parseFontColor), this.subscribe("beforeParseCell", this.parseFontWeight), this.subscribe("beforeParseCell", this.parseFontStyle), this.subscribe("beforeParseCell", this.parseFontDecoration), this.subscribe("beforeParseCell", this.parseBackgroundColor), this.subscribe("beforeParseCell", this.parseBorder), this.subscribe("beforeParseCell", this.parseTextAlign), this.subscribe("beforeParseCell", this.parseVerticalAlign), this.subscribe("beforeParseCell", this.parseLink)
	},
	initTableInfo: function() {
		this.clearTableInfo(), this.cache = {}, this.tableInfo = {
			styles: null
		}
	},
	clearTableInfo: function() {
		delete this.tableInfo, delete this.cache
	},
	parse: function(e) {
		if (!e) return null;
		this.initTableInfo(), this.cache.tableDOM = e;
		for (var t = this.parseSizeInfo(), n = this.getStandardCells(), o = [], r = [], i = [], a = [], s = 0, l = t ? t.row : 0; s < l; s++) {
			var u = n[s];
			!o[s] && (o[s] = []), !r[s] && (r[s] = []), !i[s] && (i[s] = []), !a[s] && (a[s] = []);
			for (var c = 0, h = t ? t.col : 0; c < h; c++) {
				var d = u[c];
				if (d) {
					var f = {
							style: {},
							data: null,
							template: {}
						},
						p = getComputedStyle(d);
					this.notify("beforeParseCell", d, p, f, s, c, o), o[s].push(f.style), r[s].push(f.data), i[s].push(f.template), a[s].push(f.formula)
				} else o[s].push(null), r[s].push(null), i[s].push(null), a[s].push(null)
			}
		}
		return {
			styles: o,
			data: r,
			template: i,
			formula: a,
			mergeCells: this.cache.mergeCells
		}
	},
	parseData: function(e, t, n) {
		if (e) {
			var o = e.innerText;
			n.data = o && "　" != o ? o : ""
		}
	},
	parseFormula: function(e, t, n, o, r, i) {
		if (e) {
			var a = e.getAttribute("data-online-sheet-formula");
			n.formula = a && "string" == typeof a ? a : null
		}
	},
	parseFontFamily: function(e, t, n) {
		var a = [
			["microsoft yahei", "微软雅黑"],
			["stfangsong", "华文仿宋"],
			["stkaiti", "华文楷体"],
			["stsong", "华文宋体"], "arial", "comic sans ms", "courier new", "georgia", "impact", "times new roman", "trebuchet ms", "verdana"
		];
		if (t) {
			var o = -1,
				r = t.fontFamily;
			if (!r) return;
			var i = r.indexOf(","); - 1 != i && (r = r.slice(0, i)), '"' == r[0] && (r = r.slice(1, r.length - 1)), r = r.toLowerCase();
			for (var s = 0, l = a.length; s < l && -1 == o; s++) {
				var u = a[s];
				if (Array.isArray(u)) {
					if (-1 != u.indexOf(r)) {
						o = s;
						break
					}
				} else if (u == r) {
					o = s;
					break
				}
			} - 1 != o && (n.style.fontfamily = o + 1)
		}
	},
	parseFontSize: function(e, t, n) {
		var s = [6, 8, 10, 12, 14, 16, 18, 20, 24, 30, 36];
		if (t) {
			var o = parseInt(t.fontSize);
			if (o) {
				var r, i, a = -100,
					l = 100,
					u = -1;
				for (r = 0, i = s.length; r < i; r++) {
					if (l = o - (s[r] + 4), Math.abs(l) >= Math.abs(a)) {
						u = r - 1;
						break
					}
					a = l
				} - 1 == u && (u = i - 1), n.style.fontsize = s[u]
			}
		}
	},
	parseFontColor: function(e, t, n) {
		if (t) {
			var o = this.getHexColor(t.color);
			o && (n.style.fontcolor = o)
		}
	},
	getHexColor: function(e) {
		if ("string" == typeof e) return "#" == e[0] ? e : "rgb" == e.substring(0, 3).toLowerCase() ? (this.cache.rgba2hex || (this.cache.rgba2hex = {}), this.cache.rgba2hex[e] || (this.cache.rgba2hex[e] = this.rgba2hex(e)), this.cache.rgba2hex[e]) : void 0
	},
	rgba2hex: function(e) {
		var t = e.toString().match(/\d+/g),
			n = 1;
		if (void 0 !== t[3] && (n = Number(t[3])), 0 == n) return "";
		for (var o = "#", r = 0; r < 3; r++) o += 1 == n ? ("0" + Number(t[r]).toString(16)).slice(-2) : ("0" + (Number(t[r]) * n + 255 * (1 - n)).toString(16)).slice(-2);
		return o
	},
	parseFontWeight: function(e, t, n) {
		t && ("bold" != t.fontWeight && 700 != t.fontWeight || (n.style.bold = "bold"))
	},
	parseFontStyle: function(e, t, n) {
		t && "italic" == t.fontStyle && (n.style.italic = "italic")
	},
	parseFontDecoration: function(e, t, n) {
		if (t && (-1 != t.textDecoration.indexOf("underline") && (n.style.underline = "underline"), -1 != t.textDecoration.indexOf("line-through") && (n.style.strikeline = "strikeline")), e)
			for (var o = e.firstElementChild, r = 10; o && r--;) "u" == o.tagName.toLowerCase() ? n.style.underline = "underline" : "s" == o.tagName.toLowerCase() && (n.style.strikeline = "strikeline"), o = o.firstElementChild
	},
	parseBackgroundColor: function(e, t, n) {
		if (t) {
			var o = this.getHexColor(t.backgroundColor);
			o && (n.style.cellcolor = o)
		}
	},
	parseBorder: function(e, t, n, o, r, i) {
		if (t) {
			var a = "",
				s = {
					top: parseInt(t.borderTopWidth) || parseFloat(t.borderTopWidth) > 0 ? t.borderTopColor : null,
					right: parseInt(t.borderRightWidth) || parseFloat(t.borderRightWidth) > 0 ? t.borderRightColor : null,
					bottom: parseInt(t.borderBottomWidth) || parseFloat(t.borderBottomWidth) > 0 ? t.borderBottomColor : null,
					left: parseInt(t.borderLeftWidth) || parseFloat(t.borderLeftWidth) > 0 ? t.borderLeftColor : null
				};
			for (var l in s)
				if (s[l]) {
					if (a && (a += "--"), "top" == l && i[o - 1] && i[o - 1][r]) {
						var u = i[o - 1][r];
						if (u && u.sheetborder && -1 != u.sheetborder.indexOf("bottom")) continue
					} else if ("left" == l && i[o] && i[o][r - 1]) {
						var c = i[o][r - 1];
						if (c && c.sheetborder && -1 != c.sheetborder.indexOf("right")) continue
					}
					a += "border-" + l + "-attr:" + this.getHexColor(s[l])
				}
			a && (n.style.sheetborder = a)
		}
	},
	parseTextAlign: function(e, t, n) {
		if (t) {
			var o = t.textAlign;
			"left" != o && (n.style.h_align = o)
		}
	},
	parseVerticalAlign: function(e, t, n) {
		if (t) {
			var o = t.verticalAlign;
			"top" != o && (n.style.v_align = o)
		}
	},
	parseLink: function(e, t, n) {
		if (e) {
			var o, r, a = e.getElementsByTagName("a");
			if (a) {
				for (var s = 0, l = a.length; s < l && !(o = a[s].getAttribute("href")); s++);
				u(o, r = e.innerText, n)
			} else u(r = e.innerText, r, n)
		}

		function u(e, t, n) {
			e && "" != e && i.validUrl(e) && (n.template || (n.template = {}), n.template.link = {
				url: e,
				value: t
			})
		}
	},
	parseSizeInfo: function(e) {
		if (e) {
			var t = this.parseColCount(e),
				n = this.parseRowCount(e);
			return {
				col: t,
				row: n,
				colWidths: this.parseColWidths(e, t),
				rowHeights: this.parseRowHeights(e, n)
			}
		}
		return !this.cache.size && this.cache.tableDOM && (this.cache.size = this.parseSizeInfo(this.cache.tableDOM)), this.cache.size
	},
	parseColCount: function(e) {
		var t = this.getColGroupDOM(e),
			n = 0;
		if (t)
			for (var o = 0, r = t.childElementCount; o < r; o++) {
				var i = t.children[o];
				n += parseInt(i.getAttribute("span")) || 1
			} else {
				var a, s, l = this.getTBodyDOM(e);
				if (l && (a = l.firstElementChild), a && (s = a.firstElementChild), s && ("TD" == s.tagName || "TH" == s.tagName))
					for (var u = s; u;) {
						n += parseInt(u.getAttribute("colspan")) || 1, u = u.nextElementSibling
					}
			}
		return n
	},
	parseRowCount: function(e) {
		var t = this.getTBodyDOM(e),
			n = 0;
		return t && (n = t.childElementCount), n
	},
	parseColWidths: function(e, t) {
		return null
	},
	parseRowHeights: function(e, t) {
		return null
	},
	parseCopySource: function(e) {
		if (e) {
			var t = this.getDocumentObject(e);
			if (t) {
				var n = t.getElementsByTagName("meta");
				if (n) {
					var o = n.ProgId;
					o && "Excel.Sheet" == o.content && (this.cache || (this.cache = {}), this.cache.isCopySourceExcel = !0)
				}
			}
		}
	},
	getDocumentObject: function(e) {
		for (var t = e.parentNode; t && 9 != t.nodeType;) t = t.parentNode;
		if (9 == t.nodeType) return t
	},
	standardizeCellsWithMergeCells: function(e) {
		var t = [],
			n = [],
			o = this.parseSizeInfo();
		if (o)
			for (var r = 0; r < o.row; r++) {
				n[r] || (n[r] = []);
				for (var i = e[r], a = 0, s = 0; a < o.col && s < i.length; a++)
					if (void 0 === n[r][a]) {
						var l = i[s++];
						n[r][a] = l;
						var u = parseInt(l.getAttribute("rowspan"));
						u = u || 1;
						var c = parseInt(l.getAttribute("colspan"));
						if ((c = c || 1) > 1)
							for (var h = 1; h < c; h++) n[r][a + h] = null;
						if (u > 1)
							for (var d = 1; d < u; d++) {
								n[r + d] || (n[r + d] = []);
								for (var f = 0; f < c; f++) n[r + d][a + f] = null
							}(u > 1 || c > 1) && t.push({
								row: r,
								col: a,
								rowspan: u,
								colspan: c
							}), a += c - 1
					}
			}
		return this.cache.mergeCells = t, n
	},
	getStandardCells: function(e) {
		var t = this.getCells(e),
			n = this.notify("beforeStandardizeCells", t);
		return void 0 != n && (t = n), t
	},
	getCells: function(e) {
		if (!e) return !this.cache.cells && this.cache.tableDOM && (this.cache.cells = this.getCells(this.cache.tableDOM)), this.cache.cells;
		var t = this.getTBodyDOM(e);
		if (t) {
			for (var n = t.children, o = [], r = 0, i = n ? n.length : 0; r < i; r++) {
				for (var a = n[r].children, s = [], l = 0, u = a ? a.length : 0; l < u; l++) {
					var c = a[l];
					c && "td" == c.tagName.toLowerCase() && s.push(c)
				}
				o.push(s)
			}
			return o
		}
	},
	validUrl: function(e) {
		return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
	},
	getColGroupDOM: function(e) {
		if (e) {
			var t = e.firstElementChild;
			return t && "colgroup" == t.tagName.toLowerCase() ? t : null
		}
		return !this.cache.colgroup && this.cache.tableDOM && (this.cache.colgroup = this.getColGroupDOM(this.cache.tableDOM)), this.cache.colgroup
	},
	getTBodyDOM: function(e) {
		if (e) {
			var t = e.lastElementChild;
			return t && "tbody" == t.tagName.toLowerCase() ? t : null
		}
		return !this.cache.tbody && this.cache.tableDOM && (this.cache.tbody = this.getTBodyDOM(this.cache.tableDOM)), this.cache.tbody
	},
	subscribe: function(e, t) {
		if (Array.isArray(t))
			for (var n = 0, o = t.length; n < o; n++) this.subscribe(e, t[n]);
		this.notificationCenter[e] ? this.notificationCenter[e].push(t) : this.notificationCenter[e] = [t]
	},
	unsubscribe: function(e, t) {
		if (void 0 == t) delete this.notificationCenter[e];
		else {
			var n = this.notificationCenter[e],
				o = n ? n.indexOf(t) : -1;
			o > -1 && delete this.notificationCenter[e][o]
		}
	},
	notify: function(e) {
		for (var t = this.notificationCenter[e], n = -1, o = t ? t.length : 0, r = null, i = [], a = 1, s = arguments.length; a < s; a++) i.push(arguments[a]);
		for (; ++n < o;) {
			var l = t[n].apply(this, i);
			void 0 != l && (r = l)
		}
		return r
	}
})

var _createClass$10 = function() {
	function e(e, t) {
		for (var n = 0; n < t.length; n++) {
			var o = t[n];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
		}
	}
	return function(t, n, o) {
		return n && e(t.prototype, n), o && e(t, o), t
	}
}();

function _classCallCheck$10(e, t) {
	if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

var GhostTableCopy = function() {
	function e(t) {
		_classCallCheck$10(this, e), this.hot = t
	}
	return _createClass$10(e, [{
		key: "setRange",
		value: function(e) {
			e && (this.range = {
				from: {
					row: Math.min(e.from.row, e.to.row),
					col: Math.min(e.from.col, e.to.col)
				},
				to: {
					row: Math.max(e.from.row, e.to.row),
					col: Math.max(e.from.col, e.to.col)
				}
			})
		}
	}, {
		key: "getCopyContent",
		value: function(e, t, n) {
			var o, r;
			if (e) return this.widths = [],
				this.setRange(e),
				t || (o = this.getHTMLContent()),
				n || (r = this.getPlainContent()),
				this.clearCache(), {
					html: o,
					plain: r
				}
		}
	}, {
		key: "getHTMLContent",
		value: function(e) {
			if (e) this.setRange(e);
			else if (!this.range) return;
			var t = this.createGhostTable(),
				n = this.getCommonStyle(),
				o = null;
			return t && (o = t.outerHTML, n && (o = n.outerHTML + o)), o
		}
	}, {
		key: "getPlainContent",
		value: function(e) {
			var cell = sheetHot.dealInvert()[0]
			var p = sheetHot.getData(cell.sr, cell.sc, cell.er, cell.ec)
			var t, n, o, r, i, a = "";
			for (t = 0,
				n = p.length; t < n; t += 1) {
				for (r = p[t].length,
					o = 0; o < r; o += 1)
					o > 0 && (a += "\t"), "string" == typeof(i = p[t][o]) ? i.indexOf("\n") > -1 || i.indexOf("\r") > -1 || i.indexOf("\t") > -1 ? a += '"' + i.replace(/"/g, '""') + '"' : a += i : a += null === i || void 0 === i ? "" : i;
				n - 1 != t && (a += "\n")
			}
			return a
		}
	}, {
		key: "createGhostTable",
		value: function() {
			if (this.range) {
				var e = this.createTable();
				return this.createColGroupCols(e.colgroup), this.createTRs(e.tbody), this.createCells(e.tbody), this.setTableAttributes(e.table, e.colgroup), e.table
			}
		}
	}, {
		key: "getCommonStyle",
		value: function() {
			if (!this.commonStyle) {
				var e = this.getStyleString("td"),
					t = this.getStyleString("table");
				if (e || t) {
					var n = "\x3c!--td {" + e + "} table {" + t + "}--\x3e",
						o = document.createElement("style");
					o.type = "text/css", o.appendChild(document.createTextNode(n)), this.commonStyle = o
				}
			}
			return this.commonStyle
		}
	}, {
		key: "getStyleString",
		value: function(e) {
			return "td" == e ? "border:1px solid #dadbda;empty-cells:show;line-height:normal;background-color:#FFF;color:#000;vertical-align:middle;outline-width:0;word-wrap:break-word;word-break:normal;white-space:pre-line; text-align:left;font-family:'Microsoft YaHei','微软雅黑',sans-serif;font-size:14px;" : "table" == e ? "border: 1px solid #dadbda; border-collapse: collapse; background: white;" : ""
		}
	}, {
		key: "createTable",
		value: function() {
			var e = document.createElement("table"),
				t = document.createElement("tbody"),
				n = document.createElement("colgroup");
			return e.appendChild(n), e.appendChild(t), {
				table: e,
				tbody: t,
				colgroup: n
			}
		}
	}, {
		key: "createColGroupCols",
		value: function(e) {
			if (e && this.range)
				for (var t = this.range.from.col, n = this.range.to.col, o = t; o <= n; o++) e.appendChild(this.createColElement(o))
		}
	}, {
		key: "createTRs",
		value: function(e) {
			if (e && this.range)
				for (var t = this.range.from.row, n = this.range.to.row, o = t; o <= n; o++) e.appendChild(this.createTRElement(o))
		}
	}, {
		key: "createCells",
		value: function(e) {
			if (e && this.range)
				for (var d = {},
						n = this.range.from.row,
						o = this.range.to.row,
						r = this.range.from.col,
						i = this.range.to.col,
						a = n; a <= o; a++) {
					var s = e.children[a - n];
					if (s)
						for (var l = r; l <= i; l++) {
							var u = this.hot.runHooks("beforeRenderGhostTableCopy", a, l);
							if (u) {
								var c = document.createElement("td"),
									h = this.hot.getDataAtCell(a, l)
								var p = this.hot.getCellMeta(a, l).cellAttributeInfo;
								var font = p && p.fontInfos.fontFamily.value;
								var ff = '0';
								switch (font) {
									case 'SimSun':
										ff = '0'
										break;
									case 'Microsoft YaHei':
										ff = '1'
										break;
									case 'STFangsong':
										ff = '2'
										break;
									case 'STKaiti':
										ff = '3'
										break;
									case 'STSong':
										ff = '4'
										break;
									case 'Arial':
										ff = '5'
										break;
									case 'Comic Sans MS':
										ff = '6'
										break;
									case 'Courier New':
										ff = '7'
										break;
									case 'Georgia':
										ff = '8'
										break;
									case 'Impact':
										ff = '9'
										break;
									case 'Times New Roman':
										ff = '10'
										break;
									case 'Trebuchet MS':
										ff = '11'
										break;
									case 'Verdana':
										ff = '12'
										break;
								}
								var b = p.borderInfo;
								d = {
									prop: null,
									style: {
										bold: p && p.fontInfos.fontWeight.value == 'bold' ? 'bold' : '', //"bold",
										cellcolor: p && p.bgcolorInfo.ColorSelectInner.value, //"#ffc003",
										fontcolor: (p && p.fontInfos.ColorSelect.value) || '000', //"#ff0000",
										fontfamily: ff, // "6",
										fontsize: p && p.fontInfos.fontSize.value, //"36",
										h_align: p && p.alignInfo.align.value.HAlign.value, //"right",
										italic: p && p.fontInfos.fontShape.value == 'italic' ? 'italic' : '', //"italic",
										// sheetborder: borderstyle,
										underline: p && p.fontInfos.underline.value == 'underline' ? 'underline' : 'N', //"underline",
										v_align: p && p.alignInfo.align.value.VAlign.value //"top"
									}
								}
								this.styleRenderer(this.hot, c, a, l, this.hot.colToProp(l), h, d),
									this.hot.runHooks("afterRenderGhostTableCopy", c, u, a, l, h, this.range),
									this.widths[l] && c.setAttribute("width", this.widths[l]), s.appendChild(c)
							}
						}
				}
		}
	}, {
		key: "styleRenderer",
		value: function(e, t, n, o, r, i, a) {
			i && "string" == typeof i && fastInnerText(t, i);
			var s = a.style,
				l = "";
			if (s) {
				s.bold && (l += "font-weight: " + s.bold + ";"), s.italic && (l += "font-style: " + s.italic + ";");
				var u = "strikeline" === s.strikeline,
					c = "underline" === s.underline;
				if (u && !c ? l += "text-decoration: line-through;" : !u && c ? l += "text-decoration: underline;" : u && c ? l += "text-decoration: underline line-through;" : u || c || (l += "text-decoration: none;"), s.linefeed && "off" === s.linefeed && (l += "text-decoration: none;"), s.h_align && (l += "text-align: " + s.h_align + ";"), s.v_align && (l += "vertical-align: " + s.v_align + ";"), s.fontcolor && (l += "color: " + s.fontcolor + ";"), s.cellcolor) {
					var h = s.cellcolor;
					h && (this.borderCalculate || (this.borderCalculate = new BorderCalculate), l += "background-color: " + h + ";", l += "border-color: " + this.borderCalculate.toCalculateColor(h) + ";")
				}
				if (s.fontsize && (l += "font-size: " + (parseInt(s.fontsize) + 4) + "px;"), s.fontfamily && (l += "font-family: '" + ["Microsoft YaHei", "STFangsong", "STKaiti", "STSong", "Arial", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Times New Roman", "Trebuchet MS", "Verdana"][parseInt(s.fontfamily) - 1] + "','Microsoft YaHei','sourcecode',sans-serif;"), s.sheetborder) {
					var d, f, p, g, m = "",
						v = s.sheetborder;
					g = v.indexOf("--") >= 0 ? v.split("--") : [v];
					for (var y = 0; y < g.length; y++) 2 == (d = g[y].split(":")).length && (f = d[0], p = "1px solid " + d[1] + ";", "border-top-show" === f ? m += "border-top: " + p : "border-right-attr" === f || "border-right-show" === f ? m += "border-right: " + p : "border-bottom-attr" === f || "border-bottom-show" === f ? m += "border-bottom: " + p : "border-left-show" === f && (m += "border-left: " + p));
					l += m
				}
			} else t.style.cssText && (t.style.cssText = "");
			a.rBorderColor && (l += ";border-right-color:" + a.rBorderColor), t.style.cssText !== l && (t.style.cssText = l)
		}
	}, {
		key: "setTableAttributes",
		value: function(e, t) {
			for (var n = t.firstChild, o = 0; n;) o += parseInt(n.getAttribute("width")), n = n.nextSibling;
			e.setAttribute("width", o)
		}
	}, {
		key: "createColElement",
		value: function(e) {
			var t = document.createElement("col"),
				n = this.hot.view.wt.wtTable.getStretchedColumnWidth(e);
			return t.style.width = n + "px", t.setAttribute("width", n), this.widths[e] = n, t
		}
	}, {
		key: "createTRElement",
		value: function(e) {
			var t = document.createElement("tr"),
				n = this.hot.view.wt.wtTable.getRowHeight(e);
			return t.style.height = n + "px", t.setAttribute("height", n), t
		}
	}, {
		key: "clearCache",
		value: function() {
			delete this.range
		}
	}]), e
}();