using GymBro_API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GymBro_API.Context
{
    public class GymBroContext : DbContext
    {
        public GymBroContext(DbContextOptions<GymBroContext> options)
        : base(options)
        {
        }

        public DbSet<GymBro_Usuario> Usuarios { get; set; }
        public DbSet<Publicacao> Publicacoes { get; set; }
        public DbSet<Resposta> Respostas { get; set; }
        public DbSet<Anotacao> Anotacoes { get; set; }
    }
}
