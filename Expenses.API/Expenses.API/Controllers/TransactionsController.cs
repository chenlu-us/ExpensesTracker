using Expenses.API.Data;
using Expenses.API.Data.Services;
using Expenses.API.Dtos;
using Expenses.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Expenses.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    [Authorize]
    public class TransactionsController(ITransactionsService service) : ControllerBase
    {
        [HttpGet("All")]
        public IActionResult GetAll()
        {
            return Ok(service.GetAll(GetUserIdFromClaims()));
        }
        [HttpGet("Details/{id}")]
        public IActionResult Get(int id)
        {
            var transaction = service.GetById(id);
            if (transaction == null)
                return NotFound();
            return Ok(transaction);
        }

        [HttpPost("Create")]
        public IActionResult CreateTransaction([FromBody] PostTransactionDto payload)
        {
            return Ok(service.Add(payload, GetUserIdFromClaims()));
        }

        [HttpPut("Update/{id}")]
        public IActionResult UpdateTransaction(int id, [FromBody] PutTransactionDto payload)
        {
            var transaction = service.Update(id, payload);
            if (transaction == null)
                return NotFound();
            return Ok(transaction);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult DeleteTransaction(int id)
        {
            service.Delete(id);
            return Ok();
        }

        private int GetUserIdFromClaims()
        {
            var nameIdentifierClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(nameIdentifierClaim))
                throw new Exception("Could not get the user id.");
            if (!int.TryParse(nameIdentifierClaim, out int userId))
                throw new Exception("Invalid user id.");
            return userId;
        }
    }
}
