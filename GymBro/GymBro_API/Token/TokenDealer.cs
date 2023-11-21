using GymBro_API.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GymBro_API.Token
{
    public static class TokenDealer
    {

        public static string TokenKey { get; set; } = "AV2K4gQpmLDzMxOfoEQ4QndM9N/Fw7+QXDC00QNXyIE=";

        public static string Generate_Token(GymBro_Usuario usuario)
        {
            var claims = new[]
            {   new Claim("Id" , usuario.Id.ToString()),
                new Claim("User", usuario.Usuario),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(TokenKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddYears(1),
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
