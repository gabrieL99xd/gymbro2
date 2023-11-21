namespace GymBro_API.Entities
{
    public class Publicacao
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public GymBro_Usuario Autor { get; set; }
        public IEnumerable<Resposta> Respostas { get; set; }
    }
}
