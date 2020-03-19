Ext.define("vmd.ux.AlignProperty" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps(["vmd.ux.ButtonGroup$1.0$ButtonGroup"]),
	version:"1.0",
	xtype:"vmd.ux.AlignProperty",
	title:"Panel",
	header:false,
	border:false,
	width:290,
	height:621,
	layout:"absolute",
	afterrender:"AlignProperty_afterrender",
	listeners:{
		vmdafterrender:function(){
	this.AlignProperty_afterrender(this)
}
	},
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
			var page = this;

function AlignGroup_click(sender, selectIndex) {
    //alert(selectIndex.VAlign.value+";"+selectIndex.HAlign.value)
    // 
    setCellInfo(AlignGroup, selectIndex);
    // var cell = page.CellInfo && page.CellInfo.grid.editor;
    // var cell = page.CellInfo;
    // if(cell) {
    //     if(cell.cell) {
    //         cell.cell.style.textAlign = selectIndex.HAlign.value;
    //         cell.cell.style.verticalAlign = selectIndex.VAlign.value;
    //     }
    // }
    if(page.CellInfo && page.CellInfo.type == "TD") {
        var cell = page.CellInfo.cells;
        if(cell) {
            if(cell.cell) {
                cell.cell.style.textAlign = selectIndex.HAlign.value;
                cell.cell.style.verticalAlign = selectIndex.VAlign.value;
            }
        }
    } else if(page.CellInfo && page.CellInfo.type == "DIV") {
        var cells = page.CellInfo.cells;
        if(cells && cells.length > 0) {
            for(var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if(cell) {
                    if(cell.cell) {
                        cell.cell.style.textAlign = selectIndex.HAlign.value;
                        cell.cell.style.verticalAlign = selectIndex.VAlign.value;
                    }
                }
            }
        }
    } else {
        if(page.CellInfo && page.CellInfo.cell) {
            page.CellInfo.cell.style.textAlign = selectIndex.HAlign.value;
            page.CellInfo.cell.style.verticalAlign = selectIndex.VAlign.value;
        }
    }
}

function button_click(sender, e) {
    var obj = {
        VAlign: {
            value: "bottom"
        },
        HAlign: {
            value: "center"
        }
    }


    AlignGroup.setValue(obj);

    var o = AlignGroup.getValue();
    alert(o.VAlign.value + ";" + o.HAlign.value)
}


function setCellInfo(sender, value) {
    // var cell = page.CellInfo && page.CellInfo.grid.editor;
    // var cell = page.CellInfo
    // if(cell) {
    //     if(cell.cell && cell.cell.cellAttributeInfo) {
    //         cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
    //     }
    // }
    if(page.CellInfo && page.CellInfo.type == "TD") {
        var cell = page.CellInfo.cells;
        if(cell) {
            if(cell.cell && cell.cell.cellAttributeInfo) {
                cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
            }
        }
    } else if(page.CellInfo && page.CellInfo.type == "DIV") {
        var cells = page.CellInfo.cells;
        if(cells && cells.length > 0) {
            for(var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if(cell) {
                    if(cell.cell && cell.cell.cellAttributeInfo) {
                        cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
                    }
                }
            }
        }
    } else {
        if(page.CellInfo && page.CellInfo.cell) {
            if(page.CellInfo.cell.cellAttributeInfo) {
                page.CellInfo.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, value);
            }
        }
    }
}

function setInfo(info, selectCell) {
    //
    page.CellInfo = selectCell;
    if(info) {
        //  
        AlignGroup.setValue(info.align.value);
        textControl.setSelectIndex(info.textControl.value);
        escapeLabel.setSelectIndex(info.escapeLabel.value);
        textDirection.setSelectIndex(info.textDirection.value);
        rotation.setValue(info.rotation.value);
        singleRotation.setValue(info.singleRotation.value);
        cellMerge.setSelectIndex(info.cellMerge.value);
        topPadding.setValue(info.topPadding.value);
        bottomPadding.setValue(info.bottomPadding.value);
        leftPadding.setValue(info.leftPadding.value);
        rightPadding.setValue(info.rightPadding.value);
        verticalSpace.setValue(info.verticalSpace.value);
    }
}



function AlignProperty_afterrender(sender) {

}

function textControl_click(sender, selectedIndex) {
    // 
    setCellInfo(textControl, selectedIndex);
}

function escapeLabel_click(sender, selectedIndex) {
    setCellInfo(escapeLabel, selectedIndex);
}

function textDirection_click(sender, selectedIndex) {
    setCellInfo(textDirection, selectedIndex);
}

function cellMerge_click(sender, selectedIndex) {
    // setCellInfo(cellMerge, selectedIndex);
    var grid = page.CellInfo.grid;
    if(page.CellInfo && page.CellInfo.type == "DIV") {
        var cells = page.CellInfo.cells;
        cells = [];
        var selblock = grid.getSelectedBlock();
        //grid.setRowspan(grid.getRowId(selblock.LeftTopRow), selblock.LeftTopCol, 1)
        for(var r = selblock.LeftTopRow; r <= selblock.RightBottomRow; r++) {
            for(var rr = selblock.LeftTopCol; rr <= selblock.RightBottomCol; rr++) {
                var cl = grid.cells2(r, rr);
                cells.push(cl);
            }
        }


        var rowspan = page.CellInfo.rowspan || 1;
        var colspan = page.CellInfo.colspan || 1;
        var index = 1;
        
        if(cells && cells.length > 0) {
            //先将单元格拆分

            for(var i = 0; i < cells.length; i++) {
                var cell = cells[i];
                if(cell.cell.parentNode && cell.cell.parentNode.idd) {
                    if(cell.cell.rowSpan > 1 && cell.cell.colSpan > 1) {
                        grid.setColRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1, cell.cell.rowSpan)
                    } else if(cell.cell.rowSpan > 1) {
                        grid.setRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1)

                    } else if(cell.cell.colSpan > 1) {
                        grid.setColspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1)
                    }
                }
            }
            if(selectedIndex == 4) {
                // allrowfirstcells = [];
                // for(var r = selblock.LeftTopRow; r <= selblock.RightBottomRow; r++) {
                //     for(var rr = selblock.LeftTopCol; rr <= selblock.RightBottomCol; rr++) {
                //         var cl = grid.cells2(r, rr);
                //         allrowfirstcells.push(cl);
                //     }
                //     
                // }
                // for(var jj = 0; jj < allrowfirstcells.length; jj++) {
                //     grid.setColspan(allrowfirstcells[jj].cell.parentNode.idd, allrowfirstcells[jj].cell._cellIndex, 1)
                //     grid.setRowspan(allrowfirstcells[jj].cell.parentNode.idd, allrowfirstcells[jj].cell._cellIndex, 1)
                // }
                return;
            }
            var rowfirstcells = [];
            if(rowspan > 1 && colspan > 1) {
                var selblock = grid.getSelectedBlock();
                for(var r = selblock.LeftTopRow; r <= selblock.RightBottomRow; r++) {
                    var cl = grid.cells2(r, selblock.LeftTopCol);
                    rowfirstcells.push(cl);
                    
                }
            } else
                rowfirstcells.push(cells[0])

            for(var jj = 0; jj < rowfirstcells.length; jj++)
                grid.setColspan(rowfirstcells[jj].cell.parentNode.idd, rowfirstcells[jj].cell._cellIndex, colspan)

            if(selectedIndex != 2)
                grid.setRowspan(rowfirstcells[0].cell.parentNode.idd, rowfirstcells[0].cell._cellIndex, rowspan)
        }

        // for(var i = 0; i < cells.length; i++) {
        //     var cell = cells[i];
        //     if(i == 0) {
        //         index = cell.cell.cellIndex;
        //     }
        //     //colspan+= cell.cell.colSpan;
        //     if(selectedIndex == 2) {
        //         if(cell.cell.cellIndex == index) {
        //             setMergeInfo(i, rowspan, colspan, grid, cell, selectedIndex, sender);
        //             //index = cell.cell.cellIndex + colspan;
        //         }
        //     } else {
        //         setMergeInfo(i, rowspan, colspan, grid, cell, selectedIndex, sender);
        //     }
        // }

    } else {
        if(page.CellInfo && page.CellInfo.cell) {
            setMergeInfo(0, page.CellInfo.cell.rowSpan, page.CellInfo.cell.colSpan, grid, page.CellInfo, selectedIndex, sender);
        }
    }
}




// 设置合并单元格信息
function setMergeInfo(i, rowspan, colspan, grid, cell, selectedIndex, sender) {
    if(i == 0) {
        if(cell.cell) {
            if(selectedIndex == 1 || selectedIndex == 3) {
                if(colspan > 1) {
                    // if(grid) {
                    //cell.cell.colSpan = colspan;
                    grid.setColspan(cell.cell.parentNode.idd, cell.cell._cellIndex, colspan)
                    // }
                }
                if(rowspan > 1) {
                    // if(grid) {
                    //cell.cell.rowSpan = rowspan;
                    grid.setRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, rowspan)
                    //  }
                }
            } else if(selectedIndex == 2) {
                if(colspan > 1) {
                    // if(grid) {
                    //cell.cell.colSpan = colspan;
                    grid.setColspan(cell.cell.parentNode.idd, cell.cell._cellIndex, colspan)
                    // }
                }
            } else if(selectedIndex == 4) {
                if(colspan > 1 && rowspan > 1) {
                    grid.setColRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1, rowspan);
                    grid.setRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1);
                } else if(colspan > 1) {
                    //  if(grid) {
                    //cell.cell.colSpan = 1;
                    grid.setColspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1)
                    // }
                } else if(rowspan > 1) {
                    // if(grid) {
                    //cell.cell.rowSpan = 1;
                    grid.setRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1)
                    // }
                }
            }
            if(cell.cell && cell.cell.cellAttributeInfo) {
                cell.cell.cellAttributeInfo.setCellInfos(sender.initialConfig.id, selectedIndex);
                cell.cell.cellAttributeInfo.colspan = colspan;
                cell.cell.cellAttributeInfo.rowspan = rowspan;
            }
        }
    } else {
        if(selectedIndex == 2) {
            if(colspan > 1) {
                // if(grid) {
                //cell.cell.colSpan = colspan;
                grid.setColspan(cell.cell.parentNode.idd, cell.cell._cellIndex, colspan)
                // }
            }
        } else if(selectedIndex == 4) {
            if(colspan > 1 && rowspan > 1) {
                grid.setColRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1, rowspan);
                grid.setRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1);
            } else if(colspan > 1) {
                // if(grid) {
                //cell.cell.colSpan = 1;
                grid.setColspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1)
                //  }
            } else if(rowspan > 1) {
                // if(grid) {
                //cell.cell.rowSpan = 1;
                grid.setRowspan(cell.cell.parentNode.idd, cell.cell._cellIndex, 1)
                // }
            }
        }
    }
}
			this.AlignProperty_afterrender=AlignProperty_afterrender;
		this.items=[
			{
				xtype:"label",
				id:"label3",
				text:"文本控制",
				x:10,
				y:10
			},
			{
				xtype:"vmd.ux.ButtonGroup",
				id:"textControl",
				layout:"anchor",
				x:5,
				y:30,
				count:"3",
				text:"自动换行,宽度自适应,缩小字体填充",
				width:280,
				height:30,
				selectIndex:"0",
				click:"textControl_click",
				listeners:{
					click:textControl_click
				}
			},
			{
				xtype:"vmd.ux.ButtonGroup",
				id:"escapeLabel",
				layout:"anchor",
				x:5,
				y:65,
				count:"1",
				text:"转义标签",
				selectIndex:"0",
				height:30,
				click:"escapeLabel_click",
				listeners:{
					click:escapeLabel_click
				}
			},
			{
				xtype:"label",
				id:"label4",
				text:"文本方向",
				x:10,
				y:105
			},
			{
				xtype:"label",
				id:"label5",
				text:"方向：",
				x:20,
				y:130,
				height:20
			},
			{
				xtype:"vmd.ux.ButtonGroup",
				id:"textDirection",
				layout:"anchor",
				x:60,
				y:125,
				width:170,
				count:"2",
				text:"水平,垂直",
				height:30,
				click:"textDirection_click",
				listeners:{
					click:textDirection_click
				}
			},
			{
				xtype:"label",
				id:"label1",
				text:"旋转（度）：",
				x:10,
				y:165
			},
			{
				xtype:"numberfield",
				id:"rotation",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:85,
				y:160,
				grow:false,
				msgTarget:"qtip",
				readOnly:false,
				emptyText:"0",
				width:100
			},
			{
				xtype:"checkbox",
				id:"singleRotation",
				fieldLabel:"Checkbox",
				boxLabel:"单字旋转",
				x:195,
				y:160
			},
			{
				xtype:"label",
				id:"label6",
				text:"内部边距",
				x:10,
				y:190
			},
			{
				xtype:"label",
				id:"label7",
				text:"上：",
				x:35,
				y:220
			},
			{
				xtype:"numberfield",
				id:"topPadding",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:60,
				y:220,
				width:60,
				emptyText:"2"
			},
			{
				xtype:"label",
				id:"label8",
				text:"下：",
				x:145,
				y:220
			},
			{
				xtype:"numberfield",
				id:"bottomPadding",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:170,
				y:220,
				width:60,
				emptyText:"2"
			},
			{
				xtype:"label",
				id:"label9",
				text:"左：",
				x:35,
				y:250
			},
			{
				xtype:"numberfield",
				id:"leftPadding",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:60,
				y:250,
				width:60,
				emptyText:"2"
			},
			{
				xtype:"label",
				id:"label10",
				text:"右：",
				x:145,
				y:250
			},
			{
				xtype:"numberfield",
				id:"rightPadding",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:170,
				y:250,
				width:60,
				emptyText:"2"
			},
			{
				xtype:"label",
				id:"label11",
				text:"行间距",
				x:10,
				y:280
			},
			{
				xtype:"label",
				id:"label12",
				text:"行间距：",
				x:35,
				y:310
			},
			{
				xtype:"numberfield",
				id:"verticalSpace",
				allowDecimals:true,
				allowNegative:true,
				decimalPrecision:2,
				allowBlank:true,
				x:85,
				y:305,
				emptyText:"1",
				width:100
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.setAlignInfo= function(info,cell){
//直接填写方法内容
setInfo(info,cell);
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.AlignProperty");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.AlignProperty");
	}
})