using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        // (?=.*\\d)(?=.*[a-z]).{4, }$
        //TODO make more complex when in production.
        [RegularExpression(@"^\w+$", ErrorMessage = "Password must be more complex.")]
        public string Password { get; set; }
        [Required]
        public string Username { get; set; }
    }
}