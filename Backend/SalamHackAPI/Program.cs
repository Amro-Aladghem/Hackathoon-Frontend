using Database.Entities;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Services;
using CloudinaryDotNet;

namespace SalamHackAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddScoped<UserServices>();
            builder.Services.AddScoped<TokenServices>();
            builder.Services.AddScoped<MathBotServices>();
            builder.Services.AddScoped<SharedServices>();
            builder.Services.AddScoped<PhysicsBotServices>();
            builder.Services.AddScoped<ChemistryBotServices>();
            builder.Services.AddScoped<HistoryBotServices>();
            builder.Services.AddScoped<TableTimeServices>();
            builder.Services.AddScoped<ExamMakerService>();
            builder.Services.AddScoped<ReviewQuestionsServices>();


            builder.Configuration
              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
              .AddEnvironmentVariables();


            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();



            builder.Services.AddDbContext<AppDbContext>(option =>
                                       option.UseSqlServer(Environment.GetEnvironmentVariable("SQL_Connection_String")));

            builder.Services.AddSingleton(c =>
            {
                var cloudinary = new Cloudinary(new Account(
                    Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME"),
                    Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY"),
                    Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET")
                ));

                return cloudinary;
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy =>
                    {
                        policy.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader();
                              
                    });
            });

           

            var app = builder.Build();

            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();


            app.UseCors("AllowAll");

            app.MapControllers();

            app.UseRouting();

            app.UseAuthorization();

            app.MapGet("/", () => "API is running!");

            app.Run();
           
        }
    }
}
