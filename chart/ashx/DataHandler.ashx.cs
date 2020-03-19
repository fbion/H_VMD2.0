/*************************************************************************************
* CLR版本： $clrversion$
* 机器名称：$machinename$
* 命名空间：Chart_Server
* 文 件 名：$safeitemname$
* 创建时间：2015.5.15
* 作   者： 刘志伟
* 说   明： 曲线图中数据处理程序，包括xls文件导出到客户端、接收客户端上传的csv文件并解析返回给客户端等；
* 修改时间：2014.5.16
* 修 改 人：刘志伟
*************************************************************************************/

namespace Chart_Server
{
    using System;
    using System.Collections.Generic;
    using System.Web;
    using System.IO;
    using System.Text;

    /// <summary>
    /// ExcelExport 的摘要说明
    /// </summary>
    public class ExcelExport : IHttpHandler {

        public void ProcessRequest (HttpContext context) {
            String requestType = context.Request.Form["request_type"];
            if (requestType == "save_cvs")
            {
                if (context.Request.Form["csv"] == null)
                {
                    context.Response.Write("<script>window.DataViewResponse('save_cvs','导入失败');</script>");
                    context.Response.End();
                }
                else
                {
                    string tcsv = context.Request.Form["csv"].ToString();
                    string filename = "excel";
                    MemoryStream tData = new MemoryStream(Encoding.Default.GetBytes(tcsv));
                    context.Response.ClearContent();
                    context.Response.ClearHeaders();
                    context.Response.ContentType = "text/csv";
                    context.Response.AppendHeader("Content-Disposition", "attachment; filename=" + filename + "." + "csv" + "");
                    context.Response.BinaryWrite(tData.ToArray());
                    context.Response.End();
                }
            }
            else if (requestType == "import_csv")
            {
                if (context.Request.Files.Count > 0)
                {
                    String fileString = "";
                    HttpPostedFile file = context.Request.Files[0];
                    int fileLength = file.ContentLength;
                    if (fileLength > 0)
                    {
                        byte[] input = new byte[fileLength];
                        Stream inputStream = file.InputStream;

                        // Read the file into the byte array.
                        inputStream.Read(input, 0, fileLength);

                        // Copy the byte array into a string.
                        for (int b = 0; b < fileLength; b++)
                        {
                            fileString = fileString + input[b].ToString();
                        }

                        file.SaveAs("E://11.csv");
                        context.Response.Write("<script>window.parent.DataViewResponse('import_csv','月度,投产新井数,新井产量\t2015-1,0.8,124\t2015-2,0.8,236\t2015-3,0.3,360\t2015-4,0.5,480\t2015-5,1,604\t2015-6,1.9,724\t2015-7,2.6,848\t2015-8,3,972\t2015-9,2,1092\t2015-10,1.8,1216\t2015-11,2.8,1336\t2015-12,3.8,1460');</script>");
                        context.Response.End();
                    }
                }
                else
                {
                    context.Response.Write("<script>window.parent.DataViewResponse('import_csv','导入失败');</script>");
                    context.Response.End();
                }
            }
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