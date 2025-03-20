using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities
{
    public class RoleType
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
