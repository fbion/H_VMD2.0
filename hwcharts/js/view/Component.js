Vmd.define('hwchart.view.Component', {
    requires: [
        'hwchart.util.component',
        'hwchart.util.clazz'
    ]


}, function () {



    var Group = zrender.Group;

    var componentUtil = hwchart.util.component;

    var clazzUtil = hwchart.util.clazz;

    
    var Component = function () {
        /**
         * @type {module:zrender/container/Group}
         * @readOnly
         */
        this.group = new Group();
        /**
         * @type {string}
         * @readOnly
         */

        this.uid = componentUtil.getUID('viewComponent');
    };

    Component.prototype = {
        constructor: Component,
        init: function (ecModel, api) { },
        render: function (componentModel, ecModel, api, payload) { },
        dispose: function () { },

        /**
         * @param {string} eventType
         * @param {Object} query
         * @param {module:zrender/Element} targetEl
         * @param {Object} packedEvent
         * @return {boolen} Pass only when return `true`.
         */
        filterForExposedEvent: null
    };
    var componentProto = Component.prototype;

    componentProto.updateView = componentProto.updateLayout = componentProto.updateVisual = function (seriesModel, ecModel, api, payload) {// Do nothing;
    }; // Enable Component.extend.


    clazzUtil.enableClassExtend(Component); // Enable capability of registerClass, getClass, hasClass, registerSubTypeDefaulter and so on.

    clazzUtil.enableClassManagement(Component, {
        registerWhenExtend: true
    });
   
    hwchart.view.Component = Component;
})