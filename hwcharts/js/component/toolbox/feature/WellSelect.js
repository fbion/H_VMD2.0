Vmd.define('hwchart.component.toolbox.feature.WellSelect', {
    requires: [
        'hwchart.component.toolbox.featureManager'
    ]
}, function () {
    var env = zrender.env;

    function WellSelect(model) {
        this.model = model;
    }

    WellSelect.defaultOption = {
        show: true,
        //icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
        icon:{
            single: 'M835.2-128H192C86.4-128 1.6-43.2 1.6 60.8V704C1.6 809.6 86.4 894.4 192 894.4h643.2C939.2 894.4 1024 809.6 1024 704v-643.2C1024-43.2 939.2-128 835.2-128zM192 830.4c-68.8 0-126.4-56-126.4-126.4v-643.2c0-68.8 56-126.4 126.4-126.4h643.2c68.8 0 126.4 56 126.4 126.4V704c0 68.8-56 126.4-126.4 126.4H192zM606.4 192H417.6c-52.8 0-97.6 43.2-97.6 97.6V478.4c0 52.8 43.2 97.6 97.6 97.6h188.8c52.8 0 97.6-43.2 97.6-97.6v-188.8c0-54.4-43.2-97.6-97.6-97.6z',
            all: 'M99.6 561.7h236.1V797.8H99.6v-236.1z m295.2 0h236.1V797.8H394.8v-236.1zM689.9 797.8v-236.1H926V797.8H689.9zM99.6 266.6h236.1V502.7H99.6v-236.1z m295.2 0h236.1V502.7H394.8v-236.1z m295.1 0H926V502.7H689.9v-236.1zM99.6-28.5h236.1V207.60000000000002H99.6v-236.1z m295.2 0h236.1V207.60000000000002H394.8v-236.1z m295.1 0H926V207.60000000000002H689.9v-236.1z'
        },
       // title: '保存为图片',
        title:{
            single: '显示选中井',
            all: '显示所有井'
        }
      
    };


    var proto = WellSelect.prototype;

    proto.onclick = function (ecModel, api) {
        alert('1')
        return;
        var model = this.model;
        var title = model.get('name') || ecModel.get('title.0.text') || 'hwcharts';
       
    };

    hwchart.component.toolbox.featureManager.register(
        'wellSelect', WellSelect
    );

    hwchart.component.toolbox.feature.WellSelect = WellSelect;
})