Vmd.define('hwchart.component.toolbox.feature.Fullscreen', {
    requires: [
        'hwchart.component.toolbox.featureManager'
    ]
}, function () {

    function Fullscreen(model) {
        this.model = model;
    }

    Fullscreen.defaultOption = {
        show: true,
        icon: 'M674.88 504.96l257.664 256.768-0.896-145.472c-0.32-12.096 9.408-22.72 21.504-22.4h15.36c12.16 0.384 22.208 7.488 22.4 19.712l0.704 216.704 0.384 11.52c0.192 6.016-1.28 11.52-5.12 15.424a20.736 20.736 0 0 1-15.488 6.208l-11.008-0.192c-0.192 0-0.32 0-0.512-0.128l-214.912 0.832a23.104 23.104 0 0 1-22.336-22.528v-15.36a24.512 24.512 0 0 1 25.216-22.4l141.568-0.384-256.896-255.872a29.952 29.952 0 1 1 42.368-42.368zM350.144 263.04l-257.792-256 0.896 144.768a21.504 21.504 0 0 1-21.504 22.4h-16.32c-12.032-0.384-22.144-7.488-22.4-19.712l-0.64-216.832-0.384-11.52c-0.192-6.08 1.28-11.52 5.12-15.488 3.968-3.84 9.28-6.4 15.488-6.208l11.008 0.192c0.128 0 0.32 0 0.512 0.192l215.808-0.896a23.104 23.104 0 0 1 22.336 22.528v15.424a24.512 24.512 0 0 1-25.216 22.4l-141.568 0.32L392.192 220.48a30.016 30.016 0 0 1 0 42.432 29.248 29.248 0 0 1-42.048 0z m641.472-325.248l-0.512 216.832c-0.384 12.032-10.304 19.328-22.4 19.712h-15.36c-12.16 0.32-21.696-10.304-21.504-22.4l0.896-145.472L674.88 263.04a30.016 30.016 0 1 1-42.368-42.432l256.704-255.872-141.568-0.32a24.768 24.768 0 0 1-25.216-22.4v-15.36c0.384-12.16 10.304-22.208 22.4-22.592l214.848 0.896c0.192 0 0.384-0.192 0.512-0.192l11.008-0.192a20.352 20.352 0 0 1 15.488 6.208c3.84 3.904 5.312 9.408 5.12 15.488l-0.192 11.52zM135.68 803.2l141.632 0.384a24.768 24.768 0 0 1 25.216 22.4v15.36A23.36 23.36 0 0 1 280.064 864l-215.936-0.896-0.512 0.128-11.008 0.192a20.352 20.352 0 0 1-15.488-6.208c-3.84-3.84-5.312-9.408-5.12-15.424l0.32-11.52 0.512-216.832c0.192-12.096 10.304-19.392 22.4-19.712h16.32c12.032-0.384 21.632 10.24 21.44 22.4l-0.704 144.768 257.664-256.064a29.952 29.952 0 1 1 42.368 42.432l-256.768 256z',

        title: '全屏',
        max:false

    };

    // 全屏
    function fullscreen() {
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }

    // 退出全屏
    function exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    var proto = Fullscreen.prototype;

    proto.onclick = function (ecModel, api) {
        var model = this.model;
        var max = model.get('max');
        this.state = !this.state;
        this.state ? fullscreen() : exitFullscreen();
       

    };

    hwchart.component.toolbox.featureManager.register(
        'fullscreen', Fullscreen
    );

    hwchart.component.toolbox.feature.Fullscreen = Fullscreen;
})