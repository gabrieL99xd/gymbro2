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

namespace GymBro_API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PublicacaoController : ControllerBase
    {
        private readonly GymBroContext _context;

        public PublicacaoController(GymBroContext context)
        {
            _context = context;
        }

        // GET: api/Publicacao
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Publicacao>>> GetPublicacoes(int pageSize, int pageIndex)
        {   //Recupera as publicações , entretanto a logica é paginada ou seja irá receber  o tamanho da página e o Index. A lógica é o tamanho da página x o index e então devolver os elementos corretos.
            return await _context.Publicacoes.Skip(pageSize * pageIndex).Take(pageSize).OrderByDescending(p => p.Id).Include(p => p.Autor).ToListAsync();
        }

        [HttpGet("Total")]
        public async Task<ActionResult<IEnumerable<int>>> GetTotalPublicacoes()
        {//Apenas conta quantas publicações existem
            return Ok(await _context.Publicacoes.CountAsync());
        }

        // GET: api/Publicacao/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Publicacao>> GetPublicacao(int id)
        {   //recupera publicação baseada no Id, inclue as respostas e os autores que por padrão do lazy loading não seriam carregados.
            var publicacao = await _context.Publicacoes.Include(p => p.Autor).Include(p => p.Respostas).FirstOrDefaultAsync(p => p.Id == id);
            //verifica se existe , caso não notfound será retornado.
            if (publicacao == null)
            {
                return NotFound();
            }
            //retorna objeto da publicação
            return publicacao;
        }

        // PUT: api/Publicacao/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublicacao(int id, [FromBody] Publicacao publicacao)
        {
            if (id != publicacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(publicacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublicacaoExists(id))
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

        // POST: api/Publicacao
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Publicacao>> PostPublicacao([FromBody] Publicacao publicacao)
        {
            try
            {
                //Recupera usuario para remover erros do entity.
                var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Id == publicacao.Autor.Id);
                if (usuario == null)
                {
                    return BadRequest("User não existe");
                }
                //Linha para deixar explicito ao entity que esse objeto foi pego do banco de dados , portanto não será uma adição forçada com um Id.
                publicacao.Autor = usuario;
                _context.Publicacoes.Add(publicacao);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
            //Sucesso, retornar informações do objeto.
            return CreatedAtAction("GetPublicacao", new { id = publicacao.Id }, publicacao);
        }

        // DELETE: api/Publicacao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublicacao(int id)
        {
            var publicacao = await _context.Publicacoes.FindAsync(id);
            if (publicacao == null)
            {
                return NotFound();
            }
            var Respostas = publicacao.Respostas.Select(x => x.Id);
            if(Respostas.Count() > 0)
            {
                var respostasDaPublicacao = await _context.Respostas.Where(r => Respostas.Contains(id)).ToListAsync();
                _context.Respostas.RemoveRange(respostasDaPublicacao);
            }
            _context.Publicacoes.Remove(publicacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PublicacaoExists(int id)
        {
            return _context.Publicacoes.Any(e => e.Id == id);
        }
    }
}
