function valitStudent6 (id,infoUser) {
  console.log(id);
    refresh ();
    $("#select_container").empty();
    $("#titleModalLarge").empty();
    $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO PROGRAMA SOCIAL SOGAMOSO - VISITA ANUNCIADA Y SORPRESA AL LUGAR DE TRABAJO ACTUAL – INDEPENDIENTES</b></center>');
    $("#bodyTagLarge").load("views/adminView/Formulario6.html", function() {
    $("#nombre_3").html('<b>CÓDIGO:</b> '+id+'&nbsp;&nbsp;<b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
    var day = fechaActual.getDate().toString().padStart(2, '0');
    var fechaFormateada = `${year}-${month}-${day}`;
    $('#backgroundContainer').addClass('blur-background');
    $("#btnModalLarge").removeAttr('disabled');
		$("#btnModalLarge").text('Siguiente');
		$(".close").addClass('d-none');
		$(".btnClose").addClass('d-none');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false, backgroundContainer});
    $("#ModalLargeObs").modal("show");
    $('#backgroundContainer').removeClass('blur-background');    
  })

  var estadoActual = 1;
  $("#btnModalLarge").click(function(event) {
      if (estadoActual === 1) {
          // Acciones para el estado 1
          $("#doc1").addClass('d-none');
          $("#doc2").removeClass('d-none');
          $("#linkA").removeClass('active link-primary');
          $("#linkB").addClass('active link-primary');
          $("#btnModalLarge").text('Guardar');
          $("#btnModalLarge").click(function(event){
            Funcion 
            // guardarFormulario(id);
            // event.preventDefault
          })
      } else{
          $("#doc1").addClass('d-none');
          $("#doc2").removeClass('d-none');
          $("#linkA").removeClass('active link-primary');
          $("#linkB").addClass('active link-primary');
          estadoActual = 1;
      }
  });
}


function ActiveMenu6 (Type) {
  if(Type == 'A'){
    $("#doc1").removeClass('d-none')
    $("#doc2").addClass('d-none')
    $("#linkA").addClass('active link-primary');
    $("#linkB").removeClass('active link-primary');
  }else if (Type == 'B'){
    $("#doc1").addClass('d-none')
    $("#doc2").removeClass('d-none')
    $("#linkB").addClass('active link-primary');
    $("#linkA").removeClass('active link-primary');
    
  }
}



