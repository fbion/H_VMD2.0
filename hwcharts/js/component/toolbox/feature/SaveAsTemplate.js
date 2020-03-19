Vmd.define('hwchart.component.toolbox.feature.SaveAsTemplate', {
    requires: [
        'hwchart.component.toolbox.featureManager'
    ]
}, function () {
    var env = zrender.env;
    var zUtil = zrender.util;
    function SaveAsTemplate(model) {
        this.model = model;
    }

    SaveAsTemplate.defaultOption = {
        show: true,
        icon: 'M391.869261 773.877043l-152.40467-149.914397L143.638911 879.564202l248.23035-105.687159z m489.089494-479.228016L723.673152 132.48249 267.754086 582.225681l163.461478 169.537743 449.743191-457.114397z m129.593774-123.915953c21.316732-24.006226 0-70.12607 0-70.12607s-41.637354-46.119844-89.550194-81.083269c-47.91284-34.963424-84.868482 0-84.868483 0L755.050584 100.607004l164.656809 164.059144c0.099611 0 69.428794-69.926848 90.845136-93.933074z M859.143969 1024h-694.287938C73.911284 1024 0 950.088716 0 859.143969v-694.287938C0 73.911284 73.911284 0 164.856031 0h495.165759v69.727626H164.856031C112.361089 69.727626 69.727626 112.361089 69.727626 164.856031v694.387549c0 52.395331 42.633463 95.128405 95.128405 95.128404h694.387549c52.395331 0 95.128405-42.633463 95.128404-95.128404V364.077821h69.727627v495.165759c-0.099611 90.845136-74.010895 164.75642-164.955642 164.75642z M850.677043 493.571984v196.333074c0 90.845136-73.911284 164.856031-164.856031 164.856031h-196.233463v-69.727626h196.333074c52.395331 0 95.128405-42.633463 95.128404-95.128405V493.571984 M204.202335 208.18677m-34.863814 0a34.863813 34.863813 0 1 0 69.727627 0 34.863813 34.863813 0 1 0-69.727627 0Z M204.202335 307.797665v199.22179-199.22179m34.863813-34.863813h-69.727627v268.949416h69.727627V272.933852z',
        title: '保存为模板',
        // Default use option.backgroundColor
        // backgroundColor: '#fff',
        name: '',
        excludeComponents: ['toolbox']
        
    };

    SaveAsTemplate.prototype.unusable = !env.canvasSupported;

    var proto = SaveAsTemplate.prototype;

    proto.onclick = function (ecModel, api) {
        var chart = api.getChart();
        var options = chart.getOption();
        var tpl = chart.tpl;
        console.log(tpl)
        zUtil.each(tpl,function(v,k){
            if(options[k]){
                if(k==='series'){
                    zUtil.each(options[k],function(item,index){
                        item.data = [];
                        delete item.dirty;
                        delete item.requestCompleted;
                    })
                }
                tpl[k] = zUtil.clone(options[k])
            }
        })
        console.log(tpl)
         // 保存模板文件
         var content = JSON.stringify(tpl);
         var userName = 'dbadmin';
         var hwFao = new HwFao("192.168.1.181:9050", "hwchart"); //地址:端口和存储标识(服务管理员分配)
         var filepath = userName + "/templates/template.json";
         hwFao.write(filepath, content, function (res) {
             if (res.isSucceed) {
                //var str = JSON.stringify(res.data);
                 alert('模板保存成功')
             } else {
                 alert(res.errMsg);
             }
         }, function (res) { alert(res); });
    };

    hwchart.component.toolbox.featureManager.register(
        'saveAsTemplate', SaveAsTemplate
    );

    hwchart.component.toolbox.feature.SaveAsTemplate = SaveAsTemplate;
})