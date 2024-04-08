using Microsoft.AspNetCore.Identity;
using Solid.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public class RoleWorker
    {
        public int Id { get; set; }
        public int IdEmployee{ get; set; }
        public int IdRole { get; set; }
        public Employee Employee { get; set; }
      
        public Role Role { get; set; }
        public DateOnly DateOfStart { get; set; }
        

        //public DateOnly DateOfStart
        //{

        //    get { return dateOfStart; }

        //    set
        //    {
        //        if (value.CompareTo(DateOnly.FromDateTime(DateTime.Now)) >= 0)
        //            dateOfStart = value;
        //        else
        //            dateOfStart = DateOnly.FromDateTime(DateTime.Now);
        //    }
        //}
    }
}
