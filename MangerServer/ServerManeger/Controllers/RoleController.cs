using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ServerManeger.Models;
using Solid.Core.Entities;
using Solid.Core.Servies;
using Solid.Data.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerManeger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private IRoleServies _IRoleServies;
        private readonly IMapper _mapping;
        public RoleController(IRoleServies IRoleServies, IMapper mapping)
        {
            _IRoleServies = IRoleServies;
            _mapping = mapping;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_IRoleServies.GetRolls());
        }

        // GET api/<EmployController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var role = _IRoleServies.GetById(id);
            if (role is null)
            {
                return NotFound();
            }
            return Ok(role);
        }

        // POST api/<EmployController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RoleModels role)
        {
            var roleM = _mapping.Map<Role>(role);
            var res = await _IRoleServies.AddAsync(roleM);
            return res != null ? Ok(res) : NotFound("התפקיד כבר קיים");

        }

        // PUT api/<EmployController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] RoleModels role)
        {
            var roleW = _mapping.Map<Role>(role);

            return Ok(_IRoleServies.UpdateAsync(id, roleW));

        }

        // DELETE api/<EmployController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _IRoleServies.DeleteAsync(id);
        }
    }
}
