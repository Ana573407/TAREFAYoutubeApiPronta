using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YoutubeTarefaApi.Context;
using YoutubeTarefaApi.Models;

namespace YoutubeTarefaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class YoutubeController : ControllerBase
    {
        private readonly YoutubeContext _context;
        public YoutubeController(YoutubeContext context)
        {
            _context = context;
        }
        [HttpPost]
        public IActionResult Create(Pagina pagina)
        {
            _context.Add(pagina);
            _context.SaveChanges();
            return Ok(pagina);
        }
        [HttpGet("{id}")]
        public IActionResult ObterPorId(int id)
        {
            var pagina = _context.Paginas.Find(id);

            if (pagina == null)
            {
                return NotFound();
            }
            return Ok(pagina);
        }
        [HttpGet("obterPorNome/{nome}")]
        public IActionResult ObterPorNome(string nomeCanal)
        {
            var pagina = _context.Paginas.Where(x => x.NomeCanal.Contains(nomeCanal));
            if (pagina == null)
            {
                return NotFound();
            }
            return Ok(pagina);
        }
        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, Pagina pagina)
        {
            var paginaBanco = _context.Paginas.Find(id);
            if (paginaBanco == null)
            {
                return NotFound("nenhum vídeo encontrado");
            }
            paginaBanco.NomeCanal = pagina.NomeCanal;
            paginaBanco.Titulo = pagina.Titulo;
            paginaBanco.Descricao = pagina.Descricao;
            paginaBanco.Ano = pagina.Ano;

            _context.Paginas.Update(paginaBanco);
            _context.SaveChanges();

            return Ok(paginaBanco);
        }
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            var paginaBanco = _context.Paginas.Find(id);
            if (paginaBanco == null)
            {
                return NotFound("nenhum video encontrado");
            }
            _context.Paginas.Remove(paginaBanco);
            _context.SaveChanges();

            return NoContent();
        }
    }
}