using Database.Entities;
using DTOs.ChatDTOs;
using Mscc.GenerativeAI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public  class ChemistryBotServices
    {
        public readonly AppDbContext _context;

        private GenerativeModel model;

        private Content systemInstruction = new Content("""
            You are a specialized chemistry tutor chatbot designed solely to assist students with chemistry.
            Your expertise covers all chemistry topics including organic, inorganic, physical, analytical, biochemistry, and more.
            When a conversation starts and before answering any chemistry-related question, ask the user for:
            1. Their school level (e.g., elementary, middle school, high school, or college).
            2. Their average grade or performance level in school.
            Based on the user's response, tailor your explanation and approach to match their academic level and understanding.
            If a user asks a question related to chemistry, provide clear, detailed, and accurate explanations with step-by-step reasoning as needed.
            If a user asks any question that is not related to chemistry or asks you to search the internet or provide images for topics not related to chemistry,
            If a user asks question not very related in chemistry and related in filed like physics or bio or math
            respond with: "I am chemistry tutor only, I can't answer any question not related to chemistry. You can ask my chat bot friends."
            Always ensure your responses are concise, precise, and fully within the realm of chemistry.
            You should answer in the same language as the user.
            """);

        public enum RoleType { user = 1, model = 2 };

        public struct History
        {
            public string Text { get; set; }
            public string Role { get; set; }
        }

        public ChemistryBotServices(AppDbContext context)
        {
            _context = context;

            var googleAI = new GoogleAI(apiKey: "");
            model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstruction);
        }

        private List<ContentResponse>? GetChemConversationHistory(int SessionId)
        {
            var Responses = _context.ChemistryConversations.Where(P => P.SessionId == SessionId)
                                                              .Select(P => new History()
                                                              {
                                                                  Text = P.Text,
                                                                  Role = P.RoleTypeId == (int)RoleType.user ? "user" : "model"
                                                              })
                                                              .ToList();

            if (Responses is null || Responses.Count == 0)
                return null;


            List<ContentResponse> ConversationsHistory = Responses
            .Select(Response => new ContentResponse(text: Response.Text, role: Response.Role))
            .ToList();

            return ConversationsHistory;
        }

        private void SaveChemMessagesToDB(RequestMessageDTO requestMessage, string modelMessage)
        {
            var Messages = new List<ChemistryConversation>()
            {
               new ChemistryConversation(){Text=requestMessage.Message,RoleTypeId=(int)RoleType.user,SessionId=(int)requestMessage.SessionId},
               new ChemistryConversation(){Text=modelMessage,RoleTypeId=(int)RoleType.model,SessionId=(int)requestMessage.SessionId},
            };

            _context.ChemistryConversations.AddRange(Messages);
            _context.SaveChanges();
        }

        public async Task<ResponseMessageDTO> ChatWithChemistryBot(RequestMessageDTO requestMessageDTO, string? ImageURI)
        {
            var chat = model.StartChat();

            if (!requestMessageDTO.IsFirstTime)
            {
                chat.History = GetChemConversationHistory((int)requestMessageDTO.SessionId);
            }

            var request = new GenerateContentRequest(requestMessageDTO.Message);

            if (!string.IsNullOrEmpty(ImageURI))
            {
                await request.AddMedia(ImageURI);
            }

            var modelResponse = await chat.SendMessage(request);

            if (string.IsNullOrEmpty(modelResponse.Text))
            {
                new Exception("Faild to get response");
            }

            SaveChemMessagesToDB(requestMessageDTO, modelResponse.Text);

            return new ResponseMessageDTO()
            {
                SessionId = (int)requestMessageDTO.SessionId,
                UserId = requestMessageDTO.UserId,
                Message = modelResponse.Text
            };
        }

    }
}
