using Expenses.API.Dtos;
using Expenses.API.Models;

namespace Expenses.API.Data.Services
{
    public interface ITransactionsService
    {
        List<Transaction> GetAll(int userId);
        Transaction? GetById(int id);
        void Delete(int id);
        Transaction Add(PostTransactionDto transaction, int userId);
        Transaction? Update(int id, PutTransactionDto transaction);    
    }
    public class TransactionsServicer(AppDbContext context) : ITransactionsService
    {
        public Transaction Add(PostTransactionDto transaction, int userId)
        {
            var newTranaction = new Transaction
            {
                Type = transaction.Type,
                Amount = transaction.Amount,
                Category = transaction.Category,
                CreatedAt = transaction.CreatedAt,
                UpdatedAt = DateTime.UtcNow,
                UserId = userId
            };

            context.Transactions.Add(newTranaction);
            context.SaveChanges();

            return newTranaction;
        }

        public void Delete(int id)
        {
            var transaction = context.Transactions.FirstOrDefault(x => x.Id == id);
            if (transaction != null)
            {
                context.Transactions.Remove(transaction);
                context.SaveChanges(true);
            }           
        }

        public List<Transaction> GetAll(int userId)
        {
            return context.Transactions.Where(n => n.UserId == userId).ToList();
        }

        public Transaction? GetById(int id)
        {
            var transaction = context.Transactions.FirstOrDefault(x => x.Id == id);
            return transaction;
        }

        public Transaction? Update(int id, PutTransactionDto payload)
        {
            var transaction = context.Transactions.FirstOrDefault(x => x.Id == id);
            if (transaction != null)
            {
                transaction.Type = payload.Type;
                transaction.Amount = payload.Amount;
                transaction.Category = payload.Category;
                transaction.UpdatedAt = DateTime.UtcNow;

                context.Transactions.Update(transaction);
                context.SaveChanges();                
            }
            return transaction;

        }
    }
}
