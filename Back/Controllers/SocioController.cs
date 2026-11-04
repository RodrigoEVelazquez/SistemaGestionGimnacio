using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaGym.API.Data;
using SistemaGym.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaGym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocioController : ControllerBase
    {
        // GET: api/<SocioController>
        [HttpGet]
        public List<Socio> Get()
        {
            using (var context = new GimnasioContext())
            {
                return context.Socios.ToList();
            }
        }

        // GET api/<SocioController>/5
        [HttpGet("{id}")]
        public Socio Get(int id)
        {
            using (var context = new GimnasioContext())
            {
                return context.Socios.Find(id);
            }
        }

        // POST api/<SocioController>
        [HttpPost]
        public void Post([FromBody] Socio objSocio)
        {
            Socio socioNuevo = new Socio();

            socioNuevo.Nombre = objSocio.Nombre;
            socioNuevo.Apellido = objSocio.Apellido;
            socioNuevo.Telefono = objSocio.Telefono;
            socioNuevo.Email = objSocio.Email;
            socioNuevo.Dni = objSocio.Dni;
            socioNuevo.FechaNacimiento = objSocio.FechaNacimiento;
            socioNuevo.Calle = objSocio.Calle;
            socioNuevo.Altura = objSocio.Altura;
            socioNuevo.Barrio = objSocio.Barrio;

            using (var context = new GimnasioContext())
            {
                context.Add(socioNuevo);
                context.SaveChanges();
            }
        }

        // PUT api/<SocioController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Socio socioActualizado)
        {
            Socio objSocio = new Socio();

            using (var context = new GimnasioContext())
            {
                //lo obtengo
                objSocio = context.Socios.Find(id);

                //lo modifico
                objSocio.Nombre = socioActualizado.Nombre;
                objSocio.Apellido = socioActualizado.Apellido;
                objSocio.Telefono = socioActualizado.Telefono;
                objSocio.Email = socioActualizado.Email;
                objSocio.Dni = socioActualizado.Dni;
                objSocio.FechaNacimiento = socioActualizado.FechaNacimiento;
                objSocio.Calle = socioActualizado.Calle;
                objSocio.Altura = socioActualizado.Altura;
                objSocio.Barrio = socioActualizado.Barrio;

                context.SaveChanges();
            }
        }

        // DELETE api/<SocioController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new GimnasioContext())
            {
                Socio socio = new Socio();
                socio = context.Socios.Include(s => s.IdActividads).FirstOrDefault(s => s.IdSocio == id);

                socio.IdActividads.Clear();
                context.Remove(socio);
                context.SaveChanges();
            }
        }
    }
}