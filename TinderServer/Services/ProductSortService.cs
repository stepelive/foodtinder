using System.Collections.Generic;
using System.Linq;
using TinderServer.Models.Responses;

namespace TinderServer.Services
{
    public class ProductSortService
    {
        public static string[] bannedCategories => new[]
        {
            "соусы", "напитки", "дополнительно", "закуски"
        };

        public static string[] bannedWords => new[]
        {
            "соус", "салфетк", "вода", "сок"
        };

    }
}