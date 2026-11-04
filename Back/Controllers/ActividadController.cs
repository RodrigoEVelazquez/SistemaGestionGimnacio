using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaGym.API.Data;
using SistemaGym.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaGym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActividadController : ControllerBase
    {
        // GET: api/<ActividadController>
        [HttpGet]
        public List<Actividad> Get()
        {
            using (var context = new GimnasioContext())
            {
                return context.Actividads.ToList();
            }
        }

        // GET api/<ActividadController>/5
        [HttpGet("{id}")]
        public Actividad Get(int id)
        {
            using (var context = new GimnasioContext())
            {
                return context.Actividads.Find(id);
            }
        }

        // POST api/<ActividadController>
        [HttpPost]
        public void Post([FromBody] Actividad objActividad)
        {
            Actividad actividadNueva = new Actividad();

            actividadNueva.Nombre = objActividad.Nombre;
            actividadNueva.Descripcion = objActividad.Descripcion;

            using (var context = new GimnasioContext())
            {
                context.Add(actividadNueva);
                context.SaveChanges();
            }
        }

        // PUT api/<ActividadController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Actividad actividadActualizada)
        {
            Actividad objActividad = new Actividad();

            using (var context = new GimnasioContext())
            {
                //lo obtengo
                objActividad = context.Actividads.Find(id);

                //lo modifico
                objActividad.Nombre = actividadActualizada.Nombre;
                objActividad.Descripcion = actividadActualizada.Descripcion;

                context.SaveChanges();
            }
        }

        // DELETE api/<ActividadController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new GimnasioContext())
            {
                Actividad actividad = new Actividad();
                actividad = context.Actividads
                    .Include(a => a.IdHorarios)
                    .Include(a => a.IdSocios)
                    .FirstOrDefault(a => a.IdActividad == id);

                actividad.IdHorarios.Clear();
                actividad.IdSocios.Clear();
                context.Remove(actividad);
                context.SaveChanges();
            }
        }

        // POST api/<ActividadController>/5/horarios/2
        [HttpPost("{id}/horarios/{idHorario}")]
        public void AsignarHorario(int id, int idHorario)
        {
            using (var context = new GimnasioContext())
            {
                Actividad actividad = new Actividad();
                actividad = context.Actividads.Include(a => a.IdHorarios).FirstOrDefault(a => a.IdActividad == id);

                Horario horario = new Horario();
                horario = context.Horarios.Find(idHorario);

                actividad.IdHorarios.Add(horario);
                context.SaveChanges();
            }
        }

        // POST api/<ActividadController>/5/socios/3
        [HttpPost("{id}/socios/{idSocio}")]
        public void AsignarSocio(int id, int idSocio)
        {
            using (var context = new GimnasioContext())
            {
                Actividad actividad = new Actividad();
                actividad = context.Actividads.Include(a => a.IdSocios).FirstOrDefault(a => a.IdActividad == id);

                Socio socio = new Socio();
                socio = context.Socios.Find(idSocio);

                actividad.IdSocios.Add(socio);
                context.SaveChanges();
            }
        }
    }
}