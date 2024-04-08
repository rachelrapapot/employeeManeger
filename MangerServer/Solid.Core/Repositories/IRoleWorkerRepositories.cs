using Solid.Core.Entities;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IRoleWorkerRepositories
    {
        Task<RoleWorker> AddAsync(RoleWorker roll);
        Task DeleteAsync(int id);
        List<RoleWorker> GetAllRollsWorkers();
        RoleWorker GetById(int id);
        Task<RoleWorker> UpdateAsync(int id, RoleWorker role);
    }
}
