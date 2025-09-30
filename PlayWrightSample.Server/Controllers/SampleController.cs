using Microsoft.AspNetCore.Mvc;

namespace PlayWrightSample.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SampleController : ControllerBase
    {
       

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "Hello from .NET API!" });
        }
    }
}
