using Microsoft.AspNetCore.Mvc;
using SistemaGym.API.Data;
using SistemaGym.API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SistemaGym.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaseController : ControllerBase
    {
        // GET: api/<PaseController>
        [HttpGet]
        public List<Pase> Get()
        {
            using (var context = new GimnasioContext())
            {
                return context.Pases.ToList();
            }
        }

        // GET api/<PaseController>/5
        [HttpGet("{id}")]
        public Pase Get(int id)
        {
            using (var context = new GimnasioContext())
            {
                return context.Pases.Find(id);
            }
        }

        // POST api/<PaseController>
        [HttpPost]
        public void Post([FromBody] Pase objPase)
        {
            Pase paseNuevo = new Pase();

            paseNuevo.Nombre = objPase.Nombre;
            paseNuevo.Precio = objPase.Precio;

            using (var context = new GimnasioContext())
            {
                context.Add(paseNuevo);
                context.SaveChanges();
            }
        }

        // PUT api/<PaseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Pase paseActualizado)
        {
            Pase objPase = new Pase();

            using (var context = new GimnasioContext())
            {
                //lo obtengo
                objPase = context.Pases.Find(id);

                //lo modifico
                objPase.Nombre = paseActualizado.Nombre;
                objPase.Precio = paseActualizado.Precio;

                context.SaveChanges();
            }
        }

        // DELETE api/<PaseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new GimnasioContext())
            {
                Pase pase = new Pase();
                pase = context.Pases.Find(id);

                context.Remove(pase);
                context.SaveChanges();
            }
        }
    }
}