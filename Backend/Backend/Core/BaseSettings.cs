using Newtonsoft.Json;

namespace Backend.Core
{
	public static class BaseSettings
	{
		public static string GetApplicationDirectory()
		{
			const string codexDir = "/home/codex7/rpgdata";
			const string devDir   = @"D:\Projekte\Development\RpgBoardData";

			return Directory.Exists(codexDir) ? codexDir : devDir;
		}

		public static async Task<bool> IsUrlOpen(string url)
		{
			var unprotectedUrls = new List<string>();

			string appDir  = GetApplicationDirectory();
			string urlList = Path.Combine(appDir, "unprotected-urls.json");

			try
			{
				if (File.Exists(urlList))
				{
					string json = await File.ReadAllTextAsync(urlList);
					var    list = JsonConvert.DeserializeObject<List<string>>(json);

					if (list != null)
					{
						unprotectedUrls = list;
					}
				}
				else
				{
					unprotectedUrls.Add("/auth");
					await File.WriteAllTextAsync(urlList, JsonConvert.SerializeObject(unprotectedUrls, Formatting.Indented));
				}
			}
			catch (Exception)
			{
				// do nothing
			}

			return unprotectedUrls.Contains(url);
		}
	}
}
