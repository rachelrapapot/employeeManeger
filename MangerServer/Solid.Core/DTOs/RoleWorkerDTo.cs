using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class RoleWorkerDTo
    {
        public RoleDTOs Role { get; set; }
      
        public DateOnly DateOfStart { get; set; }
    }
}
