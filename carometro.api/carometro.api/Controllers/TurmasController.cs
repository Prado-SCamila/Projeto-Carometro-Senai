using carometro.api.Interfaces;
using carometro.api.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace carometro.api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TurmasController : ControllerBase
    {
        private ITurmaRepository _turmaRepository { get; set; }

        public TurmasController()
        {
            _turmaRepository = new TurmaRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_turmaRepository.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
