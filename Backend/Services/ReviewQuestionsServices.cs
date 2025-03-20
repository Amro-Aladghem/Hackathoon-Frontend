using Database.Entities;
using DTOs.ExamDTOs;
using DTOs.ReviewDTOs;
using Microsoft.Identity.Client;
using Mscc.GenerativeAI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.Extensions.Azure;


namespace Services
{
    public class ReviewQuestionsServices
    {
        public readonly AppDbContext _context;

        private GoogleAI googleAI  = new GoogleAI(apiKey: "");

        private GenerativeModel Qustion_model;

        private GenerativeModel Review_model;

        private Content systemInstructionForQuestion = new Content("""
            You are an expert in career assessment. When a user provides an Occupation Name, your role is to generate exactly 15 true/false questions 
            that help determine if the occupation is suitable for the user. 
            The questions MUST be written in the Arabic language, 
            MUST be accurate and based on the real characteristics, requirements, 
            and challenges of the provided occupation, MUST be structured strictly in a true/false format,
            and MUST directly relate to the occupation’s core aspects.
            Generate these questions to help the user assess whether their skills, interests, and personality align with the occupation.
            Note:The jsone response must be like
            {
             [
               {
                Question:"here is the question",
                QuestionId:1,
                Choices:[
                  {Id:1,value:true},
                  {Id:2,value:false},
                ]
                },
             ]
            }
            """);

        private Content systemInstructionForReview = new Content("""
            "You are an expert in evaluating how suitable a particular job or field of study are for the user,
             The user will give you the 15 question that user answerd it with these question the answers for all questions , user will
             send to you with it , all of these questions is true/false questions for determine if jop is suitple , your role is 
             to determine if this jop is suitable for the user by calculate the Percentage base on the true/false answers , if the 
             percentage is less than 50% it is not suitable . you must send AdditionalNote with Arabic language in json
             your response must be like this : 
             {
               "SuitablePercentage":"here is the percnetage",
               "AdditionalNote":"here is what you want to add for the user"

             }
            """);

        struct QuestionText
        {
            public int Number { get; set; }
            public string Text { get; set; }
        }

        public ReviewQuestionsServices(AppDbContext context)
        {
            _context = context;

            Qustion_model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstructionForQuestion);
        }

        public bool SaveQuestionsToDB(List<QuestionResultDTO> questionResultDTOs,int SessionId)
        {
            List<Question> Questions = new List<Question>();


            foreach (var questionDTO in questionResultDTOs)
            {
                Questions.Add(new() { Number = questionDTO.QuestionId, Text = questionDTO.Question, SessionId = SessionId});
            }

            _context.Questions.AddRange(Questions);

            return _context.SaveChanges()>0;
        }

        public async Task<List<QuestionResultDTO>> GenerateQuestions(QuestionsRequestDTO requestDTO,int SessionId)
        {
            var generationConfig = new GenerationConfig()
            {
                ResponseMimeType = "application/json",
            };


            var request = new GenerateContentRequest($"The OccupationName is:{requestDTO.OccupationName}");

            request.GenerationConfig = generationConfig;

            var response = await Qustion_model.GenerateContent(request);


            var QuestionResult = JsonSerializer.Deserialize<List<QuestionResultDTO>>(response.Text);


            if(SaveQuestionsToDB(QuestionResult, SessionId))
            {
                new Exception("Failed to save data!");
            }

            return QuestionResult;
        }

        private List<QuestionText> GetQuestions(int SessiontId)
        {
            var Questions = _context.Questions.Where(Q => Q.SessionId == SessiontId)
                                              .Select(Q => new QuestionText()
                                              {
                                                  Text = Q.Text,
                                                  Number = Q.Number
                                              })
                                              .ToList();

            return Questions;
        }

        public async Task<ReviewResultDTO> GetPercentageResult(ReviewRequestDTO reviewRequestDTO)
        {
            Review_model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstructionForReview);

            var Questions = GetQuestions(reviewRequestDTO.SessionId);

            StringBuilder promet = new StringBuilder($"The jop title is:{reviewRequestDTO.OccupationName}, and this is the questions: ");

            for (int i = 0; i < Questions.Count; i++)
            {
                promet.AppendLine($"Q{Questions[i].Number} {Questions[i].Text}");
                promet.AppendLine($"Answer is : {reviewRequestDTO.Questions[i].Result}");
            }

            var generationConfig = new GenerationConfig()
            {
                ResponseMimeType = "application/json",
            };

            var request = new GenerateContentRequest(promet.ToString());

            request.GenerationConfig = generationConfig;

            var response = await Review_model.GenerateContent(request);


            var result = JsonSerializer.Deserialize<ReviewResultDTO>(response.Text);


            return result;
        }





    }
}
