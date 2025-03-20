using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities
{
    public class Token
    {
        [Key]
        public int TokenId { get; set; }

        [Required]
        public string CreatedToken { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserType")]
        public int UserTypeId { get; set; }
        public UserType UserType { get; set; }
        public DateTime DateOfCreated { get; set; }
        public bool IsActive { get; set; }

    }
}
