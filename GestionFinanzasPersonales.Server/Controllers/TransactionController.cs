using GestionFinanzasPersonales.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> CreateTransaction([FromBody] Tbfptransaction transaction)
        {
            if (transaction == null)
            {
                return BadRequest("Datos de transacción inválidos.");
            }

            // Validaciones adicionales si es necesario
            if (transaction.Amount <= 0)
            {
                return BadRequest("El monto debe ser mayor a cero.");
            }

            // Set the current date and time for the transaction
            transaction.DateTransaction = DateTime.Now;

            try
            {
                _dbContext.Add(transaction);
                await _dbContext.SaveChangesAsync();
                return Ok("Transacción registrada exitosamente.");
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error al guardar la transacción: {ex.Message}");
                return StatusCode(500, $"Error al guardar la transacción: {ex.Message}");
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
    }
}
