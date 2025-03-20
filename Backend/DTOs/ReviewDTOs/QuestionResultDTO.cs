using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ReviewDTOs
{
    public class QuestionResultDTO
    {
        public string Question { get; set; }
        public int QuestionId { get; set; }
        public List<ReviewChoiceDTO> Choices { get; set; }
    }

}
