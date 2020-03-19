Ext.define('vmd.ux.dataInputOperateBar.Controller', {
    xtype: 'vmd.ux.dataInputOperateBar.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.DataInputOperateBar", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps(["vmd.ux.DropDownButton$1.0$DropDownButton"]),
    version: "1.0",
    xtype: "vmd.ux.DataInputOperateBar",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 309,
    height: 40,
    layout: "fit",
    afterrender: "DataInputOperateBar_afterrender",
    listeners: {
        vmdafterrender: function() {
            try {
                this.DataInputOperateBar_afterrender(this)
            } catch (ex) {
                vmd.Error.log('003-2', {
                    p1: 'vmd.ux.DataInputOperateBar'
                }, ex, 50);
            }
        }
    },
    addButtonName: "追加",
    deleteButtonName: "删除",
    saveButtonName: "保存",
    imButtonName: "导数据",
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

            function changeName(t, v) {
                if (t == 'add') {
                    addButton.buttonText = v;
                } else if (t == 'delete') {
                    deleteButton.buttonText = v;
                } else if (t == 'save') {
                    saveButton.text = v;
                } else if (t == 'import') {
                    importButton.buttonText = v;
                }
            }

            function DataInputOperateBar_afterrender(sender) {
                document.body.appendChild(addMenu.el.dom)
                document.body.appendChild(deleteMenu.el.dom)
                document.body.appendChild(importMenu.el.dom)
            }

            function addButton_clickRight(e) {
                addMenu.showAt(e.xy)
            }

            function deleteButton_clickRight(e) {
                deleteMenu.showAt(e.xy)
            }

            function importButton_clickRight(e) {
                // debugger
                importMenu.showAt(e.xy)
                importMenu.showAt(e.xy)
            }

            function addButton_clickLeft(sender, e) {
                page.fireEvent('addClick', sender, e);
            }

            function deleteButton_clickLeft(sender, e) {
                page.fireEvent('deleteClick', sender, e);
            }

            function saveButton_click(sender, e) {
                page.fireEvent('saveClick', sender, e)
            }

            function importButton_clickLeft(sender, e) {
                page.fireEvent('importClick', sender, e)
            }

            function am_front_click(sender, e) {
                page.fireEvent('addMenuClick', sender, e, 'front')
            }

            function am_after_click(sender, e) {
                page.fireEvent('addMenuClick', sender, e, 'after')
            }

            function am_copy_click(sender, e) {
                page.fireEvent('addMenuClick', sender, e, 'copy')
            }

            function dm_all_click(sender, e) {
                page.fireEvent('deleteMenuClick', sender, e, 'all')
            }

            function dm_multi_click(sender, e) {
                page.fireEvent('deleteMenuClick', sender, e, 'multi')
            }

            function dm_ground_click(sender, e) {
                page.fireEvent('deleteMenuClick', sender, e, 'ground')
            }

            function im_exToExcel_click(sender, e) {
                page.fireEvent('importMenuClick', sender, e, 'exportExcel')
            }

            function im_imExcel_click(sender, e) {
                page.fireEvent('importMenuClick', sender, e, 'importExcel')
            }

            function im_imDBF_click(sender, e) {
                page.fireEvent('importMenuClick', sender, e, 'importDBF')
            }

            function im_exToDBF_click(sender, e) {
                page.fireEvent('importMenuClick', sender, e, 'exportDBF')
            }
            /**
             *@desc
             *@param btnNames{array} 指定的显示按钮，['add','del','save','export','import']
             **/
            function showOperateBar(btnNames) {
                if (!btnNames) return;
                if (Ext.isArray(btnNames)) {
                    addButton.hide();
                    deleteButton.hide();
                    saveButton.hide();
                    importButton.hide();
                    Ext.each(btnNames, function(name) {
                        switch (name) {
                            case 'add':
                                addButton.show();
                                break;
                            case 'del':
                            case 'delete':
                                deleteButton.show();
                                break;
                            case 'save':
                                saveButton.show();
                                break;
                            case 'export':
                                importButton.show();
                                break;
                            case 'import':
                                importButton.show();
                                break;
                        }
                    })
                    //菜单显示
                    if (btnNames.indexOf('import') == -1) {
                        // importMenu.get(0).hide();//导入
                        importMenu.get(1).hide(); //导出
                    }
                    hwDiv.doLayout();
                    // page.doLayout();
                }
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.DataInputOperateBar',
                p2: ex.message
            }, ex, 100);
        }
        this.DataInputOperateBar_afterrender = DataInputOperateBar_afterrender;
        this.items = [{
                xtype: "vmd.menu",
                id: "importMenu",
                width: 120,
                hidden: true,
                floating: true,
                items: [{
                        xtype: "menuitem",
                        id: "im_exToExcel",
                        width: 120,
                        text: "导出当前数据到Excel文件",
                        hidden: false,
                        click: "im_exToExcel_click",
                        listeners: {
                            click: im_exToExcel_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "im_imExcel",
                        width: 120,
                        text: "导入Excel文件数据到当前界面",
                        hidden: false,
                        click: "im_imExcel_click",
                        listeners: {
                            click: im_imExcel_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.menu",
                id: "deleteMenu",
                width: 120,
                hidden: true,
                floating: true,
                items: [{
                        xtype: "menuitem",
                        id: "dm_all",
                        width: 120,
                        text: "删除全部记录",
                        hidden: false,
                        click: "dm_all_click",
                        listeners: {
                            click: dm_all_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "dm_multi",
                        width: 120,
                        text: "删除选择行（多选删除）",
                        hidden: false,
                        click: "dm_multi_click",
                        listeners: {
                            click: dm_multi_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.menu",
                id: "addMenu",
                width: 120,
                hidden: true,
                floating: true,
                items: [{
                        xtype: "menuitem",
                        id: "am_front",
                        width: 120,
                        text: "当前行前追加",
                        hidden: false,
                        click: "am_front_click",
                        listeners: {
                            click: am_front_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "am_after",
                        width: 120,
                        text: "当前行后追加",
                        hidden: false,
                        click: "am_after_click",
                        listeners: {
                            click: am_after_click
                        }
                    },
                    {
                        xtype: "menuitem",
                        id: "am_copy",
                        width: 120,
                        text: "复制追加当前行",
                        hidden: false,
                        click: "am_copy_click",
                        listeners: {
                            click: am_copy_click
                        }
                    }
                ]
            },
            {
                xtype: "vmd.div",
                id: "hwDiv",
                layoutConfig: {
                    align: "middle",
                    pack: "end"
                },
                autoEl: "div",
                border: false,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top left",
                width: 300,
                height: 40,
                layout: "hbox",
                items: [{
                        xtype: "vmd.ux.DropDownButton",
                        id: "addButton",
                        buttonText: this.addButtonName,
                        layout: "fit",
                        height: 28,
                        width: 60,
                        margins: "0 5",
                        click1: "addButton_click1",
                        clickRight: "addButton_clickRight",
                        clickLeft: "addButton_clickLeft",
                        listeners: {
                            clickRight: addButton_clickRight,
                            clickLeft: addButton_clickLeft
                        },
                        hidden: this.addDisplay
                    },
                    {
                        xtype: "vmd.ux.DropDownButton",
                        id: "deleteButton",
                        buttonText: this.deleteButtonName,
                        layout: "fit",
                        height: 28,
                        width: 60,
                        margins: "0 5",
                        clickRight: "deleteButton_clickRight",
                        clickLeft: "deleteButton_clickLeft",
                        listeners: {
                            clickRight: deleteButton_clickRight,
                            clickLeft: deleteButton_clickLeft
                        },
                        hidden: this.deleteDisplay
                    },
                    {
                        xtype: "vmd.button",
                        id: "saveButton",
                        text: this.saveButtonName,
                        type: "text",
                        size: "small",
                        margins: "0 5",
                        click: "saveButton_click",
                        width: 44,
                        height: 28,
                        style: "font-size: 14px",
                        listeners: {
                            click: saveButton_click
                        },
                        hidden: this.saveDisplay
                    },
                    {
                        xtype: "vmd.ux.DropDownButton",
                        id: "importButton",
                        buttonText: this.imButtonName,
                        layout: "fit",
                        height: 28,
                        width: 72,
                        margins: "0 60 0 0",
                        clickRight: "importButton_clickRight",
                        clickLeft: "importButton_clickLeft",
                        listeners: {
                            clickRight: importButton_clickRight,
                            clickLeft: importButton_clickLeft
                        },
                        hidden: this.importDisplay
                    }
                ]
            }
        ]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.disableMenu = function(type) {
            if (type == 'all') return;
            (type == 'justEx') ?
            im_imExcel.disable(): im_exToExcel.disable();
        }
        this.changeName = function(type, value) {
            changeName(type, value)
        }
        this.showOperateBar = function(btnNames) {
            //直接填写方法内容
            showOperateBar(btnNames)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.DataInputOperateBar");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DataInputOperateBar");
    }
})