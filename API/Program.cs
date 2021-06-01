using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
           IHost host =  CreateHostBuilder(args).Build();

           using IServiceScope scope = host.Services.CreateScope();

           IServiceProvider services = scope.ServiceProvider;

           try
           {
               DataContext context = services.GetRequiredService<DataContext>();
               UserManager<AppUser> manager = services.GetRequiredService<UserManager<AppUser>>();
               await context.Database.MigrateAsync();
               await Seed.SeedData(context, manager);
           }
           catch (Exception e)
           {
               ILogger logger = services.GetRequiredService<ILogger<Program>>();
               
               logger.LogError(e, "An error occured during migration.");
           }
           
           host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
