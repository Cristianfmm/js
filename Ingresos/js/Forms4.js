function valitStudent4 (id,infoUser,infoVisita,infoPersona,infovivienda) {
  refresh ();
  console.log(infoUser);
  $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO PROGRAMA SOCIAL SOGAMOSO - VISITA DOMICILIARIA ANUNCIADA Y SORPRESA</b></center>');
  $("#bodyTagLarge").load("views/adminView/Formulario4.html", function() {
    $("#btnModalLarge").removeAttr('disabled');
		$("#btnModalLarge").text('Aceptar');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false});
    $("#ModalLargeObs").modal("show");
    $("#nombre_3").html('<b>CÓDIGO:</b> '+id+'&nbsp;&nbsp;<b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]);
    var estado = SelecConcepto();
    var grupo = SelecGrupo();
    var tipoPared = SelecTipoPared();
    var tipoPiso = SelecTipoPiso();
    $.when(estado,grupo,tipoPared,tipoPiso).done(function(estado_concepto,estadoGrupo,resPared,resPiso){
      CreateSelectA(estadoGrupo[0]["response"],'tipo_grupo');
      $("#tipo_grupo").val(infoVisita["id_grupo"]);
      CreateSelectA(estado_concepto[0]["response"],'conocimientos_id');
      CreateSelectA(estado_concepto[0]["response"],'concepto_visita');
      CreateSelectA(estado_concepto[0]["response"],'concepto_vivienda_ant');
      CreateSelectA(estado_concepto[0]["response"],'aseo_paredes');
      CreateSelectA(estado_concepto[0]["response"],'aseo_pisos');
      CreateSelectA(estado_concepto[0]["response"],'aseo_ordenge');
      CreateSelectA(estado_concepto[0]["response"],'concepto_visita_sorpresa');
      CreateSelectA(estado_concepto[0]["response"],'concepto_vivienda_actual');
      CreateSelectA(estado_concepto[0]["response"],'visita_domiciliaria');
      CreateSelectA(estado_concepto[0]["response"],'4_2');
      CreateSelectA(estado_concepto[0]["response"],'4_1');
      CreateSelectA(resPared[0]["response"],'tipoPared');
      CreateSelectA(resPiso[0]["response"],'tipoPiso');
      CreateSelectA(estado_concepto[0]["response"],'4_1_sorpresa');
      CreateSelectEstado(estado_concepto[0]["response"],'id_tv');
      CreateSelectEstado(estado_concepto[0]["response"],'id_sonido');
      CreateSelectEstado(estado_concepto[0]["response"],'id_Grabadora');
      CreateSelectEstado(estado_concepto[0]["response"],'id_Computador');
      CreateSelectEstado(estado_concepto[0]["response"],'id_Lavadora');
      CreateSelectEstado(estado_concepto[0]["response"],'id_Nevera');
      CreateSelectEstado(estado_concepto[0]["response"],'id_Secadora');
      CreateSelectEstado(estado_concepto[0]["response"],'id_DVD');
      CreateSelectEstado(estado_concepto[0]["response"],'id_VHS');
    })
  $("#visita").val(infoVisita["fechaVisita"]);
  $("#inicio").val(infoVisita["horaInicio"]);
  $("#Hora_fin").val(infoVisita["horaFin"]);
 
  $("#id_nombre").val(infoPersona["nombres_hogar"]);
  $("#id_cedula").val(infoPersona["cedula_hogar"]); 
  $("#id_edad").val(infoPersona["edad_hogar"]);
  $("#id_nombre2").val(infoPersona["nombres_conyu"]);
  $("#id_cedula2").val(infoPersona["cedula_conyu"]);
  $("#id_edad2").val(infoPersona["edad_conyu"]);

  $("#id_nombre_arrendo").val(infovivienda["arrendatario"]);
  $("#id_arrendotel").val(infovivienda["cel"]);
  $("#id_direccion").val(infovivienda["direccion"]);
  $("#id_sector").val(infovivienda["sector"]);
  $("#id_barrio").val(infovivienda["barrio"]);
  $("#id_Estrato").val(infovivienda["estrato"]);
  $("#valor_arriendo").val(infovivienda["valor_arriendo"]);
  $("#instrucciones").val(infovivienda["instrucciones_llegada"]);
  $("#id_cantidad").val(infovivienda["personas_habitan"]);
  $("#id_tiempoViviendo").val(infovivienda["tiempo_permanencia"]);

    $(".btnSelector31").change(function() {
      var option = $(this).find(':selected').data('val');
    });
    $("#btnModalLarge").click(function(event) {
      guardarFormulario4(id)
      event.preventDefault
    });
  })
}


function guardarFormulario4(id) {
  
  // Creación de variable de ingreso de visita
  var visita = $("#visita").val();
  var inicio = $("#inicio").val();
  var Hora_fin = $("#Hora_fin").val();
  var tipo_grupo = $("#tipo_grupo").val();

  // Creación de variable de validación cabeza de hogar y conyuge
  var id_nombre = $("#id_nombre").val();
  var id_cedula = $("#id_cedula").val(); 
  var id_edad = $("#id_edad").val();
  var id_nombre2 = $("#id_nombre2").val();
  var id_cedula2 = $("#id_cedula2").val();
  var id_edad2 = $("#id_edad2").val();

  // Creación de variable de validación información de la vivienda
  var id_nombre_arrendo = $("#id_nombre_arrendo").val();
  var id_arrendotel = $("#id_arrendotel").val();
  var id_direccion = $("#id_direccion").val();
  var id_sector = $("#id_sector").val();
  var id_barrio = $("#id_barrio").val();
  var id_Estrato = $("#id_Estrato").val();
  var valor_arriendo = $("#valor_arriendo").val();
  var instrucciones = $("#instrucciones").val();
  var id_cantidad = $("#id_cantidad").val();
  var id_tiempoViviendo = $("#id_tiempoViviendo").val();

  var direccion_tra = $("#direccion_tra").val();
  var N_habitaciones = $("#N_habitaciones").val();
  var N_habitantes = $("#N_habitantes").val();

  var tipoPared = $("#tipoPared").val();
  var tipoPiso = $("#tipoPiso").val();
  var aseo_paredes = $("#aseo_paredes").val();
  var aseo_pisos = $("#aseo_pisos").val();
  var aseo_ordenge = $("#aseo_ordenge").val();

  var pregA = ($('input[name=PreguntaA]:checked').val() == undefined)?"":$('input[name=PreguntaA]:checked').val();
  var pregB = ($('input[name=PreguntaB]:checked').val() == undefined)?"":$('input[name=PreguntaB]:checked').val();
  var pregC = ($('input[name=PreguntaC]:checked').val() == undefined)?"":$('input[name=PreguntaC]:checked').val();
  var pregD = ($('input[name=PreguntaD]:checked').val() == undefined)?"":$('input[name=PreguntaD]:checked').val();
  var pregE = ($('input[name=PreguntaE]:checked').val() == undefined)?"":$('input[name=PreguntaE]:checked').val();
  var pregF = ($('input[name=PreguntaF]:checked').val() == undefined)?"":$('input[name=PreguntaF]:checked').val();
  var pregG = ($('input[name=PreguntaG]:checked').val() == undefined)?"":$('input[name=PreguntaG]:checked').val();

  var servisAgua = $("#servisAgua").val();
  var servisLuz = $("#servisLuz").val();
  var servisGas = $("#servisGas").val();
  var servisCel = $("#servisCel").val();

  var id_otrosElectricos = $("#id_otrosElectricos").val();


  var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor digite todos los campos","500":"Error al guardar"};
  
  //Creación de variable para validación de información
  var valid = validFormDocument([{'data':visita,'item':'visita','type':'date', 'type_document':'1',  'obligatory':true},
                                {'data':inicio,'item':'inicio','type':'time', 'type_document':'1', 'obligatory':true},
                                {'data':Hora_fin,'item':'Hora_fin','type':'time', 'type_document':'1', 'obligatory':true},
                                {'data':tipo_grupo,'item':'tipo_grupo','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_nombre,'item':'id_nombre','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_cedula,'item':'id_cedula','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_edad,'item':'id_edad','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_nombre2,'item':'id_nombre2','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_cedula2,'item':'id_cedula2','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_edad2,'item':'id_edad2','type':'text', 'type_document':'1', 'obligatory':true},
                              
                                {'data':id_nombre_arrendo,'item':'id_nombre_arrendo','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_arrendotel,'item':'id_arrendotel','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_direccion,'item':'id_direccion','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_sector,'item':'id_sector','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_barrio,'item':'id_barrio','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_Estrato,'item':'id_Estrato','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':valor_arriendo,'item':'valor_arriendo','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':instrucciones,'item':'instrucciones','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_cantidad,'item':'id_cantidad','type':'text', 'type_document':'1', 'obligatory':true},
                                {'data':id_tiempoViviendo,'item':'id_tiempoViviendo','type':'text', 'type_document':'1', 'obligatory':true},

                                {'data':direccion_tra,'item':'direccion_tra','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':N_habitaciones,'item':'N_habitaciones','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':N_habitantes,'item':'N_habitantes','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':tipoPared,'item':'tipoPared','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':tipoPiso,'item':'tipoPiso','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':aseo_paredes,'item':'aseo_paredes','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':aseo_pisos,'item':'aseo_pisos','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':aseo_ordenge,'item':'aseo_ordenge','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregA,'item':'pregA','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregB,'item':'pregB','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregC,'item':'pregC','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregD,'item':'pregD','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregE,'item':'pregE','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregF,'item':'pregF','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':pregG,'item':'pregG','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':servisAgua,'item':'servisAgua','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':servisLuz,'item':'servisLuz','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':servisGas,'item':'servisGas','type':'text', 'type_document':'2', 'obligatory':true},
                                {'data':servisCel,'item':'servisCel','type':'text', 'type_document':'2', 'obligatory':true}])
  
                                console.log(valid["validate"]); 
  
  //Ingresa si la información es correcta
  if(valid["validate"]){
    
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('animated infinite pulse');
      $(this).removeClass('is-invalid');
		});

    $("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
    $("#btnModalLarge").removeAttr('disabled');
    var inser_ForA = "" , InsertHogar = "", InsertConyug = "", UpdateInfoVivienda = "";
    inser_ForA = InsertForm4Visita (id,visita,inicio,Hora_fin,tipo_grupo) 
    InsertHogar = InsertForm4Persona (id,id_nombre,id_cedula,id_edad,'2')
    InsertConyug = InsertForm4Persona (id,id_nombre2,id_cedula2,id_edad2,'3')

    UpdateInfoVivienda = updateForm4Vivienda(id,id_nombre_arrendo,id_arrendotel,id_direccion,id_sector,id_barrio,id_Estrato,valor_arriendo,instrucciones,id_cantidad,id_tiempoViviendo);

    $.when(inser_ForA,InsertHogar,InsertConyug).done(function(Insert_Forrmato1A,Insert_Hogar,Insert_Conyug){
      console.log(Insert_Forrmato1A);
      console.log(Insert_Hogar);
      console.log(Insert_Conyug);
      toastr_message(200,toastMessage_);
    $("#btnModalLarge").html('Guardado !');
    }).fail(function(Update_Sis){
      console.log(Update_Sis);
      toastr_message(500,toastMessage_);
      $("#btnModalLarge").html('Siguiente');
		  $("#btnModalLarge").removeAttr('disabled');
    }); 
  //Ingresa si falta por digitar información
  }else{
    toastr_message(400,toastMessage_);
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('animated infinite pulse');
      $(this).children("span:first").remove();
      $(this).removeClass('is-invalid');
		});
    $.each(valid["type_document"], function(key, label) {
      var label2 ="";
      label2 = valid["items"][key];
      if(label == "1"){
        $("#FormularioA").removeClass('d-none')
        $("#FormularioB").addClass('d-none')
        $("#FormularioC").addClass('d-none')
        $("#FormularioD").addClass('d-none')
        $("#"+label2).addClass('labelInvalid');
        $("#"+label2).addClass("is-invalid");
        $("#"+label2).focus();
      } else{
        $("#FormularioC").removeClass('d-none')
        $("#FormularioA").addClass('d-none')
        $("#FormularioB").addClass('d-none')
        $("#FormularioD").addClass('d-none')
        $("#"+label2).addClass('labelInvalid');
        $("#"+label2).focus();
        $("#"+label2).addClass("is-invalid");
      }
    });
  }
}

function ActiveMenu4 (Type) {
  if(Type == 'A'){
    $("#tableA4").removeClass('d-none')
    $("#tableB4").addClass('d-none')
    $("#tableC4").addClass('d-none')
    $("#tableD4").addClass('d-none')
    $("#tableE4").addClass('d-none')
    $("#linkA").addClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
    $("#linkD").removeClass('active link-primary')
    $("#linkE").removeClass('active link-primary')
  }else if (Type == 'B'){
    $("#tableB4").removeClass('d-none')
    $("#tableA4").addClass('d-none')
    $("#tableC4").addClass('d-none')
    $("#tableD4").addClass('d-none')
    $("#tableE4").addClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").addClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
    $("#linkD").removeClass('active link-primary')
    $("#linkE").removeClass('active link-primary')
  }else if (Type == 'C'){
    $("#tableB4").addClass('d-none')
    $("#tableA4").addClass('d-none')
    $("#tableC4").removeClass('d-none')
    $("#tableD4").addClass('d-none')
    $("#tableE4").addClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").addClass('active link-primary')
    $("#linkD").removeClass('active link-primary')
    $("#linkE").removeClass('active link-primary')
  }else if (Type == 'D'){
    $("#tableB4").addClass('d-none')
    $("#tableA4").addClass('d-none')
    $("#tableC4").addClass('d-none')
    $("#tableD4").removeClass('d-none')
    $("#tableE4").removeClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
    $("#linkD").addClass('active link-primary')
    $("#linkE").removeClass('active link-primary')
  }else if (Type == 'E'){
    $("#tableB4").addClass('d-none')
    $("#tableA4").addClass('d-none')
    $("#tableC4").addClass('d-none')
    $("#tableD4").addClass('d-none')
    $("#tableE4").removeClass('d-none')
    $("#linkA").removeClass('active link-primary')
    $("#linkB").removeClass('active link-primary')
    $("#linkC").removeClass('active link-primary')
    $("#linkD").removeClass('active link-primary')
    $("#linkE").addClass('active link-primary')
  }
}

