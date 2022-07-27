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
		[HttpGet("user")]
		public IActionResult GetLoggedInStatus()
		{
			User? user = UserManager.GetUser(HttpContext);

			if (user == null)
			{
				return Ok(new Result
				{
					Type    = "is-logged-in-result",
					Success = false,
					Payload = "nicht angemeldet"
				});
			}

			var result = new Result
			{
				Type    = "is-logged-in-result",
				Success = true,
				Payload = user
			};

			return Ok(result);
		}

		[HttpPost]
		public async Task<ActionResult<Result>> Login()
		{
			string code = await Request.GetRawBodyStringAsync();

			User? user = UserManager.LoginUser(code);

			if (user == null)
			{
				return Ok(new Result
				{
					Type    = "auth-result",
					Success = false,
					Payload = "Anmelde-Code ungültig"
				});
			}

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
