namespace GymBro_API.Entities
{
    public class Resposta
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public GymBro_Usuario Autor { get; set; }
    }
}
