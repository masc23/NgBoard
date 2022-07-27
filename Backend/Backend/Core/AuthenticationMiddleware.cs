using Backend.Models;

namespace Backend.Core
{
	public class AuthenticationMiddleware
	{
		private readonly RequestDelegate NextMiddleware;

		public AuthenticationMiddleware(RequestDelegate nextMiddleware)
		{
			NextMiddleware = nextMiddleware;
		}

		public async Task Invoke(HttpContext context)
		{
			if (await Authorized(context))
			{
				await NextMiddleware.Invoke(context);
			}
			else
			{
				context.Response.StatusCode = 401; //Unauthorized
			}
		}

		private static async Task<bool> Authorized(HttpContext context)
		{
			if (await BaseSettings.IsUrlOpen(context.Request.Path))
			{
				return true;
			}

			User? user = UserManager.GetUser(context);
			return user != null;
		}
    }
}
