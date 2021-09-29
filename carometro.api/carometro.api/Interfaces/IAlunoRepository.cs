using carometro.api.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Interfaces
{
    interface IAlunoRepository
    {
        void Cadastrar(Aluno novoAluno);

        List<Aluno> ListarPorId(int id);

        List<Aluno> Listar();

        Aluno BuscarPorId(int id);

        void Atualizar(int id, Aluno alunoAtualizado);

        void Deletar(int id);

    }
}
