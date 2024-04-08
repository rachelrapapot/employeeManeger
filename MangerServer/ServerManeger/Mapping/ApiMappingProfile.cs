using AutoMapper;
using ServerManeger.Models;
using Solid.Core.Entities;
using Solid.Data.Entities;

namespace EmployeeServer.Mapping
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployModels, Employee>().ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.Roles)).ReverseMap();
            CreateMap<RoleModels, Role>().ReverseMap();
            CreateMap<RoleWorker, RoleWorkerModel>().ReverseMap();
        }
    }
}
