using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployDTOs
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
       
        public List<RoleWorkerDTo> Roles { get; set; }

    }
}
