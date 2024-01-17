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
            errores.push("FV: The email field should not be empty. ");
        } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            errores.push("FV: The email field should have a valid email structure. Example: john.doe@yahoo.com. ");
        }

       
        if (password.value ==  "" ){
            errores.push("FV: The field password should have a value. ");
        } else if (password.value.length < 8){
            errores.push("FV: The password field should have eight characters at least. ");
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