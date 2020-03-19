Vmd.define('hwchart.component.toolbox.ToolboxModel', {
    requires: ['hwchart.component.toolbox.featureManager']
}, function () {
   
    var zrUtil = zrender.util;

    var featureManager = hwchart.component.toolbox.featureManager;

   
    var ToolboxModel = hwcharts.extendComponentModel({
        type: 'toolbox',
        layoutMode: {
            type: 'box',
            ignoreSize: true
        },
        optionUpdated: function () {
            ToolboxModel.superApply(this, 'optionUpdated', arguments);
            zrUtil.each(this.option.feature, function (featureOpt, featureName) {
                var Feature = featureManager.get(featureName);
                Feature && zrUtil.merge(featureOpt, Feature.defaultOption);
            });
        },
        defaultOption: {
            show: true,
            z: 6,
            zlevel: 0,
            orient: 'horizontal',
            left: 'right',
            top: 'top',
            // right
            // bottom
            backgroundColor: 'transparent',
            borderColor: '#ccc',
            borderRadius: 0,
            borderWidth: 0,
            padding: 5,
            itemSize: 15,
            itemGap: 8,
            showTitle: true,
            iconStyle: {
                borderColor: '#666',
                color: 'none'
            },
            emphasis: {
                iconStyle: {
                    borderColor: '#3E98C5'
                }
            },
            // textStyle: {},
            // feature
            tooltip: {
                show: false
            }
        }
    });
   

    hwchart.component.toolbox.ToolboxModel = ToolboxModel;
})