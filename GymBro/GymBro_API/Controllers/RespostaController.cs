using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBro_API.Context;
using GymBro_API.Entities;
using Microsoft.AspNetCore.Authorization;
using GymBro_API.RequestModels;

namespace GymBro_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class RespostaController : ControllerBase
    {
        private readonly GymBroContext _context;

        public RespostaController(GymBroContext context)
        {
            _context = context;
        }

        // GET: api/Resposta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resposta>>> GetRespostas(int idDaPublicacao)
        {
            var publicacao = await _context.Publicacoes.FirstOrDefaultAsync(p => p.Id == idDaPublicacao);
            if (publicacao == null)
            {
                return BadRequest();
            }
            var identificadoresDasRespostas = publicacao.Respostas.Select(r => r.Id).ToList();

            return await _context.Respostas.Where(res => identificadoresDasRespostas.Contains(res.Id)).ToListAsync();
        }

        // GET: api/Resposta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resposta>> GetResposta(int id)
        {
            var resposta = await _context.Respostas.FindAsync(id);

            if (resposta == null)
            {
                return NotFound();
            }

            return resposta;
        }

        // PUT: api/Resposta/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResposta(int id, [FromBody]CriarRespostaRequest resposta)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == resposta.idDoAutor);

            if (usuario == null) return BadRequest("Autor não encontrado");
            var respostaSalvar = new Resposta();
            respostaSalvar.Autor = usuario;
            respostaSalvar.Descricao = resposta.Descricao;
            _context.Respostas.Add(respostaSalvar);
            var publicacao = await _context.Publicacoes.Where(p => p.Id == id).Include(p => p.Respostas).FirstOrDefaultAsync();
            if (publicacao == null)
            {
                return BadRequest();
            }
            var teste = publicacao.Respostas.ToList();
            teste.Add(respostaSalvar);
            publicacao.Respostas = teste;
            _context.Update(publicacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResposta", new { id = respostaSalvar.Id }, respostaSalvar);
        }

        // DELETE: api/Resposta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResposta(int id)
        {
            var resposta = await _context.Respostas.FindAsync(id);
            if (resposta == null)
            {
                return NotFound();
            }

            _context.Respostas.Remove(resposta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RespostaExists(int id)
        {
            return _context.Respostas.Any(e => e.Id == id);
        }
    }
}
