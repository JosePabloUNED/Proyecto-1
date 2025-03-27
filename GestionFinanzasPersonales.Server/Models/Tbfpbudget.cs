using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models;

public partial class Tbfpbudget
{
    public int IdBudget { get; set; }

    public int IdUser { get; set; }

    public int IdCategory { get; set; }

    public string Period { get; set; } = null!;

    public decimal Amount { get; set; }

    public virtual Tbfpcategory IdCategoryNavigation { get; set; } = null!;

    public virtual Tbfpuser IdUserNavigation { get; set; } = null!;
}
