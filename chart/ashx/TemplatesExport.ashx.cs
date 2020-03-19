
namespace Chart_Server
{
    using System;
    using System.Web;
    using TemplatesExport;

    /// <summary>
    /// Chart_Handler 的摘要说明
    /// </summary>
    public class Chart_Template_Export : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            TemplateExport.ProcessExportRequest(context);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}