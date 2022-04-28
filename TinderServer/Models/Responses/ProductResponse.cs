using System.Collections.Generic;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace TinderServer.Models.Responses
{
    public class ProductResponse
    {
        [JsonProperty("Menu")]
        public List<Menu> Menu { get; set; }

        [JsonPropertyName("products")]
        public List<Product> Products { get; set; }

        [JsonPropertyName("promoActions")]
        public List<object> PromoActions { get; set; }

        [JsonPropertyName("promoActionsOld")]
        public List<object> PromoActionsOld { get; set; }
    }
    
    public class Menu
    {
        [JsonPropertyName("byPoints")]
        public bool ByPoints { get; set; }

        [JsonPropertyName("categories")]
        public List<object> Categories { get; set; }

        [JsonPropertyName("id")]
        public Id Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("productIds")]
        public List<string> ProductIds { get; set; }
    }

    public class DiscountPrice
    {
        [JsonPropertyName("value")]
        public object Value { get; set; }
    }

    public class Images
    {
        [JsonPropertyName("1000")] public string _1000 { get; set; }

        [JsonPropertyName("200")] public string _200 { get; set; }

        
        [JsonProperty("650")] public string _650 { get; set; }
    }

    public class Properties
    {
        [JsonPropertyName("calories")]
        public object Calories { get; set; }

        [JsonPropertyName("volume")]
        public object Volume { get; set; }

        [JsonPropertyName("weight")]
        public object Weight { get; set; }
    }

    public class Product
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("discountPrice")]
        public DiscountPrice DiscountPrice { get; set; }

        [JsonPropertyName("id")]
        public Id Id { get; set; }

        [JsonPropertyName("images")]
        public Images Images { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("price")]
        public Price Price { get; set; }

        [JsonPropertyName("properties")]
        public Properties Properties { get; set; }

        [JsonPropertyName("template")]
        public int Template { get; set; }
    }

}