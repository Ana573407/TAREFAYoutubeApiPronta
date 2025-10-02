using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace YoutubeTarefaApi.Models
{
    public class Pagina
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string NomeCanal { get; set; }
        public string Descricao { get; set; }
        public int Ano { get; set; }
    }
}