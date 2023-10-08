window.onload = function () {

   
    let formularioRegistroUsuarios = document.querySelector("#formularioRegistroUsuarios");
    let divErrores = document.querySelector("#divErroresFrontEnd");
    divErrores.hidden = true;
    let botonSubmitFormulario = document.querySelector("#botonSubmitFormulario");

    formularioRegistroUsuarios.addEventListener("submit", (event) => {
        
        const errores = [];
        event.preventDefault(); 
        let nombre = document.querySelector("#formNombre");
        let apellido = document.querySelector("#formApellido");
        let usuario = document.querySelector("#formUsuario");
        let email = document.querySelector("#formEmail");
        let password1 = document.querySelector("#formPassword1");
        let password2 = document.querySelector("#formPassword2");

        divErrores.hidden = true;
        
        let ulErrores = document.querySelector("#ulErroresFrontEnd");
        ulErrores.innerHTML ="";
        
        if (nombre.value ==  "" ){
            errores.push("FV: el campo nombre debe llevar un valor. ");
        } else if (nombre.value.length < 2){
            errores.push("FV: el campo nombre debe ser mínimo de 2 caracteres. ");
        }

        if (apellido.value ==  "" ){
            errores.push("FV: el campo apellido debe llevar un valor. ");
        } else if (apellido.value.length < 2){
            errores.push("FV: el campo apellido debe ser mínimo de 2 caracteres. ");
        }

        if (usuario.value ==  "" ){
            errores.push("FV: el campo usuario debe llevar un valor. ");
        } else if (usuario.value.length < 4){
            errores.push("FV: el campo usuario debe ser mínimo de 2 caracteres. ");
        }

        if (email.value ==  "" ){
            errores.push("FV: el campo email debe llevar un valor. ");
        } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            errores.push("FV: el campo email debe contenerun email válido. Ejemplo: john.doe@yahoo.com. ");
        }

        if (password1.value ==  "" ){
            errores.push("FV: el campo password debe llevar un valor. ");
        } else if (password1.value.length < 8){
            errores.push("FV: el campo password debe ser mínimo de 8 caracteres. ");
        }

        

        if(errores.length > 0){
            divErrores.hidden = false;
            for(let error of errores){
                ulErrores.innerHTML += "<li>" + error + "</li>";
            }
            
        }else {
            formularioRegistroUsuarios.submit();
        }

    });
}