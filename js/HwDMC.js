/*
*
* V20180724
*
*/
 


function HwDMC(hwdas_host, doc_host, token) {

    this.hwdas_host = hwdas_host;
    this.doc_host = doc_host;
   
    this.wdk_hwdas = new HwDao(hwdas_host, "wdkcode", true, 20 * 1000);
    if (token)
        hwDas.token = token; 

    this.docinfo = this.CreateDocinfo(this.wdk_hwdas);

};


HwDMC.prototype.CreateDocinfo = function (hwDas) {
      
    return {
        url: "wdk/doc/dmdocinfo",

        //��ѯ �ĵ���Ϣ   
        get: function (docid, successback, errorback) {
            //params ��ӵ�url���棬�磺��subdocid =123
            var params = {};
            params.docid = docid;

            hwDas.get(this.url, {}, params, successback, errorback);
        },

        //��� �ĵ���Ϣ 
        add: function (datas, successback, errorback) {
            var params = {};
            hwDas.add(this.url, {}, params, datas, successback, errorback);
        },

        //�༭   
        edit: function (datas, successback, errorback) {
            var params = {};
            hwDas.edit(this.url, {}, params, datas, successback, errorback);
        },

        //ɾ�� 
        del: function (docid, successback, errorback) {
            var params = {
                docid: docid
            };

            hwDas.del(this.url, {}, params, successback, errorback);
        },

        //�����ĵ����ƺ�id�õ������Ϣ   
        getdocinfobyidandname: function (nodeid, docname, successback, errorback) { 
            var url = "wdk/doc/docinfobyidandname";
            var params = {};
            params.nodeid = nodeid;
            params.docname = docname;

            hwDas.get(url, {}, params, successback, errorback);
        },

        //�����ĵ����ϼ�·��
        getdocparentpath: function (docid, successback, errorback) {

            var url = "wdk/doc/docparentpath";
            var params = {};
            params.docid = docid;

            hwDas.get(url, {}, params, successback, errorback);
        },

        //�����ĵ���Ŀ¼
        getdocNodeid: function (docid, successback, errorback) {

            var url = "wdk/doc/docnodeid";
            var params = {};
            params.docid = docid;

            hwDas.get(url, {}, params, successback, errorback);
        }
    };
}

HwDMC.prototype.downUrl = function (docid, token) {
    var base = this.doc_host;
    var url = 'http://' + this.doc_host + '/api/FileDown?docid=' + docid;
    if (token)
        url = url + '&token=' + token;

    return url;
};

 

