using RpgBoardApi.Core;

namespace RpgBoardApi
{
	public static class Program
	{
		public static void Main(string[] args)
		{
			WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
			builder.Services.AddControllers();
			// builder.Services.AddSingleton<>();

			WebApplication app = builder.Build();
			app.UseMiddleware<AuthenticationMiddleware>();
			app.MapControllers();
			app.Run();
		}
	}
}
