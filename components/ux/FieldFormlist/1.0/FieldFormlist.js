Ext.define('vmd.ux.fieldForm.Controller', {
    xtype: 'vmd.ux.fieldForm.Controller',
    constructor: function(options) {}
})
Ext.define("vmd.ux.FieldFormlist", {
    extend: "vmd.base.Ux",
    requires: vmd.getCmpDeps([]),
    version: "1.0",
    xtype: "vmd.ux.FieldFormlist",
    title: "Panel",
    header: false,
    border: false,
    panelWidth: 240,
    width: 212,
    layout: "absolute",
    autoHeight: true,
    style: "min-height:45px;",
    uxCss: ".dhxform_obj_material .field-from .dhxform_item_label_left .dhxform_label{    margin-left: 4px;    margin-top: 10px;}.dhxform_obj_material .field-from .dhxform_label {    font-size: 12px;}.dhxform_obj_material .field-from .dhxform_fs legend.fs_legend {    font-size: 12px;}.dhxform_obj_material .field-from .dhxform_item_label_left {    margin-top: -6px;}.dhxform_obj_material .field-from .dhxform_textarea{    height: 16px;    border: 1px solid #ddd;    border-right: none;}.dhxform_obj_material .field-from .dhxform_btn {    margin: 0;    margin-top: 5px;    background-image: url('/components/ux/fieldform/1.0/img/箭头.png');    background-size: 70%;    background-repeat: no-repeat;    background-position: center;}.dhxform_obj_material .field-from .dhxform_btn .dhxform_btn_txt{    height: 24px;    border-radius:0; }.dhxform_obj_material .field-from .dhxform_btn:focus {    border-color: #ddd;    border-width: 1px;    margin: 0 1px;    margin-top: 5px;    color: rgb(245,245,245);}.dhxform_obj_material .field-from .dhxform_txt_label2{    font-size: 12px;    font-weight: normal;}.field-from-info,.field-from-info-child{    height: 24px;    line-height: 24px;    padding: 0 5px;    border-bottom: 1px solid #ddd;    position: relative;    cursor: pointer;}.field-from-ico{    position: absolute;    right: 0px;    top: 2px;    display: inline-block;    width: 20px;    height: 20px;    background-image: url('/components/ux/fieldform/1.0/img/右箭头.png');    background-size: 70%;    background-repeat: no-repeat;    background-position: center;    }.dhxform_obj_material .field-from  .dhxform_control{    border: 1px solid #ddd;    margin-top: 5px;}.ext-el-mask {    background-color: #ddd !important ;    opacity: 0.2 ;}",
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
            var myForm = null;
            var storelist = null;
            var dataVX = 0;
            var seleField = [];
            var page = this;
            var myData = null;
            var FieldSend = null;
            var fieldIndex = 0;
            var view1store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['id', 'name']
            });
            var view2store = new Ext.data.JsonStore({
                proxy: new Ext.data.MemoryProxy(),
                fields: ['pDas', 'id', 'name', 'index']
            });

            function hwDiv_afterrender(sender) {
                var formData = [{
                    type: "block",
                    className: 'field-from',
                    blockOffset: 0,
                    list: [{
                        type: "block",
                        blockOffset: 0,
                        list: [{
                            type: "label",
                            label: '模板字段',
                            labelWidth: 80
                        }, , {
                            type: "newcolumn"
                        }, {
                            type: "label",
                            label: '数据集字段',
                            labelWidth: 110
                        }]
                    }]
                }];
                myForm = new dhtmlXForm(hwDiv.id, formData);
            }

            function setValue(data) {
                if (vmd.isArray(data)) {
                    seleField = data;
                } else {}
            }

            function getValue() {
                return seleField;
            }

            function bindData(data) {
                myData = data;
                if (myForm) {
                    hwDiv.el.dom.innerHTML = ' ';
                }
                var formData = [{
                    type: "block",
                    className: 'field-from',
                    blockOffset: 0,
                    list: [{
                        type: "block",
                        blockOffset: 0,
                        list: [{
                            type: "label",
                            label: '模板字段',
                            labelWidth: 70
                        }, , {
                            type: "newcolumn"
                        }, {
                            type: "label",
                            label: '数据集字段',
                            labelWidth: 100
                        }]
                    }]
                }];
                var fieldsData = [];
                var dasData = [];
                seleField = data.fields;
                var das = xds.vmd.getStoreByDsName(data.source, true)
                var options = [];
                if (das && das.childNodes && das.childNodes.length > 0) {
                    das.childNodes.forEach(function(value, i) {
                        options.push({
                            text: value.text,
                            value: value.text,
                        })
                    })
                }
                for (var i = 0; i < data.fieldNames.length; i++) {
                    var obj = {
                        type: "block",
                        blockOffset: 0,
                        list: [{
                            type: "combo",
                            labelWidth: 70,
                            labelTop: 5,
                            offsetTop: 3,
                            label: data.fieldNames[i],
                            width: 110,
                            name: "field" + i,
                            options: options,
                            value: ''
                        }]
                    }
                    formData[0].list.push(obj);
                }
                myForm = new dhtmlXForm(hwDiv.id, formData);
                for (var j = 0; j < seleField.length; j++) {
                    myForm.setItemValue("field" + j, seleField[j] || " ");
                }
                myForm.attachEvent("onChange", function(name, value) {
                    fieldIndex = parseFloat(name.slice(5))
                    seleField[fieldIndex] = value;
                    page.fireEvent('change', page, seleField);
                })
            }
        } catch (ex) {
            vmd.Error.log('003-3', {
                p1: 'vmd.ux.FieldFormlist',
                p2: ex.message
            }, ex, 100);
        }
        this.items = [{
            xtype: "vmd.div",
            id: "hwDiv",
            autoEl: "div",
            border: true,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            width: 212,
            height: 50,
            layout: "fit",
            autoWidth: true,
            autoHeight: true,
            afterrender: "hwDiv_afterrender",
            style: "border: 1px solid #ddd;    padding: 0 5px 5px 5px;",
            listeners: {
                vmdafterrender: hwDiv_afterrender
            }
        }]
        this.callParent();
        vmd.core.compositeCmpInit(this.items, this);
        var me = this;
        eval(me.defineVars);
        resetCmpScope();
        this.bindData = function(data) {
            //直接填写方法内容
            bindData(data)
        }
        this.getValue = function() {
            //直接填写方法内容
            getValue()
        }
        this.setValue = function(data) {
            //直接填写方法内容
            setValue(data)
        }
        Ext.util.CSS.removeStyleSheet("vmd.ux.FieldFormlist");
        this.uxCss && Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.FieldFormlist");
    }
})