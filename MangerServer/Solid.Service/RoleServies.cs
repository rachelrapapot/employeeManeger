using Solid.Core.Repositories;
using Solid.Core.Servies;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class RoleServies:IRoleServies
    {
        private readonly IRoleRepositories _IRoleRepositories;
        public RoleServies(IRoleRepositories RoolRepositories)
        {
            _IRoleRepositories = RoolRepositories;
        }

        public async Task<Role> AddAsync(Role role)
        {
            return await _IRoleRepositories.AddAsync(role);
        }

        public async Task DeleteAsync(int id)
        {
            _IRoleRepositories.DeleteAsync(id);
        }

        public Role GetById(int id)
        {
            return _IRoleRepositories.GetById(id);
        }

        public List<Role> GetRolls()
        {
            return _IRoleRepositories.GetAllRolls();
        }

        public Task<Role> UpdateAsync(int id, Role role)
        {

            return _IRoleRepositories.UpdateAsync(id, role);
        }
    }
}
