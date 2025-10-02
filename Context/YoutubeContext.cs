using Microsoft.EntityFrameworkCore;  
using YoutubeTarefaApi.Models;       

namespace YoutubeTarefaApi.Context
{
    public class YoutubeContext : DbContext
    {
        public YoutubeContext(DbContextOptions<YoutubeContext> options) : base(options)
        {
        }

        public DbSet<Pagina> Paginas { get; set; }  
    }
}
