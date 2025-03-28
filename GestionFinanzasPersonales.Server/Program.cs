using GestionFinanzasPersonales.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using System.Security.Claims;

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
            builder.Services.AddIdentity<Tbfpuser, IdentityRole<int>>()
                .AddEntityFrameworkStores<FinanzasPersonalesContext>()
                .AddDefaultTokenProviders();

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            builder.Services.AddOpenApi();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseRouting();

            // Use CORS policy
            app.UseCors("AllowAll");

            // Use Authentication and Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.MapFallbackToFile("/index.html");

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