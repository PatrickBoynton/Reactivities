using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API.Extensions
{
	public static class IdentityServiceExtensions
	{
		public static IServiceCollection AddIdentityServices(this IServiceCollection services,
		IConfiguration configuration)
		{
			services.AddIdentityCore<AppUser>(options =>
			{
				// TODO change to true later.
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Password.RequireUppercase = false;
			}).AddEntityFrameworkStores<DataContext>()
			.AddSignInManager<SignInManager<AppUser>>();

			services.AddAuthentication();

			return services;
		}
	}
}