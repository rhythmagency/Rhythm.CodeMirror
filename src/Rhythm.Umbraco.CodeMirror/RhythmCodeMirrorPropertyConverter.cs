using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Rhythm.Umbraco.CodeMirror {
    public class RhythmCodeMirrorPropertyConverter : IPropertyValueConverter {

        public bool IsConverter(PublishedPropertyType propertyType) {
            return propertyType.EditorAlias.Equals("Rhythm.CodeMirror");
        }

        public object ConvertIntermediateToObject(IPublishedElement owner, PublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
            return inter;
        }

        public object ConvertIntermediateToXPath(IPublishedElement owner, PublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
            return inter;
        }

        public object ConvertSourceToIntermediate(IPublishedElement owner, PublishedPropertyType propertyType, object source, bool preview) {
            return source;
        }

        public PropertyCacheLevel GetPropertyCacheLevel(PublishedPropertyType propertyType) {
            return PropertyCacheLevel.None;
        }

        public Type GetPropertyValueType(PublishedPropertyType propertyType) {
            return typeof(string);
        }

        public bool? IsValue(object value, PropertyValueLevel level) {
            return value == null || value is string;
        }

    }
}