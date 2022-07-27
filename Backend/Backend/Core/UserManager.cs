using System.Text.RegularExpressions;
using Backend.Models;
using Newtonsoft.Json;

namespace Backend.Core
{
	public static class UserManager
	{
		public static User? GetUser(HttpContext context)
		{
			string authHeader = context.Request.Headers["Authorization"];

			if (authHeader != null && authHeader.StartsWith("Bearer"))
			{
				string token = authHeader["Bearer ".Length..].Trim();
				return GetUser(token);
			}

			return null;
		}

		private static User? GetUser(string token)
		{
			Dictionary<string, User> userList = GetList();
			return userList.ContainsKey(token) ? userList[token] : null;
		}

		public static User? LoginUser(string code)
		{
			Dictionary<string, User> userList = GetList();
			return userList.Values.FirstOrDefault(user => user.Code == code);
		}

		private static Dictionary<string, User> GetList()
		{
			var list = new Dictionary<string, User>();
			
			string appDir   = BaseSettings.GetApplicationDirectory();
			string userList = Path.Combine(appDir, "users.json");

			try
			{
				if (File.Exists(userList))
				{
					string json = File.ReadAllText(userList);
					var    temp = JsonConvert.DeserializeObject<Dictionary<string, User>>(json);

					if (temp != null)
					{
						list = temp;
					}
				}
				else
				{
					foreach (string userName in DefaultUsers)
					{
						User user = GenerateNewUser(userName);
						list[user.Token] = user;
					}
					
					File.WriteAllText(userList, JsonConvert.SerializeObject(list, Formatting.Indented));
				}
			}
			catch (Exception)
			{
				// do nothing
			}

			return list;
		}

		private static User GenerateNewUser(string name)
		{
			string code = $"{Random.Next(100, 999)}-{Random.Next(100, 999)}-{Random.Next(100, 999)}-{Random.Next(100, 999)}";

			return new User
			{
				Id    = Regex.Replace(name, @"[^a-zA-Z0-9\-]", ""),
				Name  = name,
				Token = Guid.NewGuid().ToString(),
				Code  = code
			};
		}

		private static readonly string[] DefaultUsers = new[] { "admin"};

		private static readonly Random Random = new();
	}
}
