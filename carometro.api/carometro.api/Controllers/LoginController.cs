using carometro.api.Domains;
using carometro.api.Interfaces;
using carometro.api.Repositories;
using carometro.api.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace carometro.api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }

        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }
        
        [HttpPost]
        public IActionResult Post(LoginViewModel login)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.Login(login.Email, login.Senha);

                Usuario usuario = new Usuario();

                if (usuarioBuscado.IdTipoUsuario == 1)
                {
                    usuario = _usuarioRepository.BuscarPorId(usuarioBuscado.IdUsuario);
                }

                if (usuarioBuscado.IdTipoUsuario == 2)
                {
                    usuario = _usuarioRepository.BuscarPorId(usuarioBuscado.IdUsuario);
                }

                if (usuarioBuscado == null)
                {
                    return NotFound("Email ou senha inválidos !");
                }

                var claims = new[]
               {

                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),

                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),

                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),

                    new Claim("role", usuarioBuscado.IdTipoUsuario.ToString()),

                    new Claim("usuario", usuarioBuscado.IdTipoUsuario == 1 ? $"{usuario.Nome}" : "" ),

                    new Claim("usuario", usuarioBuscado.IdTipoUsuario == 2 ? $"{usuario.Nome}" : "" )


                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("carometro-chave-autenticacao"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: "carometro.webApi",
                    audience: "carometro.webApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }

            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
