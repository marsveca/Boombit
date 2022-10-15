using BoomBitApi.Extensions;
using BoomBitApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoomBitApi.Services
{
    public class UsuarioService : IModelServices<Usuario>
    {
        private readonly BoombitContext _db;
        public UsuarioService(BoombitContext db)
        {
            _db = db;

        }


        public ModelValidationSource<Usuario> Create(Usuario usuario)
        {

            var model = usuario.Validate(_db);


            if (!model.IsValid)
                return model;

            var actividad = new Actividad
            {
                FechaCreacion = DateTime.Now,
                UsuarioId = usuario.Id,
                Actividad1 = "Creacion Usuario"
            };
            usuario.Actividads.Add(actividad);

            _db.Usuarios.Add(usuario);

            return model;
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }


        public Usuario GetById(int id)
        {
            throw new NotImplementedException();
        }


        public ModelValidationSource<Usuario> Update(Usuario usuario)
        {


            var model = usuario.ValidateUpdate(_db);

            if (!model.IsValid)
                return model;

            var srcUsuario = _db.Usuarios.FirstOrDefault(x => x.Id == usuario.Id);
            srcUsuario.Nombre = usuario.Nombre;
            srcUsuario.Apellido = usuario.Apellido;
            srcUsuario.Contactar = usuario.Contactar;
            srcUsuario.PaisResidencia = usuario.PaisResidencia;
            srcUsuario.Telefono = usuario.Telefono;
            srcUsuario.Email = usuario.Email;
            var actividad = new Actividad
            {
                FechaCreacion = DateTime.Now,
                UsuarioId = usuario.Id,
                Actividad1 = "Modificacion Usuario"
            };

            _db.Actividads.Add(actividad);


            return model;

        }
    }
}
