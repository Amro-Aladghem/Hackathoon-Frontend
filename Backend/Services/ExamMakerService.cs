using Database.Entities;
using DTOs;
using Mscc.GenerativeAI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using DTOs.ExamDTOs;


namespace Services
{
    public class ExamMakerService
    {
        public readonly AppDbContext _context;

        private GenerativeModel model;

        private Content systemInstruction = new Content("""
            You are exam maker , your role to generate questions based on user file , the user will get you the number of questions ,
            but the structure of your outpur must be json with this Structure :
             "Questions":[
            
             {
               "QuestionId":Question Id,
               "QuestionName":"here is the question",
               "Choices":[
                {Id:1,ChoiceText:"choice Text"},
                {Id:2,ChoiceText:"choice Text"},
                {Id:3,ChoiceText:"choice Text"},
                {Id:4,ChoiceText:"choice Text"},
               ],
               "RightChoiceId":here is The id of right answer
             },
            ]
            Note: Dont't add anything else only this json , don't make every RightChoiceId the same for every question.
            """);

        public ExamMakerService(AppDbContext context)
        {
            _context = context;

            var googleAI = new GoogleAI(apiKey: "");
            model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstruction);
        }

        public async Task<QuestionsWrapper> GenerateExam(string FileURI, ExamRequestDTO requestDTO)
        {
            string promet = $"The Number of Questions is:{requestDTO.NumberOfQuestion}";

            var generationConfig = new GenerationConfig()
            {
                ResponseMimeType = "application/json",
            };


            var request = new GenerateContentRequest(promet);

            request.GenerationConfig = generationConfig;

            await request.AddMedia(FileURI);

            var response = await model.GenerateContent(request);

            var json = JsonSerializer.Deserialize<QuestionsWrapper>(response.Text);


            return json;
        }



    }
}
