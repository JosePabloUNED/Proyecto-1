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
    public class BudgetController : ControllerBase
    {
        private readonly UserManager<Tbfpuser> _userManager;
        private readonly FinanzasPersonalesContext _context;

        public BudgetController(UserManager<Tbfpuser> userManager, FinanzasPersonalesContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost("CreateBudget")]
        public async Task<IActionResult> CreateBudget([FromBody] CreateBudgetModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data", Errors = ModelState });
            }

            var user = await _userManager.GetUserAsync(User);

            if (user == null)
            {
                return Unauthorized(new { Message = "User not authenticated" });
            }

            var budget = new Tbfpbudget
            {
                IdUser = user.Id,
                IdCategory = model.IdCategory,
                Period = model.Period,
                Amount = model.Amount
            };

            try
            {
                _context.Tbfpbudgets.Add(budget);
                await _context.SaveChangesAsync();
                return Ok(new { Message = "Budget created successfully", BudgetId = budget.IdBudget });
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error saving budget: {ex.Message}");
                return StatusCode(500, $"Error saving budget: {ex.Message}");
            }
        }

        public static class UserSession
        {
            public static int? UserId { get; set; }
        }

        public class CreateBudgetModel
        {
            public int IdCategory { get; set; }
            public string Period { get; set; }
            public decimal Amount { get; set; }
        }
    }
}