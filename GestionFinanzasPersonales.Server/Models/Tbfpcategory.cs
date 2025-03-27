using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models;

public partial class Tbfpcategory
{
    public int IdCategory { get; set; }

    public string NameCategory { get; set; } = null!;

    public virtual ICollection<Tbfpbudget> Tbfpbudgets { get; set; } = new List<Tbfpbudget>();

    public virtual ICollection<Tbfptransaction> Tbfptransactions { get; set; } = new List<Tbfptransaction>();
}
