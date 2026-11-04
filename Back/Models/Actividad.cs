using System;
using System.Collections.Generic;

namespace SistemaGym.API.Models;

public partial class Actividad
{
    public int IdActividad { get; set; }

    public string? Nombre { get; set; }

    public string? Descripcion { get; set; }

    public virtual ICollection<Horario> IdHorarios { get; set; } = new List<Horario>();

    public virtual ICollection<Socio> IdSocios { get; set; } = new List<Socio>();
}
