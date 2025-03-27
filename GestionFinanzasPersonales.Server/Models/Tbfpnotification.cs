using System;
using System.Collections.Generic;

namespace GestionFinanzasPersonales.Server.Models;

public partial class Tbfpnotification
{
    public int IdNotif { get; set; }

    public int IdUser { get; set; }

    public string Message { get; set; } = null!;

    public DateTime DateSend { get; set; }

    public bool State { get; set; }

    public virtual Tbfpuser IdUserNavigation { get; set; } = null!;
}
