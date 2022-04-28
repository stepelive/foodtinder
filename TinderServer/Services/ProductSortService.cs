using System.Collections.Generic;
using System.Linq;
using TinderServer.Models.Responses;

namespace TinderServer.Services
{
    public class ProductSortService
    {
        public List<Product> SortProducts(ProductResponse products, VendorsResponse vendors)
        {
            var productsResponse = products.Products.Where(x => x.Price.Value > 200);
            return productsResponse.ToList();
        }
    }
}