using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace webapimdx.Helpers.CellSetToJson
{
  public class CellSetContractResolver : DefaultContractResolver
  {
    /// <summary>
    /// <string> - Declaring type
    /// <List<string>> - list of property names to include
    /// </summary>
    Dictionary<string, List<string>> _include = new Dictionary<string, List<string>>();
    public void AddInclude(string DeclaringTypeName, List<string> PropertyNames)
    {
      _include[DeclaringTypeName] = PropertyNames;
    }

    protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
    {
      JsonProperty property = base.CreateProperty(member, memberSerialization);
      if (_include.ContainsKey((property.DeclaringType) == null ? "" : property.DeclaringType.Name) &&
          _include[(property.DeclaringType) == null ? "" : property.DeclaringType.Name].Contains(property.PropertyName))
      {
        property.Ignored = false;
      }
      else
      {
        property.Ignored = true;
      }
      return property;

    }

  }
}