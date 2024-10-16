using Microsoft.EntityFrameworkCore;

namespace React_Crud_Api.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }

        public DbSet<dataModel> Students { get; set; }
    }
}
