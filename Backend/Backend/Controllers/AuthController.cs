using System.Text;
using Backend.Core;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
	[ApiController]
	[Route("auth")]
	public class AuthController : ControllerBase
	{
		[HttpGet]
		public IActionResult GetLoggedInStatus()
		{
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult<Result>> Login()
		{
			string code = await Request.GetRawBodyStringAsync();
			if (code != "abc")
			{
				return Ok(new Result
				{
					Type    = "auth-result",
					Success = false,
					Payload = "Anmelde-Code ungültig"
				});
			}

			var user = new User
			{
				Id = "123",
				Name = "Martin",
				Token = "token123"
			};

			var result = new Result
			{
				Type    = "auth-result",
				Success = true,
				Payload = user
			};
			
			return Ok(result);
		}
	}
}
