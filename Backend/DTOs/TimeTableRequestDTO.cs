using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class TimeTableRequestDTO
    {
        public DateTime DateOfStart { get; set; }
        public TimeOnly TimeOfStart { get; set; }
        public DateTime DateOfEnd { get; set; }
        public TimeOnly TimeOfEnd { get; set; }
    }
}
