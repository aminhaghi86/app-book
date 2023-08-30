using System.Text.RegularExpressions;
using System.Text;
using AngularAuthYtAPI.Helpers;
using Books.API.Data;
using Books.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Books.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;
        public UserController(UserDbContext userDbContext) { 
        
        _userDbContext = userDbContext;
        
        }
 [HttpPost("authenticate")]
public async Task<IActionResult> Authenticate([FromBody] User userObj)
{
    if (userObj == null)
        return BadRequest();

    var user = await _userDbContext.Users
        .FirstOrDefaultAsync(x => x.Username == userObj.Username);

    if (user == null)
        return NotFound(new { message = "User Not Found" });

    // Debugging statements
    Console.WriteLine($"Input Password: {userObj.Password}");
    Console.WriteLine($"Hashed Password: {user.Password}");
    
    if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
    {
        return BadRequest(new
        {
            Message = "Password is Incorrect"
        });
    }
    
    user.Token = CreateJwt(user);
    
    return Ok(new
    {
        Token = user.Token,
        Message = "Login Success!!"
    });
}


        [HttpPost("register")]
        public async  Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();
            // check email
            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exist" });

            //check username
            if (await CheckUsernameExistAsync(userObj.Username))
                return BadRequest(new { Message = "Username Already Exist" });

            var passMessage = CheckPasswordStrength(userObj.Password);
            if (!string.IsNullOrEmpty(passMessage))
                return BadRequest(new { Message = passMessage.ToString() });
            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "User";
            userObj.Token = "";
                 await _userDbContext.Users.AddAsync(userObj);
            await _userDbContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            }
            );
              
        }
        private Task<bool> CheckEmailExistAsync(string? email)
            => _userDbContext.Users.AnyAsync(x => x.Email == email);

        private Task<bool> CheckUsernameExistAsync(string? username)
            => _userDbContext.Users.AnyAsync(x => x.Email == username);

        private static string CheckPasswordStrength(string pass)
        {
            StringBuilder sb = new StringBuilder();
            if (pass.Length < 9)
                sb.Append("Minimum password length should be 8" + Environment.NewLine);
            if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
                sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
            if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
                sb.Append("Password should contain special charcter" + Environment.NewLine);
            return sb.ToString();
        }

        private string CreateJwt(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Name,$"{user.Username}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
        
         
    }
}
