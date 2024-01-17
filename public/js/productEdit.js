window.onload = function () {

   
    let formularioRegistroProductos = document.querySelector("#formularioRegistroProductos");
    let divErrores = document.querySelector("#divErroresFrontEnd");
    divErrores.hidden = true;
    
    formularioRegistroProductos.addEventListener("submit", (event) => {
        
        const errores = [];
        event.preventDefault(); 
        let nombre = document.querySelector("#formNombre");
        let descripcion = document.querySelector("#formDescripcion");
        let costo = document.querySelector("#formCosto");
        
        divErrores.hidden = true;
        
        let ulErrores = document.querySelector("#ulErroresFrontEnd");
        ulErrores.innerHTML ="";
        
        if (nombre.value ==  "" ){
            errores.push("FV: The field product name should not be empty.");
        } else if (nombre.value.length < 5){
            errores.push("FV: The field product name should have at least five characters. ");
        }
        console.log("Valor de descripcion: " + descripcion.innerHTML);
        console.log("Valor de descripcion: " + descripcion.value);
        if (descripcion.value.trim() ==  "" ){
            errores.push("FV: The field product description should have a value. ");
        } else if (descripcion.value.trim().length < 20){
            errores.push("FV: The field product description should have at least 20 characters. ");
        }
        
        if (costo.value ==  "" ){
            errores.push("FV: The field product price should have a value. ");
        } else if (parseFloat(costo.value) <= 0){
            errores.push("FV: The product price should be greater than or equal to $0. ");
        }  

        if(errores.length > 0){
            divErrores.hidden = false;
            for(let error of errores){
                ulErrores.innerHTML += "<li>" + error + "</li>";
            }
            
        }else {
            formularioRegistroProductos.submit();
        }

    });
}

