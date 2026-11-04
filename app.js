const formulario = document.getElementById("formSocio");
formulario.addEventListener("submit",function(event)    {
    event.preventDefault();

    console.log("Formulario enviado");
    const datos = new FormData(formulario);
    const socio = Object.fromEntries(datos);
   

    console.log("Datos del socio:", socio);
    fetch("http://localhost:5000/api/Socio", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
},
    body: JSON.stringify(socio)
})
.then(async response => {
    const resultado = await response.text();

    console.log("Estado HTTP:", response.status);
    console.log("Respuesta API:", resultado);

    if (!response.ok) {
        throw new Error(resultado);
    }

    alert("Socio registrado correctamente");
    formulario.reset();

    return resultado;
})
.catch(error => {
    console.error("Error:", error);
    alert("No se pudo registrar el socio");
});

});