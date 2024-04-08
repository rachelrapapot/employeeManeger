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
    public class EmployServies:IEmployServies
    {
        private readonly IEmployRepositories _IEmployRepositories;
        public EmployServies(IEmployRepositories EmployRepositories)
        {
            _IEmployRepositories = EmployRepositories;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            // בדיקה אם יש תפקידים חוזרים על עצמם
            if (employee.Roles.GroupBy(role => role.IdRole).Any(group => group.Count() > 1))
            {
                throw new Exception("Error: Duplicate roles are not allowed.");
            }

            return await _IEmployRepositories.AddAsync(employee);
        }
  

        public async Task DeleteAsync(int id)
        {
            await _IEmployRepositories.DeleteAsync(id);
        }

        public Employee GetById(int id)
        {
            return _IEmployRepositories.GetById(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _IEmployRepositories.GetAsync();
        }


        public Task<Employee> UpdateAsync(int id, Employee employee)
        {
            // בדיקה אם יש תפקידים חוזרים על עצמם
            if (employee.Roles.GroupBy(role => role.IdRole).Any(group => group.Count() > 1))
            {
                throw new Exception("Error: Duplicate roles are not allowed.");
            }

            return _IEmployRepositories.UpdateAsync(id, employee);
        }

        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return _IEmployRepositories.GetByEmployeeNameAndPassword(employeeFirstName, employeeLastName, employeePassword);
        }
    }
}
