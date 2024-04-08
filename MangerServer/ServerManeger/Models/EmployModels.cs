using Solid.Core.Entities;
using Solid.Data.Entities;

namespace ServerManeger.Models
{
    public class EmployModels
    {
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

        public List<RoleWorkerModel> Roles { get; set; }


    }
}
