using Microsoft.AnalysisServices.AdomdClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webapimdx.Helpers.CellSetToJson
{
  public class CellSetJsonConverter : JsonConverter
  {
    int _cols;
    int _rows;
    public CellSetJsonConverter(int cols, int rows)
    {
      this._cols = cols;
      this._rows = rows;
    }


    public override bool CanConvert(Type objectType)
    {
      return (objectType == typeof(CellCollection));
    }
    public override bool CanWrite
    {
      get { return true; }
    }

    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
      CellCollection cells = (CellCollection)value;
      List<string[]> rows = new List<string[]>();
      for (int i = 0; i < _rows; i++)
      {
        string[] row = new string[_cols];
        for (int m = 0; m < _cols; m++)
        {
          if (cells[m, i].Value != null)
          {
            row[m] = cells[m, i].Value.ToString();
          }
        }
        rows.Add(row);
      }
      writer.WriteRawValue(JsonConvert.SerializeObject(rows));
    }
    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
      throw new NotImplementedException("Unnecessary because CanRead is false. The type will skip the converter.");
    }

  }
}