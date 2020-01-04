using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webapimdx.Helpers
{
  public static class SettingHelper
  {
    static string Get(string key)
    {
      var output = System.Configuration.ConfigurationManager.AppSettings[key];
      if (output != null)
      {
        return output;
      }

      return null;
    }

    public static string ConnectionString() {
			if (Get("SSASServer") == "") {
				throw new Exception("SSAS Server is not specified in the Web.config. Open web.config and add SSASServer setting value for where your SSAS server is.");
			}

      return $"Data Source={Get("SSASServer")};Catalog={Get("Database")}";
    }


  }
}