window.onload = function () {
    console.log("Cargando informacion del carro de compras.");
    let sessionId = "mlopalv@gmail.com";
    let carroCompras = null;
    let productos = null;
    let divContainerProducto = document.querySelector("#sectionContainerProducto");
    let producto = null;
    let carroComprasString = null;
    
    
    if (localStorage.getItem(sessionId) !== null) {
        carroCompras = JSON.parse(localStorage.getItem(sessionId));
        productos = carroCompras.productos;
        console.log("Tamano del carro de compras: " + productos.length);
        
        
        for (producto of productos) {
            
            divContainerProducto.innerHTML = divContainerProducto.innerHTML.concat("<section class=\"seccionImagenesDelProducto\">",
                                                        "<section class=\"seccionImagenPrincipalProducto\">",
                                                            "<img src=\""+producto.rutaImagen+"\" class=\"imagenPrincipalDelProducto\" />",
                                                            "<article class=\"datoAdicionalDelProductoEnfasis\">",
                                                                "<span>"+producto.nombre+"</span>",
                                                                "<span>Price per item: "+producto.precio+"</span>",
                                                                "<span>Quantity: "+producto.cantidad+"</span>",
                                                            "</article>",
                                                        "</section>",
                                                        "<section class=\"seccionDatosAdicionalesProducto\">",
                                                            "<article class=\"articuloDatoAdicionalProducto\">",
                                                                "<span class=\"datoAdicionalDelProducto\"> Total price for these items: £ "+        producto.cantidad * producto.precio +" GBP</span>",
                                                            "</article>",
                                                            "<article class=\"articuloDatoAdicionalProducto\">",
                                                                "<a id='hrefEliminarDeCarrito' name='"+producto.id+"' href='' class=\"datoAdicionalDelProducto\">",
                                                                    "<i class=\"fa-solid fa-trash-can\"></i>",
                                                                "</a>",
                                                            "</article>",
                                                            "<article class=\"articuloDatoAdicionalProducto\">",
                                                                "<a href=\"/products/"+producto.id+"\" class=\"datoAdicionalDelProducto\">",
                                                                    "<i class=\"fa-solid fa-eye\"></i>",
                                                                "</a>",
                                                            "</article>",
                                                        "</section>",
                                                    "</section>");          
        }
            
    }
    
    let hrefEliminarDeCarrito = document.getElementById("hrefEliminarDeCarrito");
    let hrefsEliminarDeCarrito = document.querySelectorAll('#hrefEliminarDeCarrito');

    for (hrefEliminarDeCarrito of hrefsEliminarDeCarrito) {
        
        hrefEliminarDeCarrito.addEventListener("click", (event) => {
            event.preventDefault();
            console.log("Click sobre el href de eliminación de producto de carrito."+event.currentTarget.name);
            let idProducto = parseInt(event.currentTarget.name);
            console.log("Tamaño productos antes del filtrado: "+productos.length);
            
            productos = productos.filter( p => { 
                console.log("Id del producto evaluado: "+p.id);
                console.log("Id del producto del href: "+idProducto);
                return parseInt(p.id) !== idProducto
            });
            console.log("Tamaño productos después del filtrado: "+productos.length);

            //Actualizar carro de compras
            carroCompras.productos = productos;
            console.log("Actualizando el carro de compras en localStorage ...");
            carroComprasString = JSON.stringify(carroCompras);
            localStorage.removeItem(sessionId);
            localStorage.setItem(sessionId, carroComprasString);
            console.log("Local storage actualizado.");
            location.reload();
        });
    }
}