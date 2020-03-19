Vmd.define('hwchart.component.Frame', {
    requires: ['hwchart.component.Geo',
        'hwchart.component.helper.MapDraw',
        'hwchart.component.helper.FrameDraw',
        'hwchart.component.MapInfo'
    ]


}, function () {

    // Model
    var FrameModel = hwcharts.extendComponentModel({

        type: 'frame',

        layoutMode: { type: 'box', ignoreSize: true },

        defaultOption: {
            // 一级层叠
            geoIndex: 0,
            // 二级层叠
            z: 6,
            show: true,

        }
    });

    function findView(viewid,api) {
        var chart = api.getChart();
        var views = chart._componentsViews;
        for (var i = 0; i < views.length; i++) {
            var item = views[i];
            if (item.__id == viewid) {
                return item;
                break;
            }
        }
        return null;

    }
    function zoom(name,viewid, api, frameInfo) {
       
        var view = findView(viewid, api);
        mapZoom[name]&&mapZoom[name](view, frameInfo);
    }
    var mapZoom = {

        mapInfo: function (view, frameInfo) {
            
            //if (view) {
            //    var frame = frameInfo.frame;
            //    var _boudingRect = frame.getBoundingRect();
            //    var xyPix = frame.dataToPoint([_boudingRect.x, _boudingRect.y]);

            //    var xyPix2 = frame.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y]);

            //    var hw = xyPix2[0] - xyPix[0];

            //    var rect = view.group.getBoundingRect();

            //    //居中位置显示
            //    view.group.position[0] = xyPix[0] + (hw / 2 - rect.width / 2);

            //    view.group.position[1] = xyPix[1] + 20;
            //    // this.group.attr('position', [this.group.position[0], this.group.position[1]]);
            //    view.group.dirty()
            //}
        },
        graphic: function (view, frameInfo) {
            //var frame = frameInfo.frame;
            //var _boudingRect = frame.getBoundingRect();
            
            //var xyPix2 = frame.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);

            ////居中位置显示
            //view.group.position[0] = xyPix2[0] - 70;

            //view.group.position[1] = xyPix2[1] - 10;
            //// this.group.attr('position', [this.group.position[0], this.group.position[1]]);
            //view.group.dirty()
        },
        title: function (view, frameInfo) {
            
            //var frame = frameInfo.frame;

            ////var scale = frameInfo.zoom ? frameInfo.zoom : 1;
            //// textElFontSize = titleModel.get('textStyle').fontSize;

            ////titleModel.option.textStyle.fontSize *= scale;
            ////// textElFontSize *= scale;
            ////textEl.setStyle({
            ////    fontSize: titleModel.option.textStyle.fontSize
            ////})


            //var _boudingRect = frame.getBoundingRect();
            //var xyPix = frame.dataToPoint([_boudingRect.x, _boudingRect.y + _boudingRect.height]);

            //var xyPix2 = frame.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);

            //var hw = xyPix2[0] - xyPix[0];

            //var textRect = view.group.getBoundingRect();
            ////居中位置显示,未考虑top、padding等情况
            //view.group.position[0] = xyPix[0] + (hw / 2 - textRect.width / 2);
            //view.group.position[1] = xyPix[1] - textRect.height * frame._zoom;

            ////view.group.attr('position', [view.group.position[0], view.group.position[1]]);
            
            //view.group.dirty();
        },
        scale: function (view, frameInfo) {

            //var frame = frameInfo.frame;

            //var scale = frameInfo.zoom ? frameInfo.zoom : 1;
            //// textElFontSize = titleModel.get('textStyle').fontSize;

            ////titleModel.option.textStyle.fontSize *= scale;
            ////// textElFontSize *= scale;
            ////textEl.setStyle({
            ////    fontSize: titleModel.option.textStyle.fontSize
            ////})


            //var _boudingRect = frame.getBoundingRect();
            //var xyPix = frame.dataToPoint([_boudingRect.x, _boudingRect.y + _boudingRect.height]);

            //var xyPix2 = frame.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y + _boudingRect.height]);

            //var hw = xyPix2[0] - xyPix[0];

            //var textRect = view.group.getBoundingRect();
            ////居中位置显示,未考虑top、padding等情况
            //view.group.position[0] = xyPix[0];
            //view.group.position[1] = xyPix[1];

            ////view.group.attr('position', [view.group.position[0], view.group.position[1]]);

            //view.group.dirty();
        },
        legend: function (view, frameInfo) {
            
            //var frame = frameInfo.frame;
            //var _boudingRect = frame.getBoundingRect();
            //var xyPix = frame.dataToPoint([_boudingRect.x + _boudingRect.width, _boudingRect.y]);

            //var grect = view.group.getBoundingRect();

            //view.group.position[0] = xyPix[0] - grect.width;
            //view.group.position[1] = xyPix[1] - grect.height;
            //view.group.dirty()
        }
    }
    

    // View
    var FrameView = hwcharts.extendComponentView({
        type: 'frame',
        init: function (ecModel, api) {
            
            api.on('frameRoam', function (frameInfo) {

                ecModel.eachComponent(function (name, component) {

                    var viewid = component.__viewId;
                    zoom(name, viewid, api, frameInfo);


                })

            })
           
        },
        render: function (FrameModel, ecModel, api) {
            this.group.removeAll();
            var geoview = ecModel.getComponent('geo').coordinateSystem;
            api.on('geoRoam', function (params) {
                api.dispatchAction({
                    type: 'frameRoam',
                    frame: geoview,
                    zoom: params.zoom
                })

            })

            if (!FrameModel.get('show')) {
                return;
            }

            ////默认触发同步
            //api.dispatchAction({
            //    type: 'frameRoam',
            //    frame: geoview
            //})
        }
    });

    hwchart.component.Frame = FrameView;

    hwcharts.registerAction({
        type: 'frameRoam',
        event: 'frameRoam',
        update: 'updateLayout'
    }, zrender.util.noop)


    var MapDraw = hwchart.component.helper.MapDraw;
    //重新geo的实现
    
    var GeoView = hwchart.component.geo.GeoView;
    //重写geo的实现
    var oldrender = GeoView.prototype.render
    GeoView.prototype.render = function (geoModel, ecModel, api, payload) {
       
        oldrender.call(this, geoModel, ecModel, api, payload);
        
    }
  
    MapDraw.prototype.draw = hwchart.component.helper.FrameDraw.prototype.draw

})