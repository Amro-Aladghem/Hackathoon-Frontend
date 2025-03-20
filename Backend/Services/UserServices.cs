using Database.Entities;
using DTOs.UserDTOs;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using Security;
using System.Net.Mail;

namespace Services
{
    public class UserServices
    {
        private readonly AppDbContext _context;
        private readonly SecurityMethode _securityMethode;
        private readonly IConfiguration _configuration;

        public UserServices(AppDbContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _securityMethode = new SecurityMethode(configuration);
        }

        public UserDTO? Login (UserLoginDTO loginDTO)
        {
            var User = _context.Users.Where(U => U.Email == loginDTO.email)
                                     .Select(U => new UserInfoWithPassword()
                                     {
                                         UserId = U.UserId,
                                         FirstName = U.FirstName,
                                         LastName = U.LastName,
                                         Password=U.Password
                                     })
                                     .FirstOrDefault();

            if (User is null)
                return null;

            if(!_securityMethode.VerifyEncryptPassword(User.Password,loginDTO.password))
                return null;

            return new UserDTO()
            {
                UserId = User.UserId,
                FirstName = User.FirstName,
                LastName = User.LastName
            };
        }

        public UserDTO? Register (UserRegisterDTO userRegisterDTO)
        {
            string EncryPassword = _securityMethode.Encrypt(userRegisterDTO.Password);

            var NewUser = new User()
            {
                FirstName = userRegisterDTO.FirstName,
                LastName = userRegisterDTO.LastName,
                Email = userRegisterDTO.Email,
                PhoneNumber = userRegisterDTO.Phone,
                Age = userRegisterDTO.Age,
                DateOfBirth = userRegisterDTO.DateOfBirth,
                Password = EncryPassword
            };

            _context.Users.Add(NewUser);

            if (_context.SaveChanges() <= 0)
                return null;

            return new UserDTO()
            {
                UserId = NewUser.UserId,
                FirstName = NewUser.FirstName,
                LastName = NewUser.LastName
            };
        }

        public bool IsEmailExistInDB(string email)
        {
           bool IsExist = _context.Users.Where(U=>U.Email== email).Any();

           return IsExist;
        }

        private bool CheckEmailSyntax(string Email)
        {
            return MailAddress.TryCreate(Email, out _);
        }

        private bool IsValiedDomain(string Email)
        {
            string[] Domains = new string[] { "gmail.com", "yahoo.com", "outlook.com" };

            string emailDomain = Email.Split('@')[1];

            return Domains.Contains(emailDomain);
        }

        public bool CheckIfEmailIsValied(string Email, bool CheckDomain = true)
        {
            if (!CheckEmailSyntax(Email))
                return false;

            if (CheckDomain)
            {
                if (!IsValiedDomain(Email))
                    return false;
            }

            return true;
        }

        private class UserInfoWithPassword()
        {
              public int UserId { get; set; }
              public string FirstName { get; set; }
              public string LastName { get; set; }
              public string Password { get; set; }
        }



    }
}
