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
            errores.push("FV: The name field should not be empty. ");
        } else if (nombre.value.length < 2){
            errores.push("FV: The name field should have at least two characters. ");
        }

        if (apellido.value ==  "" ){
            errores.push("FV: The last name field should not be empty. ");
        } else if (apellido.value.length < 2){
            errores.push("FV:  The last name field should have at least two characters. ");
        }

        if (usuario.value ==  "" ){
            errores.push("FV: The user name should not be emtpy. ");
        } else if (usuario.value.length < 4){
            errores.push("FV: The user name field should have at least two characters. ");
        }

        if (email.value ==  "" ){
            errores.push("FV: The email field should have a value. ");
        } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            errores.push("FV: The email field should have a valid email structure. Example: john.doe@yahoo.com. ");
        }

        if (password1.value ==  "" ){
            errores.push("FV: The field password should have a value. ");
        } else if (password1.value.length < 8){
            errores.push("FV: The password field should have eight characters at least.");
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