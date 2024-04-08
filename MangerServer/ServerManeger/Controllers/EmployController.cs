using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServerManeger.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Servies;
using Solid.Data.Entities;
using Solid.Data.Repositories;
using System.Collections.Generic;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerManeger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployController : ControllerBase
    {
        // GET: api/<EmployController>
        private IEmployServies _employServies;
        private readonly IMapper _mapping;
        private readonly IRoleServies _RoleService;
        private readonly IRoleWorkerRepositories _RoleWorkerService;
        public EmployController(IEmployServies employServies, IMapper mapping, IRoleServies roleService, IRoleWorkerRepositories RoleWorkerService)
        {
            _employServies = employServies;
            _mapping = mapping;
            _RoleService = roleService;
            _RoleWorkerService= RoleWorkerService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> Get()
        {
            var list = await _employServies.GetAllAsync();
            var list1 = list.Select(d => _mapping.Map<EmployDTOs>(d));
            return Ok(list1);
        }
        // GET api/<EmployController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var employ = _employServies.GetById(id);
            if (employ is null)
            {
                return NotFound();
            }
            var employee = _mapping.Map<EmployDTOs>(employ);
            return Ok(employee);
        }
        // POST api/<EmployController>
        [HttpPost]    
        public  IActionResult Post([FromBody] EmployModels value)
        {
            var list = new List<RoleWorker>();
            foreach (var role in value.Roles)
            {
                var r =  _RoleService.GetById(role.IdRole);
                if (r is null)
                {
                    return NotFound();
                }
                RoleWorker e = new RoleWorker();
              
                e.Role = r;
                e.IdRole = role.IdRole;
                e.DateOfStart = role.DateOfStart;
                list.Add(e);
            }
            var employee = _mapping.Map<Employee>(value);
            employee.Roles = list;
            _employServies.AddAsync(employee);
            var employee2 = _mapping.Map<EmployDTOs>(employee);
           
            return Ok(employee2);
        }
        // PUT api/<EmployController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployModels employee)
        {
            foreach (var k in _RoleWorkerService.GetAllRollsWorkers())
            {
                foreach (var role in employee.Roles)
                {
                    if (k.IdRole == role.IdRole)
                        _RoleWorkerService.DeleteAsync(k.Id);
                }
            }
            var employeeM = _mapping.Map<Employee>(employee);  
            var list = new List<RoleWorker>();
            foreach (var role in employee.Roles)
            {
                var r = _RoleService.GetById(role.IdRole);
                if (r is null)
                {
                    return NotFound();
                }
                RoleWorker e = new RoleWorker();

                e.Role = r;
                e.IdRole = role.IdRole;
                e.DateOfStart = role.DateOfStart;
                list.Add(e);
            }       
            employeeM.Roles = list;
            Console.WriteLine("yes");
            var res =await _employServies.UpdateAsync(id, employeeM);
            Console.WriteLine("iiiii");
            var employee2 = _mapping.Map<EmployDTOs>(res);
            return Ok(employee2);
        }
       // DELETE api/<EmployController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employServies.DeleteAsync(id);
        }
    }
}
