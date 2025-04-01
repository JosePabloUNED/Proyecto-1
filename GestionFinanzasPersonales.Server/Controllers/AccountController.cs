using GestionFinanzasPersonales.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GestionFinanzasPersonales.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Tbfpuser> _userManager;
        private readonly FinanzasPersonalesContext _context;

        public AccountController(UserManager<Tbfpuser> userManager, FinanzasPersonalesContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data", Errors = ModelState });
            }

            var user = new Tbfpuser
            {
                UserName = model.UserName,
                Email = model.Email,
                DateRegistration = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "User registered successfully" });
            }

            return BadRequest(new { Message = "Registration failed", Errors = result.Errors });
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data", Errors = ModelState });
            }

            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { Message = "Email and Password cannot be empty" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized(new { Message = "User not found" });
            }

            var passwordValid = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return Unauthorized(new { Message = "Invalid password" });
            }

            UserSession.UserId = user.Id;


            // Generate a token (for simplicity, using a dummy token here)
            var token = "dummy-token";

            return Ok(new { Message = "Login successful", Token = token, UserId = user.Id });

        }

        [HttpPost("CreateAccount")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data", Errors = ModelState });
            }

            var userId = UserSession.UserId;

            if (userId == null)
            {
                return Unauthorized(new { Message = "User not authenticated" });
            }

            // Generate the Account ID in the desired format
            var accountId = $"CR1-{new Random().Next(1000, 9999)}-{new Random().Next(1000, 9999)}";

            var account = new Tbfpaccount
            {
                IdAccount = accountId,
                IdUser = (int)userId, // Explicit cast from int? to int
                NameAccount = model.NameAccount,
                TypeAccount = model.TypeAccount,
                InitialBalance = model.InitialBalance,
                DateCreation = DateTime.UtcNow
            };

            try
            {
                _context.Tbfpaccounts.Add(account);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Account created successfully", AccountId = account.IdAccount });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error saving account: {ex.Message}");
                return StatusCode(500, $"Error saving account: {ex.Message}");
            }
        }




    }

    public static class UserSession
    {
        public static int? UserId { get; set; }
    }

    public class RegisterModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class CreateAccountModel
    {
        public string NameAccount { get; set; }
        public string TypeAccount { get; set; }
        public decimal InitialBalance { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
