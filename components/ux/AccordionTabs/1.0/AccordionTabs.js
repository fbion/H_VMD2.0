Ext.define("vmd.ux.AccordionTabs", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.AccordionTabs",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 275,
    height: 680,
    layout: "auto",
    autoScroll: false,
    autoHeight: false,
    uxCss: ".x-accordion-hd .x-tool-toggle{    display: none}",
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
            var myPanel = null;
            var page = this;

            function initTabs(source, data) {
                var h = panel.getHeight();
                var cmpPath = vmd.getUxPath("IndexSeting");
                var items = [];
                for (var i = 0; i < data.length; i++) {
                    var item = {
                        xtype: "panel",
                        id: data[i].id,
                        title: data[i].name,
                        header: true,
                        border: true,
                        autoHeight: true,
                        closable: true,
                        width: 260,
                        listeners: {
                            afterrender: function(panel) {
                                var el = this.header.insertFirst({
                                    tag: 'div',
                                    cls: 'vmd-icon-delete',
                                    style: 'position:absolute;right:20px'
                                })
                                el.on('click', function(e) {
                                    stopPP(e)
                                    page.fireEvent('delIndex', page, panel.id)
                                })
                            }
                        },
                        items: [{
                            xtype: 'vmd.ux.IndexSeting',
                            layout: 'fit',
                            data: data[i],
                            index: i,
                            listeners: {
                                afterrender: function(panel) {
                                    panel.init(source, panel.data);
                                    panel.hwText.addListener('blur', function() {
                                        page.fireEvent('nameChang', myPanel, panel.index, panel.hwText.getValue())
                                    })
                                    panel.doLayout();
                                }
                            }
                        }],
                    }
                    items.push(item)
                }
                Ext.require(cmpPath, function() {
                    myPanel = new Ext.Panel({
                        xtype: "panel",
                        id: "MyPanel",
                        title: "Panel",
                        header: false,
                        border: true,
                        closable: true,
                        height: h - 36,
                        hideCollapseTool: true,
                        layout: "accordion",
                        region: "west",
                        width: 260,
                        split: true,
                        items: items
                    });
                    panel.removeAll();
                    panel.add(myPanel);
                    panel.doLayout();
                })
            }

            function panel_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.AccordionTabs',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            autoHeight: true,
            layout: "fit",
            autoScroll: true,
            style: "height: 100%;",
            beforerender: "panel_beforerender",
            listeners: {
                beforerender: panel_beforerender
            }
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.initTabs = function(source, data) {
            //直接填写方法内容
            initTabs(source, data)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.AccordionTabs");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AccordionTabs");
    }
})