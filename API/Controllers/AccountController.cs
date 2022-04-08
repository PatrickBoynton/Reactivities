using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		readonly TokenService _service;
		readonly SignInManager<AppUser> _signInManager;
		readonly UserManager<AppUser> _userManager;

		public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
		TokenService service)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_service = service;
		}


		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await _userManager.FindByEmailAsync(loginDto.Email);

			if (user == null) return Unauthorized();

			var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);


			if (result.Succeeded)
				return new UserDto
				{
				DisplayName = user.DisplayName,
				Image = null,
				Token = _service.CreateToken(user),
				Username = user.UserName,
				};
			return Unauthorized();
		}
	}
}