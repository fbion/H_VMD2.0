﻿Vmd.define('hwchart.component.visualMap.preprocessor', {
    
},function(){
    var zrUtil = zrender.util;
    var each = zrUtil.each;


    function _default(option) {
        var visualMap = option && option.visualMap;

        if (!zrUtil.isArray(visualMap)) {
            visualMap = visualMap ? [visualMap] : [];
        }

        each(visualMap, function (opt) {
            if (!opt) {
                return;
            } // rename splitList to pieces


            if (has(opt, 'splitList') && !has(opt, 'pieces')) {
                opt.pieces = opt.splitList;
                delete opt.splitList;
            }

            var pieces = opt.pieces;

            if (pieces && zrUtil.isArray(pieces)) {
                each(pieces, function (piece) {
                    if (zrUtil.isObject(piece)) {
                        if (has(piece, 'start') && !has(piece, 'min')) {
                            piece.min = piece.start;
                        }

                        if (has(piece, 'end') && !has(piece, 'max')) {
                            piece.max = piece.end;
                        }
                    }
                });
            }
        });
    }

    function has(obj, name) {
        return obj && obj.hasOwnProperty && obj.hasOwnProperty(name);
    }

    hwchart.component.visualMap.preprocessor = _default;
})