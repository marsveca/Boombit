using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BoomBitApi.Extensions
{
    public class ModelValidation
    {
        public bool IsValid { get; set; }
        public string Error { get; set; }

    }

    public class ModelValidationSource<T> : ModelValidation where T : class
    {
        public ModelValidationSource(T source)
        {
            model = source;
        }
        public T model { get; set; }
        public ModelValidationSource<T> AsError(string error)
        {
            this.Error = error;
            this.IsValid = false;
            return this;
        }

        public ModelValidationSource<T> AsOk()
        {
            this.Error = "";
            this.IsValid = true;
            return this;
        }
    }
}
