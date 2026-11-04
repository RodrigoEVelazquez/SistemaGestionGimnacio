using Microsoft.AspNetCore.Mvc;
using SistemaGym.API.Data;
using SistemaGym.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaGym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InscripcionController : ControllerBase
    {
        // GET: api/<InscripcionController>
        [HttpGet]
        public List<Inscripcion> Get()
        {
            using (var context = new GimnasioContext())
            {
                return context.Inscripcions.ToList();
            }
        }

        // GET api/<InscripcionController>/5
        [HttpGet("{id}")]
        public Inscripcion Get(int id)
        {
            using (var context = new GimnasioContext())
            {
                return context.Inscripcions.Find(id);
            }
        }

        // POST api/<InscripcionController>
        [HttpPost]
        public void Post([FromBody] Inscripcion objInscripcion)
        {
            Inscripcion inscripcionNueva = new Inscripcion();

            inscripcionNueva.IdSocio = objInscripcion.IdSocio;
            inscripcionNueva.IdPase = objInscripcion.IdPase;
            inscripcionNueva.FechaInicio = objInscripcion.FechaInicio;
            inscripcionNueva.FechaVencimiento = objInscripcion.FechaVencimiento;
            inscripcionNueva.Estado = objInscripcion.Estado;

            using (var context = new GimnasioContext())
            {
                context.Add(inscripcionNueva);
                context.SaveChanges();
            }
        }

        // PUT api/<InscripcionController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Inscripcion inscripcionActualizada)
        {
            Inscripcion objInscripcion = new Inscripcion();

            using (var context = new GimnasioContext())
            {
                //lo obtengo
                objInscripcion = context.Inscripcions.Find(id);

                //lo modifico
                objInscripcion.IdSocio = inscripcionActualizada.IdSocio;
                objInscripcion.IdPase = inscripcionActualizada.IdPase;
                objInscripcion.FechaInicio = inscripcionActualizada.FechaInicio;
                objInscripcion.FechaVencimiento = inscripcionActualizada.FechaVencimiento;
                objInscripcion.Estado = inscripcionActualizada.Estado;

                context.SaveChanges();
            }
        }

        // DELETE api/<InscripcionController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new GimnasioContext())
            {
                Inscripcion inscripcion = new Inscripcion();
                inscripcion = context.Inscripcions.Find(id);

                context.Remove(inscripcion);
                context.SaveChanges();
            }
        }
    }
}