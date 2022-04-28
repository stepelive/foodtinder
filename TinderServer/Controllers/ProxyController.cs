using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TinderServer.Models.Requests;
using TinderServer.Models.Responses;
using TinderServer.Services;

namespace TinderServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProxyController : ControllerBase
    {
        private readonly HttpClient _client;
        private readonly ILogger<ProxyController> _logger;

        public ProxyController(ILogger<ProxyController> logger, HttpClient client)
        {
            _client = client;
            _logger = logger;
        }

        [HttpGet]
        public string GetAllProducts(int page)
        {
            var allVendors = new List<Item>();
            var vendorsContent = GetContent(
                $"https://api.delivery-club.ru/api1.2/vendors?cacheBreaker=1651162433&latitude=56.827133&longitude=60.540656&limit={16}&offset={page * 16}&need_citymobil=true");
            var vendors = JsonConvert.DeserializeObject<VendorsResponse>(vendorsContent);
            if (vendors is null || vendors.Vendors?.Items.Any() == false)
            {
                return null;
            }

            allVendors.AddRange(vendors.Vendors.Items);
            var allProducts = new List<ProductCuteView>();
            foreach (var vendor in allVendors)
            {
                try
                {
                    var responseProducts = GetContent(
                        $"https://api.delivery-club.ru/api1.2/vendor/{vendor.Id.Primary}/menu?data=menu,products,actions&cacheBreaker=1651163491");
                    var menu = JsonConvert.DeserializeObject<ProductResponse>(responseProducts);
                    var bannedItems = menu.Menu.Where(x => ProductSortService.bannedCategories.Contains(x.Name)).SelectMany(x=>x.ProductIds).ToList();
                    bannedItems.AddRange(menu.Products.Where(x => ProductSortService.bannedWords.Any(bw => x.Name.ToLower().Contains(bw)))
                        .Select(sm => sm.Id.Primary));
                    if (menu is null)
                        continue;

                    allProducts.AddRange(menu.Products.Select(x => new ProductCuteView(x, vendor)));
                    allProducts = allProducts.Where(x => !bannedItems.Contains(x.ProductId)).ToList();
                }
                catch (Exception ex)
                {
                    
                }
            }
            
            var result = JsonConvert.SerializeObject(allProducts);
            return result;
        }

        private string GetContent(string url)
        {
            var responseProducts = _client.GetAsync(url)
                .Result;
            return responseProducts.Content.ReadAsStringAsync().Result;
        }
    }
}