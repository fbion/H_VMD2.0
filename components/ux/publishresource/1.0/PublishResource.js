undefined
Ext.define("vmd.ux.PublishResource", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.PublishResource",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 603,
    height: 97,
    layout: "absolute",
    style: "font-size: 14px;",
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
            //定义校验规则表达式
            var strRegex = '^(([0-9a-z_!~*().&=+$%-]+: )?[0-9a-z_!~*().&=+$%-]+@)?' //ftp的user@
                +
                '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
                +
                '|' // 允许IP和DOMAIN（域名）
                +
                '([0-9a-z_!~*()-]+.)*' // 域名- www.
                +
                '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
                +
                '[a-z]{2,6})' // first level domain- .com or .museum
                +
                '(:[0-9]{1,6})?' // 端口- :80
                +
                '((/?)|' // a slash isn't required if there is no file name
                +
                '(/[0-9a-z_!~*().;?:@&=+$,%#-]+)+/?)$';

            function hwText1_beforerender(sender) {
                hwText1.regex = new RegExp(strRegex)
                hwText1.regexText = "输入标准的服务器地址！无需输入‘http://’";
            }
            //     hwText1.regex = /[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
            //     //t_serverIp.regex = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
            //     hwText1.regexText = "输入标准的服务器地址(带端口)！";
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.PublishResource',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "vmd.div",
            id: "hwDiv",
            autoEl: "div",
            border: false,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 600,
            height: 100,
            layout: "auto",
            items: [{
                    xtype: "vmd.div",
                    id: "hwDiv1",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 400,
                    height: 50,
                    autoWidth: true,
                    autoHeight: true,
                    style: "margin-top: 5px;",
                    items: [{
                            xtype: "vmd.img",
                            id: "hwImg",
                            width: 15,
                            height: 15,
                            x: 15,
                            y: 9,
                            src: "icon-tasks",
                            style: "margin-left: 10px;    margin-top: 15px;"
                        },
                        {
                            xtype: "label",
                            id: "label2",
                            text: "服务器名称",
                            columnWidth: 1,
                            style: "margin-left: 10px",
                            x: 30,
                            y: 5,
                            autoWidth: true,
                            autoHeight: true
                        }
                    ]
                },
                {
                    xtype: "vmd.div",
                    id: "div",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 289,
                    height: 27,
                    columnWidth: 0.5,
                    style: "margin: 10px 0 10px 30px",
                    y: 30,
                    x: 20,
                    items: [{
                            xtype: "label",
                            id: "label",
                            text: "当前资源地址：",
                            height: 10,
                            style: "color: #5f5f5f;    top: 5px"
                        },
                        {
                            xtype: "textfield",
                            id: "hwText",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 60,
                            y: 10,
                            width: 170,
                            readOnly: true,
                            disabled: true
                        }
                    ]
                },
                {
                    xtype: "vmd.div",
                    id: "div1",
                    autoEl: "div",
                    border: false,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top left",
                    width: 309,
                    height: 29,
                    columnWidth: 0.5,
                    layout: "auto",
                    x: 35,
                    y: 60,
                    style: "margin-left: 30px;",
                    items: [{
                            xtype: "label",
                            id: "label1",
                            text: "发布资源地址：",
                            x: 290,
                            y: 30,
                            style: "color: #5f5f5f;    top: 5px"
                        },
                        {
                            xtype: "textfield",
                            id: "hwText1",
                            allowBlank: true,
                            enableKeyEvents: true,
                            x: 430,
                            y: 20,
                            width: 170,
                            beforerender: "hwText1_beforerender",
                            emptyText: "为空取当前地址",
                            disabled: false,
                            listeners: {
                                beforerender: hwText1_beforerender
                            }
                        }
                    ]
                }
            ]
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.setText = function(oldIP, newIP, servername) {
            //直接填写方法内容
            this.label2.setText(servername || "服务器地址");
            this.hwText.setValue(oldIP);
            this.hwText1.setValue(newIP);
        }
        this.getText = function() {
            //直接填写方法内容
            return {
                oldIP: this.hwText.getValue(),
                newIP: this.hwText1.getValue()
            };
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.PublishResource");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.PublishResource");
    }
})