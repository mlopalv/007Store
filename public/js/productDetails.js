window.onload = function () {

    let sessionId = "mlopalv@gmail.com";

    let carroCompras = {
        productos: [],
        sessionId: sessionId
    };

    let botonAdicionarATarjeta = document.querySelector("#botonAdicionarATarjeta");
    let inputCantidadProducto = document.querySelector("#inputCantidadProducto");
    let nombreProducto = document.querySelector("#nombreProducto");
    let descripcionProducto = document.querySelector("#descripcionProducto");
    let precioProducto = document.querySelector("#precioProducto");

    //Se puede iterar el local storage usando este loop:
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }

    botonAdicionarATarjeta.addEventListener("click", (event) => {

        console.log("Se presionó botón adicionar a carrito ...");
        let carroComprasString = null;
        let idProducto = botonAdicionarATarjeta.name;
        let cantidadProducto = inputCantidadProducto.value;
        let textoNombreProducto = nombreProducto.innerText;
        let textoDescripcionProducto = descripcionProducto.innerText;
        let valorPrecioProducto = precioProducto.innerText;

        let producto = {
            id: idProducto,
            cantidad: cantidadProducto,
            nombre: textoNombreProducto.trim(),
            descripcion: textoDescripcionProducto.trim(),
            precio: valorPrecioProducto
        };

        if (localStorage.getItem(sessionId) == null) {
            carroCompras.productos.push(producto);
            carroComprasString = JSON.stringify(carroCompras);
            localStorage.setItem(sessionId, carroComprasString);

        } else {
            carroCompras = JSON.parse(localStorage.getItem(sessionId));
            console.log("Carro de compras ya existe para sesion. Buscando producto: " + idProducto);
            console.log("Contenido del carro de compras: " + carroCompras.productos[0].id);
            
            let productoEncontrado = carroCompras.productos.find((element) => {
                if(element != null){
                    if(element.id == idProducto){
                        return true;
                    }
                }             
                
            });

            //Revisar si el producto que se esta almacenando ya existe en el carro de compras
            if (productoEncontrado == null) {                 
                console.log("El producto no existe en el carro de compras." + productoEncontrado);
                carroCompras.productos.push(producto);

            } else {
                
                console.log("El producto si existe en el carro de compras. Actualizando cantidad.");
                let indexProductoEncontrado = carroCompras.productos.indexOf(productoEncontrado);
                carroCompras.productos[indexProductoEncontrado].cantidad = cantidadProducto;
            }

            console.log("Actualizando el carro de compras en localStorage ...");
            carroComprasString = JSON.stringify(carroCompras);
            localStorage.removeItem(sessionId);
            localStorage.setItem(sessionId, carroComprasString);
            console.log("Local storage actualizado.");          

        }
    });
}
