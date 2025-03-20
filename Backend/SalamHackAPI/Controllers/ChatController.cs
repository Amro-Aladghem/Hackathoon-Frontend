using Database.Entities;
using DTOs.ChatDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace SalamHackAPI.Controllers
{
    [Route("api/v1/bot")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly MathBotServices _mathBotServices;
        private readonly PhysicsBotServices _physicsBotServices;
        private readonly SharedServices _sharedServices;
        private readonly ChemistryBotServices _chemistryBotServices;
        private readonly HistoryBotServices _historyBotServices;
        public ChatController(MathBotServices mathBotServices,SharedServices sharedServices,PhysicsBotServices physicsBotServices
                             ,ChemistryBotServices chemistryBotServices,HistoryBotServices historyBotServices)
        {
            _mathBotServices= mathBotServices;
            _sharedServices= sharedServices;
            _physicsBotServices= physicsBotServices;
            _chemistryBotServices= chemistryBotServices;
            _historyBotServices= historyBotServices;
        }

        [HttpPost("math")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<IActionResult> GetModelResponse([FromForm]RequestMessageDTO requestMessageDTO,IFormFile ? Image)
        {
            if (string.IsNullOrEmpty(requestMessageDTO.Message))
                return BadRequest(new { message = "you should send a message!" });

            if(!requestMessageDTO.IsFirstTime)
            {
                if(requestMessageDTO.SessionId is null || requestMessageDTO.SessionId<=0)
                {
                    return BadRequest(new { message = "when FirstTime is false, you must send valied SessionId" });
                }
            }

            try
            {
                string? ImageURI = null;

                if(requestMessageDTO.IsFirstTime)
                {
                    requestMessageDTO.SessionId = _sharedServices.AddNewSession(requestMessageDTO.UserId);
                }

                if(Image is not null)
                {
                    using (var stream = Image.OpenReadStream())
                    {
                        ImageURI = await _sharedServices.UploadImageAsync(stream, Image.FileName);
                    }
                }

                var ResponseMessageDTO = await _mathBotServices.ChatWithMathBot(requestMessageDTO, ImageURI);

                return Ok(new { ResponseMessageDTO });
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("physics")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetPhyModelResponse([FromForm]RequestMessageDTO requestMessageDTO, IFormFile? Image)
        {
            if (string.IsNullOrEmpty(requestMessageDTO.Message))
                return BadRequest(new { message = "you should send a message!" });

            if (!requestMessageDTO.IsFirstTime)
            {
                if (requestMessageDTO.SessionId is null || requestMessageDTO.SessionId <= 0)
                {
                    return BadRequest(new { message = "when FirstTime is false, you must send valied SessionId" });
                }
            }

            try
            {
                string? ImageURI = null;

                if (requestMessageDTO.IsFirstTime)
                {
                    requestMessageDTO.SessionId = _sharedServices.AddNewSession(requestMessageDTO.UserId);
                }

                if (Image is not null)
                {
                    using (var stream = Image.OpenReadStream())
                    {
                        ImageURI = await _sharedServices.UploadImageAsync(stream, Image.FileName);
                    }
                }

                var ResponseMessageDTO = await _physicsBotServices.ChatWithPhysicsBot(requestMessageDTO, ImageURI);

                return Ok(new { ResponseMessageDTO });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("chemistry")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetChemModelResponse([FromForm] RequestMessageDTO requestMessageDTO, IFormFile? Image)
        {
            if (string.IsNullOrEmpty(requestMessageDTO.Message))
                return BadRequest(new { message = "you should send a message!" });

            if (!requestMessageDTO.IsFirstTime)
            {
                if (requestMessageDTO.SessionId is null || requestMessageDTO.SessionId <= 0)
                {
                    return BadRequest(new { message = "when FirstTime is false, you must send valied SessionId" });
                }
            }

            try
            {
                string? ImageURI = null;

                if (requestMessageDTO.IsFirstTime)
                {
                    requestMessageDTO.SessionId = _sharedServices.AddNewSession(requestMessageDTO.UserId);
                }

                if (Image is not null)
                {
                    using (var stream = Image.OpenReadStream())
                    {
                        ImageURI = await _sharedServices.UploadImageAsync(stream, Image.FileName);
                    }
                }

                var ResponseMessageDTO = await _chemistryBotServices.ChatWithChemistryBot(requestMessageDTO, ImageURI);

                return Ok(new { ResponseMessageDTO });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }

        [HttpPost("history")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetHisModelResponse([FromForm] RequestMessageDTO requestMessageDTO, IFormFile? Image)
        {
            if (string.IsNullOrEmpty(requestMessageDTO.Message))
                return BadRequest(new { message = "you should send a message!" });

            if (!requestMessageDTO.IsFirstTime)
            {
                if (requestMessageDTO.SessionId is null || requestMessageDTO.SessionId <= 0)
                {
                    return BadRequest(new { message = "when FirstTime is false, you must send valied SessionId" });
                }
            }

            try
            {
                string? ImageURI = null;

                if (requestMessageDTO.IsFirstTime)
                {
                    requestMessageDTO.SessionId = _sharedServices.AddNewSession(requestMessageDTO.UserId);
                }

                if (Image is not null)
                {
                    using (var stream = Image.OpenReadStream())
                    {
                        ImageURI = await _sharedServices.UploadImageAsync(stream, Image.FileName);
                    }
                }

                var ResponseMessageDTO = await _historyBotServices.ChatWithHistoryBot(requestMessageDTO, ImageURI);

                return Ok(new { ResponseMessageDTO });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


    }
}
