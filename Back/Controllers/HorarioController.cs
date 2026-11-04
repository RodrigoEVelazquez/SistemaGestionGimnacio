using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaGym.API.Data;
using SistemaGym.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaGym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HorarioController : ControllerBase
    {
        // GET: api/<HorarioController>
        [HttpGet]
        public List<Horario> Get()
        {
            using (var context = new GimnasioContext())
            {
                return context.Horarios.ToList();
            }
        }

        // GET api/<HorarioController>/5
        [HttpGet("{id}")]
        public Horario Get(int id)
        {
            using (var context = new GimnasioContext())
            {
                return context.Horarios.Find(id);
            }
        }

        // POST api/<HorarioController>
        [HttpPost]
        public void Post([FromBody] Horario objHorario)
        {
            Horario horarioNuevo = new Horario();

            horarioNuevo.Dia = objHorario.Dia;
            horarioNuevo.Desde = objHorario.Desde;
            horarioNuevo.Hasta = objHorario.Hasta;

            using (var context = new GimnasioContext())
            {
                context.Add(horarioNuevo);
                context.SaveChanges();
            }
        }

        // PUT api/<HorarioController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Horario horarioActualizado)
        {
            Horario objHorario = new Horario();

            using (var context = new GimnasioContext())
            {
                //lo obtengo
                objHorario = context.Horarios.Find(id);

                //lo modifico
                objHorario.Dia = horarioActualizado.Dia;
                objHorario.Desde = horarioActualizado.Desde;
                objHorario.Hasta = horarioActualizado.Hasta;

                context.SaveChanges();
            }
        }

        // DELETE api/<HorarioController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new GimnasioContext())
            {
                Horario horario = new Horario();
                horario = context.Horarios.Include(h => h.IdActividads).FirstOrDefault(h => h.IdHorario == id);

                horario.IdActividads.Clear();
                context.Remove(horario);
                context.SaveChanges();
            }
        }
    }
}