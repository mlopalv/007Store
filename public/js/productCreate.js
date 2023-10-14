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
        ulErrores.innerHTML = "";

        if (nombre.value == "") {
            errores.push("FV: el campo nombre del producto debe llevar un valor. ");
        } else if (nombre.value.length < 5) {
            errores.push("FV: el campo nombre del producto debe ser mínimo de 5 caracteres. ");
        }
        console.log("Valor de descripcion: " + descripcion.innerHTML);
        console.log("Valor de descripcion: " + descripcion.value);
        if (descripcion.value.trim() == "") {
            errores.push("FV: el campo descripción del producto debe llevar un valor. ");
        } else if (descripcion.value.trim().length < 20) {
            errores.push("FV: el campo descripción del producto debe ser mínimo de 20 caracteres. ");
        }

        if (costo.value == "") {
            errores.push("FV: el campo precio del producto debe llevar un valor. ");
        } else if (parseFloat(costo.value) <= 0) {
            errores.push("FV: el precio del producto no puede ser menor o igual a $0. ");
        }

        if (errores.length > 0) {
            divErrores.hidden = false;
            for (let error of errores) {
                ulErrores.innerHTML += "<li>" + error + "</li>";
            }

        } else {
            formularioRegistroProductos.submit();
        }

    });

    /** Preview de la imagen que se carga del producto */
    const fileInput = document.getElementById("image");
    const previewImage = document.getElementById("previewImage");

    fileInput.addEventListener("change", event => {
        if (event.target.files.length > 0) {
            previewImage.src = URL.createObjectURL(
                event.target.files[0],
            );

            previewImage.style.display = "block";
        }

        // 👇️ reset file input once you're done
        //fileInput.value = null;
    });
}

/* window.onload = function(){
    let categorias = document.querySelector("#listadoCategorias")
    
    categorias.addEventListener("change", (event) => {
        console.log("Seleccion de categoria ...");
        
    });

} */