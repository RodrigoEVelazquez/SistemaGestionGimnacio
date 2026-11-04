using System;
using System.Collections.Generic;

namespace SistemaGym.API.Models;

public partial class Pase
{
    public int IdPase { get; set; }

    public string Nombre { get; set; } = null!;

    public decimal Precio { get; set; }

    public virtual ICollection<Inscripcion> Inscripcions { get; set; } = new List<Inscripcion>();
}
