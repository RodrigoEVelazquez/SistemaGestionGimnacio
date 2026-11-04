using System;
using System.Collections.Generic;

namespace SistemaGym.API.Models;

public partial class Horario
{
    public int IdHorario { get; set; }

    public string Dia { get; set; } = null!;

    public TimeOnly Desde { get; set; }

    public TimeOnly Hasta { get; set; }

    public virtual ICollection<Actividad> IdActividads { get; set; } = new List<Actividad>();
}
