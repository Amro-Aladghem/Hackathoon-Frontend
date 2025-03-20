using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ChatDTOs
{
    public class RequestMessageDTO
    {
        public int ?SessionId { get; set; }
        public int ?UserId { get; set; }
        public string Message { get; set; }
        public bool IsFirstTime { get; set; }
    }
}
