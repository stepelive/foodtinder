using System.Net.Http;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TinderServer.Models.Requests;

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

        [HttpPost]
        public JsonContent Get(RequestUrlModel model)
        {
            var response = _client.GetAsync(model.Url).Result;
            var content = response.Content.ReadAsStringAsync().Result;
            return JsonContent.Create(content);
        }
    }
}