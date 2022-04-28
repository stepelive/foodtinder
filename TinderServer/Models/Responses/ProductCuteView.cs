using System.Collections.Generic;

namespace TinderServer.Models.Responses
{
    public class ProductCuteView
    {

        public ProductCuteView(Product product, Item vendor)
        {
            Image = product.Images._650;
            VendorName = vendor.Name;
            VendorId = vendor.Id.Primary;
            ProductId = product.Id.Primary;
            ProductName = product.Name;
            ProductDescription = product.Description;
            VendorCategories = vendor.Cuisines;
            MinimalPriceDelivery = vendor.Delivery.MinOrderPrice.Value;
            DeliveryTime = vendor.Delivery.Time;
            ReviewVendorCount = vendor.Reviews.ReviewCount;
            RatingVendorScore = vendor.Reviews.ScoreCount;

        }
        public string Image { get; set; }
        public string VendorName { get; set; }
        
        public string VendorId { get; set; }
        
        public string ProductId { get; set; }
        
        public string ProductName { get; set; }
        
        public string ProductDescription { get; set; }
        
        public List<string> VendorCategories { get; set; }
        
        public int MinimalPriceDelivery { get; set; }
        
        public string DeliveryTime { get; set; }
        
        public int ReviewVendorCount { get; set; }
        
        public int RatingVendorScore { get; set; }
    }
}