using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace TinderServer.Models.Responses
{
    public class VendorsResponse
    {
        [JsonPropertyName("filters")]
        public List<Filter> Filters { get; set; }

        [JsonPropertyName("status")]
        public int Status { get; set; }

        [JsonPropertyName("vendors")]
        public Vendors Vendors { get; set; }
    }
    public class Icons
    {
        [JsonPropertyName("checked")]
        public string Checked { get; set; }

        [JsonPropertyName("enabled")]
        public string Enabled { get; set; }
    }

    public class Value
    {
        [JsonPropertyName("icons")]
        public Icons Icons { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("value")]
        public string ValueName { get; set; }
    }

    public class Filter
    {
        [JsonPropertyName("field")]
        public string Field { get; set; }

        [JsonPropertyName("title")]
        public string Title { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("values")]
        public List<Value> Values { get; set; }
    }

    public class Id
    {
        [JsonPropertyName("primary")]
        public string Primary { get; set; }
    }

    public class Chain
    {
        [JsonPropertyName("alias")]
        public string Alias { get; set; }

        [JsonPropertyName("id")]
        public Id Id { get; set; }
    }

    public class Cover
    {
        [JsonPropertyName("1200")]
        public string _1200 { get; set; }

        [JsonPropertyName("1600")]
        public string _1600 { get; set; }

        [JsonPropertyName("2048")]
        public string _2048 { get; set; }

        [JsonPropertyName("480")]
        public string _480 { get; set; }

        [JsonPropertyName("720")]
        public string _720 { get; set; }
    }

    public class MinOrderPrice
    {
        [JsonPropertyName("value")]
        public int Value { get; set; }
    }

    public class Price
    {
        [JsonPropertyName("value")]
        public int Value { get; set; }
    }

    public class PriceInterval
    {
        [JsonPropertyName("deliveryPrice")]
        public int DeliveryPrice { get; set; }

        [JsonPropertyName("minOrderTotal")]
        public int MinOrderTotal { get; set; }
    }

    public class Surge
    {
        [JsonPropertyName("isEnabled")]
        public bool IsEnabled { get; set; }

        [JsonPropertyName("price")]
        public Price Price { get; set; }

        [JsonPropertyName("priceIncrement")]
        public int? PriceIncrement { get; set; }

        [JsonPropertyName("priceIntervals")]
        public List<PriceInterval> PriceIntervals { get; set; }
    }

    public class Delivery
    {
        [JsonPropertyName("available")]
        public bool Available { get; set; }

        [JsonPropertyName("minOrderPrice")]
        public MinOrderPrice MinOrderPrice { get; set; }

        [JsonPropertyName("price")]
        public Price Price { get; set; }

        [JsonPropertyName("priceIntervals")]
        public List<PriceInterval> PriceIntervals { get; set; }

        [JsonPropertyName("provider")]
        public string Provider { get; set; }

        [JsonPropertyName("services")]
        public List<string> Services { get; set; }

        [JsonPropertyName("surge")]
        public Surge Surge { get; set; }

        [JsonPropertyName("time")]
        public string Time { get; set; }
    }

    public class Payment
    {
        [JsonPropertyName("type")]
        public string Type { get; set; }
    }

    public class Reviews
    {
        [JsonPropertyName("ratingScore")]
        public string RatingScore { get; set; }

        [JsonPropertyName("reviewCount")]
        public int ReviewCount { get; set; }

        [JsonPropertyName("score")]
        public string Score { get; set; }

        [JsonPropertyName("scoreCount")]
        public int ScoreCount { get; set; }
    }

    public class PromoAction
    {
        [JsonPropertyName("template")]
        public string Template { get; set; }

        [JsonPropertyName("text")]
        public string Text { get; set; }
    }

    public class Item
    {
        [JsonPropertyName("alias")]
        public string Alias { get; set; }

        [JsonPropertyName("allowPreorder")]
        public bool AllowPreorder { get; set; }

        [JsonPropertyName("blocked")]
        public bool Blocked { get; set; }

        [JsonPropertyName("categoryId")]
        public int CategoryId { get; set; }

        [JsonPropertyName("chain")]
        public Chain Chain { get; set; }

        [JsonPropertyName("cover")]
        public Cover Cover { get; set; }

        [JsonPropertyName("cuisines")]
        public List<string> Cuisines { get; set; }

        [JsonPropertyName("delivery")]
        public Delivery Delivery { get; set; }

        [JsonPropertyName("id")]
        public Id Id { get; set; }

        [JsonPropertyName("isFavourite")]
        public bool IsFavourite { get; set; }

        [JsonPropertyName("labels")]
        public List<string> Labels { get; set; }

        [JsonPropertyName("logo")]
        public string Logo { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("openDays")]
        public string OpenDays { get; set; }

        [JsonPropertyName("openFrom")]
        public string OpenFrom { get; set; }

        [JsonPropertyName("openTo")]
        public string OpenTo { get; set; }

        [JsonPropertyName("outOfCoverage")]
        public bool OutOfCoverage { get; set; }

        [JsonPropertyName("payments")]
        public List<Payment> Payments { get; set; }

        [JsonPropertyName("reviews")]
        public Reviews Reviews { get; set; }

        [JsonPropertyName("promoActions")]
        public List<PromoAction> PromoActions { get; set; }
    }

    public class Vendors
    {
        [JsonPropertyName("count")]
        public int Count { get; set; }

        [JsonPropertyName("hasMore")]
        public bool HasMore { get; set; }

        [JsonPropertyName("items")]
        public List<Item> Items { get; set; }

        [JsonPropertyName("offset")]
        public int Offset { get; set; }

        [JsonPropertyName("total")]
        public int Total { get; set; }
    }
}