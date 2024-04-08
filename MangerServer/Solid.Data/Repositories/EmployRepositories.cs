using Microsoft.EntityFrameworkCore;
using Solid.Core.Repositories;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class EmployRepositories:IEmployRepositories
    {
        private readonly DataContext _context;
      
        public EmployRepositories(DataContext dataContext)
        {
            _context = dataContext;
           
        }

        public async Task<Employee> AddAsync(Employee employ)
        {
            _context.employee.Add(employ);
            await _context.SaveChangesAsync();
            return employ;
        }

        public async Task DeleteAsync(int id)
        {
            Employee temp = await _context.employee.FindAsync(id);
            Console.WriteLine(temp.FirstName);
            Console.WriteLine(temp.Status);
            if (temp == null)
                return;
            temp.Status = Status.Inactive;
            Console.WriteLine(temp.Status);

            await _context.SaveChangesAsync();
        }

        //public  List<Employee> GetAllEmploies()
        //{
        //    return  _context.employee.Include(e => e.Roles).ToList();
        //}
        public async Task<IEnumerable<Employee>> GetAsync()
        {
            var list = await _context.employee.Include(x => x.Roles).ThenInclude(role => role.Role).ToListAsync();
            return list;
        }

        public Employee GetById(int id)
        {
            return  _context.employee.ToList().Find(e=>e.Id==id);
        }
        public async Task<Employee> UpdateAsync(int id, Employee employ)
        {
            var existEmployee = await _context.employee.FindAsync(id);


            //_context.Entry(existEmployee).CurrentValues.SetValues(employ);
            //_context.Entry(existEmployee).Collection(e => e.Roles).CurrentValue = employ.Roles;

            //await _context.SaveChangesAsync();
            //employ.Roles.ForEach(x => {
            //    _RoleWorkerService.DeleteAsync(x.Id);
            //});
            if (existEmployee != null)
            {
                existEmployee.Status = employ.Status;
                existEmployee.FirstName = employ.FirstName;
                existEmployee.LastName = employ.LastName;
                existEmployee.DateOfBirth = employ.DateOfBirth;
                existEmployee.DateOfStart = employ.DateOfStart;
                existEmployee.Roles = employ.Roles;
                existEmployee.Gender = employ.Gender;
                existEmployee.TZ = employ.TZ;

                await _context.SaveChangesAsync();
            }

            return existEmployee;
           
       
         
         
        }
    
        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return _context.employee.FirstOrDefault(e => e.FirstName == employeeFirstName && e.LastName == employeeLastName && e.Password == employeePassword);
        }

      

      
    }
}
