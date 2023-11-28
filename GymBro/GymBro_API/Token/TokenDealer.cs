using GymBro_API.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GymBro_API.Token
{
    public static class TokenDealer
    {
        //Chave para gerar token
        public static string TokenKey { get; set; } = "AV2K4gQpmLDzMxOfoEQ4QndM9N/Fw7+QXDC00QNXyIE=";

        public static string Generate_Token(GymBro_Usuario usuario)
        {   //Claims que estarão no token.
            var claims = new[]
            {   new Claim("Id" , usuario.Id.ToString()),
                new Claim("User", usuario.Usuario),
            };

            // Cria um objeto de chave baseado na string.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey));
            //Define o algoritmo credencial , baseado do hmac
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //Configura o token com informações acima e adiciona expiração de 1 ano.
            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddYears(1),
                claims: claims,
                signingCredentials: creds);
            //Retorna o Token em string.
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
