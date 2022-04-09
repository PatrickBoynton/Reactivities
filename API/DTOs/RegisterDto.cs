using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
	public class RegisterDto
	{
		[Required] public string DisplayName { get; set; }

		[Required] [EmailAddress] public string Email { get; set; }

		[Required]
		[RegularExpression("(?=.*).{4,}$", ErrorMessage = "Password must contain at least 4 characters.")]

		public string Password { get; set; }

		[Required] public string Username { get; set; }
	}
}