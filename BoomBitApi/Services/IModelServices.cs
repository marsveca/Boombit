using BoomBitApi.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoomBitApi.Services
{
    public interface IModelServices<T> where T : class
    {
        ModelValidationSource<T> Create(T model);
        ModelValidationSource<T> Update(T model);
        T GetById(int id);
        int Delete(int id);

    }
}
