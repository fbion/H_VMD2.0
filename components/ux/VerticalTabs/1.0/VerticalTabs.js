Ext.define("vmd.ux.VerticalTabs", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.VerticalTabs",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 318,
    height: 700,
    layout: "fit",
    autoScroll: false,
    autoHeight: false,
    beforerender: "VerticalTabs_beforerender",
    listeners: {
        beforerender: function() {
            try {
                this.VerticalTabs_beforerender(this)
            } catch (ex) {
                vmd.Error.log('003-1', {
                    p1: 'vmd.ux.VerticalTabs'
                }, ex, 50);
            }
        }
    },
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
            function hwMyTabs_beforerender(sender) {}
            var tabsData = null;
            var page = this;
            var myPanel = null;

            function getActive() {
                if (myPanel) {
                    return myPanel.getActiveTab().id;
                } else {
                    return 0
                }
            }

            function initTabs(data, isActive) {
                var activeItem = 0;
                if (!vmd.isArray(data.allLayers)) {
                    vmd.alert("请传入数组");
                    return;
                }
                tabsData = data.allLayers;
                if (isActive) {
                    activeItem = isActive;
                }
                // var h = panel.getHeight();
                var cmpPath = [];
                var items = [];
                for (var i = 0; i < tabsData.length; i++) {
                    if (!tabsData[i].isDependentSeries) {
                        var comp = tabsData[i].type.slice(0, 1).toUpperCase() + tabsData[i].type.slice(1);
                        cmpPath.push(vmd.getUxPath(comp));
                        var obj = {
                            xtype: "panel",
                            id: tabsData[i].name,
                            title: tabsData[i].nameText,
                            header: true,
                            border: true,
                            closable: true,
                            autoScroll: true,
                            items: [{
                                xtype: 'vmd.ux.' + comp,
                                layout: 'fit',
                                data: tabsData[i],
                                listeners: {
                                    vmdafterrender: function(panel) {
                                        panel.init(panel.data, tabsData);
                                    }
                                }
                            }],
                            listeners: {
                                beforeclose: function(tab) {
                                    if (confirm('确认删除该图层？')) {
                                        page.fireEvent('delSeries', tab, tab.id)
                                    } else {
                                        return false
                                    }
                                }
                            }
                        }
                        items.push(obj);
                    }
                }
                //Ext.require(cmpPath, function() {
                vmd.core.uxLoader(cmpPath, function() {
                    myPanel = new Ext.TabPanel({
                        xtype: "tabpane1",
                        id: "hwMyTabs",
                        tabPosition: 'left',
                        textAlign: 'vertical',
                        tabWidth: 28,
                        closable: true,
                        activeTab: activeItem,
                        items: items
                    });
                    panel.removeAll();
                    panel.add(myPanel);
                    panel.doLayout()
                    if (myPanel.strip) {
                        var el = myPanel.strip.insertFirst({
                            tag: 'li',
                            children: {
                                tag: 'a',
                                href: '#',
                                children: {
                                    tag: 'em',
                                    children: {
                                        tag: 'span',
                                        children: {
                                            tag: 'span',
                                            style: 'font-size:20px;padding:6px 0',
                                            html: '+'
                                        }
                                    }
                                }
                            }
                        })
                        el.on('click', function(e) {
                            page.fireEvent('addClick', page, myPanel, e);
                        })
                    }
                })
            }

            function panel_beforerender(sender) {}

            function VerticalTabs_beforerender(sender) {}
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.VerticalTabs',
                p2: ex.message
            }, ex, 100);
        }
        this.VerticalTabs_beforerender = VerticalTabs_beforerender;
        this.items = [{
            xtype: "panel",
            id: "panel",
            title: "Panel",
            header: false,
            border: false,
            height: 100,
            autoHeight: false,
            layout: "fit",
            autoScroll: false
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.initTabs = function(data, isActive) {
            //直接填写方法内容
            initTabs(data, isActive)
        }
        this.getActive = function() {
            //直接填写方法内容
            return getActive()
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.VerticalTabs");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.VerticalTabs");
    }
})