window.onload = function () {

   
    let formularioLoginUsuarios = document.querySelector("#formularioLoginUsuarios");
    let divErrores = document.querySelector("#divErroresFrontEnd");
    divErrores.hidden = true;
    

    formularioLoginUsuarios.addEventListener("submit", (event) => {
        
        const errores = [];
        event.preventDefault(); 
        let email = document.querySelector("#formEmail");
        let password = document.querySelector("#formPassword");
       

        divErrores.hidden = true;
        
        let ulErrores = document.querySelector("#ulErroresFrontEnd");
        ulErrores.innerHTML ="";
        
          
        if (email.value ==  "" ){
            errores.push("FV: el campo email debe llevar un valor. ");
        } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            errores.push("FV: el campo email debe contenerun email válido. Ejemplo: john.doe@yahoo.com. ");
        }

       
        if (password.value ==  "" ){
            errores.push("FV: el campo password debe llevar un valor. ");
        } else if (password.value.length < 8){
            errores.push("FV: el campo password debe ser mínimo de 8 caracteres. ");
        }       

        if(errores.length > 0){
            divErrores.hidden = false;
            for(let error of errores){
                ulErrores.innerHTML += "<li>" + error + "</li>";
            }
            
        }else {
            formularioLoginUsuarios.submit();
        }

    });
}