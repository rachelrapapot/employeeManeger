using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IEmployRepositories
    {
        public Task<IEnumerable<Employee>> GetAsync();
        public Task<Employee> AddAsync(Employee employee);
        public Task DeleteAsync(int id);
     
        public Employee GetById(int id);
        public Task<Employee> UpdateAsync(int id, Employee employee);
        public Employee GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword);
    }
}
