Ext.define('vmd.base.UxPropertySettings', {
    extend: 'vmd.base.Ux',
    xtype: 'vmd.uxpropertysettings',
    version: '2.0.6',
    /**
    *@desc 值发生变化接口，需要继承重写
    *@param {Ext.Component} sender-当前组件对象
    *@param {string|number|object} newValue-新值
    *@param {string|number|object} oldValue-老值
    */
    onValueChange: function (sender,newValue,oldValue) {
        //需继承重写
       
    },
    /**
    *@desc 值变化的事件监听,可以重写
   */
    addValueChangeListener: function () {
        var me = this;

        if (!this._valueChangeEventStatus) {

            this.on('componentchanged', function () {
                xds.fireEvent('componentchanged');
            })

            this.cascade(function (cmp) {
            
                cmp.on('change', function (sender, newValue, oldValue) {
                    me.onValueChange(sender, newValue, oldValue)
                })
                cmp.on("check", function (sender, newValue, oldValue) {
                    me.onValueChange(sender, newValue, oldValue)
                })
                cmp.on("select", function (sender, newValue, oldValue) {
                    me.onValueChange(sender, newValue, oldValue)
                })
            
            })
        }
        this._valueChangeEventStatus = true;
    },
    /**
    *@desc 组件初始化接口，可以继承重写
    *@param {xds.Component} dcmp-设计时组件
    */
    onInitComponent: function (dcmp) {
        //需继承重写,组件已加载完成 
        this.addValueChangeListener();

        this.onInit && this.onInit(dcmp);
        
    },
   /**
   *@desc 组件属性序列化储存
   *@param {string} key-属性名称
   *@param {string?object} value-属性值
   */
    setConfig: function (key,value) {
        this.dcmp&&this.dcmp.setConfig(key, value);
    },
   /**
   *@desc 得到设计式组件属性的值
   *@param {string} key-属性名称
   *@return {string} 属性对应的值
   */
    getConfig: function (key) {
        if (!this.dcmp) return;
        var returnValue = "";
        if (key) {
            returnValue = this.dcmp.getConfigValue(key);
        } else returnValue = this.dcmp.getConfig();

        return returnValue;
    },
   /**
   *@desc 返回设计式的数据集集合
   *@return {array} 返回的数据集
   */
    getStoreNames: function () {
        return xds.vmd.getStoreNames();
    },
    /**
   *@desc 根据数据集名称返回数据集字段集合
   *@param {string} name-数据集名称
   *@return {array} 对应数据集的字段
   */
    getStoreFieldsByName: function (name) {

        return xds.vmd.getStoreFieldNames(name)
    },
    /**
      *@desc 根据组件类名获取xtype类型
      *@param {string} className-组件类名
      *@return {string} 组件类名对应的xtype类型
      */
    getXtype: function (className) {
        if (className && className.indexOf('vmd.ux.') == 0) return className;
        return 'vmd.ux.' + className;
    },
    /**
     *@desc 根据组件属性Name得到组件
     *@param {string} name-属性Name
     *@return {component} 返回组件对象
     */
    getCmpByName: function (name) {
        var item;

        for (var key in this.items.map) {
            
            var _item = this.items.map[key];
            if (_item.Name == name) {
                item = _item;
                break;
            }
        }

        return item;
        
    }

    

})
