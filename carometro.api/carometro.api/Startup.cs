using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace carometro.api
{
    public class Startup
    {      

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers()

            .AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });

            services.AddCors(options => {
                options.AddPolicy("CorsPolicy",
                    builder => {
                        builder.WithOrigins("http://localhost:3000", "http://localhost:19006")
                                                                    .AllowAnyHeader()
                                                                    .AllowAnyMethod();
                    }
                );
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "carometro.webApi", Version = "v1" });                
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            
            services
                    .AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = "JwtBearer";
                        options.DefaultChallengeScheme = "JwtBearer";
                    })
                
                .AddJwtBearer("JwtBearer", options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        
                        ValidateIssuer = true,                        
                        ValidateAudience = true,                        
                        ValidateLifetime = true,                        
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("carometro-chave-autenticacao")),                        
                        ClockSkew = TimeSpan.FromMinutes(30),                        
                        ValidIssuer = "carometro.webApi",                        
                        ValidAudience = "carometro.webApi"
                    };
                });
        }


        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                        Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
                RequestPath = "/Resources"
            });

            app.UseSwagger();           
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "carometro.webApi");
                c.RoutePrefix = string.Empty;
            });


            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("CorsPolicy");
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
