using Microsoft.AnalysisServices.AdomdClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Results;
using webapimdx.Models.Requests.Mdx;

namespace webapimdx.Controllers
{
    public class MdxController : ApiController
    {
		[HttpPost]
		[ActionName("Query")]
		public HttpResponseMessage Query(MdxQuery MdxQuery)
        {
			try
			{
			string output = "";

			using (AdomdConnection conn = new AdomdConnection(Helpers.SettingHelper.ConnectionString()))
			{
				conn.Open();
				AdomdCommand cmd = new AdomdCommand(MdxQuery.Query, conn);
				CellSet cs = cmd.ExecuteCellSet();
				output = Helpers.CellSetToJson.MdxToJson.MdxToJsonConvert(cs, false);
				conn.Close();
			}
			var response = this.Request.CreateResponse(HttpStatusCode.OK);
			response.Content = new StringContent(output, System.Text.Encoding.UTF8, "application/json");
			return response;
			}
			catch (Exception ex) {
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
		 }
        }

    }
}
