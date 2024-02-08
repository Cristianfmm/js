function valitStudent7 (id,infoUser) {
  console.log(id);
    refresh ();
    $("#select_container").empty();
    $("#titleModalLarge").empty();
    $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO PROGRAMA SOCIAL SOGAMOSO - VISITA ANUNCIADA O SORPRESA EN EMPRESA</b></center>');
    $("#bodyTagLarge").load("views/adminView/Formulario7.html", function() {
    $("#nombre_").html('<b>CÓDIGO:</b> '+id+'<br><b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
    var day = fechaActual.getDate().toString().padStart(2, '0');
    var fechaFormateada = `${year}-${month}-${day}`;
    console.log(fechaFormateada); 
    $("#date_tra").attr('max',fechaFormateada);
    $("#anterior_date_").attr('max',fechaFormateada);
    $("#date_cony").attr('max',fechaFormateada);
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



