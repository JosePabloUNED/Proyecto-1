using GestionFinanzasPersonales.Server.Models;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

namespace GestionFinanzasPersonales.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddDbContext<FinanzasPersonalesContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL"));
            });

            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<Tbfpuser>()
                .AddEntityFrameworkStores<FinanzasPersonalesContext>();

            // Add the Open API document generation services
            builder.Services.AddOpenApi();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllers();
            app.MapFallbackToFile("/index.html");

            app.MapIdentityApi<Tbfpuser>();
            app.MapStaticAssets();
            app.MapOpenApi();
            app.MapScalarApiReference(options =>
            {
                options
                    .WithTitle("SERVER SIDE")
                    .WithDownloadButton(true)
                    .WithTheme(ScalarTheme.Purple)
                    .WithDefaultHttpClient(ScalarTarget.JavaScript, ScalarClient.Axios);
            });

            app.Run();
        }
    }
}