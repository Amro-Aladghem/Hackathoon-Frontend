using DTOs;
using DTOs.ChatDTOs;
using DTOs.ReviewDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Services;

namespace SalamHackAPI.Controllers
{
    [Route("api/v1/tools")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        private readonly SharedServices _sharedServices;
        private readonly TableTimeServices _tableTimeServices;
        private readonly ExamMakerService _examMakerService;
        private readonly ReviewQuestionsServices _reviewQuestionsService;       


        public ToolsController(SharedServices sharedServices, TableTimeServices tableTimeServices,ExamMakerService examMakerService,ReviewQuestionsServices reviewQuestionsServices)
        {
            _sharedServices = sharedServices;
            _tableTimeServices = tableTimeServices;
            _examMakerService=examMakerService;
            _reviewQuestionsService = reviewQuestionsServices;
        }


        [HttpPost("timetable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> GenerateTimeTable([FromForm]TimeTableRequestDTO requestDTO, IFormFile file)
        {
            try
            {
                string fileUrl = "";

                using (var stream = file.OpenReadStream())
                {
                    string FileName = file.FileName;

                    fileUrl = await _sharedServices.UploadFilesAsync(stream, FileName);
                }

                string htmlCode = await _tableTimeServices.GenerateTheTimeTable(fileUrl, requestDTO);

                return Ok(new { htmlCode });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Server Error,Faild to generate table!" });
            }
        }


        [HttpPost("quizmaker")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> GenerateQuiz([FromForm]ExamRequestDTO requestDTO,IFormFile file)
        {
            try
            {
                string fileUrl = "";

                using (var stream = file.OpenReadStream())
                {
                    string FileName = file.FileName;

                    fileUrl = await _sharedServices.UploadFilesAsync(stream, FileName);
                }

                var result = await _examMakerService.GenerateExam(fileUrl,requestDTO);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Server Error,Faild to generate exam!" });
            }
        }

        [HttpPost("review")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> GenereateReviewQuestions([FromForm] QuestionsRequestDTO requestDTO)
        {
            if (string.IsNullOrEmpty(requestDTO.OccupationName))
                return BadRequest(new { message = "You must enter the OccupationName" });

            try
            {
                int SessionId = _sharedServices.AddNewSession(null);

                var Questions = _reviewQuestionsService.GenerateQuestions(requestDTO, SessionId);

                return Ok(new { Questions,SessionId });
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = ex.Message});
            }
        }

        [HttpPost("review/result")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public IActionResult GetReviewQuestionResult([FromBody] ReviewRequestDTO reviewRequestDTO)
        {
            if (reviewRequestDTO is null)
                return BadRequest(new { message = "No data!!" });

            try
            {
                var ReviewResult = _reviewQuestionsService.GetPercentageResult(reviewRequestDTO);

                return Ok(new { ReviewResult });
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }


    }
}
