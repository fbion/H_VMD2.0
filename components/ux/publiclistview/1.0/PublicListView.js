Ext.define("vmd.ux.PublicListView" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.PublicListView",
	title:"Panel",
	header:false,
	border:false,
	width:760,
	height:472,
	layout:"border",
	afterrender:"PublicListView_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.PublicListView_afterrender(this)
}
	},
	tpl:"<tpl for=\".\">    <div class=\"file undefined file-box menu-file is{type}\" original-name=\"{name}\" title=\"名称:{name} 修改时间 : {modifyTime}\">        <div class=\"item-select\">            <div class=\"item-check\">            </div>        </div>        <div class=\"item-menu\">            <div class=\"cert\">            </div>        </div>        <div class=\"ico\" filetype=\"{type}\">            <i class=\"x-item-file x-{type}\">            </i>        </div>        <div class=\"filename\">            <span class=\"title db-click-rename\" title=\"双击名称重命名\">{name}</span>        </div>    </div></tpl><div class=\"file undefined file-box menu-file\" title=\"添加模块\" ptype=\"add\">    <div class=\"ico\" filetype=\"add\">        <i class=\"x-item-file x-add\">        </i>    </div>    <div class=\"filename\">        <span class=\"title db-click-rename\" title=\"点击添加模块\">添加</span>    </div></div>",
	data:"var data = [{    \"id\": 0,    \"name\": \"单井框架页\",    \"type\": \"folder\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 1}, {    \"id\": 11,    \"name\": \"单井曲线\",    \"type\": \"folder\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 2}, {    \"id\": 1,    \"name\": \"地质分层\",    \"type\": \"folder\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 3}, {    \"id\": 2,    \"name\": \"单井连通\",    \"type\": \"module\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 4}, {    \"id\": 3,    \"name\": \"单井小层\",    \"type\": \"module\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 5}, {    \"id\": 4,    \"name\": \"大事记要\",    \"type\": \"module\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 6}, {    \"id\": 5,    \"name\": \"地层压力\",    \"type\": \"module\",    \"modifyTime\": \"2018/03/19 18:21:20\",    \"xh\": 7}];return data;",
	viewHidden:true,
	listHidden:false,
	autoheight:false,
	uxCss:".x-grid3-header {    background: #fff;    border-bottom: 1px #f2f2f2 solid;}.x-grid3-cell-inner,.x-grid3-hd-inner {    line-height: 25px;    height: 25px}.x-grid3-header .x-grid3-hd-inner {    padding: 2px 3px 2px 3px}.x-grid3-row-over {    border-color: #ddd;    background: #efefef;}.x-grid3-header-pop-inner {    border-left-color: #aaccf6;    background: #aaccf6;}td.x-grid3-hd-over,td.sort-desc,td.sort-asc,td.x-grid3-hd-menu-open {    border-left-color: #fff;    border-right-color: #fff;}td.x-grid3-hd-over .x-grid3-hd-inner,td.sort-desc .x-grid3-hd-inner,td.sort-asc .x-grid3-hd-inner,td.x-grid3-hd-menu-open .x-grid3-hd-inner {    background: #ebf3fd;}.file-list-list .filename,.file-list-list .filename .children-more,.file-list-list .filename .ico {    float: left}.file-list-list .filename .children-more {    width: 20px;    height: 28px;    text-align: center;    padding-left: 0px;}.file-list-list .filename .ico {    height: 20px;    width: 20px;    padding: 0px;    line-height: 20px;    margin-right: 4px;    margin-top: 4px;    text-align: center;    vertical-align: bottom;    display: table-cell;}.x-item-file.small {    width: 20px;    height: 20px;}/*重置样式*/body div.file-continer .file.select,body div.file-continer .file.file-select-drag-temp {    -webkit-transition: transform 0.2s;    -moz-transition: transform 0.2s;    -o-transition: transform 0.2s;    -ms-transition: transform 0.2s;    transition: transform 0.2s;    background: #cce8ff;    border-color: #99d1ff;    border-radius: 0px;    filter: none;    color: #335;    padding: 0 5px;}body div.file-continer .file.hover {    -webkit-transition: transform 0.2s;    -moz-transition: transform 0.2s;    -o-transition: transform 0.2s;    -ms-transition: transform 0.2s;    transition: transform 0.2s;    background: #e5f3ff;    border-color: transparent;    border-radius: 0px;    border-radius: 0;    filter: none;    color: #335;}.file-list-icon div.file,.file-list-icon .flex-empty {    height: auto;    max-height: 120px;}.x-item-small {    position: relative;    width: 18px;    height: 18px;    margin-right: 4px;    background-size: 100% auto;    vertical-align: middle;}.x-item-file {    background-repeat: no-repeat;    background-size: cover;    background-position: center;    background-image: url(\"/modules/hw3ce0447e/img/icon_file/file.png\");    background-image: none \9;    filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='/modules/hw3ce0447e/img/icon_file/file.png?ver=3.30', sizingMethod='scale');    -ms-filter: progid: DXImageTransform.Microsoft.AlphaImageLoader(src='/modules/hw3ce0447e/img/icon_file/file.png?ver=3.30', sizingMethod='scale');    width: 60px;    height: 60px;    display: inline-block;    pointer-events: none;}.file-list-icon {    padding: 10px 20px 0 10px;    display: flex;    /*justify-content: space-between;*/    flex-wrap: wrap;    align-items: flex-start;}.file-list-icon:after {    width: 82px;    content: \"\";    display: block;}.file-list-icon .flex-empty {    width: 75px;    border: 1px solid transparent;    margin: 0;    margin-right: 10px;    margin-bottom: 10px;    visibility: hidden;    height: 0 !important;}.file-list-icon .meta-info {    height: 22.5px;    width: 22.5px;    margin-right: 6.75px;    margin-top: -22.5px;    position: absolute;    right: 0;}.file-list-icon .meta-info img {    width: 100%;    height: 100%;}.file-list-icon .file {    position: relative;    color: #335;    border: 1px solid transparent;    box-shadow: 0px 0px 2px rgba(255, 255, 255, 0);    -webkit-transition: background 0.2s, border 0.2s, color 0.2s;    -moz-transition: background 0.2s, border 0.2s, color 0.2s;    -o-transition: background 0.2s, border 0.2s, color 0.2s;    -ms-transition: background 0.2s, border 0.2s, color 0.2s;    transition: background 0.2s, border 0.2s, color 0.2s;    width: 80px;    height: 75px;    text-decoration: none;    margin: 0;    margin-right: 5px;    padding: 0 5px;    margin-bottom: 10px;    overflow: hidden;    float: left;}.file-list-icon .file .ico {    -webkit-transition: all 0.168s;    -moz-transition: all 0.168s;    -o-transition: all 0.168s;    -ms-transition: all 0.168s;    transition: all 0.168s;}.file-list-icon .file.hover {    border: 1px solid #dedede;    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#fafafa', endColorstr='#eeeeee');    background-image: -webkit-linear-gradient(top, #fafafa, #eeeeee);    background-image: -moz-linear-gradient(top, #fafafa, #eeeeee);    background-image: -o-linear-gradient(top, #fafafa, #eeeeee);    background-image: -ms-linear-gradient(top, #fafafa, #eeeeee);    background-image: linear-gradient(top, #fafafa, #eeeeee);    -pie-background: linear-gradient(to top, #fafafa, #eeeeee);    border-radius: 3px;}.file-list-icon .file .filename {    width: 60px;    cursor: default;    text-align: center;    word-break: break-all;    font-size: 1.0em;    margin: 0 auto;    margin-right: 20px;    line-height: 1.5em;    padding-bottom: 5px;    display: -webkit-box;    -webkit-box-orient: vertical;    -webkit-line-clamp: 3;}.file-list-icon .file .filename .textarea {    position: absolute;    font-size: 1.0em;    text-align: center;    margin-left: -1px;    margin-top: -3px;}.file-list-icon .file .filename #pathRenameTextarea,.file-list-icon .file .filename .newfile {    width: 80px;    padding: 0px 0 4px 0;    margin-top: 0px;    overflow-y: hidden;    border: 1px solid #888;    font-size: 1.0em;    text-align: center;    line-height: 1.5em;    position: absolute;    z-index: 999;    margin-top: 2px;    border-bottom-left-radius: 3px;    border-bottom-right-radius: 3px;}.file-list-icon .file .filename #pathRenameTextarea:focus,.file-list-icon .file .filename .newfile:focus {    outline: none;}.file-list-icon .file.select,.file-list-icon .file.file-select-drag-temp {    border: 1px solid #d2d2d2;    filter: progid: DXImageTransform.Microsoft.gradient(startColorstr='#f3f3f3', endColorstr='#d9d9d9');    background-image: -webkit-linear-gradient(top, #f3f3f3, #d9d9d9);    background-image: -moz-linear-gradient(top, #f3f3f3, #d9d9d9);    background-image: -o-linear-gradient(top, #f3f3f3, #d9d9d9);    background-image: -ms-linear-gradient(top, #f3f3f3, #d9d9d9);    background-image: linear-gradient(top, #f3f3f3, #d9d9d9);    -pie-background: linear-gradient(to top, #f3f3f3, #d9d9d9);    border-radius: 3px;    padding: 0px;}.file-list-icon .file.file-icon-edit {    overflow: visible;}.file-list-icon .file.file-icon-edit .filename {    position: absolute;    z-index: 99;}.file-list-icon .file .ico {    height: 60px;    width: 80px;    padding-top: 4px;    text-align: center;    vertical-align: middle;    display: -webkit-box;}.file-list-icon .file .ico img {    height: 100% \9;    max-height: 100%;    max-width: 100%;    border-radius: 5px;}.file-list-icon .file .ico.picture {    background: none;    width: 50px;    padding-left: 5px;}.file-list-icon .file .ico.picture img {    -webkit-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);    -moz-box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);    width: 100% \9;    max-width: 100%;    border-radius: 0px;    position: relative;    top: 50%;    transform: translateY(-50%);}.file-list-icon .file .ico.picture img.lazyload-ready {    -webkit-box-shadow: none;    -moz-box-shadow: none;    box-shadow: none;}.x-folder {    background-image: url(\"/modules/hw7b13a17a/img/folder.png\");    background-image: none \9;}.x-module {    background-image: url(\"/modules/hw7b13a17a/img/module.png\");    background-image: none \9;}.x-add-small {    background-image: url(\"/modules/hw7b13a17a/img/add-small.png\");    background-image: none \9;    opacity: 0.5;}.x-add {    background-image: url(\"/modules/hw7b13a17a/img/addmodule.png\");    background-image: none \9;}.frame-fullscreen {    position: fixed;    z-index: 99999999;    left: 0;    top: 0;}.font-icon {    font-family: FontAwesome;    font-style: normal;    color: inherit;}.file-continer .file .filename .title.db-click-rename {    cursor: text;}/*文件选中样式*/.file-continer .file .item-select {    display: none;    position: absolute;    right: 4px;    top: 4px;    width: 14px;    height: 14px;    box-sizing: content-box;    text-align: center;    border: 1px solid #ddd;    background: #fff;    cursor: pointer;    z-index: 50;    border-radius: 2px;    padding: 2px;    left: 5px;    border-radius: 50%;    background: rgba(0, 0, 0, 0.05);    border: none;    color: #fff;}.file-continer .file .item-select .item-check {    font-family: FontAwesome;    font-weight: normal;    font-style: normal;    text-decoration: inherit;    font-size: 18px;    font-size: 12px;    text-shadow: none;}.file-continer .file.select .item-select {    display: block;    color: #fff;    background: #3b8cff;}.file-continer .file .item-select .item-check:after {    content: '\\f00c';    position: relative;    top: -1px;}.file-continer .file.select.isfolder .item-select {    display: none;}.PublicListView {    font-size: 14px;}.PublicListView .x-grid3-body .x-grid3-td-checker {    background-image: url('')}.PublicListView .x-grid3-hd-row td {    border-left-color: #fff;    border-right-color: #fff;}.PublicListView .x-grid3-row {    border-color: #fff;}.list-view {    background-image: url(\"/modules/hw7b13a17a/img/list-view.png\");    background-repeat: no-repeat;    background-position: center center;    border-radius: 0px;    border: 0}.list-view-sel {    background-color: lightBlue;}.list-list {    background-image: url(\"/modules/hw7b13a17a/img/list-list.png\");    background-repeat: no-repeat;    background-position: center center;    border-radius: 0px;    border: 0}.list-list-sel {    background-color: lightBlue;}.nodetool span.button {    line-height: 0;    margin: 0 2px;    width: 20px;    height: 20px;    display: inline-block;    vertical-align: middle;    border: 0 none;    cursor: pointer;    outline: none;}.nodetool span.button.module {    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/modules/hw7b13a17a/img/module-float.png\");    margin-top: 10px;}.nodetool span.button.folder {    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/modules/hw7b13a17a/img/folder-float.png\");}.nodetool span.button.edit {    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/modules/hw7b13a17a/img/edit-float.png\");}.nodetool span.button.remove {    background-color: transparent;    background-repeat: no-repeat;    background-attachment: scroll;    background-image: url(\"/modules/hw7b13a17a/img/remove-float.png\");    margin-top: 10px;}.x-grid3-header .x-grid3-row-checker {    margin-top: 0;}.x-grid3-row-checker {    margin-top: 5px;}.x-grid3-cell-inner {    line-height: 30px;}.x-grid3-hd-inner {    line-height: 25px;    font-size: 14px;}.PublicListView .x-grid3-row td,.x-grid3-summary-row {    font-size: 14px;}.PublicListView .x-menu-list-item {    font-size: 14px;}.listViewAdd{    border-color: #f2f2f2 !important;    color:#b7b7b7;}.listViewAddover{    border-color: #1196db !important;    border-width: 1px !important;    color:#1196db;}.x-add-small-over{    opacity: 1;}",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			/////////////////////
//注册的资源树的对外事件
/////////////////////
var page = this;
var _enableadd = true;
var _enableedit = true;
var _floatlist = [];

function _enableAdd(enable, floatlist) {
    _floatlist = floatlist
    _enableadd = enable

    var nodeEl = vmd(MyGrid.view.scroller.dom)

}

function _enableEdit(enable) {
    _enableedit = enable
}



Ext.grid.ColumnModel.override({
    getTotalWidth: function(includeHidden) {
        var off = 0;
        if(Ext.isChrome) {
            off = 2;
        };
        if(!this.totalWidth) {
            this.totalWidth = 0;
            for(var i = 0, len = this.config.length; i < len; i++) {
                if(includeHidden || !this.isHidden(i)) {
                    this.totalWidth += this.getColumnWidth(i) + off;
                };
            };
        };
        return this.totalWidth;
    }
});


function hwDataView_dblclick(sender, index, node, e) {
    if(!vmd(e.target).hasClass('db-click-rename'))
        page.fireEvent("listDbClick", sender, index, node, e);
}



function PublicListView_afterrender(sender) {
    this.body.on('contextmenu', function(e) {
        page.fireEvent('contextmenu', sender.body, null, e);
        e.stopEvent();
    })
    sender.dataView = hwDataView;
}

function MyGrid_beforerender(sender) {
    this.store = hwDataView.store || testStore;
    var sm = new Ext.grid.CheckboxSelectionModel({
        width: 25,
        singleSelect: false //多选
    });
    sm.on("selectionchange", function(row, rowIndex, r) {
        var selcount = row.grid.selModel.getCount()
        var allcount = row.grid.getStore().getCount()
        label.setText(allcount + "个项目  已选中" + selcount + "个项目");
    });
    // 在数组中插入多个元素 
    vmd.Array.insert(this.colModel.config, 0, [sm]);
    this.selModel = sm
    var aa = page.fireEvent('listColInit', sender, this.colModel.config)

    this.on("rowcontextmenu", function(grid, index, e) {
        page.fireEvent('contextmenu', sender, index, e)
        
        e.stopEvent();
        return false;
    })

}

function hwDataView_contextmenu(sender, index, node, e) {
    var seledIndexs = this.getSelectedIndexes()
    if(index && seledIndexs && seledIndexs.indexOf(index) < 0) {
        this.clearSelections();
        this.selectRange(index, index, true);
    }

    page.fireEvent('contextmenu', sender, index, e)
    e.stopEvent();
    return false;
}

function MyGrid_rowcontextmenu(sender, rowIndex, e) {
    
    var selId = this.store.getAt(rowIndex).id;
    var seledMap = this.getSelectionModel().selections.map
    if(seledMap && selId && !seledMap[selId]) {
        this.selModel.clearSelections();
        this.selModel.selectRow(rowIndex, true);
    }

    page.fireEvent('contextmenu', sender, rowIndex, e)
    e.stopEvent();
    return false;
}

function MyGrid_celldblclick(sender, rowIndex, columnIndex, e) {
    page.fireEvent("listDbClick", sender, rowIndex, e.target, e);
}

function node_del(DataView, index, node, e) {
    page.fireEvent('itemDelete', DataView, index, node, e);
}

function node_edit(DataView, index, node, e) {
    page.fireEvent('itemEdit', DataView, index, node, e);
}

function node_add(DataView, type) {
    page.fireEvent('addItem', DataView, type);
}

function hwDataView_afterrender(sender) {
    var rename = function(a) {
        var r = trim(a.text()),
            l, i;
        i = a.attr('original-name');
        l = "<textarea class='fix' id='pathRenameTextarea'>" + r + "</textarea>";
        a.css({
            height: a.height()
        });
        a.addClass("file-icon-edit").find(".title").html("<div class='textarea'>" + l + "<div>");
        var c = $("#pathRenameTextarea");
        var _rename = function(o) {
            i = a.attr('original-name');
            var indexArr = sender.getSelectedIndexes();
            var curIndex = indexArr && indexArr[0];
            a.removeClass("file-icon-edit").find(".title").html(htmlEncode(o));
            if(i != o) {
                if(i.substring(i.lastIndexOf('.') + 1) != o.substring(o.lastIndexOf('.') + 1)) {
                    Ext.Msg.alert("提示", "重命名失败,文件类型不允许修改！", function() {
                        Tips.tips("重命名失败", "error");
                    })
                    a.removeClass("file-icon-edit").find(".title").html(htmlEncode(i));
                } else {
                    page.fireEvent('rename', sender, o, i, curIndex);
                }
            }
        }
        c.focus().autoTextarea();
        c.keydown(function(e) {
            if(e.keyCode == 13) {
                e.preventDefault();
                stopPP(e);
                _rename(c.attr("value"))
            }
            if(e.keyCode == 27) {
                $(a).removeClass("file-icon-edit").find(".title").html(i);
            }
        }).unbind("blur").blur(function() {
            _rename(c.val())
        })
    }
    vmd(".filename .db-click-rename").myDbclick(function(e) {
        var t = $(e.target);
        if(t.hasClass("db-click-rename")) {
            var a = t.parents(".file");
            return rename(a);
        }
    })


    this.on("mouseenter", function(DataView, index, node, e) {
        if(node.attributes.ptype && node.attributes.ptype.nodeValue == "add") {
            if(!_enableadd)
                return;
            //循环生成编辑的悬浮文本框
            var nodeEl = vmd(node.children[0]);
            var inserthtml = "";
            if(_floatlist.length > 0) {
                for(var i = 0; i < _floatlist.length; i++) {
                    inserthtml += '<span class="button ' + _floatlist[i].cls + '"  title="' + _floatlist[i].name + '" onfocus="this.blur();"></span>'
                }
            }
            nodeEl.append('<div class="nodetool " style="display: inherit;width:25px;height:50px;margin-top">' + inserthtml + '</div>');
            node._tool = nodeEl[0].lastChild;
            if(_floatlist.length > 0) {
                for(var i = 0; i < _floatlist.length; i++) {
                    var floatl = _floatlist[i]
                    node._tool[floatl.name] = nodeEl[0].lastChild.children[i]; //firstChild;/
                    node._tool[floatl.name].type = floatl["type"]
                    vmd(node._tool[floatl.name]).bind('click', function(e) {
                        node_add(DataView, e.toElement.type || "")
                        stopPP(e)
                    })
                }
            }
        } else {
            if(!_enableedit)
                return
            var nodeEl = vmd(node.children[2]);
            nodeEl.append('<div class="nodetool " style="display: inherit;width:25px;height:50px"><span class="button edit"  title="编辑" onfocus="this.blur();"></span><span class="button remove"  title="删除"></div>');
            node._tool = nodeEl[0].lastChild;
            node._tool.edit = nodeEl[0].lastChild.firstChild;
            node._tool.del = nodeEl[0].lastChild.lastChild;
            vmd(node._tool.edit).bind('click', function(e) {
                node_edit(DataView, index, node, e)
            });
            vmd(node._tool.del).bind('click', function(e) {
                node_del(DataView, index, node, e)
            });
        }
    })
    this.on("mouseleave", function(DataView, index, node, e) {
        if(node._tool) {
            vmd(node._tool).remove();
        }
    })
}

function hwDataView_click(sender, index, node, e) {
    var selcount = this.getSelectionCount()
    var allcount = this.all.getCount() - 1
    label.setText(allcount + "个项目  已选中" + selcount + "个项目");

    if(node.attributes.ptype && node.attributes.ptype.nodeValue == "add") {
        page.fireEvent("addItem", sender);
    } else {
        page.fireEvent("listclick", sender, index, node, e);
    }
}

function btn_list_click(sender, e) {
    hwDataView.hide();
    MyGrid.show()
    btn_list.addClass("list-list-sel")
    btn_view.removeClass("list-view-sel")
    var selcount = MyGrid.selModel.getCount()
    var allcount = MyGrid.getStore().getCount()
    label.setText(allcount + "个项目  已选中" + selcount + "个项目");
}

function btn_view_click(sender, e) {
    hwDataView.show();
    MyGrid.hide()
    btn_list.removeClass("list-list-sel")
    btn_view.addClass("list-view-sel")
    var selcount = hwDataView.getSelectionCount()
    var allcount = hwDataView.all.getCount() - 1
    label.setText(allcount + "个项目  已选中" + selcount + "个项目");
}

function MyGrid_afterrender(sender) {
    this.on("rowclick", function(sender, index, e) {
        if(index >= 0) {
            var srecord = this.store.getAt(index)
            page.fireEvent("listclick", sender, index, srecord, e);
        }
    })
    if(!_enableadd)
        return;
    var listview = this;
    var nodeEl = vmd(sender.view.scroller.dom)
    nodeEl.append('<div class="nodetool listViewAdd" style="width: 100%-10;height: 30px;margin-top;border: 2px  dashed;"><div class="filename" style="margin-left: 50%;"><span class="ico x-item-file x-add-small " onfocus="this.blur();"></span><span title="新建" class="" style="line-height: 30px;">新建</span></div></div>');
    sender._tool = nodeEl[0].lastChild;
    sender._tool.iico = nodeEl[0].lastChild.firstChild.firstChild;
    sender._tool.itext = nodeEl[0].lastChild.firstChild.lastChild;
    vmd(sender._tool.iico).bind('click', function(e) {
        listAddClick(listview, e)
    });
    vmd(sender._tool.itext).bind('click', function(e) {
        listAddClick(listview, e)
        stopPP(e)
    });

    vmd(sender._tool.iico).on("mouseenter", function(e) {
        listAddClick(listview, e)
    });
    var adddiv = vmd(nodeEl[0].lastChild)
    adddiv.on("mouseenter", function(sender) {
        //sender.target.classList.add("listViewAddover")
        if(sender.target.classList.value.indexOf('listViewAdd') != -1) {
            sender.target.classList.add("listViewAddover")
        } else {
            sender.target.parentNode.classList.add("listViewAddover");
            sender.target.children[0].classList.add("x-add-small-over");
            //sender.target.children[1].classList.add("listViewAddover");
        }

        try {
            sender.target.firstChild.firstChild.classList.add("x-add-small-over")
        } catch (e) {}
    })
    adddiv.on("mouseleave", function(sender) {
        //sender.target.classList.remove("listViewAddover")
        if(sender.target.classList.value.indexOf('listViewAddover') != -1) {
            sender.target.classList.remove("listViewAddover")
        } else {
            if(sender.target.classList.length == 0) {
                sender.target.parentNode.parentNode.classList.remove("listViewAddover");
                sender.target.previousSibling.classList.remove("x-add-small-over");
                sender.target.classList.remove("listViewAddover");
            } else {
                sender.target.parentNode.classList.remove("listViewAddover");
                sender.target.children[0].classList.remove("x-add-small-over");
                sender.target.children[1].classList.remove("listViewAddover");
            }
        }
        try {
            sender.target.firstChild.firstChild.classList.remove("x-add-small-over")
        } catch (e) {}
    })
    adddiv.bind('click', function(e) {
        listAddClick(listview, e)
    });

}

function listAddClick(listview, e) {
    if(!_enableadd)
        return
    if(_floatlist.length <= 0)
        page.fireEvent("addItem", listview);
    else {
        hwMenu.removeAll();
        if(_floatlist.length > 0) {
            for(var i = 0; i < _floatlist.length; i++) {
                var floatl = _floatlist[i]
                var item1 = new Ext.menu.Item({
                    id: floatl.id,
                    text: floatl.name,
                    iconCls: floatl.cls,
                    type: floatl.type
                })
                item1.on("click", function(e) {
                    page.fireEvent('addItem', this.ownerCt.ownerCt.listview, e.type);
                })
                hwMenu.addMenuItem(item1)
            }
        }

        hwMenu.listview = listview
        hwMenu.showAt([e.clientX, e.clientY])
    }
}

function hwMenuItem_click(sender, e) {}


function hwMenuItem1_click(sender, e) {}


function hwDataView_beforerender(sender) {}

function hwMenu_afterrender(sender) {
    sender.removeAll();
    if(_floatlist.length > 0) {
        for(var i = 0; i < _floatlist.length; i++) {
            var floatl = _floatlist[i]
            var item1 = new Ext.menu.Item({
                id: floatl.id,
                text: floatl.name,
                iconCls: floatl.cls,
                type: floatl.type
            })
            item1.on("click", function(e) {
                page.fireEvent('addItem', this.ownerCt.ownerCt.listview, e.type);
            })
            sender.addMenuItem(item1)
        }
    }
}

function MyColumn1_afterrender(sender) {

}
			this.PublicListView_afterrender=PublicListView_afterrender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"div",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:437,
				layout:"anchor",
				region:"center",
				cls:"PublicListView",
				items:[
					{
						xtype:"vmd.dataview",
						id:"hwDataView",
						width:776,
						height:540,
						itemSelector:".file",
						overClass:"hover",
						selectedClass:"select",
						singleSelect:true,
						multiSelect:true,
						autoScroll:true,
						tpl:this.tpl,
						data:this.data,
						cls:"file-continer file-list-icon",
						autoHeight:this.autoheight,
						dblclick:"hwDataView_dblclick",
						anchor:"100% 100%",
						hidden:this.viewHidden,
						contextmenu:"hwDataView_contextmenu",
						afterrender:"hwDataView_afterrender",
						click:"hwDataView_click",
						beforerender:"hwDataView_beforerender",
						listeners:{
							dblclick:hwDataView_dblclick,
							contextmenu:hwDataView_contextmenu,
							vmdafterrender:hwDataView_afterrender,
							click:hwDataView_click,
							beforerender:hwDataView_beforerender
						},
						store:this.store
					},
					{
						xtype:"grid",
						id:"MyGrid",
						title:"Grid Panel",
						loadMask:true,
						beforerender:"MyGrid_beforerender",
						anchor:"100% 100%",
						header:false,
						enableHdMenu:true,
						cls:"file-list-list",
						height:500,
						contextmenu:"MyGrid_contextmenu",
						rowcontextmenu:"MyGrid_rowcontextmenu",
						celldblclick:"MyGrid_celldblclick",
						hidden:this.listHidden,
						disableHeaderClick:true,
						afterrender:"MyGrid_afterrender",
						listeners:{
							beforerender:MyGrid_beforerender,
							rowcontextmenu:MyGrid_rowcontextmenu,
							celldblclick:MyGrid_celldblclick,
							vmdafterrender:MyGrid_afterrender
						},
						columns:[
							{
								xtype:"gridcolumn",
								header:"序号",
								sortable:true,
								resizable:true,
								dataIndex:"xh",
								width:50
							},
							{
								xtype:"templatecolumn",
								header:"名称",
								sortable:true,
								resizable:true,
								dataIndex:"name",
								width:200,
								tpl:"<div class=\"filename\">    <div class=\"ico\">        <i class=\"x-item-file x-{type} small\">        </i>    </div>    <span title=\"{name}\">{name}</span></div>",
								menuDisabled:true,
								afterrender:"MyColumn1_afterrender",
								listeners:{
									vmdafterrender:MyColumn1_afterrender
								}
							},
							{
								xtype:"gridcolumn",
								header:"类型",
								sortable:true,
								resizable:true,
								dataIndex:"type",
								width:100
							},
							{
								xtype:"gridcolumn",
								header:"修改时间",
								sortable:true,
								resizable:true,
								dataIndex:"modifyTime",
								width:150,
								align:"left",
								menuDisabled:true
							},
							{
								xtype:"gridcolumn",
								header:"说明",
								sortable:true,
								resizable:true,
								dataIndex:"sm",
								width:150,
								align:"center",
								menuDisabled:true
							}
						]
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"div1",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:400,
				height:35,
				region:"south",
				layout:"absolute",
				disabled:false,
				hidden:true,
				items:[
					{
						xtype:"label",
						id:"label",
						y:8,
						x:5,
						style:"font-size: 14px"
					},
					{
						xtype:"vmd.div",
						id:"div2",
						layoutConfig:{
							pack:"end"
						},
						autoEl:"div",
						border:false,
						backgroundRepeat:"no-repeat",
						backgroundPosition:"top left",
						height:35,
						x:200,
						layout:"hbox",
						items:[
							{
								xtype:"vmd.button",
								id:"btn_list",
								type:"(none)",
								size:"small",
								width:28,
								height:28,
								cls:"list-list list-list-sel",
								margins:"2 0 0 0",
								click:"btn_list_click",
								listeners:{
									click:btn_list_click
								}
							},
							{
								xtype:"vmd.button",
								id:"btn_view",
								type:"(none)",
								size:"small",
								width:28,
								height:28,
								margins:"2 10 0 0",
								cls:"list-view",
								click:"btn_view_click",
								listeners:{
									click:btn_view_click
								}
							}
						]
					}
				]
			},
			{
				xtype:"vmd.menu",
				id:"hwMenu",
				width:60,
				hidden:true,
				floating:true,
				region:"west",
				style:"font-size: 14px",
				cls:"PublicListView",
				afterrender:"hwMenu_afterrender",
				listeners:{
					vmdafterrender:hwMenu_afterrender
				},
				items:[
					{
						xtype:"menuitem",
						id:"hwMenuItem",
						width:120,
						text:"分类",
						hidden:false,
						click:"hwMenuItem_click",
						listeners:{
							click:hwMenuItem_click
						}
					},
					{
						xtype:"menuitem",
						id:"hwMenuItem1",
						width:120,
						text:"模块",
						hidden:false,
						click:"hwMenuItem1_click",
						listeners:{
							click:hwMenuItem1_click
						}
					}
				]
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.enableView= function(state){
//直接填写方法内容

hwDataView.show();
MyGrid.hide()
	}
		this.enableList= function(){
//直接填写方法内容


hwDataView.hide();
MyGrid.show();

	}
		this.getSelItemData= function(){
//直接填写方法内容

if(!MyGrid.hidden)
{
    var selmod=  MyGrid.getSelectionModel();
    if(selmod && selmod.selections && selmod.selections.items.length>0)
    {
        return selmod.selections.items[0].data;
    }
}
else if(!hwDataView.hidden)
{
  var selrec=  hwDataView.getSelectedRecords();
    if(selrec.length>0)
    {
        return selrec[0].data;
    }
}
	}
		this.removeSelItem= function(){
//直接填写方法内容

var delrecode;
if(!MyGrid.hidden)
{
    var selmod=  MyGrid.getSelectionModel();
    if(selmod && selmod.selections && selmod.selections.items.length>0)
    {
        delrecode= selmod.selections.items[0];
    }
}
else if(!hwDataView.hidden)
{
  var selrec=  hwDataView.getSelectedRecords();
    if(selrec.length>0)
    {
        delrecode= selrec[0];
    }
}

hwDataView.store.remove(delrecode)
	}
		this.setItemsSel= function(selIds){
//直接填写方法内容
//先获取对应ID所在的index
var id = ""
 if(!MyGrid.hidden) {
            MyGrid.selModel.clearSelections();//(i, true);
        } else if(!hwDataView.hidden) {
            hwDataView.clearSelections();//(i, i, true);
        }
for(var i = 0; i < hwDataView.store.data.items.length; i++) {
    if(selIds.indexOf(hwDataView.store.data.items[i].id) >= 0) {
        if(!MyGrid.hidden) {
            MyGrid.selModel.selectRow(i, true);
        } else if(!hwDataView.hidden) {
            hwDataView.selectRange(i, i, true);
        }
    }
}
	}
		this.getSelItemsData= function(){
//直接填写方法内容

if(!MyGrid.hidden)
{
    var selmod=  MyGrid.getSelectionModel();
    if(selmod && selmod.selections && selmod.selections.items.length>0)
    {
        return selmod.selections.items;
    }
}
else if(!hwDataView.hidden)
{
  var selrec=  hwDataView.getSelectedRecords();
    if(selrec.length>0)
    {
        return selrec;
    }
}
	}
		this.hideStatusBar= function(hidden){
//直接填写方法内容
if(hidden) {
    div1.hide()
    div.doLayout()
} else {
    div1.show();
    div.doLayout()

}
	}
		this.enableAdd= function(enable,floatlist){
//直接填写方法内容
_enableAdd(enable,floatlist)
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.PublicListView");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.PublicListView");
	}
})