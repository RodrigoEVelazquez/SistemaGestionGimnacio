using System;
using System.Collections.Generic;

namespace SistemaGym.API.Models;

public partial class Inscripcion
{
    public int IdInscripcion { get; set; }

    public int IdSocio { get; set; }

    public int IdPase { get; set; }

    public DateOnly? FechaInicio { get; set; }

    public DateOnly? FechaVencimiento { get; set; }

    public string? Estado { get; set; }

    public virtual Pase IdPaseNavigation { get; set; } = null!;

    public virtual Socio IdSocioNavigation { get; set; } = null!;
}
