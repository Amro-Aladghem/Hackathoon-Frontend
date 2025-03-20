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
    public class HistoryBotServices
    {
        public readonly AppDbContext _context;

        private GenerativeModel model;

        private Content systemInstruction = new Content("""
            You are a specialized history tutor chatbot designed solely to assist students with history.
            Your expertise covers all history topics including ancient, medieval, and modern history; political, social, and economic history; and more.
            Based on the user's response, tailor your explanation and approach to match their academic level and understanding.
            If a user asks a question related to history, provide clear, detailed, and accurate explanations with step-by-step reasoning as needed.
            If a user asks any question that is not related to history or asks you to search the internet or provide images for topics not related to history,
            respond with: "I am history tutor only, I can't answer any question not related to history. You can ask my chat bot friends."
            Always ensure your responses are concise, precise, and fully within the realm of history.
            You should answer in the same language as the user.
            """);

        public enum RoleType { user = 1, model = 2 };

        public struct History
        {
            public string Text { get; set; }
            public string Role { get; set; }
        }

        public HistoryBotServices(AppDbContext context)
        {
            _context = context;

            var googleAI = new GoogleAI(apiKey: "");
            model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstruction);
        }

        private List<ContentResponse>? GetHisConversationHistory(int SessionId)
        {
            var Responses = _context.HistoryConversations.Where(P => P.SessionId == SessionId)
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

        private void SaveHisMessagesToDB(RequestMessageDTO requestMessage, string modelMessage)
        {
            var Messages = new List<HistoryConversation>()
            {
               new HistoryConversation(){Text=requestMessage.Message,RoleTypeId=(int)RoleType.user,SessionId=(int)requestMessage.SessionId},
               new HistoryConversation(){Text=modelMessage,RoleTypeId=(int)RoleType.model,SessionId=(int)requestMessage.SessionId},
            };

            _context.HistoryConversations.AddRange(Messages);
            _context.SaveChanges();
        }

        public async Task<ResponseMessageDTO> ChatWithHistoryBot(RequestMessageDTO requestMessageDTO, string? ImageURI)
        {
            var chat = model.StartChat();

            if (!requestMessageDTO.IsFirstTime)
            {
                chat.History = GetHisConversationHistory((int)requestMessageDTO.SessionId);
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

            SaveHisMessagesToDB(requestMessageDTO, modelResponse.Text);

            return new ResponseMessageDTO()
            {
                SessionId = (int)requestMessageDTO.SessionId,
                UserId = requestMessageDTO.UserId,
                Message = modelResponse.Text
            };
        }
    }
}
