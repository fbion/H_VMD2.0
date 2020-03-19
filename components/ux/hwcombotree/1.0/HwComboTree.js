Ext.define("vmd.ux.HwComboTree", {
    extend: "Ext.Panel",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.HwComboTree",
    title: "Panel",
    header: false,
    border: false,
    layout: "auto",
    autoHeight: false,
    afterrender: "HwComboTree_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.HwComboTree_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.HwComboTree'
                }, ex, 50);
            }
        }
    },
    comboWidth: 150,
    treeWidth: 350,
    treeHeight: 270,
    comboDivWidth: 200,
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
        try {
            var page = this;

            function combo_change(sender, value, text) {
                page.fireEvent("change", sender, value, text);
            }

            function combo_afterrender(sender) {
                combo.setValue = function(val) {
                    this._value = val;
                    tree._setValue();
                };
                combo.getValue = function() {
                    return this._value || "";
                };
                var imgel = combo.el.query(".dhxcombo_select_img");
                vmd(imgel).unbind('click');
                combo.addClass('combotree');
                vmd(sender.DOMelem_input).on('focus', function(e) {
                    e.stopPropagation();
                    var pos = combo.el.getRegion();
                    //当top+tree高>body的可视化高度，需要body的高度减去tree的高度才可以显示
                    var top = pos.top + 35;
                    var left = pos.left;
                    tree.show();
                    if (top + tree.getHeight() >= document.body.clientHeight) {
                        top = top - tree.getHeight() - 35;
                    }
                    tree.el.setStyle('border', '1px solid #eee');
                    tree.el.setStyle('position', 'absolute');
                    tree.el.setLeft(left);
                    tree.el.setTop(top);
                }).on('blur', function() {}).on('keyup', function() {
                    tree.filterBy(combo.getText());
                });
                Ext.getDoc().on('click', function(e) {
                    if (vmd(e.target).parents('.combotree').length === 0 && vmd(e.target).parents('.vmd-tree').length === 0) tree.hide();
                });
            }

            function tree_nodeclick(sender, node, e) {
                e.stopPropagation();
                if (!node.hasChildNodes()) {
                    combo.setValue(node.id);
                    combo.setText(node.text);
                    combo._value = node.id;
                    tree.hide();
                }
            }

            function tree_beforeNodeExpand(sender, node, deep, anim) {
                stopPP(sender);
            }

            function tree_beforerender(sender) {
                this._setValue = function() {
                    var id = combo._value;
                    var node = tree.getNodeById(id);
                    var text = "";
                    if (node) {
                        text = node.text;
                        //节点展开
                        tree.expandPath(node.getPath());
                        node.select();
                    }
                    combo.setText(text);
                };
            }

            function tree_afterrender(sender) {
                tree.hide();
            }

            function tree_afterBindData(sender) {
                tree.expandAll();
            }

            function HwComboTree_afterrender(sender) {
                document.body.appendChild(tree.el.dom);
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.HwComboTree',
                p2: ex.message
            }, ex, 100);
        }
        this.HwComboTree_afterrender = HwComboTree_afterrender;
        this.items = [{
                xtype: "vmd.div",
                id: "hwDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "center"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: this.comboDivWidth,
                height: 50,
                layout: "hbox",
                items: [{
                    xtype: "vmd.combo",
                    id: "combo",
                    width: this.comboWidth,
                    afterrender: "combo_afterrender",
                    change: "combo_change",
                    listeners: {
                        vmdafterrender: combo_afterrender,
                        change: combo_change
                    }
                }]
            },
            {
                xtype: "vmd.treeex",
                id: "tree",
                width: this.treeWidth,
                height: this.treeHeight,
                hideRoot: true,
                loadType: "全部加载",
                nodeclick: "tree_nodeclick",
                beforeNodeExpand: "tree_beforeNodeExpand",
                beforerender: "tree_beforerender",
                afterrender: "tree_afterrender",
                rootValue: "0",
                style: "z-index: 999;",
                afterBindData: "tree_afterBindData",
                listeners: {
                    nodeclick: tree_nodeclick,
                    beforeNodeExpand: tree_beforeNodeExpand,
                    beforerender: tree_beforerender,
                    vmdafterrender: tree_afterrender,
                    afterBindData: tree_afterBindData
                },
                store: this.treeStore,
                parentField: this.parentId,
                valueField: this.value,
                textField: this.text
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.getValue = function() {
            return combo.getValue();
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.HwComboTree");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.HwComboTree");
    }
})