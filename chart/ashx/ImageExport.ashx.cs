/*************************************************************************************
* CLR版本： $clrversion$
* 类 名 称：ParseJson
* 机器名称：$machinename$
* 命名空间：JsonSerialize
* 文 件 名：$safeitemname$
* 创建时间：2014.12.1
* 作   者： 刘志伟
* 说   明： json的序列化与反序列化，用于对json串的解析与生成，首先json串序列化成临时对象，临时对象给结构体对象赋值；生成json串时是通过结构体对象拼接成json串；
*           小写的类为临时对象中的类，大写的类为结构体中的类；
* 修改时间：2014.12.11
* 修 改 人：刘志伟
*************************************************************************************/
namespace Chart_Server
{
    using System;
    using System.Web;
    using ImageExport;
    /// <summary>
    /// HWChartsExport 的摘要说明
    /// </summary>
    public class Chart_Image_Export : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            ImageExport export = new ImageExport();
            export.ProcessExportRequest(context);
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