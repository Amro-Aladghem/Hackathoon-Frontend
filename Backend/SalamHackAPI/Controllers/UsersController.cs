using DTOs.UserDTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace SalamHackAPI.Controllers
{
    [Route("api/v1/user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public readonly UserServices _userServices;
        public readonly TokenServices _tokenServices;

        public UsersController(UserServices userServices,TokenServices tokenServices)
        {
            _userServices = userServices;
            _tokenServices = tokenServices;
        }

        [HttpGet("test")]
        public IActionResult test()
        {
            return Ok(new { message = "very good!" });
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public IActionResult Login([FromForm] UserLoginDTO userLoginDTO)
        {
            if (string.IsNullOrEmpty(userLoginDTO.password) || string.IsNullOrEmpty(userLoginDTO.email))
                return BadRequest(new { message = "Invalied or empty values!" });

            try
            {
                var user = _userServices.Login(userLoginDTO);

                if (user is null)
                    return Unauthorized(new { message = "Invalied Email or Password" });

                var token = _tokenServices.CreateNewToken(user.UserId, TokenServices.eUserType.User);

                return Ok(new { user, token });
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,new { message = "Failed to login,server error!" });
            }
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public IActionResult Register([FromForm] UserRegisterDTO userRegisterDTO)
        {
            if(string.IsNullOrEmpty(userRegisterDTO.Password) ||string.IsNullOrEmpty(userRegisterDTO.Email)
                ||string.IsNullOrEmpty(userRegisterDTO.FirstName) || string.IsNullOrEmpty(userRegisterDTO.LastName))
            {
                return BadRequest(new { message = "Invalied or empty values!" });
            }

            if(!_userServices.CheckIfEmailIsValied(userRegisterDTO.Email,false))
            {
                return BadRequest(new { message = "Email is not valied!" });
            }

            try
            {
                if(_userServices.IsEmailExistInDB(userRegisterDTO.Email))
                    return Conflict(new { message = "Email already exists" });

                var user = _userServices.Register(userRegisterDTO);

                if (user is null)
                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to register,Server Error!" });

                var token = _tokenServices.CreateNewToken(user.UserId, TokenServices.eUserType.User);

                return Ok(new { user, token });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Failed to register,Server Error!" });
            }
        }

    }
}
