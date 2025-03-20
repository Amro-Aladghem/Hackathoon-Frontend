using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ReviewDTOs
{
    public  class ReviewRequestDTO
    {
        public string OccupationName { get; set; }
        public int SessionId { get; set; }
        public List<ReviewQuestionDTO> Questions { get; set; }
    }
}
