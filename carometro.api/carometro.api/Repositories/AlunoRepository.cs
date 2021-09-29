using carometro.api.Contexts;
using carometro.api.Domains;
using carometro.api.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
        carometroContext ctx = new carometroContext();

        public void Atualizar(int id, Aluno alunoAtualizado)
        {
            Aluno alunoBuscado = ctx.Alunos.Find(id);

            if (alunoAtualizado != null)
            {
                alunoBuscado.Nome = alunoAtualizado.Nome; 
            }

            if (alunoAtualizado != null)
            {
                alunoBuscado.Telefone = alunoAtualizado.Telefone;
            }

            if (alunoAtualizado != null)
            {
                alunoBuscado.Foto = alunoAtualizado.Foto;
            }

            if (alunoAtualizado != null)
            {
                alunoBuscado.Email = alunoAtualizado.Email;
            }

            if (alunoAtualizado != null)
            {
                alunoBuscado.IdTurma = alunoAtualizado.IdTurma;
            }

            ctx.Alunos.Update(alunoBuscado);
            ctx.SaveChanges();
        }

        public Aluno BuscarPorId(int id)
        {
            return ctx.Alunos.FirstOrDefault(a => a.IdAluno == id);
        }

        public void Cadastrar(Aluno novoAluno)
        {
            ctx.Alunos.Add(novoAluno);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Alunos.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }       

        
        public List<Aluno> ListarPorId(int id)
        {
            return ctx.Alunos                
                .Select(a => new Aluno()
                {
                    IdAluno = a.IdAluno,
                    Nome = a.Nome,
                    Email = a.Email,
                    Telefone = a.Telefone,
                    Foto = a.Foto,
                    IdTurma = a.IdTurma,

                    IdTurmaNavigation = new Turma()
                    {
                        IdTurma = a.IdTurmaNavigation.IdTurma,
                        Nome = a.IdTurmaNavigation.Nome
                    }
                })
                .Where(a => a.IdTurma == a.IdTurmaNavigation.IdTurma && a.IdTurma == id)
            .ToList();
        }

        public List<Aluno> Listar()
        {
            return ctx.Alunos
            .Select(a => new Aluno()
             {
                 IdAluno = a.IdAluno,
                 Nome = a.Nome,
                 Email = a.Email,
                 Telefone = a.Telefone,
                 Foto = a.Foto,
                 IdTurma = a.IdTurma,

                 IdTurmaNavigation = new Turma()
                 {
                     IdTurma = a.IdTurmaNavigation.IdTurma,
                     Nome = a.IdTurmaNavigation.Nome
                 }
             })                
            .ToList();
        }
    }
}
