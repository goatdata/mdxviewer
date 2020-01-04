using Microsoft.AnalysisServices.AdomdClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webapimdx.Helpers.CellSetToJson
{
  public static class MdxToJson
  {
    public static string MdxToJsonConvert(CellSet cs, Boolean Indented) {
      var contractResolver = new CellSetContractResolver();

      contractResolver.AddInclude("CellSet", new List<string>() {
                    "Axes",
                    "Cells"
                });
      contractResolver.AddInclude("Axis", new List<string>() {
                    "Set",
                    "Name"
                });
      contractResolver.AddInclude("Set", new List<string>() {
                    "Hierarchies",
                    "Tuples"
                });
      contractResolver.AddInclude("Hierarchy", new List<string>() {
                    "Caption",
                    "DefaultMember",
                    "Name"
                });
      contractResolver.AddInclude("Tuple", new List<string>() {
                    "Members",
                    "TupleOrdinal"
                });


      var settings = new JsonSerializerSettings()
      {
        ContractResolver = contractResolver,
        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
      };
      settings.Converters.Add(new CellSetJsonConverter(cs.Axes[0].Set.Tuples.Count, cs.Axes[1].Set.Tuples.Count));
      settings.Converters.Add(new MemberJsonConverter());
      string trySerializae = JsonConvert.SerializeObject(cs, (Indented ? Formatting.Indented : Formatting.None) , settings);
      return trySerializae;

    }
  }
}