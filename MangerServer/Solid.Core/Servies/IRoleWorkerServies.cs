using Solid.Core.Entities;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Servies
{
    public interface IRoleWorkerServies
    {
        List<RoleWorker> GetRollsWorkers();
        RoleWorker GetById(int id);

        Task<RoleWorker> AddAsync(RoleWorker role);

        Task<RoleWorker> UpdateAsync(int id, RoleWorker role);

        Task DeleteAsync(int id);

    }
}
