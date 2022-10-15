using BoomBitApi.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoomBitApi.Models
{
    public partial class Usuario
    {
        public ModelValidationSource<Usuario> Validate(BoombitContext _db)
        {

            var modelValidation = new ModelValidationSource<Usuario>(this);
            modelValidation.model = this;

            //validaaciones aqui

            return modelValidation.AsOk();
        }

        public ModelValidationSource<Usuario> ValidateUpdate(BoombitContext _db)
        {

            var modelValidation = this.Validate(_db);

            if (!modelValidation.IsValid)
                return modelValidation;

            return modelValidation.AsOk();
        }
    }
}
