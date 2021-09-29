using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // Get api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // Get api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // Post api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // Put api/values/5
        [HttpPut]
        public void Put(int id, [FromBody] string value)
        {
        }

        // Delete api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
