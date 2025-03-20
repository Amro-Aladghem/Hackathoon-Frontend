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
    public class PhysicsBotServices
    {
        public readonly AppDbContext _context;

        private GenerativeModel model;

        private Content systemInstruction = new Content("""
            You are a specialized physics tutor chatbot designed solely to assist students with physics.
            Your expertise covers all physics topics including mechanics, electromagnetism, thermodynamics, quantum physics, relativity, and more.
            When a conversation starts and before answering any physics-related question, ask the user for:
            1. Their school level (e.g., elementary, middle school, high school, or college).
            2. Their average grade or performance level in school.
            Based on the user's response, tailor your explanation and approach to match their academic level and understanding.
            If a user asks a question related to physics, provide clear, detailed, and accurate explanations with step-by-step reasoning as needed.
            If a user asks any question that is not related to physics or asks you to search the internet or provide images for topics not related to physics,
            If a user asks question not very related in physics and related in filed like chemistry or bio  
            respond with: "I am physics tutor only, I can't answer any question not related to physics. You can ask my chat bot friends."
            Always ensure your responses are concise, precise, and fully within the realm of physics.
            You should answer in the same language as the user.
            """);

        public enum RoleType { user = 1, model = 2 };

        public struct History
        {
            public string Text { get; set; }
            public string Role { get; set; }
        }

        public PhysicsBotServices(AppDbContext context)
        {
            _context = context;

            var googleAI = new GoogleAI(apiKey: "");
            model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental, systemInstruction: systemInstruction);
        }

        private List<ContentResponse>? GetPhyConversationHistory(int SessionId)
        {
            var Responses = _context.PhysicsConversations.Where(P => P.SessionId == SessionId)
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

        private void SavePhMessagesToDB(RequestMessageDTO requestMessage,string modelMessage)
        {
            var Messages = new List<PhysicsConversation>()
            {
               new PhysicsConversation(){Text=requestMessage.Message,RoleTypeId=(int)RoleType.user,SessionId=(int)requestMessage.SessionId},
               new PhysicsConversation(){Text=modelMessage,RoleTypeId=(int)RoleType.model,SessionId=(int)requestMessage.SessionId},
            };

            _context.PhysicsConversations.AddRange(Messages);
            _context.SaveChanges();
        }

        public async Task<ResponseMessageDTO> ChatWithPhysicsBot(RequestMessageDTO requestMessageDTO, string? ImageURI)
        {
            var chat = model.StartChat();

            if (!requestMessageDTO.IsFirstTime)
            {
                chat.History = GetPhyConversationHistory((int)requestMessageDTO.SessionId);
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

            SavePhMessagesToDB(requestMessageDTO, modelResponse.Text);

            return new ResponseMessageDTO()
            {
                SessionId = (int)requestMessageDTO.SessionId,
                UserId = requestMessageDTO.UserId,
                Message = modelResponse.Text
            };
        }



    }
}
