using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models;

public partial class Tbfpaccount
{
    public string IdAccount { get; set; } = null!;

    public int IdUser { get; set; }

    public string NameAccount { get; set; } = null!;

    public string TypeAccount { get; set; } = null!;

    public decimal InitialBalance { get; set; }

    public DateTime DateCreation { get; set; }

    public virtual Tbfpuser IdUserNavigation { get; set; } = null!;

    public virtual ICollection<Tbfptransaction> Tbfptransactions { get; set; } = new List<Tbfptransaction>();
}
