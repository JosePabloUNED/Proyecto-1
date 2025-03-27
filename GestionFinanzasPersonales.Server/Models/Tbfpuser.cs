//using System;
//using System.Collections.Generic;

//namespace GestionFinanzasPersonales.Server.Models;

//public partial class Tbfpuser
//{
//    public int IdUser { get; set; }

//    public string UserName { get; set; } = null!;

//    public string Email { get; set; } = null!;

//    public string Password { get; set; } = null!;

//    public DateTime DateRegistration { get; set; }

//    public virtual ICollection<Tbfpaccount> Tbfpaccounts { get; set; } = new List<Tbfpaccount>();

//    public virtual ICollection<Tbfpbudget> Tbfpbudgets { get; set; } = new List<Tbfpbudget>();

//    public virtual ICollection<Tbfpnotification> Tbfpnotifications { get; set; } = new List<Tbfpnotification>();
//}
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models
{
    public partial class Tbfpuser : IdentityUser<string>
    {
        public DateTime DateRegistration { get; set; }

        public virtual ICollection<Tbfpaccount> Tbfpaccounts { get; set; } = new List<Tbfpaccount>();

        public virtual ICollection<Tbfpbudget> Tbfpbudgets { get; set; } = new List<Tbfpbudget>();

        public virtual ICollection<Tbfpnotification> Tbfpnotifications { get; set; } = new List<Tbfpnotification>();
    }
}