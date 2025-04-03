using GestionFinanzasPersonales.Server.Models;

public partial class Tbfptransaction
{
    public int IdTransaction { get; set; }
    public string IdAccount { get; set; } = null!;
    public string TypeTran { get; set; } = null!; // Updated from Type
    public int IdCategory { get; set; }
    public decimal Amount { get; set; }
    public DateTime DateTransaction { get; set; }
    public string DescriptionTran { get; set; } = null!; // Updated from Description
    public virtual Tbfpaccount IdAccountNavigation { get; set; } = null!;
    public virtual Tbfpcategory IdCategoryNavigation { get; set; } = null!;
}