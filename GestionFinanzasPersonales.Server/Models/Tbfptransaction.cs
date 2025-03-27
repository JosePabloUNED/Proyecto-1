using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models;

public partial class Tbfptransaction
{
    public int IdTransaction { get; set; }

    public string IdAccount { get; set; } = null!;

    public string Type { get; set; } = null!;

    public int IdCategory { get; set; }

    public decimal Amount { get; set; }

    public DateTime DateTransaction { get; set; }

    public string Description { get; set; } = null!;

    public virtual Tbfpaccount IdAccountNavigation { get; set; } = null!;

    public virtual Tbfpcategory IdCategoryNavigation { get; set; } = null!;
}
