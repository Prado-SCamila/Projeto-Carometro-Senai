using carometro.api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Interfaces
{
    interface IUsuarioRepository
    {
        Usuario Login(string email, string senha);

        Usuario BuscarPorId(int id);
    }
}
