window.onload = function () {
    console.log("Cargando informacion del carro de compras.");
    let sessionId = "mlopalv@gmail.com";
    let carroCompras = null;
    let divContainerProducto = document.querySelector("#sectionContainerProducto");

    if (localStorage.getItem(sessionId) !== null) {
        carroCompras = JSON.parse(localStorage.getItem(sessionId));
        let productos = carroCompras.productos;
        console.log("Tamano del carro de compras: " + productos.length);
        let producto = null;
        


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
                                                                "<span class=\"datoAdicionalDelProducto\"> Total price for these items: £ 200 GBP</span>",
                                                            "</article>",
                                                            "<article class=\"articuloDatoAdicionalProducto\">",
                                                                "<a href=\"/products/"+producto.id+"\" class=\"datoAdicionalDelProducto\">",
                                                                    "<i class=\"fa-solid fa-eye\"></i>",
                                                                "</a>",
                                                            "</article>",
                                                        "</section>",
                                                    "</section>");
            

            /*divContainerProducto.innerHTML +=       "<img src=\"/images/productos/1695693036508.webp\" class=\"imagenPrincipalDelProducto\" />";
            divContainerProducto.innerHTML +=       "<article class=\"datoAdicionalDelProductoEnfasis\">";  
            divContainerProducto.innerHTML +=           "<span>Deluxe Coin</span>";
            divContainerProducto.innerHTML +=           "<span>Price per item: $ 200</span>";    
            divContainerProducto.innerHTML +=           "<span>Quantity: XX</span>";        
            divContainerProducto.innerHTML +=       "</article>";        
            divContainerProducto.innerHTML +=   "</section>";    
            divContainerProducto.innerHTML +=   "<section class=\"seccionDatosAdicionalesProducto\">";    
            divContainerProducto.innerHTML +=       "<article class=\"articuloDatoAdicionalProducto\">";        
            divContainerProducto.innerHTML +=           "<span class=\"datoAdicionalDelProducto\"> Total price for these items: £ 200 GBP</span>";         
            divContainerProducto.innerHTML +=       "</article>";               
            divContainerProducto.innerHTML +=       "<article class=\"articuloDatoAdicionalProducto\">";     
            divContainerProducto.innerHTML +=           "<a href=\"<%= '/products/14' %>\" class=\"datoAdicionalDelProducto\">";       
            divContainerProducto.innerHTML +=               "<i class=\"fa-solid fa-eye\"></i>"   
            divContainerProducto.innerHTML +=           "</a>" 
            divContainerProducto.innerHTML +=       "</article>";
            divContainerProducto.innerHTML +=   "</section>";
            divContainerProducto.innerHTML += "</section>";*/
            
            //console.log(producto);
        }
        
    
    }    
}