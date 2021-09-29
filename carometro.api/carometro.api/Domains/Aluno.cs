using System;
using System.Collections.Generic;

#nullable disable

namespace carometro.api.Domains
{
    public partial class Aluno
    {
        public int IdAluno { get; set; }
        public int? IdTurma { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Foto { get; set; }

        public virtual Turma IdTurmaNavigation { get; set; }
    }
}
