const datosMensaje = {
  nombre: "",
  email: "",
  telefono: "",
  mensaje: "",
};

const inputs = document.querySelectorAll(".campo__input");
inputs.forEach((input) => {
  input.addEventListener("input", actualizarTexto);
});

const botonFormulario = document.querySelector("form");
botonFormulario.addEventListener("submit", enviarFormulario);

function actualizarTexto(evento) {
  const key = evento.target.id;
  const valor = evento.target.value;
  datosMensaje[key] = valor;
}

function enviarFormulario(evento) {
  // Si hay errores viejos, los rengo que limpiar de la pantalla
  const divsError = document.querySelectorAll(".error__texto");
  for (const divError of divsError) {
    divError.remove();
  }
  // Antes de enviar el formulario tengo que validar que todos los campos esten llenos
  evento.preventDefault();
  const errores = validarFormulario(datosMensaje);

  //   Si esta todo OK lo mando
  if (Object.keys(errores).length === 0) {
    alert("Formulario enviado");
    evento.target.submit();
  }
  //   SI algo esta mal muestro msj de error
  for (const key in errores) {
    // console.log(key);
    const inputError = document.querySelector(`.div__input__${key}`);
    // console.log(inputError);
    const divError = document.createElement("DIV");
    divError.textContent = errores[key];
    divError.classList = "error__texto";
    inputError.appendChild(divError);
  }
}

function validarFormulario(datos) {
  const errores = {};
  for (const key in datos) {
    if (datos[key].length === 0) {
      errores[key] = `El ${key} no puede estar vacío`;
    }
  }
  //   console.log("--------------------");
  //   console.log("ERRORES");
  //   console.log(errores);
  //   console.log("--------------------");

  return errores;
}
