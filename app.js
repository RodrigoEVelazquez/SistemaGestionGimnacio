function registrarSocio() {

    const formulario = document.getElementById("formSocio");
    const datos = new FormData(formulario);
    const socio = Object.fromEntries(datos);

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
}


// Evento del formulario
document.getElementById("formSocio").addEventListener("submit", function(event) {

    event.preventDefault();

    registrarSocio();

});
