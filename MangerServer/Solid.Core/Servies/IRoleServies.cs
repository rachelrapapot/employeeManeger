using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Servies
{
    public interface IRoleServies
    {
        List<Role> GetRolls();
        Role GetById(int id);

        Task<Role> AddAsync(Role role);

        Task<Role> UpdateAsync(int id, Role role);

        Task DeleteAsync(int id);
    }
}
