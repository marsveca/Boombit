using BoomBitApi.Models;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoomBitApi.Services
{
    static class MessageServiceCollectionExtensions
    {
        public static void AddUsuarioService(this IServiceCollection services)
        {
            services.AddScoped<IModelServices<Usuario>, UsuarioService>();
        }
    }
}
