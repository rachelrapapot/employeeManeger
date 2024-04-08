using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IRoleRepositories
    {
        Task<Role> AddAsync(Role roll);
        Task DeleteAsync(int id);
        List<Role> GetAllRolls();
        Role GetById(int id);
        Task<Role> UpdateAsync(int id, Role role);
    }
}
