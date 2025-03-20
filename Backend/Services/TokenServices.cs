using Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class TokenServices
    {
        public readonly AppDbContext _context;

        public enum eUserType { User=1}
        public TokenServices(AppDbContext context)
        {
            _context = context;
        }

        private string GenerateToken()
        {
            return Guid.NewGuid().ToString();
        }

        public string CreateNewToken(int UserId,eUserType UserType)
        {
            string createdToken = GenerateToken();

            var token = new Token()
            {
                UserId = UserId,
                UserTypeId = (int)UserType,
                CreatedToken = createdToken,
                IsActive=true
            };

            _context.Tokens.Add(token);

            _context.SaveChanges();

            return createdToken;    
        }









    }
}
