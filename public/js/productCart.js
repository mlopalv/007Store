window.onload = function () {
    console.log("Cargando informacion del carro de compras.");
    let sessionId = "mlopalv@gmail.com";
    let carroCompras = null;
    let divContainerProducto = document.querySelector("#divContainerProducto");

    if (localStorage.getItem(sessionId) !== null) {
        carroCompras = JSON.parse(localStorage.getItem(sessionId));
        let productos = carroCompras.productos;
        console.log("Tamano del carro de compras: " + productos.length);
        let producto = null;
        //divContainerProducto.innerHTML += "<ul>"

        for (producto of productos) {
            //divContainerProducto.innerHTML += "<li> Producto: " + producto.nombre + " Descripcion: " + producto.descripcion + " Precio: " + producto.precio;
            divContainerProducto.innerHTML += "<div class=\"cont-info-product\">";
            divContainerProducto.innerHTML +=   "<div class=\"cont-image\">";
            divContainerProducto.innerHTML +=       "<img class=\"image\" src=\"/images/productDetails/productDetailsSample1.webp\">"
            divContainerProducto.innerHTML +=   "</div>";
            divContainerProducto.innerHTML +=   "<div class=\"text-info-right\">";
            divContainerProducto.innerHTML +=       "<div>";
            divContainerProducto.innerHTML +=           "<h3 class=\"text-info margin-bottom\"> Producto: " + producto.nombre + "</h3>";
            divContainerProducto.innerHTML +=           "<h3 class=\"text-info\" id=\"idProducto\">Código: " + producto.id + "</h3>";
            divContainerProducto.innerHTML +=       "</div>";
            divContainerProducto.innerHTML +=       "<div class=\"text-price-unit\">";
            divContainerProducto.innerHTML +=           "<h3 class=\"text-info title-amount\" id=\"precioProducto\">Price: </h3>";
            divContainerProducto.innerHTML +=           "<h3 class=\"text-info\">$<span id=\"price\">" + producto.precio + "</span></h3>";
            divContainerProducto.innerHTML +=       "</div>";           
            divContainerProducto.innerHTML +=       "<div class=\"text-amount\">";
            divContainerProducto.innerHTML +=           "<h3 class=\"text-info title-amount\" id=\"cantidadProducto\">Quantity:</h3>";
            divContainerProducto.innerHTML +=       "</div>";
            divContainerProducto.innerHTML +=   "</div>";
            divContainerProducto.innerHTML += "</div>";
            //console.log(producto);
        }
        //divContainerProducto.innerHTML += "</ul>"
    }


    /*console.log("Carro de compras ya existe para sesion. Buscando producto: " + idProducto)
    let producto = carroCompras.productos.find((element) => element.idProducto = idProducto);

    console.log("Este es el producto que se encontro");*/

    /*let sessionId = "mlopalv@gmail.com";

    let carroCompras = {
        productos: [],
        sessionId: sessionId
    };

    //let botonAdicionarATarjeta = document.querySelector("#botonAdicionarATarjeta");
    let inputCantidadProducto = document.querySelector("#cantidadProducto");
    let nombreProducto = document.querySelector("#nombreProducto");
    //let descripcionProducto = document.querySelector("#descripcionProducto");
    let precioProducto = document.querySelector("#precioProducto");

    //Se puede iterar el local storage usando este loop:
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }*/

    /*botonAdicionarATarjeta.addEventListener("click", (event) => {

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
            console.log("Carro de compras ya existe para sesion. Buscando producto: " + idProducto)
            let producto = carroCompras.productos.find((element) => element.idProducto = idProducto);

            console.log("Este es el producto que se encontro");

        }
    });*/
}