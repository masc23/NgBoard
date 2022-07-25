using System.Text;

namespace BackendApi.Core
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
			string authHeader = context.Request.Headers["Authorization"];

			if (authHeader != null && authHeader.StartsWith("Bearer"))
			{
				string token = authHeader["Bearer ".Length..].Trim();

				if (token == "hello")
				{
					return true;
				}
			}

			return false;
		}
    }
}
