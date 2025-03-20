using Database.Entities;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mscc.GenerativeAI;
using System.Numerics;
using DTOs.ChatDTOs;
using Microsoft.Identity.Client;

namespace Services
{
    public class MathBotServices
    {
        public readonly AppDbContext _context;

        private GenerativeModel model;

        private Content systemInstruction = new Content("""
             You are a specialized math tutor chatbot designed solely to assist students with mathematics.
             Your expertise covers all mathematical topics including algebra, calculus, geometry, statistics, and more.
             When a conversation starts and before answering any math-related question, ask the user for:
             1. Their school level (e.g., elementary, middle school, high school, or college).
             2. Their average grade or performance level in school.
             Based on the user's response, tailor your explanation and approach to match their academic level and understanding.
             If a user asks a question related to math, provide clear, detailed, and accurate explanations with step-by-step reasoning as needed.
             If a user asks any question that is not related to mathematics or
             If a user ask you to search on internet somthing not related to the math or image not related to the math
             respond with: "I am math tutor only, I can't answer any question not related to mathematics. You can ask my chat bot friends.",
             If a uesr provide you with Image related to the math answer him
             Always ensure your responses are concise, precise, and fully within the realm of mathematics.
             You should answer in the same language as the user ;
            """);

        public enum RoleType { user = 1, model = 2 };

        public struct History
        {
            public string Text { get; set; }
            public string Role { get; set; }
        }

        public MathBotServices(AppDbContext context)
        {
            _context = context;

            var googleAI = new GoogleAI(apiKey: "");
            model = googleAI.GenerativeModel(model: Model.Gemini20FlashExperimental,systemInstruction:systemInstruction);
        }

        public List<ContentResponse>? GetMathConversationHistory(int SesstionId)
        {

            var Responses = _context.MathConversations.Where(MC => MC.SessionId == SesstionId)
                                                      .Select(MC => new History()
                                                      {
                                                          Text = MC.Text,
                                                          Role = MC.RoleTypeId == 1 ? "user" : "model"
                                                      }
                                                      )
                                                      .ToList();

            if (Responses is null || Responses.Count == 0)
                return null;


            List<ContentResponse> ConversationsHistory = Responses
            .Select(Response => new ContentResponse(text: Response.Text, role: Response.Role))
            .ToList();

            return ConversationsHistory;
        }

        private void SaveMessagesToDB(RequestMessageDTO messageDTO, string ModelMessage)
        {
            var newMessages = new List<MathConversation>()
            {
                new MathConversation{Text=messageDTO.Message,RoleTypeId=(int)RoleType.user,SessionId=(int)messageDTO.SessionId},
                new MathConversation{Text=ModelMessage,RoleTypeId=(int)RoleType.model,SessionId=(int)messageDTO.SessionId},
            };

            _context.MathConversations.AddRange(newMessages);

            _context.SaveChanges();
        }

        public async Task<ResponseMessageDTO> ChatWithMathBot (RequestMessageDTO requestMessageDTO,string? ImageURI)
        {
            var chat = model.StartChat();

            if(!requestMessageDTO.IsFirstTime)
            {
                chat.History = GetMathConversationHistory((int)requestMessageDTO.SessionId);
            }

            var request = new GenerateContentRequest(requestMessageDTO.Message);

            if(!string.IsNullOrEmpty(ImageURI))
            {
                await request.AddMedia(ImageURI);
            }

            var modelResponse = await chat.SendMessage(request);

            if(string.IsNullOrEmpty(modelResponse.Text))
            {
               new Exception("Faild to get response");
            }

            SaveMessagesToDB(requestMessageDTO, modelResponse.Text);

            return new ResponseMessageDTO()
            {
                SessionId = (int)requestMessageDTO.SessionId,
                UserId = requestMessageDTO.UserId,
                Message = modelResponse.Text
            };
        }
            

    }
}
