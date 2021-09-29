using carometro.api.Contexts;
using carometro.api.Domains;
using carometro.api.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Repositories
{
    public class TurmaRepository : ITurmaRepository
    {
        carometroContext ctx = new carometroContext();

        public List<Turma> Listar()
        {
            return ctx.Turmas.ToList();   
        }
    }
}
