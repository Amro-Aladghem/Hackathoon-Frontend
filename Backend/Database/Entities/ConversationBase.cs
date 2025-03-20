using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Database.Entities
{
    public abstract class ConversationBase
    {
        [Key]
        public int ConversationId { get; set; } 

        [ForeignKey("Session")]
        public int SessionId { get; set; }
        public Session Session { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }
        public User User { get; set; }

        [ForeignKey("RoleType")]
        public int RoleTypeId { get; set; }
        public RoleType RoleType { get; set; }
        public string Text { get; set; }
        public string? ImageURI { get; set; }
        public DateTime DateOfCreated { get; set; }
    }
}
