$(function () {
    $("#tabla_productos").on("click", "#btn_agregar", function () {
      let codigo = $(this).attr("codigo");
      let descripcion = $(this).attr("descripcion");
      let valor = parseInt($(this).attr("valor"));
  
      let productoExistente = false;
  
      // Verificar si el producto ya está en la factura
      $(".se_itemsfactura").each(function () {
        if ($(this).find("#codigo").text() === codigo) {
          let cantidadActual = parseInt($(this).find(".txt_cantidad").val());
          cantidadActual++;
          $(this).find(".txt_cantidad").val(cantidadActual);
          let totalArticulo = cantidadActual * valor;
          $(this).find("#td_valor").html(totalArticulo);
          productoExistente = true;
          return false; // Salir del bucle each
        }
      });
  
      if (!productoExistente) {
        let itemFactura = '<tr class="se_itemsfactura">';
        itemFactura += '<td scope="row"><button type="button" id="btn_eliminar" class="btn btn-primary ">remover</button></td>';
        itemFactura += '<td id="codigo">' + codigo + '</td>';
        itemFactura += '<td>' + descripcion + '</td>';
        itemFactura += '<td><input name="" class="form-control txt_cantidad" type="number" value="1" valorunitario="' + valor + '"></td>';
        itemFactura += '<td id="td_valor">' + valor + '</td>';
        itemFactura += '</tr>';
  
        $("#contenedorFactura").append(itemFactura);
      }
  
      calculartotal();
    });
  
    $("#tablaFactura").on("click", "#btn_eliminar", function () {
        $(this).parent().parent().remove();
        calculartotal();
    
    
      })
  
    $("#tablaFactura").on("change", ".txt_cantidad", function () {
      let cantidad = $(this).val();
      let valorunitario = parseInt($(this).attr("valorunitario"));
      let totalArticulo = cantidad * valorunitario;
      $(this).parent().parent().children("#td_valor").html(totalArticulo);

      calculartotal();
    });
  
    function calculartotal() {
      let total = 0;
  
      $(".se_itemsfactura").each(function () {
        total += parseInt($(this).find("#td_valor").text());
      });
  
      $("#contenedortotal").html("<h1>total:" + total + "</h1>");
    }
  });
  