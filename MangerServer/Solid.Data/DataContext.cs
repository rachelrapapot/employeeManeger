using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> employee{get;set;}
        public DbSet<Role> roles { get; set; }

        public DbSet<RoleWorker> rolesWorker { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=employee");
        }

    }
}
