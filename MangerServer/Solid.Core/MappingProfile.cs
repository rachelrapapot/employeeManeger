using AutoMapper;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployDTOs>().ReverseMap();
            CreateMap<Role, RoleDTOs>().ReverseMap();
            CreateMap<RoleWorker, RoleWorkerDTo>().ReverseMap();

        }
    }
}
