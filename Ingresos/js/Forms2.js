function valitStudent2 (id,infoUser,respIndepe,conyuge,respContrato) {
  console.log(id);
    refresh ();
    $("#select_container").empty();
    $("#titleModalLarge").empty();
    $("#titleModalLarge").html('<center><b>CORPORACIÓN SAN ISIDRO - PROGRAMA SOCIAL SOGAMOSO EXPERIENCIA DE TRABAJO</b></center>');
    $("#bodyTagLarge").load("views/adminView/Formulario2.html", function() {
    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, así que sumamos 1
    var day = fechaActual.getDate().toString().padStart(2, '0');
    var fechaFormateada = `${year}-${month}-${day}`;
    
    
    
    $("#date_tra").attr('max',fechaFormateada);
    $("#anterior_date_").attr('max',fechaFormateada);
    $("#date_cony").attr('max',fechaFormateada);
    $("#nombre_").html('<b>CÓDIGO:</b> '+id+'&nbsp;&nbsp;<b>NOMBRE: </b>'+infoUser["apellidos"]+' '+infoUser["nombre"]+'&nbsp;&nbsp;<b>CÉDULA:</b> '+infoUser["n_doc"]+'&nbsp;&nbsp;<br><b>TELÉFONO:</b> '+infoUser["celular"]);
    $('#backgroundContainer').addClass('blur-background');
    $("#btnModalLarge").removeAttr('disabled');
		$("#btnModalLarge").text('Guardar');
		$(".close").addClass('d-none');
		$(".btnClose").addClass('d-none');
		$('#ModalLargeObs').modal({backdrop: 'static', keyboard: false, backgroundContainer});
    $("#ModalLargeObs").modal("show");
    $('#backgroundContainer').removeClass('blur-background');   
    
    $("#direccion_tra").val(respIndepe["direccion"]);
    $("#barrio_tra").val(respIndepe["barrio"]);
    $("#actividad_tra").val(respIndepe["actividad"]);
    $("#ingreso_tra").val(respIndepe["ingreso"]);
    $("#date_tra").val(respIndepe["date_trabajo"]);
    $("#horario_tra").val(respIndepe["horario"]);
    $("#jefe_tra").val(respIndepe["jefe"]);
    $("#jefe_numero_trabajo").val(respIndepe["jefe_numero"]);
    $("#sisben").val(respIndepe["sisben"]);
    $("#anterior_dire").val(respIndepe["anterior_direccion"]);
    $("#anterior_barrio_").val(respIndepe["anterior_barrio"]);
    $("#anterior_actividad_").val(respIndepe["anterior_actividad"]);
    $("#anterior_salario_").val(respIndepe["anterior_salario"]);
    $("#anterior_date_").val(respIndepe["anterior_date"]);
    $("#anterior_horario_").val(respIndepe["anterior_horario"]);
    $("#anterior_jefe_").val(respIndepe["anterior_jefe"]);
    $("#anterior_jefe_telefono_").val(respIndepe["anterior_jefe_telefono"]);
    
    //INFORMACIÓN TRABAJADOR INDEPENDIENTE
    $("#nombre_cony").val(conyuge["nombre"]);
    $("#cedula_cony").val(conyuge["cedula"]);
    $("#telefono_cony").val(conyuge["telefono"]);
    $("#tipoUsuario_cony").val(conyuge["estado"]);
    $("#empresa_cony").val(conyuge["nombre_empresa"]);
    $("#direccion_cony").val(conyuge["direccion"]);
    $("#barrio_cony").val(conyuge["barrio"]);
    $("#actividad_cony").val(conyuge["actividad"]);
    $("#cargo_cony").val(conyuge["cargo"]);
    $("#mensual_cony").val(conyuge["salario"]);
    $("#date_cony").val(conyuge["date"]);
    $("#horario_cony").val(conyuge["horario"]);
    $("#jefe_cony").val(conyuge["jefe"]);
    $("#jefe_num_cony").val(conyuge["jefe_numero"]);
    $("#categoria_sis").val(infoUser["clas_sisben"]);

    //INFORMACIÓN DEL TRABAJADOR POR EMPRESA
    $("#nombreContract").val(infoUser["apellidos"]+' '+infoUser["nombre"]);
    $("#cedulaContract").val(infoUser["n_doc"]);
    $("#celContract").val(infoUser["celular"]);
    
    $("#empresaContract").val(respContrato["nombre_empresa"]);
    $("#cargoContract").val(respContrato["cargo"]);
    $("#salarioContract").val(respContrato["salario"]);
    $("#fechaInicialContract").val(respContrato["fecha_inicio"]);
    $("#CajaComContract").val(respContrato["caja_compensacion"]);

    $("#nombreConyContract").val(conyuge["nombre"]);
    $("#cedulaConyContract").val(conyuge["cedula"]);
    $("#celConyContract").val(conyuge["telefono"]);
    $("#workConyContract").val(conyuge["estado"]);
    $("#empresaConyContract").val(conyuge["nombre_empresa"]);
    $("#dirConyContract").val(conyuge["direccion"]);
  /*   $("#barrio_cony").val(conyuge["barrio"]); */
    $("#activiConyContract").val(conyuge["actividad"]);
    $("#cargoConyContract").val(conyuge["cargo"]);
    $("#salarioConyContract").val(conyuge["salario"]);
    $("#dateinitialConyContract").val(conyuge["date"]);
    $("#horarioConyContract").val(conyuge["horario"]);
    $("#jefeConyContract").val(conyuge["jefe"]);
    $("#cajaComConyContract").val(conyuge["jefe_numero"]);
    /* $("#categoria_sis").val(infoUser["clas_sisben"]); */


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

function ActiveTypeB (Type) {
  if(Type == 'A'){
    $("#tableA2").removeClass('d-none')
    $("#tableA2").addClass('active');
    $("#tableB2").addClass('d-none')
    $("#tableB2").removeClass('active')
    
  }else if (Type == 'B'){
    $("#tableB2").removeClass('d-none')
    $("#tableB2").addClass('active');
    $("#tableA2").addClass('d-none')
    $("#tableA2").removeClass('active')
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


function guardarACtion(id,conyu) {
  
  var typeIndepend = ($("#tableA2").hasClass("active"))?true:false;
  var typeContract = ($("#tableB2").hasClass("active"))?true:false;
  
  //INDEPENDIENTE
  var direccion_tra = $("#direccion_tra").val();
  var barrio_tra = $("#barrio_tra").val();
  var actividad_tra = $("#actividad_tra").val();
  var ingreso_tra = $("#ingreso_tra").val();
  var date_tra = $("#date_tra").val();
  var horario_tra = $("#horario_tra").val();
  var jefe_tra = $("#jefe_tra").val();
  var jefe_numero_trabajo = $("#jefe_numero_trabajo").val();
  var sisben = $("#sisben").val();
  var categoria_sis = $("#categoria_sis").val();
  var anterior_dire = $("#anterior_dire").val();
  var anterior_barrio_ = $("#anterior_barrio_").val();
  var anterior_actividad_ = $("#anterior_actividad_").val();
  var anterior_salario_ = $("#anterior_salario_").val();
  var anterior_date_ = $("#anterior_date_").val();
  var anterior_horario_ = $("#anterior_horario_").val();
  var anterior_jefe_ = $("#anterior_jefe_").val();
  var anterior_jefe_telefono_ = $("#anterior_jefe_telefono_").val();

  // CONYUGE
  var conyugue = (typeIndepend == true)?((conyu == 1 || conyu == 2)?true:false):false ;
  var nombre_cony = $("#nombre_cony").val();
  var cedula_cony = $("#cedula_cony").val();
  var telefono_cony = $("#telefono_cony").val();
  var tipoUsuario_cony = $("#tipoUsuario_cony").val();
  var empresa_cony = $("#empresa_cony").val();
  var direccion_cony = $("#direccion_cony").val();
  var barrio_cony = $("#barrio_cony").val();
  var actividad_cony = $("#actividad_cony").val();
  var mensual_cony = $("#mensual_cony").val();
  var date_cony = $("#date_cony").val();
  var horario_cony = $("#horario_cony").val();
  var jefe_cony = $("#jefe_cony").val();
  var jefe_num_cony = $("#jefe_num_cony").val();
  var cargo_cony = $("#cargo_cony").val();

  //CONTRATO
  var empresaContract = $("#empresaContract").val();
  var cargoContract = $("#cargoContract").val();
  var salarioContract = $("#salarioContract").val();
  var fechaInicialContract = $("#fechaInicialContract").val();
  var CajaComContract = $("#CajaComContract").val();

  //CONTRATO CONYUGE
  var conyugueContrac = (typeContract == true)?((conyu == 1 || conyu == 2)?true:false):false 
  var nombreConyContract = $("#nombreConyContract").val();
  var cedulaConyContract = $("#cedulaConyContract").val();
  var celConyContract = $("#celConyContract").val();
  var workConyContract = $("#workConyContract").val();
  var empresaConyContract = $("#empresaConyContract").val();
  var dirConyContract = $("#dirConyContract").val();
  var activiConyContract = $("#activiConyContract").val();
  var cargoConyContract = $("#cargoConyContract").val();
  var dateinitialConyContract = $("#dateinitialConyContract").val();
  var horarioConyContract = $("#horarioConyContract").val();
  var salarioConyContract = $("#salarioConyContract").val();
  var jefeConyContract = $("#jefeConyContract").val();
  var cajaComConyContract = $("#cajaComConyContract").val();


  var toastMessage_ = {"service":"Notifición","200":"documento guardado", "400":"Por favor digite todos los campos","500":"Error al guardar"};
   var valid = validFormDocument([
   {'data':direccion_tra,'item':'direccion_tra','type':'text', 'obligatory':typeIndepend},
   {'data':barrio_tra,'item':'barrio_tra','type':'text', 'obligatory':typeIndepend},
   {'data':actividad_tra,'item':'actividad_tra','type':'text', 'obligatory':typeIndepend},
   {'data':ingreso_tra,'item':'ingreso_tra','type':'text', 'obligatory':typeIndepend},
   {'data':date_tra,'item':'date_tra','type':'text', 'obligatory':typeIndepend},
   {'data':horario_tra,'item':'horario_tra','type':'text', 'obligatory':typeIndepend},
   {'data':jefe_tra,'item':'jefe_tra','type':'text', 'obligatory':typeIndepend},
   {'data':jefe_numero_trabajo,'item':'jefe_numero_trabajo','type':'text', 'obligatory':typeIndepend},
   {'data':sisben,'item':'sisben','type':'text', 'obligatory':typeIndepend},
   {'data':categoria_sis,'item':'categoria_sis','type':'text', 'typeIndepend':typeIndepend},
   {'data':anterior_dire,'item':'anterior_dire','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_barrio_,'item':'anterior_barrio_','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_actividad_,'item':'anterior_actividad_','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_salario_,'item':'anterior_salario_','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_date_,'item':'anterior_date_','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_horario_,'item':'anterior_horario_','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_jefe_,'item':'anterior_jefe_','type':'text', 'obligatory':typeIndepend},
   {'data':anterior_jefe_telefono_,'item':'anterior_jefe_telefono_','type':'text', 'obligatory':typeIndepend},
   {'data':empresaContract,'item':'empresaContract','type':'text', 'obligatory':typeContract},
   {'data':cargoContract,'item':'cargoContract','type':'text', 'obligatory':typeContract},
   {'data':salarioContract,'item':'salarioContract','type':'text', 'obligatory':typeContract},
   {'data':fechaInicialContract,'item':'fechaInicialContract','type':'text', 'obligatory':typeContract},
   {'data':CajaComContract,'item':'CajaComContract','type':'text', 'obligatory':typeContract},
   {'data':nombre_cony,'item':'nombre_cony','type':'text', 'obligatory':conyugue},
   {'data':cedula_cony,'item':'cedula_cony','type':'text', 'obligatory':conyugue},
   {'data':telefono_cony,'item':'telefono_cony','type':'text', 'obligatory':conyugue},
   {'data':tipoUsuario_cony,'item':'tipoUsuario_cony','type':'text', 'obligatory':conyugue},
   {'data':empresa_cony,'item':'empresa_cony','type':'text', 'obligatory':conyugue},
   {'data':direccion_cony,'item':'direccion_cony','type':'text', 'obligatory':conyugue},
   {'data':barrio_cony,'item':'barrio_cony','type':'text', 'obligatory':conyugue},
   {'data':actividad_cony,'item':'actividad_cony','type':'text', 'obligatory':conyugue},
   {'data':mensual_cony,'item':'mensual_cony','type':'text', 'obligatory':conyugue},
   {'data':date_cony,'item':'date_cony','type':'text', 'obligatory':conyugue},
   {'data':horario_cony,'item':'horario_cony','type':'text', 'obligatory':conyugue},
   {'data':cargo_cony,'item':'cargo_cony','type':'text', 'obligatory':conyugue},
   {'data':jefe_cony,'item':'jefe_cony','type':'text', 'obligatory':conyugue},
   {'data':jefe_num_cony,'item':'jefe_num_cony','type':'text', 'obligatory':conyugue},

   {'data':nombreConyContract,'item':'nombreConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':cedulaConyContract,'item':'cedulaConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':celConyContract,'item':'celConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':workConyContract,'item':'workConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':empresaConyContract,'item':'empresaConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':dirConyContract,'item':'dirConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':activiConyContract,'item':'activiConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':cargoConyContract,'item':'cargoConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':dateinitialConyContract,'item':'dateinitialConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':horarioConyContract,'item':'horarioConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':salarioConyContract,'item':'salarioConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':jefeConyContract,'item':'jefeConyContract','type':'text', 'obligatory':conyugueContrac},
   {'data':cajaComConyContract,'item':'cajaComConyContract','type':'text', 'obligatory':conyugueContrac}])  
   console.log(valid["validate"]);

   if(valid["validate"]){
    
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('animated infinite pulse');
		});
    $("#btnModalLarge").html("Guardando   <i class='fa fa-spinner fa-spin' style='font-size:24px'></i>");
    $("#btnModalLarge").removeAttr('disabled');
    var inser_ForA2 = "";
    var insert_FormB2 = "";
    var Insert_Form2Contr ="";
    if(typeIndepend == true){
      inser_ForA2 = InsertForm2A(id,direccion_tra,barrio_tra,actividad_tra,ingreso_tra,date_tra,horario_tra,jefe_tra,jefe_numero_trabajo,sisben,categoria_sis,anterior_dire,anterior_barrio_,anterior_actividad_,anterior_salario_,anterior_date_,anterior_horario_,anterior_jefe_,anterior_jefe_telefono_);
      if(conyugue == true){
        insert_FormB2 = insertFormB2(id,nombre_cony,cedula_cony,telefono_cony,tipoUsuario_cony,empresa_cony,direccion_cony,barrio_cony,actividad_cony,mensual_cony,date_cony,horario_cony,jefe_cony,jefe_num_cony,cargo_cony,1);
      }
    }else{
      Insert_Form2Contr = InsertForm2Contrato(id,empresaContract,cargoContract,salarioContract,fechaInicialContract,CajaComContract);
      if(conyugueContrac == true){
        insert_FormB2 = insertFormB2(id,nombreConyContract,cedulaConyContract,celConyContract,  workConyContract,empresaConyContract,dirConyContract,"",activiConyContract,mensual_cony,dateinitialConyContract,horarioConyContract,jefeConyContract,cajaComConyContract,cargo_cony,2);
      }
    }
  
    $.when(inser_ForA2,insert_FormB2).done(function(InsertForm2,insertFormB){
      console.log(insertFormB);
      toastr_message(200,toastMessage_);
    $("#btnModalLarge").html('Guardado');
    }).fail(function(insertFormB){
      console.log(insertFormB);
      toastr_message(500,toastMessage_);
      $("#btnModalLarge").html('Guardar');
		  $("#btnModalLarge").removeAttr('disabled');
    });

   }else{
    console.log("No entra")
    toastr_message(400,toastMessage_);
    $(".labelInvalid").each(function() {
		  $(this).removeClass('labelInvalid');
      $(this).removeClass('animated infinite pulse');
      $(this).children("span:first").remove();
      $(this).removeClass('is-invalid');
		});
    $.each(valid["items"], function(key, label) {
      $(".label_"+label).addClass('labelInvalid');
      // $("."+label).addClass("animated infinite pulse");
      $("#"+label).addClass("labelInvalid");
      $("#"+label).addClass("is-invalid");
      $("#"+label).focus();
    });
   }
}
