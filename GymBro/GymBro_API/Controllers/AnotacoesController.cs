using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymBro_API.Context;
using GymBro_API.Entities;
using System.Collections;

namespace GymBro_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnotacoesController : ControllerBase
    {
        private readonly GymBroContext _context;

        public AnotacoesController(GymBroContext context)
        {
            _context = context;
        }


        // GET: api/Anotacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Anotacao>>> GetAnotacao(int id)
        {   
            //Recebe o Id do usuario e recupera todas anotações dele
            var anotacoes = await _context.Anotacoes.Where( a => a.Autor.Id == id).Include(a => a.Autor).ToListAsync();
            //Caso não encontrar nenhuma , retornar notfound
            if (anotacoes == null)
            {
                return NotFound();
            }
            //Sucesso , retorna anotação
            return anotacoes;
        }

        // PUT: api/Anotacoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnotacao(int id, Anotacao anotacao)
        {
            if (id != anotacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(anotacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnotacaoExists(id))
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

        // POST: api/Anotacoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPost]
        public async Task<ActionResult<Anotacao>> PostAnotacao(Anotacao anotacao)
        {   

            var usuario = await _context.Usuarios.Where(u => u.Id == anotacao.Autor.Id).FirstOrDefaultAsync();
            //Busca usuario para garantir que ele existe no bd.
            if (usuario == null)
                return BadRequest("Autor não encontrado");
            //Essa linha de código é para tratar erros do entity framework , caso remova essa linha ele não deixará inserir no banco , alegará que o usuario que veio na requisição é novo e não irá permitir.
            anotacao.Autor = usuario;

            _context.Anotacoes.Add(anotacao);
            await _context.SaveChangesAsync();
            //Informaçoes de sucesso e o objeto são retornados.
            return CreatedAtAction("GetAnotacao", new { id = anotacao.Id }, anotacao);
        }

        // DELETE: api/Anotacoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnotacao(int id)
        {
            var anotacao = await _context.Anotacoes.FindAsync(id);
            if (anotacao == null)
            {
                return NotFound();
            }

            _context.Anotacoes.Remove(anotacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnotacaoExists(int id)
        {
            return _context.Anotacoes.Any(e => e.Id == id);
        }
    }
}
