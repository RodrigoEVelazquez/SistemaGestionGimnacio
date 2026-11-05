function GuardarSocio() {

    const nombre = document.getElementById("nombreSocio").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const dni = document.getElementById("dni").value;
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    const calle = document.getElementById("calle").value;
    const altura = document.getElementById("altura").value;
    const barrio = document.getElementById("barrio").value;

    obj = {
        "Nombre": nombre,
        "Apellido": apellido,
        "Telefono": telefono,
        "Email": email,
        "Dni": Number(dni),
        "FechaNacimiento": fechaNacimiento,
        "Calle": calle,
        "Altura": altura,
        "Barrio": barrio
    };

    postSocio(obj);
}

function postSocio(obj) {

    fetch("http://localhost:5000/api/Socio", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarSocios();
            limpiarFormularioSocio();
            cargarSelects();
        });
}

function listarSocios() {

    fetch("http://localhost:5000/api/Socio")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaSocios");

            tabla.innerHTML = "";

            data.forEach(obj => {

                tabla.innerHTML += `
                <tr>
                    <td>${obj.idSocio}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.apellido}</td>
                    <td>${obj.dni}</td>
                    <td>${obj.telefono}</td>
                    <td>
                        <button onclick="cargarDatosSocio(${obj.idSocio}, '${obj.nombre}', '${obj.apellido}', '${obj.telefono}', '${obj.email}', ${obj.dni}, '${obj.fechaNacimiento}', '${obj.calle ?? ""}', '${obj.altura ?? ""}', '${obj.barrio ?? ""}')">
                            Editar
                        </button>

                        <button onclick="eliminarSocio(${obj.idSocio})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `;
            });
        });
}

function buscarSocio() {

    const id = document.getElementById("id_socio").value;

    fetch("http://localhost:5000/api/Socio/" + id)
        .then(response => response.json())
        .then(data => {

            document.getElementById("resultadoBusquedaSocio").innerHTML = `
                <h4>Datos del socio encontrado</h4>
                <p><strong>ID:</strong> ${data.idSocio}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Apellido:</strong> ${data.apellido}</p>
                <p><strong>DNI:</strong> ${data.dni}</p>
                <p><strong>Teléfono:</strong> ${data.telefono}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Fecha de nacimiento:</strong> ${data.fechaNacimiento}</p>
            `;
        });
}

function eliminarSocio(id) {

    deleteSocio(id);
}

function deleteSocio(id) {

    fetch("http://localhost:5000/api/Socio/" + id, {
        method: "DELETE"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarSocios();
            cargarSelects();
        });
}

function cargarDatosSocio(id, nombre, apellido, telefono, email, dni, fechaNacimiento, calle, altura, barrio) {

    document.getElementById("txtIdSocio").value = id;
    document.getElementById("nombreSocio").value = nombre;
    document.getElementById("apellido").value = apellido;
    document.getElementById("telefono").value = telefono;
    document.getElementById("email").value = email;
    document.getElementById("dni").value = dni;
    document.getElementById("fecha_nacimiento").value = fechaNacimiento;
    document.getElementById("calle").value = calle;
    document.getElementById("altura").value = altura;
    document.getElementById("barrio").value = barrio;
}

function ActualizarSocio() {

    const id = document.getElementById("txtIdSocio").value;
    const nombre = document.getElementById("nombreSocio").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const dni = document.getElementById("dni").value;
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    const calle = document.getElementById("calle").value;
    const altura = document.getElementById("altura").value;
    const barrio = document.getElementById("barrio").value;

    obj = {
        "IdSocio": Number(id),
        "Nombre": nombre,
        "Apellido": apellido,
        "Telefono": telefono,
        "Email": email,
        "Dni": Number(dni),
        "FechaNacimiento": fechaNacimiento,
        "Calle": calle,
        "Altura": altura,
        "Barrio": barrio
    };

    putSocio(obj);
}

function putSocio(obj) {

    fetch("http://localhost:5000/api/Socio/" + obj.IdSocio, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarSocios();
            limpiarFormularioSocio();
            cargarSelects();
        });
}

function limpiarFormularioSocio() {

    document.getElementById("txtIdSocio").value = "";
    document.getElementById("nombreSocio").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dni").value = "";
    document.getElementById("fecha_nacimiento").value = "";
    document.getElementById("calle").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("barrio").value = "";
    document.getElementById("id_socio").value = "";

    document.getElementById("resultadoBusquedaSocio").innerHTML = "";
}



// PASES


function GuardarPase() {

    const nombre = document.getElementById("nombrePase").value;
    const precio = document.getElementById("precioPase").value;

    obj = {
        "Nombre": nombre,
        "Precio": Number(precio)
    };

    postPase(obj);
}

function postPase(obj) {

    fetch("http://localhost:5000/api/Pase", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarPases();
            limpiarFormularioPase();
        });
}

function listarPases() {

    fetch("http://localhost:5000/api/Pase")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaPases");

            tabla.innerHTML = "";

            data.forEach(obj => {

                tabla.innerHTML += `
                <tr>
                    <td>${obj.idPase}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.precio}</td>
                    <td>
                        <button onclick="cargarDatosPase(${obj.idPase}, '${obj.nombre}', ${obj.precio})">
                            Editar
                        </button>

                        <button onclick="eliminarPase(${obj.idPase})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `;
            });
        });
}

function buscarPase() {

    const id = document.getElementById("id_pase").value;

    fetch("http://localhost:5000/api/Pase/" + id)
        .then(response => response.json())
        .then(data => {

            document.getElementById("resultadoBusquedaPase").innerHTML = `
                <h4>Datos del pase encontrado</h4>
                <p><strong>ID:</strong> ${data.idPase}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Precio:</strong> ${data.precio}</p>
            `;
        });
}

function eliminarPase(id) {

    deletePase(id);
}

function deletePase(id) {

    fetch("http://localhost:5000/api/Pase/" + id, {
        method: "DELETE"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarPases();
        });
}

function cargarDatosPase(id, nombre, precio) {

    document.getElementById("txtIdPase").value = id;
    document.getElementById("nombrePase").value = nombre;
    document.getElementById("precioPase").value = precio;
}

function ActualizarPase() {

    const id = document.getElementById("txtIdPase").value;
    const nombre = document.getElementById("nombrePase").value;
    const precio = document.getElementById("precioPase").value;

    obj = {
        "IdPase": Number(id),
        "Nombre": nombre,
        "Precio": Number(precio)
    };

    putPase(obj);
}

function putPase(obj) {

    fetch("http://localhost:5000/api/Pase/" + obj.IdPase, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarPases();
            limpiarFormularioPase();
        });
}

function limpiarFormularioPase() {

    document.getElementById("txtIdPase").value = "";
    document.getElementById("nombrePase").value = "";
    document.getElementById("precioPase").value = "";
    document.getElementById("id_pase").value = "";

    document.getElementById("resultadoBusquedaPase").innerHTML = "";
}



// INSCRIPCIONES


function GuardarInscripcion() {

    const idSocio = document.getElementById("idSocioInscripcion").value;
    const idPase = document.getElementById("idpaseInscripcion").value;
    const fechaInicio = document.getElementById("fecha_inicio").value;
    const fechaVencimiento = document.getElementById("fecha_vencimiento").value;
    const estado = document.getElementById("estado").value;

    obj = {
        "IdSocio": Number(idSocio),
        "IdPase": Number(idPase),
        "FechaInicio": fechaInicio,
        "FechaVencimiento": fechaVencimiento,
        "Estado": estado
    };

    postInscripcion(obj);
}

function postInscripcion(obj) {

    fetch("http://localhost:5000/api/Inscripcion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarInscripciones();
            limpiarFormularioInscripcion();
        });
}

function listarInscripciones() {

    fetch("http://localhost:5000/api/Inscripcion")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaInscripciones");

            tabla.innerHTML = "";

            data.forEach(obj => {

                tabla.innerHTML += `
                <tr>
                    <td>${obj.idInscripcion}</td>
                    <td>${obj.idSocio}</td>
                    <td>${obj.idPase}</td>
                    <td>${obj.fechaInicio}</td>
                    <td>${obj.fechaVencimiento}</td>
                    <td>${obj.estado ?? ""}</td>
                    <td>
                        <button onclick="cargarDatosInscripcion(${obj.idInscripcion}, ${obj.idSocio}, ${obj.idPase}, '${obj.fechaInicio}', '${obj.fechaVencimiento}', '${obj.estado ?? ""}')">
                            Editar
                        </button>

                        <button onclick="eliminarInscripcion(${obj.idInscripcion})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `;
            });
        });
}

function buscarInscripcion() {

    const id = document.getElementById("id_inscripcion").value;

    fetch("http://localhost:5000/api/Inscripcion/" + id)
        .then(response => response.json())
        .then(data => {

            document.getElementById("resultadoBusquedaInscripcion").innerHTML = `
                <h4>Datos de la inscripción encontrada</h4>
                <p><strong>ID:</strong> ${data.idInscripcion}</p>
                <p><strong>ID del socio:</strong> ${data.idSocio}</p>
                <p><strong>ID del pase:</strong> ${data.idPase}</p>
                <p><strong>Fecha de inicio:</strong> ${data.fechaInicio}</p>
                <p><strong>Fecha de vencimiento:</strong> ${data.fechaVencimiento}</p>
                <p><strong>Estado:</strong> ${data.estado ?? ""}</p>
            `;
        });
}

function eliminarInscripcion(id) {

    deleteInscripcion(id);
}

function deleteInscripcion(id) {

    fetch("http://localhost:5000/api/Inscripcion/" + id, {
        method: "DELETE"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarInscripciones();
        });
}

function cargarDatosInscripcion(id, idSocio, idPase, fechaInicio, fechaVencimiento, estado) {

    document.getElementById("txtIdInscripcion").value = id;
    document.getElementById("idSocioInscripcion").value = idSocio;
    document.getElementById("idpaseInscripcion").value = idPase;
    document.getElementById("fecha_inicio").value = fechaInicio;
    document.getElementById("fecha_vencimiento").value = fechaVencimiento;
    document.getElementById("estado").value = estado;
}

function ActualizarInscripcion() {

    const id = document.getElementById("txtIdInscripcion").value;
    const idSocio = document.getElementById("idSocioInscripcion").value;
    const idPase = document.getElementById("idpaseInscripcion").value;
    const fechaInicio = document.getElementById("fecha_inicio").value;
    const fechaVencimiento = document.getElementById("fecha_vencimiento").value;
    const estado = document.getElementById("estado").value;

    obj = {
        "IdInscripcion": Number(id),
        "IdSocio": Number(idSocio),
        "IdPase": Number(idPase),
        "FechaInicio": fechaInicio,
        "FechaVencimiento": fechaVencimiento,
        "Estado": estado
    };

    putInscripcion(obj);
}

function putInscripcion(obj) {

    fetch("http://localhost:5000/api/Inscripcion/" + obj.IdInscripcion, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarInscripciones();
            limpiarFormularioInscripcion();
        });
}

function limpiarFormularioInscripcion() {

    document.getElementById("txtIdInscripcion").value = "";
    document.getElementById("idSocioInscripcion").value = "";
    document.getElementById("idpaseInscripcion").value = "";
    document.getElementById("fecha_inicio").value = "";
    document.getElementById("fecha_vencimiento").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("id_inscripcion").value = "";

    document.getElementById("resultadoBusquedaInscripcion").innerHTML = "";
}



// ACTIVIDADES


function GuardarActividad() {

    const nombre = document.getElementById("nombreActividad").value;
    const descripcion = document.getElementById("descripcion").value;

    obj = {
        "Nombre": nombre,
        "Descripcion": descripcion
    };

    postActividad(obj);
}

function postActividad(obj) {

    fetch("http://localhost:5000/api/Actividad", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarActividades();
            limpiarFormularioActividad();
            cargarSelects();
        });
}

function listarActividades() {

    fetch("http://localhost:5000/api/Actividad")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaActividades");

            tabla.innerHTML = "";

            data.forEach(obj => {

                tabla.innerHTML += `
                <tr>
                    <td>${obj.idActividad}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.descripcion ?? ""}</td>
                    <td>
                        <button onclick="cargarDatosActividad(${obj.idActividad}, '${obj.nombre}', '${obj.descripcion ?? ""}')">
                            Editar
                        </button>

                        <button onclick="eliminarActividad(${obj.idActividad})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `;
            });
        });
}

function buscarActividad() {

    const id = document.getElementById("id_actividad").value;

    fetch("http://localhost:5000/api/Actividad/" + id)
        .then(response => response.json())
        .then(data => {

            document.getElementById("resultadoBusquedaActividad").innerHTML = `
                <h4>Datos de la actividad encontrada</h4>
                <p><strong>ID:</strong> ${data.idActividad}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Descripción:</strong> ${data.descripcion ?? ""}</p>
            `;
        });
}

function eliminarActividad(id) {

    deleteActividad(id);
}

function deleteActividad(id) {

    fetch("http://localhost:5000/api/Actividad/" + id, {
        method: "DELETE"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarActividades();
            cargarSelects();
        });
}

function cargarDatosActividad(id, nombre, descripcion) {

    document.getElementById("txtIdActividad").value = id;
    document.getElementById("nombreActividad").value = nombre;
    document.getElementById("descripcion").value = descripcion;
}

function ActualizarActividad() {

    const id = document.getElementById("txtIdActividad").value;
    const nombre = document.getElementById("nombreActividad").value;
    const descripcion = document.getElementById("descripcion").value;

    obj = {
        "IdActividad": Number(id),
        "Nombre": nombre,
        "Descripcion": descripcion
    };

    putActividad(obj);
}

function putActividad(obj) {

    fetch("http://localhost:5000/api/Actividad/" + obj.IdActividad, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarActividades();
            limpiarFormularioActividad();
            cargarSelects();
        });
}

function limpiarFormularioActividad() {

    document.getElementById("txtIdActividad").value = "";
    document.getElementById("nombreActividad").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("id_actividad").value = "";

    document.getElementById("resultadoBusquedaActividad").innerHTML = "";
}



// HORARIOS


function GuardarHorario() {

    const dia = document.getElementById("dia").value;
    const desde = document.getElementById("desde").value;
    const hasta = document.getElementById("hasta").value;

    obj = {
        "Dia": dia,
        "Desde": desde + ":00",
        "Hasta": hasta + ":00"
    };

    postHorario(obj);
}

function postHorario(obj) {

    fetch("http://localhost:5000/api/Horario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarHorarios();
            limpiarFormularioHorario();
            cargarSelects();
        });
}

function listarHorarios() {

    fetch("http://localhost:5000/api/Horario")
        .then(response => response.json())
        .then(data => {

            let tabla = document.getElementById("tablaHorarios");

            tabla.innerHTML = "";

            data.forEach(obj => {

                tabla.innerHTML += `
                <tr>
                    <td>${obj.idHorario}</td>
                    <td>${obj.dia}</td>
                    <td>${obj.desde.substring(0, 5)}</td>
                    <td>${obj.hasta.substring(0, 5)}</td>
                    <td>
                        <button onclick="cargarDatosHorario(${obj.idHorario}, '${obj.dia}', '${obj.desde.substring(0, 5)}', '${obj.hasta.substring(0, 5)}')">
                            Editar
                        </button>

                        <button onclick="eliminarHorario(${obj.idHorario})">
                            Eliminar
                        </button>
                    </td>
                </tr>
                `;
            });
        });
}

function buscarHorario() {

    const id = document.getElementById("id_horario").value;

    fetch("http://localhost:5000/api/Horario/" + id)
        .then(response => response.json())
        .then(data => {

            document.getElementById("resultadoBusquedaHorario").innerHTML = `
                <h4>Datos del horario encontrado</h4>
                <p><strong>ID:</strong> ${data.idHorario}</p>
                <p><strong>Día:</strong> ${data.dia}</p>
                <p><strong>Desde:</strong> ${data.desde.substring(0, 5)}</p>
                <p><strong>Hasta:</strong> ${data.hasta.substring(0, 5)}</p>
            `;
        });
}

function eliminarHorario(id) {

    deleteHorario(id);
}

function deleteHorario(id) {

    fetch("http://localhost:5000/api/Horario/" + id, {
        method: "DELETE"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarHorarios();
            cargarSelects();
        });
}

function cargarDatosHorario(id, dia, desde, hasta) {

    document.getElementById("txtIdHorario").value = id;
    document.getElementById("dia").value = dia;
    document.getElementById("desde").value = desde;
    document.getElementById("hasta").value = hasta;
}

function ActualizarHorario() {

    const id = document.getElementById("txtIdHorario").value;
    const dia = document.getElementById("dia").value;
    const desde = document.getElementById("desde").value;
    const hasta = document.getElementById("hasta").value;

    obj = {
        "IdHorario": Number(id),
        "Dia": dia,
        "Desde": desde + ":00",
        "Hasta": hasta + ":00"
    };

    putHorario(obj);
}

function putHorario(obj) {

    fetch("http://localhost:5000/api/Horario/" + obj.IdHorario, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            listarHorarios();
            limpiarFormularioHorario();
            cargarSelects();
        });
}

function limpiarFormularioHorario() {

    document.getElementById("txtIdHorario").value = "";
    document.getElementById("dia").value = "";
    document.getElementById("desde").value = "";
    document.getElementById("hasta").value = "";
    document.getElementById("id_horario").value = "";

    document.getElementById("resultadoBusquedaHorario").innerHTML = "";
}



// ACTIVIDAD POR HORARIO


function GuardarActividadHorario() {

    const idActividad = document.getElementById("idActividad").value;
    const idHorario = document.getElementById("idHorario").value;

    fetch("http://localhost:5000/api/Actividad/" + idActividad + "/horarios/" + idHorario, {
        method: "POST"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            document.getElementById("idActividad").value = "";
            document.getElementById("idHorario").value = "";
        });
}



// SOCIO EN ACTIVIDAD


function GuardarActividadSocio() {

    const idActividad = document.getElementById("idActividadSocio").value;
    const idSocio = document.getElementById("idSocioActividad").value;

    fetch("http://localhost:5000/api/Actividad/" + idActividad + "/socios/" + idSocio, {
        method: "POST"
    })
        .then(response => {
            alert("Proceso Exitos...!!!");
            document.getElementById("idActividadSocio").value = "";
            document.getElementById("idSocioActividad").value = "";
        });
}



// LISTAS DESPLEGABLES

function cargarSelects() {

    fetch("http://localhost:5000/api/Actividad")
        .then(response => response.json())
        .then(data => {

            let opciones = `<option value="">Seleccionar actividad</option>`;

            data.forEach(obj => {
                opciones += `<option value="${obj.idActividad}">${obj.nombre}</option>`;
            });

            document.getElementById("idActividad").innerHTML = opciones;
            document.getElementById("idActividadSocio").innerHTML = opciones;
        });

    fetch("http://localhost:5000/api/Horario")
        .then(response => response.json())
        .then(data => {

            let opciones = `<option value="">Seleccionar horario</option>`;

            data.forEach(obj => {
                opciones += `<option value="${obj.idHorario}">${obj.dia} ${obj.desde.substring(0, 5)} a ${obj.hasta.substring(0, 5)}</option>`;
            });

            document.getElementById("idHorario").innerHTML = opciones;
        });

    fetch("http://localhost:5000/api/Socio")
        .then(response => response.json())
        .then(data => {

            let opciones = `<option value="">Seleccionar socio</option>`;

            data.forEach(obj => {
                opciones += `<option value="${obj.idSocio}">${obj.apellido}, ${obj.nombre}</option>`;
            });

            document.getElementById("idSocioActividad").innerHTML = opciones;
        });
}


listarSocios();
listarPases();
listarInscripciones();
listarActividades();
listarHorarios();
cargarSelects();
