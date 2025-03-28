using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models
{
    public partial class Tbfpuser : IdentityUser<int>
    {
        public DateTime DateRegistration { get; set; }

        public virtual ICollection<Tbfpaccount> Tbfpaccounts { get; set; } = new List<Tbfpaccount>();

        public virtual ICollection<Tbfpbudget> Tbfpbudgets { get; set; } = new List<Tbfpbudget>();

        public virtual ICollection<Tbfpnotification> Tbfpnotifications { get; set; } = new List<Tbfpnotification>();
    }
}