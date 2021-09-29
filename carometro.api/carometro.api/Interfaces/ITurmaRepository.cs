using carometro.api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Interfaces
{
    interface ITurmaRepository
    {
        List<Turma> Listar();
    }
}
