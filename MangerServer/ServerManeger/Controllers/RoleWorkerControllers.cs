using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ServerManeger.Models;
using Solid.Core.Entities;
using Solid.Core.Servies;
using Solid.Data.Entities;
using Solid.Service;

namespace ServerManeger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleWorkerControllers:ControllerBase
    {

        private IRoleWorkerServies _IRoleWorkerServies;
        private readonly IMapper _mapping;
        public RoleWorkerControllers(IRoleWorkerServies IRoleWorkerServies, IMapper mapping)
        {
            _IRoleWorkerServies = IRoleWorkerServies;
            _mapping = mapping;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_IRoleWorkerServies.GetRollsWorkers());
        }

        // GET api/<EmployController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var role = _IRoleWorkerServies.GetById(id);
            if (role is null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        // POST api/<EmployController>
        [HttpPost]
        public IActionResult Post([FromBody] RoleWorkerModel role)
        {
            var roleW = _mapping.Map<RoleWorker>(role);
            return Ok(_IRoleWorkerServies.AddAsync(roleW));

        }

        // PUT api/<EmployController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] RoleWorkerModel role)
        {
            var roleW = _mapping.Map<RoleWorker>(role);

            return Ok(_IRoleWorkerServies.UpdateAsync(id, roleW));

        }

        // DELETE api/<EmployController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _IRoleWorkerServies.DeleteAsync(id);
        }
    }
}
