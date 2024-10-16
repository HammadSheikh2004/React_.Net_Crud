using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
using React_Crud_Api.Models;

namespace React_Crud_Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddDbContext<MyDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("MyConn")));

            builder.Services.AddCors(cor => cor.AddPolicy("myApi", x => x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));

            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "React_Crud_Api", Version = "v1" });
            });
            var app = builder.Build();
            
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {

                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "React_Crud_Api v1");
                });
            }
            app.UseStaticFiles();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")),
                RequestPath = "/images"
            });

            app.UseHttpsRedirection();
            app.UseCors("myApi");
            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();

            


            app.MapControllers();
           


            app.Run();
        }
    }
}