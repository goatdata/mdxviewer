using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webapimdx.Helpers.CellSetToJson
{
  public class MemberJsonConverter : JsonConverter
  {
    public override bool CanConvert(Type objectType)
    {
      return (objectType == typeof(Microsoft.AnalysisServices.AdomdClient.Member));
    }

    public override bool CanWrite
    {
      get { return true; }
    }
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
      Microsoft.AnalysisServices.AdomdClient.Member member = (Microsoft.AnalysisServices.AdomdClient.Member)value;

      if (member.MemberProperties.Find("PARENT_UNIQUE_NAME") == null)
      {
        throw new Exception("MDX query must include DIMENSION PROPERTIES PARENT_UNIQUE_NAME ON ROWS and DIMENSION PROPERTIES PARENT_UNIQUE_NAME ON COLS. Otherwise parent data is not known and its a pain in the arse to retrieve it");
      }
      writer.WriteStartObject();
      writer.WritePropertyName("Name");
      writer.WriteValue(member.Name);



      writer.WritePropertyName("Caption");
      writer.WriteValue(member.Caption);

      writer.WritePropertyName("LevelName");
      writer.WriteValue(member.LevelName);

      writer.WritePropertyName("ChildCount");
      writer.WriteValue(member.ChildCount);

      writer.WritePropertyName("LevelDepth");
      writer.WriteValue(member.LevelDepth);

      writer.WritePropertyName("DrilledDown");
      writer.WriteValue(member.DrilledDown);


      if (member.MemberProperties["PARENT_UNIQUE_NAME"].Value != null)
      {
        writer.WritePropertyName("ParentUniqueName");
        writer.WriteValue(member.MemberProperties["PARENT_UNIQUE_NAME"].Value);
      }

      writer.WritePropertyName("UniqueName");
      writer.WriteValue(member.UniqueName);

      writer.WriteEndObject();

    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
      throw new NotImplementedException("Unnecessary because CanRead is false. The type will skip the converter.");
    }
  }
}