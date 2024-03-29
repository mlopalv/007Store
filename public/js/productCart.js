window.onload = function () {
    console.log("Cargando informacion del carro de compras.");
    let sessionId = "mlopalv@gmail.com";
    let carroCompras = null;
    let productos = null;
    let divContainerProducto = document.querySelector("#sectionContainerProducto");
    let producto = null;
    let carroComprasString = null;
    let totalPrice = null;
    
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
                                                                "<span class=\"datoAdicionalDelProducto\"> Total price for these items: £ "+ producto.cantidad 
                                                                                                * producto.precio.replace("£","").replace("GBP","").replace(" ","") +" GBP</span>",
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
                                        
            totalPrice = totalPrice + (producto.cantidad * producto.precio.replace("£","").replace("GBP","").replace(" ",""));
        }

        //Sección para totalizar el pedido
        divContainerProducto.innerHTML = divContainerProducto.innerHTML.concat("<section class=\"seccionImagenesDelProducto\">",
                                                                                    "<section class=\"seccionImagenPrincipalProducto\">",            
                                                                                "</section>",
                                                                                "<section class=\"seccionDatosAdicionalesProducto\">",
                                                                                    "<article class=\"articuloDatoAdicionalProducto\">",
                                                                                        "<span class=\"datoAdicionalDelProducto\"> Total price for all items: £ "+ totalPrice +" GBP</span>",
                                                                                    "</article>",                                                            
                                                                                "</section>",
                                                                                "</section>");
            
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
            
            swal({
                title: "Product deleted from card",
                text:  "Produdct successfully deleted from card!", 
                type:  "info",
                //showCancelButton: true,
                confirmButtonColor: "#000000",
                confirmButtonText: "Continue",
                //timer: 4000,
                //showConfirmButton: false                        
            }).then((value) => {

                console.log("Actualizando el carro de compras en localStorage ...");
                carroComprasString = JSON.stringify(carroCompras);
                localStorage.removeItem(sessionId);
                localStorage.setItem(sessionId, carroComprasString);
                console.log("Local storage actualizado.");
                location.reload();

            });

            
        });
    }
}