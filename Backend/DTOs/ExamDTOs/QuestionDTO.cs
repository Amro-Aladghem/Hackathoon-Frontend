using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.ExamDTOs
{
    public class QuestionDTO
    {
        public int QuestionId { get; set; }
        public string QuestionName { get; set; }
        public List<Choice> Choices { get; set; }
        public int RightChoiceId { get; set; }
    }
}
