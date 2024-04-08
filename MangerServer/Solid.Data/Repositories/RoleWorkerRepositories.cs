using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class RoleWorkerRepositories: IRoleWorkerRepositories
    {
        private readonly DataContext _context;

        public RoleWorkerRepositories(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<RoleWorker> AddAsync(RoleWorker roll)
        {
            _context.rolesWorker.Add(roll);
            await _context.SaveChangesAsync();
            return roll;
        }

        public async Task DeleteAsync(int id)
        {
            var roll = GetById(id);
            _context.rolesWorker.Remove(roll);
            await _context.SaveChangesAsync();
        }

        public List<RoleWorker> GetAllRollsWorkers()
        {
            return _context.rolesWorker.ToList();
        }

        public RoleWorker GetById(int id)
        {
            return _context.rolesWorker.Find(id);
        }

        public async Task<RoleWorker> UpdateAsync(int id, RoleWorker role)
        {
            var exist = GetById(id);

            exist.DateOfStart = role.DateOfStart;
            exist.IdRole = role.IdRole;
            exist.Role = role.Role;
            exist.IdEmployee = role.IdEmployee;
            exist.Employee = role.Employee;
            await _context.SaveChangesAsync();
            return exist;
        }
    }
}
