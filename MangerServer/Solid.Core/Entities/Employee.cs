using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Entities
{
  
    public enum Gender
    {
        Male, Female
    }
    public enum Status
    {
        Active, Inactive
    }
  
    public class Employee
    { 

        public int Id { get; set; }
        public string TZ { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }
        public string Address { get; set; }
        public Status Status { get; set; }

        public Gender Gender { get; set; }

        public DateOnly DateOfStart { get; set; }

        public DateOnly DateOfBirth { get; set; }
       
        public List<RoleWorker> Roles { get; set; }
    }
}
