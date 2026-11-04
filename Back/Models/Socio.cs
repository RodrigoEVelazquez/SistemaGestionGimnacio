using System;
using System.Collections.Generic;

namespace SistemaGym.API.Models;

public partial class Socio
{
    public int IdSocio { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Telefono { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int Dni { get; set; }

    public string FechaNacimiento { get; set; } = null!;

    public string? Calle { get; set; }

    public string? Altura { get; set; }

    public string? Barrio { get; set; }

    public virtual ICollection<Inscripcion> Inscripcions { get; set; } = new List<Inscripcion>();

    public virtual ICollection<Actividad> IdActividads { get; set; } = new List<Actividad>();
}
