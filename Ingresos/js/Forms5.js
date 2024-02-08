function valitStudent5 (id,infoUser) {
  console.log(id);
    refresh ();
    $("#select_container").empty();
    $("#titleModalLarge").empty();
    $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO PROGRAMA SOCIAL SOGAMOSO - VISITA DOMICILIARIA A LA VIVIENDA ANTERIOR</b></center>');
    $("#bodyTagLarge").load("views/adminView/Formulario5.html", function() {
    $("#nombre_3").html('<b>CÓDIGO:</b> '+id+'&nbsp;&nbsp;<b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
    var estado = SelecConcepto();
    $.when(estado).done(function(estado_concepto){
      CreateSelectA(estado_concepto["response"],'aseoParedes');
      CreateSelectA(estado_concepto["response"],'aseoPisos');
      CreateSelectA(estado_concepto["response"],'aseogeneral');
    })
    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
    var day = fechaActual.getDate().toString().padStart(2, '0');
    var fechaFormateada = `${year}-${month}-${day}`;
    console.log(fechaFormateada); 
    $("#date_tra").attr('max',fechaFormateada);
    $("#anterior_date_").attr('max',fechaFormateada);
    $("#date_cony").attr('max',fechaFormateada);
    // $("#nombre_").html('<b>CÓDIGO:</b> '+id+'<br><b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
    $('#backgroundContainer').addClass('blur-background');
    $("#btnModalLarge").removeAttr('disabled');
		$("#btnModalLarge").text('Guardar');
		$(".close").addClass('d-none');
		$(".btnClose").addClass('d-none');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false, backgroundContainer});
    $("#ModalLargeObs").modal("show");
    $('#backgroundContainer').removeClass('blur-background');    
    $("#categoria_sis").val(infoUser["clas_sisben"]);
    var conyugue = parseInt(infoUser["id_civil"]);
    if(conyugue == 3 || conyugue == 4){
      $("#tablaConyuge").addClass('d-none');
      $("#empresaConyuge").addClass('d-none');
    }
    $("#btnModalLarge").click(function(event){
      guardarACtion(id,conyugue);
      event.preventDefault
    })
  })
}

function ActiveType (Type) {
  if(Type == 'A'){
    $("#tableA2").removeClass('d-none')
    $("#tableB2").addClass('d-none')
  }else if (Type == 'B'){
    $("#tableB2").removeClass('d-none')
    $("#tableA2").addClass('d-none')
  }
}


function ActiveMenu2 (Type) {
  if(Type == 'A'){
    $("#tableA2").removeClass('d-none')
    $("#tableB2").addClass('d-none')
  }else if (Type == 'B'){
    $("#tableB2").removeClass('d-none')
    $("#tableA2").addClass('d-none')
  }
}


