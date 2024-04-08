using Solid.Core.Repositories;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class RoleRepositories: IRoleRepositories
    {
        private readonly DataContext _context;

        public RoleRepositories(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<Role> AddAsync(Role roll)
        {
            _context.roles.Add(roll);
            await _context.SaveChangesAsync();
            return roll;
        }

        public async Task DeleteAsync(int id)
        {
            var roll = GetById(id);
            _context.roles.Remove(roll);
            await _context.SaveChangesAsync();
        }

        public List<Role> GetAllRolls()
        {
            return _context.roles.ToList();
        }

        public Role GetById(int id)
        {
            return _context.roles.Find(id);
        }

        public async Task<Role> UpdateAsync(int id, Role role)
        {
            var exist = GetById(id);
            exist.Name = role.Name;
           
            exist.IsManegerial = role.IsManegerial;
        


            await _context.SaveChangesAsync();
            return exist;
            
        }
    }
}
