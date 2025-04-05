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
    public class TransactionController : ControllerBase
    {
        private readonly FinanzasPersonalesContext _dbContext;

        public TransactionController(FinanzasPersonalesContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("CreateTransaction")]
        public async Task<IActionResult> CreateTransaction([FromBody] CreateTransactionModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data", Errors = ModelState });
            }

            var tran = new Tbfptransaction
            {
                IdAccount = model.IdAccount,
                TypeTran = model.TypeTran, // Updated from TypeAccount
                IdCategory = model.IdCategory,
                Amount = model.Amount,
                DateTransaction = DateTime.UtcNow,
                DescriptionTran = model.DescriptionTran // Updated from Description
            };

            try
            {
                _dbContext.Tbfptransactions.Add(tran);
                await _dbContext.SaveChangesAsync();
                return Ok(new { Message = "Transaction created successfully" });
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, $"Error saving transaction: {ex.Message}");
            }
        }

            // GET: api/Transaction
            [HttpGet("GetTransactions")]
        public async Task<IActionResult> GetTransactions()
        {
            try
            {
                var transactions = await _dbContext.Set<Tbfptransaction>()
                                                   .Include(t => t.IdAccountNavigation)
                                                   .Include(t => t.IdCategoryNavigation)
                                                   .ToListAsync();
                return Ok(transactions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener las transacciones: {ex.Message}");
            }
        }

        [HttpGet("GetUserAccounts/{userId}")]
        public async Task<IActionResult> GetUserAccounts(int userId)
        {
            var accounts = await _dbContext.Tbfpaccounts.Where(a => a.IdUser == userId).ToListAsync();
            if (accounts == null || !accounts.Any())
            {
                return NotFound("No accounts found for this user.");
            }
            return Ok(accounts);
        }


        [HttpGet("GetCategory")]
        public async Task<IActionResult> GetCategory()
        {
            var cat = await _dbContext.Tbfpcategories.ToListAsync();
            if (cat == null || !cat.Any())
            {
                return NotFound("No categories found for this user.");
            }
            return Ok(cat);
        }


        public class CreateTransactionModel
        {
            public string IdAccount { get; set; }
            public string TypeTran { get; set; } // Updated from TypeAccount
            public int IdCategory { get; set; }
            public decimal Amount { get; set; }
            public string DescriptionTran { get; set; } // Updated from Description
        }


    }

    //[HttpGet("GetUserTransactions/{userId}")]
    //    public async Task<IActionResult> GetUserTransactions(int userId)
    //    {
    //        var transactions = await _context.Tbfptransactions
    //            .Where(t => t.IdAccountNavigation.IdUser == userId)
    //            .ToListAsync();
    //        return Ok(transactions);
    //    }
    }
