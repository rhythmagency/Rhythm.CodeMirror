using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

namespace Rhythm.Umbraco.CodeMirror {
    public class RhythmCodeMirrorPropertyConverter : IPropertyValueConverter {

        public bool IsConverter(IPublishedPropertyType propertyType) {
            return propertyType.EditorAlias.Equals("Rhythm.CodeMirror");
        }

        public object ConvertIntermediateToObject(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
            return inter;
        }

        public object ConvertIntermediateToXPath(IPublishedElement owner, IPublishedPropertyType propertyType, PropertyCacheLevel referenceCacheLevel, object inter, bool preview) {
            return inter;
        }

        public object ConvertSourceToIntermediate(IPublishedElement owner, IPublishedPropertyType propertyType, object source, bool preview) {
            return source;
        }

        public PropertyCacheLevel GetPropertyCacheLevel(IPublishedPropertyType propertyType) {
            return PropertyCacheLevel.None;
        }

        public Type GetPropertyValueType(IPublishedPropertyType propertyType) {
            return typeof(string);
        }

        public bool? IsValue(object value, PropertyValueLevel level) {
            return value == null || value is string;
        }

    }
}