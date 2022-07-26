namespace Backend.Models
{
	public class Result
	{
		public string Type { get; set; } = "";

		public bool Success { get; set; }

		public object Payload { get; set; } = new();
	}
}
