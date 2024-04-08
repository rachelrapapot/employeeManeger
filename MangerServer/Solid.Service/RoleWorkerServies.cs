using Solid.Core.Entities;
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
    public class RoleWorkerServies:IRoleWorkerServies
    {
        private readonly IRoleWorkerRepositories _IRoleWorkerRepositories;
        public RoleWorkerServies(IRoleWorkerRepositories RoleWorkerRepositories)
        {
            _IRoleWorkerRepositories = RoleWorkerRepositories;
        }

        public async Task<RoleWorker> AddAsync(RoleWorker roleWorker)
        {
            return await _IRoleWorkerRepositories.AddAsync(roleWorker);
        }

        public async Task DeleteAsync(int id)
        {
            _IRoleWorkerRepositories.DeleteAsync(id);
        }

        public RoleWorker GetById(int id)
        {
            return _IRoleWorkerRepositories.GetById(id);
        }

        public List<RoleWorker> GetRollsWorkers()
        {
            return _IRoleWorkerRepositories.GetAllRollsWorkers();
        }

        public Task<RoleWorker> UpdateAsync(int id, RoleWorker role)
        {

            return _IRoleWorkerRepositories.UpdateAsync(id, role);
        }
    }
}
