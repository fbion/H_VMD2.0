Ext.define('vmd.ux.approvlType.Controller', {
    xtype: 'vmd.ux.approvlType.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.ApprovlType", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.ApprovlType",
    title: "Panel",
    header: false,
    border: false,
    width: 290,
    height: 621,
    layout: "absolute",
    uxCss: ".b{    border: 1px solid #dddddd}",
    initComponent: function() {
        function resetCmpScope() {
            var cmpList = me._reloadCmpList;
            Ext.each(cmpList, function(name) {
                var cmpObj = eval(name);
                cmpObj && (cmpObj._beforeRender = function(_cmp) {
                    var id = vmd.core.getCmpId(_cmp);
                    id && eval(id + "= _cmp")
                })
            })
        }
        var page = this;
        var store = new Ext.data.JsonStore({
            proxy: new Ext.data.MemoryProxy(),
            fields: ['id', 'name']
        });
        var data = [{
            name: 'yyyy-MM-dd',
            id: 'yyyy-MM-dd'
        }, {
            name: 'yyyy年MM月dd日',
            id: 'yyyy年MM月dd日'
        }, {
            name: 'yyyy年MM月dd日 HH时mm分',
            id: 'yyyy年MM月dd日 HH时mm分'
        }, {
            name: 'yyyyMMdd',
            id: 'yyyyMMdd'
        }, {
            name: 'yyyy年MM月',
            id: 'yyyy年MM月'
        }, {
            name: 'yyyy年',
            id: 'yyyy年'
        }, {
            name: 'HH时mm分',
            id: 'HH时mm分'
        }];
        store.loadData(data);
        ////////////////////////////////////////////////////////////////////////////////
        function spyj_x_afterrender(sender) {
            spzj_spyj_x.setValue(spyj.x)
            spzj_spyj_y.setValue(spyj.y)
            spzj_spyj_height.setValue("0")
            spzj_spyj_width.setValue("0")
        }

        function div14_click(sender, e) {
            spzj_spyj_x.setValue(parseFloat(spzj_spyj_x.getValue()) + 1)
            // spyj.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spyj_x, spzj_spyj_x.value, "spyjx")
        }

        function div18_click(sender, e) {
            spzj_spyj_x.setValue(parseFloat(spzj_spyj_x.getValue()) - 1)
            // spyj.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spyj_x, spzj_spyj_x.value, "spyjx")
        }

        function div17_click(sender, e) {
            spzj_spyj_y.setValue(parseFloat(spzj_spyj_y.getValue()) + 1)
            // spyj.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spyj_y, spzj_spyj_y.value, "spyjy")
        }

        function div20_click(sender, e) {
            spzj_spyj_y.setValue(parseFloat(spzj_spyj_y.getValue()) - 1)
            // spyj.setPosition(spzj_spyj_x.getValue(), spzj_spyj_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spyj_y, spzj_spyj_y.value, "spyjy")
        }

        function div16_click(sender, e) {
            spzj_spyj_height.setValue(parseFloat(spzj_spyj_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spyj_height, spzj_spyj_height.value, "spyjh")
        }

        function div21_click(sender, e) {
            if (spzj_spyj_height.getValue() <= 1) {
                spzj_spyj_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spyj_height, spzj_spyj_height.value, "spyjh")
            } else {
                spzj_spyj_height.setValue(parseFloat(spzj_spyj_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spyj_height, spzj_spyj_height.value, "spyjh")
            }
        }

        function div15_click(sender, e) {
            spzj_spyj_width.setValue(parseFloat(spzj_spyj_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spyj_width, spzj_spyj_width.value, "spyjw")
        }

        function div19_click(sender, e) {
            if (spzj_spyj_width.getValue() <= 1) {
                spzj_spyj_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spyj_width, spzj_spyj_width.value, "spyjw")
            } else {
                spzj_spyj_width.setValue(parseFloat(spzj_spyj_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spyj_width, spzj_spyj_width.value, "spyjw")
            }
        }

        function div23_click(sender, e) {
            spzj_spbm_x.setValue(parseFloat(spzj_spbm_x.getValue()) + 1)
            // spbm.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spbm_x, spzj_spbm_x.value, "spbmx")
        }

        function div27_click(sender, e) {
            spzj_spbm_x.setValue(parseFloat(spzj_spbm_x.getValue()) - 1)
            // spbm.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spbm_x, spzj_spbm_x.value, "spbmx")
        }

        function div26_click(sender, e) {
            spzj_spbm_y.setValue(parseFloat(spzj_spbm_y.getValue()) + 1)
            // spbm.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spbm_y, spzj_spbm_y.value, "spbmy")
        }

        function div29_click(sender, e) {
            spzj_spbm_y.setValue(parseFloat(spzj_spbm_y.getValue()) - 1)
            // spbm.setPosition(spzj_spbm_x.getValue(), spzj_spbm_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spbm_y, spzj_spbm_y.value, "spbmy")
        }

        function spbm_x_afterrender(sender) {
            spzj_spbm_x.setValue(spbm.x)
            spzj_spbm_y.setValue(spbm.y)
            spzj_spbm_height.setValue("0")
            spzj_spbm_width.setValue("0")
        }

        function div25_click(sender, e) {
            spzj_spbm_height.setValue(parseFloat(spzj_spbm_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spbm_height, spzj_spbm_height.value, "spbmh")
        }

        function div30_click(sender, e) {
            if (spzj_spbm_height.getValue() <= 1) {
                spzj_spbm_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spbm_height, spzj_spbm_height.value, "spbmh")
            } else {
                spzj_spbm_height.setValue(parseFloat(spzj_spbm_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spbm_height, spzj_spbm_height.value, "spbmh")
            }
        }

        function div24_click(sender, e) {
            spzj_spbm_width.setValue(parseFloat(spzj_spbm_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spbm_width, spzj_spbm_width.value, "spbmw")
        }

        function div28_click(sender, e) {
            if (spzj_spbm_width.getValue() <= 1) {
                spzj_spbm_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spbm_width, spzj_spbm_width.value, "spbmw")
            } else {
                spzj_spbm_width.setValue(parseFloat(spzj_spbm_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spbm_width, spzj_spbm_width.value, "spbmw")
            }
        }

        function ty_x_afterrender(sender) {
            spzj_ty_x.setValue(ty.x)
            spzj_ty_y.setValue(ty.y)
            spzj_ty_height.setValue("0")
            spzj_ty_width.setValue("0")
        }

        function div10_click(sender, e) {
            spzj_ty_x.setValue(parseFloat(spzj_ty_x.getValue()) + 1)
            // ty.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_ty_x, spzj_ty_x.value, "tyx")
        }

        function div32_click(sender, e) {
            spzj_ty_x.setValue(parseFloat(spzj_ty_x.getValue()) - 1)
            // ty.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_ty_x, spzj_ty_x.value, "tyx")
        }

        function div31_click(sender, e) {
            spzj_ty_y.setValue(parseFloat(spzj_ty_y.getValue()) + 1)
            // ty.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_ty_y, spzj_ty_y.value, "tyy")
        }

        function div34_click(sender, e) {
            spzj_ty_y.setValue(parseFloat(spzj_ty_y.getValue()) - 1)
            // ty.setPosition(spzj_ty_x.getValue(), spzj_ty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_ty_y, spzj_ty_y.value, "tyy")
        }

        function div12_click(sender, e) {
            spzj_ty_height.setValue(parseFloat(spzj_ty_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_ty_height, spzj_ty_height.value, "tyh")
        }

        function div11_click(sender, e) {
            spzj_ty_width.setValue(parseFloat(spzj_ty_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_ty_width, spzj_ty_width.value, "tyw")
        }

        function div35_click(sender, e) {
            if (spzj_ty_height.getValue() <= 1) {
                spzj_ty_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_ty_height, spzj_ty_height.value, "tyh")
            } else {
                spzj_ty_height.setValue(parseFloat(spzj_ty_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_ty_height, spzj_ty_height.value, "tyh")
            }
        }

        function div33_click(sender, e) {
            if (spzj_ty_width.getValue() <= 1) {
                spzj_ty_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_ty_width, spzj_ty_width.value, "tyw")
            } else {
                spzj_ty_width.setValue(parseFloat(spzj_ty_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_ty_width, spzj_ty_width.value, "tyw")
            }
        }

        function bty_x_afterrender(sender) {
            spzj_bty_x.setValue(bty.x)
            spzj_bty_y.setValue(bty.y)
            spzj_bty_height.setValue("0")
            spzj_bty_width.setValue("0")
        }

        function div37_click(sender, e) {
            spzj_bty_x.setValue(parseFloat(spzj_bty_x.getValue()) + 1)
            // bty.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_bty_x, spzj_bty_x.value, "btyx")
        }

        function div41_click(sender, e) {
            spzj_bty_x.setValue(parseFloat(spzj_bty_x.getValue()) - 1)
            // bty.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_bty_x, spzj_bty_x.value, "btyx")
        }

        function div40_click(sender, e) {
            spzj_bty_y.setValue(parseFloat(spzj_bty_y.getValue()) + 1)
            // bty.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_bty_y, spzj_bty_y.value, "btyy")
        }

        function div43_click(sender, e) {
            spzj_bty_y.setValue(parseFloat(spzj_bty_y.getValue()) - 1)
            // bty.setPosition(spzj_bty_x.getValue(), spzj_bty_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_bty_y, spzj_bty_y.value, "btyy")
        }

        function div39_click(sender, e) {
            spzj_bty_height.setValue(parseFloat(spzj_bty_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_bty_height, spzj_bty_height.value, "btyh")
        }

        function div44_click(sender, e) {
            if (spzj_bty_height.getValue() <= 1) {
                spzj_bty_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_bty_height, spzj_bty_height.value, "btyh")
            } else {
                spzj_bty_height.setValue(parseFloat(spzj_bty_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_bty_height, spzj_bty_height.value, "btyh")
            }
        }

        function div38_click(sender, e) {
            spzj_bty_width.setValue(parseFloat(spzj_bty_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_bty_width, spzj_bty_width.value, "btyw")
        }

        function div42_click(sender, e) {
            if (spzj_bty_width.getValue() <= 1) {
                spzj_bty_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_bty_width, spzj_bty_width.value, "btyw")
            } else {
                spzj_bty_width.setValue(parseFloat(spzj_bty_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_bty_width, spzj_bty_width.value, "btyw")
            }
        }

        function th_x_afterrender(sender) {
            spzj_th_x.setValue(th.x)
            spzj_th_y.setValue(th.y)
            spzj_th_height.setValue("0")
            spzj_th_width.setValue("0")
        }

        function div46_click(sender, e) {
            spzj_th_x.setValue(parseFloat(spzj_th_x.getValue()) + 1)
            // th.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_th_x, spzj_th_x.value, "thx")
        }

        function div50_click(sender, e) {
            spzj_th_x.setValue(parseFloat(spzj_th_x.getValue()) - 1)
            // th.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_th_x, spzj_th_x.value, "thx")
        }

        function div49_click(sender, e) {
            spzj_th_y.setValue(parseFloat(spzj_th_y.getValue()) + 1)
            // th.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_th_y, spzj_th_y.value, "thy")
        }

        function div52_click(sender, e) {
            spzj_th_y.setValue(parseFloat(spzj_th_y.getValue()) - 1)
            // th.setPosition(spzj_th_x.getValue(), spzj_th_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_th_y, spzj_th_y.value, "thy")
        }

        function div48_click(sender, e) {
            spzj_th_height.setValue(parseFloat(spzj_th_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_th_height, spzj_th_height.value, "thh")
        }

        function div47_click(sender, e) {
            spzj_th_width.setValue(parseFloat(spzj_th_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_th_width, spzj_th_width.value, "thw")
        }

        function div53_click(sender, e) {
            if (spzj_th_height.getValue() <= 1) {
                spzj_th_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_th_height, spzj_th_height.value, "thh")
            } else {
                spzj_th_height.setValue(parseFloat(spzj_th_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_th_height, spzj_th_height.value, "thh")
            }
        }

        function div51_click(sender, e) {
            if (spzj_th_width.getValue() <= 1) {
                spzj_th_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_th_width, spzj_th_width.value, "thw")
            } else {
                spzj_th_width.setValue(parseFloat(spzj_th_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_th_width, spzj_th_width.value, "thw")
            }
        }

        function spz_x_afterrender(sender) {
            spzj_spz_x.setValue(spz.x)
            spzj_spz_y.setValue(spz.y)
            spzj_spz_height.setValue("0")
            spzj_spz_width.setValue("0")
        }

        function div55_click(sender, e) {
            spzj_spz_x.setValue(parseFloat(spzj_spz_x.getValue()) + 1)
            // spz.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spz_x, spzj_spz_x.value, "spzx")
        }

        function div59_click(sender, e) {
            spzj_spz_x.setValue(parseFloat(spzj_spz_x.getValue()) - 1)
            // spz.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spz_x, spzj_spz_x.value, "spzx")
        }

        function div58_click(sender, e) {
            spzj_spz_y.setValue(parseFloat(spzj_spz_y.getValue()) + 1)
            // spz.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spz_y, spzj_spz_y.value, "spzy")
        }

        function div61_click(sender, e) {
            spzj_spz_y.setValue(parseFloat(spzj_spz_y.getValue()) - 1)
            // spz.setPosition(spzj_spz_x.getValue(), spzj_spz_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spz_y, spzj_spz_y.value, "spzy")
        }

        function div57_click(sender, e) {
            spzj_spz_height.setValue(parseFloat(spzj_spz_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spz_height, spzj_spz_height.value, "spzh")
        }

        function div56_click(sender, e) {
            spzj_spz_width.setValue(parseFloat(spzj_spz_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spz_width, spzj_spz_width.value, "spzw")
        }

        function div62_click(sender, e) {
            if (spzj_spz_height.getValue() <= 1) {
                spzj_spz_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spz_height, spzj_spz_height.value, "spzh")
            } else {
                spzj_spz_height.setValue(parseFloat(spzj_spz_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spz_height, spzj_spz_height.value, "spzh")
            }
        }

        function div60_click(sender, e) {
            if (spzj_spz_width.getValue() <= 1) {
                spzj_spz_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spz_width, spzj_spz_width.value, "spzw")
            } else {
                spzj_spz_width.setValue(parseFloat(spzj_spz_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spz_width, spzj_spz_width.value, "spzw")
            }
        }

        function spr_x_afterrender(sender) {
            spzj_spr_x.setValue(spr.x)
            spzj_spr_y.setValue(spr.y)
            spzj_spr_height.setValue("0")
            spzj_spr_width.setValue("0")
        }

        function div2_click(sender, e) {
            spzj_spr_x.setValue(parseFloat(spzj_spr_x.getValue()) + 1)
            // spr.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spr_x, spzj_spr_x.value, "sprx")
        }

        function div6_click(sender, e) {
            spzj_spr_x.setValue(parseFloat(spzj_spr_x.getValue()) - 1)
            // spr.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spr_x, spzj_spr_x.value, "sprx")
        }

        function div5_click(sender, e) {
            spzj_spr_y.setValue(parseFloat(spzj_spr_y.getValue()) + 1)
            // spr.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spr_y, spzj_spr_y.value, "spry")
        }

        function div8_click(sender, e) {
            spzj_spr_y.setValue(parseFloat(spzj_spr_y.getValue()) - 1)
            // spr.setPosition(spzj_spr_x.getValue(), spzj_spr_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_spr_y, spzj_spr_y.value, "spry")
        }

        function div4_click(sender, e) {
            spzj_spr_height.setValue(parseFloat(spzj_spr_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spr_height, spzj_spr_height.value, "sprh")
        }

        function div3_click(sender, e) {
            spzj_spr_width.setValue(parseFloat(spzj_spr_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_spr_width, spzj_spr_width.value, "sprw")
        }

        function div9_click(sender, e) {
            if (spzj_spr_height.getValue() <= 1) {
                spzj_spr_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spr_height, spzj_spr_height.value, "sprh")
            } else {
                spzj_spr_height.setValue(parseFloat(spzj_spr_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spr_height, spzj_spr_height.value, "sprh")
            }
        }

        function div7_click(sender, e) {
            if (spzj_spr_width.getValue() <= 1) {
                spzj_spr_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_spr_width, spzj_spr_width.value, "sprw")
            } else {
                spzj_spr_width.setValue(parseFloat(spzj_spr_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_spr_width, spzj_spr_width.value, "sprw")
            }
        }

        function div22_click(sender, e) {
            spzj_sprq_x.setValue(parseFloat(spzj_sprq_x.getValue()) + 1)
            // sprq.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_sprq_x, spzj_sprq_x.value, "sprqx")
        }

        function sprq_x_afterrender(sender) {
            spzj_sprq_x.setValue(sprq.x)
            spzj_sprq_y.setValue(sprq.y)
            spzj_sprq_height.setValue("0")
            spzj_sprq_width.setValue("0")
        }

        function div63_click(sender, e) {
            spzj_sprq_x.setValue(parseFloat(spzj_sprq_x.getValue()) - 1)
            // sprq.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_sprq_x, spzj_sprq_x.value, "sprqx")
        }

        function div54_click(sender, e) {
            spzj_sprq_y.setValue(parseFloat(spzj_sprq_y.getValue()) + 1)
            // sprq.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_sprq_y, spzj_sprq_y.value, "sprqy")
        }

        function div65_click(sender, e) {
            spzj_sprq_y.setValue(parseFloat(spzj_sprq_y.getValue()) - 1)
            // sprq.setPosition(spzj_sprq_x.getValue(), spzj_sprq_y.getValue())
            page.fireEvent("spzj_decimalChanged", spzj_sprq_y, spzj_sprq_y.value, "sprqy")
        }

        function div45_click(sender, e) {
            spzj_sprq_height.setValue(parseFloat(spzj_sprq_height.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_sprq_height, spzj_sprq_height.value, "sprqh")
        }

        function div66_click(sender, e) {
            if (spzj_sprq_height.getValue() <= 1) {
                spzj_sprq_height.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_sprq_height, spzj_sprq_height.value, "sprqh")
            } else {
                spzj_sprq_height.setValue(parseFloat(spzj_sprq_height.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_sprq_height, spzj_sprq_height.value, "sprqh")
            }
        }

        function div36_click(sender, e) {
            spzj_sprq_width.setValue(parseFloat(spzj_sprq_width.getValue()) + 1)
            page.fireEvent("spzj_decimalChanged", spzj_sprq_width, spzj_sprq_width.value, "sprqw")
        }

        function div64_click(sender, e) {
            if (spzj_sprq_width.getValue() <= 1) {
                spzj_sprq_width.setValue("0")
                page.fireEvent("spzj_decimalChanged", spzj_sprq_width, spzj_sprq_width.value, "sprqw")
            } else {
                spzj_sprq_width.setValue(parseFloat(spzj_sprq_width.getValue()) - 1)
                page.fireEvent("spzj_decimalChanged", spzj_sprq_width, spzj_sprq_width.value, "sprqw")
            }
        }

        function closeAll() {
            var a = vmd.getElement(ty.id)
            a.applyStyles('border:1px solid #000000');
            var b = vmd.getElement(bty.id)
            b.applyStyles('border:1px solid #000000');
            var c = vmd.getElement(th.id)
            c.applyStyles('border:1px solid #000000');
            var d = vmd.getElement(spbm.id)
            d.applyStyles('border:none');
            var e = vmd.getElement(spyj.id)
            e.applyStyles('border:none');
            var f = vmd.getElement(spz.id)
            f.applyStyles('border:none');
            var g = vmd.getElement(spr.id)
            g.applyStyles('border:none');
            var h = vmd.getElement(sprq.id)
            h.applyStyles('border:none');
            spbmDiv.hide();
            spyjDiv.hide();
            tyDiv.hide();
            btyDiv.hide();
            thDiv.hide();
            spzDiv.hide();
            sprDiv.hide();
            sprqDiv.hide();
        }

        function ty_click(sender, e) {
            closeAll()
            tyDiv.show()
            // colorShow = vmd.getElement(colorDiv.id);
            // colorShow.applyStyles('backgroundColor:#' + value);
            var a = vmd.getElement(ty.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function bty_click(sender, e) {
            closeAll()
            btyDiv.show()
            var a = vmd.getElement(bty.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function th_click(sender, e) {
            closeAll()
            thDiv.show()
            var a = vmd.getElement(th.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function spbm_click(sender, e) {
            closeAll()
            spbmDiv.show()
            var a = vmd.getElement(spbm.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function spyj_click(sender, e) {
            closeAll()
            spyjDiv.show()
            var a = vmd.getElement(spyj.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function spz_click(sender, e) {
            closeAll()
            spzDiv.show()
            var a = vmd.getElement(spz.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function spr_click(sender, e) {
            closeAll()
            sprDiv.show()
            var a = vmd.getElement(spr.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function sprq_click(sender, e) {
            closeAll()
            sprqDiv.show()
            var a = vmd.getElement(sprq.id)
            a.applyStyles('border:1px solid #1E90FF');
        }

        function setInfo(info, cell) {
            if (info) {
                spzj_allowEdit.setValue(info.spzj_allowEdit.checked);
                spzj_allowPrint.setValue(info.spzj_allowPrint.checked);
                spzj_ty_display.setValue(info.spzj_ty_display.checked);
                spzj_ty_bqmc.setValue(info.spzj_ty_bqmc.value);
                spzj_ty_spjg.setValue(info.spzj_ty_spjg.value);
                spzj_ty_font.setValue(info.spzj_ty_font.value);
                spzj_ty_x.setValue(info.spzj_ty_x.value);
                spzj_ty_y.setValue(info.spzj_ty_y.value);
                spzj_ty_height.setValue(info.spzj_ty_height.value);
                spzj_ty_width.setValue(info.spzj_ty_width.value);
                spzj_bty_display.setValue(info.spzj_bty_display.checked);
                spzj_bty_bqmc.setValue(info.spzj_bty_bqmc.value);
                spzj_bty_spjg.setValue(info.spzj_bty_spjg.value);
                spzj_bty_font.setValue(info.spzj_bty_font.value);
                spzj_bty_x.setValue(info.spzj_bty_x.value);
                spzj_bty_y.setValue(info.spzj_bty_y.value);
                spzj_bty_height.setValue(info.spzj_bty_height.value);
                spzj_bty_width.setValue(info.spzj_bty_width.value);
                spzj_th_display.setValue(info.spzj_th_display.checked);
                spzj_th_bqmc.setValue(info.spzj_th_bqmc.value);
                spzj_th_spjg.setValue(info.spzj_th_spjg.value);
                spzj_th_font.setValue(info.spzj_th_font.value);
                spzj_th_x.setValue(info.spzj_th_x.value);
                spzj_th_y.setValue(info.spzj_th_y.value);
                spzj_th_height.setValue(info.spzj_th_height.value);
                spzj_th_width.setValue(info.spzj_th_width.value);
                spzj_spz_display.setValue(info.spzj_spz_display.checked);
                spzj_spz_bqmc.setValue(info.spzj_spz_bqmc.value);
                spzj_spz_tply.setValue(info.spzj_spz_tply.value);
                spzj_spz_font.setValue(info.spzj_spz_font.value);
                spzj_spz_x.setValue(info.spzj_spz_x.value);
                spzj_spz_y.setValue(info.spzj_spz_y.value);
                spzj_spz_height.setValue(info.spzj_spz_height.value);
                spzj_spz_width.setValue(info.spzj_spz_width.value);
                spzj_spr_display.setValue(info.spzj_spr_display.checked);
                spzj_spr_bqmc.setValue(info.spzj_spr_bqmc.value);
                spzj_spr_spr.setValue(info.spzj_spr_spr.value);
                spzj_spr_font.setValue(info.spzj_spr_font.value);
                spzj_spr_x.setValue(info.spzj_spr_x.value);
                spzj_spr_y.setValue(info.spzj_spr_y.value);
                spzj_spr_height.setValue(info.spzj_spr_height.value);
                spzj_spr_width.setValue(info.spzj_spr_width.value);
                spzj_spr_qmzp.setValue(info.spzj_spr_qmzp.value);
                spzj_sprq_display.setValue(info.spzj_sprq_display.checked);
                spzj_sprq_bqmc.setValue(info.spzj_sprq_bqmc.value);
                spzj_sprq_sprq.setValue(info.spzj_sprq_sprq.value);
                spzj_sprq_font.setValue(info.spzj_sprq_font.value);
                spzj_sprq_x.setValue(info.spzj_sprq_x.value);
                spzj_sprq_y.setValue(info.spzj_sprq_y.value);
                spzj_sprq_height.setValue(info.spzj_sprq_height.value);
                spzj_sprq_width.setValue(info.spzj_sprq_width.value);
                spzj_sprq_rqgs.setValue(info.spzj_sprq_rqgs.value);
                spzj_spyj_display.setValue(info.spzj_spyj_display.checked);
                spzj_spyj_bqmc.setValue(info.spzj_spyj_bqmc.value);
                spzj_spyj_yjnr.setValue(info.spzj_spyj_yjnr.value);
                spzj_spyj_font.setValue(info.spzj_spyj_font.value);
                spzj_spyj_x.setValue(info.spzj_spyj_x.value);
                spzj_spyj_y.setValue(info.spzj_spyj_y.value);
                spzj_spyj_height.setValue(info.spzj_spyj_height.value);
                spzj_spyj_width.setValue(info.spzj_spyj_width.value);
                spzj_spbm_display.setValue(info.spzj_spbm_display.checked);
                spzj_spbm_bqmc.setValue(info.spzj_spbm_bqmc.value);
                spzj_spbm_bmmc.setValue(info.spzj_spbm_bmmc.value);
                spzj_spbm_font.setValue(info.spzj_spbm_font.value);
                spzj_spbm_x.setValue(info.spzj_spbm_x.value);
                spzj_spbm_y.setValue(info.spzj_spbm_y.value);
                spzj_spbm_height.setValue(info.spzj_spbm_height.value);
                spzj_spbm_width.setValue(info.spzj_spbm_width.value);
            }
        }

        function button1_click(sender, e) {
            openFontSetting('spyj')
        }

        function openFontSetting(type) {
            // 创建一个新窗口（有url指向） 
            window.fontSettingWin = new vmd.window({
                url: '/modules/eQ9ULgcVb1/hwYa3IA0Y1/hwHCHpNfHv/hw71380633.html',
                title: '方法设置',
                enableLoading: true, //启用进度加载
                width: 785,
                height: 550,
                auto: false, //auto为true 自动适应窗口，配合offset使用
                params: {} //url中追加的编码的参数，json格式 
            })
            window.fontSettingWin.show(); //窗口显示
            window.fontSettingWin.close = function(data) {
                if (data) {
                    var hot = parent.sheetHot;
                    var cell = hot.dealInvert()[0];
                    var sr = cell.sr;
                    var sc = cell.sc;
                    var er = cell.er;
                    var ec = cell.ec;
                    for (var i = sr; i < er + 1; i++) {
                        for (var n = sc; n < ec + 1; n++) {
                            switch (type) {
                                case 'spyj':
                                    hot.changeAttributeInfo(i, n, 'spzj_spyj_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spyj_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_spyj_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spyj_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_spyj_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_spyj_mark', data[5].mark)
                                    spzj_spyj_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spyj_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'spbm':
                                    hot.changeAttributeInfo(i, n, 'spzj_spbm_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spbm_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_spbm_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spbm_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_spbm_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_spbm_mark', data[5].mark)
                                    spzj_spbm_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spbm_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'ty':
                                    hot.changeAttributeInfo(i, n, 'spzj_ty_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_ty_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_ty_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_ty_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_ty_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_ty_mark', data[5].mark)
                                    spzj_ty_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_ty_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'bty':
                                    hot.changeAttributeInfo(i, n, 'spzj_bty_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_bty_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_bty_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_bty_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_bty_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_bty_mark', data[5].mark)
                                    spzj_bty_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_bty_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'th':
                                    hot.changeAttributeInfo(i, n, 'spzj_th_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_th_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_th_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_th_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_th_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_th_mark', data[5].mark)
                                    spzj_th_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_th_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'spz':
                                    hot.changeAttributeInfo(i, n, 'spzj_spz_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spz_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_spz_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spz_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_spz_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_spz_mark', data[5].mark)
                                    spzj_spz_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spz_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'spr':
                                    hot.changeAttributeInfo(i, n, 'spzj_spr_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_spr_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_spr_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spr_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_spr_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_spr_mark', data[5].mark)
                                    spzj_spr_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_spr_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                                case 'sprq':
                                    hot.changeAttributeInfo(i, n, 'spzj_sprq_fontFamily', data[0].ff)
                                    switch (data[1].fs) {
                                        case 'n':
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontWeight', '0')
                                            break;
                                        case 'b':
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontStyle', '0')
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontWeight', '1')
                                            break;
                                        case 't':
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontWeight', '0')
                                            break;
                                        case 'bt':
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontStyle', '1')
                                            hot.changeAttributeInfo(i, n, 'spzj_sprq_fontWeight', '1')
                                            break;
                                    }
                                    hot.changeAttributeInfo(i, n, 'spzj_sprq_fontSize', data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_sprq_color', data[3].color)
                                    hot.changeAttributeInfo(i, n, 'spzj_sprq_underLine', data[4].underLine)
                                    hot.changeAttributeInfo(i, n, 'spzj_sprq_mark', data[5].mark)
                                    spzj_sprq_font.setValue(data[0].ff + ' ' + data[2].fsz)
                                    hot.changeAttributeInfo(i, n, 'spzj_sprq_font', data[0].ff + ' ' + data[2].fsz)
                                    break;
                            }
                        }
                    }
                }
                window.fontSettingWin.hide()
            }
        }

        function button_click(sender, e) {
            openFontSetting('spbm')
        }

        function button2_click(sender, e) {
            openFontSetting('ty')
        }

        function button3_click(sender, e) {
            openFontSetting('bty')
        }

        function button4_click(sender, e) {
            openFontSetting('th')
        }

        function button5_click(sender, e) {
            openFontSetting('spz')
        }

        function button6_click(sender, e) {
            openFontSetting('spr')
        }

        function button7_click(sender, e) {
            openFontSetting('sprq')
        }

        function spzj_sprq_rqgs_beforerender(sender) {
            spzj_sprq_rqgs.store = store;
            spzj_sprq_rqgs.valueField = 'id';
            spzj_sprq_rqgs.displayField = 'name'
        }
        this.items = [{
                xtype: "vmd.div",
                id: "div",
                autoEl: "div",
                border: true,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 270,
                height: 190,
                x: 10,
                y: 10,
                layout: "absolute",
                items: [{
                        xtype: "vmd.div",
                        id: "ty",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: true,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 10,
                        y: 160,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "ty_click",
                        listeners: {
                            click: ty_click
                        },
                        items: [{
                            xtype: "label",
                            id: "label50",
                            text: "同意",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "bty",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: true,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 70,
                        y: 160,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "bty_click",
                        listeners: {
                            click: bty_click
                        },
                        items: [{
                            xtype: "label",
                            id: "label51",
                            text: "不同意",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "th",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: true,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 130,
                        y: 160,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "th_click",
                        listeners: {
                            click: th_click
                        },
                        items: [{
                            xtype: "label",
                            id: "label52",
                            text: "退回",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "spbm",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 20,
                        y: 30,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "spbm_click",
                        listeners: {
                            click: spbm_click
                        },
                        items: [{
                            xtype: "label",
                            id: "label69",
                            text: "审批部门",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "spyj",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 20,
                        y: 60,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "spyj_click",
                        listeners: {
                            click: spyj_click
                        },
                        items: [{
                            xtype: "label",
                            id: "spyjasdf",
                            text: "审批意见",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "sprq",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 210,
                        y: 160,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "sprq_click",
                        listeners: {
                            click: sprq_click
                        },
                        items: [{
                            xtype: "label",
                            id: "aaaa",
                            text: "审批日期",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "spz",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 210,
                        y: 100,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "spz_click",
                        listeners: {
                            click: spz_click
                        },
                        items: [{
                            xtype: "label",
                            id: "label71",
                            text: "审批章",
                            style: "cursor: pointer"
                        }]
                    },
                    {
                        xtype: "vmd.div",
                        id: "spr",
                        layoutConfig: {
                            align: "middle",
                            pack: "center"
                        },
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 50,
                        height: 20,
                        x: 210,
                        y: 130,
                        layout: "hbox",
                        style: "cursor: pointer",
                        click: "spr_click",
                        listeners: {
                            click: spr_click
                        },
                        items: [{
                            xtype: "label",
                            id: "label72",
                            text: "审批人",
                            style: "cursor: pointer"
                        }]
                    }
                ]
            },
            {
                xtype: "checkbox",
                id: "spzj_allowEdit",
                fieldLabel: "Checkbox",
                boxLabel: "允许编辑",
                x: 10,
                y: 220,
                checked: true
            },
            {
                xtype: "checkbox",
                id: "spzj_allowPrint",
                fieldLabel: "Checkbox",
                boxLabel: "允许打印",
                x: 10,
                y: 250,
                checked: true
            },
            {
                xtype: "vmd.div",
                id: "spyjDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 290,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label32",
                        text: "审批意见：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_spyj_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label33",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label34",
                        text: "意见内容：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label35",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label36",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label37",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label38",
                        text: "偏移y：",
                        x: 155,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label39",
                        text: "宽度：",
                        x: 160,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_yjnr",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 60,
                        afterrender: "spyj_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: spyj_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spyj_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div14",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div14_click",
                        listeners: {
                            click: div14_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div15",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div15_click",
                        listeners: {
                            click: div15_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div16",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div16_click",
                        listeners: {
                            click: div16_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div17",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div17_click",
                        listeners: {
                            click: div17_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div18",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div18_click",
                        listeners: {
                            click: div18_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div19",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div19_click",
                        listeners: {
                            click: div19_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div20",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div20_click",
                        listeners: {
                            click: div20_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div21",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div21_click",
                        listeners: {
                            click: div21_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button1",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button1_click",
                        hidden: false,
                        listeners: {
                            click: button1_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "spbmDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label40",
                        text: "审批部门：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_spbm_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label41",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label42",
                        text: "部门名称：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label43",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label44",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label45",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label46",
                        text: "偏移y：",
                        x: 145,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label47",
                        text: "宽度：",
                        x: 150,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 200
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_bmmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 200
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 160
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 50,
                        afterrender: "spbm_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: spbm_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 50,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 190,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spbm_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 190,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div23",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div23_click",
                        listeners: {
                            click: div23_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div24",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 250,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div24_click",
                        listeners: {
                            click: div24_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div25",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div25_click",
                        listeners: {
                            click: div25_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div26",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 250,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div26_click",
                        listeners: {
                            click: div26_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div27",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div27_click",
                        listeners: {
                            click: div27_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div28",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 250,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div28_click",
                        listeners: {
                            click: div28_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div29",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 250,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div29_click",
                        listeners: {
                            click: div29_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div30",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div30_click",
                        listeners: {
                            click: div30_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 240,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button_click",
                        listeners: {
                            click: button_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "tyDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label",
                        text: "同意：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_ty_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label1",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label2",
                        text: "审批结果：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label3",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label4",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label5",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label6",
                        text: "偏移y：",
                        x: 150,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label7",
                        text: "宽度：",
                        x: 150,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_spjg",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 50,
                        afterrender: "ty_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: ty_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 50,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_ty_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div10",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div10_click",
                        listeners: {
                            click: div10_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div11",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div11_click",
                        listeners: {
                            click: div11_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div12",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div12_click",
                        listeners: {
                            click: div12_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div31",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div31_click",
                        listeners: {
                            click: div31_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div32",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div32_click",
                        listeners: {
                            click: div32_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div33",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 20,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div33_click",
                        listeners: {
                            click: div33_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div34",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div34_click",
                        listeners: {
                            click: div34_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div35",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 120,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div35_click",
                        listeners: {
                            click: div35_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button2",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button2_click",
                        listeners: {
                            click: button2_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "btyDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label8",
                        text: "不同意：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_bty_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label9",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label10",
                        text: "审批结果：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label11",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label12",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label13",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label14",
                        text: "偏移y：",
                        x: 155,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label15",
                        text: "宽度：",
                        x: 160,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_spjg",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 60,
                        afterrender: "bty_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: bty_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_bty_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div37",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div37_click",
                        listeners: {
                            click: div37_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div38",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div38_click",
                        listeners: {
                            click: div38_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div39",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div39_click",
                        listeners: {
                            click: div39_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div40",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div40_click",
                        listeners: {
                            click: div40_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div41",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div41_click",
                        listeners: {
                            click: div41_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div42",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div42_click",
                        listeners: {
                            click: div42_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div43",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div43_click",
                        listeners: {
                            click: div43_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div44",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div44_click",
                        listeners: {
                            click: div44_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button3",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button3_click",
                        hidden: true,
                        listeners: {
                            click: button3_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "thDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label16",
                        text: "退回：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_th_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label17",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label18",
                        text: "审批结果：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label19",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label20",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label21",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label22",
                        text: "偏移y：",
                        x: 155,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label23",
                        text: "宽度：",
                        x: 160,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_spjg",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 60,
                        afterrender: "th_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: th_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_th_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div46",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div46_click",
                        listeners: {
                            click: div46_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div47",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div47_click",
                        listeners: {
                            click: div47_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div48",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div48_click",
                        listeners: {
                            click: div48_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div49",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div49_click",
                        listeners: {
                            click: div49_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div50",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div50_click",
                        listeners: {
                            click: div50_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div51",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div51_click",
                        listeners: {
                            click: div51_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div52",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div52_click",
                        listeners: {
                            click: div52_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div53",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div53_click",
                        listeners: {
                            click: div53_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button4",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button4_click",
                        listeners: {
                            click: button4_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "spzDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label24",
                        text: "审批章：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_spz_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label25",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label26",
                        text: "图片来源：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label27",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label28",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label29",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label30",
                        text: "偏移y：",
                        x: 155,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label31",
                        text: "宽度：",
                        x: 160,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_tply",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 60,
                        afterrender: "spz_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: spz_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spz_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div55",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div55_click",
                        listeners: {
                            click: div55_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div56",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div56_click",
                        listeners: {
                            click: div56_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div57",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div57_click",
                        listeners: {
                            click: div57_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div58",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div58_click",
                        listeners: {
                            click: div58_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div59",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div59_click",
                        listeners: {
                            click: div59_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div60",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div60_click",
                        listeners: {
                            click: div60_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div61",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div61_click",
                        listeners: {
                            click: div61_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div62",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div62_click",
                        listeners: {
                            click: div62_click
                        }
                    },
                    {
                        xtype: "vmd.button",
                        id: "button5",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button5_click",
                        listeners: {
                            click: button5_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "sprDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label48",
                        text: "审批人：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_spr_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label49",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label53",
                        text: "审批人：",
                        x: 22,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label54",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label55",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label56",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label57",
                        text: "偏移y：",
                        x: 155,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label58",
                        text: "宽度：",
                        x: 160,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_spr",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 60,
                        afterrender: "spr_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: spr_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div2",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div2_click",
                        listeners: {
                            click: div2_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div3",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div3_click",
                        listeners: {
                            click: div3_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div4",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div4_click",
                        listeners: {
                            click: div4_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div5",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div5_click",
                        listeners: {
                            click: div5_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div6",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div6_click",
                        listeners: {
                            click: div6_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div7",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div7_click",
                        listeners: {
                            click: div7_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div8",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div8_click",
                        listeners: {
                            click: div8_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div9",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div9_click",
                        listeners: {
                            click: div9_click
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_spr_qmzp",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 215,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "label",
                        id: "label59",
                        text: "签名照片：",
                        x: 10,
                        y: 219
                    },
                    {
                        xtype: "vmd.button",
                        id: "button6",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button6_click",
                        listeners: {
                            click: button6_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "sprqDiv",
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 320,
                height: 340,
                x: 0,
                y: 280,
                layout: "absolute",
                hidden: true,
                items: [{
                        xtype: "label",
                        id: "label60",
                        text: "审批日期：",
                        x: 0,
                        y: 0,
                        style: "font-size: 16px;font-style: bolder"
                    },
                    {
                        xtype: "checkbox",
                        id: "spzj_sprq_display",
                        fieldLabel: "Checkbox",
                        boxLabel: "显示",
                        x: 10,
                        y: 30,
                        checked: true
                    },
                    {
                        xtype: "label",
                        id: "label61",
                        text: "标签名称：",
                        x: 10,
                        y: 60
                    },
                    {
                        xtype: "label",
                        id: "label62",
                        text: "审批日期：",
                        x: 10,
                        y: 90
                    },
                    {
                        xtype: "label",
                        id: "label63",
                        text: "字体：",
                        x: 34,
                        y: 120
                    },
                    {
                        xtype: "label",
                        id: "label64",
                        text: "偏移x：",
                        x: 28,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label65",
                        text: "高度：",
                        x: 33,
                        y: 185
                    },
                    {
                        xtype: "label",
                        id: "label66",
                        text: "偏移y：",
                        x: 155,
                        y: 155
                    },
                    {
                        xtype: "label",
                        id: "label67",
                        text: "宽度：",
                        x: 160,
                        y: 185
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_bqmc",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 55,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_sprq",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 85,
                        cls: "b",
                        width: 210
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_font",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 115,
                        cls: "b",
                        width: 170
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_x",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 150,
                        width: 60,
                        afterrender: "sprq_x_afterrender",
                        cls: "b",
                        listeners: {
                            vmdafterrender: sprq_x_afterrender
                        }
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_height",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 70,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_y",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 150,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "textfield",
                        id: "spzj_sprq_width",
                        allowBlank: true,
                        enableKeyEvents: true,
                        x: 200,
                        y: 180,
                        width: 60,
                        cls: "b"
                    },
                    {
                        xtype: "vmd.div",
                        id: "div22",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div22_click",
                        listeners: {
                            click: div22_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div36",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div36_click",
                        listeners: {
                            click: div36_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div45",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 180,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div45_click",
                        listeners: {
                            click: div45_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div54",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 150,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/上.png\" />",
                        click: "div54_click",
                        listeners: {
                            click: div54_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div63",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div63_click",
                        listeners: {
                            click: div63_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div64",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div64_click",
                        listeners: {
                            click: div64_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div65",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 260,
                        y: 160,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div65_click",
                        listeners: {
                            click: div65_click
                        }
                    },
                    {
                        xtype: "vmd.div",
                        id: "div66",
                        autoEl: "div",
                        border: false,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top left",
                        width: 30,
                        height: 15,
                        x: 130,
                        y: 190,
                        style: "cursor: pointer",
                        html: "<img src=\"/system/img/report/border/下.png\" />",
                        click: "div66_click",
                        listeners: {
                            click: div66_click
                        }
                    },
                    {
                        xtype: "label",
                        id: "label68",
                        text: "日期格式：",
                        x: 9,
                        y: 219
                    },
                    {
                        xtype: "vmd.button",
                        id: "button7",
                        text: "...",
                        type: "(none)",
                        size: "small",
                        x: 250,
                        y: 115,
                        width: 28,
                        height: 24,
                        click: "button7_click",
                        listeners: {
                            click: button7_click
                        }
                    },
                    {
                        xtype: "vmd.combo",
                        id: "spzj_sprq_rqgs",
                        width: 208,
                        x: 70,
                        y: 214,
                        beforerender: "spzj_sprq_rqgs_beforerender",
                        listeners: {
                            beforerender: spzj_sprq_rqgs_beforerender
                        }
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setInfo = function(info, cell) {
            setInfo(info, cell)
        }
        this.getInfo = function(att) {
            var temp;
            if (att == "spzj_allowEdit") {
                temp = spzj_allowEdit.getValue()
            } else if (att == "spzj_allowPrint") {
                temp = spzj_allowPrint.getValue()
            } else if (att == "spzj_ty_display") {
                temp = spzj_ty_display.getValue()
            } else if (att == "spzj_ty_bqmc") {
                temp = spzj_ty_bqmc.getValue()
            } else if (att == "spzj_ty_spjg") {
                temp = spzj_ty_spjg.getValue()
            } else if (att == "spzj_ty_font") {
                temp = spzj_ty_font.getValue()
            } else if (att == "spzj_ty_x") {
                temp = spzj_ty_x.getValue()
            } else if (att == "spzj_ty_y") {
                temp = spzj_ty_y.getValue()
            } else if (att == "spzj_ty_height") {
                temp = spzj_ty_height.getValue()
            } else if (att == "spzj_ty_width") {
                temp = spzj_ty_width.getValue()
            } else if (att == "spzj_bty_display") {
                temp = spzj_bty_display.getValue()
            } else if (att == "spzj_bty_bqmc") {
                temp = spzj_bty_bqmc.getValue()
            } else if (att == "spzj_bty_spjg") {
                temp = spzj_bty_spjg.getValue()
            } else if (att == "spzj_bty_font") {
                temp = spzj_bty_font.getValue()
            } else if (att == "spzj_bty_x") {
                temp = spzj_bty_x.getValue()
            } else if (att == "spzj_bty_y") {
                temp = spzj_bty_y.getValue()
            } else if (att == "spzj_bty_height") {
                temp = spzj_bty_height.getValue()
            } else if (att == "spzj_bty_width") {
                temp = spzj_bty_width.getValue()
            } else if (att == "spzj_th_display") {
                temp = spzj_th_display.getValue()
            } else if (att == "spzj_th_bqmc") {
                temp = spzj_th_bqmc.getValue()
            } else if (att == "spzj_th_spjg") {
                temp = spzj_th_spjg.getValue()
            } else if (att == "spzj_th_font") {
                temp = spzj_th_font.getValue()
            } else if (att == "spzj_th_x") {
                temp = spzj_th_x.getValue()
            } else if (att == "spzj_th_y") {
                temp = spzj_th_y.getValue()
            } else if (att == "spzj_th_height") {
                temp = spzj_th_height.getValue()
            } else if (att == "spzj_th_width") {
                temp = spzj_th_width.getValue()
            } else if (att == "spzj_spz_display") {
                temp = spzj_spz_display.getValue()
            } else if (att == "spzj_spz_bqmc") {
                temp = spzj_spz_bqmc.getValue()
            } else if (att == "spzj_spz_tply") {
                temp = spzj_spz_tply.getValue()
            } else if (att == "spzj_spz_font") {
                temp = spzj_spz_font.getValue()
            } else if (att == "spzj_spz_x") {
                temp = spzj_spz_x.getValue()
            } else if (att == "spzj_spz_y") {
                temp = spzj_spz_y.getValue()
            } else if (att == "spzj_spz_height") {
                temp = spzj_spz_height.getValue()
            } else if (att == "spzj_spz_width") {
                temp = spzj_spz_width.getValue()
            } else if (att == "spzj_spr_display") {
                temp = spzj_spr_display.getValue()
            } else if (att == "spzj_spr_bqmc") {
                temp = spzj_spr_bqmc.getValue()
            } else if (att == "spzj_spr_spr") {
                temp = spzj_spr_spr.getValue()
            } else if (att == "spzj_spr_font") {
                temp = spzj_spr_font.getValue()
            } else if (att == "spzj_spr_x") {
                temp = spzj_spr_x.getValue()
            } else if (att == "spzj_spr_y") {
                temp = spzj_spr_y.getValue()
            } else if (att == "spzj_spr_height") {
                temp = spzj_spr_height.getValue()
            } else if (att == "spzj_spr_width") {
                temp = spzj_spr_width.getValue()
            } else if (att == "spzj_spr_qmzp") {
                temp = spzj_spr_qmzp.getValue()
            } else if (att == "spzj_sprq_display") {
                temp = spzj_sprq_display.getValue()
            } else if (att == "spzj_sprq_bqmc") {
                temp = spzj_sprq_bqmc.getValue()
            } else if (att == "spzj_sprq_sprq") {
                temp = spzj_sprq_sprq.getValue()
            } else if (att == "spzj_sprq_font") {
                temp = spzj_sprq_font.getValue()
            } else if (att == "spzj_sprq_x") {
                temp = spzj_sprq_x.getValue()
            } else if (att == "spzj_sprq_y") {
                temp = spzj_sprq_y.getValue()
            } else if (att == "spzj_sprq_height") {
                temp = spzj_sprq_height.getValue()
            } else if (att == "spzj_sprq_width") {
                temp = spzj_sprq_width.getValue()
            } else if (att == "spzj_sprq_rqgs") {
                temp = spzj_sprq_rqgs.getValue()
            } else if (att == "spzj_spyj_display") {
                temp = spzj_spyj_display.getValue()
            } else if (att == "spzj_spyj_bqmc") {
                temp = spzj_spyj_bqmc.getValue()
            } else if (att == "spzj_spyj_yjnr") {
                temp = spzj_spyj_yjnr.getValue()
            } else if (att == "spzj_spyj_font") {
                temp = spzj_spyj_font.getValue()
            } else if (att == "spzj_spyj_x") {
                temp = spzj_spyj_x.getValue()
            } else if (att == "spzj_spyj_y") {
                temp = spzj_spyj_y.getValue()
            } else if (att == "spzj_spyj_height") {
                temp = spzj_spyj_height.getValue()
            } else if (att == "spzj_spyj_width") {
                temp = spzj_spyj_width.getValue()
            } else if (att == "spzj_spbm_display") {
                temp = spzj_spbm_display.getValue()
            } else if (att == "spzj_spbm_bqmc") {
                temp = spzj_spbm_bqmc.getValue()
            } else if (att == "spzj_spbm_bmmc") {
                temp = spzj_spbm_bmmc.getValue()
            } else if (att == "spzj_spbm_font") {
                temp = spzj_spbm_font.getValue()
            } else if (att == "spzj_spbm_x") {
                temp = spzj_spbm_x.getValue()
            } else if (att == "spzj_spbm_y") {
                temp = spzj_spbm_y.getValue()
            } else if (att == "spzj_spbm_height") {
                temp = spzj_spbm_height.getValue()
            } else if (att == "spzj_spbm_width") {
                temp = spzj_spbm_width.getValue()
            }
            return temp
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.ApprovlType");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.ApprovlType");
    }
})