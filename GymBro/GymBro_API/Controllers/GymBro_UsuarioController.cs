using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBro_API.Context;
using GymBro_API.Entities;
using GymBro_API.RequestModels;
using GymBro_API.Token;
using Microsoft.AspNetCore.Authorization;

namespace GymBro_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymBro_UsuarioController : ControllerBase
    {
        private readonly GymBroContext _context;

        public GymBro_UsuarioController(GymBroContext context)
        {
            _context = context;
        }


        // GET: api/GymBro_Usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GymBro_Usuario>> GetGymBro_Usuario(int id)
        {   
            var gymBro_Usuario = await _context.Usuarios.FindAsync(id);


            if (gymBro_Usuario == null)
            {
                return NotFound();
            }

            return gymBro_Usuario;
        }

        // PUT: api/GymBro_Usuario/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGymBro_Usuario(int id, GymBro_Usuario gymBro_Usuario)
        {
            if (id != gymBro_Usuario.Id)
            {
                return BadRequest();
            }

            var usuario_Antigo = await _context.Usuarios.Where(u => u.Id == id).FirstOrDefaultAsync();

            if(usuario_Antigo == null) 
                return BadRequest();

            if(usuario_Antigo.Usuario != gymBro_Usuario.Usuario)
            {
                return BadRequest("Não pode alterar user");
            }

            _context.Entry(gymBro_Usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GymBro_UsuarioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/GymBro_Usuario
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GymBro_Usuario>> PostGymBro_Usuario(GymBro_Usuario gymBro_Usuario)
        {
            var existeUsuario = await _context.Usuarios.AnyAsync(x => x.Usuario == gymBro_Usuario.Usuario);
            if (existeUsuario)
            {
                return BadRequest("User já existe");
            }
            _context.Usuarios.Add(gymBro_Usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGymBro_Usuario", new { id = gymBro_Usuario.Id }, gymBro_Usuario);
        }

        [HttpPost("Autenticar")]
        public async Task<IActionResult> Autenticar(LoginRequest login)
        {
            var gymBro_Usuario = await _context.Usuarios.Where(u => u.Usuario == login.Usuario && u.Senha == login.Senha).FirstOrDefaultAsync();
            if (gymBro_Usuario == null)
            {
                return NotFound();
            }

            var AutenticarResponse = new
            {
                token = TokenDealer.Generate_Token(gymBro_Usuario),
                usuario = gymBro_Usuario
            };

            return Ok(AutenticarResponse);
        }

        private bool GymBro_UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.Id == id);
        }
    }
}
