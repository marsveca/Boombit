using BoomBitApi.Models;
using BoomBitApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoomBitApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly BoombitContext _db = null;
        private IModelServices<Usuario> _service;
        private readonly AppSettings _appSettings;

        public UsuarioController(BoombitContext db, IModelServices<Usuario> service, IOptions<AppSettings> appSettings)
        {
            this._db = db;
            this._service = service;
            this._appSettings = appSettings.Value;
        }


        // GET: api/<UsuarioController>
        [HttpGet]
        public IActionResult Get()
        {
            IQueryable<Usuario> usuarios = _db.Usuarios.OrderByDescending(x => x.Id);
            return new JsonResult(new
            {
                items = usuarios,
                totalCount = usuarios.Count()
            });
        }

        [HttpGet("actividades/{usuarioId}")]
        public IActionResult GetActividades(int usuarioId)
        {
            IQueryable<Actividad> actividades = _db.Actividads.Include(x => x.Usuario);

            if (usuarioId > 0)
                actividades = actividades.Where(x => x.UsuarioId == usuarioId);

             var data = actividades.OrderByDescending(x => x.UsuarioId)
                .Select(x => new  { x.Id, Nombre = x.Usuario.Nombre, Apellido = x.Usuario.Apellido, IdUsuario = x.Usuario.Id, FechaCreacion = x.FechaCreacion, Actividad = x.Actividad1 } );

            return new JsonResult(new
            {
                items = data,
                totalCount = actividades.Count()
            });
        }

        // GET api/<UsuarioController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsuarioController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario usuario)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {

                var result = _service.Create(usuario);

                try
                {


                    if (!result.IsValid)
                        return BadRequest(result.Error);

                    _db.SaveChanges();

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    result.IsValid = false;
                    while (ex.InnerException != null)
                        ex = ex.InnerException;
                    result.Error = ex.Message;
                    return BadRequest(result.Error);
                }

                transaction.Commit();
            }
            return new JsonResult(new { 
                     Id = usuario.Id,
                     Nombre = usuario.Nombre,
                     Apellido = usuario.Apellido,
                     Email = usuario.Email,
                     FechaNacimiento = usuario.FechaNacimiento,
                     Telefono = usuario.Telefono,
                     PaisResidencia = usuario.PaisResidencia,
                     Contactar = usuario.Contactar

            });
        }

        // PUT api/<UsuarioController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Usuario usuario)
        {
            var result = _service.Update(usuario);
            _db.SaveChanges();

            if (!result.IsValid)
                return BadRequest(result.Error);

            return new JsonResult(new
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Email = usuario.Email,
                FechaNacimiento = usuario.FechaNacimiento,
                Telefono = usuario.Telefono,
                PaisResidencia = usuario.PaisResidencia,
                Contactar = usuario.Contactar

            });

        }

        // DELETE api/<UsuarioController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
